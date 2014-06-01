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
