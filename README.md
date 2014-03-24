# es6-macros

This is a collection of [sweet.js](http://sweetjs.org/) macros that
implement syntactic ES6 features that can be easily compiled out to
ES5 JavaScript, which can be used today everywhere.

Currently implemented:

* destructuring (including elision and rest)
* classes
* fat arrow functions

TODO:

* rest and default arguments
* spread operator for applying arguments
* possibly limited `for of` support
* possibly limited module support

## Using

```
$ npm install sweet.js es6-macros
```

Write your improved ES6 JavaScript, and compile it:

```
$ sjs -c -m es6-macros -o <file>.js <file>.sjs
```

The `-c` parameter will generate a sourcemap so you get good debugging
too! For the above to work right now, I think you need to use the
master version of sweet.js (because it fixes some module importing
issues): `$ npm install https://github.com/mozilla/sweet.js.git`

We are working on a [grunt
task](https://github.com/jlongster/grunt-sweet.js) to make this
easier.

## Contributing

To run the tests:

```bash
npm install
make
```
