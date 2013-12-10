
macro _debug {
    case { $expr ... } => {
        function collapse(stx) {
            return stx.map(function(s) {
                if(s.token.inner) {
                    return s.token.value[0] +
                        collapse(s.token.inner) +
                        s.token.value[1];
                }

                return s.token.value;
            }).join(' ');
        }

        var stx = #{ $expr ... };
        var val = makeValue(collapse(stx), #{ctx});

        return withSyntax($val = [val]) {
            return #{$val}
        }
    }
}



// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-class-definitions

macro install_super {
    case { $ctx $cls { $body ... } } => {
        var stx = #{ $body ... };
        var saveThis = false;
        var res = search(stx);

        if(saveThis) {
            res = [makeKeyword('var'),
                   makeIdent('self', stx[0]),
                   makePunc('='),
                   makeIdent('this')].concat(res);
        }

        return res;

        function search(stx, inFunction) {
            var res = [];
            var insideFunc = false;

            for(var i=0; i<stx.length; i++) {
                var s = stx[i];

                if(s.token.type == parser.Token.Delimiter) {
                    s.token.inner = search(s.token.inner, inFunction);
                    res.push(s);
                }
                else if(s.token.value == 'function') {
                    // function keyword
                    res.push(stx[i++]);
                    
                    // optional function ident
                    if(stx[i].token.type == parser.Token.Identifier) {
                        res.push(stx[i++]);
                    }

                    // arg list: ($arg1 (,) ...)
                    res.push(stx[i++]);

                    // body: { $expr ... }
                    stx[i].token.inner = search(stx[i].token.inner, true);
                    res.push(stx[i]);
                }
                else if(s.token.value == 'super') {
                    var n = stx[++i];

                    if(inFunction) {
                        saveThis = true;
                    }
                    
                    if(n.token.type == parser.Token.Delimiter) {
                        if(n.token.value == '[]') {
                            var refstx = withSyntax($ref = [n]) {
                                return #{ Object.getPrototypeOf($cls.prototype) $ref };
                            }

                            res = res.concat(refstx);
                        }
                        else if(n.token.value == '()') {
                            var args = n;
                            var pre = [makeIdent(inFunction ? 'self' : 'this')];
                            if(args.token.inner.length) {
                                pre.push(makePunc(','));
                            }
                            args.token.inner = pre.concat(args.token.inner);

                            var refstx = withSyntax($args = [args]) {
                                return #{ Object.getPrototypeOf($cls.prototype).constructor.call $args }
                            }

                            res = res.concat(refstx);
                        }
                        else {
                            throwSyntaxError('class', 'invalid use of super', s);
                        }
                    }
                    else if(n.token.type == parser.Token.Punctuator &&
                            n.token.value == '.') {
                        var prop = stx[++i];
                        var args = stx[++i];
                        var refstx;

                        if(args &&
                           args.token.type == parser.Token.Delimiter &&
                           args.token.value == '()') {
                            
                            // prepend `this` to the arguments
                            var pre = [makeIdent(inFunction? 'self' : 'this')];
                            if(args.token.inner.length) {
                                pre.push(makePunc(','));
                            }
                            args.token.inner = pre.concat(args.token.inner);

                            refstx = withSyntax($prop = [prop], $args = [args]) {
                                return #{ Object.getPrototypeOf($cls.prototype)
                                            .$prop.call $args };
                            }
                        }
                        else {
                            refstx = withSyntax($prop = [prop]) {
                                return #{ Object.getPrototypeOf($cls.prototype).$prop };
                            };
                        }

                        res = res.concat(refstx);
                    }
                    else {
                        throwSyntaxError('class', 'invalid use of super', s);
                    }
                }
                else if(s.token.value == 'new') {
                    // new super(args ...)
                    res.push(s);
                }
                else {
                    res.push(s);
                }
            }

            return res;
        }
    }
}

let class = macro {
    rule {
        $typename extends $parent {
            constructor $cparams $cbody
            $($mname $mparams $mbody) ...
        }
    } => {
        function $typename $cparams { install_super $typename $cbody }

        $typename.prototype = Object.create($parent.prototype);
        $($typename.prototype.$mname = function $mname $mparams 
          { install_super $typename $mbody };) ...
    }

    rule {
        $typename {
            constructor $cparams $cbody
            $($mname $mparams $mbody) ...
        }
    } => {
        function $typename $cparams $cbody

        $($typename.prototype.$mname = function $mname $mparams $mbody;) ...
    }

    rule {
        $typename $extends ... {
            $methods ...
        }
    } => {
        class_constructor $typename $extends ... {
            constructor() {
                Object.getPrototypeOf($typename.prototype).constructor.call(this);
            }
            $methods ...
        }
    }
}

// hack to recurse down into `class` (which needs to be a let macro
// because we don't have proper modules yet)
macro class_constructor {
    rule {
        $typedef ... {
            $methods ...
        }
    } => {
        class $typedef ... {
            $methods ...
        }
    }
}
export class


// TODO: force "inside-out" expansion?

// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-destructuring-assignment

