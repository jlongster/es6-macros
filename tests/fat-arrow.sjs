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

  it('should bind this for infix 0 arguments', function() {
    var obj = {
      id: 1,
      getter: function() {
        var f = () => this.id;
        return f();
      }
    };
    expect(obj.getter()).to.be(1);
  });

  it('should bind this for infix 1 arguments', function() {
    var obj = {
      id: 1,
      adder: function(x) {
        var f = x => this.id + x;
        return f(x)
      }
    };
    expect(obj.adder(5)).to.be(6);
  });

  it('should bind this for block syntax', function() {
    var obj = {
      id: 1,
      subtractor: function(x) {
        var f = (x, y, z) => {
          return this.id - x - y - z;
        }
        return f(x, 1, 2)
      }
    };
    expect(obj.subtractor(5)).to.be(-7);
  });

  it('should bind this for single-param block syntax', function() {
    var obj = {
      id: 1,
      subtractor: function(x) {
        var f = x => {
          return this.id - x;
        }
        return f(x)
      }
    };
    expect(obj.subtractor(5)).to.be(-4);
  });

  it('should implicitly return object', function() {
    var obj = id => ({ id: id });
    expect(obj(1)).to.eql({id: 1});
  });

  it('should implicitly return object', function() {
    var obj = id => ({ id: id });
    expect(obj(1)).to.eql({id: 1});
  });

  it('should interpret `arguments` as belonging to containing function', function() {
    var obj = {
      id: 1,
      subtractor: function() {
        var f = () => this.id - arguments[0];
        return f();
      }
    };
    expect(obj.subtractor(5)).to.be(-4);

    function func() {
      var f = () => function(x) {
        return arguments[0];
      }
      return f()(1);
    }
    expect(func()).to.be(1);

    var foo = () => function() {
      var bar = { arguments: 5 };
      return bar.arguments;
    }
    expect(foo()()).to.be(5);
});
});
