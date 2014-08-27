
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

macro methods {
    rule {
        extended_method $typename instance $mname $mparams $mbody
    } => {
        $typename.prototype.$mname = function $mname $mparams 
          { install_super $typename $mbody };
    }
    rule {
        extended_method $typename constructor $mname $mparams $mbody
    } => {
        $typename.$mname = function $mname $mparams 
          { install_super $typename $mbody };
    }
    rule {
        $typename instance $name $params $body
    } => {
        $typename.prototype.$name = function $name $params $body;
    }
    rule {
        $typename constructor $name $params $body
    } => {
        $typename.$name = function $name $params $body;
    }
}

macroclass method {
  pattern {
      rule {
          static $name $params $body
      }
      with $base = #{ "constructor" }
  }
  pattern {
      rule {
          $name $params $body
      }
      with $base = #{ "instance" }
  }
}

let class = macro {
    rule {
        $typename extends $parent {
            constructor $cparams $cbody
            $m:method ...
        }
    } => {
        function $typename $cparams { install_super $typename $cbody }

        $typename.prototype = Object.create($parent.prototype);
        $typename.prototype.constructor = $typename;
        $(methods extended_method $typename $m$base $m$name $m$params $m$body) ...
    }

    // Workaround for BUG #174
    rule {
        $typename {
            constructor $cparams $cbody
        }
    } => {
        function $typename $cparams $cbody
    }
    rule {
        $typename {
            constructor $cparams $cbody
            $m:method ...
        }
    } => {
        function $typename $cparams $cbody

        $(methods $typename $m$base $m$name $m$params $m$body) ...
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
