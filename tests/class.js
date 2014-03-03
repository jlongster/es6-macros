'use strict';
var expect$664 = require('expect.js');
describe('class', function () {
    it('should create a class', function () {
        function FooEmpty$668() {
            Object.getPrototypeOf(FooEmpty$668.prototype).constructor.call(this);
        }
        function FooSimple$670(x$679, y$680) {
            this.x = x$679;
            this.y = y$680;
        }
        function FooWithMethod$674() {
            Object.getPrototypeOf(FooWithMethod$674.prototype).constructor.call(this);
        }
        FooWithMethod$674.prototype.length = function length() {
            var x$682 = this.x;
            var y$684 = this.y;
            return x$682 * x$682 + y$684 * y$684;
        };
        function Foo$676(x$685, y$686) {
            this.x = x$685;
            this.y = y$686;
        }
        Foo$676.prototype.length = function length() {
            var x$688 = this.x;
            var y$690 = this.y;
            return x$688 * x$688 + y$690 * y$690;
        };
        Foo$676.prototype.getX = function getX() {
            return this.x;
        };
        Foo$676.prototype.getY = function getY() {
            return this.y;
        };
        var f$678 = new Foo$676(1, 2);
        expect$664(f$678.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$692(x$697) {
            this.fooX = x$697 + 5;
        }
        Foo$692.prototype.getX = function getX() {
            return this.fooX;
        };
        function Bar$694(x$698) {
            Object.getPrototypeOf(Bar$694.prototype).constructor.call(this, x$698);
            this.barX = x$698;
        }
        Bar$694.prototype = Object.create(Foo$692.prototype);
        Bar$694.prototype.getX = function getX() {
            return this.barX;
        };
        Bar$694.prototype.getFooX = function getFooX() {
            return Object.getPrototypeOf(Bar$694.prototype).getX.call(this);
        };
        Bar$694.prototype.nested = function nested() {
            if (true) {
                if (this.barX > 2) {
                    return Object.getPrototypeOf(Bar$694.prototype).getX.call(this);
                }
            }
            return 1;
        };
        Bar$694.prototype.nestedFunction = function nestedFunction() {
            var self$704 = this;
            function run$705() {
                if (true) {
                    return Object.getPrototypeOf(Bar$694.prototype).getX.call(self$704);
                }
            }
            return run$705();
        };
        Bar$694.prototype.getMethod = function getMethod() {
            return Object.getPrototypeOf(Bar$694.prototype).getX;
        };
        Bar$694.prototype.getMethod2 = function getMethod2() {
            return Object.getPrototypeOf(Bar$694.prototype)['getX'];
        };
        var b$696 = new Bar$694(5);
        expect$664(b$696.fooX).to.be(10);
        expect$664(b$696.barX).to.be(5);
        expect$664(b$696.getX()).to.be(5);
        expect$664(b$696.getFooX()).to.be(10);
        expect$664(b$696.nested()).to.be(10);
        expect$664(b$696.nestedFunction()).to.be(10);
        expect$664(expect$664(b$696.getMethod().call(b$696)).to.be(10));
        expect$664(expect$664(b$696.getMethod2().call(b$696)).to.be(10));
    });
});