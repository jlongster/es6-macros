"use strict";
var expect = require('expect.js');

describe('fat arrow', function() {
    it('should square array items', function() {
        var squared = [1,2,3].map(x => x * x)
        expect(squared[0]).to.be(1);
        expect(squared[1]).to.be(4);
        expect(squared[2]).to.be(9);
    });

    it('should square array items with explicit return', function() {
        var squared = [1,2,3].map((x) => {
            return x * x
        });
        expect(squared[0]).to.be(1);
        expect(squared[1]).to.be(4);
        expect(squared[2]).to.be(9);
    });

    it('should not square array items', function() {
        var squared = [1,2,3].map((x) => {
            x * x
        });
        expect(squared[0]).to.be(undefined);
        expect(squared[1]).to.be(undefined);
        expect(squared[2]).to.be(undefined);
    });

    it('should bind this correctly', function() {
        var obj = {
            id: 1,
            getId: () => this.id
        };
        expect(obj.getId()).to.be(1);
    });

    it('should implicitly return object', function() {
        var obj = id => ({ id: id });
        expect(obj(1)).to.be({id: 1});
    });
});
