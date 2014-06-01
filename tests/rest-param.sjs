"use strict";
var expect = require('expect.js');

describe('rest param', function() {
	it('puts all arguments into an array', function() {
		var i = (function(...x) { return x; })(1, 2, 3);
		expect(i.length).to.be(3);
		expect(i[0]).to.be(1);
		expect(i[1]).to.be(2);
		expect(i[2]).to.be(3);
	});

	it('puts remaining arguments into an array', function() {
		var i, j;
		function f(x, ...y) {
			i = x;
			j = y;
		}
		f(1, 2, 3);

		expect(i).to.be(1);
		expect(j.length).to.be(2);
		expect(j[0]).to.be(2);
		expect(j[1]).to.be(3);
	});
});
