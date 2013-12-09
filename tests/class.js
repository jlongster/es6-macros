'use strict';
var expect$585 = require('expect.js');
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
        function FooWithMethod$596() {
        }
        FooWithMethod$596.prototype.length = function length$597() {
            var x$609 = this.x;
            var y$613 = this.y;
            return x$609 * x$609 + y$613 * y$613;
        };
        function Foo$599(x$614, y$615) {
            this.x = x$614;
            this.y = y$615;
        }
        Foo$599.prototype.length = function length$597() {
            var x$619 = this.x;
            var y$623 = this.y;
            return x$619 * x$619 + y$623 * y$623;
        };
        Foo$599.prototype.getX = function getX$600() {
            return this.x;
        };
        Foo$599.prototype.getY = function getY$601() {
            return this.y;
        };
        var f$605 = new Foo$599(1, 2);
        expect$585(f$605.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$599(x$638) {
            this.fooX = x$638 + 5;
        }
        Foo$599.prototype.getX = function getX$600() {
            return this.fooX;
        };
        function Bar$628(x$639) {
            Foo$599.call(this, x$639);
            this.barX = x$639;
        }
        Bar$628.prototype = Object.create(Foo$599.prototype);
        Bar$628.prototype.getX = function getX$600() {
            return this.barX;
        };
        Bar$628.prototype.getFooX = function getFooX$629() {
            return Object.getPrototypeOf(Object.getPrototypeOf(this)).getX.call(this);
        };
        Bar$628.prototype.nested = function nested$630() {
            if (true) {
                if (this.barX > 2) {
                    return Object.getPrototypeOf(Object.getPrototypeOf(this)).getX.call(this);
                }
            }
            return 1;
        };
        Bar$628.prototype.nestedFunction = function nestedFunction$631() {
            function run() {
                if (true) {
                    if (this.barX > 2) {
                        return Object.getPrototypeOf(Object.getPrototypeOf(this)).getX.call(this);
                    }
                }
            }
            return run.call(this);
        };
        Bar$628.prototype.getMethod = function getMethod$632() {
            return Object.getPrototypeOf(Object.getPrototypeOf(this)).getX;
        };
        Bar$628.prototype.getMethod2 = function getMethod2$633() {
            return Object.getPrototypeOf(Object.getPrototypeOf(this))['getX'];
        };
        var b$637 = new Bar$628(5);
        expect$585(b$637.fooX).to.be(10);
        expect$585(b$637.barX).to.be(5);
        expect$585(b$637.getX()).to.be(5);
        expect$585(b$637.getFooX()).to.be(10);
        expect$585(b$637.nested()).to.be(10);
        expect$585(b$637.nestedFunction()).to.be(10);
        expect$585(expect$585(b$637.getMethod().call(b$637)).to.be(10));
        expect$585(expect$585(b$637.getMethod2().call(b$637)).to.be(10));
    });
});
//# sourceMappingURL=class.js.map