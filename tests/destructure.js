'use strict';
var expect$1119 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$1181;
        var y$1185 = 5;
        var w$1190 = function () {
        };
        var z$1195 = x$1181;
        var result$1197;
        for (var i$1204 = 0; i$1204 < 5; i$1204++) {
            result$1197 = i$1204;
        }
        expect$1119(i$1204).to.be(5);
    });
    it('should basically work', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, one$1222 = obj.one, two$1223 = obj.two;
        expect$1119(one$1222).to.be(1);
        expect$1119(two$1223).to.be(2);
        var arr = [
                1,
                2
            ], i = 0, _noop, foo$1240 = arr[i++], bar$1241 = arr[i++];
        expect$1119(foo$1240).to.be(1);
        expect$1119(bar$1241).to.be(2);
        var result$1197;
        var arr$1246 = [
                1,
                2
            ];
        for (var arr = arr$1246, i = 0, _noop, x$1181 = arr[i++], y$1185 = arr[i++]; x$1181 < 10; x$1181++) {
            result$1197 = y$1185 * 2;
        }
        expect$1119(result$1197).to.be(4);
    });
    it('should rename', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, val1$1289 = obj.one;
        expect$1119(val1$1289).to.be(1);
    });
    it('should set default values', function () {
        var obj = { two: 2 }, _noop, one$1222 = obj.one || 1, two$1223 = obj.two;
        expect$1119(one$1222).to.be(1);
        expect$1119(two$1223).to.be(2);
        var arr = [1], i = 0, _noop, foo$1240 = arr[i++], bar$1241 = arr[i++] || 2;
        expect$1119(foo$1240).to.be(1);
        expect$1119(bar$1241).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo$1240 = arr[i++], obj = arr[i++], _noop, bar$1241 = obj.bar, baz$1353 = obj.baz;
        expect$1119(foo$1240).to.be(1);
        expect$1119(bar$1241).to.be(2);
        expect$1119(baz$1353).to.be(3);
        var arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one$1222 = arr[i++], obj = arr[i++], _noop, two$1223 = obj.two, arr = obj.nums, i = 0, _noop, three$1395 = arr[i++], four$1396 = arr[i++];
        expect$1119(one$1222).to.be(1);
        expect$1119(two$1223).to.be(2);
        expect$1119(three$1395).to.be(3);
        expect$1119(four$1396).to.be(4);
        var obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz$1422 = obj.fiz, arr = obj.biz, i = 0, _noop, mum$1426 = arr[i++], dum$1427 = arr[i++];
        expect$1119(fiz$1422).to.be(5);
        expect$1119(mum$1426).to.be(8);
        expect$1119(dum$1427).to.be(9);
        var arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_$1454 = arr[i++], obj = arr[i++], _noop, two_$1457 = obj.two_, three_$1458 = obj.three_ || 3000;
        expect$1119(one_$1454).to.be(1);
        expect$1119(two_$1457).to.be(2);
        expect$1119(three_$1458).to.be(3);
    });
    it('should handle elision', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], _noop = arr[i++], four$1396 = arr[i++];
        expect$1119(four$1396).to.be(4);
        var arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], three$1395 = arr[i++], _noop = arr[i++], _noop = arr[i++], six$1524 = arr[i++];
        expect$1119(three$1395).to.be(3);
        expect$1119(six$1524).to.be(6);
    });
    it('should handle rest', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, one$1222 = arr[i++], two$1223 = arr[i++], rest$1547 = arr.slice(i);
        expect$1119(rest$1547.length).to.be(2);
        expect$1119(rest$1547[0]).to.be(3);
        expect$1119(rest$1547[1]).to.be(4);
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], rest2$1570 = arr.slice(i);
        expect$1119(rest2$1570.length).to.be(2);
        expect$1119(rest2$1570[0]).to.be(3);
        expect$1119(rest2$1570[1]).to.be(4);
    });
});
// no let or const until sweet.js handles them, very soon
//testWithDecl let "let"
//testWithDecl const "const"
describe('destructuring', function () {
    it('should handle function args', function () {
        function foo(x$1655, y$1656, _tmp) {
            var arr = _tmp, i = 0, _noop, z$1614 = arr[i++], w$1615 = arr[i++];
            expect$1119(z$1614).to.be(5);
            expect$1119(w$1615).to.be(6);
        }
        foo(1, 2, [
            5,
            6
        ]);
        function bar(x$1655, y$1656, _tmp) {
            var obj = _tmp, _noop, z$1614 = obj.z, w$1615 = obj.w;
            expect$1119(z$1614).to.be(5);
            expect$1119(w$1615).to.be(6);
        }
        bar(1, 2, {
            z: 5,
            w: 6
        });
        (function (_tmp, callback) {
            var obj = _tmp, _noop, x$1655 = obj.x, y$1656 = obj.y, z$1614 = obj.z;
            expect$1119(x$1655).to.be(3);
            expect$1119(y$1656).to.be(4);
            expect$1119(z$1614).to.be(5);
        }({
            x: 3,
            y: 4,
            z: 5
        }));
        function baz(x$1655, y$1656, _tmp) {
            var obj = _tmp, _noop, apple$1676 = obj.apple || true, pear$1677 = obj.pear || false, peach$1678 = obj.peach || 'default';
            expect$1119(apple$1676).to.be(true);
            expect$1119(pear$1677).to.be(true);
            expect$1119(peach$1678).to.be('default');
        }
        baz(1, 2, { pear: true });
    });
});
//# sourceMappingURL=destructure.js.map