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
