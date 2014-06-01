
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
            res = [makeKeyword('var', #{$ctx}),
                   makeIdent('self', stx[0]),
                   makePunc('=', #{$ctx}),
                   makeIdent('this', #{$ctx})].concat(res);
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
                            var pre = [makeIdent(inFunction ? 'self' : 'this', stx[0])];
                            if(args.token.inner.length) {
                                pre.push(makePunc(',', #{$ctx}));
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
                            var pre = [makeIdent(inFunction? 'self' : 'this', stx[0])];
                            if(args.token.inner.length) {
                                pre.push(makePunc(',', #{$ctx}));
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
                Object.getPrototypeOf($typename.prototype).constructor.apply(this, arguments);
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

macro => {
  rule infix { ($value (,) ...) | {$body ...} } => {
    function($value (,) ...) {
      $body ...
    }.bind(this)
  }
  rule infix { ($value (,) ... $[...] $rest) | {$body ...} } => {
    function($value (,) ..., $[...]$rest) {
      $body ...
    }.bind(this)
  }
  rule infix { ($value (,) ...) | $guard:expr } => {
    function($value (,) ...) {
      return $guard;
    }.bind(this)
  }
  rule infix { ($value (,) ... $[...] $rest) | $guard:expr } => {
    function($value (,) ..., $[...]$rest) {
      return $guard;
    }.bind(this)
  }
  rule infix { $param:ident | $guard:expr } => {
    function($param) {
      return $guard;
    }.bind(this)
  }
}

export =>

let function = macro {
  rule { ($arg:ident (,) ... $[...] $rest:ident) { $body ... } } => { 
    rest ($arg (,) ...) $rest { $body ... }
  }
  rule { $name:ident ($arg:ident (,) ... $[...] $rest:ident) { $body ... } } => { 
    rest $name($arg (,) ...) $rest { $body ... }
  }
  // Passthrough
  rule { $pass ... } => { function $pass ... }
}

macro rest {
  case {_ $name:ident... ($arg:ident (,) ... ) $rest:ident { $body ... } } => { 
  	var args = (#{ $arg ... }).length,
	stx = #{$rest};
	letstx $l = args ?
	  [makePunc(',', stx), makeValue(args, stx)] :
	  null;
	return #{
	  function $name...( $arg (,) ... , $rest ) {
		$rest = Array.prototype.slice.call(arguments $l);
		$body ...
	  }
	}
  }
}

export function


// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-destructuring-assignment

macro destruct_objassign {
  rule { $decl ($prop:ident : $pattern:expr = $default:expr) $obj:expr } => {
    destruct_next $decl ($obj.$prop || $default) $pattern
  }

  rule { $decl ($name:ident = $default:expr) $obj:expr } => {
    destruct_next $decl ($obj.$name || $default) $name
  }

  rule { $decl ($prop:ident : $pattern:expr) $obj:expr } => {
    destruct_next $decl ($obj.$prop) $pattern
  }

  rule { $decl ($name:ident) $obj:expr } => {
    destruct_next $decl ($obj.$name) $name
  }

  rule { $decl () $obj:expr } => {
  }
}

macro destruct_arrassign {
  rule { $decl ($id = $default:expr) $arr $index } => {
    destruct_next $decl ($arr[$index++] || $default) $id
  }

  rule { $decl (.. $name:ident) $arr $index } => {
    destruct_next $decl ($arr.slice($index)) $name
  }

  rule { $decl ($pattern:expr) $arr $index } => {
    destruct_next $decl ($arr[$index++]) $pattern
  }

  rule { $decl () $arr $index } => {
  }
}

macro destruct_finish {
  rule { $decl { $pattern (,) ... } $obj:expr } => {
    var obj = $obj;
    $(destruct_objassign $decl $pattern obj) (;) ...
  }

  rule { $decl [ $pattern (,) ... ] $arr:expr } => {
    var arr = $arr;
    var i=0;
    $(destruct_arrassign $decl $pattern arr i) (;) ...
  }

  rule { $decl $id $val:expr } => {
    $decl $id = $val
  }
}

macro destruct_next {
  // wrap all fields in parentheses

  rule { $a $b $c ($acc ...), $prop:ident : $pattern:expr = $val:expr } => {
    destruct_next $a $b $c ($acc ... , ($prop: $pattern = $val))
  }

  rule { $a $b $c ($acc ...), $prop:ident : $pattern:expr } => {
    destruct_next $a $b $c ($acc ... , ($prop: $pattern))
  }

  rule { $a $b $c ($acc ...), $name:ident = $val:expr } => {
    destruct_next $a $b $c ($acc ... , ($name = $val))
  }

  rule { $a $b $c ($acc ...), $pattern:expr } => {
    destruct_next $a $b $c ($acc ... , ($pattern))
  }

  rule { $a $b $c ($acc ...), .. $name:ident} => {
    destruct_next $a $b $c ($acc ... , (.. $name))
  }

  rule { $a $b $c ($acc ...), } => {
    destruct_next $a $b $c ($acc ... , (_noop))
  }

  // pass along normalized object

  rule { $decl ($obj:expr) {} ($acc ...) } => {
    destruct_finish $decl { $acc ... } $obj
  }
  
  rule { $decl ($obj:expr) [] ($acc ...) } => {
    destruct_finish $decl [ $acc ... ] $obj
  }

  // strip out fields

  rule { $decl $o { $field ... } } => {
    destruct_next $decl $o {} (()), $field ...
  }

  rule { $decl $o [ $field ... ] } => {
    destruct_next $decl $o [] (()), $field ...
  }

  // pass normal expr along

  rule { $decl ($obj:expr) $var:expr } => {
      destruct_finish $decl $var $obj
  }
}

let var = macro {
  rule { $pattern = $obj:expr } => {
    destruct_next var ($obj) $pattern
  }

  rule { $id } => {
    var $id
  }
}
export var

let let = macro {
  rule { $pattern = $obj:expr } => {
    destruct_next let ($obj) $pattern
  }

  rule { $id } => {
    let $id
  }
}
export let

let const = macro {
  rule { $pattern = $obj:expr } => {
    destruct_next const ($obj) $pattern
  }

  rule { $id } => {
    const $id
  }
}
export const
