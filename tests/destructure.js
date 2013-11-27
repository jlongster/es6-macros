'use strict';
var expect$317 = require('expect.js');
;
describe('var' + ' keyword', function () {
    it('should basically work', function () {
        var obj$358 = {
                one: 1,
                two: 2
            };
        var one$362 = obj$358.one;
        var two$366 = obj$358.two;
        ;
        expect$317(one$362).to.be(1);
        expect$317(two$366).to.be(2);
        var arr$373 = [
                1,
                2
            ];
        var i$374 = 0;
        var foo$378 = arr$373[i$374++];
        var bar$382 = arr$373[i$374++];
        ;
        expect$317(foo$378).to.be(1);
        expect$317(bar$382).to.be(2);
    });
    it('should rename', function () {
        var obj$388 = {
                one: 1,
                two: 2
            };
        var val1$392 = obj$388.one;
        ;
        expect$317(val1$392).to.be(1);
    });
    it('should set default values', function () {
        var obj$399 = { two: 2 };
        var one$403 = obj$399.one || 1;
        var two$407 = obj$399.two;
        ;
        expect$317(one$403).to.be(1);
        expect$317(two$407).to.be(2);
        var arr$414 = [1];
        var i$415 = 0;
        var foo$419 = arr$414[i$415++];
        var bar$423 = arr$414[i$415++] || 2;
        ;
        expect$317(foo$419).to.be(1);
        expect$317(bar$423).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$430 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ];
        var i$431 = 0;
        var foo$435 = arr$430[i$431++];
        var obj$442 = arr$430[i$431++];
        var bar$446 = obj$442.bar;
        var baz$450 = obj$442.baz;
        ;
        expect$317(foo$435).to.be(1);
        expect$317(bar$446).to.be(2);
        expect$317(baz$450).to.be(3);
        var arr$457 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ];
        var i$458 = 0;
        var one$462 = arr$457[i$458++];
        var obj$469 = arr$457[i$458++];
        var two$473 = obj$469.two;
        var arr$480 = obj$469.nums;
        var i$481 = 0;
        var three$485 = arr$480[i$481++];
        var four$489 = arr$480[i$481++];
        ;
        expect$317(one$462).to.be(1);
        expect$317(two$473).to.be(2);
        expect$317(three$485).to.be(3);
        expect$317(four$489).to.be(4);
        var obj$496 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            };
        var fiz$500 = obj$496.fiz;
        var arr$507 = obj$496.biz;
        var i$508 = 0;
        var mum$512 = arr$507[i$508++];
        var dum$516 = arr$507[i$508++];
        ;
        expect$317(fiz$500).to.be(5);
        expect$317(mum$512).to.be(8);
        expect$317(dum$516).to.be(9);
        var arr$523 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ];
        var i$524 = 0;
        var one_$528 = arr$523[i$524++];
        var obj$535 = arr$523[i$524++];
        var two_$539 = obj$535.two_;
        var three_$543 = obj$535.three_ || 3000;
        ;
        expect$317(one_$528).to.be(1);
        expect$317(two_$539).to.be(2);
        expect$317(three_$543).to.be(3);
    });
});
describe('let' + ' keyword', function () {
    it('should basically work', function () {
        var obj$550 = {
                one: 1,
                two: 2
            };
        let one = obj$550.one;
        let two = obj$550.two;
        ;
        expect$317(one).to.be(1);
        expect$317(two).to.be(2);
        var arr$563 = [
                1,
                2
            ];
        var i$564 = 0;
        let foo = arr$563[i$564++];
        let bar = arr$563[i$564++];
        ;
        expect$317(foo).to.be(1);
        expect$317(bar).to.be(2);
    });
    it('should rename', function () {
        var obj$576 = {
                one: 1,
                two: 2
            };
        let val1 = obj$576.one;
        ;
        expect$317(val1).to.be(1);
    });
    it('should set default values', function () {
        var obj$586 = { two: 2 };
        let one = obj$586.one || 1;
        let two = obj$586.two;
        ;
        expect$317(one).to.be(1);
        expect$317(two).to.be(2);
        var arr$599 = [1];
        var i$600 = 0;
        let foo = arr$599[i$600++];
        let bar = arr$599[i$600++] || 2;
        ;
        expect$317(foo).to.be(1);
        expect$317(bar).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$613 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ];
        var i$614 = 0;
        let foo = arr$613[i$614++];
        var obj$624 = arr$613[i$614++];
        let bar = obj$624.bar;
        let baz = obj$624.baz;
        ;
        expect$317(foo).to.be(1);
        expect$317(bar).to.be(2);
        expect$317(baz).to.be(3);
        var arr$637 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ];
        var i$638 = 0;
        let one = arr$637[i$638++];
        var obj$648 = arr$637[i$638++];
        let two = obj$648.two;
        var arr$658 = obj$648.nums;
        var i$659 = 0;
        let three = arr$658[i$659++];
        let four = arr$658[i$659++];
        ;
        expect$317(one).to.be(1);
        expect$317(two).to.be(2);
        expect$317(three).to.be(3);
        expect$317(four).to.be(4);
        var obj$672 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            };
        let fiz = obj$672.fiz;
        var arr$682 = obj$672.biz;
        var i$683 = 0;
        let mum = arr$682[i$683++];
        let dum = arr$682[i$683++];
        ;
        expect$317(fiz).to.be(5);
        expect$317(mum).to.be(8);
        expect$317(dum).to.be(9);
        var arr$696 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ];
        var i$697 = 0;
        let one_ = arr$696[i$697++];
        var obj$707 = arr$696[i$697++];
        let two_ = obj$707.two_;
        let three_ = obj$707.three_ || 3000;
        ;
        expect$317(one_).to.be(1);
        expect$317(two_).to.be(2);
        expect$317(three_).to.be(3);
    });
});
describe('const' + ' keyword', function () {
    it('should basically work', function () {
        var obj$720 = {
                one: 1,
                two: 2
            };
        const one = obj$720.one;
        const two = obj$720.two;
        ;
        expect$317(one).to.be(1);
        expect$317(two).to.be(2);
        var arr$733 = [
                1,
                2
            ];
        var i$734 = 0;
        const foo = arr$733[i$734++];
        const bar = arr$733[i$734++];
        ;
        expect$317(foo).to.be(1);
        expect$317(bar).to.be(2);
    });
    it('should rename', function () {
        var obj$746 = {
                one: 1,
                two: 2
            };
        const val1 = obj$746.one;
        ;
        expect$317(val1).to.be(1);
    });
    it('should set default values', function () {
        var obj$756 = { two: 2 };
        const one = obj$756.one || 1;
        const two = obj$756.two;
        ;
        expect$317(one).to.be(1);
        expect$317(two).to.be(2);
        var arr$769 = [1];
        var i$770 = 0;
        const foo = arr$769[i$770++];
        const bar = arr$769[i$770++] || 2;
        ;
        expect$317(foo).to.be(1);
        expect$317(bar).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$783 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ];
        var i$784 = 0;
        const foo = arr$783[i$784++];
        var obj$794 = arr$783[i$784++];
        const bar = obj$794.bar;
        const baz = obj$794.baz;
        ;
        expect$317(foo).to.be(1);
        expect$317(bar).to.be(2);
        expect$317(baz).to.be(3);
        var arr$807 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ];
        var i$808 = 0;
        const one = arr$807[i$808++];
        var obj$818 = arr$807[i$808++];
        const two = obj$818.two;
        var arr$828 = obj$818.nums;
        var i$829 = 0;
        const three = arr$828[i$829++];
        const four = arr$828[i$829++];
        ;
        expect$317(one).to.be(1);
        expect$317(two).to.be(2);
        expect$317(three).to.be(3);
        expect$317(four).to.be(4);
        var obj$842 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            };
        const fiz = obj$842.fiz;
        var arr$852 = obj$842.biz;
        var i$853 = 0;
        const mum = arr$852[i$853++];
        const dum = arr$852[i$853++];
        ;
        expect$317(fiz).to.be(5);
        expect$317(mum).to.be(8);
        expect$317(dum).to.be(9);
        var arr$866 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ];
        var i$867 = 0;
        const one_ = arr$866[i$867++];
        var obj$877 = arr$866[i$867++];
        const two_ = obj$877.two_;
        const three_ = obj$877.three_ || 3000;
        ;
        expect$317(one_).to.be(1);
        expect$317(two_).to.be(2);
        expect$317(three_).to.be(3);
    });
});
//# sourceMappingURL=destructure.js.map