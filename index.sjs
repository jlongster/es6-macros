
macro _debug {
    case { $expr ... } => {
        function collapse(stx) {
            return stx.map(function(s) {
                if(s.token.inner) {
                    return s.token.value[0] +
                        collapse(s.token.inner) +
                        s.token.value[1];
                }

                return s.token.value;
            }).join(' ');
        }

        var stx = #{ $expr ... };
        var val = makeValue(collapse(stx), #{ctx});

        return withSyntax($val = [val]) {
            return #{$val}
        }
    }
}

// TODO:
// elision: var [,,,four] = arr;
// rest: var [foo, bar, ...rst] = arr;
// function args: function(foo, bar, { baz, poop }) {}

macro destruct_objassign {
    rule { ($prop:ident : $pattern:expr = $default:expr) $obj:expr } => {
        destruct_next ($obj.$prop || $default) $pattern
    }

    rule { ($id:ident = $default:expr) $obj:expr } => {
        destruct_next ($obj.$id || $default) $id
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
    rule { ($pattern:expr = $default:expr) $obj:expr } => {
        destruct_next ($obj || $default) $pattern
    }    

    rule { ($pattern:expr) $obj:expr } => {
        destruct_next ($obj) $pattern
    }    

    rule { () $obj:expr } => {
        _noop
    }
}

macro destruct_finish {
    rule { { $pattern (,) ... } $obj:expr } => {
        obj = $obj, $(destruct_objassign $pattern obj) (,) ...
    }

    rule { [ $pattern (,) ... ] $arr:expr } => {
        arr = $arr, i=0, $(destruct_arrassign $pattern arr[i++]) (,) ...
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


// TODO: ES6 classes