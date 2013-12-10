'use strict';
var expect$569 = require('expect.js');
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
        function FooWithMethod$580() {
            Object.getPrototypeOf(FooWithMethod$580.prototype).constructor.call(this);
        }
        FooWithMethod$580.prototype.length = function length$581() {
            var x$593 = this.x;
            var y$597 = this.y;
            return x$593 * x$593 + y$597 * y$597;
        };
        function Foo$583(x$598, y$599) {
            this.x = x$598;
            this.y = y$599;
        }
        Foo$583.prototype.length = function length$581() {
            var x$603 = this.x;
            var y$607 = this.y;
            return x$603 * x$603 + y$607 * y$607;
        };
        Foo$583.prototype.getX = function getX$584() {
            return this.x;
        };
        Foo$583.prototype.getY = function getY$585() {
            return this.y;
        };
        var f$589 = new Foo$583(1, 2);
        expect$569(f$589.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$583(x$622) {
            this.fooX = x$622 + 5;
        }
        Foo$583.prototype.getX = function getX$584() {
            return this.fooX;
        };
        function Bar$612(x$623) {
            Object.getPrototypeOf(Bar$612.prototype).constructor.call(this, x$623);
            this.barX = x$623;
        }
        Bar$612.prototype = Object.create(Foo$583.prototype);
        Bar$612.prototype.getX = function getX$584() {
            return this.barX;
        };
        Bar$612.prototype.getFooX = function getFooX$613() {
            return Object.getPrototypeOf(Bar$612.prototype).getX.call(this);
        };
        Bar$612.prototype.nested = function nested$614() {
            if (true) {
                if (this.barX > 2) {
                    return Object.getPrototypeOf(Bar$612.prototype).getX.call(this);
                }
            }
            return 1;
        };
        Bar$612.prototype.nestedFunction = function nestedFunction$615() {
            var self$629 = this;
            function run() {
                if (true) {
                    return Object.getPrototypeOf(Bar$612.prototype).getX.call(self$629);
                }
            }
            return run();
        };
        Bar$612.prototype.getMethod = function getMethod$616() {
            return Object.getPrototypeOf(Bar$612.prototype).getX;
        };
        Bar$612.prototype.getMethod2 = function getMethod2$617() {
            return Object.getPrototypeOf(Bar$612.prototype)['getX'];
        };
        var b$621 = new Bar$612(5);
        expect$569(b$621.fooX).to.be(10);
        expect$569(b$621.barX).to.be(5);
        expect$569(b$621.getX()).to.be(5);
        expect$569(b$621.getFooX()).to.be(10);
        expect$569(b$621.nested()).to.be(10);
        expect$569(b$621.nestedFunction()).to.be(10);
        expect$569(expect$569(b$621.getMethod().call(b$621)).to.be(10));
        expect$569(expect$569(b$621.getMethod2().call(b$621)).to.be(10));
    });
});
//# sourceMappingURL=class.js.map