'use strict';
var expect$287 = require('expect.js');
describe('var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$321;
        var y$325 = 5;
        var w$329 = function () {
        };
        var z$333 = x$321;
        var result$335;
        for (var i$342 = 0; i$342 < 5; i$342++) {
            result$335 = i$342;
        }
        expect$287(i$342).to.be(5);
    });
    it('should basically work', function () {
        var obj$356 = {
                one: 1,
                two: 2
            }, _noop$357, one$358 = obj$356.one, two$359 = obj$356.two;
        expect$287(one$358).to.be(1);
        expect$287(two$359).to.be(2);
        var arr$373 = [
                1,
                2
            ], i$374 = 0, _noop$375, foo$376 = arr$373[i$374++], bar$377 = arr$373[i$374++];
        expect$287(foo$376).to.be(1);
        expect$287(bar$377).to.be(2);
        var result$379;
        var arr$383 = [
                1,
                2
            ];
        for (var arr = arr$383, i = 0, _noop, x$413 = arr[i++], y$414 = arr[i++]; x$413 < 10; x$413++) {
            result$379 = y$414 * 2;
        }
        expect$287(result$379).to.be(4);
    });
    it('should rename', function () {
        var obj$424 = {
                one: 1,
                two: 2
            }, _noop$425, val1$426 = obj$424.one;
        expect$287(val1$426).to.be(1);
    });
    it('should set default values', function () {
        var obj$440 = { two: 2 }, _noop$441, one$442 = obj$440.one || 1, two$443 = obj$440.two;
        expect$287(one$442).to.be(1);
        expect$287(two$443).to.be(2);
        var arr$457 = [1], i$458 = 0, _noop$459, foo$460 = arr$457[i$458++], bar$461 = arr$457[i$458++] || 2;
        expect$287(foo$460).to.be(1);
        expect$287(bar$461).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$485 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i$486 = 0, _noop$487, foo$488 = arr$485[i$486++], obj$489 = arr$485[i$486++], _noop$490, bar$491 = obj$489.bar, baz$492 = obj$489.baz;
        expect$287(foo$488).to.be(1);
        expect$287(bar$491).to.be(2);
        expect$287(baz$492).to.be(3);
        var arr$526 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i$527 = 0, _noop$528, one$529 = arr$526[i$527++], obj$530 = arr$526[i$527++], _noop$531, two$532 = obj$530.two, arr$533 = obj$530.nums, i$534 = 0, _noop$535, three$536 = arr$533[i$534++], four$537 = arr$533[i$534++];
        expect$287(one$529).to.be(1);
        expect$287(two$532).to.be(2);
        expect$287(three$536).to.be(3);
        expect$287(four$537).to.be(4);
        var obj$561 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop$562, fiz$563 = obj$561.fiz, arr$564 = obj$561.biz, i$565 = 0, _noop$566, mum$567 = arr$564[i$565++], dum$568 = arr$564[i$565++];
        expect$287(fiz$563).to.be(5);
        expect$287(mum$567).to.be(8);
        expect$287(dum$568).to.be(9);
        var arr$592 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i$593 = 0, _noop$594, one_$595 = arr$592[i$593++], obj$596 = arr$592[i$593++], _noop$597, two_$598 = obj$596.two_, three_$599 = obj$596.three_ || 3000;
        expect$287(one_$595).to.be(1);
        expect$287(two_$598).to.be(2);
        expect$287(three_$599).to.be(3);
    });
});
//# sourceMappingURL=destructure.js.map