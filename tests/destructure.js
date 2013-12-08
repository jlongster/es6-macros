//'use strict';
var expect$1192 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$1226;
        var y$1230 = 5;
        var w$1235 = function () {
        };
        var z$1240 = x$1226;
        var result$1242;
        for (var i$1249 = 0; i$1249 < 5; i$1249++) {
            result$1242 = i$1249;
        }
        expect$1192(i$1249).to.be(5);
    });
    it('should basically work', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, one$1267 = obj.one, two$1268 = obj.two;
        expect$1192(one$1267).to.be(1);
        expect$1192(two$1268).to.be(2);
        var arr = [
                1,
                2
            ], i = 0, _noop, foo$1285 = arr[i++], bar$1286 = arr[i++];
        expect$1192(foo$1285).to.be(1);
        expect$1192(bar$1286).to.be(2);
        var result$1242;
        var arr$1291 = [
                1,
                2
            ];
        for (var arr = arr$1291, i = 0, _noop, x$1226 = arr[i++], y$1230 = arr[i++]; x$1226 < 10; x$1226++) {
            result$1242 = y$1230 * 2;
        }
        expect$1192(result$1242).to.be(4);
    });
    it('should rename', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, val1$1334 = obj.one;
        expect$1192(val1$1334).to.be(1);
    });
    it('should set default values', function () {
        var obj = { two: 2 }, _noop, one$1267 = obj.one || 1, two$1268 = obj.two;
        expect$1192(one$1267).to.be(1);
        expect$1192(two$1268).to.be(2);
        var arr = [1], i = 0, _noop, foo$1285 = arr[i++], bar$1286 = arr[i++] || 2;
        expect$1192(foo$1285).to.be(1);
        expect$1192(bar$1286).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo$1285 = arr[i++], obj = arr[i++], _noop, bar$1286 = obj.bar, baz$1398 = obj.baz;
        expect$1192(foo$1285).to.be(1);
        expect$1192(bar$1286).to.be(2);
        expect$1192(baz$1398).to.be(3);
        var arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one$1267 = arr[i++], obj = arr[i++], _noop, two$1268 = obj.two, arr = obj.nums, i = 0, _noop, three$1440 = arr[i++], four$1441 = arr[i++];
        expect$1192(one$1267).to.be(1);
        expect$1192(two$1268).to.be(2);
        expect$1192(three$1440).to.be(3);
        expect$1192(four$1441).to.be(4);
        var obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz$1467 = obj.fiz, arr = obj.biz, i = 0, _noop, mum$1471 = arr[i++], dum$1472 = arr[i++];
        expect$1192(fiz$1467).to.be(5);
        expect$1192(mum$1471).to.be(8);
        expect$1192(dum$1472).to.be(9);
        var arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_$1499 = arr[i++], obj = arr[i++], _noop, two_$1502 = obj.two_, three_$1503 = obj.three_ || 3000;
        expect$1192(one_$1499).to.be(1);
        expect$1192(two_$1502).to.be(2);
        expect$1192(three_$1503).to.be(3);
    });
    it('should handle elision', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], _noop = arr[i++], four$1441 = arr[i++];
        expect$1192(four$1441).to.be(4);
        var arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], three$1440 = arr[i++], _noop = arr[i++], _noop = arr[i++], six$1569 = arr[i++];
        expect$1192(three$1440).to.be(3);
        expect$1192(six$1569).to.be(6);
    });
    it('should handle rest', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, one$1267 = arr[i++], two$1268 = arr[i++], rest$1592 = arr.slice(i);
        expect$1192(rest$1592.length).to.be(2);
        expect$1192(rest$1592[0]).to.be(3);
        expect$1192(rest$1592[1]).to.be(4);
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], rest2$1615 = arr.slice(i);
        expect$1192(rest2$1615.length).to.be(2);
        expect$1192(rest2$1615[0]).to.be(3);
        expect$1192(rest2$1615[1]).to.be(4);
    });
});
// no let or const until sweet.js handles them, very soon
//testWithDecl let "let"
//testWithDecl const "const"
describe('destructuring', function () {
    it('should handle function args', function () {
        function foo(x$1700, y$1701, _tmp) {
            var arr = _tmp, i = 0, _noop, z$1659 = arr[i++], w$1660 = arr[i++];
            expect$1192(z$1659).to.be(5);
            expect$1192(w$1660).to.be(6);
        }
        foo(1, 2, [
            5,
            6
        ]);
        function bar(x$1700, y$1701, _tmp) {
            var obj = _tmp, _noop, z$1659 = obj.z, w$1660 = obj.w;
            expect$1192(z$1659).to.be(5);
            expect$1192(w$1660).to.be(6);
        }
        bar(1, 2, {
            z: 5,
            w: 6
        });
        (function (_tmp, callback) {
            var obj = _tmp, _noop, x$1700 = obj.x, y$1701 = obj.y, z$1659 = obj.z;
            expect$1192(x$1700).to.be(3);
            expect$1192(y$1701).to.be(4);
            expect$1192(z$1659).to.be(5);
        }({
            x: 3,
            y: 4,
            z: 5
        }));
        function baz(x$1700, y$1701, _tmp) {
            var obj = _tmp, _noop, apple$1721 = obj.apple || true, pear$1722 = obj.pear || false, peach$1723 = obj.peach || 'default';
            expect$1192(apple$1721).to.be(true);
            expect$1192(pear$1722).to.be(true);
            expect$1192(peach$1723).to.be('default');
        }
        baz(1, 2, { pear: true });
    });
});
//# sourceMappingURL=destructure.js.map