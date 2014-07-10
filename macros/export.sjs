let export = macro {
  // https://github.com/mozilla/sweet.js/issues/288
  case { $export export ; } => { return #{export $export;} }

  // Unfortunately, sweet.js's use of `export` makes the simple single-ident form impossible (?) to implement
  //
  // case {
  //   $export_name $what:ident
  // } => {
  //   var module = makeIdent("module", #{$export_name});
  //   letstx $module = [module];
  //   return #{$module.exports.$what = $what}
  // }

  case {
    $export_name { $($what:ident) (,) ... }
  } => {
    var module = makeIdent("module", #{$export_name});
    letstx $module = [module];
    return #{$($module.exports.$what = $what) (;) ...}
  }

  case {
    $export_name default $what:ident
  } => {
    var module = makeIdent("module", #{$export_name});
    letstx $module = [module];
    return #{$module.exports['default'] = $what}
  }

  case {
    $export_name var $name:ident = $def:expr
  } => {
    var module = makeIdent("module", #{$export_name});
    letstx $module = [module];
    return #{
      var $name = $def;
      $module.exports.$name = $name
    }
  }

  case {
    $export_name default var $name:ident = $def:expr
  } => {
    var module = makeIdent("module", #{$export_name});
    letstx $module = [module];
    return #{
      var $name = $def;
      $module.exports['default'] = $name
    }
  }

  case {
    $export_name function $name:ident $params $body
  } => {
    var module = makeIdent("module", #{$export_name});
    letstx $module = [module];
    return #{
      function $name $params $body
      $module.exports.$name = $name;
    }
  }

  case {
    $export_name default function $name:ident $params $body
  } => {
    var module = makeIdent("module", #{$export_name});
    letstx $module = [module];
    return #{
      function $name $params $body
      $module.exports['default'] = $name;
    }
  }

  case {
    $export_name class $name:ident $body
  } => {
    var module = makeIdent("module", #{$export_name});
    letstx $module = [module];
    return #{
      class $name $body
      $module.exports.$name = $name;
    }
  }

  case {
    $export_name default class $name:ident $body
  } => {
    var module = makeIdent("module", #{$export_name});
    letstx $module = [module];
    return #{
      class $name $body
      $module.exports['default'] = $name;
    }
  }

  case { _ $macro_name; } => { return #{export $macro_name;} }
}

export export;
