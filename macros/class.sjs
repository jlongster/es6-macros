
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-class-definitions

macro install_super {
    case { _ $parent { $body ... } } => {
        var stx = #{ $body ... };
        return search(stx);

        function search(stx) {
            var res = [];

            for(var i=0; i<stx.length; i++) {
                var s = stx[i];

                // don't dive into nested functions
                if(s.token.type == parser.Token.Keyword && 
                   s.token.value == 'function') {
                    // function keyword
                    res.push(stx[i++]);

                    // optional function ident
                    if(stx[i + 1].token.type == parser.Token.Identifier) {
                        res.push(stx[i++]);
                    }

                    // arg list:  ($arg1 (,) ...)
                    res.push(stx[i++]);

                    // body: { $expr ... }
                    res.push(stx[i++]);
                }
                else if(s.token.type == parser.Token.Delimiter) {
                    s.token.inner = search(s.token.inner);
                    res.push(s);
                }
                else if(s.token.value == 'super') {
                    var n = stx[++i];
                    
                    if(n.token.type == parser.Token.Delimiter) {
                        if(n.token.value == '[]') {
                            var refstx = withSyntax($ref = [n]) {
                                return #{ $parent.prototype $ref };
                            }

                            res = res.concat(refstx);
                        }
                        else if(n.token.value == '()') {
                            var args = n;
                            var pre = [makeIdent('this')];
                            if(args.token.inner.length) {
                                pre.push(makePunc(','));
                            }
                            args.token.inner = pre.concat(args.token.inner);

                            return withSyntax($args = [args]) {
                                return #{ $parent.call $args }
                            }
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
                            var pre = [makeIdent('this')];
                            if(args.token.inner.length) {
                                pre.push(makePunc(','));
                            }
                            args.token.inner = pre.concat(args.token.inner);

                            refstx = withSyntax($prop = [prop], $args = [args]) {
                                return #{ $parent.prototype.$prop.call $args };
                            }
                        }
                        else {
                            refstx = withSyntax($prop = [prop]) {
                                return #{ $parent.prototype.$prop };
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

macro class {
    rule {
        $typename extends $parent {
            constructor $cparams $cbody
            $($mname $mparams $mbody) ...
        }
    } => {
        function $typename $cparams { install_super $parent $cbody }

        $typename.prototype = Object.create($parent.prototype);
        $($typename.prototype.$mname = function $mname $mparams 
          { install_super $parent $mbody };) ...
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
        $typedef ... {
            $methods ...
        }
    } => {
        class $typedef ... {
            constructor() {}
            $methods ...
        }
    }
}
export class

class Foo {
    constructor(x) {
        this.fooX = x + 5;
    }

    getX() {
        return this.fooX;
    }
}

class Bar extends Foo {
    constructor(x) {
        super(x);
        this.barX = x;
    }

    getX() {
        return this.barX;
    }

    getFooX() {
        if(true) {
            return super.getX();
        }
    }
}

// install_super Foo {
//     super[method + 'sdfdsf']
// }
