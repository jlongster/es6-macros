'use strict';
var expect$1203 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$1237;
        var y$1241 = 5;
        var w$1245 = function () {
        };
        var z$1250 = x$1237;
        for (var i$1257 = 0; i$1257 < 5; i$1257++) {
        }
    });
    it('should basically work', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, one$1275 = obj.one, two$1276 = obj.two;
        expect$1203(one$1275).to.be(1);
        expect$1203(two$1276).to.be(2);
        var arr = [
                1,
                2
            ], i = 0, _noop, foo$1293 = arr[i++], bar$1294 = arr[i++];
        expect$1203(foo$1293).to.be(1);
        expect$1203(bar$1294).to.be(2);
        var i$1257 = 0;
        var arr$1301 = [
                0,
                5
            ];
        for (var arr = arr$1301, i = 0, _noop, i$1257 = arr[i++], n$1331 = arr[i++]; i$1257 < 10; i$1257++) {
            expect$1203(n$1331).to.be(5);
        }
    });
    it('should rename', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, val1$1345 = obj.one;
        expect$1203(val1$1345).to.be(1);
    });
    it('should set default values', function () {
        var obj = { two: 2 }, _noop, one$1275 = obj.one || 1, two$1276 = obj.two;
        expect$1203(one$1275).to.be(1);
        expect$1203(two$1276).to.be(2);
        var arr = [1], i = 0, _noop, foo$1293 = arr[i++], bar$1294 = arr[i++] || 2;
        expect$1203(foo$1293).to.be(1);
        expect$1203(bar$1294).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo$1293 = arr[i++], obj = arr[i++], _noop, bar$1294 = obj.bar, baz$1409 = obj.baz;
        expect$1203(foo$1293).to.be(1);
        expect$1203(bar$1294).to.be(2);
        expect$1203(baz$1409).to.be(3);
        var arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one$1275 = arr[i++], obj = arr[i++], _noop, two$1276 = obj.two, arr = obj.nums, i = 0, _noop, three$1451 = arr[i++], four$1452 = arr[i++];
        expect$1203(one$1275).to.be(1);
        expect$1203(two$1276).to.be(2);
        expect$1203(three$1451).to.be(3);
        expect$1203(four$1452).to.be(4);
        var obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz$1478 = obj.fiz, arr = obj.biz, i = 0, _noop, mum$1482 = arr[i++], dum$1483 = arr[i++];
        expect$1203(fiz$1478).to.be(5);
        expect$1203(mum$1482).to.be(8);
        expect$1203(dum$1483).to.be(9);
        var arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_$1510 = arr[i++], obj = arr[i++], _noop, two_$1513 = obj.two_, three_$1514 = obj.three_ || 3000;
        expect$1203(one_$1510).to.be(1);
        expect$1203(two_$1513).to.be(2);
        expect$1203(three_$1514).to.be(3);
    });
    it('should handle elision', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], _noop = arr[i++], four$1452 = arr[i++];
        expect$1203(four$1452).to.be(4);
        var arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], three$1451 = arr[i++], _noop = arr[i++], _noop = arr[i++], six$1580 = arr[i++];
        expect$1203(three$1451).to.be(3);
        expect$1203(six$1580).to.be(6);
    });
    it('should handle rest', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, one$1275 = arr[i++], two$1276 = arr[i++], rest$1603 = arr.slice(i);
        expect$1203(rest$1603.length).to.be(2);
        expect$1203(rest$1603[0]).to.be(3);
        expect$1203(rest$1603[1]).to.be(4);
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], rest2$1626 = arr.slice(i);
        expect$1203(rest2$1626.length).to.be(2);
        expect$1203(rest2$1626[0]).to.be(3);
        expect$1203(rest2$1626[1]).to.be(4);
    });
});
// no let or const until sweet.js handles them, very soon
//testWithDecl let "let"
//testWithDecl const "const"
describe('destructuring', function () {
    it('should handle function args', function () {
        function foo(x$1711, y$1712, _tmp) {
            var arr = _tmp, i = 0, _noop, z$1670 = arr[i++], w$1671 = arr[i++];
            expect$1203(z$1670).to.be(5);
            expect$1203(w$1671).to.be(6);
        }
        foo(1, 2, [
            5,
            6
        ]);
        function bar(x$1711, y$1712, _tmp) {
            var obj = _tmp, _noop, z$1670 = obj.z, w$1671 = obj.w;
            expect$1203(z$1670).to.be(5);
            expect$1203(w$1671).to.be(6);
        }
        bar(1, 2, {
            z: 5,
            w: 6
        });
        (function (_tmp, callback) {
            var obj = _tmp, _noop, x$1711 = obj.x, y$1712 = obj.y, z$1670 = obj.z;
            expect$1203(x$1711).to.be(3);
            expect$1203(y$1712).to.be(4);
            expect$1203(z$1670).to.be(5);
        }({
            x: 3,
            y: 4,
            z: 5
        }));
        function baz(x$1711, y$1712, _tmp) {
            var obj = _tmp, _noop, apple$1732 = obj.apple || true, pear$1733 = obj.pear || false, peach$1734 = obj.peach || 'default';
            expect$1203(apple$1732).to.be(true);
            expect$1203(pear$1733).to.be(true);
            expect$1203(peach$1734).to.be('default');
        }
        baz(1, 2, { pear: true });
    });
});
//# sourceMappingURL=destructure.js.map