# es6-macros

This is a collection of [sweet.js](http://sweetjs.org/) macros that
implement syntactic ES6 features that can be easily compiled out to
ES5 JavaScript, which can be used today everywhere.

**Warning**: This is still in development and most of these features are not completely compliant with ES6 yet. I wouldn't recommend using it for production code yet.

Currently implemented:

* destructuring (including elision and rest)
* classes
* fat arrow functions
* (limited) [module](http://jsmodules.io) support

TODO:

* rest and default arguments
* spread operator for applying arguments
* possibly limited `for of` support

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

## Examples

```js
import { writeFile } from 'fs'; // var fs = require('fs'); writeFile = fs.writeFile
import * as moment from 'moment'; // var moment = require('moment')

function writeTime(filename) {
  writeFile(filename, moment().format('hh:mm:ss'), () => console.log('Done'))
}

// export writeTime; // single exports don't work because Sweet.js itself uses `export`
export default writeTime;
export { writeTime };

export var something = 'hello world'; // short form works with vars, functions and classes
```

## Contributing

To run the tests:

```bash
npm install
make
```
