'use strict';
var expect$569 = require('expect.js');
describe('class', function () {
    it('should create a class', function () {
        // next 2 cases don't work until this bug is fixed:
        // https://github.com/mozilla/sweet.js/issues/147
        function FooEmpty$580() {
            Object.getPrototypeOf(FooEmpty$580.prototype).constructor.call(this);
        }
        function FooSimple$582(x$596, y$597) {
            this.x = x$596;
            this.y = y$597;
        }
        function FooWithMethod$586() {
            Object.getPrototypeOf(FooWithMethod$586.prototype).constructor.call(this);
        }
        FooWithMethod$586.prototype.length = function length$587() {
            var x$601 = this.x;
            var y$605 = this.y;
            return x$601 * x$601 + y$605 * y$605;
        };
        function Foo$589(x$606, y$607) {
            this.x = x$606;
            this.y = y$607;
        }
        Foo$589.prototype.length = function length$587() {
            var x$611 = this.x;
            var y$615 = this.y;
            return x$611 * x$611 + y$615 * y$615;
        };
        Foo$589.prototype.getX = function getX$590() {
            return this.x;
        };
        Foo$589.prototype.getY = function getY$591() {
            return this.y;
        };
        var f$595 = new Foo$589(1, 2);
        expect$569(f$595.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$589(x$630) {
            this.fooX = x$630 + 5;
        }
        Foo$589.prototype.getX = function getX$590() {
            return this.fooX;
        };
        function Bar$620(x$631) {
            Object.getPrototypeOf(Bar$620.prototype).constructor.call(this, x$631);
            this.barX = x$631;
        }
        Bar$620.prototype = Object.create(Foo$589.prototype);
        Bar$620.prototype.getX = function getX$590() {
            return this.barX;
        };
        Bar$620.prototype.getFooX = function getFooX$621() {
            return Object.getPrototypeOf(Bar$620.prototype).getX.call(this);
        };
        Bar$620.prototype.nested = function nested$622() {
            if (true) {
                if (this.barX > 2) {
                    return Object.getPrototypeOf(Bar$620.prototype).getX.call(this);
                }
            }
            return 1;
        };
        Bar$620.prototype.nestedFunction = function nestedFunction$623() {
            var self$637 = this;
            function run() {
                if (true) {
                    return Object.getPrototypeOf(Bar$620.prototype).getX.call(self$637);
                }
            }
            return run();
        };
        Bar$620.prototype.getMethod = function getMethod$624() {
            return Object.getPrototypeOf(Bar$620.prototype).getX;
        };
        Bar$620.prototype.getMethod2 = function getMethod2$625() {
            return Object.getPrototypeOf(Bar$620.prototype)['getX'];
        };
        var b$629 = new Bar$620(5);
        expect$569(b$629.fooX).to.be(10);
        expect$569(b$629.barX).to.be(5);
        expect$569(b$629.getX()).to.be(5);
        expect$569(b$629.getFooX()).to.be(10);
        expect$569(b$629.nested()).to.be(10);
        expect$569(b$629.nestedFunction()).to.be(10);
        expect$569(expect$569(b$629.getMethod().call(b$629)).to.be(10));
        expect$569(expect$569(b$629.getMethod2().call(b$629)).to.be(10));
    });
});
//# sourceMappingURL=class.js.map