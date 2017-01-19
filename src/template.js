define([], function(){
	return function(obj) {
obj || (obj = {});
var __t, __p = '';
with (obj) {
__p += 'define(' +
((__t = ( imports )) == null ? '' : __t) +
', function(' +
((__t = ( args )) == null ? '' : __t) +
'){\n\n	var tokens = ' +
((__t = ( intermediate )) == null ? '' : __t) +
';\n\n	var renderer = stache(tokens);\n\n	var isNode = typeof process === "object" && {}.toString.call(process) === "[object process]";\n\n	// SSR helpers isProduction, and some that don\'t matter in the client.\n	stache.registerHelper("isProduction", function(options){\n		var loader = typeof System !== "undefined" ? System : undefined;\n		if(loader && loader.isEnv && loader.isEnv("production")) {\n			return options.fn(this);\n		} else {\n			return options.inverse(this);\n		}\n	});\n\n	function systemImportZone(){\n		var oldImport;\n		var myImport = function(){\n			return Promise.resolve(oldImport.apply(this, arguments));\n		};\n		return {\n			beforeTask: function(){\n				oldImport = System.import;\n				System.import = myImport;\n			},\n			afterTask: function(){\n				System.import = oldImport;\n			}\n		};\n	}\n\n	var slice = Array.prototype.slice;\n	function makeArray(parent) {\n		return slice.call(childNodes(parent));\n	}\n\n	var autorender = {\n		renderToFrag: function(scope, options){\n			var moduleOptions = { module: module };\n			options = (options && options.add) ? options.add(moduleOptions) :\n				moduleOptions;\n			return renderer(scope, options);\n		},\n		start: function(){\n			var autorender = this;\n			new Zone({\n				plugins: [xhrZone, systemImportZone]\n			}).run(function(){\n				var state = autorender.state = new autorender.viewModel;\n				var docEl = document.documentElement;\n				domData.set.call(docEl, "viewModel", state);\n\n				route.data = state;\n				route.ready();\n\n				autorender.rerender();\n			});\n		},\n		rerender: function(){\n			var keep = { "SCRIPT": true, "STYLE": true, "LINK": true };\n			function eachChild(parent, callback){\n				var nodes = makeArray(parent), node;\n				var i = 0, len = nodes.length;\n\n				for(; i < len; i++) {\n					node = nodes[i];\n					if(!keep[node.nodeName]) {\n						if(callback(node) === false) {\n							break;\n						}\n					}\n				}\n			}\n\n			function remove(el) {\n				mutate.removeChild.call(el.parentNode, el);\n			}\n\n			function appendTo(parent){\n				return function(el){\n					mutate.appendChild.call(parent, el);\n				}\n			}\n\n			function traverse(node, tagName){\n				var child;\n				eachChild(node, function(el){\n					if(el.tagName === tagName) {\n						child = el;\n						return false;\n					} else {\n						child = traverse(el, tagName);\n						return !child;\n					}\n				});\n				return child;\n			}\n\n			this.renderAsync().then(function(result){\n				var frag = result.fragment;\n				var head = document.head || document.getElementsByTagName("head")[0];\n				var body = document.body;\n\n				// Move elements from the fragment\'s head to the document head.\n				eachChild(head, remove);\n\n				var fragHead = traverse(frag, "HEAD");\n				eachChild(fragHead, appendTo(head));\n\n				// Move elements from the fragment\'s body to the document body.\n				eachChild(body, remove);\n\n				var fragBody = traverse(frag, "BODY");\n				eachChild(fragBody, appendTo(body));\n			});\n		},\n		renderAsync: function(renderer, data, options, doc){\n			renderer = renderer || this.renderToFrag;\n			data = data || this.state;\n			options = options || {};\n\n			var frag;\n\n			var zone = new Zone({\n				plugins: [xhrZone, systemImportZone]\n			});\n\n			return zone.run(function(){\n				frag = renderer(data, options);\n\n				if(doc) {\n					var oldDoc = can.document;\n					can.document = doc;\n					mutate.appendChild.call(doc.body, frag, doc);\n					can.document = oldDoc;\n				}\n			}).then(function(zoneData){\n				return {\n					fragment: frag,\n					zoneData: zoneData\n				};\n			});\n		},\n		legacy: false,\n		render: function(doc, state){\n			var renderer = this.renderToFrag;\n			var frag = renderer(state, {});\n\n			var oldDoc = can.document;\n			can.document = doc;\n			mutate.appendChild.call(doc.body, frag, doc);\n			can.document = oldDoc;\n		},\n		' +
((__t = ( ases )) == null ? '' : __t) +
'\n	};\n	var isNW = (function(){\n		try{var nr = System._nodeRequire; return nr && nr(\'nw.gui\') !== \'undefined\';}catch(e){return false;}\n	})();\n\n	if(typeof steal !== \'undefined\' && (isNW || !isNode))\n		steal.done().then(function() {\n			if(steal.System.autorenderAutostart !== false) {\n				autorender.start();\n			}\n		});\n\n	return autorender;\n});\n';

}
return __p
}
});