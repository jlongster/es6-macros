'use strict';
var expect$1138 = require('expect.js');
describe('fat arrow', function () {
    it('should square array items', function () {
        var squared$1142 = [
                1,
                2,
                3
            ].map(function (x$1145) {
                return x$1145 * x$1145;
            });
        expect$1138(squared$1142[0]).to.be(1);
        expect$1138(squared$1142[1]).to.be(4);
        expect$1138(squared$1142[2]).to.be(9);
    });
    it('should square array items with explicit return', function () {
        var squared$1149 = [
                1,
                2,
                3
            ].map(function (x$1152) {
                return x$1152 * x$1152;
            }.bind(this));
        expect$1138(squared$1149[0]).to.be(1);
        expect$1138(squared$1149[1]).to.be(4);
        expect$1138(squared$1149[2]).to.be(9);
    });
    it('should not square array items', function () {
        var squared$1156 = [
                1,
                2,
                3
            ].map(function (x$1159) {
                x$1159 * x$1159;
            }.bind(this));
        expect$1138(squared$1156[0]).to.be(undefined);
        expect$1138(squared$1156[1]).to.be(undefined);
        expect$1138(squared$1156[2]).to.be(undefined);
    });
    it('should bind this correctly', function () {
        var obj$1163 = {
                id: 1,
                init: function () {
                    var id$1168 = function () {
                            return this.id;
                        }.bind(this);
                    return id$1168();
                }
            };
        expect$1138(obj$1163.init()).to.be(1);
    });
    it('should implicitly return object', function () {
        var obj$1173 = function (id$1174) {
            return { id: id$1174 };
        };
        expect$1138(obj$1173(1)).to.eql({ id: 1 });
    });
});