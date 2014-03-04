'use strict';
var expect$1125 = require('expect.js');
describe('fat arrow', function () {
    it('should square array items', function () {
        var squared$1129 = [
                1,
                2,
                3
            ].map(function (x$1132) {
                return x$1132 * x$1132;
            });
        expect$1125(squared$1129[0]).to.be(1);
        expect$1125(squared$1129[1]).to.be(4);
        expect$1125(squared$1129[2]).to.be(9);
    });
    it('should square array items with explicit return', function () {
        var squared$1136 = [
                1,
                2,
                3
            ].map(function (x$1139) {
                return x$1139 * x$1139;
            }.bind(this));
        expect$1125(squared$1136[0]).to.be(1);
        expect$1125(squared$1136[1]).to.be(4);
        expect$1125(squared$1136[2]).to.be(9);
    });
    it('should not square array items', function () {
        var squared$1143 = [
                1,
                2,
                3
            ].map(function (x$1146) {
                x$1146 * x$1146;
            }.bind(this));
        expect$1125(squared$1143[0]).to.be(undefined);
        expect$1125(squared$1143[1]).to.be(undefined);
        expect$1125(squared$1143[2]).to.be(undefined);
    });
    it('should bind this correctly', function () {
        var obj$1150 = {
                id: 1,
                getId: function () {
                    return this.id;
                }.bind(this)
            };
        expect$1125(obj$1150.getId()).to.be(1);
    });
    it('should implicitly return object', function () {
        var obj$1156 = function (id$1157) {
            return { id: id$1157 };
        };
        expect$1125(obj$1156(1)).to.be({ id: 1 });
    });
});