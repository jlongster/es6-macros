'use strict';
var expect = require('expect.js');

describe('default parameter', function() {
    it('should leave normal functions', function() {
        var fn = function(a) {
            return a;
        };
        expect(fn(1)).to.be(1);
    });
    if('should handle default parameter only', function() {
        var fn = function(a=1) {
            return a;
        };
        expect(fn()).to.be(1);
        expect(fn(2)).to.be(2);
    });
    it('should handle regular and default parameter', function() {
        var fn = function(a, b=2, c=8) {
            return [a, b, c];
        };
        expect(fn(1)).to.eql([1, 2, 8]);
        expect(fn(1, 5)).to.eql([1, 5, 8]);
        expect(fn(1, 5, 7)).to.eql([1, 5, 7]);
    });
});

describe('rest parameter', function() {
    it('should handle rest parameter only', function() {
        var fn = function(...d) {
            return d;
        };
        expect(fn()).to.be.an('array');
        expect(fn(1)).to.eql([1]);
        expect(fn(1, 2, 3)).to.eql([1, 2, 3]);
    });
    it('should handle default and rest parameter', function() {
        var fn = function(a, ...d) {
            return d;
        };
        expect(fn()).to.be.an('array');
        expect(fn(1)).to.eql([]);
        expect(fn(1, 2)).to.eql([2]);
        expect(fn(1, 2, 3)).to.eql([2, 3]);
    });
});

describe('default and rest parameter', function() {
    it('should handle default and rest parameter', function() {
        var fn = function(a=1, b=2, ...c) {
            return { a: a, b: b, c: c };
        };
        expect(fn()).to.eql({ a: 1, b: 2, c: [] });
        expect(fn(5)).to.eql({ a: 5, b: 2, c: [] });
        expect(fn(5, 6)).to.eql({ a: 5, b: 6, c: [] });
        expect(fn(5, 6, 8)).to.eql({ a: 5, b: 6, c: [8] });
        expect(fn(5, 6, 8, 9)).to.eql({ a: 5, b: 6, c: [8, 9] });
    });

    it('should handle regular, default and rest parameter', function() {
        var fn = function(a, b=2, ...c) {
            return { a: a, b: b, c: c };
        };
        expect(fn()).to.eql({ a: undefined, b: 2, c: [] });
        expect(fn(4)).to.eql({ a: 4, b: 2, c: [] });
        expect(fn(4, 5)).to.eql({ a: 4, b: 5, c: [] });
        expect(fn(4, 5, 7)).to.eql({ a: 4, b: 5, c: [7] });
        expect(fn(4, 5, 7, 'ad')).to.eql({ a: 4, b: 5, c: [7, 'ad'] });
    });
});
