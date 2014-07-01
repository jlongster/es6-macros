macro bind_args {
  case { $ctx $args $body ... } => {
    var stx = #{ $body ... };
    var args = #{ $args };
    
    function walk(stx) {
      for(var i=0; i<stx.length; i++) {
        var s = stx[i];
        if(s.token.type === parser.Token.Identifier &&
           s.token.value === 'arguments') {
          stx[i] = args[0];
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
  case infix { ($arg (,) ...) | $ctx {$body ...} } => {
    letstx $args = [makeIdent('__fa_args', #{$ctx})];
    return #{
      function($args, $arg (,) ...) {
        bind_args $args $body ...
      }.bind(this, arguments)
    }
  }
  case infix { $arg:ident | $ctx {$body ...} } => {
    letstx $args = [makeIdent('__fa_args', #{$ctx})];
    return #{
      function($args, $arg) {
        bind_args $args $body ...
      }.bind(this, arguments)
    }
  }
  case infix { ($arg (,) ...) | $ctx $guard:expr } => {
    letstx $args = [makeIdent('__fa_args', #{$ctx})];
    return #{
      function ($args, $arg (,) ...) {
        return bind_args $args $guard;
      }.bind(this, arguments)
    }
  }
  case infix { $arg:ident | $ctx $guard:expr } => {
    letstx $args = [makeIdent('__fa_args', #{$ctx})];
    return #{
      function($args, $arg) {
        return bind_args $args $guard;
      }.bind(this, arguments)
    }
  }
}

export =>
