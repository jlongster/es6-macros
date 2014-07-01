'use strict';
var expect = require('expect.js');

macro testWithDecl {
    rule { $var $name } => {
        describe('destructuring ' + $name + ' keyword', function() {
            it('should handle normal declarations', function() {
                $var y = 5;
                $var w = function(){};

                // for($var i=0; i<5; i++) {
                // }
            });

            it('should basically work', function() {
                // basic destructuring
                $var {one, two} = { one: 1, two: 2 };
                expect(one).to.be(1);
                expect(two).to.be(2);

                $var [foo, bar] = [1, 2];
                expect(foo).to.be(1);
                expect(bar).to.be(2);

                // $var i = 0;
                // $var arr = [0, 5];
                // for($var [i, n] = arr; i < 10; i++) {
                //     expect(n).to.be(5);
                // }
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

            it('should handle elision', function() {
                $var [,,,four] = [1, 2, 3, 4];
                expect(four).to.be(4);

                $var [,,three,,,six] = [1, 2, 3, 4, 5, 6];
                expect(three).to.be(3);
                expect(six).to.be(6);
            });

            it('should handle rest', function() {
                // 2 dots instead of 3 until this bug is fixed: 
                // https://github.com/mozilla/sweet.js/issues/142

                $var [one, two, $[...] rest] = [1, 2, 3, 4];
                expect(rest.length).to.be(2);
                expect(rest[0]).to.be(3);
                expect(rest[1]).to.be(4);

                $var [,, $[...] rest2] = [1, 2, 3, 4];
                expect(rest2.length).to.be(2);
                expect(rest2[0]).to.be(3);
                expect(rest2[1]).to.be(4);
            });
        });
    }
}

testWithDecl var "var"
testWithDecl let "let"
testWithDecl const "const"

// describe('destructuring', function() {
//     it('should handle function args', function() {
//         function foo(x, y, [z, w]) {
//             expect(z).to.be(5);
//             expect(w).to.be(6);
//         }
//         foo(1, 2, [5, 6]);

//         function bar(x, y, {z, w}) {
//             expect(z).to.be(5);
//             expect(w).to.be(6);
//         }
//         bar(1, 2, { z: 5, w: 6 });

//         (function({ x, y, z }, callback) {
//             expect(x).to.be(3);
//             expect(y).to.be(4);
//             expect(z).to.be(5);
//         })({ x: 3, y: 4, z: 5 });

//         function baz(x, y, { apple = true,
//                              pear = false,
//                              peach = 'default' }) {
//             expect(apple).to.be(true);
//             expect(pear).to.be(true);
//             expect(peach).to.be('default');
//         }
//         baz(1, 2, { pear: true });
//     });
// });
