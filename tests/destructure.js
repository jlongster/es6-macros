'use strict';
var expect$1234 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$1268;
        var y$1272 = 5;
        var w$1276 = function () {
        };
        var z$1281 = x$1268;
        for (var i$1288 = 0; i$1288 < 5; i$1288++) {
        }
    });
    it('should basically work', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, one$1306 = obj.one, two$1307 = obj.two;
        expect$1234(one$1306).to.be(1);
        expect$1234(two$1307).to.be(2);
        var arr = [
                1,
                2
            ], i = 0, _noop, foo$1324 = arr[i++], bar$1325 = arr[i++];
        expect$1234(foo$1324).to.be(1);
        expect$1234(bar$1325).to.be(2);
        var i$1288 = 0;
        var arr$1332 = [
                0,
                5
            ];
        for (var arr = arr$1332, i = 0, _noop, i$1288 = arr[i++], n$1362 = arr[i++]; i$1288 < 10; i$1288++) {
            expect$1234(n$1362).to.be(5);
        }
    });
    it('should rename', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, val1$1376 = obj.one;
        expect$1234(val1$1376).to.be(1);
    });
    it('should set default values', function () {
        var obj = { two: 2 }, _noop, one$1306 = obj.one || 1, two$1307 = obj.two;
        expect$1234(one$1306).to.be(1);
        expect$1234(two$1307).to.be(2);
        var arr = [1], i = 0, _noop, foo$1324 = arr[i++], bar$1325 = arr[i++] || 2;
        expect$1234(foo$1324).to.be(1);
        expect$1234(bar$1325).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo$1324 = arr[i++], obj = arr[i++], _noop, bar$1325 = obj.bar, baz$1440 = obj.baz;
        expect$1234(foo$1324).to.be(1);
        expect$1234(bar$1325).to.be(2);
        expect$1234(baz$1440).to.be(3);
        var arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one$1306 = arr[i++], obj = arr[i++], _noop, two$1307 = obj.two, arr = obj.nums, i = 0, _noop, three$1482 = arr[i++], four$1483 = arr[i++];
        expect$1234(one$1306).to.be(1);
        expect$1234(two$1307).to.be(2);
        expect$1234(three$1482).to.be(3);
        expect$1234(four$1483).to.be(4);
        var obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz$1509 = obj.fiz, arr = obj.biz, i = 0, _noop, mum$1513 = arr[i++], dum$1514 = arr[i++];
        expect$1234(fiz$1509).to.be(5);
        expect$1234(mum$1513).to.be(8);
        expect$1234(dum$1514).to.be(9);
        var arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_$1541 = arr[i++], obj = arr[i++], _noop, two_$1544 = obj.two_, three_$1545 = obj.three_ || 3000;
        expect$1234(one_$1541).to.be(1);
        expect$1234(two_$1544).to.be(2);
        expect$1234(three_$1545).to.be(3);
    });
    it('should handle elision', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], _noop = arr[i++], four$1483 = arr[i++];
        expect$1234(four$1483).to.be(4);
        var arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], three$1482 = arr[i++], _noop = arr[i++], _noop = arr[i++], six$1611 = arr[i++];
        expect$1234(three$1482).to.be(3);
        expect$1234(six$1611).to.be(6);
    });
    it('should handle rest', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, one$1306 = arr[i++], two$1307 = arr[i++], rest$1634 = arr.slice(i);
        expect$1234(rest$1634.length).to.be(2);
        expect$1234(rest$1634[0]).to.be(3);
        expect$1234(rest$1634[1]).to.be(4);
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], rest2$1657 = arr.slice(i);
        expect$1234(rest2$1657.length).to.be(2);
        expect$1234(rest2$1657[0]).to.be(3);
        expect$1234(rest2$1657[1]).to.be(4);
    });
});
// no let or const until sweet.js handles them, very soon
//testWithDecl let "let"
//testWithDecl const "const"
describe('destructuring', function () {
    it('should handle function args', function () {
        function foo(x$1742, y$1743, _tmp) {
            var arr = _tmp, i = 0, _noop, z$1701 = arr[i++], w$1702 = arr[i++];
            expect$1234(z$1701).to.be(5);
            expect$1234(w$1702).to.be(6);
        }
        foo(1, 2, [
            5,
            6
        ]);
        function bar(x$1742, y$1743, _tmp) {
            var obj = _tmp, _noop, z$1701 = obj.z, w$1702 = obj.w;
            expect$1234(z$1701).to.be(5);
            expect$1234(w$1702).to.be(6);
        }
        bar(1, 2, {
            z: 5,
            w: 6
        });
        (function (_tmp, callback) {
            var obj = _tmp, _noop, x$1742 = obj.x, y$1743 = obj.y, z$1701 = obj.z;
            expect$1234(x$1742).to.be(3);
            expect$1234(y$1743).to.be(4);
            expect$1234(z$1701).to.be(5);
        }({
            x: 3,
            y: 4,
            z: 5
        }));
        function baz(x$1742, y$1743, _tmp) {
            var obj = _tmp, _noop, apple$1763 = obj.apple || true, pear$1764 = obj.pear || false, peach$1765 = obj.peach || 'default';
            expect$1234(apple$1763).to.be(true);
            expect$1234(pear$1764).to.be(true);
            expect$1234(peach$1765).to.be('default');
        }
        baz(1, 2, { pear: true });
    });
});
//# sourceMappingURL=destructure.js.map