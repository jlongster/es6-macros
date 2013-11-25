
// TODO:
// elision: var [,,,four] = arr;
// rest: var [foo, bar, ...rst] = arr;
// function args: function(foo, bar, { baz, poop }) {}

macro destruct__objassign {
    rule { $declare ($prop:ident : $pattern:expr = $default:expr) $obj:expr } => {
        next $declare ($obj.$prop || $default) $pattern
    }

    rule { $declare ($id:ident = $default:expr) $obj:expr } => {
        next $declare ($obj.$id || $default) $id
    }

    rule { $declare ($prop:ident : $pattern:expr) $obj:expr } => {
        next $declare ($obj.$prop) $pattern
    }

    rule { $declare ($name:ident) $obj:expr } => {
        next $declare ($obj.$name) $name
    }
}

macro destruct__arrassign {
    rule { $declare ($pattern:expr = $default:expr) $obj:expr } => {
        next $declare ($obj || $default) $pattern
    }    

    rule { $declare ($pattern:expr) $obj:expr } => {
        next $declare ($obj) $pattern
    }    
}

macro finish {
    rule { $declare { $pattern ... } $obj:expr } => {
        var obj = $obj;
        $(destruct__objassign $declare $pattern obj) ...
    }

    rule { $declare [ $pattern ... ] $arr:expr } => {
        var arr = $arr;
        var i = 0;
        
        $(destruct__arrassign $declare $pattern arr[i++]) ...
    }

    rule { $declare $id $val:expr } => {
        $declare $id = $val;
    }
}

macro next {
    // wrap all fields in parentheses

    rule { $a $b $c ($acc ...), $prop:ident : $pattern:expr = $val:expr } => {
        next $a $b $c ($acc ... ($prop: $pattern = $val))
    }

    rule { $a $b $c ($acc ...), $prop:ident : $pattern:expr } => {
        next $a $b $c ($acc ... ($prop: $pattern))
    }

    rule { $a $b $c ($acc ...), $name:ident = $val:expr } => {
        next $a $b $c ($acc ... ($name = $val))
    }

    rule { $a $b $c ($acc ...), $pattern:expr } => {
        next $a $b $c ($acc ... ($pattern))
    }

    // pass along normalized object

    rule { $declare ($obj:expr) {} ($acc ...) } => {
        finish $declare { $acc ... } $obj
    }

    rule { $declare ($obj:expr) [] ($acc ...) } => {
        finish $declare [ $acc ... ] $obj
    }

    // strip out fields

    rule { $declare $o { $field ... } } => {
        next $declare $o {} (), $field ...
    }

    rule { $declare $o [ $field ... ] } => {
        next $declare $o [] (), $field ...
    }

    // pass normal expr along

    rule { $declare ($obj:expr) $var:expr } => {
        finish $declare $var $obj
    }
}

let var = macro {
    rule { $var:expr = $obj:expr } => {
        next var ($obj) $var
    }
}

let let = macro {
    rule { $id = macro { $body ... } } => { 
        let $id = macro { $body ... }
    }

    rule { $var:expr = $obj:expr } => {
        next let ($obj) $var
    }
}

let const = macro {
    rule { $var:expr = $obj:expr } => {
        next const ($obj) $var
    }
}


// TODO: ES6 classes