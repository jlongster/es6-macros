'use strict';
var expect$679 = require('expect.js');
describe('class', function () {
    it('should create a class', function () {
        function FooEmpty$683() {
            Object.getPrototypeOf(FooEmpty$683.prototype).constructor.call(this);
        }
        function FooSimple$685(x$699, y$700) {
            this.x = x$699;
            this.y = y$700;
        }
        function FooWithMethod$689() {
            Object.getPrototypeOf(FooWithMethod$689.prototype).constructor.call(this);
        }
        FooWithMethod$689.prototype.length = function length$690() {
            var x$704 = this.x;
            var y$708 = this.y;
            return x$704 * x$704 + y$708 * y$708;
        };
        function Foo$692(x$709, y$710) {
            this.x = x$709;
            this.y = y$710;
        }
        Foo$692.prototype.length = function length$690() {
            var x$714 = this.x;
            var y$718 = this.y;
            return x$714 * x$714 + y$718 * y$718;
        };
        Foo$692.prototype.getX = function getX$693() {
            return this.x;
        };
        Foo$692.prototype.getY = function getY$694() {
            return this.y;
        };
        var f$698 = new Foo$692(1, 2);
        expect$679(f$698.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$720(x$733) {
            this.fooX = x$733 + 5;
        }
        Foo$720.prototype.getX = function getX$721() {
            return this.fooX;
        };
        function Bar$723(x$734) {
            Object.getPrototypeOf(Bar$723.prototype).constructor.call(this, x$734);
            this.barX = x$734;
        }
        Bar$723.prototype = Object.create(Foo$720.prototype);
        Bar$723.prototype.getX = function getX$721() {
            return this.barX;
        };
        Bar$723.prototype.getFooX = function getFooX$724() {
            return Object.getPrototypeOf(Bar$723.prototype).getX.call(this);
        };
        Bar$723.prototype.nested = function nested$725() {
            if (true) {
                if (this.barX > 2) {
                    return Object.getPrototypeOf(Bar$723.prototype).getX.call(this);
                }
            }
            return 1;
        };
        Bar$723.prototype.nestedFunction = function nestedFunction$726() {
            var self$740 = this;
            function run$741() {
                if (true) {
                    return Object.getPrototypeOf(Bar$723.prototype).getX.call(self$740);
                }
            }
            return run$741();
        };
        Bar$723.prototype.getMethod = function getMethod$727() {
            return Object.getPrototypeOf(Bar$723.prototype).getX;
        };
        Bar$723.prototype.getMethod2 = function getMethod2$728() {
            return Object.getPrototypeOf(Bar$723.prototype)['getX'];
        };
        var b$732 = new Bar$723(5);
        expect$679(b$732.fooX).to.be(10);
        expect$679(b$732.barX).to.be(5);
        expect$679(b$732.getX()).to.be(5);
        expect$679(b$732.getFooX()).to.be(10);
        expect$679(b$732.nested()).to.be(10);
        expect$679(b$732.nestedFunction()).to.be(10);
        expect$679(expect$679(b$732.getMethod().call(b$732)).to.be(10));
        expect$679(expect$679(b$732.getMethod2().call(b$732)).to.be(10));
    });
});