macro destruct_objassign {
    rule { ($prop:ident : $pattern:expr = $default:expr) $obj:expr } => {
        destruct_next ($obj.$prop || $default) $pattern
    }

    rule { ($name:ident = $default:expr) $obj:expr } => {
        destruct_next ($obj.$name || $default) $name
    }

    rule { ($prop:ident : $pattern:expr) $obj:expr } => {
        destruct_next ($obj.$prop) $pattern
    }

    rule { ($name:ident) $obj:expr } => {
        destruct_next ($obj.$name) $name
    }

    rule { () $obj:expr } => {
        _noop
    }
}

macro destruct_arrassign {
    rule { ($pattern:expr = $default:expr) $arr $index } => {
        destruct_next ($arr[$index++] || $default) $pattern
    }

    rule { (.. $name:ident) $arr $index } => {
        destruct_next ($arr.slice($index)) $name
    }

    rule { ($pattern:expr) $arr $index } => {
        destruct_next ($arr[$index++]) $pattern
    }

    rule { () $arr $index } => {
        _noop
    }
}

macro destruct_finish {
    rule { { $pattern (,) ... } $obj:expr } => {
        obj = $obj, $(destruct_objassign $pattern obj) (,) ...
    }

    rule { [ $pattern (,) ... ] $arr:expr } => {
        arr = $arr, i=0, $(destruct_arrassign $pattern arr i) (,) ...
    }

    rule { $id $val:expr } => {
        $id = $val
    }
}

macro destruct_next {
    // wrap all fields in parentheses

    rule { $a $b ($acc ...), $prop:ident : $pattern:expr = $val:expr } => {
        destruct_next $a $b ($acc ... , ($prop: $pattern = $val))
    }

    rule { $a $b ($acc ...), $prop:ident : $pattern:expr } => {
        destruct_next $a $b ($acc ... , ($prop: $pattern))
    }

    rule { $a $b ($acc ...), $name:ident = $val:expr } => {
        destruct_next $a $b ($acc ... , ($name = $val))
    }

    rule { $a $b ($acc ...), $pattern:expr } => {
        destruct_next $a $b ($acc ... , ($pattern))
    }

    rule { $a $b ($acc ...), .. $name:ident} => {
        destruct_next $a $b ($acc ... , (.. $name))
    }

    rule { $a $b ($acc ...), } => {
        destruct_next $a $b ($acc ... , (_noop))
    }

    // pass along normalized object

    rule { ($obj:expr) {} ($acc ...) } => {
        destruct_finish { $acc ... } $obj
    }

    rule { ($obj:expr) [] ($acc ...) } => {
        destruct_finish [ $acc ... ] $obj
    }

    // strip out fields

    rule { $o { $field ... } } => {
        destruct_next $o {} (()), $field ...
    }

    rule { $o [ $field ... ] } => {
        destruct_next $o [] (()), $field ...
    }

    // pass normal expr along

    rule { ($obj:expr) $var:expr } => {
        destruct_finish $var $obj
    }
}

let var = macro {
    rule { $var:expr = $obj:expr } => {
        var destruct_next ($obj) $var
    }

    rule { $id:ident } => {
        var $id
    }
}
export var

// sweet.js doesn't support let and const yet, but it should come very soon.

// let let = macro {
//     rule { $id = macro { $body ... } } => {
//         let $id = macro { $body ... }
//     }

//     rule { $var:expr = $obj:expr } => {
//         let destruct_next ($obj) $var
//     }

//     rule { $id } => {
//         let $id
//     }
// }
// export let

// let const = macro {
//     rule { $var:expr = $obj:expr } => {
//         const destruct_next ($obj) $var
//     }

//     rule { $id } => {
//         const $id
//     }
// }
// export const

// apply destructuring on functions arguments too

macro parse_arg {
    rule { ($args ...) ($acc ...) $body ([ $pattern ... ] $expr ...)} => {
        parse_arg ($args ... _tmp) ($acc ... var [$pattern ...] = _tmp;) $body ($expr ...)
    }

    rule { ($args ...) ($acc ...) $body ({ $pattern ... } $expr ...)} => {
        parse_arg ($args ... _tmp) ($acc ... var { $pattern ... } = _tmp;) $body ($expr ...)
    }

    rule { ($args ...) ($acc ...) $body (, $expr ...) } => {
        parse_arg ($args ... ,) ($acc ...) $body ($expr ...)
    }

    rule { ($args ...) ($acc ...) $body ($param $expr ...) } => {
        parse_arg ($args ... $param) ($acc ...) $body ($expr ...)
    }

    rule { $args ($acc ...) { $expr ... } () } => {
        $args {
            $acc ...
            $expr ...
        }
    }

    // rule { $expr ... } => {
    //     _debug $expr ...
    // }
}

let function = macro {
    rule { $id:ident ($param (,) ...) $body } => {
        function $id parse_arg () () $body ($param (,) ...)
    }

    rule { ($param (,) ...) $body } => {
        function parse_arg () () $body ($param (,) ...)
    }

}
export function
