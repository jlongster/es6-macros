"use strict";
var expect = require('expect.js');

describe('class', function() {
    it('should create a class', function() {
        class FooEmpty {
        }

        class FooSimple {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }
        }

        class FooWithMethod {
            length() {
                var x = this.x;
                var y = this.y;
                return x * x + y * y;
            }
        }

        class Foo {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            length() {
                var x = this.x;
                var y = this.y;
                return x * x + y * y;
            }

            getX() {
                return this.x;
            }

            getY() {
                return this.y;
            }
        }

        var f = new Foo(1, 2);
        expect(f.x).to.be(1);
    });

    it('should support super', function() {
        class Foo {
            constructor(x) {
                this.fooX = x + 5;
            }

            getX() {
                return this.fooX;
            }
        }

        class Bar extends Foo {
            constructor(x) {
                super(x);
                this.barX = x;
            }

            getX() {
                return this.barX;
            }

            getFooX() {
                return super.getX();
            }

            nested() {
                if(true) {
                    if(this.barX > 2) {
                        return super.getX();
                    }
                }

                return 1;
            }

            nestedFunction() {
                function run() {
                    if(true) {
                        return super.getX();
                    }
                }

                return run();
            }

            getMethod() {
                return super.getX;
            }

            getMethod2() {
                return super['getX'];
            }

        }

        var b = new Bar(5);
        expect(b.fooX).to.be(10);
        expect(b.barX).to.be(5);
        expect(b.getX()).to.be(5);
        expect(b.getFooX()).to.be(10);
        expect(b.nested()).to.be(10);
        expect(b.nestedFunction()).to.be(10);
        expect(expect(b.getMethod().call(b)).to.be(10));
        expect(expect(b.getMethod2().call(b)).to.be(10));
    });
});
