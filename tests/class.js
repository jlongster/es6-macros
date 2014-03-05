'use strict';
var expect$702 = require('expect.js');
describe('class', function () {
    it('should create a class', function () {
        function FooEmpty$706() {
            Object.getPrototypeOf(FooEmpty$706.prototype).constructor.call(this);
        }
        function FooSimple$708(x$719, y$720) {
            this.x = x$719;
            this.y = y$720;
        }
        function FooWithMethod$712() {
            Object.getPrototypeOf(FooWithMethod$712.prototype).constructor.call(this);
        }
        FooWithMethod$712.prototype.length = function length() {
            var x$724 = this.x;
            var y$728 = this.y;
            return x$724 * x$724 + y$728 * y$728;
        };
        function Foo$714(x$729, y$730) {
            this.x = x$729;
            this.y = y$730;
        }
        Foo$714.prototype.length = function length() {
            var x$734 = this.x;
            var y$738 = this.y;
            return x$734 * x$734 + y$738 * y$738;
        };
        Foo$714.prototype.getX = function getX() {
            return this.x;
        };
        Foo$714.prototype.getY = function getY() {
            return this.y;
        };
        var f$718 = new Foo$714(1, 2);
        expect$702(f$718.x).to.be(1);
    });
    it('should support super', function () {
        function Foo$740(x$747) {
            this.fooX = x$747 + 5;
        }
        Foo$740.prototype.getX = function getX() {
            return this.fooX;
        };
        function Bar$742(x$748) {
            Object.getPrototypeOf(Bar$742.prototype).constructor.call(this, x$748);
            this.barX = x$748;
        }
        Bar$742.prototype = Object.create(Foo$740.prototype);
        Bar$742.prototype.getX = function getX() {
            return this.barX;
        };
        Bar$742.prototype.getFooX = function getFooX() {
            return Object.getPrototypeOf(Bar$742.prototype).getX.call(this);
        };
        Bar$742.prototype.nested = function nested() {
            if (true) {
                if (this.barX > 2) {
                    return Object.getPrototypeOf(Bar$742.prototype).getX.call(this);
                }
            }
            return 1;
        };
        Bar$742.prototype.nestedFunction = function nestedFunction() {
            var self$754 = this;
            function run$755() {
                if (true) {
                    return Object.getPrototypeOf(Bar$742.prototype).getX.call(self$754);
                }
            }
            return run$755();
        };
        Bar$742.prototype.getMethod = function getMethod() {
            return Object.getPrototypeOf(Bar$742.prototype).getX;
        };
        Bar$742.prototype.getMethod2 = function getMethod2() {
            return Object.getPrototypeOf(Bar$742.prototype)['getX'];
        };
        var b$746 = new Bar$742(5);
        expect$702(b$746.fooX).to.be(10);
        expect$702(b$746.barX).to.be(5);
        expect$702(b$746.getX()).to.be(5);
        expect$702(b$746.getFooX()).to.be(10);
        expect$702(b$746.nested()).to.be(10);
        expect$702(b$746.nestedFunction()).to.be(10);
        expect$702(expect$702(b$746.getMethod().call(b$746)).to.be(10));
        expect$702(expect$702(b$746.getMethod2().call(b$746)).to.be(10));
    });
});