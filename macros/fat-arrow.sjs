macro disable_arguments {
  case { $ctx $body ... } => {
    var stx = #{ $body ... };

    function walk(stx) {
      for(var i=0; i<stx.length; i++) {
        var s = stx[i];
        if(s.token.type === parser.Token.Identifier &&
           s.token.value === 'arguments') {
          throwSyntaxError('=>', 'cannot access arguments', s);
        }
        else if(s.token.type === parser.Token.Delimiter) {
          walk(s.token.inner);
        }
      }
    }

    walk(stx);
    return stx;
  }
}

macro => {
  rule infix { ($arg (,) ...) | {$body ...} } => {
    function($arg (,) ...) {
      disable_arguments $body ...
    }.bind(this)
  }
  rule infix { $arg:ident | {$body ...} } => {
    function($arg) {
      disable_arguments $body ...
    }.bind(this)
  }
  rule infix { ($arg (,) ...) | $guard:expr } => {
    function($arg (,) ...) {
      return disable_arguments $guard;
    }.bind(this)
  }
  rule infix { $arg:ident | $guard:expr } => {
    function($arg) {
      return disable_arguments $guard;
    }.bind(this)
  }
}

export =>
