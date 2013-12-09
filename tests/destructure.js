'use strict';
var expect$1194 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$1228;
        var y$1232 = 5;
        var w$1236 = function () {
        };
        var z$1241 = x$1228;
        for (var i$1248 = 0; i$1248 < 5; i$1248++) {
        }
    });
    it('should basically work', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, one$1266 = obj.one, two$1267 = obj.two;
        expect$1194(one$1266).to.be(1);
        expect$1194(two$1267).to.be(2);
        var arr = [
                1,
                2
            ], i = 0, _noop, foo$1284 = arr[i++], bar$1285 = arr[i++];
        expect$1194(foo$1284).to.be(1);
        expect$1194(bar$1285).to.be(2);
        var i$1248 = 0;
        var arr$1292 = [
                0,
                5
            ];
        for (var arr = arr$1292, i = 0, _noop, i$1248 = arr[i++], n$1322 = arr[i++]; i$1248 < 10; i$1248++) {
            expect$1194(n$1322).to.be(5);
        }
    });
    it('should rename', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, val1$1336 = obj.one;
        expect$1194(val1$1336).to.be(1);
    });
    it('should set default values', function () {
        var obj = { two: 2 }, _noop, one$1266 = obj.one || 1, two$1267 = obj.two;
        expect$1194(one$1266).to.be(1);
        expect$1194(two$1267).to.be(2);
        var arr = [1], i = 0, _noop, foo$1284 = arr[i++], bar$1285 = arr[i++] || 2;
        expect$1194(foo$1284).to.be(1);
        expect$1194(bar$1285).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo$1284 = arr[i++], obj = arr[i++], _noop, bar$1285 = obj.bar, baz$1400 = obj.baz;
        expect$1194(foo$1284).to.be(1);
        expect$1194(bar$1285).to.be(2);
        expect$1194(baz$1400).to.be(3);
        var arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one$1266 = arr[i++], obj = arr[i++], _noop, two$1267 = obj.two, arr = obj.nums, i = 0, _noop, three$1442 = arr[i++], four$1443 = arr[i++];
        expect$1194(one$1266).to.be(1);
        expect$1194(two$1267).to.be(2);
        expect$1194(three$1442).to.be(3);
        expect$1194(four$1443).to.be(4);
        var obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz$1469 = obj.fiz, arr = obj.biz, i = 0, _noop, mum$1473 = arr[i++], dum$1474 = arr[i++];
        expect$1194(fiz$1469).to.be(5);
        expect$1194(mum$1473).to.be(8);
        expect$1194(dum$1474).to.be(9);
        var arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_$1501 = arr[i++], obj = arr[i++], _noop, two_$1504 = obj.two_, three_$1505 = obj.three_ || 3000;
        expect$1194(one_$1501).to.be(1);
        expect$1194(two_$1504).to.be(2);
        expect$1194(three_$1505).to.be(3);
    });
    it('should handle elision', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], _noop = arr[i++], four$1443 = arr[i++];
        expect$1194(four$1443).to.be(4);
        var arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], three$1442 = arr[i++], _noop = arr[i++], _noop = arr[i++], six$1571 = arr[i++];
        expect$1194(three$1442).to.be(3);
        expect$1194(six$1571).to.be(6);
    });
    it('should handle rest', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, one$1266 = arr[i++], two$1267 = arr[i++], rest$1594 = arr.slice(i);
        expect$1194(rest$1594.length).to.be(2);
        expect$1194(rest$1594[0]).to.be(3);
        expect$1194(rest$1594[1]).to.be(4);
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], rest2$1617 = arr.slice(i);
        expect$1194(rest2$1617.length).to.be(2);
        expect$1194(rest2$1617[0]).to.be(3);
        expect$1194(rest2$1617[1]).to.be(4);
    });
});
// no let or const until sweet.js handles them, very soon
//testWithDecl let "let"
//testWithDecl const "const"
describe('destructuring', function () {
    it('should handle function args', function () {
        function foo(x$1702, y$1703, _tmp) {
            var arr = _tmp, i = 0, _noop, z$1661 = arr[i++], w$1662 = arr[i++];
            expect$1194(z$1661).to.be(5);
            expect$1194(w$1662).to.be(6);
        }
        foo(1, 2, [
            5,
            6
        ]);
        function bar(x$1702, y$1703, _tmp) {
            var obj = _tmp, _noop, z$1661 = obj.z, w$1662 = obj.w;
            expect$1194(z$1661).to.be(5);
            expect$1194(w$1662).to.be(6);
        }
        bar(1, 2, {
            z: 5,
            w: 6
        });
        (function (_tmp, callback) {
            var obj = _tmp, _noop, x$1702 = obj.x, y$1703 = obj.y, z$1661 = obj.z;
            expect$1194(x$1702).to.be(3);
            expect$1194(y$1703).to.be(4);
            expect$1194(z$1661).to.be(5);
        }({
            x: 3,
            y: 4,
            z: 5
        }));
        function baz(x$1702, y$1703, _tmp) {
            var obj = _tmp, _noop, apple$1723 = obj.apple || true, pear$1724 = obj.pear || false, peach$1725 = obj.peach || 'default';
            expect$1194(apple$1723).to.be(true);
            expect$1194(pear$1724).to.be(true);
            expect$1194(peach$1725).to.be('default');
        }
        baz(1, 2, { pear: true });
    });
});
//# sourceMappingURL=destructure.js.map