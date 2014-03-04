'use strict';
var expect$757 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$785;
        var y$789 = 5;
        var w$793 = function () {
        };
        var z$797 = x$785;
    }    // for($var i=0; i<5; i++) {
         // }
);
    it('should basically work', function () {
        var obj$804 = {
                one: 1,
                two: 2
            };
        ;
        var one$809 = obj$804.one;
        var two$813 = obj$804.two;
        expect$757(one$809).to.be(1);
        expect$757(two$813).to.be(2);
        var arr$820 = [
                1,
                2
            ];
        var i$821 = 0;
        ;
        var foo$826 = arr$820[i$821++];
        var bar$830 = arr$820[i$821++];
        expect$757(foo$826).to.be(1);
        expect$757(bar$830).to.be(2);
    }    // $var i = 0;
         // $var arr = [0, 5];
         // for($var [i, n] = arr; i < 10; i++) {
         //     expect(n).to.be(5);
         // }
);
    it('should rename', function () {
        var obj$836 = {
                one: 1,
                two: 2
            };
        ;
        var val1$841 = obj$836.one;
        expect$757(val1$841).to.be(1);
    });
    it('should set default values', function () {
        var obj$848 = { two: 2 };
        ;
        var one$853 = obj$848.one || 1;
        var two$857 = obj$848.two;
        expect$757(one$853).to.be(1);
        expect$757(two$857).to.be(2);
        var arr$864 = [1];
        var i$865 = 0;
        ;
        var foo$870 = arr$864[i$865++];
        var bar$874 = arr$864[i$865++] || 2;
        expect$757(foo$870).to.be(1);
        expect$757(bar$874).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$881 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ];
        var i$882 = 0;
        ;
        var foo$887 = arr$881[i$882++];
        var obj$894 = arr$881[i$882++];
        ;
        var bar$899 = obj$894.bar;
        var baz$903 = obj$894.baz;
        expect$757(foo$887).to.be(1);
        expect$757(bar$899).to.be(2);
        expect$757(baz$903).to.be(3);
        var arr$910 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ];
        var i$911 = 0;
        ;
        var one$916 = arr$910[i$911++];
        var obj$923 = arr$910[i$911++];
        ;
        var two$928 = obj$923.two;
        var arr$935 = obj$923.nums;
        var i$936 = 0;
        ;
        var three$941 = arr$935[i$936++];
        var four$945 = arr$935[i$936++];
        expect$757(one$916).to.be(1);
        expect$757(two$928).to.be(2);
        expect$757(three$941).to.be(3);
        expect$757(four$945).to.be(4);
        var obj$952 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            };
        ;
        var fiz$957 = obj$952.fiz;
        var arr$964 = obj$952.biz;
        var i$965 = 0;
        ;
        var mum$970 = arr$964[i$965++];
        var dum$974 = arr$964[i$965++];
        expect$757(fiz$957).to.be(5);
        expect$757(mum$970).to.be(8);
        expect$757(dum$974).to.be(9);
        var arr$981 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ];
        var i$982 = 0;
        ;
        var one_$987 = arr$981[i$982++];
        var obj$994 = arr$981[i$982++];
        ;
        var two_$999 = obj$994.two_;
        var three_$1003 = obj$994.three_ || 3000;
        expect$757(one_$987).to.be(1);
        expect$757(two_$999).to.be(2);
        expect$757(three_$1003).to.be(3);
    });
    it('should handle elision', function () {
        var arr$1012 = [
                1,
                2,
                3,
                4
            ];
        var i$1013 = 0;
        ;
        var _noop$1018 = arr$1012[i$1013++];
        var _noop$1022 = arr$1012[i$1013++];
        var _noop$1026 = arr$1012[i$1013++];
        var four$1030 = arr$1012[i$1013++];
        expect$757(four$1030).to.be(4);
        var arr$1041 = [
                1,
                2,
                3,
                4,
                5,
                6
            ];
        var i$1042 = 0;
        ;
        var _noop$1047 = arr$1041[i$1042++];
        var _noop$1051 = arr$1041[i$1042++];
        var three$1055 = arr$1041[i$1042++];
        var _noop$1059 = arr$1041[i$1042++];
        var _noop$1063 = arr$1041[i$1042++];
        var six$1067 = arr$1041[i$1042++];
        expect$757(three$1055).to.be(3);
        expect$757(six$1067).to.be(6);
    });
    it('should handle rest', function () {
        var arr$1075 = [
                1,
                2,
                3,
                4
            ];
        var i$1076 = 0;
        ;
        var one$1081 = arr$1075[i$1076++];
        var two$1085 = arr$1075[i$1076++];
        var rest$1089 = arr$1075.slice(i$1076);
        expect$757(rest$1089.length).to.be(2);
        expect$757(rest$1089[0]).to.be(3);
        expect$757(rest$1089[1]).to.be(4);
        var arr$1097 = [
                1,
                2,
                3,
                4
            ];
        var i$1098 = 0;
        ;
        var _noop$1103 = arr$1097[i$1098++];
        var _noop$1107 = arr$1097[i$1098++];
        var rest2$1111 = arr$1097.slice(i$1098);
        expect$757(rest2$1111.length).to.be(2);
        expect$757(rest2$1111[0]).to.be(3);
        expect$757(rest2$1111[1]).to.be(4);
    });
});