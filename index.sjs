
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-destructuring-assignment

macro destruct_objassign {
    rule { ($prop:ident : $pattern:expr = $default:expr) $obj:expr } => {
        destruct_next ($obj.$prop || $default) $pattern
    }

    rule { ($name:ident = $default:expr) $obj:expr } => {
        destruct_next ($obj.$name || $default) $name
    }

    rule { ($prop:ident : $pattern:expr) $obj:expr } => {
        destruct_next ($obj.$prop) $pattern
    }

    rule { ($name:ident) $obj:expr } => {
        destruct_next ($obj.$name) $name
    }

    rule { () $obj:expr } => {
        _noop
    }
}

macro destruct_arrassign {
    rule { ($pattern:expr = $default:expr) $arr $index } => {
        destruct_next ($arr[$index++] || $default) $pattern
    }

    rule { (.. $name:ident) $arr $index } => {
        destruct_next ($arr.slice($index)) $name
    }

    rule { ($pattern:expr) $arr $index } => {
        destruct_next ($arr[$index++]) $pattern
    }

    rule { () $arr $index } => {
        _noop
    }
}

macro destruct_finish {
    rule { { $pattern (,) ... } $obj:expr } => {
        obj = $obj, $(destruct_objassign $pattern obj) (,) ...
    }

    rule { [ $pattern (,) ... ] $arr:expr } => {
        arr = $arr, i=0, $(destruct_arrassign $pattern arr i) (,) ...
    }

    rule { $id $val:expr } => {
        $id = $val
    }
}

macro destruct_next {
    // wrap all fields in parentheses

    rule { $a $b ($acc ...), $prop:ident : $pattern:expr = $val:expr } => {
        destruct_next $a $b ($acc ... , ($prop: $pattern = $val))
    }

    rule { $a $b ($acc ...), $prop:ident : $pattern:expr } => {
        destruct_next $a $b ($acc ... , ($prop: $pattern))
    }

    rule { $a $b ($acc ...), $name:ident = $val:expr } => {
        destruct_next $a $b ($acc ... , ($name = $val))
    }

    rule { $a $b ($acc ...), $pattern:expr } => {
        destruct_next $a $b ($acc ... , ($pattern))
    }

    rule { $a $b ($acc ...), .. $name:ident} => {
        destruct_next $a $b ($acc ... , (.. $name))
    }

    rule { $a $b ($acc ...), } => {
        destruct_next $a $b ($acc ... , (_noop))
    }

    // pass along normalized object

    rule { ($obj:expr) {} ($acc ...) } => {
        destruct_finish { $acc ... } $obj
    }

    rule { ($obj:expr) [] ($acc ...) } => {
        destruct_finish [ $acc ... ] $obj
    }

    // strip out fields

    rule { $o { $field ... } } => {
        destruct_next $o {} (()), $field ...
    }

    rule { $o [ $field ... ] } => {
        destruct_next $o [] (()), $field ...
    }

    // pass normal expr along

    rule { ($obj:expr) $var:expr } => {
        destruct_finish $var $obj
    }
}

let var = macro {
    rule { $var:expr = $obj:expr } => {
        var destruct_next ($obj) $var
    }

    rule { $id } => {
        var $id
    }
}
export var

// sweet.js doesn't support let and const yet, but it should come very soon.

// let let = macro {
//     rule { $id = macro { $body ... } } => {
//         let $id = macro { $body ... }
//     }

//     rule { $var:expr = $obj:expr } => {
//         let destruct_next ($obj) $var
//     }

//     rule { $id } => {
//         let $id
//     }
// }
// export let

// let const = macro {
//     rule { $var:expr = $obj:expr } => {
//         const destruct_next ($obj) $var
//     }

//     rule { $id } => {
//         const $id
//     }
// }
// export const

// apply destructuring on functions arguments too

macro parse_arg {
    rule { ($args ...) ($acc ...) $body ([ $pattern ... ] $expr ...)} => {
        parse_arg ($args ... _tmp) ($acc ... var [$pattern ...] = _tmp;) $body ($expr ...)
    }

    rule { ($args ...) ($acc ...) $body ({ $pattern ... } $expr ...)} => {
        parse_arg ($args ... _tmp) ($acc ... var { $pattern ... } = _tmp;) $body ($expr ...)
    }

    rule { ($args ...) ($acc ...) $body (, $expr ...) } => {
        parse_arg ($args ... ,) ($acc ...) $body ($expr ...)
    }

    rule { ($args ...) ($acc ...) $body ($param $expr ...) } => {
        parse_arg ($args ... $param) ($acc ...) $body ($expr ...)
    }

    rule { $args ($acc ...) { $expr ... } () } => {
        $args {
            $acc ...
            $expr ...
        }
    }

    rule { $expr ... } => {
        _debug $expr ...
    }
}

let function = macro {
    rule { $id:ident ($param (,) ...) $body } => {
        function $id parse_arg () () $body ($param (,) ...)
    }

    rule { ($param (,) ...) $body } => {
        function parse_arg () () $body ($param (,) ...)
    }

}
export function


// TODO: ES6 classes