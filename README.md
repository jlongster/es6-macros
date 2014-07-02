# es6-macros

This is a collection of [sweet.js](http://sweetjs.org/) macros that
implement syntactic ES6 features that can be easily compiled out to
ES5 JavaScript, which can be used today everywhere.

**Warning**: This is still in development and most of these features are not completely compliant with ES6 yet. I wouldn't recommend using it for production code yet.

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
$ sjs -m es6-macros file.js
```

If you pass `-c` to sjs along with `-o output.js`, it will generate a
sourcemap so you get good debugging too!

## Contributing

To run the tests:

```bash
npm install
make
```
