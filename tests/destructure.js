'use strict';
var expect$343 = require('expect.js');
describe('var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$378;
        var y$382 = 5;
        var w$386 = function () {
        };
        var z$390 = x$378;
    });
    it('should basically work', function () {
        var obj$404 = {
                one: 1,
                two: 2
            }, _noop$405, one$406 = obj$404.one, two$407 = obj$404.two;
        expect$343(one$406).to.be(1);
        expect$343(two$407).to.be(2);
        var arr$421 = [
                1,
                2
            ], i$422 = 0, _noop$423, foo$424 = arr$421[i$422++], bar$425 = arr$421[i$422++];
        expect$343(foo$424).to.be(1);
        expect$343(bar$425).to.be(2);
    });
    it('should rename', function () {
        var obj$435 = {
                one: 1,
                two: 2
            }, _noop$436, val1$437 = obj$435.one;
        expect$343(val1$437).to.be(1);
    });
    it('should set default values', function () {
        var obj$451 = { two: 2 }, _noop$452, one$453 = obj$451.one || 1, two$454 = obj$451.two;
        expect$343(one$453).to.be(1);
        expect$343(two$454).to.be(2);
        var arr$468 = [1], i$469 = 0, _noop$470, foo$471 = arr$468[i$469++], bar$472 = arr$468[i$469++] || 2;
        expect$343(foo$471).to.be(1);
        expect$343(bar$472).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$496 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i$497 = 0, _noop$498, foo$499 = arr$496[i$497++], obj$500 = arr$496[i$497++], _noop$501, bar$502 = obj$500.bar, baz$503 = obj$500.baz;
        expect$343(foo$499).to.be(1);
        expect$343(bar$502).to.be(2);
        expect$343(baz$503).to.be(3);
        var arr$537 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i$538 = 0, _noop$539, one$540 = arr$537[i$538++], obj$541 = arr$537[i$538++], _noop$542, two$543 = obj$541.two, arr$544 = obj$541.nums, i$545 = 0, _noop$546, three$547 = arr$544[i$545++], four$548 = arr$544[i$545++];
        expect$343(one$540).to.be(1);
        expect$343(two$543).to.be(2);
        expect$343(three$547).to.be(3);
        expect$343(four$548).to.be(4);
        var obj$572 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop$573, fiz$574 = obj$572.fiz, arr$575 = obj$572.biz, i$576 = 0, _noop$577, mum$578 = arr$575[i$576++], dum$579 = arr$575[i$576++];
        expect$343(fiz$574).to.be(5);
        expect$343(mum$578).to.be(8);
        expect$343(dum$579).to.be(9);
        var arr$603 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i$604 = 0, _noop$605, one_$606 = arr$603[i$604++], obj$607 = arr$603[i$604++], _noop$608, two_$609 = obj$607.two_, three_$610 = obj$607.three_ || 3000;
        expect$343(one_$606).to.be(1);
        expect$343(two_$609).to.be(2);
        expect$343(three_$610).to.be(3);
    });
});
describe('let' + ' keyword', function () {
    it('should handle normal declarations', function () {
        let x;
        let y = 5;
        let w = function () {
        };
        let z = x;
    });
    it('should basically work', function () {
        let obj = {
                one: 1,
                two: 2
            }, _noop, one = obj.one, two = obj.two;
        expect$343(one).to.be(1);
        expect$343(two).to.be(2);
        let arr = [
                1,
                2
            ], i = 0, _noop, foo = arr[i++], bar = arr[i++];
        expect$343(foo).to.be(1);
        expect$343(bar).to.be(2);
    });
    it('should rename', function () {
        let obj = {
                one: 1,
                two: 2
            }, _noop, val1 = obj.one;
        expect$343(val1).to.be(1);
    });
    it('should set default values', function () {
        let obj = { two: 2 }, _noop, one = obj.one || 1, two = obj.two;
        expect$343(one).to.be(1);
        expect$343(two).to.be(2);
        let arr = [1], i = 0, _noop, foo = arr[i++], bar = arr[i++] || 2;
        expect$343(foo).to.be(1);
        expect$343(bar).to.be(2);
    });
    it('should handle multiple levels', function () {
        let arr = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i = 0, _noop, foo = arr[i++], obj = arr[i++], _noop, bar = obj.bar, baz = obj.baz;
        expect$343(foo).to.be(1);
        expect$343(bar).to.be(2);
        expect$343(baz).to.be(3);
        let arr = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i = 0, _noop, one = arr[i++], obj = arr[i++], _noop, two = obj.two, arr = obj.nums, i = 0, _noop, three = arr[i++], four = arr[i++];
        expect$343(one).to.be(1);
        expect$343(two).to.be(2);
        expect$343(three).to.be(3);
        expect$343(four).to.be(4);
        let obj = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop, fiz = obj.fiz, arr = obj.biz, i = 0, _noop, mum = arr[i++], dum = arr[i++];
        expect$343(fiz).to.be(5);
        expect$343(mum).to.be(8);
        expect$343(dum).to.be(9);
        let arr = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i = 0, _noop, one_ = arr[i++], obj = arr[i++], _noop, two_ = obj.two_, three_ = obj.three_ || 3000;
        expect$343(one_).to.be(1);
        expect$343(two_).to.be(2);
        expect$343(three_).to.be(3);
    });
});
//# sourceMappingURL=destructure.js.map