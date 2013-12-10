'use strict';
var expect$1247 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$1281;
        var y$1285 = 5;
        var w$1289 = function () {
        };
        var z$1294 = x$1281;
        for (var i$1301 = 0; i$1301 < 5; i$1301++) {
        }
    });
    it('should basically work', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, one$1319 = obj.one, two$1320 = obj.two;
        expect$1247(one$1319).to.be(1);
        expect$1247(two$1320).to.be(2);
        var arr = [
                1,
                2
            ], i = 0, _noop, foo$1337 = arr[i++], bar$1338 = arr[i++];
        expect$1247(foo$1337).to.be(1);
        expect$1247(bar$1338).to.be(2);
        var i$1301 = 0;
        var arr$1345 = [
                0,
                5
            ];
        for (var arr = arr$1345, i = 0, _noop, i$1301 = arr[i++], n$1375 = arr[i++]; i$1301 < 10; i$1301++) {
            expect$1247(n$1375).to.be(5);
        }
    });
    it('should rename', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, val1$1389 = obj.one;
        expect$1247(val1$1389).to.be(1);
    });
    it('should set default values', function () {
        var obj = { two: 2 }, _noop, one$1319 = obj.one || 1, two$1320 = obj.two;
        expect$1247(one$1319).to.be(1);
        expect$1247(two$1320).to.be(2);
        var arr = [1], i = 0, _noop, foo$1337 = arr[i++], bar$1338 = arr[i++] || 2;
        expect$1247(foo$1337).to.be(1);
        expect$1247(bar$1338).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo$1337 = arr[i++], obj = arr[i++], _noop, bar$1338 = obj.bar, baz$1453 = obj.baz;
        expect$1247(foo$1337).to.be(1);
        expect$1247(bar$1338).to.be(2);
        expect$1247(baz$1453).to.be(3);
        var arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one$1319 = arr[i++], obj = arr[i++], _noop, two$1320 = obj.two, arr = obj.nums, i = 0, _noop, three$1495 = arr[i++], four$1496 = arr[i++];
        expect$1247(one$1319).to.be(1);
        expect$1247(two$1320).to.be(2);
        expect$1247(three$1495).to.be(3);
        expect$1247(four$1496).to.be(4);
        var obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz$1522 = obj.fiz, arr = obj.biz, i = 0, _noop, mum$1526 = arr[i++], dum$1527 = arr[i++];
        expect$1247(fiz$1522).to.be(5);
        expect$1247(mum$1526).to.be(8);
        expect$1247(dum$1527).to.be(9);
        var arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_$1554 = arr[i++], obj = arr[i++], _noop, two_$1557 = obj.two_, three_$1558 = obj.three_ || 3000;
        expect$1247(one_$1554).to.be(1);
        expect$1247(two_$1557).to.be(2);
        expect$1247(three_$1558).to.be(3);
    });
    it('should handle elision', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], _noop = arr[i++], four$1496 = arr[i++];
        expect$1247(four$1496).to.be(4);
        var arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], three$1495 = arr[i++], _noop = arr[i++], _noop = arr[i++], six$1624 = arr[i++];
        expect$1247(three$1495).to.be(3);
        expect$1247(six$1624).to.be(6);
    });
    it('should handle rest', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, one$1319 = arr[i++], two$1320 = arr[i++], rest$1647 = arr.slice(i);
        expect$1247(rest$1647.length).to.be(2);
        expect$1247(rest$1647[0]).to.be(3);
        expect$1247(rest$1647[1]).to.be(4);
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], rest2$1670 = arr.slice(i);
        expect$1247(rest2$1670.length).to.be(2);
        expect$1247(rest2$1670[0]).to.be(3);
        expect$1247(rest2$1670[1]).to.be(4);
    });
});
// no let or const until sweet.js handles them, very soon
//testWithDecl let "let"
//testWithDecl const "const"
describe('destructuring', function () {
    it('should handle function args', function () {
        function foo(x$1755, y$1756, _tmp) {
            var arr = _tmp, i = 0, _noop, z$1714 = arr[i++], w$1715 = arr[i++];
            expect$1247(z$1714).to.be(5);
            expect$1247(w$1715).to.be(6);
        }
        foo(1, 2, [
            5,
            6
        ]);
        function bar(x$1755, y$1756, _tmp) {
            var obj = _tmp, _noop, z$1714 = obj.z, w$1715 = obj.w;
            expect$1247(z$1714).to.be(5);
            expect$1247(w$1715).to.be(6);
        }
        bar(1, 2, {
            z: 5,
            w: 6
        });
        (function (_tmp, callback) {
            var obj = _tmp, _noop, x$1755 = obj.x, y$1756 = obj.y, z$1714 = obj.z;
            expect$1247(x$1755).to.be(3);
            expect$1247(y$1756).to.be(4);
            expect$1247(z$1714).to.be(5);
        }({
            x: 3,
            y: 4,
            z: 5
        }));
        function baz(x$1755, y$1756, _tmp) {
            var obj = _tmp, _noop, apple$1776 = obj.apple || true, pear$1777 = obj.pear || false, peach$1778 = obj.peach || 'default';
            expect$1247(apple$1776).to.be(true);
            expect$1247(pear$1777).to.be(true);
            expect$1247(peach$1778).to.be('default');
        }
        baz(1, 2, { pear: true });
    });
});
//# sourceMappingURL=destructure.js.map