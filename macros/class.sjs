
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-class-definitions

macro install_super {
    case { _ $parent { $body ... } } => {
        var stx = #{ $body ... };
        return search(stx);

        function search(stx) {
            var res = [];

            for(var i=0; i<stx.length; i++) {
                var s = stx[i];

                if(s.token.type == parser.Token.Delimiter) {
                    s.token.inner = search(s.token.inner);
                    res.push(s);
                }
                else if(s.token.value == 'super') {
                    var n = stx[++i];
                    
                    if(n.token.type == parser.Token.Delimiter) {
                        if(n.token.value == '[]') {
                            var refstx = withSyntax($ref = [n]) {
                                return #{ Object.getPrototypeOf(Object.getPrototypeOf(this)) $ref };
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

                            var refstx = withSyntax($args = [args]) {
                                return #{ $parent.call $args }
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
                            var pre = [makeIdent('this')];
                            if(args.token.inner.length) {
                                pre.push(makePunc(','));
                            }
                            args.token.inner = pre.concat(args.token.inner);

                            refstx = withSyntax($prop = [prop], $args = [args]) {
                                return #{ Object.getPrototypeOf(Object.getPrototypeOf(this))
                                            .$prop.call $args };
                            }
                        }
                        else {
                            refstx = withSyntax($prop = [prop]) {
                                return #{ Object.getPrototypeOf(Object.getPrototypeOf(this)).$prop };
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
        class_constructor $typedef ... {
            constructor() {}
            $methods ...
        }
    }
}

// hack to recurse down into `class` (which needs to be a let macro
// because we don't have proper modules yet
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
                return super.getX();
            }

            nested() {
                if(true) {
                    if(this.barX > 2) {
                        return super.getX();
                    }
                }

                return 1;
            }

            nestedFunction() {
                function run() {
                    if(true) {
                        if(this.barX > 2) {
                            return super.getX();
                        }
                    }
                }

                return run();
            }

            getMethod() {
                return super.getX;
            }

            getMethod2() {
                return super['getX'];
            }

        }
