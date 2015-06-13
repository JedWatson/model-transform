function modelToJSON(schema, fn) {
	schema.set('toJSON', { transform: function(doc, rtn, options) {
		rtn.id = rtn._id;
		delete rtn._id;
		delete rtn.__v;
		if (fn) {
			var result = fn(doc, rtn, options);
			if (result) rtn = result;
		}
		return rtn;
	}});
}

module.toJSON = modelToJSON;
