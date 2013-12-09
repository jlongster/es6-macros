'use strict';
var expect$565 = require('expect.js');
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
        function FooWithMethod$576() {
        }
        FooWithMethod$576.prototype.length = function length$577() {
            var x$589 = this.x;
            var y$593 = this.y;
            return x$589 * x$589 + y$593 * y$593;
        };
        function Foo$579(x$594, y$595) {
            this.x = x$594;
            this.y = y$595;
        }
        Foo$579.prototype.length = function length$577() {
            var x$599 = this.x;
            var y$603 = this.y;
            return x$599 * x$599 + y$603 * y$603;
        };
        Foo$579.prototype.getX = function getX$580() {
            return this.x;
        };
        Foo$579.prototype.getY = function getY$581() {
            return this.y;
        };
        var f$585 = new Foo$579(1, 2);
        expect$565(f$585.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$579(x$618) {
            this.fooX = x$618 + 5;
        }
        Foo$579.prototype.getX = function getX$580() {
            return this.fooX;
        };
        function Bar$608(x$619) {
            Foo$579.call(this, x$619);
            this.barX = x$619;
        }
        Bar$608.prototype = Object.create(Foo$579.prototype);
        Bar$608.prototype.getX = function getX$580() {
            return this.barX;
        };
        Bar$608.prototype.getFooX = function getFooX$609() {
            return Foo$579.prototype.getX.call(this);
        };
        Bar$608.prototype.nested = function nested$610() {
            if (true) {
                if (this.barX > 2) {
                    return Foo$579.prototype.getX.call(this);
                }
            }
            return 1;
        };
        Bar$608.prototype.nestedFunction = function nestedFunction$611() {
            function run() {
                if (true) {
                    if (this.barX > 2) {
                        return super.getX();
                    }
                }
            }
            run();
        };
        Bar$608.prototype.getMethod = function getMethod$612() {
            return Foo$579.prototype.getX;
        };
        Bar$608.prototype.getMethod2 = function getMethod2$613() {
            return Foo$579.prototype['getX'];
        };
        var b$617 = new Bar$608(5);
        expect$565(b$617.fooX).to.be(10);
        expect$565(b$617.barX).to.be(5);
        expect$565(b$617.getX()).to.be(5);
        expect$565(b$617.getFooX()).to.be(10);
        expect$565(b$617.nested()).to.be(10);
        expect$565(expect$565(b$617.getMethod().call(b$617)).to.be(10));
        expect$565(expect$565(b$617.getMethod2().call(b$617)).to.be(10));
    });
});
//# sourceMappingURL=class.js.map