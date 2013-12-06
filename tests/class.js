'use strict';
var expect$410 = require('expect.js');
describe('class', function () {
    it('should create a class', function () {
        // next 2 cases don't work until this bug is fixed:
        // https://github.com/mozilla/sweet.js/issues/147
        // class FooEmpty {
        // }
        // class FooSimple {
        //     constructor(x, y) {
        //         this.x = x;
        //         this.y = y;
        //     }
        // }
        function FooWithMethod() {
        }
        FooWithMethod.prototype.length = function length() {
            var obj = this, _noop, x$455 = obj.x, y$456 = obj.y;
            return x$455 * x$455 + y$456 * y$456;
        };
        function Foo(x$455, y$456) {
            this.x = x$455;
            this.y = y$456;
        }
        Foo.prototype.length = function length() {
            var obj = this, _noop, x$455 = obj.x, y$456 = obj.y;
            return x$455 * x$455 + y$456 * y$456;
        };
        Foo.prototype.getX = function getX() {
            return this.x;
        };
        Foo.prototype.getY = function getY() {
            return this.y;
        };
        var f$439 = new Foo(1, 2);
        expect$410(f$439.x).to.be(1);
    });
    it('should support super', function () {
        function Foo(x$455) {
            this.fooX = x$455 + 5;
        }
        Foo.prototype.getX = function getX() {
            return this.fooX;
        };
        function Bar(x$455) {
            Foo.call(this, x$455);
            this.barX = x$455;
        }
        Bar.prototype = Object.create(Foo.prototype);
        Bar.prototype.getX = function getX() {
            return this.barX;
        };
        Bar.prototype.getFooX = function getFooX() {
            return Foo.prototype.getX.call(this);
        };
        var b$491 = new Bar(5);
        expect$410(b$491.fooX).to.be(10);
        expect$410(b$491.barX).to.be(5);
        expect$410(b$491.getX()).to.be(5);
        expect$410(b$491.getFooX()).to.be(10);
    });
});
//# sourceMappingURL=class.js.map