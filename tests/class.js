//"use strict";
var expect$568 = require('expect.js');
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
        function FooWithMethod$579() {
        }
        FooWithMethod$579.prototype.length = function length$580() {
            var x$592 = this.x;
            var y$596 = this.y;
            return x$592 * x$592 + y$596 * y$596;
        };
        function Foo$582(x$597, y$598) {
            this.x = x$597;
            this.y = y$598;
        }
        Foo$582.prototype.length = function length$580() {
            var x$602 = this.x;
            var y$606 = this.y;
            return x$602 * x$602 + y$606 * y$606;
        };
        Foo$582.prototype.getX = function getX$583() {
            return this.x;
        };
        Foo$582.prototype.getY = function getY$584() {
            return this.y;
        };
        var f$588 = new Foo$582(1, 2);
        expect$568(f$588.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$582(x$618) {
            this.fooX = x$618 + 5;
        }
        Foo$582.prototype.getX = function getX$583() {
            return this.fooX;
        };
        function Bar$611(x$619) {
            Foo$582.call(this, x$619);
            this.barX = x$619;
        }
        Bar$611.prototype = Object.create(Foo$582.prototype);
        Bar$611.prototype.getX = function getX$583() {
            return this.barX;
        };
        Bar$611.prototype.getFooX = function getFooX$612() {
            return Foo$582.prototype.getX.call(this);
        };
        Bar$611.prototype.complicated = function complicated$613() {
            if (this.barX > 2) {
                return Foo$582.prototype.getX.call(this);
            }
            return 1;
        };
        var b$617 = new Bar$611(5);
        expect$568(b$617.fooX).to.be(10);
        expect$568(b$617.barX).to.be(5);
        expect$568(b$617.getX()).to.be(5);
        expect$568(b$617.getFooX()).to.be(10);
        expect$568(b$617.complicated()).to.be(10);
    });
});
//# sourceMappingURL=class.js.map