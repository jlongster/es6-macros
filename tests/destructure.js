'use strict';
var expect$771 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$798;
        var y$802 = 5;
        var w$806 = function () {
        };
        var z$810 = x$798;
    }    // for($var i=0; i<5; i++) {
         // }
);
    it('should basically work', function () {
        var obj$817 = {
                one: 1,
                two: 2
            };
        ;
        var one$822 = obj$817.one;
        var two$826 = obj$817.two;
        expect$771(one$822).to.be(1);
        expect$771(two$826).to.be(2);
        var arr$833 = [
                1,
                2
            ];
        var i$834 = 0;
        ;
        var foo$839 = arr$833[i$834++];
        var bar$843 = arr$833[i$834++];
        expect$771(foo$839).to.be(1);
        expect$771(bar$843).to.be(2);
    }    // $var i = 0;
         // $var arr = [0, 5];
         // for($var [i, n] = arr; i < 10; i++) {
         //     expect(n).to.be(5);
         // }
);
    it('should rename', function () {
        var obj$849 = {
                one: 1,
                two: 2
            };
        ;
        var val1$854 = obj$849.one;
        expect$771(val1$854).to.be(1);
    });
    it('should set default values', function () {
        var obj$861 = { two: 2 };
        ;
        var one$866 = obj$861.one || 1;
        var two$870 = obj$861.two;
        expect$771(one$866).to.be(1);
        expect$771(two$870).to.be(2);
        var arr$877 = [1];
        var i$878 = 0;
        ;
        var foo$883 = arr$877[i$878++];
        var bar$887 = arr$877[i$878++] || 2;
        expect$771(foo$883).to.be(1);
        expect$771(bar$887).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$894 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ];
        var i$895 = 0;
        ;
        var foo$900 = arr$894[i$895++];
        var obj$907 = arr$894[i$895++];
        ;
        var bar$912 = obj$907.bar;
        var baz$916 = obj$907.baz;
        expect$771(foo$900).to.be(1);
        expect$771(bar$912).to.be(2);
        expect$771(baz$916).to.be(3);
        var arr$923 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ];
        var i$924 = 0;
        ;
        var one$929 = arr$923[i$924++];
        var obj$936 = arr$923[i$924++];
        ;
        var two$941 = obj$936.two;
        var arr$948 = obj$936.nums;
        var i$949 = 0;
        ;
        var three$954 = arr$948[i$949++];
        var four$958 = arr$948[i$949++];
        expect$771(one$929).to.be(1);
        expect$771(two$941).to.be(2);
        expect$771(three$954).to.be(3);
        expect$771(four$958).to.be(4);
        var obj$965 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            };
        ;
        var fiz$970 = obj$965.fiz;
        var arr$977 = obj$965.biz;
        var i$978 = 0;
        ;
        var mum$983 = arr$977[i$978++];
        var dum$987 = arr$977[i$978++];
        expect$771(fiz$970).to.be(5);
        expect$771(mum$983).to.be(8);
        expect$771(dum$987).to.be(9);
        var arr$994 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ];
        var i$995 = 0;
        ;
        var one_$1000 = arr$994[i$995++];
        var obj$1007 = arr$994[i$995++];
        ;
        var two_$1012 = obj$1007.two_;
        var three_$1016 = obj$1007.three_ || 3000;
        expect$771(one_$1000).to.be(1);
        expect$771(two_$1012).to.be(2);
        expect$771(three_$1016).to.be(3);
    });
    it('should handle elision', function () {
        var arr$1025 = [
                1,
                2,
                3,
                4
            ];
        var i$1026 = 0;
        ;
        var _noop$1031 = arr$1025[i$1026++];
        var _noop$1035 = arr$1025[i$1026++];
        var _noop$1039 = arr$1025[i$1026++];
        var four$1043 = arr$1025[i$1026++];
        expect$771(four$1043).to.be(4);
        var arr$1054 = [
                1,
                2,
                3,
                4,
                5,
                6
            ];
        var i$1055 = 0;
        ;
        var _noop$1060 = arr$1054[i$1055++];
        var _noop$1064 = arr$1054[i$1055++];
        var three$1068 = arr$1054[i$1055++];
        var _noop$1072 = arr$1054[i$1055++];
        var _noop$1076 = arr$1054[i$1055++];
        var six$1080 = arr$1054[i$1055++];
        expect$771(three$1068).to.be(3);
        expect$771(six$1080).to.be(6);
    });
    it('should handle rest', function () {
        var arr$1088 = [
                1,
                2,
                3,
                4
            ];
        var i$1089 = 0;
        ;
        var one$1094 = arr$1088[i$1089++];
        var two$1098 = arr$1088[i$1089++];
        var rest$1102 = arr$1088.slice(i$1089);
        expect$771(rest$1102.length).to.be(2);
        expect$771(rest$1102[0]).to.be(3);
        expect$771(rest$1102[1]).to.be(4);
        var arr$1110 = [
                1,
                2,
                3,
                4
            ];
        var i$1111 = 0;
        ;
        var _noop$1116 = arr$1110[i$1111++];
        var _noop$1120 = arr$1110[i$1111++];
        var rest2$1124 = arr$1110.slice(i$1111);
        expect$771(rest2$1124.length).to.be(2);
        expect$771(rest2$1124[0]).to.be(3);
        expect$771(rest2$1124[1]).to.be(4);
    });
});