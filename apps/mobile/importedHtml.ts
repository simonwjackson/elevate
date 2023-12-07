export default `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React + TS</title>
    <script type="module" crossorigin>
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node2 of mutation.addedNodes) {
        if (node2.tagName === "LINK" && node2.rel === "modulepreload")
          processPreload(node2);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(x2) {
  return x2 && x2.__esModule && Object.prototype.hasOwnProperty.call(x2, "default") ? x2["default"] : x2;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production_min = {};
var react = { exports: {} };
var react_production_min = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var l$1 = Symbol.for("react.element"), n$1 = Symbol.for("react.portal"), p$2 = Symbol.for("react.fragment"), q$2 = Symbol.for("react.strict_mode"), r = Symbol.for("react.profiler"), t = Symbol.for("react.provider"), u = Symbol.for("react.context"), v$2 = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), x$1 = Symbol.for("react.memo"), y$1 = Symbol.for("react.lazy"), z$2 = Symbol.iterator;
function A$2(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = z$2 && a[z$2] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var B$2 = { isMounted: function() {
  return false;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, C$2 = Object.assign, D$2 = {};
function E$2(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$2;
  this.updater = e || B$2;
}
E$2.prototype.isReactComponent = {};
E$2.prototype.setState = function(a, b) {
  if ("object" !== typeof a && "function" !== typeof a && null != a)
    throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, a, b, "setState");
};
E$2.prototype.forceUpdate = function(a) {
  this.updater.enqueueForceUpdate(this, a, "forceUpdate");
};
function F$1() {
}
F$1.prototype = E$2.prototype;
function G$2(a, b, e) {
  this.props = a;
  this.context = b;
  this.refs = D$2;
  this.updater = e || B$2;
}
var H$2 = G$2.prototype = new F$1();
H$2.constructor = G$2;
C$2(H$2, E$2.prototype);
H$2.isPureReactComponent = true;
var I$2 = Array.isArray, J$1 = Object.prototype.hasOwnProperty, K$2 = { current: null }, L$2 = { key: true, ref: true, __self: true, __source: true };
function M$2(a, b, e) {
  var d, c = {}, k2 = null, h = null;
  if (null != b)
    for (d in void 0 !== b.ref && (h = b.ref), void 0 !== b.key && (k2 = "" + b.key), b)
      J$1.call(b, d) && !L$2.hasOwnProperty(d) && (c[d] = b[d]);
  var g2 = arguments.length - 2;
  if (1 === g2)
    c.children = e;
  else if (1 < g2) {
    for (var f2 = Array(g2), m2 = 0; m2 < g2; m2++)
      f2[m2] = arguments[m2 + 2];
    c.children = f2;
  }
  if (a && a.defaultProps)
    for (d in g2 = a.defaultProps, g2)
      void 0 === c[d] && (c[d] = g2[d]);
  return { $$typeof: l$1, type: a, key: k2, ref: h, props: c, _owner: K$2.current };
}
function N$2(a, b) {
  return { $$typeof: l$1, type: a.type, key: b, ref: a.ref, props: a.props, _owner: a._owner };
}
function O$2(a) {
  return "object" === typeof a && null !== a && a.$$typeof === l$1;
}
function escape(a) {
  var b = { "=": "=0", ":": "=2" };
  return "$" + a.replace(/[=:]/g, function(a2) {
    return b[a2];
  });
}
var P$2 = /\/+/g;
function Q$2(a, b) {
  return "object" === typeof a && null !== a && null != a.key ? escape("" + a.key) : b.toString(36);
}
function R$2(a, b, e, d, c) {
  var k2 = typeof a;
  if ("undefined" === k2 || "boolean" === k2)
    a = null;
  var h = false;
  if (null === a)
    h = true;
  else
    switch (k2) {
      case "string":
      case "number":
        h = true;
        break;
      case "object":
        switch (a.$$typeof) {
          case l$1:
          case n$1:
            h = true;
        }
    }
  if (h)
    return h = a, c = c(h), a = "" === d ? "." + Q$2(h, 0) : d, I$2(c) ? (e = "", null != a && (e = a.replace(P$2, "$&/") + "/"), R$2(c, b, e, "", function(a2) {
      return a2;
    })) : null != c && (O$2(c) && (c = N$2(c, e + (!c.key || h && h.key === c.key ? "" : ("" + c.key).replace(P$2, "$&/") + "/") + a)), b.push(c)), 1;
  h = 0;
  d = "" === d ? "." : d + ":";
  if (I$2(a))
    for (var g2 = 0; g2 < a.length; g2++) {
      k2 = a[g2];
      var f2 = d + Q$2(k2, g2);
      h += R$2(k2, b, e, f2, c);
    }
  else if (f2 = A$2(a), "function" === typeof f2)
    for (a = f2.call(a), g2 = 0; !(k2 = a.next()).done; )
      k2 = k2.value, f2 = d + Q$2(k2, g2++), h += R$2(k2, b, e, f2, c);
  else if ("object" === k2)
    throw b = String(a), Error("Objects are not valid as a React child (found: " + ("[object Object]" === b ? "object with keys {" + Object.keys(a).join(", ") + "}" : b) + "). If you meant to render a collection of children, use an array instead.");
  return h;
}
function S$1(a, b, e) {
  if (null == a)
    return a;
  var d = [], c = 0;
  R$2(a, d, "", "", function(a2) {
    return b.call(e, a2, c++);
  });
  return d;
}
function T$2(a) {
  if (-1 === a._status) {
    var b = a._result;
    b = b();
    b.then(function(b2) {
      if (0 === a._status || -1 === a._status)
        a._status = 1, a._result = b2;
    }, function(b2) {
      if (0 === a._status || -1 === a._status)
        a._status = 2, a._result = b2;
    });
    -1 === a._status && (a._status = 0, a._result = b);
  }
  if (1 === a._status)
    return a._result.default;
  throw a._result;
}
var U$2 = { current: null }, V$2 = { transition: null }, W$2 = { ReactCurrentDispatcher: U$2, ReactCurrentBatchConfig: V$2, ReactCurrentOwner: K$2 };
react_production_min.Children = { map: S$1, forEach: function(a, b, e) {
  S$1(a, function() {
    b.apply(this, arguments);
  }, e);
}, count: function(a) {
  var b = 0;
  S$1(a, function() {
    b++;
  });
  return b;
}, toArray: function(a) {
  return S$1(a, function(a2) {
    return a2;
  }) || [];
}, only: function(a) {
  if (!O$2(a))
    throw Error("React.Children.only expected to receive a single React element child.");
  return a;
} };
react_production_min.Component = E$2;
react_production_min.Fragment = p$2;
react_production_min.Profiler = r;
react_production_min.PureComponent = G$2;
react_production_min.StrictMode = q$2;
react_production_min.Suspense = w;
react_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W$2;
react_production_min.cloneElement = function(a, b, e) {
  if (null === a || void 0 === a)
    throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + a + ".");
  var d = C$2({}, a.props), c = a.key, k2 = a.ref, h = a._owner;
  if (null != b) {
    void 0 !== b.ref && (k2 = b.ref, h = K$2.current);
    void 0 !== b.key && (c = "" + b.key);
    if (a.type && a.type.defaultProps)
      var g2 = a.type.defaultProps;
    for (f2 in b)
      J$1.call(b, f2) && !L$2.hasOwnProperty(f2) && (d[f2] = void 0 === b[f2] && void 0 !== g2 ? g2[f2] : b[f2]);
  }
  var f2 = arguments.length - 2;
  if (1 === f2)
    d.children = e;
  else if (1 < f2) {
    g2 = Array(f2);
    for (var m2 = 0; m2 < f2; m2++)
      g2[m2] = arguments[m2 + 2];
    d.children = g2;
  }
  return { $$typeof: l$1, type: a.type, key: c, ref: k2, props: d, _owner: h };
};
react_production_min.createContext = function(a) {
  a = { $$typeof: u, _currentValue: a, _currentValue2: a, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null };
  a.Provider = { $$typeof: t, _context: a };
  return a.Consumer = a;
};
react_production_min.createElement = M$2;
react_production_min.createFactory = function(a) {
  var b = M$2.bind(null, a);
  b.type = a;
  return b;
};
react_production_min.createRef = function() {
  return { current: null };
};
react_production_min.forwardRef = function(a) {
  return { $$typeof: v$2, render: a };
};
react_production_min.isValidElement = O$2;
react_production_min.lazy = function(a) {
  return { $$typeof: y$1, _payload: { _status: -1, _result: a }, _init: T$2 };
};
react_production_min.memo = function(a, b) {
  return { $$typeof: x$1, type: a, compare: void 0 === b ? null : b };
};
react_production_min.startTransition = function(a) {
  var b = V$2.transition;
  V$2.transition = {};
  try {
    a();
  } finally {
    V$2.transition = b;
  }
};
react_production_min.unstable_act = function() {
  throw Error("act(...) is not supported in production builds of React.");
};
react_production_min.useCallback = function(a, b) {
  return U$2.current.useCallback(a, b);
};
react_production_min.useContext = function(a) {
  return U$2.current.useContext(a);
};
react_production_min.useDebugValue = function() {
};
react_production_min.useDeferredValue = function(a) {
  return U$2.current.useDeferredValue(a);
};
react_production_min.useEffect = function(a, b) {
  return U$2.current.useEffect(a, b);
};
react_production_min.useId = function() {
  return U$2.current.useId();
};
react_production_min.useImperativeHandle = function(a, b, e) {
  return U$2.current.useImperativeHandle(a, b, e);
};
react_production_min.useInsertionEffect = function(a, b) {
  return U$2.current.useInsertionEffect(a, b);
};
react_production_min.useLayoutEffect = function(a, b) {
  return U$2.current.useLayoutEffect(a, b);
};
react_production_min.useMemo = function(a, b) {
  return U$2.current.useMemo(a, b);
};
react_production_min.useReducer = function(a, b, e) {
  return U$2.current.useReducer(a, b, e);
};
react_production_min.useRef = function(a) {
  return U$2.current.useRef(a);
};
react_production_min.useState = function(a) {
  return U$2.current.useState(a);
};
react_production_min.useSyncExternalStore = function(a, b, e) {
  return U$2.current.useSyncExternalStore(a, b, e);
};
react_production_min.useTransition = function() {
  return U$2.current.useTransition();
};
react_production_min.version = "18.2.0";
{
  react.exports = react_production_min;
}
var reactExports = react.exports;
const React = /* @__PURE__ */ getDefaultExportFromCjs(reactExports);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f$1 = reactExports, k$1 = Symbol.for("react.element"), l = Symbol.for("react.fragment"), m$1 = Object.prototype.hasOwnProperty, n = f$1.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, p$1 = { key: true, ref: true, __self: true, __source: true };
function q$1(c, a, g2) {
  var b, d = {}, e = null, h = null;
  void 0 !== g2 && (e = "" + g2);
  void 0 !== a.key && (e = "" + a.key);
  void 0 !== a.ref && (h = a.ref);
  for (b in a)
    m$1.call(a, b) && !p$1.hasOwnProperty(b) && (d[b] = a[b]);
  if (c && c.defaultProps)
    for (b in a = c.defaultProps, a)
      void 0 === d[b] && (d[b] = a[b]);
  return { $$typeof: k$1, type: c, key: e, ref: h, props: d, _owner: n.current };
}
reactJsxRuntime_production_min.Fragment = l;
reactJsxRuntime_production_min.jsx = q$1;
reactJsxRuntime_production_min.jsxs = q$1;
{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = {};
var reactDom = { exports: {} };
var reactDom_production_min = {};
var scheduler = { exports: {} };
var scheduler_production_min = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function f2(a, b) {
    var c = a.length;
    a.push(b);
    a:
      for (; 0 < c; ) {
        var d = c - 1 >>> 1, e = a[d];
        if (0 < g2(e, b))
          a[d] = b, a[c] = e, c = d;
        else
          break a;
      }
  }
  function h(a) {
    return 0 === a.length ? null : a[0];
  }
  function k2(a) {
    if (0 === a.length)
      return null;
    var b = a[0], c = a.pop();
    if (c !== b) {
      a[0] = c;
      a:
        for (var d = 0, e = a.length, w2 = e >>> 1; d < w2; ) {
          var m2 = 2 * (d + 1) - 1, C2 = a[m2], n2 = m2 + 1, x2 = a[n2];
          if (0 > g2(C2, c))
            n2 < e && 0 > g2(x2, C2) ? (a[d] = x2, a[n2] = c, d = n2) : (a[d] = C2, a[m2] = c, d = m2);
          else if (n2 < e && 0 > g2(x2, c))
            a[d] = x2, a[n2] = c, d = n2;
          else
            break a;
        }
    }
    return b;
  }
  function g2(a, b) {
    var c = a.sortIndex - b.sortIndex;
    return 0 !== c ? c : a.id - b.id;
  }
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var l2 = performance;
    exports.unstable_now = function() {
      return l2.now();
    };
  } else {
    var p2 = Date, q2 = p2.now();
    exports.unstable_now = function() {
      return p2.now() - q2;
    };
  }
  var r2 = [], t2 = [], u2 = 1, v2 = null, y2 = 3, z2 = false, A2 = false, B2 = false, D2 = "function" === typeof setTimeout ? setTimeout : null, E2 = "function" === typeof clearTimeout ? clearTimeout : null, F2 = "undefined" !== typeof setImmediate ? setImmediate : null;
  "undefined" !== typeof navigator && void 0 !== navigator.scheduling && void 0 !== navigator.scheduling.isInputPending && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function G2(a) {
    for (var b = h(t2); null !== b; ) {
      if (null === b.callback)
        k2(t2);
      else if (b.startTime <= a)
        k2(t2), b.sortIndex = b.expirationTime, f2(r2, b);
      else
        break;
      b = h(t2);
    }
  }
  function H2(a) {
    B2 = false;
    G2(a);
    if (!A2)
      if (null !== h(r2))
        A2 = true, I2(J2);
      else {
        var b = h(t2);
        null !== b && K2(H2, b.startTime - a);
      }
  }
  function J2(a, b) {
    A2 = false;
    B2 && (B2 = false, E2(L2), L2 = -1);
    z2 = true;
    var c = y2;
    try {
      G2(b);
      for (v2 = h(r2); null !== v2 && (!(v2.expirationTime > b) || a && !M2()); ) {
        var d = v2.callback;
        if ("function" === typeof d) {
          v2.callback = null;
          y2 = v2.priorityLevel;
          var e = d(v2.expirationTime <= b);
          b = exports.unstable_now();
          "function" === typeof e ? v2.callback = e : v2 === h(r2) && k2(r2);
          G2(b);
        } else
          k2(r2);
        v2 = h(r2);
      }
      if (null !== v2)
        var w2 = true;
      else {
        var m2 = h(t2);
        null !== m2 && K2(H2, m2.startTime - b);
        w2 = false;
      }
      return w2;
    } finally {
      v2 = null, y2 = c, z2 = false;
    }
  }
  var N2 = false, O2 = null, L2 = -1, P2 = 5, Q2 = -1;
  function M2() {
    return exports.unstable_now() - Q2 < P2 ? false : true;
  }
  function R2() {
    if (null !== O2) {
      var a = exports.unstable_now();
      Q2 = a;
      var b = true;
      try {
        b = O2(true, a);
      } finally {
        b ? S2() : (N2 = false, O2 = null);
      }
    } else
      N2 = false;
  }
  var S2;
  if ("function" === typeof F2)
    S2 = function() {
      F2(R2);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var T2 = new MessageChannel(), U2 = T2.port2;
    T2.port1.onmessage = R2;
    S2 = function() {
      U2.postMessage(null);
    };
  } else
    S2 = function() {
      D2(R2, 0);
    };
  function I2(a) {
    O2 = a;
    N2 || (N2 = true, S2());
  }
  function K2(a, b) {
    L2 = D2(function() {
      a(exports.unstable_now());
    }, b);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(a) {
    a.callback = null;
  };
  exports.unstable_continueExecution = function() {
    A2 || z2 || (A2 = true, I2(J2));
  };
  exports.unstable_forceFrameRate = function(a) {
    0 > a || 125 < a ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : P2 = 0 < a ? Math.floor(1e3 / a) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return y2;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return h(r2);
  };
  exports.unstable_next = function(a) {
    switch (y2) {
      case 1:
      case 2:
      case 3:
        var b = 3;
        break;
      default:
        b = y2;
    }
    var c = y2;
    y2 = b;
    try {
      return a();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(a, b) {
    switch (a) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        a = 3;
    }
    var c = y2;
    y2 = a;
    try {
      return b();
    } finally {
      y2 = c;
    }
  };
  exports.unstable_scheduleCallback = function(a, b, c) {
    var d = exports.unstable_now();
    "object" === typeof c && null !== c ? (c = c.delay, c = "number" === typeof c && 0 < c ? d + c : d) : c = d;
    switch (a) {
      case 1:
        var e = -1;
        break;
      case 2:
        e = 250;
        break;
      case 5:
        e = 1073741823;
        break;
      case 4:
        e = 1e4;
        break;
      default:
        e = 5e3;
    }
    e = c + e;
    a = { id: u2++, callback: b, priorityLevel: a, startTime: c, expirationTime: e, sortIndex: -1 };
    c > d ? (a.sortIndex = c, f2(t2, a), null === h(r2) && a === h(t2) && (B2 ? (E2(L2), L2 = -1) : B2 = true, K2(H2, c - d))) : (a.sortIndex = e, f2(r2, a), A2 || z2 || (A2 = true, I2(J2)));
    return a;
  };
  exports.unstable_shouldYield = M2;
  exports.unstable_wrapCallback = function(a) {
    var b = y2;
    return function() {
      var c = y2;
      y2 = b;
      try {
        return a.apply(this, arguments);
      } finally {
        y2 = c;
      }
    };
  };
})(scheduler_production_min);
{
  scheduler.exports = scheduler_production_min;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var aa = reactExports, ca = schedulerExports;
function p(a) {
  for (var b = "https://reactjs.org/docs/error-decoder.html?invariant=" + a, c = 1; c < arguments.length; c++)
    b += "&args[]=" + encodeURIComponent(arguments[c]);
  return "Minified React error #" + a + "; visit " + b + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var da = /* @__PURE__ */ new Set(), ea = {};
function fa(a, b) {
  ha(a, b);
  ha(a + "Capture", b);
}
function ha(a, b) {
  ea[a] = b;
  for (a = 0; a < b.length; a++)
    da.add(b[a]);
}
var ia = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), ja = Object.prototype.hasOwnProperty, ka = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, la = {}, ma = {};
function oa(a) {
  if (ja.call(ma, a))
    return true;
  if (ja.call(la, a))
    return false;
  if (ka.test(a))
    return ma[a] = true;
  la[a] = true;
  return false;
}
function pa(a, b, c, d) {
  if (null !== c && 0 === c.type)
    return false;
  switch (typeof b) {
    case "function":
    case "symbol":
      return true;
    case "boolean":
      if (d)
        return false;
      if (null !== c)
        return !c.acceptsBooleans;
      a = a.toLowerCase().slice(0, 5);
      return "data-" !== a && "aria-" !== a;
    default:
      return false;
  }
}
function qa(a, b, c, d) {
  if (null === b || "undefined" === typeof b || pa(a, b, c, d))
    return true;
  if (d)
    return false;
  if (null !== c)
    switch (c.type) {
      case 3:
        return !b;
      case 4:
        return false === b;
      case 5:
        return isNaN(b);
      case 6:
        return isNaN(b) || 1 > b;
    }
  return false;
}
function v$1(a, b, c, d, e, f2, g2) {
  this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
  this.attributeName = d;
  this.attributeNamespace = e;
  this.mustUseProperty = c;
  this.propertyName = a;
  this.type = b;
  this.sanitizeURL = f2;
  this.removeEmptyString = g2;
}
var z$1 = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(a) {
  z$1[a] = new v$1(a, 0, false, a, null, false, false);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(a) {
  var b = a[0];
  z$1[b] = new v$1(b, 1, false, a[1], null, false, false);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(a) {
  z$1[a] = new v$1(a, 2, false, a.toLowerCase(), null, false, false);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(a) {
  z$1[a] = new v$1(a, 2, false, a, null, false, false);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(a) {
  z$1[a] = new v$1(a, 3, false, a.toLowerCase(), null, false, false);
});
["checked", "multiple", "muted", "selected"].forEach(function(a) {
  z$1[a] = new v$1(a, 3, true, a, null, false, false);
});
["capture", "download"].forEach(function(a) {
  z$1[a] = new v$1(a, 4, false, a, null, false, false);
});
["cols", "rows", "size", "span"].forEach(function(a) {
  z$1[a] = new v$1(a, 6, false, a, null, false, false);
});
["rowSpan", "start"].forEach(function(a) {
  z$1[a] = new v$1(a, 5, false, a.toLowerCase(), null, false, false);
});
var ra = /[\-:]([a-z])/g;
function sa(a) {
  return a[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(a) {
  var b = a.replace(
    ra,
    sa
  );
  z$1[b] = new v$1(b, 1, false, a, null, false, false);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(a) {
  var b = a.replace(ra, sa);
  z$1[b] = new v$1(b, 1, false, a, "http://www.w3.org/1999/xlink", false, false);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(a) {
  var b = a.replace(ra, sa);
  z$1[b] = new v$1(b, 1, false, a, "http://www.w3.org/XML/1998/namespace", false, false);
});
["tabIndex", "crossOrigin"].forEach(function(a) {
  z$1[a] = new v$1(a, 1, false, a.toLowerCase(), null, false, false);
});
z$1.xlinkHref = new v$1("xlinkHref", 1, false, "xlink:href", "http://www.w3.org/1999/xlink", true, false);
["src", "href", "action", "formAction"].forEach(function(a) {
  z$1[a] = new v$1(a, 1, false, a.toLowerCase(), null, true, true);
});
function ta(a, b, c, d) {
  var e = z$1.hasOwnProperty(b) ? z$1[b] : null;
  if (null !== e ? 0 !== e.type : d || !(2 < b.length) || "o" !== b[0] && "O" !== b[0] || "n" !== b[1] && "N" !== b[1])
    qa(b, c, e, d) && (c = null), d || null === e ? oa(b) && (null === c ? a.removeAttribute(b) : a.setAttribute(b, "" + c)) : e.mustUseProperty ? a[e.propertyName] = null === c ? 3 === e.type ? false : "" : c : (b = e.attributeName, d = e.attributeNamespace, null === c ? a.removeAttribute(b) : (e = e.type, c = 3 === e || 4 === e && true === c ? "" : "" + c, d ? a.setAttributeNS(d, b, c) : a.setAttribute(b, c)));
}
var ua = aa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, va = Symbol.for("react.element"), wa = Symbol.for("react.portal"), ya = Symbol.for("react.fragment"), za = Symbol.for("react.strict_mode"), Aa = Symbol.for("react.profiler"), Ba = Symbol.for("react.provider"), Ca = Symbol.for("react.context"), Da = Symbol.for("react.forward_ref"), Ea = Symbol.for("react.suspense"), Fa = Symbol.for("react.suspense_list"), Ga = Symbol.for("react.memo"), Ha = Symbol.for("react.lazy");
var Ia = Symbol.for("react.offscreen");
var Ja = Symbol.iterator;
function Ka(a) {
  if (null === a || "object" !== typeof a)
    return null;
  a = Ja && a[Ja] || a["@@iterator"];
  return "function" === typeof a ? a : null;
}
var A$1 = Object.assign, La;
function Ma(a) {
  if (void 0 === La)
    try {
      throw Error();
    } catch (c) {
      var b = c.stack.trim().match(/\n( *(at )?)/);
      La = b && b[1] || "";
    }
  return "\n" + La + a;
}
var Na = false;
function Oa(a, b) {
  if (!a || Na)
    return "";
  Na = true;
  var c = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (b)
      if (b = function() {
        throw Error();
      }, Object.defineProperty(b.prototype, "props", { set: function() {
        throw Error();
      } }), "object" === typeof Reflect && Reflect.construct) {
        try {
          Reflect.construct(b, []);
        } catch (l2) {
          var d = l2;
        }
        Reflect.construct(a, [], b);
      } else {
        try {
          b.call();
        } catch (l2) {
          d = l2;
        }
        a.call(b.prototype);
      }
    else {
      try {
        throw Error();
      } catch (l2) {
        d = l2;
      }
      a();
    }
  } catch (l2) {
    if (l2 && d && "string" === typeof l2.stack) {
      for (var e = l2.stack.split("\n"), f2 = d.stack.split("\n"), g2 = e.length - 1, h = f2.length - 1; 1 <= g2 && 0 <= h && e[g2] !== f2[h]; )
        h--;
      for (; 1 <= g2 && 0 <= h; g2--, h--)
        if (e[g2] !== f2[h]) {
          if (1 !== g2 || 1 !== h) {
            do
              if (g2--, h--, 0 > h || e[g2] !== f2[h]) {
                var k2 = "\n" + e[g2].replace(" at new ", " at ");
                a.displayName && k2.includes("<anonymous>") && (k2 = k2.replace("<anonymous>", a.displayName));
                return k2;
              }
            while (1 <= g2 && 0 <= h);
          }
          break;
        }
    }
  } finally {
    Na = false, Error.prepareStackTrace = c;
  }
  return (a = a ? a.displayName || a.name : "") ? Ma(a) : "";
}
function Pa(a) {
  switch (a.tag) {
    case 5:
      return Ma(a.type);
    case 16:
      return Ma("Lazy");
    case 13:
      return Ma("Suspense");
    case 19:
      return Ma("SuspenseList");
    case 0:
    case 2:
    case 15:
      return a = Oa(a.type, false), a;
    case 11:
      return a = Oa(a.type.render, false), a;
    case 1:
      return a = Oa(a.type, true), a;
    default:
      return "";
  }
}
function Qa(a) {
  if (null == a)
    return null;
  if ("function" === typeof a)
    return a.displayName || a.name || null;
  if ("string" === typeof a)
    return a;
  switch (a) {
    case ya:
      return "Fragment";
    case wa:
      return "Portal";
    case Aa:
      return "Profiler";
    case za:
      return "StrictMode";
    case Ea:
      return "Suspense";
    case Fa:
      return "SuspenseList";
  }
  if ("object" === typeof a)
    switch (a.$$typeof) {
      case Ca:
        return (a.displayName || "Context") + ".Consumer";
      case Ba:
        return (a._context.displayName || "Context") + ".Provider";
      case Da:
        var b = a.render;
        a = a.displayName;
        a || (a = b.displayName || b.name || "", a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
        return a;
      case Ga:
        return b = a.displayName || null, null !== b ? b : Qa(a.type) || "Memo";
      case Ha:
        b = a._payload;
        a = a._init;
        try {
          return Qa(a(b));
        } catch (c) {
        }
    }
  return null;
}
function Ra(a) {
  var b = a.type;
  switch (a.tag) {
    case 24:
      return "Cache";
    case 9:
      return (b.displayName || "Context") + ".Consumer";
    case 10:
      return (b._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return a = b.render, a = a.displayName || a.name || "", b.displayName || ("" !== a ? "ForwardRef(" + a + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return b;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return Qa(b);
    case 8:
      return b === za ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if ("function" === typeof b)
        return b.displayName || b.name || null;
      if ("string" === typeof b)
        return b;
  }
  return null;
}
function Sa(a) {
  switch (typeof a) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return a;
    case "object":
      return a;
    default:
      return "";
  }
}
function Ta(a) {
  var b = a.type;
  return (a = a.nodeName) && "input" === a.toLowerCase() && ("checkbox" === b || "radio" === b);
}
function Ua(a) {
  var b = Ta(a) ? "checked" : "value", c = Object.getOwnPropertyDescriptor(a.constructor.prototype, b), d = "" + a[b];
  if (!a.hasOwnProperty(b) && "undefined" !== typeof c && "function" === typeof c.get && "function" === typeof c.set) {
    var e = c.get, f2 = c.set;
    Object.defineProperty(a, b, { configurable: true, get: function() {
      return e.call(this);
    }, set: function(a2) {
      d = "" + a2;
      f2.call(this, a2);
    } });
    Object.defineProperty(a, b, { enumerable: c.enumerable });
    return { getValue: function() {
      return d;
    }, setValue: function(a2) {
      d = "" + a2;
    }, stopTracking: function() {
      a._valueTracker = null;
      delete a[b];
    } };
  }
}
function Va(a) {
  a._valueTracker || (a._valueTracker = Ua(a));
}
function Wa(a) {
  if (!a)
    return false;
  var b = a._valueTracker;
  if (!b)
    return true;
  var c = b.getValue();
  var d = "";
  a && (d = Ta(a) ? a.checked ? "true" : "false" : a.value);
  a = d;
  return a !== c ? (b.setValue(a), true) : false;
}
function Xa(a) {
  a = a || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof a)
    return null;
  try {
    return a.activeElement || a.body;
  } catch (b) {
    return a.body;
  }
}
function Ya(a, b) {
  var c = b.checked;
  return A$1({}, b, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: null != c ? c : a._wrapperState.initialChecked });
}
function Za(a, b) {
  var c = null == b.defaultValue ? "" : b.defaultValue, d = null != b.checked ? b.checked : b.defaultChecked;
  c = Sa(null != b.value ? b.value : c);
  a._wrapperState = { initialChecked: d, initialValue: c, controlled: "checkbox" === b.type || "radio" === b.type ? null != b.checked : null != b.value };
}
function ab(a, b) {
  b = b.checked;
  null != b && ta(a, "checked", b, false);
}
function bb(a, b) {
  ab(a, b);
  var c = Sa(b.value), d = b.type;
  if (null != c)
    if ("number" === d) {
      if (0 === c && "" === a.value || a.value != c)
        a.value = "" + c;
    } else
      a.value !== "" + c && (a.value = "" + c);
  else if ("submit" === d || "reset" === d) {
    a.removeAttribute("value");
    return;
  }
  b.hasOwnProperty("value") ? cb(a, b.type, c) : b.hasOwnProperty("defaultValue") && cb(a, b.type, Sa(b.defaultValue));
  null == b.checked && null != b.defaultChecked && (a.defaultChecked = !!b.defaultChecked);
}
function db(a, b, c) {
  if (b.hasOwnProperty("value") || b.hasOwnProperty("defaultValue")) {
    var d = b.type;
    if (!("submit" !== d && "reset" !== d || void 0 !== b.value && null !== b.value))
      return;
    b = "" + a._wrapperState.initialValue;
    c || b === a.value || (a.value = b);
    a.defaultValue = b;
  }
  c = a.name;
  "" !== c && (a.name = "");
  a.defaultChecked = !!a._wrapperState.initialChecked;
  "" !== c && (a.name = c);
}
function cb(a, b, c) {
  if ("number" !== b || Xa(a.ownerDocument) !== a)
    null == c ? a.defaultValue = "" + a._wrapperState.initialValue : a.defaultValue !== "" + c && (a.defaultValue = "" + c);
}
var eb = Array.isArray;
function fb(a, b, c, d) {
  a = a.options;
  if (b) {
    b = {};
    for (var e = 0; e < c.length; e++)
      b["$" + c[e]] = true;
    for (c = 0; c < a.length; c++)
      e = b.hasOwnProperty("$" + a[c].value), a[c].selected !== e && (a[c].selected = e), e && d && (a[c].defaultSelected = true);
  } else {
    c = "" + Sa(c);
    b = null;
    for (e = 0; e < a.length; e++) {
      if (a[e].value === c) {
        a[e].selected = true;
        d && (a[e].defaultSelected = true);
        return;
      }
      null !== b || a[e].disabled || (b = a[e]);
    }
    null !== b && (b.selected = true);
  }
}
function gb(a, b) {
  if (null != b.dangerouslySetInnerHTML)
    throw Error(p(91));
  return A$1({}, b, { value: void 0, defaultValue: void 0, children: "" + a._wrapperState.initialValue });
}
function hb(a, b) {
  var c = b.value;
  if (null == c) {
    c = b.children;
    b = b.defaultValue;
    if (null != c) {
      if (null != b)
        throw Error(p(92));
      if (eb(c)) {
        if (1 < c.length)
          throw Error(p(93));
        c = c[0];
      }
      b = c;
    }
    null == b && (b = "");
    c = b;
  }
  a._wrapperState = { initialValue: Sa(c) };
}
function ib(a, b) {
  var c = Sa(b.value), d = Sa(b.defaultValue);
  null != c && (c = "" + c, c !== a.value && (a.value = c), null == b.defaultValue && a.defaultValue !== c && (a.defaultValue = c));
  null != d && (a.defaultValue = "" + d);
}
function jb(a) {
  var b = a.textContent;
  b === a._wrapperState.initialValue && "" !== b && null !== b && (a.value = b);
}
function kb(a) {
  switch (a) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function lb(a, b) {
  return null == a || "http://www.w3.org/1999/xhtml" === a ? kb(b) : "http://www.w3.org/2000/svg" === a && "foreignObject" === b ? "http://www.w3.org/1999/xhtml" : a;
}
var mb, nb = function(a) {
  return "undefined" !== typeof MSApp && MSApp.execUnsafeLocalFunction ? function(b, c, d, e) {
    MSApp.execUnsafeLocalFunction(function() {
      return a(b, c, d, e);
    });
  } : a;
}(function(a, b) {
  if ("http://www.w3.org/2000/svg" !== a.namespaceURI || "innerHTML" in a)
    a.innerHTML = b;
  else {
    mb = mb || document.createElement("div");
    mb.innerHTML = "<svg>" + b.valueOf().toString() + "</svg>";
    for (b = mb.firstChild; a.firstChild; )
      a.removeChild(a.firstChild);
    for (; b.firstChild; )
      a.appendChild(b.firstChild);
  }
});
function ob(a, b) {
  if (b) {
    var c = a.firstChild;
    if (c && c === a.lastChild && 3 === c.nodeType) {
      c.nodeValue = b;
      return;
    }
  }
  a.textContent = b;
}
var pb = {
  animationIterationCount: true,
  aspectRatio: true,
  borderImageOutset: true,
  borderImageSlice: true,
  borderImageWidth: true,
  boxFlex: true,
  boxFlexGroup: true,
  boxOrdinalGroup: true,
  columnCount: true,
  columns: true,
  flex: true,
  flexGrow: true,
  flexPositive: true,
  flexShrink: true,
  flexNegative: true,
  flexOrder: true,
  gridArea: true,
  gridRow: true,
  gridRowEnd: true,
  gridRowSpan: true,
  gridRowStart: true,
  gridColumn: true,
  gridColumnEnd: true,
  gridColumnSpan: true,
  gridColumnStart: true,
  fontWeight: true,
  lineClamp: true,
  lineHeight: true,
  opacity: true,
  order: true,
  orphans: true,
  tabSize: true,
  widows: true,
  zIndex: true,
  zoom: true,
  fillOpacity: true,
  floodOpacity: true,
  stopOpacity: true,
  strokeDasharray: true,
  strokeDashoffset: true,
  strokeMiterlimit: true,
  strokeOpacity: true,
  strokeWidth: true
}, qb = ["Webkit", "ms", "Moz", "O"];
Object.keys(pb).forEach(function(a) {
  qb.forEach(function(b) {
    b = b + a.charAt(0).toUpperCase() + a.substring(1);
    pb[b] = pb[a];
  });
});
function rb(a, b, c) {
  return null == b || "boolean" === typeof b || "" === b ? "" : c || "number" !== typeof b || 0 === b || pb.hasOwnProperty(a) && pb[a] ? ("" + b).trim() : b + "px";
}
function sb(a, b) {
  a = a.style;
  for (var c in b)
    if (b.hasOwnProperty(c)) {
      var d = 0 === c.indexOf("--"), e = rb(c, b[c], d);
      "float" === c && (c = "cssFloat");
      d ? a.setProperty(c, e) : a[c] = e;
    }
}
var tb = A$1({ menuitem: true }, { area: true, base: true, br: true, col: true, embed: true, hr: true, img: true, input: true, keygen: true, link: true, meta: true, param: true, source: true, track: true, wbr: true });
function ub(a, b) {
  if (b) {
    if (tb[a] && (null != b.children || null != b.dangerouslySetInnerHTML))
      throw Error(p(137, a));
    if (null != b.dangerouslySetInnerHTML) {
      if (null != b.children)
        throw Error(p(60));
      if ("object" !== typeof b.dangerouslySetInnerHTML || !("__html" in b.dangerouslySetInnerHTML))
        throw Error(p(61));
    }
    if (null != b.style && "object" !== typeof b.style)
      throw Error(p(62));
  }
}
function vb(a, b) {
  if (-1 === a.indexOf("-"))
    return "string" === typeof b.is;
  switch (a) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var wb = null;
function xb(a) {
  a = a.target || a.srcElement || window;
  a.correspondingUseElement && (a = a.correspondingUseElement);
  return 3 === a.nodeType ? a.parentNode : a;
}
var yb = null, zb = null, Ab = null;
function Bb(a) {
  if (a = Cb(a)) {
    if ("function" !== typeof yb)
      throw Error(p(280));
    var b = a.stateNode;
    b && (b = Db(b), yb(a.stateNode, a.type, b));
  }
}
function Eb(a) {
  zb ? Ab ? Ab.push(a) : Ab = [a] : zb = a;
}
function Fb() {
  if (zb) {
    var a = zb, b = Ab;
    Ab = zb = null;
    Bb(a);
    if (b)
      for (a = 0; a < b.length; a++)
        Bb(b[a]);
  }
}
function Gb(a, b) {
  return a(b);
}
function Hb() {
}
var Ib = false;
function Jb(a, b, c) {
  if (Ib)
    return a(b, c);
  Ib = true;
  try {
    return Gb(a, b, c);
  } finally {
    if (Ib = false, null !== zb || null !== Ab)
      Hb(), Fb();
  }
}
function Kb(a, b) {
  var c = a.stateNode;
  if (null === c)
    return null;
  var d = Db(c);
  if (null === d)
    return null;
  c = d[b];
  a:
    switch (b) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        (d = !d.disabled) || (a = a.type, d = !("button" === a || "input" === a || "select" === a || "textarea" === a));
        a = !d;
        break a;
      default:
        a = false;
    }
  if (a)
    return null;
  if (c && "function" !== typeof c)
    throw Error(p(231, b, typeof c));
  return c;
}
var Lb = false;
if (ia)
  try {
    var Mb = {};
    Object.defineProperty(Mb, "passive", { get: function() {
      Lb = true;
    } });
    window.addEventListener("test", Mb, Mb);
    window.removeEventListener("test", Mb, Mb);
  } catch (a) {
    Lb = false;
  }
function Nb(a, b, c, d, e, f2, g2, h, k2) {
  var l2 = Array.prototype.slice.call(arguments, 3);
  try {
    b.apply(c, l2);
  } catch (m2) {
    this.onError(m2);
  }
}
var Ob = false, Pb = null, Qb = false, Rb = null, Sb = { onError: function(a) {
  Ob = true;
  Pb = a;
} };
function Tb(a, b, c, d, e, f2, g2, h, k2) {
  Ob = false;
  Pb = null;
  Nb.apply(Sb, arguments);
}
function Ub(a, b, c, d, e, f2, g2, h, k2) {
  Tb.apply(this, arguments);
  if (Ob) {
    if (Ob) {
      var l2 = Pb;
      Ob = false;
      Pb = null;
    } else
      throw Error(p(198));
    Qb || (Qb = true, Rb = l2);
  }
}
function Vb(a) {
  var b = a, c = a;
  if (a.alternate)
    for (; b.return; )
      b = b.return;
  else {
    a = b;
    do
      b = a, 0 !== (b.flags & 4098) && (c = b.return), a = b.return;
    while (a);
  }
  return 3 === b.tag ? c : null;
}
function Wb(a) {
  if (13 === a.tag) {
    var b = a.memoizedState;
    null === b && (a = a.alternate, null !== a && (b = a.memoizedState));
    if (null !== b)
      return b.dehydrated;
  }
  return null;
}
function Xb(a) {
  if (Vb(a) !== a)
    throw Error(p(188));
}
function Yb(a) {
  var b = a.alternate;
  if (!b) {
    b = Vb(a);
    if (null === b)
      throw Error(p(188));
    return b !== a ? null : a;
  }
  for (var c = a, d = b; ; ) {
    var e = c.return;
    if (null === e)
      break;
    var f2 = e.alternate;
    if (null === f2) {
      d = e.return;
      if (null !== d) {
        c = d;
        continue;
      }
      break;
    }
    if (e.child === f2.child) {
      for (f2 = e.child; f2; ) {
        if (f2 === c)
          return Xb(e), a;
        if (f2 === d)
          return Xb(e), b;
        f2 = f2.sibling;
      }
      throw Error(p(188));
    }
    if (c.return !== d.return)
      c = e, d = f2;
    else {
      for (var g2 = false, h = e.child; h; ) {
        if (h === c) {
          g2 = true;
          c = e;
          d = f2;
          break;
        }
        if (h === d) {
          g2 = true;
          d = e;
          c = f2;
          break;
        }
        h = h.sibling;
      }
      if (!g2) {
        for (h = f2.child; h; ) {
          if (h === c) {
            g2 = true;
            c = f2;
            d = e;
            break;
          }
          if (h === d) {
            g2 = true;
            d = f2;
            c = e;
            break;
          }
          h = h.sibling;
        }
        if (!g2)
          throw Error(p(189));
      }
    }
    if (c.alternate !== d)
      throw Error(p(190));
  }
  if (3 !== c.tag)
    throw Error(p(188));
  return c.stateNode.current === c ? a : b;
}
function Zb(a) {
  a = Yb(a);
  return null !== a ? $b(a) : null;
}
function $b(a) {
  if (5 === a.tag || 6 === a.tag)
    return a;
  for (a = a.child; null !== a; ) {
    var b = $b(a);
    if (null !== b)
      return b;
    a = a.sibling;
  }
  return null;
}
var ac = ca.unstable_scheduleCallback, bc = ca.unstable_cancelCallback, cc = ca.unstable_shouldYield, dc = ca.unstable_requestPaint, B$1 = ca.unstable_now, ec = ca.unstable_getCurrentPriorityLevel, fc = ca.unstable_ImmediatePriority, gc = ca.unstable_UserBlockingPriority, hc = ca.unstable_NormalPriority, ic = ca.unstable_LowPriority, jc = ca.unstable_IdlePriority, kc = null, lc = null;
function mc(a) {
  if (lc && "function" === typeof lc.onCommitFiberRoot)
    try {
      lc.onCommitFiberRoot(kc, a, void 0, 128 === (a.current.flags & 128));
    } catch (b) {
    }
}
var oc = Math.clz32 ? Math.clz32 : nc, pc = Math.log, qc = Math.LN2;
function nc(a) {
  a >>>= 0;
  return 0 === a ? 32 : 31 - (pc(a) / qc | 0) | 0;
}
var rc = 64, sc = 4194304;
function tc(a) {
  switch (a & -a) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return a & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return a & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return a;
  }
}
function uc(a, b) {
  var c = a.pendingLanes;
  if (0 === c)
    return 0;
  var d = 0, e = a.suspendedLanes, f2 = a.pingedLanes, g2 = c & 268435455;
  if (0 !== g2) {
    var h = g2 & ~e;
    0 !== h ? d = tc(h) : (f2 &= g2, 0 !== f2 && (d = tc(f2)));
  } else
    g2 = c & ~e, 0 !== g2 ? d = tc(g2) : 0 !== f2 && (d = tc(f2));
  if (0 === d)
    return 0;
  if (0 !== b && b !== d && 0 === (b & e) && (e = d & -d, f2 = b & -b, e >= f2 || 16 === e && 0 !== (f2 & 4194240)))
    return b;
  0 !== (d & 4) && (d |= c & 16);
  b = a.entangledLanes;
  if (0 !== b)
    for (a = a.entanglements, b &= d; 0 < b; )
      c = 31 - oc(b), e = 1 << c, d |= a[c], b &= ~e;
  return d;
}
function vc(a, b) {
  switch (a) {
    case 1:
    case 2:
    case 4:
      return b + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return b + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function wc(a, b) {
  for (var c = a.suspendedLanes, d = a.pingedLanes, e = a.expirationTimes, f2 = a.pendingLanes; 0 < f2; ) {
    var g2 = 31 - oc(f2), h = 1 << g2, k2 = e[g2];
    if (-1 === k2) {
      if (0 === (h & c) || 0 !== (h & d))
        e[g2] = vc(h, b);
    } else
      k2 <= b && (a.expiredLanes |= h);
    f2 &= ~h;
  }
}
function xc(a) {
  a = a.pendingLanes & -1073741825;
  return 0 !== a ? a : a & 1073741824 ? 1073741824 : 0;
}
function yc() {
  var a = rc;
  rc <<= 1;
  0 === (rc & 4194240) && (rc = 64);
  return a;
}
function zc(a) {
  for (var b = [], c = 0; 31 > c; c++)
    b.push(a);
  return b;
}
function Ac(a, b, c) {
  a.pendingLanes |= b;
  536870912 !== b && (a.suspendedLanes = 0, a.pingedLanes = 0);
  a = a.eventTimes;
  b = 31 - oc(b);
  a[b] = c;
}
function Bc(a, b) {
  var c = a.pendingLanes & ~b;
  a.pendingLanes = b;
  a.suspendedLanes = 0;
  a.pingedLanes = 0;
  a.expiredLanes &= b;
  a.mutableReadLanes &= b;
  a.entangledLanes &= b;
  b = a.entanglements;
  var d = a.eventTimes;
  for (a = a.expirationTimes; 0 < c; ) {
    var e = 31 - oc(c), f2 = 1 << e;
    b[e] = 0;
    d[e] = -1;
    a[e] = -1;
    c &= ~f2;
  }
}
function Cc(a, b) {
  var c = a.entangledLanes |= b;
  for (a = a.entanglements; c; ) {
    var d = 31 - oc(c), e = 1 << d;
    e & b | a[d] & b && (a[d] |= b);
    c &= ~e;
  }
}
var C$1 = 0;
function Dc(a) {
  a &= -a;
  return 1 < a ? 4 < a ? 0 !== (a & 268435455) ? 16 : 536870912 : 4 : 1;
}
var Ec, Fc, Gc, Hc, Ic, Jc = false, Kc = [], Lc = null, Mc = null, Nc = null, Oc = /* @__PURE__ */ new Map(), Pc = /* @__PURE__ */ new Map(), Qc = [], Rc = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function Sc(a, b) {
  switch (a) {
    case "focusin":
    case "focusout":
      Lc = null;
      break;
    case "dragenter":
    case "dragleave":
      Mc = null;
      break;
    case "mouseover":
    case "mouseout":
      Nc = null;
      break;
    case "pointerover":
    case "pointerout":
      Oc.delete(b.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Pc.delete(b.pointerId);
  }
}
function Tc(a, b, c, d, e, f2) {
  if (null === a || a.nativeEvent !== f2)
    return a = { blockedOn: b, domEventName: c, eventSystemFlags: d, nativeEvent: f2, targetContainers: [e] }, null !== b && (b = Cb(b), null !== b && Fc(b)), a;
  a.eventSystemFlags |= d;
  b = a.targetContainers;
  null !== e && -1 === b.indexOf(e) && b.push(e);
  return a;
}
function Uc(a, b, c, d, e) {
  switch (b) {
    case "focusin":
      return Lc = Tc(Lc, a, b, c, d, e), true;
    case "dragenter":
      return Mc = Tc(Mc, a, b, c, d, e), true;
    case "mouseover":
      return Nc = Tc(Nc, a, b, c, d, e), true;
    case "pointerover":
      var f2 = e.pointerId;
      Oc.set(f2, Tc(Oc.get(f2) || null, a, b, c, d, e));
      return true;
    case "gotpointercapture":
      return f2 = e.pointerId, Pc.set(f2, Tc(Pc.get(f2) || null, a, b, c, d, e)), true;
  }
  return false;
}
function Vc(a) {
  var b = Wc(a.target);
  if (null !== b) {
    var c = Vb(b);
    if (null !== c) {
      if (b = c.tag, 13 === b) {
        if (b = Wb(c), null !== b) {
          a.blockedOn = b;
          Ic(a.priority, function() {
            Gc(c);
          });
          return;
        }
      } else if (3 === b && c.stateNode.current.memoizedState.isDehydrated) {
        a.blockedOn = 3 === c.tag ? c.stateNode.containerInfo : null;
        return;
      }
    }
  }
  a.blockedOn = null;
}
function Xc(a) {
  if (null !== a.blockedOn)
    return false;
  for (var b = a.targetContainers; 0 < b.length; ) {
    var c = Yc(a.domEventName, a.eventSystemFlags, b[0], a.nativeEvent);
    if (null === c) {
      c = a.nativeEvent;
      var d = new c.constructor(c.type, c);
      wb = d;
      c.target.dispatchEvent(d);
      wb = null;
    } else
      return b = Cb(c), null !== b && Fc(b), a.blockedOn = c, false;
    b.shift();
  }
  return true;
}
function Zc(a, b, c) {
  Xc(a) && c.delete(b);
}
function $c() {
  Jc = false;
  null !== Lc && Xc(Lc) && (Lc = null);
  null !== Mc && Xc(Mc) && (Mc = null);
  null !== Nc && Xc(Nc) && (Nc = null);
  Oc.forEach(Zc);
  Pc.forEach(Zc);
}
function ad(a, b) {
  a.blockedOn === b && (a.blockedOn = null, Jc || (Jc = true, ca.unstable_scheduleCallback(ca.unstable_NormalPriority, $c)));
}
function bd(a) {
  function b(b2) {
    return ad(b2, a);
  }
  if (0 < Kc.length) {
    ad(Kc[0], a);
    for (var c = 1; c < Kc.length; c++) {
      var d = Kc[c];
      d.blockedOn === a && (d.blockedOn = null);
    }
  }
  null !== Lc && ad(Lc, a);
  null !== Mc && ad(Mc, a);
  null !== Nc && ad(Nc, a);
  Oc.forEach(b);
  Pc.forEach(b);
  for (c = 0; c < Qc.length; c++)
    d = Qc[c], d.blockedOn === a && (d.blockedOn = null);
  for (; 0 < Qc.length && (c = Qc[0], null === c.blockedOn); )
    Vc(c), null === c.blockedOn && Qc.shift();
}
var cd = ua.ReactCurrentBatchConfig, dd = true;
function ed(a, b, c, d) {
  var e = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 1, fd(a, b, c, d);
  } finally {
    C$1 = e, cd.transition = f2;
  }
}
function gd(a, b, c, d) {
  var e = C$1, f2 = cd.transition;
  cd.transition = null;
  try {
    C$1 = 4, fd(a, b, c, d);
  } finally {
    C$1 = e, cd.transition = f2;
  }
}
function fd(a, b, c, d) {
  if (dd) {
    var e = Yc(a, b, c, d);
    if (null === e)
      hd(a, b, d, id, c), Sc(a, d);
    else if (Uc(e, a, b, c, d))
      d.stopPropagation();
    else if (Sc(a, d), b & 4 && -1 < Rc.indexOf(a)) {
      for (; null !== e; ) {
        var f2 = Cb(e);
        null !== f2 && Ec(f2);
        f2 = Yc(a, b, c, d);
        null === f2 && hd(a, b, d, id, c);
        if (f2 === e)
          break;
        e = f2;
      }
      null !== e && d.stopPropagation();
    } else
      hd(a, b, d, null, c);
  }
}
var id = null;
function Yc(a, b, c, d) {
  id = null;
  a = xb(d);
  a = Wc(a);
  if (null !== a)
    if (b = Vb(a), null === b)
      a = null;
    else if (c = b.tag, 13 === c) {
      a = Wb(b);
      if (null !== a)
        return a;
      a = null;
    } else if (3 === c) {
      if (b.stateNode.current.memoizedState.isDehydrated)
        return 3 === b.tag ? b.stateNode.containerInfo : null;
      a = null;
    } else
      b !== a && (a = null);
  id = a;
  return null;
}
function jd(a) {
  switch (a) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (ec()) {
        case fc:
          return 1;
        case gc:
          return 4;
        case hc:
        case ic:
          return 16;
        case jc:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var kd = null, ld = null, md = null;
function nd() {
  if (md)
    return md;
  var a, b = ld, c = b.length, d, e = "value" in kd ? kd.value : kd.textContent, f2 = e.length;
  for (a = 0; a < c && b[a] === e[a]; a++)
    ;
  var g2 = c - a;
  for (d = 1; d <= g2 && b[c - d] === e[f2 - d]; d++)
    ;
  return md = e.slice(a, 1 < d ? 1 - d : void 0);
}
function od(a) {
  var b = a.keyCode;
  "charCode" in a ? (a = a.charCode, 0 === a && 13 === b && (a = 13)) : a = b;
  10 === a && (a = 13);
  return 32 <= a || 13 === a ? a : 0;
}
function pd() {
  return true;
}
function qd() {
  return false;
}
function rd(a) {
  function b(b2, d, e, f2, g2) {
    this._reactName = b2;
    this._targetInst = e;
    this.type = d;
    this.nativeEvent = f2;
    this.target = g2;
    this.currentTarget = null;
    for (var c in a)
      a.hasOwnProperty(c) && (b2 = a[c], this[c] = b2 ? b2(f2) : f2[c]);
    this.isDefaultPrevented = (null != f2.defaultPrevented ? f2.defaultPrevented : false === f2.returnValue) ? pd : qd;
    this.isPropagationStopped = qd;
    return this;
  }
  A$1(b.prototype, { preventDefault: function() {
    this.defaultPrevented = true;
    var a2 = this.nativeEvent;
    a2 && (a2.preventDefault ? a2.preventDefault() : "unknown" !== typeof a2.returnValue && (a2.returnValue = false), this.isDefaultPrevented = pd);
  }, stopPropagation: function() {
    var a2 = this.nativeEvent;
    a2 && (a2.stopPropagation ? a2.stopPropagation() : "unknown" !== typeof a2.cancelBubble && (a2.cancelBubble = true), this.isPropagationStopped = pd);
  }, persist: function() {
  }, isPersistent: pd });
  return b;
}
var sd = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(a) {
  return a.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, td = rd(sd), ud = A$1({}, sd, { view: 0, detail: 0 }), vd = rd(ud), wd, xd, yd, Ad = A$1({}, ud, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: zd, button: 0, buttons: 0, relatedTarget: function(a) {
  return void 0 === a.relatedTarget ? a.fromElement === a.srcElement ? a.toElement : a.fromElement : a.relatedTarget;
}, movementX: function(a) {
  if ("movementX" in a)
    return a.movementX;
  a !== yd && (yd && "mousemove" === a.type ? (wd = a.screenX - yd.screenX, xd = a.screenY - yd.screenY) : xd = wd = 0, yd = a);
  return wd;
}, movementY: function(a) {
  return "movementY" in a ? a.movementY : xd;
} }), Bd = rd(Ad), Cd = A$1({}, Ad, { dataTransfer: 0 }), Dd = rd(Cd), Ed = A$1({}, ud, { relatedTarget: 0 }), Fd = rd(Ed), Gd = A$1({}, sd, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), Hd = rd(Gd), Id = A$1({}, sd, { clipboardData: function(a) {
  return "clipboardData" in a ? a.clipboardData : window.clipboardData;
} }), Jd = rd(Id), Kd = A$1({}, sd, { data: 0 }), Ld = rd(Kd), Md = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, Nd = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, Od = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function Pd(a) {
  var b = this.nativeEvent;
  return b.getModifierState ? b.getModifierState(a) : (a = Od[a]) ? !!b[a] : false;
}
function zd() {
  return Pd;
}
var Qd = A$1({}, ud, { key: function(a) {
  if (a.key) {
    var b = Md[a.key] || a.key;
    if ("Unidentified" !== b)
      return b;
  }
  return "keypress" === a.type ? (a = od(a), 13 === a ? "Enter" : String.fromCharCode(a)) : "keydown" === a.type || "keyup" === a.type ? Nd[a.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: zd, charCode: function(a) {
  return "keypress" === a.type ? od(a) : 0;
}, keyCode: function(a) {
  return "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
}, which: function(a) {
  return "keypress" === a.type ? od(a) : "keydown" === a.type || "keyup" === a.type ? a.keyCode : 0;
} }), Rd = rd(Qd), Sd = A$1({}, Ad, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Td = rd(Sd), Ud = A$1({}, ud, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: zd }), Vd = rd(Ud), Wd = A$1({}, sd, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Xd = rd(Wd), Yd = A$1({}, Ad, {
  deltaX: function(a) {
    return "deltaX" in a ? a.deltaX : "wheelDeltaX" in a ? -a.wheelDeltaX : 0;
  },
  deltaY: function(a) {
    return "deltaY" in a ? a.deltaY : "wheelDeltaY" in a ? -a.wheelDeltaY : "wheelDelta" in a ? -a.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), Zd = rd(Yd), $d = [9, 13, 27, 32], ae = ia && "CompositionEvent" in window, be$1 = null;
ia && "documentMode" in document && (be$1 = document.documentMode);
var ce$1 = ia && "TextEvent" in window && !be$1, de$1 = ia && (!ae || be$1 && 8 < be$1 && 11 >= be$1), ee$1 = String.fromCharCode(32), fe$1 = false;
function ge$1(a, b) {
  switch (a) {
    case "keyup":
      return -1 !== $d.indexOf(b.keyCode);
    case "keydown":
      return 229 !== b.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function he$1(a) {
  a = a.detail;
  return "object" === typeof a && "data" in a ? a.data : null;
}
var ie = false;
function je(a, b) {
  switch (a) {
    case "compositionend":
      return he$1(b);
    case "keypress":
      if (32 !== b.which)
        return null;
      fe$1 = true;
      return ee$1;
    case "textInput":
      return a = b.data, a === ee$1 && fe$1 ? null : a;
    default:
      return null;
  }
}
function ke$1(a, b) {
  if (ie)
    return "compositionend" === a || !ae && ge$1(a, b) ? (a = nd(), md = ld = kd = null, ie = false, a) : null;
  switch (a) {
    case "paste":
      return null;
    case "keypress":
      if (!(b.ctrlKey || b.altKey || b.metaKey) || b.ctrlKey && b.altKey) {
        if (b.char && 1 < b.char.length)
          return b.char;
        if (b.which)
          return String.fromCharCode(b.which);
      }
      return null;
    case "compositionend":
      return de$1 && "ko" !== b.locale ? null : b.data;
    default:
      return null;
  }
}
var le$1 = { color: true, date: true, datetime: true, "datetime-local": true, email: true, month: true, number: true, password: true, range: true, search: true, tel: true, text: true, time: true, url: true, week: true };
function me$1(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return "input" === b ? !!le$1[a.type] : "textarea" === b ? true : false;
}
function ne$1(a, b, c, d) {
  Eb(d);
  b = oe$1(b, "onChange");
  0 < b.length && (c = new td("onChange", "change", null, c, d), a.push({ event: c, listeners: b }));
}
var pe$1 = null, qe$1 = null;
function re$1(a) {
  se$1(a, 0);
}
function te$1(a) {
  var b = ue$1(a);
  if (Wa(b))
    return a;
}
function ve$1(a, b) {
  if ("change" === a)
    return b;
}
var we$1 = false;
if (ia) {
  var xe;
  if (ia) {
    var ye$1 = "oninput" in document;
    if (!ye$1) {
      var ze$1 = document.createElement("div");
      ze$1.setAttribute("oninput", "return;");
      ye$1 = "function" === typeof ze$1.oninput;
    }
    xe = ye$1;
  } else
    xe = false;
  we$1 = xe && (!document.documentMode || 9 < document.documentMode);
}
function Ae$1() {
  pe$1 && (pe$1.detachEvent("onpropertychange", Be$1), qe$1 = pe$1 = null);
}
function Be$1(a) {
  if ("value" === a.propertyName && te$1(qe$1)) {
    var b = [];
    ne$1(b, qe$1, a, xb(a));
    Jb(re$1, b);
  }
}
function Ce$1(a, b, c) {
  "focusin" === a ? (Ae$1(), pe$1 = b, qe$1 = c, pe$1.attachEvent("onpropertychange", Be$1)) : "focusout" === a && Ae$1();
}
function De$1(a) {
  if ("selectionchange" === a || "keyup" === a || "keydown" === a)
    return te$1(qe$1);
}
function Ee$1(a, b) {
  if ("click" === a)
    return te$1(b);
}
function Fe(a, b) {
  if ("input" === a || "change" === a)
    return te$1(b);
}
function Ge$1(a, b) {
  return a === b && (0 !== a || 1 / a === 1 / b) || a !== a && b !== b;
}
var He$1 = "function" === typeof Object.is ? Object.is : Ge$1;
function Ie$1(a, b) {
  if (He$1(a, b))
    return true;
  if ("object" !== typeof a || null === a || "object" !== typeof b || null === b)
    return false;
  var c = Object.keys(a), d = Object.keys(b);
  if (c.length !== d.length)
    return false;
  for (d = 0; d < c.length; d++) {
    var e = c[d];
    if (!ja.call(b, e) || !He$1(a[e], b[e]))
      return false;
  }
  return true;
}
function Je(a) {
  for (; a && a.firstChild; )
    a = a.firstChild;
  return a;
}
function Ke(a, b) {
  var c = Je(a);
  a = 0;
  for (var d; c; ) {
    if (3 === c.nodeType) {
      d = a + c.textContent.length;
      if (a <= b && d >= b)
        return { node: c, offset: b - a };
      a = d;
    }
    a: {
      for (; c; ) {
        if (c.nextSibling) {
          c = c.nextSibling;
          break a;
        }
        c = c.parentNode;
      }
      c = void 0;
    }
    c = Je(c);
  }
}
function Le$1(a, b) {
  return a && b ? a === b ? true : a && 3 === a.nodeType ? false : b && 3 === b.nodeType ? Le$1(a, b.parentNode) : "contains" in a ? a.contains(b) : a.compareDocumentPosition ? !!(a.compareDocumentPosition(b) & 16) : false : false;
}
function Me$1() {
  for (var a = window, b = Xa(); b instanceof a.HTMLIFrameElement; ) {
    try {
      var c = "string" === typeof b.contentWindow.location.href;
    } catch (d) {
      c = false;
    }
    if (c)
      a = b.contentWindow;
    else
      break;
    b = Xa(a.document);
  }
  return b;
}
function Ne$1(a) {
  var b = a && a.nodeName && a.nodeName.toLowerCase();
  return b && ("input" === b && ("text" === a.type || "search" === a.type || "tel" === a.type || "url" === a.type || "password" === a.type) || "textarea" === b || "true" === a.contentEditable);
}
function Oe$1(a) {
  var b = Me$1(), c = a.focusedElem, d = a.selectionRange;
  if (b !== c && c && c.ownerDocument && Le$1(c.ownerDocument.documentElement, c)) {
    if (null !== d && Ne$1(c)) {
      if (b = d.start, a = d.end, void 0 === a && (a = b), "selectionStart" in c)
        c.selectionStart = b, c.selectionEnd = Math.min(a, c.value.length);
      else if (a = (b = c.ownerDocument || document) && b.defaultView || window, a.getSelection) {
        a = a.getSelection();
        var e = c.textContent.length, f2 = Math.min(d.start, e);
        d = void 0 === d.end ? f2 : Math.min(d.end, e);
        !a.extend && f2 > d && (e = d, d = f2, f2 = e);
        e = Ke(c, f2);
        var g2 = Ke(
          c,
          d
        );
        e && g2 && (1 !== a.rangeCount || a.anchorNode !== e.node || a.anchorOffset !== e.offset || a.focusNode !== g2.node || a.focusOffset !== g2.offset) && (b = b.createRange(), b.setStart(e.node, e.offset), a.removeAllRanges(), f2 > d ? (a.addRange(b), a.extend(g2.node, g2.offset)) : (b.setEnd(g2.node, g2.offset), a.addRange(b)));
      }
    }
    b = [];
    for (a = c; a = a.parentNode; )
      1 === a.nodeType && b.push({ element: a, left: a.scrollLeft, top: a.scrollTop });
    "function" === typeof c.focus && c.focus();
    for (c = 0; c < b.length; c++)
      a = b[c], a.element.scrollLeft = a.left, a.element.scrollTop = a.top;
  }
}
var Pe$1 = ia && "documentMode" in document && 11 >= document.documentMode, Qe$1 = null, Re$1 = null, Se$1 = null, Te$1 = false;
function Ue(a, b, c) {
  var d = c.window === c ? c.document : 9 === c.nodeType ? c : c.ownerDocument;
  Te$1 || null == Qe$1 || Qe$1 !== Xa(d) || (d = Qe$1, "selectionStart" in d && Ne$1(d) ? d = { start: d.selectionStart, end: d.selectionEnd } : (d = (d.ownerDocument && d.ownerDocument.defaultView || window).getSelection(), d = { anchorNode: d.anchorNode, anchorOffset: d.anchorOffset, focusNode: d.focusNode, focusOffset: d.focusOffset }), Se$1 && Ie$1(Se$1, d) || (Se$1 = d, d = oe$1(Re$1, "onSelect"), 0 < d.length && (b = new td("onSelect", "select", null, b, c), a.push({ event: b, listeners: d }), b.target = Qe$1)));
}
function Ve$1(a, b) {
  var c = {};
  c[a.toLowerCase()] = b.toLowerCase();
  c["Webkit" + a] = "webkit" + b;
  c["Moz" + a] = "moz" + b;
  return c;
}
var We$1 = { animationend: Ve$1("Animation", "AnimationEnd"), animationiteration: Ve$1("Animation", "AnimationIteration"), animationstart: Ve$1("Animation", "AnimationStart"), transitionend: Ve$1("Transition", "TransitionEnd") }, Xe = {}, Ye$1 = {};
ia && (Ye$1 = document.createElement("div").style, "AnimationEvent" in window || (delete We$1.animationend.animation, delete We$1.animationiteration.animation, delete We$1.animationstart.animation), "TransitionEvent" in window || delete We$1.transitionend.transition);
function Ze$1(a) {
  if (Xe[a])
    return Xe[a];
  if (!We$1[a])
    return a;
  var b = We$1[a], c;
  for (c in b)
    if (b.hasOwnProperty(c) && c in Ye$1)
      return Xe[a] = b[c];
  return a;
}
var $e$1 = Ze$1("animationend"), af = Ze$1("animationiteration"), bf = Ze$1("animationstart"), cf = Ze$1("transitionend"), df = /* @__PURE__ */ new Map(), ef = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function ff(a, b) {
  df.set(a, b);
  fa(b, [a]);
}
for (var gf = 0; gf < ef.length; gf++) {
  var hf = ef[gf], jf = hf.toLowerCase(), kf = hf[0].toUpperCase() + hf.slice(1);
  ff(jf, "on" + kf);
}
ff($e$1, "onAnimationEnd");
ff(af, "onAnimationIteration");
ff(bf, "onAnimationStart");
ff("dblclick", "onDoubleClick");
ff("focusin", "onFocus");
ff("focusout", "onBlur");
ff(cf, "onTransitionEnd");
ha("onMouseEnter", ["mouseout", "mouseover"]);
ha("onMouseLeave", ["mouseout", "mouseover"]);
ha("onPointerEnter", ["pointerout", "pointerover"]);
ha("onPointerLeave", ["pointerout", "pointerover"]);
fa("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
fa("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
fa("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
fa("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
fa("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var lf = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), mf = new Set("cancel close invalid load scroll toggle".split(" ").concat(lf));
function nf(a, b, c) {
  var d = a.type || "unknown-event";
  a.currentTarget = c;
  Ub(d, b, void 0, a);
  a.currentTarget = null;
}
function se$1(a, b) {
  b = 0 !== (b & 4);
  for (var c = 0; c < a.length; c++) {
    var d = a[c], e = d.event;
    d = d.listeners;
    a: {
      var f2 = void 0;
      if (b)
        for (var g2 = d.length - 1; 0 <= g2; g2--) {
          var h = d[g2], k2 = h.instance, l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped())
            break a;
          nf(e, h, l2);
          f2 = k2;
        }
      else
        for (g2 = 0; g2 < d.length; g2++) {
          h = d[g2];
          k2 = h.instance;
          l2 = h.currentTarget;
          h = h.listener;
          if (k2 !== f2 && e.isPropagationStopped())
            break a;
          nf(e, h, l2);
          f2 = k2;
        }
    }
  }
  if (Qb)
    throw a = Rb, Qb = false, Rb = null, a;
}
function D$1(a, b) {
  var c = b[of];
  void 0 === c && (c = b[of] = /* @__PURE__ */ new Set());
  var d = a + "__bubble";
  c.has(d) || (pf(b, a, 2, false), c.add(d));
}
function qf(a, b, c) {
  var d = 0;
  b && (d |= 4);
  pf(c, a, d, b);
}
var rf = "_reactListening" + Math.random().toString(36).slice(2);
function sf(a) {
  if (!a[rf]) {
    a[rf] = true;
    da.forEach(function(b2) {
      "selectionchange" !== b2 && (mf.has(b2) || qf(b2, false, a), qf(b2, true, a));
    });
    var b = 9 === a.nodeType ? a : a.ownerDocument;
    null === b || b[rf] || (b[rf] = true, qf("selectionchange", false, b));
  }
}
function pf(a, b, c, d) {
  switch (jd(b)) {
    case 1:
      var e = ed;
      break;
    case 4:
      e = gd;
      break;
    default:
      e = fd;
  }
  c = e.bind(null, b, c, a);
  e = void 0;
  !Lb || "touchstart" !== b && "touchmove" !== b && "wheel" !== b || (e = true);
  d ? void 0 !== e ? a.addEventListener(b, c, { capture: true, passive: e }) : a.addEventListener(b, c, true) : void 0 !== e ? a.addEventListener(b, c, { passive: e }) : a.addEventListener(b, c, false);
}
function hd(a, b, c, d, e) {
  var f2 = d;
  if (0 === (b & 1) && 0 === (b & 2) && null !== d)
    a:
      for (; ; ) {
        if (null === d)
          return;
        var g2 = d.tag;
        if (3 === g2 || 4 === g2) {
          var h = d.stateNode.containerInfo;
          if (h === e || 8 === h.nodeType && h.parentNode === e)
            break;
          if (4 === g2)
            for (g2 = d.return; null !== g2; ) {
              var k2 = g2.tag;
              if (3 === k2 || 4 === k2) {
                if (k2 = g2.stateNode.containerInfo, k2 === e || 8 === k2.nodeType && k2.parentNode === e)
                  return;
              }
              g2 = g2.return;
            }
          for (; null !== h; ) {
            g2 = Wc(h);
            if (null === g2)
              return;
            k2 = g2.tag;
            if (5 === k2 || 6 === k2) {
              d = f2 = g2;
              continue a;
            }
            h = h.parentNode;
          }
        }
        d = d.return;
      }
  Jb(function() {
    var d2 = f2, e2 = xb(c), g3 = [];
    a: {
      var h2 = df.get(a);
      if (void 0 !== h2) {
        var k3 = td, n2 = a;
        switch (a) {
          case "keypress":
            if (0 === od(c))
              break a;
          case "keydown":
          case "keyup":
            k3 = Rd;
            break;
          case "focusin":
            n2 = "focus";
            k3 = Fd;
            break;
          case "focusout":
            n2 = "blur";
            k3 = Fd;
            break;
          case "beforeblur":
          case "afterblur":
            k3 = Fd;
            break;
          case "click":
            if (2 === c.button)
              break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            k3 = Bd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            k3 = Dd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            k3 = Vd;
            break;
          case $e$1:
          case af:
          case bf:
            k3 = Hd;
            break;
          case cf:
            k3 = Xd;
            break;
          case "scroll":
            k3 = vd;
            break;
          case "wheel":
            k3 = Zd;
            break;
          case "copy":
          case "cut":
          case "paste":
            k3 = Jd;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            k3 = Td;
        }
        var t2 = 0 !== (b & 4), J2 = !t2 && "scroll" === a, x2 = t2 ? null !== h2 ? h2 + "Capture" : null : h2;
        t2 = [];
        for (var w2 = d2, u2; null !== w2; ) {
          u2 = w2;
          var F2 = u2.stateNode;
          5 === u2.tag && null !== F2 && (u2 = F2, null !== x2 && (F2 = Kb(w2, x2), null != F2 && t2.push(tf(w2, F2, u2))));
          if (J2)
            break;
          w2 = w2.return;
        }
        0 < t2.length && (h2 = new k3(h2, n2, null, c, e2), g3.push({ event: h2, listeners: t2 }));
      }
    }
    if (0 === (b & 7)) {
      a: {
        h2 = "mouseover" === a || "pointerover" === a;
        k3 = "mouseout" === a || "pointerout" === a;
        if (h2 && c !== wb && (n2 = c.relatedTarget || c.fromElement) && (Wc(n2) || n2[uf]))
          break a;
        if (k3 || h2) {
          h2 = e2.window === e2 ? e2 : (h2 = e2.ownerDocument) ? h2.defaultView || h2.parentWindow : window;
          if (k3) {
            if (n2 = c.relatedTarget || c.toElement, k3 = d2, n2 = n2 ? Wc(n2) : null, null !== n2 && (J2 = Vb(n2), n2 !== J2 || 5 !== n2.tag && 6 !== n2.tag))
              n2 = null;
          } else
            k3 = null, n2 = d2;
          if (k3 !== n2) {
            t2 = Bd;
            F2 = "onMouseLeave";
            x2 = "onMouseEnter";
            w2 = "mouse";
            if ("pointerout" === a || "pointerover" === a)
              t2 = Td, F2 = "onPointerLeave", x2 = "onPointerEnter", w2 = "pointer";
            J2 = null == k3 ? h2 : ue$1(k3);
            u2 = null == n2 ? h2 : ue$1(n2);
            h2 = new t2(F2, w2 + "leave", k3, c, e2);
            h2.target = J2;
            h2.relatedTarget = u2;
            F2 = null;
            Wc(e2) === d2 && (t2 = new t2(x2, w2 + "enter", n2, c, e2), t2.target = u2, t2.relatedTarget = J2, F2 = t2);
            J2 = F2;
            if (k3 && n2)
              b: {
                t2 = k3;
                x2 = n2;
                w2 = 0;
                for (u2 = t2; u2; u2 = vf(u2))
                  w2++;
                u2 = 0;
                for (F2 = x2; F2; F2 = vf(F2))
                  u2++;
                for (; 0 < w2 - u2; )
                  t2 = vf(t2), w2--;
                for (; 0 < u2 - w2; )
                  x2 = vf(x2), u2--;
                for (; w2--; ) {
                  if (t2 === x2 || null !== x2 && t2 === x2.alternate)
                    break b;
                  t2 = vf(t2);
                  x2 = vf(x2);
                }
                t2 = null;
              }
            else
              t2 = null;
            null !== k3 && wf(g3, h2, k3, t2, false);
            null !== n2 && null !== J2 && wf(g3, J2, n2, t2, true);
          }
        }
      }
      a: {
        h2 = d2 ? ue$1(d2) : window;
        k3 = h2.nodeName && h2.nodeName.toLowerCase();
        if ("select" === k3 || "input" === k3 && "file" === h2.type)
          var na = ve$1;
        else if (me$1(h2))
          if (we$1)
            na = Fe;
          else {
            na = De$1;
            var xa = Ce$1;
          }
        else
          (k3 = h2.nodeName) && "input" === k3.toLowerCase() && ("checkbox" === h2.type || "radio" === h2.type) && (na = Ee$1);
        if (na && (na = na(a, d2))) {
          ne$1(g3, na, c, e2);
          break a;
        }
        xa && xa(a, h2, d2);
        "focusout" === a && (xa = h2._wrapperState) && xa.controlled && "number" === h2.type && cb(h2, "number", h2.value);
      }
      xa = d2 ? ue$1(d2) : window;
      switch (a) {
        case "focusin":
          if (me$1(xa) || "true" === xa.contentEditable)
            Qe$1 = xa, Re$1 = d2, Se$1 = null;
          break;
        case "focusout":
          Se$1 = Re$1 = Qe$1 = null;
          break;
        case "mousedown":
          Te$1 = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Te$1 = false;
          Ue(g3, c, e2);
          break;
        case "selectionchange":
          if (Pe$1)
            break;
        case "keydown":
        case "keyup":
          Ue(g3, c, e2);
      }
      var $a;
      if (ae)
        b: {
          switch (a) {
            case "compositionstart":
              var ba = "onCompositionStart";
              break b;
            case "compositionend":
              ba = "onCompositionEnd";
              break b;
            case "compositionupdate":
              ba = "onCompositionUpdate";
              break b;
          }
          ba = void 0;
        }
      else
        ie ? ge$1(a, c) && (ba = "onCompositionEnd") : "keydown" === a && 229 === c.keyCode && (ba = "onCompositionStart");
      ba && (de$1 && "ko" !== c.locale && (ie || "onCompositionStart" !== ba ? "onCompositionEnd" === ba && ie && ($a = nd()) : (kd = e2, ld = "value" in kd ? kd.value : kd.textContent, ie = true)), xa = oe$1(d2, ba), 0 < xa.length && (ba = new Ld(ba, a, null, c, e2), g3.push({ event: ba, listeners: xa }), $a ? ba.data = $a : ($a = he$1(c), null !== $a && (ba.data = $a))));
      if ($a = ce$1 ? je(a, c) : ke$1(a, c))
        d2 = oe$1(d2, "onBeforeInput"), 0 < d2.length && (e2 = new Ld("onBeforeInput", "beforeinput", null, c, e2), g3.push({ event: e2, listeners: d2 }), e2.data = $a);
    }
    se$1(g3, b);
  });
}
function tf(a, b, c) {
  return { instance: a, listener: b, currentTarget: c };
}
function oe$1(a, b) {
  for (var c = b + "Capture", d = []; null !== a; ) {
    var e = a, f2 = e.stateNode;
    5 === e.tag && null !== f2 && (e = f2, f2 = Kb(a, c), null != f2 && d.unshift(tf(a, f2, e)), f2 = Kb(a, b), null != f2 && d.push(tf(a, f2, e)));
    a = a.return;
  }
  return d;
}
function vf(a) {
  if (null === a)
    return null;
  do
    a = a.return;
  while (a && 5 !== a.tag);
  return a ? a : null;
}
function wf(a, b, c, d, e) {
  for (var f2 = b._reactName, g2 = []; null !== c && c !== d; ) {
    var h = c, k2 = h.alternate, l2 = h.stateNode;
    if (null !== k2 && k2 === d)
      break;
    5 === h.tag && null !== l2 && (h = l2, e ? (k2 = Kb(c, f2), null != k2 && g2.unshift(tf(c, k2, h))) : e || (k2 = Kb(c, f2), null != k2 && g2.push(tf(c, k2, h))));
    c = c.return;
  }
  0 !== g2.length && a.push({ event: b, listeners: g2 });
}
var xf = /\r\n?/g, yf = /\u0000|\uFFFD/g;
function zf(a) {
  return ("string" === typeof a ? a : "" + a).replace(xf, "\n").replace(yf, "");
}
function Af(a, b, c) {
  b = zf(b);
  if (zf(a) !== b && c)
    throw Error(p(425));
}
function Bf() {
}
var Cf = null, Df = null;
function Ef(a, b) {
  return "textarea" === a || "noscript" === a || "string" === typeof b.children || "number" === typeof b.children || "object" === typeof b.dangerouslySetInnerHTML && null !== b.dangerouslySetInnerHTML && null != b.dangerouslySetInnerHTML.__html;
}
var Ff = "function" === typeof setTimeout ? setTimeout : void 0, Gf = "function" === typeof clearTimeout ? clearTimeout : void 0, Hf = "function" === typeof Promise ? Promise : void 0, Jf = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof Hf ? function(a) {
  return Hf.resolve(null).then(a).catch(If);
} : Ff;
function If(a) {
  setTimeout(function() {
    throw a;
  });
}
function Kf(a, b) {
  var c = b, d = 0;
  do {
    var e = c.nextSibling;
    a.removeChild(c);
    if (e && 8 === e.nodeType)
      if (c = e.data, "/$" === c) {
        if (0 === d) {
          a.removeChild(e);
          bd(b);
          return;
        }
        d--;
      } else
        "$" !== c && "$?" !== c && "$!" !== c || d++;
    c = e;
  } while (c);
  bd(b);
}
function Lf(a) {
  for (; null != a; a = a.nextSibling) {
    var b = a.nodeType;
    if (1 === b || 3 === b)
      break;
    if (8 === b) {
      b = a.data;
      if ("$" === b || "$!" === b || "$?" === b)
        break;
      if ("/$" === b)
        return null;
    }
  }
  return a;
}
function Mf(a) {
  a = a.previousSibling;
  for (var b = 0; a; ) {
    if (8 === a.nodeType) {
      var c = a.data;
      if ("$" === c || "$!" === c || "$?" === c) {
        if (0 === b)
          return a;
        b--;
      } else
        "/$" === c && b++;
    }
    a = a.previousSibling;
  }
  return null;
}
var Nf = Math.random().toString(36).slice(2), Of = "__reactFiber$" + Nf, Pf = "__reactProps$" + Nf, uf = "__reactContainer$" + Nf, of = "__reactEvents$" + Nf, Qf = "__reactListeners$" + Nf, Rf = "__reactHandles$" + Nf;
function Wc(a) {
  var b = a[Of];
  if (b)
    return b;
  for (var c = a.parentNode; c; ) {
    if (b = c[uf] || c[Of]) {
      c = b.alternate;
      if (null !== b.child || null !== c && null !== c.child)
        for (a = Mf(a); null !== a; ) {
          if (c = a[Of])
            return c;
          a = Mf(a);
        }
      return b;
    }
    a = c;
    c = a.parentNode;
  }
  return null;
}
function Cb(a) {
  a = a[Of] || a[uf];
  return !a || 5 !== a.tag && 6 !== a.tag && 13 !== a.tag && 3 !== a.tag ? null : a;
}
function ue$1(a) {
  if (5 === a.tag || 6 === a.tag)
    return a.stateNode;
  throw Error(p(33));
}
function Db(a) {
  return a[Pf] || null;
}
var Sf = [], Tf = -1;
function Uf(a) {
  return { current: a };
}
function E$1(a) {
  0 > Tf || (a.current = Sf[Tf], Sf[Tf] = null, Tf--);
}
function G$1(a, b) {
  Tf++;
  Sf[Tf] = a.current;
  a.current = b;
}
var Vf = {}, H$1 = Uf(Vf), Wf = Uf(false), Xf = Vf;
function Yf(a, b) {
  var c = a.type.contextTypes;
  if (!c)
    return Vf;
  var d = a.stateNode;
  if (d && d.__reactInternalMemoizedUnmaskedChildContext === b)
    return d.__reactInternalMemoizedMaskedChildContext;
  var e = {}, f2;
  for (f2 in c)
    e[f2] = b[f2];
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = b, a.__reactInternalMemoizedMaskedChildContext = e);
  return e;
}
function Zf(a) {
  a = a.childContextTypes;
  return null !== a && void 0 !== a;
}
function $f() {
  E$1(Wf);
  E$1(H$1);
}
function ag(a, b, c) {
  if (H$1.current !== Vf)
    throw Error(p(168));
  G$1(H$1, b);
  G$1(Wf, c);
}
function bg(a, b, c) {
  var d = a.stateNode;
  b = b.childContextTypes;
  if ("function" !== typeof d.getChildContext)
    return c;
  d = d.getChildContext();
  for (var e in d)
    if (!(e in b))
      throw Error(p(108, Ra(a) || "Unknown", e));
  return A$1({}, c, d);
}
function cg(a) {
  a = (a = a.stateNode) && a.__reactInternalMemoizedMergedChildContext || Vf;
  Xf = H$1.current;
  G$1(H$1, a);
  G$1(Wf, Wf.current);
  return true;
}
function dg(a, b, c) {
  var d = a.stateNode;
  if (!d)
    throw Error(p(169));
  c ? (a = bg(a, b, Xf), d.__reactInternalMemoizedMergedChildContext = a, E$1(Wf), E$1(H$1), G$1(H$1, a)) : E$1(Wf);
  G$1(Wf, c);
}
var eg = null, fg = false, gg = false;
function hg(a) {
  null === eg ? eg = [a] : eg.push(a);
}
function ig(a) {
  fg = true;
  hg(a);
}
function jg() {
  if (!gg && null !== eg) {
    gg = true;
    var a = 0, b = C$1;
    try {
      var c = eg;
      for (C$1 = 1; a < c.length; a++) {
        var d = c[a];
        do
          d = d(true);
        while (null !== d);
      }
      eg = null;
      fg = false;
    } catch (e) {
      throw null !== eg && (eg = eg.slice(a + 1)), ac(fc, jg), e;
    } finally {
      C$1 = b, gg = false;
    }
  }
  return null;
}
var kg = [], lg = 0, mg = null, ng = 0, og = [], pg = 0, qg = null, rg = 1, sg = "";
function tg(a, b) {
  kg[lg++] = ng;
  kg[lg++] = mg;
  mg = a;
  ng = b;
}
function ug(a, b, c) {
  og[pg++] = rg;
  og[pg++] = sg;
  og[pg++] = qg;
  qg = a;
  var d = rg;
  a = sg;
  var e = 32 - oc(d) - 1;
  d &= ~(1 << e);
  c += 1;
  var f2 = 32 - oc(b) + e;
  if (30 < f2) {
    var g2 = e - e % 5;
    f2 = (d & (1 << g2) - 1).toString(32);
    d >>= g2;
    e -= g2;
    rg = 1 << 32 - oc(b) + e | c << e | d;
    sg = f2 + a;
  } else
    rg = 1 << f2 | c << e | d, sg = a;
}
function vg(a) {
  null !== a.return && (tg(a, 1), ug(a, 1, 0));
}
function wg(a) {
  for (; a === mg; )
    mg = kg[--lg], kg[lg] = null, ng = kg[--lg], kg[lg] = null;
  for (; a === qg; )
    qg = og[--pg], og[pg] = null, sg = og[--pg], og[pg] = null, rg = og[--pg], og[pg] = null;
}
var xg = null, yg = null, I$1 = false, zg = null;
function Ag(a, b) {
  var c = Bg(5, null, null, 0);
  c.elementType = "DELETED";
  c.stateNode = b;
  c.return = a;
  b = a.deletions;
  null === b ? (a.deletions = [c], a.flags |= 16) : b.push(c);
}
function Cg(a, b) {
  switch (a.tag) {
    case 5:
      var c = a.type;
      b = 1 !== b.nodeType || c.toLowerCase() !== b.nodeName.toLowerCase() ? null : b;
      return null !== b ? (a.stateNode = b, xg = a, yg = Lf(b.firstChild), true) : false;
    case 6:
      return b = "" === a.pendingProps || 3 !== b.nodeType ? null : b, null !== b ? (a.stateNode = b, xg = a, yg = null, true) : false;
    case 13:
      return b = 8 !== b.nodeType ? null : b, null !== b ? (c = null !== qg ? { id: rg, overflow: sg } : null, a.memoizedState = { dehydrated: b, treeContext: c, retryLane: 1073741824 }, c = Bg(18, null, null, 0), c.stateNode = b, c.return = a, a.child = c, xg = a, yg = null, true) : false;
    default:
      return false;
  }
}
function Dg(a) {
  return 0 !== (a.mode & 1) && 0 === (a.flags & 128);
}
function Eg(a) {
  if (I$1) {
    var b = yg;
    if (b) {
      var c = b;
      if (!Cg(a, b)) {
        if (Dg(a))
          throw Error(p(418));
        b = Lf(c.nextSibling);
        var d = xg;
        b && Cg(a, b) ? Ag(d, c) : (a.flags = a.flags & -4097 | 2, I$1 = false, xg = a);
      }
    } else {
      if (Dg(a))
        throw Error(p(418));
      a.flags = a.flags & -4097 | 2;
      I$1 = false;
      xg = a;
    }
  }
}
function Fg(a) {
  for (a = a.return; null !== a && 5 !== a.tag && 3 !== a.tag && 13 !== a.tag; )
    a = a.return;
  xg = a;
}
function Gg(a) {
  if (a !== xg)
    return false;
  if (!I$1)
    return Fg(a), I$1 = true, false;
  var b;
  (b = 3 !== a.tag) && !(b = 5 !== a.tag) && (b = a.type, b = "head" !== b && "body" !== b && !Ef(a.type, a.memoizedProps));
  if (b && (b = yg)) {
    if (Dg(a))
      throw Hg(), Error(p(418));
    for (; b; )
      Ag(a, b), b = Lf(b.nextSibling);
  }
  Fg(a);
  if (13 === a.tag) {
    a = a.memoizedState;
    a = null !== a ? a.dehydrated : null;
    if (!a)
      throw Error(p(317));
    a: {
      a = a.nextSibling;
      for (b = 0; a; ) {
        if (8 === a.nodeType) {
          var c = a.data;
          if ("/$" === c) {
            if (0 === b) {
              yg = Lf(a.nextSibling);
              break a;
            }
            b--;
          } else
            "$" !== c && "$!" !== c && "$?" !== c || b++;
        }
        a = a.nextSibling;
      }
      yg = null;
    }
  } else
    yg = xg ? Lf(a.stateNode.nextSibling) : null;
  return true;
}
function Hg() {
  for (var a = yg; a; )
    a = Lf(a.nextSibling);
}
function Ig() {
  yg = xg = null;
  I$1 = false;
}
function Jg(a) {
  null === zg ? zg = [a] : zg.push(a);
}
var Kg = ua.ReactCurrentBatchConfig;
function Lg(a, b) {
  if (a && a.defaultProps) {
    b = A$1({}, b);
    a = a.defaultProps;
    for (var c in a)
      void 0 === b[c] && (b[c] = a[c]);
    return b;
  }
  return b;
}
var Mg = Uf(null), Ng = null, Og = null, Pg = null;
function Qg() {
  Pg = Og = Ng = null;
}
function Rg(a) {
  var b = Mg.current;
  E$1(Mg);
  a._currentValue = b;
}
function Sg(a, b, c) {
  for (; null !== a; ) {
    var d = a.alternate;
    (a.childLanes & b) !== b ? (a.childLanes |= b, null !== d && (d.childLanes |= b)) : null !== d && (d.childLanes & b) !== b && (d.childLanes |= b);
    if (a === c)
      break;
    a = a.return;
  }
}
function Tg(a, b) {
  Ng = a;
  Pg = Og = null;
  a = a.dependencies;
  null !== a && null !== a.firstContext && (0 !== (a.lanes & b) && (Ug = true), a.firstContext = null);
}
function Vg(a) {
  var b = a._currentValue;
  if (Pg !== a)
    if (a = { context: a, memoizedValue: b, next: null }, null === Og) {
      if (null === Ng)
        throw Error(p(308));
      Og = a;
      Ng.dependencies = { lanes: 0, firstContext: a };
    } else
      Og = Og.next = a;
  return b;
}
var Wg = null;
function Xg(a) {
  null === Wg ? Wg = [a] : Wg.push(a);
}
function Yg(a, b, c, d) {
  var e = b.interleaved;
  null === e ? (c.next = c, Xg(b)) : (c.next = e.next, e.next = c);
  b.interleaved = c;
  return Zg(a, d);
}
function Zg(a, b) {
  a.lanes |= b;
  var c = a.alternate;
  null !== c && (c.lanes |= b);
  c = a;
  for (a = a.return; null !== a; )
    a.childLanes |= b, c = a.alternate, null !== c && (c.childLanes |= b), c = a, a = a.return;
  return 3 === c.tag ? c.stateNode : null;
}
var $g = false;
function ah(a) {
  a.updateQueue = { baseState: a.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function bh(a, b) {
  a = a.updateQueue;
  b.updateQueue === a && (b.updateQueue = { baseState: a.baseState, firstBaseUpdate: a.firstBaseUpdate, lastBaseUpdate: a.lastBaseUpdate, shared: a.shared, effects: a.effects });
}
function ch(a, b) {
  return { eventTime: a, lane: b, tag: 0, payload: null, callback: null, next: null };
}
function dh(a, b, c) {
  var d = a.updateQueue;
  if (null === d)
    return null;
  d = d.shared;
  if (0 !== (K$1 & 2)) {
    var e = d.pending;
    null === e ? b.next = b : (b.next = e.next, e.next = b);
    d.pending = b;
    return Zg(a, c);
  }
  e = d.interleaved;
  null === e ? (b.next = b, Xg(d)) : (b.next = e.next, e.next = b);
  d.interleaved = b;
  return Zg(a, c);
}
function eh(a, b, c) {
  b = b.updateQueue;
  if (null !== b && (b = b.shared, 0 !== (c & 4194240))) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
function fh(a, b) {
  var c = a.updateQueue, d = a.alternate;
  if (null !== d && (d = d.updateQueue, c === d)) {
    var e = null, f2 = null;
    c = c.firstBaseUpdate;
    if (null !== c) {
      do {
        var g2 = { eventTime: c.eventTime, lane: c.lane, tag: c.tag, payload: c.payload, callback: c.callback, next: null };
        null === f2 ? e = f2 = g2 : f2 = f2.next = g2;
        c = c.next;
      } while (null !== c);
      null === f2 ? e = f2 = b : f2 = f2.next = b;
    } else
      e = f2 = b;
    c = { baseState: d.baseState, firstBaseUpdate: e, lastBaseUpdate: f2, shared: d.shared, effects: d.effects };
    a.updateQueue = c;
    return;
  }
  a = c.lastBaseUpdate;
  null === a ? c.firstBaseUpdate = b : a.next = b;
  c.lastBaseUpdate = b;
}
function gh(a, b, c, d) {
  var e = a.updateQueue;
  $g = false;
  var f2 = e.firstBaseUpdate, g2 = e.lastBaseUpdate, h = e.shared.pending;
  if (null !== h) {
    e.shared.pending = null;
    var k2 = h, l2 = k2.next;
    k2.next = null;
    null === g2 ? f2 = l2 : g2.next = l2;
    g2 = k2;
    var m2 = a.alternate;
    null !== m2 && (m2 = m2.updateQueue, h = m2.lastBaseUpdate, h !== g2 && (null === h ? m2.firstBaseUpdate = l2 : h.next = l2, m2.lastBaseUpdate = k2));
  }
  if (null !== f2) {
    var q2 = e.baseState;
    g2 = 0;
    m2 = l2 = k2 = null;
    h = f2;
    do {
      var r2 = h.lane, y2 = h.eventTime;
      if ((d & r2) === r2) {
        null !== m2 && (m2 = m2.next = {
          eventTime: y2,
          lane: 0,
          tag: h.tag,
          payload: h.payload,
          callback: h.callback,
          next: null
        });
        a: {
          var n2 = a, t2 = h;
          r2 = b;
          y2 = c;
          switch (t2.tag) {
            case 1:
              n2 = t2.payload;
              if ("function" === typeof n2) {
                q2 = n2.call(y2, q2, r2);
                break a;
              }
              q2 = n2;
              break a;
            case 3:
              n2.flags = n2.flags & -65537 | 128;
            case 0:
              n2 = t2.payload;
              r2 = "function" === typeof n2 ? n2.call(y2, q2, r2) : n2;
              if (null === r2 || void 0 === r2)
                break a;
              q2 = A$1({}, q2, r2);
              break a;
            case 2:
              $g = true;
          }
        }
        null !== h.callback && 0 !== h.lane && (a.flags |= 64, r2 = e.effects, null === r2 ? e.effects = [h] : r2.push(h));
      } else
        y2 = { eventTime: y2, lane: r2, tag: h.tag, payload: h.payload, callback: h.callback, next: null }, null === m2 ? (l2 = m2 = y2, k2 = q2) : m2 = m2.next = y2, g2 |= r2;
      h = h.next;
      if (null === h)
        if (h = e.shared.pending, null === h)
          break;
        else
          r2 = h, h = r2.next, r2.next = null, e.lastBaseUpdate = r2, e.shared.pending = null;
    } while (1);
    null === m2 && (k2 = q2);
    e.baseState = k2;
    e.firstBaseUpdate = l2;
    e.lastBaseUpdate = m2;
    b = e.shared.interleaved;
    if (null !== b) {
      e = b;
      do
        g2 |= e.lane, e = e.next;
      while (e !== b);
    } else
      null === f2 && (e.shared.lanes = 0);
    hh |= g2;
    a.lanes = g2;
    a.memoizedState = q2;
  }
}
function ih(a, b, c) {
  a = b.effects;
  b.effects = null;
  if (null !== a)
    for (b = 0; b < a.length; b++) {
      var d = a[b], e = d.callback;
      if (null !== e) {
        d.callback = null;
        d = c;
        if ("function" !== typeof e)
          throw Error(p(191, e));
        e.call(d);
      }
    }
}
var jh = new aa.Component().refs;
function kh(a, b, c, d) {
  b = a.memoizedState;
  c = c(d, b);
  c = null === c || void 0 === c ? b : A$1({}, b, c);
  a.memoizedState = c;
  0 === a.lanes && (a.updateQueue.baseState = c);
}
var nh = { isMounted: function(a) {
  return (a = a._reactInternals) ? Vb(a) === a : false;
}, enqueueSetState: function(a, b, c) {
  a = a._reactInternals;
  var d = L$1(), e = lh(a), f2 = ch(d, e);
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = dh(a, f2, e);
  null !== b && (mh(b, a, e, d), eh(b, a, e));
}, enqueueReplaceState: function(a, b, c) {
  a = a._reactInternals;
  var d = L$1(), e = lh(a), f2 = ch(d, e);
  f2.tag = 1;
  f2.payload = b;
  void 0 !== c && null !== c && (f2.callback = c);
  b = dh(a, f2, e);
  null !== b && (mh(b, a, e, d), eh(b, a, e));
}, enqueueForceUpdate: function(a, b) {
  a = a._reactInternals;
  var c = L$1(), d = lh(a), e = ch(c, d);
  e.tag = 2;
  void 0 !== b && null !== b && (e.callback = b);
  b = dh(a, e, d);
  null !== b && (mh(b, a, d, c), eh(b, a, d));
} };
function oh(a, b, c, d, e, f2, g2) {
  a = a.stateNode;
  return "function" === typeof a.shouldComponentUpdate ? a.shouldComponentUpdate(d, f2, g2) : b.prototype && b.prototype.isPureReactComponent ? !Ie$1(c, d) || !Ie$1(e, f2) : true;
}
function ph(a, b, c) {
  var d = false, e = Vf;
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? f2 = Vg(f2) : (e = Zf(b) ? Xf : H$1.current, d = b.contextTypes, f2 = (d = null !== d && void 0 !== d) ? Yf(a, e) : Vf);
  b = new b(c, f2);
  a.memoizedState = null !== b.state && void 0 !== b.state ? b.state : null;
  b.updater = nh;
  a.stateNode = b;
  b._reactInternals = a;
  d && (a = a.stateNode, a.__reactInternalMemoizedUnmaskedChildContext = e, a.__reactInternalMemoizedMaskedChildContext = f2);
  return b;
}
function qh(a, b, c, d) {
  a = b.state;
  "function" === typeof b.componentWillReceiveProps && b.componentWillReceiveProps(c, d);
  "function" === typeof b.UNSAFE_componentWillReceiveProps && b.UNSAFE_componentWillReceiveProps(c, d);
  b.state !== a && nh.enqueueReplaceState(b, b.state, null);
}
function rh(a, b, c, d) {
  var e = a.stateNode;
  e.props = c;
  e.state = a.memoizedState;
  e.refs = jh;
  ah(a);
  var f2 = b.contextType;
  "object" === typeof f2 && null !== f2 ? e.context = Vg(f2) : (f2 = Zf(b) ? Xf : H$1.current, e.context = Yf(a, f2));
  e.state = a.memoizedState;
  f2 = b.getDerivedStateFromProps;
  "function" === typeof f2 && (kh(a, b, f2, c), e.state = a.memoizedState);
  "function" === typeof b.getDerivedStateFromProps || "function" === typeof e.getSnapshotBeforeUpdate || "function" !== typeof e.UNSAFE_componentWillMount && "function" !== typeof e.componentWillMount || (b = e.state, "function" === typeof e.componentWillMount && e.componentWillMount(), "function" === typeof e.UNSAFE_componentWillMount && e.UNSAFE_componentWillMount(), b !== e.state && nh.enqueueReplaceState(e, e.state, null), gh(a, c, e, d), e.state = a.memoizedState);
  "function" === typeof e.componentDidMount && (a.flags |= 4194308);
}
function sh(a, b, c) {
  a = c.ref;
  if (null !== a && "function" !== typeof a && "object" !== typeof a) {
    if (c._owner) {
      c = c._owner;
      if (c) {
        if (1 !== c.tag)
          throw Error(p(309));
        var d = c.stateNode;
      }
      if (!d)
        throw Error(p(147, a));
      var e = d, f2 = "" + a;
      if (null !== b && null !== b.ref && "function" === typeof b.ref && b.ref._stringRef === f2)
        return b.ref;
      b = function(a2) {
        var b2 = e.refs;
        b2 === jh && (b2 = e.refs = {});
        null === a2 ? delete b2[f2] : b2[f2] = a2;
      };
      b._stringRef = f2;
      return b;
    }
    if ("string" !== typeof a)
      throw Error(p(284));
    if (!c._owner)
      throw Error(p(290, a));
  }
  return a;
}
function th(a, b) {
  a = Object.prototype.toString.call(b);
  throw Error(p(31, "[object Object]" === a ? "object with keys {" + Object.keys(b).join(", ") + "}" : a));
}
function uh(a) {
  var b = a._init;
  return b(a._payload);
}
function vh(a) {
  function b(b2, c2) {
    if (a) {
      var d2 = b2.deletions;
      null === d2 ? (b2.deletions = [c2], b2.flags |= 16) : d2.push(c2);
    }
  }
  function c(c2, d2) {
    if (!a)
      return null;
    for (; null !== d2; )
      b(c2, d2), d2 = d2.sibling;
    return null;
  }
  function d(a2, b2) {
    for (a2 = /* @__PURE__ */ new Map(); null !== b2; )
      null !== b2.key ? a2.set(b2.key, b2) : a2.set(b2.index, b2), b2 = b2.sibling;
    return a2;
  }
  function e(a2, b2) {
    a2 = wh(a2, b2);
    a2.index = 0;
    a2.sibling = null;
    return a2;
  }
  function f2(b2, c2, d2) {
    b2.index = d2;
    if (!a)
      return b2.flags |= 1048576, c2;
    d2 = b2.alternate;
    if (null !== d2)
      return d2 = d2.index, d2 < c2 ? (b2.flags |= 2, c2) : d2;
    b2.flags |= 2;
    return c2;
  }
  function g2(b2) {
    a && null === b2.alternate && (b2.flags |= 2);
    return b2;
  }
  function h(a2, b2, c2, d2) {
    if (null === b2 || 6 !== b2.tag)
      return b2 = xh(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function k2(a2, b2, c2, d2) {
    var f3 = c2.type;
    if (f3 === ya)
      return m2(a2, b2, c2.props.children, d2, c2.key);
    if (null !== b2 && (b2.elementType === f3 || "object" === typeof f3 && null !== f3 && f3.$$typeof === Ha && uh(f3) === b2.type))
      return d2 = e(b2, c2.props), d2.ref = sh(a2, b2, c2), d2.return = a2, d2;
    d2 = yh(c2.type, c2.key, c2.props, null, a2.mode, d2);
    d2.ref = sh(a2, b2, c2);
    d2.return = a2;
    return d2;
  }
  function l2(a2, b2, c2, d2) {
    if (null === b2 || 4 !== b2.tag || b2.stateNode.containerInfo !== c2.containerInfo || b2.stateNode.implementation !== c2.implementation)
      return b2 = zh(c2, a2.mode, d2), b2.return = a2, b2;
    b2 = e(b2, c2.children || []);
    b2.return = a2;
    return b2;
  }
  function m2(a2, b2, c2, d2, f3) {
    if (null === b2 || 7 !== b2.tag)
      return b2 = Ah(c2, a2.mode, d2, f3), b2.return = a2, b2;
    b2 = e(b2, c2);
    b2.return = a2;
    return b2;
  }
  function q2(a2, b2, c2) {
    if ("string" === typeof b2 && "" !== b2 || "number" === typeof b2)
      return b2 = xh("" + b2, a2.mode, c2), b2.return = a2, b2;
    if ("object" === typeof b2 && null !== b2) {
      switch (b2.$$typeof) {
        case va:
          return c2 = yh(b2.type, b2.key, b2.props, null, a2.mode, c2), c2.ref = sh(a2, null, b2), c2.return = a2, c2;
        case wa:
          return b2 = zh(b2, a2.mode, c2), b2.return = a2, b2;
        case Ha:
          var d2 = b2._init;
          return q2(a2, d2(b2._payload), c2);
      }
      if (eb(b2) || Ka(b2))
        return b2 = Ah(b2, a2.mode, c2, null), b2.return = a2, b2;
      th(a2, b2);
    }
    return null;
  }
  function r2(a2, b2, c2, d2) {
    var e2 = null !== b2 ? b2.key : null;
    if ("string" === typeof c2 && "" !== c2 || "number" === typeof c2)
      return null !== e2 ? null : h(a2, b2, "" + c2, d2);
    if ("object" === typeof c2 && null !== c2) {
      switch (c2.$$typeof) {
        case va:
          return c2.key === e2 ? k2(a2, b2, c2, d2) : null;
        case wa:
          return c2.key === e2 ? l2(a2, b2, c2, d2) : null;
        case Ha:
          return e2 = c2._init, r2(
            a2,
            b2,
            e2(c2._payload),
            d2
          );
      }
      if (eb(c2) || Ka(c2))
        return null !== e2 ? null : m2(a2, b2, c2, d2, null);
      th(a2, c2);
    }
    return null;
  }
  function y2(a2, b2, c2, d2, e2) {
    if ("string" === typeof d2 && "" !== d2 || "number" === typeof d2)
      return a2 = a2.get(c2) || null, h(b2, a2, "" + d2, e2);
    if ("object" === typeof d2 && null !== d2) {
      switch (d2.$$typeof) {
        case va:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, k2(b2, a2, d2, e2);
        case wa:
          return a2 = a2.get(null === d2.key ? c2 : d2.key) || null, l2(b2, a2, d2, e2);
        case Ha:
          var f3 = d2._init;
          return y2(a2, b2, c2, f3(d2._payload), e2);
      }
      if (eb(d2) || Ka(d2))
        return a2 = a2.get(c2) || null, m2(b2, a2, d2, e2, null);
      th(b2, d2);
    }
    return null;
  }
  function n2(e2, g3, h2, k3) {
    for (var l3 = null, m3 = null, u2 = g3, w2 = g3 = 0, x2 = null; null !== u2 && w2 < h2.length; w2++) {
      u2.index > w2 ? (x2 = u2, u2 = null) : x2 = u2.sibling;
      var n3 = r2(e2, u2, h2[w2], k3);
      if (null === n3) {
        null === u2 && (u2 = x2);
        break;
      }
      a && u2 && null === n3.alternate && b(e2, u2);
      g3 = f2(n3, g3, w2);
      null === m3 ? l3 = n3 : m3.sibling = n3;
      m3 = n3;
      u2 = x2;
    }
    if (w2 === h2.length)
      return c(e2, u2), I$1 && tg(e2, w2), l3;
    if (null === u2) {
      for (; w2 < h2.length; w2++)
        u2 = q2(e2, h2[w2], k3), null !== u2 && (g3 = f2(u2, g3, w2), null === m3 ? l3 = u2 : m3.sibling = u2, m3 = u2);
      I$1 && tg(e2, w2);
      return l3;
    }
    for (u2 = d(e2, u2); w2 < h2.length; w2++)
      x2 = y2(u2, e2, w2, h2[w2], k3), null !== x2 && (a && null !== x2.alternate && u2.delete(null === x2.key ? w2 : x2.key), g3 = f2(x2, g3, w2), null === m3 ? l3 = x2 : m3.sibling = x2, m3 = x2);
    a && u2.forEach(function(a2) {
      return b(e2, a2);
    });
    I$1 && tg(e2, w2);
    return l3;
  }
  function t2(e2, g3, h2, k3) {
    var l3 = Ka(h2);
    if ("function" !== typeof l3)
      throw Error(p(150));
    h2 = l3.call(h2);
    if (null == h2)
      throw Error(p(151));
    for (var u2 = l3 = null, m3 = g3, w2 = g3 = 0, x2 = null, n3 = h2.next(); null !== m3 && !n3.done; w2++, n3 = h2.next()) {
      m3.index > w2 ? (x2 = m3, m3 = null) : x2 = m3.sibling;
      var t3 = r2(e2, m3, n3.value, k3);
      if (null === t3) {
        null === m3 && (m3 = x2);
        break;
      }
      a && m3 && null === t3.alternate && b(e2, m3);
      g3 = f2(t3, g3, w2);
      null === u2 ? l3 = t3 : u2.sibling = t3;
      u2 = t3;
      m3 = x2;
    }
    if (n3.done)
      return c(
        e2,
        m3
      ), I$1 && tg(e2, w2), l3;
    if (null === m3) {
      for (; !n3.done; w2++, n3 = h2.next())
        n3 = q2(e2, n3.value, k3), null !== n3 && (g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
      I$1 && tg(e2, w2);
      return l3;
    }
    for (m3 = d(e2, m3); !n3.done; w2++, n3 = h2.next())
      n3 = y2(m3, e2, w2, n3.value, k3), null !== n3 && (a && null !== n3.alternate && m3.delete(null === n3.key ? w2 : n3.key), g3 = f2(n3, g3, w2), null === u2 ? l3 = n3 : u2.sibling = n3, u2 = n3);
    a && m3.forEach(function(a2) {
      return b(e2, a2);
    });
    I$1 && tg(e2, w2);
    return l3;
  }
  function J2(a2, d2, f3, h2) {
    "object" === typeof f3 && null !== f3 && f3.type === ya && null === f3.key && (f3 = f3.props.children);
    if ("object" === typeof f3 && null !== f3) {
      switch (f3.$$typeof) {
        case va:
          a: {
            for (var k3 = f3.key, l3 = d2; null !== l3; ) {
              if (l3.key === k3) {
                k3 = f3.type;
                if (k3 === ya) {
                  if (7 === l3.tag) {
                    c(a2, l3.sibling);
                    d2 = e(l3, f3.props.children);
                    d2.return = a2;
                    a2 = d2;
                    break a;
                  }
                } else if (l3.elementType === k3 || "object" === typeof k3 && null !== k3 && k3.$$typeof === Ha && uh(k3) === l3.type) {
                  c(a2, l3.sibling);
                  d2 = e(l3, f3.props);
                  d2.ref = sh(a2, l3, f3);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                }
                c(a2, l3);
                break;
              } else
                b(a2, l3);
              l3 = l3.sibling;
            }
            f3.type === ya ? (d2 = Ah(f3.props.children, a2.mode, h2, f3.key), d2.return = a2, a2 = d2) : (h2 = yh(f3.type, f3.key, f3.props, null, a2.mode, h2), h2.ref = sh(a2, d2, f3), h2.return = a2, a2 = h2);
          }
          return g2(a2);
        case wa:
          a: {
            for (l3 = f3.key; null !== d2; ) {
              if (d2.key === l3)
                if (4 === d2.tag && d2.stateNode.containerInfo === f3.containerInfo && d2.stateNode.implementation === f3.implementation) {
                  c(a2, d2.sibling);
                  d2 = e(d2, f3.children || []);
                  d2.return = a2;
                  a2 = d2;
                  break a;
                } else {
                  c(a2, d2);
                  break;
                }
              else
                b(a2, d2);
              d2 = d2.sibling;
            }
            d2 = zh(f3, a2.mode, h2);
            d2.return = a2;
            a2 = d2;
          }
          return g2(a2);
        case Ha:
          return l3 = f3._init, J2(a2, d2, l3(f3._payload), h2);
      }
      if (eb(f3))
        return n2(a2, d2, f3, h2);
      if (Ka(f3))
        return t2(a2, d2, f3, h2);
      th(a2, f3);
    }
    return "string" === typeof f3 && "" !== f3 || "number" === typeof f3 ? (f3 = "" + f3, null !== d2 && 6 === d2.tag ? (c(a2, d2.sibling), d2 = e(d2, f3), d2.return = a2, a2 = d2) : (c(a2, d2), d2 = xh(f3, a2.mode, h2), d2.return = a2, a2 = d2), g2(a2)) : c(a2, d2);
  }
  return J2;
}
var Bh = vh(true), Ch = vh(false), Dh = {}, Eh = Uf(Dh), Fh = Uf(Dh), Gh = Uf(Dh);
function Hh(a) {
  if (a === Dh)
    throw Error(p(174));
  return a;
}
function Ih(a, b) {
  G$1(Gh, b);
  G$1(Fh, a);
  G$1(Eh, Dh);
  a = b.nodeType;
  switch (a) {
    case 9:
    case 11:
      b = (b = b.documentElement) ? b.namespaceURI : lb(null, "");
      break;
    default:
      a = 8 === a ? b.parentNode : b, b = a.namespaceURI || null, a = a.tagName, b = lb(b, a);
  }
  E$1(Eh);
  G$1(Eh, b);
}
function Jh() {
  E$1(Eh);
  E$1(Fh);
  E$1(Gh);
}
function Kh(a) {
  Hh(Gh.current);
  var b = Hh(Eh.current);
  var c = lb(b, a.type);
  b !== c && (G$1(Fh, a), G$1(Eh, c));
}
function Lh(a) {
  Fh.current === a && (E$1(Eh), E$1(Fh));
}
var M$1 = Uf(0);
function Mh(a) {
  for (var b = a; null !== b; ) {
    if (13 === b.tag) {
      var c = b.memoizedState;
      if (null !== c && (c = c.dehydrated, null === c || "$?" === c.data || "$!" === c.data))
        return b;
    } else if (19 === b.tag && void 0 !== b.memoizedProps.revealOrder) {
      if (0 !== (b.flags & 128))
        return b;
    } else if (null !== b.child) {
      b.child.return = b;
      b = b.child;
      continue;
    }
    if (b === a)
      break;
    for (; null === b.sibling; ) {
      if (null === b.return || b.return === a)
        return null;
      b = b.return;
    }
    b.sibling.return = b.return;
    b = b.sibling;
  }
  return null;
}
var Nh = [];
function Oh() {
  for (var a = 0; a < Nh.length; a++)
    Nh[a]._workInProgressVersionPrimary = null;
  Nh.length = 0;
}
var Ph = ua.ReactCurrentDispatcher, Qh = ua.ReactCurrentBatchConfig, Rh = 0, N$1 = null, O$1 = null, P$1 = null, Sh = false, Th = false, Uh = 0, Vh = 0;
function Q$1() {
  throw Error(p(321));
}
function Wh(a, b) {
  if (null === b)
    return false;
  for (var c = 0; c < b.length && c < a.length; c++)
    if (!He$1(a[c], b[c]))
      return false;
  return true;
}
function Xh(a, b, c, d, e, f2) {
  Rh = f2;
  N$1 = b;
  b.memoizedState = null;
  b.updateQueue = null;
  b.lanes = 0;
  Ph.current = null === a || null === a.memoizedState ? Yh : Zh;
  a = c(d, e);
  if (Th) {
    f2 = 0;
    do {
      Th = false;
      Uh = 0;
      if (25 <= f2)
        throw Error(p(301));
      f2 += 1;
      P$1 = O$1 = null;
      b.updateQueue = null;
      Ph.current = $h;
      a = c(d, e);
    } while (Th);
  }
  Ph.current = ai;
  b = null !== O$1 && null !== O$1.next;
  Rh = 0;
  P$1 = O$1 = N$1 = null;
  Sh = false;
  if (b)
    throw Error(p(300));
  return a;
}
function bi() {
  var a = 0 !== Uh;
  Uh = 0;
  return a;
}
function ci() {
  var a = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  null === P$1 ? N$1.memoizedState = P$1 = a : P$1 = P$1.next = a;
  return P$1;
}
function di() {
  if (null === O$1) {
    var a = N$1.alternate;
    a = null !== a ? a.memoizedState : null;
  } else
    a = O$1.next;
  var b = null === P$1 ? N$1.memoizedState : P$1.next;
  if (null !== b)
    P$1 = b, O$1 = a;
  else {
    if (null === a)
      throw Error(p(310));
    O$1 = a;
    a = { memoizedState: O$1.memoizedState, baseState: O$1.baseState, baseQueue: O$1.baseQueue, queue: O$1.queue, next: null };
    null === P$1 ? N$1.memoizedState = P$1 = a : P$1 = P$1.next = a;
  }
  return P$1;
}
function ei(a, b) {
  return "function" === typeof b ? b(a) : b;
}
function fi(a) {
  var b = di(), c = b.queue;
  if (null === c)
    throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = O$1, e = d.baseQueue, f2 = c.pending;
  if (null !== f2) {
    if (null !== e) {
      var g2 = e.next;
      e.next = f2.next;
      f2.next = g2;
    }
    d.baseQueue = e = f2;
    c.pending = null;
  }
  if (null !== e) {
    f2 = e.next;
    d = d.baseState;
    var h = g2 = null, k2 = null, l2 = f2;
    do {
      var m2 = l2.lane;
      if ((Rh & m2) === m2)
        null !== k2 && (k2 = k2.next = { lane: 0, action: l2.action, hasEagerState: l2.hasEagerState, eagerState: l2.eagerState, next: null }), d = l2.hasEagerState ? l2.eagerState : a(d, l2.action);
      else {
        var q2 = {
          lane: m2,
          action: l2.action,
          hasEagerState: l2.hasEagerState,
          eagerState: l2.eagerState,
          next: null
        };
        null === k2 ? (h = k2 = q2, g2 = d) : k2 = k2.next = q2;
        N$1.lanes |= m2;
        hh |= m2;
      }
      l2 = l2.next;
    } while (null !== l2 && l2 !== f2);
    null === k2 ? g2 = d : k2.next = h;
    He$1(d, b.memoizedState) || (Ug = true);
    b.memoizedState = d;
    b.baseState = g2;
    b.baseQueue = k2;
    c.lastRenderedState = d;
  }
  a = c.interleaved;
  if (null !== a) {
    e = a;
    do
      f2 = e.lane, N$1.lanes |= f2, hh |= f2, e = e.next;
    while (e !== a);
  } else
    null === e && (c.lanes = 0);
  return [b.memoizedState, c.dispatch];
}
function gi(a) {
  var b = di(), c = b.queue;
  if (null === c)
    throw Error(p(311));
  c.lastRenderedReducer = a;
  var d = c.dispatch, e = c.pending, f2 = b.memoizedState;
  if (null !== e) {
    c.pending = null;
    var g2 = e = e.next;
    do
      f2 = a(f2, g2.action), g2 = g2.next;
    while (g2 !== e);
    He$1(f2, b.memoizedState) || (Ug = true);
    b.memoizedState = f2;
    null === b.baseQueue && (b.baseState = f2);
    c.lastRenderedState = f2;
  }
  return [f2, d];
}
function hi() {
}
function ii(a, b) {
  var c = N$1, d = di(), e = b(), f2 = !He$1(d.memoizedState, e);
  f2 && (d.memoizedState = e, Ug = true);
  d = d.queue;
  ji(ki.bind(null, c, d, a), [a]);
  if (d.getSnapshot !== b || f2 || null !== P$1 && P$1.memoizedState.tag & 1) {
    c.flags |= 2048;
    li(9, mi.bind(null, c, d, e, b), void 0, null);
    if (null === R$1)
      throw Error(p(349));
    0 !== (Rh & 30) || ni(c, b, e);
  }
  return e;
}
function ni(a, b, c) {
  a.flags |= 16384;
  a = { getSnapshot: b, value: c };
  b = N$1.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, N$1.updateQueue = b, b.stores = [a]) : (c = b.stores, null === c ? b.stores = [a] : c.push(a));
}
function mi(a, b, c, d) {
  b.value = c;
  b.getSnapshot = d;
  oi(b) && pi(a);
}
function ki(a, b, c) {
  return c(function() {
    oi(b) && pi(a);
  });
}
function oi(a) {
  var b = a.getSnapshot;
  a = a.value;
  try {
    var c = b();
    return !He$1(a, c);
  } catch (d) {
    return true;
  }
}
function pi(a) {
  var b = Zg(a, 1);
  null !== b && mh(b, a, 1, -1);
}
function qi(a) {
  var b = ci();
  "function" === typeof a && (a = a());
  b.memoizedState = b.baseState = a;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ei, lastRenderedState: a };
  b.queue = a;
  a = a.dispatch = ri.bind(null, N$1, a);
  return [b.memoizedState, a];
}
function li(a, b, c, d) {
  a = { tag: a, create: b, destroy: c, deps: d, next: null };
  b = N$1.updateQueue;
  null === b ? (b = { lastEffect: null, stores: null }, N$1.updateQueue = b, b.lastEffect = a.next = a) : (c = b.lastEffect, null === c ? b.lastEffect = a.next = a : (d = c.next, c.next = a, a.next = d, b.lastEffect = a));
  return a;
}
function si() {
  return di().memoizedState;
}
function ti(a, b, c, d) {
  var e = ci();
  N$1.flags |= a;
  e.memoizedState = li(1 | b, c, void 0, void 0 === d ? null : d);
}
function ui(a, b, c, d) {
  var e = di();
  d = void 0 === d ? null : d;
  var f2 = void 0;
  if (null !== O$1) {
    var g2 = O$1.memoizedState;
    f2 = g2.destroy;
    if (null !== d && Wh(d, g2.deps)) {
      e.memoizedState = li(b, c, f2, d);
      return;
    }
  }
  N$1.flags |= a;
  e.memoizedState = li(1 | b, c, f2, d);
}
function vi(a, b) {
  return ti(8390656, 8, a, b);
}
function ji(a, b) {
  return ui(2048, 8, a, b);
}
function wi(a, b) {
  return ui(4, 2, a, b);
}
function xi(a, b) {
  return ui(4, 4, a, b);
}
function yi(a, b) {
  if ("function" === typeof b)
    return a = a(), b(a), function() {
      b(null);
    };
  if (null !== b && void 0 !== b)
    return a = a(), b.current = a, function() {
      b.current = null;
    };
}
function zi(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ui(4, 4, yi.bind(null, b, a), c);
}
function Ai() {
}
function Bi(a, b) {
  var c = di();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Wh(b, d[1]))
    return d[0];
  c.memoizedState = [a, b];
  return a;
}
function Ci(a, b) {
  var c = di();
  b = void 0 === b ? null : b;
  var d = c.memoizedState;
  if (null !== d && null !== b && Wh(b, d[1]))
    return d[0];
  a = a();
  c.memoizedState = [a, b];
  return a;
}
function Di(a, b, c) {
  if (0 === (Rh & 21))
    return a.baseState && (a.baseState = false, Ug = true), a.memoizedState = c;
  He$1(c, b) || (c = yc(), N$1.lanes |= c, hh |= c, a.baseState = true);
  return b;
}
function Ei(a, b) {
  var c = C$1;
  C$1 = 0 !== c && 4 > c ? c : 4;
  a(true);
  var d = Qh.transition;
  Qh.transition = {};
  try {
    a(false), b();
  } finally {
    C$1 = c, Qh.transition = d;
  }
}
function Fi() {
  return di().memoizedState;
}
function Gi(a, b, c) {
  var d = lh(a);
  c = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a))
    Ii(b, c);
  else if (c = Yg(a, b, c, d), null !== c) {
    var e = L$1();
    mh(c, a, d, e);
    Ji(c, b, d);
  }
}
function ri(a, b, c) {
  var d = lh(a), e = { lane: d, action: c, hasEagerState: false, eagerState: null, next: null };
  if (Hi(a))
    Ii(b, e);
  else {
    var f2 = a.alternate;
    if (0 === a.lanes && (null === f2 || 0 === f2.lanes) && (f2 = b.lastRenderedReducer, null !== f2))
      try {
        var g2 = b.lastRenderedState, h = f2(g2, c);
        e.hasEagerState = true;
        e.eagerState = h;
        if (He$1(h, g2)) {
          var k2 = b.interleaved;
          null === k2 ? (e.next = e, Xg(b)) : (e.next = k2.next, k2.next = e);
          b.interleaved = e;
          return;
        }
      } catch (l2) {
      } finally {
      }
    c = Yg(a, b, e, d);
    null !== c && (e = L$1(), mh(c, a, d, e), Ji(c, b, d));
  }
}
function Hi(a) {
  var b = a.alternate;
  return a === N$1 || null !== b && b === N$1;
}
function Ii(a, b) {
  Th = Sh = true;
  var c = a.pending;
  null === c ? b.next = b : (b.next = c.next, c.next = b);
  a.pending = b;
}
function Ji(a, b, c) {
  if (0 !== (c & 4194240)) {
    var d = b.lanes;
    d &= a.pendingLanes;
    c |= d;
    b.lanes = c;
    Cc(a, c);
  }
}
var ai = { readContext: Vg, useCallback: Q$1, useContext: Q$1, useEffect: Q$1, useImperativeHandle: Q$1, useInsertionEffect: Q$1, useLayoutEffect: Q$1, useMemo: Q$1, useReducer: Q$1, useRef: Q$1, useState: Q$1, useDebugValue: Q$1, useDeferredValue: Q$1, useTransition: Q$1, useMutableSource: Q$1, useSyncExternalStore: Q$1, useId: Q$1, unstable_isNewReconciler: false }, Yh = { readContext: Vg, useCallback: function(a, b) {
  ci().memoizedState = [a, void 0 === b ? null : b];
  return a;
}, useContext: Vg, useEffect: vi, useImperativeHandle: function(a, b, c) {
  c = null !== c && void 0 !== c ? c.concat([a]) : null;
  return ti(
    4194308,
    4,
    yi.bind(null, b, a),
    c
  );
}, useLayoutEffect: function(a, b) {
  return ti(4194308, 4, a, b);
}, useInsertionEffect: function(a, b) {
  return ti(4, 2, a, b);
}, useMemo: function(a, b) {
  var c = ci();
  b = void 0 === b ? null : b;
  a = a();
  c.memoizedState = [a, b];
  return a;
}, useReducer: function(a, b, c) {
  var d = ci();
  b = void 0 !== c ? c(b) : b;
  d.memoizedState = d.baseState = b;
  a = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: a, lastRenderedState: b };
  d.queue = a;
  a = a.dispatch = Gi.bind(null, N$1, a);
  return [d.memoizedState, a];
}, useRef: function(a) {
  var b = ci();
  a = { current: a };
  return b.memoizedState = a;
}, useState: qi, useDebugValue: Ai, useDeferredValue: function(a) {
  return ci().memoizedState = a;
}, useTransition: function() {
  var a = qi(false), b = a[0];
  a = Ei.bind(null, a[1]);
  ci().memoizedState = a;
  return [b, a];
}, useMutableSource: function() {
}, useSyncExternalStore: function(a, b, c) {
  var d = N$1, e = ci();
  if (I$1) {
    if (void 0 === c)
      throw Error(p(407));
    c = c();
  } else {
    c = b();
    if (null === R$1)
      throw Error(p(349));
    0 !== (Rh & 30) || ni(d, b, c);
  }
  e.memoizedState = c;
  var f2 = { value: c, getSnapshot: b };
  e.queue = f2;
  vi(ki.bind(
    null,
    d,
    f2,
    a
  ), [a]);
  d.flags |= 2048;
  li(9, mi.bind(null, d, f2, c, b), void 0, null);
  return c;
}, useId: function() {
  var a = ci(), b = R$1.identifierPrefix;
  if (I$1) {
    var c = sg;
    var d = rg;
    c = (d & ~(1 << 32 - oc(d) - 1)).toString(32) + c;
    b = ":" + b + "R" + c;
    c = Uh++;
    0 < c && (b += "H" + c.toString(32));
    b += ":";
  } else
    c = Vh++, b = ":" + b + "r" + c.toString(32) + ":";
  return a.memoizedState = b;
}, unstable_isNewReconciler: false }, Zh = {
  readContext: Vg,
  useCallback: Bi,
  useContext: Vg,
  useEffect: ji,
  useImperativeHandle: zi,
  useInsertionEffect: wi,
  useLayoutEffect: xi,
  useMemo: Ci,
  useReducer: fi,
  useRef: si,
  useState: function() {
    return fi(ei);
  },
  useDebugValue: Ai,
  useDeferredValue: function(a) {
    var b = di();
    return Di(b, O$1.memoizedState, a);
  },
  useTransition: function() {
    var a = fi(ei)[0], b = di().memoizedState;
    return [a, b];
  },
  useMutableSource: hi,
  useSyncExternalStore: ii,
  useId: Fi,
  unstable_isNewReconciler: false
}, $h = { readContext: Vg, useCallback: Bi, useContext: Vg, useEffect: ji, useImperativeHandle: zi, useInsertionEffect: wi, useLayoutEffect: xi, useMemo: Ci, useReducer: gi, useRef: si, useState: function() {
  return gi(ei);
}, useDebugValue: Ai, useDeferredValue: function(a) {
  var b = di();
  return null === O$1 ? b.memoizedState = a : Di(b, O$1.memoizedState, a);
}, useTransition: function() {
  var a = gi(ei)[0], b = di().memoizedState;
  return [a, b];
}, useMutableSource: hi, useSyncExternalStore: ii, useId: Fi, unstable_isNewReconciler: false };
function Ki(a, b) {
  try {
    var c = "", d = b;
    do
      c += Pa(d), d = d.return;
    while (d);
    var e = c;
  } catch (f2) {
    e = "\nError generating stack: " + f2.message + "\n" + f2.stack;
  }
  return { value: a, source: b, stack: e, digest: null };
}
function Li(a, b, c) {
  return { value: a, source: null, stack: null != c ? c : null, digest: null != b ? b : null };
}
function Mi(a, b) {
  try {
    console.error(b.value);
  } catch (c) {
    setTimeout(function() {
      throw c;
    });
  }
}
var Ni = "function" === typeof WeakMap ? WeakMap : Map;
function Oi(a, b, c) {
  c = ch(-1, c);
  c.tag = 3;
  c.payload = { element: null };
  var d = b.value;
  c.callback = function() {
    Pi || (Pi = true, Qi = d);
    Mi(a, b);
  };
  return c;
}
function Ri(a, b, c) {
  c = ch(-1, c);
  c.tag = 3;
  var d = a.type.getDerivedStateFromError;
  if ("function" === typeof d) {
    var e = b.value;
    c.payload = function() {
      return d(e);
    };
    c.callback = function() {
      Mi(a, b);
    };
  }
  var f2 = a.stateNode;
  null !== f2 && "function" === typeof f2.componentDidCatch && (c.callback = function() {
    Mi(a, b);
    "function" !== typeof d && (null === Si ? Si = /* @__PURE__ */ new Set([this]) : Si.add(this));
    var c2 = b.stack;
    this.componentDidCatch(b.value, { componentStack: null !== c2 ? c2 : "" });
  });
  return c;
}
function Ti(a, b, c) {
  var d = a.pingCache;
  if (null === d) {
    d = a.pingCache = new Ni();
    var e = /* @__PURE__ */ new Set();
    d.set(b, e);
  } else
    e = d.get(b), void 0 === e && (e = /* @__PURE__ */ new Set(), d.set(b, e));
  e.has(c) || (e.add(c), a = Ui.bind(null, a, b, c), b.then(a, a));
}
function Vi(a) {
  do {
    var b;
    if (b = 13 === a.tag)
      b = a.memoizedState, b = null !== b ? null !== b.dehydrated ? true : false : true;
    if (b)
      return a;
    a = a.return;
  } while (null !== a);
  return null;
}
function Wi(a, b, c, d, e) {
  if (0 === (a.mode & 1))
    return a === b ? a.flags |= 65536 : (a.flags |= 128, c.flags |= 131072, c.flags &= -52805, 1 === c.tag && (null === c.alternate ? c.tag = 17 : (b = ch(-1, 1), b.tag = 2, dh(c, b, 1))), c.lanes |= 1), a;
  a.flags |= 65536;
  a.lanes = e;
  return a;
}
var Xi = ua.ReactCurrentOwner, Ug = false;
function Yi(a, b, c, d) {
  b.child = null === a ? Ch(b, null, c, d) : Bh(b, a.child, c, d);
}
function Zi(a, b, c, d, e) {
  c = c.render;
  var f2 = b.ref;
  Tg(b, e);
  d = Xh(a, b, c, d, f2, e);
  c = bi();
  if (null !== a && !Ug)
    return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
  I$1 && c && vg(b);
  b.flags |= 1;
  Yi(a, b, d, e);
  return b.child;
}
function aj(a, b, c, d, e) {
  if (null === a) {
    var f2 = c.type;
    if ("function" === typeof f2 && !bj(f2) && void 0 === f2.defaultProps && null === c.compare && void 0 === c.defaultProps)
      return b.tag = 15, b.type = f2, cj(a, b, f2, d, e);
    a = yh(c.type, null, d, b, b.mode, e);
    a.ref = b.ref;
    a.return = b;
    return b.child = a;
  }
  f2 = a.child;
  if (0 === (a.lanes & e)) {
    var g2 = f2.memoizedProps;
    c = c.compare;
    c = null !== c ? c : Ie$1;
    if (c(g2, d) && a.ref === b.ref)
      return $i(a, b, e);
  }
  b.flags |= 1;
  a = wh(f2, d);
  a.ref = b.ref;
  a.return = b;
  return b.child = a;
}
function cj(a, b, c, d, e) {
  if (null !== a) {
    var f2 = a.memoizedProps;
    if (Ie$1(f2, d) && a.ref === b.ref)
      if (Ug = false, b.pendingProps = d = f2, 0 !== (a.lanes & e))
        0 !== (a.flags & 131072) && (Ug = true);
      else
        return b.lanes = a.lanes, $i(a, b, e);
  }
  return dj(a, b, c, d, e);
}
function ej(a, b, c) {
  var d = b.pendingProps, e = d.children, f2 = null !== a ? a.memoizedState : null;
  if ("hidden" === d.mode)
    if (0 === (b.mode & 1))
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, G$1(fj, gj), gj |= c;
    else {
      if (0 === (c & 1073741824))
        return a = null !== f2 ? f2.baseLanes | c : c, b.lanes = b.childLanes = 1073741824, b.memoizedState = { baseLanes: a, cachePool: null, transitions: null }, b.updateQueue = null, G$1(fj, gj), gj |= a, null;
      b.memoizedState = { baseLanes: 0, cachePool: null, transitions: null };
      d = null !== f2 ? f2.baseLanes : c;
      G$1(fj, gj);
      gj |= d;
    }
  else
    null !== f2 ? (d = f2.baseLanes | c, b.memoizedState = null) : d = c, G$1(fj, gj), gj |= d;
  Yi(a, b, e, c);
  return b.child;
}
function hj(a, b) {
  var c = b.ref;
  if (null === a && null !== c || null !== a && a.ref !== c)
    b.flags |= 512, b.flags |= 2097152;
}
function dj(a, b, c, d, e) {
  var f2 = Zf(c) ? Xf : H$1.current;
  f2 = Yf(b, f2);
  Tg(b, e);
  c = Xh(a, b, c, d, f2, e);
  d = bi();
  if (null !== a && !Ug)
    return b.updateQueue = a.updateQueue, b.flags &= -2053, a.lanes &= ~e, $i(a, b, e);
  I$1 && d && vg(b);
  b.flags |= 1;
  Yi(a, b, c, e);
  return b.child;
}
function ij(a, b, c, d, e) {
  if (Zf(c)) {
    var f2 = true;
    cg(b);
  } else
    f2 = false;
  Tg(b, e);
  if (null === b.stateNode)
    jj(a, b), ph(b, c, d), rh(b, c, d, e), d = true;
  else if (null === a) {
    var g2 = b.stateNode, h = b.memoizedProps;
    g2.props = h;
    var k2 = g2.context, l2 = c.contextType;
    "object" === typeof l2 && null !== l2 ? l2 = Vg(l2) : (l2 = Zf(c) ? Xf : H$1.current, l2 = Yf(b, l2));
    var m2 = c.getDerivedStateFromProps, q2 = "function" === typeof m2 || "function" === typeof g2.getSnapshotBeforeUpdate;
    q2 || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h !== d || k2 !== l2) && qh(b, g2, d, l2);
    $g = false;
    var r2 = b.memoizedState;
    g2.state = r2;
    gh(b, d, g2, e);
    k2 = b.memoizedState;
    h !== d || r2 !== k2 || Wf.current || $g ? ("function" === typeof m2 && (kh(b, c, m2, d), k2 = b.memoizedState), (h = $g || oh(b, c, h, d, r2, k2, l2)) ? (q2 || "function" !== typeof g2.UNSAFE_componentWillMount && "function" !== typeof g2.componentWillMount || ("function" === typeof g2.componentWillMount && g2.componentWillMount(), "function" === typeof g2.UNSAFE_componentWillMount && g2.UNSAFE_componentWillMount()), "function" === typeof g2.componentDidMount && (b.flags |= 4194308)) : ("function" === typeof g2.componentDidMount && (b.flags |= 4194308), b.memoizedProps = d, b.memoizedState = k2), g2.props = d, g2.state = k2, g2.context = l2, d = h) : ("function" === typeof g2.componentDidMount && (b.flags |= 4194308), d = false);
  } else {
    g2 = b.stateNode;
    bh(a, b);
    h = b.memoizedProps;
    l2 = b.type === b.elementType ? h : Lg(b.type, h);
    g2.props = l2;
    q2 = b.pendingProps;
    r2 = g2.context;
    k2 = c.contextType;
    "object" === typeof k2 && null !== k2 ? k2 = Vg(k2) : (k2 = Zf(c) ? Xf : H$1.current, k2 = Yf(b, k2));
    var y2 = c.getDerivedStateFromProps;
    (m2 = "function" === typeof y2 || "function" === typeof g2.getSnapshotBeforeUpdate) || "function" !== typeof g2.UNSAFE_componentWillReceiveProps && "function" !== typeof g2.componentWillReceiveProps || (h !== q2 || r2 !== k2) && qh(b, g2, d, k2);
    $g = false;
    r2 = b.memoizedState;
    g2.state = r2;
    gh(b, d, g2, e);
    var n2 = b.memoizedState;
    h !== q2 || r2 !== n2 || Wf.current || $g ? ("function" === typeof y2 && (kh(b, c, y2, d), n2 = b.memoizedState), (l2 = $g || oh(b, c, l2, d, r2, n2, k2) || false) ? (m2 || "function" !== typeof g2.UNSAFE_componentWillUpdate && "function" !== typeof g2.componentWillUpdate || ("function" === typeof g2.componentWillUpdate && g2.componentWillUpdate(d, n2, k2), "function" === typeof g2.UNSAFE_componentWillUpdate && g2.UNSAFE_componentWillUpdate(d, n2, k2)), "function" === typeof g2.componentDidUpdate && (b.flags |= 4), "function" === typeof g2.getSnapshotBeforeUpdate && (b.flags |= 1024)) : ("function" !== typeof g2.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), b.memoizedProps = d, b.memoizedState = n2), g2.props = d, g2.state = n2, g2.context = k2, d = l2) : ("function" !== typeof g2.componentDidUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 4), "function" !== typeof g2.getSnapshotBeforeUpdate || h === a.memoizedProps && r2 === a.memoizedState || (b.flags |= 1024), d = false);
  }
  return kj(a, b, c, d, f2, e);
}
function kj(a, b, c, d, e, f2) {
  hj(a, b);
  var g2 = 0 !== (b.flags & 128);
  if (!d && !g2)
    return e && dg(b, c, false), $i(a, b, f2);
  d = b.stateNode;
  Xi.current = b;
  var h = g2 && "function" !== typeof c.getDerivedStateFromError ? null : d.render();
  b.flags |= 1;
  null !== a && g2 ? (b.child = Bh(b, a.child, null, f2), b.child = Bh(b, null, h, f2)) : Yi(a, b, h, f2);
  b.memoizedState = d.state;
  e && dg(b, c, true);
  return b.child;
}
function lj(a) {
  var b = a.stateNode;
  b.pendingContext ? ag(a, b.pendingContext, b.pendingContext !== b.context) : b.context && ag(a, b.context, false);
  Ih(a, b.containerInfo);
}
function mj(a, b, c, d, e) {
  Ig();
  Jg(e);
  b.flags |= 256;
  Yi(a, b, c, d);
  return b.child;
}
var nj = { dehydrated: null, treeContext: null, retryLane: 0 };
function oj(a) {
  return { baseLanes: a, cachePool: null, transitions: null };
}
function pj(a, b, c) {
  var d = b.pendingProps, e = M$1.current, f2 = false, g2 = 0 !== (b.flags & 128), h;
  (h = g2) || (h = null !== a && null === a.memoizedState ? false : 0 !== (e & 2));
  if (h)
    f2 = true, b.flags &= -129;
  else if (null === a || null !== a.memoizedState)
    e |= 1;
  G$1(M$1, e & 1);
  if (null === a) {
    Eg(b);
    a = b.memoizedState;
    if (null !== a && (a = a.dehydrated, null !== a))
      return 0 === (b.mode & 1) ? b.lanes = 1 : "$!" === a.data ? b.lanes = 8 : b.lanes = 1073741824, null;
    g2 = d.children;
    a = d.fallback;
    return f2 ? (d = b.mode, f2 = b.child, g2 = { mode: "hidden", children: g2 }, 0 === (d & 1) && null !== f2 ? (f2.childLanes = 0, f2.pendingProps = g2) : f2 = qj(g2, d, 0, null), a = Ah(a, d, c, null), f2.return = b, a.return = b, f2.sibling = a, b.child = f2, b.child.memoizedState = oj(c), b.memoizedState = nj, a) : rj(b, g2);
  }
  e = a.memoizedState;
  if (null !== e && (h = e.dehydrated, null !== h))
    return sj(a, b, g2, d, h, e, c);
  if (f2) {
    f2 = d.fallback;
    g2 = b.mode;
    e = a.child;
    h = e.sibling;
    var k2 = { mode: "hidden", children: d.children };
    0 === (g2 & 1) && b.child !== e ? (d = b.child, d.childLanes = 0, d.pendingProps = k2, b.deletions = null) : (d = wh(e, k2), d.subtreeFlags = e.subtreeFlags & 14680064);
    null !== h ? f2 = wh(h, f2) : (f2 = Ah(f2, g2, c, null), f2.flags |= 2);
    f2.return = b;
    d.return = b;
    d.sibling = f2;
    b.child = d;
    d = f2;
    f2 = b.child;
    g2 = a.child.memoizedState;
    g2 = null === g2 ? oj(c) : { baseLanes: g2.baseLanes | c, cachePool: null, transitions: g2.transitions };
    f2.memoizedState = g2;
    f2.childLanes = a.childLanes & ~c;
    b.memoizedState = nj;
    return d;
  }
  f2 = a.child;
  a = f2.sibling;
  d = wh(f2, { mode: "visible", children: d.children });
  0 === (b.mode & 1) && (d.lanes = c);
  d.return = b;
  d.sibling = null;
  null !== a && (c = b.deletions, null === c ? (b.deletions = [a], b.flags |= 16) : c.push(a));
  b.child = d;
  b.memoizedState = null;
  return d;
}
function rj(a, b) {
  b = qj({ mode: "visible", children: b }, a.mode, 0, null);
  b.return = a;
  return a.child = b;
}
function tj(a, b, c, d) {
  null !== d && Jg(d);
  Bh(b, a.child, null, c);
  a = rj(b, b.pendingProps.children);
  a.flags |= 2;
  b.memoizedState = null;
  return a;
}
function sj(a, b, c, d, e, f2, g2) {
  if (c) {
    if (b.flags & 256)
      return b.flags &= -257, d = Li(Error(p(422))), tj(a, b, g2, d);
    if (null !== b.memoizedState)
      return b.child = a.child, b.flags |= 128, null;
    f2 = d.fallback;
    e = b.mode;
    d = qj({ mode: "visible", children: d.children }, e, 0, null);
    f2 = Ah(f2, e, g2, null);
    f2.flags |= 2;
    d.return = b;
    f2.return = b;
    d.sibling = f2;
    b.child = d;
    0 !== (b.mode & 1) && Bh(b, a.child, null, g2);
    b.child.memoizedState = oj(g2);
    b.memoizedState = nj;
    return f2;
  }
  if (0 === (b.mode & 1))
    return tj(a, b, g2, null);
  if ("$!" === e.data) {
    d = e.nextSibling && e.nextSibling.dataset;
    if (d)
      var h = d.dgst;
    d = h;
    f2 = Error(p(419));
    d = Li(f2, d, void 0);
    return tj(a, b, g2, d);
  }
  h = 0 !== (g2 & a.childLanes);
  if (Ug || h) {
    d = R$1;
    if (null !== d) {
      switch (g2 & -g2) {
        case 4:
          e = 2;
          break;
        case 16:
          e = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          e = 32;
          break;
        case 536870912:
          e = 268435456;
          break;
        default:
          e = 0;
      }
      e = 0 !== (e & (d.suspendedLanes | g2)) ? 0 : e;
      0 !== e && e !== f2.retryLane && (f2.retryLane = e, Zg(a, e), mh(d, a, e, -1));
    }
    uj();
    d = Li(Error(p(421)));
    return tj(a, b, g2, d);
  }
  if ("$?" === e.data)
    return b.flags |= 128, b.child = a.child, b = vj.bind(null, a), e._reactRetry = b, null;
  a = f2.treeContext;
  yg = Lf(e.nextSibling);
  xg = b;
  I$1 = true;
  zg = null;
  null !== a && (og[pg++] = rg, og[pg++] = sg, og[pg++] = qg, rg = a.id, sg = a.overflow, qg = b);
  b = rj(b, d.children);
  b.flags |= 4096;
  return b;
}
function wj(a, b, c) {
  a.lanes |= b;
  var d = a.alternate;
  null !== d && (d.lanes |= b);
  Sg(a.return, b, c);
}
function xj(a, b, c, d, e) {
  var f2 = a.memoizedState;
  null === f2 ? a.memoizedState = { isBackwards: b, rendering: null, renderingStartTime: 0, last: d, tail: c, tailMode: e } : (f2.isBackwards = b, f2.rendering = null, f2.renderingStartTime = 0, f2.last = d, f2.tail = c, f2.tailMode = e);
}
function yj(a, b, c) {
  var d = b.pendingProps, e = d.revealOrder, f2 = d.tail;
  Yi(a, b, d.children, c);
  d = M$1.current;
  if (0 !== (d & 2))
    d = d & 1 | 2, b.flags |= 128;
  else {
    if (null !== a && 0 !== (a.flags & 128))
      a:
        for (a = b.child; null !== a; ) {
          if (13 === a.tag)
            null !== a.memoizedState && wj(a, c, b);
          else if (19 === a.tag)
            wj(a, c, b);
          else if (null !== a.child) {
            a.child.return = a;
            a = a.child;
            continue;
          }
          if (a === b)
            break a;
          for (; null === a.sibling; ) {
            if (null === a.return || a.return === b)
              break a;
            a = a.return;
          }
          a.sibling.return = a.return;
          a = a.sibling;
        }
    d &= 1;
  }
  G$1(M$1, d);
  if (0 === (b.mode & 1))
    b.memoizedState = null;
  else
    switch (e) {
      case "forwards":
        c = b.child;
        for (e = null; null !== c; )
          a = c.alternate, null !== a && null === Mh(a) && (e = c), c = c.sibling;
        c = e;
        null === c ? (e = b.child, b.child = null) : (e = c.sibling, c.sibling = null);
        xj(b, false, e, c, f2);
        break;
      case "backwards":
        c = null;
        e = b.child;
        for (b.child = null; null !== e; ) {
          a = e.alternate;
          if (null !== a && null === Mh(a)) {
            b.child = e;
            break;
          }
          a = e.sibling;
          e.sibling = c;
          c = e;
          e = a;
        }
        xj(b, true, c, null, f2);
        break;
      case "together":
        xj(b, false, null, null, void 0);
        break;
      default:
        b.memoizedState = null;
    }
  return b.child;
}
function jj(a, b) {
  0 === (b.mode & 1) && null !== a && (a.alternate = null, b.alternate = null, b.flags |= 2);
}
function $i(a, b, c) {
  null !== a && (b.dependencies = a.dependencies);
  hh |= b.lanes;
  if (0 === (c & b.childLanes))
    return null;
  if (null !== a && b.child !== a.child)
    throw Error(p(153));
  if (null !== b.child) {
    a = b.child;
    c = wh(a, a.pendingProps);
    b.child = c;
    for (c.return = b; null !== a.sibling; )
      a = a.sibling, c = c.sibling = wh(a, a.pendingProps), c.return = b;
    c.sibling = null;
  }
  return b.child;
}
function zj(a, b, c) {
  switch (b.tag) {
    case 3:
      lj(b);
      Ig();
      break;
    case 5:
      Kh(b);
      break;
    case 1:
      Zf(b.type) && cg(b);
      break;
    case 4:
      Ih(b, b.stateNode.containerInfo);
      break;
    case 10:
      var d = b.type._context, e = b.memoizedProps.value;
      G$1(Mg, d._currentValue);
      d._currentValue = e;
      break;
    case 13:
      d = b.memoizedState;
      if (null !== d) {
        if (null !== d.dehydrated)
          return G$1(M$1, M$1.current & 1), b.flags |= 128, null;
        if (0 !== (c & b.child.childLanes))
          return pj(a, b, c);
        G$1(M$1, M$1.current & 1);
        a = $i(a, b, c);
        return null !== a ? a.sibling : null;
      }
      G$1(M$1, M$1.current & 1);
      break;
    case 19:
      d = 0 !== (c & b.childLanes);
      if (0 !== (a.flags & 128)) {
        if (d)
          return yj(a, b, c);
        b.flags |= 128;
      }
      e = b.memoizedState;
      null !== e && (e.rendering = null, e.tail = null, e.lastEffect = null);
      G$1(M$1, M$1.current);
      if (d)
        break;
      else
        return null;
    case 22:
    case 23:
      return b.lanes = 0, ej(a, b, c);
  }
  return $i(a, b, c);
}
var Aj, Bj, Cj, Dj;
Aj = function(a, b) {
  for (var c = b.child; null !== c; ) {
    if (5 === c.tag || 6 === c.tag)
      a.appendChild(c.stateNode);
    else if (4 !== c.tag && null !== c.child) {
      c.child.return = c;
      c = c.child;
      continue;
    }
    if (c === b)
      break;
    for (; null === c.sibling; ) {
      if (null === c.return || c.return === b)
        return;
      c = c.return;
    }
    c.sibling.return = c.return;
    c = c.sibling;
  }
};
Bj = function() {
};
Cj = function(a, b, c, d) {
  var e = a.memoizedProps;
  if (e !== d) {
    a = b.stateNode;
    Hh(Eh.current);
    var f2 = null;
    switch (c) {
      case "input":
        e = Ya(a, e);
        d = Ya(a, d);
        f2 = [];
        break;
      case "select":
        e = A$1({}, e, { value: void 0 });
        d = A$1({}, d, { value: void 0 });
        f2 = [];
        break;
      case "textarea":
        e = gb(a, e);
        d = gb(a, d);
        f2 = [];
        break;
      default:
        "function" !== typeof e.onClick && "function" === typeof d.onClick && (a.onclick = Bf);
    }
    ub(c, d);
    var g2;
    c = null;
    for (l2 in e)
      if (!d.hasOwnProperty(l2) && e.hasOwnProperty(l2) && null != e[l2])
        if ("style" === l2) {
          var h = e[l2];
          for (g2 in h)
            h.hasOwnProperty(g2) && (c || (c = {}), c[g2] = "");
        } else
          "dangerouslySetInnerHTML" !== l2 && "children" !== l2 && "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && "autoFocus" !== l2 && (ea.hasOwnProperty(l2) ? f2 || (f2 = []) : (f2 = f2 || []).push(l2, null));
    for (l2 in d) {
      var k2 = d[l2];
      h = null != e ? e[l2] : void 0;
      if (d.hasOwnProperty(l2) && k2 !== h && (null != k2 || null != h))
        if ("style" === l2)
          if (h) {
            for (g2 in h)
              !h.hasOwnProperty(g2) || k2 && k2.hasOwnProperty(g2) || (c || (c = {}), c[g2] = "");
            for (g2 in k2)
              k2.hasOwnProperty(g2) && h[g2] !== k2[g2] && (c || (c = {}), c[g2] = k2[g2]);
          } else
            c || (f2 || (f2 = []), f2.push(
              l2,
              c
            )), c = k2;
        else
          "dangerouslySetInnerHTML" === l2 ? (k2 = k2 ? k2.__html : void 0, h = h ? h.__html : void 0, null != k2 && h !== k2 && (f2 = f2 || []).push(l2, k2)) : "children" === l2 ? "string" !== typeof k2 && "number" !== typeof k2 || (f2 = f2 || []).push(l2, "" + k2) : "suppressContentEditableWarning" !== l2 && "suppressHydrationWarning" !== l2 && (ea.hasOwnProperty(l2) ? (null != k2 && "onScroll" === l2 && D$1("scroll", a), f2 || h === k2 || (f2 = [])) : (f2 = f2 || []).push(l2, k2));
    }
    c && (f2 = f2 || []).push("style", c);
    var l2 = f2;
    if (b.updateQueue = l2)
      b.flags |= 4;
  }
};
Dj = function(a, b, c, d) {
  c !== d && (b.flags |= 4);
};
function Ej(a, b) {
  if (!I$1)
    switch (a.tailMode) {
      case "hidden":
        b = a.tail;
        for (var c = null; null !== b; )
          null !== b.alternate && (c = b), b = b.sibling;
        null === c ? a.tail = null : c.sibling = null;
        break;
      case "collapsed":
        c = a.tail;
        for (var d = null; null !== c; )
          null !== c.alternate && (d = c), c = c.sibling;
        null === d ? b || null === a.tail ? a.tail = null : a.tail.sibling = null : d.sibling = null;
    }
}
function S(a) {
  var b = null !== a.alternate && a.alternate.child === a.child, c = 0, d = 0;
  if (b)
    for (var e = a.child; null !== e; )
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags & 14680064, d |= e.flags & 14680064, e.return = a, e = e.sibling;
  else
    for (e = a.child; null !== e; )
      c |= e.lanes | e.childLanes, d |= e.subtreeFlags, d |= e.flags, e.return = a, e = e.sibling;
  a.subtreeFlags |= d;
  a.childLanes = c;
  return b;
}
function Fj(a, b, c) {
  var d = b.pendingProps;
  wg(b);
  switch (b.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return S(b), null;
    case 1:
      return Zf(b.type) && $f(), S(b), null;
    case 3:
      d = b.stateNode;
      Jh();
      E$1(Wf);
      E$1(H$1);
      Oh();
      d.pendingContext && (d.context = d.pendingContext, d.pendingContext = null);
      if (null === a || null === a.child)
        Gg(b) ? b.flags |= 4 : null === a || a.memoizedState.isDehydrated && 0 === (b.flags & 256) || (b.flags |= 1024, null !== zg && (Gj(zg), zg = null));
      Bj(a, b);
      S(b);
      return null;
    case 5:
      Lh(b);
      var e = Hh(Gh.current);
      c = b.type;
      if (null !== a && null != b.stateNode)
        Cj(a, b, c, d, e), a.ref !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      else {
        if (!d) {
          if (null === b.stateNode)
            throw Error(p(166));
          S(b);
          return null;
        }
        a = Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.type;
          var f2 = b.memoizedProps;
          d[Of] = b;
          d[Pf] = f2;
          a = 0 !== (b.mode & 1);
          switch (c) {
            case "dialog":
              D$1("cancel", d);
              D$1("close", d);
              break;
            case "iframe":
            case "object":
            case "embed":
              D$1("load", d);
              break;
            case "video":
            case "audio":
              for (e = 0; e < lf.length; e++)
                D$1(lf[e], d);
              break;
            case "source":
              D$1("error", d);
              break;
            case "img":
            case "image":
            case "link":
              D$1(
                "error",
                d
              );
              D$1("load", d);
              break;
            case "details":
              D$1("toggle", d);
              break;
            case "input":
              Za(d, f2);
              D$1("invalid", d);
              break;
            case "select":
              d._wrapperState = { wasMultiple: !!f2.multiple };
              D$1("invalid", d);
              break;
            case "textarea":
              hb(d, f2), D$1("invalid", d);
          }
          ub(c, f2);
          e = null;
          for (var g2 in f2)
            if (f2.hasOwnProperty(g2)) {
              var h = f2[g2];
              "children" === g2 ? "string" === typeof h ? d.textContent !== h && (true !== f2.suppressHydrationWarning && Af(d.textContent, h, a), e = ["children", h]) : "number" === typeof h && d.textContent !== "" + h && (true !== f2.suppressHydrationWarning && Af(
                d.textContent,
                h,
                a
              ), e = ["children", "" + h]) : ea.hasOwnProperty(g2) && null != h && "onScroll" === g2 && D$1("scroll", d);
            }
          switch (c) {
            case "input":
              Va(d);
              db(d, f2, true);
              break;
            case "textarea":
              Va(d);
              jb(d);
              break;
            case "select":
            case "option":
              break;
            default:
              "function" === typeof f2.onClick && (d.onclick = Bf);
          }
          d = e;
          b.updateQueue = d;
          null !== d && (b.flags |= 4);
        } else {
          g2 = 9 === e.nodeType ? e : e.ownerDocument;
          "http://www.w3.org/1999/xhtml" === a && (a = kb(c));
          "http://www.w3.org/1999/xhtml" === a ? "script" === c ? (a = g2.createElement("div"), a.innerHTML = "<script><\/script>", a = a.removeChild(a.firstChild)) : "string" === typeof d.is ? a = g2.createElement(c, { is: d.is }) : (a = g2.createElement(c), "select" === c && (g2 = a, d.multiple ? g2.multiple = true : d.size && (g2.size = d.size))) : a = g2.createElementNS(a, c);
          a[Of] = b;
          a[Pf] = d;
          Aj(a, b, false, false);
          b.stateNode = a;
          a: {
            g2 = vb(c, d);
            switch (c) {
              case "dialog":
                D$1("cancel", a);
                D$1("close", a);
                e = d;
                break;
              case "iframe":
              case "object":
              case "embed":
                D$1("load", a);
                e = d;
                break;
              case "video":
              case "audio":
                for (e = 0; e < lf.length; e++)
                  D$1(lf[e], a);
                e = d;
                break;
              case "source":
                D$1("error", a);
                e = d;
                break;
              case "img":
              case "image":
              case "link":
                D$1(
                  "error",
                  a
                );
                D$1("load", a);
                e = d;
                break;
              case "details":
                D$1("toggle", a);
                e = d;
                break;
              case "input":
                Za(a, d);
                e = Ya(a, d);
                D$1("invalid", a);
                break;
              case "option":
                e = d;
                break;
              case "select":
                a._wrapperState = { wasMultiple: !!d.multiple };
                e = A$1({}, d, { value: void 0 });
                D$1("invalid", a);
                break;
              case "textarea":
                hb(a, d);
                e = gb(a, d);
                D$1("invalid", a);
                break;
              default:
                e = d;
            }
            ub(c, e);
            h = e;
            for (f2 in h)
              if (h.hasOwnProperty(f2)) {
                var k2 = h[f2];
                "style" === f2 ? sb(a, k2) : "dangerouslySetInnerHTML" === f2 ? (k2 = k2 ? k2.__html : void 0, null != k2 && nb(a, k2)) : "children" === f2 ? "string" === typeof k2 ? ("textarea" !== c || "" !== k2) && ob(a, k2) : "number" === typeof k2 && ob(a, "" + k2) : "suppressContentEditableWarning" !== f2 && "suppressHydrationWarning" !== f2 && "autoFocus" !== f2 && (ea.hasOwnProperty(f2) ? null != k2 && "onScroll" === f2 && D$1("scroll", a) : null != k2 && ta(a, f2, k2, g2));
              }
            switch (c) {
              case "input":
                Va(a);
                db(a, d, false);
                break;
              case "textarea":
                Va(a);
                jb(a);
                break;
              case "option":
                null != d.value && a.setAttribute("value", "" + Sa(d.value));
                break;
              case "select":
                a.multiple = !!d.multiple;
                f2 = d.value;
                null != f2 ? fb(a, !!d.multiple, f2, false) : null != d.defaultValue && fb(
                  a,
                  !!d.multiple,
                  d.defaultValue,
                  true
                );
                break;
              default:
                "function" === typeof e.onClick && (a.onclick = Bf);
            }
            switch (c) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                d = !!d.autoFocus;
                break a;
              case "img":
                d = true;
                break a;
              default:
                d = false;
            }
          }
          d && (b.flags |= 4);
        }
        null !== b.ref && (b.flags |= 512, b.flags |= 2097152);
      }
      S(b);
      return null;
    case 6:
      if (a && null != b.stateNode)
        Dj(a, b, a.memoizedProps, d);
      else {
        if ("string" !== typeof d && null === b.stateNode)
          throw Error(p(166));
        c = Hh(Gh.current);
        Hh(Eh.current);
        if (Gg(b)) {
          d = b.stateNode;
          c = b.memoizedProps;
          d[Of] = b;
          if (f2 = d.nodeValue !== c) {
            if (a = xg, null !== a)
              switch (a.tag) {
                case 3:
                  Af(d.nodeValue, c, 0 !== (a.mode & 1));
                  break;
                case 5:
                  true !== a.memoizedProps.suppressHydrationWarning && Af(d.nodeValue, c, 0 !== (a.mode & 1));
              }
          }
          f2 && (b.flags |= 4);
        } else
          d = (9 === c.nodeType ? c : c.ownerDocument).createTextNode(d), d[Of] = b, b.stateNode = d;
      }
      S(b);
      return null;
    case 13:
      E$1(M$1);
      d = b.memoizedState;
      if (null === a || null !== a.memoizedState && null !== a.memoizedState.dehydrated) {
        if (I$1 && null !== yg && 0 !== (b.mode & 1) && 0 === (b.flags & 128))
          Hg(), Ig(), b.flags |= 98560, f2 = false;
        else if (f2 = Gg(b), null !== d && null !== d.dehydrated) {
          if (null === a) {
            if (!f2)
              throw Error(p(318));
            f2 = b.memoizedState;
            f2 = null !== f2 ? f2.dehydrated : null;
            if (!f2)
              throw Error(p(317));
            f2[Of] = b;
          } else
            Ig(), 0 === (b.flags & 128) && (b.memoizedState = null), b.flags |= 4;
          S(b);
          f2 = false;
        } else
          null !== zg && (Gj(zg), zg = null), f2 = true;
        if (!f2)
          return b.flags & 65536 ? b : null;
      }
      if (0 !== (b.flags & 128))
        return b.lanes = c, b;
      d = null !== d;
      d !== (null !== a && null !== a.memoizedState) && d && (b.child.flags |= 8192, 0 !== (b.mode & 1) && (null === a || 0 !== (M$1.current & 1) ? 0 === T$1 && (T$1 = 3) : uj()));
      null !== b.updateQueue && (b.flags |= 4);
      S(b);
      return null;
    case 4:
      return Jh(), Bj(a, b), null === a && sf(b.stateNode.containerInfo), S(b), null;
    case 10:
      return Rg(b.type._context), S(b), null;
    case 17:
      return Zf(b.type) && $f(), S(b), null;
    case 19:
      E$1(M$1);
      f2 = b.memoizedState;
      if (null === f2)
        return S(b), null;
      d = 0 !== (b.flags & 128);
      g2 = f2.rendering;
      if (null === g2)
        if (d)
          Ej(f2, false);
        else {
          if (0 !== T$1 || null !== a && 0 !== (a.flags & 128))
            for (a = b.child; null !== a; ) {
              g2 = Mh(a);
              if (null !== g2) {
                b.flags |= 128;
                Ej(f2, false);
                d = g2.updateQueue;
                null !== d && (b.updateQueue = d, b.flags |= 4);
                b.subtreeFlags = 0;
                d = c;
                for (c = b.child; null !== c; )
                  f2 = c, a = d, f2.flags &= 14680066, g2 = f2.alternate, null === g2 ? (f2.childLanes = 0, f2.lanes = a, f2.child = null, f2.subtreeFlags = 0, f2.memoizedProps = null, f2.memoizedState = null, f2.updateQueue = null, f2.dependencies = null, f2.stateNode = null) : (f2.childLanes = g2.childLanes, f2.lanes = g2.lanes, f2.child = g2.child, f2.subtreeFlags = 0, f2.deletions = null, f2.memoizedProps = g2.memoizedProps, f2.memoizedState = g2.memoizedState, f2.updateQueue = g2.updateQueue, f2.type = g2.type, a = g2.dependencies, f2.dependencies = null === a ? null : { lanes: a.lanes, firstContext: a.firstContext }), c = c.sibling;
                G$1(M$1, M$1.current & 1 | 2);
                return b.child;
              }
              a = a.sibling;
            }
          null !== f2.tail && B$1() > Hj && (b.flags |= 128, d = true, Ej(f2, false), b.lanes = 4194304);
        }
      else {
        if (!d)
          if (a = Mh(g2), null !== a) {
            if (b.flags |= 128, d = true, c = a.updateQueue, null !== c && (b.updateQueue = c, b.flags |= 4), Ej(f2, true), null === f2.tail && "hidden" === f2.tailMode && !g2.alternate && !I$1)
              return S(b), null;
          } else
            2 * B$1() - f2.renderingStartTime > Hj && 1073741824 !== c && (b.flags |= 128, d = true, Ej(f2, false), b.lanes = 4194304);
        f2.isBackwards ? (g2.sibling = b.child, b.child = g2) : (c = f2.last, null !== c ? c.sibling = g2 : b.child = g2, f2.last = g2);
      }
      if (null !== f2.tail)
        return b = f2.tail, f2.rendering = b, f2.tail = b.sibling, f2.renderingStartTime = B$1(), b.sibling = null, c = M$1.current, G$1(M$1, d ? c & 1 | 2 : c & 1), b;
      S(b);
      return null;
    case 22:
    case 23:
      return Ij(), d = null !== b.memoizedState, null !== a && null !== a.memoizedState !== d && (b.flags |= 8192), d && 0 !== (b.mode & 1) ? 0 !== (gj & 1073741824) && (S(b), b.subtreeFlags & 6 && (b.flags |= 8192)) : S(b), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(p(156, b.tag));
}
function Jj(a, b) {
  wg(b);
  switch (b.tag) {
    case 1:
      return Zf(b.type) && $f(), a = b.flags, a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 3:
      return Jh(), E$1(Wf), E$1(H$1), Oh(), a = b.flags, 0 !== (a & 65536) && 0 === (a & 128) ? (b.flags = a & -65537 | 128, b) : null;
    case 5:
      return Lh(b), null;
    case 13:
      E$1(M$1);
      a = b.memoizedState;
      if (null !== a && null !== a.dehydrated) {
        if (null === b.alternate)
          throw Error(p(340));
        Ig();
      }
      a = b.flags;
      return a & 65536 ? (b.flags = a & -65537 | 128, b) : null;
    case 19:
      return E$1(M$1), null;
    case 4:
      return Jh(), null;
    case 10:
      return Rg(b.type._context), null;
    case 22:
    case 23:
      return Ij(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Kj = false, U$1 = false, Lj = "function" === typeof WeakSet ? WeakSet : Set, V$1 = null;
function Mj(a, b) {
  var c = a.ref;
  if (null !== c)
    if ("function" === typeof c)
      try {
        c(null);
      } catch (d) {
        W$1(a, b, d);
      }
    else
      c.current = null;
}
function Nj(a, b, c) {
  try {
    c();
  } catch (d) {
    W$1(a, b, d);
  }
}
var Oj = false;
function Pj(a, b) {
  Cf = dd;
  a = Me$1();
  if (Ne$1(a)) {
    if ("selectionStart" in a)
      var c = { start: a.selectionStart, end: a.selectionEnd };
    else
      a: {
        c = (c = a.ownerDocument) && c.defaultView || window;
        var d = c.getSelection && c.getSelection();
        if (d && 0 !== d.rangeCount) {
          c = d.anchorNode;
          var e = d.anchorOffset, f2 = d.focusNode;
          d = d.focusOffset;
          try {
            c.nodeType, f2.nodeType;
          } catch (F2) {
            c = null;
            break a;
          }
          var g2 = 0, h = -1, k2 = -1, l2 = 0, m2 = 0, q2 = a, r2 = null;
          b:
            for (; ; ) {
              for (var y2; ; ) {
                q2 !== c || 0 !== e && 3 !== q2.nodeType || (h = g2 + e);
                q2 !== f2 || 0 !== d && 3 !== q2.nodeType || (k2 = g2 + d);
                3 === q2.nodeType && (g2 += q2.nodeValue.length);
                if (null === (y2 = q2.firstChild))
                  break;
                r2 = q2;
                q2 = y2;
              }
              for (; ; ) {
                if (q2 === a)
                  break b;
                r2 === c && ++l2 === e && (h = g2);
                r2 === f2 && ++m2 === d && (k2 = g2);
                if (null !== (y2 = q2.nextSibling))
                  break;
                q2 = r2;
                r2 = q2.parentNode;
              }
              q2 = y2;
            }
          c = -1 === h || -1 === k2 ? null : { start: h, end: k2 };
        } else
          c = null;
      }
    c = c || { start: 0, end: 0 };
  } else
    c = null;
  Df = { focusedElem: a, selectionRange: c };
  dd = false;
  for (V$1 = b; null !== V$1; )
    if (b = V$1, a = b.child, 0 !== (b.subtreeFlags & 1028) && null !== a)
      a.return = b, V$1 = a;
    else
      for (; null !== V$1; ) {
        b = V$1;
        try {
          var n2 = b.alternate;
          if (0 !== (b.flags & 1024))
            switch (b.tag) {
              case 0:
              case 11:
              case 15:
                break;
              case 1:
                if (null !== n2) {
                  var t2 = n2.memoizedProps, J2 = n2.memoizedState, x2 = b.stateNode, w2 = x2.getSnapshotBeforeUpdate(b.elementType === b.type ? t2 : Lg(b.type, t2), J2);
                  x2.__reactInternalSnapshotBeforeUpdate = w2;
                }
                break;
              case 3:
                var u2 = b.stateNode.containerInfo;
                1 === u2.nodeType ? u2.textContent = "" : 9 === u2.nodeType && u2.documentElement && u2.removeChild(u2.documentElement);
                break;
              case 5:
              case 6:
              case 4:
              case 17:
                break;
              default:
                throw Error(p(163));
            }
        } catch (F2) {
          W$1(b, b.return, F2);
        }
        a = b.sibling;
        if (null !== a) {
          a.return = b.return;
          V$1 = a;
          break;
        }
        V$1 = b.return;
      }
  n2 = Oj;
  Oj = false;
  return n2;
}
function Qj(a, b, c) {
  var d = b.updateQueue;
  d = null !== d ? d.lastEffect : null;
  if (null !== d) {
    var e = d = d.next;
    do {
      if ((e.tag & a) === a) {
        var f2 = e.destroy;
        e.destroy = void 0;
        void 0 !== f2 && Nj(b, c, f2);
      }
      e = e.next;
    } while (e !== d);
  }
}
function Rj(a, b) {
  b = b.updateQueue;
  b = null !== b ? b.lastEffect : null;
  if (null !== b) {
    var c = b = b.next;
    do {
      if ((c.tag & a) === a) {
        var d = c.create;
        c.destroy = d();
      }
      c = c.next;
    } while (c !== b);
  }
}
function Sj(a) {
  var b = a.ref;
  if (null !== b) {
    var c = a.stateNode;
    switch (a.tag) {
      case 5:
        a = c;
        break;
      default:
        a = c;
    }
    "function" === typeof b ? b(a) : b.current = a;
  }
}
function Tj(a) {
  var b = a.alternate;
  null !== b && (a.alternate = null, Tj(b));
  a.child = null;
  a.deletions = null;
  a.sibling = null;
  5 === a.tag && (b = a.stateNode, null !== b && (delete b[Of], delete b[Pf], delete b[of], delete b[Qf], delete b[Rf]));
  a.stateNode = null;
  a.return = null;
  a.dependencies = null;
  a.memoizedProps = null;
  a.memoizedState = null;
  a.pendingProps = null;
  a.stateNode = null;
  a.updateQueue = null;
}
function Uj(a) {
  return 5 === a.tag || 3 === a.tag || 4 === a.tag;
}
function Vj(a) {
  a:
    for (; ; ) {
      for (; null === a.sibling; ) {
        if (null === a.return || Uj(a.return))
          return null;
        a = a.return;
      }
      a.sibling.return = a.return;
      for (a = a.sibling; 5 !== a.tag && 6 !== a.tag && 18 !== a.tag; ) {
        if (a.flags & 2)
          continue a;
        if (null === a.child || 4 === a.tag)
          continue a;
        else
          a.child.return = a, a = a.child;
      }
      if (!(a.flags & 2))
        return a.stateNode;
    }
}
function Wj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d)
    a = a.stateNode, b ? 8 === c.nodeType ? c.parentNode.insertBefore(a, b) : c.insertBefore(a, b) : (8 === c.nodeType ? (b = c.parentNode, b.insertBefore(a, c)) : (b = c, b.appendChild(a)), c = c._reactRootContainer, null !== c && void 0 !== c || null !== b.onclick || (b.onclick = Bf));
  else if (4 !== d && (a = a.child, null !== a))
    for (Wj(a, b, c), a = a.sibling; null !== a; )
      Wj(a, b, c), a = a.sibling;
}
function Xj(a, b, c) {
  var d = a.tag;
  if (5 === d || 6 === d)
    a = a.stateNode, b ? c.insertBefore(a, b) : c.appendChild(a);
  else if (4 !== d && (a = a.child, null !== a))
    for (Xj(a, b, c), a = a.sibling; null !== a; )
      Xj(a, b, c), a = a.sibling;
}
var X$1 = null, Yj = false;
function Zj(a, b, c) {
  for (c = c.child; null !== c; )
    ak(a, b, c), c = c.sibling;
}
function ak(a, b, c) {
  if (lc && "function" === typeof lc.onCommitFiberUnmount)
    try {
      lc.onCommitFiberUnmount(kc, c);
    } catch (h) {
    }
  switch (c.tag) {
    case 5:
      U$1 || Mj(c, b);
    case 6:
      var d = X$1, e = Yj;
      X$1 = null;
      Zj(a, b, c);
      X$1 = d;
      Yj = e;
      null !== X$1 && (Yj ? (a = X$1, c = c.stateNode, 8 === a.nodeType ? a.parentNode.removeChild(c) : a.removeChild(c)) : X$1.removeChild(c.stateNode));
      break;
    case 18:
      null !== X$1 && (Yj ? (a = X$1, c = c.stateNode, 8 === a.nodeType ? Kf(a.parentNode, c) : 1 === a.nodeType && Kf(a, c), bd(a)) : Kf(X$1, c.stateNode));
      break;
    case 4:
      d = X$1;
      e = Yj;
      X$1 = c.stateNode.containerInfo;
      Yj = true;
      Zj(a, b, c);
      X$1 = d;
      Yj = e;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!U$1 && (d = c.updateQueue, null !== d && (d = d.lastEffect, null !== d))) {
        e = d = d.next;
        do {
          var f2 = e, g2 = f2.destroy;
          f2 = f2.tag;
          void 0 !== g2 && (0 !== (f2 & 2) ? Nj(c, b, g2) : 0 !== (f2 & 4) && Nj(c, b, g2));
          e = e.next;
        } while (e !== d);
      }
      Zj(a, b, c);
      break;
    case 1:
      if (!U$1 && (Mj(c, b), d = c.stateNode, "function" === typeof d.componentWillUnmount))
        try {
          d.props = c.memoizedProps, d.state = c.memoizedState, d.componentWillUnmount();
        } catch (h) {
          W$1(c, b, h);
        }
      Zj(a, b, c);
      break;
    case 21:
      Zj(a, b, c);
      break;
    case 22:
      c.mode & 1 ? (U$1 = (d = U$1) || null !== c.memoizedState, Zj(a, b, c), U$1 = d) : Zj(a, b, c);
      break;
    default:
      Zj(a, b, c);
  }
}
function bk(a) {
  var b = a.updateQueue;
  if (null !== b) {
    a.updateQueue = null;
    var c = a.stateNode;
    null === c && (c = a.stateNode = new Lj());
    b.forEach(function(b2) {
      var d = ck.bind(null, a, b2);
      c.has(b2) || (c.add(b2), b2.then(d, d));
    });
  }
}
function dk(a, b) {
  var c = b.deletions;
  if (null !== c)
    for (var d = 0; d < c.length; d++) {
      var e = c[d];
      try {
        var f2 = a, g2 = b, h = g2;
        a:
          for (; null !== h; ) {
            switch (h.tag) {
              case 5:
                X$1 = h.stateNode;
                Yj = false;
                break a;
              case 3:
                X$1 = h.stateNode.containerInfo;
                Yj = true;
                break a;
              case 4:
                X$1 = h.stateNode.containerInfo;
                Yj = true;
                break a;
            }
            h = h.return;
          }
        if (null === X$1)
          throw Error(p(160));
        ak(f2, g2, e);
        X$1 = null;
        Yj = false;
        var k2 = e.alternate;
        null !== k2 && (k2.return = null);
        e.return = null;
      } catch (l2) {
        W$1(e, b, l2);
      }
    }
  if (b.subtreeFlags & 12854)
    for (b = b.child; null !== b; )
      ek(b, a), b = b.sibling;
}
function ek(a, b) {
  var c = a.alternate, d = a.flags;
  switch (a.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      dk(b, a);
      fk(a);
      if (d & 4) {
        try {
          Qj(3, a, a.return), Rj(3, a);
        } catch (t2) {
          W$1(a, a.return, t2);
        }
        try {
          Qj(5, a, a.return);
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      break;
    case 1:
      dk(b, a);
      fk(a);
      d & 512 && null !== c && Mj(c, c.return);
      break;
    case 5:
      dk(b, a);
      fk(a);
      d & 512 && null !== c && Mj(c, c.return);
      if (a.flags & 32) {
        var e = a.stateNode;
        try {
          ob(e, "");
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      if (d & 4 && (e = a.stateNode, null != e)) {
        var f2 = a.memoizedProps, g2 = null !== c ? c.memoizedProps : f2, h = a.type, k2 = a.updateQueue;
        a.updateQueue = null;
        if (null !== k2)
          try {
            "input" === h && "radio" === f2.type && null != f2.name && ab(e, f2);
            vb(h, g2);
            var l2 = vb(h, f2);
            for (g2 = 0; g2 < k2.length; g2 += 2) {
              var m2 = k2[g2], q2 = k2[g2 + 1];
              "style" === m2 ? sb(e, q2) : "dangerouslySetInnerHTML" === m2 ? nb(e, q2) : "children" === m2 ? ob(e, q2) : ta(e, m2, q2, l2);
            }
            switch (h) {
              case "input":
                bb(e, f2);
                break;
              case "textarea":
                ib(e, f2);
                break;
              case "select":
                var r2 = e._wrapperState.wasMultiple;
                e._wrapperState.wasMultiple = !!f2.multiple;
                var y2 = f2.value;
                null != y2 ? fb(e, !!f2.multiple, y2, false) : r2 !== !!f2.multiple && (null != f2.defaultValue ? fb(
                  e,
                  !!f2.multiple,
                  f2.defaultValue,
                  true
                ) : fb(e, !!f2.multiple, f2.multiple ? [] : "", false));
            }
            e[Pf] = f2;
          } catch (t2) {
            W$1(a, a.return, t2);
          }
      }
      break;
    case 6:
      dk(b, a);
      fk(a);
      if (d & 4) {
        if (null === a.stateNode)
          throw Error(p(162));
        e = a.stateNode;
        f2 = a.memoizedProps;
        try {
          e.nodeValue = f2;
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      }
      break;
    case 3:
      dk(b, a);
      fk(a);
      if (d & 4 && null !== c && c.memoizedState.isDehydrated)
        try {
          bd(b.containerInfo);
        } catch (t2) {
          W$1(a, a.return, t2);
        }
      break;
    case 4:
      dk(b, a);
      fk(a);
      break;
    case 13:
      dk(b, a);
      fk(a);
      e = a.child;
      e.flags & 8192 && (f2 = null !== e.memoizedState, e.stateNode.isHidden = f2, !f2 || null !== e.alternate && null !== e.alternate.memoizedState || (gk = B$1()));
      d & 4 && bk(a);
      break;
    case 22:
      m2 = null !== c && null !== c.memoizedState;
      a.mode & 1 ? (U$1 = (l2 = U$1) || m2, dk(b, a), U$1 = l2) : dk(b, a);
      fk(a);
      if (d & 8192) {
        l2 = null !== a.memoizedState;
        if ((a.stateNode.isHidden = l2) && !m2 && 0 !== (a.mode & 1))
          for (V$1 = a, m2 = a.child; null !== m2; ) {
            for (q2 = V$1 = m2; null !== V$1; ) {
              r2 = V$1;
              y2 = r2.child;
              switch (r2.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Qj(4, r2, r2.return);
                  break;
                case 1:
                  Mj(r2, r2.return);
                  var n2 = r2.stateNode;
                  if ("function" === typeof n2.componentWillUnmount) {
                    d = r2;
                    c = r2.return;
                    try {
                      b = d, n2.props = b.memoizedProps, n2.state = b.memoizedState, n2.componentWillUnmount();
                    } catch (t2) {
                      W$1(d, c, t2);
                    }
                  }
                  break;
                case 5:
                  Mj(r2, r2.return);
                  break;
                case 22:
                  if (null !== r2.memoizedState) {
                    hk(q2);
                    continue;
                  }
              }
              null !== y2 ? (y2.return = r2, V$1 = y2) : hk(q2);
            }
            m2 = m2.sibling;
          }
        a:
          for (m2 = null, q2 = a; ; ) {
            if (5 === q2.tag) {
              if (null === m2) {
                m2 = q2;
                try {
                  e = q2.stateNode, l2 ? (f2 = e.style, "function" === typeof f2.setProperty ? f2.setProperty("display", "none", "important") : f2.display = "none") : (h = q2.stateNode, k2 = q2.memoizedProps.style, g2 = void 0 !== k2 && null !== k2 && k2.hasOwnProperty("display") ? k2.display : null, h.style.display = rb("display", g2));
                } catch (t2) {
                  W$1(a, a.return, t2);
                }
              }
            } else if (6 === q2.tag) {
              if (null === m2)
                try {
                  q2.stateNode.nodeValue = l2 ? "" : q2.memoizedProps;
                } catch (t2) {
                  W$1(a, a.return, t2);
                }
            } else if ((22 !== q2.tag && 23 !== q2.tag || null === q2.memoizedState || q2 === a) && null !== q2.child) {
              q2.child.return = q2;
              q2 = q2.child;
              continue;
            }
            if (q2 === a)
              break a;
            for (; null === q2.sibling; ) {
              if (null === q2.return || q2.return === a)
                break a;
              m2 === q2 && (m2 = null);
              q2 = q2.return;
            }
            m2 === q2 && (m2 = null);
            q2.sibling.return = q2.return;
            q2 = q2.sibling;
          }
      }
      break;
    case 19:
      dk(b, a);
      fk(a);
      d & 4 && bk(a);
      break;
    case 21:
      break;
    default:
      dk(
        b,
        a
      ), fk(a);
  }
}
function fk(a) {
  var b = a.flags;
  if (b & 2) {
    try {
      a: {
        for (var c = a.return; null !== c; ) {
          if (Uj(c)) {
            var d = c;
            break a;
          }
          c = c.return;
        }
        throw Error(p(160));
      }
      switch (d.tag) {
        case 5:
          var e = d.stateNode;
          d.flags & 32 && (ob(e, ""), d.flags &= -33);
          var f2 = Vj(a);
          Xj(a, f2, e);
          break;
        case 3:
        case 4:
          var g2 = d.stateNode.containerInfo, h = Vj(a);
          Wj(a, h, g2);
          break;
        default:
          throw Error(p(161));
      }
    } catch (k2) {
      W$1(a, a.return, k2);
    }
    a.flags &= -3;
  }
  b & 4096 && (a.flags &= -4097);
}
function ik(a, b, c) {
  V$1 = a;
  jk(a);
}
function jk(a, b, c) {
  for (var d = 0 !== (a.mode & 1); null !== V$1; ) {
    var e = V$1, f2 = e.child;
    if (22 === e.tag && d) {
      var g2 = null !== e.memoizedState || Kj;
      if (!g2) {
        var h = e.alternate, k2 = null !== h && null !== h.memoizedState || U$1;
        h = Kj;
        var l2 = U$1;
        Kj = g2;
        if ((U$1 = k2) && !l2)
          for (V$1 = e; null !== V$1; )
            g2 = V$1, k2 = g2.child, 22 === g2.tag && null !== g2.memoizedState ? kk(e) : null !== k2 ? (k2.return = g2, V$1 = k2) : kk(e);
        for (; null !== f2; )
          V$1 = f2, jk(f2), f2 = f2.sibling;
        V$1 = e;
        Kj = h;
        U$1 = l2;
      }
      lk(a);
    } else
      0 !== (e.subtreeFlags & 8772) && null !== f2 ? (f2.return = e, V$1 = f2) : lk(a);
  }
}
function lk(a) {
  for (; null !== V$1; ) {
    var b = V$1;
    if (0 !== (b.flags & 8772)) {
      var c = b.alternate;
      try {
        if (0 !== (b.flags & 8772))
          switch (b.tag) {
            case 0:
            case 11:
            case 15:
              U$1 || Rj(5, b);
              break;
            case 1:
              var d = b.stateNode;
              if (b.flags & 4 && !U$1)
                if (null === c)
                  d.componentDidMount();
                else {
                  var e = b.elementType === b.type ? c.memoizedProps : Lg(b.type, c.memoizedProps);
                  d.componentDidUpdate(e, c.memoizedState, d.__reactInternalSnapshotBeforeUpdate);
                }
              var f2 = b.updateQueue;
              null !== f2 && ih(b, f2, d);
              break;
            case 3:
              var g2 = b.updateQueue;
              if (null !== g2) {
                c = null;
                if (null !== b.child)
                  switch (b.child.tag) {
                    case 5:
                      c = b.child.stateNode;
                      break;
                    case 1:
                      c = b.child.stateNode;
                  }
                ih(b, g2, c);
              }
              break;
            case 5:
              var h = b.stateNode;
              if (null === c && b.flags & 4) {
                c = h;
                var k2 = b.memoizedProps;
                switch (b.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    k2.autoFocus && c.focus();
                    break;
                  case "img":
                    k2.src && (c.src = k2.src);
                }
              }
              break;
            case 6:
              break;
            case 4:
              break;
            case 12:
              break;
            case 13:
              if (null === b.memoizedState) {
                var l2 = b.alternate;
                if (null !== l2) {
                  var m2 = l2.memoizedState;
                  if (null !== m2) {
                    var q2 = m2.dehydrated;
                    null !== q2 && bd(q2);
                  }
                }
              }
              break;
            case 19:
            case 17:
            case 21:
            case 22:
            case 23:
            case 25:
              break;
            default:
              throw Error(p(163));
          }
        U$1 || b.flags & 512 && Sj(b);
      } catch (r2) {
        W$1(b, b.return, r2);
      }
    }
    if (b === a) {
      V$1 = null;
      break;
    }
    c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V$1 = c;
      break;
    }
    V$1 = b.return;
  }
}
function hk(a) {
  for (; null !== V$1; ) {
    var b = V$1;
    if (b === a) {
      V$1 = null;
      break;
    }
    var c = b.sibling;
    if (null !== c) {
      c.return = b.return;
      V$1 = c;
      break;
    }
    V$1 = b.return;
  }
}
function kk(a) {
  for (; null !== V$1; ) {
    var b = V$1;
    try {
      switch (b.tag) {
        case 0:
        case 11:
        case 15:
          var c = b.return;
          try {
            Rj(4, b);
          } catch (k2) {
            W$1(b, c, k2);
          }
          break;
        case 1:
          var d = b.stateNode;
          if ("function" === typeof d.componentDidMount) {
            var e = b.return;
            try {
              d.componentDidMount();
            } catch (k2) {
              W$1(b, e, k2);
            }
          }
          var f2 = b.return;
          try {
            Sj(b);
          } catch (k2) {
            W$1(b, f2, k2);
          }
          break;
        case 5:
          var g2 = b.return;
          try {
            Sj(b);
          } catch (k2) {
            W$1(b, g2, k2);
          }
      }
    } catch (k2) {
      W$1(b, b.return, k2);
    }
    if (b === a) {
      V$1 = null;
      break;
    }
    var h = b.sibling;
    if (null !== h) {
      h.return = b.return;
      V$1 = h;
      break;
    }
    V$1 = b.return;
  }
}
var mk = Math.ceil, nk = ua.ReactCurrentDispatcher, ok = ua.ReactCurrentOwner, pk = ua.ReactCurrentBatchConfig, K$1 = 0, R$1 = null, Y$1 = null, Z$1 = 0, gj = 0, fj = Uf(0), T$1 = 0, qk = null, hh = 0, rk = 0, sk = 0, tk = null, uk = null, gk = 0, Hj = Infinity, vk = null, Pi = false, Qi = null, Si = null, wk = false, xk = null, yk = 0, zk = 0, Ak = null, Bk = -1, Ck = 0;
function L$1() {
  return 0 !== (K$1 & 6) ? B$1() : -1 !== Bk ? Bk : Bk = B$1();
}
function lh(a) {
  if (0 === (a.mode & 1))
    return 1;
  if (0 !== (K$1 & 2) && 0 !== Z$1)
    return Z$1 & -Z$1;
  if (null !== Kg.transition)
    return 0 === Ck && (Ck = yc()), Ck;
  a = C$1;
  if (0 !== a)
    return a;
  a = window.event;
  a = void 0 === a ? 16 : jd(a.type);
  return a;
}
function mh(a, b, c, d) {
  if (50 < zk)
    throw zk = 0, Ak = null, Error(p(185));
  Ac(a, c, d);
  if (0 === (K$1 & 2) || a !== R$1)
    a === R$1 && (0 === (K$1 & 2) && (rk |= c), 4 === T$1 && Dk(a, Z$1)), Ek(a, d), 1 === c && 0 === K$1 && 0 === (b.mode & 1) && (Hj = B$1() + 500, fg && jg());
}
function Ek(a, b) {
  var c = a.callbackNode;
  wc(a, b);
  var d = uc(a, a === R$1 ? Z$1 : 0);
  if (0 === d)
    null !== c && bc(c), a.callbackNode = null, a.callbackPriority = 0;
  else if (b = d & -d, a.callbackPriority !== b) {
    null != c && bc(c);
    if (1 === b)
      0 === a.tag ? ig(Fk.bind(null, a)) : hg(Fk.bind(null, a)), Jf(function() {
        0 === (K$1 & 6) && jg();
      }), c = null;
    else {
      switch (Dc(d)) {
        case 1:
          c = fc;
          break;
        case 4:
          c = gc;
          break;
        case 16:
          c = hc;
          break;
        case 536870912:
          c = jc;
          break;
        default:
          c = hc;
      }
      c = Gk(c, Hk.bind(null, a));
    }
    a.callbackPriority = b;
    a.callbackNode = c;
  }
}
function Hk(a, b) {
  Bk = -1;
  Ck = 0;
  if (0 !== (K$1 & 6))
    throw Error(p(327));
  var c = a.callbackNode;
  if (Ik() && a.callbackNode !== c)
    return null;
  var d = uc(a, a === R$1 ? Z$1 : 0);
  if (0 === d)
    return null;
  if (0 !== (d & 30) || 0 !== (d & a.expiredLanes) || b)
    b = Jk(a, d);
  else {
    b = d;
    var e = K$1;
    K$1 |= 2;
    var f2 = Kk();
    if (R$1 !== a || Z$1 !== b)
      vk = null, Hj = B$1() + 500, Lk(a, b);
    do
      try {
        Mk();
        break;
      } catch (h) {
        Nk(a, h);
      }
    while (1);
    Qg();
    nk.current = f2;
    K$1 = e;
    null !== Y$1 ? b = 0 : (R$1 = null, Z$1 = 0, b = T$1);
  }
  if (0 !== b) {
    2 === b && (e = xc(a), 0 !== e && (d = e, b = Ok(a, e)));
    if (1 === b)
      throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B$1()), c;
    if (6 === b)
      Dk(a, d);
    else {
      e = a.current.alternate;
      if (0 === (d & 30) && !Pk(e) && (b = Jk(a, d), 2 === b && (f2 = xc(a), 0 !== f2 && (d = f2, b = Ok(a, f2))), 1 === b))
        throw c = qk, Lk(a, 0), Dk(a, d), Ek(a, B$1()), c;
      a.finishedWork = e;
      a.finishedLanes = d;
      switch (b) {
        case 0:
        case 1:
          throw Error(p(345));
        case 2:
          Qk(a, uk, vk);
          break;
        case 3:
          Dk(a, d);
          if ((d & 130023424) === d && (b = gk + 500 - B$1(), 10 < b)) {
            if (0 !== uc(a, 0))
              break;
            e = a.suspendedLanes;
            if ((e & d) !== d) {
              L$1();
              a.pingedLanes |= a.suspendedLanes & e;
              break;
            }
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), b);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 4:
          Dk(a, d);
          if ((d & 4194240) === d)
            break;
          b = a.eventTimes;
          for (e = -1; 0 < d; ) {
            var g2 = 31 - oc(d);
            f2 = 1 << g2;
            g2 = b[g2];
            g2 > e && (e = g2);
            d &= ~f2;
          }
          d = e;
          d = B$1() - d;
          d = (120 > d ? 120 : 480 > d ? 480 : 1080 > d ? 1080 : 1920 > d ? 1920 : 3e3 > d ? 3e3 : 4320 > d ? 4320 : 1960 * mk(d / 1960)) - d;
          if (10 < d) {
            a.timeoutHandle = Ff(Qk.bind(null, a, uk, vk), d);
            break;
          }
          Qk(a, uk, vk);
          break;
        case 5:
          Qk(a, uk, vk);
          break;
        default:
          throw Error(p(329));
      }
    }
  }
  Ek(a, B$1());
  return a.callbackNode === c ? Hk.bind(null, a) : null;
}
function Ok(a, b) {
  var c = tk;
  a.current.memoizedState.isDehydrated && (Lk(a, b).flags |= 256);
  a = Jk(a, b);
  2 !== a && (b = uk, uk = c, null !== b && Gj(b));
  return a;
}
function Gj(a) {
  null === uk ? uk = a : uk.push.apply(uk, a);
}
function Pk(a) {
  for (var b = a; ; ) {
    if (b.flags & 16384) {
      var c = b.updateQueue;
      if (null !== c && (c = c.stores, null !== c))
        for (var d = 0; d < c.length; d++) {
          var e = c[d], f2 = e.getSnapshot;
          e = e.value;
          try {
            if (!He$1(f2(), e))
              return false;
          } catch (g2) {
            return false;
          }
        }
    }
    c = b.child;
    if (b.subtreeFlags & 16384 && null !== c)
      c.return = b, b = c;
    else {
      if (b === a)
        break;
      for (; null === b.sibling; ) {
        if (null === b.return || b.return === a)
          return true;
        b = b.return;
      }
      b.sibling.return = b.return;
      b = b.sibling;
    }
  }
  return true;
}
function Dk(a, b) {
  b &= ~sk;
  b &= ~rk;
  a.suspendedLanes |= b;
  a.pingedLanes &= ~b;
  for (a = a.expirationTimes; 0 < b; ) {
    var c = 31 - oc(b), d = 1 << c;
    a[c] = -1;
    b &= ~d;
  }
}
function Fk(a) {
  if (0 !== (K$1 & 6))
    throw Error(p(327));
  Ik();
  var b = uc(a, 0);
  if (0 === (b & 1))
    return Ek(a, B$1()), null;
  var c = Jk(a, b);
  if (0 !== a.tag && 2 === c) {
    var d = xc(a);
    0 !== d && (b = d, c = Ok(a, d));
  }
  if (1 === c)
    throw c = qk, Lk(a, 0), Dk(a, b), Ek(a, B$1()), c;
  if (6 === c)
    throw Error(p(345));
  a.finishedWork = a.current.alternate;
  a.finishedLanes = b;
  Qk(a, uk, vk);
  Ek(a, B$1());
  return null;
}
function Rk(a, b) {
  var c = K$1;
  K$1 |= 1;
  try {
    return a(b);
  } finally {
    K$1 = c, 0 === K$1 && (Hj = B$1() + 500, fg && jg());
  }
}
function Sk(a) {
  null !== xk && 0 === xk.tag && 0 === (K$1 & 6) && Ik();
  var b = K$1;
  K$1 |= 1;
  var c = pk.transition, d = C$1;
  try {
    if (pk.transition = null, C$1 = 1, a)
      return a();
  } finally {
    C$1 = d, pk.transition = c, K$1 = b, 0 === (K$1 & 6) && jg();
  }
}
function Ij() {
  gj = fj.current;
  E$1(fj);
}
function Lk(a, b) {
  a.finishedWork = null;
  a.finishedLanes = 0;
  var c = a.timeoutHandle;
  -1 !== c && (a.timeoutHandle = -1, Gf(c));
  if (null !== Y$1)
    for (c = Y$1.return; null !== c; ) {
      var d = c;
      wg(d);
      switch (d.tag) {
        case 1:
          d = d.type.childContextTypes;
          null !== d && void 0 !== d && $f();
          break;
        case 3:
          Jh();
          E$1(Wf);
          E$1(H$1);
          Oh();
          break;
        case 5:
          Lh(d);
          break;
        case 4:
          Jh();
          break;
        case 13:
          E$1(M$1);
          break;
        case 19:
          E$1(M$1);
          break;
        case 10:
          Rg(d.type._context);
          break;
        case 22:
        case 23:
          Ij();
      }
      c = c.return;
    }
  R$1 = a;
  Y$1 = a = wh(a.current, null);
  Z$1 = gj = b;
  T$1 = 0;
  qk = null;
  sk = rk = hh = 0;
  uk = tk = null;
  if (null !== Wg) {
    for (b = 0; b < Wg.length; b++)
      if (c = Wg[b], d = c.interleaved, null !== d) {
        c.interleaved = null;
        var e = d.next, f2 = c.pending;
        if (null !== f2) {
          var g2 = f2.next;
          f2.next = e;
          d.next = g2;
        }
        c.pending = d;
      }
    Wg = null;
  }
  return a;
}
function Nk(a, b) {
  do {
    var c = Y$1;
    try {
      Qg();
      Ph.current = ai;
      if (Sh) {
        for (var d = N$1.memoizedState; null !== d; ) {
          var e = d.queue;
          null !== e && (e.pending = null);
          d = d.next;
        }
        Sh = false;
      }
      Rh = 0;
      P$1 = O$1 = N$1 = null;
      Th = false;
      Uh = 0;
      ok.current = null;
      if (null === c || null === c.return) {
        T$1 = 1;
        qk = b;
        Y$1 = null;
        break;
      }
      a: {
        var f2 = a, g2 = c.return, h = c, k2 = b;
        b = Z$1;
        h.flags |= 32768;
        if (null !== k2 && "object" === typeof k2 && "function" === typeof k2.then) {
          var l2 = k2, m2 = h, q2 = m2.tag;
          if (0 === (m2.mode & 1) && (0 === q2 || 11 === q2 || 15 === q2)) {
            var r2 = m2.alternate;
            r2 ? (m2.updateQueue = r2.updateQueue, m2.memoizedState = r2.memoizedState, m2.lanes = r2.lanes) : (m2.updateQueue = null, m2.memoizedState = null);
          }
          var y2 = Vi(g2);
          if (null !== y2) {
            y2.flags &= -257;
            Wi(y2, g2, h, f2, b);
            y2.mode & 1 && Ti(f2, l2, b);
            b = y2;
            k2 = l2;
            var n2 = b.updateQueue;
            if (null === n2) {
              var t2 = /* @__PURE__ */ new Set();
              t2.add(k2);
              b.updateQueue = t2;
            } else
              n2.add(k2);
            break a;
          } else {
            if (0 === (b & 1)) {
              Ti(f2, l2, b);
              uj();
              break a;
            }
            k2 = Error(p(426));
          }
        } else if (I$1 && h.mode & 1) {
          var J2 = Vi(g2);
          if (null !== J2) {
            0 === (J2.flags & 65536) && (J2.flags |= 256);
            Wi(J2, g2, h, f2, b);
            Jg(Ki(k2, h));
            break a;
          }
        }
        f2 = k2 = Ki(k2, h);
        4 !== T$1 && (T$1 = 2);
        null === tk ? tk = [f2] : tk.push(f2);
        f2 = g2;
        do {
          switch (f2.tag) {
            case 3:
              f2.flags |= 65536;
              b &= -b;
              f2.lanes |= b;
              var x2 = Oi(f2, k2, b);
              fh(f2, x2);
              break a;
            case 1:
              h = k2;
              var w2 = f2.type, u2 = f2.stateNode;
              if (0 === (f2.flags & 128) && ("function" === typeof w2.getDerivedStateFromError || null !== u2 && "function" === typeof u2.componentDidCatch && (null === Si || !Si.has(u2)))) {
                f2.flags |= 65536;
                b &= -b;
                f2.lanes |= b;
                var F2 = Ri(f2, h, b);
                fh(f2, F2);
                break a;
              }
          }
          f2 = f2.return;
        } while (null !== f2);
      }
      Tk(c);
    } catch (na) {
      b = na;
      Y$1 === c && null !== c && (Y$1 = c = c.return);
      continue;
    }
    break;
  } while (1);
}
function Kk() {
  var a = nk.current;
  nk.current = ai;
  return null === a ? ai : a;
}
function uj() {
  if (0 === T$1 || 3 === T$1 || 2 === T$1)
    T$1 = 4;
  null === R$1 || 0 === (hh & 268435455) && 0 === (rk & 268435455) || Dk(R$1, Z$1);
}
function Jk(a, b) {
  var c = K$1;
  K$1 |= 2;
  var d = Kk();
  if (R$1 !== a || Z$1 !== b)
    vk = null, Lk(a, b);
  do
    try {
      Uk();
      break;
    } catch (e) {
      Nk(a, e);
    }
  while (1);
  Qg();
  K$1 = c;
  nk.current = d;
  if (null !== Y$1)
    throw Error(p(261));
  R$1 = null;
  Z$1 = 0;
  return T$1;
}
function Uk() {
  for (; null !== Y$1; )
    Vk(Y$1);
}
function Mk() {
  for (; null !== Y$1 && !cc(); )
    Vk(Y$1);
}
function Vk(a) {
  var b = Wk(a.alternate, a, gj);
  a.memoizedProps = a.pendingProps;
  null === b ? Tk(a) : Y$1 = b;
  ok.current = null;
}
function Tk(a) {
  var b = a;
  do {
    var c = b.alternate;
    a = b.return;
    if (0 === (b.flags & 32768)) {
      if (c = Fj(c, b, gj), null !== c) {
        Y$1 = c;
        return;
      }
    } else {
      c = Jj(c, b);
      if (null !== c) {
        c.flags &= 32767;
        Y$1 = c;
        return;
      }
      if (null !== a)
        a.flags |= 32768, a.subtreeFlags = 0, a.deletions = null;
      else {
        T$1 = 6;
        Y$1 = null;
        return;
      }
    }
    b = b.sibling;
    if (null !== b) {
      Y$1 = b;
      return;
    }
    Y$1 = b = a;
  } while (null !== b);
  0 === T$1 && (T$1 = 5);
}
function Qk(a, b, c) {
  var d = C$1, e = pk.transition;
  try {
    pk.transition = null, C$1 = 1, Xk(a, b, c, d);
  } finally {
    pk.transition = e, C$1 = d;
  }
  return null;
}
function Xk(a, b, c, d) {
  do
    Ik();
  while (null !== xk);
  if (0 !== (K$1 & 6))
    throw Error(p(327));
  c = a.finishedWork;
  var e = a.finishedLanes;
  if (null === c)
    return null;
  a.finishedWork = null;
  a.finishedLanes = 0;
  if (c === a.current)
    throw Error(p(177));
  a.callbackNode = null;
  a.callbackPriority = 0;
  var f2 = c.lanes | c.childLanes;
  Bc(a, f2);
  a === R$1 && (Y$1 = R$1 = null, Z$1 = 0);
  0 === (c.subtreeFlags & 2064) && 0 === (c.flags & 2064) || wk || (wk = true, Gk(hc, function() {
    Ik();
    return null;
  }));
  f2 = 0 !== (c.flags & 15990);
  if (0 !== (c.subtreeFlags & 15990) || f2) {
    f2 = pk.transition;
    pk.transition = null;
    var g2 = C$1;
    C$1 = 1;
    var h = K$1;
    K$1 |= 4;
    ok.current = null;
    Pj(a, c);
    ek(c, a);
    Oe$1(Df);
    dd = !!Cf;
    Df = Cf = null;
    a.current = c;
    ik(c);
    dc();
    K$1 = h;
    C$1 = g2;
    pk.transition = f2;
  } else
    a.current = c;
  wk && (wk = false, xk = a, yk = e);
  f2 = a.pendingLanes;
  0 === f2 && (Si = null);
  mc(c.stateNode);
  Ek(a, B$1());
  if (null !== b)
    for (d = a.onRecoverableError, c = 0; c < b.length; c++)
      e = b[c], d(e.value, { componentStack: e.stack, digest: e.digest });
  if (Pi)
    throw Pi = false, a = Qi, Qi = null, a;
  0 !== (yk & 1) && 0 !== a.tag && Ik();
  f2 = a.pendingLanes;
  0 !== (f2 & 1) ? a === Ak ? zk++ : (zk = 0, Ak = a) : zk = 0;
  jg();
  return null;
}
function Ik() {
  if (null !== xk) {
    var a = Dc(yk), b = pk.transition, c = C$1;
    try {
      pk.transition = null;
      C$1 = 16 > a ? 16 : a;
      if (null === xk)
        var d = false;
      else {
        a = xk;
        xk = null;
        yk = 0;
        if (0 !== (K$1 & 6))
          throw Error(p(331));
        var e = K$1;
        K$1 |= 4;
        for (V$1 = a.current; null !== V$1; ) {
          var f2 = V$1, g2 = f2.child;
          if (0 !== (V$1.flags & 16)) {
            var h = f2.deletions;
            if (null !== h) {
              for (var k2 = 0; k2 < h.length; k2++) {
                var l2 = h[k2];
                for (V$1 = l2; null !== V$1; ) {
                  var m2 = V$1;
                  switch (m2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(8, m2, f2);
                  }
                  var q2 = m2.child;
                  if (null !== q2)
                    q2.return = m2, V$1 = q2;
                  else
                    for (; null !== V$1; ) {
                      m2 = V$1;
                      var r2 = m2.sibling, y2 = m2.return;
                      Tj(m2);
                      if (m2 === l2) {
                        V$1 = null;
                        break;
                      }
                      if (null !== r2) {
                        r2.return = y2;
                        V$1 = r2;
                        break;
                      }
                      V$1 = y2;
                    }
                }
              }
              var n2 = f2.alternate;
              if (null !== n2) {
                var t2 = n2.child;
                if (null !== t2) {
                  n2.child = null;
                  do {
                    var J2 = t2.sibling;
                    t2.sibling = null;
                    t2 = J2;
                  } while (null !== t2);
                }
              }
              V$1 = f2;
            }
          }
          if (0 !== (f2.subtreeFlags & 2064) && null !== g2)
            g2.return = f2, V$1 = g2;
          else
            b:
              for (; null !== V$1; ) {
                f2 = V$1;
                if (0 !== (f2.flags & 2048))
                  switch (f2.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Qj(9, f2, f2.return);
                  }
                var x2 = f2.sibling;
                if (null !== x2) {
                  x2.return = f2.return;
                  V$1 = x2;
                  break b;
                }
                V$1 = f2.return;
              }
        }
        var w2 = a.current;
        for (V$1 = w2; null !== V$1; ) {
          g2 = V$1;
          var u2 = g2.child;
          if (0 !== (g2.subtreeFlags & 2064) && null !== u2)
            u2.return = g2, V$1 = u2;
          else
            b:
              for (g2 = w2; null !== V$1; ) {
                h = V$1;
                if (0 !== (h.flags & 2048))
                  try {
                    switch (h.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Rj(9, h);
                    }
                  } catch (na) {
                    W$1(h, h.return, na);
                  }
                if (h === g2) {
                  V$1 = null;
                  break b;
                }
                var F2 = h.sibling;
                if (null !== F2) {
                  F2.return = h.return;
                  V$1 = F2;
                  break b;
                }
                V$1 = h.return;
              }
        }
        K$1 = e;
        jg();
        if (lc && "function" === typeof lc.onPostCommitFiberRoot)
          try {
            lc.onPostCommitFiberRoot(kc, a);
          } catch (na) {
          }
        d = true;
      }
      return d;
    } finally {
      C$1 = c, pk.transition = b;
    }
  }
  return false;
}
function Yk(a, b, c) {
  b = Ki(c, b);
  b = Oi(a, b, 1);
  a = dh(a, b, 1);
  b = L$1();
  null !== a && (Ac(a, 1, b), Ek(a, b));
}
function W$1(a, b, c) {
  if (3 === a.tag)
    Yk(a, a, c);
  else
    for (; null !== b; ) {
      if (3 === b.tag) {
        Yk(b, a, c);
        break;
      } else if (1 === b.tag) {
        var d = b.stateNode;
        if ("function" === typeof b.type.getDerivedStateFromError || "function" === typeof d.componentDidCatch && (null === Si || !Si.has(d))) {
          a = Ki(c, a);
          a = Ri(b, a, 1);
          b = dh(b, a, 1);
          a = L$1();
          null !== b && (Ac(b, 1, a), Ek(b, a));
          break;
        }
      }
      b = b.return;
    }
}
function Ui(a, b, c) {
  var d = a.pingCache;
  null !== d && d.delete(b);
  b = L$1();
  a.pingedLanes |= a.suspendedLanes & c;
  R$1 === a && (Z$1 & c) === c && (4 === T$1 || 3 === T$1 && (Z$1 & 130023424) === Z$1 && 500 > B$1() - gk ? Lk(a, 0) : sk |= c);
  Ek(a, b);
}
function Zk(a, b) {
  0 === b && (0 === (a.mode & 1) ? b = 1 : (b = sc, sc <<= 1, 0 === (sc & 130023424) && (sc = 4194304)));
  var c = L$1();
  a = Zg(a, b);
  null !== a && (Ac(a, b, c), Ek(a, c));
}
function vj(a) {
  var b = a.memoizedState, c = 0;
  null !== b && (c = b.retryLane);
  Zk(a, c);
}
function ck(a, b) {
  var c = 0;
  switch (a.tag) {
    case 13:
      var d = a.stateNode;
      var e = a.memoizedState;
      null !== e && (c = e.retryLane);
      break;
    case 19:
      d = a.stateNode;
      break;
    default:
      throw Error(p(314));
  }
  null !== d && d.delete(b);
  Zk(a, c);
}
var Wk;
Wk = function(a, b, c) {
  if (null !== a)
    if (a.memoizedProps !== b.pendingProps || Wf.current)
      Ug = true;
    else {
      if (0 === (a.lanes & c) && 0 === (b.flags & 128))
        return Ug = false, zj(a, b, c);
      Ug = 0 !== (a.flags & 131072) ? true : false;
    }
  else
    Ug = false, I$1 && 0 !== (b.flags & 1048576) && ug(b, ng, b.index);
  b.lanes = 0;
  switch (b.tag) {
    case 2:
      var d = b.type;
      jj(a, b);
      a = b.pendingProps;
      var e = Yf(b, H$1.current);
      Tg(b, c);
      e = Xh(null, b, d, a, e, c);
      var f2 = bi();
      b.flags |= 1;
      "object" === typeof e && null !== e && "function" === typeof e.render && void 0 === e.$$typeof ? (b.tag = 1, b.memoizedState = null, b.updateQueue = null, Zf(d) ? (f2 = true, cg(b)) : f2 = false, b.memoizedState = null !== e.state && void 0 !== e.state ? e.state : null, ah(b), e.updater = nh, b.stateNode = e, e._reactInternals = b, rh(b, d, a, c), b = kj(null, b, d, true, f2, c)) : (b.tag = 0, I$1 && f2 && vg(b), Yi(null, b, e, c), b = b.child);
      return b;
    case 16:
      d = b.elementType;
      a: {
        jj(a, b);
        a = b.pendingProps;
        e = d._init;
        d = e(d._payload);
        b.type = d;
        e = b.tag = $k(d);
        a = Lg(d, a);
        switch (e) {
          case 0:
            b = dj(null, b, d, a, c);
            break a;
          case 1:
            b = ij(null, b, d, a, c);
            break a;
          case 11:
            b = Zi(null, b, d, a, c);
            break a;
          case 14:
            b = aj(null, b, d, Lg(d.type, a), c);
            break a;
        }
        throw Error(p(
          306,
          d,
          ""
        ));
      }
      return b;
    case 0:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), dj(a, b, d, e, c);
    case 1:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), ij(a, b, d, e, c);
    case 3:
      a: {
        lj(b);
        if (null === a)
          throw Error(p(387));
        d = b.pendingProps;
        f2 = b.memoizedState;
        e = f2.element;
        bh(a, b);
        gh(b, d, null, c);
        var g2 = b.memoizedState;
        d = g2.element;
        if (f2.isDehydrated)
          if (f2 = { element: d, isDehydrated: false, cache: g2.cache, pendingSuspenseBoundaries: g2.pendingSuspenseBoundaries, transitions: g2.transitions }, b.updateQueue.baseState = f2, b.memoizedState = f2, b.flags & 256) {
            e = Ki(Error(p(423)), b);
            b = mj(a, b, d, c, e);
            break a;
          } else if (d !== e) {
            e = Ki(Error(p(424)), b);
            b = mj(a, b, d, c, e);
            break a;
          } else
            for (yg = Lf(b.stateNode.containerInfo.firstChild), xg = b, I$1 = true, zg = null, c = Ch(b, null, d, c), b.child = c; c; )
              c.flags = c.flags & -3 | 4096, c = c.sibling;
        else {
          Ig();
          if (d === e) {
            b = $i(a, b, c);
            break a;
          }
          Yi(a, b, d, c);
        }
        b = b.child;
      }
      return b;
    case 5:
      return Kh(b), null === a && Eg(b), d = b.type, e = b.pendingProps, f2 = null !== a ? a.memoizedProps : null, g2 = e.children, Ef(d, e) ? g2 = null : null !== f2 && Ef(d, f2) && (b.flags |= 32), hj(a, b), Yi(a, b, g2, c), b.child;
    case 6:
      return null === a && Eg(b), null;
    case 13:
      return pj(a, b, c);
    case 4:
      return Ih(b, b.stateNode.containerInfo), d = b.pendingProps, null === a ? b.child = Bh(b, null, d, c) : Yi(a, b, d, c), b.child;
    case 11:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), Zi(a, b, d, e, c);
    case 7:
      return Yi(a, b, b.pendingProps, c), b.child;
    case 8:
      return Yi(a, b, b.pendingProps.children, c), b.child;
    case 12:
      return Yi(a, b, b.pendingProps.children, c), b.child;
    case 10:
      a: {
        d = b.type._context;
        e = b.pendingProps;
        f2 = b.memoizedProps;
        g2 = e.value;
        G$1(Mg, d._currentValue);
        d._currentValue = g2;
        if (null !== f2)
          if (He$1(f2.value, g2)) {
            if (f2.children === e.children && !Wf.current) {
              b = $i(a, b, c);
              break a;
            }
          } else
            for (f2 = b.child, null !== f2 && (f2.return = b); null !== f2; ) {
              var h = f2.dependencies;
              if (null !== h) {
                g2 = f2.child;
                for (var k2 = h.firstContext; null !== k2; ) {
                  if (k2.context === d) {
                    if (1 === f2.tag) {
                      k2 = ch(-1, c & -c);
                      k2.tag = 2;
                      var l2 = f2.updateQueue;
                      if (null !== l2) {
                        l2 = l2.shared;
                        var m2 = l2.pending;
                        null === m2 ? k2.next = k2 : (k2.next = m2.next, m2.next = k2);
                        l2.pending = k2;
                      }
                    }
                    f2.lanes |= c;
                    k2 = f2.alternate;
                    null !== k2 && (k2.lanes |= c);
                    Sg(
                      f2.return,
                      c,
                      b
                    );
                    h.lanes |= c;
                    break;
                  }
                  k2 = k2.next;
                }
              } else if (10 === f2.tag)
                g2 = f2.type === b.type ? null : f2.child;
              else if (18 === f2.tag) {
                g2 = f2.return;
                if (null === g2)
                  throw Error(p(341));
                g2.lanes |= c;
                h = g2.alternate;
                null !== h && (h.lanes |= c);
                Sg(g2, c, b);
                g2 = f2.sibling;
              } else
                g2 = f2.child;
              if (null !== g2)
                g2.return = f2;
              else
                for (g2 = f2; null !== g2; ) {
                  if (g2 === b) {
                    g2 = null;
                    break;
                  }
                  f2 = g2.sibling;
                  if (null !== f2) {
                    f2.return = g2.return;
                    g2 = f2;
                    break;
                  }
                  g2 = g2.return;
                }
              f2 = g2;
            }
        Yi(a, b, e.children, c);
        b = b.child;
      }
      return b;
    case 9:
      return e = b.type, d = b.pendingProps.children, Tg(b, c), e = Vg(e), d = d(e), b.flags |= 1, Yi(a, b, d, c), b.child;
    case 14:
      return d = b.type, e = Lg(d, b.pendingProps), e = Lg(d.type, e), aj(a, b, d, e, c);
    case 15:
      return cj(a, b, b.type, b.pendingProps, c);
    case 17:
      return d = b.type, e = b.pendingProps, e = b.elementType === d ? e : Lg(d, e), jj(a, b), b.tag = 1, Zf(d) ? (a = true, cg(b)) : a = false, Tg(b, c), ph(b, d, e), rh(b, d, e, c), kj(null, b, d, true, a, c);
    case 19:
      return yj(a, b, c);
    case 22:
      return ej(a, b, c);
  }
  throw Error(p(156, b.tag));
};
function Gk(a, b) {
  return ac(a, b);
}
function al(a, b, c, d) {
  this.tag = a;
  this.key = c;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.ref = null;
  this.pendingProps = b;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = d;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function Bg(a, b, c, d) {
  return new al(a, b, c, d);
}
function bj(a) {
  a = a.prototype;
  return !(!a || !a.isReactComponent);
}
function $k(a) {
  if ("function" === typeof a)
    return bj(a) ? 1 : 0;
  if (void 0 !== a && null !== a) {
    a = a.$$typeof;
    if (a === Da)
      return 11;
    if (a === Ga)
      return 14;
  }
  return 2;
}
function wh(a, b) {
  var c = a.alternate;
  null === c ? (c = Bg(a.tag, b, a.key, a.mode), c.elementType = a.elementType, c.type = a.type, c.stateNode = a.stateNode, c.alternate = a, a.alternate = c) : (c.pendingProps = b, c.type = a.type, c.flags = 0, c.subtreeFlags = 0, c.deletions = null);
  c.flags = a.flags & 14680064;
  c.childLanes = a.childLanes;
  c.lanes = a.lanes;
  c.child = a.child;
  c.memoizedProps = a.memoizedProps;
  c.memoizedState = a.memoizedState;
  c.updateQueue = a.updateQueue;
  b = a.dependencies;
  c.dependencies = null === b ? null : { lanes: b.lanes, firstContext: b.firstContext };
  c.sibling = a.sibling;
  c.index = a.index;
  c.ref = a.ref;
  return c;
}
function yh(a, b, c, d, e, f2) {
  var g2 = 2;
  d = a;
  if ("function" === typeof a)
    bj(a) && (g2 = 1);
  else if ("string" === typeof a)
    g2 = 5;
  else
    a:
      switch (a) {
        case ya:
          return Ah(c.children, e, f2, b);
        case za:
          g2 = 8;
          e |= 8;
          break;
        case Aa:
          return a = Bg(12, c, b, e | 2), a.elementType = Aa, a.lanes = f2, a;
        case Ea:
          return a = Bg(13, c, b, e), a.elementType = Ea, a.lanes = f2, a;
        case Fa:
          return a = Bg(19, c, b, e), a.elementType = Fa, a.lanes = f2, a;
        case Ia:
          return qj(c, e, f2, b);
        default:
          if ("object" === typeof a && null !== a)
            switch (a.$$typeof) {
              case Ba:
                g2 = 10;
                break a;
              case Ca:
                g2 = 9;
                break a;
              case Da:
                g2 = 11;
                break a;
              case Ga:
                g2 = 14;
                break a;
              case Ha:
                g2 = 16;
                d = null;
                break a;
            }
          throw Error(p(130, null == a ? a : typeof a, ""));
      }
  b = Bg(g2, c, b, e);
  b.elementType = a;
  b.type = d;
  b.lanes = f2;
  return b;
}
function Ah(a, b, c, d) {
  a = Bg(7, a, d, b);
  a.lanes = c;
  return a;
}
function qj(a, b, c, d) {
  a = Bg(22, a, d, b);
  a.elementType = Ia;
  a.lanes = c;
  a.stateNode = { isHidden: false };
  return a;
}
function xh(a, b, c) {
  a = Bg(6, a, null, b);
  a.lanes = c;
  return a;
}
function zh(a, b, c) {
  b = Bg(4, null !== a.children ? a.children : [], a.key, b);
  b.lanes = c;
  b.stateNode = { containerInfo: a.containerInfo, pendingChildren: null, implementation: a.implementation };
  return b;
}
function bl(a, b, c, d, e) {
  this.tag = b;
  this.containerInfo = a;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.pendingContext = this.context = null;
  this.callbackPriority = 0;
  this.eventTimes = zc(0);
  this.expirationTimes = zc(-1);
  this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = zc(0);
  this.identifierPrefix = d;
  this.onRecoverableError = e;
  this.mutableSourceEagerHydrationData = null;
}
function cl(a, b, c, d, e, f2, g2, h, k2) {
  a = new bl(a, b, c, h, k2);
  1 === b ? (b = 1, true === f2 && (b |= 8)) : b = 0;
  f2 = Bg(3, null, null, b);
  a.current = f2;
  f2.stateNode = a;
  f2.memoizedState = { element: d, isDehydrated: c, cache: null, transitions: null, pendingSuspenseBoundaries: null };
  ah(f2);
  return a;
}
function dl(a, b, c) {
  var d = 3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
  return { $$typeof: wa, key: null == d ? null : "" + d, children: a, containerInfo: b, implementation: c };
}
function el(a) {
  if (!a)
    return Vf;
  a = a._reactInternals;
  a: {
    if (Vb(a) !== a || 1 !== a.tag)
      throw Error(p(170));
    var b = a;
    do {
      switch (b.tag) {
        case 3:
          b = b.stateNode.context;
          break a;
        case 1:
          if (Zf(b.type)) {
            b = b.stateNode.__reactInternalMemoizedMergedChildContext;
            break a;
          }
      }
      b = b.return;
    } while (null !== b);
    throw Error(p(171));
  }
  if (1 === a.tag) {
    var c = a.type;
    if (Zf(c))
      return bg(a, c, b);
  }
  return b;
}
function fl(a, b, c, d, e, f2, g2, h, k2) {
  a = cl(c, d, true, a, e, f2, g2, h, k2);
  a.context = el(null);
  c = a.current;
  d = L$1();
  e = lh(c);
  f2 = ch(d, e);
  f2.callback = void 0 !== b && null !== b ? b : null;
  dh(c, f2, e);
  a.current.lanes = e;
  Ac(a, e, d);
  Ek(a, d);
  return a;
}
function gl(a, b, c, d) {
  var e = b.current, f2 = L$1(), g2 = lh(e);
  c = el(c);
  null === b.context ? b.context = c : b.pendingContext = c;
  b = ch(f2, g2);
  b.payload = { element: a };
  d = void 0 === d ? null : d;
  null !== d && (b.callback = d);
  a = dh(e, b, g2);
  null !== a && (mh(a, e, g2, f2), eh(a, e, g2));
  return g2;
}
function hl(a) {
  a = a.current;
  if (!a.child)
    return null;
  switch (a.child.tag) {
    case 5:
      return a.child.stateNode;
    default:
      return a.child.stateNode;
  }
}
function il(a, b) {
  a = a.memoizedState;
  if (null !== a && null !== a.dehydrated) {
    var c = a.retryLane;
    a.retryLane = 0 !== c && c < b ? c : b;
  }
}
function jl(a, b) {
  il(a, b);
  (a = a.alternate) && il(a, b);
}
function kl() {
  return null;
}
var ll = "function" === typeof reportError ? reportError : function(a) {
  console.error(a);
};
function ml(a) {
  this._internalRoot = a;
}
nl.prototype.render = ml.prototype.render = function(a) {
  var b = this._internalRoot;
  if (null === b)
    throw Error(p(409));
  gl(a, b, null, null);
};
nl.prototype.unmount = ml.prototype.unmount = function() {
  var a = this._internalRoot;
  if (null !== a) {
    this._internalRoot = null;
    var b = a.containerInfo;
    Sk(function() {
      gl(null, a, null, null);
    });
    b[uf] = null;
  }
};
function nl(a) {
  this._internalRoot = a;
}
nl.prototype.unstable_scheduleHydration = function(a) {
  if (a) {
    var b = Hc();
    a = { blockedOn: null, target: a, priority: b };
    for (var c = 0; c < Qc.length && 0 !== b && b < Qc[c].priority; c++)
      ;
    Qc.splice(c, 0, a);
    0 === c && Vc(a);
  }
};
function ol(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType);
}
function pl(a) {
  return !(!a || 1 !== a.nodeType && 9 !== a.nodeType && 11 !== a.nodeType && (8 !== a.nodeType || " react-mount-point-unstable " !== a.nodeValue));
}
function ql() {
}
function rl(a, b, c, d, e) {
  if (e) {
    if ("function" === typeof d) {
      var f2 = d;
      d = function() {
        var a2 = hl(g2);
        f2.call(a2);
      };
    }
    var g2 = fl(b, d, a, 0, null, false, false, "", ql);
    a._reactRootContainer = g2;
    a[uf] = g2.current;
    sf(8 === a.nodeType ? a.parentNode : a);
    Sk();
    return g2;
  }
  for (; e = a.lastChild; )
    a.removeChild(e);
  if ("function" === typeof d) {
    var h = d;
    d = function() {
      var a2 = hl(k2);
      h.call(a2);
    };
  }
  var k2 = cl(a, 0, false, null, null, false, false, "", ql);
  a._reactRootContainer = k2;
  a[uf] = k2.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  Sk(function() {
    gl(b, k2, c, d);
  });
  return k2;
}
function sl(a, b, c, d, e) {
  var f2 = c._reactRootContainer;
  if (f2) {
    var g2 = f2;
    if ("function" === typeof e) {
      var h = e;
      e = function() {
        var a2 = hl(g2);
        h.call(a2);
      };
    }
    gl(b, g2, a, e);
  } else
    g2 = rl(c, b, a, e, d);
  return hl(g2);
}
Ec = function(a) {
  switch (a.tag) {
    case 3:
      var b = a.stateNode;
      if (b.current.memoizedState.isDehydrated) {
        var c = tc(b.pendingLanes);
        0 !== c && (Cc(b, c | 1), Ek(b, B$1()), 0 === (K$1 & 6) && (Hj = B$1() + 500, jg()));
      }
      break;
    case 13:
      Sk(function() {
        var b2 = Zg(a, 1);
        if (null !== b2) {
          var c2 = L$1();
          mh(b2, a, 1, c2);
        }
      }), jl(a, 1);
  }
};
Fc = function(a) {
  if (13 === a.tag) {
    var b = Zg(a, 134217728);
    if (null !== b) {
      var c = L$1();
      mh(b, a, 134217728, c);
    }
    jl(a, 134217728);
  }
};
Gc = function(a) {
  if (13 === a.tag) {
    var b = lh(a), c = Zg(a, b);
    if (null !== c) {
      var d = L$1();
      mh(c, a, b, d);
    }
    jl(a, b);
  }
};
Hc = function() {
  return C$1;
};
Ic = function(a, b) {
  var c = C$1;
  try {
    return C$1 = a, b();
  } finally {
    C$1 = c;
  }
};
yb = function(a, b, c) {
  switch (b) {
    case "input":
      bb(a, c);
      b = c.name;
      if ("radio" === c.type && null != b) {
        for (c = a; c.parentNode; )
          c = c.parentNode;
        c = c.querySelectorAll("input[name=" + JSON.stringify("" + b) + '][type="radio"]');
        for (b = 0; b < c.length; b++) {
          var d = c[b];
          if (d !== a && d.form === a.form) {
            var e = Db(d);
            if (!e)
              throw Error(p(90));
            Wa(d);
            bb(d, e);
          }
        }
      }
      break;
    case "textarea":
      ib(a, c);
      break;
    case "select":
      b = c.value, null != b && fb(a, !!c.multiple, b, false);
  }
};
Gb = Rk;
Hb = Sk;
var tl = { usingClientEntryPoint: false, Events: [Cb, ue$1, Db, Eb, Fb, Rk] }, ul = { findFiberByHostInstance: Wc, bundleType: 0, version: "18.2.0", rendererPackageName: "react-dom" };
var vl = { bundleType: ul.bundleType, version: ul.version, rendererPackageName: ul.rendererPackageName, rendererConfig: ul.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ua.ReactCurrentDispatcher, findHostInstanceByFiber: function(a) {
  a = Zb(a);
  return null === a ? null : a.stateNode;
}, findFiberByHostInstance: ul.findFiberByHostInstance || kl, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.2.0-next-9e3b772b8-20220608" };
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var wl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!wl.isDisabled && wl.supportsFiber)
    try {
      kc = wl.inject(vl), lc = wl;
    } catch (a) {
    }
}
reactDom_production_min.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = tl;
reactDom_production_min.createPortal = function(a, b) {
  var c = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
  if (!ol(b))
    throw Error(p(200));
  return dl(a, b, null, c);
};
reactDom_production_min.createRoot = function(a, b) {
  if (!ol(a))
    throw Error(p(299));
  var c = false, d = "", e = ll;
  null !== b && void 0 !== b && (true === b.unstable_strictMode && (c = true), void 0 !== b.identifierPrefix && (d = b.identifierPrefix), void 0 !== b.onRecoverableError && (e = b.onRecoverableError));
  b = cl(a, 1, false, null, null, c, false, d, e);
  a[uf] = b.current;
  sf(8 === a.nodeType ? a.parentNode : a);
  return new ml(b);
};
reactDom_production_min.findDOMNode = function(a) {
  if (null == a)
    return null;
  if (1 === a.nodeType)
    return a;
  var b = a._reactInternals;
  if (void 0 === b) {
    if ("function" === typeof a.render)
      throw Error(p(188));
    a = Object.keys(a).join(",");
    throw Error(p(268, a));
  }
  a = Zb(b);
  a = null === a ? null : a.stateNode;
  return a;
};
reactDom_production_min.flushSync = function(a) {
  return Sk(a);
};
reactDom_production_min.hydrate = function(a, b, c) {
  if (!pl(b))
    throw Error(p(200));
  return sl(null, a, b, true, c);
};
reactDom_production_min.hydrateRoot = function(a, b, c) {
  if (!ol(a))
    throw Error(p(405));
  var d = null != c && c.hydratedSources || null, e = false, f2 = "", g2 = ll;
  null !== c && void 0 !== c && (true === c.unstable_strictMode && (e = true), void 0 !== c.identifierPrefix && (f2 = c.identifierPrefix), void 0 !== c.onRecoverableError && (g2 = c.onRecoverableError));
  b = fl(b, null, a, 1, null != c ? c : null, e, false, f2, g2);
  a[uf] = b.current;
  sf(a);
  if (d)
    for (a = 0; a < d.length; a++)
      c = d[a], e = c._getVersion, e = e(c._source), null == b.mutableSourceEagerHydrationData ? b.mutableSourceEagerHydrationData = [c, e] : b.mutableSourceEagerHydrationData.push(
        c,
        e
      );
  return new nl(b);
};
reactDom_production_min.render = function(a, b, c) {
  if (!pl(b))
    throw Error(p(200));
  return sl(null, a, b, false, c);
};
reactDom_production_min.unmountComponentAtNode = function(a) {
  if (!pl(a))
    throw Error(p(40));
  return a._reactRootContainer ? (Sk(function() {
    sl(null, null, a, false, function() {
      a._reactRootContainer = null;
      a[uf] = null;
    });
  }), true) : false;
};
reactDom_production_min.unstable_batchedUpdates = Rk;
reactDom_production_min.unstable_renderSubtreeIntoContainer = function(a, b, c, d) {
  if (!pl(c))
    throw Error(p(200));
  if (null == a || void 0 === a._reactInternals)
    throw Error(p(38));
  return sl(a, b, c, false, d);
};
reactDom_production_min.version = "18.2.0-next-9e3b772b8-20220608";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  reactDom.exports = reactDom_production_min;
}
var reactDomExports = reactDom.exports;
var m = reactDomExports;
{
  client.createRoot = m.createRoot;
  client.hydrateRoot = m.hydrateRoot;
}
var __assign = function() {
  __assign = Object.assign || function __assign2(t2) {
    for (var s, i = 1, n2 = arguments.length; i < n2; i++) {
      s = arguments[i];
      for (var p2 in s)
        if (Object.prototype.hasOwnProperty.call(s, p2))
          t2[p2] = s[p2];
    }
    return t2;
  };
  return __assign.apply(this, arguments);
};
function __spreadArray(to, from2, pack) {
  if (pack || arguments.length === 2)
    for (var i = 0, l2 = from2.length, ar; i < l2; i++) {
      if (ar || !(i in from2)) {
        if (!ar)
          ar = Array.prototype.slice.call(from2, 0, i);
        ar[i] = from2[i];
      }
    }
  return to.concat(ar || Array.prototype.slice.call(from2));
}
typeof SuppressedError === "function" ? SuppressedError : function(error, suppressed, message) {
  var e = new Error(message);
  return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};
var MS = "-ms-";
var MOZ = "-moz-";
var WEBKIT = "-webkit-";
var COMMENT = "comm";
var RULESET = "rule";
var DECLARATION = "decl";
var IMPORT = "@import";
var KEYFRAMES = "@keyframes";
var LAYER = "@layer";
var abs = Math.abs;
var from = String.fromCharCode;
var assign = Object.assign;
function hash(value, length2) {
  return charat(value, 0) ^ 45 ? (((length2 << 2 ^ charat(value, 0)) << 2 ^ charat(value, 1)) << 2 ^ charat(value, 2)) << 2 ^ charat(value, 3) : 0;
}
function trim(value) {
  return value.trim();
}
function match(value, pattern) {
  return (value = pattern.exec(value)) ? value[0] : value;
}
function replace(value, pattern, replacement) {
  return value.replace(pattern, replacement);
}
function indexof(value, search) {
  return value.indexOf(search);
}
function charat(value, index) {
  return value.charCodeAt(index) | 0;
}
function substr(value, begin, end) {
  return value.slice(begin, end);
}
function strlen(value) {
  return value.length;
}
function sizeof(value) {
  return value.length;
}
function append(value, array) {
  return array.push(value), value;
}
function combine(array, callback) {
  return array.map(callback).join("");
}
function filter(array, pattern) {
  return array.filter(function(value) {
    return !match(value, pattern);
  });
}
var line = 1;
var column = 1;
var length = 0;
var position = 0;
var character = 0;
var characters = "";
function node(value, root, parent, type, props, children, length2, siblings) {
  return { value, root, parent, type, props, children, line, column, length: length2, return: "", siblings };
}
function copy(root, props) {
  return assign(node("", null, null, "", null, null, 0, root.siblings), root, { length: -root.length }, props);
}
function lift(root) {
  while (root.root)
    root = copy(root.root, { children: [root] });
  append(root, root.siblings);
}
function char() {
  return character;
}
function prev() {
  character = position > 0 ? charat(characters, --position) : 0;
  if (column--, character === 10)
    column = 1, line--;
  return character;
}
function next() {
  character = position < length ? charat(characters, position++) : 0;
  if (column++, character === 10)
    column = 1, line++;
  return character;
}
function peek() {
  return charat(characters, position);
}
function caret() {
  return position;
}
function slice(begin, end) {
  return substr(characters, begin, end);
}
function token(type) {
  switch (type) {
    case 0:
    case 9:
    case 10:
    case 13:
    case 32:
      return 5;
    case 33:
    case 43:
    case 44:
    case 47:
    case 62:
    case 64:
    case 126:
    case 59:
    case 123:
    case 125:
      return 4;
    case 58:
      return 3;
    case 34:
    case 39:
    case 40:
    case 91:
      return 2;
    case 41:
    case 93:
      return 1;
  }
  return 0;
}
function alloc(value) {
  return line = column = 1, length = strlen(characters = value), position = 0, [];
}
function dealloc(value) {
  return characters = "", value;
}
function delimit(type) {
  return trim(slice(position - 1, delimiter(type === 91 ? type + 2 : type === 40 ? type + 1 : type)));
}
function whitespace(type) {
  while (character = peek())
    if (character < 33)
      next();
    else
      break;
  return token(type) > 2 || token(character) > 3 ? "" : " ";
}
function escaping(index, count) {
  while (--count && next())
    if (character < 48 || character > 102 || character > 57 && character < 65 || character > 70 && character < 97)
      break;
  return slice(index, caret() + (count < 6 && peek() == 32 && next() == 32));
}
function delimiter(type) {
  while (next())
    switch (character) {
      case type:
        return position;
      case 34:
      case 39:
        if (type !== 34 && type !== 39)
          delimiter(character);
        break;
      case 40:
        if (type === 41)
          delimiter(type);
        break;
      case 92:
        next();
        break;
    }
  return position;
}
function commenter(type, index) {
  while (next())
    if (type + character === 47 + 10)
      break;
    else if (type + character === 42 + 42 && peek() === 47)
      break;
  return "/*" + slice(index, position - 1) + "*" + from(type === 47 ? type : next());
}
function identifier(index) {
  while (!token(peek()))
    next();
  return slice(index, position);
}
function compile(value) {
  return dealloc(parse("", null, null, null, [""], value = alloc(value), 0, [0], value));
}
function parse(value, root, parent, rule, rules, rulesets, pseudo, points, declarations) {
  var index = 0;
  var offset = 0;
  var length2 = pseudo;
  var atrule = 0;
  var property = 0;
  var previous = 0;
  var variable = 1;
  var scanning = 1;
  var ampersand = 1;
  var character2 = 0;
  var type = "";
  var props = rules;
  var children = rulesets;
  var reference = rule;
  var characters2 = type;
  while (scanning)
    switch (previous = character2, character2 = next()) {
      case 40:
        if (previous != 108 && charat(characters2, length2 - 1) == 58) {
          if (indexof(characters2 += replace(delimit(character2), "&", "&\f"), "&\f") != -1)
            ampersand = -1;
          break;
        }
      case 34:
      case 39:
      case 91:
        characters2 += delimit(character2);
        break;
      case 9:
      case 10:
      case 13:
      case 32:
        characters2 += whitespace(previous);
        break;
      case 92:
        characters2 += escaping(caret() - 1, 7);
        continue;
      case 47:
        switch (peek()) {
          case 42:
          case 47:
            append(comment(commenter(next(), caret()), root, parent, declarations), declarations);
            break;
          default:
            characters2 += "/";
        }
        break;
      case 123 * variable:
        points[index++] = strlen(characters2) * ampersand;
      case 125 * variable:
      case 59:
      case 0:
        switch (character2) {
          case 0:
          case 125:
            scanning = 0;
          case 59 + offset:
            if (ampersand == -1)
              characters2 = replace(characters2, /\f/g, "");
            if (property > 0 && strlen(characters2) - length2)
              append(property > 32 ? declaration(characters2 + ";", rule, parent, length2 - 1, declarations) : declaration(replace(characters2, " ", "") + ";", rule, parent, length2 - 2, declarations), declarations);
            break;
          case 59:
            characters2 += ";";
          default:
            append(reference = ruleset(characters2, root, parent, index, offset, rules, points, type, props = [], children = [], length2, rulesets), rulesets);
            if (character2 === 123)
              if (offset === 0)
                parse(characters2, root, reference, reference, props, rulesets, length2, points, children);
              else
                switch (atrule === 99 && charat(characters2, 3) === 110 ? 100 : atrule) {
                  case 100:
                  case 108:
                  case 109:
                  case 115:
                    parse(value, reference, reference, rule && append(ruleset(value, reference, reference, 0, 0, rules, points, type, rules, props = [], length2, children), children), rules, children, length2, points, rule ? props : children);
                    break;
                  default:
                    parse(characters2, reference, reference, reference, [""], children, 0, points, children);
                }
        }
        index = offset = property = 0, variable = ampersand = 1, type = characters2 = "", length2 = pseudo;
        break;
      case 58:
        length2 = 1 + strlen(characters2), property = previous;
      default:
        if (variable < 1) {
          if (character2 == 123)
            --variable;
          else if (character2 == 125 && variable++ == 0 && prev() == 125)
            continue;
        }
        switch (characters2 += from(character2), character2 * variable) {
          case 38:
            ampersand = offset > 0 ? 1 : (characters2 += "\f", -1);
            break;
          case 44:
            points[index++] = (strlen(characters2) - 1) * ampersand, ampersand = 1;
            break;
          case 64:
            if (peek() === 45)
              characters2 += delimit(next());
            atrule = peek(), offset = length2 = strlen(type = characters2 += identifier(caret())), character2++;
            break;
          case 45:
            if (previous === 45 && strlen(characters2) == 2)
              variable = 0;
        }
    }
  return rulesets;
}
function ruleset(value, root, parent, index, offset, rules, points, type, props, children, length2, siblings) {
  var post = offset - 1;
  var rule = offset === 0 ? rules : [""];
  var size = sizeof(rule);
  for (var i = 0, j2 = 0, k2 = 0; i < index; ++i)
    for (var x2 = 0, y2 = substr(value, post + 1, post = abs(j2 = points[i])), z2 = value; x2 < size; ++x2)
      if (z2 = trim(j2 > 0 ? rule[x2] + " " + y2 : replace(y2, /&\f/g, rule[x2])))
        props[k2++] = z2;
  return node(value, root, parent, offset === 0 ? RULESET : type, props, children, length2, siblings);
}
function comment(value, root, parent, siblings) {
  return node(value, root, parent, COMMENT, from(char()), substr(value, 2, -2), 0, siblings);
}
function declaration(value, root, parent, length2, siblings) {
  return node(value, root, parent, DECLARATION, substr(value, 0, length2), substr(value, length2 + 1, -1), length2, siblings);
}
function prefix(value, length2, children) {
  switch (hash(value, length2)) {
    case 5103:
      return WEBKIT + "print-" + value + value;
    case 5737:
    case 4201:
    case 3177:
    case 3433:
    case 1641:
    case 4457:
    case 2921:
    case 5572:
    case 6356:
    case 5844:
    case 3191:
    case 6645:
    case 3005:
    case 6391:
    case 5879:
    case 5623:
    case 6135:
    case 4599:
    case 4855:
    case 4215:
    case 6389:
    case 5109:
    case 5365:
    case 5621:
    case 3829:
      return WEBKIT + value + value;
    case 4789:
      return MOZ + value + value;
    case 5349:
    case 4246:
    case 4810:
    case 6968:
    case 2756:
      return WEBKIT + value + MOZ + value + MS + value + value;
    case 5936:
      switch (charat(value, length2 + 11)) {
        case 114:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb") + value;
        case 108:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "tb-rl") + value;
        case 45:
          return WEBKIT + value + MS + replace(value, /[svh]\w+-[tblr]{2}/, "lr") + value;
      }
    case 6828:
    case 4268:
    case 2903:
      return WEBKIT + value + MS + value + value;
    case 6165:
      return WEBKIT + value + MS + "flex-" + value + value;
    case 5187:
      return WEBKIT + value + replace(value, /(\w+).+(:[^]+)/, WEBKIT + "box-$1$2" + MS + "flex-$1$2") + value;
    case 5443:
      return WEBKIT + value + MS + "flex-item-" + replace(value, /flex-|-self/g, "") + (!match(value, /flex-|baseline/) ? MS + "grid-row-" + replace(value, /flex-|-self/g, "") : "") + value;
    case 4675:
      return WEBKIT + value + MS + "flex-line-pack" + replace(value, /align-content|flex-|-self/g, "") + value;
    case 5548:
      return WEBKIT + value + MS + replace(value, "shrink", "negative") + value;
    case 5292:
      return WEBKIT + value + MS + replace(value, "basis", "preferred-size") + value;
    case 6060:
      return WEBKIT + "box-" + replace(value, "-grow", "") + WEBKIT + value + MS + replace(value, "grow", "positive") + value;
    case 4554:
      return WEBKIT + replace(value, /([^-])(transform)/g, "$1" + WEBKIT + "$2") + value;
    case 6187:
      return replace(replace(replace(value, /(zoom-|grab)/, WEBKIT + "$1"), /(image-set)/, WEBKIT + "$1"), value, "") + value;
    case 5495:
    case 3959:
      return replace(value, /(image-set\([^]*)/, WEBKIT + "$1$\`$1");
    case 4968:
      return replace(replace(value, /(.+:)(flex-)?(.*)/, WEBKIT + "box-pack:$3" + MS + "flex-pack:$3"), /s.+-b[^;]+/, "justify") + WEBKIT + value + value;
    case 4200:
      if (!match(value, /flex-|baseline/))
        return MS + "grid-column-align" + substr(value, length2) + value;
      break;
    case 2592:
    case 3360:
      return MS + replace(value, "template-", "") + value;
    case 4384:
    case 3616:
      if (children && children.some(function(element, index) {
        return length2 = index, match(element.props, /grid-\w+-end/);
      })) {
        return ~indexof(value + (children = children[length2].value), "span") ? value : MS + replace(value, "-start", "") + value + MS + "grid-row-span:" + (~indexof(children, "span") ? match(children, /\d+/) : +match(children, /\d+/) - +match(value, /\d+/)) + ";";
      }
      return MS + replace(value, "-start", "") + value;
    case 4896:
    case 4128:
      return children && children.some(function(element) {
        return match(element.props, /grid-\w+-start/);
      }) ? value : MS + replace(replace(value, "-end", "-span"), "span ", "") + value;
    case 4095:
    case 3583:
    case 4068:
    case 2532:
      return replace(value, /(.+)-inline(.+)/, WEBKIT + "$1$2") + value;
    case 8116:
    case 7059:
    case 5753:
    case 5535:
    case 5445:
    case 5701:
    case 4933:
    case 4677:
    case 5533:
    case 5789:
    case 5021:
    case 4765:
      if (strlen(value) - 1 - length2 > 6)
        switch (charat(value, length2 + 1)) {
          case 109:
            if (charat(value, length2 + 4) !== 45)
              break;
          case 102:
            return replace(value, /(.+:)(.+)-([^]+)/, "$1" + WEBKIT + "$2-$3$1" + MOZ + (charat(value, length2 + 3) == 108 ? "$3" : "$2-$3")) + value;
          case 115:
            return ~indexof(value, "stretch") ? prefix(replace(value, "stretch", "fill-available"), length2, children) + value : value;
        }
      break;
    case 5152:
    case 5920:
      return replace(value, /(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/, function(_2, a, b, c, d, e, f2) {
        return MS + a + ":" + b + f2 + (c ? MS + a + "-span:" + (d ? e : +e - +b) + f2 : "") + value;
      });
    case 4949:
      if (charat(value, length2 + 6) === 121)
        return replace(value, ":", ":" + WEBKIT) + value;
      break;
    case 6444:
      switch (charat(value, charat(value, 14) === 45 ? 18 : 11)) {
        case 120:
          return replace(value, /(.+:)([^;\s!]+)(;|(\s+)?!.+)?/, "$1" + WEBKIT + (charat(value, 14) === 45 ? "inline-" : "") + "box$3$1" + WEBKIT + "$2$3$1" + MS + "$2box$3") + value;
        case 100:
          return replace(value, ":", ":" + MS) + value;
      }
      break;
    case 5719:
    case 2647:
    case 2135:
    case 3927:
    case 2391:
      return replace(value, "scroll-", "scroll-snap-") + value;
  }
  return value;
}
function serialize(children, callback) {
  var output = "";
  for (var i = 0; i < children.length; i++)
    output += callback(children[i], i, children, callback) || "";
  return output;
}
function stringify(element, index, children, callback) {
  switch (element.type) {
    case LAYER:
      if (element.children.length)
        break;
    case IMPORT:
    case DECLARATION:
      return element.return = element.return || element.value;
    case COMMENT:
      return "";
    case KEYFRAMES:
      return element.return = element.value + "{" + serialize(element.children, callback) + "}";
    case RULESET:
      if (!strlen(element.value = element.props.join(",")))
        return "";
  }
  return strlen(children = serialize(element.children, callback)) ? element.return = element.value + "{" + children + "}" : "";
}
function middleware(collection) {
  var length2 = sizeof(collection);
  return function(element, index, children, callback) {
    var output = "";
    for (var i = 0; i < length2; i++)
      output += collection[i](element, index, children, callback) || "";
    return output;
  };
}
function rulesheet(callback) {
  return function(element) {
    if (!element.root) {
      if (element = element.return)
        callback(element);
    }
  };
}
function prefixer(element, index, children, callback) {
  if (element.length > -1) {
    if (!element.return)
      switch (element.type) {
        case DECLARATION:
          element.return = prefix(element.value, element.length, children);
          return;
        case KEYFRAMES:
          return serialize([copy(element, { value: replace(element.value, "@", "@" + WEBKIT) })], callback);
        case RULESET:
          if (element.length)
            return combine(children = element.props, function(value) {
              switch (match(value, callback = /(::plac\w+|:read-\w+)/)) {
                case ":read-only":
                case ":read-write":
                  lift(copy(element, { props: [replace(value, /:(read-\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
                case "::placeholder":
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + WEBKIT + "input-$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, ":" + MOZ + "$1")] }));
                  lift(copy(element, { props: [replace(value, /:(plac\w+)/, MS + "input-$1")] }));
                  lift(copy(element, { props: [value] }));
                  assign(element, { props: filter(children, callback) });
                  break;
              }
              return "";
            });
      }
  }
}
var unitlessKeys = {
  animationIterationCount: 1,
  aspectRatio: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  msGridRow: 1,
  msGridRowSpan: 1,
  msGridColumn: 1,
  msGridColumnSpan: 1,
  fontWeight: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,
  WebkitLineClamp: 1,
  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
};
var define_process_env_default = {};
var f = "undefined" != typeof process && void 0 !== define_process_env_default && (define_process_env_default.REACT_APP_SC_ATTR || define_process_env_default.SC_ATTR) || "data-styled", y = "undefined" != typeof window && "HTMLElement" in window, v = Boolean("boolean" == typeof SC_DISABLE_SPEEDY ? SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== define_process_env_default && void 0 !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY && "" !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY ? "false" !== define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY && define_process_env_default.REACT_APP_SC_DISABLE_SPEEDY : "undefined" != typeof process && void 0 !== define_process_env_default && void 0 !== define_process_env_default.SC_DISABLE_SPEEDY && "" !== define_process_env_default.SC_DISABLE_SPEEDY ? "false" !== define_process_env_default.SC_DISABLE_SPEEDY && define_process_env_default.SC_DISABLE_SPEEDY : false), g = {}, E = Object.freeze([]), N = Object.freeze({});
function P(e2, t2, n2) {
  return void 0 === n2 && (n2 = N), e2.theme !== n2.theme && e2.theme || t2 || n2.theme;
}
var _ = /* @__PURE__ */ new Set(["a", "abbr", "address", "area", "article", "aside", "audio", "b", "base", "bdi", "bdo", "big", "blockquote", "body", "br", "button", "canvas", "caption", "cite", "code", "col", "colgroup", "data", "datalist", "dd", "del", "details", "dfn", "dialog", "div", "dl", "dt", "em", "embed", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hgroup", "hr", "html", "i", "iframe", "img", "input", "ins", "kbd", "keygen", "label", "legend", "li", "link", "main", "map", "mark", "menu", "menuitem", "meta", "meter", "nav", "noscript", "object", "ol", "optgroup", "option", "output", "p", "param", "picture", "pre", "progress", "q", "rp", "rt", "ruby", "s", "samp", "script", "section", "select", "small", "source", "span", "strong", "style", "sub", "summary", "sup", "table", "tbody", "td", "textarea", "tfoot", "th", "thead", "time", "tr", "track", "u", "ul", "use", "var", "video", "wbr", "circle", "clipPath", "defs", "ellipse", "foreignObject", "g", "image", "line", "linearGradient", "marker", "mask", "path", "pattern", "polygon", "polyline", "radialGradient", "rect", "stop", "svg", "text", "tspan"]), C = /[!"#$%&'()*+,./:;<=>?@[\\\]^\`{|}~-]+/g, I = /(^-|-$)/g;
function A(e2) {
  return e2.replace(C, "-").replace(I, "");
}
var O = /(a)(d)/gi, D = function(e2) {
  return String.fromCharCode(e2 + (e2 > 25 ? 39 : 97));
};
function R(e2) {
  var t2, n2 = "";
  for (t2 = Math.abs(e2); t2 > 52; t2 = t2 / 52 | 0)
    n2 = D(t2 % 52) + n2;
  return (D(t2 % 52) + n2).replace(O, "$1-$2");
}
var T, k = function(e2, t2) {
  for (var n2 = t2.length; n2; )
    e2 = 33 * e2 ^ t2.charCodeAt(--n2);
  return e2;
}, j = function(e2) {
  return k(5381, e2);
};
function x(e2) {
  return R(j(e2) >>> 0);
}
function V(e2) {
  return e2.displayName || e2.name || "Component";
}
function F(e2) {
  return "string" == typeof e2 && true;
}
var M = "function" == typeof Symbol && Symbol.for, $ = M ? Symbol.for("react.memo") : 60115, z = M ? Symbol.for("react.forward_ref") : 60112, B = { childContextTypes: true, contextType: true, contextTypes: true, defaultProps: true, displayName: true, getDefaultProps: true, getDerivedStateFromError: true, getDerivedStateFromProps: true, mixins: true, propTypes: true, type: true }, L = { name: true, length: true, prototype: true, caller: true, callee: true, arguments: true, arity: true }, G = { $$typeof: true, compare: true, defaultProps: true, displayName: true, propTypes: true, type: true }, Y = ((T = {})[z] = { $$typeof: true, render: true, defaultProps: true, displayName: true, propTypes: true }, T[$] = G, T);
function W(e2) {
  return ("type" in (t2 = e2) && t2.type.$$typeof) === $ ? G : "$$typeof" in e2 ? Y[e2.$$typeof] : B;
  var t2;
}
var q = Object.defineProperty, H = Object.getOwnPropertyNames, U = Object.getOwnPropertySymbols, J = Object.getOwnPropertyDescriptor, X = Object.getPrototypeOf, Z = Object.prototype;
function K(e2, t2, n2) {
  if ("string" != typeof t2) {
    if (Z) {
      var o2 = X(t2);
      o2 && o2 !== Z && K(e2, o2, n2);
    }
    var r2 = H(t2);
    U && (r2 = r2.concat(U(t2)));
    for (var s2 = W(e2), i2 = W(t2), a2 = 0; a2 < r2.length; ++a2) {
      var c2 = r2[a2];
      if (!(c2 in L || n2 && n2[c2] || i2 && c2 in i2 || s2 && c2 in s2)) {
        var l2 = J(t2, c2);
        try {
          q(e2, c2, l2);
        } catch (e3) {
        }
      }
    }
  }
  return e2;
}
function Q(e2) {
  return "function" == typeof e2;
}
function ee(e2) {
  return "object" == typeof e2 && "styledComponentId" in e2;
}
function te(e2, t2) {
  return e2 && t2 ? "".concat(e2, " ").concat(t2) : e2 || t2 || "";
}
function ne(e2, t2) {
  if (0 === e2.length)
    return "";
  for (var n2 = e2[0], o2 = 1; o2 < e2.length; o2++)
    n2 += t2 ? t2 + e2[o2] : e2[o2];
  return n2;
}
function oe(e2) {
  return null !== e2 && "object" == typeof e2 && e2.constructor.name === Object.name && !("props" in e2 && e2.$$typeof);
}
function re(e2, t2, n2) {
  if (void 0 === n2 && (n2 = false), !n2 && !oe(e2) && !Array.isArray(e2))
    return t2;
  if (Array.isArray(t2))
    for (var o2 = 0; o2 < t2.length; o2++)
      e2[o2] = re(e2[o2], t2[o2]);
  else if (oe(t2))
    for (var o2 in t2)
      e2[o2] = re(e2[o2], t2[o2]);
  return e2;
}
function se(e2, t2) {
  Object.defineProperty(e2, "toString", { value: t2 });
}
function ce(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++)
    n2[o2 - 1] = arguments[o2];
  return new Error("An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#".concat(t2, " for more information.").concat(n2.length > 0 ? " Args: ".concat(n2.join(", ")) : ""));
}
var le = function() {
  function e2(e3) {
    this.groupSizes = new Uint32Array(512), this.length = 512, this.tag = e3;
  }
  return e2.prototype.indexOfGroup = function(e3) {
    for (var t2 = 0, n2 = 0; n2 < e3; n2++)
      t2 += this.groupSizes[n2];
    return t2;
  }, e2.prototype.insertRules = function(e3, t2) {
    if (e3 >= this.groupSizes.length) {
      for (var n2 = this.groupSizes, o2 = n2.length, r2 = o2; e3 >= r2; )
        if ((r2 <<= 1) < 0)
          throw ce(16, "".concat(e3));
      this.groupSizes = new Uint32Array(r2), this.groupSizes.set(n2), this.length = r2;
      for (var s2 = o2; s2 < r2; s2++)
        this.groupSizes[s2] = 0;
    }
    for (var i2 = this.indexOfGroup(e3 + 1), a2 = (s2 = 0, t2.length); s2 < a2; s2++)
      this.tag.insertRule(i2, t2[s2]) && (this.groupSizes[e3]++, i2++);
  }, e2.prototype.clearGroup = function(e3) {
    if (e3 < this.length) {
      var t2 = this.groupSizes[e3], n2 = this.indexOfGroup(e3), o2 = n2 + t2;
      this.groupSizes[e3] = 0;
      for (var r2 = n2; r2 < o2; r2++)
        this.tag.deleteRule(n2);
    }
  }, e2.prototype.getGroup = function(e3) {
    var t2 = "";
    if (e3 >= this.length || 0 === this.groupSizes[e3])
      return t2;
    for (var n2 = this.groupSizes[e3], o2 = this.indexOfGroup(e3), r2 = o2 + n2, s2 = o2; s2 < r2; s2++)
      t2 += "".concat(this.tag.getRule(s2)).concat("/*!sc*/\n");
    return t2;
  }, e2;
}(), ue = /* @__PURE__ */ new Map(), pe = /* @__PURE__ */ new Map(), de = 1, he = function(e2) {
  if (ue.has(e2))
    return ue.get(e2);
  for (; pe.has(de); )
    de++;
  var t2 = de++;
  return ue.set(e2, t2), pe.set(t2, e2), t2;
}, fe = function(e2, t2) {
  de = t2 + 1, ue.set(e2, t2), pe.set(t2, e2);
}, me = "style[".concat(f, "][").concat("data-styled-version", '="').concat("6.1.1", '"]'), ye = new RegExp("^".concat(f, '\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)')), ve = function(e2, t2, n2) {
  for (var o2, r2 = n2.split(","), s2 = 0, i2 = r2.length; s2 < i2; s2++)
    (o2 = r2[s2]) && e2.registerName(t2, o2);
}, ge = function(e2, t2) {
  for (var n2, o2 = (null !== (n2 = t2.textContent) && void 0 !== n2 ? n2 : "").split("/*!sc*/\n"), r2 = [], s2 = 0, i2 = o2.length; s2 < i2; s2++) {
    var a2 = o2[s2].trim();
    if (a2) {
      var c2 = a2.match(ye);
      if (c2) {
        var l2 = 0 | parseInt(c2[1], 10), u2 = c2[2];
        0 !== l2 && (fe(u2, l2), ve(e2, u2, c2[3]), e2.getTag().insertRules(l2, r2)), r2.length = 0;
      } else
        r2.push(a2);
    }
  }
};
function Se() {
  return "undefined" != typeof __webpack_nonce__ ? __webpack_nonce__ : null;
}
var we = function(e2) {
  var t2 = document.head, n2 = e2 || t2, o2 = document.createElement("style"), r2 = function(e3) {
    var t3 = Array.from(e3.querySelectorAll("style[".concat(f, "]")));
    return t3[t3.length - 1];
  }(n2), s2 = void 0 !== r2 ? r2.nextSibling : null;
  o2.setAttribute(f, "active"), o2.setAttribute("data-styled-version", "6.1.1");
  var i2 = Se();
  return i2 && o2.setAttribute("nonce", i2), n2.insertBefore(o2, s2), o2;
}, be = function() {
  function e2(e3) {
    this.element = we(e3), this.element.appendChild(document.createTextNode("")), this.sheet = function(e4) {
      if (e4.sheet)
        return e4.sheet;
      for (var t2 = document.styleSheets, n2 = 0, o2 = t2.length; n2 < o2; n2++) {
        var r2 = t2[n2];
        if (r2.ownerNode === e4)
          return r2;
      }
      throw ce(17);
    }(this.element), this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    try {
      return this.sheet.insertRule(t2, e3), this.length++, true;
    } catch (e4) {
      return false;
    }
  }, e2.prototype.deleteRule = function(e3) {
    this.sheet.deleteRule(e3), this.length--;
  }, e2.prototype.getRule = function(e3) {
    var t2 = this.sheet.cssRules[e3];
    return t2 && t2.cssText ? t2.cssText : "";
  }, e2;
}(), Ee = function() {
  function e2(e3) {
    this.element = we(e3), this.nodes = this.element.childNodes, this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    if (e3 <= this.length && e3 >= 0) {
      var n2 = document.createTextNode(t2);
      return this.element.insertBefore(n2, this.nodes[e3] || null), this.length++, true;
    }
    return false;
  }, e2.prototype.deleteRule = function(e3) {
    this.element.removeChild(this.nodes[e3]), this.length--;
  }, e2.prototype.getRule = function(e3) {
    return e3 < this.length ? this.nodes[e3].textContent : "";
  }, e2;
}(), Ne = function() {
  function e2(e3) {
    this.rules = [], this.length = 0;
  }
  return e2.prototype.insertRule = function(e3, t2) {
    return e3 <= this.length && (this.rules.splice(e3, 0, t2), this.length++, true);
  }, e2.prototype.deleteRule = function(e3) {
    this.rules.splice(e3, 1), this.length--;
  }, e2.prototype.getRule = function(e3) {
    return e3 < this.length ? this.rules[e3] : "";
  }, e2;
}(), Pe = y, _e = { isServer: !y, useCSSOMInjection: !v }, Ce = function() {
  function e2(e3, n2, o2) {
    void 0 === e3 && (e3 = N), void 0 === n2 && (n2 = {});
    var r2 = this;
    this.options = __assign(__assign({}, _e), e3), this.gs = n2, this.names = new Map(o2), this.server = !!e3.isServer, !this.server && y && Pe && (Pe = false, function(e4) {
      for (var t2 = document.querySelectorAll(me), n3 = 0, o3 = t2.length; n3 < o3; n3++) {
        var r3 = t2[n3];
        r3 && "active" !== r3.getAttribute(f) && (ge(e4, r3), r3.parentNode && r3.parentNode.removeChild(r3));
      }
    }(this)), se(this, function() {
      return function(e4) {
        for (var t2 = e4.getTag(), n3 = t2.length, o3 = "", r3 = function(n4) {
          var r4 = function(e5) {
            return pe.get(e5);
          }(n4);
          if (void 0 === r4)
            return "continue";
          var s3 = e4.names.get(r4), i2 = t2.getGroup(n4);
          if (void 0 === s3 || 0 === i2.length)
            return "continue";
          var a2 = "".concat(f, ".g").concat(n4, '[id="').concat(r4, '"]'), c2 = "";
          void 0 !== s3 && s3.forEach(function(e5) {
            e5.length > 0 && (c2 += "".concat(e5, ","));
          }), o3 += "".concat(i2).concat(a2, '{content:"').concat(c2, '"}').concat("/*!sc*/\n");
        }, s2 = 0; s2 < n3; s2++)
          r3(s2);
        return o3;
      }(r2);
    });
  }
  return e2.registerId = function(e3) {
    return he(e3);
  }, e2.prototype.reconstructWithOptions = function(n2, o2) {
    return void 0 === o2 && (o2 = true), new e2(__assign(__assign({}, this.options), n2), this.gs, o2 && this.names || void 0);
  }, e2.prototype.allocateGSInstance = function(e3) {
    return this.gs[e3] = (this.gs[e3] || 0) + 1;
  }, e2.prototype.getTag = function() {
    return this.tag || (this.tag = (e3 = function(e4) {
      var t2 = e4.useCSSOMInjection, n2 = e4.target;
      return e4.isServer ? new Ne(n2) : t2 ? new be(n2) : new Ee(n2);
    }(this.options), new le(e3)));
    var e3;
  }, e2.prototype.hasNameForId = function(e3, t2) {
    return this.names.has(e3) && this.names.get(e3).has(t2);
  }, e2.prototype.registerName = function(e3, t2) {
    if (he(e3), this.names.has(e3))
      this.names.get(e3).add(t2);
    else {
      var n2 = /* @__PURE__ */ new Set();
      n2.add(t2), this.names.set(e3, n2);
    }
  }, e2.prototype.insertRules = function(e3, t2, n2) {
    this.registerName(e3, t2), this.getTag().insertRules(he(e3), n2);
  }, e2.prototype.clearNames = function(e3) {
    this.names.has(e3) && this.names.get(e3).clear();
  }, e2.prototype.clearRules = function(e3) {
    this.getTag().clearGroup(he(e3)), this.clearNames(e3);
  }, e2.prototype.clearTag = function() {
    this.tag = void 0;
  }, e2;
}(), Ie = /&/g, Ae = /^\s*\/\/.*$/gm;
function Oe(e2, t2) {
  return e2.map(function(e3) {
    return "rule" === e3.type && (e3.value = "".concat(t2, " ").concat(e3.value), e3.value = e3.value.replaceAll(",", ",".concat(t2, " ")), e3.props = e3.props.map(function(e4) {
      return "".concat(t2, " ").concat(e4);
    })), Array.isArray(e3.children) && "@keyframes" !== e3.type && (e3.children = Oe(e3.children, t2)), e3;
  });
}
function De(e2) {
  var t2, n2, o2, r2 = void 0 === e2 ? N : e2, s2 = r2.options, i2 = void 0 === s2 ? N : s2, a2 = r2.plugins, c2 = void 0 === a2 ? E : a2, l2 = function(e3, o3, r3) {
    return r3 === n2 || r3.startsWith(n2) && r3.endsWith(n2) && r3.replaceAll(n2, "").length > 0 ? ".".concat(t2) : e3;
  }, u2 = c2.slice();
  u2.push(function(e3) {
    e3.type === RULESET && e3.value.includes("&") && (e3.props[0] = e3.props[0].replace(Ie, n2).replace(o2, l2));
  }), i2.prefix && u2.push(prefixer), u2.push(stringify);
  var p2 = function(e3, r3, s3, a3) {
    void 0 === r3 && (r3 = ""), void 0 === s3 && (s3 = ""), void 0 === a3 && (a3 = "&"), t2 = a3, n2 = r3, o2 = new RegExp("\\".concat(n2, "\\b"), "g");
    var c3 = e3.replace(Ae, ""), l3 = compile(s3 || r3 ? "".concat(s3, " ").concat(r3, " { ").concat(c3, " }") : c3);
    i2.namespace && (l3 = Oe(l3, i2.namespace));
    var p3 = [];
    return serialize(l3, middleware(u2.concat(rulesheet(function(e4) {
      return p3.push(e4);
    })))), p3;
  };
  return p2.hash = c2.length ? c2.reduce(function(e3, t3) {
    return t3.name || ce(15), k(e3, t3.name);
  }, 5381).toString() : "", p2;
}
var Re = new Ce(), Te = De(), ke = React.createContext({ shouldForwardProp: void 0, styleSheet: Re, stylis: Te });
ke.Consumer;
React.createContext(void 0);
function Ve() {
  return reactExports.useContext(ke);
}
var Me = function() {
  function e2(e3, t2) {
    var n2 = this;
    this.inject = function(e4, t3) {
      void 0 === t3 && (t3 = Te);
      var o2 = n2.name + t3.hash;
      e4.hasNameForId(n2.id, o2) || e4.insertRules(n2.id, o2, t3(n2.rules, o2, "@keyframes"));
    }, this.name = e3, this.id = "sc-keyframes-".concat(e3), this.rules = t2, se(this, function() {
      throw ce(12, String(n2.name));
    });
  }
  return e2.prototype.getName = function(e3) {
    return void 0 === e3 && (e3 = Te), this.name + e3.hash;
  }, e2;
}(), $e = function(e2) {
  return e2 >= "A" && e2 <= "Z";
};
function ze(e2) {
  for (var t2 = "", n2 = 0; n2 < e2.length; n2++) {
    var o2 = e2[n2];
    if (1 === n2 && "-" === o2 && "-" === e2[0])
      return e2;
    $e(o2) ? t2 += "-" + o2.toLowerCase() : t2 += o2;
  }
  return t2.startsWith("ms-") ? "-" + t2 : t2;
}
var Be = function(e2) {
  return null == e2 || false === e2 || "" === e2;
}, Le = function(t2) {
  var n2, o2, r2 = [];
  for (var s2 in t2) {
    var i2 = t2[s2];
    t2.hasOwnProperty(s2) && !Be(i2) && (Array.isArray(i2) && i2.isCss || Q(i2) ? r2.push("".concat(ze(s2), ":"), i2, ";") : oe(i2) ? r2.push.apply(r2, __spreadArray(__spreadArray(["".concat(s2, " {")], Le(i2), false), ["}"], false)) : r2.push("".concat(ze(s2), ": ").concat((n2 = s2, null == (o2 = i2) || "boolean" == typeof o2 || "" === o2 ? "" : "number" != typeof o2 || 0 === o2 || n2 in unitlessKeys || n2.startsWith("--") ? String(o2).trim() : "".concat(o2, "px")), ";")));
  }
  return r2;
};
function Ge(e2, t2, n2, o2) {
  if (Be(e2))
    return [];
  if (ee(e2))
    return [".".concat(e2.styledComponentId)];
  if (Q(e2)) {
    if (!Q(s2 = e2) || s2.prototype && s2.prototype.isReactComponent || !t2)
      return [e2];
    var r2 = e2(t2);
    return Ge(r2, t2, n2, o2);
  }
  var s2;
  return e2 instanceof Me ? n2 ? (e2.inject(n2, o2), [e2.getName(o2)]) : [e2] : oe(e2) ? Le(e2) : Array.isArray(e2) ? Array.prototype.concat.apply(E, e2.map(function(e3) {
    return Ge(e3, t2, n2, o2);
  })) : [e2.toString()];
}
function Ye(e2) {
  for (var t2 = 0; t2 < e2.length; t2 += 1) {
    var n2 = e2[t2];
    if (Q(n2) && !ee(n2))
      return false;
  }
  return true;
}
var We = j("6.1.1"), qe = function() {
  function e2(e3, t2, n2) {
    this.rules = e3, this.staticRulesId = "", this.isStatic = (void 0 === n2 || n2.isStatic) && Ye(e3), this.componentId = t2, this.baseHash = k(We, t2), this.baseStyle = n2, Ce.registerId(t2);
  }
  return e2.prototype.generateAndInjectStyles = function(e3, t2, n2) {
    var o2 = this.baseStyle ? this.baseStyle.generateAndInjectStyles(e3, t2, n2) : "";
    if (this.isStatic && !n2.hash)
      if (this.staticRulesId && t2.hasNameForId(this.componentId, this.staticRulesId))
        o2 = te(o2, this.staticRulesId);
      else {
        var r2 = ne(Ge(this.rules, e3, t2, n2)), s2 = R(k(this.baseHash, r2) >>> 0);
        if (!t2.hasNameForId(this.componentId, s2)) {
          var i2 = n2(r2, ".".concat(s2), void 0, this.componentId);
          t2.insertRules(this.componentId, s2, i2);
        }
        o2 = te(o2, s2), this.staticRulesId = s2;
      }
    else {
      for (var a2 = k(this.baseHash, n2.hash), c2 = "", l2 = 0; l2 < this.rules.length; l2++) {
        var u2 = this.rules[l2];
        if ("string" == typeof u2)
          c2 += u2;
        else if (u2) {
          var p2 = ne(Ge(u2, e3, t2, n2));
          a2 = k(a2, p2 + l2), c2 += p2;
        }
      }
      if (c2) {
        var d2 = R(a2 >>> 0);
        t2.hasNameForId(this.componentId, d2) || t2.insertRules(this.componentId, d2, n2(c2, ".".concat(d2), void 0, this.componentId)), o2 = te(o2, d2);
      }
    }
    return o2;
  }, e2;
}(), He = React.createContext(void 0);
He.Consumer;
var Ze = {};
function Qe(e2, r2, s2) {
  var i2 = ee(e2), a2 = e2, c2 = !F(e2), p2 = r2.attrs, d2 = void 0 === p2 ? E : p2, h2 = r2.componentId, f2 = void 0 === h2 ? function(e3, t2) {
    var n2 = "string" != typeof e3 ? "sc" : A(e3);
    Ze[n2] = (Ze[n2] || 0) + 1;
    var o2 = "".concat(n2, "-").concat(x("6.1.1" + n2 + Ze[n2]));
    return t2 ? "".concat(t2, "-").concat(o2) : o2;
  }(r2.displayName, r2.parentComponentId) : h2, m2 = r2.displayName, y2 = void 0 === m2 ? function(e3) {
    return F(e3) ? "styled.".concat(e3) : "Styled(".concat(V(e3), ")");
  }(e2) : m2, v2 = r2.displayName && r2.componentId ? "".concat(A(r2.displayName), "-").concat(r2.componentId) : r2.componentId || f2, g2 = i2 && a2.attrs ? a2.attrs.concat(d2).filter(Boolean) : d2, S2 = r2.shouldForwardProp;
  if (i2 && a2.shouldForwardProp) {
    var w2 = a2.shouldForwardProp;
    if (r2.shouldForwardProp) {
      var C2 = r2.shouldForwardProp;
      S2 = function(e3, t2) {
        return w2(e3, t2) && C2(e3, t2);
      };
    } else
      S2 = w2;
  }
  var I2 = new qe(s2, v2, i2 ? a2.componentStyle : void 0);
  function O2(e3, r3) {
    return function(e4, r4, s3) {
      var i3 = e4.attrs, a3 = e4.componentStyle, c3 = e4.defaultProps, p3 = e4.foldedComponentIds, d3 = e4.styledComponentId, h3 = e4.target, f3 = React.useContext(He), m3 = Ve(), y3 = e4.shouldForwardProp || m3.shouldForwardProp;
      var v3 = function(e5, n2, o2) {
        for (var r5, s4 = __assign(__assign({}, n2), { className: void 0, theme: o2 }), i4 = 0; i4 < e5.length; i4 += 1) {
          var a4 = Q(r5 = e5[i4]) ? r5(s4) : r5;
          for (var c4 in a4)
            s4[c4] = "className" === c4 ? te(s4[c4], a4[c4]) : "style" === c4 ? __assign(__assign({}, s4[c4]), a4[c4]) : a4[c4];
        }
        return n2.className && (s4.className = te(s4.className, n2.className)), s4;
      }(i3, r4, P(r4, f3, c3) || N), g3 = v3.as || h3, S3 = {};
      for (var w3 in v3)
        void 0 === v3[w3] || "$" === w3[0] || "as" === w3 || "theme" === w3 || ("forwardedAs" === w3 ? S3.as = v3.forwardedAs : y3 && !y3(w3, g3) || (S3[w3] = v3[w3], y3 || true));
      var b2 = function(e5, t2) {
        var n2 = Ve(), o2 = e5.generateAndInjectStyles(t2, n2.styleSheet, n2.stylis);
        return o2;
      }(a3, v3);
      var E2 = te(p3, d3);
      return b2 && (E2 += " " + b2), v3.className && (E2 += " " + v3.className), S3[F(g3) && !_.has(g3) ? "class" : "className"] = E2, S3.ref = s3, reactExports.createElement(g3, S3);
    }(D2, e3, r3);
  }
  O2.displayName = y2;
  var D2 = React.forwardRef(O2);
  return D2.attrs = g2, D2.componentStyle = I2, D2.displayName = y2, D2.shouldForwardProp = S2, D2.foldedComponentIds = i2 ? te(a2.foldedComponentIds, a2.styledComponentId) : "", D2.styledComponentId = v2, D2.target = i2 ? a2.target : e2, Object.defineProperty(D2, "defaultProps", { get: function() {
    return this._foldedDefaultProps;
  }, set: function(e3) {
    this._foldedDefaultProps = i2 ? function(e4) {
      for (var t2 = [], n2 = 1; n2 < arguments.length; n2++)
        t2[n2 - 1] = arguments[n2];
      for (var o2 = 0, r3 = t2; o2 < r3.length; o2++)
        re(e4, r3[o2], true);
      return e4;
    }({}, a2.defaultProps, e3) : e3;
  } }), se(D2, function() {
    return ".".concat(D2.styledComponentId);
  }), c2 && K(D2, e2, { attrs: true, componentStyle: true, displayName: true, foldedComponentIds: true, shouldForwardProp: true, styledComponentId: true, target: true }), D2;
}
function et(e2, t2) {
  for (var n2 = [e2[0]], o2 = 0, r2 = t2.length; o2 < r2; o2 += 1)
    n2.push(t2[o2], e2[o2 + 1]);
  return n2;
}
var tt = function(e2) {
  return Object.assign(e2, { isCss: true });
};
function nt(t2) {
  for (var n2 = [], o2 = 1; o2 < arguments.length; o2++)
    n2[o2 - 1] = arguments[o2];
  if (Q(t2) || oe(t2)) {
    var r2 = t2;
    return tt(Ge(et(E, __spreadArray([r2], n2, true))));
  }
  var s2 = t2;
  return 0 === n2.length && 1 === s2.length && "string" == typeof s2[0] ? Ge(s2) : tt(Ge(et(s2, n2)));
}
function ot(n2, o2, r2) {
  if (void 0 === r2 && (r2 = N), !o2)
    throw ce(1, o2);
  var s2 = function(t2) {
    for (var s3 = [], i2 = 1; i2 < arguments.length; i2++)
      s3[i2 - 1] = arguments[i2];
    return n2(o2, r2, nt.apply(void 0, __spreadArray([t2], s3, false)));
  };
  return s2.attrs = function(e2) {
    return ot(n2, o2, __assign(__assign({}, r2), { attrs: Array.prototype.concat(r2.attrs, e2).filter(Boolean) }));
  }, s2.withConfig = function(e2) {
    return ot(n2, o2, __assign(__assign({}, r2), e2));
  }, s2;
}
var rt = function(e2) {
  return ot(Qe, e2);
}, st = rt;
_.forEach(function(e2) {
  st[e2] = rt(e2);
});
var it = function() {
  function e2(e3, t2) {
    this.rules = e3, this.componentId = t2, this.isStatic = Ye(e3), Ce.registerId(this.componentId + 1);
  }
  return e2.prototype.createStyles = function(e3, t2, n2, o2) {
    var r2 = o2(ne(Ge(this.rules, t2, n2, o2)), ""), s2 = this.componentId + e3;
    n2.insertRules(s2, s2, r2);
  }, e2.prototype.removeStyles = function(e3, t2) {
    t2.clearRules(this.componentId + e3);
  }, e2.prototype.renderStyles = function(e3, t2, n2, o2) {
    e3 > 2 && Ce.registerId(this.componentId + e3), this.removeStyles(e3, n2), this.createStyles(e3, t2, n2, o2);
  }, e2;
}();
function at(n2) {
  for (var r2 = [], s2 = 1; s2 < arguments.length; s2++)
    r2[s2 - 1] = arguments[s2];
  var i2 = nt.apply(void 0, __spreadArray([n2], r2, false)), a2 = "sc-global-".concat(x(JSON.stringify(i2))), c2 = new it(i2, a2);
  var l2 = function(e2) {
    var t2 = Ve(), n3 = React.useContext(He), r3 = React.useRef(t2.styleSheet.allocateGSInstance(a2)).current;
    return t2.styleSheet.server && u2(r3, e2, t2.styleSheet, n3, t2.stylis), React.useLayoutEffect(function() {
      if (!t2.styleSheet.server)
        return u2(r3, e2, t2.styleSheet, n3, t2.stylis), function() {
          return c2.removeStyles(r3, t2.styleSheet);
        };
    }, [r3, e2, t2.styleSheet, n3, t2.stylis]), null;
  };
  function u2(e2, n3, o2, r3, s3) {
    if (c2.isStatic)
      c2.renderStyles(e2, g, o2, s3);
    else {
      var i3 = __assign(__assign({}, n3), { theme: P(n3, r3, l2.defaultProps) });
      c2.renderStyles(e2, i3, o2, s3);
    }
  }
  return React.memo(l2);
}
function copyArray$1(source, array) {
  var index = -1, length2 = source.length;
  array || (array = Array(length2));
  while (++index < length2) {
    array[index] = source[index];
  }
  return array;
}
var _copyArray = copyArray$1;
var nativeFloor = Math.floor, nativeRandom = Math.random;
function baseRandom$1(lower, upper) {
  return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
}
var _baseRandom = baseRandom$1;
var baseRandom = _baseRandom;
function shuffleSelf$2(array, size) {
  var index = -1, length2 = array.length, lastIndex = length2 - 1;
  size = size === void 0 ? length2 : size;
  while (++index < size) {
    var rand = baseRandom(index, lastIndex), value = array[rand];
    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}
var _shuffleSelf = shuffleSelf$2;
var copyArray = _copyArray, shuffleSelf$1 = _shuffleSelf;
function arrayShuffle$1(array) {
  return shuffleSelf$1(copyArray(array));
}
var _arrayShuffle = arrayShuffle$1;
function arrayMap$1(array, iteratee) {
  var index = -1, length2 = array == null ? 0 : array.length, result = Array(length2);
  while (++index < length2) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}
var _arrayMap = arrayMap$1;
var arrayMap = _arrayMap;
function baseValues$1(object, props) {
  return arrayMap(props, function(key) {
    return object[key];
  });
}
var _baseValues = baseValues$1;
function baseTimes$1(n2, iteratee) {
  var index = -1, result = Array(n2);
  while (++index < n2) {
    result[index] = iteratee(index);
  }
  return result;
}
var _baseTimes = baseTimes$1;
var _freeGlobal;
var hasRequired_freeGlobal;
function require_freeGlobal() {
  if (hasRequired_freeGlobal)
    return _freeGlobal;
  hasRequired_freeGlobal = 1;
  var freeGlobal = typeof commonjsGlobal == "object" && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;
  _freeGlobal = freeGlobal;
  return _freeGlobal;
}
var _root;
var hasRequired_root;
function require_root() {
  if (hasRequired_root)
    return _root;
  hasRequired_root = 1;
  var freeGlobal = require_freeGlobal();
  var freeSelf = typeof self == "object" && self && self.Object === Object && self;
  var root = freeGlobal || freeSelf || Function("return this")();
  _root = root;
  return _root;
}
var _Symbol;
var hasRequired_Symbol;
function require_Symbol() {
  if (hasRequired_Symbol)
    return _Symbol;
  hasRequired_Symbol = 1;
  var root = require_root();
  var Symbol2 = root.Symbol;
  _Symbol = Symbol2;
  return _Symbol;
}
var _getRawTag;
var hasRequired_getRawTag;
function require_getRawTag() {
  if (hasRequired_getRawTag)
    return _getRawTag;
  hasRequired_getRawTag = 1;
  var Symbol2 = require_Symbol();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var nativeObjectToString = objectProto2.toString;
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function getRawTag(value) {
    var isOwn = hasOwnProperty2.call(value, symToStringTag), tag = value[symToStringTag];
    try {
      value[symToStringTag] = void 0;
      var unmasked = true;
    } catch (e) {
    }
    var result = nativeObjectToString.call(value);
    if (unmasked) {
      if (isOwn) {
        value[symToStringTag] = tag;
      } else {
        delete value[symToStringTag];
      }
    }
    return result;
  }
  _getRawTag = getRawTag;
  return _getRawTag;
}
var _objectToString;
var hasRequired_objectToString;
function require_objectToString() {
  if (hasRequired_objectToString)
    return _objectToString;
  hasRequired_objectToString = 1;
  var objectProto2 = Object.prototype;
  var nativeObjectToString = objectProto2.toString;
  function objectToString(value) {
    return nativeObjectToString.call(value);
  }
  _objectToString = objectToString;
  return _objectToString;
}
var _baseGetTag;
var hasRequired_baseGetTag;
function require_baseGetTag() {
  if (hasRequired_baseGetTag)
    return _baseGetTag;
  hasRequired_baseGetTag = 1;
  var Symbol2 = require_Symbol(), getRawTag = require_getRawTag(), objectToString = require_objectToString();
  var nullTag = "[object Null]", undefinedTag = "[object Undefined]";
  var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
  function baseGetTag2(value) {
    if (value == null) {
      return value === void 0 ? undefinedTag : nullTag;
    }
    return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
  }
  _baseGetTag = baseGetTag2;
  return _baseGetTag;
}
var isObjectLike_1;
var hasRequiredIsObjectLike;
function requireIsObjectLike() {
  if (hasRequiredIsObjectLike)
    return isObjectLike_1;
  hasRequiredIsObjectLike = 1;
  function isObjectLike2(value) {
    return value != null && typeof value == "object";
  }
  isObjectLike_1 = isObjectLike2;
  return isObjectLike_1;
}
var baseGetTag$2 = require_baseGetTag(), isObjectLike$2 = requireIsObjectLike();
var argsTag$1 = "[object Arguments]";
function baseIsArguments$1(value) {
  return isObjectLike$2(value) && baseGetTag$2(value) == argsTag$1;
}
var _baseIsArguments = baseIsArguments$1;
var baseIsArguments = _baseIsArguments, isObjectLike$1 = requireIsObjectLike();
var objectProto$3 = Object.prototype;
var hasOwnProperty$2 = objectProto$3.hasOwnProperty;
var propertyIsEnumerable = objectProto$3.propertyIsEnumerable;
var isArguments$1 = baseIsArguments(/* @__PURE__ */ function() {
  return arguments;
}()) ? baseIsArguments : function(value) {
  return isObjectLike$1(value) && hasOwnProperty$2.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
};
var isArguments_1 = isArguments$1;
var isArray$2 = Array.isArray;
var isArray_1 = isArray$2;
var isBuffer$1 = { exports: {} };
function stubFalse() {
  return false;
}
var stubFalse_1 = stubFalse;
isBuffer$1.exports;
(function(module, exports) {
  var root = require_root(), stubFalse2 = stubFalse_1;
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var Buffer = moduleExports ? root.Buffer : void 0;
  var nativeIsBuffer = Buffer ? Buffer.isBuffer : void 0;
  var isBuffer2 = nativeIsBuffer || stubFalse2;
  module.exports = isBuffer2;
})(isBuffer$1, isBuffer$1.exports);
var isBufferExports = isBuffer$1.exports;
var _isIndex;
var hasRequired_isIndex;
function require_isIndex() {
  if (hasRequired_isIndex)
    return _isIndex;
  hasRequired_isIndex = 1;
  var MAX_SAFE_INTEGER2 = 9007199254740991;
  var reIsUint = /^(?:0|[1-9]\d*)$/;
  function isIndex2(value, length2) {
    var type = typeof value;
    length2 = length2 == null ? MAX_SAFE_INTEGER2 : length2;
    return !!length2 && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length2);
  }
  _isIndex = isIndex2;
  return _isIndex;
}
var MAX_SAFE_INTEGER = 9007199254740991;
function isLength$2(value) {
  return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}
var isLength_1 = isLength$2;
var baseGetTag$1 = require_baseGetTag(), isLength$1 = isLength_1, isObjectLike = requireIsObjectLike();
var argsTag = "[object Arguments]", arrayTag = "[object Array]", boolTag = "[object Boolean]", dateTag = "[object Date]", errorTag = "[object Error]", funcTag$1 = "[object Function]", mapTag = "[object Map]", numberTag = "[object Number]", objectTag = "[object Object]", regexpTag = "[object RegExp]", setTag = "[object Set]", stringTag = "[object String]", weakMapTag = "[object WeakMap]";
var arrayBufferTag = "[object ArrayBuffer]", dataViewTag = "[object DataView]", float32Tag = "[object Float32Array]", float64Tag = "[object Float64Array]", int8Tag = "[object Int8Array]", int16Tag = "[object Int16Array]", int32Tag = "[object Int32Array]", uint8Tag = "[object Uint8Array]", uint8ClampedTag = "[object Uint8ClampedArray]", uint16Tag = "[object Uint16Array]", uint32Tag = "[object Uint32Array]";
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag$1] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
function baseIsTypedArray$1(value) {
  return isObjectLike(value) && isLength$1(value.length) && !!typedArrayTags[baseGetTag$1(value)];
}
var _baseIsTypedArray = baseIsTypedArray$1;
var _baseUnary;
var hasRequired_baseUnary;
function require_baseUnary() {
  if (hasRequired_baseUnary)
    return _baseUnary;
  hasRequired_baseUnary = 1;
  function baseUnary2(func) {
    return function(value) {
      return func(value);
    };
  }
  _baseUnary = baseUnary2;
  return _baseUnary;
}
var _nodeUtil = { exports: {} };
_nodeUtil.exports;
(function(module, exports) {
  var freeGlobal = require_freeGlobal();
  var freeExports = exports && !exports.nodeType && exports;
  var freeModule = freeExports && true && module && !module.nodeType && module;
  var moduleExports = freeModule && freeModule.exports === freeExports;
  var freeProcess = moduleExports && freeGlobal.process;
  var nodeUtil2 = function() {
    try {
      var types = freeModule && freeModule.require && freeModule.require("util").types;
      if (types) {
        return types;
      }
      return freeProcess && freeProcess.binding && freeProcess.binding("util");
    } catch (e) {
    }
  }();
  module.exports = nodeUtil2;
})(_nodeUtil, _nodeUtil.exports);
var _nodeUtilExports = _nodeUtil.exports;
var baseIsTypedArray = _baseIsTypedArray, baseUnary = require_baseUnary(), nodeUtil = _nodeUtilExports;
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
var isTypedArray$1 = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
var isTypedArray_1 = isTypedArray$1;
var baseTimes = _baseTimes, isArguments = isArguments_1, isArray$1 = isArray_1, isBuffer = isBufferExports, isIndex = require_isIndex(), isTypedArray = isTypedArray_1;
var objectProto$2 = Object.prototype;
var hasOwnProperty$1 = objectProto$2.hasOwnProperty;
function arrayLikeKeys$1(value, inherited) {
  var isArr = isArray$1(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length2 = result.length;
  for (var key in value) {
    if ((inherited || hasOwnProperty$1.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable \`arguments.length\` in strict mode.
    (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
    isIndex(key, length2)))) {
      result.push(key);
    }
  }
  return result;
}
var _arrayLikeKeys = arrayLikeKeys$1;
var objectProto$1 = Object.prototype;
function isPrototype$1(value) {
  var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto$1;
  return value === proto;
}
var _isPrototype = isPrototype$1;
function overArg$1(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}
var _overArg = overArg$1;
var overArg = _overArg;
var nativeKeys$1 = overArg(Object.keys, Object);
var _nativeKeys = nativeKeys$1;
var isPrototype = _isPrototype, nativeKeys = _nativeKeys;
var objectProto = Object.prototype;
var hasOwnProperty = objectProto.hasOwnProperty;
function baseKeys$1(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != "constructor") {
      result.push(key);
    }
  }
  return result;
}
var _baseKeys = baseKeys$1;
var isObject_1;
var hasRequiredIsObject;
function requireIsObject() {
  if (hasRequiredIsObject)
    return isObject_1;
  hasRequiredIsObject = 1;
  function isObject2(value) {
    var type = typeof value;
    return value != null && (type == "object" || type == "function");
  }
  isObject_1 = isObject2;
  return isObject_1;
}
var baseGetTag = require_baseGetTag(), isObject = requireIsObject();
var asyncTag = "[object AsyncFunction]", funcTag = "[object Function]", genTag = "[object GeneratorFunction]", proxyTag = "[object Proxy]";
function isFunction$1(value) {
  if (!isObject(value)) {
    return false;
  }
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}
var isFunction_1 = isFunction$1;
var isFunction = isFunction_1, isLength = isLength_1;
function isArrayLike$1(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}
var isArrayLike_1 = isArrayLike$1;
var arrayLikeKeys = _arrayLikeKeys, baseKeys = _baseKeys, isArrayLike = isArrayLike_1;
function keys$1(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}
var keys_1 = keys$1;
var baseValues = _baseValues, keys = keys_1;
function values$1(object) {
  return object == null ? [] : baseValues(object, keys(object));
}
var values_1 = values$1;
var shuffleSelf = _shuffleSelf, values = values_1;
function baseShuffle$1(collection) {
  return shuffleSelf(values(collection));
}
var _baseShuffle = baseShuffle$1;
var arrayShuffle = _arrayShuffle, baseShuffle = _baseShuffle, isArray = isArray_1;
function shuffle(collection) {
  var func = isArray(collection) ? arrayShuffle : baseShuffle;
  return func(collection);
}
var shuffle_1 = shuffle;
const shuffle$1 = /* @__PURE__ */ getDefaultExportFromCjs(shuffle_1);
var dist = { exports: {} };
var now_1;
var hasRequiredNow;
function requireNow() {
  if (hasRequiredNow)
    return now_1;
  hasRequiredNow = 1;
  var root = require_root();
  var now = function() {
    return root.Date.now();
  };
  now_1 = now;
  return now_1;
}
var _trimmedEndIndex;
var hasRequired_trimmedEndIndex;
function require_trimmedEndIndex() {
  if (hasRequired_trimmedEndIndex)
    return _trimmedEndIndex;
  hasRequired_trimmedEndIndex = 1;
  var reWhitespace = /\s/;
  function trimmedEndIndex(string) {
    var index = string.length;
    while (index-- && reWhitespace.test(string.charAt(index))) {
    }
    return index;
  }
  _trimmedEndIndex = trimmedEndIndex;
  return _trimmedEndIndex;
}
var _baseTrim;
var hasRequired_baseTrim;
function require_baseTrim() {
  if (hasRequired_baseTrim)
    return _baseTrim;
  hasRequired_baseTrim = 1;
  var trimmedEndIndex = require_trimmedEndIndex();
  var reTrimStart = /^\s+/;
  function baseTrim(string) {
    return string ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, "") : string;
  }
  _baseTrim = baseTrim;
  return _baseTrim;
}
var isSymbol_1;
var hasRequiredIsSymbol;
function requireIsSymbol() {
  if (hasRequiredIsSymbol)
    return isSymbol_1;
  hasRequiredIsSymbol = 1;
  var baseGetTag2 = require_baseGetTag(), isObjectLike2 = requireIsObjectLike();
  var symbolTag = "[object Symbol]";
  function isSymbol(value) {
    return typeof value == "symbol" || isObjectLike2(value) && baseGetTag2(value) == symbolTag;
  }
  isSymbol_1 = isSymbol;
  return isSymbol_1;
}
var toNumber_1;
var hasRequiredToNumber;
function requireToNumber() {
  if (hasRequiredToNumber)
    return toNumber_1;
  hasRequiredToNumber = 1;
  var baseTrim = require_baseTrim(), isObject2 = requireIsObject(), isSymbol = requireIsSymbol();
  var NAN = 0 / 0;
  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
  var reIsBinary = /^0b[01]+$/i;
  var reIsOctal = /^0o[0-7]+$/i;
  var freeParseInt = parseInt;
  function toNumber(value) {
    if (typeof value == "number") {
      return value;
    }
    if (isSymbol(value)) {
      return NAN;
    }
    if (isObject2(value)) {
      var other = typeof value.valueOf == "function" ? value.valueOf() : value;
      value = isObject2(other) ? other + "" : other;
    }
    if (typeof value != "string") {
      return value === 0 ? value : +value;
    }
    value = baseTrim(value);
    var isBinary = reIsBinary.test(value);
    return isBinary || reIsOctal.test(value) ? freeParseInt(value.slice(2), isBinary ? 2 : 8) : reIsBadHex.test(value) ? NAN : +value;
  }
  toNumber_1 = toNumber;
  return toNumber_1;
}
var debounce_1;
var hasRequiredDebounce;
function requireDebounce() {
  if (hasRequiredDebounce)
    return debounce_1;
  hasRequiredDebounce = 1;
  var isObject2 = requireIsObject(), now = requireNow(), toNumber = requireToNumber();
  var FUNC_ERROR_TEXT = "Expected a function";
  var nativeMax = Math.max, nativeMin = Math.min;
  function debounce(func, wait, options) {
    var lastArgs, lastThis, maxWait, result, timerId, lastCallTime, lastInvokeTime = 0, leading = false, maxing = false, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    wait = toNumber(wait) || 0;
    if (isObject2(options)) {
      leading = !!options.leading;
      maxing = "maxWait" in options;
      maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    function invokeFunc(time) {
      var args = lastArgs, thisArg = lastThis;
      lastArgs = lastThis = void 0;
      lastInvokeTime = time;
      result = func.apply(thisArg, args);
      return result;
    }
    function leadingEdge(time) {
      lastInvokeTime = time;
      timerId = setTimeout(timerExpired, wait);
      return leading ? invokeFunc(time) : result;
    }
    function remainingWait(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime, timeWaiting = wait - timeSinceLastCall;
      return maxing ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
    }
    function shouldInvoke(time) {
      var timeSinceLastCall = time - lastCallTime, timeSinceLastInvoke = time - lastInvokeTime;
      return lastCallTime === void 0 || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
    }
    function timerExpired() {
      var time = now();
      if (shouldInvoke(time)) {
        return trailingEdge(time);
      }
      timerId = setTimeout(timerExpired, remainingWait(time));
    }
    function trailingEdge(time) {
      timerId = void 0;
      if (trailing && lastArgs) {
        return invokeFunc(time);
      }
      lastArgs = lastThis = void 0;
      return result;
    }
    function cancel() {
      if (timerId !== void 0) {
        clearTimeout(timerId);
      }
      lastInvokeTime = 0;
      lastArgs = lastCallTime = lastThis = timerId = void 0;
    }
    function flush() {
      return timerId === void 0 ? result : trailingEdge(now());
    }
    function debounced() {
      var time = now(), isInvoking = shouldInvoke(time);
      lastArgs = arguments;
      lastThis = this;
      lastCallTime = time;
      if (isInvoking) {
        if (timerId === void 0) {
          return leadingEdge(lastCallTime);
        }
        if (maxing) {
          clearTimeout(timerId);
          timerId = setTimeout(timerExpired, wait);
          return invokeFunc(lastCallTime);
        }
      }
      if (timerId === void 0) {
        timerId = setTimeout(timerExpired, wait);
      }
      return result;
    }
    debounced.cancel = cancel;
    debounced.flush = flush;
    return debounced;
  }
  debounce_1 = debounce;
  return debounce_1;
}
var _coreJsData;
var hasRequired_coreJsData;
function require_coreJsData() {
  if (hasRequired_coreJsData)
    return _coreJsData;
  hasRequired_coreJsData = 1;
  var root = require_root();
  var coreJsData = root["__core-js_shared__"];
  _coreJsData = coreJsData;
  return _coreJsData;
}
var _isMasked;
var hasRequired_isMasked;
function require_isMasked() {
  if (hasRequired_isMasked)
    return _isMasked;
  hasRequired_isMasked = 1;
  var coreJsData = require_coreJsData();
  var maskSrcKey = function() {
    var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
    return uid ? "Symbol(src)_1." + uid : "";
  }();
  function isMasked(func) {
    return !!maskSrcKey && maskSrcKey in func;
  }
  _isMasked = isMasked;
  return _isMasked;
}
var _toSource;
var hasRequired_toSource;
function require_toSource() {
  if (hasRequired_toSource)
    return _toSource;
  hasRequired_toSource = 1;
  var funcProto = Function.prototype;
  var funcToString = funcProto.toString;
  function toSource(func) {
    if (func != null) {
      try {
        return funcToString.call(func);
      } catch (e) {
      }
      try {
        return func + "";
      } catch (e) {
      }
    }
    return "";
  }
  _toSource = toSource;
  return _toSource;
}
var _baseIsNative;
var hasRequired_baseIsNative;
function require_baseIsNative() {
  if (hasRequired_baseIsNative)
    return _baseIsNative;
  hasRequired_baseIsNative = 1;
  var isFunction2 = isFunction_1, isMasked = require_isMasked(), isObject2 = requireIsObject(), toSource = require_toSource();
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reIsHostCtor = /^\[object .+?Constructor\]$/;
  var funcProto = Function.prototype, objectProto2 = Object.prototype;
  var funcToString = funcProto.toString;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  var reIsNative = RegExp(
    "^" + funcToString.call(hasOwnProperty2).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  );
  function baseIsNative(value) {
    if (!isObject2(value) || isMasked(value)) {
      return false;
    }
    var pattern = isFunction2(value) ? reIsNative : reIsHostCtor;
    return pattern.test(toSource(value));
  }
  _baseIsNative = baseIsNative;
  return _baseIsNative;
}
var _getValue;
var hasRequired_getValue;
function require_getValue() {
  if (hasRequired_getValue)
    return _getValue;
  hasRequired_getValue = 1;
  function getValue(object, key) {
    return object == null ? void 0 : object[key];
  }
  _getValue = getValue;
  return _getValue;
}
var _getNative;
var hasRequired_getNative;
function require_getNative() {
  if (hasRequired_getNative)
    return _getNative;
  hasRequired_getNative = 1;
  var baseIsNative = require_baseIsNative(), getValue = require_getValue();
  function getNative(object, key) {
    var value = getValue(object, key);
    return baseIsNative(value) ? value : void 0;
  }
  _getNative = getNative;
  return _getNative;
}
var _nativeCreate;
var hasRequired_nativeCreate;
function require_nativeCreate() {
  if (hasRequired_nativeCreate)
    return _nativeCreate;
  hasRequired_nativeCreate = 1;
  var getNative = require_getNative();
  var nativeCreate = getNative(Object, "create");
  _nativeCreate = nativeCreate;
  return _nativeCreate;
}
var _hashClear;
var hasRequired_hashClear;
function require_hashClear() {
  if (hasRequired_hashClear)
    return _hashClear;
  hasRequired_hashClear = 1;
  var nativeCreate = require_nativeCreate();
  function hashClear() {
    this.__data__ = nativeCreate ? nativeCreate(null) : {};
    this.size = 0;
  }
  _hashClear = hashClear;
  return _hashClear;
}
var _hashDelete;
var hasRequired_hashDelete;
function require_hashDelete() {
  if (hasRequired_hashDelete)
    return _hashDelete;
  hasRequired_hashDelete = 1;
  function hashDelete(key) {
    var result = this.has(key) && delete this.__data__[key];
    this.size -= result ? 1 : 0;
    return result;
  }
  _hashDelete = hashDelete;
  return _hashDelete;
}
var _hashGet;
var hasRequired_hashGet;
function require_hashGet() {
  if (hasRequired_hashGet)
    return _hashGet;
  hasRequired_hashGet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function hashGet(key) {
    var data = this.__data__;
    if (nativeCreate) {
      var result = data[key];
      return result === HASH_UNDEFINED ? void 0 : result;
    }
    return hasOwnProperty2.call(data, key) ? data[key] : void 0;
  }
  _hashGet = hashGet;
  return _hashGet;
}
var _hashHas;
var hasRequired_hashHas;
function require_hashHas() {
  if (hasRequired_hashHas)
    return _hashHas;
  hasRequired_hashHas = 1;
  var nativeCreate = require_nativeCreate();
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function hashHas(key) {
    var data = this.__data__;
    return nativeCreate ? data[key] !== void 0 : hasOwnProperty2.call(data, key);
  }
  _hashHas = hashHas;
  return _hashHas;
}
var _hashSet;
var hasRequired_hashSet;
function require_hashSet() {
  if (hasRequired_hashSet)
    return _hashSet;
  hasRequired_hashSet = 1;
  var nativeCreate = require_nativeCreate();
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function hashSet(key, value) {
    var data = this.__data__;
    this.size += this.has(key) ? 0 : 1;
    data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
    return this;
  }
  _hashSet = hashSet;
  return _hashSet;
}
var _Hash;
var hasRequired_Hash;
function require_Hash() {
  if (hasRequired_Hash)
    return _Hash;
  hasRequired_Hash = 1;
  var hashClear = require_hashClear(), hashDelete = require_hashDelete(), hashGet = require_hashGet(), hashHas = require_hashHas(), hashSet = require_hashSet();
  function Hash(entries) {
    var index = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  Hash.prototype.clear = hashClear;
  Hash.prototype["delete"] = hashDelete;
  Hash.prototype.get = hashGet;
  Hash.prototype.has = hashHas;
  Hash.prototype.set = hashSet;
  _Hash = Hash;
  return _Hash;
}
var _listCacheClear;
var hasRequired_listCacheClear;
function require_listCacheClear() {
  if (hasRequired_listCacheClear)
    return _listCacheClear;
  hasRequired_listCacheClear = 1;
  function listCacheClear() {
    this.__data__ = [];
    this.size = 0;
  }
  _listCacheClear = listCacheClear;
  return _listCacheClear;
}
var eq_1;
var hasRequiredEq;
function requireEq() {
  if (hasRequiredEq)
    return eq_1;
  hasRequiredEq = 1;
  function eq(value, other) {
    return value === other || value !== value && other !== other;
  }
  eq_1 = eq;
  return eq_1;
}
var _assocIndexOf;
var hasRequired_assocIndexOf;
function require_assocIndexOf() {
  if (hasRequired_assocIndexOf)
    return _assocIndexOf;
  hasRequired_assocIndexOf = 1;
  var eq = requireEq();
  function assocIndexOf(array, key) {
    var length2 = array.length;
    while (length2--) {
      if (eq(array[length2][0], key)) {
        return length2;
      }
    }
    return -1;
  }
  _assocIndexOf = assocIndexOf;
  return _assocIndexOf;
}
var _listCacheDelete;
var hasRequired_listCacheDelete;
function require_listCacheDelete() {
  if (hasRequired_listCacheDelete)
    return _listCacheDelete;
  hasRequired_listCacheDelete = 1;
  var assocIndexOf = require_assocIndexOf();
  var arrayProto = Array.prototype;
  var splice = arrayProto.splice;
  function listCacheDelete(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      return false;
    }
    var lastIndex = data.length - 1;
    if (index == lastIndex) {
      data.pop();
    } else {
      splice.call(data, index, 1);
    }
    --this.size;
    return true;
  }
  _listCacheDelete = listCacheDelete;
  return _listCacheDelete;
}
var _listCacheGet;
var hasRequired_listCacheGet;
function require_listCacheGet() {
  if (hasRequired_listCacheGet)
    return _listCacheGet;
  hasRequired_listCacheGet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheGet(key) {
    var data = this.__data__, index = assocIndexOf(data, key);
    return index < 0 ? void 0 : data[index][1];
  }
  _listCacheGet = listCacheGet;
  return _listCacheGet;
}
var _listCacheHas;
var hasRequired_listCacheHas;
function require_listCacheHas() {
  if (hasRequired_listCacheHas)
    return _listCacheHas;
  hasRequired_listCacheHas = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheHas(key) {
    return assocIndexOf(this.__data__, key) > -1;
  }
  _listCacheHas = listCacheHas;
  return _listCacheHas;
}
var _listCacheSet;
var hasRequired_listCacheSet;
function require_listCacheSet() {
  if (hasRequired_listCacheSet)
    return _listCacheSet;
  hasRequired_listCacheSet = 1;
  var assocIndexOf = require_assocIndexOf();
  function listCacheSet(key, value) {
    var data = this.__data__, index = assocIndexOf(data, key);
    if (index < 0) {
      ++this.size;
      data.push([key, value]);
    } else {
      data[index][1] = value;
    }
    return this;
  }
  _listCacheSet = listCacheSet;
  return _listCacheSet;
}
var _ListCache;
var hasRequired_ListCache;
function require_ListCache() {
  if (hasRequired_ListCache)
    return _ListCache;
  hasRequired_ListCache = 1;
  var listCacheClear = require_listCacheClear(), listCacheDelete = require_listCacheDelete(), listCacheGet = require_listCacheGet(), listCacheHas = require_listCacheHas(), listCacheSet = require_listCacheSet();
  function ListCache(entries) {
    var index = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  ListCache.prototype.clear = listCacheClear;
  ListCache.prototype["delete"] = listCacheDelete;
  ListCache.prototype.get = listCacheGet;
  ListCache.prototype.has = listCacheHas;
  ListCache.prototype.set = listCacheSet;
  _ListCache = ListCache;
  return _ListCache;
}
var _Map;
var hasRequired_Map;
function require_Map() {
  if (hasRequired_Map)
    return _Map;
  hasRequired_Map = 1;
  var getNative = require_getNative(), root = require_root();
  var Map2 = getNative(root, "Map");
  _Map = Map2;
  return _Map;
}
var _mapCacheClear;
var hasRequired_mapCacheClear;
function require_mapCacheClear() {
  if (hasRequired_mapCacheClear)
    return _mapCacheClear;
  hasRequired_mapCacheClear = 1;
  var Hash = require_Hash(), ListCache = require_ListCache(), Map2 = require_Map();
  function mapCacheClear() {
    this.size = 0;
    this.__data__ = {
      "hash": new Hash(),
      "map": new (Map2 || ListCache)(),
      "string": new Hash()
    };
  }
  _mapCacheClear = mapCacheClear;
  return _mapCacheClear;
}
var _isKeyable;
var hasRequired_isKeyable;
function require_isKeyable() {
  if (hasRequired_isKeyable)
    return _isKeyable;
  hasRequired_isKeyable = 1;
  function isKeyable(value) {
    var type = typeof value;
    return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
  }
  _isKeyable = isKeyable;
  return _isKeyable;
}
var _getMapData;
var hasRequired_getMapData;
function require_getMapData() {
  if (hasRequired_getMapData)
    return _getMapData;
  hasRequired_getMapData = 1;
  var isKeyable = require_isKeyable();
  function getMapData(map, key) {
    var data = map.__data__;
    return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
  }
  _getMapData = getMapData;
  return _getMapData;
}
var _mapCacheDelete;
var hasRequired_mapCacheDelete;
function require_mapCacheDelete() {
  if (hasRequired_mapCacheDelete)
    return _mapCacheDelete;
  hasRequired_mapCacheDelete = 1;
  var getMapData = require_getMapData();
  function mapCacheDelete(key) {
    var result = getMapData(this, key)["delete"](key);
    this.size -= result ? 1 : 0;
    return result;
  }
  _mapCacheDelete = mapCacheDelete;
  return _mapCacheDelete;
}
var _mapCacheGet;
var hasRequired_mapCacheGet;
function require_mapCacheGet() {
  if (hasRequired_mapCacheGet)
    return _mapCacheGet;
  hasRequired_mapCacheGet = 1;
  var getMapData = require_getMapData();
  function mapCacheGet(key) {
    return getMapData(this, key).get(key);
  }
  _mapCacheGet = mapCacheGet;
  return _mapCacheGet;
}
var _mapCacheHas;
var hasRequired_mapCacheHas;
function require_mapCacheHas() {
  if (hasRequired_mapCacheHas)
    return _mapCacheHas;
  hasRequired_mapCacheHas = 1;
  var getMapData = require_getMapData();
  function mapCacheHas(key) {
    return getMapData(this, key).has(key);
  }
  _mapCacheHas = mapCacheHas;
  return _mapCacheHas;
}
var _mapCacheSet;
var hasRequired_mapCacheSet;
function require_mapCacheSet() {
  if (hasRequired_mapCacheSet)
    return _mapCacheSet;
  hasRequired_mapCacheSet = 1;
  var getMapData = require_getMapData();
  function mapCacheSet(key, value) {
    var data = getMapData(this, key), size = data.size;
    data.set(key, value);
    this.size += data.size == size ? 0 : 1;
    return this;
  }
  _mapCacheSet = mapCacheSet;
  return _mapCacheSet;
}
var _MapCache;
var hasRequired_MapCache;
function require_MapCache() {
  if (hasRequired_MapCache)
    return _MapCache;
  hasRequired_MapCache = 1;
  var mapCacheClear = require_mapCacheClear(), mapCacheDelete = require_mapCacheDelete(), mapCacheGet = require_mapCacheGet(), mapCacheHas = require_mapCacheHas(), mapCacheSet = require_mapCacheSet();
  function MapCache(entries) {
    var index = -1, length2 = entries == null ? 0 : entries.length;
    this.clear();
    while (++index < length2) {
      var entry = entries[index];
      this.set(entry[0], entry[1]);
    }
  }
  MapCache.prototype.clear = mapCacheClear;
  MapCache.prototype["delete"] = mapCacheDelete;
  MapCache.prototype.get = mapCacheGet;
  MapCache.prototype.has = mapCacheHas;
  MapCache.prototype.set = mapCacheSet;
  _MapCache = MapCache;
  return _MapCache;
}
var _setCacheAdd;
var hasRequired_setCacheAdd;
function require_setCacheAdd() {
  if (hasRequired_setCacheAdd)
    return _setCacheAdd;
  hasRequired_setCacheAdd = 1;
  var HASH_UNDEFINED = "__lodash_hash_undefined__";
  function setCacheAdd(value) {
    this.__data__.set(value, HASH_UNDEFINED);
    return this;
  }
  _setCacheAdd = setCacheAdd;
  return _setCacheAdd;
}
var _setCacheHas;
var hasRequired_setCacheHas;
function require_setCacheHas() {
  if (hasRequired_setCacheHas)
    return _setCacheHas;
  hasRequired_setCacheHas = 1;
  function setCacheHas(value) {
    return this.__data__.has(value);
  }
  _setCacheHas = setCacheHas;
  return _setCacheHas;
}
var _SetCache;
var hasRequired_SetCache;
function require_SetCache() {
  if (hasRequired_SetCache)
    return _SetCache;
  hasRequired_SetCache = 1;
  var MapCache = require_MapCache(), setCacheAdd = require_setCacheAdd(), setCacheHas = require_setCacheHas();
  function SetCache(values2) {
    var index = -1, length2 = values2 == null ? 0 : values2.length;
    this.__data__ = new MapCache();
    while (++index < length2) {
      this.add(values2[index]);
    }
  }
  SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
  SetCache.prototype.has = setCacheHas;
  _SetCache = SetCache;
  return _SetCache;
}
var _baseFindIndex;
var hasRequired_baseFindIndex;
function require_baseFindIndex() {
  if (hasRequired_baseFindIndex)
    return _baseFindIndex;
  hasRequired_baseFindIndex = 1;
  function baseFindIndex(array, predicate, fromIndex, fromRight) {
    var length2 = array.length, index = fromIndex + (fromRight ? 1 : -1);
    while (fromRight ? index-- : ++index < length2) {
      if (predicate(array[index], index, array)) {
        return index;
      }
    }
    return -1;
  }
  _baseFindIndex = baseFindIndex;
  return _baseFindIndex;
}
var _baseIsNaN;
var hasRequired_baseIsNaN;
function require_baseIsNaN() {
  if (hasRequired_baseIsNaN)
    return _baseIsNaN;
  hasRequired_baseIsNaN = 1;
  function baseIsNaN(value) {
    return value !== value;
  }
  _baseIsNaN = baseIsNaN;
  return _baseIsNaN;
}
var _strictIndexOf;
var hasRequired_strictIndexOf;
function require_strictIndexOf() {
  if (hasRequired_strictIndexOf)
    return _strictIndexOf;
  hasRequired_strictIndexOf = 1;
  function strictIndexOf(array, value, fromIndex) {
    var index = fromIndex - 1, length2 = array.length;
    while (++index < length2) {
      if (array[index] === value) {
        return index;
      }
    }
    return -1;
  }
  _strictIndexOf = strictIndexOf;
  return _strictIndexOf;
}
var _baseIndexOf;
var hasRequired_baseIndexOf;
function require_baseIndexOf() {
  if (hasRequired_baseIndexOf)
    return _baseIndexOf;
  hasRequired_baseIndexOf = 1;
  var baseFindIndex = require_baseFindIndex(), baseIsNaN = require_baseIsNaN(), strictIndexOf = require_strictIndexOf();
  function baseIndexOf(array, value, fromIndex) {
    return value === value ? strictIndexOf(array, value, fromIndex) : baseFindIndex(array, baseIsNaN, fromIndex);
  }
  _baseIndexOf = baseIndexOf;
  return _baseIndexOf;
}
var _arrayIncludes;
var hasRequired_arrayIncludes;
function require_arrayIncludes() {
  if (hasRequired_arrayIncludes)
    return _arrayIncludes;
  hasRequired_arrayIncludes = 1;
  var baseIndexOf = require_baseIndexOf();
  function arrayIncludes(array, value) {
    var length2 = array == null ? 0 : array.length;
    return !!length2 && baseIndexOf(array, value, 0) > -1;
  }
  _arrayIncludes = arrayIncludes;
  return _arrayIncludes;
}
var _arrayIncludesWith;
var hasRequired_arrayIncludesWith;
function require_arrayIncludesWith() {
  if (hasRequired_arrayIncludesWith)
    return _arrayIncludesWith;
  hasRequired_arrayIncludesWith = 1;
  function arrayIncludesWith(array, value, comparator) {
    var index = -1, length2 = array == null ? 0 : array.length;
    while (++index < length2) {
      if (comparator(value, array[index])) {
        return true;
      }
    }
    return false;
  }
  _arrayIncludesWith = arrayIncludesWith;
  return _arrayIncludesWith;
}
var _cacheHas;
var hasRequired_cacheHas;
function require_cacheHas() {
  if (hasRequired_cacheHas)
    return _cacheHas;
  hasRequired_cacheHas = 1;
  function cacheHas(cache, key) {
    return cache.has(key);
  }
  _cacheHas = cacheHas;
  return _cacheHas;
}
var _baseDifference;
var hasRequired_baseDifference;
function require_baseDifference() {
  if (hasRequired_baseDifference)
    return _baseDifference;
  hasRequired_baseDifference = 1;
  var SetCache = require_SetCache(), arrayIncludes = require_arrayIncludes(), arrayIncludesWith = require_arrayIncludesWith(), arrayMap2 = _arrayMap, baseUnary2 = require_baseUnary(), cacheHas = require_cacheHas();
  var LARGE_ARRAY_SIZE = 200;
  function baseDifference(array, values2, iteratee, comparator) {
    var index = -1, includes = arrayIncludes, isCommon = true, length2 = array.length, result = [], valuesLength = values2.length;
    if (!length2) {
      return result;
    }
    if (iteratee) {
      values2 = arrayMap2(values2, baseUnary2(iteratee));
    }
    if (comparator) {
      includes = arrayIncludesWith;
      isCommon = false;
    } else if (values2.length >= LARGE_ARRAY_SIZE) {
      includes = cacheHas;
      isCommon = false;
      values2 = new SetCache(values2);
    }
    outer:
      while (++index < length2) {
        var value = array[index], computed = iteratee == null ? value : iteratee(value);
        value = comparator || value !== 0 ? value : 0;
        if (isCommon && computed === computed) {
          var valuesIndex = valuesLength;
          while (valuesIndex--) {
            if (values2[valuesIndex] === computed) {
              continue outer;
            }
          }
          result.push(value);
        } else if (!includes(values2, computed, comparator)) {
          result.push(value);
        }
      }
    return result;
  }
  _baseDifference = baseDifference;
  return _baseDifference;
}
var _arrayPush;
var hasRequired_arrayPush;
function require_arrayPush() {
  if (hasRequired_arrayPush)
    return _arrayPush;
  hasRequired_arrayPush = 1;
  function arrayPush(array, values2) {
    var index = -1, length2 = values2.length, offset = array.length;
    while (++index < length2) {
      array[offset + index] = values2[index];
    }
    return array;
  }
  _arrayPush = arrayPush;
  return _arrayPush;
}
var _isFlattenable;
var hasRequired_isFlattenable;
function require_isFlattenable() {
  if (hasRequired_isFlattenable)
    return _isFlattenable;
  hasRequired_isFlattenable = 1;
  var Symbol2 = require_Symbol(), isArguments2 = isArguments_1, isArray2 = isArray_1;
  var spreadableSymbol = Symbol2 ? Symbol2.isConcatSpreadable : void 0;
  function isFlattenable(value) {
    return isArray2(value) || isArguments2(value) || !!(spreadableSymbol && value && value[spreadableSymbol]);
  }
  _isFlattenable = isFlattenable;
  return _isFlattenable;
}
var _baseFlatten;
var hasRequired_baseFlatten;
function require_baseFlatten() {
  if (hasRequired_baseFlatten)
    return _baseFlatten;
  hasRequired_baseFlatten = 1;
  var arrayPush = require_arrayPush(), isFlattenable = require_isFlattenable();
  function baseFlatten(array, depth, predicate, isStrict, result) {
    var index = -1, length2 = array.length;
    predicate || (predicate = isFlattenable);
    result || (result = []);
    while (++index < length2) {
      var value = array[index];
      if (depth > 0 && predicate(value)) {
        if (depth > 1) {
          baseFlatten(value, depth - 1, predicate, isStrict, result);
        } else {
          arrayPush(result, value);
        }
      } else if (!isStrict) {
        result[result.length] = value;
      }
    }
    return result;
  }
  _baseFlatten = baseFlatten;
  return _baseFlatten;
}
var identity_1;
var hasRequiredIdentity;
function requireIdentity() {
  if (hasRequiredIdentity)
    return identity_1;
  hasRequiredIdentity = 1;
  function identity(value) {
    return value;
  }
  identity_1 = identity;
  return identity_1;
}
var _apply;
var hasRequired_apply;
function require_apply() {
  if (hasRequired_apply)
    return _apply;
  hasRequired_apply = 1;
  function apply(func, thisArg, args) {
    switch (args.length) {
      case 0:
        return func.call(thisArg);
      case 1:
        return func.call(thisArg, args[0]);
      case 2:
        return func.call(thisArg, args[0], args[1]);
      case 3:
        return func.call(thisArg, args[0], args[1], args[2]);
    }
    return func.apply(thisArg, args);
  }
  _apply = apply;
  return _apply;
}
var _overRest;
var hasRequired_overRest;
function require_overRest() {
  if (hasRequired_overRest)
    return _overRest;
  hasRequired_overRest = 1;
  var apply = require_apply();
  var nativeMax = Math.max;
  function overRest(func, start, transform) {
    start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
    return function() {
      var args = arguments, index = -1, length2 = nativeMax(args.length - start, 0), array = Array(length2);
      while (++index < length2) {
        array[index] = args[start + index];
      }
      index = -1;
      var otherArgs = Array(start + 1);
      while (++index < start) {
        otherArgs[index] = args[index];
      }
      otherArgs[start] = transform(array);
      return apply(func, this, otherArgs);
    };
  }
  _overRest = overRest;
  return _overRest;
}
var constant_1;
var hasRequiredConstant;
function requireConstant() {
  if (hasRequiredConstant)
    return constant_1;
  hasRequiredConstant = 1;
  function constant(value) {
    return function() {
      return value;
    };
  }
  constant_1 = constant;
  return constant_1;
}
var _defineProperty;
var hasRequired_defineProperty;
function require_defineProperty() {
  if (hasRequired_defineProperty)
    return _defineProperty;
  hasRequired_defineProperty = 1;
  var getNative = require_getNative();
  var defineProperty = function() {
    try {
      var func = getNative(Object, "defineProperty");
      func({}, "", {});
      return func;
    } catch (e) {
    }
  }();
  _defineProperty = defineProperty;
  return _defineProperty;
}
var _baseSetToString;
var hasRequired_baseSetToString;
function require_baseSetToString() {
  if (hasRequired_baseSetToString)
    return _baseSetToString;
  hasRequired_baseSetToString = 1;
  var constant = requireConstant(), defineProperty = require_defineProperty(), identity = requireIdentity();
  var baseSetToString = !defineProperty ? identity : function(func, string) {
    return defineProperty(func, "toString", {
      "configurable": true,
      "enumerable": false,
      "value": constant(string),
      "writable": true
    });
  };
  _baseSetToString = baseSetToString;
  return _baseSetToString;
}
var _shortOut;
var hasRequired_shortOut;
function require_shortOut() {
  if (hasRequired_shortOut)
    return _shortOut;
  hasRequired_shortOut = 1;
  var HOT_COUNT = 800, HOT_SPAN = 16;
  var nativeNow = Date.now;
  function shortOut(func) {
    var count = 0, lastCalled = 0;
    return function() {
      var stamp = nativeNow(), remaining = HOT_SPAN - (stamp - lastCalled);
      lastCalled = stamp;
      if (remaining > 0) {
        if (++count >= HOT_COUNT) {
          return arguments[0];
        }
      } else {
        count = 0;
      }
      return func.apply(void 0, arguments);
    };
  }
  _shortOut = shortOut;
  return _shortOut;
}
var _setToString;
var hasRequired_setToString;
function require_setToString() {
  if (hasRequired_setToString)
    return _setToString;
  hasRequired_setToString = 1;
  var baseSetToString = require_baseSetToString(), shortOut = require_shortOut();
  var setToString = shortOut(baseSetToString);
  _setToString = setToString;
  return _setToString;
}
var _baseRest;
var hasRequired_baseRest;
function require_baseRest() {
  if (hasRequired_baseRest)
    return _baseRest;
  hasRequired_baseRest = 1;
  var identity = requireIdentity(), overRest = require_overRest(), setToString = require_setToString();
  function baseRest(func, start) {
    return setToString(overRest(func, start, identity), func + "");
  }
  _baseRest = baseRest;
  return _baseRest;
}
var isArrayLikeObject_1;
var hasRequiredIsArrayLikeObject;
function requireIsArrayLikeObject() {
  if (hasRequiredIsArrayLikeObject)
    return isArrayLikeObject_1;
  hasRequiredIsArrayLikeObject = 1;
  var isArrayLike2 = isArrayLike_1, isObjectLike2 = requireIsObjectLike();
  function isArrayLikeObject(value) {
    return isObjectLike2(value) && isArrayLike2(value);
  }
  isArrayLikeObject_1 = isArrayLikeObject;
  return isArrayLikeObject_1;
}
var difference_1;
var hasRequiredDifference;
function requireDifference() {
  if (hasRequiredDifference)
    return difference_1;
  hasRequiredDifference = 1;
  var baseDifference = require_baseDifference(), baseFlatten = require_baseFlatten(), baseRest = require_baseRest(), isArrayLikeObject = requireIsArrayLikeObject();
  var difference = baseRest(function(array, values2) {
    return isArrayLikeObject(array) ? baseDifference(array, baseFlatten(values2, 1, isArrayLikeObject, true)) : [];
  });
  difference_1 = difference;
  return difference_1;
}
var _arrayFilter;
var hasRequired_arrayFilter;
function require_arrayFilter() {
  if (hasRequired_arrayFilter)
    return _arrayFilter;
  hasRequired_arrayFilter = 1;
  function arrayFilter(array, predicate) {
    var index = -1, length2 = array == null ? 0 : array.length, resIndex = 0, result = [];
    while (++index < length2) {
      var value = array[index];
      if (predicate(value, index, array)) {
        result[resIndex++] = value;
      }
    }
    return result;
  }
  _arrayFilter = arrayFilter;
  return _arrayFilter;
}
var _createBaseFor;
var hasRequired_createBaseFor;
function require_createBaseFor() {
  if (hasRequired_createBaseFor)
    return _createBaseFor;
  hasRequired_createBaseFor = 1;
  function createBaseFor(fromRight) {
    return function(object, iteratee, keysFunc) {
      var index = -1, iterable = Object(object), props = keysFunc(object), length2 = props.length;
      while (length2--) {
        var key = props[fromRight ? length2 : ++index];
        if (iteratee(iterable[key], key, iterable) === false) {
          break;
        }
      }
      return object;
    };
  }
  _createBaseFor = createBaseFor;
  return _createBaseFor;
}
var _baseFor;
var hasRequired_baseFor;
function require_baseFor() {
  if (hasRequired_baseFor)
    return _baseFor;
  hasRequired_baseFor = 1;
  var createBaseFor = require_createBaseFor();
  var baseFor = createBaseFor();
  _baseFor = baseFor;
  return _baseFor;
}
var _baseForOwn;
var hasRequired_baseForOwn;
function require_baseForOwn() {
  if (hasRequired_baseForOwn)
    return _baseForOwn;
  hasRequired_baseForOwn = 1;
  var baseFor = require_baseFor(), keys2 = keys_1;
  function baseForOwn(object, iteratee) {
    return object && baseFor(object, iteratee, keys2);
  }
  _baseForOwn = baseForOwn;
  return _baseForOwn;
}
var _createBaseEach;
var hasRequired_createBaseEach;
function require_createBaseEach() {
  if (hasRequired_createBaseEach)
    return _createBaseEach;
  hasRequired_createBaseEach = 1;
  var isArrayLike2 = isArrayLike_1;
  function createBaseEach(eachFunc, fromRight) {
    return function(collection, iteratee) {
      if (collection == null) {
        return collection;
      }
      if (!isArrayLike2(collection)) {
        return eachFunc(collection, iteratee);
      }
      var length2 = collection.length, index = fromRight ? length2 : -1, iterable = Object(collection);
      while (fromRight ? index-- : ++index < length2) {
        if (iteratee(iterable[index], index, iterable) === false) {
          break;
        }
      }
      return collection;
    };
  }
  _createBaseEach = createBaseEach;
  return _createBaseEach;
}
var _baseEach;
var hasRequired_baseEach;
function require_baseEach() {
  if (hasRequired_baseEach)
    return _baseEach;
  hasRequired_baseEach = 1;
  var baseForOwn = require_baseForOwn(), createBaseEach = require_createBaseEach();
  var baseEach = createBaseEach(baseForOwn);
  _baseEach = baseEach;
  return _baseEach;
}
var _baseFilter;
var hasRequired_baseFilter;
function require_baseFilter() {
  if (hasRequired_baseFilter)
    return _baseFilter;
  hasRequired_baseFilter = 1;
  var baseEach = require_baseEach();
  function baseFilter(collection, predicate) {
    var result = [];
    baseEach(collection, function(value, index, collection2) {
      if (predicate(value, index, collection2)) {
        result.push(value);
      }
    });
    return result;
  }
  _baseFilter = baseFilter;
  return _baseFilter;
}
var _stackClear;
var hasRequired_stackClear;
function require_stackClear() {
  if (hasRequired_stackClear)
    return _stackClear;
  hasRequired_stackClear = 1;
  var ListCache = require_ListCache();
  function stackClear() {
    this.__data__ = new ListCache();
    this.size = 0;
  }
  _stackClear = stackClear;
  return _stackClear;
}
var _stackDelete;
var hasRequired_stackDelete;
function require_stackDelete() {
  if (hasRequired_stackDelete)
    return _stackDelete;
  hasRequired_stackDelete = 1;
  function stackDelete(key) {
    var data = this.__data__, result = data["delete"](key);
    this.size = data.size;
    return result;
  }
  _stackDelete = stackDelete;
  return _stackDelete;
}
var _stackGet;
var hasRequired_stackGet;
function require_stackGet() {
  if (hasRequired_stackGet)
    return _stackGet;
  hasRequired_stackGet = 1;
  function stackGet(key) {
    return this.__data__.get(key);
  }
  _stackGet = stackGet;
  return _stackGet;
}
var _stackHas;
var hasRequired_stackHas;
function require_stackHas() {
  if (hasRequired_stackHas)
    return _stackHas;
  hasRequired_stackHas = 1;
  function stackHas(key) {
    return this.__data__.has(key);
  }
  _stackHas = stackHas;
  return _stackHas;
}
var _stackSet;
var hasRequired_stackSet;
function require_stackSet() {
  if (hasRequired_stackSet)
    return _stackSet;
  hasRequired_stackSet = 1;
  var ListCache = require_ListCache(), Map2 = require_Map(), MapCache = require_MapCache();
  var LARGE_ARRAY_SIZE = 200;
  function stackSet(key, value) {
    var data = this.__data__;
    if (data instanceof ListCache) {
      var pairs = data.__data__;
      if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
        pairs.push([key, value]);
        this.size = ++data.size;
        return this;
      }
      data = this.__data__ = new MapCache(pairs);
    }
    data.set(key, value);
    this.size = data.size;
    return this;
  }
  _stackSet = stackSet;
  return _stackSet;
}
var _Stack;
var hasRequired_Stack;
function require_Stack() {
  if (hasRequired_Stack)
    return _Stack;
  hasRequired_Stack = 1;
  var ListCache = require_ListCache(), stackClear = require_stackClear(), stackDelete = require_stackDelete(), stackGet = require_stackGet(), stackHas = require_stackHas(), stackSet = require_stackSet();
  function Stack(entries) {
    var data = this.__data__ = new ListCache(entries);
    this.size = data.size;
  }
  Stack.prototype.clear = stackClear;
  Stack.prototype["delete"] = stackDelete;
  Stack.prototype.get = stackGet;
  Stack.prototype.has = stackHas;
  Stack.prototype.set = stackSet;
  _Stack = Stack;
  return _Stack;
}
var _arraySome;
var hasRequired_arraySome;
function require_arraySome() {
  if (hasRequired_arraySome)
    return _arraySome;
  hasRequired_arraySome = 1;
  function arraySome(array, predicate) {
    var index = -1, length2 = array == null ? 0 : array.length;
    while (++index < length2) {
      if (predicate(array[index], index, array)) {
        return true;
      }
    }
    return false;
  }
  _arraySome = arraySome;
  return _arraySome;
}
var _equalArrays;
var hasRequired_equalArrays;
function require_equalArrays() {
  if (hasRequired_equalArrays)
    return _equalArrays;
  hasRequired_equalArrays = 1;
  var SetCache = require_SetCache(), arraySome = require_arraySome(), cacheHas = require_cacheHas();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
    if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
      return false;
    }
    var arrStacked = stack.get(array);
    var othStacked = stack.get(other);
    if (arrStacked && othStacked) {
      return arrStacked == other && othStacked == array;
    }
    var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
    stack.set(array, other);
    stack.set(other, array);
    while (++index < arrLength) {
      var arrValue = array[index], othValue = other[index];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
      }
      if (compared !== void 0) {
        if (compared) {
          continue;
        }
        result = false;
        break;
      }
      if (seen) {
        if (!arraySome(other, function(othValue2, othIndex) {
          if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
            return seen.push(othIndex);
          }
        })) {
          result = false;
          break;
        }
      } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
        result = false;
        break;
      }
    }
    stack["delete"](array);
    stack["delete"](other);
    return result;
  }
  _equalArrays = equalArrays;
  return _equalArrays;
}
var _Uint8Array;
var hasRequired_Uint8Array;
function require_Uint8Array() {
  if (hasRequired_Uint8Array)
    return _Uint8Array;
  hasRequired_Uint8Array = 1;
  var root = require_root();
  var Uint8Array = root.Uint8Array;
  _Uint8Array = Uint8Array;
  return _Uint8Array;
}
var _mapToArray;
var hasRequired_mapToArray;
function require_mapToArray() {
  if (hasRequired_mapToArray)
    return _mapToArray;
  hasRequired_mapToArray = 1;
  function mapToArray(map) {
    var index = -1, result = Array(map.size);
    map.forEach(function(value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  _mapToArray = mapToArray;
  return _mapToArray;
}
var _setToArray;
var hasRequired_setToArray;
function require_setToArray() {
  if (hasRequired_setToArray)
    return _setToArray;
  hasRequired_setToArray = 1;
  function setToArray(set) {
    var index = -1, result = Array(set.size);
    set.forEach(function(value) {
      result[++index] = value;
    });
    return result;
  }
  _setToArray = setToArray;
  return _setToArray;
}
var _equalByTag;
var hasRequired_equalByTag;
function require_equalByTag() {
  if (hasRequired_equalByTag)
    return _equalByTag;
  hasRequired_equalByTag = 1;
  var Symbol2 = require_Symbol(), Uint8Array = require_Uint8Array(), eq = requireEq(), equalArrays = require_equalArrays(), mapToArray = require_mapToArray(), setToArray = require_setToArray();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  var boolTag2 = "[object Boolean]", dateTag2 = "[object Date]", errorTag2 = "[object Error]", mapTag2 = "[object Map]", numberTag2 = "[object Number]", regexpTag2 = "[object RegExp]", setTag2 = "[object Set]", stringTag2 = "[object String]", symbolTag = "[object Symbol]";
  var arrayBufferTag2 = "[object ArrayBuffer]", dataViewTag2 = "[object DataView]";
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
  function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
    switch (tag) {
      case dataViewTag2:
        if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
          return false;
        }
        object = object.buffer;
        other = other.buffer;
      case arrayBufferTag2:
        if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
          return false;
        }
        return true;
      case boolTag2:
      case dateTag2:
      case numberTag2:
        return eq(+object, +other);
      case errorTag2:
        return object.name == other.name && object.message == other.message;
      case regexpTag2:
      case stringTag2:
        return object == other + "";
      case mapTag2:
        var convert = mapToArray;
      case setTag2:
        var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
        convert || (convert = setToArray);
        if (object.size != other.size && !isPartial) {
          return false;
        }
        var stacked = stack.get(object);
        if (stacked) {
          return stacked == other;
        }
        bitmask |= COMPARE_UNORDERED_FLAG;
        stack.set(object, other);
        var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
        stack["delete"](object);
        return result;
      case symbolTag:
        if (symbolValueOf) {
          return symbolValueOf.call(object) == symbolValueOf.call(other);
        }
    }
    return false;
  }
  _equalByTag = equalByTag;
  return _equalByTag;
}
var _baseGetAllKeys;
var hasRequired_baseGetAllKeys;
function require_baseGetAllKeys() {
  if (hasRequired_baseGetAllKeys)
    return _baseGetAllKeys;
  hasRequired_baseGetAllKeys = 1;
  var arrayPush = require_arrayPush(), isArray2 = isArray_1;
  function baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return isArray2(object) ? result : arrayPush(result, symbolsFunc(object));
  }
  _baseGetAllKeys = baseGetAllKeys;
  return _baseGetAllKeys;
}
var stubArray_1;
var hasRequiredStubArray;
function requireStubArray() {
  if (hasRequiredStubArray)
    return stubArray_1;
  hasRequiredStubArray = 1;
  function stubArray() {
    return [];
  }
  stubArray_1 = stubArray;
  return stubArray_1;
}
var _getSymbols;
var hasRequired_getSymbols;
function require_getSymbols() {
  if (hasRequired_getSymbols)
    return _getSymbols;
  hasRequired_getSymbols = 1;
  var arrayFilter = require_arrayFilter(), stubArray = requireStubArray();
  var objectProto2 = Object.prototype;
  var propertyIsEnumerable2 = objectProto2.propertyIsEnumerable;
  var nativeGetSymbols = Object.getOwnPropertySymbols;
  var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
    if (object == null) {
      return [];
    }
    object = Object(object);
    return arrayFilter(nativeGetSymbols(object), function(symbol) {
      return propertyIsEnumerable2.call(object, symbol);
    });
  };
  _getSymbols = getSymbols;
  return _getSymbols;
}
var _getAllKeys;
var hasRequired_getAllKeys;
function require_getAllKeys() {
  if (hasRequired_getAllKeys)
    return _getAllKeys;
  hasRequired_getAllKeys = 1;
  var baseGetAllKeys = require_baseGetAllKeys(), getSymbols = require_getSymbols(), keys2 = keys_1;
  function getAllKeys(object) {
    return baseGetAllKeys(object, keys2, getSymbols);
  }
  _getAllKeys = getAllKeys;
  return _getAllKeys;
}
var _equalObjects;
var hasRequired_equalObjects;
function require_equalObjects() {
  if (hasRequired_equalObjects)
    return _equalObjects;
  hasRequired_equalObjects = 1;
  var getAllKeys = require_getAllKeys();
  var COMPARE_PARTIAL_FLAG = 1;
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
    var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
    if (objLength != othLength && !isPartial) {
      return false;
    }
    var index = objLength;
    while (index--) {
      var key = objProps[index];
      if (!(isPartial ? key in other : hasOwnProperty2.call(other, key))) {
        return false;
      }
    }
    var objStacked = stack.get(object);
    var othStacked = stack.get(other);
    if (objStacked && othStacked) {
      return objStacked == other && othStacked == object;
    }
    var result = true;
    stack.set(object, other);
    stack.set(other, object);
    var skipCtor = isPartial;
    while (++index < objLength) {
      key = objProps[index];
      var objValue = object[key], othValue = other[key];
      if (customizer) {
        var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
      }
      if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
        result = false;
        break;
      }
      skipCtor || (skipCtor = key == "constructor");
    }
    if (result && !skipCtor) {
      var objCtor = object.constructor, othCtor = other.constructor;
      if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
        result = false;
      }
    }
    stack["delete"](object);
    stack["delete"](other);
    return result;
  }
  _equalObjects = equalObjects;
  return _equalObjects;
}
var _DataView;
var hasRequired_DataView;
function require_DataView() {
  if (hasRequired_DataView)
    return _DataView;
  hasRequired_DataView = 1;
  var getNative = require_getNative(), root = require_root();
  var DataView = getNative(root, "DataView");
  _DataView = DataView;
  return _DataView;
}
var _Promise;
var hasRequired_Promise;
function require_Promise() {
  if (hasRequired_Promise)
    return _Promise;
  hasRequired_Promise = 1;
  var getNative = require_getNative(), root = require_root();
  var Promise2 = getNative(root, "Promise");
  _Promise = Promise2;
  return _Promise;
}
var _Set;
var hasRequired_Set;
function require_Set() {
  if (hasRequired_Set)
    return _Set;
  hasRequired_Set = 1;
  var getNative = require_getNative(), root = require_root();
  var Set2 = getNative(root, "Set");
  _Set = Set2;
  return _Set;
}
var _WeakMap;
var hasRequired_WeakMap;
function require_WeakMap() {
  if (hasRequired_WeakMap)
    return _WeakMap;
  hasRequired_WeakMap = 1;
  var getNative = require_getNative(), root = require_root();
  var WeakMap2 = getNative(root, "WeakMap");
  _WeakMap = WeakMap2;
  return _WeakMap;
}
var _getTag;
var hasRequired_getTag;
function require_getTag() {
  if (hasRequired_getTag)
    return _getTag;
  hasRequired_getTag = 1;
  var DataView = require_DataView(), Map2 = require_Map(), Promise2 = require_Promise(), Set2 = require_Set(), WeakMap2 = require_WeakMap(), baseGetTag2 = require_baseGetTag(), toSource = require_toSource();
  var mapTag2 = "[object Map]", objectTag2 = "[object Object]", promiseTag = "[object Promise]", setTag2 = "[object Set]", weakMapTag2 = "[object WeakMap]";
  var dataViewTag2 = "[object DataView]";
  var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map2), promiseCtorString = toSource(Promise2), setCtorString = toSource(Set2), weakMapCtorString = toSource(WeakMap2);
  var getTag = baseGetTag2;
  if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag2 || Map2 && getTag(new Map2()) != mapTag2 || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set2 && getTag(new Set2()) != setTag2 || WeakMap2 && getTag(new WeakMap2()) != weakMapTag2) {
    getTag = function(value) {
      var result = baseGetTag2(value), Ctor = result == objectTag2 ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
      if (ctorString) {
        switch (ctorString) {
          case dataViewCtorString:
            return dataViewTag2;
          case mapCtorString:
            return mapTag2;
          case promiseCtorString:
            return promiseTag;
          case setCtorString:
            return setTag2;
          case weakMapCtorString:
            return weakMapTag2;
        }
      }
      return result;
    };
  }
  _getTag = getTag;
  return _getTag;
}
var _baseIsEqualDeep;
var hasRequired_baseIsEqualDeep;
function require_baseIsEqualDeep() {
  if (hasRequired_baseIsEqualDeep)
    return _baseIsEqualDeep;
  hasRequired_baseIsEqualDeep = 1;
  var Stack = require_Stack(), equalArrays = require_equalArrays(), equalByTag = require_equalByTag(), equalObjects = require_equalObjects(), getTag = require_getTag(), isArray2 = isArray_1, isBuffer2 = isBufferExports, isTypedArray2 = isTypedArray_1;
  var COMPARE_PARTIAL_FLAG = 1;
  var argsTag2 = "[object Arguments]", arrayTag2 = "[object Array]", objectTag2 = "[object Object]";
  var objectProto2 = Object.prototype;
  var hasOwnProperty2 = objectProto2.hasOwnProperty;
  function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
    var objIsArr = isArray2(object), othIsArr = isArray2(other), objTag = objIsArr ? arrayTag2 : getTag(object), othTag = othIsArr ? arrayTag2 : getTag(other);
    objTag = objTag == argsTag2 ? objectTag2 : objTag;
    othTag = othTag == argsTag2 ? objectTag2 : othTag;
    var objIsObj = objTag == objectTag2, othIsObj = othTag == objectTag2, isSameTag = objTag == othTag;
    if (isSameTag && isBuffer2(object)) {
      if (!isBuffer2(other)) {
        return false;
      }
      objIsArr = true;
      objIsObj = false;
    }
    if (isSameTag && !objIsObj) {
      stack || (stack = new Stack());
      return objIsArr || isTypedArray2(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
    }
    if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
      var objIsWrapped = objIsObj && hasOwnProperty2.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty2.call(other, "__wrapped__");
      if (objIsWrapped || othIsWrapped) {
        var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
        stack || (stack = new Stack());
        return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
      }
    }
    if (!isSameTag) {
      return false;
    }
    stack || (stack = new Stack());
    return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
  }
  _baseIsEqualDeep = baseIsEqualDeep;
  return _baseIsEqualDeep;
}
var _baseIsEqual;
var hasRequired_baseIsEqual;
function require_baseIsEqual() {
  if (hasRequired_baseIsEqual)
    return _baseIsEqual;
  hasRequired_baseIsEqual = 1;
  var baseIsEqualDeep = require_baseIsEqualDeep(), isObjectLike2 = requireIsObjectLike();
  function baseIsEqual(value, other, bitmask, customizer, stack) {
    if (value === other) {
      return true;
    }
    if (value == null || other == null || !isObjectLike2(value) && !isObjectLike2(other)) {
      return value !== value && other !== other;
    }
    return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
  }
  _baseIsEqual = baseIsEqual;
  return _baseIsEqual;
}
var _baseIsMatch;
var hasRequired_baseIsMatch;
function require_baseIsMatch() {
  if (hasRequired_baseIsMatch)
    return _baseIsMatch;
  hasRequired_baseIsMatch = 1;
  var Stack = require_Stack(), baseIsEqual = require_baseIsEqual();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function baseIsMatch(object, source, matchData, customizer) {
    var index = matchData.length, length2 = index, noCustomizer = !customizer;
    if (object == null) {
      return !length2;
    }
    object = Object(object);
    while (index--) {
      var data = matchData[index];
      if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
        return false;
      }
    }
    while (++index < length2) {
      data = matchData[index];
      var key = data[0], objValue = object[key], srcValue = data[1];
      if (noCustomizer && data[2]) {
        if (objValue === void 0 && !(key in object)) {
          return false;
        }
      } else {
        var stack = new Stack();
        if (customizer) {
          var result = customizer(objValue, srcValue, key, object, source, stack);
        }
        if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
          return false;
        }
      }
    }
    return true;
  }
  _baseIsMatch = baseIsMatch;
  return _baseIsMatch;
}
var _isStrictComparable;
var hasRequired_isStrictComparable;
function require_isStrictComparable() {
  if (hasRequired_isStrictComparable)
    return _isStrictComparable;
  hasRequired_isStrictComparable = 1;
  var isObject2 = requireIsObject();
  function isStrictComparable(value) {
    return value === value && !isObject2(value);
  }
  _isStrictComparable = isStrictComparable;
  return _isStrictComparable;
}
var _getMatchData;
var hasRequired_getMatchData;
function require_getMatchData() {
  if (hasRequired_getMatchData)
    return _getMatchData;
  hasRequired_getMatchData = 1;
  var isStrictComparable = require_isStrictComparable(), keys2 = keys_1;
  function getMatchData(object) {
    var result = keys2(object), length2 = result.length;
    while (length2--) {
      var key = result[length2], value = object[key];
      result[length2] = [key, value, isStrictComparable(value)];
    }
    return result;
  }
  _getMatchData = getMatchData;
  return _getMatchData;
}
var _matchesStrictComparable;
var hasRequired_matchesStrictComparable;
function require_matchesStrictComparable() {
  if (hasRequired_matchesStrictComparable)
    return _matchesStrictComparable;
  hasRequired_matchesStrictComparable = 1;
  function matchesStrictComparable(key, srcValue) {
    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
    };
  }
  _matchesStrictComparable = matchesStrictComparable;
  return _matchesStrictComparable;
}
var _baseMatches;
var hasRequired_baseMatches;
function require_baseMatches() {
  if (hasRequired_baseMatches)
    return _baseMatches;
  hasRequired_baseMatches = 1;
  var baseIsMatch = require_baseIsMatch(), getMatchData = require_getMatchData(), matchesStrictComparable = require_matchesStrictComparable();
  function baseMatches(source) {
    var matchData = getMatchData(source);
    if (matchData.length == 1 && matchData[0][2]) {
      return matchesStrictComparable(matchData[0][0], matchData[0][1]);
    }
    return function(object) {
      return object === source || baseIsMatch(object, source, matchData);
    };
  }
  _baseMatches = baseMatches;
  return _baseMatches;
}
var _isKey;
var hasRequired_isKey;
function require_isKey() {
  if (hasRequired_isKey)
    return _isKey;
  hasRequired_isKey = 1;
  var isArray2 = isArray_1, isSymbol = requireIsSymbol();
  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\\1)[^\\]|\\.)*?\\1)\]/, reIsPlainProp = /^\w*$/;
  function isKey(value, object) {
    if (isArray2(value)) {
      return false;
    }
    var type = typeof value;
    if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
      return true;
    }
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
  }
  _isKey = isKey;
  return _isKey;
}
var memoize_1;
var hasRequiredMemoize;
function requireMemoize() {
  if (hasRequiredMemoize)
    return memoize_1;
  hasRequiredMemoize = 1;
  var MapCache = require_MapCache();
  var FUNC_ERROR_TEXT = "Expected a function";
  function memoize(func, resolver) {
    if (typeof func != "function" || resolver != null && typeof resolver != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    var memoized = function() {
      var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
      if (cache.has(key)) {
        return cache.get(key);
      }
      var result = func.apply(this, args);
      memoized.cache = cache.set(key, result) || cache;
      return result;
    };
    memoized.cache = new (memoize.Cache || MapCache)();
    return memoized;
  }
  memoize.Cache = MapCache;
  memoize_1 = memoize;
  return memoize_1;
}
var _memoizeCapped;
var hasRequired_memoizeCapped;
function require_memoizeCapped() {
  if (hasRequired_memoizeCapped)
    return _memoizeCapped;
  hasRequired_memoizeCapped = 1;
  var memoize = requireMemoize();
  var MAX_MEMOIZE_SIZE = 500;
  function memoizeCapped(func) {
    var result = memoize(func, function(key) {
      if (cache.size === MAX_MEMOIZE_SIZE) {
        cache.clear();
      }
      return key;
    });
    var cache = result.cache;
    return result;
  }
  _memoizeCapped = memoizeCapped;
  return _memoizeCapped;
}
var _stringToPath;
var hasRequired_stringToPath;
function require_stringToPath() {
  if (hasRequired_stringToPath)
    return _stringToPath;
  hasRequired_stringToPath = 1;
  var memoizeCapped = require_memoizeCapped();
  var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\\2)[^\\]|\\.)*?)\\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
  var reEscapeChar = /\\(\\)?/g;
  var stringToPath = memoizeCapped(function(string) {
    var result = [];
    if (string.charCodeAt(0) === 46) {
      result.push("");
    }
    string.replace(rePropName, function(match2, number, quote, subString) {
      result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match2);
    });
    return result;
  });
  _stringToPath = stringToPath;
  return _stringToPath;
}
var _baseToString;
var hasRequired_baseToString;
function require_baseToString() {
  if (hasRequired_baseToString)
    return _baseToString;
  hasRequired_baseToString = 1;
  var Symbol2 = require_Symbol(), arrayMap2 = _arrayMap, isArray2 = isArray_1, isSymbol = requireIsSymbol();
  var INFINITY = 1 / 0;
  var symbolProto = Symbol2 ? Symbol2.prototype : void 0, symbolToString = symbolProto ? symbolProto.toString : void 0;
  function baseToString(value) {
    if (typeof value == "string") {
      return value;
    }
    if (isArray2(value)) {
      return arrayMap2(value, baseToString) + "";
    }
    if (isSymbol(value)) {
      return symbolToString ? symbolToString.call(value) : "";
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  _baseToString = baseToString;
  return _baseToString;
}
var toString_1;
var hasRequiredToString;
function requireToString() {
  if (hasRequiredToString)
    return toString_1;
  hasRequiredToString = 1;
  var baseToString = require_baseToString();
  function toString(value) {
    return value == null ? "" : baseToString(value);
  }
  toString_1 = toString;
  return toString_1;
}
var _castPath;
var hasRequired_castPath;
function require_castPath() {
  if (hasRequired_castPath)
    return _castPath;
  hasRequired_castPath = 1;
  var isArray2 = isArray_1, isKey = require_isKey(), stringToPath = require_stringToPath(), toString = requireToString();
  function castPath(value, object) {
    if (isArray2(value)) {
      return value;
    }
    return isKey(value, object) ? [value] : stringToPath(toString(value));
  }
  _castPath = castPath;
  return _castPath;
}
var _toKey;
var hasRequired_toKey;
function require_toKey() {
  if (hasRequired_toKey)
    return _toKey;
  hasRequired_toKey = 1;
  var isSymbol = requireIsSymbol();
  var INFINITY = 1 / 0;
  function toKey(value) {
    if (typeof value == "string" || isSymbol(value)) {
      return value;
    }
    var result = value + "";
    return result == "0" && 1 / value == -INFINITY ? "-0" : result;
  }
  _toKey = toKey;
  return _toKey;
}
var _baseGet;
var hasRequired_baseGet;
function require_baseGet() {
  if (hasRequired_baseGet)
    return _baseGet;
  hasRequired_baseGet = 1;
  var castPath = require_castPath(), toKey = require_toKey();
  function baseGet(object, path) {
    path = castPath(path, object);
    var index = 0, length2 = path.length;
    while (object != null && index < length2) {
      object = object[toKey(path[index++])];
    }
    return index && index == length2 ? object : void 0;
  }
  _baseGet = baseGet;
  return _baseGet;
}
var get_1;
var hasRequiredGet;
function requireGet() {
  if (hasRequiredGet)
    return get_1;
  hasRequiredGet = 1;
  var baseGet = require_baseGet();
  function get(object, path, defaultValue) {
    var result = object == null ? void 0 : baseGet(object, path);
    return result === void 0 ? defaultValue : result;
  }
  get_1 = get;
  return get_1;
}
var _baseHasIn;
var hasRequired_baseHasIn;
function require_baseHasIn() {
  if (hasRequired_baseHasIn)
    return _baseHasIn;
  hasRequired_baseHasIn = 1;
  function baseHasIn(object, key) {
    return object != null && key in Object(object);
  }
  _baseHasIn = baseHasIn;
  return _baseHasIn;
}
var _hasPath;
var hasRequired_hasPath;
function require_hasPath() {
  if (hasRequired_hasPath)
    return _hasPath;
  hasRequired_hasPath = 1;
  var castPath = require_castPath(), isArguments2 = isArguments_1, isArray2 = isArray_1, isIndex2 = require_isIndex(), isLength2 = isLength_1, toKey = require_toKey();
  function hasPath(object, path, hasFunc) {
    path = castPath(path, object);
    var index = -1, length2 = path.length, result = false;
    while (++index < length2) {
      var key = toKey(path[index]);
      if (!(result = object != null && hasFunc(object, key))) {
        break;
      }
      object = object[key];
    }
    if (result || ++index != length2) {
      return result;
    }
    length2 = object == null ? 0 : object.length;
    return !!length2 && isLength2(length2) && isIndex2(key, length2) && (isArray2(object) || isArguments2(object));
  }
  _hasPath = hasPath;
  return _hasPath;
}
var hasIn_1;
var hasRequiredHasIn;
function requireHasIn() {
  if (hasRequiredHasIn)
    return hasIn_1;
  hasRequiredHasIn = 1;
  var baseHasIn = require_baseHasIn(), hasPath = require_hasPath();
  function hasIn(object, path) {
    return object != null && hasPath(object, path, baseHasIn);
  }
  hasIn_1 = hasIn;
  return hasIn_1;
}
var _baseMatchesProperty;
var hasRequired_baseMatchesProperty;
function require_baseMatchesProperty() {
  if (hasRequired_baseMatchesProperty)
    return _baseMatchesProperty;
  hasRequired_baseMatchesProperty = 1;
  var baseIsEqual = require_baseIsEqual(), get = requireGet(), hasIn = requireHasIn(), isKey = require_isKey(), isStrictComparable = require_isStrictComparable(), matchesStrictComparable = require_matchesStrictComparable(), toKey = require_toKey();
  var COMPARE_PARTIAL_FLAG = 1, COMPARE_UNORDERED_FLAG = 2;
  function baseMatchesProperty(path, srcValue) {
    if (isKey(path) && isStrictComparable(srcValue)) {
      return matchesStrictComparable(toKey(path), srcValue);
    }
    return function(object) {
      var objValue = get(object, path);
      return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
    };
  }
  _baseMatchesProperty = baseMatchesProperty;
  return _baseMatchesProperty;
}
var _baseProperty;
var hasRequired_baseProperty;
function require_baseProperty() {
  if (hasRequired_baseProperty)
    return _baseProperty;
  hasRequired_baseProperty = 1;
  function baseProperty(key) {
    return function(object) {
      return object == null ? void 0 : object[key];
    };
  }
  _baseProperty = baseProperty;
  return _baseProperty;
}
var _basePropertyDeep;
var hasRequired_basePropertyDeep;
function require_basePropertyDeep() {
  if (hasRequired_basePropertyDeep)
    return _basePropertyDeep;
  hasRequired_basePropertyDeep = 1;
  var baseGet = require_baseGet();
  function basePropertyDeep(path) {
    return function(object) {
      return baseGet(object, path);
    };
  }
  _basePropertyDeep = basePropertyDeep;
  return _basePropertyDeep;
}
var property_1;
var hasRequiredProperty;
function requireProperty() {
  if (hasRequiredProperty)
    return property_1;
  hasRequiredProperty = 1;
  var baseProperty = require_baseProperty(), basePropertyDeep = require_basePropertyDeep(), isKey = require_isKey(), toKey = require_toKey();
  function property(path) {
    return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
  }
  property_1 = property;
  return property_1;
}
var _baseIteratee;
var hasRequired_baseIteratee;
function require_baseIteratee() {
  if (hasRequired_baseIteratee)
    return _baseIteratee;
  hasRequired_baseIteratee = 1;
  var baseMatches = require_baseMatches(), baseMatchesProperty = require_baseMatchesProperty(), identity = requireIdentity(), isArray2 = isArray_1, property = requireProperty();
  function baseIteratee(value) {
    if (typeof value == "function") {
      return value;
    }
    if (value == null) {
      return identity;
    }
    if (typeof value == "object") {
      return isArray2(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
    }
    return property(value);
  }
  _baseIteratee = baseIteratee;
  return _baseIteratee;
}
var filter_1;
var hasRequiredFilter;
function requireFilter() {
  if (hasRequiredFilter)
    return filter_1;
  hasRequiredFilter = 1;
  var arrayFilter = require_arrayFilter(), baseFilter = require_baseFilter(), baseIteratee = require_baseIteratee(), isArray2 = isArray_1;
  function filter2(collection, predicate) {
    var func = isArray2(collection) ? arrayFilter : baseFilter;
    return func(collection, baseIteratee(predicate, 3));
  }
  filter_1 = filter2;
  return filter_1;
}
var _baseFindKey;
var hasRequired_baseFindKey;
function require_baseFindKey() {
  if (hasRequired_baseFindKey)
    return _baseFindKey;
  hasRequired_baseFindKey = 1;
  function baseFindKey(collection, predicate, eachFunc) {
    var result;
    eachFunc(collection, function(value, key, collection2) {
      if (predicate(value, key, collection2)) {
        result = key;
        return false;
      }
    });
    return result;
  }
  _baseFindKey = baseFindKey;
  return _baseFindKey;
}
var findKey_1;
var hasRequiredFindKey;
function requireFindKey() {
  if (hasRequiredFindKey)
    return findKey_1;
  hasRequiredFindKey = 1;
  var baseFindKey = require_baseFindKey(), baseForOwn = require_baseForOwn(), baseIteratee = require_baseIteratee();
  function findKey(object, predicate) {
    return baseFindKey(object, baseIteratee(predicate, 3), baseForOwn);
  }
  findKey_1 = findKey;
  return findKey_1;
}
var head_1;
var hasRequiredHead;
function requireHead() {
  if (hasRequiredHead)
    return head_1;
  hasRequiredHead = 1;
  function head(array) {
    return array && array.length ? array[0] : void 0;
  }
  head_1 = head;
  return head_1;
}
var first;
var hasRequiredFirst;
function requireFirst() {
  if (hasRequiredFirst)
    return first;
  hasRequiredFirst = 1;
  first = requireHead();
  return first;
}
var _arrayEach;
var hasRequired_arrayEach;
function require_arrayEach() {
  if (hasRequired_arrayEach)
    return _arrayEach;
  hasRequired_arrayEach = 1;
  function arrayEach(array, iteratee) {
    var index = -1, length2 = array == null ? 0 : array.length;
    while (++index < length2) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  _arrayEach = arrayEach;
  return _arrayEach;
}
var _castFunction;
var hasRequired_castFunction;
function require_castFunction() {
  if (hasRequired_castFunction)
    return _castFunction;
  hasRequired_castFunction = 1;
  var identity = requireIdentity();
  function castFunction(value) {
    return typeof value == "function" ? value : identity;
  }
  _castFunction = castFunction;
  return _castFunction;
}
var forEach_1;
var hasRequiredForEach;
function requireForEach() {
  if (hasRequiredForEach)
    return forEach_1;
  hasRequiredForEach = 1;
  var arrayEach = require_arrayEach(), baseEach = require_baseEach(), castFunction = require_castFunction(), isArray2 = isArray_1;
  function forEach(collection, iteratee) {
    var func = isArray2(collection) ? arrayEach : baseEach;
    return func(collection, castFunction(iteratee));
  }
  forEach_1 = forEach;
  return forEach_1;
}
var forOwn_1;
var hasRequiredForOwn;
function requireForOwn() {
  if (hasRequiredForOwn)
    return forOwn_1;
  hasRequiredForOwn = 1;
  var baseForOwn = require_baseForOwn(), castFunction = require_castFunction();
  function forOwn(object, iteratee) {
    return object && baseForOwn(object, castFunction(iteratee));
  }
  forOwn_1 = forOwn;
  return forOwn_1;
}
var noop_1;
var hasRequiredNoop;
function requireNoop() {
  if (hasRequiredNoop)
    return noop_1;
  hasRequiredNoop = 1;
  function noop() {
  }
  noop_1 = noop;
  return noop_1;
}
var _baseMap;
var hasRequired_baseMap;
function require_baseMap() {
  if (hasRequired_baseMap)
    return _baseMap;
  hasRequired_baseMap = 1;
  var baseEach = require_baseEach(), isArrayLike2 = isArrayLike_1;
  function baseMap(collection, iteratee) {
    var index = -1, result = isArrayLike2(collection) ? Array(collection.length) : [];
    baseEach(collection, function(value, key, collection2) {
      result[++index] = iteratee(value, key, collection2);
    });
    return result;
  }
  _baseMap = baseMap;
  return _baseMap;
}
var _baseSortBy;
var hasRequired_baseSortBy;
function require_baseSortBy() {
  if (hasRequired_baseSortBy)
    return _baseSortBy;
  hasRequired_baseSortBy = 1;
  function baseSortBy(array, comparer) {
    var length2 = array.length;
    array.sort(comparer);
    while (length2--) {
      array[length2] = array[length2].value;
    }
    return array;
  }
  _baseSortBy = baseSortBy;
  return _baseSortBy;
}
var _compareAscending;
var hasRequired_compareAscending;
function require_compareAscending() {
  if (hasRequired_compareAscending)
    return _compareAscending;
  hasRequired_compareAscending = 1;
  var isSymbol = requireIsSymbol();
  function compareAscending(value, other) {
    if (value !== other) {
      var valIsDefined = value !== void 0, valIsNull = value === null, valIsReflexive = value === value, valIsSymbol = isSymbol(value);
      var othIsDefined = other !== void 0, othIsNull = other === null, othIsReflexive = other === other, othIsSymbol = isSymbol(other);
      if (!othIsNull && !othIsSymbol && !valIsSymbol && value > other || valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol || valIsNull && othIsDefined && othIsReflexive || !valIsDefined && othIsReflexive || !valIsReflexive) {
        return 1;
      }
      if (!valIsNull && !valIsSymbol && !othIsSymbol && value < other || othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol || othIsNull && valIsDefined && valIsReflexive || !othIsDefined && valIsReflexive || !othIsReflexive) {
        return -1;
      }
    }
    return 0;
  }
  _compareAscending = compareAscending;
  return _compareAscending;
}
var _compareMultiple;
var hasRequired_compareMultiple;
function require_compareMultiple() {
  if (hasRequired_compareMultiple)
    return _compareMultiple;
  hasRequired_compareMultiple = 1;
  var compareAscending = require_compareAscending();
  function compareMultiple(object, other, orders) {
    var index = -1, objCriteria = object.criteria, othCriteria = other.criteria, length2 = objCriteria.length, ordersLength = orders.length;
    while (++index < length2) {
      var result = compareAscending(objCriteria[index], othCriteria[index]);
      if (result) {
        if (index >= ordersLength) {
          return result;
        }
        var order = orders[index];
        return result * (order == "desc" ? -1 : 1);
      }
    }
    return object.index - other.index;
  }
  _compareMultiple = compareMultiple;
  return _compareMultiple;
}
var _baseOrderBy;
var hasRequired_baseOrderBy;
function require_baseOrderBy() {
  if (hasRequired_baseOrderBy)
    return _baseOrderBy;
  hasRequired_baseOrderBy = 1;
  var arrayMap2 = _arrayMap, baseGet = require_baseGet(), baseIteratee = require_baseIteratee(), baseMap = require_baseMap(), baseSortBy = require_baseSortBy(), baseUnary2 = require_baseUnary(), compareMultiple = require_compareMultiple(), identity = requireIdentity(), isArray2 = isArray_1;
  function baseOrderBy(collection, iteratees, orders) {
    if (iteratees.length) {
      iteratees = arrayMap2(iteratees, function(iteratee) {
        if (isArray2(iteratee)) {
          return function(value) {
            return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
          };
        }
        return iteratee;
      });
    } else {
      iteratees = [identity];
    }
    var index = -1;
    iteratees = arrayMap2(iteratees, baseUnary2(baseIteratee));
    var result = baseMap(collection, function(value, key, collection2) {
      var criteria = arrayMap2(iteratees, function(iteratee) {
        return iteratee(value);
      });
      return { "criteria": criteria, "index": ++index, "value": value };
    });
    return baseSortBy(result, function(object, other) {
      return compareMultiple(object, other, orders);
    });
  }
  _baseOrderBy = baseOrderBy;
  return _baseOrderBy;
}
var _isIterateeCall;
var hasRequired_isIterateeCall;
function require_isIterateeCall() {
  if (hasRequired_isIterateeCall)
    return _isIterateeCall;
  hasRequired_isIterateeCall = 1;
  var eq = requireEq(), isArrayLike2 = isArrayLike_1, isIndex2 = require_isIndex(), isObject2 = requireIsObject();
  function isIterateeCall(value, index, object) {
    if (!isObject2(object)) {
      return false;
    }
    var type = typeof index;
    if (type == "number" ? isArrayLike2(object) && isIndex2(index, object.length) : type == "string" && index in object) {
      return eq(object[index], value);
    }
    return false;
  }
  _isIterateeCall = isIterateeCall;
  return _isIterateeCall;
}
var sortBy_1;
var hasRequiredSortBy;
function requireSortBy() {
  if (hasRequiredSortBy)
    return sortBy_1;
  hasRequiredSortBy = 1;
  var baseFlatten = require_baseFlatten(), baseOrderBy = require_baseOrderBy(), baseRest = require_baseRest(), isIterateeCall = require_isIterateeCall();
  var sortBy = baseRest(function(collection, iteratees) {
    if (collection == null) {
      return [];
    }
    var length2 = iteratees.length;
    if (length2 > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
      iteratees = [];
    } else if (length2 > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
      iteratees = [iteratees[0]];
    }
    return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
  });
  sortBy_1 = sortBy;
  return sortBy_1;
}
var throttle_1;
var hasRequiredThrottle;
function requireThrottle() {
  if (hasRequiredThrottle)
    return throttle_1;
  hasRequiredThrottle = 1;
  var debounce = requireDebounce(), isObject2 = requireIsObject();
  var FUNC_ERROR_TEXT = "Expected a function";
  function throttle(func, wait, options) {
    var leading = true, trailing = true;
    if (typeof func != "function") {
      throw new TypeError(FUNC_ERROR_TEXT);
    }
    if (isObject2(options)) {
      leading = "leading" in options ? !!options.leading : leading;
      trailing = "trailing" in options ? !!options.trailing : trailing;
    }
    return debounce(func, wait, {
      "leading": leading,
      "maxWait": wait,
      "trailing": trailing
    });
  }
  throttle_1 = throttle;
  return throttle_1;
}
var uniqueId_1;
var hasRequiredUniqueId;
function requireUniqueId() {
  if (hasRequiredUniqueId)
    return uniqueId_1;
  hasRequiredUniqueId = 1;
  var toString = requireToString();
  var idCounter = 0;
  function uniqueId(prefix2) {
    var id2 = ++idCounter;
    return toString(prefix2) + id2;
  }
  uniqueId_1 = uniqueId;
  return uniqueId_1;
}
(function(module, exports) {
  !function(e, t2) {
    module.exports = t2(requireDebounce(), requireDifference(), requireFilter(), requireFindKey(), requireFirst(), requireForEach(), requireForOwn(), requireNoop(), requireSortBy(), requireThrottle(), requireUniqueId(), reactExports);
  }(commonjsGlobal, function(e, t2, o, s, i, n2, r2, a, u2, c, l2, d) {
    return function() {
      var h = { 654: function(e2, t3, o2) {
        var s2, i2 = this && this.__assign || function() {
          return i2 = Object.assign || function(e3) {
            for (var t4, o3 = 1, s3 = arguments.length; o3 < s3; o3++)
              for (var i3 in t4 = arguments[o3])
                Object.prototype.hasOwnProperty.call(t4, i3) && (e3[i3] = t4[i3]);
            return e3;
          }, i2.apply(this, arguments);
        }, n3 = this && this.__createBinding || (Object.create ? function(e3, t4, o3, s3) {
          void 0 === s3 && (s3 = o3);
          var i3 = Object.getOwnPropertyDescriptor(t4, o3);
          i3 && !("get" in i3 ? !t4.__esModule : i3.writable || i3.configurable) || (i3 = { enumerable: true, get: function() {
            return t4[o3];
          } }), Object.defineProperty(e3, s3, i3);
        } : function(e3, t4, o3, s3) {
          void 0 === s3 && (s3 = o3), e3[s3] = t4[o3];
        }), r3 = this && this.__setModuleDefault || (Object.create ? function(e3, t4) {
          Object.defineProperty(e3, "default", { enumerable: true, value: t4 });
        } : function(e3, t4) {
          e3.default = t4;
        }), a2 = this && this.__importStar || function(e3) {
          if (e3 && e3.__esModule)
            return e3;
          var t4 = {};
          if (null != e3)
            for (var o3 in e3)
              "default" !== o3 && Object.prototype.hasOwnProperty.call(e3, o3) && n3(t4, e3, o3);
          return r3(t4, e3), t4;
        }, u3 = this && this.__spreadArray || function(e3, t4, o3) {
          if (o3 || 2 === arguments.length)
            for (var s3, i3 = 0, n4 = t4.length; i3 < n4; i3++)
              !s3 && i3 in t4 || (s3 || (s3 = Array.prototype.slice.call(t4, 0, i3)), s3[i3] = t4[i3]);
          return e3.concat(s3 || Array.prototype.slice.call(t4));
        }, c2 = this && this.__importDefault || function(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        };
        Object.defineProperty(t3, "__esModule", { value: true }), t3.doesFocusableExist = t3.getCurrentFocusKey = t3.updateAllLayouts = t3.resume = t3.pause = t3.navigateByDirection = t3.setFocus = t3.setKeyMap = t3.destroy = t3.setThrottle = t3.init = t3.SpatialNavigation = t3.ROOT_FOCUS_KEY = void 0;
        var l3 = c2(o2(150)), d2 = c2(o2(117)), h2 = c2(o2(747)), f3 = c2(o2(23)), p2 = c2(o2(842)), y2 = c2(o2(682)), v2 = c2(o2(784)), g2 = c2(o2(432)), b = c2(o2(67)), F2 = c2(o2(35)), C2 = c2(o2(119)), K2 = a2(o2(964)), m2 = "left", w2 = "right", x2 = "up", E2 = "down", D2 = "enter", L2 = ((s2 = {}).left = [37, "ArrowLeft"], s2.up = [38, "ArrowUp"], s2.right = [39, "ArrowRight"], s2.down = [40, "ArrowDown"], s2.enter = [13, "Enter"], s2);
        t3.ROOT_FOCUS_KEY = "SN:ROOT";
        var P2 = ["#0FF", "#FF0", "#F0F"], N2 = { leading: true, trailing: false }, B2 = function() {
          function e3() {
            this.focusableComponents = {}, this.focusKey = null, this.parentsHavingFocusedChild = [], this.enabled = false, this.nativeMode = false, this.throttle = 0, this.throttleKeypresses = false, this.useGetBoundingClientRect = false, this.shouldFocusDOMNode = false, this.shouldUseNativeEvents = false, this.writingDirection = C2.default.LTR, this.pressedKeys = {}, this.paused = false, this.keyDownEventListener = null, this.keyUpEventListener = null, this.keyMap = L2, this.onKeyEvent = this.onKeyEvent.bind(this), this.pause = this.pause.bind(this), this.resume = this.resume.bind(this), this.setFocus = this.setFocus.bind(this), this.updateAllLayouts = this.updateAllLayouts.bind(this), this.navigateByDirection = this.navigateByDirection.bind(this), this.init = this.init.bind(this), this.setThrottle = this.setThrottle.bind(this), this.destroy = this.destroy.bind(this), this.setKeyMap = this.setKeyMap.bind(this), this.getCurrentFocusKey = this.getCurrentFocusKey.bind(this), this.doesFocusableExist = this.doesFocusableExist.bind(this), this.setFocusDebounced = (0, l3.default)(this.setFocus, 300, { leading: false, trailing: true }), this.debug = false, this.visualDebugger = null, this.logIndex = 0;
          }
          return e3.getCutoffCoordinate = function(e4, t4, o3, s3, i3) {
            var n4 = e4 ? s3.top : i3 === C2.default.LTR ? s3.left : s3.right, r4 = e4 ? s3.bottom : i3 === C2.default.LTR ? s3.right : s3.left;
            return t4 ? o3 ? n4 : r4 : o3 ? r4 : n4;
          }, e3.getRefCorners = function(e4, t4, o3) {
            var s3 = { a: { x: 0, y: 0 }, b: { x: 0, y: 0 } };
            switch (e4) {
              case x2:
                var i3 = t4 ? o3.bottom : o3.top;
                s3.a = { x: o3.left, y: i3 }, s3.b = { x: o3.right, y: i3 };
                break;
              case E2:
                i3 = t4 ? o3.top : o3.bottom, s3.a = { x: o3.left, y: i3 }, s3.b = { x: o3.right, y: i3 };
                break;
              case m2:
                var n4 = t4 ? o3.right : o3.left;
                s3.a = { x: n4, y: o3.top }, s3.b = { x: n4, y: o3.bottom };
                break;
              case w2:
                n4 = t4 ? o3.left : o3.right, s3.a = { x: n4, y: o3.top }, s3.b = { x: n4, y: o3.bottom };
            }
            return s3;
          }, e3.isAdjacentSlice = function(e4, t4, o3) {
            var s3 = e4.a, i3 = e4.b, n4 = t4.a, r4 = t4.b, a3 = o3 ? "x" : "y", u4 = s3[a3], c3 = i3[a3], l4 = n4[a3], d3 = r4[a3], h3 = 0.2 * (c3 - u4);
            return Math.max(0, Math.min(c3, d3) - Math.max(u4, l4)) >= h3;
          }, e3.getPrimaryAxisDistance = function(e4, t4, o3) {
            var s3 = e4.a, i3 = t4.a, n4 = o3 ? "y" : "x";
            return Math.abs(i3[n4] - s3[n4]);
          }, e3.getSecondaryAxisDistance = function(e4, t4, o3) {
            var s3 = e4.a, i3 = e4.b, n4 = t4.a, r4 = t4.b, a3 = o3 ? "x" : "y", u4 = s3[a3], c3 = i3[a3], l4 = n4[a3], d3 = r4[a3], h3 = [];
            return h3.push(Math.abs(l4 - u4)), h3.push(Math.abs(l4 - c3)), h3.push(Math.abs(d3 - u4)), h3.push(Math.abs(d3 - c3)), Math.min.apply(Math, h3);
          }, e3.prototype.sortSiblingsByPriority = function(t4, o3, s3, i3) {
            var n4 = this, r4 = s3 === E2 || s3 === x2, a3 = e3.getRefCorners(s3, false, o3);
            return (0, g2.default)(t4, function(t5) {
              var o4 = e3.getRefCorners(s3, true, t5.layout), u4 = e3.isAdjacentSlice(a3, o4, r4), c3 = u4 ? e3.getPrimaryAxisDistance : e3.getSecondaryAxisDistance, l4 = u4 ? e3.getSecondaryAxisDistance : e3.getPrimaryAxisDistance, d3 = c3(a3, o4, r4), h3 = l4(a3, o4, r4), f4 = 5 * d3 + h3, p3 = (f4 + 1) / (u4 ? 5 : 1);
              return n4.log("smartNavigate", "distance (primary, secondary, total weighted) for ".concat(t5.focusKey, " relative to ").concat(i3, " is"), d3, h3, f4), n4.log("smartNavigate", "priority for ".concat(t5.focusKey, " relative to ").concat(i3, " is"), p3), n4.visualDebugger && (n4.visualDebugger.drawPoint(o4.a.x, o4.a.y, "yellow", 6), n4.visualDebugger.drawPoint(o4.b.x, o4.b.y, "yellow", 6)), p3;
            });
          }, e3.prototype.init = function(e4) {
            var t4 = void 0 === e4 ? {} : e4, o3 = t4.debug, s3 = void 0 !== o3 && o3, i3 = t4.visualDebug, n4 = void 0 !== i3 && i3, r4 = t4.nativeMode, a3 = void 0 !== r4 && r4, u4 = t4.throttle, c3 = void 0 === u4 ? 0 : u4, l4 = t4.throttleKeypresses, d3 = void 0 !== l4 && l4, h3 = t4.useGetBoundingClientRect, f4 = void 0 !== h3 && h3, p3 = t4.shouldFocusDOMNode, y3 = void 0 !== p3 && p3, v3 = t4.shouldUseNativeEvents, g3 = void 0 !== v3 && v3, b2 = t4.rtl, K3 = void 0 !== b2 && b2;
            this.enabled || (this.enabled = true, this.nativeMode = a3, this.throttleKeypresses = d3, this.useGetBoundingClientRect = f4, this.shouldFocusDOMNode = y3 && !a3, this.shouldUseNativeEvents = g3, this.writingDirection = K3 ? C2.default.RTL : C2.default.LTR, this.debug = s3, this.nativeMode || (Number.isInteger(c3) && c3 > 0 && (this.throttle = c3), this.bindEventHandlers(), n4 && (this.visualDebugger = new F2.default(this.writingDirection), this.startDrawLayouts())));
          }, e3.prototype.setThrottle = function(e4) {
            var t4 = void 0 === e4 ? {} : e4, o3 = t4.throttle, s3 = void 0 === o3 ? 0 : o3, i3 = t4.throttleKeypresses, n4 = void 0 !== i3 && i3;
            this.throttleKeypresses = n4, this.nativeMode || (this.unbindEventHandlers(), Number.isInteger(s3) && (this.throttle = s3), this.bindEventHandlers());
          }, e3.prototype.startDrawLayouts = function() {
            var e4 = this, t4 = function() {
              requestAnimationFrame(function() {
                e4.visualDebugger.clearLayouts(), (0, v2.default)(e4.focusableComponents, function(t5, o3) {
                  e4.visualDebugger.drawLayout(t5.layout, o3, t5.parentFocusKey);
                }), t4();
              });
            };
            t4();
          }, e3.prototype.destroy = function() {
            this.enabled && (this.enabled = false, this.nativeMode = false, this.throttle = 0, this.throttleKeypresses = false, this.focusKey = null, this.parentsHavingFocusedChild = [], this.focusableComponents = {}, this.paused = false, this.keyMap = L2, this.unbindEventHandlers());
          }, e3.prototype.getEventType = function(e4) {
            return (0, f3.default)(this.getKeyMap(), function(t4) {
              return t4.includes(e4);
            });
          }, e3.getKeyCode = function(e4) {
            return e4.keyCode || e4.code;
          }, e3.prototype.bindEventHandlers = function() {
            var t4 = this;
            "undefined" != typeof window && window.addEventListener && (this.keyDownEventListener = function(o3) {
              if (true !== t4.paused) {
                t4.debug && (t4.logIndex += 1);
                var s3 = e3.getKeyCode(o3), i3 = t4.getEventType(s3);
                if (i3) {
                  t4.pressedKeys[i3] = t4.pressedKeys[i3] ? t4.pressedKeys[i3] + 1 : 1, t4.shouldUseNativeEvents || (o3.preventDefault(), o3.stopPropagation());
                  var n4 = { pressedKeys: t4.pressedKeys };
                  i3 === D2 && t4.focusKey ? t4.onEnterPress(n4) : false === t4.onArrowPress(i3, n4) ? (t4.log("keyDownEventListener", "default navigation prevented"), t4.visualDebugger && t4.visualDebugger.clear()) : t4.onKeyEvent(o3);
                }
              }
            }, this.throttle && (this.keyDownEventListenerThrottled = (0, b.default)(this.keyDownEventListener.bind(this), this.throttle, N2)), this.keyUpEventListener = function(o3) {
              var s3 = e3.getKeyCode(o3), i3 = t4.getEventType(s3);
              delete t4.pressedKeys[i3], t4.throttle && !t4.throttleKeypresses && t4.keyDownEventListenerThrottled.cancel(), i3 === D2 && t4.focusKey && t4.onEnterRelease();
            }, window.addEventListener("keyup", this.keyUpEventListener), window.addEventListener("keydown", this.throttle ? this.keyDownEventListenerThrottled : this.keyDownEventListener));
          }, e3.prototype.unbindEventHandlers = function() {
            if ("undefined" != typeof window && window.removeEventListener) {
              window.removeEventListener("keyup", this.keyUpEventListener), this.keyUpEventListener = null;
              var e4 = this.throttle ? this.keyDownEventListenerThrottled : this.keyDownEventListener;
              window.removeEventListener("keydown", e4), this.keyDownEventListener = null;
            }
          }, e3.prototype.onEnterPress = function(e4) {
            var t4 = this.focusableComponents[this.focusKey];
            t4 ? t4.focusable ? t4.onEnterPress && t4.onEnterPress(e4) : this.log("onEnterPress", "componentNotFocusable") : this.log("onEnterPress", "noComponent");
          }, e3.prototype.onEnterRelease = function() {
            var e4 = this.focusableComponents[this.focusKey];
            e4 ? e4.focusable ? e4.onEnterRelease && e4.onEnterRelease() : this.log("onEnterRelease", "componentNotFocusable") : this.log("onEnterRelease", "noComponent");
          }, e3.prototype.onArrowPress = function(e4, t4) {
            var o3 = this.focusableComponents[this.focusKey];
            if (o3)
              return o3 && o3.onArrowPress && o3.onArrowPress(e4, t4);
            this.log("onArrowPress", "noComponent");
          }, e3.prototype.navigateByDirection = function(e4, t4) {
            if (true !== this.paused && this.enabled && !this.nativeMode) {
              var o3 = [E2, x2, m2, w2];
              o3.includes(e4) ? (this.log("navigateByDirection", "direction", e4), this.smartNavigate(e4, null, t4)) : this.log("navigateByDirection", "Invalid direction. You passed: \`".concat(e4, "\`, but you can use only these: "), o3);
            }
          }, e3.prototype.onKeyEvent = function(t4) {
            this.visualDebugger && this.visualDebugger.clear();
            var o3 = e3.getKeyCode(t4), s3 = (0, f3.default)(this.getKeyMap(), function(e4) {
              return e4.includes(o3);
            });
            this.smartNavigate(s3, null, { event: t4 });
          }, e3.prototype.smartNavigate = function(t4, o3, s3) {
            var i3 = this;
            if (!this.nativeMode) {
              var n4 = t4 === E2 || t4 === x2, r4 = t4 === E2 || (this.writingDirection === C2.default.LTR ? t4 === w2 : t4 === m2);
              this.log("smartNavigate", "direction", t4), this.log("smartNavigate", "fromParentFocusKey", o3), this.log("smartNavigate", "this.focusKey", this.focusKey), o3 || (0, v2.default)(this.focusableComponents, function(e4) {
                e4.layoutUpdated = false;
              });
              var a3 = this.focusableComponents[o3 || this.focusKey];
              if (o3 || a3) {
                if (this.log("smartNavigate", "currentComponent", a3 ? a3.focusKey : void 0, a3 ? a3.node : void 0, a3), a3) {
                  this.updateLayout(a3.focusKey);
                  var u4 = a3.parentFocusKey, c3 = a3.focusKey, l4 = a3.layout, d3 = e3.getCutoffCoordinate(n4, r4, false, l4, this.writingDirection), f4 = (0, h2.default)(this.focusableComponents, function(t5) {
                    if (t5.parentFocusKey === u4 && t5.focusable) {
                      i3.updateLayout(t5.focusKey);
                      var o4 = e3.getCutoffCoordinate(n4, r4, true, t5.layout, i3.writingDirection);
                      return n4 || i3.writingDirection === C2.default.LTR ? r4 ? o4 >= d3 : o4 <= d3 : r4 ? o4 <= d3 : o4 >= d3;
                    }
                    return false;
                  });
                  if (this.debug && (this.log("smartNavigate", "currentCutoffCoordinate", d3), this.log("smartNavigate", "siblings", "".concat(f4.length, " elements:"), f4.map(function(e4) {
                    return e4.focusKey;
                  }).join(", "), f4.map(function(e4) {
                    return e4.node;
                  }), f4.map(function(e4) {
                    return e4;
                  }))), this.visualDebugger) {
                    var y3 = e3.getRefCorners(t4, false, l4);
                    this.visualDebugger.drawPoint(y3.a.x, y3.a.y), this.visualDebugger.drawPoint(y3.b.x, y3.b.y);
                  }
                  var g3 = this.sortSiblingsByPriority(f4, l4, t4, c3), b2 = (0, p2.default)(g3);
                  if (this.log("smartNavigate", "nextComponent", b2 ? b2.focusKey : void 0, b2 ? b2.node : void 0, b2), b2)
                    this.setFocus(b2.focusKey, s3);
                  else {
                    var F3 = this.focusableComponents[u4], K3 = (null == F3 ? void 0 : F3.isFocusBoundary) ? F3.focusBoundaryDirections || [t4] : [];
                    F3 && K3.includes(t4) || this.smartNavigate(t4, u4, s3);
                  }
                }
              } else
                this.setFocus(this.getForcedFocusKey());
            }
          }, e3.prototype.saveLastFocusedChildKey = function(e4, t4) {
            e4 && (this.log("saveLastFocusedChildKey", "".concat(e4.focusKey, " lastFocusedChildKey set"), t4), e4.lastFocusedChildKey = t4);
          }, e3.prototype.log = function(e4, t4) {
            for (var o3 = [], s3 = 2; s3 < arguments.length; s3++)
              o3[s3 - 2] = arguments[s3];
            this.debug && console.log.apply(console, u3(["%c".concat(e4, "%c").concat(t4), "background: ".concat(P2[this.logIndex % P2.length], "; color: black; padding: 1px 5px;"), "background: #333; color: #BADA55; padding: 1px 5px;"], o3, false));
          }, e3.prototype.getCurrentFocusKey = function() {
            return this.focusKey;
          }, e3.prototype.getForcedFocusKey = function() {
            var e4, o3 = (0, h2.default)(this.focusableComponents, function(e5) {
              return e5.focusable && e5.forceFocus;
            }), s3 = this.sortSiblingsByPriority(o3, { x: 0, y: 0, width: 0, height: 0, left: 0, top: 0, right: 0, bottom: 0, node: null }, "down", t3.ROOT_FOCUS_KEY);
            return null === (e4 = (0, p2.default)(s3)) || void 0 === e4 ? void 0 : e4.focusKey;
          }, e3.prototype.getNextFocusKey = function(e4) {
            var t4 = this, o3 = this.focusableComponents[e4];
            if (!o3 || this.nativeMode)
              return e4;
            var s3 = (0, h2.default)(this.focusableComponents, function(t5) {
              return t5.parentFocusKey === e4 && t5.focusable;
            });
            if (s3.length > 0) {
              var i3 = o3.lastFocusedChildKey, n4 = o3.preferredChildFocusKey;
              if (this.log("getNextFocusKey", "lastFocusedChildKey is", i3), this.log("getNextFocusKey", "preferredChildFocusKey is", n4), i3 && o3.saveLastFocusedChild && this.isParticipatingFocusableComponent(i3))
                return this.log("getNextFocusKey", "lastFocusedChildKey will be focused", i3), this.getNextFocusKey(i3);
              if (n4 && this.isParticipatingFocusableComponent(n4))
                return this.log("getNextFocusKey", "preferredChildFocusKey will be focused", n4), this.getNextFocusKey(n4);
              s3.forEach(function(e5) {
                return t4.updateLayout(e5.focusKey);
              });
              var r4 = function(e5, t5) {
                var o4 = t5 === C2.default.LTR ? function(e6) {
                  var t6 = e6.layout;
                  return Math.abs(t6.left) + Math.abs(t6.top);
                } : function(e6) {
                  var t6 = e6.layout;
                  return Math.abs(window.innerWidth - t6.right) + Math.abs(t6.top);
                }, s4 = (0, g2.default)(e5, o4);
                return (0, p2.default)(s4);
              }(s3, this.writingDirection).focusKey;
              return this.log("getNextFocusKey", "childKey will be focused", r4), this.getNextFocusKey(r4);
            }
            return this.log("getNextFocusKey", "targetFocusKey", e4), e4;
          }, e3.prototype.addFocusable = function(e4) {
            var t4 = e4.focusKey, o3 = e4.node, s3 = e4.parentFocusKey, i3 = e4.onEnterPress, n4 = e4.onEnterRelease, r4 = e4.onArrowPress, a3 = e4.onFocus, u4 = e4.onBlur, c3 = e4.saveLastFocusedChild, l4 = e4.trackChildren, d3 = e4.onUpdateFocus, h3 = e4.onUpdateHasFocusedChild, f4 = e4.preferredChildFocusKey, p3 = e4.autoRestoreFocus, y3 = e4.forceFocus, v3 = e4.focusable, g3 = e4.isFocusBoundary, b2 = e4.focusBoundaryDirections;
            if (this.focusableComponents[t4] = { focusKey: t4, node: o3, parentFocusKey: s3, onEnterPress: i3, onEnterRelease: n4, onArrowPress: r4, onFocus: a3, onBlur: u4, onUpdateFocus: d3, onUpdateHasFocusedChild: h3, saveLastFocusedChild: c3, trackChildren: l4, preferredChildFocusKey: f4, focusable: v3, isFocusBoundary: g3, focusBoundaryDirections: b2, autoRestoreFocus: p3, forceFocus: y3, lastFocusedChildKey: null, layout: { x: 0, y: 0, width: 0, height: 0, left: 0, top: 0, right: 0, bottom: 0, node: o3 }, layoutUpdated: false }, o3 || console.warn('Component added without a node reference. This will result in its coordinates being empty and may cause lost focus. Check the "ref" passed to "useFocusable": ', this.focusableComponents[t4]), !this.nativeMode) {
              this.updateLayout(t4), this.log("addFocusable", "Component added: ", this.focusableComponents[t4]), t4 === this.focusKey && this.setFocus(f4 || t4);
              for (var F3 = this.focusableComponents[this.focusKey]; F3; ) {
                if (F3.parentFocusKey === t4) {
                  this.updateParentsHasFocusedChild(this.focusKey, {}), this.updateParentsLastFocusedChild(this.focusKey);
                  break;
                }
                F3 = this.focusableComponents[F3.parentFocusKey];
              }
            }
          }, e3.prototype.removeFocusable = function(e4) {
            var t4 = e4.focusKey, o3 = this.focusableComponents[t4];
            if (o3) {
              var s3 = o3.parentFocusKey;
              (0, o3.onUpdateFocus)(false), this.log("removeFocusable", "Component removed: ", o3), delete this.focusableComponents[t4];
              var i3 = this.parentsHavingFocusedChild.includes(t4);
              this.parentsHavingFocusedChild = this.parentsHavingFocusedChild.filter(function(e5) {
                return e5 !== t4;
              });
              var n4 = this.focusableComponents[s3], r4 = t4 === this.focusKey;
              if (n4 && n4.lastFocusedChildKey === t4 && (n4.lastFocusedChildKey = null), this.nativeMode)
                return;
              (r4 || i3) && n4 && n4.autoRestoreFocus && (this.log("removeFocusable", "Component removed: ", r4 ? "Leaf component" : "Container component", "Auto restoring focus to: ", s3), this.setFocusDebounced(s3));
            }
          }, e3.prototype.getNodeLayoutByFocusKey = function(e4) {
            var t4 = this.focusableComponents[e4];
            return t4 ? (this.updateLayout(t4.focusKey), t4.layout) : null;
          }, e3.prototype.setCurrentFocusedKey = function(e4, t4) {
            if (this.isFocusableComponent(this.focusKey) && e4 !== this.focusKey) {
              var o3 = this.focusableComponents[this.focusKey];
              o3.onUpdateFocus(false), o3.onBlur(this.getNodeLayoutByFocusKey(this.focusKey), t4), this.log("setCurrentFocusedKey", "onBlur", o3);
            }
            if (this.focusKey = e4, this.isFocusableComponent(this.focusKey)) {
              var s3 = this.focusableComponents[this.focusKey];
              this.shouldFocusDOMNode && s3.node && s3.node.focus(), s3.onUpdateFocus(true), s3.onFocus(this.getNodeLayoutByFocusKey(this.focusKey), t4), this.log("setCurrentFocusedKey", "onFocus", s3);
            }
          }, e3.prototype.updateParentsHasFocusedChild = function(e4, t4) {
            for (var o3 = this, s3 = [], i3 = this.focusableComponents[e4]; i3; ) {
              var n4 = i3.parentFocusKey, r4 = this.focusableComponents[n4];
              if (r4) {
                var a3 = r4.focusKey;
                s3.push(a3);
              }
              i3 = r4;
            }
            var u4 = (0, d2.default)(this.parentsHavingFocusedChild, s3), c3 = (0, d2.default)(s3, this.parentsHavingFocusedChild);
            (0, y2.default)(u4, function(e5) {
              var s4 = o3.focusableComponents[e5];
              s4 && s4.trackChildren && s4.onUpdateHasFocusedChild(false), o3.onIntermediateNodeBecameBlurred(e5, t4);
            }), (0, y2.default)(c3, function(e5) {
              var s4 = o3.focusableComponents[e5];
              s4 && s4.trackChildren && s4.onUpdateHasFocusedChild(true), o3.onIntermediateNodeBecameFocused(e5, t4);
            }), this.parentsHavingFocusedChild = s3;
          }, e3.prototype.updateParentsLastFocusedChild = function(e4) {
            for (var t4 = this.focusableComponents[e4]; t4; ) {
              var o3 = t4.parentFocusKey, s3 = this.focusableComponents[o3];
              s3 && this.saveLastFocusedChildKey(s3, t4.focusKey), t4 = s3;
            }
          }, e3.prototype.getKeyMap = function() {
            return this.keyMap;
          }, e3.prototype.setKeyMap = function(e4) {
            this.keyMap = i2(i2({}, this.getKeyMap()), function(e5) {
              var t4 = {};
              return Object.entries(e5).forEach(function(e6) {
                var o3 = e6[0], s3 = e6[1];
                t4[o3] = Array.isArray(s3) ? s3 : [s3];
              }), t4;
            }(e4));
          }, e3.prototype.isFocusableComponent = function(e4) {
            return !!this.focusableComponents[e4];
          }, e3.prototype.isParticipatingFocusableComponent = function(e4) {
            return this.isFocusableComponent(e4) && this.focusableComponents[e4].focusable;
          }, e3.prototype.onIntermediateNodeBecameFocused = function(e4, t4) {
            this.isParticipatingFocusableComponent(e4) && this.focusableComponents[e4].onFocus(this.getNodeLayoutByFocusKey(e4), t4);
          }, e3.prototype.onIntermediateNodeBecameBlurred = function(e4, t4) {
            this.isParticipatingFocusableComponent(e4) && this.focusableComponents[e4].onBlur(this.getNodeLayoutByFocusKey(e4), t4);
          }, e3.prototype.pause = function() {
            this.paused = true;
          }, e3.prototype.resume = function() {
            this.paused = false;
          }, e3.prototype.setFocus = function(e4, o3) {
            if (void 0 === o3 && (o3 = {}), this.setFocusDebounced.cancel(), this.enabled && !this.nativeMode) {
              this.log("setFocus", "focusKey", e4), e4 && e4 !== t3.ROOT_FOCUS_KEY || (e4 = this.getForcedFocusKey());
              var s3 = this.getNextFocusKey(e4);
              this.log("setFocus", "newFocusKey", s3), this.setCurrentFocusedKey(s3, o3), this.updateParentsHasFocusedChild(s3, o3), this.updateParentsLastFocusedChild(s3);
            }
          }, e3.prototype.updateAllLayouts = function() {
            var e4 = this;
            this.enabled && !this.nativeMode && (0, v2.default)(this.focusableComponents, function(t4, o3) {
              e4.updateLayout(o3);
            });
          }, e3.prototype.updateLayout = function(e4) {
            var t4 = this.focusableComponents[e4];
            if (t4 && !this.nativeMode && !t4.layoutUpdated) {
              var o3 = t4.node, s3 = this.useGetBoundingClientRect ? (0, K2.getBoundingClientRect)(o3) : (0, K2.default)(o3);
              t4.layout = i2(i2({}, s3), { node: o3 });
            }
          }, e3.prototype.updateFocusable = function(e4, t4) {
            var o3 = t4.node, s3 = t4.preferredChildFocusKey, i3 = t4.focusable, n4 = t4.isFocusBoundary, r4 = t4.focusBoundaryDirections, a3 = t4.onEnterPress, u4 = t4.onEnterRelease, c3 = t4.onArrowPress, l4 = t4.onFocus, d3 = t4.onBlur;
            if (!this.nativeMode) {
              var h3 = this.focusableComponents[e4];
              h3 && (h3.preferredChildFocusKey = s3, h3.focusable = i3, h3.isFocusBoundary = n4, h3.focusBoundaryDirections = r4, h3.onEnterPress = a3, h3.onEnterRelease = u4, h3.onArrowPress = c3, h3.onFocus = l4, h3.onBlur = d3, o3 && (h3.node = o3));
            }
          }, e3.prototype.isNativeMode = function() {
            return this.nativeMode;
          }, e3.prototype.doesFocusableExist = function(e4) {
            return !!this.focusableComponents[e4];
          }, e3;
        }();
        t3.SpatialNavigation = new B2(), t3.init = t3.SpatialNavigation.init, t3.setThrottle = t3.SpatialNavigation.setThrottle, t3.destroy = t3.SpatialNavigation.destroy, t3.setKeyMap = t3.SpatialNavigation.setKeyMap, t3.setFocus = t3.SpatialNavigation.setFocus, t3.navigateByDirection = t3.SpatialNavigation.navigateByDirection, t3.pause = t3.SpatialNavigation.pause, t3.resume = t3.SpatialNavigation.resume, t3.updateAllLayouts = t3.SpatialNavigation.updateAllLayouts, t3.getCurrentFocusKey = t3.SpatialNavigation.getCurrentFocusKey, t3.doesFocusableExist = t3.SpatialNavigation.doesFocusableExist;
      }, 35: function(e2, t3, o2) {
        var s2 = this && this.__importDefault || function(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        };
        Object.defineProperty(t3, "__esModule", { value: true });
        var i2 = s2(o2(119)), n3 = "undefined" != typeof window && window.document, r3 = n3 ? window.innerWidth : 0, a2 = n3 ? window.innerHeight : 0, u3 = function() {
          function e3(t4) {
            n3 && (this.debugCtx = e3.createCanvas("sn-debug", "1010", t4), this.layoutsCtx = e3.createCanvas("sn-layouts", "1000", t4), this.writingDirection = t4);
          }
          return e3.createCanvas = function(e4, t4, o3) {
            var s3 = document.querySelector("#".concat(e4)) || document.createElement("canvas");
            s3.setAttribute("id", e4), s3.setAttribute("dir", o3 === i2.default.LTR ? "ltr" : "rtl");
            var n4 = s3.getContext("2d");
            return s3.style.zIndex = t4, s3.style.position = "fixed", s3.style.top = "0", s3.style.left = "0", document.body.appendChild(s3), s3.width = r3, s3.height = a2, n4;
          }, e3.prototype.clear = function() {
            n3 && this.debugCtx.clearRect(0, 0, r3, a2);
          }, e3.prototype.clearLayouts = function() {
            n3 && this.layoutsCtx.clearRect(0, 0, r3, a2);
          }, e3.prototype.drawLayout = function(e4, t4, o3) {
            if (n3) {
              this.layoutsCtx.strokeStyle = "green", this.layoutsCtx.strokeRect(e4.left, e4.top, e4.width, e4.height), this.layoutsCtx.font = "8px monospace", this.layoutsCtx.fillStyle = "red";
              var s3 = this.writingDirection === i2.default.LTR ? "left" : "right", r4 = e4[s3];
              this.layoutsCtx.fillText(t4, r4, e4.top + 10), this.layoutsCtx.fillText(o3, r4, e4.top + 25), this.layoutsCtx.fillText("".concat(s3, ": ").concat(r4), r4, e4.top + 40), this.layoutsCtx.fillText("top: ".concat(e4.top), r4, e4.top + 55);
            }
          }, e3.prototype.drawPoint = function(e4, t4, o3, s3) {
            void 0 === o3 && (o3 = "blue"), void 0 === s3 && (s3 = 10), n3 && (this.debugCtx.strokeStyle = o3, this.debugCtx.lineWidth = 3, this.debugCtx.strokeRect(e4 - s3 / 2, t4 - s3 / 2, s3, s3));
          }, e3;
        }();
        t3.default = u3;
      }, 119: function(e2, t3) {
        var o2;
        Object.defineProperty(t3, "__esModule", { value: true }), function(e3) {
          e3[e3.LTR = 0] = "LTR", e3[e3.RTL = 1] = "RTL";
        }(o2 || (o2 = {})), t3.default = o2;
      }, 607: function(e2, t3, o2) {
        var s2 = this && this.__createBinding || (Object.create ? function(e3, t4, o3, s3) {
          void 0 === s3 && (s3 = o3);
          var i3 = Object.getOwnPropertyDescriptor(t4, o3);
          i3 && !("get" in i3 ? !t4.__esModule : i3.writable || i3.configurable) || (i3 = { enumerable: true, get: function() {
            return t4[o3];
          } }), Object.defineProperty(e3, s3, i3);
        } : function(e3, t4, o3, s3) {
          void 0 === s3 && (s3 = o3), e3[s3] = t4[o3];
        }), i2 = this && this.__exportStar || function(e3, t4) {
          for (var o3 in e3)
            "default" === o3 || Object.prototype.hasOwnProperty.call(t4, o3) || s2(t4, e3, o3);
        };
        Object.defineProperty(t3, "__esModule", { value: true }), i2(o2(79), t3), i2(o2(445), t3), i2(o2(654), t3);
      }, 964: function(e2, t3) {
        Object.defineProperty(t3, "__esModule", { value: true }), t3.getBoundingClientRect = void 0;
        var o2 = function(e3) {
          for (var t4 = e3.offsetParent, o3 = e3.offsetHeight, s2 = e3.offsetWidth, i2 = e3.offsetLeft, n3 = e3.offsetTop; t4 && 1 === t4.nodeType; )
            i2 += t4.offsetLeft - t4.scrollLeft, n3 += t4.offsetTop - t4.scrollTop, t4 = t4.offsetParent;
          return { height: o3, left: i2, top: n3, width: s2 };
        };
        t3.default = function(e3) {
          var t4 = e3 && e3.parentElement;
          if (e3 && t4) {
            var s2 = o2(t4), i2 = o2(e3), n3 = i2.height, r3 = i2.left, a2 = i2.top, u3 = i2.width;
            return { x: r3 - s2.left, y: a2 - s2.top, width: u3, height: n3, left: r3, top: a2, get right() {
              return this.left + this.width;
            }, get bottom() {
              return this.top + this.height;
            } };
          }
          return { x: 0, y: 0, width: 0, height: 0, left: 0, top: 0, right: 0, bottom: 0 };
        }, t3.getBoundingClientRect = function(e3) {
          if (e3 && e3.getBoundingClientRect) {
            var t4 = e3.getBoundingClientRect();
            return { x: t4.x, y: t4.y, width: t4.width, height: t4.height, left: t4.left, top: t4.top, get right() {
              return this.left + this.width;
            }, get bottom() {
              return this.top + this.height;
            } };
          }
          return { x: 0, y: 0, width: 0, height: 0, left: 0, top: 0, right: 0, bottom: 0 };
        };
      }, 445: function(e2, t3, o2) {
        Object.defineProperty(t3, "__esModule", { value: true }), t3.useFocusContext = t3.FocusContext = void 0;
        var s2 = o2(156), i2 = o2(654);
        t3.FocusContext = (0, s2.createContext)(i2.ROOT_FOCUS_KEY), t3.FocusContext.displayName = "FocusContext", t3.useFocusContext = function() {
          return (0, s2.useContext)(t3.FocusContext);
        };
      }, 79: function(e2, t3, o2) {
        var s2 = this && this.__importDefault || function(e3) {
          return e3 && e3.__esModule ? e3 : { default: e3 };
        };
        Object.defineProperty(t3, "__esModule", { value: true }), t3.useFocusable = void 0;
        var i2 = o2(156), n3 = s2(o2(604)), r3 = s2(o2(461)), a2 = o2(654), u3 = o2(445);
        t3.useFocusable = function(e3) {
          var t4 = void 0 === e3 ? {} : e3, o3 = t4.focusable, s3 = void 0 === o3 || o3, c2 = t4.saveLastFocusedChild, l3 = void 0 === c2 || c2, d2 = t4.trackChildren, h2 = void 0 !== d2 && d2, f3 = t4.autoRestoreFocus, p2 = void 0 === f3 || f3, y2 = t4.forceFocus, v2 = void 0 !== y2 && y2, g2 = t4.isFocusBoundary, b = void 0 !== g2 && g2, F2 = t4.focusBoundaryDirections, C2 = t4.focusKey, K2 = t4.preferredChildFocusKey, m2 = t4.onEnterPress, w2 = void 0 === m2 ? n3.default : m2, x2 = t4.onEnterRelease, E2 = void 0 === x2 ? n3.default : x2, D2 = t4.onArrowPress, L2 = void 0 === D2 ? function() {
            return true;
          } : D2, P2 = t4.onFocus, N2 = void 0 === P2 ? n3.default : P2, B2 = t4.onBlur, M2 = void 0 === B2 ? n3.default : B2, R2 = t4.extraProps, _2 = (0, i2.useCallback)(function(e4) {
            w2(R2, e4);
          }, [w2, R2]), O2 = (0, i2.useCallback)(function() {
            E2(R2);
          }, [E2, R2]), k2 = (0, i2.useCallback)(function(e4, t5) {
            return L2(e4, R2, t5);
          }, [R2, L2]), T2 = (0, i2.useCallback)(function(e4, t5) {
            N2(e4, R2, t5);
          }, [R2, N2]), A2 = (0, i2.useCallback)(function(e4, t5) {
            M2(e4, R2, t5);
          }, [R2, M2]), S2 = (0, i2.useRef)(null), q2 = (0, i2.useState)(false), U2 = q2[0], j2 = q2[1], H2 = (0, i2.useState)(false), I2 = H2[0], Y2 = H2[1], G2 = (0, u3.useFocusContext)(), W2 = (0, i2.useMemo)(function() {
            return C2 || (0, r3.default)("sn:focusable-item-");
          }, [C2]), z2 = (0, i2.useCallback)(function(e4) {
            void 0 === e4 && (e4 = {}), a2.SpatialNavigation.setFocus(W2, e4);
          }, [W2]);
          return (0, i2.useEffect)(function() {
            var e4 = S2.current;
            return a2.SpatialNavigation.addFocusable({ focusKey: W2, node: e4, parentFocusKey: G2, preferredChildFocusKey: K2, onEnterPress: _2, onEnterRelease: O2, onArrowPress: k2, onFocus: T2, onBlur: A2, onUpdateFocus: function(e5) {
              return void 0 === e5 && (e5 = false), j2(e5);
            }, onUpdateHasFocusedChild: function(e5) {
              return void 0 === e5 && (e5 = false), Y2(e5);
            }, saveLastFocusedChild: l3, trackChildren: h2, isFocusBoundary: b, focusBoundaryDirections: F2, autoRestoreFocus: p2, forceFocus: v2, focusable: s3 }), function() {
              a2.SpatialNavigation.removeFocusable({ focusKey: W2 });
            };
          }, []), (0, i2.useEffect)(function() {
            var e4 = S2.current;
            a2.SpatialNavigation.updateFocusable(W2, { node: e4, preferredChildFocusKey: K2, focusable: s3, isFocusBoundary: b, focusBoundaryDirections: F2, onEnterPress: _2, onEnterRelease: O2, onArrowPress: k2, onFocus: T2, onBlur: A2 });
          }, [W2, K2, s3, b, F2, _2, O2, k2, T2, A2]), { ref: S2, focusSelf: z2, focused: U2, hasFocusedChild: I2, focusKey: W2 };
        };
      }, 150: function(t3) {
        t3.exports = e;
      }, 117: function(e2) {
        e2.exports = t2;
      }, 747: function(e2) {
        e2.exports = o;
      }, 23: function(e2) {
        e2.exports = s;
      }, 842: function(e2) {
        e2.exports = i;
      }, 682: function(e2) {
        e2.exports = n2;
      }, 784: function(e2) {
        e2.exports = r2;
      }, 604: function(e2) {
        e2.exports = a;
      }, 432: function(e2) {
        e2.exports = u2;
      }, 67: function(e2) {
        e2.exports = c;
      }, 461: function(e2) {
        e2.exports = l2;
      }, 156: function(e2) {
        e2.exports = d;
      } }, f2 = {};
      return function e2(t3) {
        var o2 = f2[t3];
        if (void 0 !== o2)
          return o2.exports;
        var s2 = f2[t3] = { exports: {} };
        return h[t3].call(s2.exports, s2, s2.exports, e2), s2.exports;
      }(607);
    }();
  });
})(dist);
var distExports = dist.exports;
distExports.init({
  debug: false,
  visualDebug: false
});
shuffle$1([
  {
    title: "Recommended"
  },
  {
    title: "Movies"
  },
  {
    title: "Series"
  },
  {
    title: "TV Channels"
  },
  {
    title: "Sport"
  }
]);
st.div\`
  width: 171px;
  height: 51px;
  background-color: #b056ed;
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "6px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 37px;
\`;
st.div\`
  flex: 1;
  max-width: 246px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ hasFocusedChild }) =>
    hasFocusedChild ? "#4e4181" : "#362C56"};
  padding-top: 37px;
\`;
st.div\`
  margin-right: 22px;
  display: flex;
  flex-direction: column;
\`;
st.div\`
  width: 225px;
  height: 127px;
  background-color: ${({ color }) => color};
  border-color: white;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "6px" : 0)};
  box-sizing: border-box;
  border-radius: 7px;
\`;
st.div\`
  color: white;
  margin-top: 10px;
  font-family: "Segoe UI";
  font-size: 24px;
  font-weight: 400;
\`;
st.div\`
  margin-bottom: 37px;
\`;
st.div\`
  color: white;
  margin-bottom: 22px;
  font-size: 27px;
  font-weight: 700;
  font-family: "Segoe UI";
  padding-left: 60px;
\`;
st.div\`
  overflow-x: auto;
  overflow-y: hidden;
  flex-shrink: 1;
  flex-grow: 1;
  padding-left: 60px;
\`;
st.div\`
  display: flex;
  flex-direction: row;
\`;
st.div\`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
\`;
st.div\`
  color: white;
  font-size: 48px;
  font-weight: 600;
  font-family: "Segoe UI";
  text-align: center;
  margin-top: 52px;
  margin-bottom: 37px;
\`;
st.div\`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
\`;
st.div\`
  height: 282px;
  width: 1074px;
  background-color: ${({ color }) => color};
  margin-bottom: 37px;
  border-radius: 7px;
\`;
st.div\`
  position: absolute;
  bottom: 75px;
  left: 100px;
  color: white;
  font-size: 27px;
  font-weight: 400;
  font-family: "Segoe UI";
\`;
st.div\`
  overflow-y: auto;
  overflow-x: hidden;
  flex-shrink: 1;
  flex-grow: 1;
\`;
st.div\`
  background-color: #221c35;
  width: 1440px;
  height: 810px;
  display: flex;
  flex-direction: row;
\`;
at\`
  ::-webkit-scrollbar {
    display: none;
  }
\`;
function App() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "hisfhsfdhsidf hosdfhslkdfskldf jksdf ksdhfksj fkjsdhf kjsdhf ksjdfh ksdjfh ksdfhkjsdf" });
}
client.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(React.StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);

</script>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
`;

export const original = `
<!doctype html>
<html lang="en">
  <head></head>
  <body>
    <h1>Gamepad Connection Test</h1>
    <div id="status">Connect a gamepad and press any button.</div>

    <script>
        var statusElement = document.getElementById('status');

        function updateStatus() {
            var gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            for (var i = 0; i < gamepads.length; i++) {
                if (gamepads[i]) {
                    statusElement.innerHTML = 'Gamepad connected at index ' + gamepads[i].index + ': ' + gamepads[i].id;
                    break;
                }
            }
        }

        window.addEventListener("gamepadconnected", function(e) {
            statusElement.innerHTML = "Gamepad connected at index " + e.gamepad.index + ": " + e.gamepad.id + ".";
        });

        window.addEventListener("gamepaddisconnected", function(e) {
            statusElement.innerHTML = "Gamepad disconnected from index " + e.gamepad.index + ".";
        });

        setInterval(updateStatus, 500); // Check every 500ms
    </script>
  </body>
</html>
`;
