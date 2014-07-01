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

macro destruct {
  rule { (id $id) $k $o } => { $k $id = $o; }
  rule { (obj $obj ...) $k $o } => { $(destruct $obj $k $o) ... }
  rule { (obj_id $key $id $default) $k $o } => { $k $id = $o.$key != null ? $o.$key : $default; }
  rule { (obj_id $key $id) $k $o } => { $k $id = $o.$key; }
  rule { (obj_sub $key $p) $k $o } => { $k __o = $o.$key; destruct $p $k __o }
  rule { (arr $arr ...) $k $o } => { var i = 0; $(destruct $arr i $k $o) ... }
  rule { (arr_id $id $default) $i $k $o } => { $k $id = $o[$i] != null ? $o[$i] : $default; $i++; }
  rule { (arr_id $id) $i $k $o } => { $k $id = $o[$i++]; }
  rule { (arr_sub $p) $i $k $o } => { $k __a = $o[$i++]; destruct $p $k __a }
  rule { (arr_slice $id) $i $k $o } => { $k $id = $o.slice($i); }
  rule { (elide) $i $k $o } => { $i++; }
}

let var = macro {
  rule { $pattern:destructor = $rhs:expr ;... } => {
    var __ref = $rhs;
    destruct $pattern var __ref
  }
}
export var;

let const = macro {
  rule { $pattern:destructor = $rhs:expr ;... } => {
    var __ref = $rhs;
    destruct $pattern const __ref
  }
}
export const;

let let = macro {
  rule { $pattern:destructor = $rhs:expr ;... } => {
    var __ref = $rhs;
    destruct $pattern let __ref
  }
}
export let;
