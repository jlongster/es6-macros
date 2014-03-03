'use strict';
var expect$718 = require('expect.js');
describe('destructuring ' + 'var' + ' keyword', function () {
    it('should handle normal declarations', function () {
        var x$745;
        var y$747 = 5;
        var w$749 = function () {
        };
        var z$751 = x$745;
    }    // for($var i=0; i<5; i++) {
         // }
);
    it('should basically work', function () {
        var obj$758 = {
                one: 1,
                two: 2
            };
        ;
        var one$763 = obj$758.one;
        var two$767 = obj$758.two;
        expect$718(one$763).to.be(1);
        expect$718(two$767).to.be(2);
        var arr$774 = [
                1,
                2
            ];
        var i$775 = 0;
        ;
        var foo$780 = arr$774[i$775++];
        var bar$784 = arr$774[i$775++];
        expect$718(foo$780).to.be(1);
        expect$718(bar$784).to.be(2);
    }    // $var i = 0;
         // $var arr = [0, 5];
         // for($var [i, n] = arr; i < 10; i++) {
         //     expect(n).to.be(5);
         // }
);
    it('should rename', function () {
        var obj$790 = {
                one: 1,
                two: 2
            };
        ;
        var val1$795 = obj$790.one;
        expect$718(val1$795).to.be(1);
    });
    it('should set default values', function () {
        var obj$802 = { two: 2 };
        ;
        var one$807 = obj$802.one || 1;
        var two$811 = obj$802.two;
        expect$718(one$807).to.be(1);
        expect$718(two$811).to.be(2);
        var arr$818 = [1];
        var i$819 = 0;
        ;
        var foo$824 = arr$818[i$819++];
        var bar$828 = arr$818[i$819++] || 2;
        expect$718(foo$824).to.be(1);
        expect$718(bar$828).to.be(2);
    });
    it('should handle multiple levels', function () {
        var arr$835 = [
                1,
                {
                    bar: 2,
                    baz: 3
                }
            ];
        var i$836 = 0;
        ;
        var foo$841 = arr$835[i$836++];
        var obj$848 = arr$835[i$836++];
        ;
        var bar$853 = obj$848.bar;
        var baz$857 = obj$848.baz;
        expect$718(foo$841).to.be(1);
        expect$718(bar$853).to.be(2);
        expect$718(baz$857).to.be(3);
        var arr$864 = [
                1,
                {
                    two: 2,
                    nums: [
                        3,
                        4
                    ]
                }
            ];
        var i$865 = 0;
        ;
        var one$870 = arr$864[i$865++];
        var obj$877 = arr$864[i$865++];
        ;
        var two$882 = obj$877.two;
        var arr$889 = obj$877.nums;
        var i$890 = 0;
        ;
        var three$895 = arr$889[i$890++];
        var four$899 = arr$889[i$890++];
        expect$718(one$870).to.be(1);
        expect$718(two$882).to.be(2);
        expect$718(three$895).to.be(3);
        expect$718(four$899).to.be(4);
        var obj$906 = {
                biz: [
                    8,
                    9
                ],
                fiz: 5
            };
        ;
        var fiz$911 = obj$906.fiz;
        var arr$918 = obj$906.biz;
        var i$919 = 0;
        ;
        var mum$924 = arr$918[i$919++];
        var dum$928 = arr$918[i$919++];
        expect$718(fiz$911).to.be(5);
        expect$718(mum$924).to.be(8);
        expect$718(dum$928).to.be(9);
        var arr$935 = [
                1,
                {
                    two_: 2,
                    three_: 3
                }
            ];
        var i$936 = 0;
        ;
        var one_$941 = arr$935[i$936++];
        var obj$948 = arr$935[i$936++];
        ;
        var two_$953 = obj$948.two_;
        var three_$957 = obj$948.three_ || 3000;
        expect$718(one_$941).to.be(1);
        expect$718(two_$953).to.be(2);
        expect$718(three_$957).to.be(3);
    });
    it('should handle elision', function () {
        var arr$966 = [
                1,
                2,
                3,
                4
            ];
        var i$967 = 0;
        ;
        var _noop$972 = arr$966[i$967++];
        var _noop$976 = arr$966[i$967++];
        var _noop$980 = arr$966[i$967++];
        var four$984 = arr$966[i$967++];
        expect$718(four$984).to.be(4);
        var arr$995 = [
                1,
                2,
                3,
                4,
                5,
                6
            ];
        var i$996 = 0;
        ;
        var _noop$1001 = arr$995[i$996++];
        var _noop$1005 = arr$995[i$996++];
        var three$1009 = arr$995[i$996++];
        var _noop$1013 = arr$995[i$996++];
        var _noop$1017 = arr$995[i$996++];
        var six$1021 = arr$995[i$996++];
        expect$718(three$1009).to.be(3);
        expect$718(six$1021).to.be(6);
    });
    it('should handle rest', function () {
        var arr$1029 = [
                1,
                2,
                3,
                4
            ];
        var i$1030 = 0;
        ;
        var one$1035 = arr$1029[i$1030++];
        var two$1039 = arr$1029[i$1030++];
        var rest$1043 = arr$1029.slice(i$1030);
        expect$718(rest$1043.length).to.be(2);
        expect$718(rest$1043[0]).to.be(3);
        expect$718(rest$1043[1]).to.be(4);
        var arr$1051 = [
                1,
                2,
                3,
                4
            ];
        var i$1052 = 0;
        ;
        var _noop$1057 = arr$1051[i$1052++];
        var _noop$1061 = arr$1051[i$1052++];
        var rest2$1065 = arr$1051.slice(i$1052);
        expect$718(rest2$1065.length).to.be(2);
        expect$718(rest2$1065[0]).to.be(3);
        expect$718(rest2$1065[1]).to.be(4);
    });
});