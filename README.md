# model-transform

Common toJSON Transform for KeystoneJS / Mongoose Models.

Automatically renames `_id` to `id`, removes `__v` and can optionally run an additional transform.

The transform method may return a new object, or modify the provided one by reference.

## Usage

```
npm install model-transform --save
```

```js
var keystone = require('keystone');
var transform = require('model-transform');

var User = new keystone.List('User');
User.add({
	/* fields */
	// add a field you never want included in JSON data
	somethingPrivate: String
});

// add a virtual that you always want included in JSON data
User.schema.virtual('includeMe').get(function() {
	return true;
});

transform.toJSON(User, function(doc, rtn) {
	// add individual virtual properties
	rtn.includeMe = doc.includeMe;
	// delete private properties
	delete rtn.somethingPrivate;
	// return is optional becuase we've modified rtn by reference
	// return rtn;
});

User.register();
```


# License

The MIT License (MIT)

Copyright (c) 2015 Jed Watson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
