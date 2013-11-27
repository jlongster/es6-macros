
// TODO:
// elision: var [,,,four] = arr;
// rest: var [foo, bar, ...rst] = arr;
// function args: function(foo, bar, { baz, poop }) {}

macro destruct_objassign {
    rule { $declare ($prop:ident : $pattern:expr = $default:expr) $obj:expr } => {
        destruct_next $declare ($obj.$prop || $default) $pattern
    }

    rule { $declare ($id:ident = $default:expr) $obj:expr } => {
        destruct_next $declare ($obj.$id || $default) $id
    }

    rule { $declare ($prop:ident : $pattern:expr) $obj:expr } => {
        destruct_next $declare ($obj.$prop) $pattern
    }

    rule { $declare ($name:ident) $obj:expr } => {
        destruct_next $declare ($obj.$name) $name
    }
}

macro destruct_arrassign {
    rule { $declare ($pattern:expr = $default:expr) $obj:expr } => {
        destruct_next $declare ($obj || $default) $pattern
    }    

    rule { $declare ($pattern:expr) $obj:expr } => {
        destruct_next $declare ($obj) $pattern
    }    
}

macro destruct_finish {
    rule { $declare { $pattern ... } $obj:expr } => {
        var obj = $obj;
        $(destruct_objassign $declare $pattern obj) ...
    }

    rule { $declare [ $pattern ... ] $arr:expr } => {
        var arr = $arr;
        var i = 0;
        
        $(destruct_arrassign $declare $pattern arr[i++]) ...
    }

    rule { $declare $id $val:expr } => {
        $declare $id = $val;
    }
}

macro destruct_next {
    // wrap all fields in parentheses

    rule { $a $b $c ($acc ...), $prop:ident : $pattern:expr = $val:expr } => {
        destruct_next $a $b $c ($acc ... ($prop: $pattern = $val))
    }

    rule { $a $b $c ($acc ...), $prop:ident : $pattern:expr } => {
        destruct_next $a $b $c ($acc ... ($prop: $pattern))
    }

    rule { $a $b $c ($acc ...), $name:ident = $val:expr } => {
        destruct_next $a $b $c ($acc ... ($name = $val))
    }

    rule { $a $b $c ($acc ...), $pattern:expr } => {
        destruct_next $a $b $c ($acc ... ($pattern))
    }

    // pass along normalized object

    rule { $declare ($obj:expr) {} ($acc ...) } => {
        destruct_finish $declare { $acc ... } $obj
    }

    rule { $declare ($obj:expr) [] ($acc ...) } => {
        destruct_finish $declare [ $acc ... ] $obj
    }

    // strip out fields

    rule { $declare $o { $field ... } } => {
        destruct_next $declare $o {} (), $field ...
    }

    rule { $declare $o [ $field ... ] } => {
        destruct_next $declare $o [] (), $field ...
    }

    // pass normal expr along

    rule { $declare ($obj:expr) $var:expr } => {
        destruct_finish $declare $var $obj
    }
}

let var = macro {
    // todo: handle multiple cases
    rule { $var:expr = $obj:expr ; } => {
        destruct_next var ($obj) $var
    }
}
export var

let let = macro {
    rule { $id = macro { $body ... } } => { 
        let $id = macro { $body ... }
    }

    rule { $var:expr = $obj:expr } => {
        destruct_next let ($obj) $var
    }
}
export let

let const = macro {
    rule { $var:expr = $obj:expr } => {
        destruct_next const ($obj) $var
    }
}
export const
