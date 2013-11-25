'use strict';

var assert = require('assert');

macro testWithDecl {
    rule { $var } => {
        (function() {
            // basic destructuring
            $var {one, two} = { one: 1, two: 2 };
            assert.equal(one, 1);
            assert.equal(two, 2);

            $var [foo, bar] = [1, 2];
            assert.equal(foo, 1);
            assert.equal(bar, 2);
        })();

        (function() {
            // renaming
            $var { one: val1 } = { one: 1, two: 2 };
            assert.equal(val1, 1);
        })();

        (function() {
            // default values
            $var {one = 1, two} = { two: 2 };
            assert.equal(one, 1);
            assert.equal(two, 2);

            $var [foo, bar = 2] = [1];
            assert.equal(foo, 1);
            assert.equal(bar, 2);
        })();

        (function() {
            // multiple levels of destructuring
            $var [foo, {bar, baz}] = [1, { bar: 2, baz: 3 }];
            assert.equal(foo, 1);
            assert.equal(bar, 2);
            assert.equal(baz, 3);

            $var [one, {two, nums: [three, four]}] = [1, { two: 2, nums: [3, 4] }];
            assert.equal(one, 1);
            assert.equal(two, 2);
            assert.equal(three, 3);
            assert.equal(four, 4);

            $var { fiz, biz: [mum, dum] } = { biz: [8, 9], fiz: 5 };
            assert.equal(fiz, 5);
            assert.equal(mum, 8);
            assert.equal(dum, 9);
        })();

        (function() {
            // default values deep down
            $var [one, {two, three = 3000}] = [1, { two: 2, three: 3 }];
            assert.equal(one, 1);
            assert.equal(two, 2);
            assert.equal(three, 3);
        })();
    }
}

testWithDecl var
testWithDecl let
testWithDecl const
