
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-class-definitions

macro class_method {

}

macro class {
    rule {
        $typename {
             $($name $params $body) ...
        }
    } => {
        function $typename $cparams $cbody

        $($typename.prototype.$mname = function $mname $mparams $mbody;) ...
    }
}

class Foo {
    constructor(x, y, z) {
    }

    calc(w) {
        console.log(w);
    }
}
