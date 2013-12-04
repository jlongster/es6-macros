'use strict';
var expect$319 = require('expect.js');
describe('var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$353;
        var y$357 = 5;
        var w$361 = function () {
        };
        var z$365 = x$353;
        var result$367;
        for (var i$374 = 0; i$374 < 5; i$374++) {
            result$367 = i$374;
        }
        expect$319(i$374).to.be(5);
    });
    it('should basically work', function () {
        var obj$388 = {
                one: 1,
                two: 2
            }, _noop$389, one$390 = obj$388.one, two$391 = obj$388.two;
        expect$319(one$390).to.be(1);
        expect$319(two$391).to.be(2);
        var arr$405 = [
                1,
                2
            ], i$406 = 0, _noop$407, foo$408 = arr$405[i$406++], bar$409 = arr$405[i$406++];
        expect$319(foo$408).to.be(1);
        expect$319(bar$409).to.be(2);
        var result$411;
        var arr$415 = [
                1,
                2
            ];
        for (var arr = arr$415, i = 0, _noop, x$445 = arr[i++], y$446 = arr[i++]; x$445 < 10; x$445++) {
            result$411 = y$446 * 2;
        }
        expect$319(result$411).to.be(4);
    });
    it('should rename', function () {
        var obj$456 = {
                one: 1,
                two: 2
            }, _noop$457, val1$458 = obj$456.one;
        expect$319(val1$458).to.be(1);
    });
    it('should set default values', function () {
        var obj$472 = { two: 2 }, _noop$473, one$474 = obj$472.one || 1, two$475 = obj$472.two;
        expect$319(one$474).to.be(1);
        expect$319(two$475).to.be(2);
        var arr$489 = [1], i$490 = 0, _noop$491, foo$492 = arr$489[i$490++], bar$493 = arr$489[i$490++] || 2;
        expect$319(foo$492).to.be(1);
        expect$319(bar$493).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$517 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ], i$518 = 0, _noop$519, foo$520 = arr$517[i$518++], obj$521 = arr$517[i$518++], _noop$522, bar$523 = obj$521.bar, baz$524 = obj$521.baz;
        expect$319(foo$520).to.be(1);
        expect$319(bar$523).to.be(2);
        expect$319(baz$524).to.be(3);
        var arr$558 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ], i$559 = 0, _noop$560, one$561 = arr$558[i$559++], obj$562 = arr$558[i$559++], _noop$563, two$564 = obj$562.two, arr$565 = obj$562.nums, i$566 = 0, _noop$567, three$568 = arr$565[i$566++], four$569 = arr$565[i$566++];
        expect$319(one$561).to.be(1);
        expect$319(two$564).to.be(2);
        expect$319(three$568).to.be(3);
        expect$319(four$569).to.be(4);
        var obj$593 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            }, _noop$594, fiz$595 = obj$593.fiz, arr$596 = obj$593.biz, i$597 = 0, _noop$598, mum$599 = arr$596[i$597++], dum$600 = arr$596[i$597++];
        expect$319(fiz$595).to.be(5);
        expect$319(mum$599).to.be(8);
        expect$319(dum$600).to.be(9);
        var arr$624 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ], i$625 = 0, _noop$626, one_$627 = arr$624[i$625++], obj$628 = arr$624[i$625++], _noop$629, two_$630 = obj$628.two_, three_$631 = obj$628.three_ || 3000;
        expect$319(one_$627).to.be(1);
        expect$319(two_$630).to.be(2);
        expect$319(three_$631).to.be(3);
    });
    it('should handle elision', function () {
        var arr$653 = [
                1,
                2,
                3,
                4
            ], i$654 = 0, _noop$655, _noop$656 = arr$653[i$654++], _noop$657 = arr$653[i$654++], _noop$658 = arr$653[i$654++], four$659 = arr$653[i$654++];
        expect$319(four$659).to.be(4);
        var arr$689 = [
                1,
                2,
                3,
                4,
                5,
                6
            ], i$690 = 0, _noop$691, _noop$692 = arr$689[i$690++], _noop$693 = arr$689[i$690++], three$694 = arr$689[i$690++], _noop$695 = arr$689[i$690++], _noop$696 = arr$689[i$690++], six$697 = arr$689[i$690++];
        expect$319(three$694).to.be(3);
        expect$319(six$697).to.be(6);
    });
    it('should handle rest', function () {
        var arr$715 = [
                1,
                2,
                3,
                4
            ], i$716 = 0, _noop$717, one$718 = arr$715[i$716++], two$719 = arr$715[i$716++], rest$720 = arr$715.slice(i$716);
        expect$319(rest$720.length).to.be(2);
        expect$319(rest$720[0]).to.be(3);
        expect$319(rest$720[1]).to.be(4);
        var arr$738 = [
                1,
                2,
                3,
                4
            ], i$739 = 0, _noop$740, _noop$741 = arr$738[i$739++], _noop$742 = arr$738[i$739++], rest2$743 = arr$738.slice(i$739);
        expect$319(rest2$743.length).to.be(2);
        expect$319(rest2$743[0]).to.be(3);
        expect$319(rest2$743[1]).to.be(4);
    });
});
//# sourceMappingURL=destructure.js.map