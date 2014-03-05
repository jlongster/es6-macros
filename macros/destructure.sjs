
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
    $decl obj = $obj;
    $(destruct_objassign $decl $pattern obj) (;) ...
  }

  rule { $decl [ $pattern (,) ... ] $arr:expr } => {
    $decl arr = $arr;
    $decl i=0;
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
