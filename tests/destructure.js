'use strict';
var expect$1211 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$1245;
        var y$1249 = 5;
        var w$1253 = function () {
        };
        var z$1258 = x$1245;
        for (var i$1265 = 0; i$1265 < 5; i$1265++) {
        }
    });
    it('should basically work', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, one$1283 = obj.one, two$1284 = obj.two;
        expect$1211(one$1283).to.be(1);
        expect$1211(two$1284).to.be(2);
        var arr = [
                1,
                2
            ], i = 0, _noop, foo$1301 = arr[i++], bar$1302 = arr[i++];
        expect$1211(foo$1301).to.be(1);
        expect$1211(bar$1302).to.be(2);
        var i$1265 = 0;
        var arr$1309 = [
                0,
                5
            ];
        for (var arr = arr$1309, i = 0, _noop, i$1265 = arr[i++], n$1339 = arr[i++]; i$1265 < 10; i$1265++) {
            expect$1211(n$1339).to.be(5);
        }
    });
    it('should rename', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, val1$1353 = obj.one;
        expect$1211(val1$1353).to.be(1);
    });
    it('should set default values', function () {
        var obj = { two: 2 }, _noop, one$1283 = obj.one || 1, two$1284 = obj.two;
        expect$1211(one$1283).to.be(1);
        expect$1211(two$1284).to.be(2);
        var arr = [1], i = 0, _noop, foo$1301 = arr[i++], bar$1302 = arr[i++] || 2;
        expect$1211(foo$1301).to.be(1);
        expect$1211(bar$1302).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo$1301 = arr[i++], obj = arr[i++], _noop, bar$1302 = obj.bar, baz$1417 = obj.baz;
        expect$1211(foo$1301).to.be(1);
        expect$1211(bar$1302).to.be(2);
        expect$1211(baz$1417).to.be(3);
        var arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one$1283 = arr[i++], obj = arr[i++], _noop, two$1284 = obj.two, arr = obj.nums, i = 0, _noop, three$1459 = arr[i++], four$1460 = arr[i++];
        expect$1211(one$1283).to.be(1);
        expect$1211(two$1284).to.be(2);
        expect$1211(three$1459).to.be(3);
        expect$1211(four$1460).to.be(4);
        var obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz$1486 = obj.fiz, arr = obj.biz, i = 0, _noop, mum$1490 = arr[i++], dum$1491 = arr[i++];
        expect$1211(fiz$1486).to.be(5);
        expect$1211(mum$1490).to.be(8);
        expect$1211(dum$1491).to.be(9);
        var arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_$1518 = arr[i++], obj = arr[i++], _noop, two_$1521 = obj.two_, three_$1522 = obj.three_ || 3000;
        expect$1211(one_$1518).to.be(1);
        expect$1211(two_$1521).to.be(2);
        expect$1211(three_$1522).to.be(3);
    });
    it('should handle elision', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], _noop = arr[i++], four$1460 = arr[i++];
        expect$1211(four$1460).to.be(4);
        var arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], three$1459 = arr[i++], _noop = arr[i++], _noop = arr[i++], six$1588 = arr[i++];
        expect$1211(three$1459).to.be(3);
        expect$1211(six$1588).to.be(6);
    });
    it('should handle rest', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, one$1283 = arr[i++], two$1284 = arr[i++], rest$1611 = arr.slice(i);
        expect$1211(rest$1611.length).to.be(2);
        expect$1211(rest$1611[0]).to.be(3);
        expect$1211(rest$1611[1]).to.be(4);
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], rest2$1634 = arr.slice(i);
        expect$1211(rest2$1634.length).to.be(2);
        expect$1211(rest2$1634[0]).to.be(3);
        expect$1211(rest2$1634[1]).to.be(4);
    });
});
// no let or const until sweet.js handles them, very soon
//testWithDecl let "let"
//testWithDecl const "const"
describe('destructuring', function () {
    it('should handle function args', function () {
        function foo(x$1719, y$1720, _tmp) {
            var arr = _tmp, i = 0, _noop, z$1678 = arr[i++], w$1679 = arr[i++];
            expect$1211(z$1678).to.be(5);
            expect$1211(w$1679).to.be(6);
        }
        foo(1, 2, [
            5,
            6
        ]);
        function bar(x$1719, y$1720, _tmp) {
            var obj = _tmp, _noop, z$1678 = obj.z, w$1679 = obj.w;
            expect$1211(z$1678).to.be(5);
            expect$1211(w$1679).to.be(6);
        }
        bar(1, 2, {
            z: 5,
            w: 6
        });
        (function (_tmp, callback) {
            var obj = _tmp, _noop, x$1719 = obj.x, y$1720 = obj.y, z$1678 = obj.z;
            expect$1211(x$1719).to.be(3);
            expect$1211(y$1720).to.be(4);
            expect$1211(z$1678).to.be(5);
        }({
            x: 3,
            y: 4,
            z: 5
        }));
        function baz(x$1719, y$1720, _tmp) {
            var obj = _tmp, _noop, apple$1740 = obj.apple || true, pear$1741 = obj.pear || false, peach$1742 = obj.peach || 'default';
            expect$1211(apple$1740).to.be(true);
            expect$1211(pear$1741).to.be(true);
            expect$1211(peach$1742).to.be('default');
        }
        baz(1, 2, { pear: true });
    });
});
//# sourceMappingURL=destructure.js.map