
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

macro bind_args {
  case { $ctx $args $body ... } => {
    var stx = #{ $body ... };
    var args = #{ $args };

    function walk(stx) {
      for(var i=0; i<stx.length; i++) {
        var s = stx[i];
        if(s.token.type === parser.Token.Delimiter) {
          walk(s.token.inner);
        }
        else if(s.token.value === 'function') {
          var expr = getExpr(stx.slice(i));
          walk(expr.rest);
          break;
        }
        else if(s.token.type === parser.Token.Identifier &&
                s.token.value === 'arguments' &&
                (i === 0 || stx[i-1].token.value !== '.')) {
          s.token.value = '__fa_args';
        }
      }
    }

    walk(stx);
    return stx;
  }
}

macro => {
  case infix { ($arg (,) ...) | $ctx {$body ...} } => {
    letstx $args = [makeIdent('__fa_args', #{$ctx})];
    return #{
      function($args, $arg (,) ...) {
        bind_args $args $body ...
      }.bind(this, typeof arguments !== "undefined" ? arguments : undefined)
    }
  }
  case infix { $arg:ident | $ctx {$body ...} } => {
    letstx $args = [makeIdent('__fa_args', #{$ctx})];
    return #{
      function($args, $arg) {
        bind_args $args $body ...
      }.bind(this, typeof arguments !== "undefined" ? arguments : undefined)
    }
  }
  case infix { ($arg (,) ...) | $ctx $guard:expr } => {
    letstx $args = [makeIdent('__fa_args', #{$ctx})];
    return #{
      function ($args, $arg (,) ...) {
        return bind_args $args $guard;
      }.bind(this, typeof arguments !== "undefined" ? arguments : undefined)
    }
  }
  case infix { $arg:ident | $ctx $guard:expr } => {
    letstx $args = [makeIdent('__fa_args', #{$ctx})];
    return #{
      function($args, $arg) {
        return bind_args $args $guard;
      }.bind(this, typeof arguments !== "undefined" ? arguments : undefined)
    }
  }
}

export =>

// extract rest parameter
macro extract_rest_parameter {

    // named function
    case { _
        $name:ident ($args:ident (,) ... $rest:ident) { $body ... }
    } => {
        var a = #{$args (,) ...}.filter(function(p) {
            return p.token.type === parser.Token.Identifier;
        });
        letstx $numArgs = [makeValue(a.length, #{restArg})];
        return #{
            function $name ($args (,) ...) {
                var $rest = [].slice.call(arguments, $numArgs);
                $body ...
            }
        }
    }

    // anonymous function
    case { _
        ($args:ident (,) ... $rest:ident) { $body ... }
    } => {
        var a = #{$args (,) ...}.filter(function(p) {
            return p.token.type === parser.Token.Identifier;
        });
        letstx $numArgs = [makeValue(a.length, #{restArg})];
        return #{
            function ($args (,) ...) {
                var $rest = [].slice.call(arguments, $numArgs);
                $body ...
            }
        }
    }
}

let function = macro {
    // named functions

    // only rest parameter
    rule {
        $name:ident ($[...]$rest:ident) { $body ... }
    } => {
        function $name () {
            var $rest = [].slice.call(arguments, 0);
            $body ...
        }
    }

    // regular parameter with rest parameter
    rule {
        $name:ident ($param:ident (,) ... $[...]$rest:ident) { $body ... }
    } => {
         extract_rest_parameter $name ($param (,) ..., $rest) {
            $body ...
        }
    }

    // only default parameter
    rule {
        $name:ident ($($var:ident = $val:expr) (,) ...) { $body ... }
    } => {
        function $name ($var (,) ...) {
            $($var === undefined && ($var = $val);) ...
            $body ...
        }
    }

    // regular parameter and default parameter
    rule {
        $name:ident ($param:ident (,) ... $($var:ident = $val:expr) (,) ...) { $body ... }
    } => {
        function $name ($param (,) ... $var (,) ...) {
            $($var === undefined && ($var = $val);) ...
            $body ...
        }
    }

    // default parameter and rest parameter
    rule {
        $name:ident ($($var:ident = $val:expr) (,) ... $[...]$rest:ident) { $body ... }
    } => {
        extract_rest_parameter $fname ($var (,) ..., $rest) {
            $($var === undefined && ($var = $val);) ...
            $body ...
        }
    }

    // regular parameter, default parameter and rest parameter
    rule {
        $name:ident ($param:ident (,) ... $($var:ident = $val:expr) (,) ... $[...]$rest:ident) { $body ... }
    } => {
        extract_rest_parameter $name ($param (,) ..., $var (,) ..., $rest) {
            $($var === undefined && ($var = $val);) ...
            $body ...
        }
    }

    // anonymous functions

    // only rest parameter
    rule {
        ($[...]$rest:ident) { $body ... }
    } => {
        function () {
            var $rest = [].slice.call(arguments, 0);
            $body ...
        }
    }

    // regular parameter with rest parameter
    rule {
        ($param:ident (,) ... $[...]$rest:ident) { $body ... }
    } => {
         extract_rest_parameter ($param (,) ..., $rest) {
            $body ...
        }
    }

    // only default parameter
    rule {
        ($($var:ident = $val:expr) (,) ...) { $body ... }
    } => {
        function ($var (,) ...) {
            $($var === undefined && ($var = $val);) ...
            $body ...
        }
    }

    // regular parameter and default parameter
    rule {
        ($param:ident (,) ... $($var:ident = $val:expr) (,) ...) { $body ... }
    } => {
        function ($param (,) ... $var (,) ...) {
            $($var === undefined && ($var = $val);) ...
            $body ...
        }
    }

    // default parameter and rest parameter
    rule {
        ($($var:ident = $val:expr) (,) ... $[...]$rest:ident) { $body ... }
    } => {
        extract_rest_parameter ($var (,) ..., $rest) {
            $($var === undefined && ($var = $val);) ...
            $body ...
        }
    }

    // regular parameter, default parameter and rest parameter
    rule {
        ($param:ident (,) ... $($var:ident = $val:expr) (,) ... $[...]$rest:ident) { $body ... }
    } => {
        extract_rest_parameter ($param (,) ..., $var (,) ..., $rest) {
            $($var === undefined && ($var = $val);) ...
            $body ...
        }
    }
}

export function

macro destructor {
  rule { [ $arr:arr_destructor (,) ... ] } => { (arr $arr ...) }
  rule { { $obj:obj_destructor (,) ... } } => { (obj $obj ...) }
  rule { $id:ident } => { (id $id) }
}

macro arr_destructor {
  rule { $id:ident = $default:expr } => { (arr_id $id $default) }
  rule { $id:ident } => { (arr_id $id) }
  rule { $[...] $id:ident } => { (arr_slice $id) }
  rule { $p:destructor } => { (arr_sub $p) }
  rule { } => { (elide) }
}

macro obj_destructor {
  rule { $key:ident $[:] $id:ident = $default:expr } => {
    (obj_id $key $id $default)
  }
  rule { $key:ident $[:] $id:ident } => { (obj_id $key $id) }
  rule { $key:ident $[:] $p:destructor } => { (obj_sub $key $p) }
  rule { $key:ident = $default:expr } => { (obj_id $key $key $default) }
  rule { $key:ident } => { (obj_id $key $key) }
}

macroclass succ {
  pattern {
    rule { $cur:lit }
    with $next = [makeValue(unwrapSyntax(#{$cur}) + 1, #{$cur})];
  }
}

macro count_array {
  rule { () $i $k $o } => {
  }

  rule { ($item $arr ...) $i:succ $k $o } => {
    destruct $item $i$cur $k $o
    count_array ($arr ...) $i$next $k $o
  }
}

macro destruct {
  rule { (id $id) $k $o } => { $k $id = $o; }
  rule { (obj $obj ...) $k $o } => { $(destruct $obj $k $o) ... }
  rule { (obj_id $key $id $default) $k $o } => { $k $id = $o.$key != null ? $o.$key : $default; }
  rule { (obj_id $key $id) $k $o } => { $k $id = $o.$key; }
  rule { (obj_sub $key $p) $k $o } => { $k __o = $o.$key; destruct $p $k __o }
  rule { (arr $arr ...) $k $o } => { count_array ($arr ...) 0 $k $o }
  rule { (arr_id $id $default) $i $k $o } => { $k $id = $o[$i] != null ? $o[$i] : $default; }
  rule { (arr_id $id) $i $k $o } => { $k $id = $o[$i]; }
  rule { (arr_sub $p) $i $k $o } => { $k __a = $o[$i]; destruct $p $k __a }
  rule { (arr_slice $id) $i $k $o } => { $k $id = $o.slice($i); }
  rule { (elide) $i $k $o } => { }
}

let var = macro {
  rule { $pattern:ident in } => {
    var $pattern in
  }
  rule { $pattern:ident = $rhs:expr ;... } => {
    var $pattern = $rhs;
  }
  rule { $pattern:destructor = $rhs:expr ;... } => {
    var __ref = $rhs;
    destruct $pattern var __ref
  }
  rule { $pattern:ident ;... } => {
    var $pattern;
  }
}
export var;

let const = macro {
  rule { $pattern:ident = $rhs:expr ;... } => {
    var $pattern = $rhs;
  }
  rule { $pattern:destructor = $rhs:expr ;... } => {
    var __ref = $rhs;
    destruct $pattern var __ref
  }
}
export const;

let let = macro {
  rule { $pattern:ident = $rhs:expr ;... } => {
    var $pattern = $rhs;
  }
  rule { $pattern:destructor = $rhs:expr ;... } => {
    var __ref = $rhs;
    destruct $pattern var __ref
  }
  rule { $pattern:ident ;... } => {
    var $pattern;
  }
}
export let;
