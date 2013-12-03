'use strict';
var expect = require('expect.js');

macro testWithDecl {
    rule { $var $name } => {
        describe($name + ' keyword', function() {
            it('should handle normal declarations', function() {
                $var x;
                $var y = 5;
                $var w = function(){};
                $var z = x;
            });

            it('should basically work', function() {
                // basic destructuring
                $var {one, two} = { one: 1, two: 2 };
                expect(one).to.be(1);
                expect(two).to.be(2);

                $var [foo, bar] = [1, 2];
                expect(foo).to.be(1);
                expect(bar).to.be(2);
            });

            it('should rename', function() {
                // renaming
                $var { one: val1 } = { one: 1, two: 2 };
                expect(val1).to.be(1);
            });

            it('should set default values', function() {
                // default values
                $var {one = 1, two} = { two: 2 };
                expect(one).to.be(1);
                expect(two).to.be(2);
                
                $var [foo, bar = 2] = [1];
                expect(foo).to.be(1);
                expect(bar).to.be(2);
            });

            it('should handle multiple levels', function() {
                // multiple levels of destructuring
                $var [foo, {bar, baz}] = [1, { bar: 2, baz: 3 }];
                expect(foo).to.be(1);
                expect(bar).to.be(2);
                expect(baz).to.be(3);
                
                $var [one, {two, nums: [three, four]}] = [1, { two: 2, nums: [3, 4] }];
                expect(one).to.be(1);
                expect(two).to.be(2);
                expect(three).to.be(3);
                expect(four).to.be(4);
                
                $var { fiz, biz: [mum, dum] } = { biz: [8, 9], fiz: 5 };
                expect(fiz).to.be(5);
                expect(mum).to.be(8);
                expect(dum).to.be(9);

                // default values deep down
                $var [one_, {two_, three_ = 3000}] = [1, { two_: 2, three_: 3 }];
                expect(one_).to.be(1);
                expect(two_).to.be(2);
                expect(three_).to.be(3);
            });
        });
    }
}

testWithDecl var "var"
//testWithDecl let "let"
//testWithDecl const "const"
