"use strict";
var expect = require('expect.js');

describe('import', function() {
  it('should import whole modules', function() {
    var require = function(arg) {
      expect(arg).to.eql('modulename');
      return 'MAGIC';
    }
    import * as $ from 'modulename';
    expect($).to.eql('MAGIC');
  });

  it('should import default exports', function() {
    var require = function(arg) {
      expect(arg).to.eql('modulename');
      return {'default': 'MAGIC'};
    }
    import $ from 'modulename';
    expect($).to.eql('MAGIC');
  });

  it('should import multiple exports with renaming', function() {
    var require = function(arg) {
      expect(arg).to.eql('modulename');
      return {'one': 1, 'two': 2};
    }
    import { one as first, two } from 'modulename';
    expect(first).to.eql(1);
    expect(two).to.eql(2);
  });

  it('should import multiple exports and the default', function() {
    var require = function(arg) {
      expect(arg).to.eql('modulename');
      return {'default': 0, 'one': 1, 'two': 2};
    }
    import dflt, { one as first, two } from 'modulename';
    expect(dflt).to.eql(0);
    expect(first).to.eql(1);
    expect(two).to.eql(2);
  });

  it('should import as nothing for side effects', function() {
    var some_outside_thing = 0;
    var require = function(arg) {
      expect(arg).to.eql('modulename');
      some_outside_thing = 1;
    }
    import 'modulename';
    expect(some_outside_thing).to.eql(1);
  });

});
