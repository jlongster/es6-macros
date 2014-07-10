"use strict";
var expect = require('expect.js');

describe('export', function() {

  it('should export identifiers', function() {
    var module = {exports: {}};
    var something = 'MAGIC';
    var something_else = 'NOT MAGIC';
    export { something, something_else };
    expect(module.exports.something).to.eql('MAGIC');
    expect(module.exports.something_else).to.eql('NOT MAGIC');
  });

  it('should export an identifier as default', function() {
    var module = {exports: {}};
    var something = 'MAGIC';
    export default something;
    expect(module.exports['default']).to.eql('MAGIC');
  });

  it('should export vars (short form)', function() {
    var module = {exports: {}};
    export var something = 'MAGIC';
    expect(something).to.eql('MAGIC');
    expect(module.exports.something).to.eql('MAGIC');
  });

  it('should export vars as default (short form)', function() {
    var module = {exports: {}};
    export default var something = 'MAGIC';
    expect(something).to.eql('MAGIC');
    expect(module.exports['default']).to.eql('MAGIC');
  });

  it('should export functions (short form)', function() {
    var module = {exports: {}};
    export function doSomething() { return 'MAGIC'; }
    expect(doSomething()).to.eql('MAGIC');
    expect(module.exports.doSomething()).to.eql('MAGIC');
  });

  it('should export functions as default (short form)', function() {
    var module = {exports: {}};
    export default function doSomething() { return 'MAGIC'; }
    expect(doSomething()).to.eql('MAGIC');
    expect(module.exports['default']()).to.eql('MAGIC');
  });

});
