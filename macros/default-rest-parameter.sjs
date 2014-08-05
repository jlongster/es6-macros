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
