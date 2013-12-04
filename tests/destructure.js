'use strict';
var expect$290 = require('expect.js');
describe('var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$324;
        var y$328 = 5;
        var w$332 = function () {
        };
        var z$336 = x$324;
        var result$338;
        for (var i$345 = 0; i$345 < 5; i$345++) {
            result$338 = i$345;
        }
        expect$290(i$345).to.be(5);
    });
    it('should basically work', function () {
        var obj$359 = {
                one: 1,
                two: 2
            }, _noop$360, one$361 = obj$359.one, two$362 = obj$359.two;
        expect$290(one$361).to.be(1);
        expect$290(two$362).to.be(2);
        var arr$376 = [
                1,
                2
            ], i$377 = 0, _noop$378, foo$379 = arr$376[i$377++], bar$380 = arr$376[i$377++];
        expect$290(foo$379).to.be(1);
        expect$290(bar$380).to.be(2);
        var result$382;
        var arr$386 = [
                1,
                2
            ];
        for (var arr = arr$386, i = 0, _noop, x$416 = arr[i++], y$417 = arr[i++]; x$416 < 10; x$416++) {
            result$382 = y$417 * 2;
        }
        expect$290(result$382).to.be(4);
    });
    it('should rename', function () {
        var obj$427 = {
                one: 1,
                two: 2
            }, _noop$428, val1$429 = obj$427.one;
        expect$290(val1$429).to.be(1);
    });
    it('should set default values', function () {
        var obj$443 = { two: 2 }, _noop$444, one$445 = obj$443.one || 1, two$446 = obj$443.two;
        expect$290(one$445).to.be(1);
        expect$290(two$446).to.be(2);
        var arr$460 = [1], i$461 = 0, _noop$462, foo$463 = arr$460[i$461++], bar$464 = arr$460[i$461++] || 2;
        expect$290(foo$463).to.be(1);
        expect$290(bar$464).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$488 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i$489 = 0, _noop$490, foo$491 = arr$488[i$489++], obj$492 = arr$488[i$489++], _noop$493, bar$494 = obj$492.bar, baz$495 = obj$492.baz;
        expect$290(foo$491).to.be(1);
        expect$290(bar$494).to.be(2);
        expect$290(baz$495).to.be(3);
        var arr$529 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i$530 = 0, _noop$531, one$532 = arr$529[i$530++], obj$533 = arr$529[i$530++], _noop$534, two$535 = obj$533.two, arr$536 = obj$533.nums, i$537 = 0, _noop$538, three$539 = arr$536[i$537++], four$540 = arr$536[i$537++];
        expect$290(one$532).to.be(1);
        expect$290(two$535).to.be(2);
        expect$290(three$539).to.be(3);
        expect$290(four$540).to.be(4);
        var obj$564 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop$565, fiz$566 = obj$564.fiz, arr$567 = obj$564.biz, i$568 = 0, _noop$569, mum$570 = arr$567[i$568++], dum$571 = arr$567[i$568++];
        expect$290(fiz$566).to.be(5);
        expect$290(mum$570).to.be(8);
        expect$290(dum$571).to.be(9);
        var arr$595 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i$596 = 0, _noop$597, one_$598 = arr$595[i$596++], obj$599 = arr$595[i$596++], _noop$600, two_$601 = obj$599.two_, three_$602 = obj$599.three_ || 3000;
        expect$290(one_$598).to.be(1);
        expect$290(two_$601).to.be(2);
        expect$290(three_$602).to.be(3);
    });
    it('should handle elision', function () {
        var arr$624 = [
                1,
                2,
                3,
                4
            ], i$625 = 0, _noop$626, _noop$627 = arr$624[i$625++], _noop$628 = arr$624[i$625++], _noop$629 = arr$624[i$625++], four$630 = arr$624[i$625++];
        expect$290(four$630).to.be(4);
        var arr$660 = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i$661 = 0, _noop$662, _noop$663 = arr$660[i$661++], _noop$664 = arr$660[i$661++], three$665 = arr$660[i$661++], _noop$666 = arr$660[i$661++], _noop$667 = arr$660[i$661++], six$668 = arr$660[i$661++];
        expect$290(three$665).to.be(3);
        expect$290(six$668).to.be(6);
    });
});
//# sourceMappingURL=destructure.js.map