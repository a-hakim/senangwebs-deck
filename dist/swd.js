(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.SWD = factory());
})(this, (function () { 'use strict';

  function _defineProperty(e, r, t) {
    return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  function ownKeys$1(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(e, r).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread2(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys$1(Object(t), true).forEach(function (r) {
        _defineProperty(e, r, t[r]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys$1(Object(t)).forEach(function (r) {
        Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
    return e;
  }
  function _toPrimitive(t, r) {
    if ("object" != typeof t || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r);
      if ("object" != typeof i) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  function _toPropertyKey(t) {
    var i = _toPrimitive(t, "string");
    return "symbol" == typeof i ? i : i + "";
  }

  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  var web_domCollections_iterator = {};

  var globalThis_1;
  var hasRequiredGlobalThis;

  function requireGlobalThis () {
  	if (hasRequiredGlobalThis) return globalThis_1;
  	hasRequiredGlobalThis = 1;
  	var check = function (it) {
  	  return it && it.Math === Math && it;
  	};

  	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
  	globalThis_1 =
  	  // eslint-disable-next-line es/no-global-this -- safe
  	  check(typeof globalThis == 'object' && globalThis) ||
  	  check(typeof window == 'object' && window) ||
  	  // eslint-disable-next-line no-restricted-globals -- safe
  	  check(typeof self == 'object' && self) ||
  	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  	  check(typeof globalThis_1 == 'object' && globalThis_1) ||
  	  // eslint-disable-next-line no-new-func -- fallback
  	  (function () { return this; })() || Function('return this')();
  	return globalThis_1;
  }

  var domIterables;
  var hasRequiredDomIterables;

  function requireDomIterables () {
  	if (hasRequiredDomIterables) return domIterables;
  	hasRequiredDomIterables = 1;
  	// iterable DOM collections
  	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
  	domIterables = {
  	  CSSRuleList: 0,
  	  CSSStyleDeclaration: 0,
  	  CSSValueList: 0,
  	  ClientRectList: 0,
  	  DOMRectList: 0,
  	  DOMStringList: 0,
  	  DOMTokenList: 1,
  	  DataTransferItemList: 0,
  	  FileList: 0,
  	  HTMLAllCollection: 0,
  	  HTMLCollection: 0,
  	  HTMLFormElement: 0,
  	  HTMLSelectElement: 0,
  	  MediaList: 0,
  	  MimeTypeArray: 0,
  	  NamedNodeMap: 0,
  	  NodeList: 1,
  	  PaintRequestList: 0,
  	  Plugin: 0,
  	  PluginArray: 0,
  	  SVGLengthList: 0,
  	  SVGNumberList: 0,
  	  SVGPathSegList: 0,
  	  SVGPointList: 0,
  	  SVGStringList: 0,
  	  SVGTransformList: 0,
  	  SourceBufferList: 0,
  	  StyleSheetList: 0,
  	  TextTrackCueList: 0,
  	  TextTrackList: 0,
  	  TouchList: 0
  	};
  	return domIterables;
  }

  var isCallable;
  var hasRequiredIsCallable;

  function requireIsCallable () {
  	if (hasRequiredIsCallable) return isCallable;
  	hasRequiredIsCallable = 1;
  	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
  	var documentAll = typeof document == 'object' && document.all;

  	// `IsCallable` abstract operation
  	// https://tc39.es/ecma262/#sec-iscallable
  	// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
  	isCallable = typeof documentAll == 'undefined' && documentAll !== undefined ? function (argument) {
  	  return typeof argument == 'function' || argument === documentAll;
  	} : function (argument) {
  	  return typeof argument == 'function';
  	};
  	return isCallable;
  }

  var isObject;
  var hasRequiredIsObject;

  function requireIsObject () {
  	if (hasRequiredIsObject) return isObject;
  	hasRequiredIsObject = 1;
  	var isCallable = requireIsCallable();

  	isObject = function (it) {
  	  return typeof it == 'object' ? it !== null : isCallable(it);
  	};
  	return isObject;
  }

  var documentCreateElement;
  var hasRequiredDocumentCreateElement;

  function requireDocumentCreateElement () {
  	if (hasRequiredDocumentCreateElement) return documentCreateElement;
  	hasRequiredDocumentCreateElement = 1;
  	var globalThis = requireGlobalThis();
  	var isObject = requireIsObject();

  	var document = globalThis.document;
  	// typeof document.createElement is 'object' in old IE
  	var EXISTS = isObject(document) && isObject(document.createElement);

  	documentCreateElement = function (it) {
  	  return EXISTS ? document.createElement(it) : {};
  	};
  	return documentCreateElement;
  }

  var domTokenListPrototype;
  var hasRequiredDomTokenListPrototype;

  function requireDomTokenListPrototype () {
  	if (hasRequiredDomTokenListPrototype) return domTokenListPrototype;
  	hasRequiredDomTokenListPrototype = 1;
  	// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
  	var documentCreateElement = requireDocumentCreateElement();

  	var classList = documentCreateElement('span').classList;
  	var DOMTokenListPrototype = classList && classList.constructor && classList.constructor.prototype;

  	domTokenListPrototype = DOMTokenListPrototype === Object.prototype ? undefined : DOMTokenListPrototype;
  	return domTokenListPrototype;
  }

  var fails;
  var hasRequiredFails;

  function requireFails () {
  	if (hasRequiredFails) return fails;
  	hasRequiredFails = 1;
  	fails = function (exec) {
  	  try {
  	    return !!exec();
  	  } catch (error) {
  	    return true;
  	  }
  	};
  	return fails;
  }

  var functionBindNative;
  var hasRequiredFunctionBindNative;

  function requireFunctionBindNative () {
  	if (hasRequiredFunctionBindNative) return functionBindNative;
  	hasRequiredFunctionBindNative = 1;
  	var fails = requireFails();

  	functionBindNative = !fails(function () {
  	  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  	  var test = (function () { /* empty */ }).bind();
  	  // eslint-disable-next-line no-prototype-builtins -- safe
  	  return typeof test != 'function' || test.hasOwnProperty('prototype');
  	});
  	return functionBindNative;
  }

  var functionUncurryThis;
  var hasRequiredFunctionUncurryThis;

  function requireFunctionUncurryThis () {
  	if (hasRequiredFunctionUncurryThis) return functionUncurryThis;
  	hasRequiredFunctionUncurryThis = 1;
  	var NATIVE_BIND = requireFunctionBindNative();

  	var FunctionPrototype = Function.prototype;
  	var call = FunctionPrototype.call;
  	// eslint-disable-next-line es/no-function-prototype-bind -- safe
  	var uncurryThisWithBind = NATIVE_BIND && FunctionPrototype.bind.bind(call, call);

  	functionUncurryThis = NATIVE_BIND ? uncurryThisWithBind : function (fn) {
  	  return function () {
  	    return call.apply(fn, arguments);
  	  };
  	};
  	return functionUncurryThis;
  }

  var classofRaw;
  var hasRequiredClassofRaw;

  function requireClassofRaw () {
  	if (hasRequiredClassofRaw) return classofRaw;
  	hasRequiredClassofRaw = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	var toString = uncurryThis({}.toString);
  	var stringSlice = uncurryThis(''.slice);

  	classofRaw = function (it) {
  	  return stringSlice(toString(it), 8, -1);
  	};
  	return classofRaw;
  }

  var indexedObject;
  var hasRequiredIndexedObject;

  function requireIndexedObject () {
  	if (hasRequiredIndexedObject) return indexedObject;
  	hasRequiredIndexedObject = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var fails = requireFails();
  	var classof = requireClassofRaw();

  	var $Object = Object;
  	var split = uncurryThis(''.split);

  	// fallback for non-array-like ES3 and non-enumerable old V8 strings
  	indexedObject = fails(function () {
  	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  	  // eslint-disable-next-line no-prototype-builtins -- safe
  	  return !$Object('z').propertyIsEnumerable(0);
  	}) ? function (it) {
  	  return classof(it) === 'String' ? split(it, '') : $Object(it);
  	} : $Object;
  	return indexedObject;
  }

  var isNullOrUndefined;
  var hasRequiredIsNullOrUndefined;

  function requireIsNullOrUndefined () {
  	if (hasRequiredIsNullOrUndefined) return isNullOrUndefined;
  	hasRequiredIsNullOrUndefined = 1;
  	// we can't use just `it == null` since of `document.all` special case
  	// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
  	isNullOrUndefined = function (it) {
  	  return it === null || it === undefined;
  	};
  	return isNullOrUndefined;
  }

  var requireObjectCoercible;
  var hasRequiredRequireObjectCoercible;

  function requireRequireObjectCoercible () {
  	if (hasRequiredRequireObjectCoercible) return requireObjectCoercible;
  	hasRequiredRequireObjectCoercible = 1;
  	var isNullOrUndefined = requireIsNullOrUndefined();

  	var $TypeError = TypeError;

  	// `RequireObjectCoercible` abstract operation
  	// https://tc39.es/ecma262/#sec-requireobjectcoercible
  	requireObjectCoercible = function (it) {
  	  if (isNullOrUndefined(it)) throw new $TypeError("Can't call method on " + it);
  	  return it;
  	};
  	return requireObjectCoercible;
  }

  var toIndexedObject;
  var hasRequiredToIndexedObject;

  function requireToIndexedObject () {
  	if (hasRequiredToIndexedObject) return toIndexedObject;
  	hasRequiredToIndexedObject = 1;
  	// toObject with fallback for non-array-like ES3 strings
  	var IndexedObject = requireIndexedObject();
  	var requireObjectCoercible = requireRequireObjectCoercible();

  	toIndexedObject = function (it) {
  	  return IndexedObject(requireObjectCoercible(it));
  	};
  	return toIndexedObject;
  }

  var sharedStore = {exports: {}};

  var isPure;
  var hasRequiredIsPure;

  function requireIsPure () {
  	if (hasRequiredIsPure) return isPure;
  	hasRequiredIsPure = 1;
  	isPure = false;
  	return isPure;
  }

  var defineGlobalProperty;
  var hasRequiredDefineGlobalProperty;

  function requireDefineGlobalProperty () {
  	if (hasRequiredDefineGlobalProperty) return defineGlobalProperty;
  	hasRequiredDefineGlobalProperty = 1;
  	var globalThis = requireGlobalThis();

  	// eslint-disable-next-line es/no-object-defineproperty -- safe
  	var defineProperty = Object.defineProperty;

  	defineGlobalProperty = function (key, value) {
  	  try {
  	    defineProperty(globalThis, key, { value: value, configurable: true, writable: true });
  	  } catch (error) {
  	    globalThis[key] = value;
  	  } return value;
  	};
  	return defineGlobalProperty;
  }

  var hasRequiredSharedStore;

  function requireSharedStore () {
  	if (hasRequiredSharedStore) return sharedStore.exports;
  	hasRequiredSharedStore = 1;
  	var IS_PURE = requireIsPure();
  	var globalThis = requireGlobalThis();
  	var defineGlobalProperty = requireDefineGlobalProperty();

  	var SHARED = '__core-js_shared__';
  	var store = sharedStore.exports = globalThis[SHARED] || defineGlobalProperty(SHARED, {});

  	(store.versions || (store.versions = [])).push({
  	  version: '3.46.0',
  	  mode: IS_PURE ? 'pure' : 'global',
  	  copyright: '© 2014-2025 Denis Pushkarev (zloirock.ru), 2025 CoreJS Company (core-js.io)',
  	  license: 'https://github.com/zloirock/core-js/blob/v3.46.0/LICENSE',
  	  source: 'https://github.com/zloirock/core-js'
  	});
  	return sharedStore.exports;
  }

  var shared;
  var hasRequiredShared;

  function requireShared () {
  	if (hasRequiredShared) return shared;
  	hasRequiredShared = 1;
  	var store = requireSharedStore();

  	shared = function (key, value) {
  	  return store[key] || (store[key] = value || {});
  	};
  	return shared;
  }

  var toObject;
  var hasRequiredToObject;

  function requireToObject () {
  	if (hasRequiredToObject) return toObject;
  	hasRequiredToObject = 1;
  	var requireObjectCoercible = requireRequireObjectCoercible();

  	var $Object = Object;

  	// `ToObject` abstract operation
  	// https://tc39.es/ecma262/#sec-toobject
  	toObject = function (argument) {
  	  return $Object(requireObjectCoercible(argument));
  	};
  	return toObject;
  }

  var hasOwnProperty_1;
  var hasRequiredHasOwnProperty;

  function requireHasOwnProperty () {
  	if (hasRequiredHasOwnProperty) return hasOwnProperty_1;
  	hasRequiredHasOwnProperty = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var toObject = requireToObject();

  	var hasOwnProperty = uncurryThis({}.hasOwnProperty);

  	// `HasOwnProperty` abstract operation
  	// https://tc39.es/ecma262/#sec-hasownproperty
  	// eslint-disable-next-line es/no-object-hasown -- safe
  	hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  	  return hasOwnProperty(toObject(it), key);
  	};
  	return hasOwnProperty_1;
  }

  var uid;
  var hasRequiredUid;

  function requireUid () {
  	if (hasRequiredUid) return uid;
  	hasRequiredUid = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	var id = 0;
  	var postfix = Math.random();
  	var toString = uncurryThis(1.1.toString);

  	uid = function (key) {
  	  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString(++id + postfix, 36);
  	};
  	return uid;
  }

  var environmentUserAgent;
  var hasRequiredEnvironmentUserAgent;

  function requireEnvironmentUserAgent () {
  	if (hasRequiredEnvironmentUserAgent) return environmentUserAgent;
  	hasRequiredEnvironmentUserAgent = 1;
  	var globalThis = requireGlobalThis();

  	var navigator = globalThis.navigator;
  	var userAgent = navigator && navigator.userAgent;

  	environmentUserAgent = userAgent ? String(userAgent) : '';
  	return environmentUserAgent;
  }

  var environmentV8Version;
  var hasRequiredEnvironmentV8Version;

  function requireEnvironmentV8Version () {
  	if (hasRequiredEnvironmentV8Version) return environmentV8Version;
  	hasRequiredEnvironmentV8Version = 1;
  	var globalThis = requireGlobalThis();
  	var userAgent = requireEnvironmentUserAgent();

  	var process = globalThis.process;
  	var Deno = globalThis.Deno;
  	var versions = process && process.versions || Deno && Deno.version;
  	var v8 = versions && versions.v8;
  	var match, version;

  	if (v8) {
  	  match = v8.split('.');
  	  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  	  // but their correct versions are not interesting for us
  	  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
  	}

  	// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
  	// so check `userAgent` even if `.v8` exists, but 0
  	if (!version && userAgent) {
  	  match = userAgent.match(/Edge\/(\d+)/);
  	  if (!match || match[1] >= 74) {
  	    match = userAgent.match(/Chrome\/(\d+)/);
  	    if (match) version = +match[1];
  	  }
  	}

  	environmentV8Version = version;
  	return environmentV8Version;
  }

  var symbolConstructorDetection;
  var hasRequiredSymbolConstructorDetection;

  function requireSymbolConstructorDetection () {
  	if (hasRequiredSymbolConstructorDetection) return symbolConstructorDetection;
  	hasRequiredSymbolConstructorDetection = 1;
  	/* eslint-disable es/no-symbol -- required for testing */
  	var V8_VERSION = requireEnvironmentV8Version();
  	var fails = requireFails();
  	var globalThis = requireGlobalThis();

  	var $String = globalThis.String;

  	// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
  	symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails(function () {
  	  var symbol = Symbol('symbol detection');
  	  // Chrome 38 Symbol has incorrect toString conversion
  	  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  	  // nb: Do not call `String` directly to avoid this being optimized out to `symbol+''` which will,
  	  // of course, fail.
  	  return !$String(symbol) || !(Object(symbol) instanceof Symbol) ||
  	    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
  	    !Symbol.sham && V8_VERSION && V8_VERSION < 41;
  	});
  	return symbolConstructorDetection;
  }

  var useSymbolAsUid;
  var hasRequiredUseSymbolAsUid;

  function requireUseSymbolAsUid () {
  	if (hasRequiredUseSymbolAsUid) return useSymbolAsUid;
  	hasRequiredUseSymbolAsUid = 1;
  	/* eslint-disable es/no-symbol -- required for testing */
  	var NATIVE_SYMBOL = requireSymbolConstructorDetection();

  	useSymbolAsUid = NATIVE_SYMBOL &&
  	  !Symbol.sham &&
  	  typeof Symbol.iterator == 'symbol';
  	return useSymbolAsUid;
  }

  var wellKnownSymbol;
  var hasRequiredWellKnownSymbol;

  function requireWellKnownSymbol () {
  	if (hasRequiredWellKnownSymbol) return wellKnownSymbol;
  	hasRequiredWellKnownSymbol = 1;
  	var globalThis = requireGlobalThis();
  	var shared = requireShared();
  	var hasOwn = requireHasOwnProperty();
  	var uid = requireUid();
  	var NATIVE_SYMBOL = requireSymbolConstructorDetection();
  	var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

  	var Symbol = globalThis.Symbol;
  	var WellKnownSymbolsStore = shared('wks');
  	var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol['for'] || Symbol : Symbol && Symbol.withoutSetter || uid;

  	wellKnownSymbol = function (name) {
  	  if (!hasOwn(WellKnownSymbolsStore, name)) {
  	    WellKnownSymbolsStore[name] = NATIVE_SYMBOL && hasOwn(Symbol, name)
  	      ? Symbol[name]
  	      : createWellKnownSymbol('Symbol.' + name);
  	  } return WellKnownSymbolsStore[name];
  	};
  	return wellKnownSymbol;
  }

  var anObject;
  var hasRequiredAnObject;

  function requireAnObject () {
  	if (hasRequiredAnObject) return anObject;
  	hasRequiredAnObject = 1;
  	var isObject = requireIsObject();

  	var $String = String;
  	var $TypeError = TypeError;

  	// `Assert: Type(argument) is Object`
  	anObject = function (argument) {
  	  if (isObject(argument)) return argument;
  	  throw new $TypeError($String(argument) + ' is not an object');
  	};
  	return anObject;
  }

  var objectDefineProperties = {};

  var descriptors;
  var hasRequiredDescriptors;

  function requireDescriptors () {
  	if (hasRequiredDescriptors) return descriptors;
  	hasRequiredDescriptors = 1;
  	var fails = requireFails();

  	// Detect IE8's incomplete defineProperty implementation
  	descriptors = !fails(function () {
  	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  	  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] !== 7;
  	});
  	return descriptors;
  }

  var v8PrototypeDefineBug;
  var hasRequiredV8PrototypeDefineBug;

  function requireV8PrototypeDefineBug () {
  	if (hasRequiredV8PrototypeDefineBug) return v8PrototypeDefineBug;
  	hasRequiredV8PrototypeDefineBug = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var fails = requireFails();

  	// V8 ~ Chrome 36-
  	// https://bugs.chromium.org/p/v8/issues/detail?id=3334
  	v8PrototypeDefineBug = DESCRIPTORS && fails(function () {
  	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  	  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
  	    value: 42,
  	    writable: false
  	  }).prototype !== 42;
  	});
  	return v8PrototypeDefineBug;
  }

  var objectDefineProperty = {};

  var ie8DomDefine;
  var hasRequiredIe8DomDefine;

  function requireIe8DomDefine () {
  	if (hasRequiredIe8DomDefine) return ie8DomDefine;
  	hasRequiredIe8DomDefine = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var fails = requireFails();
  	var createElement = requireDocumentCreateElement();

  	// Thanks to IE8 for its funny defineProperty
  	ie8DomDefine = !DESCRIPTORS && !fails(function () {
  	  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  	  return Object.defineProperty(createElement('div'), 'a', {
  	    get: function () { return 7; }
  	  }).a !== 7;
  	});
  	return ie8DomDefine;
  }

  var functionCall;
  var hasRequiredFunctionCall;

  function requireFunctionCall () {
  	if (hasRequiredFunctionCall) return functionCall;
  	hasRequiredFunctionCall = 1;
  	var NATIVE_BIND = requireFunctionBindNative();

  	var call = Function.prototype.call;
  	// eslint-disable-next-line es/no-function-prototype-bind -- safe
  	functionCall = NATIVE_BIND ? call.bind(call) : function () {
  	  return call.apply(call, arguments);
  	};
  	return functionCall;
  }

  var getBuiltIn;
  var hasRequiredGetBuiltIn;

  function requireGetBuiltIn () {
  	if (hasRequiredGetBuiltIn) return getBuiltIn;
  	hasRequiredGetBuiltIn = 1;
  	var globalThis = requireGlobalThis();
  	var isCallable = requireIsCallable();

  	var aFunction = function (argument) {
  	  return isCallable(argument) ? argument : undefined;
  	};

  	getBuiltIn = function (namespace, method) {
  	  return arguments.length < 2 ? aFunction(globalThis[namespace]) : globalThis[namespace] && globalThis[namespace][method];
  	};
  	return getBuiltIn;
  }

  var objectIsPrototypeOf;
  var hasRequiredObjectIsPrototypeOf;

  function requireObjectIsPrototypeOf () {
  	if (hasRequiredObjectIsPrototypeOf) return objectIsPrototypeOf;
  	hasRequiredObjectIsPrototypeOf = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	objectIsPrototypeOf = uncurryThis({}.isPrototypeOf);
  	return objectIsPrototypeOf;
  }

  var isSymbol;
  var hasRequiredIsSymbol;

  function requireIsSymbol () {
  	if (hasRequiredIsSymbol) return isSymbol;
  	hasRequiredIsSymbol = 1;
  	var getBuiltIn = requireGetBuiltIn();
  	var isCallable = requireIsCallable();
  	var isPrototypeOf = requireObjectIsPrototypeOf();
  	var USE_SYMBOL_AS_UID = requireUseSymbolAsUid();

  	var $Object = Object;

  	isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  	  return typeof it == 'symbol';
  	} : function (it) {
  	  var $Symbol = getBuiltIn('Symbol');
  	  return isCallable($Symbol) && isPrototypeOf($Symbol.prototype, $Object(it));
  	};
  	return isSymbol;
  }

  var tryToString;
  var hasRequiredTryToString;

  function requireTryToString () {
  	if (hasRequiredTryToString) return tryToString;
  	hasRequiredTryToString = 1;
  	var $String = String;

  	tryToString = function (argument) {
  	  try {
  	    return $String(argument);
  	  } catch (error) {
  	    return 'Object';
  	  }
  	};
  	return tryToString;
  }

  var aCallable;
  var hasRequiredACallable;

  function requireACallable () {
  	if (hasRequiredACallable) return aCallable;
  	hasRequiredACallable = 1;
  	var isCallable = requireIsCallable();
  	var tryToString = requireTryToString();

  	var $TypeError = TypeError;

  	// `Assert: IsCallable(argument) is true`
  	aCallable = function (argument) {
  	  if (isCallable(argument)) return argument;
  	  throw new $TypeError(tryToString(argument) + ' is not a function');
  	};
  	return aCallable;
  }

  var getMethod;
  var hasRequiredGetMethod;

  function requireGetMethod () {
  	if (hasRequiredGetMethod) return getMethod;
  	hasRequiredGetMethod = 1;
  	var aCallable = requireACallable();
  	var isNullOrUndefined = requireIsNullOrUndefined();

  	// `GetMethod` abstract operation
  	// https://tc39.es/ecma262/#sec-getmethod
  	getMethod = function (V, P) {
  	  var func = V[P];
  	  return isNullOrUndefined(func) ? undefined : aCallable(func);
  	};
  	return getMethod;
  }

  var ordinaryToPrimitive;
  var hasRequiredOrdinaryToPrimitive;

  function requireOrdinaryToPrimitive () {
  	if (hasRequiredOrdinaryToPrimitive) return ordinaryToPrimitive;
  	hasRequiredOrdinaryToPrimitive = 1;
  	var call = requireFunctionCall();
  	var isCallable = requireIsCallable();
  	var isObject = requireIsObject();

  	var $TypeError = TypeError;

  	// `OrdinaryToPrimitive` abstract operation
  	// https://tc39.es/ecma262/#sec-ordinarytoprimitive
  	ordinaryToPrimitive = function (input, pref) {
  	  var fn, val;
  	  if (pref === 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  	  if (isCallable(fn = input.valueOf) && !isObject(val = call(fn, input))) return val;
  	  if (pref !== 'string' && isCallable(fn = input.toString) && !isObject(val = call(fn, input))) return val;
  	  throw new $TypeError("Can't convert object to primitive value");
  	};
  	return ordinaryToPrimitive;
  }

  var toPrimitive;
  var hasRequiredToPrimitive;

  function requireToPrimitive () {
  	if (hasRequiredToPrimitive) return toPrimitive;
  	hasRequiredToPrimitive = 1;
  	var call = requireFunctionCall();
  	var isObject = requireIsObject();
  	var isSymbol = requireIsSymbol();
  	var getMethod = requireGetMethod();
  	var ordinaryToPrimitive = requireOrdinaryToPrimitive();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var $TypeError = TypeError;
  	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');

  	// `ToPrimitive` abstract operation
  	// https://tc39.es/ecma262/#sec-toprimitive
  	toPrimitive = function (input, pref) {
  	  if (!isObject(input) || isSymbol(input)) return input;
  	  var exoticToPrim = getMethod(input, TO_PRIMITIVE);
  	  var result;
  	  if (exoticToPrim) {
  	    if (pref === undefined) pref = 'default';
  	    result = call(exoticToPrim, input, pref);
  	    if (!isObject(result) || isSymbol(result)) return result;
  	    throw new $TypeError("Can't convert object to primitive value");
  	  }
  	  if (pref === undefined) pref = 'number';
  	  return ordinaryToPrimitive(input, pref);
  	};
  	return toPrimitive;
  }

  var toPropertyKey;
  var hasRequiredToPropertyKey;

  function requireToPropertyKey () {
  	if (hasRequiredToPropertyKey) return toPropertyKey;
  	hasRequiredToPropertyKey = 1;
  	var toPrimitive = requireToPrimitive();
  	var isSymbol = requireIsSymbol();

  	// `ToPropertyKey` abstract operation
  	// https://tc39.es/ecma262/#sec-topropertykey
  	toPropertyKey = function (argument) {
  	  var key = toPrimitive(argument, 'string');
  	  return isSymbol(key) ? key : key + '';
  	};
  	return toPropertyKey;
  }

  var hasRequiredObjectDefineProperty;

  function requireObjectDefineProperty () {
  	if (hasRequiredObjectDefineProperty) return objectDefineProperty;
  	hasRequiredObjectDefineProperty = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var IE8_DOM_DEFINE = requireIe8DomDefine();
  	var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
  	var anObject = requireAnObject();
  	var toPropertyKey = requireToPropertyKey();

  	var $TypeError = TypeError;
  	// eslint-disable-next-line es/no-object-defineproperty -- safe
  	var $defineProperty = Object.defineProperty;
  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  	var ENUMERABLE = 'enumerable';
  	var CONFIGURABLE = 'configurable';
  	var WRITABLE = 'writable';

  	// `Object.defineProperty` method
  	// https://tc39.es/ecma262/#sec-object.defineproperty
  	objectDefineProperty.f = DESCRIPTORS ? V8_PROTOTYPE_DEFINE_BUG ? function defineProperty(O, P, Attributes) {
  	  anObject(O);
  	  P = toPropertyKey(P);
  	  anObject(Attributes);
  	  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
  	    var current = $getOwnPropertyDescriptor(O, P);
  	    if (current && current[WRITABLE]) {
  	      O[P] = Attributes.value;
  	      Attributes = {
  	        configurable: CONFIGURABLE in Attributes ? Attributes[CONFIGURABLE] : current[CONFIGURABLE],
  	        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
  	        writable: false
  	      };
  	    }
  	  } return $defineProperty(O, P, Attributes);
  	} : $defineProperty : function defineProperty(O, P, Attributes) {
  	  anObject(O);
  	  P = toPropertyKey(P);
  	  anObject(Attributes);
  	  if (IE8_DOM_DEFINE) try {
  	    return $defineProperty(O, P, Attributes);
  	  } catch (error) { /* empty */ }
  	  if ('get' in Attributes || 'set' in Attributes) throw new $TypeError('Accessors not supported');
  	  if ('value' in Attributes) O[P] = Attributes.value;
  	  return O;
  	};
  	return objectDefineProperty;
  }

  var mathTrunc;
  var hasRequiredMathTrunc;

  function requireMathTrunc () {
  	if (hasRequiredMathTrunc) return mathTrunc;
  	hasRequiredMathTrunc = 1;
  	var ceil = Math.ceil;
  	var floor = Math.floor;

  	// `Math.trunc` method
  	// https://tc39.es/ecma262/#sec-math.trunc
  	// eslint-disable-next-line es/no-math-trunc -- safe
  	mathTrunc = Math.trunc || function trunc(x) {
  	  var n = +x;
  	  return (n > 0 ? floor : ceil)(n);
  	};
  	return mathTrunc;
  }

  var toIntegerOrInfinity;
  var hasRequiredToIntegerOrInfinity;

  function requireToIntegerOrInfinity () {
  	if (hasRequiredToIntegerOrInfinity) return toIntegerOrInfinity;
  	hasRequiredToIntegerOrInfinity = 1;
  	var trunc = requireMathTrunc();

  	// `ToIntegerOrInfinity` abstract operation
  	// https://tc39.es/ecma262/#sec-tointegerorinfinity
  	toIntegerOrInfinity = function (argument) {
  	  var number = +argument;
  	  // eslint-disable-next-line no-self-compare -- NaN check
  	  return number !== number || number === 0 ? 0 : trunc(number);
  	};
  	return toIntegerOrInfinity;
  }

  var toAbsoluteIndex;
  var hasRequiredToAbsoluteIndex;

  function requireToAbsoluteIndex () {
  	if (hasRequiredToAbsoluteIndex) return toAbsoluteIndex;
  	hasRequiredToAbsoluteIndex = 1;
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();

  	var max = Math.max;
  	var min = Math.min;

  	// Helper for a popular repeating case of the spec:
  	// Let integer be ? ToInteger(index).
  	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
  	toAbsoluteIndex = function (index, length) {
  	  var integer = toIntegerOrInfinity(index);
  	  return integer < 0 ? max(integer + length, 0) : min(integer, length);
  	};
  	return toAbsoluteIndex;
  }

  var toLength;
  var hasRequiredToLength;

  function requireToLength () {
  	if (hasRequiredToLength) return toLength;
  	hasRequiredToLength = 1;
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();

  	var min = Math.min;

  	// `ToLength` abstract operation
  	// https://tc39.es/ecma262/#sec-tolength
  	toLength = function (argument) {
  	  var len = toIntegerOrInfinity(argument);
  	  return len > 0 ? min(len, 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
  	};
  	return toLength;
  }

  var lengthOfArrayLike;
  var hasRequiredLengthOfArrayLike;

  function requireLengthOfArrayLike () {
  	if (hasRequiredLengthOfArrayLike) return lengthOfArrayLike;
  	hasRequiredLengthOfArrayLike = 1;
  	var toLength = requireToLength();

  	// `LengthOfArrayLike` abstract operation
  	// https://tc39.es/ecma262/#sec-lengthofarraylike
  	lengthOfArrayLike = function (obj) {
  	  return toLength(obj.length);
  	};
  	return lengthOfArrayLike;
  }

  var arrayIncludes;
  var hasRequiredArrayIncludes;

  function requireArrayIncludes () {
  	if (hasRequiredArrayIncludes) return arrayIncludes;
  	hasRequiredArrayIncludes = 1;
  	var toIndexedObject = requireToIndexedObject();
  	var toAbsoluteIndex = requireToAbsoluteIndex();
  	var lengthOfArrayLike = requireLengthOfArrayLike();

  	// `Array.prototype.{ indexOf, includes }` methods implementation
  	var createMethod = function (IS_INCLUDES) {
  	  return function ($this, el, fromIndex) {
  	    var O = toIndexedObject($this);
  	    var length = lengthOfArrayLike(O);
  	    if (length === 0) return !IS_INCLUDES && -1;
  	    var index = toAbsoluteIndex(fromIndex, length);
  	    var value;
  	    // Array#includes uses SameValueZero equality algorithm
  	    // eslint-disable-next-line no-self-compare -- NaN check
  	    if (IS_INCLUDES && el !== el) while (length > index) {
  	      value = O[index++];
  	      // eslint-disable-next-line no-self-compare -- NaN check
  	      if (value !== value) return true;
  	    // Array#indexOf ignores holes, Array#includes - not
  	    } else for (;length > index; index++) {
  	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
  	    } return !IS_INCLUDES && -1;
  	  };
  	};

  	arrayIncludes = {
  	  // `Array.prototype.includes` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.includes
  	  includes: createMethod(true),
  	  // `Array.prototype.indexOf` method
  	  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  	  indexOf: createMethod(false)
  	};
  	return arrayIncludes;
  }

  var hiddenKeys;
  var hasRequiredHiddenKeys;

  function requireHiddenKeys () {
  	if (hasRequiredHiddenKeys) return hiddenKeys;
  	hasRequiredHiddenKeys = 1;
  	hiddenKeys = {};
  	return hiddenKeys;
  }

  var objectKeysInternal;
  var hasRequiredObjectKeysInternal;

  function requireObjectKeysInternal () {
  	if (hasRequiredObjectKeysInternal) return objectKeysInternal;
  	hasRequiredObjectKeysInternal = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var hasOwn = requireHasOwnProperty();
  	var toIndexedObject = requireToIndexedObject();
  	var indexOf = requireArrayIncludes().indexOf;
  	var hiddenKeys = requireHiddenKeys();

  	var push = uncurryThis([].push);

  	objectKeysInternal = function (object, names) {
  	  var O = toIndexedObject(object);
  	  var i = 0;
  	  var result = [];
  	  var key;
  	  for (key in O) !hasOwn(hiddenKeys, key) && hasOwn(O, key) && push(result, key);
  	  // Don't enum bug & hidden keys
  	  while (names.length > i) if (hasOwn(O, key = names[i++])) {
  	    ~indexOf(result, key) || push(result, key);
  	  }
  	  return result;
  	};
  	return objectKeysInternal;
  }

  var enumBugKeys;
  var hasRequiredEnumBugKeys;

  function requireEnumBugKeys () {
  	if (hasRequiredEnumBugKeys) return enumBugKeys;
  	hasRequiredEnumBugKeys = 1;
  	// IE8- don't enum bug keys
  	enumBugKeys = [
  	  'constructor',
  	  'hasOwnProperty',
  	  'isPrototypeOf',
  	  'propertyIsEnumerable',
  	  'toLocaleString',
  	  'toString',
  	  'valueOf'
  	];
  	return enumBugKeys;
  }

  var objectKeys;
  var hasRequiredObjectKeys;

  function requireObjectKeys () {
  	if (hasRequiredObjectKeys) return objectKeys;
  	hasRequiredObjectKeys = 1;
  	var internalObjectKeys = requireObjectKeysInternal();
  	var enumBugKeys = requireEnumBugKeys();

  	// `Object.keys` method
  	// https://tc39.es/ecma262/#sec-object.keys
  	// eslint-disable-next-line es/no-object-keys -- safe
  	objectKeys = Object.keys || function keys(O) {
  	  return internalObjectKeys(O, enumBugKeys);
  	};
  	return objectKeys;
  }

  var hasRequiredObjectDefineProperties;

  function requireObjectDefineProperties () {
  	if (hasRequiredObjectDefineProperties) return objectDefineProperties;
  	hasRequiredObjectDefineProperties = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var V8_PROTOTYPE_DEFINE_BUG = requireV8PrototypeDefineBug();
  	var definePropertyModule = requireObjectDefineProperty();
  	var anObject = requireAnObject();
  	var toIndexedObject = requireToIndexedObject();
  	var objectKeys = requireObjectKeys();

  	// `Object.defineProperties` method
  	// https://tc39.es/ecma262/#sec-object.defineproperties
  	// eslint-disable-next-line es/no-object-defineproperties -- safe
  	objectDefineProperties.f = DESCRIPTORS && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  	  anObject(O);
  	  var props = toIndexedObject(Properties);
  	  var keys = objectKeys(Properties);
  	  var length = keys.length;
  	  var index = 0;
  	  var key;
  	  while (length > index) definePropertyModule.f(O, key = keys[index++], props[key]);
  	  return O;
  	};
  	return objectDefineProperties;
  }

  var html$3;
  var hasRequiredHtml;

  function requireHtml () {
  	if (hasRequiredHtml) return html$3;
  	hasRequiredHtml = 1;
  	var getBuiltIn = requireGetBuiltIn();

  	html$3 = getBuiltIn('document', 'documentElement');
  	return html$3;
  }

  var sharedKey;
  var hasRequiredSharedKey;

  function requireSharedKey () {
  	if (hasRequiredSharedKey) return sharedKey;
  	hasRequiredSharedKey = 1;
  	var shared = requireShared();
  	var uid = requireUid();

  	var keys = shared('keys');

  	sharedKey = function (key) {
  	  return keys[key] || (keys[key] = uid(key));
  	};
  	return sharedKey;
  }

  var objectCreate;
  var hasRequiredObjectCreate;

  function requireObjectCreate () {
  	if (hasRequiredObjectCreate) return objectCreate;
  	hasRequiredObjectCreate = 1;
  	/* global ActiveXObject -- old IE, WSH */
  	var anObject = requireAnObject();
  	var definePropertiesModule = requireObjectDefineProperties();
  	var enumBugKeys = requireEnumBugKeys();
  	var hiddenKeys = requireHiddenKeys();
  	var html = requireHtml();
  	var documentCreateElement = requireDocumentCreateElement();
  	var sharedKey = requireSharedKey();

  	var GT = '>';
  	var LT = '<';
  	var PROTOTYPE = 'prototype';
  	var SCRIPT = 'script';
  	var IE_PROTO = sharedKey('IE_PROTO');

  	var EmptyConstructor = function () { /* empty */ };

  	var scriptTag = function (content) {
  	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
  	};

  	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
  	var NullProtoObjectViaActiveX = function (activeXDocument) {
  	  activeXDocument.write(scriptTag(''));
  	  activeXDocument.close();
  	  var temp = activeXDocument.parentWindow.Object;
  	  // eslint-disable-next-line no-useless-assignment -- avoid memory leak
  	  activeXDocument = null;
  	  return temp;
  	};

  	// Create object with fake `null` prototype: use iframe Object with cleared prototype
  	var NullProtoObjectViaIFrame = function () {
  	  // Thrash, waste and sodomy: IE GC bug
  	  var iframe = documentCreateElement('iframe');
  	  var JS = 'java' + SCRIPT + ':';
  	  var iframeDocument;
  	  iframe.style.display = 'none';
  	  html.appendChild(iframe);
  	  // https://github.com/zloirock/core-js/issues/475
  	  iframe.src = String(JS);
  	  iframeDocument = iframe.contentWindow.document;
  	  iframeDocument.open();
  	  iframeDocument.write(scriptTag('document.F=Object'));
  	  iframeDocument.close();
  	  return iframeDocument.F;
  	};

  	// Check for document.domain and active x support
  	// No need to use active x approach when document.domain is not set
  	// see https://github.com/es-shims/es5-shim/issues/150
  	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
  	// avoid IE GC bug
  	var activeXDocument;
  	var NullProtoObject = function () {
  	  try {
  	    activeXDocument = new ActiveXObject('htmlfile');
  	  } catch (error) { /* ignore */ }
  	  NullProtoObject = typeof document != 'undefined'
  	    ? document.domain && activeXDocument
  	      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
  	      : NullProtoObjectViaIFrame()
  	    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  	  var length = enumBugKeys.length;
  	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  	  return NullProtoObject();
  	};

  	hiddenKeys[IE_PROTO] = true;

  	// `Object.create` method
  	// https://tc39.es/ecma262/#sec-object.create
  	// eslint-disable-next-line es/no-object-create -- safe
  	objectCreate = Object.create || function create(O, Properties) {
  	  var result;
  	  if (O !== null) {
  	    EmptyConstructor[PROTOTYPE] = anObject(O);
  	    result = new EmptyConstructor();
  	    EmptyConstructor[PROTOTYPE] = null;
  	    // add "__proto__" for Object.getPrototypeOf polyfill
  	    result[IE_PROTO] = O;
  	  } else result = NullProtoObject();
  	  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
  	};
  	return objectCreate;
  }

  var addToUnscopables;
  var hasRequiredAddToUnscopables;

  function requireAddToUnscopables () {
  	if (hasRequiredAddToUnscopables) return addToUnscopables;
  	hasRequiredAddToUnscopables = 1;
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var create = requireObjectCreate();
  	var defineProperty = requireObjectDefineProperty().f;

  	var UNSCOPABLES = wellKnownSymbol('unscopables');
  	var ArrayPrototype = Array.prototype;

  	// Array.prototype[@@unscopables]
  	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  	if (ArrayPrototype[UNSCOPABLES] === undefined) {
  	  defineProperty(ArrayPrototype, UNSCOPABLES, {
  	    configurable: true,
  	    value: create(null)
  	  });
  	}

  	// add a key to Array.prototype[@@unscopables]
  	addToUnscopables = function (key) {
  	  ArrayPrototype[UNSCOPABLES][key] = true;
  	};
  	return addToUnscopables;
  }

  var iterators;
  var hasRequiredIterators;

  function requireIterators () {
  	if (hasRequiredIterators) return iterators;
  	hasRequiredIterators = 1;
  	iterators = {};
  	return iterators;
  }

  var weakMapBasicDetection;
  var hasRequiredWeakMapBasicDetection;

  function requireWeakMapBasicDetection () {
  	if (hasRequiredWeakMapBasicDetection) return weakMapBasicDetection;
  	hasRequiredWeakMapBasicDetection = 1;
  	var globalThis = requireGlobalThis();
  	var isCallable = requireIsCallable();

  	var WeakMap = globalThis.WeakMap;

  	weakMapBasicDetection = isCallable(WeakMap) && /native code/.test(String(WeakMap));
  	return weakMapBasicDetection;
  }

  var createPropertyDescriptor;
  var hasRequiredCreatePropertyDescriptor;

  function requireCreatePropertyDescriptor () {
  	if (hasRequiredCreatePropertyDescriptor) return createPropertyDescriptor;
  	hasRequiredCreatePropertyDescriptor = 1;
  	createPropertyDescriptor = function (bitmap, value) {
  	  return {
  	    enumerable: !(bitmap & 1),
  	    configurable: !(bitmap & 2),
  	    writable: !(bitmap & 4),
  	    value: value
  	  };
  	};
  	return createPropertyDescriptor;
  }

  var createNonEnumerableProperty;
  var hasRequiredCreateNonEnumerableProperty;

  function requireCreateNonEnumerableProperty () {
  	if (hasRequiredCreateNonEnumerableProperty) return createNonEnumerableProperty;
  	hasRequiredCreateNonEnumerableProperty = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var definePropertyModule = requireObjectDefineProperty();
  	var createPropertyDescriptor = requireCreatePropertyDescriptor();

  	createNonEnumerableProperty = DESCRIPTORS ? function (object, key, value) {
  	  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
  	} : function (object, key, value) {
  	  object[key] = value;
  	  return object;
  	};
  	return createNonEnumerableProperty;
  }

  var internalState;
  var hasRequiredInternalState;

  function requireInternalState () {
  	if (hasRequiredInternalState) return internalState;
  	hasRequiredInternalState = 1;
  	var NATIVE_WEAK_MAP = requireWeakMapBasicDetection();
  	var globalThis = requireGlobalThis();
  	var isObject = requireIsObject();
  	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  	var hasOwn = requireHasOwnProperty();
  	var shared = requireSharedStore();
  	var sharedKey = requireSharedKey();
  	var hiddenKeys = requireHiddenKeys();

  	var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
  	var TypeError = globalThis.TypeError;
  	var WeakMap = globalThis.WeakMap;
  	var set, get, has;

  	var enforce = function (it) {
  	  return has(it) ? get(it) : set(it, {});
  	};

  	var getterFor = function (TYPE) {
  	  return function (it) {
  	    var state;
  	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
  	      throw new TypeError('Incompatible receiver, ' + TYPE + ' required');
  	    } return state;
  	  };
  	};

  	if (NATIVE_WEAK_MAP || shared.state) {
  	  var store = shared.state || (shared.state = new WeakMap());
  	  /* eslint-disable no-self-assign -- prototype methods protection */
  	  store.get = store.get;
  	  store.has = store.has;
  	  store.set = store.set;
  	  /* eslint-enable no-self-assign -- prototype methods protection */
  	  set = function (it, metadata) {
  	    if (store.has(it)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
  	    metadata.facade = it;
  	    store.set(it, metadata);
  	    return metadata;
  	  };
  	  get = function (it) {
  	    return store.get(it) || {};
  	  };
  	  has = function (it) {
  	    return store.has(it);
  	  };
  	} else {
  	  var STATE = sharedKey('state');
  	  hiddenKeys[STATE] = true;
  	  set = function (it, metadata) {
  	    if (hasOwn(it, STATE)) throw new TypeError(OBJECT_ALREADY_INITIALIZED);
  	    metadata.facade = it;
  	    createNonEnumerableProperty(it, STATE, metadata);
  	    return metadata;
  	  };
  	  get = function (it) {
  	    return hasOwn(it, STATE) ? it[STATE] : {};
  	  };
  	  has = function (it) {
  	    return hasOwn(it, STATE);
  	  };
  	}

  	internalState = {
  	  set: set,
  	  get: get,
  	  has: has,
  	  enforce: enforce,
  	  getterFor: getterFor
  	};
  	return internalState;
  }

  var objectGetOwnPropertyDescriptor = {};

  var objectPropertyIsEnumerable = {};

  var hasRequiredObjectPropertyIsEnumerable;

  function requireObjectPropertyIsEnumerable () {
  	if (hasRequiredObjectPropertyIsEnumerable) return objectPropertyIsEnumerable;
  	hasRequiredObjectPropertyIsEnumerable = 1;
  	var $propertyIsEnumerable = {}.propertyIsEnumerable;
  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  	// Nashorn ~ JDK8 bug
  	var NASHORN_BUG = getOwnPropertyDescriptor && !$propertyIsEnumerable.call({ 1: 2 }, 1);

  	// `Object.prototype.propertyIsEnumerable` method implementation
  	// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
  	objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  	  var descriptor = getOwnPropertyDescriptor(this, V);
  	  return !!descriptor && descriptor.enumerable;
  	} : $propertyIsEnumerable;
  	return objectPropertyIsEnumerable;
  }

  var hasRequiredObjectGetOwnPropertyDescriptor;

  function requireObjectGetOwnPropertyDescriptor () {
  	if (hasRequiredObjectGetOwnPropertyDescriptor) return objectGetOwnPropertyDescriptor;
  	hasRequiredObjectGetOwnPropertyDescriptor = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var call = requireFunctionCall();
  	var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
  	var createPropertyDescriptor = requireCreatePropertyDescriptor();
  	var toIndexedObject = requireToIndexedObject();
  	var toPropertyKey = requireToPropertyKey();
  	var hasOwn = requireHasOwnProperty();
  	var IE8_DOM_DEFINE = requireIe8DomDefine();

  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  	// `Object.getOwnPropertyDescriptor` method
  	// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
  	objectGetOwnPropertyDescriptor.f = DESCRIPTORS ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  	  O = toIndexedObject(O);
  	  P = toPropertyKey(P);
  	  if (IE8_DOM_DEFINE) try {
  	    return $getOwnPropertyDescriptor(O, P);
  	  } catch (error) { /* empty */ }
  	  if (hasOwn(O, P)) return createPropertyDescriptor(!call(propertyIsEnumerableModule.f, O, P), O[P]);
  	};
  	return objectGetOwnPropertyDescriptor;
  }

  var makeBuiltIn = {exports: {}};

  var functionName;
  var hasRequiredFunctionName;

  function requireFunctionName () {
  	if (hasRequiredFunctionName) return functionName;
  	hasRequiredFunctionName = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var hasOwn = requireHasOwnProperty();

  	var FunctionPrototype = Function.prototype;
  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var getDescriptor = DESCRIPTORS && Object.getOwnPropertyDescriptor;

  	var EXISTS = hasOwn(FunctionPrototype, 'name');
  	// additional protection from minified / mangled / dropped function names
  	var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
  	var CONFIGURABLE = EXISTS && (!DESCRIPTORS || (DESCRIPTORS && getDescriptor(FunctionPrototype, 'name').configurable));

  	functionName = {
  	  EXISTS: EXISTS,
  	  PROPER: PROPER,
  	  CONFIGURABLE: CONFIGURABLE
  	};
  	return functionName;
  }

  var inspectSource;
  var hasRequiredInspectSource;

  function requireInspectSource () {
  	if (hasRequiredInspectSource) return inspectSource;
  	hasRequiredInspectSource = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var isCallable = requireIsCallable();
  	var store = requireSharedStore();

  	var functionToString = uncurryThis(Function.toString);

  	// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
  	if (!isCallable(store.inspectSource)) {
  	  store.inspectSource = function (it) {
  	    return functionToString(it);
  	  };
  	}

  	inspectSource = store.inspectSource;
  	return inspectSource;
  }

  var hasRequiredMakeBuiltIn;

  function requireMakeBuiltIn () {
  	if (hasRequiredMakeBuiltIn) return makeBuiltIn.exports;
  	hasRequiredMakeBuiltIn = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var fails = requireFails();
  	var isCallable = requireIsCallable();
  	var hasOwn = requireHasOwnProperty();
  	var DESCRIPTORS = requireDescriptors();
  	var CONFIGURABLE_FUNCTION_NAME = requireFunctionName().CONFIGURABLE;
  	var inspectSource = requireInspectSource();
  	var InternalStateModule = requireInternalState();

  	var enforceInternalState = InternalStateModule.enforce;
  	var getInternalState = InternalStateModule.get;
  	var $String = String;
  	// eslint-disable-next-line es/no-object-defineproperty -- safe
  	var defineProperty = Object.defineProperty;
  	var stringSlice = uncurryThis(''.slice);
  	var replace = uncurryThis(''.replace);
  	var join = uncurryThis([].join);

  	var CONFIGURABLE_LENGTH = DESCRIPTORS && !fails(function () {
  	  return defineProperty(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
  	});

  	var TEMPLATE = String(String).split('String');

  	var makeBuiltIn$1 = makeBuiltIn.exports = function (value, name, options) {
  	  if (stringSlice($String(name), 0, 7) === 'Symbol(') {
  	    name = '[' + replace($String(name), /^Symbol\(([^)]*)\).*$/, '$1') + ']';
  	  }
  	  if (options && options.getter) name = 'get ' + name;
  	  if (options && options.setter) name = 'set ' + name;
  	  if (!hasOwn(value, 'name') || (CONFIGURABLE_FUNCTION_NAME && value.name !== name)) {
  	    if (DESCRIPTORS) defineProperty(value, 'name', { value: name, configurable: true });
  	    else value.name = name;
  	  }
  	  if (CONFIGURABLE_LENGTH && options && hasOwn(options, 'arity') && value.length !== options.arity) {
  	    defineProperty(value, 'length', { value: options.arity });
  	  }
  	  try {
  	    if (options && hasOwn(options, 'constructor') && options.constructor) {
  	      if (DESCRIPTORS) defineProperty(value, 'prototype', { writable: false });
  	    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
  	    } else if (value.prototype) value.prototype = undefined;
  	  } catch (error) { /* empty */ }
  	  var state = enforceInternalState(value);
  	  if (!hasOwn(state, 'source')) {
  	    state.source = join(TEMPLATE, typeof name == 'string' ? name : '');
  	  } return value;
  	};

  	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
  	// eslint-disable-next-line no-extend-native -- required
  	Function.prototype.toString = makeBuiltIn$1(function toString() {
  	  return isCallable(this) && getInternalState(this).source || inspectSource(this);
  	}, 'toString');
  	return makeBuiltIn.exports;
  }

  var defineBuiltIn;
  var hasRequiredDefineBuiltIn;

  function requireDefineBuiltIn () {
  	if (hasRequiredDefineBuiltIn) return defineBuiltIn;
  	hasRequiredDefineBuiltIn = 1;
  	var isCallable = requireIsCallable();
  	var definePropertyModule = requireObjectDefineProperty();
  	var makeBuiltIn = requireMakeBuiltIn();
  	var defineGlobalProperty = requireDefineGlobalProperty();

  	defineBuiltIn = function (O, key, value, options) {
  	  if (!options) options = {};
  	  var simple = options.enumerable;
  	  var name = options.name !== undefined ? options.name : key;
  	  if (isCallable(value)) makeBuiltIn(value, name, options);
  	  if (options.global) {
  	    if (simple) O[key] = value;
  	    else defineGlobalProperty(key, value);
  	  } else {
  	    try {
  	      if (!options.unsafe) delete O[key];
  	      else if (O[key]) simple = true;
  	    } catch (error) { /* empty */ }
  	    if (simple) O[key] = value;
  	    else definePropertyModule.f(O, key, {
  	      value: value,
  	      enumerable: false,
  	      configurable: !options.nonConfigurable,
  	      writable: !options.nonWritable
  	    });
  	  } return O;
  	};
  	return defineBuiltIn;
  }

  var objectGetOwnPropertyNames = {};

  var hasRequiredObjectGetOwnPropertyNames;

  function requireObjectGetOwnPropertyNames () {
  	if (hasRequiredObjectGetOwnPropertyNames) return objectGetOwnPropertyNames;
  	hasRequiredObjectGetOwnPropertyNames = 1;
  	var internalObjectKeys = requireObjectKeysInternal();
  	var enumBugKeys = requireEnumBugKeys();

  	var hiddenKeys = enumBugKeys.concat('length', 'prototype');

  	// `Object.getOwnPropertyNames` method
  	// https://tc39.es/ecma262/#sec-object.getownpropertynames
  	// eslint-disable-next-line es/no-object-getownpropertynames -- safe
  	objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  	  return internalObjectKeys(O, hiddenKeys);
  	};
  	return objectGetOwnPropertyNames;
  }

  var objectGetOwnPropertySymbols = {};

  var hasRequiredObjectGetOwnPropertySymbols;

  function requireObjectGetOwnPropertySymbols () {
  	if (hasRequiredObjectGetOwnPropertySymbols) return objectGetOwnPropertySymbols;
  	hasRequiredObjectGetOwnPropertySymbols = 1;
  	// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
  	objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;
  	return objectGetOwnPropertySymbols;
  }

  var ownKeys;
  var hasRequiredOwnKeys;

  function requireOwnKeys () {
  	if (hasRequiredOwnKeys) return ownKeys;
  	hasRequiredOwnKeys = 1;
  	var getBuiltIn = requireGetBuiltIn();
  	var uncurryThis = requireFunctionUncurryThis();
  	var getOwnPropertyNamesModule = requireObjectGetOwnPropertyNames();
  	var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
  	var anObject = requireAnObject();

  	var concat = uncurryThis([].concat);

  	// all object keys, includes non-enumerable and symbols
  	ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  	  var keys = getOwnPropertyNamesModule.f(anObject(it));
  	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  	  return getOwnPropertySymbols ? concat(keys, getOwnPropertySymbols(it)) : keys;
  	};
  	return ownKeys;
  }

  var copyConstructorProperties;
  var hasRequiredCopyConstructorProperties;

  function requireCopyConstructorProperties () {
  	if (hasRequiredCopyConstructorProperties) return copyConstructorProperties;
  	hasRequiredCopyConstructorProperties = 1;
  	var hasOwn = requireHasOwnProperty();
  	var ownKeys = requireOwnKeys();
  	var getOwnPropertyDescriptorModule = requireObjectGetOwnPropertyDescriptor();
  	var definePropertyModule = requireObjectDefineProperty();

  	copyConstructorProperties = function (target, source, exceptions) {
  	  var keys = ownKeys(source);
  	  var defineProperty = definePropertyModule.f;
  	  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  	  for (var i = 0; i < keys.length; i++) {
  	    var key = keys[i];
  	    if (!hasOwn(target, key) && !(exceptions && hasOwn(exceptions, key))) {
  	      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  	    }
  	  }
  	};
  	return copyConstructorProperties;
  }

  var isForced_1;
  var hasRequiredIsForced;

  function requireIsForced () {
  	if (hasRequiredIsForced) return isForced_1;
  	hasRequiredIsForced = 1;
  	var fails = requireFails();
  	var isCallable = requireIsCallable();

  	var replacement = /#|\.prototype\./;

  	var isForced = function (feature, detection) {
  	  var value = data[normalize(feature)];
  	  return value === POLYFILL ? true
  	    : value === NATIVE ? false
  	    : isCallable(detection) ? fails(detection)
  	    : !!detection;
  	};

  	var normalize = isForced.normalize = function (string) {
  	  return String(string).replace(replacement, '.').toLowerCase();
  	};

  	var data = isForced.data = {};
  	var NATIVE = isForced.NATIVE = 'N';
  	var POLYFILL = isForced.POLYFILL = 'P';

  	isForced_1 = isForced;
  	return isForced_1;
  }

  var _export;
  var hasRequired_export;

  function require_export () {
  	if (hasRequired_export) return _export;
  	hasRequired_export = 1;
  	var globalThis = requireGlobalThis();
  	var getOwnPropertyDescriptor = requireObjectGetOwnPropertyDescriptor().f;
  	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  	var defineBuiltIn = requireDefineBuiltIn();
  	var defineGlobalProperty = requireDefineGlobalProperty();
  	var copyConstructorProperties = requireCopyConstructorProperties();
  	var isForced = requireIsForced();

  	/*
  	  options.target         - name of the target object
  	  options.global         - target is the global object
  	  options.stat           - export as static methods of target
  	  options.proto          - export as prototype methods of target
  	  options.real           - real prototype method for the `pure` version
  	  options.forced         - export even if the native feature is available
  	  options.bind           - bind methods to the target, required for the `pure` version
  	  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  	  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  	  options.sham           - add a flag to not completely full polyfills
  	  options.enumerable     - export as enumerable property
  	  options.dontCallGetSet - prevent calling a getter on target
  	  options.name           - the .name of the function if it does not match the key
  	*/
  	_export = function (options, source) {
  	  var TARGET = options.target;
  	  var GLOBAL = options.global;
  	  var STATIC = options.stat;
  	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  	  if (GLOBAL) {
  	    target = globalThis;
  	  } else if (STATIC) {
  	    target = globalThis[TARGET] || defineGlobalProperty(TARGET, {});
  	  } else {
  	    target = globalThis[TARGET] && globalThis[TARGET].prototype;
  	  }
  	  if (target) for (key in source) {
  	    sourceProperty = source[key];
  	    if (options.dontCallGetSet) {
  	      descriptor = getOwnPropertyDescriptor(target, key);
  	      targetProperty = descriptor && descriptor.value;
  	    } else targetProperty = target[key];
  	    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
  	    // contained in target
  	    if (!FORCED && targetProperty !== undefined) {
  	      if (typeof sourceProperty == typeof targetProperty) continue;
  	      copyConstructorProperties(sourceProperty, targetProperty);
  	    }
  	    // add a flag to not completely full polyfills
  	    if (options.sham || (targetProperty && targetProperty.sham)) {
  	      createNonEnumerableProperty(sourceProperty, 'sham', true);
  	    }
  	    defineBuiltIn(target, key, sourceProperty, options);
  	  }
  	};
  	return _export;
  }

  var correctPrototypeGetter;
  var hasRequiredCorrectPrototypeGetter;

  function requireCorrectPrototypeGetter () {
  	if (hasRequiredCorrectPrototypeGetter) return correctPrototypeGetter;
  	hasRequiredCorrectPrototypeGetter = 1;
  	var fails = requireFails();

  	correctPrototypeGetter = !fails(function () {
  	  function F() { /* empty */ }
  	  F.prototype.constructor = null;
  	  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  	  return Object.getPrototypeOf(new F()) !== F.prototype;
  	});
  	return correctPrototypeGetter;
  }

  var objectGetPrototypeOf;
  var hasRequiredObjectGetPrototypeOf;

  function requireObjectGetPrototypeOf () {
  	if (hasRequiredObjectGetPrototypeOf) return objectGetPrototypeOf;
  	hasRequiredObjectGetPrototypeOf = 1;
  	var hasOwn = requireHasOwnProperty();
  	var isCallable = requireIsCallable();
  	var toObject = requireToObject();
  	var sharedKey = requireSharedKey();
  	var CORRECT_PROTOTYPE_GETTER = requireCorrectPrototypeGetter();

  	var IE_PROTO = sharedKey('IE_PROTO');
  	var $Object = Object;
  	var ObjectPrototype = $Object.prototype;

  	// `Object.getPrototypeOf` method
  	// https://tc39.es/ecma262/#sec-object.getprototypeof
  	// eslint-disable-next-line es/no-object-getprototypeof -- safe
  	objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object.getPrototypeOf : function (O) {
  	  var object = toObject(O);
  	  if (hasOwn(object, IE_PROTO)) return object[IE_PROTO];
  	  var constructor = object.constructor;
  	  if (isCallable(constructor) && object instanceof constructor) {
  	    return constructor.prototype;
  	  } return object instanceof $Object ? ObjectPrototype : null;
  	};
  	return objectGetPrototypeOf;
  }

  var iteratorsCore;
  var hasRequiredIteratorsCore;

  function requireIteratorsCore () {
  	if (hasRequiredIteratorsCore) return iteratorsCore;
  	hasRequiredIteratorsCore = 1;
  	var fails = requireFails();
  	var isCallable = requireIsCallable();
  	var isObject = requireIsObject();
  	var create = requireObjectCreate();
  	var getPrototypeOf = requireObjectGetPrototypeOf();
  	var defineBuiltIn = requireDefineBuiltIn();
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var IS_PURE = requireIsPure();

  	var ITERATOR = wellKnownSymbol('iterator');
  	var BUGGY_SAFARI_ITERATORS = false;

  	// `%IteratorPrototype%` object
  	// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
  	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

  	/* eslint-disable es/no-array-prototype-keys -- safe */
  	if ([].keys) {
  	  arrayIterator = [].keys();
  	  // Safari 8 has buggy iterators w/o `next`
  	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  	  else {
  	    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
  	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  	  }
  	}

  	var NEW_ITERATOR_PROTOTYPE = !isObject(IteratorPrototype) || fails(function () {
  	  var test = {};
  	  // FF44- legacy iterators case
  	  return IteratorPrototype[ITERATOR].call(test) !== test;
  	});

  	if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype = {};
  	else if (IS_PURE) IteratorPrototype = create(IteratorPrototype);

  	// `%IteratorPrototype%[@@iterator]()` method
  	// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
  	if (!isCallable(IteratorPrototype[ITERATOR])) {
  	  defineBuiltIn(IteratorPrototype, ITERATOR, function () {
  	    return this;
  	  });
  	}

  	iteratorsCore = {
  	  IteratorPrototype: IteratorPrototype,
  	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
  	};
  	return iteratorsCore;
  }

  var setToStringTag;
  var hasRequiredSetToStringTag;

  function requireSetToStringTag () {
  	if (hasRequiredSetToStringTag) return setToStringTag;
  	hasRequiredSetToStringTag = 1;
  	var defineProperty = requireObjectDefineProperty().f;
  	var hasOwn = requireHasOwnProperty();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

  	setToStringTag = function (target, TAG, STATIC) {
  	  if (target && !STATIC) target = target.prototype;
  	  if (target && !hasOwn(target, TO_STRING_TAG)) {
  	    defineProperty(target, TO_STRING_TAG, { configurable: true, value: TAG });
  	  }
  	};
  	return setToStringTag;
  }

  var iteratorCreateConstructor;
  var hasRequiredIteratorCreateConstructor;

  function requireIteratorCreateConstructor () {
  	if (hasRequiredIteratorCreateConstructor) return iteratorCreateConstructor;
  	hasRequiredIteratorCreateConstructor = 1;
  	var IteratorPrototype = requireIteratorsCore().IteratorPrototype;
  	var create = requireObjectCreate();
  	var createPropertyDescriptor = requireCreatePropertyDescriptor();
  	var setToStringTag = requireSetToStringTag();
  	var Iterators = requireIterators();

  	var returnThis = function () { return this; };

  	iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  	  var TO_STRING_TAG = NAME + ' Iterator';
  	  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(+!ENUMERABLE_NEXT, next) });
  	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  	  Iterators[TO_STRING_TAG] = returnThis;
  	  return IteratorConstructor;
  	};
  	return iteratorCreateConstructor;
  }

  var functionUncurryThisAccessor;
  var hasRequiredFunctionUncurryThisAccessor;

  function requireFunctionUncurryThisAccessor () {
  	if (hasRequiredFunctionUncurryThisAccessor) return functionUncurryThisAccessor;
  	hasRequiredFunctionUncurryThisAccessor = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var aCallable = requireACallable();

  	functionUncurryThisAccessor = function (object, key, method) {
  	  try {
  	    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	    return uncurryThis(aCallable(Object.getOwnPropertyDescriptor(object, key)[method]));
  	  } catch (error) { /* empty */ }
  	};
  	return functionUncurryThisAccessor;
  }

  var isPossiblePrototype;
  var hasRequiredIsPossiblePrototype;

  function requireIsPossiblePrototype () {
  	if (hasRequiredIsPossiblePrototype) return isPossiblePrototype;
  	hasRequiredIsPossiblePrototype = 1;
  	var isObject = requireIsObject();

  	isPossiblePrototype = function (argument) {
  	  return isObject(argument) || argument === null;
  	};
  	return isPossiblePrototype;
  }

  var aPossiblePrototype;
  var hasRequiredAPossiblePrototype;

  function requireAPossiblePrototype () {
  	if (hasRequiredAPossiblePrototype) return aPossiblePrototype;
  	hasRequiredAPossiblePrototype = 1;
  	var isPossiblePrototype = requireIsPossiblePrototype();

  	var $String = String;
  	var $TypeError = TypeError;

  	aPossiblePrototype = function (argument) {
  	  if (isPossiblePrototype(argument)) return argument;
  	  throw new $TypeError("Can't set " + $String(argument) + ' as a prototype');
  	};
  	return aPossiblePrototype;
  }

  var objectSetPrototypeOf;
  var hasRequiredObjectSetPrototypeOf;

  function requireObjectSetPrototypeOf () {
  	if (hasRequiredObjectSetPrototypeOf) return objectSetPrototypeOf;
  	hasRequiredObjectSetPrototypeOf = 1;
  	/* eslint-disable no-proto -- safe */
  	var uncurryThisAccessor = requireFunctionUncurryThisAccessor();
  	var isObject = requireIsObject();
  	var requireObjectCoercible = requireRequireObjectCoercible();
  	var aPossiblePrototype = requireAPossiblePrototype();

  	// `Object.setPrototypeOf` method
  	// https://tc39.es/ecma262/#sec-object.setprototypeof
  	// Works with __proto__ only. Old v8 can't work with null proto objects.
  	// eslint-disable-next-line es/no-object-setprototypeof -- safe
  	objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  	  var CORRECT_SETTER = false;
  	  var test = {};
  	  var setter;
  	  try {
  	    setter = uncurryThisAccessor(Object.prototype, '__proto__', 'set');
  	    setter(test, []);
  	    CORRECT_SETTER = test instanceof Array;
  	  } catch (error) { /* empty */ }
  	  return function setPrototypeOf(O, proto) {
  	    requireObjectCoercible(O);
  	    aPossiblePrototype(proto);
  	    if (!isObject(O)) return O;
  	    if (CORRECT_SETTER) setter(O, proto);
  	    else O.__proto__ = proto;
  	    return O;
  	  };
  	}() : undefined);
  	return objectSetPrototypeOf;
  }

  var iteratorDefine;
  var hasRequiredIteratorDefine;

  function requireIteratorDefine () {
  	if (hasRequiredIteratorDefine) return iteratorDefine;
  	hasRequiredIteratorDefine = 1;
  	var $ = require_export();
  	var call = requireFunctionCall();
  	var IS_PURE = requireIsPure();
  	var FunctionName = requireFunctionName();
  	var isCallable = requireIsCallable();
  	var createIteratorConstructor = requireIteratorCreateConstructor();
  	var getPrototypeOf = requireObjectGetPrototypeOf();
  	var setPrototypeOf = requireObjectSetPrototypeOf();
  	var setToStringTag = requireSetToStringTag();
  	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  	var defineBuiltIn = requireDefineBuiltIn();
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var Iterators = requireIterators();
  	var IteratorsCore = requireIteratorsCore();

  	var PROPER_FUNCTION_NAME = FunctionName.PROPER;
  	var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
  	var IteratorPrototype = IteratorsCore.IteratorPrototype;
  	var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
  	var ITERATOR = wellKnownSymbol('iterator');
  	var KEYS = 'keys';
  	var VALUES = 'values';
  	var ENTRIES = 'entries';

  	var returnThis = function () { return this; };

  	iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  	  createIteratorConstructor(IteratorConstructor, NAME, next);

  	  var getIterationMethod = function (KIND) {
  	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
  	    if (!BUGGY_SAFARI_ITERATORS && KIND && KIND in IterablePrototype) return IterablePrototype[KIND];

  	    switch (KIND) {
  	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
  	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
  	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
  	    }

  	    return function () { return new IteratorConstructor(this); };
  	  };

  	  var TO_STRING_TAG = NAME + ' Iterator';
  	  var INCORRECT_VALUES_NAME = false;
  	  var IterablePrototype = Iterable.prototype;
  	  var nativeIterator = IterablePrototype[ITERATOR]
  	    || IterablePrototype['@@iterator']
  	    || DEFAULT && IterablePrototype[DEFAULT];
  	  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  	  var anyNativeIterator = NAME === 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  	  var CurrentIteratorPrototype, methods, KEY;

  	  // fix native
  	  if (anyNativeIterator) {
  	    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
  	    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
  	      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
  	        if (setPrototypeOf) {
  	          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
  	        } else if (!isCallable(CurrentIteratorPrototype[ITERATOR])) {
  	          defineBuiltIn(CurrentIteratorPrototype, ITERATOR, returnThis);
  	        }
  	      }
  	      // Set @@toStringTag to native iterators
  	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
  	      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
  	    }
  	  }

  	  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  	  if (PROPER_FUNCTION_NAME && DEFAULT === VALUES && nativeIterator && nativeIterator.name !== VALUES) {
  	    if (!IS_PURE && CONFIGURABLE_FUNCTION_NAME) {
  	      createNonEnumerableProperty(IterablePrototype, 'name', VALUES);
  	    } else {
  	      INCORRECT_VALUES_NAME = true;
  	      defaultIterator = function values() { return call(nativeIterator, this); };
  	    }
  	  }

  	  // export additional methods
  	  if (DEFAULT) {
  	    methods = {
  	      values: getIterationMethod(VALUES),
  	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
  	      entries: getIterationMethod(ENTRIES)
  	    };
  	    if (FORCED) for (KEY in methods) {
  	      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
  	        defineBuiltIn(IterablePrototype, KEY, methods[KEY]);
  	      }
  	    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  	  }

  	  // define iterator
  	  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
  	    defineBuiltIn(IterablePrototype, ITERATOR, defaultIterator, { name: DEFAULT });
  	  }
  	  Iterators[NAME] = defaultIterator;

  	  return methods;
  	};
  	return iteratorDefine;
  }

  var createIterResultObject;
  var hasRequiredCreateIterResultObject;

  function requireCreateIterResultObject () {
  	if (hasRequiredCreateIterResultObject) return createIterResultObject;
  	hasRequiredCreateIterResultObject = 1;
  	// `CreateIterResultObject` abstract operation
  	// https://tc39.es/ecma262/#sec-createiterresultobject
  	createIterResultObject = function (value, done) {
  	  return { value: value, done: done };
  	};
  	return createIterResultObject;
  }

  var es_array_iterator;
  var hasRequiredEs_array_iterator;

  function requireEs_array_iterator () {
  	if (hasRequiredEs_array_iterator) return es_array_iterator;
  	hasRequiredEs_array_iterator = 1;
  	var toIndexedObject = requireToIndexedObject();
  	var addToUnscopables = requireAddToUnscopables();
  	var Iterators = requireIterators();
  	var InternalStateModule = requireInternalState();
  	var defineProperty = requireObjectDefineProperty().f;
  	var defineIterator = requireIteratorDefine();
  	var createIterResultObject = requireCreateIterResultObject();
  	var IS_PURE = requireIsPure();
  	var DESCRIPTORS = requireDescriptors();

  	var ARRAY_ITERATOR = 'Array Iterator';
  	var setInternalState = InternalStateModule.set;
  	var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

  	// `Array.prototype.entries` method
  	// https://tc39.es/ecma262/#sec-array.prototype.entries
  	// `Array.prototype.keys` method
  	// https://tc39.es/ecma262/#sec-array.prototype.keys
  	// `Array.prototype.values` method
  	// https://tc39.es/ecma262/#sec-array.prototype.values
  	// `Array.prototype[@@iterator]` method
  	// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
  	// `CreateArrayIterator` internal method
  	// https://tc39.es/ecma262/#sec-createarrayiterator
  	es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  	  setInternalState(this, {
  	    type: ARRAY_ITERATOR,
  	    target: toIndexedObject(iterated), // target
  	    index: 0,                          // next index
  	    kind: kind                         // kind
  	  });
  	// `%ArrayIteratorPrototype%.next` method
  	// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
  	}, function () {
  	  var state = getInternalState(this);
  	  var target = state.target;
  	  var index = state.index++;
  	  if (!target || index >= target.length) {
  	    state.target = null;
  	    return createIterResultObject(undefined, true);
  	  }
  	  switch (state.kind) {
  	    case 'keys': return createIterResultObject(index, false);
  	    case 'values': return createIterResultObject(target[index], false);
  	  } return createIterResultObject([index, target[index]], false);
  	}, 'values');

  	// argumentsList[@@iterator] is %ArrayProto_values%
  	// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
  	// https://tc39.es/ecma262/#sec-createmappedargumentsobject
  	var values = Iterators.Arguments = Iterators.Array;

  	// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
  	addToUnscopables('keys');
  	addToUnscopables('values');
  	addToUnscopables('entries');

  	// V8 ~ Chrome 45- bug
  	if (!IS_PURE && DESCRIPTORS && values.name !== 'values') try {
  	  defineProperty(values, 'name', { value: 'values' });
  	} catch (error) { /* empty */ }
  	return es_array_iterator;
  }

  var hasRequiredWeb_domCollections_iterator;

  function requireWeb_domCollections_iterator () {
  	if (hasRequiredWeb_domCollections_iterator) return web_domCollections_iterator;
  	hasRequiredWeb_domCollections_iterator = 1;
  	var globalThis = requireGlobalThis();
  	var DOMIterables = requireDomIterables();
  	var DOMTokenListPrototype = requireDomTokenListPrototype();
  	var ArrayIteratorMethods = requireEs_array_iterator();
  	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();
  	var setToStringTag = requireSetToStringTag();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var ITERATOR = wellKnownSymbol('iterator');
  	var ArrayValues = ArrayIteratorMethods.values;

  	var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  	  if (CollectionPrototype) {
  	    // some Chrome versions have non-configurable methods on DOMTokenList
  	    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
  	      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
  	    } catch (error) {
  	      CollectionPrototype[ITERATOR] = ArrayValues;
  	    }
  	    setToStringTag(CollectionPrototype, COLLECTION_NAME, true);
  	    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
  	      // some Chrome versions have non-configurable methods on DOMTokenList
  	      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
  	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
  	      } catch (error) {
  	        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
  	      }
  	    }
  	  }
  	};

  	for (var COLLECTION_NAME in DOMIterables) {
  	  handlePrototype(globalThis[COLLECTION_NAME] && globalThis[COLLECTION_NAME].prototype, COLLECTION_NAME);
  	}

  	handlePrototype(DOMTokenListPrototype, 'DOMTokenList');
  	return web_domCollections_iterator;
  }

  requireWeb_domCollections_iterator();

  /**
   * Event Emitter - Custom event system for SWD
   * @module core/events
   */

  /**
   * EventEmitter class for managing custom events
   */
  class EventEmitter {
    constructor() {
      this.events = {};
      this.onceEvents = {};
    }

    /**
     * Register an event listener
     * @param {string} event - Event name
     * @param {Function} handler - Event handler function
     * @returns {EventEmitter} - Returns this for chaining
     */
    on(event, handler) {
      if (typeof handler !== 'function') {
        throw new TypeError('Event handler must be a function');
      }
      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(handler);
      return this;
    }

    /**
     * Register a one-time event listener
     * @param {string} event - Event name
     * @param {Function} handler - Event handler function
     * @returns {EventEmitter} - Returns this for chaining
     */
    once(event, handler) {
      if (typeof handler !== 'function') {
        throw new TypeError('Event handler must be a function');
      }
      if (!this.onceEvents[event]) {
        this.onceEvents[event] = [];
      }
      this.onceEvents[event].push(handler);
      return this;
    }

    /**
     * Remove an event listener
     * @param {string} event - Event name
     * @param {Function} handler - Event handler function to remove
     * @returns {EventEmitter} - Returns this for chaining
     */
    off(event, handler) {
      if (this.events[event]) {
        this.events[event] = this.events[event].filter(h => h !== handler);
      }
      if (this.onceEvents[event]) {
        this.onceEvents[event] = this.onceEvents[event].filter(h => h !== handler);
      }
      return this;
    }

    /**
     * Remove all listeners for an event, or all events if no event specified
     * @param {string} [event] - Event name (optional)
     * @returns {EventEmitter} - Returns this for chaining
     */
    offAll(event) {
      if (event) {
        delete this.events[event];
        delete this.onceEvents[event];
      } else {
        this.events = {};
        this.onceEvents = {};
      }
      return this;
    }

    /**
     * Emit an event with data
     * @param {string} event - Event name
     * @param {...*} args - Arguments to pass to handlers
     * @returns {EventEmitter} - Returns this for chaining
     */
    emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      // Call regular event handlers
      if (this.events[event]) {
        this.events[event].forEach(handler => {
          try {
            handler(...args);
          } catch (error) {
            console.error("Error in event handler for \"".concat(event, "\":"), error);
          }
        });
      }

      // Call once event handlers and then remove them
      if (this.onceEvents[event]) {
        const handlers = [...this.onceEvents[event]];
        delete this.onceEvents[event];
        handlers.forEach(handler => {
          try {
            handler(...args);
          } catch (error) {
            console.error("Error in once event handler for \"".concat(event, "\":"), error);
          }
        });
      }
      return this;
    }

    /**
     * Get all listeners for an event
     * @param {string} event - Event name
     * @returns {Array<Function>} - Array of handler functions
     */
    listeners(event) {
      const regular = this.events[event] || [];
      const once = this.onceEvents[event] || [];
      return [...regular, ...once];
    }

    /**
     * Check if event has listeners
     * @param {string} event - Event name
     * @returns {boolean} - True if event has listeners
     */
    hasListeners(event) {
      return this.listeners(event).length > 0;
    }
  }

  /**
   * Configuration System - Default settings and config management
   * @module core/config
   */

  /**
   * Default configuration for SWD presentations
   */
  const DefaultConfig = {
    // Source type: 'html', 'markdown', 'json'
    source: 'html',
    // Data for JSON source
    data: null,
    // Markdown URL for external loading
    markdownUrl: null,
    // JSON URL for external loading
    jsonUrl: null,
    // Theme
    theme: 'light',
    // Slide transition
    transition: 'slide',
    // 'slide', 'fade', 'zoom', 'flip', 'none'

    // Transition speed
    transitionSpeed: 'normal',
    // 'fast', 'normal', 'slow'

    // Slide aspect ratio
    aspectRatio: '16:9',
    // '16:9', '4:3', '16:10'

    // Auto-slide interval (ms, 0 = disabled)
    autoSlide: 0,
    // Pause auto-slide on hover
    autoSlideStoppable: true,
    // Loop slides
    loop: false,
    // Enable keyboard navigation
    keyboard: true,
    // Enable touch/swipe navigation
    touch: true,
    // Enable mouse wheel navigation
    mouseWheel: false,
    // Show navigation controls
    controls: true,
    // Control arrow position
    controlsPosition: 'bottom-right',
    // 'bottom-right', 'bottom-left', 'edges'

    // Show progress bar
    progress: true,
    // Progress bar position
    progressPosition: 'bottom',
    // 'top', 'bottom'

    // Show slide numbers
    slideNumbers: true,
    // Slide number format
    slideNumberFormat: 'h/v',
    // 'h/v', 'h.v', 'c/t', 'c'

    // Enable overview mode
    overview: true,
    // Enable fullscreen
    fullscreen: true,
    // Enable URL hash navigation
    hash: true,
    // Enable history API
    history: false,
    // RTL mode
    rtl: false,
    // Fragment animations
    fragments: true,
    // Fragment animation style
    fragmentStyle: 'fade-in',
    // 'fade-in', 'slide-in', 'zoom-in'

    // Parallax background
    parallax: false,
    // Auto-initialize
    autoInit: true,
    // Auto-play options (for data attributes mapping)
    autoplay: false,
    autoplayDelay: 3000,
    // Plugins
    plugins: [],
    // Custom keyboard shortcuts
    keyboardShortcuts: {},
    // Accessibility
    a11y: {
      enabled: true,
      announceSlideChanges: true,
      focusVisible: true
    },
    // Export options
    export: {
      pdf: true,
      html: true,
      json: true
    },
    // Development mode
    dev: false
  };

  /**
   * Validate configuration values
   * @param {Object} config - Configuration object
   * @throws {Error} - If configuration is invalid
   */
  function validateConfig(config) {
    if (!config || typeof config !== 'object') {
      throw new Error('Configuration must be an object');
    }

    // Validate source type
    if (config.source && !['html', 'markdown', 'json'].includes(config.source)) {
      throw new Error('Invalid source type. Must be "html", "markdown", or "json"');
    }

    // Validate transition
    const validTransitions = ['slide', 'fade', 'zoom', 'flip', 'none'];
    if (config.transition && !validTransitions.includes(config.transition)) {
      throw new Error("Invalid transition. Must be one of: ".concat(validTransitions.join(', ')));
    }

    // Validate transition speed
    const validSpeeds = ['fast', 'normal', 'slow'];
    if (config.transitionSpeed && !validSpeeds.includes(config.transitionSpeed)) {
      throw new Error("Invalid transition speed. Must be one of: ".concat(validSpeeds.join(', ')));
    }

    // Validate aspect ratio
    const validRatios = ['16:9', '4:3', '16:10'];
    if (config.aspectRatio && !validRatios.includes(config.aspectRatio)) {
      throw new Error("Invalid aspect ratio. Must be one of: ".concat(validRatios.join(', ')));
    }

    // Validate autoSlide
    if (config.autoSlide !== undefined && typeof config.autoSlide !== 'number') {
      throw new Error('autoSlide must be a number');
    }
    return true;
  }

  /**
   * Deep merge two objects
   * @param {Object} target - Target object
   * @param {Object} source - Source object
   * @returns {Object} - Merged object
   */
  function deepMerge(target, source) {
    const result = _objectSpread2({}, target);
    Object.keys(source).forEach(key => {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        result[key] = deepMerge(result[key] || {}, source[key]);
      } else {
        result[key] = source[key];
      }
    });
    return result;
  }

  /**
   * Merge user configuration with defaults
   * @param {Object} defaults - Default configuration
   * @param {Object} userConfig - User configuration
   * @returns {Object} - Merged configuration
   */
  function mergeConfig(defaults) {
    let userConfig = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const merged = deepMerge(defaults, userConfig);
    validateConfig(merged);
    return merged;
  }

  var es_regexp_exec = {};

  var toStringTagSupport;
  var hasRequiredToStringTagSupport;

  function requireToStringTagSupport () {
  	if (hasRequiredToStringTagSupport) return toStringTagSupport;
  	hasRequiredToStringTagSupport = 1;
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  	var test = {};

  	test[TO_STRING_TAG] = 'z';

  	toStringTagSupport = String(test) === '[object z]';
  	return toStringTagSupport;
  }

  var classof;
  var hasRequiredClassof;

  function requireClassof () {
  	if (hasRequiredClassof) return classof;
  	hasRequiredClassof = 1;
  	var TO_STRING_TAG_SUPPORT = requireToStringTagSupport();
  	var isCallable = requireIsCallable();
  	var classofRaw = requireClassofRaw();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var TO_STRING_TAG = wellKnownSymbol('toStringTag');
  	var $Object = Object;

  	// ES3 wrong here
  	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) === 'Arguments';

  	// fallback for IE11 Script Access Denied error
  	var tryGet = function (it, key) {
  	  try {
  	    return it[key];
  	  } catch (error) { /* empty */ }
  	};

  	// getting tag from ES6+ `Object.prototype.toString`
  	classof = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  	  var O, tag, result;
  	  return it === undefined ? 'Undefined' : it === null ? 'Null'
  	    // @@toStringTag case
  	    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
  	    // builtinTag case
  	    : CORRECT_ARGUMENTS ? classofRaw(O)
  	    // ES3 arguments fallback
  	    : (result = classofRaw(O)) === 'Object' && isCallable(O.callee) ? 'Arguments' : result;
  	};
  	return classof;
  }

  var toString;
  var hasRequiredToString;

  function requireToString () {
  	if (hasRequiredToString) return toString;
  	hasRequiredToString = 1;
  	var classof = requireClassof();

  	var $String = String;

  	toString = function (argument) {
  	  if (classof(argument) === 'Symbol') throw new TypeError('Cannot convert a Symbol value to a string');
  	  return $String(argument);
  	};
  	return toString;
  }

  var regexpFlags;
  var hasRequiredRegexpFlags;

  function requireRegexpFlags () {
  	if (hasRequiredRegexpFlags) return regexpFlags;
  	hasRequiredRegexpFlags = 1;
  	var anObject = requireAnObject();

  	// `RegExp.prototype.flags` getter implementation
  	// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
  	regexpFlags = function () {
  	  var that = anObject(this);
  	  var result = '';
  	  if (that.hasIndices) result += 'd';
  	  if (that.global) result += 'g';
  	  if (that.ignoreCase) result += 'i';
  	  if (that.multiline) result += 'm';
  	  if (that.dotAll) result += 's';
  	  if (that.unicode) result += 'u';
  	  if (that.unicodeSets) result += 'v';
  	  if (that.sticky) result += 'y';
  	  return result;
  	};
  	return regexpFlags;
  }

  var regexpStickyHelpers;
  var hasRequiredRegexpStickyHelpers;

  function requireRegexpStickyHelpers () {
  	if (hasRequiredRegexpStickyHelpers) return regexpStickyHelpers;
  	hasRequiredRegexpStickyHelpers = 1;
  	var fails = requireFails();
  	var globalThis = requireGlobalThis();

  	// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  	var $RegExp = globalThis.RegExp;

  	var UNSUPPORTED_Y = fails(function () {
  	  var re = $RegExp('a', 'y');
  	  re.lastIndex = 2;
  	  return re.exec('abcd') !== null;
  	});

  	// UC Browser bug
  	// https://github.com/zloirock/core-js/issues/1008
  	var MISSED_STICKY = UNSUPPORTED_Y || fails(function () {
  	  return !$RegExp('a', 'y').sticky;
  	});

  	var BROKEN_CARET = UNSUPPORTED_Y || fails(function () {
  	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  	  var re = $RegExp('^r', 'gy');
  	  re.lastIndex = 2;
  	  return re.exec('str') !== null;
  	});

  	regexpStickyHelpers = {
  	  BROKEN_CARET: BROKEN_CARET,
  	  MISSED_STICKY: MISSED_STICKY,
  	  UNSUPPORTED_Y: UNSUPPORTED_Y
  	};
  	return regexpStickyHelpers;
  }

  var regexpUnsupportedDotAll;
  var hasRequiredRegexpUnsupportedDotAll;

  function requireRegexpUnsupportedDotAll () {
  	if (hasRequiredRegexpUnsupportedDotAll) return regexpUnsupportedDotAll;
  	hasRequiredRegexpUnsupportedDotAll = 1;
  	var fails = requireFails();
  	var globalThis = requireGlobalThis();

  	// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
  	var $RegExp = globalThis.RegExp;

  	regexpUnsupportedDotAll = fails(function () {
  	  var re = $RegExp('.', 's');
  	  return !(re.dotAll && re.test('\n') && re.flags === 's');
  	});
  	return regexpUnsupportedDotAll;
  }

  var regexpUnsupportedNcg;
  var hasRequiredRegexpUnsupportedNcg;

  function requireRegexpUnsupportedNcg () {
  	if (hasRequiredRegexpUnsupportedNcg) return regexpUnsupportedNcg;
  	hasRequiredRegexpUnsupportedNcg = 1;
  	var fails = requireFails();
  	var globalThis = requireGlobalThis();

  	// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
  	var $RegExp = globalThis.RegExp;

  	regexpUnsupportedNcg = fails(function () {
  	  var re = $RegExp('(?<a>b)', 'g');
  	  return re.exec('b').groups.a !== 'b' ||
  	    'b'.replace(re, '$<a>c') !== 'bc';
  	});
  	return regexpUnsupportedNcg;
  }

  var regexpExec;
  var hasRequiredRegexpExec;

  function requireRegexpExec () {
  	if (hasRequiredRegexpExec) return regexpExec;
  	hasRequiredRegexpExec = 1;
  	/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
  	/* eslint-disable regexp/no-useless-quantifier -- testing */
  	var call = requireFunctionCall();
  	var uncurryThis = requireFunctionUncurryThis();
  	var toString = requireToString();
  	var regexpFlags = requireRegexpFlags();
  	var stickyHelpers = requireRegexpStickyHelpers();
  	var shared = requireShared();
  	var create = requireObjectCreate();
  	var getInternalState = requireInternalState().get;
  	var UNSUPPORTED_DOT_ALL = requireRegexpUnsupportedDotAll();
  	var UNSUPPORTED_NCG = requireRegexpUnsupportedNcg();

  	var nativeReplace = shared('native-string-replace', String.prototype.replace);
  	var nativeExec = RegExp.prototype.exec;
  	var patchedExec = nativeExec;
  	var charAt = uncurryThis(''.charAt);
  	var indexOf = uncurryThis(''.indexOf);
  	var replace = uncurryThis(''.replace);
  	var stringSlice = uncurryThis(''.slice);

  	var UPDATES_LAST_INDEX_WRONG = (function () {
  	  var re1 = /a/;
  	  var re2 = /b*/g;
  	  call(nativeExec, re1, 'a');
  	  call(nativeExec, re2, 'a');
  	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
  	})();

  	var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

  	// nonparticipating capturing group, copied from es5-shim's String#split patch.
  	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

  	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

  	if (PATCH) {
  	  patchedExec = function exec(string) {
  	    var re = this;
  	    var state = getInternalState(re);
  	    var str = toString(string);
  	    var raw = state.raw;
  	    var result, reCopy, lastIndex, match, i, object, group;

  	    if (raw) {
  	      raw.lastIndex = re.lastIndex;
  	      result = call(patchedExec, raw, str);
  	      re.lastIndex = raw.lastIndex;
  	      return result;
  	    }

  	    var groups = state.groups;
  	    var sticky = UNSUPPORTED_Y && re.sticky;
  	    var flags = call(regexpFlags, re);
  	    var source = re.source;
  	    var charsAdded = 0;
  	    var strCopy = str;

  	    if (sticky) {
  	      flags = replace(flags, 'y', '');
  	      if (indexOf(flags, 'g') === -1) {
  	        flags += 'g';
  	      }

  	      strCopy = stringSlice(str, re.lastIndex);
  	      // Support anchored sticky behavior.
  	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt(str, re.lastIndex - 1) !== '\n')) {
  	        source = '(?: ' + source + ')';
  	        strCopy = ' ' + strCopy;
  	        charsAdded++;
  	      }
  	      // ^(? + rx + ) is needed, in combination with some str slicing, to
  	      // simulate the 'y' flag.
  	      reCopy = new RegExp('^(?:' + source + ')', flags);
  	    }

  	    if (NPCG_INCLUDED) {
  	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
  	    }
  	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

  	    match = call(nativeExec, sticky ? reCopy : re, strCopy);

  	    if (sticky) {
  	      if (match) {
  	        match.input = stringSlice(match.input, charsAdded);
  	        match[0] = stringSlice(match[0], charsAdded);
  	        match.index = re.lastIndex;
  	        re.lastIndex += match[0].length;
  	      } else re.lastIndex = 0;
  	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
  	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
  	    }
  	    if (NPCG_INCLUDED && match && match.length > 1) {
  	      // Fix browsers whose `exec` methods don't consistently return `undefined`
  	      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
  	      call(nativeReplace, match[0], reCopy, function () {
  	        for (i = 1; i < arguments.length - 2; i++) {
  	          if (arguments[i] === undefined) match[i] = undefined;
  	        }
  	      });
  	    }

  	    if (match && groups) {
  	      match.groups = object = create(null);
  	      for (i = 0; i < groups.length; i++) {
  	        group = groups[i];
  	        object[group[0]] = match[group[1]];
  	      }
  	    }

  	    return match;
  	  };
  	}

  	regexpExec = patchedExec;
  	return regexpExec;
  }

  var hasRequiredEs_regexp_exec;

  function requireEs_regexp_exec () {
  	if (hasRequiredEs_regexp_exec) return es_regexp_exec;
  	hasRequiredEs_regexp_exec = 1;
  	var $ = require_export();
  	var exec = requireRegexpExec();

  	// `RegExp.prototype.exec` method
  	// https://tc39.es/ecma262/#sec-regexp.prototype.exec
  	$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  	  exec: exec
  	});
  	return es_regexp_exec;
  }

  requireEs_regexp_exec();

  var es_string_replace = {};

  var functionApply;
  var hasRequiredFunctionApply;

  function requireFunctionApply () {
  	if (hasRequiredFunctionApply) return functionApply;
  	hasRequiredFunctionApply = 1;
  	var NATIVE_BIND = requireFunctionBindNative();

  	var FunctionPrototype = Function.prototype;
  	var apply = FunctionPrototype.apply;
  	var call = FunctionPrototype.call;

  	// eslint-disable-next-line es/no-function-prototype-bind, es/no-reflect -- safe
  	functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND ? call.bind(apply) : function () {
  	  return call.apply(apply, arguments);
  	});
  	return functionApply;
  }

  var fixRegexpWellKnownSymbolLogic;
  var hasRequiredFixRegexpWellKnownSymbolLogic;

  function requireFixRegexpWellKnownSymbolLogic () {
  	if (hasRequiredFixRegexpWellKnownSymbolLogic) return fixRegexpWellKnownSymbolLogic;
  	hasRequiredFixRegexpWellKnownSymbolLogic = 1;
  	// TODO: Remove from `core-js@4` since it's moved to entry points
  	requireEs_regexp_exec();
  	var call = requireFunctionCall();
  	var defineBuiltIn = requireDefineBuiltIn();
  	var regexpExec = requireRegexpExec();
  	var fails = requireFails();
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var createNonEnumerableProperty = requireCreateNonEnumerableProperty();

  	var SPECIES = wellKnownSymbol('species');
  	var RegExpPrototype = RegExp.prototype;

  	fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  	  var SYMBOL = wellKnownSymbol(KEY);

  	  var DELEGATES_TO_SYMBOL = !fails(function () {
  	    // String methods call symbol-named RegExp methods
  	    var O = {};
  	    O[SYMBOL] = function () { return 7; };
  	    return ''[KEY](O) !== 7;
  	  });

  	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
  	    // Symbol-named RegExp methods call .exec
  	    var execCalled = false;
  	    var re = /a/;

  	    if (KEY === 'split') {
  	      // We can't use real regex here since it causes deoptimization
  	      // and serious performance degradation in V8
  	      // https://github.com/zloirock/core-js/issues/306
  	      re = {};
  	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
  	      // a new one. We need to return the patched regex when creating the new one.
  	      re.constructor = {};
  	      re.constructor[SPECIES] = function () { return re; };
  	      re.flags = '';
  	      re[SYMBOL] = /./[SYMBOL];
  	    }

  	    re.exec = function () {
  	      execCalled = true;
  	      return null;
  	    };

  	    re[SYMBOL]('');
  	    return !execCalled;
  	  });

  	  if (
  	    !DELEGATES_TO_SYMBOL ||
  	    !DELEGATES_TO_EXEC ||
  	    FORCED
  	  ) {
  	    var nativeRegExpMethod = /./[SYMBOL];
  	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
  	      var $exec = regexp.exec;
  	      if ($exec === regexpExec || $exec === RegExpPrototype.exec) {
  	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
  	          // The native String method already delegates to @@method (this
  	          // polyfilled function), leasing to infinite recursion.
  	          // We avoid it by directly calling the native @@method method.
  	          return { done: true, value: call(nativeRegExpMethod, regexp, str, arg2) };
  	        }
  	        return { done: true, value: call(nativeMethod, str, regexp, arg2) };
  	      }
  	      return { done: false };
  	    });

  	    defineBuiltIn(String.prototype, KEY, methods[0]);
  	    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  	  }

  	  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
  	};
  	return fixRegexpWellKnownSymbolLogic;
  }

  var stringMultibyte;
  var hasRequiredStringMultibyte;

  function requireStringMultibyte () {
  	if (hasRequiredStringMultibyte) return stringMultibyte;
  	hasRequiredStringMultibyte = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();
  	var toString = requireToString();
  	var requireObjectCoercible = requireRequireObjectCoercible();

  	var charAt = uncurryThis(''.charAt);
  	var charCodeAt = uncurryThis(''.charCodeAt);
  	var stringSlice = uncurryThis(''.slice);

  	var createMethod = function (CONVERT_TO_STRING) {
  	  return function ($this, pos) {
  	    var S = toString(requireObjectCoercible($this));
  	    var position = toIntegerOrInfinity(pos);
  	    var size = S.length;
  	    var first, second;
  	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
  	    first = charCodeAt(S, position);
  	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
  	      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
  	        ? CONVERT_TO_STRING
  	          ? charAt(S, position)
  	          : first
  	        : CONVERT_TO_STRING
  	          ? stringSlice(S, position, position + 2)
  	          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  	  };
  	};

  	stringMultibyte = {
  	  // `String.prototype.codePointAt` method
  	  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  	  codeAt: createMethod(false),
  	  // `String.prototype.at` method
  	  // https://github.com/mathiasbynens/String.prototype.at
  	  charAt: createMethod(true)
  	};
  	return stringMultibyte;
  }

  var advanceStringIndex;
  var hasRequiredAdvanceStringIndex;

  function requireAdvanceStringIndex () {
  	if (hasRequiredAdvanceStringIndex) return advanceStringIndex;
  	hasRequiredAdvanceStringIndex = 1;
  	var charAt = requireStringMultibyte().charAt;

  	// `AdvanceStringIndex` abstract operation
  	// https://tc39.es/ecma262/#sec-advancestringindex
  	advanceStringIndex = function (S, index, unicode) {
  	  return index + (unicode ? charAt(S, index).length : 1);
  	};
  	return advanceStringIndex;
  }

  var getSubstitution;
  var hasRequiredGetSubstitution;

  function requireGetSubstitution () {
  	if (hasRequiredGetSubstitution) return getSubstitution;
  	hasRequiredGetSubstitution = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var toObject = requireToObject();

  	var floor = Math.floor;
  	var charAt = uncurryThis(''.charAt);
  	var replace = uncurryThis(''.replace);
  	var stringSlice = uncurryThis(''.slice);
  	// eslint-disable-next-line redos/no-vulnerable -- safe
  	var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d{1,2}|<[^>]*>)/g;
  	var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d{1,2})/g;

  	// `GetSubstitution` abstract operation
  	// https://tc39.es/ecma262/#sec-getsubstitution
  	getSubstitution = function (matched, str, position, captures, namedCaptures, replacement) {
  	  var tailPos = position + matched.length;
  	  var m = captures.length;
  	  var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
  	  if (namedCaptures !== undefined) {
  	    namedCaptures = toObject(namedCaptures);
  	    symbols = SUBSTITUTION_SYMBOLS;
  	  }
  	  return replace(replacement, symbols, function (match, ch) {
  	    var capture;
  	    switch (charAt(ch, 0)) {
  	      case '$': return '$';
  	      case '&': return matched;
  	      case '`': return stringSlice(str, 0, position);
  	      case "'": return stringSlice(str, tailPos);
  	      case '<':
  	        capture = namedCaptures[stringSlice(ch, 1, -1)];
  	        break;
  	      default: // \d\d?
  	        var n = +ch;
  	        if (n === 0) return match;
  	        if (n > m) {
  	          var f = floor(n / 10);
  	          if (f === 0) return match;
  	          if (f <= m) return captures[f - 1] === undefined ? charAt(ch, 1) : captures[f - 1] + charAt(ch, 1);
  	          return match;
  	        }
  	        capture = captures[n - 1];
  	    }
  	    return capture === undefined ? '' : capture;
  	  });
  	};
  	return getSubstitution;
  }

  var regexpFlagsDetection;
  var hasRequiredRegexpFlagsDetection;

  function requireRegexpFlagsDetection () {
  	if (hasRequiredRegexpFlagsDetection) return regexpFlagsDetection;
  	hasRequiredRegexpFlagsDetection = 1;
  	var globalThis = requireGlobalThis();
  	var fails = requireFails();

  	// babel-minify and Closure Compiler transpiles RegExp('.', 'd') -> /./d and it causes SyntaxError
  	var RegExp = globalThis.RegExp;

  	var FLAGS_GETTER_IS_CORRECT = !fails(function () {
  	  var INDICES_SUPPORT = true;
  	  try {
  	    RegExp('.', 'd');
  	  } catch (error) {
  	    INDICES_SUPPORT = false;
  	  }

  	  var O = {};
  	  // modern V8 bug
  	  var calls = '';
  	  var expected = INDICES_SUPPORT ? 'dgimsy' : 'gimsy';

  	  var addGetter = function (key, chr) {
  	    // eslint-disable-next-line es/no-object-defineproperty -- safe
  	    Object.defineProperty(O, key, { get: function () {
  	      calls += chr;
  	      return true;
  	    } });
  	  };

  	  var pairs = {
  	    dotAll: 's',
  	    global: 'g',
  	    ignoreCase: 'i',
  	    multiline: 'm',
  	    sticky: 'y'
  	  };

  	  if (INDICES_SUPPORT) pairs.hasIndices = 'd';

  	  for (var key in pairs) addGetter(key, pairs[key]);

  	  // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	  var result = Object.getOwnPropertyDescriptor(RegExp.prototype, 'flags').get.call(O);

  	  return result !== expected || calls !== expected;
  	});

  	regexpFlagsDetection = { correct: FLAGS_GETTER_IS_CORRECT };
  	return regexpFlagsDetection;
  }

  var regexpGetFlags;
  var hasRequiredRegexpGetFlags;

  function requireRegexpGetFlags () {
  	if (hasRequiredRegexpGetFlags) return regexpGetFlags;
  	hasRequiredRegexpGetFlags = 1;
  	var call = requireFunctionCall();
  	var hasOwn = requireHasOwnProperty();
  	var isPrototypeOf = requireObjectIsPrototypeOf();
  	var regExpFlagsDetection = requireRegexpFlagsDetection();
  	var regExpFlagsGetterImplementation = requireRegexpFlags();

  	var RegExpPrototype = RegExp.prototype;

  	regexpGetFlags = regExpFlagsDetection.correct ? function (it) {
  	  return it.flags;
  	} : function (it) {
  	  return (!regExpFlagsDetection.correct && isPrototypeOf(RegExpPrototype, it) && !hasOwn(it, 'flags'))
  	    ? call(regExpFlagsGetterImplementation, it)
  	    : it.flags;
  	};
  	return regexpGetFlags;
  }

  var regexpExecAbstract;
  var hasRequiredRegexpExecAbstract;

  function requireRegexpExecAbstract () {
  	if (hasRequiredRegexpExecAbstract) return regexpExecAbstract;
  	hasRequiredRegexpExecAbstract = 1;
  	var call = requireFunctionCall();
  	var anObject = requireAnObject();
  	var isCallable = requireIsCallable();
  	var classof = requireClassofRaw();
  	var regexpExec = requireRegexpExec();

  	var $TypeError = TypeError;

  	// `RegExpExec` abstract operation
  	// https://tc39.es/ecma262/#sec-regexpexec
  	regexpExecAbstract = function (R, S) {
  	  var exec = R.exec;
  	  if (isCallable(exec)) {
  	    var result = call(exec, R, S);
  	    if (result !== null) anObject(result);
  	    return result;
  	  }
  	  if (classof(R) === 'RegExp') return call(regexpExec, R, S);
  	  throw new $TypeError('RegExp#exec called on incompatible receiver');
  	};
  	return regexpExecAbstract;
  }

  var hasRequiredEs_string_replace;

  function requireEs_string_replace () {
  	if (hasRequiredEs_string_replace) return es_string_replace;
  	hasRequiredEs_string_replace = 1;
  	var apply = requireFunctionApply();
  	var call = requireFunctionCall();
  	var uncurryThis = requireFunctionUncurryThis();
  	var fixRegExpWellKnownSymbolLogic = requireFixRegexpWellKnownSymbolLogic();
  	var fails = requireFails();
  	var anObject = requireAnObject();
  	var isCallable = requireIsCallable();
  	var isObject = requireIsObject();
  	var toIntegerOrInfinity = requireToIntegerOrInfinity();
  	var toLength = requireToLength();
  	var toString = requireToString();
  	var requireObjectCoercible = requireRequireObjectCoercible();
  	var advanceStringIndex = requireAdvanceStringIndex();
  	var getMethod = requireGetMethod();
  	var getSubstitution = requireGetSubstitution();
  	var getRegExpFlags = requireRegexpGetFlags();
  	var regExpExec = requireRegexpExecAbstract();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var REPLACE = wellKnownSymbol('replace');
  	var max = Math.max;
  	var min = Math.min;
  	var concat = uncurryThis([].concat);
  	var push = uncurryThis([].push);
  	var stringIndexOf = uncurryThis(''.indexOf);
  	var stringSlice = uncurryThis(''.slice);

  	var maybeToString = function (it) {
  	  return it === undefined ? it : String(it);
  	};

  	// IE <= 11 replaces $0 with the whole match, as if it was $&
  	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
  	var REPLACE_KEEPS_$0 = (function () {
  	  // eslint-disable-next-line regexp/prefer-escape-replacement-dollar-char -- required for testing
  	  return 'a'.replace(/./, '$0') === '$0';
  	})();

  	// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
  	var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  	  if (/./[REPLACE]) {
  	    return /./[REPLACE]('a', '$0') === '';
  	  }
  	  return false;
  	})();

  	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  	  var re = /./;
  	  re.exec = function () {
  	    var result = [];
  	    result.groups = { a: '7' };
  	    return result;
  	  };
  	  // eslint-disable-next-line regexp/no-useless-dollar-replacements -- false positive
  	  return ''.replace(re, '$<a>') !== '7';
  	});

  	// @@replace logic
  	fixRegExpWellKnownSymbolLogic('replace', function (_, nativeReplace, maybeCallNative) {
  	  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  	  return [
  	    // `String.prototype.replace` method
  	    // https://tc39.es/ecma262/#sec-string.prototype.replace
  	    function replace(searchValue, replaceValue) {
  	      var O = requireObjectCoercible(this);
  	      var replacer = isObject(searchValue) ? getMethod(searchValue, REPLACE) : undefined;
  	      return replacer
  	        ? call(replacer, searchValue, O, replaceValue)
  	        : call(nativeReplace, toString(O), searchValue, replaceValue);
  	    },
  	    // `RegExp.prototype[@@replace]` method
  	    // https://tc39.es/ecma262/#sec-regexp.prototype-@@replace
  	    function (string, replaceValue) {
  	      var rx = anObject(this);
  	      var S = toString(string);

  	      if (
  	        typeof replaceValue == 'string' &&
  	        stringIndexOf(replaceValue, UNSAFE_SUBSTITUTE) === -1 &&
  	        stringIndexOf(replaceValue, '$<') === -1
  	      ) {
  	        var res = maybeCallNative(nativeReplace, rx, S, replaceValue);
  	        if (res.done) return res.value;
  	      }

  	      var functionalReplace = isCallable(replaceValue);
  	      if (!functionalReplace) replaceValue = toString(replaceValue);

  	      var flags = toString(getRegExpFlags(rx));
  	      var global = stringIndexOf(flags, 'g') !== -1;
  	      var fullUnicode;
  	      if (global) {
  	        fullUnicode = stringIndexOf(flags, 'u') !== -1;
  	        rx.lastIndex = 0;
  	      }

  	      var results = [];
  	      var result;
  	      while (true) {
  	        result = regExpExec(rx, S);
  	        if (result === null) break;

  	        push(results, result);
  	        if (!global) break;

  	        var matchStr = toString(result[0]);
  	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
  	      }

  	      var accumulatedResult = '';
  	      var nextSourcePosition = 0;
  	      for (var i = 0; i < results.length; i++) {
  	        result = results[i];

  	        var matched = toString(result[0]);
  	        var position = max(min(toIntegerOrInfinity(result.index), S.length), 0);
  	        var captures = [];
  	        var replacement;
  	        // NOTE: This is equivalent to
  	        //   captures = result.slice(1).map(maybeToString)
  	        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
  	        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
  	        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
  	        for (var j = 1; j < result.length; j++) push(captures, maybeToString(result[j]));
  	        var namedCaptures = result.groups;
  	        if (functionalReplace) {
  	          var replacerArgs = concat([matched], captures, position, S);
  	          if (namedCaptures !== undefined) push(replacerArgs, namedCaptures);
  	          replacement = toString(apply(replaceValue, undefined, replacerArgs));
  	        } else {
  	          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
  	        }
  	        if (position >= nextSourcePosition) {
  	          accumulatedResult += stringSlice(S, nextSourcePosition, position) + replacement;
  	          nextSourcePosition = position + matched.length;
  	        }
  	      }

  	      return accumulatedResult + stringSlice(S, nextSourcePosition);
  	    }
  	  ];
  	}, !REPLACE_SUPPORTS_NAMED_GROUPS || !REPLACE_KEEPS_$0 || REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE);
  	return es_string_replace;
  }

  requireEs_string_replace();

  /**
   * HTML Parser - Parse HTML with data-swd-* attributes
   * @module parsers/html-parser
   */

  /**
   * HTML Parser class
   */
  class HtmlParser {
    constructor(config) {
      this.config = config;
    }

    /**
     * Parse HTML slides
     * @param {HTMLElement} container - Container element
     * @returns {Array} - Array of slide data
     */
    parse(container) {
      const slides = [];
      const slideElements = container.querySelectorAll('[data-swd-page]');
      slideElements.forEach((element, index) => {
        const slideData = {
          index,
          layout: element.getAttribute('data-swd-layout') || 'default',
          background: element.getAttribute('data-swd-background'),
          overlay: element.getAttribute('data-swd-overlay'),
          content: element.innerHTML,
          attributes: this.parseAttributes(element)
        };

        // Parse columns for multi-column layouts
        const columns = this.parseColumns(element);
        if (columns.length > 0) {
          slideData.columns = columns;
        }
        slides.push(slideData);
      });
      return slides;
    }

    /**
     * Parse columns from slide element
     * @param {HTMLElement} element - Slide element
     * @returns {Array} - Array of column HTML strings
     */
    parseColumns(element) {
      const columns = [];
      const columnElements = element.querySelectorAll('[data-swd-column]');
      columnElements.forEach(col => {
        columns.push(col.innerHTML);
      });
      return columns;
    }

    /**
     * Parse custom attributes from element
     * @param {HTMLElement} element - Slide element
     * @returns {Object} - Parsed attributes
     */
    parseAttributes(element) {
      const attrs = {};
      const {
        attributes
      } = element;
      for (let i = 0; i < attributes.length; i += 1) {
        const attr = attributes[i];
        if (attr.name.startsWith('data-swd-')) {
          const key = attr.name.replace('data-swd-', '');
          attrs[key] = attr.value;
        }
      }
      return attrs;
    }
  }

  var es_string_trim = {};

  var whitespaces;
  var hasRequiredWhitespaces;

  function requireWhitespaces () {
  	if (hasRequiredWhitespaces) return whitespaces;
  	hasRequiredWhitespaces = 1;
  	// a string of all valid unicode whitespaces
  	whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002' +
  	  '\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';
  	return whitespaces;
  }

  var stringTrim$1;
  var hasRequiredStringTrim;

  function requireStringTrim () {
  	if (hasRequiredStringTrim) return stringTrim$1;
  	hasRequiredStringTrim = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var requireObjectCoercible = requireRequireObjectCoercible();
  	var toString = requireToString();
  	var whitespaces = requireWhitespaces();

  	var replace = uncurryThis(''.replace);
  	var ltrim = RegExp('^[' + whitespaces + ']+');
  	var rtrim = RegExp('(^|[^' + whitespaces + '])[' + whitespaces + ']+$');

  	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
  	var createMethod = function (TYPE) {
  	  return function ($this) {
  	    var string = toString(requireObjectCoercible($this));
  	    if (TYPE & 1) string = replace(string, ltrim, '');
  	    if (TYPE & 2) string = replace(string, rtrim, '$1');
  	    return string;
  	  };
  	};

  	stringTrim$1 = {
  	  // `String.prototype.{ trimLeft, trimStart }` methods
  	  // https://tc39.es/ecma262/#sec-string.prototype.trimstart
  	  start: createMethod(1),
  	  // `String.prototype.{ trimRight, trimEnd }` methods
  	  // https://tc39.es/ecma262/#sec-string.prototype.trimend
  	  end: createMethod(2),
  	  // `String.prototype.trim` method
  	  // https://tc39.es/ecma262/#sec-string.prototype.trim
  	  trim: createMethod(3)
  	};
  	return stringTrim$1;
  }

  var stringTrimForced;
  var hasRequiredStringTrimForced;

  function requireStringTrimForced () {
  	if (hasRequiredStringTrimForced) return stringTrimForced;
  	hasRequiredStringTrimForced = 1;
  	var PROPER_FUNCTION_NAME = requireFunctionName().PROPER;
  	var fails = requireFails();
  	var whitespaces = requireWhitespaces();

  	var non = '\u200B\u0085\u180E';

  	// check that a method works with the correct list
  	// of whitespaces and has a correct name
  	stringTrimForced = function (METHOD_NAME) {
  	  return fails(function () {
  	    return !!whitespaces[METHOD_NAME]()
  	      || non[METHOD_NAME]() !== non
  	      || (PROPER_FUNCTION_NAME && whitespaces[METHOD_NAME].name !== METHOD_NAME);
  	  });
  	};
  	return stringTrimForced;
  }

  var hasRequiredEs_string_trim;

  function requireEs_string_trim () {
  	if (hasRequiredEs_string_trim) return es_string_trim;
  	hasRequiredEs_string_trim = 1;
  	var $ = require_export();
  	var $trim = requireStringTrim().trim;
  	var forcedStringTrimMethod = requireStringTrimForced();

  	// `String.prototype.trim` method
  	// https://tc39.es/ecma262/#sec-string.prototype.trim
  	$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  	  trim: function trim() {
  	    return $trim(this);
  	  }
  	});
  	return es_string_trim;
  }

  requireEs_string_trim();

  /**
   * marked v15.0.12 - a markdown parser
   * Copyright (c) 2011-2025, Christopher Jeffrey. (MIT Licensed)
   * https://github.com/markedjs/marked
   */

  /**
   * DO NOT EDIT THIS FILE
   * The code in this file is generated from files in ./src/
   */


  // src/defaults.ts
  function _getDefaults() {
    return {
      async: false,
      breaks: false,
      extensions: null,
      gfm: true,
      hooks: null,
      pedantic: false,
      renderer: null,
      silent: false,
      tokenizer: null,
      walkTokens: null
    };
  }
  var _defaults = _getDefaults();
  function changeDefaults(newDefaults) {
    _defaults = newDefaults;
  }

  // src/rules.ts
  var noopTest = { exec: () => null };
  function edit(regex, opt = "") {
    let source = typeof regex === "string" ? regex : regex.source;
    const obj = {
      replace: (name, val) => {
        let valSource = typeof val === "string" ? val : val.source;
        valSource = valSource.replace(other.caret, "$1");
        source = source.replace(name, valSource);
        return obj;
      },
      getRegex: () => {
        return new RegExp(source, opt);
      }
    };
    return obj;
  }
  var other = {
    codeRemoveIndent: /^(?: {1,4}| {0,3}\t)/gm,
    outputLinkReplace: /\\([\[\]])/g,
    indentCodeCompensation: /^(\s+)(?:```)/,
    beginningSpace: /^\s+/,
    endingHash: /#$/,
    startingSpaceChar: /^ /,
    endingSpaceChar: / $/,
    nonSpaceChar: /[^ ]/,
    newLineCharGlobal: /\n/g,
    tabCharGlobal: /\t/g,
    multipleSpaceGlobal: /\s+/g,
    blankLine: /^[ \t]*$/,
    doubleBlankLine: /\n[ \t]*\n[ \t]*$/,
    blockquoteStart: /^ {0,3}>/,
    blockquoteSetextReplace: /\n {0,3}((?:=+|-+) *)(?=\n|$)/g,
    blockquoteSetextReplace2: /^ {0,3}>[ \t]?/gm,
    listReplaceTabs: /^\t+/,
    listReplaceNesting: /^ {1,4}(?=( {4})*[^ ])/g,
    listIsTask: /^\[[ xX]\] /,
    listReplaceTask: /^\[[ xX]\] +/,
    anyLine: /\n.*\n/,
    hrefBrackets: /^<(.*)>$/,
    tableDelimiter: /[:|]/,
    tableAlignChars: /^\||\| *$/g,
    tableRowBlankLine: /\n[ \t]*$/,
    tableAlignRight: /^ *-+: *$/,
    tableAlignCenter: /^ *:-+: *$/,
    tableAlignLeft: /^ *:-+ *$/,
    startATag: /^<a /i,
    endATag: /^<\/a>/i,
    startPreScriptTag: /^<(pre|code|kbd|script)(\s|>)/i,
    endPreScriptTag: /^<\/(pre|code|kbd|script)(\s|>)/i,
    startAngleBracket: /^</,
    endAngleBracket: />$/,
    pedanticHrefTitle: /^([^'"]*[^\s])\s+(['"])(.*)\2/,
    unicodeAlphaNumeric: /[\p{L}\p{N}]/u,
    escapeTest: /[&<>"']/,
    escapeReplace: /[&<>"']/g,
    escapeTestNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,
    escapeReplaceNoEncode: /[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,
    unescapeTest: /&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig,
    caret: /(^|[^\[])\^/g,
    percentDecode: /%25/g,
    findPipe: /\|/g,
    splitPipe: / \|/,
    slashPipe: /\\\|/g,
    carriageReturn: /\r\n|\r/g,
    spaceLine: /^ +$/gm,
    notSpaceStart: /^\S*/,
    endingNewline: /\n$/,
    listItemRegex: (bull) => new RegExp(`^( {0,3}${bull})((?:[	 ][^\\n]*)?(?:\\n|$))`),
    nextBulletRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),
    hrRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),
    fencesBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}(?:\`\`\`|~~~)`),
    headingBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}#`),
    htmlBeginRegex: (indent) => new RegExp(`^ {0,${Math.min(3, indent - 1)}}<(?:[a-z].*>|!--)`, "i")
  };
  var newline = /^(?:[ \t]*(?:\n|$))+/;
  var blockCode = /^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/;
  var fences = /^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/;
  var hr = /^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/;
  var heading = /^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/;
  var bullet = /(?:[*+-]|\d{1,9}[.)])/;
  var lheadingCore = /^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/;
  var lheading = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/\|table/g, "").getRegex();
  var lheadingGfm = edit(lheadingCore).replace(/bull/g, bullet).replace(/blockCode/g, /(?: {4}| {0,3}\t)/).replace(/fences/g, / {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g, / {0,3}>/).replace(/heading/g, / {0,3}#{1,6}/).replace(/html/g, / {0,3}<[^\n>]+>\n/).replace(/table/g, / {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex();
  var _paragraph = /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/;
  var blockText = /^[^\n]+/;
  var _blockLabel = /(?!\s*\])(?:\\.|[^\[\]\\])+/;
  var def = edit(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label", _blockLabel).replace("title", /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex();
  var list = edit(/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g, bullet).getRegex();
  var _tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
  var _comment = /<!--(?:-?>|[\s\S]*?(?:-->|$))/;
  var html$2 = edit(
    "^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))",
    "i"
  ).replace("comment", _comment).replace("tag", _tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
  var paragraph = edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("|table", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockquote = edit(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph", paragraph).getRegex();
  var blockNormal = {
    blockquote,
    code: blockCode,
    def,
    fences,
    heading,
    hr,
    html: html$2,
    lheading,
    list,
    newline,
    paragraph,
    table: noopTest,
    text: blockText
  };
  var gfmTable = edit(
    "^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"
  ).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("blockquote", " {0,3}>").replace("code", "(?: {4}| {0,3}	)[^\\n]").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex();
  var blockGfm = {
    ...blockNormal,
    lheading: lheadingGfm,
    table: gfmTable,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " {0,3}#{1,6}(?:\\s|$)").replace("|lheading", "").replace("table", gfmTable).replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag", _tag).getRegex()
  };
  var blockPedantic = {
    ...blockNormal,
    html: edit(
      `^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`
    ).replace("comment", _comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
    def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
    heading: /^(#{1,6})(.*)(?:\n+|$)/,
    fences: noopTest,
    // fences not supported
    lheading: /^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,
    paragraph: edit(_paragraph).replace("hr", hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", lheading).replace("|table", "").replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").replace("|tag", "").getRegex()
  };
  var escape = /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/;
  var inlineCode = /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/;
  var br = /^( {2,}|\\)\n(?!\s*$)/;
  var inlineText = /^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/;
  var _punctuation = /[\p{P}\p{S}]/u;
  var _punctuationOrSpace = /[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpace = /[^\s\p{P}\p{S}]/u;
  var punctuation = edit(/^((?![*_])punctSpace)/, "u").replace(/punctSpace/g, _punctuationOrSpace).getRegex();
  var _punctuationGfmStrongEm = /(?!~)[\p{P}\p{S}]/u;
  var _punctuationOrSpaceGfmStrongEm = /(?!~)[\s\p{P}\p{S}]/u;
  var _notPunctuationOrSpaceGfmStrongEm = /(?:[^\s\p{P}\p{S}]|~)/u;
  var blockSkip = /\[[^[\]]*?\]\((?:\\.|[^\\\(\)]|\((?:\\.|[^\\\(\)])*\))*\)|`[^`]*?`|<[^<>]*?>/g;
  var emStrongLDelimCore = /^(?:\*+(?:((?!\*)punct)|[^\s*]))|^_+(?:((?!_)punct)|([^\s_]))/;
  var emStrongLDelim = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuation).getRegex();
  var emStrongLDelimGfm = edit(emStrongLDelimCore, "u").replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimAstCore = "^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)";
  var emStrongRDelimAst = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var emStrongRDelimAstGfm = edit(emStrongRDelimAstCore, "gu").replace(/notPunctSpace/g, _notPunctuationOrSpaceGfmStrongEm).replace(/punctSpace/g, _punctuationOrSpaceGfmStrongEm).replace(/punct/g, _punctuationGfmStrongEm).getRegex();
  var emStrongRDelimUnd = edit(
    "^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)",
    "gu"
  ).replace(/notPunctSpace/g, _notPunctuationOrSpace).replace(/punctSpace/g, _punctuationOrSpace).replace(/punct/g, _punctuation).getRegex();
  var anyPunctuation = edit(/\\(punct)/, "gu").replace(/punct/g, _punctuation).getRegex();
  var autolink = edit(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme", /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email", /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex();
  var _inlineComment = edit(_comment).replace("(?:-->|$)", "-->").getRegex();
  var tag = edit(
    "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>"
  ).replace("comment", _inlineComment).replace("attribute", /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex();
  var _inlineLabel = /(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
  var link = edit(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]*(?:\n[ \t]*)?)(title))?\s*\)/).replace("label", _inlineLabel).replace("href", /<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title", /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex();
  var reflink = edit(/^!?\[(label)\]\[(ref)\]/).replace("label", _inlineLabel).replace("ref", _blockLabel).getRegex();
  var nolink = edit(/^!?\[(ref)\](?:\[\])?/).replace("ref", _blockLabel).getRegex();
  var reflinkSearch = edit("reflink|nolink(?!\\()", "g").replace("reflink", reflink).replace("nolink", nolink).getRegex();
  var inlineNormal = {
    _backpedal: noopTest,
    // only used for GFM url
    anyPunctuation,
    autolink,
    blockSkip,
    br,
    code: inlineCode,
    del: noopTest,
    emStrongLDelim,
    emStrongRDelimAst,
    emStrongRDelimUnd,
    escape,
    link,
    nolink,
    punctuation,
    reflink,
    reflinkSearch,
    tag,
    text: inlineText,
    url: noopTest
  };
  var inlinePedantic = {
    ...inlineNormal,
    link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", _inlineLabel).getRegex(),
    reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", _inlineLabel).getRegex()
  };
  var inlineGfm = {
    ...inlineNormal,
    emStrongRDelimAst: emStrongRDelimAstGfm,
    emStrongLDelim: emStrongLDelimGfm,
    url: edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/, "i").replace("email", /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),
    _backpedal: /(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,
    del: /^(~~?)(?=[^\s~])((?:\\.|[^\\])*?(?:\\.|[^\s~\\]))\1(?=[^~]|$)/,
    text: /^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/
  };
  var inlineBreaks = {
    ...inlineGfm,
    br: edit(br).replace("{2,}", "*").getRegex(),
    text: edit(inlineGfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
  };
  var block = {
    normal: blockNormal,
    gfm: blockGfm,
    pedantic: blockPedantic
  };
  var inline = {
    normal: inlineNormal,
    gfm: inlineGfm,
    breaks: inlineBreaks,
    pedantic: inlinePedantic
  };

  // src/helpers.ts
  var escapeReplacements = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  };
  var getEscapeReplacement = (ch) => escapeReplacements[ch];
  function escape2(html2, encode) {
    if (encode) {
      if (other.escapeTest.test(html2)) {
        return html2.replace(other.escapeReplace, getEscapeReplacement);
      }
    } else {
      if (other.escapeTestNoEncode.test(html2)) {
        return html2.replace(other.escapeReplaceNoEncode, getEscapeReplacement);
      }
    }
    return html2;
  }
  function cleanUrl(href) {
    try {
      href = encodeURI(href).replace(other.percentDecode, "%");
    } catch {
      return null;
    }
    return href;
  }
  function splitCells(tableRow, count) {
    const row = tableRow.replace(other.findPipe, (match, offset, str) => {
      let escaped = false;
      let curr = offset;
      while (--curr >= 0 && str[curr] === "\\") escaped = !escaped;
      if (escaped) {
        return "|";
      } else {
        return " |";
      }
    }), cells = row.split(other.splitPipe);
    let i = 0;
    if (!cells[0].trim()) {
      cells.shift();
    }
    if (cells.length > 0 && !cells.at(-1)?.trim()) {
      cells.pop();
    }
    if (count) {
      if (cells.length > count) {
        cells.splice(count);
      } else {
        while (cells.length < count) cells.push("");
      }
    }
    for (; i < cells.length; i++) {
      cells[i] = cells[i].trim().replace(other.slashPipe, "|");
    }
    return cells;
  }
  function rtrim(str, c, invert) {
    const l = str.length;
    if (l === 0) {
      return "";
    }
    let suffLen = 0;
    while (suffLen < l) {
      const currChar = str.charAt(l - suffLen - 1);
      if (currChar === c && true) {
        suffLen++;
      } else {
        break;
      }
    }
    return str.slice(0, l - suffLen);
  }
  function findClosingBracket(str, b) {
    if (str.indexOf(b[1]) === -1) {
      return -1;
    }
    let level = 0;
    for (let i = 0; i < str.length; i++) {
      if (str[i] === "\\") {
        i++;
      } else if (str[i] === b[0]) {
        level++;
      } else if (str[i] === b[1]) {
        level--;
        if (level < 0) {
          return i;
        }
      }
    }
    if (level > 0) {
      return -2;
    }
    return -1;
  }

  // src/Tokenizer.ts
  function outputLink(cap, link2, raw, lexer2, rules) {
    const href = link2.href;
    const title = link2.title || null;
    const text = cap[1].replace(rules.other.outputLinkReplace, "$1");
    lexer2.state.inLink = true;
    const token = {
      type: cap[0].charAt(0) === "!" ? "image" : "link",
      raw,
      href,
      title,
      text,
      tokens: lexer2.inlineTokens(text)
    };
    lexer2.state.inLink = false;
    return token;
  }
  function indentCodeCompensation(raw, text, rules) {
    const matchIndentToCode = raw.match(rules.other.indentCodeCompensation);
    if (matchIndentToCode === null) {
      return text;
    }
    const indentToCode = matchIndentToCode[1];
    return text.split("\n").map((node) => {
      const matchIndentInNode = node.match(rules.other.beginningSpace);
      if (matchIndentInNode === null) {
        return node;
      }
      const [indentInNode] = matchIndentInNode;
      if (indentInNode.length >= indentToCode.length) {
        return node.slice(indentToCode.length);
      }
      return node;
    }).join("\n");
  }
  var _Tokenizer = class {
    options;
    rules;
    // set by the lexer
    lexer;
    // set by the lexer
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    space(src) {
      const cap = this.rules.block.newline.exec(src);
      if (cap && cap[0].length > 0) {
        return {
          type: "space",
          raw: cap[0]
        };
      }
    }
    code(src) {
      const cap = this.rules.block.code.exec(src);
      if (cap) {
        const text = cap[0].replace(this.rules.other.codeRemoveIndent, "");
        return {
          type: "code",
          raw: cap[0],
          codeBlockStyle: "indented",
          text: !this.options.pedantic ? rtrim(text, "\n") : text
        };
      }
    }
    fences(src) {
      const cap = this.rules.block.fences.exec(src);
      if (cap) {
        const raw = cap[0];
        const text = indentCodeCompensation(raw, cap[3] || "", this.rules);
        return {
          type: "code",
          raw,
          lang: cap[2] ? cap[2].trim().replace(this.rules.inline.anyPunctuation, "$1") : cap[2],
          text
        };
      }
    }
    heading(src) {
      const cap = this.rules.block.heading.exec(src);
      if (cap) {
        let text = cap[2].trim();
        if (this.rules.other.endingHash.test(text)) {
          const trimmed = rtrim(text, "#");
          if (this.options.pedantic) {
            text = trimmed.trim();
          } else if (!trimmed || this.rules.other.endingSpaceChar.test(trimmed)) {
            text = trimmed.trim();
          }
        }
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[1].length,
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    hr(src) {
      const cap = this.rules.block.hr.exec(src);
      if (cap) {
        return {
          type: "hr",
          raw: rtrim(cap[0], "\n")
        };
      }
    }
    blockquote(src) {
      const cap = this.rules.block.blockquote.exec(src);
      if (cap) {
        let lines = rtrim(cap[0], "\n").split("\n");
        let raw = "";
        let text = "";
        const tokens = [];
        while (lines.length > 0) {
          let inBlockquote = false;
          const currentLines = [];
          let i;
          for (i = 0; i < lines.length; i++) {
            if (this.rules.other.blockquoteStart.test(lines[i])) {
              currentLines.push(lines[i]);
              inBlockquote = true;
            } else if (!inBlockquote) {
              currentLines.push(lines[i]);
            } else {
              break;
            }
          }
          lines = lines.slice(i);
          const currentRaw = currentLines.join("\n");
          const currentText = currentRaw.replace(this.rules.other.blockquoteSetextReplace, "\n    $1").replace(this.rules.other.blockquoteSetextReplace2, "");
          raw = raw ? `${raw}
${currentRaw}` : currentRaw;
          text = text ? `${text}
${currentText}` : currentText;
          const top = this.lexer.state.top;
          this.lexer.state.top = true;
          this.lexer.blockTokens(currentText, tokens, true);
          this.lexer.state.top = top;
          if (lines.length === 0) {
            break;
          }
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "code") {
            break;
          } else if (lastToken?.type === "blockquote") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.blockquote(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - oldToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.text.length) + newToken.text;
            break;
          } else if (lastToken?.type === "list") {
            const oldToken = lastToken;
            const newText = oldToken.raw + "\n" + lines.join("\n");
            const newToken = this.list(newText);
            tokens[tokens.length - 1] = newToken;
            raw = raw.substring(0, raw.length - lastToken.raw.length) + newToken.raw;
            text = text.substring(0, text.length - oldToken.raw.length) + newToken.raw;
            lines = newText.substring(tokens.at(-1).raw.length).split("\n");
            continue;
          }
        }
        return {
          type: "blockquote",
          raw,
          tokens,
          text
        };
      }
    }
    list(src) {
      let cap = this.rules.block.list.exec(src);
      if (cap) {
        let bull = cap[1].trim();
        const isordered = bull.length > 1;
        const list2 = {
          type: "list",
          raw: "",
          ordered: isordered,
          start: isordered ? +bull.slice(0, -1) : "",
          loose: false,
          items: []
        };
        bull = isordered ? `\\d{1,9}\\${bull.slice(-1)}` : `\\${bull}`;
        if (this.options.pedantic) {
          bull = isordered ? bull : "[*+-]";
        }
        const itemRegex = this.rules.other.listItemRegex(bull);
        let endsWithBlankLine = false;
        while (src) {
          let endEarly = false;
          let raw = "";
          let itemContents = "";
          if (!(cap = itemRegex.exec(src))) {
            break;
          }
          if (this.rules.block.hr.test(src)) {
            break;
          }
          raw = cap[0];
          src = src.substring(raw.length);
          let line = cap[2].split("\n", 1)[0].replace(this.rules.other.listReplaceTabs, (t) => " ".repeat(3 * t.length));
          let nextLine = src.split("\n", 1)[0];
          let blankLine = !line.trim();
          let indent = 0;
          if (this.options.pedantic) {
            indent = 2;
            itemContents = line.trimStart();
          } else if (blankLine) {
            indent = cap[1].length + 1;
          } else {
            indent = cap[2].search(this.rules.other.nonSpaceChar);
            indent = indent > 4 ? 1 : indent;
            itemContents = line.slice(indent);
            indent += cap[1].length;
          }
          if (blankLine && this.rules.other.blankLine.test(nextLine)) {
            raw += nextLine + "\n";
            src = src.substring(nextLine.length + 1);
            endEarly = true;
          }
          if (!endEarly) {
            const nextBulletRegex = this.rules.other.nextBulletRegex(indent);
            const hrRegex = this.rules.other.hrRegex(indent);
            const fencesBeginRegex = this.rules.other.fencesBeginRegex(indent);
            const headingBeginRegex = this.rules.other.headingBeginRegex(indent);
            const htmlBeginRegex = this.rules.other.htmlBeginRegex(indent);
            while (src) {
              const rawLine = src.split("\n", 1)[0];
              let nextLineWithoutTabs;
              nextLine = rawLine;
              if (this.options.pedantic) {
                nextLine = nextLine.replace(this.rules.other.listReplaceNesting, "  ");
                nextLineWithoutTabs = nextLine;
              } else {
                nextLineWithoutTabs = nextLine.replace(this.rules.other.tabCharGlobal, "    ");
              }
              if (fencesBeginRegex.test(nextLine)) {
                break;
              }
              if (headingBeginRegex.test(nextLine)) {
                break;
              }
              if (htmlBeginRegex.test(nextLine)) {
                break;
              }
              if (nextBulletRegex.test(nextLine)) {
                break;
              }
              if (hrRegex.test(nextLine)) {
                break;
              }
              if (nextLineWithoutTabs.search(this.rules.other.nonSpaceChar) >= indent || !nextLine.trim()) {
                itemContents += "\n" + nextLineWithoutTabs.slice(indent);
              } else {
                if (blankLine) {
                  break;
                }
                if (line.replace(this.rules.other.tabCharGlobal, "    ").search(this.rules.other.nonSpaceChar) >= 4) {
                  break;
                }
                if (fencesBeginRegex.test(line)) {
                  break;
                }
                if (headingBeginRegex.test(line)) {
                  break;
                }
                if (hrRegex.test(line)) {
                  break;
                }
                itemContents += "\n" + nextLine;
              }
              if (!blankLine && !nextLine.trim()) {
                blankLine = true;
              }
              raw += rawLine + "\n";
              src = src.substring(rawLine.length + 1);
              line = nextLineWithoutTabs.slice(indent);
            }
          }
          if (!list2.loose) {
            if (endsWithBlankLine) {
              list2.loose = true;
            } else if (this.rules.other.doubleBlankLine.test(raw)) {
              endsWithBlankLine = true;
            }
          }
          let istask = null;
          let ischecked;
          if (this.options.gfm) {
            istask = this.rules.other.listIsTask.exec(itemContents);
            if (istask) {
              ischecked = istask[0] !== "[ ] ";
              itemContents = itemContents.replace(this.rules.other.listReplaceTask, "");
            }
          }
          list2.items.push({
            type: "list_item",
            raw,
            task: !!istask,
            checked: ischecked,
            loose: false,
            text: itemContents,
            tokens: []
          });
          list2.raw += raw;
        }
        const lastItem = list2.items.at(-1);
        if (lastItem) {
          lastItem.raw = lastItem.raw.trimEnd();
          lastItem.text = lastItem.text.trimEnd();
        } else {
          return;
        }
        list2.raw = list2.raw.trimEnd();
        for (let i = 0; i < list2.items.length; i++) {
          this.lexer.state.top = false;
          list2.items[i].tokens = this.lexer.blockTokens(list2.items[i].text, []);
          if (!list2.loose) {
            const spacers = list2.items[i].tokens.filter((t) => t.type === "space");
            const hasMultipleLineBreaks = spacers.length > 0 && spacers.some((t) => this.rules.other.anyLine.test(t.raw));
            list2.loose = hasMultipleLineBreaks;
          }
        }
        if (list2.loose) {
          for (let i = 0; i < list2.items.length; i++) {
            list2.items[i].loose = true;
          }
        }
        return list2;
      }
    }
    html(src) {
      const cap = this.rules.block.html.exec(src);
      if (cap) {
        const token = {
          type: "html",
          block: true,
          raw: cap[0],
          pre: cap[1] === "pre" || cap[1] === "script" || cap[1] === "style",
          text: cap[0]
        };
        return token;
      }
    }
    def(src) {
      const cap = this.rules.block.def.exec(src);
      if (cap) {
        const tag2 = cap[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal, " ");
        const href = cap[2] ? cap[2].replace(this.rules.other.hrefBrackets, "$1").replace(this.rules.inline.anyPunctuation, "$1") : "";
        const title = cap[3] ? cap[3].substring(1, cap[3].length - 1).replace(this.rules.inline.anyPunctuation, "$1") : cap[3];
        return {
          type: "def",
          tag: tag2,
          raw: cap[0],
          href,
          title
        };
      }
    }
    table(src) {
      const cap = this.rules.block.table.exec(src);
      if (!cap) {
        return;
      }
      if (!this.rules.other.tableDelimiter.test(cap[2])) {
        return;
      }
      const headers = splitCells(cap[1]);
      const aligns = cap[2].replace(this.rules.other.tableAlignChars, "").split("|");
      const rows = cap[3]?.trim() ? cap[3].replace(this.rules.other.tableRowBlankLine, "").split("\n") : [];
      const item = {
        type: "table",
        raw: cap[0],
        header: [],
        align: [],
        rows: []
      };
      if (headers.length !== aligns.length) {
        return;
      }
      for (const align of aligns) {
        if (this.rules.other.tableAlignRight.test(align)) {
          item.align.push("right");
        } else if (this.rules.other.tableAlignCenter.test(align)) {
          item.align.push("center");
        } else if (this.rules.other.tableAlignLeft.test(align)) {
          item.align.push("left");
        } else {
          item.align.push(null);
        }
      }
      for (let i = 0; i < headers.length; i++) {
        item.header.push({
          text: headers[i],
          tokens: this.lexer.inline(headers[i]),
          header: true,
          align: item.align[i]
        });
      }
      for (const row of rows) {
        item.rows.push(splitCells(row, item.header.length).map((cell, i) => {
          return {
            text: cell,
            tokens: this.lexer.inline(cell),
            header: false,
            align: item.align[i]
          };
        }));
      }
      return item;
    }
    lheading(src) {
      const cap = this.rules.block.lheading.exec(src);
      if (cap) {
        return {
          type: "heading",
          raw: cap[0],
          depth: cap[2].charAt(0) === "=" ? 1 : 2,
          text: cap[1],
          tokens: this.lexer.inline(cap[1])
        };
      }
    }
    paragraph(src) {
      const cap = this.rules.block.paragraph.exec(src);
      if (cap) {
        const text = cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1];
        return {
          type: "paragraph",
          raw: cap[0],
          text,
          tokens: this.lexer.inline(text)
        };
      }
    }
    text(src) {
      const cap = this.rules.block.text.exec(src);
      if (cap) {
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          tokens: this.lexer.inline(cap[0])
        };
      }
    }
    escape(src) {
      const cap = this.rules.inline.escape.exec(src);
      if (cap) {
        return {
          type: "escape",
          raw: cap[0],
          text: cap[1]
        };
      }
    }
    tag(src) {
      const cap = this.rules.inline.tag.exec(src);
      if (cap) {
        if (!this.lexer.state.inLink && this.rules.other.startATag.test(cap[0])) {
          this.lexer.state.inLink = true;
        } else if (this.lexer.state.inLink && this.rules.other.endATag.test(cap[0])) {
          this.lexer.state.inLink = false;
        }
        if (!this.lexer.state.inRawBlock && this.rules.other.startPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = true;
        } else if (this.lexer.state.inRawBlock && this.rules.other.endPreScriptTag.test(cap[0])) {
          this.lexer.state.inRawBlock = false;
        }
        return {
          type: "html",
          raw: cap[0],
          inLink: this.lexer.state.inLink,
          inRawBlock: this.lexer.state.inRawBlock,
          block: false,
          text: cap[0]
        };
      }
    }
    link(src) {
      const cap = this.rules.inline.link.exec(src);
      if (cap) {
        const trimmedUrl = cap[2].trim();
        if (!this.options.pedantic && this.rules.other.startAngleBracket.test(trimmedUrl)) {
          if (!this.rules.other.endAngleBracket.test(trimmedUrl)) {
            return;
          }
          const rtrimSlash = rtrim(trimmedUrl.slice(0, -1), "\\");
          if ((trimmedUrl.length - rtrimSlash.length) % 2 === 0) {
            return;
          }
        } else {
          const lastParenIndex = findClosingBracket(cap[2], "()");
          if (lastParenIndex === -2) {
            return;
          }
          if (lastParenIndex > -1) {
            const start = cap[0].indexOf("!") === 0 ? 5 : 4;
            const linkLen = start + cap[1].length + lastParenIndex;
            cap[2] = cap[2].substring(0, lastParenIndex);
            cap[0] = cap[0].substring(0, linkLen).trim();
            cap[3] = "";
          }
        }
        let href = cap[2];
        let title = "";
        if (this.options.pedantic) {
          const link2 = this.rules.other.pedanticHrefTitle.exec(href);
          if (link2) {
            href = link2[1];
            title = link2[3];
          }
        } else {
          title = cap[3] ? cap[3].slice(1, -1) : "";
        }
        href = href.trim();
        if (this.rules.other.startAngleBracket.test(href)) {
          if (this.options.pedantic && !this.rules.other.endAngleBracket.test(trimmedUrl)) {
            href = href.slice(1);
          } else {
            href = href.slice(1, -1);
          }
        }
        return outputLink(cap, {
          href: href ? href.replace(this.rules.inline.anyPunctuation, "$1") : href,
          title: title ? title.replace(this.rules.inline.anyPunctuation, "$1") : title
        }, cap[0], this.lexer, this.rules);
      }
    }
    reflink(src, links) {
      let cap;
      if ((cap = this.rules.inline.reflink.exec(src)) || (cap = this.rules.inline.nolink.exec(src))) {
        const linkString = (cap[2] || cap[1]).replace(this.rules.other.multipleSpaceGlobal, " ");
        const link2 = links[linkString.toLowerCase()];
        if (!link2) {
          const text = cap[0].charAt(0);
          return {
            type: "text",
            raw: text,
            text
          };
        }
        return outputLink(cap, link2, cap[0], this.lexer, this.rules);
      }
    }
    emStrong(src, maskedSrc, prevChar = "") {
      let match = this.rules.inline.emStrongLDelim.exec(src);
      if (!match) return;
      if (match[3] && prevChar.match(this.rules.other.unicodeAlphaNumeric)) return;
      const nextChar = match[1] || match[2] || "";
      if (!nextChar || !prevChar || this.rules.inline.punctuation.exec(prevChar)) {
        const lLength = [...match[0]].length - 1;
        let rDelim, rLength, delimTotal = lLength, midDelimTotal = 0;
        const endReg = match[0][0] === "*" ? this.rules.inline.emStrongRDelimAst : this.rules.inline.emStrongRDelimUnd;
        endReg.lastIndex = 0;
        maskedSrc = maskedSrc.slice(-1 * src.length + lLength);
        while ((match = endReg.exec(maskedSrc)) != null) {
          rDelim = match[1] || match[2] || match[3] || match[4] || match[5] || match[6];
          if (!rDelim) continue;
          rLength = [...rDelim].length;
          if (match[3] || match[4]) {
            delimTotal += rLength;
            continue;
          } else if (match[5] || match[6]) {
            if (lLength % 3 && !((lLength + rLength) % 3)) {
              midDelimTotal += rLength;
              continue;
            }
          }
          delimTotal -= rLength;
          if (delimTotal > 0) continue;
          rLength = Math.min(rLength, rLength + delimTotal + midDelimTotal);
          const lastCharLength = [...match[0]][0].length;
          const raw = src.slice(0, lLength + match.index + lastCharLength + rLength);
          if (Math.min(lLength, rLength) % 2) {
            const text2 = raw.slice(1, -1);
            return {
              type: "em",
              raw,
              text: text2,
              tokens: this.lexer.inlineTokens(text2)
            };
          }
          const text = raw.slice(2, -2);
          return {
            type: "strong",
            raw,
            text,
            tokens: this.lexer.inlineTokens(text)
          };
        }
      }
    }
    codespan(src) {
      const cap = this.rules.inline.code.exec(src);
      if (cap) {
        let text = cap[2].replace(this.rules.other.newLineCharGlobal, " ");
        const hasNonSpaceChars = this.rules.other.nonSpaceChar.test(text);
        const hasSpaceCharsOnBothEnds = this.rules.other.startingSpaceChar.test(text) && this.rules.other.endingSpaceChar.test(text);
        if (hasNonSpaceChars && hasSpaceCharsOnBothEnds) {
          text = text.substring(1, text.length - 1);
        }
        return {
          type: "codespan",
          raw: cap[0],
          text
        };
      }
    }
    br(src) {
      const cap = this.rules.inline.br.exec(src);
      if (cap) {
        return {
          type: "br",
          raw: cap[0]
        };
      }
    }
    del(src) {
      const cap = this.rules.inline.del.exec(src);
      if (cap) {
        return {
          type: "del",
          raw: cap[0],
          text: cap[2],
          tokens: this.lexer.inlineTokens(cap[2])
        };
      }
    }
    autolink(src) {
      const cap = this.rules.inline.autolink.exec(src);
      if (cap) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[1];
          href = "mailto:" + text;
        } else {
          text = cap[1];
          href = text;
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    url(src) {
      let cap;
      if (cap = this.rules.inline.url.exec(src)) {
        let text, href;
        if (cap[2] === "@") {
          text = cap[0];
          href = "mailto:" + text;
        } else {
          let prevCapZero;
          do {
            prevCapZero = cap[0];
            cap[0] = this.rules.inline._backpedal.exec(cap[0])?.[0] ?? "";
          } while (prevCapZero !== cap[0]);
          text = cap[0];
          if (cap[1] === "www.") {
            href = "http://" + cap[0];
          } else {
            href = cap[0];
          }
        }
        return {
          type: "link",
          raw: cap[0],
          text,
          href,
          tokens: [
            {
              type: "text",
              raw: text,
              text
            }
          ]
        };
      }
    }
    inlineText(src) {
      const cap = this.rules.inline.text.exec(src);
      if (cap) {
        const escaped = this.lexer.state.inRawBlock;
        return {
          type: "text",
          raw: cap[0],
          text: cap[0],
          escaped
        };
      }
    }
  };

  // src/Lexer.ts
  var _Lexer = class __Lexer {
    tokens;
    options;
    state;
    tokenizer;
    inlineQueue;
    constructor(options2) {
      this.tokens = [];
      this.tokens.links = /* @__PURE__ */ Object.create(null);
      this.options = options2 || _defaults;
      this.options.tokenizer = this.options.tokenizer || new _Tokenizer();
      this.tokenizer = this.options.tokenizer;
      this.tokenizer.options = this.options;
      this.tokenizer.lexer = this;
      this.inlineQueue = [];
      this.state = {
        inLink: false,
        inRawBlock: false,
        top: true
      };
      const rules = {
        other,
        block: block.normal,
        inline: inline.normal
      };
      if (this.options.pedantic) {
        rules.block = block.pedantic;
        rules.inline = inline.pedantic;
      } else if (this.options.gfm) {
        rules.block = block.gfm;
        if (this.options.breaks) {
          rules.inline = inline.breaks;
        } else {
          rules.inline = inline.gfm;
        }
      }
      this.tokenizer.rules = rules;
    }
    /**
     * Expose Rules
     */
    static get rules() {
      return {
        block,
        inline
      };
    }
    /**
     * Static Lex Method
     */
    static lex(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.lex(src);
    }
    /**
     * Static Lex Inline Method
     */
    static lexInline(src, options2) {
      const lexer2 = new __Lexer(options2);
      return lexer2.inlineTokens(src);
    }
    /**
     * Preprocessing
     */
    lex(src) {
      src = src.replace(other.carriageReturn, "\n");
      this.blockTokens(src, this.tokens);
      for (let i = 0; i < this.inlineQueue.length; i++) {
        const next = this.inlineQueue[i];
        this.inlineTokens(next.src, next.tokens);
      }
      this.inlineQueue = [];
      return this.tokens;
    }
    blockTokens(src, tokens = [], lastParagraphClipped = false) {
      if (this.options.pedantic) {
        src = src.replace(other.tabCharGlobal, "    ").replace(other.spaceLine, "");
      }
      while (src) {
        let token;
        if (this.options.extensions?.block?.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.space(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.raw.length === 1 && lastToken !== void 0) {
            lastToken.raw += "\n";
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.code(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.fences(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.heading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.hr(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.blockquote(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.list(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.html(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.def(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "paragraph" || lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.raw;
            this.inlineQueue.at(-1).src = lastToken.text;
          } else if (!this.tokens.links[token.tag]) {
            this.tokens.links[token.tag] = {
              href: token.href,
              title: token.title
            };
          }
          continue;
        }
        if (token = this.tokenizer.table(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.lheading(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if (this.options.extensions?.startBlock) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startBlock.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (this.state.top && (token = this.tokenizer.paragraph(cutSrc))) {
          const lastToken = tokens.at(-1);
          if (lastParagraphClipped && lastToken?.type === "paragraph") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          lastParagraphClipped = cutSrc.length !== src.length;
          src = src.substring(token.raw.length);
          continue;
        }
        if (token = this.tokenizer.text(src)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "text") {
            lastToken.raw += "\n" + token.raw;
            lastToken.text += "\n" + token.text;
            this.inlineQueue.pop();
            this.inlineQueue.at(-1).src = lastToken.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      this.state.top = true;
      return tokens;
    }
    inline(src, tokens = []) {
      this.inlineQueue.push({ src, tokens });
      return tokens;
    }
    /**
     * Lexing/Compiling
     */
    inlineTokens(src, tokens = []) {
      let maskedSrc = src;
      let match = null;
      if (this.tokens.links) {
        const links = Object.keys(this.tokens.links);
        if (links.length > 0) {
          while ((match = this.tokenizer.rules.inline.reflinkSearch.exec(maskedSrc)) != null) {
            if (links.includes(match[0].slice(match[0].lastIndexOf("[") + 1, -1))) {
              maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex);
            }
          }
        }
      }
      while ((match = this.tokenizer.rules.inline.anyPunctuation.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "++" + maskedSrc.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);
      }
      while ((match = this.tokenizer.rules.inline.blockSkip.exec(maskedSrc)) != null) {
        maskedSrc = maskedSrc.slice(0, match.index) + "[" + "a".repeat(match[0].length - 2) + "]" + maskedSrc.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);
      }
      let keepPrevChar = false;
      let prevChar = "";
      while (src) {
        if (!keepPrevChar) {
          prevChar = "";
        }
        keepPrevChar = false;
        let token;
        if (this.options.extensions?.inline?.some((extTokenizer) => {
          if (token = extTokenizer.call({ lexer: this }, src, tokens)) {
            src = src.substring(token.raw.length);
            tokens.push(token);
            return true;
          }
          return false;
        })) {
          continue;
        }
        if (token = this.tokenizer.escape(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.tag(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.link(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.reflink(src, this.tokens.links)) {
          src = src.substring(token.raw.length);
          const lastToken = tokens.at(-1);
          if (token.type === "text" && lastToken?.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (token = this.tokenizer.emStrong(src, maskedSrc, prevChar)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.codespan(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.br(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.del(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (token = this.tokenizer.autolink(src)) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        if (!this.state.inLink && (token = this.tokenizer.url(src))) {
          src = src.substring(token.raw.length);
          tokens.push(token);
          continue;
        }
        let cutSrc = src;
        if (this.options.extensions?.startInline) {
          let startIndex = Infinity;
          const tempSrc = src.slice(1);
          let tempStart;
          this.options.extensions.startInline.forEach((getStartIndex) => {
            tempStart = getStartIndex.call({ lexer: this }, tempSrc);
            if (typeof tempStart === "number" && tempStart >= 0) {
              startIndex = Math.min(startIndex, tempStart);
            }
          });
          if (startIndex < Infinity && startIndex >= 0) {
            cutSrc = src.substring(0, startIndex + 1);
          }
        }
        if (token = this.tokenizer.inlineText(cutSrc)) {
          src = src.substring(token.raw.length);
          if (token.raw.slice(-1) !== "_") {
            prevChar = token.raw.slice(-1);
          }
          keepPrevChar = true;
          const lastToken = tokens.at(-1);
          if (lastToken?.type === "text") {
            lastToken.raw += token.raw;
            lastToken.text += token.text;
          } else {
            tokens.push(token);
          }
          continue;
        }
        if (src) {
          const errMsg = "Infinite loop on byte: " + src.charCodeAt(0);
          if (this.options.silent) {
            console.error(errMsg);
            break;
          } else {
            throw new Error(errMsg);
          }
        }
      }
      return tokens;
    }
  };

  // src/Renderer.ts
  var _Renderer = class {
    options;
    parser;
    // set by the parser
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    space(token) {
      return "";
    }
    code({ text, lang, escaped }) {
      const langString = (lang || "").match(other.notSpaceStart)?.[0];
      const code = text.replace(other.endingNewline, "") + "\n";
      if (!langString) {
        return "<pre><code>" + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
      }
      return '<pre><code class="language-' + escape2(langString) + '">' + (escaped ? code : escape2(code, true)) + "</code></pre>\n";
    }
    blockquote({ tokens }) {
      const body = this.parser.parse(tokens);
      return `<blockquote>
${body}</blockquote>
`;
    }
    html({ text }) {
      return text;
    }
    heading({ tokens, depth }) {
      return `<h${depth}>${this.parser.parseInline(tokens)}</h${depth}>
`;
    }
    hr(token) {
      return "<hr>\n";
    }
    list(token) {
      const ordered = token.ordered;
      const start = token.start;
      let body = "";
      for (let j = 0; j < token.items.length; j++) {
        const item = token.items[j];
        body += this.listitem(item);
      }
      const type = ordered ? "ol" : "ul";
      const startAttr = ordered && start !== 1 ? ' start="' + start + '"' : "";
      return "<" + type + startAttr + ">\n" + body + "</" + type + ">\n";
    }
    listitem(item) {
      let itemBody = "";
      if (item.task) {
        const checkbox = this.checkbox({ checked: !!item.checked });
        if (item.loose) {
          if (item.tokens[0]?.type === "paragraph") {
            item.tokens[0].text = checkbox + " " + item.tokens[0].text;
            if (item.tokens[0].tokens && item.tokens[0].tokens.length > 0 && item.tokens[0].tokens[0].type === "text") {
              item.tokens[0].tokens[0].text = checkbox + " " + escape2(item.tokens[0].tokens[0].text);
              item.tokens[0].tokens[0].escaped = true;
            }
          } else {
            item.tokens.unshift({
              type: "text",
              raw: checkbox + " ",
              text: checkbox + " ",
              escaped: true
            });
          }
        } else {
          itemBody += checkbox + " ";
        }
      }
      itemBody += this.parser.parse(item.tokens, !!item.loose);
      return `<li>${itemBody}</li>
`;
    }
    checkbox({ checked }) {
      return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox">';
    }
    paragraph({ tokens }) {
      return `<p>${this.parser.parseInline(tokens)}</p>
`;
    }
    table(token) {
      let header = "";
      let cell = "";
      for (let j = 0; j < token.header.length; j++) {
        cell += this.tablecell(token.header[j]);
      }
      header += this.tablerow({ text: cell });
      let body = "";
      for (let j = 0; j < token.rows.length; j++) {
        const row = token.rows[j];
        cell = "";
        for (let k = 0; k < row.length; k++) {
          cell += this.tablecell(row[k]);
        }
        body += this.tablerow({ text: cell });
      }
      if (body) body = `<tbody>${body}</tbody>`;
      return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
    }
    tablerow({ text }) {
      return `<tr>
${text}</tr>
`;
    }
    tablecell(token) {
      const content = this.parser.parseInline(token.tokens);
      const type = token.header ? "th" : "td";
      const tag2 = token.align ? `<${type} align="${token.align}">` : `<${type}>`;
      return tag2 + content + `</${type}>
`;
    }
    /**
     * span level renderer
     */
    strong({ tokens }) {
      return `<strong>${this.parser.parseInline(tokens)}</strong>`;
    }
    em({ tokens }) {
      return `<em>${this.parser.parseInline(tokens)}</em>`;
    }
    codespan({ text }) {
      return `<code>${escape2(text, true)}</code>`;
    }
    br(token) {
      return "<br>";
    }
    del({ tokens }) {
      return `<del>${this.parser.parseInline(tokens)}</del>`;
    }
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return text;
      }
      href = cleanHref;
      let out = '<a href="' + href + '"';
      if (title) {
        out += ' title="' + escape2(title) + '"';
      }
      out += ">" + text + "</a>";
      return out;
    }
    image({ href, title, text, tokens }) {
      if (tokens) {
        text = this.parser.parseInline(tokens, this.parser.textRenderer);
      }
      const cleanHref = cleanUrl(href);
      if (cleanHref === null) {
        return escape2(text);
      }
      href = cleanHref;
      let out = `<img src="${href}" alt="${text}"`;
      if (title) {
        out += ` title="${escape2(title)}"`;
      }
      out += ">";
      return out;
    }
    text(token) {
      return "tokens" in token && token.tokens ? this.parser.parseInline(token.tokens) : "escaped" in token && token.escaped ? token.text : escape2(token.text);
    }
  };

  // src/TextRenderer.ts
  var _TextRenderer = class {
    // no need for block level renderers
    strong({ text }) {
      return text;
    }
    em({ text }) {
      return text;
    }
    codespan({ text }) {
      return text;
    }
    del({ text }) {
      return text;
    }
    html({ text }) {
      return text;
    }
    text({ text }) {
      return text;
    }
    link({ text }) {
      return "" + text;
    }
    image({ text }) {
      return "" + text;
    }
    br() {
      return "";
    }
  };

  // src/Parser.ts
  var _Parser = class __Parser {
    options;
    renderer;
    textRenderer;
    constructor(options2) {
      this.options = options2 || _defaults;
      this.options.renderer = this.options.renderer || new _Renderer();
      this.renderer = this.options.renderer;
      this.renderer.options = this.options;
      this.renderer.parser = this;
      this.textRenderer = new _TextRenderer();
    }
    /**
     * Static Parse Method
     */
    static parse(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parse(tokens);
    }
    /**
     * Static Parse Inline Method
     */
    static parseInline(tokens, options2) {
      const parser2 = new __Parser(options2);
      return parser2.parseInline(tokens);
    }
    /**
     * Parse Loop
     */
    parse(tokens, top = true) {
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if (this.options.extensions?.renderers?.[anyToken.type]) {
          const genericToken = anyToken;
          const ret = this.options.extensions.renderers[genericToken.type].call({ parser: this }, genericToken);
          if (ret !== false || !["space", "hr", "heading", "code", "table", "blockquote", "list", "html", "paragraph", "text"].includes(genericToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "space": {
            out += this.renderer.space(token);
            continue;
          }
          case "hr": {
            out += this.renderer.hr(token);
            continue;
          }
          case "heading": {
            out += this.renderer.heading(token);
            continue;
          }
          case "code": {
            out += this.renderer.code(token);
            continue;
          }
          case "table": {
            out += this.renderer.table(token);
            continue;
          }
          case "blockquote": {
            out += this.renderer.blockquote(token);
            continue;
          }
          case "list": {
            out += this.renderer.list(token);
            continue;
          }
          case "html": {
            out += this.renderer.html(token);
            continue;
          }
          case "paragraph": {
            out += this.renderer.paragraph(token);
            continue;
          }
          case "text": {
            let textToken = token;
            let body = this.renderer.text(textToken);
            while (i + 1 < tokens.length && tokens[i + 1].type === "text") {
              textToken = tokens[++i];
              body += "\n" + this.renderer.text(textToken);
            }
            if (top) {
              out += this.renderer.paragraph({
                type: "paragraph",
                raw: body,
                text: body,
                tokens: [{ type: "text", raw: body, text: body, escaped: true }]
              });
            } else {
              out += body;
            }
            continue;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
    /**
     * Parse Inline Tokens
     */
    parseInline(tokens, renderer = this.renderer) {
      let out = "";
      for (let i = 0; i < tokens.length; i++) {
        const anyToken = tokens[i];
        if (this.options.extensions?.renderers?.[anyToken.type]) {
          const ret = this.options.extensions.renderers[anyToken.type].call({ parser: this }, anyToken);
          if (ret !== false || !["escape", "html", "link", "image", "strong", "em", "codespan", "br", "del", "text"].includes(anyToken.type)) {
            out += ret || "";
            continue;
          }
        }
        const token = anyToken;
        switch (token.type) {
          case "escape": {
            out += renderer.text(token);
            break;
          }
          case "html": {
            out += renderer.html(token);
            break;
          }
          case "link": {
            out += renderer.link(token);
            break;
          }
          case "image": {
            out += renderer.image(token);
            break;
          }
          case "strong": {
            out += renderer.strong(token);
            break;
          }
          case "em": {
            out += renderer.em(token);
            break;
          }
          case "codespan": {
            out += renderer.codespan(token);
            break;
          }
          case "br": {
            out += renderer.br(token);
            break;
          }
          case "del": {
            out += renderer.del(token);
            break;
          }
          case "text": {
            out += renderer.text(token);
            break;
          }
          default: {
            const errMsg = 'Token with "' + token.type + '" type was not found.';
            if (this.options.silent) {
              console.error(errMsg);
              return "";
            } else {
              throw new Error(errMsg);
            }
          }
        }
      }
      return out;
    }
  };

  // src/Hooks.ts
  var _Hooks = class {
    options;
    block;
    constructor(options2) {
      this.options = options2 || _defaults;
    }
    static passThroughHooks = /* @__PURE__ */ new Set([
      "preprocess",
      "postprocess",
      "processAllTokens"
    ]);
    /**
     * Process markdown before marked
     */
    preprocess(markdown) {
      return markdown;
    }
    /**
     * Process HTML after marked is finished
     */
    postprocess(html2) {
      return html2;
    }
    /**
     * Process all tokens before walk tokens
     */
    processAllTokens(tokens) {
      return tokens;
    }
    /**
     * Provide function to tokenize markdown
     */
    provideLexer() {
      return this.block ? _Lexer.lex : _Lexer.lexInline;
    }
    /**
     * Provide function to parse tokens
     */
    provideParser() {
      return this.block ? _Parser.parse : _Parser.parseInline;
    }
  };

  // src/Instance.ts
  var Marked = class {
    defaults = _getDefaults();
    options = this.setOptions;
    parse = this.parseMarkdown(true);
    parseInline = this.parseMarkdown(false);
    Parser = _Parser;
    Renderer = _Renderer;
    TextRenderer = _TextRenderer;
    Lexer = _Lexer;
    Tokenizer = _Tokenizer;
    Hooks = _Hooks;
    constructor(...args) {
      this.use(...args);
    }
    /**
     * Run callback for every token
     */
    walkTokens(tokens, callback) {
      let values = [];
      for (const token of tokens) {
        values = values.concat(callback.call(this, token));
        switch (token.type) {
          case "table": {
            const tableToken = token;
            for (const cell of tableToken.header) {
              values = values.concat(this.walkTokens(cell.tokens, callback));
            }
            for (const row of tableToken.rows) {
              for (const cell of row) {
                values = values.concat(this.walkTokens(cell.tokens, callback));
              }
            }
            break;
          }
          case "list": {
            const listToken = token;
            values = values.concat(this.walkTokens(listToken.items, callback));
            break;
          }
          default: {
            const genericToken = token;
            if (this.defaults.extensions?.childTokens?.[genericToken.type]) {
              this.defaults.extensions.childTokens[genericToken.type].forEach((childTokens) => {
                const tokens2 = genericToken[childTokens].flat(Infinity);
                values = values.concat(this.walkTokens(tokens2, callback));
              });
            } else if (genericToken.tokens) {
              values = values.concat(this.walkTokens(genericToken.tokens, callback));
            }
          }
        }
      }
      return values;
    }
    use(...args) {
      const extensions = this.defaults.extensions || { renderers: {}, childTokens: {} };
      args.forEach((pack) => {
        const opts = { ...pack };
        opts.async = this.defaults.async || opts.async || false;
        if (pack.extensions) {
          pack.extensions.forEach((ext) => {
            if (!ext.name) {
              throw new Error("extension name required");
            }
            if ("renderer" in ext) {
              const prevRenderer = extensions.renderers[ext.name];
              if (prevRenderer) {
                extensions.renderers[ext.name] = function(...args2) {
                  let ret = ext.renderer.apply(this, args2);
                  if (ret === false) {
                    ret = prevRenderer.apply(this, args2);
                  }
                  return ret;
                };
              } else {
                extensions.renderers[ext.name] = ext.renderer;
              }
            }
            if ("tokenizer" in ext) {
              if (!ext.level || ext.level !== "block" && ext.level !== "inline") {
                throw new Error("extension level must be 'block' or 'inline'");
              }
              const extLevel = extensions[ext.level];
              if (extLevel) {
                extLevel.unshift(ext.tokenizer);
              } else {
                extensions[ext.level] = [ext.tokenizer];
              }
              if (ext.start) {
                if (ext.level === "block") {
                  if (extensions.startBlock) {
                    extensions.startBlock.push(ext.start);
                  } else {
                    extensions.startBlock = [ext.start];
                  }
                } else if (ext.level === "inline") {
                  if (extensions.startInline) {
                    extensions.startInline.push(ext.start);
                  } else {
                    extensions.startInline = [ext.start];
                  }
                }
              }
            }
            if ("childTokens" in ext && ext.childTokens) {
              extensions.childTokens[ext.name] = ext.childTokens;
            }
          });
          opts.extensions = extensions;
        }
        if (pack.renderer) {
          const renderer = this.defaults.renderer || new _Renderer(this.defaults);
          for (const prop in pack.renderer) {
            if (!(prop in renderer)) {
              throw new Error(`renderer '${prop}' does not exist`);
            }
            if (["options", "parser"].includes(prop)) {
              continue;
            }
            const rendererProp = prop;
            const rendererFunc = pack.renderer[rendererProp];
            const prevRenderer = renderer[rendererProp];
            renderer[rendererProp] = (...args2) => {
              let ret = rendererFunc.apply(renderer, args2);
              if (ret === false) {
                ret = prevRenderer.apply(renderer, args2);
              }
              return ret || "";
            };
          }
          opts.renderer = renderer;
        }
        if (pack.tokenizer) {
          const tokenizer = this.defaults.tokenizer || new _Tokenizer(this.defaults);
          for (const prop in pack.tokenizer) {
            if (!(prop in tokenizer)) {
              throw new Error(`tokenizer '${prop}' does not exist`);
            }
            if (["options", "rules", "lexer"].includes(prop)) {
              continue;
            }
            const tokenizerProp = prop;
            const tokenizerFunc = pack.tokenizer[tokenizerProp];
            const prevTokenizer = tokenizer[tokenizerProp];
            tokenizer[tokenizerProp] = (...args2) => {
              let ret = tokenizerFunc.apply(tokenizer, args2);
              if (ret === false) {
                ret = prevTokenizer.apply(tokenizer, args2);
              }
              return ret;
            };
          }
          opts.tokenizer = tokenizer;
        }
        if (pack.hooks) {
          const hooks = this.defaults.hooks || new _Hooks();
          for (const prop in pack.hooks) {
            if (!(prop in hooks)) {
              throw new Error(`hook '${prop}' does not exist`);
            }
            if (["options", "block"].includes(prop)) {
              continue;
            }
            const hooksProp = prop;
            const hooksFunc = pack.hooks[hooksProp];
            const prevHook = hooks[hooksProp];
            if (_Hooks.passThroughHooks.has(prop)) {
              hooks[hooksProp] = (arg) => {
                if (this.defaults.async) {
                  return Promise.resolve(hooksFunc.call(hooks, arg)).then((ret2) => {
                    return prevHook.call(hooks, ret2);
                  });
                }
                const ret = hooksFunc.call(hooks, arg);
                return prevHook.call(hooks, ret);
              };
            } else {
              hooks[hooksProp] = (...args2) => {
                let ret = hooksFunc.apply(hooks, args2);
                if (ret === false) {
                  ret = prevHook.apply(hooks, args2);
                }
                return ret;
              };
            }
          }
          opts.hooks = hooks;
        }
        if (pack.walkTokens) {
          const walkTokens2 = this.defaults.walkTokens;
          const packWalktokens = pack.walkTokens;
          opts.walkTokens = function(token) {
            let values = [];
            values.push(packWalktokens.call(this, token));
            if (walkTokens2) {
              values = values.concat(walkTokens2.call(this, token));
            }
            return values;
          };
        }
        this.defaults = { ...this.defaults, ...opts };
      });
      return this;
    }
    setOptions(opt) {
      this.defaults = { ...this.defaults, ...opt };
      return this;
    }
    lexer(src, options2) {
      return _Lexer.lex(src, options2 ?? this.defaults);
    }
    parser(tokens, options2) {
      return _Parser.parse(tokens, options2 ?? this.defaults);
    }
    parseMarkdown(blockType) {
      const parse2 = (src, options2) => {
        const origOpt = { ...options2 };
        const opt = { ...this.defaults, ...origOpt };
        const throwError = this.onError(!!opt.silent, !!opt.async);
        if (this.defaults.async === true && origOpt.async === false) {
          return throwError(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));
        }
        if (typeof src === "undefined" || src === null) {
          return throwError(new Error("marked(): input parameter is undefined or null"));
        }
        if (typeof src !== "string") {
          return throwError(new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src) + ", string expected"));
        }
        if (opt.hooks) {
          opt.hooks.options = opt;
          opt.hooks.block = blockType;
        }
        const lexer2 = opt.hooks ? opt.hooks.provideLexer() : blockType ? _Lexer.lex : _Lexer.lexInline;
        const parser2 = opt.hooks ? opt.hooks.provideParser() : blockType ? _Parser.parse : _Parser.parseInline;
        if (opt.async) {
          return Promise.resolve(opt.hooks ? opt.hooks.preprocess(src) : src).then((src2) => lexer2(src2, opt)).then((tokens) => opt.hooks ? opt.hooks.processAllTokens(tokens) : tokens).then((tokens) => opt.walkTokens ? Promise.all(this.walkTokens(tokens, opt.walkTokens)).then(() => tokens) : tokens).then((tokens) => parser2(tokens, opt)).then((html2) => opt.hooks ? opt.hooks.postprocess(html2) : html2).catch(throwError);
        }
        try {
          if (opt.hooks) {
            src = opt.hooks.preprocess(src);
          }
          let tokens = lexer2(src, opt);
          if (opt.hooks) {
            tokens = opt.hooks.processAllTokens(tokens);
          }
          if (opt.walkTokens) {
            this.walkTokens(tokens, opt.walkTokens);
          }
          let html2 = parser2(tokens, opt);
          if (opt.hooks) {
            html2 = opt.hooks.postprocess(html2);
          }
          return html2;
        } catch (e) {
          return throwError(e);
        }
      };
      return parse2;
    }
    onError(silent, async) {
      return (e) => {
        e.message += "\nPlease report this to https://github.com/markedjs/marked.";
        if (silent) {
          const msg = "<p>An error occurred:</p><pre>" + escape2(e.message + "", true) + "</pre>";
          if (async) {
            return Promise.resolve(msg);
          }
          return msg;
        }
        if (async) {
          return Promise.reject(e);
        }
        throw e;
      };
    }
  };

  // src/marked.ts
  var markedInstance = new Marked();
  function marked(src, opt) {
    return markedInstance.parse(src, opt);
  }
  marked.options = marked.setOptions = function(options2) {
    markedInstance.setOptions(options2);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.getDefaults = _getDefaults;
  marked.defaults = _defaults;
  marked.use = function(...args) {
    markedInstance.use(...args);
    marked.defaults = markedInstance.defaults;
    changeDefaults(marked.defaults);
    return marked;
  };
  marked.walkTokens = function(tokens, callback) {
    return markedInstance.walkTokens(tokens, callback);
  };
  marked.parseInline = markedInstance.parseInline;
  marked.Parser = _Parser;
  marked.parser = _Parser.parse;
  marked.Renderer = _Renderer;
  marked.TextRenderer = _TextRenderer;
  marked.Lexer = _Lexer;
  marked.lexer = _Lexer.lex;
  marked.Tokenizer = _Tokenizer;
  marked.Hooks = _Hooks;
  marked.parse = marked;
  marked.options;
  marked.setOptions;
  marked.use;
  marked.walkTokens;
  marked.parseInline;
  _Parser.parse;
  _Lexer.lex;

  /**
   * Markdown Parser class
   */
  class MarkdownParser {
    constructor(config) {
      this.config = config;
      this.setupMarked();
    }

    /**
     * Setup marked configuration
     */
    setupMarked() {
      marked.setOptions({
        breaks: true,
        gfm: true,
        headerIds: false,
        mangle: false
      });
    }

    /**
     * Parse Markdown slides
     * @param {HTMLElement} container - Container element
     * @returns {Promise<Array>} - Array of slide data
     */
    async parse(container) {
      let markdown = '';

      // Get markdown content
      if (this.config.markdownUrl) {
        // Load from external file
        markdown = await this.loadMarkdown(this.config.markdownUrl);
      } else {
        // Get from container
        markdown = container.textContent || container.innerText || '';
      }

      // Split into slides
      const slideTexts = this.splitSlides(markdown);

      // Parse each slide
      const slides = slideTexts.map((slideText, index) => this.parseSlide(slideText, index));
      return slides;
    }

    /**
     * Load markdown from URL
     * @param {string} url - Markdown file URL
     * @returns {Promise<string>} - Markdown content
     */
    async loadMarkdown(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to load markdown: ".concat(response.statusText));
        }
        return await response.text();
      } catch (error) {
        console.error('Error loading markdown:', error);
        throw error;
      }
    }

    /**
     * Split markdown into individual slides
     * @param {string} markdown - Full markdown content
     * @returns {Array<string>} - Array of slide markdown
     */
    splitSlides(markdown) {
      const normalized = markdown.replace(/\r\n/g, '\n');
      const lines = normalized.split('\n');
      const slides = [];
      let currentSlide = [];
      let inCodeBlock = false;
      lines.forEach(line => {
        const trimmed = line.trim();

        // Toggle code block state
        if (trimmed.startsWith('```')) {
          inCodeBlock = !inCodeBlock;
        }

        // Slide separator: --- on a line by itself, outside code blocks
        const isSeparator = !inCodeBlock && /^---$/.test(trimmed);
        if (isSeparator) {
          if (currentSlide.length > 0) {
            slides.push(currentSlide.join('\n'));
            currentSlide = [];
          }
        } else {
          currentSlide.push(line);
        }
      });
      if (currentSlide.length > 0) {
        slides.push(currentSlide.join('\n'));
      }
      return slides.filter(slide => slide.trim().length > 0);
    }

    /**
     * Parse a single slide
     * @param {string} slideText - Slide markdown
     * @param {number} index - Slide index
     * @returns {Object} - Slide data
     */
    parseSlide(slideText, index) {
      const slideData = {
        index,
        layout: 'default',
        content: '',
        attributes: {}
      };

      // Parse metadata from HTML comments (but keep original text for column parsing)
      const frontmatter = this.extractMetadata(slideText);

      // Apply frontmatter data
      if (frontmatter.layout) {
        slideData.layout = frontmatter.layout;
      }
      if (frontmatter.slide) {
        // Support both 'slide:' and 'layout:' for backwards compatibility
        slideData.layout = frontmatter.slide;
      }
      if (frontmatter.background) {
        slideData.background = frontmatter.background;
      }
      if (frontmatter.overlay) {
        slideData.overlay = frontmatter.overlay;
      }

      // Copy all frontmatter to attributes
      slideData.attributes = _objectSpread2({}, frontmatter);

      // Parse content based on layout
      // For column layouts, parse BEFORE removing comments
      if (slideData.layout === 'two-cols') {
        this.parseTwoColumns(slideText, slideData);
      } else if (slideData.layout === 'three-cols') {
        this.parseThreeColumns(slideText, slideData);
      } else {
        // For other layouts, remove metadata comments and parse
        const content = this.cleanMetadata(slideText);
        if (slideData.layout === 'quote') {
          this.parseQuote(content, slideData);
        } else if (slideData.layout === 'image-right' || slideData.layout === 'image-left') {
          this.parseImageLayout(content, slideData);
        } else {
          // Default: convert markdown to HTML
          slideData.content = marked.parse(content);
        }
      }
      return slideData;
    }

    /**
     * Extract metadata from HTML comments
     * @param {string} slideText - Slide text with HTML comments
     * @returns {Object} - Metadata object
     */
    extractMetadata(slideText) {
      const metadata = {};

      // Extract all HTML comment metadata
      // Pattern: <!-- key: value -->
      const metadataRegex = /<!--\s*(\w+):\s*(.+?)\s*-->/g;
      let match;

      // eslint-disable-next-line no-cond-assign
      while ((match = metadataRegex.exec(slideText)) !== null) {
        const key = match[1];
        let value = match[2].trim();

        // Remove quotes if present
        if (value.startsWith('"') && value.endsWith('"') || value.startsWith("'") && value.endsWith("'")) {
          value = value.slice(1, -1);
        }
        metadata[key] = value;
      }
      return metadata;
    }

    /**
     * Remove metadata HTML comments from content
     * @param {string} slideText - Slide text with HTML comments
     * @returns {string} - Clean content
     */
    cleanMetadata(slideText) {
      // Remove metadata comments (<!-- key: value -->)
      return slideText.replace(/<!--\s*\w+:\s*.+?\s*-->/g, '').trim();
    }

    /**
     * Remove column marker comments from content
     * @param {string} text - Text with column markers
     * @returns {string} - Clean content
     */
    cleanColumnMarkers(text) {
      // Remove <!-- column --> markers
      return text.replace(/<!--\s*column\s*-->/gi, '').trim();
    }

    /**
     * Parse two-column content
     * @param {string} slideText - Slide content with HTML comments
     * @param {Object} slideData - Slide data object to modify
     */
    parseTwoColumns(slideText, slideData) {
      // First, remove metadata comments but keep column markers
      const contentWithMarkers = this.cleanMetadata(slideText);

      // Split by <!-- column --> marker
      const parts = contentWithMarkers.split(/<!--\s*column\s*-->/i);
      if (parts.length >= 2) {
        slideData.left = marked.parse(parts[0].trim() || '');
        slideData.right = marked.parse(parts[1].trim() || '');
      } else {
        // Fallback: if no marker, use all as left
        slideData.left = marked.parse(contentWithMarkers);
        slideData.right = '';
      }

      // Don't include the marker in content
      slideData.content = '';
    }

    /**
     * Parse three-column content
     * @param {string} slideText - Slide content with HTML comments
     * @param {Object} slideData - Slide data object to modify
     */
    parseThreeColumns(slideText, slideData) {
      // First, remove metadata comments but keep column markers
      const contentWithMarkers = this.cleanMetadata(slideText);

      // Split by <!-- column --> markers
      const parts = contentWithMarkers.split(/<!--\s*column\s*-->/i);

      // We expect 3 parts for three columns
      slideData.columns = [marked.parse((parts[0] || '').trim()), marked.parse((parts[1] || '').trim()), marked.parse((parts[2] || '').trim())];

      // Don't include the markers in content
      slideData.content = '';
    }

    /**
     * Parse quote content
     * @param {string} content - Slide content
     * @param {Object} slideData - Slide data object to modify
     */
    parseQuote(content, slideData) {
      // Look for quote and author pattern
      const lines = content.trim().split('\n');
      const quoteLines = [];
      let author = '';
      lines.forEach(line => {
        if (line.startsWith('—') || line.startsWith('--')) {
          author = line.replace(/^[—-]+\s*/, '').trim();
        } else if (line.trim()) {
          quoteLines.push(line);
        }
      });
      slideData.quote = quoteLines.join(' ').replace(/^["']|["']$/g, '');
      if (author) {
        slideData.author = author;
      }

      // Also set content as HTML
      slideData.content = marked.parse(content);
    }

    /**
     * Parse image layout content
     * @param {string} content - Slide content
     * @param {Object} slideData - Slide data object to modify
     */
    parseImageLayout(content, slideData) {
      // Look for image markdown pattern
      const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
      const match = content.match(imgRegex);
      if (match) {
        const [, imageAlt, image] = match;
        slideData.image = image;
        slideData.imageAlt = imageAlt;
        // Remove image from content
        const textContent = content.replace(imgRegex, '');
        slideData.content = marked.parse(textContent);
      } else {
        slideData.content = marked.parse(content);
      }
    }
  }

  /*! @license DOMPurify 3.4.6 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/3.4.6/LICENSE */

  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e,
        n,
        i,
        u,
        a = [],
        f = true,
        o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) ; else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0);
      } catch (r) {
        o = true, n = r;
      } finally {
        try {
          if (!f && null != t.return && (u = t.return(), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _slicedToArray(r, e) {
    return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest();
  }
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return _arrayLikeToArray(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
    }
  }

  const entries = Object.entries,
    setPrototypeOf = Object.setPrototypeOf,
    isFrozen = Object.isFrozen,
    getPrototypeOf = Object.getPrototypeOf,
    getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
  let freeze = Object.freeze,
    seal = Object.seal,
    create = Object.create; // eslint-disable-line import/no-mutable-exports
  let _ref = typeof Reflect !== 'undefined' && Reflect,
    apply = _ref.apply,
    construct = _ref.construct;
  if (!freeze) {
    freeze = function freeze(x) {
      return x;
    };
  }
  if (!seal) {
    seal = function seal(x) {
      return x;
    };
  }
  if (!apply) {
    apply = function apply(func, thisArg) {
      for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
        args[_key - 2] = arguments[_key];
      }
      return func.apply(thisArg, args);
    };
  }
  if (!construct) {
    construct = function construct(Func) {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }
      return new Func(...args);
    };
  }
  const arrayForEach = unapply(Array.prototype.forEach);
  const arrayLastIndexOf = unapply(Array.prototype.lastIndexOf);
  const arrayPop = unapply(Array.prototype.pop);
  const arrayPush = unapply(Array.prototype.push);
  const arraySplice = unapply(Array.prototype.splice);
  const arrayIsArray = Array.isArray;
  const stringToLowerCase = unapply(String.prototype.toLowerCase);
  const stringToString = unapply(String.prototype.toString);
  const stringMatch = unapply(String.prototype.match);
  const stringReplace = unapply(String.prototype.replace);
  const stringIndexOf = unapply(String.prototype.indexOf);
  const stringTrim = unapply(String.prototype.trim);
  const numberToString = unapply(Number.prototype.toString);
  const booleanToString = unapply(Boolean.prototype.toString);
  const bigintToString = typeof BigInt === 'undefined' ? null : unapply(BigInt.prototype.toString);
  const symbolToString = typeof Symbol === 'undefined' ? null : unapply(Symbol.prototype.toString);
  const objectHasOwnProperty = unapply(Object.prototype.hasOwnProperty);
  const objectToString = unapply(Object.prototype.toString);
  const regExpTest = unapply(RegExp.prototype.test);
  const typeErrorCreate = unconstruct(TypeError);
  /**
   * Creates a new function that calls the given function with a specified thisArg and arguments.
   *
   * @param func - The function to be wrapped and called.
   * @returns A new function that calls the given function with a specified thisArg and arguments.
   */
  function unapply(func) {
    return function (thisArg) {
      if (thisArg instanceof RegExp) {
        thisArg.lastIndex = 0;
      }
      for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
        args[_key3 - 1] = arguments[_key3];
      }
      return apply(func, thisArg, args);
    };
  }
  /**
   * Creates a new function that constructs an instance of the given constructor function with the provided arguments.
   *
   * @param func - The constructor function to be wrapped and called.
   * @returns A new function that constructs an instance of the given constructor function with the provided arguments.
   */
  function unconstruct(Func) {
    return function () {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return construct(Func, args);
    };
  }
  /**
   * Add properties to a lookup table
   *
   * @param set - The set to which elements will be added.
   * @param array - The array containing elements to be added to the set.
   * @param transformCaseFunc - An optional function to transform the case of each element before adding to the set.
   * @returns The modified set with added elements.
   */
  function addToSet(set, array) {
    let transformCaseFunc = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : stringToLowerCase;
    if (setPrototypeOf) {
      // Make 'in' and truthy checks like Boolean(set.constructor)
      // independent of any properties defined on Object.prototype.
      // Prevent prototype setters from intercepting set as a this value.
      setPrototypeOf(set, null);
    }
    if (!arrayIsArray(array)) {
      return set;
    }
    let l = array.length;
    while (l--) {
      let element = array[l];
      if (typeof element === 'string') {
        const lcElement = transformCaseFunc(element);
        if (lcElement !== element) {
          // Config presets (e.g. tags.js, attrs.js) are immutable.
          if (!isFrozen(array)) {
            array[l] = lcElement;
          }
          element = lcElement;
        }
      }
      set[element] = true;
    }
    return set;
  }
  /**
   * Clean up an array to harden against CSPP
   *
   * @param array - The array to be cleaned.
   * @returns The cleaned version of the array
   */
  function cleanArray(array) {
    for (let index = 0; index < array.length; index++) {
      const isPropertyExist = objectHasOwnProperty(array, index);
      if (!isPropertyExist) {
        array[index] = null;
      }
    }
    return array;
  }
  /**
   * Shallow clone an object
   *
   * @param object - The object to be cloned.
   * @returns A new object that copies the original.
   */
  function clone(object) {
    const newObject = create(null);
    for (const _ref2 of entries(object)) {
      var _ref3 = _slicedToArray(_ref2, 2);
      const property = _ref3[0];
      const value = _ref3[1];
      const isPropertyExist = objectHasOwnProperty(object, property);
      if (isPropertyExist) {
        if (arrayIsArray(value)) {
          newObject[property] = cleanArray(value);
        } else if (value && typeof value === 'object' && value.constructor === Object) {
          newObject[property] = clone(value);
        } else {
          newObject[property] = value;
        }
      }
    }
    return newObject;
  }
  /**
   * Convert non-node values into strings without depending on direct property access.
   *
   * @param value - The value to stringify.
   * @returns A string representation of the provided value.
   */
  function stringifyValue(value) {
    switch (typeof value) {
      case 'string':
        {
          return value;
        }
      case 'number':
        {
          return numberToString(value);
        }
      case 'boolean':
        {
          return booleanToString(value);
        }
      case 'bigint':
        {
          return bigintToString ? bigintToString(value) : '0';
        }
      case 'symbol':
        {
          return symbolToString ? symbolToString(value) : 'Symbol()';
        }
      case 'undefined':
        {
          return objectToString(value);
        }
      case 'function':
      case 'object':
        {
          if (value === null) {
            return objectToString(value);
          }
          const valueAsRecord = value;
          const valueToString = lookupGetter(valueAsRecord, 'toString');
          if (typeof valueToString === 'function') {
            const stringified = valueToString(valueAsRecord);
            return typeof stringified === 'string' ? stringified : objectToString(stringified);
          }
          return objectToString(value);
        }
      default:
        {
          return objectToString(value);
        }
    }
  }
  /**
   * This method automatically checks if the prop is function or getter and behaves accordingly.
   *
   * @param object - The object to look up the getter function in its prototype chain.
   * @param prop - The property name for which to find the getter function.
   * @returns The getter function found in the prototype chain or a fallback function.
   */
  function lookupGetter(object, prop) {
    while (object !== null) {
      const desc = getOwnPropertyDescriptor(object, prop);
      if (desc) {
        if (desc.get) {
          return unapply(desc.get);
        }
        if (typeof desc.value === 'function') {
          return unapply(desc.value);
        }
      }
      object = getPrototypeOf(object);
    }
    function fallbackValue() {
      return null;
    }
    return fallbackValue;
  }
  function isRegex(value) {
    try {
      regExpTest(value, '');
      return true;
    } catch (_unused) {
      return false;
    }
  }

  const html$1 = freeze(['a', 'abbr', 'acronym', 'address', 'area', 'article', 'aside', 'audio', 'b', 'bdi', 'bdo', 'big', 'blink', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'content', 'data', 'datalist', 'dd', 'decorator', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'element', 'em', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'head', 'header', 'hgroup', 'hr', 'html', 'i', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'main', 'map', 'mark', 'marquee', 'menu', 'menuitem', 'meter', 'nav', 'nobr', 'ol', 'optgroup', 'option', 'output', 'p', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'search', 'section', 'select', 'shadow', 'slot', 'small', 'source', 'spacer', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr']);
  const svg$1 = freeze(['svg', 'a', 'altglyph', 'altglyphdef', 'altglyphitem', 'animatecolor', 'animatemotion', 'animatetransform', 'circle', 'clippath', 'defs', 'desc', 'ellipse', 'enterkeyhint', 'exportparts', 'filter', 'font', 'g', 'glyph', 'glyphref', 'hkern', 'image', 'inputmode', 'line', 'lineargradient', 'marker', 'mask', 'metadata', 'mpath', 'part', 'path', 'pattern', 'polygon', 'polyline', 'radialgradient', 'rect', 'stop', 'style', 'switch', 'symbol', 'text', 'textpath', 'title', 'tref', 'tspan', 'view', 'vkern']);
  const svgFilters = freeze(['feBlend', 'feColorMatrix', 'feComponentTransfer', 'feComposite', 'feConvolveMatrix', 'feDiffuseLighting', 'feDisplacementMap', 'feDistantLight', 'feDropShadow', 'feFlood', 'feFuncA', 'feFuncB', 'feFuncG', 'feFuncR', 'feGaussianBlur', 'feImage', 'feMerge', 'feMergeNode', 'feMorphology', 'feOffset', 'fePointLight', 'feSpecularLighting', 'feSpotLight', 'feTile', 'feTurbulence']);
  // List of SVG elements that are disallowed by default.
  // We still need to know them so that we can do namespace
  // checks properly in case one wants to add them to
  // allow-list.
  const svgDisallowed = freeze(['animate', 'color-profile', 'cursor', 'discard', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'foreignobject', 'hatch', 'hatchpath', 'mesh', 'meshgradient', 'meshpatch', 'meshrow', 'missing-glyph', 'script', 'set', 'solidcolor', 'unknown', 'use']);
  const mathMl$1 = freeze(['math', 'menclose', 'merror', 'mfenced', 'mfrac', 'mglyph', 'mi', 'mlabeledtr', 'mmultiscripts', 'mn', 'mo', 'mover', 'mpadded', 'mphantom', 'mroot', 'mrow', 'ms', 'mspace', 'msqrt', 'mstyle', 'msub', 'msup', 'msubsup', 'mtable', 'mtd', 'mtext', 'mtr', 'munder', 'munderover', 'mprescripts']);
  // Similarly to SVG, we want to know all MathML elements,
  // even those that we disallow by default.
  const mathMlDisallowed = freeze(['maction', 'maligngroup', 'malignmark', 'mlongdiv', 'mscarries', 'mscarry', 'msgroup', 'mstack', 'msline', 'msrow', 'semantics', 'annotation', 'annotation-xml', 'mprescripts', 'none']);
  const text = freeze(['#text']);

  const html = freeze(['accept', 'action', 'align', 'alt', 'autocapitalize', 'autocomplete', 'autopictureinpicture', 'autoplay', 'background', 'bgcolor', 'border', 'capture', 'cellpadding', 'cellspacing', 'checked', 'cite', 'class', 'clear', 'color', 'cols', 'colspan', 'command', 'commandfor', 'controls', 'controlslist', 'coords', 'crossorigin', 'datetime', 'decoding', 'default', 'dir', 'disabled', 'disablepictureinpicture', 'disableremoteplayback', 'download', 'draggable', 'enctype', 'enterkeyhint', 'exportparts', 'face', 'for', 'headers', 'height', 'hidden', 'high', 'href', 'hreflang', 'id', 'inert', 'inputmode', 'integrity', 'ismap', 'kind', 'label', 'lang', 'list', 'loading', 'loop', 'low', 'max', 'maxlength', 'media', 'method', 'min', 'minlength', 'multiple', 'muted', 'name', 'nonce', 'noshade', 'novalidate', 'nowrap', 'open', 'optimum', 'part', 'pattern', 'placeholder', 'playsinline', 'popover', 'popovertarget', 'popovertargetaction', 'poster', 'preload', 'pubdate', 'radiogroup', 'readonly', 'rel', 'required', 'rev', 'reversed', 'role', 'rows', 'rowspan', 'spellcheck', 'scope', 'selected', 'shape', 'size', 'sizes', 'slot', 'span', 'srclang', 'start', 'src', 'srcset', 'step', 'style', 'summary', 'tabindex', 'title', 'translate', 'type', 'usemap', 'valign', 'value', 'width', 'wrap', 'xmlns']);
  const svg = freeze(['accent-height', 'accumulate', 'additive', 'alignment-baseline', 'amplitude', 'ascent', 'attributename', 'attributetype', 'azimuth', 'basefrequency', 'baseline-shift', 'begin', 'bias', 'by', 'class', 'clip', 'clippathunits', 'clip-path', 'clip-rule', 'color', 'color-interpolation', 'color-interpolation-filters', 'color-profile', 'color-rendering', 'cx', 'cy', 'd', 'dx', 'dy', 'diffuseconstant', 'direction', 'display', 'divisor', 'dur', 'edgemode', 'elevation', 'end', 'exponent', 'fill', 'fill-opacity', 'fill-rule', 'filter', 'filterunits', 'flood-color', 'flood-opacity', 'font-family', 'font-size', 'font-size-adjust', 'font-stretch', 'font-style', 'font-variant', 'font-weight', 'fx', 'fy', 'g1', 'g2', 'glyph-name', 'glyphref', 'gradientunits', 'gradienttransform', 'height', 'href', 'id', 'image-rendering', 'in', 'in2', 'intercept', 'k', 'k1', 'k2', 'k3', 'k4', 'kerning', 'keypoints', 'keysplines', 'keytimes', 'lang', 'lengthadjust', 'letter-spacing', 'kernelmatrix', 'kernelunitlength', 'lighting-color', 'local', 'marker-end', 'marker-mid', 'marker-start', 'markerheight', 'markerunits', 'markerwidth', 'maskcontentunits', 'maskunits', 'max', 'mask', 'mask-type', 'media', 'method', 'mode', 'min', 'name', 'numoctaves', 'offset', 'operator', 'opacity', 'order', 'orient', 'orientation', 'origin', 'overflow', 'paint-order', 'path', 'pathlength', 'patterncontentunits', 'patterntransform', 'patternunits', 'points', 'preservealpha', 'preserveaspectratio', 'primitiveunits', 'r', 'rx', 'ry', 'radius', 'refx', 'refy', 'repeatcount', 'repeatdur', 'restart', 'result', 'rotate', 'scale', 'seed', 'shape-rendering', 'slope', 'specularconstant', 'specularexponent', 'spreadmethod', 'startoffset', 'stddeviation', 'stitchtiles', 'stop-color', 'stop-opacity', 'stroke-dasharray', 'stroke-dashoffset', 'stroke-linecap', 'stroke-linejoin', 'stroke-miterlimit', 'stroke-opacity', 'stroke', 'stroke-width', 'style', 'surfacescale', 'systemlanguage', 'tabindex', 'tablevalues', 'targetx', 'targety', 'transform', 'transform-origin', 'text-anchor', 'text-decoration', 'text-rendering', 'textlength', 'type', 'u1', 'u2', 'unicode', 'values', 'viewbox', 'visibility', 'version', 'vert-adv-y', 'vert-origin-x', 'vert-origin-y', 'width', 'word-spacing', 'wrap', 'writing-mode', 'xchannelselector', 'ychannelselector', 'x', 'x1', 'x2', 'xmlns', 'y', 'y1', 'y2', 'z', 'zoomandpan']);
  const mathMl = freeze(['accent', 'accentunder', 'align', 'bevelled', 'close', 'columnalign', 'columnlines', 'columnspacing', 'columnspan', 'denomalign', 'depth', 'dir', 'display', 'displaystyle', 'encoding', 'fence', 'frame', 'height', 'href', 'id', 'largeop', 'length', 'linethickness', 'lquote', 'lspace', 'mathbackground', 'mathcolor', 'mathsize', 'mathvariant', 'maxsize', 'minsize', 'movablelimits', 'notation', 'numalign', 'open', 'rowalign', 'rowlines', 'rowspacing', 'rowspan', 'rspace', 'rquote', 'scriptlevel', 'scriptminsize', 'scriptsizemultiplier', 'selection', 'separator', 'separators', 'stretchy', 'subscriptshift', 'supscriptshift', 'symmetric', 'voffset', 'width', 'xmlns']);
  const xml = freeze(['xlink:href', 'xml:id', 'xlink:title', 'xml:space', 'xmlns:xlink']);

  const MUSTACHE_EXPR = seal(/{{[\w\W]*|^[\w\W]*}}/g);
  const ERB_EXPR = seal(/<%[\w\W]*|^[\w\W]*%>/g);
  const TMPLIT_EXPR = seal(/\${[\w\W]*/g);
  const DATA_ATTR = seal(/^data-[\-\w.\u00B7-\uFFFF]+$/); // eslint-disable-line no-useless-escape
  const ARIA_ATTR = seal(/^aria-[\-\w]+$/); // eslint-disable-line no-useless-escape
  const IS_ALLOWED_URI = seal(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i // eslint-disable-line no-useless-escape
  );
  const IS_SCRIPT_OR_DATA = seal(/^(?:\w+script|data):/i);
  const ATTR_WHITESPACE = seal(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g // eslint-disable-line no-control-regex
  );
  const DOCTYPE_NAME = seal(/^html$/i);
  const CUSTOM_ELEMENT = seal(/^[a-z][.\w]*(-[.\w]+)+$/i);

  /* eslint-disable @typescript-eslint/indent */
  // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType
  const NODE_TYPE = {
    element: 1,
    attribute: 2,
    text: 3,
    cdataSection: 4,
    entityReference: 5,
    // Deprecated
    entityNode: 6,
    // Deprecated
    progressingInstruction: 7,
    comment: 8,
    document: 9,
    documentType: 10,
    documentFragment: 11,
    notation: 12 // Deprecated
  };
  const getGlobal = function getGlobal() {
    return typeof window === 'undefined' ? null : window;
  };
  /**
   * Creates a no-op policy for internal use only.
   * Don't export this function outside this module!
   * @param trustedTypes The policy factory.
   * @param purifyHostElement The Script element used to load DOMPurify (to determine policy name suffix).
   * @return The policy created (or null, if Trusted Types
   * are not supported or creating the policy failed).
   */
  const _createTrustedTypesPolicy = function _createTrustedTypesPolicy(trustedTypes, purifyHostElement) {
    if (typeof trustedTypes !== 'object' || typeof trustedTypes.createPolicy !== 'function') {
      return null;
    }
    // Allow the callers to control the unique policy name
    // by adding a data-tt-policy-suffix to the script element with the DOMPurify.
    // Policy creation with duplicate names throws in Trusted Types.
    let suffix = null;
    const ATTR_NAME = 'data-tt-policy-suffix';
    if (purifyHostElement && purifyHostElement.hasAttribute(ATTR_NAME)) {
      suffix = purifyHostElement.getAttribute(ATTR_NAME);
    }
    const policyName = 'dompurify' + (suffix ? '#' + suffix : '');
    try {
      return trustedTypes.createPolicy(policyName, {
        createHTML(html) {
          return html;
        },
        createScriptURL(scriptUrl) {
          return scriptUrl;
        }
      });
    } catch (_) {
      // Policy creation failed (most likely another DOMPurify script has
      // already run). Skip creating the policy, as this will only cause errors
      // if TT are enforced.
      console.warn('TrustedTypes policy ' + policyName + ' could not be created.');
      return null;
    }
  };
  const _createHooksMap = function _createHooksMap() {
    return {
      afterSanitizeAttributes: [],
      afterSanitizeElements: [],
      afterSanitizeShadowDOM: [],
      beforeSanitizeAttributes: [],
      beforeSanitizeElements: [],
      beforeSanitizeShadowDOM: [],
      uponSanitizeAttribute: [],
      uponSanitizeElement: [],
      uponSanitizeShadowNode: []
    };
  };
  function createDOMPurify() {
    let window = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getGlobal();
    const DOMPurify = root => createDOMPurify(root);
    DOMPurify.version = '3.4.6';
    DOMPurify.removed = [];
    if (!window || !window.document || window.document.nodeType !== NODE_TYPE.document || !window.Element) {
      // Not running in a browser, provide a factory function
      // so that you can pass your own Window
      DOMPurify.isSupported = false;
      return DOMPurify;
    }
    let document = window.document;
    const originalDocument = document;
    const currentScript = originalDocument.currentScript;
    window.DocumentFragment;
      const HTMLTemplateElement = window.HTMLTemplateElement,
      Node = window.Node,
      Element = window.Element,
      NodeFilter = window.NodeFilter,
      _window$NamedNodeMap = window.NamedNodeMap;
      _window$NamedNodeMap === void 0 ? window.NamedNodeMap || window.MozNamedAttrMap : _window$NamedNodeMap;
      window.HTMLFormElement;
      const DOMParser = window.DOMParser,
      trustedTypes = window.trustedTypes;
    const ElementPrototype = Element.prototype;
    const cloneNode = lookupGetter(ElementPrototype, 'cloneNode');
    const remove = lookupGetter(ElementPrototype, 'remove');
    const getNextSibling = lookupGetter(ElementPrototype, 'nextSibling');
    const getChildNodes = lookupGetter(ElementPrototype, 'childNodes');
    const getParentNode = lookupGetter(ElementPrototype, 'parentNode');
    const getShadowRoot = lookupGetter(ElementPrototype, 'shadowRoot');
    const getAttributes = lookupGetter(ElementPrototype, 'attributes');
    const getNodeType = Node && Node.prototype ? lookupGetter(Node.prototype, 'nodeType') : null;
    const getNodeName = Node && Node.prototype ? lookupGetter(Node.prototype, 'nodeName') : null;
    // As per issue #47, the web-components registry is inherited by a
    // new document created via createHTMLDocument. As per the spec
    // (http://w3c.github.io/webcomponents/spec/custom/#creating-and-passing-registries)
    // a new empty registry is used when creating a template contents owner
    // document, so we use that as our parent document to ensure nothing
    // is inherited.
    if (typeof HTMLTemplateElement === 'function') {
      const template = document.createElement('template');
      if (template.content && template.content.ownerDocument) {
        document = template.content.ownerDocument;
      }
    }
    let trustedTypesPolicy;
    let emptyHTML = '';
    const _document = document,
      implementation = _document.implementation,
      createNodeIterator = _document.createNodeIterator,
      createDocumentFragment = _document.createDocumentFragment,
      getElementsByTagName = _document.getElementsByTagName;
    const importNode = originalDocument.importNode;
    let hooks = _createHooksMap();
    /**
     * Expose whether this browser supports running the full DOMPurify.
     */
    DOMPurify.isSupported = typeof entries === 'function' && typeof getParentNode === 'function' && implementation && implementation.createHTMLDocument !== undefined;
    const MUSTACHE_EXPR$1 = MUSTACHE_EXPR,
      ERB_EXPR$1 = ERB_EXPR,
      TMPLIT_EXPR$1 = TMPLIT_EXPR,
      DATA_ATTR$1 = DATA_ATTR,
      ARIA_ATTR$1 = ARIA_ATTR,
      IS_SCRIPT_OR_DATA$1 = IS_SCRIPT_OR_DATA,
      ATTR_WHITESPACE$1 = ATTR_WHITESPACE,
      CUSTOM_ELEMENT$1 = CUSTOM_ELEMENT;
    let IS_ALLOWED_URI$1 = IS_ALLOWED_URI;
    /**
     * We consider the elements and attributes below to be safe. Ideally
     * don't add any new ones but feel free to remove unwanted ones.
     */
    /* allowed element names */
    let ALLOWED_TAGS = null;
    const DEFAULT_ALLOWED_TAGS = addToSet({}, [...html$1, ...svg$1, ...svgFilters, ...mathMl$1, ...text]);
    /* Allowed attribute names */
    let ALLOWED_ATTR = null;
    const DEFAULT_ALLOWED_ATTR = addToSet({}, [...html, ...svg, ...mathMl, ...xml]);
    /*
     * Configure how DOMPurify should handle custom elements and their attributes as well as customized built-in elements.
     * @property {RegExp|Function|null} tagNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any custom elements)
     * @property {RegExp|Function|null} attributeNameCheck one of [null, regexPattern, predicate]. Default: `null` (disallow any attributes not on the allow list)
     * @property {boolean} allowCustomizedBuiltInElements allow custom elements derived from built-ins if they pass CUSTOM_ELEMENT_HANDLING.tagNameCheck. Default: `false`.
     */
    let CUSTOM_ELEMENT_HANDLING = Object.seal(create(null, {
      tagNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeNameCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      allowCustomizedBuiltInElements: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: false
      }
    }));
    /* Explicitly forbidden tags (overrides ALLOWED_TAGS/ADD_TAGS) */
    let FORBID_TAGS = null;
    /* Explicitly forbidden attributes (overrides ALLOWED_ATTR/ADD_ATTR) */
    let FORBID_ATTR = null;
    /* Config object to store ADD_TAGS/ADD_ATTR functions (when used as functions) */
    const EXTRA_ELEMENT_HANDLING = Object.seal(create(null, {
      tagCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      },
      attributeCheck: {
        writable: true,
        configurable: false,
        enumerable: true,
        value: null
      }
    }));
    /* Decide if ARIA attributes are okay */
    let ALLOW_ARIA_ATTR = true;
    /* Decide if custom data attributes are okay */
    let ALLOW_DATA_ATTR = true;
    /* Decide if unknown protocols are okay */
    let ALLOW_UNKNOWN_PROTOCOLS = false;
    /* Decide if self-closing tags in attributes are allowed.
     * Usually removed due to a mXSS issue in jQuery 3.0 */
    let ALLOW_SELF_CLOSE_IN_ATTR = true;
    /* Output should be safe for common template engines.
     * This means, DOMPurify removes data attributes, mustaches and ERB
     */
    let SAFE_FOR_TEMPLATES = false;
    /* Output should be safe even for XML used within HTML and alike.
     * This means, DOMPurify removes comments when containing risky content.
     */
    let SAFE_FOR_XML = true;
    /* Decide if document with <html>... should be returned */
    let WHOLE_DOCUMENT = false;
    /* Track whether config is already set on this instance of DOMPurify. */
    let SET_CONFIG = false;
    /* Decide if all elements (e.g. style, script) must be children of
     * document.body. By default, browsers might move them to document.head */
    let FORCE_BODY = false;
    /* Decide if a DOM `HTMLBodyElement` should be returned, instead of a html
     * string (or a TrustedHTML object if Trusted Types are supported).
     * If `WHOLE_DOCUMENT` is enabled a `HTMLHtmlElement` will be returned instead
     */
    let RETURN_DOM = false;
    /* Decide if a DOM `DocumentFragment` should be returned, instead of a html
     * string  (or a TrustedHTML object if Trusted Types are supported) */
    let RETURN_DOM_FRAGMENT = false;
    /* Try to return a Trusted Type object instead of a string, return a string in
     * case Trusted Types are not supported  */
    let RETURN_TRUSTED_TYPE = false;
    /* Output should be free from DOM clobbering attacks?
     * This sanitizes markups named with colliding, clobberable built-in DOM APIs.
     */
    let SANITIZE_DOM = true;
    /* Achieve full DOM Clobbering protection by isolating the namespace of named
     * properties and JS variables, mitigating attacks that abuse the HTML/DOM spec rules.
     *
     * HTML/DOM spec rules that enable DOM Clobbering:
     *   - Named Access on Window (§7.3.3)
     *   - DOM Tree Accessors (§3.1.5)
     *   - Form Element Parent-Child Relations (§4.10.3)
     *   - Iframe srcdoc / Nested WindowProxies (§4.8.5)
     *   - HTMLCollection (§4.2.10.2)
     *
     * Namespace isolation is implemented by prefixing `id` and `name` attributes
     * with a constant string, i.e., `user-content-`
     */
    let SANITIZE_NAMED_PROPS = false;
    const SANITIZE_NAMED_PROPS_PREFIX = 'user-content-';
    /* Keep element content when removing element? */
    let KEEP_CONTENT = true;
    /* If a `Node` is passed to sanitize(), then performs sanitization in-place instead
     * of importing it into a new Document and returning a sanitized copy */
    let IN_PLACE = false;
    /* Allow usage of profiles like html, svg and mathMl */
    let USE_PROFILES = {};
    /* Tags to ignore content of when KEEP_CONTENT is true */
    let FORBID_CONTENTS = null;
    const DEFAULT_FORBID_CONTENTS = addToSet({}, ['annotation-xml', 'audio', 'colgroup', 'desc', 'foreignobject', 'head', 'iframe', 'math', 'mi', 'mn', 'mo', 'ms', 'mtext', 'noembed', 'noframes', 'noscript', 'plaintext', 'script', 'style', 'svg', 'template', 'thead', 'title', 'video', 'xmp']);
    /* Tags that are safe for data: URIs */
    let DATA_URI_TAGS = null;
    const DEFAULT_DATA_URI_TAGS = addToSet({}, ['audio', 'video', 'img', 'source', 'image', 'track']);
    /* Attributes safe for values like "javascript:" */
    let URI_SAFE_ATTRIBUTES = null;
    const DEFAULT_URI_SAFE_ATTRIBUTES = addToSet({}, ['alt', 'class', 'for', 'id', 'label', 'name', 'pattern', 'placeholder', 'role', 'summary', 'title', 'value', 'style', 'xmlns']);
    const MATHML_NAMESPACE = 'http://www.w3.org/1998/Math/MathML';
    const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
    const HTML_NAMESPACE = 'http://www.w3.org/1999/xhtml';
    /* Document namespace */
    let NAMESPACE = HTML_NAMESPACE;
    let IS_EMPTY_INPUT = false;
    /* Allowed XHTML+XML namespaces */
    let ALLOWED_NAMESPACES = null;
    const DEFAULT_ALLOWED_NAMESPACES = addToSet({}, [MATHML_NAMESPACE, SVG_NAMESPACE, HTML_NAMESPACE], stringToString);
    let MATHML_TEXT_INTEGRATION_POINTS = addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']);
    let HTML_INTEGRATION_POINTS = addToSet({}, ['annotation-xml']);
    // Certain elements are allowed in both SVG and HTML
    // namespace. We need to specify them explicitly
    // so that they don't get erroneously deleted from
    // HTML namespace.
    const COMMON_SVG_AND_HTML_ELEMENTS = addToSet({}, ['title', 'style', 'font', 'a', 'script']);
    /* Parsing of strict XHTML documents */
    let PARSER_MEDIA_TYPE = null;
    const SUPPORTED_PARSER_MEDIA_TYPES = ['application/xhtml+xml', 'text/html'];
    const DEFAULT_PARSER_MEDIA_TYPE = 'text/html';
    let transformCaseFunc = null;
    /* Keep a reference to config to pass to hooks */
    let CONFIG = null;
    /* Ideally, do not touch anything below this line */
    /* ______________________________________________ */
    const formElement = document.createElement('form');
    const isRegexOrFunction = function isRegexOrFunction(testValue) {
      return testValue instanceof RegExp || testValue instanceof Function;
    };
    /**
     * _parseConfig
     *
     * @param cfg optional config literal
     */
    // eslint-disable-next-line complexity
    const _parseConfig = function _parseConfig() {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      if (CONFIG && CONFIG === cfg) {
        return;
      }
      /* Shield configuration object from tampering */
      if (!cfg || typeof cfg !== 'object') {
        cfg = {};
      }
      /* Shield configuration object from prototype pollution */
      cfg = clone(cfg);
      PARSER_MEDIA_TYPE =
      // eslint-disable-next-line unicorn/prefer-includes
      SUPPORTED_PARSER_MEDIA_TYPES.indexOf(cfg.PARSER_MEDIA_TYPE) === -1 ? DEFAULT_PARSER_MEDIA_TYPE : cfg.PARSER_MEDIA_TYPE;
      // HTML tags and attributes are not case-sensitive, converting to lowercase. Keeping XHTML as is.
      transformCaseFunc = PARSER_MEDIA_TYPE === 'application/xhtml+xml' ? stringToString : stringToLowerCase;
      /* Set configuration parameters */
      ALLOWED_TAGS = objectHasOwnProperty(cfg, 'ALLOWED_TAGS') && arrayIsArray(cfg.ALLOWED_TAGS) ? addToSet({}, cfg.ALLOWED_TAGS, transformCaseFunc) : DEFAULT_ALLOWED_TAGS;
      ALLOWED_ATTR = objectHasOwnProperty(cfg, 'ALLOWED_ATTR') && arrayIsArray(cfg.ALLOWED_ATTR) ? addToSet({}, cfg.ALLOWED_ATTR, transformCaseFunc) : DEFAULT_ALLOWED_ATTR;
      ALLOWED_NAMESPACES = objectHasOwnProperty(cfg, 'ALLOWED_NAMESPACES') && arrayIsArray(cfg.ALLOWED_NAMESPACES) ? addToSet({}, cfg.ALLOWED_NAMESPACES, stringToString) : DEFAULT_ALLOWED_NAMESPACES;
      URI_SAFE_ATTRIBUTES = objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') && arrayIsArray(cfg.ADD_URI_SAFE_ATTR) ? addToSet(clone(DEFAULT_URI_SAFE_ATTRIBUTES), cfg.ADD_URI_SAFE_ATTR, transformCaseFunc) : DEFAULT_URI_SAFE_ATTRIBUTES;
      DATA_URI_TAGS = objectHasOwnProperty(cfg, 'ADD_DATA_URI_TAGS') && arrayIsArray(cfg.ADD_DATA_URI_TAGS) ? addToSet(clone(DEFAULT_DATA_URI_TAGS), cfg.ADD_DATA_URI_TAGS, transformCaseFunc) : DEFAULT_DATA_URI_TAGS;
      FORBID_CONTENTS = objectHasOwnProperty(cfg, 'FORBID_CONTENTS') && arrayIsArray(cfg.FORBID_CONTENTS) ? addToSet({}, cfg.FORBID_CONTENTS, transformCaseFunc) : DEFAULT_FORBID_CONTENTS;
      FORBID_TAGS = objectHasOwnProperty(cfg, 'FORBID_TAGS') && arrayIsArray(cfg.FORBID_TAGS) ? addToSet({}, cfg.FORBID_TAGS, transformCaseFunc) : clone({});
      FORBID_ATTR = objectHasOwnProperty(cfg, 'FORBID_ATTR') && arrayIsArray(cfg.FORBID_ATTR) ? addToSet({}, cfg.FORBID_ATTR, transformCaseFunc) : clone({});
      USE_PROFILES = objectHasOwnProperty(cfg, 'USE_PROFILES') ? cfg.USE_PROFILES && typeof cfg.USE_PROFILES === 'object' ? clone(cfg.USE_PROFILES) : cfg.USE_PROFILES : false;
      ALLOW_ARIA_ATTR = cfg.ALLOW_ARIA_ATTR !== false; // Default true
      ALLOW_DATA_ATTR = cfg.ALLOW_DATA_ATTR !== false; // Default true
      ALLOW_UNKNOWN_PROTOCOLS = cfg.ALLOW_UNKNOWN_PROTOCOLS || false; // Default false
      ALLOW_SELF_CLOSE_IN_ATTR = cfg.ALLOW_SELF_CLOSE_IN_ATTR !== false; // Default true
      SAFE_FOR_TEMPLATES = cfg.SAFE_FOR_TEMPLATES || false; // Default false
      SAFE_FOR_XML = cfg.SAFE_FOR_XML !== false; // Default true
      WHOLE_DOCUMENT = cfg.WHOLE_DOCUMENT || false; // Default false
      RETURN_DOM = cfg.RETURN_DOM || false; // Default false
      RETURN_DOM_FRAGMENT = cfg.RETURN_DOM_FRAGMENT || false; // Default false
      RETURN_TRUSTED_TYPE = cfg.RETURN_TRUSTED_TYPE || false; // Default false
      FORCE_BODY = cfg.FORCE_BODY || false; // Default false
      SANITIZE_DOM = cfg.SANITIZE_DOM !== false; // Default true
      SANITIZE_NAMED_PROPS = cfg.SANITIZE_NAMED_PROPS || false; // Default false
      KEEP_CONTENT = cfg.KEEP_CONTENT !== false; // Default true
      IN_PLACE = cfg.IN_PLACE || false; // Default false
      IS_ALLOWED_URI$1 = isRegex(cfg.ALLOWED_URI_REGEXP) ? cfg.ALLOWED_URI_REGEXP : IS_ALLOWED_URI; // Default regexp
      NAMESPACE = typeof cfg.NAMESPACE === 'string' ? cfg.NAMESPACE : HTML_NAMESPACE; // Default HTML namespace
      MATHML_TEXT_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'MATHML_TEXT_INTEGRATION_POINTS') && cfg.MATHML_TEXT_INTEGRATION_POINTS && typeof cfg.MATHML_TEXT_INTEGRATION_POINTS === 'object' ? clone(cfg.MATHML_TEXT_INTEGRATION_POINTS) : addToSet({}, ['mi', 'mo', 'mn', 'ms', 'mtext']); // Default built-in map
      HTML_INTEGRATION_POINTS = objectHasOwnProperty(cfg, 'HTML_INTEGRATION_POINTS') && cfg.HTML_INTEGRATION_POINTS && typeof cfg.HTML_INTEGRATION_POINTS === 'object' ? clone(cfg.HTML_INTEGRATION_POINTS) : addToSet({}, ['annotation-xml']); // Default built-in map
      const customElementHandling = objectHasOwnProperty(cfg, 'CUSTOM_ELEMENT_HANDLING') && cfg.CUSTOM_ELEMENT_HANDLING && typeof cfg.CUSTOM_ELEMENT_HANDLING === 'object' ? clone(cfg.CUSTOM_ELEMENT_HANDLING) : create(null);
      CUSTOM_ELEMENT_HANDLING = create(null);
      if (objectHasOwnProperty(customElementHandling, 'tagNameCheck') && isRegexOrFunction(customElementHandling.tagNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.tagNameCheck = customElementHandling.tagNameCheck; // Default undefined
      }
      if (objectHasOwnProperty(customElementHandling, 'attributeNameCheck') && isRegexOrFunction(customElementHandling.attributeNameCheck)) {
        CUSTOM_ELEMENT_HANDLING.attributeNameCheck = customElementHandling.attributeNameCheck; // Default undefined
      }
      if (objectHasOwnProperty(customElementHandling, 'allowCustomizedBuiltInElements') && typeof customElementHandling.allowCustomizedBuiltInElements === 'boolean') {
        CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements = customElementHandling.allowCustomizedBuiltInElements; // Default undefined
      }
      if (SAFE_FOR_TEMPLATES) {
        ALLOW_DATA_ATTR = false;
      }
      if (RETURN_DOM_FRAGMENT) {
        RETURN_DOM = true;
      }
      /* Parse profile info */
      if (USE_PROFILES) {
        ALLOWED_TAGS = addToSet({}, text);
        ALLOWED_ATTR = create(null);
        if (USE_PROFILES.html === true) {
          addToSet(ALLOWED_TAGS, html$1);
          addToSet(ALLOWED_ATTR, html);
        }
        if (USE_PROFILES.svg === true) {
          addToSet(ALLOWED_TAGS, svg$1);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.svgFilters === true) {
          addToSet(ALLOWED_TAGS, svgFilters);
          addToSet(ALLOWED_ATTR, svg);
          addToSet(ALLOWED_ATTR, xml);
        }
        if (USE_PROFILES.mathMl === true) {
          addToSet(ALLOWED_TAGS, mathMl$1);
          addToSet(ALLOWED_ATTR, mathMl);
          addToSet(ALLOWED_ATTR, xml);
        }
      }
      /* Always reset function-based ADD_TAGS / ADD_ATTR checks to prevent
       * leaking across calls when switching from function to array config */
      EXTRA_ELEMENT_HANDLING.tagCheck = null;
      EXTRA_ELEMENT_HANDLING.attributeCheck = null;
      /* Merge configuration parameters */
      if (objectHasOwnProperty(cfg, 'ADD_TAGS')) {
        if (typeof cfg.ADD_TAGS === 'function') {
          EXTRA_ELEMENT_HANDLING.tagCheck = cfg.ADD_TAGS;
        } else if (arrayIsArray(cfg.ADD_TAGS)) {
          if (ALLOWED_TAGS === DEFAULT_ALLOWED_TAGS) {
            ALLOWED_TAGS = clone(ALLOWED_TAGS);
          }
          addToSet(ALLOWED_TAGS, cfg.ADD_TAGS, transformCaseFunc);
        }
      }
      if (objectHasOwnProperty(cfg, 'ADD_ATTR')) {
        if (typeof cfg.ADD_ATTR === 'function') {
          EXTRA_ELEMENT_HANDLING.attributeCheck = cfg.ADD_ATTR;
        } else if (arrayIsArray(cfg.ADD_ATTR)) {
          if (ALLOWED_ATTR === DEFAULT_ALLOWED_ATTR) {
            ALLOWED_ATTR = clone(ALLOWED_ATTR);
          }
          addToSet(ALLOWED_ATTR, cfg.ADD_ATTR, transformCaseFunc);
        }
      }
      if (objectHasOwnProperty(cfg, 'ADD_URI_SAFE_ATTR') && arrayIsArray(cfg.ADD_URI_SAFE_ATTR)) {
        addToSet(URI_SAFE_ATTRIBUTES, cfg.ADD_URI_SAFE_ATTR, transformCaseFunc);
      }
      if (objectHasOwnProperty(cfg, 'FORBID_CONTENTS') && arrayIsArray(cfg.FORBID_CONTENTS)) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.FORBID_CONTENTS, transformCaseFunc);
      }
      if (objectHasOwnProperty(cfg, 'ADD_FORBID_CONTENTS') && arrayIsArray(cfg.ADD_FORBID_CONTENTS)) {
        if (FORBID_CONTENTS === DEFAULT_FORBID_CONTENTS) {
          FORBID_CONTENTS = clone(FORBID_CONTENTS);
        }
        addToSet(FORBID_CONTENTS, cfg.ADD_FORBID_CONTENTS, transformCaseFunc);
      }
      /* Add #text in case KEEP_CONTENT is set to true */
      if (KEEP_CONTENT) {
        ALLOWED_TAGS['#text'] = true;
      }
      /* Add html, head and body to ALLOWED_TAGS in case WHOLE_DOCUMENT is true */
      if (WHOLE_DOCUMENT) {
        addToSet(ALLOWED_TAGS, ['html', 'head', 'body']);
      }
      /* Add tbody to ALLOWED_TAGS in case tables are permitted, see #286, #365 */
      if (ALLOWED_TAGS.table) {
        addToSet(ALLOWED_TAGS, ['tbody']);
        delete FORBID_TAGS.tbody;
      }
      if (cfg.TRUSTED_TYPES_POLICY) {
        if (typeof cfg.TRUSTED_TYPES_POLICY.createHTML !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.');
        }
        if (typeof cfg.TRUSTED_TYPES_POLICY.createScriptURL !== 'function') {
          throw typeErrorCreate('TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.');
        }
        // Overwrite existing TrustedTypes policy.
        trustedTypesPolicy = cfg.TRUSTED_TYPES_POLICY;
        // Sign local variables required by `sanitize`.
        emptyHTML = trustedTypesPolicy.createHTML('');
      } else {
        // Uninitialized policy, attempt to initialize the internal dompurify policy.
        if (trustedTypesPolicy === undefined) {
          trustedTypesPolicy = _createTrustedTypesPolicy(trustedTypes, currentScript);
        }
        // If creating the internal policy succeeded sign internal variables.
        if (trustedTypesPolicy !== null && typeof emptyHTML === 'string') {
          emptyHTML = trustedTypesPolicy.createHTML('');
        }
      }
      // Prevent further manipulation of configuration.
      // Not available in IE8, Safari 5, etc.
      if (freeze) {
        freeze(cfg);
      }
      CONFIG = cfg;
    };
    /* Keep track of all possible SVG and MathML tags
     * so that we can perform the namespace checks
     * correctly. */
    const ALL_SVG_TAGS = addToSet({}, [...svg$1, ...svgFilters, ...svgDisallowed]);
    const ALL_MATHML_TAGS = addToSet({}, [...mathMl$1, ...mathMlDisallowed]);
    /**
     * @param element a DOM element whose namespace is being checked
     * @returns Return false if the element has a
     *  namespace that a spec-compliant parser would never
     *  return. Return true otherwise.
     */
    const _checkValidNamespace = function _checkValidNamespace(element) {
      let parent = getParentNode(element);
      // In JSDOM, if we're inside shadow DOM, then parentNode
      // can be null. We just simulate parent in this case.
      if (!parent || !parent.tagName) {
        parent = {
          namespaceURI: NAMESPACE,
          tagName: 'template'
        };
      }
      const tagName = stringToLowerCase(element.tagName);
      const parentTagName = stringToLowerCase(parent.tagName);
      if (!ALLOWED_NAMESPACES[element.namespaceURI]) {
        return false;
      }
      if (element.namespaceURI === SVG_NAMESPACE) {
        // The only way to switch from HTML namespace to SVG
        // is via <svg>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'svg';
        }
        // The only way to switch from MathML to SVG is via`
        // svg if parent is either <annotation-xml> or MathML
        // text integration points.
        if (parent.namespaceURI === MATHML_NAMESPACE) {
          return tagName === 'svg' && (parentTagName === 'annotation-xml' || MATHML_TEXT_INTEGRATION_POINTS[parentTagName]);
        }
        // We only allow elements that are defined in SVG
        // spec. All others are disallowed in SVG namespace.
        return Boolean(ALL_SVG_TAGS[tagName]);
      }
      if (element.namespaceURI === MATHML_NAMESPACE) {
        // The only way to switch from HTML namespace to MathML
        // is via <math>. If it happens via any other tag, then
        // it should be killed.
        if (parent.namespaceURI === HTML_NAMESPACE) {
          return tagName === 'math';
        }
        // The only way to switch from SVG to MathML is via
        // <math> and HTML integration points
        if (parent.namespaceURI === SVG_NAMESPACE) {
          return tagName === 'math' && HTML_INTEGRATION_POINTS[parentTagName];
        }
        // We only allow elements that are defined in MathML
        // spec. All others are disallowed in MathML namespace.
        return Boolean(ALL_MATHML_TAGS[tagName]);
      }
      if (element.namespaceURI === HTML_NAMESPACE) {
        // The only way to switch from SVG to HTML is via
        // HTML integration points, and from MathML to HTML
        // is via MathML text integration points
        if (parent.namespaceURI === SVG_NAMESPACE && !HTML_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        if (parent.namespaceURI === MATHML_NAMESPACE && !MATHML_TEXT_INTEGRATION_POINTS[parentTagName]) {
          return false;
        }
        // We disallow tags that are specific for MathML
        // or SVG and should never appear in HTML namespace
        return !ALL_MATHML_TAGS[tagName] && (COMMON_SVG_AND_HTML_ELEMENTS[tagName] || !ALL_SVG_TAGS[tagName]);
      }
      // For XHTML and XML documents that support custom namespaces
      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && ALLOWED_NAMESPACES[element.namespaceURI]) {
        return true;
      }
      // The code should never reach this place (this means
      // that the element somehow got namespace that is not
      // HTML, SVG, MathML or allowed via ALLOWED_NAMESPACES).
      // Return false just in case.
      return false;
    };
    /**
     * _forceRemove
     *
     * @param node a DOM node
     */
    const _forceRemove = function _forceRemove(node) {
      arrayPush(DOMPurify.removed, {
        element: node
      });
      try {
        // eslint-disable-next-line unicorn/prefer-dom-node-remove
        getParentNode(node).removeChild(node);
      } catch (_) {
        remove(node);
      }
    };
    /**
     * _removeAttribute
     *
     * @param name an Attribute name
     * @param element a DOM node
     */
    const _removeAttribute = function _removeAttribute(name, element) {
      try {
        arrayPush(DOMPurify.removed, {
          attribute: element.getAttributeNode(name),
          from: element
        });
      } catch (_) {
        arrayPush(DOMPurify.removed, {
          attribute: null,
          from: element
        });
      }
      element.removeAttribute(name);
      // We void attribute values for unremovable "is" attributes
      if (name === 'is') {
        if (RETURN_DOM || RETURN_DOM_FRAGMENT) {
          try {
            _forceRemove(element);
          } catch (_) {}
        } else {
          try {
            element.setAttribute(name, '');
          } catch (_) {}
        }
      }
    };
    /**
     * _initDocument
     *
     * @param dirty - a string of dirty markup
     * @return a DOM, filled with the dirty markup
     */
    const _initDocument = function _initDocument(dirty) {
      /* Create a HTML document */
      let doc = null;
      let leadingWhitespace = null;
      if (FORCE_BODY) {
        dirty = '<remove></remove>' + dirty;
      } else {
        /* If FORCE_BODY isn't used, leading whitespace needs to be preserved manually */
        const matches = stringMatch(dirty, /^[\r\n\t ]+/);
        leadingWhitespace = matches && matches[0];
      }
      if (PARSER_MEDIA_TYPE === 'application/xhtml+xml' && NAMESPACE === HTML_NAMESPACE) {
        // Root of XHTML doc must contain xmlns declaration (see https://www.w3.org/TR/xhtml1/normative.html#strict)
        dirty = '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' + dirty + '</body></html>';
      }
      const dirtyPayload = trustedTypesPolicy ? trustedTypesPolicy.createHTML(dirty) : dirty;
      /*
       * Use the DOMParser API by default, fallback later if needs be
       * DOMParser not work for svg when has multiple root element.
       */
      if (NAMESPACE === HTML_NAMESPACE) {
        try {
          doc = new DOMParser().parseFromString(dirtyPayload, PARSER_MEDIA_TYPE);
        } catch (_) {}
      }
      /* Use createHTMLDocument in case DOMParser is not available */
      if (!doc || !doc.documentElement) {
        doc = implementation.createDocument(NAMESPACE, 'template', null);
        try {
          doc.documentElement.innerHTML = IS_EMPTY_INPUT ? emptyHTML : dirtyPayload;
        } catch (_) {
          // Syntax error if dirtyPayload is invalid xml
        }
      }
      const body = doc.body || doc.documentElement;
      if (dirty && leadingWhitespace) {
        body.insertBefore(document.createTextNode(leadingWhitespace), body.childNodes[0] || null);
      }
      /* Work on whole document or just its body */
      if (NAMESPACE === HTML_NAMESPACE) {
        return getElementsByTagName.call(doc, WHOLE_DOCUMENT ? 'html' : 'body')[0];
      }
      return WHOLE_DOCUMENT ? doc.documentElement : body;
    };
    /**
     * Creates a NodeIterator object that you can use to traverse filtered lists of nodes or elements in a document.
     *
     * @param root The root element or node to start traversing on.
     * @return The created NodeIterator
     */
    const _createNodeIterator = function _createNodeIterator(root) {
      return createNodeIterator.call(root.ownerDocument || root, root,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_TEXT | NodeFilter.SHOW_PROCESSING_INSTRUCTION | NodeFilter.SHOW_CDATA_SECTION, null);
    };
    /**
     * Strip template-engine expressions ({{...}}, ${...}, <%...%>) from the
     * character data of an element subtree. Used as the final safety net for
     * SAFE_FOR_TEMPLATES on every DOM-returning code path so that expressions
     * which only form after text-node normalization (e.g. fragments split across
     * stripped elements) cannot survive into a template-evaluating framework.
     *
     * Walks text/comment/CDATA/processing-instruction nodes and mutates `.data`
     * in place rather than round-tripping through innerHTML. This preserves
     * descendant node references (important for IN_PLACE callers), avoids a
     * serialize/reparse cycle, and reads literal character data — which means
     * `<%...%>` in text content matches the ERB regex against its real bytes
     * instead of the HTML-entity-escaped form innerHTML would produce.
     *
     * Attribute values are not visited here; SAFE_FOR_TEMPLATES handling for
     * attributes is performed during the per-node `_sanitizeAttributes` pass.
     *
     * @param node The root element whose character data should be scrubbed.
     */
    const _scrubTemplateExpressions = function _scrubTemplateExpressions(node) {
      node.normalize();
      const walker = createNodeIterator.call(node.ownerDocument || node, node,
      // eslint-disable-next-line no-bitwise
      NodeFilter.SHOW_TEXT | NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_CDATA_SECTION | NodeFilter.SHOW_PROCESSING_INSTRUCTION, null);
      let currentNode = walker.nextNode();
      while (currentNode) {
        let data = currentNode.data;
        arrayForEach([MUSTACHE_EXPR$1, ERB_EXPR$1, TMPLIT_EXPR$1], expr => {
          data = stringReplace(data, expr, ' ');
        });
        currentNode.data = data;
        currentNode = walker.nextNode();
      }
    };
    /**
     * _isClobbered
     *
     * Detect DOM-clobbering on HTMLFormElement nodes. Form is the only HTML
     * interface with [LegacyOverrideBuiltIns]; a descendant element with a
     * `name` attribute matching a prototype property shadows that property
     * on direct reads. We use this check at the IN_PLACE entry-point and
     * during attribute sanitization to refuse clobbered forms.
     *
     * Realm safety (GHSA-hpcv-96wg-7vj8): every check in this function must
     * work for foreign-realm forms — e.g. a <form> created inside a same-
     * origin iframe and then handed to a parent-realm DOMPurify instance
     * with IN_PLACE: true. The original implementation used
     * `element instanceof HTMLFormElement` and `element.attributes
     * instanceof NamedNodeMap`, both of which are realm-bound: a foreign-
     * realm form is an instance of the *foreign* realm's HTMLFormElement,
     * not the parent realm's. The instanceof short-circuited to false and
     * the function returned false (= not clobbered) regardless of how
     * thoroughly the form was clobbered. Sanitize then walked a clobbered
     * .attributes and missed every attribute on the form root, leaving
     * onmouseover / onclick / formaction / etc. intact.
     *
     * The realm-independent replacements:
     *   - HTMLFormElement detection — read the tag name through the cached
     *     Node.prototype.nodeName getter. WebIDL getters operate on internal
     *     slots that exist on every real Node regardless of which realm
     *     minted the JS wrapper, so getNodeName(foreignForm) === "FORM".
     *   - NamedNodeMap detection — compare the direct .attributes read
     *     against the cached Element.prototype.attributes getter. Same
     *     equality-probe pattern we use for .childNodes: if a clobbering
     *     child shadows the named property, the two reads diverge; if not,
     *     both return the same NamedNodeMap (same-realm OR foreign-realm —
     *     doesn't matter, both are the canonical attributes object for the
     *     node).
     *
     * @param element element to check for clobbering attacks
     * @return true if clobbered, false if safe
     */
    const _isClobbered = function _isClobbered(element) {
      // Realm-independent tag-name probe. If we can't determine the tag
      // name at all, we can't reason about clobbering — return false
      // (the caller's other defences still apply).
      const realTagName = getNodeName ? getNodeName(element) : null;
      if (typeof realTagName !== 'string') {
        return false;
      }
      if (transformCaseFunc(realTagName) !== 'form') {
        return false;
      }
      return typeof element.nodeName !== 'string' || typeof element.textContent !== 'string' || typeof element.removeChild !== 'function' ||
      // Realm-safe NamedNodeMap detection: equality against the cached
      // prototype getter. Clobbered .attributes (e.g. <input name="attributes">)
      // makes the direct read diverge from the cached read; a clean form
      // (same-realm OR foreign-realm) has both reads pointing at the same
      // canonical NamedNodeMap.
      element.attributes !== getAttributes(element) || typeof element.removeAttribute !== 'function' || typeof element.setAttribute !== 'function' || typeof element.namespaceURI !== 'string' || typeof element.insertBefore !== 'function' || typeof element.hasChildNodes !== 'function' ||
      // HTMLFormElement has [LegacyOverrideBuiltIns]: a descendant named
      // "childNodes" shadows the prototype getter. Direct reads of
      // form.childNodes from a clobbered form return the named child
      // instead of the real NodeList, so any walk that reads it directly
      // skips the form's real children. Compare the direct read to the
      // cached Node.prototype getter — when the form's named-property
      // getter intercepts the read, the two values differ and we flag
      // the form. This catches every clobbering child type (input,
      // select, etc.) regardless of whether the named child happens to
      // carry a numeric .length, which a typeof-based probe would miss
      // (e.g. HTMLSelectElement.length is a defined unsigned-long).
      element.childNodes !== getChildNodes(element);
    };
    /**
     * Checks whether the given value is a DocumentFragment from any realm.
     *
     * Realm safety (GHSA-hpcv-96wg-7vj8): the original sites used
     * `value instanceof DocumentFragment`, which is realm-bound — a fragment
     * from a foreign realm (template content or shadow root from an iframe
     * document) is an instance of the foreign realm's DocumentFragment, not
     * the parent realm's, so the check returned false and the template-
     * content / shadow-root recursion was silently skipped. The attacker
     * payload inside survived untouched.
     *
     * The realm-independent replacement reads `nodeType` through the cached
     * Node.prototype getter and compares to the DOCUMENT_FRAGMENT_NODE
     * constant (11). nodeType is a numeric value resolved from the node's
     * internal slot, identical across realms for the same kind of node.
     *
     * @param value object to check
     * @return true if value is a DocumentFragment-shaped node from any realm
     */
    const _isDocumentFragment = function _isDocumentFragment(value) {
      if (!getNodeType || typeof value !== 'object' || value === null) {
        return false;
      }
      try {
        return getNodeType(value) === NODE_TYPE.documentFragment;
      } catch (_) {
        return false;
      }
    };
    /**
     * Checks whether the given object is a DOM node, including nodes that
     * originate from a different window/realm (e.g. an iframe's
     * contentDocument). The previous `value instanceof Node` check was
     * realm-bound: nodes from a different window failed it, causing
     * sanitize() to silently stringify them and reset IN_PLACE to false,
     * returning the original node unsanitized. See GHSA-4w3q-35jp-p934.
     *
     * Implementation: call the cached `nodeType` getter from Node.prototype
     * directly on the value. This bypasses any clobbered instance property
     * (e.g. a child element named "nodeType") and works across realms
     * because the WebIDL `nodeType` getter reads an internal slot that
     * every real Node has, regardless of which window minted it.
     *
     * @param value object to check whether it's a DOM node
     * @return true if value is a DOM node from any realm
     */
    const _isNode = function _isNode(value) {
      if (!getNodeType || typeof value !== 'object' || value === null) {
        return false;
      }
      try {
        return typeof getNodeType(value) === 'number';
      } catch (_) {
        return false;
      }
    };
    function _executeHooks(hooks, currentNode, data) {
      arrayForEach(hooks, hook => {
        hook.call(DOMPurify, currentNode, data, CONFIG);
      });
    }
    /**
     * _sanitizeElements
     *
     * @protect nodeName
     * @protect textContent
     * @protect removeChild
     * @param currentNode to check for permission to exist
     * @return true if node was killed, false if left alive
     */
    const _sanitizeElements = function _sanitizeElements(currentNode) {
      let content = null;
      /* Execute a hook if present */
      _executeHooks(hooks.beforeSanitizeElements, currentNode, null);
      /* Check if element is clobbered or can clobber */
      if (_isClobbered(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      /* Now let's check the element's type and name */
      const tagName = transformCaseFunc(currentNode.nodeName);
      /* Execute a hook if present */
      _executeHooks(hooks.uponSanitizeElement, currentNode, {
        tagName,
        allowedTags: ALLOWED_TAGS
      });
      /* Detect mXSS attempts abusing namespace confusion */
      if (SAFE_FOR_XML && currentNode.hasChildNodes() && !_isNode(currentNode.firstElementChild) && regExpTest(/<[/\w!]/g, currentNode.innerHTML) && regExpTest(/<[/\w!]/g, currentNode.textContent)) {
        _forceRemove(currentNode);
        return true;
      }
      /* Remove risky CSS construction leading to mXSS */
      if (SAFE_FOR_XML && currentNode.namespaceURI === HTML_NAMESPACE && tagName === 'style' && _isNode(currentNode.firstElementChild)) {
        _forceRemove(currentNode);
        return true;
      }
      /* Remove any occurrence of processing instructions */
      if (currentNode.nodeType === NODE_TYPE.progressingInstruction) {
        _forceRemove(currentNode);
        return true;
      }
      /* Remove any kind of possibly harmful comments */
      if (SAFE_FOR_XML && currentNode.nodeType === NODE_TYPE.comment && regExpTest(/<[/\w]/g, currentNode.data)) {
        _forceRemove(currentNode);
        return true;
      }
      /* Remove element if anything forbids its presence */
      if (FORBID_TAGS[tagName] || !(EXTRA_ELEMENT_HANDLING.tagCheck instanceof Function && EXTRA_ELEMENT_HANDLING.tagCheck(tagName)) && !ALLOWED_TAGS[tagName]) {
        /* Check if we have a custom element to handle */
        if (!FORBID_TAGS[tagName] && _isBasicCustomElement(tagName)) {
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, tagName)) {
            return false;
          }
          if (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(tagName)) {
            return false;
          }
        }
        /* Keep content except for bad-listed elements */
        if (KEEP_CONTENT && !FORBID_CONTENTS[tagName]) {
          const parentNode = getParentNode(currentNode) || currentNode.parentNode;
          const childNodes = getChildNodes(currentNode) || currentNode.childNodes;
          if (childNodes && parentNode) {
            const childCount = childNodes.length;
            for (let i = childCount - 1; i >= 0; --i) {
              const childClone = cloneNode(childNodes[i], true);
              parentNode.insertBefore(childClone, getNextSibling(currentNode));
            }
          }
        }
        _forceRemove(currentNode);
        return true;
      }
      /* Check whether element has a valid namespace.
         Realm-safe check (GHSA-hpcv-96wg-7vj8): use the cached Node.prototype
         nodeType getter rather than `instanceof Element`, which is realm-
         bound and short-circuits to false for any node minted in a different
         realm — letting a foreign-realm element with a forbidden namespace
         slip past the namespace check entirely. */
      const nt = getNodeType ? getNodeType(currentNode) : currentNode.nodeType;
      if (nt === NODE_TYPE.element && !_checkValidNamespace(currentNode)) {
        _forceRemove(currentNode);
        return true;
      }
      /* Make sure that older browsers don't get fallback-tag mXSS */
      if ((tagName === 'noscript' || tagName === 'noembed' || tagName === 'noframes') && regExpTest(/<\/no(script|embed|frames)/i, currentNode.innerHTML)) {
        _forceRemove(currentNode);
        return true;
      }
      /* Sanitize element content to be template-safe */
      if (SAFE_FOR_TEMPLATES && currentNode.nodeType === NODE_TYPE.text) {
        /* Get the element's text content */
        content = currentNode.textContent;
        arrayForEach([MUSTACHE_EXPR$1, ERB_EXPR$1, TMPLIT_EXPR$1], expr => {
          content = stringReplace(content, expr, ' ');
        });
        if (currentNode.textContent !== content) {
          arrayPush(DOMPurify.removed, {
            element: currentNode.cloneNode()
          });
          currentNode.textContent = content;
        }
      }
      /* Execute a hook if present */
      _executeHooks(hooks.afterSanitizeElements, currentNode, null);
      return false;
    };
    /**
     * _isValidAttribute
     *
     * @param lcTag Lowercase tag name of containing element.
     * @param lcName Lowercase attribute name.
     * @param value Attribute value.
     * @return Returns true if `value` is valid, otherwise false.
     */
    // eslint-disable-next-line complexity
    const _isValidAttribute = function _isValidAttribute(lcTag, lcName, value) {
      /* FORBID_ATTR must always win, even if ADD_ATTR predicate would allow it */
      if (FORBID_ATTR[lcName]) {
        return false;
      }
      /* Make sure attribute cannot clobber */
      if (SANITIZE_DOM && (lcName === 'id' || lcName === 'name') && (value in document || value in formElement)) {
        return false;
      }
      const nameIsPermitted = ALLOWED_ATTR[lcName] || EXTRA_ELEMENT_HANDLING.attributeCheck instanceof Function && EXTRA_ELEMENT_HANDLING.attributeCheck(lcName, lcTag);
      /* Allow valid data-* attributes: At least one character after "-"
          (https://html.spec.whatwg.org/multipage/dom.html#embedding-custom-non-visible-data-with-the-data-*-attributes)
          XML-compatible (https://html.spec.whatwg.org/multipage/infrastructure.html#xml-compatible and http://www.w3.org/TR/xml/#d0e804)
          We don't need to check the value; it's always URI safe. */
      if (ALLOW_DATA_ATTR && !FORBID_ATTR[lcName] && regExpTest(DATA_ATTR$1, lcName)) ; else if (ALLOW_ARIA_ATTR && regExpTest(ARIA_ATTR$1, lcName)) ; else if (!nameIsPermitted || FORBID_ATTR[lcName]) {
        if (
        // First condition does a very basic check if a) it's basically a valid custom element tagname AND
        // b) if the tagName passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        // and c) if the attribute name passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.attributeNameCheck
        _isBasicCustomElement(lcTag) && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, lcTag) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(lcTag)) && (CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.attributeNameCheck, lcName) || CUSTOM_ELEMENT_HANDLING.attributeNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.attributeNameCheck(lcName, lcTag)) ||
        // Alternative, second condition checks if it's an `is`-attribute, AND
        // the value passes whatever the user has configured for CUSTOM_ELEMENT_HANDLING.tagNameCheck
        lcName === 'is' && CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements && (CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof RegExp && regExpTest(CUSTOM_ELEMENT_HANDLING.tagNameCheck, value) || CUSTOM_ELEMENT_HANDLING.tagNameCheck instanceof Function && CUSTOM_ELEMENT_HANDLING.tagNameCheck(value))) ; else {
          return false;
        }
        /* Check value is safe. First, is attr inert? If so, is safe */
      } else if (URI_SAFE_ATTRIBUTES[lcName]) ; else if (regExpTest(IS_ALLOWED_URI$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if ((lcName === 'src' || lcName === 'xlink:href' || lcName === 'href') && lcTag !== 'script' && stringIndexOf(value, 'data:') === 0 && DATA_URI_TAGS[lcTag]) ; else if (ALLOW_UNKNOWN_PROTOCOLS && !regExpTest(IS_SCRIPT_OR_DATA$1, stringReplace(value, ATTR_WHITESPACE$1, ''))) ; else if (value) {
        return false;
      } else ;
      return true;
    };
    /* Names the HTML spec reserves from valid-custom-element-name; these must
     * never be treated as basic custom elements even when a permissive
     * CUSTOM_ELEMENT_HANDLING.tagNameCheck is configured. */
    const RESERVED_CUSTOM_ELEMENT_NAMES = addToSet({}, ['annotation-xml', 'color-profile', 'font-face', 'font-face-format', 'font-face-name', 'font-face-src', 'font-face-uri', 'missing-glyph']);
    /**
     * _isBasicCustomElement
     * checks if at least one dash is included in tagName, and it's not the first char
     * for more sophisticated checking see https://github.com/sindresorhus/validate-element-name
     *
     * @param tagName name of the tag of the node to sanitize
     * @returns Returns true if the tag name meets the basic criteria for a custom element, otherwise false.
     */
    const _isBasicCustomElement = function _isBasicCustomElement(tagName) {
      return !RESERVED_CUSTOM_ELEMENT_NAMES[stringToLowerCase(tagName)] && regExpTest(CUSTOM_ELEMENT$1, tagName);
    };
    /**
     * _sanitizeAttributes
     *
     * @protect attributes
     * @protect nodeName
     * @protect removeAttribute
     * @protect setAttribute
     *
     * @param currentNode to sanitize
     */
    const _sanitizeAttributes = function _sanitizeAttributes(currentNode) {
      /* Execute a hook if present */
      _executeHooks(hooks.beforeSanitizeAttributes, currentNode, null);
      const attributes = currentNode.attributes;
      /* Check if we have attributes; if not we might have a text node */
      if (!attributes || _isClobbered(currentNode)) {
        return;
      }
      const hookEvent = {
        attrName: '',
        attrValue: '',
        keepAttr: true,
        allowedAttributes: ALLOWED_ATTR,
        forceKeepAttr: undefined
      };
      let l = attributes.length;
      /* Go backwards over all attributes; safely remove bad ones */
      while (l--) {
        const attr = attributes[l];
        const name = attr.name,
          namespaceURI = attr.namespaceURI,
          attrValue = attr.value;
        const lcName = transformCaseFunc(name);
        const initValue = attrValue;
        let value = name === 'value' ? initValue : stringTrim(initValue);
        /* Execute a hook if present */
        hookEvent.attrName = lcName;
        hookEvent.attrValue = value;
        hookEvent.keepAttr = true;
        hookEvent.forceKeepAttr = undefined; // Allows developers to see this is a property they can set
        _executeHooks(hooks.uponSanitizeAttribute, currentNode, hookEvent);
        value = hookEvent.attrValue;
        /* Full DOM Clobbering protection via namespace isolation,
         * Prefix id and name attributes with `user-content-`
         */
        if (SANITIZE_NAMED_PROPS && (lcName === 'id' || lcName === 'name') && stringIndexOf(value, SANITIZE_NAMED_PROPS_PREFIX) !== 0) {
          // Remove the attribute with this value
          _removeAttribute(name, currentNode);
          // Prefix the value and later re-create the attribute with the sanitized value
          value = SANITIZE_NAMED_PROPS_PREFIX + value;
        }
        // Else: already prefixed, leave the attribute alone — the prefix is
        // itself the clobbering protection, and re-applying it is incorrect.
        /* Work around a security issue with comments inside attributes */
        if (SAFE_FOR_XML && regExpTest(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        /* Make sure we cannot easily use animated hrefs, even if animations are allowed */
        if (lcName === 'attributename' && stringMatch(value, 'href')) {
          _removeAttribute(name, currentNode);
          continue;
        }
        /* Did the hooks approve of the attribute? */
        if (hookEvent.forceKeepAttr) {
          continue;
        }
        /* Did the hooks approve of the attribute? */
        if (!hookEvent.keepAttr) {
          _removeAttribute(name, currentNode);
          continue;
        }
        /* Work around a security issue in jQuery 3.0 */
        if (!ALLOW_SELF_CLOSE_IN_ATTR && regExpTest(/\/>/i, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        /* Sanitize attribute content to be template-safe */
        if (SAFE_FOR_TEMPLATES) {
          arrayForEach([MUSTACHE_EXPR$1, ERB_EXPR$1, TMPLIT_EXPR$1], expr => {
            value = stringReplace(value, expr, ' ');
          });
        }
        /* Is `value` valid for this attribute? */
        const lcTag = transformCaseFunc(currentNode.nodeName);
        if (!_isValidAttribute(lcTag, lcName, value)) {
          _removeAttribute(name, currentNode);
          continue;
        }
        /* Handle attributes that require Trusted Types */
        if (trustedTypesPolicy && typeof trustedTypes === 'object' && typeof trustedTypes.getAttributeType === 'function') {
          if (namespaceURI) ; else {
            switch (trustedTypes.getAttributeType(lcTag, lcName)) {
              case 'TrustedHTML':
                {
                  value = trustedTypesPolicy.createHTML(value);
                  break;
                }
              case 'TrustedScriptURL':
                {
                  value = trustedTypesPolicy.createScriptURL(value);
                  break;
                }
            }
          }
        }
        /* Handle invalid data-* attribute set by try-catching it */
        if (value !== initValue) {
          try {
            if (namespaceURI) {
              currentNode.setAttributeNS(namespaceURI, name, value);
            } else {
              /* Fallback to setAttribute() for browser-unrecognized namespaces e.g. "x-schema". */
              currentNode.setAttribute(name, value);
            }
            if (_isClobbered(currentNode)) {
              _forceRemove(currentNode);
            } else {
              arrayPop(DOMPurify.removed);
            }
          } catch (_) {
            _removeAttribute(name, currentNode);
          }
        }
      }
      /* Execute a hook if present */
      _executeHooks(hooks.afterSanitizeAttributes, currentNode, null);
    };
    /**
     * _sanitizeShadowDOM
     *
     * @param fragment to iterate over recursively
     */
    const _sanitizeShadowDOM2 = function _sanitizeShadowDOM(fragment) {
      let shadowNode = null;
      const shadowIterator = _createNodeIterator(fragment);
      /* Execute a hook if present */
      _executeHooks(hooks.beforeSanitizeShadowDOM, fragment, null);
      while (shadowNode = shadowIterator.nextNode()) {
        /* Execute a hook if present */
        _executeHooks(hooks.uponSanitizeShadowNode, shadowNode, null);
        /* Sanitize tags and elements */
        _sanitizeElements(shadowNode);
        /* Check attributes next */
        _sanitizeAttributes(shadowNode);
        /* Deep shadow DOM detected.
           Realm-safe check (GHSA-hpcv-96wg-7vj8): use nodeType against the
           DOCUMENT_FRAGMENT_NODE constant rather than instanceof, so we
           recurse into <template>.content from foreign realms too. */
        if (_isDocumentFragment(shadowNode.content)) {
          _sanitizeShadowDOM2(shadowNode.content);
        }
      }
      /* Execute a hook if present */
      _executeHooks(hooks.afterSanitizeShadowDOM, fragment, null);
    };
    /**
     * _sanitizeAttachedShadowRoots
     *
     * Walks `root` and feeds every attached shadow root we encounter into
     * the existing _sanitizeShadowDOM pipeline. The default node iterator
     * does not descend into shadow trees, so nodes inside an attached
     * shadow root would otherwise be skipped entirely.
     *
     * Two real input paths put attached shadow roots in front of us:
     *   1. IN_PLACE on a DOM node that already has shadow roots attached.
     *   2. DOM-node input where importNode(dirty, true) deep-clones the
     *      shadow root because it was created with `clonable: true`.
     *
     * This pass runs once, up front, so the main iteration loop (and the
     * existing _sanitizeShadowDOM template-content recursion) stay
     * untouched — string-input paths are not affected.
     *
     * DOM-Clobbering hardening: HTMLFormElement carries the WebIDL
     * [LegacyOverrideBuiltIns] extended attribute, so a descendant element
     * named `nodeType`, `shadowRoot`, or `childNodes` shadows the matching
     * prototype getter on the form. Reading those properties directly off
     * the node would let an attacker steer this walk past shadow hosts
     * (e.g. <input name="childNodes"> collapses the form's child list to
     * the input itself, so descent stops dead and any shadow root deeper
     * in the subtree is never sanitized). Every property access here is
     * therefore routed through the cached prototype getter; the form's
     * named-property getter cannot intercept those reads.
     *
     * @param root the subtree root to walk for attached shadow roots
     */
    const _sanitizeAttachedShadowRoots2 = function _sanitizeAttachedShadowRoots(root) {
      const nodeType = getNodeType ? getNodeType(root) : root.nodeType;
      if (nodeType === NODE_TYPE.element) {
        const sr = getShadowRoot ? getShadowRoot(root) : root.shadowRoot;
        // Realm-safe check (GHSA-hpcv-96wg-7vj8): use nodeType-based
        // detection rather than `instanceof DocumentFragment`, which is
        // realm-bound and silently skipped shadow roots whose host element
        // belonged to a foreign realm (e.g. iframe.contentDocument
        // attachShadow). A foreign-realm ShadowRoot extends the foreign
        // realm's DocumentFragment, not ours, so the old instanceof check
        // returned false and the shadow subtree was never walked.
        if (_isDocumentFragment(sr)) {
          // Recurse first so that nested shadow roots are reached even if
          // _sanitizeShadowDOM removes hosts at this level.
          _sanitizeAttachedShadowRoots2(sr);
          _sanitizeShadowDOM2(sr);
        }
      }
      // Snapshot children before recursing. Sanitization of one subtree
      // (e.g. via an uponSanitizeShadowNode hook) may detach siblings,
      // and naive nextSibling traversal would silently skip the rest of
      // the list once a node is detached.
      const childNodes = getChildNodes ? getChildNodes(root) : root.childNodes;
      if (!childNodes) {
        return;
      }
      const snapshot = [];
      arrayForEach(childNodes, child => {
        arrayPush(snapshot, child);
      });
      for (const child of snapshot) {
        _sanitizeAttachedShadowRoots2(child);
      }
    };
    // eslint-disable-next-line complexity
    DOMPurify.sanitize = function (dirty) {
      let cfg = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      let body = null;
      let importedNode = null;
      let currentNode = null;
      let returnNode = null;
      /* Make sure we have a string to sanitize.
        DO NOT return early, as this will return the wrong type if
        the user has requested a DOM object rather than a string */
      IS_EMPTY_INPUT = !dirty;
      if (IS_EMPTY_INPUT) {
        dirty = '<!-->';
      }
      /* Stringify, in case dirty is an object */
      if (typeof dirty !== 'string' && !_isNode(dirty)) {
        dirty = stringifyValue(dirty);
        if (typeof dirty !== 'string') {
          throw typeErrorCreate('dirty is not a string, aborting');
        }
      }
      /* Return dirty HTML if DOMPurify cannot run */
      if (!DOMPurify.isSupported) {
        return dirty;
      }
      /* Assign config vars */
      if (!SET_CONFIG) {
        _parseConfig(cfg);
      }
      /* Clean up removed elements */
      DOMPurify.removed = [];
      /* Check if dirty is correctly typed for IN_PLACE */
      if (typeof dirty === 'string') {
        IN_PLACE = false;
      }
      if (IN_PLACE) {
        /* Do some early pre-sanitization to avoid unsafe root nodes.
           Read nodeName through the cached prototype getter — a clobbering
           child named "nodeName" on the form root would otherwise shadow
           the property and let this check skip the root-allowlist
           validation entirely. */
        const nn = getNodeName ? getNodeName(dirty) : dirty.nodeName;
        if (typeof nn === 'string') {
          const tagName = transformCaseFunc(nn);
          if (!ALLOWED_TAGS[tagName] || FORBID_TAGS[tagName]) {
            throw typeErrorCreate('root node is forbidden and cannot be sanitized in-place');
          }
        }
        /* Pre-flight the root through _isClobbered. The iterator-driven
           removal path can not detach a parent-less root: _forceRemove
           falls through to Element.prototype.remove(), which per spec
           is a no-op on a node with no parent. A clobbered root would
           then survive the main loop with its attributes uninspected,
           because _sanitizeAttributes early-returns on _isClobbered. The
           result would be an attacker-controlled form, complete with any
           event-handler attributes the caller passed in, handed back to
           the application unsanitized. Refuse to sanitize such a root
           the same way we refuse a forbidden tag. GHSA-r47g-fvhr-h676. */
        if (_isClobbered(dirty)) {
          throw typeErrorCreate('root node is clobbered and cannot be sanitized in-place');
        }
        /* Sanitize attached shadow roots before the main iterator runs.
           The iterator does not descend into shadow trees. */
        _sanitizeAttachedShadowRoots2(dirty);
      } else if (_isNode(dirty)) {
        /* If dirty is a DOM element, append to an empty document to avoid
           elements being stripped by the parser */
        body = _initDocument('<!---->');
        importedNode = body.ownerDocument.importNode(dirty, true);
        if (importedNode.nodeType === NODE_TYPE.element && importedNode.nodeName === 'BODY') {
          /* Node is already a body, use as is */
          body = importedNode;
        } else if (importedNode.nodeName === 'HTML') {
          body = importedNode;
        } else {
          // eslint-disable-next-line unicorn/prefer-dom-node-append
          body.appendChild(importedNode);
        }
        /* Clonable shadow roots are deep-cloned by importNode(); sanitize
           them before the main iterator runs, since the iterator does not
           descend into shadow trees. The walk routes every read through a
           cached prototype getter so clobbering descendants on a form root
           cannot hide a shadow host from this pass. */
        _sanitizeAttachedShadowRoots2(importedNode);
      } else {
        /* Exit directly if we have nothing to do */
        if (!RETURN_DOM && !SAFE_FOR_TEMPLATES && !WHOLE_DOCUMENT &&
        // eslint-disable-next-line unicorn/prefer-includes
        dirty.indexOf('<') === -1) {
          return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(dirty) : dirty;
        }
        /* Initialize the document to work on */
        body = _initDocument(dirty);
        /* Check we have a DOM node from the data */
        if (!body) {
          return RETURN_DOM ? null : RETURN_TRUSTED_TYPE ? emptyHTML : '';
        }
      }
      /* Remove first element node (ours) if FORCE_BODY is set */
      if (body && FORCE_BODY) {
        _forceRemove(body.firstChild);
      }
      /* Get node iterator */
      const nodeIterator = _createNodeIterator(IN_PLACE ? dirty : body);
      /* Now start iterating over the created document */
      while (currentNode = nodeIterator.nextNode()) {
        /* Sanitize tags and elements */
        _sanitizeElements(currentNode);
        /* Check attributes next */
        _sanitizeAttributes(currentNode);
        /* Shadow DOM detected, sanitize it.
           Realm-safe check (GHSA-hpcv-96wg-7vj8): nodeType-based detection
           instead of instanceof, so foreign-realm <template>.content is
           walked correctly. */
        if (_isDocumentFragment(currentNode.content)) {
          _sanitizeShadowDOM2(currentNode.content);
        }
      }
      /* If we sanitized `dirty` in-place, return it. */
      if (IN_PLACE) {
        if (SAFE_FOR_TEMPLATES) {
          _scrubTemplateExpressions(dirty);
        }
        return dirty;
      }
      /* Return sanitized string or DOM */
      if (RETURN_DOM) {
        if (SAFE_FOR_TEMPLATES) {
          _scrubTemplateExpressions(body);
        }
        if (RETURN_DOM_FRAGMENT) {
          returnNode = createDocumentFragment.call(body.ownerDocument);
          while (body.firstChild) {
            // eslint-disable-next-line unicorn/prefer-dom-node-append
            returnNode.appendChild(body.firstChild);
          }
        } else {
          returnNode = body;
        }
        if (ALLOWED_ATTR.shadowroot || ALLOWED_ATTR.shadowrootmode) {
          /*
            AdoptNode() is not used because internal state is not reset
            (e.g. the past names map of a HTMLFormElement), this is safe
            in theory but we would rather not risk another attack vector.
            The state that is cloned by importNode() is explicitly defined
            by the specs.
          */
          returnNode = importNode.call(originalDocument, returnNode, true);
        }
        return returnNode;
      }
      let serializedHTML = WHOLE_DOCUMENT ? body.outerHTML : body.innerHTML;
      /* Serialize doctype if allowed */
      if (WHOLE_DOCUMENT && ALLOWED_TAGS['!doctype'] && body.ownerDocument && body.ownerDocument.doctype && body.ownerDocument.doctype.name && regExpTest(DOCTYPE_NAME, body.ownerDocument.doctype.name)) {
        serializedHTML = '<!DOCTYPE ' + body.ownerDocument.doctype.name + '>\n' + serializedHTML;
      }
      /* Sanitize final string template-safe */
      if (SAFE_FOR_TEMPLATES) {
        arrayForEach([MUSTACHE_EXPR$1, ERB_EXPR$1, TMPLIT_EXPR$1], expr => {
          serializedHTML = stringReplace(serializedHTML, expr, ' ');
        });
      }
      return trustedTypesPolicy && RETURN_TRUSTED_TYPE ? trustedTypesPolicy.createHTML(serializedHTML) : serializedHTML;
    };
    DOMPurify.setConfig = function () {
      let cfg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      _parseConfig(cfg);
      SET_CONFIG = true;
    };
    DOMPurify.clearConfig = function () {
      CONFIG = null;
      SET_CONFIG = false;
    };
    DOMPurify.isValidAttribute = function (tag, attr, value) {
      /* Initialize shared config vars if necessary. */
      if (!CONFIG) {
        _parseConfig({});
      }
      const lcTag = transformCaseFunc(tag);
      const lcName = transformCaseFunc(attr);
      return _isValidAttribute(lcTag, lcName, value);
    };
    DOMPurify.addHook = function (entryPoint, hookFunction) {
      if (typeof hookFunction !== 'function') {
        return;
      }
      arrayPush(hooks[entryPoint], hookFunction);
    };
    DOMPurify.removeHook = function (entryPoint, hookFunction) {
      if (hookFunction !== undefined) {
        const index = arrayLastIndexOf(hooks[entryPoint], hookFunction);
        return index === -1 ? undefined : arraySplice(hooks[entryPoint], index, 1)[0];
      }
      return arrayPop(hooks[entryPoint]);
    };
    DOMPurify.removeHooks = function (entryPoint) {
      hooks[entryPoint] = [];
    };
    DOMPurify.removeAllHooks = function () {
      hooks = _createHooksMap();
    };
    return DOMPurify;
  }
  var purify = createDOMPurify();

  /**
   * JSON Parser - Parse JSON to slides
   * @module parsers/json-parser
   */


  /**
   * JSON Parser class
   */
  class JsonParser {
    constructor(config) {
      this.config = config;
    }

    /**
     * Parse JSON slides
     * @param {HTMLElement} container - Container element
     * @returns {Promise<Array>} - Array of slide data
     */
    async parse(container) {
      let data = null;

      // Get JSON data
      if (this.config.data) {
        // Use provided data
        data = this.config.data;
      } else if (this.config.jsonUrl) {
        // Load from external file
        data = await this.loadJSON(this.config.jsonUrl);
      } else {
        // Try to parse from container
        const jsonText = container.textContent || container.innerText || '';
        try {
          data = JSON.parse(jsonText);
        } catch (error) {
          throw new Error('Invalid JSON content in container');
        }
      }

      // Validate data structure
      if (!data || !data.slides || !Array.isArray(data.slides)) {
        throw new Error('JSON data must have a "slides" array');
      }

      // Parse each slide
      const slides = data.slides.map((slideData, index) => this.parseSlide(slideData, index));
      return slides;
    }

    /**
     * Load JSON from URL
     * @param {string} url - JSON file URL
     * @returns {Promise<Object>} - JSON data
     */
    async loadJSON(url) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to load JSON: ".concat(response.statusText));
        }
        return await response.json();
      } catch (error) {
        console.error('Error loading JSON:', error);
        throw error;
      }
    }

    /**
     * Parse a single slide from JSON
     * @param {Object} slideData - Slide JSON data
     * @param {number} index - Slide index
     * @returns {Object} - Normalized slide data
     */
    parseSlide(slideData, index) {
      const normalized = {
        index,
        layout: slideData.layout || 'default',
        content: '',
        attributes: {}
      };

      // Copy basic properties
      if (slideData.background) {
        normalized.background = slideData.background;
      }
      if (slideData.overlay) {
        normalized.overlay = slideData.overlay;
      }

      // Parse content based on layout
      switch (normalized.layout) {
        case 'cover':
          normalized.content = this.buildCoverContent(slideData);
          break;
        case 'two-cols':
          normalized.left = this.buildContent(slideData.left);
          normalized.right = this.buildContent(slideData.right);
          normalized.content = "".concat(normalized.left, "::right::").concat(normalized.right);
          break;
        case 'three-cols':
          normalized.columns = [this.buildContent(slideData.col1), this.buildContent(slideData.col2), this.buildContent(slideData.col3)];
          normalized.content = normalized.columns.join('');
          break;
        case 'quote':
          normalized.quote = slideData.quote || slideData.content;
          normalized.author = slideData.author || '';
          normalized.content = this.buildQuoteContent(normalized);
          break;
        case 'image-right':
        case 'image-left':
          normalized.image = slideData.image;
          normalized.imageAlt = slideData.imageAlt || '';
          normalized.content = this.buildContent(slideData.content);
          break;
        case 'full-image':
          normalized.content = this.buildContent(slideData.content);
          break;
        default:
          normalized.content = this.buildContent(slideData.content);
          break;
      }

      // Copy any additional attributes
      Object.keys(slideData).forEach(key => {
        if (!['layout', 'content', 'background', 'overlay', 'left', 'right', 'col1', 'col2', 'col3', 'quote', 'author', 'image', 'imageAlt'].includes(key)) {
          normalized.attributes[key] = slideData[key];
        }
      });
      return normalized;
    }

    /**
     * Build cover content
     * @param {Object} slideData - Slide data
     * @returns {string} - HTML content
     */
    buildCoverContent(slideData) {
      let html = '';
      if (slideData.title) {
        html += "<h1>".concat(this.sanitizeHTML(slideData.title), "</h1>");
      }
      if (slideData.subtitle) {
        html += "<h2>".concat(this.sanitizeHTML(slideData.subtitle), "</h2>");
      }
      if (slideData.content) {
        html += this.buildContent(slideData.content);
      }
      return html;
    }

    /**
     * Build quote content
     * @param {Object} normalized - Normalized slide data
     * @returns {string} - HTML content
     */
    buildQuoteContent(normalized) {
      let html = "<blockquote>".concat(this.sanitizeHTML(normalized.quote), "</blockquote>");
      if (normalized.author) {
        html += "<cite>".concat(this.sanitizeHTML(normalized.author), "</cite>");
      }
      return html;
    }

    /**
     * Build content from various input types
     * @param {*} content - Content (string, array, object)
     * @returns {string} - HTML content
     */
    buildContent(content) {
      if (!content) return '';
      if (typeof content === 'string') {
        return this.sanitizeHTML(content);
      }
      if (Array.isArray(content)) {
        // Array of strings/objects
        return content.map(item => this.buildContentItem(item)).join('');
      }
      if (typeof content === 'object') {
        return this.buildContentItem(content);
      }
      return '';
    }

    /**
     * Build content item from object
     * @param {Object|string} item - Content item
     * @returns {string} - HTML content
     */
    buildContentItem(item) {
      if (typeof item === 'string') {
        return "<p>".concat(this.sanitizeHTML(item), "</p>");
      }
      if (item.type === 'heading') {
        const level = item.level || 2;
        return "<h".concat(level, ">").concat(this.sanitizeHTML(item.text), "</h").concat(level, ">");
      }
      if (item.type === 'paragraph') {
        return "<p>".concat(this.sanitizeHTML(item.text), "</p>");
      }
      if (item.type === 'list') {
        const tag = item.ordered ? 'ol' : 'ul';
        const items = (item.items || []).map(li => "<li>".concat(this.sanitizeHTML(li), "</li>")).join('');
        return "<".concat(tag, ">").concat(items, "</").concat(tag, ">");
      }
      if (item.type === 'code') {
        const lang = item.language || '';
        return "<pre><code class=\"language-".concat(lang, "\">").concat(this.escapeHTML(item.code), "</code></pre>");
      }
      if (item.type === 'image') {
        const alt = this.escapeHTML(item.alt || '');
        return "<img src=\"".concat(this.escapeHTML(item.src), "\" alt=\"").concat(alt, "\">");
      }
      if (item.type === 'video') {
        const controls = item.controls ? 'controls' : '';
        const autoplay = item.autoplay ? 'autoplay' : '';
        return "<video src=\"".concat(this.escapeHTML(item.src), "\" ").concat(controls, " ").concat(autoplay, "></video>");
      }
      if (item.type === 'table') {
        return this.buildTable(item);
      }
      return '';
    }

    /**
     * Build table HTML
     * @param {Object} tableData - Table data
     * @returns {string} - HTML table
     */
    buildTable(tableData) {
      let html = '<table>';
      if (tableData.headers) {
        html += '<thead><tr>';
        tableData.headers.forEach(header => {
          html += "<th>".concat(this.sanitizeHTML(header), "</th>");
        });
        html += '</tr></thead>';
      }
      if (tableData.rows) {
        html += '<tbody>';
        tableData.rows.forEach(row => {
          html += '<tr>';
          row.forEach(cell => {
            html += "<td>".concat(this.sanitizeHTML(cell), "</td>");
          });
          html += '</tr>';
        });
        html += '</tbody>';
      }
      html += '</table>';
      return html;
    }

    /**
     * Escape HTML special characters
     * @param {string} text - Text to escape
     * @returns {string} - Escaped text
     */
    escapeHTML(text) {
      if (typeof text !== 'string') return '';
      const div = document.createElement('div');
      div.textContent = text;
      return div.innerHTML;
    }

    /**
     * Sanitize HTML securely using DOMPurify
     * @param {string} text - HTML string to sanitize
     * @returns {string} - Sanitized HTML string
     */
    sanitizeHTML(text) {
      if (typeof text !== 'string') return '';
      return purify.sanitize(text);
    }
  }

  /**
   * Parser - Content parser factory
   * @module core/parser
   */


  /**
   * Parser factory class
   */
  class Parser {
    constructor(config) {
      this.config = config;
    }

    /**
     * Parse content based on source type
     * @param {string} source - Source type ('html', 'markdown', 'json')
     * @param {HTMLElement} container - Container element
     * @returns {Promise<Array>} - Array of slide data
     */
    async parse(source, container) {
      let parser;
      switch (source) {
        case 'html':
          parser = new HtmlParser(this.config);
          return parser.parse(container);
        case 'markdown':
          parser = new MarkdownParser(this.config);
          return parser.parse(container);
        case 'json':
          parser = new JsonParser(this.config);
          return parser.parse(container);
        default:
          throw new Error("Unknown source type: ".concat(source));
      }
    }
  }

  /**
   * Default Layout - Single column content
   * @module layouts/default
   */

  const defaultLayout = {
    /**
     * Render default layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-default';
      content.innerHTML = slideData.content;
      return content;
    }
  };

  /**
   * Cover Layout - Full-screen title slide
   * @module layouts/cover
   */

  const coverLayout = {
    /**
     * Render cover layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-cover';
      content.innerHTML = slideData.content;
      return content;
    }
  };

  /**
   * Center Layout - Centered content
   * @module layouts/center
   */

  const centerLayout = {
    /**
     * Render center layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-center';
      content.innerHTML = slideData.content;
      return content;
    }
  };

  /**
   * Two Columns Layout - Split left/right content
   * @module layouts/two-cols
   */

  const twoColsLayout = {
    /**
     * Render two columns layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-two-cols';

      // Check if content has columns array (from data-swd-column attributes)
      if (slideData.columns && Array.isArray(slideData.columns) && slideData.columns.length >= 2) {
        const [leftContent, rightContent] = slideData.columns;
        const leftCol = document.createElement('div');
        leftCol.className = 'swd-col swd-col-left';
        leftCol.innerHTML = leftContent;
        const rightCol = document.createElement('div');
        rightCol.className = 'swd-col swd-col-right';
        rightCol.innerHTML = rightContent;
        content.appendChild(leftCol);
        content.appendChild(rightCol);
      } else if (slideData.left && slideData.right) {
        // Check if content has left/right data
        const leftCol = document.createElement('div');
        leftCol.className = 'swd-col swd-col-left';
        leftCol.innerHTML = slideData.left;
        const rightCol = document.createElement('div');
        rightCol.className = 'swd-col swd-col-right';
        rightCol.innerHTML = slideData.right;
        content.appendChild(leftCol);
        content.appendChild(rightCol);
      } else {
        // Parse content for ::right:: marker
        const contentStr = slideData.content || '';
        const parts = contentStr.split('::right::');
        const leftCol = document.createElement('div');
        leftCol.className = 'swd-col swd-col-left';
        leftCol.innerHTML = parts[0] || '';
        const rightCol = document.createElement('div');
        rightCol.className = 'swd-col swd-col-right';
        rightCol.innerHTML = parts[1] || '';
        content.appendChild(leftCol);
        content.appendChild(rightCol);
      }
      return content;
    }
  };

  /**
   * Three Columns Layout - Three equal columns
   * @module layouts/three-cols
   */

  const threeColsLayout = {
    /**
     * Render three columns layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-three-cols';

      // Check if content has columns array
      if (slideData.columns && Array.isArray(slideData.columns)) {
        slideData.columns.forEach((colContent, index) => {
          const col = document.createElement('div');
          col.className = "swd-col swd-col-".concat(index + 1);
          col.innerHTML = colContent;
          content.appendChild(col);
        });
      } else {
        // Parse content for ::col-N:: markers
        const contentStr = slideData.content || '';
        const parts = contentStr.split(/::col-[123]::/);

        // Create three columns
        for (let i = 0; i < 3; i += 1) {
          const col = document.createElement('div');
          col.className = "swd-col swd-col-".concat(i + 1);
          col.innerHTML = parts[i + 1] || '';
          content.appendChild(col);
        }
      }
      return content;
    }
  };

  /**
   * Quote Layout - Large quote display
   * @module layouts/quote
   */

  const quoteLayout = {
    /**
     * Render quote layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-quote';

      // Check if quote and author are provided separately
      if (slideData.quote) {
        const blockquote = document.createElement('blockquote');
        blockquote.className = 'swd-quote-text';
        blockquote.textContent = slideData.quote;
        content.appendChild(blockquote);
        if (slideData.author) {
          const cite = document.createElement('cite');
          cite.className = 'swd-quote-author';
          cite.textContent = "\u2014 ".concat(slideData.author);
          content.appendChild(cite);
        }
      } else {
        // Use full content
        content.innerHTML = slideData.content;
      }
      return content;
    }
  };

  /**
   * Section Layout - Section divider slide
   * @module layouts/section
   */

  const sectionLayout = {
    /**
     * Render section layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-section';
      content.innerHTML = slideData.content;
      return content;
    }
  };

  /**
   * Image Right Layout - Content left, image right
   * @module layouts/image-right
   */

  const imageRightLayout = {
    /**
     * Render image-right layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-image-right';
      const textCol = document.createElement('div');
      textCol.className = 'swd-col swd-col-text';
      const imageCol = document.createElement('div');
      imageCol.className = 'swd-col swd-col-image';

      // Check if image and text are provided separately
      if (slideData.image) {
        textCol.innerHTML = slideData.content || '';
        const img = document.createElement('img');
        img.src = slideData.image;
        img.alt = slideData.imageAlt || '';
        imageCol.appendChild(img);
      } else {
        // Parse content for image tag
        const contentStr = slideData.content || '';
        const imgMatch = contentStr.match(/<img[^>]+>/);
        if (imgMatch) {
          const [imgTag] = imgMatch;
          const textContent = contentStr.replace(imgTag, '');
          textCol.innerHTML = textContent;
          imageCol.innerHTML = imgTag;
        } else {
          textCol.innerHTML = contentStr;
        }
      }
      content.appendChild(textCol);
      content.appendChild(imageCol);
      return content;
    }
  };

  /**
   * Image Left Layout - Image left, content right
   * @module layouts/image-left
   */

  const imageLeftLayout = {
    /**
     * Render image-left layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-image-left';
      const imageCol = document.createElement('div');
      imageCol.className = 'swd-col swd-col-image';
      const textCol = document.createElement('div');
      textCol.className = 'swd-col swd-col-text';

      // Check if image and text are provided separately
      if (slideData.image) {
        const img = document.createElement('img');
        img.src = slideData.image;
        img.alt = slideData.imageAlt || '';
        imageCol.appendChild(img);
        textCol.innerHTML = slideData.content || '';
      } else {
        // Parse content for image tag
        const contentStr = slideData.content || '';
        const imgMatch = contentStr.match(/<img[^>]+>/);
        if (imgMatch) {
          const [imgTag] = imgMatch;
          imageCol.innerHTML = imgTag;
          const textContent = contentStr.replace(imgTag, '');
          textCol.innerHTML = textContent;
        } else {
          textCol.innerHTML = contentStr;
        }
      }
      content.appendChild(imageCol);
      content.appendChild(textCol);
      return content;
    }
  };

  /**
   * Full Image Layout - Full-screen image with optional overlay text
   * @module layouts/full-image
   */

  const fullImageLayout = {
    /**
     * Render full-image layout
     * @param {Object} slideData - Slide data
     * @returns {HTMLElement} - Rendered content
     */
    render(slideData) {
      const content = document.createElement('div');
      content.className = 'swd-slide-content swd-layout-full-image';

      // Add overlay text if provided
      if (slideData.content && slideData.content.trim()) {
        const overlay = document.createElement('div');
        overlay.className = 'swd-image-overlay-text';
        overlay.innerHTML = slideData.content;
        content.appendChild(overlay);
      }
      return content;
    }
  };

  /**
   * Layouts Index - Export all layouts
   * @module layouts
   */

  var layouts = {
    default: defaultLayout,
    cover: coverLayout,
    center: centerLayout,
    'two-cols': twoColsLayout,
    'three-cols': threeColsLayout,
    quote: quoteLayout,
    section: sectionLayout,
    'image-right': imageRightLayout,
    'image-left': imageLeftLayout,
    'full-image': fullImageLayout
  };

  /**
   * Renderer class - converts slide data to DOM
   */
  class Renderer {
    constructor(config) {
      this.config = config;
    }

    /**
     * Render all slides
     * @param {HTMLElement} container - Container element
     * @param {Array} slides - Array of slide data
     */
    render(container, slides) {
      // Clear container
      container.innerHTML = '';

      // Create slide wrapper
      const wrapper = document.createElement('div');
      wrapper.className = 'swd-wrapper';

      // Set RTL if configured
      if (this.config.rtl) {
        wrapper.setAttribute('dir', 'rtl');
        wrapper.classList.add('swd-rtl');
      }

      // Create slides container
      const slidesContainer = document.createElement('div');
      slidesContainer.className = 'swd-slides';

      // Render each slide
      slides.forEach((slideData, index) => {
        const slideElement = this.renderSlide(slideData, index);
        slidesContainer.appendChild(slideElement);
      });
      wrapper.appendChild(slidesContainer);
      container.appendChild(wrapper);

      // Apply theme
      container.classList.add("swd-theme-".concat(this.config.theme));
    }

    /**
     * Render a single slide
     * @param {Object} slideData - Slide data
     * @param {number} index - Slide index
     * @returns {HTMLElement} - Rendered slide element
     */
    renderSlide(slideData, index) {
      const slide = document.createElement('div');
      slide.className = 'swd-slide';
      slide.setAttribute('data-index', index);
      slide.setAttribute('data-layout', slideData.layout || 'default');

      // Add initial state classes
      if (index === 0) {
        slide.classList.add('swd-slide-active', 'active');
      } else {
        slide.classList.add('swd-slide-hidden', 'future');
      }

      // Apply background
      if (slideData.background) {
        const bg = document.createElement('div');
        bg.className = 'swd-slide-background';

        // Check if background is a URL or CSS value (gradient, color, etc.)
        if (slideData.background.match(/^(https?:\/\/|\.\/|\.\.\/|\/)/)) {
          // It's a URL, use backgroundImage
          bg.style.backgroundImage = "url(".concat(slideData.background, ")");
        } else {
          // It's a CSS value (gradient, color, etc.), use background
          bg.style.background = slideData.background;
        }
        slide.appendChild(bg);
      }

      // Get layout renderer
      const layoutName = slideData.layout || 'default';
      const layoutRenderer = layouts[layoutName];
      if (!layoutRenderer) {
        throw new Error("Unknown layout: ".concat(layoutName));
      }

      // Render layout content
      const content = layoutRenderer.render(slideData);
      slide.appendChild(content);
      return slide;
    }

    /**
     * Cleanup renderer
     */
    destroy() {
      // Cleanup code will be added as needed
    }
  }

  /**
   * Keyboard Handler - Keyboard event management
   * @module utils/keyboard
   */

  /**
   * Default keyboard shortcuts
   */
  const defaultShortcuts = {
    ArrowRight: 'next',
    ArrowDown: 'next',
    ArrowLeft: 'prev',
    ArrowUp: 'prev',
    Space: 'next',
    ' ': 'next',
    PageDown: 'next',
    PageUp: 'prev',
    Home: 'first',
    End: 'last',
    f: 'fullscreen',
    F: 'fullscreen',
    o: 'overview',
    O: 'overview',
    p: 'pause',
    P: 'pause',
    Escape: 'escape'
  };

  /**
   * Keyboard Handler class
   */
  class KeyboardHandler {
    constructor(presentation) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.presentation = presentation;
      this.config = config;
      this.enabled = true;
      this.shortcuts = _objectSpread2(_objectSpread2({}, defaultShortcuts), config.keyboardShortcuts);
      this.boundHandleKeydown = this.handleKeydown.bind(this);
    }

    /**
     * Initialize keyboard handler
     */
    init() {
      if (this.config.keyboard !== false) {
        document.addEventListener('keydown', this.boundHandleKeydown);
      }
    }

    /**
     * Handle keydown events
     * @param {KeyboardEvent} event - Keyboard event
     */
    handleKeydown(event) {
      if (!this.enabled) return;

      // Skip if user is typing in an input field
      if (this.isTypingContext(event.target)) {
        return;
      }
      const key = this.getKeyIdentifier(event);
      const action = this.shortcuts[key];
      if (action) {
        event.preventDefault();
        this.executeAction(action, event);
      }
    }

    /**
     * Check if target is an input context
     * @param {HTMLElement} target - Event target
     * @returns {boolean} - True if typing context
     */
    isTypingContext(target) {
      if (!target || !target.tagName) return false;
      const tagName = target.tagName.toLowerCase();
      return tagName === 'input' || tagName === 'textarea' || tagName === 'select' || target.isContentEditable;
    }

    /**
     * Get key identifier from event
     * @param {KeyboardEvent} event - Keyboard event
     * @returns {string} - Key identifier
     */
    getKeyIdentifier(event) {
      // Handle special keys with modifiers
      if (event.shiftKey && event.key !== 'Shift') {
        return "Shift+".concat(event.key);
      }
      if (event.ctrlKey && event.key !== 'Control') {
        return "Ctrl+".concat(event.key);
      }
      if (event.altKey && event.key !== 'Alt') {
        return "Alt+".concat(event.key);
      }
      if (event.metaKey && event.key !== 'Meta') {
        return "Meta+".concat(event.key);
      }
      return event.key;
    }

    /**
     * Execute keyboard action
     * @param {string} action - Action name
     * @param {KeyboardEvent} event - Keyboard event
     */
    executeAction(action, event) {
      switch (action) {
        case 'next':
          this.presentation.next();
          break;
        case 'prev':
          this.presentation.prev();
          break;
        case 'first':
          this.presentation.goToFirst();
          break;
        case 'last':
          this.presentation.goToLast();
          break;
        case 'fullscreen':
          this.presentation.toggleFullscreen();
          break;
        case 'overview':
          this.presentation.toggleOverview();
          break;
        case 'pause':
          if (this.presentation.state.isPlaying) {
            this.presentation.stop();
          } else {
            this.presentation.start();
          }
          break;
        case 'escape':
          // Handle escape key
          if (this.presentation.state.isFullscreen) {
            this.presentation.toggleFullscreen();
          } else if (this.presentation.state.isOverview) {
            this.presentation.toggleOverview();
          }
          break;
        default:
          // Custom action
          this.presentation.emit('keyboardAction', {
            action,
            event
          });
          break;
      }
    }

    /**
     * Add custom keyboard shortcut
     * @param {string} key - Key identifier
     * @param {string} action - Action name
     */
    addShortcut(key, action) {
      this.shortcuts[key] = action;
    }

    /**
     * Remove keyboard shortcut
     * @param {string} key - Key identifier
     */
    removeShortcut(key) {
      delete this.shortcuts[key];
    }

    /**
     * Enable keyboard handler
     */
    enable() {
      this.enabled = true;
    }

    /**
     * Disable keyboard handler
     */
    disable() {
      this.enabled = false;
    }

    /**
     * Destroy keyboard handler
     */
    destroy() {
      document.removeEventListener('keydown', this.boundHandleKeydown);
    }
  }

  var es_array_sort = {};

  var deletePropertyOrThrow;
  var hasRequiredDeletePropertyOrThrow;

  function requireDeletePropertyOrThrow () {
  	if (hasRequiredDeletePropertyOrThrow) return deletePropertyOrThrow;
  	hasRequiredDeletePropertyOrThrow = 1;
  	var tryToString = requireTryToString();

  	var $TypeError = TypeError;

  	deletePropertyOrThrow = function (O, P) {
  	  if (!delete O[P]) throw new $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
  	};
  	return deletePropertyOrThrow;
  }

  var arraySlice;
  var hasRequiredArraySlice;

  function requireArraySlice () {
  	if (hasRequiredArraySlice) return arraySlice;
  	hasRequiredArraySlice = 1;
  	var uncurryThis = requireFunctionUncurryThis();

  	arraySlice = uncurryThis([].slice);
  	return arraySlice;
  }

  var arraySort;
  var hasRequiredArraySort;

  function requireArraySort () {
  	if (hasRequiredArraySort) return arraySort;
  	hasRequiredArraySort = 1;
  	var arraySlice = requireArraySlice();

  	var floor = Math.floor;

  	var sort = function (array, comparefn) {
  	  var length = array.length;

  	  if (length < 8) {
  	    // insertion sort
  	    var i = 1;
  	    var element, j;

  	    while (i < length) {
  	      j = i;
  	      element = array[i];
  	      while (j && comparefn(array[j - 1], element) > 0) {
  	        array[j] = array[--j];
  	      }
  	      if (j !== i++) array[j] = element;
  	    }
  	  } else {
  	    // merge sort
  	    var middle = floor(length / 2);
  	    var left = sort(arraySlice(array, 0, middle), comparefn);
  	    var right = sort(arraySlice(array, middle), comparefn);
  	    var llength = left.length;
  	    var rlength = right.length;
  	    var lindex = 0;
  	    var rindex = 0;

  	    while (lindex < llength || rindex < rlength) {
  	      array[lindex + rindex] = (lindex < llength && rindex < rlength)
  	        ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
  	        : lindex < llength ? left[lindex++] : right[rindex++];
  	    }
  	  }

  	  return array;
  	};

  	arraySort = sort;
  	return arraySort;
  }

  var arrayMethodIsStrict;
  var hasRequiredArrayMethodIsStrict;

  function requireArrayMethodIsStrict () {
  	if (hasRequiredArrayMethodIsStrict) return arrayMethodIsStrict;
  	hasRequiredArrayMethodIsStrict = 1;
  	var fails = requireFails();

  	arrayMethodIsStrict = function (METHOD_NAME, argument) {
  	  var method = [][METHOD_NAME];
  	  return !!method && fails(function () {
  	    // eslint-disable-next-line no-useless-call -- required for testing
  	    method.call(null, argument || function () { return 1; }, 1);
  	  });
  	};
  	return arrayMethodIsStrict;
  }

  var environmentFfVersion;
  var hasRequiredEnvironmentFfVersion;

  function requireEnvironmentFfVersion () {
  	if (hasRequiredEnvironmentFfVersion) return environmentFfVersion;
  	hasRequiredEnvironmentFfVersion = 1;
  	var userAgent = requireEnvironmentUserAgent();

  	var firefox = userAgent.match(/firefox\/(\d+)/i);

  	environmentFfVersion = !!firefox && +firefox[1];
  	return environmentFfVersion;
  }

  var environmentIsIeOrEdge;
  var hasRequiredEnvironmentIsIeOrEdge;

  function requireEnvironmentIsIeOrEdge () {
  	if (hasRequiredEnvironmentIsIeOrEdge) return environmentIsIeOrEdge;
  	hasRequiredEnvironmentIsIeOrEdge = 1;
  	var UA = requireEnvironmentUserAgent();

  	environmentIsIeOrEdge = /MSIE|Trident/.test(UA);
  	return environmentIsIeOrEdge;
  }

  var environmentWebkitVersion;
  var hasRequiredEnvironmentWebkitVersion;

  function requireEnvironmentWebkitVersion () {
  	if (hasRequiredEnvironmentWebkitVersion) return environmentWebkitVersion;
  	hasRequiredEnvironmentWebkitVersion = 1;
  	var userAgent = requireEnvironmentUserAgent();

  	var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

  	environmentWebkitVersion = !!webkit && +webkit[1];
  	return environmentWebkitVersion;
  }

  var hasRequiredEs_array_sort;

  function requireEs_array_sort () {
  	if (hasRequiredEs_array_sort) return es_array_sort;
  	hasRequiredEs_array_sort = 1;
  	var $ = require_export();
  	var uncurryThis = requireFunctionUncurryThis();
  	var aCallable = requireACallable();
  	var toObject = requireToObject();
  	var lengthOfArrayLike = requireLengthOfArrayLike();
  	var deletePropertyOrThrow = requireDeletePropertyOrThrow();
  	var toString = requireToString();
  	var fails = requireFails();
  	var internalSort = requireArraySort();
  	var arrayMethodIsStrict = requireArrayMethodIsStrict();
  	var FF = requireEnvironmentFfVersion();
  	var IE_OR_EDGE = requireEnvironmentIsIeOrEdge();
  	var V8 = requireEnvironmentV8Version();
  	var WEBKIT = requireEnvironmentWebkitVersion();

  	var test = [];
  	var nativeSort = uncurryThis(test.sort);
  	var push = uncurryThis(test.push);

  	// IE8-
  	var FAILS_ON_UNDEFINED = fails(function () {
  	  test.sort(undefined);
  	});
  	// V8 bug
  	var FAILS_ON_NULL = fails(function () {
  	  test.sort(null);
  	});
  	// Old WebKit
  	var STRICT_METHOD = arrayMethodIsStrict('sort');

  	var STABLE_SORT = !fails(function () {
  	  // feature detection can be too slow, so check engines versions
  	  if (V8) return V8 < 70;
  	  if (FF && FF > 3) return;
  	  if (IE_OR_EDGE) return true;
  	  if (WEBKIT) return WEBKIT < 603;

  	  var result = '';
  	  var code, chr, value, index;

  	  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  	  for (code = 65; code < 76; code++) {
  	    chr = String.fromCharCode(code);

  	    switch (code) {
  	      case 66: case 69: case 70: case 72: value = 3; break;
  	      case 68: case 71: value = 4; break;
  	      default: value = 2;
  	    }

  	    for (index = 0; index < 47; index++) {
  	      test.push({ k: chr + index, v: value });
  	    }
  	  }

  	  test.sort(function (a, b) { return b.v - a.v; });

  	  for (index = 0; index < test.length; index++) {
  	    chr = test[index].k.charAt(0);
  	    if (result.charAt(result.length - 1) !== chr) result += chr;
  	  }

  	  return result !== 'DGBEFHACIJK';
  	});

  	var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

  	var getSortCompare = function (comparefn) {
  	  return function (x, y) {
  	    if (y === undefined) return -1;
  	    if (x === undefined) return 1;
  	    if (comparefn !== undefined) return +comparefn(x, y) || 0;
  	    return toString(x) > toString(y) ? 1 : -1;
  	  };
  	};

  	// `Array.prototype.sort` method
  	// https://tc39.es/ecma262/#sec-array.prototype.sort
  	$({ target: 'Array', proto: true, forced: FORCED }, {
  	  sort: function sort(comparefn) {
  	    if (comparefn !== undefined) aCallable(comparefn);

  	    var array = toObject(this);

  	    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

  	    var items = [];
  	    var arrayLength = lengthOfArrayLike(array);
  	    var itemsLength, index;

  	    for (index = 0; index < arrayLength; index++) {
  	      if (index in array) push(items, array[index]);
  	    }

  	    internalSort(items, getSortCompare(comparefn));

  	    itemsLength = lengthOfArrayLike(items);
  	    index = 0;

  	    while (index < itemsLength) array[index] = items[index++];
  	    while (index < arrayLength) deletePropertyOrThrow(array, index++);

  	    return array;
  	  }
  	});
  	return es_array_sort;
  }

  requireEs_array_sort();

  /**
   * Fragments - Sequential slide animations
   * @module utils/fragments
   */
  class Fragments {
    constructor(presentation) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.presentation = presentation;
      this.config = config;
    }

    /**
     * Get sorted fragments of the slide
     * @param {HTMLElement} slideElement
     * @param {boolean} [visibleState] - If true, filter by visible fragments. If false, filter by invisible fragments. If undefined, return all.
     * @returns {Array<HTMLElement>}
     */
    getSortedFragments(slideElement, visibleState) {
      if (!slideElement) return [];
      const fragments = Array.from(slideElement.querySelectorAll('.fragment'));

      // Process fragments with DOM indexes and custom fragment-index attributes
      const mapped = fragments.map((el, domIndex) => {
        const attr = el.getAttribute('data-fragment-index');
        const hasAttr = attr !== null && attr !== '';
        const index = hasAttr ? parseInt(attr, 10) : null;
        return {
          el,
          domIndex,
          index,
          hasAttr
        };
      });

      // Assign sequential indexes to fragments without an explicit index
      let currentIndex = 0;
      mapped.forEach(item => {
        if (!item.hasAttr) {
          item.index = currentIndex++;
        }
      });

      // Sort by calculated fragment index, and use DOM index as a tie breaker
      mapped.sort((a, b) => {
        if (a.index !== b.index) {
          return a.index - b.index;
        }
        return a.domIndex - b.domIndex;
      });

      // Extract elements
      const sortedElements = mapped.map(item => item.el);

      // Filter by visible status if specified
      if (visibleState === true) {
        return sortedElements.filter(el => el.classList.contains('visible'));
      } else if (visibleState === false) {
        return sortedElements.filter(el => !el.classList.contains('visible'));
      }
      return sortedElements;
    }

    /**
     * Get all fragment elements in the active slide
     * @param {HTMLElement} slideElement - Current slide element
     * @returns {Array<HTMLElement>}
     */
    getFragments(slideElement) {
      return this.getSortedFragments(slideElement);
    }

    /**
     * Get all active (already shown) fragments in the active slide
     * @param {HTMLElement} slideElement - Current slide element
     * @returns {Array<HTMLElement>}
     */
    getActiveFragments(slideElement) {
      return this.getSortedFragments(slideElement, true);
    }

    /**
     * Get all inactive (hidden) fragments in the active slide
     * @param {HTMLElement} slideElement - Current slide element
     * @returns {Array<HTMLElement>}
     */
    getInactiveFragments(slideElement) {
      return this.getSortedFragments(slideElement, false);
    }

    /**
     * Advance one fragment in the active slide
     * @param {HTMLElement} slideElement - Current slide element
     * @returns {boolean} - True if a fragment was revealed, false if no more fragments
     */
    next(slideElement) {
      if (this.config.fragments === false) return false;
      const inactive = this.getSortedFragments(slideElement, false);
      if (inactive.length === 0) return false;
      const nextFragment = inactive[0];
      nextFragment.classList.add('visible');

      // Apply styling based on config style or element attribute
      const style = nextFragment.getAttribute('data-fragment-style') || this.config.fragmentStyle || 'fade-in';
      nextFragment.classList.add(style);
      this.presentation.emit('fragmentShown', {
        fragment: nextFragment
      });
      return true;
    }

    /**
     * Hide one fragment in the active slide (backwards navigation)
     * @param {HTMLElement} slideElement - Current slide element
     * @returns {boolean} - True if a fragment was hidden, false if no more active fragments
     */
    prev(slideElement) {
      if (this.config.fragments === false) return false;
      const active = this.getSortedFragments(slideElement, true);
      if (active.length === 0) return false;
      const lastFragment = active[active.length - 1];
      lastFragment.classList.remove('visible');
      const style = lastFragment.getAttribute('data-fragment-style') || this.config.fragmentStyle || 'fade-in';
      lastFragment.classList.remove(style);
      this.presentation.emit('fragmentHidden', {
        fragment: lastFragment
      });
      return true;
    }
  }

  /**
   * Navigation controller class
   */
  class Navigation {
    constructor(presentation, config) {
      this.presentation = presentation;
      this.config = config;
      this.autoPlayInterval = null;
      this.keyboardHandler = null;
      this.isPausedByHover = false;
      this.boundHashChange = null;
      this.boundMouseEnter = null;
      this.boundMouseLeave = null;
      this.fragments = null;
      this.boundWheel = null;
      this.ariaLiveElement = null;
    }

    /**
     * Initialize navigation
     */
    init() {
      // Setup keyboard navigation
      if (this.config.keyboard) {
        this.keyboardHandler = new KeyboardHandler(this.presentation, this.config);
        this.keyboardHandler.init();
      }

      // Setup touch navigation
      if (this.config.touch) {
        this.setupTouch();
      }

      // Setup Fragments
      this.fragments = new Fragments(this.presentation, this.config);

      // Setup Accessibility announcements
      if (this.config.a11y && this.config.a11y.enabled !== false) {
        this.setupA11y();
      }

      // Setup Mouse Wheel scroll
      if (this.config.mouseWheel) {
        this.setupMouseWheel();
      }

      // Setup URL Hash navigation
      if (this.config.hash !== false) {
        this.setupHash();
      }

      // Show first slide
      if (this.presentation.getCurrentSlide() === 0 && window.location.hash) {
        this.readHash();
      } else {
        this.updateSlideDisplay(0);
      }

      // Start auto-play if configured
      if (this.config.autoSlide > 0) {
        this.startAutoPlay();

        // Setup hover pause
        if (this.config.autoSlideStoppable !== false) {
          this.setupHoverPause();
        }
      }
    }

    /**
     * Navigate to next slide
     */
    next() {
      const {
        currentSlide
      } = this.presentation.state;
      const {
        slides
      } = this.presentation.state;
      const slideElements = this.presentation.container.querySelectorAll('.swd-slide');
      const activeSlideElement = slideElements[currentSlide];

      // Check if we can advance within slide fragments
      if (this.fragments && this.fragments.next(activeSlideElement)) {
        return;
      }
      if (currentSlide < slides.length - 1) {
        this.goTo(currentSlide + 1);
      } else if (this.config.loop) {
        this.goTo(0);
      }
    }

    /**
     * Navigate to previous slide
     */
    prev() {
      const {
        currentSlide
      } = this.presentation.state;
      const {
        slides
      } = this.presentation.state;
      const slideElements = this.presentation.container.querySelectorAll('.swd-slide');
      const activeSlideElement = slideElements[currentSlide];

      // Check if we can revert slide fragments
      if (this.fragments && this.fragments.prev(activeSlideElement)) {
        return;
      }
      if (currentSlide > 0) {
        this.goTo(currentSlide - 1);
      } else if (this.config.loop) {
        this.goTo(slides.length - 1);
      }
    }

    /**
     * Go to specific slide
     * @param {number} index - Slide index
     */
    async goTo(index) {
      const {
        slides,
        currentSlide
      } = this.presentation.state;

      // Validate index
      if (index < 0 || index >= slides.length) {
        return;
      }
      if (index === currentSlide) {
        return;
      }

      // Don't navigate if currently transitioning
      if (this.presentation.transitions && this.presentation.transitions.isActive()) {
        return;
      }

      // Emit before change event
      this.presentation.emit('beforeSlideChange', {
        from: currentSlide,
        to: index
      });

      // Update state
      const previousSlide = currentSlide;
      this.presentation.state.currentSlide = index;

      // Update DOM with transitions
      await this.updateSlideDisplay(index, previousSlide);

      // Emit after change event
      this.presentation.emit('afterSlideChange', {
        from: previousSlide,
        to: index
      });
    }

    /**
     * Update slide display
     * @param {number} index - Current slide index
     * @param {number} previousIndex - Previous slide index
     */
    async updateSlideDisplay(index) {
      let previousIndex = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
      const slides = this.presentation.container.querySelectorAll('.swd-slide');
      if (slides.length === 0) return;
      const oldSlide = previousIndex >= 0 ? slides[previousIndex] : null;
      const newSlide = slides[index];
      const direction = index > previousIndex ? 'forward' : 'backward';

      // Apply transition if available
      if (this.presentation.transitions && oldSlide) {
        await this.presentation.transitions.applyTransition(oldSlide, newSlide, direction);
      } else {
        // Fallback: simple class toggle without transition
        slides.forEach((slide, i) => {
          if (i === index) {
            slide.classList.add('swd-slide-active');
            slide.classList.remove('swd-slide-hidden');
          } else {
            slide.classList.remove('swd-slide-active');
            slide.classList.add('swd-slide-hidden');
          }
        });
      }

      // Update past/future classes
      slides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
          slide.classList.remove('past', 'future');
        } else if (i < index) {
          slide.classList.add('past');
          slide.classList.remove('active', 'future');
        } else {
          slide.classList.add('future');
          slide.classList.remove('active', 'past');
        }
      });
    }

    /**
     * Setup keyboard navigation
     */
    setupKeyboard() {
      // Keyboard handling is now done by KeyboardHandler utility
      // This method is kept for backwards compatibility
    }

    /**
     * Setup touch navigation
     */
    setupTouch() {
      // Touch navigation will be implemented in touch utility
    }

    /**
     * Start auto-play
     */
    startAutoPlay() {
      if (this.config.autoSlide <= 0) return;
      this.stopAutoPlay();
      this.autoPlayInterval = setInterval(() => {
        this.next();
      }, this.config.autoSlide);
      this.presentation.state.isPlaying = true;
    }

    /**
     * Stop auto-play
     */
    stopAutoPlay() {
      if (this.autoPlayInterval) {
        clearInterval(this.autoPlayInterval);
        this.autoPlayInterval = null;
      }
      this.presentation.state.isPlaying = false;
    }

    /**
     * Setup URL Hash navigation
     */
    setupHash() {
      this.boundHashChange = this.handleHashChange.bind(this);
      window.addEventListener('hashchange', this.boundHashChange);

      // Update URL hash on slide changes
      this.presentation.on('afterSlideChange', _ref => {
        let {
          to
        } = _ref;
        if (this.config.hash !== false && !this.presentation.state.isOverview) {
          window.location.hash = "/slide-".concat(to + 1);
        }
      });
    }

    /**
     * Parse slide index from URL hash
     */
    readHash() {
      const hash = window.location.hash;
      const match = hash.match(/\/slide-(\d+)/);
      if (match) {
        const index = parseInt(match[1], 10) - 1;
        if (!isNaN(index) && index >= 0 && index < this.presentation.getTotalSlides()) {
          this.goTo(index);
        }
      }
    }

    /**
     * Handle hashchange event
     */
    handleHashChange() {
      this.readHash();
    }

    /**
     * Setup autoplay pause on container hover
     */
    setupHoverPause() {
      const {
        container
      } = this.presentation;
      this.boundMouseEnter = () => {
        if (this.presentation.state.isPlaying) {
          this.isPausedByHover = true;
          this.stopAutoPlay();
          // Maintain state as playing, just temporarily suspended
          this.presentation.state.isPlaying = true;
        }
      };
      this.boundMouseLeave = () => {
        if (this.isPausedByHover) {
          this.isPausedByHover = false;
          this.startAutoPlay();
        }
      };
      container.addEventListener('mouseenter', this.boundMouseEnter);
      container.addEventListener('mouseleave', this.boundMouseLeave);
    }

    /**
     * Cleanup navigation
     */
    /**
     * Setup Accessibility live announcements
     */
    setupA11y() {
      this.ariaLiveElement = document.createElement('div');
      this.ariaLiveElement.className = 'swd-aria-live';
      this.ariaLiveElement.setAttribute('aria-live', 'polite');
      this.ariaLiveElement.setAttribute('aria-atomic', 'true');
      this.ariaLiveElement.style.cssText = 'position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); border: 0;';
      const {
        wrapper
      } = this.presentation;
      if (wrapper) {
        wrapper.appendChild(this.ariaLiveElement);
      }
      this.presentation.on('afterSlideChange', _ref2 => {
        let {
          to
        } = _ref2;
        const isAnnounceEnabled = this.config.a11y && (this.config.a11y === true || this.config.a11y.announceSlideChanges !== false);
        if (isAnnounceEnabled && this.ariaLiveElement) {
          const slides = this.presentation.container.querySelectorAll('.swd-slide');
          const activeSlide = slides[to];
          const heading = activeSlide ? activeSlide.querySelector('h1, h2, h3, h4') : null;
          const headingText = heading ? heading.textContent : '';
          this.ariaLiveElement.textContent = "Slide ".concat(to + 1, ". ").concat(headingText);
        }
      });
    }

    /**
     * Setup Mouse Wheel navigation
     */
    setupMouseWheel() {
      let lastWheelTime = 0;
      this.boundWheel = event => {
        if (this.presentation.state.isOverview) return;
        const now = Date.now();
        if (now - lastWheelTime < 800) return;
        const delta = event.deltaY;
        if (delta > 30) {
          this.next();
          lastWheelTime = now;
        } else if (delta < -30) {
          this.prev();
          lastWheelTime = now;
        }
      };
      this.presentation.container.addEventListener('wheel', this.boundWheel, {
        passive: true
      });
    }

    /**
     * Cleanup navigation
     */
    destroy() {
      this.stopAutoPlay();

      // Cleanup keyboard handler
      if (this.keyboardHandler) {
        this.keyboardHandler.destroy();
      }

      // Cleanup hash change event listener
      if (this.boundHashChange) {
        window.removeEventListener('hashchange', this.boundHashChange);
      }

      // Cleanup hover pause listeners
      if (this.boundMouseEnter) {
        const {
          container
        } = this.presentation;
        container.removeEventListener('mouseenter', this.boundMouseEnter);
        container.removeEventListener('mouseleave', this.boundMouseLeave);
      }

      // Cleanup Mouse Wheel scroll listener
      if (this.boundWheel) {
        this.presentation.container.removeEventListener('wheel', this.boundWheel);
      }

      // Cleanup Accessibility Live region
      if (this.ariaLiveElement && this.ariaLiveElement.parentNode) {
        this.ariaLiveElement.parentNode.removeChild(this.ariaLiveElement);
      }
    }
  }

  /**
   * Touch Handler - Touch and swipe gesture support
   * @module utils/touch
   */

  /**
   * Touch Handler class
   */
  class TouchHandler {
    constructor(presentation) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.presentation = presentation;
      this.config = config;
      this.enabled = true;
      this.touchStartX = 0;
      this.touchStartY = 0;
      this.touchEndX = 0;
      this.touchEndY = 0;
      this.touchStartTime = 0;
      this.isSwiping = false;

      // Gesture thresholds
      this.minSwipeDistance = config.minSwipeDistance || 50;
      this.maxSwipeTime = config.maxSwipeTime || 300;
      this.swipeVelocityThreshold = config.swipeVelocityThreshold || 0.3;

      // Bind methods
      this.boundTouchStart = this.handleTouchStart.bind(this);
      this.boundTouchMove = this.handleTouchMove.bind(this);
      this.boundTouchEnd = this.handleTouchEnd.bind(this);
    }

    /**
     * Initialize touch handler
     */
    init() {
      if (this.config.touch !== false) {
        const {
          container
        } = this.presentation;
        container.addEventListener('touchstart', this.boundTouchStart, {
          passive: false
        });
        container.addEventListener('touchmove', this.boundTouchMove, {
          passive: false
        });
        container.addEventListener('touchend', this.boundTouchEnd, {
          passive: false
        });
      }
    }

    /**
     * Check if device supports touch
     * @returns {boolean} - True if touch device
     */
    isTouchDevice() {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
    }

    /**
     * Handle touch start
     * @param {TouchEvent} event - Touch event
     */
    handleTouchStart(event) {
      if (!this.enabled) return;
      const touch = event.touches[0];
      this.touchStartX = touch.clientX;
      this.touchStartY = touch.clientY;
      this.touchStartTime = Date.now();
      this.isSwiping = false;

      // Emit touch start event
      this.presentation.emit('touchStart', {
        x: this.touchStartX,
        y: this.touchStartY
      });
    }

    /**
     * Handle touch move
     * @param {TouchEvent} event - Touch event
     */
    handleTouchMove(event) {
      if (!this.enabled) return;
      const touch = event.touches[0];
      const deltaX = Math.abs(touch.clientX - this.touchStartX);
      const deltaY = Math.abs(touch.clientY - this.touchStartY);

      // Detect horizontal swipe
      if (deltaX > 10 && deltaX > deltaY) {
        this.isSwiping = true;
        event.preventDefault(); // Prevent scrolling
      }

      // Emit touch move event
      this.presentation.emit('touchMove', {
        x: touch.clientX,
        y: touch.clientY,
        deltaX,
        deltaY
      });
    }

    /**
     * Handle touch end
     * @param {TouchEvent} event - Touch event
     */
    handleTouchEnd(event) {
      if (!this.enabled) return;
      const touch = event.changedTouches[0];
      this.touchEndX = touch.clientX;
      this.touchEndY = touch.clientY;
      const swipeDistance = this.getSwipeDistance();
      const swipeDirection = this.getSwipeDirection();
      const swipeTime = Date.now() - this.touchStartTime;
      const swipeVelocity = swipeDistance / swipeTime;

      // Emit touch end event
      this.presentation.emit('touchEnd', {
        x: this.touchEndX,
        y: this.touchEndY,
        distance: swipeDistance,
        direction: swipeDirection,
        time: swipeTime,
        velocity: swipeVelocity
      });

      // Handle swipe gesture
      if (this.isSwiping) {
        this.handleSwipe(swipeDirection, swipeDistance, swipeVelocity);
      }

      // Reset
      this.isSwiping = false;
    }

    /**
     * Calculate swipe distance
     * @returns {number} - Distance in pixels
     */
    getSwipeDistance() {
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;
      return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    }

    /**
     * Determine swipe direction
     * @returns {string} - Direction: 'left', 'right', 'up', 'down', 'none'
     */
    getSwipeDirection() {
      const deltaX = this.touchEndX - this.touchStartX;
      const deltaY = this.touchEndY - this.touchStartY;

      // Determine if horizontal or vertical swipe
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        // Horizontal swipe
        return deltaX > 0 ? 'right' : 'left';
      }
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        // Vertical swipe
        return deltaY > 0 ? 'down' : 'up';
      }
      return 'none';
    }

    /**
     * Handle swipe gesture
     * @param {string} direction - Swipe direction
     * @param {number} distance - Swipe distance
     * @param {number} velocity - Swipe velocity
     */
    handleSwipe(direction, distance, velocity) {
      // Check if swipe meets threshold
      if (distance < this.minSwipeDistance || velocity < this.swipeVelocityThreshold) {
        return;
      }

      // Emit swipe event
      this.presentation.emit('swipe', {
        direction,
        distance,
        velocity
      });
      const isRtl = this.config.rtl === true;

      // Perform navigation based on direction
      switch (direction) {
        case 'left':
          if (isRtl) {
            this.presentation.prev();
          } else {
            this.presentation.next();
          }
          break;
        case 'right':
          if (isRtl) {
            this.presentation.next();
          } else {
            this.presentation.prev();
          }
          break;
        case 'up':
          // Could be used for vertical slide navigation if implemented
          this.presentation.emit('swipeUp');
          break;
        case 'down':
          // Could be used for vertical slide navigation if implemented
          this.presentation.emit('swipeDown');
          break;
      }
    }

    /**
     * Enable touch handler
     */
    enable() {
      this.enabled = true;
    }

    /**
     * Disable touch handler
     */
    disable() {
      this.enabled = false;
    }

    /**
     * Destroy touch handler
     */
    destroy() {
      const {
        container
      } = this.presentation;
      container.removeEventListener('touchstart', this.boundTouchStart);
      container.removeEventListener('touchmove', this.boundTouchMove);
      container.removeEventListener('touchend', this.boundTouchEnd);
    }
  }

  /**
   * Fullscreen - Fullscreen mode support
   * @module utils/fullscreen
   */

  /**
   * Fullscreen utility class
   */
  class Fullscreen {
    constructor(presentation) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.presentation = presentation;
      this.config = config;
      this.isFullscreen = false;

      // Bind methods
      this.boundFullscreenChange = this.handleFullscreenChange.bind(this);
    }

    /**
     * Initialize fullscreen support
     */
    init() {
      if (this.config.fullscreen !== false && this.isSupported()) {
        // Listen for fullscreen change events
        document.addEventListener('fullscreenchange', this.boundFullscreenChange);
        document.addEventListener('webkitfullscreenchange', this.boundFullscreenChange);
        document.addEventListener('mozfullscreenchange', this.boundFullscreenChange);
        document.addEventListener('MSFullscreenChange', this.boundFullscreenChange);
      }
    }

    /**
     * Check if fullscreen is supported
     * @returns {boolean} - True if supported
     */
    isSupported() {
      return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled);
    }

    /**
     * Check if currently in fullscreen mode
     * @returns {boolean} - True if fullscreen
     */
    isActive() {
      return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement);
    }

    /**
     * Enter fullscreen mode
     * @returns {Promise} - Fullscreen request promise
     */
    enter() {
      const {
        container
      } = this.presentation;
      if (!this.isSupported()) {
        console.warn('Fullscreen API not supported');
        return Promise.reject(new Error('Fullscreen not supported'));
      }
      if (this.isActive()) {
        return Promise.resolve();
      }

      // Request fullscreen using appropriate API
      if (container.requestFullscreen) {
        return container.requestFullscreen();
      }
      if (container.webkitRequestFullscreen) {
        return container.webkitRequestFullscreen();
      }
      if (container.mozRequestFullScreen) {
        return container.mozRequestFullScreen();
      }
      if (container.msRequestFullscreen) {
        return container.msRequestFullscreen();
      }
      return Promise.reject(new Error('Fullscreen method not found'));
    }

    /**
     * Exit fullscreen mode
     * @returns {Promise} - Exit fullscreen promise
     */
    exit() {
      if (!this.isActive()) {
        return Promise.resolve();
      }

      // Exit fullscreen using appropriate API
      if (document.exitFullscreen) {
        return document.exitFullscreen();
      }
      if (document.webkitExitFullscreen) {
        return document.webkitExitFullscreen();
      }
      if (document.mozCancelFullScreen) {
        return document.mozCancelFullScreen();
      }
      if (document.msExitFullscreen) {
        return document.msExitFullscreen();
      }
      return Promise.reject(new Error('Exit fullscreen method not found'));
    }

    /**
     * Toggle fullscreen mode
     * @returns {Promise} - Toggle promise
     */
    toggle() {
      if (this.isActive()) {
        return this.exit();
      }
      return this.enter();
    }

    /**
     * Handle fullscreen change event
     */
    handleFullscreenChange() {
      const wasFullscreen = this.isFullscreen;
      this.isFullscreen = this.isActive();

      // Update presentation state
      this.presentation.state.isFullscreen = this.isFullscreen;

      // Update container class
      if (this.isFullscreen) {
        this.presentation.container.classList.add('swd-fullscreen');
      } else {
        this.presentation.container.classList.remove('swd-fullscreen');
      }

      // Emit events
      if (this.isFullscreen && !wasFullscreen) {
        this.presentation.emit('enterFullscreen');
      } else if (!this.isFullscreen && wasFullscreen) {
        this.presentation.emit('exitFullscreen');
      }
      this.presentation.emit('fullscreenChange', {
        isFullscreen: this.isFullscreen
      });
    }

    /**
     * Destroy fullscreen handler
     */
    destroy() {
      document.removeEventListener('fullscreenchange', this.boundFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', this.boundFullscreenChange);
      document.removeEventListener('mozfullscreenchange', this.boundFullscreenChange);
      document.removeEventListener('MSFullscreenChange', this.boundFullscreenChange);

      // Exit fullscreen if active
      if (this.isActive()) {
        this.exit();
      }
    }
  }

  var web_url = {};

  var web_url_constructor = {};

  var es_string_iterator = {};

  var hasRequiredEs_string_iterator;

  function requireEs_string_iterator () {
  	if (hasRequiredEs_string_iterator) return es_string_iterator;
  	hasRequiredEs_string_iterator = 1;
  	var charAt = requireStringMultibyte().charAt;
  	var toString = requireToString();
  	var InternalStateModule = requireInternalState();
  	var defineIterator = requireIteratorDefine();
  	var createIterResultObject = requireCreateIterResultObject();

  	var STRING_ITERATOR = 'String Iterator';
  	var setInternalState = InternalStateModule.set;
  	var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

  	// `String.prototype[@@iterator]` method
  	// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
  	defineIterator(String, 'String', function (iterated) {
  	  setInternalState(this, {
  	    type: STRING_ITERATOR,
  	    string: toString(iterated),
  	    index: 0
  	  });
  	// `%StringIteratorPrototype%.next` method
  	// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
  	}, function next() {
  	  var state = getInternalState(this);
  	  var string = state.string;
  	  var index = state.index;
  	  var point;
  	  if (index >= string.length) return createIterResultObject(undefined, true);
  	  point = charAt(string, index);
  	  state.index += point.length;
  	  return createIterResultObject(point, false);
  	});
  	return es_string_iterator;
  }

  var urlConstructorDetection;
  var hasRequiredUrlConstructorDetection;

  function requireUrlConstructorDetection () {
  	if (hasRequiredUrlConstructorDetection) return urlConstructorDetection;
  	hasRequiredUrlConstructorDetection = 1;
  	var fails = requireFails();
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var DESCRIPTORS = requireDescriptors();
  	var IS_PURE = requireIsPure();

  	var ITERATOR = wellKnownSymbol('iterator');

  	urlConstructorDetection = !fails(function () {
  	  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  	  var url = new URL('b?a=1&b=2&c=3', 'https://a');
  	  var params = url.searchParams;
  	  var params2 = new URLSearchParams('a=1&a=2&b=3');
  	  var result = '';
  	  url.pathname = 'c%20d';
  	  params.forEach(function (value, key) {
  	    params['delete']('b');
  	    result += key + value;
  	  });
  	  params2['delete']('a', 2);
  	  // `undefined` case is a Chromium 117 bug
  	  // https://bugs.chromium.org/p/v8/issues/detail?id=14222
  	  params2['delete']('b', undefined);
  	  return (IS_PURE && (!url.toJSON || !params2.has('a', 1) || params2.has('a', 2) || !params2.has('a', undefined) || params2.has('b')))
  	    || (!params.size && (IS_PURE || !DESCRIPTORS))
  	    || !params.sort
  	    || url.href !== 'https://a/c%20d?a=1&c=3'
  	    || params.get('c') !== '3'
  	    || String(new URLSearchParams('?a=1')) !== 'a=1'
  	    || !params[ITERATOR]
  	    // throws in Edge
  	    || new URL('https://a@b').username !== 'a'
  	    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
  	    // not punycoded in Edge
  	    || new URL('https://тест').host !== 'xn--e1aybc'
  	    // not escaped in Chrome 62-
  	    || new URL('https://a#б').hash !== '#%D0%B1'
  	    // fails in Chrome 66-
  	    || result !== 'a1c3'
  	    // throws in Safari
  	    || new URL('https://x', undefined).host !== 'x';
  	});
  	return urlConstructorDetection;
  }

  var functionUncurryThisClause;
  var hasRequiredFunctionUncurryThisClause;

  function requireFunctionUncurryThisClause () {
  	if (hasRequiredFunctionUncurryThisClause) return functionUncurryThisClause;
  	hasRequiredFunctionUncurryThisClause = 1;
  	var classofRaw = requireClassofRaw();
  	var uncurryThis = requireFunctionUncurryThis();

  	functionUncurryThisClause = function (fn) {
  	  // Nashorn bug:
  	  //   https://github.com/zloirock/core-js/issues/1128
  	  //   https://github.com/zloirock/core-js/issues/1130
  	  if (classofRaw(fn) === 'Function') return uncurryThis(fn);
  	};
  	return functionUncurryThisClause;
  }

  var functionBindContext;
  var hasRequiredFunctionBindContext;

  function requireFunctionBindContext () {
  	if (hasRequiredFunctionBindContext) return functionBindContext;
  	hasRequiredFunctionBindContext = 1;
  	var uncurryThis = requireFunctionUncurryThisClause();
  	var aCallable = requireACallable();
  	var NATIVE_BIND = requireFunctionBindNative();

  	var bind = uncurryThis(uncurryThis.bind);

  	// optional / simple context binding
  	functionBindContext = function (fn, that) {
  	  aCallable(fn);
  	  return that === undefined ? fn : NATIVE_BIND ? bind(fn, that) : function (/* ...args */) {
  	    return fn.apply(that, arguments);
  	  };
  	};
  	return functionBindContext;
  }

  var defineBuiltInAccessor;
  var hasRequiredDefineBuiltInAccessor;

  function requireDefineBuiltInAccessor () {
  	if (hasRequiredDefineBuiltInAccessor) return defineBuiltInAccessor;
  	hasRequiredDefineBuiltInAccessor = 1;
  	var makeBuiltIn = requireMakeBuiltIn();
  	var defineProperty = requireObjectDefineProperty();

  	defineBuiltInAccessor = function (target, name, descriptor) {
  	  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  	  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  	  return defineProperty.f(target, name, descriptor);
  	};
  	return defineBuiltInAccessor;
  }

  var anInstance;
  var hasRequiredAnInstance;

  function requireAnInstance () {
  	if (hasRequiredAnInstance) return anInstance;
  	hasRequiredAnInstance = 1;
  	var isPrototypeOf = requireObjectIsPrototypeOf();

  	var $TypeError = TypeError;

  	anInstance = function (it, Prototype) {
  	  if (isPrototypeOf(Prototype, it)) return it;
  	  throw new $TypeError('Incorrect invocation');
  	};
  	return anInstance;
  }

  var objectAssign;
  var hasRequiredObjectAssign;

  function requireObjectAssign () {
  	if (hasRequiredObjectAssign) return objectAssign;
  	hasRequiredObjectAssign = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var uncurryThis = requireFunctionUncurryThis();
  	var call = requireFunctionCall();
  	var fails = requireFails();
  	var objectKeys = requireObjectKeys();
  	var getOwnPropertySymbolsModule = requireObjectGetOwnPropertySymbols();
  	var propertyIsEnumerableModule = requireObjectPropertyIsEnumerable();
  	var toObject = requireToObject();
  	var IndexedObject = requireIndexedObject();

  	// eslint-disable-next-line es/no-object-assign -- safe
  	var $assign = Object.assign;
  	// eslint-disable-next-line es/no-object-defineproperty -- required for testing
  	var defineProperty = Object.defineProperty;
  	var concat = uncurryThis([].concat);

  	// `Object.assign` method
  	// https://tc39.es/ecma262/#sec-object.assign
  	objectAssign = !$assign || fails(function () {
  	  // should have correct order of operations (Edge bug)
  	  if (DESCRIPTORS && $assign({ b: 1 }, $assign(defineProperty({}, 'a', {
  	    enumerable: true,
  	    get: function () {
  	      defineProperty(this, 'b', {
  	        value: 3,
  	        enumerable: false
  	      });
  	    }
  	  }), { b: 2 })).b !== 1) return true;
  	  // should work with symbols and should have deterministic property order (V8 bug)
  	  var A = {};
  	  var B = {};
  	  // eslint-disable-next-line es/no-symbol -- safe
  	  var symbol = Symbol('assign detection');
  	  var alphabet = 'abcdefghijklmnopqrst';
  	  A[symbol] = 7;
  	  // eslint-disable-next-line es/no-array-prototype-foreach -- safe
  	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  	  return $assign({}, A)[symbol] !== 7 || objectKeys($assign({}, B)).join('') !== alphabet;
  	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  	  var T = toObject(target);
  	  var argumentsLength = arguments.length;
  	  var index = 1;
  	  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  	  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  	  while (argumentsLength > index) {
  	    var S = IndexedObject(arguments[index++]);
  	    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
  	    var length = keys.length;
  	    var j = 0;
  	    var key;
  	    while (length > j) {
  	      key = keys[j++];
  	      if (!DESCRIPTORS || call(propertyIsEnumerable, S, key)) T[key] = S[key];
  	    }
  	  } return T;
  	} : $assign;
  	return objectAssign;
  }

  var iteratorClose;
  var hasRequiredIteratorClose;

  function requireIteratorClose () {
  	if (hasRequiredIteratorClose) return iteratorClose;
  	hasRequiredIteratorClose = 1;
  	var call = requireFunctionCall();
  	var anObject = requireAnObject();
  	var getMethod = requireGetMethod();

  	iteratorClose = function (iterator, kind, value) {
  	  var innerResult, innerError;
  	  anObject(iterator);
  	  try {
  	    innerResult = getMethod(iterator, 'return');
  	    if (!innerResult) {
  	      if (kind === 'throw') throw value;
  	      return value;
  	    }
  	    innerResult = call(innerResult, iterator);
  	  } catch (error) {
  	    innerError = true;
  	    innerResult = error;
  	  }
  	  if (kind === 'throw') throw value;
  	  if (innerError) throw innerResult;
  	  anObject(innerResult);
  	  return value;
  	};
  	return iteratorClose;
  }

  var callWithSafeIterationClosing;
  var hasRequiredCallWithSafeIterationClosing;

  function requireCallWithSafeIterationClosing () {
  	if (hasRequiredCallWithSafeIterationClosing) return callWithSafeIterationClosing;
  	hasRequiredCallWithSafeIterationClosing = 1;
  	var anObject = requireAnObject();
  	var iteratorClose = requireIteratorClose();

  	// call something on iterator step with safe closing on error
  	callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
  	  try {
  	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  	  } catch (error) {
  	    iteratorClose(iterator, 'throw', error);
  	  }
  	};
  	return callWithSafeIterationClosing;
  }

  var isArrayIteratorMethod;
  var hasRequiredIsArrayIteratorMethod;

  function requireIsArrayIteratorMethod () {
  	if (hasRequiredIsArrayIteratorMethod) return isArrayIteratorMethod;
  	hasRequiredIsArrayIteratorMethod = 1;
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var Iterators = requireIterators();

  	var ITERATOR = wellKnownSymbol('iterator');
  	var ArrayPrototype = Array.prototype;

  	// check on default Array iterator
  	isArrayIteratorMethod = function (it) {
  	  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
  	};
  	return isArrayIteratorMethod;
  }

  var isConstructor;
  var hasRequiredIsConstructor;

  function requireIsConstructor () {
  	if (hasRequiredIsConstructor) return isConstructor;
  	hasRequiredIsConstructor = 1;
  	var uncurryThis = requireFunctionUncurryThis();
  	var fails = requireFails();
  	var isCallable = requireIsCallable();
  	var classof = requireClassof();
  	var getBuiltIn = requireGetBuiltIn();
  	var inspectSource = requireInspectSource();

  	var noop = function () { /* empty */ };
  	var construct = getBuiltIn('Reflect', 'construct');
  	var constructorRegExp = /^\s*(?:class|function)\b/;
  	var exec = uncurryThis(constructorRegExp.exec);
  	var INCORRECT_TO_STRING = !constructorRegExp.test(noop);

  	var isConstructorModern = function isConstructor(argument) {
  	  if (!isCallable(argument)) return false;
  	  try {
  	    construct(noop, [], argument);
  	    return true;
  	  } catch (error) {
  	    return false;
  	  }
  	};

  	var isConstructorLegacy = function isConstructor(argument) {
  	  if (!isCallable(argument)) return false;
  	  switch (classof(argument)) {
  	    case 'AsyncFunction':
  	    case 'GeneratorFunction':
  	    case 'AsyncGeneratorFunction': return false;
  	  }
  	  try {
  	    // we can't check .prototype since constructors produced by .bind haven't it
  	    // `Function#toString` throws on some built-it function in some legacy engines
  	    // (for example, `DOMQuad` and similar in FF41-)
  	    return INCORRECT_TO_STRING || !!exec(constructorRegExp, inspectSource(argument));
  	  } catch (error) {
  	    return true;
  	  }
  	};

  	isConstructorLegacy.sham = true;

  	// `IsConstructor` abstract operation
  	// https://tc39.es/ecma262/#sec-isconstructor
  	isConstructor = !construct || fails(function () {
  	  var called;
  	  return isConstructorModern(isConstructorModern.call)
  	    || !isConstructorModern(Object)
  	    || !isConstructorModern(function () { called = true; })
  	    || called;
  	}) ? isConstructorLegacy : isConstructorModern;
  	return isConstructor;
  }

  var createProperty;
  var hasRequiredCreateProperty;

  function requireCreateProperty () {
  	if (hasRequiredCreateProperty) return createProperty;
  	hasRequiredCreateProperty = 1;
  	var DESCRIPTORS = requireDescriptors();
  	var definePropertyModule = requireObjectDefineProperty();
  	var createPropertyDescriptor = requireCreatePropertyDescriptor();

  	createProperty = function (object, key, value) {
  	  if (DESCRIPTORS) definePropertyModule.f(object, key, createPropertyDescriptor(0, value));
  	  else object[key] = value;
  	};
  	return createProperty;
  }

  var getIteratorMethod;
  var hasRequiredGetIteratorMethod;

  function requireGetIteratorMethod () {
  	if (hasRequiredGetIteratorMethod) return getIteratorMethod;
  	hasRequiredGetIteratorMethod = 1;
  	var classof = requireClassof();
  	var getMethod = requireGetMethod();
  	var isNullOrUndefined = requireIsNullOrUndefined();
  	var Iterators = requireIterators();
  	var wellKnownSymbol = requireWellKnownSymbol();

  	var ITERATOR = wellKnownSymbol('iterator');

  	getIteratorMethod = function (it) {
  	  if (!isNullOrUndefined(it)) return getMethod(it, ITERATOR)
  	    || getMethod(it, '@@iterator')
  	    || Iterators[classof(it)];
  	};
  	return getIteratorMethod;
  }

  var getIterator;
  var hasRequiredGetIterator;

  function requireGetIterator () {
  	if (hasRequiredGetIterator) return getIterator;
  	hasRequiredGetIterator = 1;
  	var call = requireFunctionCall();
  	var aCallable = requireACallable();
  	var anObject = requireAnObject();
  	var tryToString = requireTryToString();
  	var getIteratorMethod = requireGetIteratorMethod();

  	var $TypeError = TypeError;

  	getIterator = function (argument, usingIterator) {
  	  var iteratorMethod = arguments.length < 2 ? getIteratorMethod(argument) : usingIterator;
  	  if (aCallable(iteratorMethod)) return anObject(call(iteratorMethod, argument));
  	  throw new $TypeError(tryToString(argument) + ' is not iterable');
  	};
  	return getIterator;
  }

  var arrayFrom;
  var hasRequiredArrayFrom;

  function requireArrayFrom () {
  	if (hasRequiredArrayFrom) return arrayFrom;
  	hasRequiredArrayFrom = 1;
  	var bind = requireFunctionBindContext();
  	var call = requireFunctionCall();
  	var toObject = requireToObject();
  	var callWithSafeIterationClosing = requireCallWithSafeIterationClosing();
  	var isArrayIteratorMethod = requireIsArrayIteratorMethod();
  	var isConstructor = requireIsConstructor();
  	var lengthOfArrayLike = requireLengthOfArrayLike();
  	var createProperty = requireCreateProperty();
  	var getIterator = requireGetIterator();
  	var getIteratorMethod = requireGetIteratorMethod();

  	var $Array = Array;

  	// `Array.from` method implementation
  	// https://tc39.es/ecma262/#sec-array.from
  	arrayFrom = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  	  var O = toObject(arrayLike);
  	  var IS_CONSTRUCTOR = isConstructor(this);
  	  var argumentsLength = arguments.length;
  	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  	  var mapping = mapfn !== undefined;
  	  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  	  var iteratorMethod = getIteratorMethod(O);
  	  var index = 0;
  	  var length, result, step, iterator, next, value;
  	  // if the target is not iterable or it's an array with the default iterator - use a simple case
  	  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
  	    result = IS_CONSTRUCTOR ? new this() : [];
  	    iterator = getIterator(O, iteratorMethod);
  	    next = iterator.next;
  	    for (;!(step = call(next, iterator)).done; index++) {
  	      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
  	      createProperty(result, index, value);
  	    }
  	  } else {
  	    length = lengthOfArrayLike(O);
  	    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
  	    for (;length > index; index++) {
  	      value = mapping ? mapfn(O[index], index) : O[index];
  	      createProperty(result, index, value);
  	    }
  	  }
  	  result.length = index;
  	  return result;
  	};
  	return arrayFrom;
  }

  var stringPunycodeToAscii;
  var hasRequiredStringPunycodeToAscii;

  function requireStringPunycodeToAscii () {
  	if (hasRequiredStringPunycodeToAscii) return stringPunycodeToAscii;
  	hasRequiredStringPunycodeToAscii = 1;
  	// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
  	var uncurryThis = requireFunctionUncurryThis();

  	var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
  	var base = 36;
  	var tMin = 1;
  	var tMax = 26;
  	var skew = 38;
  	var damp = 700;
  	var initialBias = 72;
  	var initialN = 128; // 0x80
  	var delimiter = '-'; // '\x2D'
  	var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
  	var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
  	var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
  	var baseMinusTMin = base - tMin;

  	var $RangeError = RangeError;
  	var exec = uncurryThis(regexSeparators.exec);
  	var floor = Math.floor;
  	var fromCharCode = String.fromCharCode;
  	var charCodeAt = uncurryThis(''.charCodeAt);
  	var join = uncurryThis([].join);
  	var push = uncurryThis([].push);
  	var replace = uncurryThis(''.replace);
  	var split = uncurryThis(''.split);
  	var toLowerCase = uncurryThis(''.toLowerCase);

  	/**
  	 * Creates an array containing the numeric code points of each Unicode
  	 * character in the string. While JavaScript uses UCS-2 internally,
  	 * this function will convert a pair of surrogate halves (each of which
  	 * UCS-2 exposes as separate characters) into a single code point,
  	 * matching UTF-16.
  	 */
  	var ucs2decode = function (string) {
  	  var output = [];
  	  var counter = 0;
  	  var length = string.length;
  	  while (counter < length) {
  	    var value = charCodeAt(string, counter++);
  	    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
  	      // It's a high surrogate, and there is a next character.
  	      var extra = charCodeAt(string, counter++);
  	      if ((extra & 0xFC00) === 0xDC00) { // Low surrogate.
  	        push(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
  	      } else {
  	        // It's an unmatched surrogate; only append this code unit, in case the
  	        // next code unit is the high surrogate of a surrogate pair.
  	        push(output, value);
  	        counter--;
  	      }
  	    } else {
  	      push(output, value);
  	    }
  	  }
  	  return output;
  	};

  	/**
  	 * Converts a digit/integer into a basic code point.
  	 */
  	var digitToBasic = function (digit) {
  	  //  0..25 map to ASCII a..z or A..Z
  	  // 26..35 map to ASCII 0..9
  	  return digit + 22 + 75 * (digit < 26);
  	};

  	/**
  	 * Bias adaptation function as per section 3.4 of RFC 3492.
  	 * https://tools.ietf.org/html/rfc3492#section-3.4
  	 */
  	var adapt = function (delta, numPoints, firstTime) {
  	  var k = 0;
  	  delta = firstTime ? floor(delta / damp) : delta >> 1;
  	  delta += floor(delta / numPoints);
  	  while (delta > baseMinusTMin * tMax >> 1) {
  	    delta = floor(delta / baseMinusTMin);
  	    k += base;
  	  }
  	  return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
  	};

  	/**
  	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
  	 * Punycode string of ASCII-only symbols.
  	 */
  	var encode = function (input) {
  	  var output = [];

  	  // Convert the input in UCS-2 to an array of Unicode code points.
  	  input = ucs2decode(input);

  	  // Cache the length.
  	  var inputLength = input.length;

  	  // Initialize the state.
  	  var n = initialN;
  	  var delta = 0;
  	  var bias = initialBias;
  	  var i, currentValue;

  	  // Handle the basic code points.
  	  for (i = 0; i < input.length; i++) {
  	    currentValue = input[i];
  	    if (currentValue < 0x80) {
  	      push(output, fromCharCode(currentValue));
  	    }
  	  }

  	  var basicLength = output.length; // number of basic code points.
  	  var handledCPCount = basicLength; // number of code points that have been handled;

  	  // Finish the basic string with a delimiter unless it's empty.
  	  if (basicLength) {
  	    push(output, delimiter);
  	  }

  	  // Main encoding loop:
  	  while (handledCPCount < inputLength) {
  	    // All non-basic code points < n have been handled already. Find the next larger one:
  	    var m = maxInt;
  	    for (i = 0; i < input.length; i++) {
  	      currentValue = input[i];
  	      if (currentValue >= n && currentValue < m) {
  	        m = currentValue;
  	      }
  	    }

  	    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
  	    var handledCPCountPlusOne = handledCPCount + 1;
  	    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
  	      throw new $RangeError(OVERFLOW_ERROR);
  	    }

  	    delta += (m - n) * handledCPCountPlusOne;
  	    n = m;

  	    for (i = 0; i < input.length; i++) {
  	      currentValue = input[i];
  	      if (currentValue < n && ++delta > maxInt) {
  	        throw new $RangeError(OVERFLOW_ERROR);
  	      }
  	      if (currentValue === n) {
  	        // Represent delta as a generalized variable-length integer.
  	        var q = delta;
  	        var k = base;
  	        while (true) {
  	          var t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
  	          if (q < t) break;
  	          var qMinusT = q - t;
  	          var baseMinusT = base - t;
  	          push(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
  	          q = floor(qMinusT / baseMinusT);
  	          k += base;
  	        }

  	        push(output, fromCharCode(digitToBasic(q)));
  	        bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
  	        delta = 0;
  	        handledCPCount++;
  	      }
  	    }

  	    delta++;
  	    n++;
  	  }
  	  return join(output, '');
  	};

  	stringPunycodeToAscii = function (input) {
  	  var encoded = [];
  	  var labels = split(replace(toLowerCase(input), regexSeparators, '\u002E'), '.');
  	  var i, label;
  	  for (i = 0; i < labels.length; i++) {
  	    label = labels[i];
  	    push(encoded, exec(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  	  }
  	  return join(encoded, '.');
  	};
  	return stringPunycodeToAscii;
  }

  var validateArgumentsLength;
  var hasRequiredValidateArgumentsLength;

  function requireValidateArgumentsLength () {
  	if (hasRequiredValidateArgumentsLength) return validateArgumentsLength;
  	hasRequiredValidateArgumentsLength = 1;
  	var $TypeError = TypeError;

  	validateArgumentsLength = function (passed, required) {
  	  if (passed < required) throw new $TypeError('Not enough arguments');
  	  return passed;
  	};
  	return validateArgumentsLength;
  }

  var es_string_fromCodePoint = {};

  var hasRequiredEs_string_fromCodePoint;

  function requireEs_string_fromCodePoint () {
  	if (hasRequiredEs_string_fromCodePoint) return es_string_fromCodePoint;
  	hasRequiredEs_string_fromCodePoint = 1;
  	var $ = require_export();
  	var uncurryThis = requireFunctionUncurryThis();
  	var toAbsoluteIndex = requireToAbsoluteIndex();

  	var $RangeError = RangeError;
  	var fromCharCode = String.fromCharCode;
  	// eslint-disable-next-line es/no-string-fromcodepoint -- required for testing
  	var $fromCodePoint = String.fromCodePoint;
  	var join = uncurryThis([].join);

  	// length should be 1, old FF problem
  	var INCORRECT_LENGTH = !!$fromCodePoint && $fromCodePoint.length !== 1;

  	// `String.fromCodePoint` method
  	// https://tc39.es/ecma262/#sec-string.fromcodepoint
  	$({ target: 'String', stat: true, arity: 1, forced: INCORRECT_LENGTH }, {
  	  // eslint-disable-next-line no-unused-vars -- required for `.length`
  	  fromCodePoint: function fromCodePoint(x) {
  	    var elements = [];
  	    var length = arguments.length;
  	    var i = 0;
  	    var code;
  	    while (length > i) {
  	      code = +arguments[i++];
  	      if (toAbsoluteIndex(code, 0x10FFFF) !== code) throw new $RangeError(code + ' is not a valid code point');
  	      elements[i] = code < 0x10000
  	        ? fromCharCode(code)
  	        : fromCharCode(((code -= 0x10000) >> 10) + 0xD800, code % 0x400 + 0xDC00);
  	    } return join(elements, '');
  	  }
  	});
  	return es_string_fromCodePoint;
  }

  var safeGetBuiltIn;
  var hasRequiredSafeGetBuiltIn;

  function requireSafeGetBuiltIn () {
  	if (hasRequiredSafeGetBuiltIn) return safeGetBuiltIn;
  	hasRequiredSafeGetBuiltIn = 1;
  	var globalThis = requireGlobalThis();
  	var DESCRIPTORS = requireDescriptors();

  	// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
  	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

  	// Avoid NodeJS experimental warning
  	safeGetBuiltIn = function (name) {
  	  if (!DESCRIPTORS) return globalThis[name];
  	  var descriptor = getOwnPropertyDescriptor(globalThis, name);
  	  return descriptor && descriptor.value;
  	};
  	return safeGetBuiltIn;
  }

  var defineBuiltIns;
  var hasRequiredDefineBuiltIns;

  function requireDefineBuiltIns () {
  	if (hasRequiredDefineBuiltIns) return defineBuiltIns;
  	hasRequiredDefineBuiltIns = 1;
  	var defineBuiltIn = requireDefineBuiltIn();

  	defineBuiltIns = function (target, src, options) {
  	  for (var key in src) defineBuiltIn(target, key, src[key], options);
  	  return target;
  	};
  	return defineBuiltIns;
  }

  var web_urlSearchParams_constructor;
  var hasRequiredWeb_urlSearchParams_constructor;

  function requireWeb_urlSearchParams_constructor () {
  	if (hasRequiredWeb_urlSearchParams_constructor) return web_urlSearchParams_constructor;
  	hasRequiredWeb_urlSearchParams_constructor = 1;
  	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
  	requireEs_array_iterator();
  	requireEs_string_fromCodePoint();
  	var $ = require_export();
  	var globalThis = requireGlobalThis();
  	var safeGetBuiltIn = requireSafeGetBuiltIn();
  	var getBuiltIn = requireGetBuiltIn();
  	var call = requireFunctionCall();
  	var uncurryThis = requireFunctionUncurryThis();
  	var DESCRIPTORS = requireDescriptors();
  	var USE_NATIVE_URL = requireUrlConstructorDetection();
  	var defineBuiltIn = requireDefineBuiltIn();
  	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
  	var defineBuiltIns = requireDefineBuiltIns();
  	var setToStringTag = requireSetToStringTag();
  	var createIteratorConstructor = requireIteratorCreateConstructor();
  	var InternalStateModule = requireInternalState();
  	var anInstance = requireAnInstance();
  	var isCallable = requireIsCallable();
  	var hasOwn = requireHasOwnProperty();
  	var bind = requireFunctionBindContext();
  	var classof = requireClassof();
  	var anObject = requireAnObject();
  	var isObject = requireIsObject();
  	var $toString = requireToString();
  	var create = requireObjectCreate();
  	var createPropertyDescriptor = requireCreatePropertyDescriptor();
  	var getIterator = requireGetIterator();
  	var getIteratorMethod = requireGetIteratorMethod();
  	var createIterResultObject = requireCreateIterResultObject();
  	var validateArgumentsLength = requireValidateArgumentsLength();
  	var wellKnownSymbol = requireWellKnownSymbol();
  	var arraySort = requireArraySort();

  	var ITERATOR = wellKnownSymbol('iterator');
  	var URL_SEARCH_PARAMS = 'URLSearchParams';
  	var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
  	var setInternalState = InternalStateModule.set;
  	var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
  	var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);

  	var nativeFetch = safeGetBuiltIn('fetch');
  	var NativeRequest = safeGetBuiltIn('Request');
  	var Headers = safeGetBuiltIn('Headers');
  	var RequestPrototype = NativeRequest && NativeRequest.prototype;
  	var HeadersPrototype = Headers && Headers.prototype;
  	var TypeError = globalThis.TypeError;
  	var encodeURIComponent = globalThis.encodeURIComponent;
  	var fromCharCode = String.fromCharCode;
  	var fromCodePoint = getBuiltIn('String', 'fromCodePoint');
  	var $parseInt = parseInt;
  	var charAt = uncurryThis(''.charAt);
  	var join = uncurryThis([].join);
  	var push = uncurryThis([].push);
  	var replace = uncurryThis(''.replace);
  	var shift = uncurryThis([].shift);
  	var splice = uncurryThis([].splice);
  	var split = uncurryThis(''.split);
  	var stringSlice = uncurryThis(''.slice);
  	var exec = uncurryThis(/./.exec);

  	var plus = /\+/g;
  	var FALLBACK_REPLACER = '\uFFFD';
  	var VALID_HEX = /^[0-9a-f]+$/i;

  	var parseHexOctet = function (string, start) {
  	  var substr = stringSlice(string, start, start + 2);
  	  if (!exec(VALID_HEX, substr)) return NaN;

  	  return $parseInt(substr, 16);
  	};

  	var getLeadingOnes = function (octet) {
  	  var count = 0;
  	  for (var mask = 0x80; mask > 0 && (octet & mask) !== 0; mask >>= 1) {
  	    count++;
  	  }
  	  return count;
  	};

  	var utf8Decode = function (octets) {
  	  var codePoint = null;

  	  switch (octets.length) {
  	    case 1:
  	      codePoint = octets[0];
  	      break;
  	    case 2:
  	      codePoint = (octets[0] & 0x1F) << 6 | (octets[1] & 0x3F);
  	      break;
  	    case 3:
  	      codePoint = (octets[0] & 0x0F) << 12 | (octets[1] & 0x3F) << 6 | (octets[2] & 0x3F);
  	      break;
  	    case 4:
  	      codePoint = (octets[0] & 0x07) << 18 | (octets[1] & 0x3F) << 12 | (octets[2] & 0x3F) << 6 | (octets[3] & 0x3F);
  	      break;
  	  }

  	  return codePoint > 0x10FFFF ? null : codePoint;
  	};

  	var decode = function (input) {
  	  input = replace(input, plus, ' ');
  	  var length = input.length;
  	  var result = '';
  	  var i = 0;

  	  while (i < length) {
  	    var decodedChar = charAt(input, i);

  	    if (decodedChar === '%') {
  	      if (charAt(input, i + 1) === '%' || i + 3 > length) {
  	        result += '%';
  	        i++;
  	        continue;
  	      }

  	      var octet = parseHexOctet(input, i + 1);

  	      // eslint-disable-next-line no-self-compare -- NaN check
  	      if (octet !== octet) {
  	        result += decodedChar;
  	        i++;
  	        continue;
  	      }

  	      i += 2;
  	      var byteSequenceLength = getLeadingOnes(octet);

  	      if (byteSequenceLength === 0) {
  	        decodedChar = fromCharCode(octet);
  	      } else {
  	        if (byteSequenceLength === 1 || byteSequenceLength > 4) {
  	          result += FALLBACK_REPLACER;
  	          i++;
  	          continue;
  	        }

  	        var octets = [octet];
  	        var sequenceIndex = 1;

  	        while (sequenceIndex < byteSequenceLength) {
  	          i++;
  	          if (i + 3 > length || charAt(input, i) !== '%') break;

  	          var nextByte = parseHexOctet(input, i + 1);

  	          // eslint-disable-next-line no-self-compare -- NaN check
  	          if (nextByte !== nextByte) {
  	            i += 3;
  	            break;
  	          }
  	          if (nextByte > 191 || nextByte < 128) break;

  	          push(octets, nextByte);
  	          i += 2;
  	          sequenceIndex++;
  	        }

  	        if (octets.length !== byteSequenceLength) {
  	          result += FALLBACK_REPLACER;
  	          continue;
  	        }

  	        var codePoint = utf8Decode(octets);
  	        if (codePoint === null) {
  	          result += FALLBACK_REPLACER;
  	        } else {
  	          decodedChar = fromCodePoint(codePoint);
  	        }
  	      }
  	    }

  	    result += decodedChar;
  	    i++;
  	  }

  	  return result;
  	};

  	var find = /[!'()~]|%20/g;

  	var replacements = {
  	  '!': '%21',
  	  "'": '%27',
  	  '(': '%28',
  	  ')': '%29',
  	  '~': '%7E',
  	  '%20': '+'
  	};

  	var replacer = function (match) {
  	  return replacements[match];
  	};

  	var serialize = function (it) {
  	  return replace(encodeURIComponent(it), find, replacer);
  	};

  	var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  	  setInternalState(this, {
  	    type: URL_SEARCH_PARAMS_ITERATOR,
  	    target: getInternalParamsState(params).entries,
  	    index: 0,
  	    kind: kind
  	  });
  	}, URL_SEARCH_PARAMS, function next() {
  	  var state = getInternalIteratorState(this);
  	  var target = state.target;
  	  var index = state.index++;
  	  if (!target || index >= target.length) {
  	    state.target = null;
  	    return createIterResultObject(undefined, true);
  	  }
  	  var entry = target[index];
  	  switch (state.kind) {
  	    case 'keys': return createIterResultObject(entry.key, false);
  	    case 'values': return createIterResultObject(entry.value, false);
  	  } return createIterResultObject([entry.key, entry.value], false);
  	}, true);

  	var URLSearchParamsState = function (init) {
  	  this.entries = [];
  	  this.url = null;

  	  if (init !== undefined) {
  	    if (isObject(init)) this.parseObject(init);
  	    else this.parseQuery(typeof init == 'string' ? charAt(init, 0) === '?' ? stringSlice(init, 1) : init : $toString(init));
  	  }
  	};

  	URLSearchParamsState.prototype = {
  	  type: URL_SEARCH_PARAMS,
  	  bindURL: function (url) {
  	    this.url = url;
  	    this.update();
  	  },
  	  parseObject: function (object) {
  	    var entries = this.entries;
  	    var iteratorMethod = getIteratorMethod(object);
  	    var iterator, next, step, entryIterator, entryNext, first, second;

  	    if (iteratorMethod) {
  	      iterator = getIterator(object, iteratorMethod);
  	      next = iterator.next;
  	      while (!(step = call(next, iterator)).done) {
  	        entryIterator = getIterator(anObject(step.value));
  	        entryNext = entryIterator.next;
  	        if (
  	          (first = call(entryNext, entryIterator)).done ||
  	          (second = call(entryNext, entryIterator)).done ||
  	          !call(entryNext, entryIterator).done
  	        ) throw new TypeError('Expected sequence with length 2');
  	        push(entries, { key: $toString(first.value), value: $toString(second.value) });
  	      }
  	    } else for (var key in object) if (hasOwn(object, key)) {
  	      push(entries, { key: key, value: $toString(object[key]) });
  	    }
  	  },
  	  parseQuery: function (query) {
  	    if (query) {
  	      var entries = this.entries;
  	      var attributes = split(query, '&');
  	      var index = 0;
  	      var attribute, entry;
  	      while (index < attributes.length) {
  	        attribute = attributes[index++];
  	        if (attribute.length) {
  	          entry = split(attribute, '=');
  	          push(entries, {
  	            key: decode(shift(entry)),
  	            value: decode(join(entry, '='))
  	          });
  	        }
  	      }
  	    }
  	  },
  	  serialize: function () {
  	    var entries = this.entries;
  	    var result = [];
  	    var index = 0;
  	    var entry;
  	    while (index < entries.length) {
  	      entry = entries[index++];
  	      push(result, serialize(entry.key) + '=' + serialize(entry.value));
  	    } return join(result, '&');
  	  },
  	  update: function () {
  	    this.entries.length = 0;
  	    this.parseQuery(this.url.query);
  	  },
  	  updateURL: function () {
  	    if (this.url) this.url.update();
  	  }
  	};

  	// `URLSearchParams` constructor
  	// https://url.spec.whatwg.org/#interface-urlsearchparams
  	var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  	  anInstance(this, URLSearchParamsPrototype);
  	  var init = arguments.length > 0 ? arguments[0] : undefined;
  	  var state = setInternalState(this, new URLSearchParamsState(init));
  	  if (!DESCRIPTORS) this.size = state.entries.length;
  	};

  	var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

  	defineBuiltIns(URLSearchParamsPrototype, {
  	  // `URLSearchParams.prototype.append` method
  	  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  	  append: function append(name, value) {
  	    var state = getInternalParamsState(this);
  	    validateArgumentsLength(arguments.length, 2);
  	    push(state.entries, { key: $toString(name), value: $toString(value) });
  	    if (!DESCRIPTORS) this.length++;
  	    state.updateURL();
  	  },
  	  // `URLSearchParams.prototype.delete` method
  	  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  	  'delete': function (name /* , value */) {
  	    var state = getInternalParamsState(this);
  	    var length = validateArgumentsLength(arguments.length, 1);
  	    var entries = state.entries;
  	    var key = $toString(name);
  	    var $value = length < 2 ? undefined : arguments[1];
  	    var value = $value === undefined ? $value : $toString($value);
  	    var index = 0;
  	    while (index < entries.length) {
  	      var entry = entries[index];
  	      if (entry.key === key && (value === undefined || entry.value === value)) {
  	        splice(entries, index, 1);
  	        if (value !== undefined) break;
  	      } else index++;
  	    }
  	    if (!DESCRIPTORS) this.size = entries.length;
  	    state.updateURL();
  	  },
  	  // `URLSearchParams.prototype.get` method
  	  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  	  get: function get(name) {
  	    var entries = getInternalParamsState(this).entries;
  	    validateArgumentsLength(arguments.length, 1);
  	    var key = $toString(name);
  	    var index = 0;
  	    for (; index < entries.length; index++) {
  	      if (entries[index].key === key) return entries[index].value;
  	    }
  	    return null;
  	  },
  	  // `URLSearchParams.prototype.getAll` method
  	  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  	  getAll: function getAll(name) {
  	    var entries = getInternalParamsState(this).entries;
  	    validateArgumentsLength(arguments.length, 1);
  	    var key = $toString(name);
  	    var result = [];
  	    var index = 0;
  	    for (; index < entries.length; index++) {
  	      if (entries[index].key === key) push(result, entries[index].value);
  	    }
  	    return result;
  	  },
  	  // `URLSearchParams.prototype.has` method
  	  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  	  has: function has(name /* , value */) {
  	    var entries = getInternalParamsState(this).entries;
  	    var length = validateArgumentsLength(arguments.length, 1);
  	    var key = $toString(name);
  	    var $value = length < 2 ? undefined : arguments[1];
  	    var value = $value === undefined ? $value : $toString($value);
  	    var index = 0;
  	    while (index < entries.length) {
  	      var entry = entries[index++];
  	      if (entry.key === key && (value === undefined || entry.value === value)) return true;
  	    }
  	    return false;
  	  },
  	  // `URLSearchParams.prototype.set` method
  	  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  	  set: function set(name, value) {
  	    var state = getInternalParamsState(this);
  	    validateArgumentsLength(arguments.length, 1);
  	    var entries = state.entries;
  	    var found = false;
  	    var key = $toString(name);
  	    var val = $toString(value);
  	    var index = 0;
  	    var entry;
  	    for (; index < entries.length; index++) {
  	      entry = entries[index];
  	      if (entry.key === key) {
  	        if (found) splice(entries, index--, 1);
  	        else {
  	          found = true;
  	          entry.value = val;
  	        }
  	      }
  	    }
  	    if (!found) push(entries, { key: key, value: val });
  	    if (!DESCRIPTORS) this.size = entries.length;
  	    state.updateURL();
  	  },
  	  // `URLSearchParams.prototype.sort` method
  	  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  	  sort: function sort() {
  	    var state = getInternalParamsState(this);
  	    arraySort(state.entries, function (a, b) {
  	      return a.key > b.key ? 1 : -1;
  	    });
  	    state.updateURL();
  	  },
  	  // `URLSearchParams.prototype.forEach` method
  	  forEach: function forEach(callback /* , thisArg */) {
  	    var entries = getInternalParamsState(this).entries;
  	    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
  	    var index = 0;
  	    var entry;
  	    while (index < entries.length) {
  	      entry = entries[index++];
  	      boundFunction(entry.value, entry.key, this);
  	    }
  	  },
  	  // `URLSearchParams.prototype.keys` method
  	  keys: function keys() {
  	    return new URLSearchParamsIterator(this, 'keys');
  	  },
  	  // `URLSearchParams.prototype.values` method
  	  values: function values() {
  	    return new URLSearchParamsIterator(this, 'values');
  	  },
  	  // `URLSearchParams.prototype.entries` method
  	  entries: function entries() {
  	    return new URLSearchParamsIterator(this, 'entries');
  	  }
  	}, { enumerable: true });

  	// `URLSearchParams.prototype[@@iterator]` method
  	defineBuiltIn(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

  	// `URLSearchParams.prototype.toString` method
  	// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
  	defineBuiltIn(URLSearchParamsPrototype, 'toString', function toString() {
  	  return getInternalParamsState(this).serialize();
  	}, { enumerable: true });

  	// `URLSearchParams.prototype.size` getter
  	// https://github.com/whatwg/url/pull/734
  	if (DESCRIPTORS) defineBuiltInAccessor(URLSearchParamsPrototype, 'size', {
  	  get: function size() {
  	    return getInternalParamsState(this).entries.length;
  	  },
  	  configurable: true,
  	  enumerable: true
  	});

  	setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

  	$({ global: true, constructor: true, forced: !USE_NATIVE_URL }, {
  	  URLSearchParams: URLSearchParamsConstructor
  	});

  	// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
  	if (!USE_NATIVE_URL && isCallable(Headers)) {
  	  var headersHas = uncurryThis(HeadersPrototype.has);
  	  var headersSet = uncurryThis(HeadersPrototype.set);

  	  var wrapRequestOptions = function (init) {
  	    if (isObject(init)) {
  	      var body = init.body;
  	      var headers;
  	      if (classof(body) === URL_SEARCH_PARAMS) {
  	        headers = init.headers ? new Headers(init.headers) : new Headers();
  	        if (!headersHas(headers, 'content-type')) {
  	          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
  	        }
  	        return create(init, {
  	          body: createPropertyDescriptor(0, $toString(body)),
  	          headers: createPropertyDescriptor(0, headers)
  	        });
  	      }
  	    } return init;
  	  };

  	  if (isCallable(nativeFetch)) {
  	    $({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
  	      fetch: function fetch(input /* , init */) {
  	        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
  	      }
  	    });
  	  }

  	  if (isCallable(NativeRequest)) {
  	    var RequestConstructor = function Request(input /* , init */) {
  	      anInstance(this, RequestPrototype);
  	      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
  	    };

  	    RequestPrototype.constructor = RequestConstructor;
  	    RequestConstructor.prototype = RequestPrototype;

  	    $({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
  	      Request: RequestConstructor
  	    });
  	  }
  	}

  	web_urlSearchParams_constructor = {
  	  URLSearchParams: URLSearchParamsConstructor,
  	  getState: getInternalParamsState
  	};
  	return web_urlSearchParams_constructor;
  }

  var hasRequiredWeb_url_constructor;

  function requireWeb_url_constructor () {
  	if (hasRequiredWeb_url_constructor) return web_url_constructor;
  	hasRequiredWeb_url_constructor = 1;
  	// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`
  	requireEs_string_iterator();
  	var $ = require_export();
  	var DESCRIPTORS = requireDescriptors();
  	var USE_NATIVE_URL = requireUrlConstructorDetection();
  	var globalThis = requireGlobalThis();
  	var bind = requireFunctionBindContext();
  	var uncurryThis = requireFunctionUncurryThis();
  	var defineBuiltIn = requireDefineBuiltIn();
  	var defineBuiltInAccessor = requireDefineBuiltInAccessor();
  	var anInstance = requireAnInstance();
  	var hasOwn = requireHasOwnProperty();
  	var assign = requireObjectAssign();
  	var arrayFrom = requireArrayFrom();
  	var arraySlice = requireArraySlice();
  	var codeAt = requireStringMultibyte().codeAt;
  	var toASCII = requireStringPunycodeToAscii();
  	var $toString = requireToString();
  	var setToStringTag = requireSetToStringTag();
  	var validateArgumentsLength = requireValidateArgumentsLength();
  	var URLSearchParamsModule = requireWeb_urlSearchParams_constructor();
  	var InternalStateModule = requireInternalState();

  	var setInternalState = InternalStateModule.set;
  	var getInternalURLState = InternalStateModule.getterFor('URL');
  	var URLSearchParams = URLSearchParamsModule.URLSearchParams;
  	var getInternalSearchParamsState = URLSearchParamsModule.getState;

  	var NativeURL = globalThis.URL;
  	var TypeError = globalThis.TypeError;
  	var parseInt = globalThis.parseInt;
  	var floor = Math.floor;
  	var pow = Math.pow;
  	var charAt = uncurryThis(''.charAt);
  	var exec = uncurryThis(/./.exec);
  	var join = uncurryThis([].join);
  	var numberToString = uncurryThis(1.1.toString);
  	var pop = uncurryThis([].pop);
  	var push = uncurryThis([].push);
  	var replace = uncurryThis(''.replace);
  	var shift = uncurryThis([].shift);
  	var split = uncurryThis(''.split);
  	var stringSlice = uncurryThis(''.slice);
  	var toLowerCase = uncurryThis(''.toLowerCase);
  	var unshift = uncurryThis([].unshift);

  	var INVALID_AUTHORITY = 'Invalid authority';
  	var INVALID_SCHEME = 'Invalid scheme';
  	var INVALID_HOST = 'Invalid host';
  	var INVALID_PORT = 'Invalid port';

  	var ALPHA = /[a-z]/i;
  	// eslint-disable-next-line regexp/no-obscure-range -- safe
  	var ALPHANUMERIC = /[\d+-.a-z]/i;
  	var DIGIT = /\d/;
  	var HEX_START = /^0x/i;
  	var OCT = /^[0-7]+$/;
  	var DEC = /^\d+$/;
  	var HEX = /^[\da-f]+$/i;
  	/* eslint-disable regexp/no-control-character -- safe */
  	var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
  	var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
  	var LEADING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+/;
  	var TRAILING_C0_CONTROL_OR_SPACE = /(^|[^\u0000-\u0020])[\u0000-\u0020]+$/;
  	var TAB_AND_NEW_LINE = /[\t\n\r]/g;
  	/* eslint-enable regexp/no-control-character -- safe */
  	// eslint-disable-next-line no-unassigned-vars -- expected `undefined` value
  	var EOF;

  	// https://url.spec.whatwg.org/#ipv4-number-parser
  	var parseIPv4 = function (input) {
  	  var parts = split(input, '.');
  	  var partsLength, numbers, index, part, radix, number, ipv4;
  	  if (parts.length && parts[parts.length - 1] === '') {
  	    parts.length--;
  	  }
  	  partsLength = parts.length;
  	  if (partsLength > 4) return input;
  	  numbers = [];
  	  for (index = 0; index < partsLength; index++) {
  	    part = parts[index];
  	    if (part === '') return input;
  	    radix = 10;
  	    if (part.length > 1 && charAt(part, 0) === '0') {
  	      radix = exec(HEX_START, part) ? 16 : 8;
  	      part = stringSlice(part, radix === 8 ? 1 : 2);
  	    }
  	    if (part === '') {
  	      number = 0;
  	    } else {
  	      if (!exec(radix === 10 ? DEC : radix === 8 ? OCT : HEX, part)) return input;
  	      number = parseInt(part, radix);
  	    }
  	    push(numbers, number);
  	  }
  	  for (index = 0; index < partsLength; index++) {
  	    number = numbers[index];
  	    if (index === partsLength - 1) {
  	      if (number >= pow(256, 5 - partsLength)) return null;
  	    } else if (number > 255) return null;
  	  }
  	  ipv4 = pop(numbers);
  	  for (index = 0; index < numbers.length; index++) {
  	    ipv4 += numbers[index] * pow(256, 3 - index);
  	  }
  	  return ipv4;
  	};

  	// https://url.spec.whatwg.org/#concept-ipv6-parser
  	// eslint-disable-next-line max-statements -- TODO
  	var parseIPv6 = function (input) {
  	  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  	  var pieceIndex = 0;
  	  var compress = null;
  	  var pointer = 0;
  	  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  	  var chr = function () {
  	    return charAt(input, pointer);
  	  };

  	  if (chr() === ':') {
  	    if (charAt(input, 1) !== ':') return;
  	    pointer += 2;
  	    pieceIndex++;
  	    compress = pieceIndex;
  	  }
  	  while (chr()) {
  	    if (pieceIndex === 8) return;
  	    if (chr() === ':') {
  	      if (compress !== null) return;
  	      pointer++;
  	      pieceIndex++;
  	      compress = pieceIndex;
  	      continue;
  	    }
  	    value = length = 0;
  	    while (length < 4 && exec(HEX, chr())) {
  	      value = value * 16 + parseInt(chr(), 16);
  	      pointer++;
  	      length++;
  	    }
  	    if (chr() === '.') {
  	      if (length === 0) return;
  	      pointer -= length;
  	      if (pieceIndex > 6) return;
  	      numbersSeen = 0;
  	      while (chr()) {
  	        ipv4Piece = null;
  	        if (numbersSeen > 0) {
  	          if (chr() === '.' && numbersSeen < 4) pointer++;
  	          else return;
  	        }
  	        if (!exec(DIGIT, chr())) return;
  	        while (exec(DIGIT, chr())) {
  	          number = parseInt(chr(), 10);
  	          if (ipv4Piece === null) ipv4Piece = number;
  	          else if (ipv4Piece === 0) return;
  	          else ipv4Piece = ipv4Piece * 10 + number;
  	          if (ipv4Piece > 255) return;
  	          pointer++;
  	        }
  	        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
  	        numbersSeen++;
  	        if (numbersSeen === 2 || numbersSeen === 4) pieceIndex++;
  	      }
  	      if (numbersSeen !== 4) return;
  	      break;
  	    } else if (chr() === ':') {
  	      pointer++;
  	      if (!chr()) return;
  	    } else if (chr()) return;
  	    address[pieceIndex++] = value;
  	  }
  	  if (compress !== null) {
  	    swaps = pieceIndex - compress;
  	    pieceIndex = 7;
  	    while (pieceIndex !== 0 && swaps > 0) {
  	      swap = address[pieceIndex];
  	      address[pieceIndex--] = address[compress + swaps - 1];
  	      address[compress + --swaps] = swap;
  	    }
  	  } else if (pieceIndex !== 8) return;
  	  return address;
  	};

  	var findLongestZeroSequence = function (ipv6) {
  	  var maxIndex = null;
  	  var maxLength = 1;
  	  var currStart = null;
  	  var currLength = 0;
  	  var index = 0;
  	  for (; index < 8; index++) {
  	    if (ipv6[index] !== 0) {
  	      if (currLength > maxLength) {
  	        maxIndex = currStart;
  	        maxLength = currLength;
  	      }
  	      currStart = null;
  	      currLength = 0;
  	    } else {
  	      if (currStart === null) currStart = index;
  	      ++currLength;
  	    }
  	  }
  	  return currLength > maxLength ? currStart : maxIndex;
  	};

  	// https://url.spec.whatwg.org/#host-serializing
  	var serializeHost = function (host) {
  	  var result, index, compress, ignore0;

  	  // ipv4
  	  if (typeof host == 'number') {
  	    result = [];
  	    for (index = 0; index < 4; index++) {
  	      unshift(result, host % 256);
  	      host = floor(host / 256);
  	    }
  	    return join(result, '.');
  	  }

  	  // ipv6
  	  if (typeof host == 'object') {
  	    result = '';
  	    compress = findLongestZeroSequence(host);
  	    for (index = 0; index < 8; index++) {
  	      if (ignore0 && host[index] === 0) continue;
  	      if (ignore0) ignore0 = false;
  	      if (compress === index) {
  	        result += index ? ':' : '::';
  	        ignore0 = true;
  	      } else {
  	        result += numberToString(host[index], 16);
  	        if (index < 7) result += ':';
  	      }
  	    }
  	    return '[' + result + ']';
  	  }

  	  return host;
  	};

  	var C0ControlPercentEncodeSet = {};
  	var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  	  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
  	});
  	var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  	  '#': 1, '?': 1, '{': 1, '}': 1
  	});
  	var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  	  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
  	});

  	var percentEncode = function (chr, set) {
  	  var code = codeAt(chr, 0);
  	  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
  	};

  	// https://url.spec.whatwg.org/#special-scheme
  	var specialSchemes = {
  	  ftp: 21,
  	  file: null,
  	  http: 80,
  	  https: 443,
  	  ws: 80,
  	  wss: 443
  	};

  	// https://url.spec.whatwg.org/#windows-drive-letter
  	var isWindowsDriveLetter = function (string, normalized) {
  	  var second;
  	  return string.length === 2 && exec(ALPHA, charAt(string, 0))
  	    && ((second = charAt(string, 1)) === ':' || (!normalized && second === '|'));
  	};

  	// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
  	var startsWithWindowsDriveLetter = function (string) {
  	  var third;
  	  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
  	    string.length === 2 ||
  	    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  	  );
  	};

  	// https://url.spec.whatwg.org/#single-dot-path-segment
  	var isSingleDot = function (segment) {
  	  return segment === '.' || toLowerCase(segment) === '%2e';
  	};

  	// https://url.spec.whatwg.org/#double-dot-path-segment
  	var isDoubleDot = function (segment) {
  	  segment = toLowerCase(segment);
  	  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
  	};

  	// States:
  	var SCHEME_START = {};
  	var SCHEME = {};
  	var NO_SCHEME = {};
  	var SPECIAL_RELATIVE_OR_AUTHORITY = {};
  	var PATH_OR_AUTHORITY = {};
  	var RELATIVE = {};
  	var RELATIVE_SLASH = {};
  	var SPECIAL_AUTHORITY_SLASHES = {};
  	var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
  	var AUTHORITY = {};
  	var HOST = {};
  	var HOSTNAME = {};
  	var PORT = {};
  	var FILE = {};
  	var FILE_SLASH = {};
  	var FILE_HOST = {};
  	var PATH_START = {};
  	var PATH = {};
  	var CANNOT_BE_A_BASE_URL_PATH = {};
  	var QUERY = {};
  	var FRAGMENT = {};

  	var URLState = function (url, isBase, base) {
  	  var urlString = $toString(url);
  	  var baseState, failure, searchParams;
  	  if (isBase) {
  	    failure = this.parse(urlString);
  	    if (failure) throw new TypeError(failure);
  	    this.searchParams = null;
  	  } else {
  	    if (base !== undefined) baseState = new URLState(base, true);
  	    failure = this.parse(urlString, null, baseState);
  	    if (failure) throw new TypeError(failure);
  	    searchParams = getInternalSearchParamsState(new URLSearchParams());
  	    searchParams.bindURL(this);
  	    this.searchParams = searchParams;
  	  }
  	};

  	URLState.prototype = {
  	  type: 'URL',
  	  // https://url.spec.whatwg.org/#url-parsing
  	  // eslint-disable-next-line max-statements -- TODO
  	  parse: function (input, stateOverride, base) {
  	    var url = this;
  	    var state = stateOverride || SCHEME_START;
  	    var pointer = 0;
  	    var buffer = '';
  	    var seenAt = false;
  	    var seenBracket = false;
  	    var seenPasswordToken = false;
  	    var codePoints, chr, bufferCodePoints, failure;

  	    input = $toString(input);

  	    if (!stateOverride) {
  	      url.scheme = '';
  	      url.username = '';
  	      url.password = '';
  	      url.host = null;
  	      url.port = null;
  	      url.path = [];
  	      url.query = null;
  	      url.fragment = null;
  	      url.cannotBeABaseURL = false;
  	      input = replace(input, LEADING_C0_CONTROL_OR_SPACE, '');
  	      input = replace(input, TRAILING_C0_CONTROL_OR_SPACE, '$1');
  	    }

  	    input = replace(input, TAB_AND_NEW_LINE, '');

  	    codePoints = arrayFrom(input);

  	    while (pointer <= codePoints.length) {
  	      chr = codePoints[pointer];
  	      switch (state) {
  	        case SCHEME_START:
  	          if (chr && exec(ALPHA, chr)) {
  	            buffer += toLowerCase(chr);
  	            state = SCHEME;
  	          } else if (!stateOverride) {
  	            state = NO_SCHEME;
  	            continue;
  	          } else return INVALID_SCHEME;
  	          break;

  	        case SCHEME:
  	          if (chr && (exec(ALPHANUMERIC, chr) || chr === '+' || chr === '-' || chr === '.')) {
  	            buffer += toLowerCase(chr);
  	          } else if (chr === ':') {
  	            if (stateOverride && (
  	              (url.isSpecial() !== hasOwn(specialSchemes, buffer)) ||
  	              (buffer === 'file' && (url.includesCredentials() || url.port !== null)) ||
  	              (url.scheme === 'file' && !url.host)
  	            )) return;
  	            url.scheme = buffer;
  	            if (stateOverride) {
  	              if (url.isSpecial() && specialSchemes[url.scheme] === url.port) url.port = null;
  	              return;
  	            }
  	            buffer = '';
  	            if (url.scheme === 'file') {
  	              state = FILE;
  	            } else if (url.isSpecial() && base && base.scheme === url.scheme) {
  	              state = SPECIAL_RELATIVE_OR_AUTHORITY;
  	            } else if (url.isSpecial()) {
  	              state = SPECIAL_AUTHORITY_SLASHES;
  	            } else if (codePoints[pointer + 1] === '/') {
  	              state = PATH_OR_AUTHORITY;
  	              pointer++;
  	            } else {
  	              url.cannotBeABaseURL = true;
  	              push(url.path, '');
  	              state = CANNOT_BE_A_BASE_URL_PATH;
  	            }
  	          } else if (!stateOverride) {
  	            buffer = '';
  	            state = NO_SCHEME;
  	            pointer = 0;
  	            continue;
  	          } else return INVALID_SCHEME;
  	          break;

  	        case NO_SCHEME:
  	          if (!base || (base.cannotBeABaseURL && chr !== '#')) return INVALID_SCHEME;
  	          if (base.cannotBeABaseURL && chr === '#') {
  	            url.scheme = base.scheme;
  	            url.path = arraySlice(base.path);
  	            url.query = base.query;
  	            url.fragment = '';
  	            url.cannotBeABaseURL = true;
  	            state = FRAGMENT;
  	            break;
  	          }
  	          state = base.scheme === 'file' ? FILE : RELATIVE;
  	          continue;

  	        case SPECIAL_RELATIVE_OR_AUTHORITY:
  	          if (chr === '/' && codePoints[pointer + 1] === '/') {
  	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
  	            pointer++;
  	          } else {
  	            state = RELATIVE;
  	            continue;
  	          } break;

  	        case PATH_OR_AUTHORITY:
  	          if (chr === '/') {
  	            state = AUTHORITY;
  	            break;
  	          } else {
  	            state = PATH;
  	            continue;
  	          }

  	        case RELATIVE:
  	          url.scheme = base.scheme;
  	          if (chr === EOF) {
  	            url.username = base.username;
  	            url.password = base.password;
  	            url.host = base.host;
  	            url.port = base.port;
  	            url.path = arraySlice(base.path);
  	            url.query = base.query;
  	          } else if (chr === '/' || (chr === '\\' && url.isSpecial())) {
  	            state = RELATIVE_SLASH;
  	          } else if (chr === '?') {
  	            url.username = base.username;
  	            url.password = base.password;
  	            url.host = base.host;
  	            url.port = base.port;
  	            url.path = arraySlice(base.path);
  	            url.query = '';
  	            state = QUERY;
  	          } else if (chr === '#') {
  	            url.username = base.username;
  	            url.password = base.password;
  	            url.host = base.host;
  	            url.port = base.port;
  	            url.path = arraySlice(base.path);
  	            url.query = base.query;
  	            url.fragment = '';
  	            state = FRAGMENT;
  	          } else {
  	            url.username = base.username;
  	            url.password = base.password;
  	            url.host = base.host;
  	            url.port = base.port;
  	            url.path = arraySlice(base.path);
  	            url.path.length--;
  	            state = PATH;
  	            continue;
  	          } break;

  	        case RELATIVE_SLASH:
  	          if (url.isSpecial() && (chr === '/' || chr === '\\')) {
  	            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
  	          } else if (chr === '/') {
  	            state = AUTHORITY;
  	          } else {
  	            url.username = base.username;
  	            url.password = base.password;
  	            url.host = base.host;
  	            url.port = base.port;
  	            state = PATH;
  	            continue;
  	          } break;

  	        case SPECIAL_AUTHORITY_SLASHES:
  	          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
  	          if (chr !== '/' || charAt(buffer, pointer + 1) !== '/') continue;
  	          pointer++;
  	          break;

  	        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
  	          if (chr !== '/' && chr !== '\\') {
  	            state = AUTHORITY;
  	            continue;
  	          } break;

  	        case AUTHORITY:
  	          if (chr === '@') {
  	            if (seenAt) buffer = '%40' + buffer;
  	            seenAt = true;
  	            bufferCodePoints = arrayFrom(buffer);
  	            for (var i = 0; i < bufferCodePoints.length; i++) {
  	              var codePoint = bufferCodePoints[i];
  	              if (codePoint === ':' && !seenPasswordToken) {
  	                seenPasswordToken = true;
  	                continue;
  	              }
  	              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
  	              if (seenPasswordToken) url.password += encodedCodePoints;
  	              else url.username += encodedCodePoints;
  	            }
  	            buffer = '';
  	          } else if (
  	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
  	            (chr === '\\' && url.isSpecial())
  	          ) {
  	            if (seenAt && buffer === '') return INVALID_AUTHORITY;
  	            pointer -= arrayFrom(buffer).length + 1;
  	            buffer = '';
  	            state = HOST;
  	          } else buffer += chr;
  	          break;

  	        case HOST:
  	        case HOSTNAME:
  	          if (stateOverride && url.scheme === 'file') {
  	            state = FILE_HOST;
  	            continue;
  	          } else if (chr === ':' && !seenBracket) {
  	            if (buffer === '') return INVALID_HOST;
  	            failure = url.parseHost(buffer);
  	            if (failure) return failure;
  	            buffer = '';
  	            state = PORT;
  	            if (stateOverride === HOSTNAME) return;
  	          } else if (
  	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
  	            (chr === '\\' && url.isSpecial())
  	          ) {
  	            if (url.isSpecial() && buffer === '') return INVALID_HOST;
  	            if (stateOverride && buffer === '' && (url.includesCredentials() || url.port !== null)) return;
  	            failure = url.parseHost(buffer);
  	            if (failure) return failure;
  	            buffer = '';
  	            state = PATH_START;
  	            if (stateOverride) return;
  	            continue;
  	          } else {
  	            if (chr === '[') seenBracket = true;
  	            else if (chr === ']') seenBracket = false;
  	            buffer += chr;
  	          } break;

  	        case PORT:
  	          if (exec(DIGIT, chr)) {
  	            buffer += chr;
  	          } else if (
  	            chr === EOF || chr === '/' || chr === '?' || chr === '#' ||
  	            (chr === '\\' && url.isSpecial()) ||
  	            stateOverride
  	          ) {
  	            if (buffer !== '') {
  	              var port = parseInt(buffer, 10);
  	              if (port > 0xFFFF) return INVALID_PORT;
  	              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
  	              buffer = '';
  	            }
  	            if (stateOverride) return;
  	            state = PATH_START;
  	            continue;
  	          } else return INVALID_PORT;
  	          break;

  	        case FILE:
  	          url.scheme = 'file';
  	          if (chr === '/' || chr === '\\') state = FILE_SLASH;
  	          else if (base && base.scheme === 'file') {
  	            switch (chr) {
  	              case EOF:
  	                url.host = base.host;
  	                url.path = arraySlice(base.path);
  	                url.query = base.query;
  	                break;
  	              case '?':
  	                url.host = base.host;
  	                url.path = arraySlice(base.path);
  	                url.query = '';
  	                state = QUERY;
  	                break;
  	              case '#':
  	                url.host = base.host;
  	                url.path = arraySlice(base.path);
  	                url.query = base.query;
  	                url.fragment = '';
  	                state = FRAGMENT;
  	                break;
  	              default:
  	                if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
  	                  url.host = base.host;
  	                  url.path = arraySlice(base.path);
  	                  url.shortenPath();
  	                }
  	                state = PATH;
  	                continue;
  	            }
  	          } else {
  	            state = PATH;
  	            continue;
  	          } break;

  	        case FILE_SLASH:
  	          if (chr === '/' || chr === '\\') {
  	            state = FILE_HOST;
  	            break;
  	          }
  	          if (base && base.scheme === 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
  	            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
  	            else url.host = base.host;
  	          }
  	          state = PATH;
  	          continue;

  	        case FILE_HOST:
  	          if (chr === EOF || chr === '/' || chr === '\\' || chr === '?' || chr === '#') {
  	            if (!stateOverride && isWindowsDriveLetter(buffer)) {
  	              state = PATH;
  	            } else if (buffer === '') {
  	              url.host = '';
  	              if (stateOverride) return;
  	              state = PATH_START;
  	            } else {
  	              failure = url.parseHost(buffer);
  	              if (failure) return failure;
  	              if (url.host === 'localhost') url.host = '';
  	              if (stateOverride) return;
  	              buffer = '';
  	              state = PATH_START;
  	            } continue;
  	          } else buffer += chr;
  	          break;

  	        case PATH_START:
  	          if (url.isSpecial()) {
  	            state = PATH;
  	            if (chr !== '/' && chr !== '\\') continue;
  	          } else if (!stateOverride && chr === '?') {
  	            url.query = '';
  	            state = QUERY;
  	          } else if (!stateOverride && chr === '#') {
  	            url.fragment = '';
  	            state = FRAGMENT;
  	          } else if (chr !== EOF) {
  	            state = PATH;
  	            if (chr !== '/') continue;
  	          } break;

  	        case PATH:
  	          if (
  	            chr === EOF || chr === '/' ||
  	            (chr === '\\' && url.isSpecial()) ||
  	            (!stateOverride && (chr === '?' || chr === '#'))
  	          ) {
  	            if (isDoubleDot(buffer)) {
  	              url.shortenPath();
  	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
  	                push(url.path, '');
  	              }
  	            } else if (isSingleDot(buffer)) {
  	              if (chr !== '/' && !(chr === '\\' && url.isSpecial())) {
  	                push(url.path, '');
  	              }
  	            } else {
  	              if (url.scheme === 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
  	                if (url.host) url.host = '';
  	                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
  	              }
  	              push(url.path, buffer);
  	            }
  	            buffer = '';
  	            if (url.scheme === 'file' && (chr === EOF || chr === '?' || chr === '#')) {
  	              while (url.path.length > 1 && url.path[0] === '') {
  	                shift(url.path);
  	              }
  	            }
  	            if (chr === '?') {
  	              url.query = '';
  	              state = QUERY;
  	            } else if (chr === '#') {
  	              url.fragment = '';
  	              state = FRAGMENT;
  	            }
  	          } else {
  	            buffer += percentEncode(chr, pathPercentEncodeSet);
  	          } break;

  	        case CANNOT_BE_A_BASE_URL_PATH:
  	          if (chr === '?') {
  	            url.query = '';
  	            state = QUERY;
  	          } else if (chr === '#') {
  	            url.fragment = '';
  	            state = FRAGMENT;
  	          } else if (chr !== EOF) {
  	            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
  	          } break;

  	        case QUERY:
  	          if (!stateOverride && chr === '#') {
  	            url.fragment = '';
  	            state = FRAGMENT;
  	          } else if (chr !== EOF) {
  	            if (chr === "'" && url.isSpecial()) url.query += '%27';
  	            else if (chr === '#') url.query += '%23';
  	            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
  	          } break;

  	        case FRAGMENT:
  	          if (chr !== EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
  	          break;
  	      }

  	      pointer++;
  	    }
  	  },
  	  // https://url.spec.whatwg.org/#host-parsing
  	  parseHost: function (input) {
  	    var result, codePoints, index;
  	    if (charAt(input, 0) === '[') {
  	      if (charAt(input, input.length - 1) !== ']') return INVALID_HOST;
  	      result = parseIPv6(stringSlice(input, 1, -1));
  	      if (!result) return INVALID_HOST;
  	      this.host = result;
  	    // opaque host
  	    } else if (!this.isSpecial()) {
  	      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
  	      result = '';
  	      codePoints = arrayFrom(input);
  	      for (index = 0; index < codePoints.length; index++) {
  	        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
  	      }
  	      this.host = result;
  	    } else {
  	      input = toASCII(input);
  	      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
  	      result = parseIPv4(input);
  	      if (result === null) return INVALID_HOST;
  	      this.host = result;
  	    }
  	  },
  	  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  	  cannotHaveUsernamePasswordPort: function () {
  	    return !this.host || this.cannotBeABaseURL || this.scheme === 'file';
  	  },
  	  // https://url.spec.whatwg.org/#include-credentials
  	  includesCredentials: function () {
  	    return this.username !== '' || this.password !== '';
  	  },
  	  // https://url.spec.whatwg.org/#is-special
  	  isSpecial: function () {
  	    return hasOwn(specialSchemes, this.scheme);
  	  },
  	  // https://url.spec.whatwg.org/#shorten-a-urls-path
  	  shortenPath: function () {
  	    var path = this.path;
  	    var pathSize = path.length;
  	    if (pathSize && (this.scheme !== 'file' || pathSize !== 1 || !isWindowsDriveLetter(path[0], true))) {
  	      path.length--;
  	    }
  	  },
  	  // https://url.spec.whatwg.org/#concept-url-serializer
  	  serialize: function () {
  	    var url = this;
  	    var scheme = url.scheme;
  	    var username = url.username;
  	    var password = url.password;
  	    var host = url.host;
  	    var port = url.port;
  	    var path = url.path;
  	    var query = url.query;
  	    var fragment = url.fragment;
  	    var output = scheme + ':';
  	    if (host !== null) {
  	      output += '//';
  	      if (url.includesCredentials()) {
  	        output += username + (password ? ':' + password : '') + '@';
  	      }
  	      output += serializeHost(host);
  	      if (port !== null) output += ':' + port;
  	    } else if (scheme === 'file') output += '//';
  	    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  	    if (query !== null) output += '?' + query;
  	    if (fragment !== null) output += '#' + fragment;
  	    return output;
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-href
  	  setHref: function (href) {
  	    var failure = this.parse(href);
  	    if (failure) throw new TypeError(failure);
  	    this.searchParams.update();
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-origin
  	  getOrigin: function () {
  	    var scheme = this.scheme;
  	    var port = this.port;
  	    if (scheme === 'blob') try {
  	      return new URLConstructor(scheme.path[0]).origin;
  	    } catch (error) {
  	      return 'null';
  	    }
  	    if (scheme === 'file' || !this.isSpecial()) return 'null';
  	    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-protocol
  	  getProtocol: function () {
  	    return this.scheme + ':';
  	  },
  	  setProtocol: function (protocol) {
  	    this.parse($toString(protocol) + ':', SCHEME_START);
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-username
  	  getUsername: function () {
  	    return this.username;
  	  },
  	  setUsername: function (username) {
  	    var codePoints = arrayFrom($toString(username));
  	    if (this.cannotHaveUsernamePasswordPort()) return;
  	    this.username = '';
  	    for (var i = 0; i < codePoints.length; i++) {
  	      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
  	    }
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-password
  	  getPassword: function () {
  	    return this.password;
  	  },
  	  setPassword: function (password) {
  	    var codePoints = arrayFrom($toString(password));
  	    if (this.cannotHaveUsernamePasswordPort()) return;
  	    this.password = '';
  	    for (var i = 0; i < codePoints.length; i++) {
  	      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
  	    }
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-host
  	  getHost: function () {
  	    var host = this.host;
  	    var port = this.port;
  	    return host === null ? ''
  	      : port === null ? serializeHost(host)
  	      : serializeHost(host) + ':' + port;
  	  },
  	  setHost: function (host) {
  	    if (this.cannotBeABaseURL) return;
  	    this.parse(host, HOST);
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-hostname
  	  getHostname: function () {
  	    var host = this.host;
  	    return host === null ? '' : serializeHost(host);
  	  },
  	  setHostname: function (hostname) {
  	    if (this.cannotBeABaseURL) return;
  	    this.parse(hostname, HOSTNAME);
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-port
  	  getPort: function () {
  	    var port = this.port;
  	    return port === null ? '' : $toString(port);
  	  },
  	  setPort: function (port) {
  	    if (this.cannotHaveUsernamePasswordPort()) return;
  	    port = $toString(port);
  	    if (port === '') this.port = null;
  	    else this.parse(port, PORT);
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-pathname
  	  getPathname: function () {
  	    var path = this.path;
  	    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  	  },
  	  setPathname: function (pathname) {
  	    if (this.cannotBeABaseURL) return;
  	    this.path = [];
  	    this.parse(pathname, PATH_START);
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-search
  	  getSearch: function () {
  	    var query = this.query;
  	    return query ? '?' + query : '';
  	  },
  	  setSearch: function (search) {
  	    search = $toString(search);
  	    if (search === '') {
  	      this.query = null;
  	    } else {
  	      if (charAt(search, 0) === '?') search = stringSlice(search, 1);
  	      this.query = '';
  	      this.parse(search, QUERY);
  	    }
  	    this.searchParams.update();
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-searchparams
  	  getSearchParams: function () {
  	    return this.searchParams.facade;
  	  },
  	  // https://url.spec.whatwg.org/#dom-url-hash
  	  getHash: function () {
  	    var fragment = this.fragment;
  	    return fragment ? '#' + fragment : '';
  	  },
  	  setHash: function (hash) {
  	    hash = $toString(hash);
  	    if (hash === '') {
  	      this.fragment = null;
  	      return;
  	    }
  	    if (charAt(hash, 0) === '#') hash = stringSlice(hash, 1);
  	    this.fragment = '';
  	    this.parse(hash, FRAGMENT);
  	  },
  	  update: function () {
  	    this.query = this.searchParams.serialize() || null;
  	  }
  	};

  	// `URL` constructor
  	// https://url.spec.whatwg.org/#url-class
  	var URLConstructor = function URL(url /* , base */) {
  	  var that = anInstance(this, URLPrototype);
  	  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
  	  var state = setInternalState(that, new URLState(url, false, base));
  	  if (!DESCRIPTORS) {
  	    that.href = state.serialize();
  	    that.origin = state.getOrigin();
  	    that.protocol = state.getProtocol();
  	    that.username = state.getUsername();
  	    that.password = state.getPassword();
  	    that.host = state.getHost();
  	    that.hostname = state.getHostname();
  	    that.port = state.getPort();
  	    that.pathname = state.getPathname();
  	    that.search = state.getSearch();
  	    that.searchParams = state.getSearchParams();
  	    that.hash = state.getHash();
  	  }
  	};

  	var URLPrototype = URLConstructor.prototype;

  	var accessorDescriptor = function (getter, setter) {
  	  return {
  	    get: function () {
  	      return getInternalURLState(this)[getter]();
  	    },
  	    set: setter && function (value) {
  	      return getInternalURLState(this)[setter](value);
  	    },
  	    configurable: true,
  	    enumerable: true
  	  };
  	};

  	if (DESCRIPTORS) {
  	  // `URL.prototype.href` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-href
  	  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
  	  // `URL.prototype.origin` getter
  	  // https://url.spec.whatwg.org/#dom-url-origin
  	  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
  	  // `URL.prototype.protocol` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-protocol
  	  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
  	  // `URL.prototype.username` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-username
  	  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
  	  // `URL.prototype.password` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-password
  	  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
  	  // `URL.prototype.host` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-host
  	  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
  	  // `URL.prototype.hostname` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-hostname
  	  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
  	  // `URL.prototype.port` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-port
  	  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
  	  // `URL.prototype.pathname` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-pathname
  	  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
  	  // `URL.prototype.search` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-search
  	  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
  	  // `URL.prototype.searchParams` getter
  	  // https://url.spec.whatwg.org/#dom-url-searchparams
  	  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
  	  // `URL.prototype.hash` accessors pair
  	  // https://url.spec.whatwg.org/#dom-url-hash
  	  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
  	}

  	// `URL.prototype.toJSON` method
  	// https://url.spec.whatwg.org/#dom-url-tojson
  	defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
  	  return getInternalURLState(this).serialize();
  	}, { enumerable: true });

  	// `URL.prototype.toString` method
  	// https://url.spec.whatwg.org/#URL-stringification-behavior
  	defineBuiltIn(URLPrototype, 'toString', function toString() {
  	  return getInternalURLState(this).serialize();
  	}, { enumerable: true });

  	if (NativeURL) {
  	  var nativeCreateObjectURL = NativeURL.createObjectURL;
  	  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  	  // `URL.createObjectURL` method
  	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  	  if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  	  // `URL.revokeObjectURL` method
  	  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  	  if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
  	}

  	setToStringTag(URLConstructor, 'URL');

  	$({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  	  URL: URLConstructor
  	});
  	return web_url_constructor;
  }

  var hasRequiredWeb_url;

  function requireWeb_url () {
  	if (hasRequiredWeb_url) return web_url;
  	hasRequiredWeb_url = 1;
  	// TODO: Remove this module from `core-js@4` since it's replaced to module below
  	requireWeb_url_constructor();
  	return web_url;
  }

  requireWeb_url();

  var web_url_toJson = {};

  var hasRequiredWeb_url_toJson;

  function requireWeb_url_toJson () {
  	if (hasRequiredWeb_url_toJson) return web_url_toJson;
  	hasRequiredWeb_url_toJson = 1;
  	var $ = require_export();
  	var call = requireFunctionCall();

  	// `URL.prototype.toJSON` method
  	// https://url.spec.whatwg.org/#dom-url-tojson
  	$({ target: 'URL', proto: true, enumerable: true }, {
  	  toJSON: function toJSON() {
  	    return call(URL.prototype.toString, this);
  	  }
  	});
  	return web_url_toJson;
  }

  requireWeb_url_toJson();

  var web_urlSearchParams = {};

  var hasRequiredWeb_urlSearchParams;

  function requireWeb_urlSearchParams () {
  	if (hasRequiredWeb_urlSearchParams) return web_urlSearchParams;
  	hasRequiredWeb_urlSearchParams = 1;
  	// TODO: Remove this module from `core-js@4` since it's replaced to module below
  	requireWeb_urlSearchParams_constructor();
  	return web_urlSearchParams;
  }

  requireWeb_urlSearchParams();

  /**
   * Export - Export presentation to various formats
   * @module utils/export
   */

  /**
   * Export utility class
   */
  class ExportUtil {
    constructor(presentation) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.presentation = presentation;
      this.config = config;
    }

    /**
     * Export presentation to PDF
     * Uses browser's print functionality
     */
    toPDF() {
      if (!this.config.export || this.config.export.pdf === false) {
        console.warn('PDF export is disabled');
        return;
      }

      // Store current state
      const {
        currentSlide
      } = this.presentation.state;

      // Add print class to container
      this.presentation.container.classList.add('swd-print-mode');

      // Show all slides
      const slides = this.presentation.container.querySelectorAll('.swd-slide');
      slides.forEach(slide => {
        slide.classList.add('swd-print-slide');
        slide.classList.remove('past', 'future', 'active');
      });

      // Emit before export event
      this.presentation.emit('beforeExportPDF');

      // Trigger print dialog
      setTimeout(() => {
        window.print();

        // Restore state after print dialog closes
        setTimeout(() => {
          this.presentation.container.classList.remove('swd-print-mode');
          slides.forEach(slide => {
            slide.classList.remove('swd-print-slide');
          });

          // Restore current slide
          this.presentation.navigation.updateSlideDisplay(currentSlide);
          this.presentation.emit('afterExportPDF');
        }, 100);
      }, 100);
    }

    /**
     * Export presentation to standalone HTML
     * @returns {Promise<string>} - HTML content
     */
    async toHTML() {
      if (!this.config.export || this.config.export.html === false) {
        console.warn('HTML export is disabled');
        return null;
      }
      this.presentation.emit('beforeExportHTML');

      // Get container HTML
      const containerHTML = this.presentation.container.outerHTML;

      // Get all CSS
      const styles = this.getInlineStyles();

      // Get SWD script (simplified version)
      const script = await this.getInlineScript();

      // Build complete HTML
      const html = "<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n  <meta charset=\"UTF-8\">\n  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n  <title>SWD Presentation</title>\n  <style>\n".concat(styles, "\n  </style>\n</head>\n<body>\n").concat(containerHTML, "\n").concat(script, "\n</body>\n</html>");
      this.presentation.emit('afterExportHTML', {
        html
      });
      return html;
    }

    /**
     * Download HTML file
     */
    async downloadHTML() {
      const html = await this.toHTML();
      if (!html) return;
      const blob = new Blob([html], {
        type: 'text/html'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'presentation.html';
      link.click();
      URL.revokeObjectURL(url);
    }

    /**
     * Export presentation data to JSON
     * @returns {Object} - JSON data
     */
    toJSON() {
      if (!this.config.export || this.config.export.json === false) {
        console.warn('JSON export is disabled');
        return null;
      }
      this.presentation.emit('beforeExportJSON');
      const data = {
        config: {
          theme: this.config.theme,
          transition: this.config.transition,
          transitionSpeed: this.config.transitionSpeed,
          aspectRatio: this.config.aspectRatio
        },
        slides: this.presentation.state.slides.map(slide => ({
          index: slide.index,
          layout: slide.layout,
          background: slide.background,
          overlay: slide.overlay,
          content: slide.content,
          attributes: slide.attributes
        })),
        metadata: {
          totalSlides: this.presentation.state.slides.length,
          exportDate: new Date().toISOString(),
          version: '1.0.0'
        }
      };
      this.presentation.emit('afterExportJSON', {
        data
      });
      return data;
    }

    /**
     * Download JSON file
     */
    downloadJSON() {
      const data = this.toJSON();
      if (!data) return;
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], {
        type: 'application/json'
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'presentation.json';
      link.click();
      URL.revokeObjectURL(url);
    }

    /**
     * Get inline styles from stylesheets
     * @returns {string} - CSS content
     */
    getInlineStyles() {
      let styles = '';
      try {
        Array.from(document.styleSheets).forEach(sheet => {
          try {
            // Inline rules if they belong to swd.css or same-origin styles
            if (!sheet.href || sheet.href.includes('swd.css') || sheet.href.startsWith(window.location.origin)) {
              const rules = Array.from(sheet.cssRules || sheet.rules);
              rules.forEach(rule => {
                styles += "".concat(rule.cssText, "\n");
              });
            }
          } catch (e) {
            // Silent catch for cross-origin sheet access constraints
          }
        });
      } catch (e) {
        console.warn('Error reading stylesheet rules:', e);
      }

      // Get inline style tags
      const styleTags = document.querySelectorAll('style');
      styleTags.forEach(style => {
        styles += "".concat(style.textContent, "\n");
      });
      return styles;
    }

    /**
     * Get inline script asynchronously
     * @returns {Promise<string>} - Script tag string
     */
    async getInlineScript() {
      const config = JSON.stringify(this.config, null, 2);
      let scriptContent = '';
      const scripts = document.querySelectorAll('script');
      for (const script of Array.from(scripts)) {
        if (script.src && script.src.includes('swd.js')) {
          try {
            const response = await fetch(script.src);
            if (response.ok) {
              scriptContent = await response.text();
              break;
            }
          } catch (e) {
            // Fail gracefully to fallback
          }
        }
      }
      if (!scriptContent) {
        scriptContent = "// SWD Library Fallback (Static view only)\nconsole.warn('SWD library javascript was not inlined');";
      }
      return "<script>\n".concat(scriptContent, "\n(function() {\n  const container = document.querySelector('[data-swd-id]') || document.body.firstElementChild;\n  if (container && typeof SWD !== 'undefined') {\n    new SWD(container, ").concat(config, ");\n  }\n})();\n</script>");
    }

    /**
     * Create export UI (optional helper)
     * @returns {HTMLElement} - Export button container
     */
    createExportUI() {
      const container = document.createElement('div');
      container.className = 'swd-export-ui';
      container.style.cssText = "\n      position: fixed;\n      bottom: 20px;\n      left: 20px;\n      display: flex;\n      gap: 10px;\n      z-index: 1000;\n    ";
      const buttonStyle = "\n      padding: 10px 20px;\n      background: #0066cc;\n      color: white;\n      border: none;\n      border-radius: 5px;\n      cursor: pointer;\n      font-size: 14px;\n    ";

      // PDF export button
      const pdfBtn = document.createElement('button');
      pdfBtn.textContent = 'Export to PDF';
      pdfBtn.style.cssText = buttonStyle;
      pdfBtn.onclick = () => this.toPDF();
      container.appendChild(pdfBtn);

      // HTML export button
      const htmlBtn = document.createElement('button');
      htmlBtn.textContent = 'Export to HTML';
      htmlBtn.style.cssText = buttonStyle;
      htmlBtn.onclick = () => this.downloadHTML();
      container.appendChild(htmlBtn);

      // JSON export button
      const jsonBtn = document.createElement('button');
      jsonBtn.textContent = 'Export to JSON';
      jsonBtn.style.cssText = buttonStyle;
      jsonBtn.onclick = () => this.downloadJSON();
      container.appendChild(jsonBtn);
      return container;
    }
  }

  /**
   * SenangWebs Deck - Transitions Utility
   * Handles slide transition animations
   */

  /**
   * Available transition types
   */
  const TransitionTypes = {
    NONE: 'none',
    SLIDE: 'slide',
    FADE: 'fade',
    ZOOM: 'zoom',
    FLIP: 'flip'
  };

  /**
   * Transition speeds in milliseconds
   */
  const TransitionSpeeds = {
    SLOW: 800,
    NORMAL: 500,
    FAST: 300
  };

  /**
   * Transition Utility Class
   */
  class Transitions {
    constructor(presentation, config) {
      this.presentation = presentation;
      this.config = config;
      this.isTransitioning = false;
      this.currentTransition = config.transition || TransitionTypes.SLIDE;
      this.transitionSpeed = config.transitionSpeed || TransitionSpeeds.NORMAL;
    }

    /**
     * Initialize transitions
     */
    init() {
      // Add transition classes to wrapper
      const {
        wrapper
      } = this.presentation;
      if (wrapper) {
        wrapper.classList.add('swd-transitions-enabled');
        wrapper.setAttribute('data-transition', this.currentTransition);
        wrapper.setAttribute('data-transition-speed', this.getSpeedClass());
      }
    }

    /**
     * Get speed class based on transition speed
     */
    getSpeedClass() {
      if (this.transitionSpeed <= TransitionSpeeds.FAST) return 'fast';
      if (this.transitionSpeed >= TransitionSpeeds.SLOW) return 'slow';
      return 'normal';
    }

    /**
     * Apply transition between slides
     * @param {HTMLElement} oldSlide - Previous slide element
     * @param {HTMLElement} newSlide - New slide element
     * @param {string} direction - 'forward' or 'backward'
     * @returns {Promise} Resolves when transition completes
     */
    async applyTransition(oldSlide, newSlide) {
      let direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'forward';
      if (this.isTransitioning) {
        return Promise.resolve();
      }

      // No transition if type is 'none'
      if (this.currentTransition === TransitionTypes.NONE) {
        return this.noTransition(oldSlide, newSlide);
      }
      this.isTransitioning = true;
      this.presentation.emit('transitionStart', {
        oldSlide,
        newSlide,
        direction
      });
      try {
        // Apply transition based on type
        switch (this.currentTransition) {
          case TransitionTypes.SLIDE:
            await this.slideTransition(oldSlide, newSlide, direction);
            break;
          case TransitionTypes.FADE:
            await this.fadeTransition(oldSlide, newSlide);
            break;
          case TransitionTypes.ZOOM:
            await this.zoomTransition(oldSlide, newSlide, direction);
            break;
          case TransitionTypes.FLIP:
            await this.flipTransition(oldSlide, newSlide, direction);
            break;
          default:
            await this.slideTransition(oldSlide, newSlide, direction);
        }
        this.presentation.emit('transitionEnd', {
          oldSlide,
          newSlide,
          direction
        });
      } finally {
        this.isTransitioning = false;
      }
      return Promise.resolve();
    }

    /**
     * No transition - instant swap
     */
    noTransition(oldSlide, newSlide) {
      if (oldSlide) {
        oldSlide.classList.remove('swd-slide-active');
        oldSlide.classList.add('swd-slide-hidden');
      }
      if (newSlide) {
        newSlide.classList.remove('swd-slide-hidden');
        newSlide.classList.add('swd-slide-active');
      }
      return Promise.resolve();
    }

    /**
     * Slide transition
     */
    slideTransition(oldSlide, newSlide, direction) {
      return new Promise(resolve => {
        const directionClass = direction === 'forward' ? 'slide-left' : 'slide-right';

        // Set initial states
        if (oldSlide) {
          oldSlide.classList.add('swd-transition-out', directionClass);
        }
        if (newSlide) {
          newSlide.classList.remove('swd-slide-hidden');
          newSlide.classList.add('swd-transition-in', directionClass);
        }

        // Wait for animation to complete
        setTimeout(() => {
          // Cleanup old slide
          if (oldSlide) {
            oldSlide.classList.remove('swd-slide-active', 'swd-transition-out', directionClass);
            oldSlide.classList.add('swd-slide-hidden');
          }

          // Activate new slide
          if (newSlide) {
            newSlide.classList.remove('swd-transition-in', directionClass);
            newSlide.classList.add('swd-slide-active');
          }
          resolve();
        }, this.transitionSpeed);
      });
    }

    /**
     * Fade transition
     */
    fadeTransition(oldSlide, newSlide) {
      return new Promise(resolve => {
        // Set initial states
        if (oldSlide) {
          oldSlide.classList.add('swd-fade-out');
        }
        if (newSlide) {
          newSlide.classList.remove('swd-slide-hidden');
          newSlide.classList.add('swd-fade-in');
        }

        // Wait for animation to complete
        setTimeout(() => {
          // Cleanup old slide
          if (oldSlide) {
            oldSlide.classList.remove('swd-slide-active', 'swd-fade-out');
            oldSlide.classList.add('swd-slide-hidden');
          }

          // Activate new slide
          if (newSlide) {
            newSlide.classList.remove('swd-fade-in');
            newSlide.classList.add('swd-slide-active');
          }
          resolve();
        }, this.transitionSpeed);
      });
    }

    /**
     * Zoom transition
     */
    zoomTransition(oldSlide, newSlide, direction) {
      return new Promise(resolve => {
        const zoomClass = direction === 'forward' ? 'zoom-in' : 'zoom-out';

        // Set initial states
        if (oldSlide) {
          oldSlide.classList.add('swd-zoom-out');
        }
        if (newSlide) {
          newSlide.classList.remove('swd-slide-hidden');
          newSlide.classList.add("swd-".concat(zoomClass), 'swd-transition-in');
        }

        // Wait for animation to complete
        setTimeout(() => {
          // Cleanup old slide
          if (oldSlide) {
            oldSlide.classList.remove('swd-slide-active', 'swd-zoom-out');
            oldSlide.classList.add('swd-slide-hidden');
          }

          // Activate new slide
          if (newSlide) {
            newSlide.classList.remove("swd-".concat(zoomClass), 'swd-transition-in');
            newSlide.classList.add('swd-slide-active');
          }
          resolve();
        }, this.transitionSpeed);
      });
    }

    /**
     * Flip transition
     */
    flipTransition(oldSlide, newSlide, direction) {
      return new Promise(resolve => {
        const flipClass = direction === 'forward' ? 'flip-left' : 'flip-right';

        // Set initial states
        if (oldSlide) {
          oldSlide.classList.add('swd-flip-out', flipClass);
        }
        if (newSlide) {
          newSlide.classList.remove('swd-slide-hidden');
          newSlide.classList.add('swd-flip-in', flipClass);
        }

        // Wait for animation to complete
        setTimeout(() => {
          // Cleanup old slide
          if (oldSlide) {
            oldSlide.classList.remove('swd-slide-active', 'swd-flip-out', flipClass);
            oldSlide.classList.add('swd-slide-hidden');
          }

          // Activate new slide
          if (newSlide) {
            newSlide.classList.remove('swd-flip-in', flipClass);
            newSlide.classList.add('swd-slide-active');
          }
          resolve();
        }, this.transitionSpeed);
      });
    }

    /**
     * Set transition type
     * @param {string} type - Transition type from TransitionTypes
     */
    setTransition(type) {
      if (Object.values(TransitionTypes).includes(type)) {
        this.currentTransition = type;
        const {
          wrapper
        } = this.presentation;
        if (wrapper) {
          wrapper.setAttribute('data-transition', type);
        }
        this.presentation.emit('transitionChanged', {
          type
        });
      }
    }

    /**
     * Set transition speed
     * @param {number|string} speed - Speed in ms or 'slow'/'normal'/'fast'
     */
    setSpeed(speed) {
      if (typeof speed === 'string') {
        this.transitionSpeed = TransitionSpeeds[speed.toUpperCase()] || TransitionSpeeds.NORMAL;
      } else if (typeof speed === 'number') {
        this.transitionSpeed = speed;
      }
      const {
        wrapper
      } = this.presentation;
      if (wrapper) {
        wrapper.setAttribute('data-transition-speed', this.getSpeedClass());
        wrapper.style.setProperty('--swd-transition-speed', "".concat(this.transitionSpeed, "ms"));
      }
      this.presentation.emit('transitionSpeedChanged', {
        speed: this.transitionSpeed
      });
    }

    /**
     * Get current transition type
     */
    getTransition() {
      return this.currentTransition;
    }

    /**
     * Get current transition speed
     */
    getSpeed() {
      return this.transitionSpeed;
    }

    /**
     * Check if currently transitioning
     */
    isActive() {
      return this.isTransitioning;
    }

    /**
     * Cleanup
     */
    destroy() {
      this.isTransitioning = false;
    }
  }

  /**
   * Controls - Navigation controls UI
   * @module utils/controls
   */

  /**
   * Controls class - Renders and manages navigation arrows
   */
  class Controls {
    constructor(presentation) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.presentation = presentation;
      this.config = config;
      this.controlsElement = null;
    }

    /**
     * Initialize controls
     */
    init() {
      if (this.config.controls === false) {
        return;
      }
      this.render();
      this.attachEventListeners();
    }

    /**
     * Render controls UI
     */
    render() {
      const {
        wrapper
      } = this.presentation;
      if (!wrapper) return;

      // Create controls container
      this.controlsElement = document.createElement('div');
      this.controlsElement.className = 'swd-controls';

      // Get position from config
      const position = this.config.controlsPosition || 'bottom-right';
      this.controlsElement.setAttribute('data-position', position);

      // Create prev button
      const prevButton = document.createElement('button');
      prevButton.className = 'swd-control-prev';
      prevButton.setAttribute('aria-label', 'Previous slide');
      prevButton.innerHTML = "\n      <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n        <path fill=\"currentColor\" d=\"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z\"/>\n      </svg>\n    ";

      // Create next button
      const nextButton = document.createElement('button');
      nextButton.className = 'swd-control-next';
      nextButton.setAttribute('aria-label', 'Next slide');
      nextButton.innerHTML = "\n      <svg viewBox=\"0 0 24 24\" width=\"24\" height=\"24\">\n        <path fill=\"currentColor\" d=\"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z\"/>\n      </svg>\n    ";

      // Append buttons to controls
      this.controlsElement.appendChild(prevButton);
      this.controlsElement.appendChild(nextButton);

      // Append to wrapper
      wrapper.appendChild(this.controlsElement);
    }

    /**
     * Attach event listeners to control buttons
     */
    attachEventListeners() {
      if (!this.controlsElement) return;
      const prevButton = this.controlsElement.querySelector('.swd-control-prev');
      const nextButton = this.controlsElement.querySelector('.swd-control-next');
      if (prevButton) {
        prevButton.addEventListener('click', e => {
          e.preventDefault();
          this.presentation.prev();
        });
      }
      if (nextButton) {
        nextButton.addEventListener('click', e => {
          e.preventDefault();
          this.presentation.next();
        });
      }

      // Update button states on slide change
      this.presentation.on('afterSlideChange', () => {
        this.updateButtonStates();
      });

      // Initial update
      this.updateButtonStates();
    }

    /**
     * Update button states based on current slide
     */
    updateButtonStates() {
      if (!this.controlsElement) return;
      const {
        currentSlide,
        slides
      } = this.presentation.state;
      const prevButton = this.controlsElement.querySelector('.swd-control-prev');
      const nextButton = this.controlsElement.querySelector('.swd-control-next');

      // Disable/enable buttons based on position and loop setting
      if (!this.config.loop) {
        if (prevButton) {
          prevButton.disabled = currentSlide === 0;
          prevButton.setAttribute('aria-disabled', currentSlide === 0);
        }
        if (nextButton) {
          nextButton.disabled = currentSlide === slides.length - 1;
          nextButton.setAttribute('aria-disabled', currentSlide === slides.length - 1);
        }
      } else {
        // Enable all buttons when looping
        if (prevButton) {
          prevButton.disabled = false;
          prevButton.setAttribute('aria-disabled', 'false');
        }
        if (nextButton) {
          nextButton.disabled = false;
          nextButton.setAttribute('aria-disabled', 'false');
        }
      }
    }

    /**
     * Show controls
     */
    show() {
      if (this.controlsElement) {
        this.controlsElement.classList.remove('swd-controls-hidden');
      }
    }

    /**
     * Hide controls
     */
    hide() {
      if (this.controlsElement) {
        this.controlsElement.classList.add('swd-controls-hidden');
      }
    }

    /**
     * Cleanup
     */
    destroy() {
      if (this.controlsElement && this.controlsElement.parentNode) {
        this.controlsElement.parentNode.removeChild(this.controlsElement);
      }
      this.controlsElement = null;
    }
  }

  /**
   * Progress Bar - Visual progress indicator
   * @module utils/progress
   */

  /**
   * Progress class - Renders and updates progress bar
   */
  class Progress {
    constructor(presentation) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.presentation = presentation;
      this.config = config;
      this.progressElement = null;
      this.progressBar = null;
      this.slideNumberElement = null;
    }

    /**
     * Initialize progress bar
     */
    init() {
      if (this.config.progress === false) {
        return;
      }
      this.render();
      this.attachEventListeners();
    }

    /**
     * Render progress bar UI
     */
    render() {
      const {
        wrapper
      } = this.presentation;
      if (!wrapper) return;

      // Create progress container
      this.progressElement = document.createElement('div');
      this.progressElement.className = 'swd-progress';

      // Get position from config
      const position = this.config.progressPosition || 'bottom';
      this.progressElement.setAttribute('data-position', position);

      // Create progress bar
      this.progressBar = document.createElement('div');
      this.progressBar.className = 'swd-progress-bar';
      this.progressBar.setAttribute('role', 'progressbar');
      this.progressBar.setAttribute('aria-valuemin', '0');
      this.progressBar.setAttribute('aria-valuemax', '100');

      // Append bar to container
      this.progressElement.appendChild(this.progressBar);

      // Append to wrapper
      wrapper.appendChild(this.progressElement);

      // Create slide numbers element if configured
      if (this.config.slideNumbers !== false) {
        this.slideNumberElement = document.createElement('div');
        this.slideNumberElement.className = 'swd-slide-number';
        wrapper.appendChild(this.slideNumberElement);
      }

      // Initial update
      this.update();
    }

    /**
     * Attach event listeners
     */
    attachEventListeners() {
      // Update progress on slide change
      this.presentation.on('afterSlideChange', () => {
        this.update();
      });

      // Update on initialization
      this.presentation.on('afterInit', () => {
        this.update();
      });
    }

    /**
     * Update progress bar based on current slide
     */
    update() {
      if (!this.progressBar) return;
      const {
        currentSlide,
        slides
      } = this.presentation.state;
      const totalSlides = slides.length;
      if (totalSlides === 0) return;

      // Calculate progress percentage
      const progress = (currentSlide + 1) / totalSlides * 100;

      // Update progress bar width
      this.progressBar.style.width = "".concat(progress, "%");

      // Update ARIA attributes
      this.progressBar.setAttribute('aria-valuenow', Math.round(progress));
      this.progressBar.setAttribute('aria-valuetext', "Slide ".concat(currentSlide + 1, " of ").concat(totalSlides));

      // Update slide number UI
      if (this.slideNumberElement) {
        const format = this.config.slideNumberFormat || 'h/v';
        let text = '';
        switch (format) {
          case 'c/t':
          case 'h/v':
            text = "".concat(currentSlide + 1, " / ").concat(totalSlides);
            break;
          case 'c':
            text = "".concat(currentSlide + 1);
            break;
          case 'h.v':
            text = "".concat(currentSlide + 1, ".").concat(totalSlides);
            break;
          default:
            text = "".concat(currentSlide + 1, " / ").concat(totalSlides);
        }
        this.slideNumberElement.textContent = text;
      }
    }

    /**
     * Show progress bar
     */
    show() {
      if (this.progressElement) {
        this.progressElement.classList.remove('swd-progress-hidden');
      }
    }

    /**
     * Hide progress bar
     */
    hide() {
      if (this.progressElement) {
        this.progressElement.classList.add('swd-progress-hidden');
      }
    }

    /**
     * Set progress manually (0-100)
     * @param {number} percentage - Progress percentage
     */
    setProgress(percentage) {
      if (!this.progressBar) return;
      const clampedProgress = Math.max(0, Math.min(100, percentage));
      this.progressBar.style.width = "".concat(clampedProgress, "%");
      this.progressBar.setAttribute('aria-valuenow', Math.round(clampedProgress));
    }

    /**
     * Cleanup
     */
    destroy() {
      if (this.progressElement && this.progressElement.parentNode) {
        this.progressElement.parentNode.removeChild(this.progressElement);
      }
      if (this.slideNumberElement && this.slideNumberElement.parentNode) {
        this.slideNumberElement.parentNode.removeChild(this.slideNumberElement);
      }
      this.progressElement = null;
      this.progressBar = null;
      this.slideNumberElement = null;
    }
  }

  /**
   * Overview - Overview grid mode
   * @module utils/overview
   */
  class Overview {
    constructor(presentation) {
      let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.presentation = presentation;
      this.config = config;
      this.active = false;
      this.boundClick = this.handleClick.bind(this);
    }

    /**
     * Initialize overview mode listener
     */
    init() {
      if (this.config.overview !== false) {
        this.presentation.on('toggleOverview', () => this.toggle());
      }
    }

    /**
     * Toggle overview mode
     */
    toggle() {
      if (this.active) {
        this.deactivate();
      } else {
        this.activate();
      }
    }

    /**
     * Enter overview mode
     */
    activate() {
      if (this.active) return;
      this.active = true;
      this.presentation.state.isOverview = true;
      const {
        container,
        wrapper
      } = this.presentation;
      if (wrapper) {
        wrapper.classList.add('swd-overview-mode');
      }

      // Bind click listener to slides
      const slides = container.querySelectorAll('.swd-slide');
      slides.forEach(slide => {
        slide.addEventListener('click', this.boundClick);
      });
      this.presentation.emit('enterOverview');
    }

    /**
     * Exit overview mode
     */
    deactivate() {
      if (!this.active) return;
      this.active = false;
      this.presentation.state.isOverview = false;
      const {
        container,
        wrapper
      } = this.presentation;
      if (wrapper) {
        wrapper.classList.remove('swd-overview-mode');
      }
      const slides = container.querySelectorAll('.swd-slide');
      slides.forEach(slide => {
        slide.removeEventListener('click', this.boundClick);
      });
      this.presentation.emit('exitOverview');
    }

    /**
     * Handle slide click in overview mode
     * @param {Event} event - Click event
     */
    handleClick(event) {
      if (!this.active) return;
      const slideElement = event.currentTarget;
      const index = parseInt(slideElement.getAttribute('data-index'), 10);
      if (!isNaN(index)) {
        event.preventDefault();
        event.stopPropagation();
        this.presentation.goTo(index);
        this.deactivate();
      }
    }

    /**
     * Cleanup
     */
    destroy() {
      this.deactivate();
    }
  }

  /**
   * Main SWD Class - Primary API interface
   */
  class SWD extends EventEmitter {
    /**
     * Create a new presentation
     * @param {string|HTMLElement} container - Container selector or element
     * @param {Object} options - Configuration options
     */
    constructor(container) {
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      super();

      // Resolve container
      this.container = typeof container === 'string' ? document.querySelector(container) : container;
      if (!this.container) {
        throw new Error('SWD: Container element not found');
      }

      // Merge configuration
      this.config = mergeConfig(DefaultConfig, options);

      // Map autoplay data attributes to autoSlide
      if (this.config.autoplay && this.config.autoSlide === 0) {
        this.config.autoSlide = this.config.autoplayDelay || 3000;
      }

      // Initialize state
      this.state = {
        initialized: false,
        slides: [],
        currentSlide: 0,
        isPlaying: false,
        isFullscreen: false,
        isOverview: false
      };

      // Initialize components
      this.parser = null;
      this.renderer = null;
      this.navigation = null;
      this.touchHandler = null;
      this.fullscreen = null;
      this.exportUtil = null;
      this.transitions = null;
      this.controls = null;
      this.progress = null;
      this.overview = null;

      // Auto-initialize if configured
      if (this.config.autoInit !== false) {
        this.init();
      }
    }

    /**
     * Initialize the presentation
     */
    async init() {
      if (this.state.initialized) {
        console.warn('SWD: Presentation already initialized');
        return;
      }
      try {
        this.emit('beforeInit', this);

        // Parse content
        this.parser = new Parser(this.config);
        this.state.slides = await this.parser.parse(this.config.source, this.container);

        // Initialize renderer
        this.renderer = new Renderer(this.config);
        this.renderer.render(this.container, this.state.slides);

        // Store wrapper reference for transitions and other utilities
        this.wrapper = this.container.querySelector('.swd-wrapper');

        // Initialize transitions
        this.transitions = new Transitions(this, this.config);
        this.transitions.init();

        // Initialize navigation
        this.navigation = new Navigation(this, this.config);
        this.navigation.init();

        // Initialize touch handler
        this.touchHandler = new TouchHandler(this, this.config);
        this.touchHandler.init();

        // Initialize fullscreen
        this.fullscreen = new Fullscreen(this, this.config);
        this.fullscreen.init();

        // Initialize controls
        this.controls = new Controls(this, this.config);
        this.controls.init();

        // Initialize progress bar
        this.progress = new Progress(this, this.config);
        this.progress.init();

        // Initialize overview utility
        this.overview = new Overview(this, this.config);
        this.overview.init();

        // Initialize export utility
        this.exportUtil = new ExportUtil(this, this.config);

        // Mark as initialized
        this.state.initialized = true;
        this.emit('afterInit', this);
        this.emit('ready', this);
        if (this.config.dev) {
          // console.log('SWD: Presentation initialized successfully');
        }
      } catch (error) {
        this.emit('error', error);
        throw error;
      }
    }

    /**
     * Navigate to next slide
     */
    next() {
      if (!this.state.initialized) return;
      this.navigation.next();
    }

    /**
     * Navigate to previous slide
     */
    prev() {
      if (!this.state.initialized) return;
      this.navigation.prev();
    }

    /**
     * Go to specific slide
     * @param {number} index - Slide index
     */
    goTo(index) {
      if (!this.state.initialized) return;
      return this.navigation.goTo(index);
    }

    /**
     * Go to first slide
     */
    goToFirst() {
      this.goTo(0);
    }

    /**
     * Go to last slide
     */
    goToLast() {
      this.goTo(this.state.slides.length - 1);
    }

    /**
     * Start auto-play mode
     */
    start() {
      if (!this.state.initialized) return;
      this.navigation.startAutoPlay();
    }

    /**
     * Stop auto-play mode
     */
    stop() {
      if (!this.state.initialized) return;
      this.navigation.stopAutoPlay();
    }

    /**
     * Toggle fullscreen mode
     */
    toggleFullscreen() {
      if (!this.state.initialized || !this.fullscreen) return;
      this.fullscreen.toggle();
    }

    /**
     * Enter fullscreen mode
     */
    enterFullscreen() {
      if (!this.state.initialized || !this.fullscreen) return;
      this.fullscreen.enter();
    }

    /**
     * Exit fullscreen mode
     */
    exitFullscreen() {
      if (!this.state.initialized || !this.fullscreen) return;
      this.fullscreen.exit();
    }

    /**
     * Set transition type
     * @param {string} type - Transition type ('none', 'slide', 'fade', 'zoom', 'flip')
     */
    setTransition(type) {
      if (!this.state.initialized || !this.transitions) return;
      this.transitions.setTransition(type);
    }

    /**
     * Set transition speed
     * @param {number|string} speed - Speed in ms or 'slow'/'normal'/'fast'
     */
    setTransitionSpeed(speed) {
      if (!this.state.initialized || !this.transitions) return;
      this.transitions.setSpeed(speed);
    }

    /**
     * Toggle overview mode
     */
    toggleOverview() {
      // Overview mode will be implemented in overview utility
      this.emit('toggleOverview');
    }

    /**
     * Export to PDF
     */
    exportPDF() {
      if (!this.state.initialized || !this.exportUtil) return;
      this.exportUtil.toPDF();
    }

    /**
     * Export to HTML
     */
    exportHTML() {
      if (!this.state.initialized || !this.exportUtil) return null;
      return this.exportUtil.toHTML();
    }

    /**
     * Export to JSON
     */
    exportJSON() {
      if (!this.state.initialized || !this.exportUtil) return null;
      return this.exportUtil.toJSON();
    }

    /**
     * Download HTML file
     */
    downloadHTML() {
      if (!this.state.initialized || !this.exportUtil) return null;
      return this.exportUtil.downloadHTML();
    }

    /**
     * Download JSON file
     */
    downloadJSON() {
      if (!this.state.initialized || !this.exportUtil) return;
      this.exportUtil.downloadJSON();
    }

    /**
     * Destroy the presentation and cleanup
     */
    destroy() {
      if (!this.state.initialized) return;
      this.emit('beforeDestroy', this);

      // Cleanup navigation
      if (this.navigation) {
        this.navigation.destroy();
      }

      // Cleanup touch handler
      if (this.touchHandler) {
        this.touchHandler.destroy();
      }

      // Cleanup fullscreen
      if (this.fullscreen) {
        this.fullscreen.destroy();
      }

      // Cleanup controls
      if (this.controls) {
        this.controls.destroy();
      }

      // Cleanup progress bar
      if (this.progress) {
        this.progress.destroy();
      }

      // Cleanup overview mode
      if (this.overview) {
        this.overview.destroy();
      }

      // Cleanup renderer
      if (this.renderer) {
        this.renderer.destroy();
      }

      // Clear container
      this.container.innerHTML = '';

      // Reset state
      this.state = {
        initialized: false,
        slides: [],
        currentSlide: 0,
        isPlaying: false,
        isFullscreen: false,
        isOverview: false
      };

      // Remove all event listeners
      this.offAll();
      this.emit('afterDestroy');
      if (this.config.dev) ;
    }

    /**
     * Get current slide index
     * @returns {number}
     */
    getCurrentSlide() {
      return this.state.currentSlide;
    }

    /**
     * Get total number of slides
     * @returns {number}
     */
    getTotalSlides() {
      return this.state.slides.length;
    }

    /**
     * Get presentation state
     * @returns {Object}
     */
    getState() {
      return _objectSpread2({}, this.state);
    }

    /**
     * Auto-initialize all presentations on page
     * @param {string} selector - Container selector (default: '[data-swd-id]')
     * @param {Object} options - Default options for all presentations
     */
    static autoInit() {
      let selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '[data-swd-id]';
      let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      const containers = document.querySelectorAll(selector);
      const instances = [];
      containers.forEach(container => {
        // Read configuration from data attributes
        const dataConfig = SWD.readDataAttributes(container);

        // Merge options: defaults < data attributes < passed options
        const config = _objectSpread2(_objectSpread2({}, dataConfig), options);
        const instance = new SWD(container, config);
        instances.push(instance);
      });
      return instances;
    }

    /**
     * Read configuration from data attributes
     * @param {HTMLElement} element - Element to read attributes from
     * @returns {Object} - Configuration object
     */
    static readDataAttributes(element) {
      const config = {};
      const {
        dataset
      } = element;

      // Map data attributes to config properties
      if (dataset.swdTheme) config.theme = dataset.swdTheme;
      if (dataset.swdTransition) config.transition = dataset.swdTransition;
      if (dataset.swdSource) config.source = dataset.swdSource;
      if (dataset.swdMarkdownUrl) config.markdownUrl = dataset.swdMarkdownUrl;
      if (dataset.swdJsonUrl) config.jsonUrl = dataset.swdJsonUrl;

      // Boolean attributes
      if (dataset.swdKeyboard) config.keyboard = dataset.swdKeyboard !== 'false';
      if (dataset.swdControl || dataset.swdControls) {
        config.controls = (dataset.swdControl || dataset.swdControls) !== 'false';
      }
      if (dataset.swdProgress) config.progress = dataset.swdProgress !== 'false';
      if (dataset.swdLoop) config.loop = dataset.swdLoop !== 'false';
      if (dataset.swdAutoplay) config.autoplay = dataset.swdAutoplay !== 'false';

      // Numeric attributes
      if (dataset.swdAutoplayDelay) {
        config.autoplayDelay = parseInt(dataset.swdAutoplayDelay, 10);
      }
      if (dataset.swdTransitionSpeed) {
        config.transitionSpeed = parseInt(dataset.swdTransitionSpeed, 10);
      }
      return config;
    }
  }

  // Export for use in browser and modules
  if (typeof window !== 'undefined') {
    window.SWD = SWD;

    // Auto-initialize on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        SWD.autoInit();
      });
    } else {
      // DOM is already ready
      SWD.autoInit();
    }
  }

  return SWD;

}));
//# sourceMappingURL=swd.js.map
