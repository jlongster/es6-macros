'use strict';
var expect$389 = require('expect.js');
describe('var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$451;
        var y$455 = 5;
        var w$460 = function () {
        };
        var z$465 = x$451;
        var result$467;
        for (var i$474 = 0; i$474 < 5; i$474++) {
            result$467 = i$474;
        }
        expect$389(i$474).to.be(5);
    });
    it('should basically work', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, one$492 = obj.one, two$493 = obj.two;
        expect$389(one$492).to.be(1);
        expect$389(two$493).to.be(2);
        var arr = [
                1,
                2
            ], i = 0, _noop, foo$510 = arr[i++], bar$511 = arr[i++];
        expect$389(foo$510).to.be(1);
        expect$389(bar$511).to.be(2);
        var result$467;
        var arr$516 = [
                1,
                2
            ];
        for (var arr = arr$516, i = 0, _noop, x$451 = arr[i++], y$455 = arr[i++]; x$451 < 10; x$451++) {
            result$467 = y$455 * 2;
        }
        expect$389(result$467).to.be(4);
    });
    it('should rename', function () {
        var obj = {
                one: 1,
                two: 2
            }, _noop, val1$559 = obj.one;
        expect$389(val1$559).to.be(1);
    });
    it('should set default values', function () {
        var obj = { two: 2 }, _noop, one$492 = obj.one || 1, two$493 = obj.two;
        expect$389(one$492).to.be(1);
        expect$389(two$493).to.be(2);
        var arr = [1], i = 0, _noop, foo$510 = arr[i++], bar$511 = arr[i++] || 2;
        expect$389(foo$510).to.be(1);
        expect$389(bar$511).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo$510 = arr[i++], obj = arr[i++], _noop, bar$511 = obj.bar, baz$623 = obj.baz;
        expect$389(foo$510).to.be(1);
        expect$389(bar$511).to.be(2);
        expect$389(baz$623).to.be(3);
        var arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one$492 = arr[i++], obj = arr[i++], _noop, two$493 = obj.two, arr = obj.nums, i = 0, _noop, three$665 = arr[i++], four$666 = arr[i++];
        expect$389(one$492).to.be(1);
        expect$389(two$493).to.be(2);
        expect$389(three$665).to.be(3);
        expect$389(four$666).to.be(4);
        var obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz$692 = obj.fiz, arr = obj.biz, i = 0, _noop, mum$696 = arr[i++], dum$697 = arr[i++];
        expect$389(fiz$692).to.be(5);
        expect$389(mum$696).to.be(8);
        expect$389(dum$697).to.be(9);
        var arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_$724 = arr[i++], obj = arr[i++], _noop, two_$727 = obj.two_, three_$728 = obj.three_ || 3000;
        expect$389(one_$724).to.be(1);
        expect$389(two_$727).to.be(2);
        expect$389(three_$728).to.be(3);
    });
    it('should handle elision', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], _noop = arr[i++], four$666 = arr[i++];
        expect$389(four$666).to.be(4);
        var arr = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], three$665 = arr[i++], _noop = arr[i++], _noop = arr[i++], six$794 = arr[i++];
        expect$389(three$665).to.be(3);
        expect$389(six$794).to.be(6);
    });
    it('should handle rest', function () {
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, one$492 = arr[i++], two$493 = arr[i++], rest$817 = arr.slice(i);
        expect$389(rest$817.length).to.be(2);
        expect$389(rest$817[0]).to.be(3);
        expect$389(rest$817[1]).to.be(4);
        var arr = [
                1,
                2,
                3,
                4
            ], i = 0, _noop, _noop = arr[i++], _noop = arr[i++], rest2$840 = arr.slice(i);
        expect$389(rest2$840.length).to.be(2);
        expect$389(rest2$840[0]).to.be(3);
        expect$389(rest2$840[1]).to.be(4);
    });
    it('should function', function () {
        function foo$510(x$451, y$455, _tmp) {
            var arr = _tmp, i = 0, _noop, z$465 = arr[i++], w$460 = arr[i++];
            expect$389(z$465).to.be(5);
            expect$389(w$460).to.be(6);
        }
        foo$510(1, 2, [
            5,
            6
        ]);
        function bar$511(x$451, y$455, _tmp) {
            var obj = _tmp, _noop, z$465 = obj.z, w$460 = obj.w;
            expect$389(z$465).to.be(5);
            expect$389(w$460).to.be(6);
        }
        bar$511(1, 2, {
            z: 5,
            w: 6
        });
        (function (_tmp, callback) {
            var obj = _tmp, _noop, x$451 = obj.x, y$455 = obj.y, z$465 = obj.z;
            expect$389(x$451).to.be(3);
            expect$389(y$455).to.be(4);
            expect$389(z$465).to.be(5);
        }({
            x: 3,
            y: 4,
            z: 5
        }));
        function baz$623(x$451, y$455, _tmp) {
            var obj = _tmp, _noop, apple$939 = obj.apple || true, pear$940 = obj.pear || false, peach$941 = obj.peach || 'default';
            expect$389(apple$939).to.be(true);
            expect$389(pear$940).to.be(true);
            expect$389(peach$941).to.be('default');
        }
        baz$623(1, 2, { pear: true });
    });
});
//# sourceMappingURL=destructure.js.map