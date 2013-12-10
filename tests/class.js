'use strict';
var expect$591 = require('expect.js');
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
        function FooWithMethod$602() {
        }
        FooWithMethod$602.prototype.length = function length$603() {
            var x$615 = this.x;
            var y$619 = this.y;
            return x$615 * x$615 + y$619 * y$619;
        };
        function Foo$605(x$620, y$621) {
            this.x = x$620;
            this.y = y$621;
        }
        Foo$605.prototype.length = function length$603() {
            var x$625 = this.x;
            var y$629 = this.y;
            return x$625 * x$625 + y$629 * y$629;
        };
        Foo$605.prototype.getX = function getX$606() {
            return this.x;
        };
        Foo$605.prototype.getY = function getY$607() {
            return this.y;
        };
        var f$611 = new Foo$605(1, 2);
        expect$591(f$611.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$605(x$644) {
            this.fooX = x$644 + 5;
        }
        Foo$605.prototype.getX = function getX$606() {
            return this.fooX;
        };
        function Bar$634(x$645) {
            $parent.call(this, x$645);
            this.barX = x$645;
        }
        Bar$634.prototype = Object.create(Foo$605.prototype);
        Bar$634.prototype.getX = function getX$606() {
            return this.barX;
        };
        Bar$634.prototype.getFooX = function getFooX$635() {
            return Object.getPrototypeOf(Bar$634.prototype).getX.call(this);
        };
        Bar$634.prototype.nested = function nested$636() {
            if (true) {
                if (this.barX > 2) {
                    return Object.getPrototypeOf(Bar$634.prototype).getX.call(this);
                }
            }
            return 1;
        };
        Bar$634.prototype.nestedFunction = function nestedFunction$637() {
            var self$651 = this;
            function run() {
                if (true) {
                    return Object.getPrototypeOf(Bar$634.prototype).getX.call(self$651);
                }
            }
            run.call(this);
        };
        Bar$634.prototype.getMethod = function getMethod$638() {
            return Object.getPrototypeOf(Bar$634.prototype).getX;
        };
        Bar$634.prototype.getMethod2 = function getMethod2$639() {
            return Object.getPrototypeOf(Bar$634.prototype)['getX'];
        };
        var b$643 = new Bar$634(5);
        expect$591(b$643.fooX).to.be(10);
        expect$591(b$643.barX).to.be(5);
        expect$591(b$643.getX()).to.be(5);
        expect$591(b$643.getFooX()).to.be(10);
        expect$591(b$643.nested()).to.be(10);
        expect$591(b$643.nestedFunction()).to.be(10);
        expect$591(expect$591(b$643.getMethod().call(b$643)).to.be(10));
        expect$591(expect$591(b$643.getMethod2().call(b$643)).to.be(10));
    });
});
//# sourceMappingURL=class.js.map