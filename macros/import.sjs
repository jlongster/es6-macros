macroclass alias_pair {
  pattern {
    rule { $from:ident as $to:ident }
  }
  pattern { 
    rule { $from:ident }
    with $to = #{ $from };
  }
}

macro import {
  case {
    $import_name * as $what:ident from $where:expr
  } => {
    var require = makeIdent("require", #{$import_name});
    letstx $require = [require];
    return #{var $what = $require($where)}
  }

  case {
    $import_name $what:ident from $where:expr
  } => {
    var require = makeIdent("require", #{$import_name});
    letstx $require = [require];
    return #{var $what = $require($where)['default']}
  }

  case {
    $import_name { $($what:alias_pair) (,) ... } from $where:expr
  } => {
    var require = makeIdent("require", #{$import_name});
    letstx $require = [require];
    return #{
      var __dep = $require($where);
      $(var $what$to = __dep.$what$from) (;) ...
    }
  }

  case {
    $import_name $default:ident, { $($what:alias_pair) (,) ... } from $where:expr
  } => {
    var require = makeIdent("require", #{$import_name});
    letstx $require = [require];
    return #{
      var __dep = $require($where);
      var $default = __dep['default'];
      $(var $what$to = __dep.$what$from) (;) ...
    }
  }

  case {
    $import_name $what:expr
  } => {
    var require = makeIdent("require", #{$import_name});
    letstx $require = [require];
    return #{
      $require($what);
    }
  }
}

export import;
