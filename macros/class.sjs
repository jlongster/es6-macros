
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-class-definitions

macro install_super {
    rule { $parent { $before ... super() $after ... } } => {
        install_super $parent {
            $before ...
            $parent.call(this)
            $after ...
        }
    }

    rule { $parent { $before ... super($arg ...) $after ... } } => {
        install_super $parent {
            $before ...
            $parent.call(this, $arg ...)
            $after ...
        }
    }

    rule { $parent { $before ... super.$method() $after ... } } => {
        install_super $parent {
            $before ...
            $parent.prototype.$method.call(this)
            $after ...
        }
    }

    rule { $parent { $before ... super.$method($arg ...) $after ... } } => {
        install_super $parent {
            $before ...
            $parent.prototype.$method.call(this, $arg ...)
            $after ...
        }
    }

    rule { $parent { $body ... } } => {
        $body ...
    }

}

macro class {
    rule {
        $typename extends $parent {
            constructor $cparams $cbody
            $($mname $mparams $mbody) ...
        }
    } => {
        function $typename $cparams { install_super $parent $cbody }

        $typename.prototype = Object.create($parent.prototype);
        $($typename.prototype.$mname = function $mname $mparams 
          { install_super $parent $mbody };) ...
    }

    rule {
        $typename {
            constructor $cparams $cbody
            $($mname $mparams $mbody) ...
        }
    } => {
        function $typename $cparams $cbody

        $($typename.prototype.$mname = function $mname $mparams $mbody;) ...
    }

    rule {
        $typedef ... {
            $methods ...
        }
    } => {
        class $typedef ... {
            constructor() {}
            $methods ...
        }
    }
}
export class
