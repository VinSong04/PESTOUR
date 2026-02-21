(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function kv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var Yf={exports:{}},Jo={},Xf={exports:{}},F={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ri=Symbol.for("react.element"),Nv=Symbol.for("react.portal"),Iv=Symbol.for("react.fragment"),Tv=Symbol.for("react.strict_mode"),bv=Symbol.for("react.profiler"),Pv=Symbol.for("react.provider"),Rv=Symbol.for("react.context"),Av=Symbol.for("react.forward_ref"),Ov=Symbol.for("react.suspense"),Dv=Symbol.for("react.memo"),Mv=Symbol.for("react.lazy"),kd=Symbol.iterator;function Lv(t){return t===null||typeof t!="object"?null:(t=kd&&t[kd]||t["@@iterator"],typeof t=="function"?t:null)}var Jf={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},Zf=Object.assign,ep={};function Vr(t,e,n){this.props=t,this.context=e,this.refs=ep,this.updater=n||Jf}Vr.prototype.isReactComponent={};Vr.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Vr.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function tp(){}tp.prototype=Vr.prototype;function Lu(t,e,n){this.props=t,this.context=e,this.refs=ep,this.updater=n||Jf}var ju=Lu.prototype=new tp;ju.constructor=Lu;Zf(ju,Vr.prototype);ju.isPureReactComponent=!0;var Nd=Array.isArray,np=Object.prototype.hasOwnProperty,Fu={current:null},rp={key:!0,ref:!0,__self:!0,__source:!0};function sp(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)np.call(e,r)&&!rp.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var a=Array(l),u=0;u<l;u++)a[u]=arguments[u+2];s.children=a}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:ri,type:t,key:i,ref:o,props:s,_owner:Fu.current}}function jv(t,e){return{$$typeof:ri,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Bu(t){return typeof t=="object"&&t!==null&&t.$$typeof===ri}function Fv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var Id=/\/+/g;function Dl(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Fv(""+t.key):e.toString(36)}function Bi(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ri:case Nv:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+Dl(o,0):r,Nd(s)?(n="",t!=null&&(n=t.replace(Id,"$&/")+"/"),Bi(s,e,n,"",function(u){return u})):s!=null&&(Bu(s)&&(s=jv(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(Id,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",Nd(t))for(var l=0;l<t.length;l++){i=t[l];var a=r+Dl(i,l);o+=Bi(i,e,n,a,s)}else if(a=Lv(t),typeof a=="function")for(t=a.call(t),l=0;!(i=t.next()).done;)i=i.value,a=r+Dl(i,l++),o+=Bi(i,e,n,a,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function yi(t,e,n){if(t==null)return t;var r=[],s=0;return Bi(t,r,"","",function(i){return e.call(n,i,s++)}),r}function Bv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Pe={current:null},Ui={transition:null},Uv={ReactCurrentDispatcher:Pe,ReactCurrentBatchConfig:Ui,ReactCurrentOwner:Fu};function ip(){throw Error("act(...) is not supported in production builds of React.")}F.Children={map:yi,forEach:function(t,e,n){yi(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return yi(t,function(){e++}),e},toArray:function(t){return yi(t,function(e){return e})||[]},only:function(t){if(!Bu(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};F.Component=Vr;F.Fragment=Iv;F.Profiler=bv;F.PureComponent=Lu;F.StrictMode=Tv;F.Suspense=Ov;F.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Uv;F.act=ip;F.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=Zf({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Fu.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(a in e)np.call(e,a)&&!rp.hasOwnProperty(a)&&(r[a]=e[a]===void 0&&l!==void 0?l[a]:e[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){l=Array(a);for(var u=0;u<a;u++)l[u]=arguments[u+2];r.children=l}return{$$typeof:ri,type:t.type,key:s,ref:i,props:r,_owner:o}};F.createContext=function(t){return t={$$typeof:Rv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Pv,_context:t},t.Consumer=t};F.createElement=sp;F.createFactory=function(t){var e=sp.bind(null,t);return e.type=t,e};F.createRef=function(){return{current:null}};F.forwardRef=function(t){return{$$typeof:Av,render:t}};F.isValidElement=Bu;F.lazy=function(t){return{$$typeof:Mv,_payload:{_status:-1,_result:t},_init:Bv}};F.memo=function(t,e){return{$$typeof:Dv,type:t,compare:e===void 0?null:e}};F.startTransition=function(t){var e=Ui.transition;Ui.transition={};try{t()}finally{Ui.transition=e}};F.unstable_act=ip;F.useCallback=function(t,e){return Pe.current.useCallback(t,e)};F.useContext=function(t){return Pe.current.useContext(t)};F.useDebugValue=function(){};F.useDeferredValue=function(t){return Pe.current.useDeferredValue(t)};F.useEffect=function(t,e){return Pe.current.useEffect(t,e)};F.useId=function(){return Pe.current.useId()};F.useImperativeHandle=function(t,e,n){return Pe.current.useImperativeHandle(t,e,n)};F.useInsertionEffect=function(t,e){return Pe.current.useInsertionEffect(t,e)};F.useLayoutEffect=function(t,e){return Pe.current.useLayoutEffect(t,e)};F.useMemo=function(t,e){return Pe.current.useMemo(t,e)};F.useReducer=function(t,e,n){return Pe.current.useReducer(t,e,n)};F.useRef=function(t){return Pe.current.useRef(t)};F.useState=function(t){return Pe.current.useState(t)};F.useSyncExternalStore=function(t,e,n){return Pe.current.useSyncExternalStore(t,e,n)};F.useTransition=function(){return Pe.current.useTransition()};F.version="18.3.1";Xf.exports=F;var U=Xf.exports;const zv=kv(U);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Wv=U,Vv=Symbol.for("react.element"),$v=Symbol.for("react.fragment"),Hv=Object.prototype.hasOwnProperty,Gv=Wv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Kv={key:!0,ref:!0,__self:!0,__source:!0};function op(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)Hv.call(e,r)&&!Kv.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:Vv,type:t,key:i,ref:o,props:s,_owner:Gv.current}}Jo.Fragment=$v;Jo.jsx=op;Jo.jsxs=op;Yf.exports=Jo;var c=Yf.exports,xa={},lp={exports:{}},He={},ap={exports:{}},up={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(T,A){var D=T.length;T.push(A);e:for(;0<D;){var re=D-1>>>1,de=T[re];if(0<s(de,A))T[re]=A,T[D]=de,D=re;else break e}}function n(T){return T.length===0?null:T[0]}function r(T){if(T.length===0)return null;var A=T[0],D=T.pop();if(D!==A){T[0]=D;e:for(var re=0,de=T.length,_i=de>>>1;re<_i;){var Cn=2*(re+1)-1,Ol=T[Cn],kn=Cn+1,vi=T[kn];if(0>s(Ol,D))kn<de&&0>s(vi,Ol)?(T[re]=vi,T[kn]=D,re=kn):(T[re]=Ol,T[Cn]=D,re=Cn);else if(kn<de&&0>s(vi,D))T[re]=vi,T[kn]=D,re=kn;else break e}}return A}function s(T,A){var D=T.sortIndex-A.sortIndex;return D!==0?D:T.id-A.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var a=[],u=[],f=1,h=null,d=3,_=!1,v=!1,y=!1,C=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(T){for(var A=n(u);A!==null;){if(A.callback===null)r(u);else if(A.startTime<=T)r(u),A.sortIndex=A.expirationTime,e(a,A);else break;A=n(u)}}function w(T){if(y=!1,g(T),!v)if(n(a)!==null)v=!0,Rl(E);else{var A=n(u);A!==null&&Al(w,A.startTime-T)}}function E(T,A){v=!1,y&&(y=!1,m(b),b=-1),_=!0;var D=d;try{for(g(A),h=n(a);h!==null&&(!(h.expirationTime>A)||T&&!oe());){var re=h.callback;if(typeof re=="function"){h.callback=null,d=h.priorityLevel;var de=re(h.expirationTime<=A);A=t.unstable_now(),typeof de=="function"?h.callback=de:h===n(a)&&r(a),g(A)}else r(a);h=n(a)}if(h!==null)var _i=!0;else{var Cn=n(u);Cn!==null&&Al(w,Cn.startTime-A),_i=!1}return _i}finally{h=null,d=D,_=!1}}var k=!1,N=null,b=-1,$=5,O=-1;function oe(){return!(t.unstable_now()-O<$)}function ce(){if(N!==null){var T=t.unstable_now();O=T;var A=!0;try{A=N(!0,T)}finally{A?et():(k=!1,N=null)}}else k=!1}var et;if(typeof p=="function")et=function(){p(ce)};else if(typeof MessageChannel<"u"){var Xn=new MessageChannel,Cv=Xn.port2;Xn.port1.onmessage=ce,et=function(){Cv.postMessage(null)}}else et=function(){C(ce,0)};function Rl(T){N=T,k||(k=!0,et())}function Al(T,A){b=C(function(){T(t.unstable_now())},A)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(T){T.callback=null},t.unstable_continueExecution=function(){v||_||(v=!0,Rl(E))},t.unstable_forceFrameRate=function(T){0>T||125<T?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):$=0<T?Math.floor(1e3/T):5},t.unstable_getCurrentPriorityLevel=function(){return d},t.unstable_getFirstCallbackNode=function(){return n(a)},t.unstable_next=function(T){switch(d){case 1:case 2:case 3:var A=3;break;default:A=d}var D=d;d=A;try{return T()}finally{d=D}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(T,A){switch(T){case 1:case 2:case 3:case 4:case 5:break;default:T=3}var D=d;d=T;try{return A()}finally{d=D}},t.unstable_scheduleCallback=function(T,A,D){var re=t.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?re+D:re):D=re,T){case 1:var de=-1;break;case 2:de=250;break;case 5:de=1073741823;break;case 4:de=1e4;break;default:de=5e3}return de=D+de,T={id:f++,callback:A,priorityLevel:T,startTime:D,expirationTime:de,sortIndex:-1},D>re?(T.sortIndex=D,e(u,T),n(a)===null&&T===n(u)&&(y?(m(b),b=-1):y=!0,Al(w,D-re))):(T.sortIndex=de,e(a,T),v||_||(v=!0,Rl(E))),T},t.unstable_shouldYield=oe,t.unstable_wrapCallback=function(T){var A=d;return function(){var D=d;d=A;try{return T.apply(this,arguments)}finally{d=D}}}})(up);ap.exports=up;var qv=ap.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Qv=U,$e=qv;function x(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var cp=new Set,Ps={};function qn(t,e){Pr(t,e),Pr(t+"Capture",e)}function Pr(t,e){for(Ps[t]=e,t=0;t<e.length;t++)cp.add(e[t])}var Rt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ea=Object.prototype.hasOwnProperty,Yv=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Td={},bd={};function Xv(t){return Ea.call(bd,t)?!0:Ea.call(Td,t)?!1:Yv.test(t)?bd[t]=!0:(Td[t]=!0,!1)}function Jv(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function Zv(t,e,n,r){if(e===null||typeof e>"u"||Jv(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Re(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var xe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){xe[t]=new Re(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];xe[e]=new Re(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){xe[t]=new Re(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){xe[t]=new Re(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){xe[t]=new Re(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){xe[t]=new Re(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){xe[t]=new Re(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){xe[t]=new Re(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){xe[t]=new Re(t,5,!1,t.toLowerCase(),null,!1,!1)});var Uu=/[\-:]([a-z])/g;function zu(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Uu,zu);xe[e]=new Re(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Uu,zu);xe[e]=new Re(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Uu,zu);xe[e]=new Re(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){xe[t]=new Re(t,1,!1,t.toLowerCase(),null,!1,!1)});xe.xlinkHref=new Re("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){xe[t]=new Re(t,1,!1,t.toLowerCase(),null,!0,!0)});function Wu(t,e,n,r){var s=xe.hasOwnProperty(e)?xe[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(Zv(e,n,s,r)&&(n=null),r||s===null?Xv(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Ut=Qv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,wi=Symbol.for("react.element"),tr=Symbol.for("react.portal"),nr=Symbol.for("react.fragment"),Vu=Symbol.for("react.strict_mode"),Sa=Symbol.for("react.profiler"),dp=Symbol.for("react.provider"),hp=Symbol.for("react.context"),$u=Symbol.for("react.forward_ref"),Ca=Symbol.for("react.suspense"),ka=Symbol.for("react.suspense_list"),Hu=Symbol.for("react.memo"),$t=Symbol.for("react.lazy"),fp=Symbol.for("react.offscreen"),Pd=Symbol.iterator;function Zr(t){return t===null||typeof t!="object"?null:(t=Pd&&t[Pd]||t["@@iterator"],typeof t=="function"?t:null)}var ee=Object.assign,Ml;function ds(t){if(Ml===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Ml=e&&e[1]||""}return`
`+Ml+t}var Ll=!1;function jl(t,e){if(!t||Ll)return"";Ll=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(u){var r=u}Reflect.construct(t,[],e)}else{try{e.call()}catch(u){r=u}t.call(e.prototype)}else{try{throw Error()}catch(u){r=u}t()}}catch(u){if(u&&r&&typeof u.stack=="string"){for(var s=u.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var a=`
`+s[o].replace(" at new "," at ");return t.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",t.displayName)),a}while(1<=o&&0<=l);break}}}finally{Ll=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ds(t):""}function ey(t){switch(t.tag){case 5:return ds(t.type);case 16:return ds("Lazy");case 13:return ds("Suspense");case 19:return ds("SuspenseList");case 0:case 2:case 15:return t=jl(t.type,!1),t;case 11:return t=jl(t.type.render,!1),t;case 1:return t=jl(t.type,!0),t;default:return""}}function Na(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case nr:return"Fragment";case tr:return"Portal";case Sa:return"Profiler";case Vu:return"StrictMode";case Ca:return"Suspense";case ka:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case hp:return(t.displayName||"Context")+".Consumer";case dp:return(t._context.displayName||"Context")+".Provider";case $u:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Hu:return e=t.displayName||null,e!==null?e:Na(t.type)||"Memo";case $t:e=t._payload,t=t._init;try{return Na(t(e))}catch{}}return null}function ty(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Na(e);case 8:return e===Vu?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function pn(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function pp(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function ny(t){var e=pp(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function xi(t){t._valueTracker||(t._valueTracker=ny(t))}function mp(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=pp(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function ro(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Ia(t,e){var n=e.checked;return ee({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function Rd(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=pn(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function gp(t,e){e=e.checked,e!=null&&Wu(t,"checked",e,!1)}function Ta(t,e){gp(t,e);var n=pn(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?ba(t,e.type,n):e.hasOwnProperty("defaultValue")&&ba(t,e.type,pn(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Ad(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function ba(t,e,n){(e!=="number"||ro(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var hs=Array.isArray;function gr(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+pn(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Pa(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(x(91));return ee({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Od(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(x(92));if(hs(n)){if(1<n.length)throw Error(x(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:pn(n)}}function _p(t,e){var n=pn(e.value),r=pn(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Dd(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function vp(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Ra(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?vp(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Ei,yp=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(Ei=Ei||document.createElement("div"),Ei.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=Ei.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Rs(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ms={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},ry=["Webkit","ms","Moz","O"];Object.keys(ms).forEach(function(t){ry.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ms[e]=ms[t]})});function wp(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ms.hasOwnProperty(t)&&ms[t]?(""+e).trim():e+"px"}function xp(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=wp(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var sy=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Aa(t,e){if(e){if(sy[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(x(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(x(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(x(61))}if(e.style!=null&&typeof e.style!="object")throw Error(x(62))}}function Oa(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Da=null;function Gu(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var Ma=null,_r=null,vr=null;function Md(t){if(t=oi(t)){if(typeof Ma!="function")throw Error(x(280));var e=t.stateNode;e&&(e=rl(e),Ma(t.stateNode,t.type,e))}}function Ep(t){_r?vr?vr.push(t):vr=[t]:_r=t}function Sp(){if(_r){var t=_r,e=vr;if(vr=_r=null,Md(t),e)for(t=0;t<e.length;t++)Md(e[t])}}function Cp(t,e){return t(e)}function kp(){}var Fl=!1;function Np(t,e,n){if(Fl)return t(e,n);Fl=!0;try{return Cp(t,e,n)}finally{Fl=!1,(_r!==null||vr!==null)&&(kp(),Sp())}}function As(t,e){var n=t.stateNode;if(n===null)return null;var r=rl(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(x(231,e,typeof n));return n}var La=!1;if(Rt)try{var es={};Object.defineProperty(es,"passive",{get:function(){La=!0}}),window.addEventListener("test",es,es),window.removeEventListener("test",es,es)}catch{La=!1}function iy(t,e,n,r,s,i,o,l,a){var u=Array.prototype.slice.call(arguments,3);try{e.apply(n,u)}catch(f){this.onError(f)}}var gs=!1,so=null,io=!1,ja=null,oy={onError:function(t){gs=!0,so=t}};function ly(t,e,n,r,s,i,o,l,a){gs=!1,so=null,iy.apply(oy,arguments)}function ay(t,e,n,r,s,i,o,l,a){if(ly.apply(this,arguments),gs){if(gs){var u=so;gs=!1,so=null}else throw Error(x(198));io||(io=!0,ja=u)}}function Qn(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Ip(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Ld(t){if(Qn(t)!==t)throw Error(x(188))}function uy(t){var e=t.alternate;if(!e){if(e=Qn(t),e===null)throw Error(x(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Ld(s),t;if(i===r)return Ld(s),e;i=i.sibling}throw Error(x(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(x(189))}}if(n.alternate!==r)throw Error(x(190))}if(n.tag!==3)throw Error(x(188));return n.stateNode.current===n?t:e}function Tp(t){return t=uy(t),t!==null?bp(t):null}function bp(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=bp(t);if(e!==null)return e;t=t.sibling}return null}var Pp=$e.unstable_scheduleCallback,jd=$e.unstable_cancelCallback,cy=$e.unstable_shouldYield,dy=$e.unstable_requestPaint,se=$e.unstable_now,hy=$e.unstable_getCurrentPriorityLevel,Ku=$e.unstable_ImmediatePriority,Rp=$e.unstable_UserBlockingPriority,oo=$e.unstable_NormalPriority,fy=$e.unstable_LowPriority,Ap=$e.unstable_IdlePriority,Zo=null,mt=null;function py(t){if(mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(Zo,t,void 0,(t.current.flags&128)===128)}catch{}}var at=Math.clz32?Math.clz32:_y,my=Math.log,gy=Math.LN2;function _y(t){return t>>>=0,t===0?32:31-(my(t)/gy|0)|0}var Si=64,Ci=4194304;function fs(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function lo(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=fs(l):(i&=o,i!==0&&(r=fs(i)))}else o=n&~s,o!==0?r=fs(o):i!==0&&(r=fs(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-at(e),s=1<<n,r|=t[n],e&=~s;return r}function vy(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function yy(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-at(i),l=1<<o,a=s[o];a===-1?(!(l&n)||l&r)&&(s[o]=vy(l,e)):a<=e&&(t.expiredLanes|=l),i&=~l}}function Fa(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Op(){var t=Si;return Si<<=1,!(Si&4194240)&&(Si=64),t}function Bl(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function si(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-at(e),t[e]=n}function wy(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-at(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function qu(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-at(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var W=0;function Dp(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Mp,Qu,Lp,jp,Fp,Ba=!1,ki=[],en=null,tn=null,nn=null,Os=new Map,Ds=new Map,Gt=[],xy="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Fd(t,e){switch(t){case"focusin":case"focusout":en=null;break;case"dragenter":case"dragleave":tn=null;break;case"mouseover":case"mouseout":nn=null;break;case"pointerover":case"pointerout":Os.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ds.delete(e.pointerId)}}function ts(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=oi(e),e!==null&&Qu(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function Ey(t,e,n,r,s){switch(e){case"focusin":return en=ts(en,t,e,n,r,s),!0;case"dragenter":return tn=ts(tn,t,e,n,r,s),!0;case"mouseover":return nn=ts(nn,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return Os.set(i,ts(Os.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Ds.set(i,ts(Ds.get(i)||null,t,e,n,r,s)),!0}return!1}function Bp(t){var e=Pn(t.target);if(e!==null){var n=Qn(e);if(n!==null){if(e=n.tag,e===13){if(e=Ip(n),e!==null){t.blockedOn=e,Fp(t.priority,function(){Lp(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function zi(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Ua(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Da=r,n.target.dispatchEvent(r),Da=null}else return e=oi(n),e!==null&&Qu(e),t.blockedOn=n,!1;e.shift()}return!0}function Bd(t,e,n){zi(t)&&n.delete(e)}function Sy(){Ba=!1,en!==null&&zi(en)&&(en=null),tn!==null&&zi(tn)&&(tn=null),nn!==null&&zi(nn)&&(nn=null),Os.forEach(Bd),Ds.forEach(Bd)}function ns(t,e){t.blockedOn===e&&(t.blockedOn=null,Ba||(Ba=!0,$e.unstable_scheduleCallback($e.unstable_NormalPriority,Sy)))}function Ms(t){function e(s){return ns(s,t)}if(0<ki.length){ns(ki[0],t);for(var n=1;n<ki.length;n++){var r=ki[n];r.blockedOn===t&&(r.blockedOn=null)}}for(en!==null&&ns(en,t),tn!==null&&ns(tn,t),nn!==null&&ns(nn,t),Os.forEach(e),Ds.forEach(e),n=0;n<Gt.length;n++)r=Gt[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Gt.length&&(n=Gt[0],n.blockedOn===null);)Bp(n),n.blockedOn===null&&Gt.shift()}var yr=Ut.ReactCurrentBatchConfig,ao=!0;function Cy(t,e,n,r){var s=W,i=yr.transition;yr.transition=null;try{W=1,Yu(t,e,n,r)}finally{W=s,yr.transition=i}}function ky(t,e,n,r){var s=W,i=yr.transition;yr.transition=null;try{W=4,Yu(t,e,n,r)}finally{W=s,yr.transition=i}}function Yu(t,e,n,r){if(ao){var s=Ua(t,e,n,r);if(s===null)Ql(t,e,r,uo,n),Fd(t,r);else if(Ey(s,t,e,n,r))r.stopPropagation();else if(Fd(t,r),e&4&&-1<xy.indexOf(t)){for(;s!==null;){var i=oi(s);if(i!==null&&Mp(i),i=Ua(t,e,n,r),i===null&&Ql(t,e,r,uo,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else Ql(t,e,r,null,n)}}var uo=null;function Ua(t,e,n,r){if(uo=null,t=Gu(r),t=Pn(t),t!==null)if(e=Qn(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Ip(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return uo=t,null}function Up(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(hy()){case Ku:return 1;case Rp:return 4;case oo:case fy:return 16;case Ap:return 536870912;default:return 16}default:return 16}}var Jt=null,Xu=null,Wi=null;function zp(){if(Wi)return Wi;var t,e=Xu,n=e.length,r,s="value"in Jt?Jt.value:Jt.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return Wi=s.slice(t,1<r?1-r:void 0)}function Vi(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ni(){return!0}function Ud(){return!1}function Ge(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ni:Ud,this.isPropagationStopped=Ud,this}return ee(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ni)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ni)},persist:function(){},isPersistent:Ni}),e}var $r={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Ju=Ge($r),ii=ee({},$r,{view:0,detail:0}),Ny=Ge(ii),Ul,zl,rs,el=ee({},ii,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Zu,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==rs&&(rs&&t.type==="mousemove"?(Ul=t.screenX-rs.screenX,zl=t.screenY-rs.screenY):zl=Ul=0,rs=t),Ul)},movementY:function(t){return"movementY"in t?t.movementY:zl}}),zd=Ge(el),Iy=ee({},el,{dataTransfer:0}),Ty=Ge(Iy),by=ee({},ii,{relatedTarget:0}),Wl=Ge(by),Py=ee({},$r,{animationName:0,elapsedTime:0,pseudoElement:0}),Ry=Ge(Py),Ay=ee({},$r,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),Oy=Ge(Ay),Dy=ee({},$r,{data:0}),Wd=Ge(Dy),My={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Ly={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},jy={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Fy(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=jy[t])?!!e[t]:!1}function Zu(){return Fy}var By=ee({},ii,{key:function(t){if(t.key){var e=My[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=Vi(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?Ly[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Zu,charCode:function(t){return t.type==="keypress"?Vi(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Vi(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),Uy=Ge(By),zy=ee({},el,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Vd=Ge(zy),Wy=ee({},ii,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Zu}),Vy=Ge(Wy),$y=ee({},$r,{propertyName:0,elapsedTime:0,pseudoElement:0}),Hy=Ge($y),Gy=ee({},el,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),Ky=Ge(Gy),qy=[9,13,27,32],ec=Rt&&"CompositionEvent"in window,_s=null;Rt&&"documentMode"in document&&(_s=document.documentMode);var Qy=Rt&&"TextEvent"in window&&!_s,Wp=Rt&&(!ec||_s&&8<_s&&11>=_s),$d=" ",Hd=!1;function Vp(t,e){switch(t){case"keyup":return qy.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function $p(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var rr=!1;function Yy(t,e){switch(t){case"compositionend":return $p(e);case"keypress":return e.which!==32?null:(Hd=!0,$d);case"textInput":return t=e.data,t===$d&&Hd?null:t;default:return null}}function Xy(t,e){if(rr)return t==="compositionend"||!ec&&Vp(t,e)?(t=zp(),Wi=Xu=Jt=null,rr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Wp&&e.locale!=="ko"?null:e.data;default:return null}}var Jy={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Gd(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!Jy[t.type]:e==="textarea"}function Hp(t,e,n,r){Ep(r),e=co(e,"onChange"),0<e.length&&(n=new Ju("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var vs=null,Ls=null;function Zy(t){nm(t,0)}function tl(t){var e=or(t);if(mp(e))return t}function e0(t,e){if(t==="change")return e}var Gp=!1;if(Rt){var Vl;if(Rt){var $l="oninput"in document;if(!$l){var Kd=document.createElement("div");Kd.setAttribute("oninput","return;"),$l=typeof Kd.oninput=="function"}Vl=$l}else Vl=!1;Gp=Vl&&(!document.documentMode||9<document.documentMode)}function qd(){vs&&(vs.detachEvent("onpropertychange",Kp),Ls=vs=null)}function Kp(t){if(t.propertyName==="value"&&tl(Ls)){var e=[];Hp(e,Ls,t,Gu(t)),Np(Zy,e)}}function t0(t,e,n){t==="focusin"?(qd(),vs=e,Ls=n,vs.attachEvent("onpropertychange",Kp)):t==="focusout"&&qd()}function n0(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return tl(Ls)}function r0(t,e){if(t==="click")return tl(e)}function s0(t,e){if(t==="input"||t==="change")return tl(e)}function i0(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var dt=typeof Object.is=="function"?Object.is:i0;function js(t,e){if(dt(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!Ea.call(e,s)||!dt(t[s],e[s]))return!1}return!0}function Qd(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function Yd(t,e){var n=Qd(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=Qd(n)}}function qp(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?qp(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function Qp(){for(var t=window,e=ro();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ro(t.document)}return e}function tc(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function o0(t){var e=Qp(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&qp(n.ownerDocument.documentElement,n)){if(r!==null&&tc(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=Yd(n,i);var o=Yd(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var l0=Rt&&"documentMode"in document&&11>=document.documentMode,sr=null,za=null,ys=null,Wa=!1;function Xd(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Wa||sr==null||sr!==ro(r)||(r=sr,"selectionStart"in r&&tc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ys&&js(ys,r)||(ys=r,r=co(za,"onSelect"),0<r.length&&(e=new Ju("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=sr)))}function Ii(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var ir={animationend:Ii("Animation","AnimationEnd"),animationiteration:Ii("Animation","AnimationIteration"),animationstart:Ii("Animation","AnimationStart"),transitionend:Ii("Transition","TransitionEnd")},Hl={},Yp={};Rt&&(Yp=document.createElement("div").style,"AnimationEvent"in window||(delete ir.animationend.animation,delete ir.animationiteration.animation,delete ir.animationstart.animation),"TransitionEvent"in window||delete ir.transitionend.transition);function nl(t){if(Hl[t])return Hl[t];if(!ir[t])return t;var e=ir[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in Yp)return Hl[t]=e[n];return t}var Xp=nl("animationend"),Jp=nl("animationiteration"),Zp=nl("animationstart"),em=nl("transitionend"),tm=new Map,Jd="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function yn(t,e){tm.set(t,e),qn(e,[t])}for(var Gl=0;Gl<Jd.length;Gl++){var Kl=Jd[Gl],a0=Kl.toLowerCase(),u0=Kl[0].toUpperCase()+Kl.slice(1);yn(a0,"on"+u0)}yn(Xp,"onAnimationEnd");yn(Jp,"onAnimationIteration");yn(Zp,"onAnimationStart");yn("dblclick","onDoubleClick");yn("focusin","onFocus");yn("focusout","onBlur");yn(em,"onTransitionEnd");Pr("onMouseEnter",["mouseout","mouseover"]);Pr("onMouseLeave",["mouseout","mouseover"]);Pr("onPointerEnter",["pointerout","pointerover"]);Pr("onPointerLeave",["pointerout","pointerover"]);qn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));qn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));qn("onBeforeInput",["compositionend","keypress","textInput","paste"]);qn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));qn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));qn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var ps="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),c0=new Set("cancel close invalid load scroll toggle".split(" ").concat(ps));function Zd(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,ay(r,e,void 0,t),t.currentTarget=null}function nm(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],a=l.instance,u=l.currentTarget;if(l=l.listener,a!==i&&s.isPropagationStopped())break e;Zd(s,l,u),i=a}else for(o=0;o<r.length;o++){if(l=r[o],a=l.instance,u=l.currentTarget,l=l.listener,a!==i&&s.isPropagationStopped())break e;Zd(s,l,u),i=a}}}if(io)throw t=ja,io=!1,ja=null,t}function q(t,e){var n=e[Ka];n===void 0&&(n=e[Ka]=new Set);var r=t+"__bubble";n.has(r)||(rm(e,t,2,!1),n.add(r))}function ql(t,e,n){var r=0;e&&(r|=4),rm(n,t,r,e)}var Ti="_reactListening"+Math.random().toString(36).slice(2);function Fs(t){if(!t[Ti]){t[Ti]=!0,cp.forEach(function(n){n!=="selectionchange"&&(c0.has(n)||ql(n,!1,t),ql(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[Ti]||(e[Ti]=!0,ql("selectionchange",!1,e))}}function rm(t,e,n,r){switch(Up(e)){case 1:var s=Cy;break;case 4:s=ky;break;default:s=Yu}n=s.bind(null,e,n,t),s=void 0,!La||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function Ql(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var a=o.tag;if((a===3||a===4)&&(a=o.stateNode.containerInfo,a===s||a.nodeType===8&&a.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Pn(l),o===null)return;if(a=o.tag,a===5||a===6){r=i=o;continue e}l=l.parentNode}}r=r.return}Np(function(){var u=i,f=Gu(n),h=[];e:{var d=tm.get(t);if(d!==void 0){var _=Ju,v=t;switch(t){case"keypress":if(Vi(n)===0)break e;case"keydown":case"keyup":_=Uy;break;case"focusin":v="focus",_=Wl;break;case"focusout":v="blur",_=Wl;break;case"beforeblur":case"afterblur":_=Wl;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=zd;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=Ty;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=Vy;break;case Xp:case Jp:case Zp:_=Ry;break;case em:_=Hy;break;case"scroll":_=Ny;break;case"wheel":_=Ky;break;case"copy":case"cut":case"paste":_=Oy;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=Vd}var y=(e&4)!==0,C=!y&&t==="scroll",m=y?d!==null?d+"Capture":null:d;y=[];for(var p=u,g;p!==null;){g=p;var w=g.stateNode;if(g.tag===5&&w!==null&&(g=w,m!==null&&(w=As(p,m),w!=null&&y.push(Bs(p,w,g)))),C)break;p=p.return}0<y.length&&(d=new _(d,v,null,n,f),h.push({event:d,listeners:y}))}}if(!(e&7)){e:{if(d=t==="mouseover"||t==="pointerover",_=t==="mouseout"||t==="pointerout",d&&n!==Da&&(v=n.relatedTarget||n.fromElement)&&(Pn(v)||v[At]))break e;if((_||d)&&(d=f.window===f?f:(d=f.ownerDocument)?d.defaultView||d.parentWindow:window,_?(v=n.relatedTarget||n.toElement,_=u,v=v?Pn(v):null,v!==null&&(C=Qn(v),v!==C||v.tag!==5&&v.tag!==6)&&(v=null)):(_=null,v=u),_!==v)){if(y=zd,w="onMouseLeave",m="onMouseEnter",p="mouse",(t==="pointerout"||t==="pointerover")&&(y=Vd,w="onPointerLeave",m="onPointerEnter",p="pointer"),C=_==null?d:or(_),g=v==null?d:or(v),d=new y(w,p+"leave",_,n,f),d.target=C,d.relatedTarget=g,w=null,Pn(f)===u&&(y=new y(m,p+"enter",v,n,f),y.target=g,y.relatedTarget=C,w=y),C=w,_&&v)t:{for(y=_,m=v,p=0,g=y;g;g=Jn(g))p++;for(g=0,w=m;w;w=Jn(w))g++;for(;0<p-g;)y=Jn(y),p--;for(;0<g-p;)m=Jn(m),g--;for(;p--;){if(y===m||m!==null&&y===m.alternate)break t;y=Jn(y),m=Jn(m)}y=null}else y=null;_!==null&&eh(h,d,_,y,!1),v!==null&&C!==null&&eh(h,C,v,y,!0)}}e:{if(d=u?or(u):window,_=d.nodeName&&d.nodeName.toLowerCase(),_==="select"||_==="input"&&d.type==="file")var E=e0;else if(Gd(d))if(Gp)E=s0;else{E=n0;var k=t0}else(_=d.nodeName)&&_.toLowerCase()==="input"&&(d.type==="checkbox"||d.type==="radio")&&(E=r0);if(E&&(E=E(t,u))){Hp(h,E,n,f);break e}k&&k(t,d,u),t==="focusout"&&(k=d._wrapperState)&&k.controlled&&d.type==="number"&&ba(d,"number",d.value)}switch(k=u?or(u):window,t){case"focusin":(Gd(k)||k.contentEditable==="true")&&(sr=k,za=u,ys=null);break;case"focusout":ys=za=sr=null;break;case"mousedown":Wa=!0;break;case"contextmenu":case"mouseup":case"dragend":Wa=!1,Xd(h,n,f);break;case"selectionchange":if(l0)break;case"keydown":case"keyup":Xd(h,n,f)}var N;if(ec)e:{switch(t){case"compositionstart":var b="onCompositionStart";break e;case"compositionend":b="onCompositionEnd";break e;case"compositionupdate":b="onCompositionUpdate";break e}b=void 0}else rr?Vp(t,n)&&(b="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(b="onCompositionStart");b&&(Wp&&n.locale!=="ko"&&(rr||b!=="onCompositionStart"?b==="onCompositionEnd"&&rr&&(N=zp()):(Jt=f,Xu="value"in Jt?Jt.value:Jt.textContent,rr=!0)),k=co(u,b),0<k.length&&(b=new Wd(b,t,null,n,f),h.push({event:b,listeners:k}),N?b.data=N:(N=$p(n),N!==null&&(b.data=N)))),(N=Qy?Yy(t,n):Xy(t,n))&&(u=co(u,"onBeforeInput"),0<u.length&&(f=new Wd("onBeforeInput","beforeinput",null,n,f),h.push({event:f,listeners:u}),f.data=N))}nm(h,e)})}function Bs(t,e,n){return{instance:t,listener:e,currentTarget:n}}function co(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=As(t,n),i!=null&&r.unshift(Bs(t,i,s)),i=As(t,e),i!=null&&r.push(Bs(t,i,s))),t=t.return}return r}function Jn(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function eh(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,a=l.alternate,u=l.stateNode;if(a!==null&&a===r)break;l.tag===5&&u!==null&&(l=u,s?(a=As(n,i),a!=null&&o.unshift(Bs(n,a,l))):s||(a=As(n,i),a!=null&&o.push(Bs(n,a,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var d0=/\r\n?/g,h0=/\u0000|\uFFFD/g;function th(t){return(typeof t=="string"?t:""+t).replace(d0,`
`).replace(h0,"")}function bi(t,e,n){if(e=th(e),th(t)!==e&&n)throw Error(x(425))}function ho(){}var Va=null,$a=null;function Ha(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ga=typeof setTimeout=="function"?setTimeout:void 0,f0=typeof clearTimeout=="function"?clearTimeout:void 0,nh=typeof Promise=="function"?Promise:void 0,p0=typeof queueMicrotask=="function"?queueMicrotask:typeof nh<"u"?function(t){return nh.resolve(null).then(t).catch(m0)}:Ga;function m0(t){setTimeout(function(){throw t})}function Yl(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),Ms(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Ms(e)}function rn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function rh(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Hr=Math.random().toString(36).slice(2),pt="__reactFiber$"+Hr,Us="__reactProps$"+Hr,At="__reactContainer$"+Hr,Ka="__reactEvents$"+Hr,g0="__reactListeners$"+Hr,_0="__reactHandles$"+Hr;function Pn(t){var e=t[pt];if(e)return e;for(var n=t.parentNode;n;){if(e=n[At]||n[pt]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=rh(t);t!==null;){if(n=t[pt])return n;t=rh(t)}return e}t=n,n=t.parentNode}return null}function oi(t){return t=t[pt]||t[At],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function or(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(x(33))}function rl(t){return t[Us]||null}var qa=[],lr=-1;function wn(t){return{current:t}}function Y(t){0>lr||(t.current=qa[lr],qa[lr]=null,lr--)}function K(t,e){lr++,qa[lr]=t.current,t.current=e}var mn={},Ne=wn(mn),Le=wn(!1),jn=mn;function Rr(t,e){var n=t.type.contextTypes;if(!n)return mn;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function je(t){return t=t.childContextTypes,t!=null}function fo(){Y(Le),Y(Ne)}function sh(t,e,n){if(Ne.current!==mn)throw Error(x(168));K(Ne,e),K(Le,n)}function sm(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(x(108,ty(t)||"Unknown",s));return ee({},n,r)}function po(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||mn,jn=Ne.current,K(Ne,t),K(Le,Le.current),!0}function ih(t,e,n){var r=t.stateNode;if(!r)throw Error(x(169));n?(t=sm(t,e,jn),r.__reactInternalMemoizedMergedChildContext=t,Y(Le),Y(Ne),K(Ne,t)):Y(Le),K(Le,n)}var wt=null,sl=!1,Xl=!1;function im(t){wt===null?wt=[t]:wt.push(t)}function v0(t){sl=!0,im(t)}function xn(){if(!Xl&&wt!==null){Xl=!0;var t=0,e=W;try{var n=wt;for(W=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}wt=null,sl=!1}catch(s){throw wt!==null&&(wt=wt.slice(t+1)),Pp(Ku,xn),s}finally{W=e,Xl=!1}}return null}var ar=[],ur=0,mo=null,go=0,Ke=[],qe=0,Fn=null,Et=1,St="";function Nn(t,e){ar[ur++]=go,ar[ur++]=mo,mo=t,go=e}function om(t,e,n){Ke[qe++]=Et,Ke[qe++]=St,Ke[qe++]=Fn,Fn=t;var r=Et;t=St;var s=32-at(r)-1;r&=~(1<<s),n+=1;var i=32-at(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,Et=1<<32-at(e)+s|n<<s|r,St=i+t}else Et=1<<i|n<<s|r,St=t}function nc(t){t.return!==null&&(Nn(t,1),om(t,1,0))}function rc(t){for(;t===mo;)mo=ar[--ur],ar[ur]=null,go=ar[--ur],ar[ur]=null;for(;t===Fn;)Fn=Ke[--qe],Ke[qe]=null,St=Ke[--qe],Ke[qe]=null,Et=Ke[--qe],Ke[qe]=null}var Ve=null,We=null,X=!1,st=null;function lm(t,e){var n=Qe(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function oh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,Ve=t,We=rn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,Ve=t,We=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Fn!==null?{id:Et,overflow:St}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Qe(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,Ve=t,We=null,!0):!1;default:return!1}}function Qa(t){return(t.mode&1)!==0&&(t.flags&128)===0}function Ya(t){if(X){var e=We;if(e){var n=e;if(!oh(t,e)){if(Qa(t))throw Error(x(418));e=rn(n.nextSibling);var r=Ve;e&&oh(t,e)?lm(r,n):(t.flags=t.flags&-4097|2,X=!1,Ve=t)}}else{if(Qa(t))throw Error(x(418));t.flags=t.flags&-4097|2,X=!1,Ve=t}}}function lh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;Ve=t}function Pi(t){if(t!==Ve)return!1;if(!X)return lh(t),X=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Ha(t.type,t.memoizedProps)),e&&(e=We)){if(Qa(t))throw am(),Error(x(418));for(;e;)lm(t,e),e=rn(e.nextSibling)}if(lh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(x(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){We=rn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}We=null}}else We=Ve?rn(t.stateNode.nextSibling):null;return!0}function am(){for(var t=We;t;)t=rn(t.nextSibling)}function Ar(){We=Ve=null,X=!1}function sc(t){st===null?st=[t]:st.push(t)}var y0=Ut.ReactCurrentBatchConfig;function ss(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(x(309));var r=n.stateNode}if(!r)throw Error(x(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(x(284));if(!n._owner)throw Error(x(290,t))}return t}function Ri(t,e){throw t=Object.prototype.toString.call(e),Error(x(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function ah(t){var e=t._init;return e(t._payload)}function um(t){function e(m,p){if(t){var g=m.deletions;g===null?(m.deletions=[p],m.flags|=16):g.push(p)}}function n(m,p){if(!t)return null;for(;p!==null;)e(m,p),p=p.sibling;return null}function r(m,p){for(m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function s(m,p){return m=an(m,p),m.index=0,m.sibling=null,m}function i(m,p,g){return m.index=g,t?(g=m.alternate,g!==null?(g=g.index,g<p?(m.flags|=2,p):g):(m.flags|=2,p)):(m.flags|=1048576,p)}function o(m){return t&&m.alternate===null&&(m.flags|=2),m}function l(m,p,g,w){return p===null||p.tag!==6?(p=sa(g,m.mode,w),p.return=m,p):(p=s(p,g),p.return=m,p)}function a(m,p,g,w){var E=g.type;return E===nr?f(m,p,g.props.children,w,g.key):p!==null&&(p.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===$t&&ah(E)===p.type)?(w=s(p,g.props),w.ref=ss(m,p,g),w.return=m,w):(w=Yi(g.type,g.key,g.props,null,m.mode,w),w.ref=ss(m,p,g),w.return=m,w)}function u(m,p,g,w){return p===null||p.tag!==4||p.stateNode.containerInfo!==g.containerInfo||p.stateNode.implementation!==g.implementation?(p=ia(g,m.mode,w),p.return=m,p):(p=s(p,g.children||[]),p.return=m,p)}function f(m,p,g,w,E){return p===null||p.tag!==7?(p=Ln(g,m.mode,w,E),p.return=m,p):(p=s(p,g),p.return=m,p)}function h(m,p,g){if(typeof p=="string"&&p!==""||typeof p=="number")return p=sa(""+p,m.mode,g),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case wi:return g=Yi(p.type,p.key,p.props,null,m.mode,g),g.ref=ss(m,null,p),g.return=m,g;case tr:return p=ia(p,m.mode,g),p.return=m,p;case $t:var w=p._init;return h(m,w(p._payload),g)}if(hs(p)||Zr(p))return p=Ln(p,m.mode,g,null),p.return=m,p;Ri(m,p)}return null}function d(m,p,g,w){var E=p!==null?p.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return E!==null?null:l(m,p,""+g,w);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case wi:return g.key===E?a(m,p,g,w):null;case tr:return g.key===E?u(m,p,g,w):null;case $t:return E=g._init,d(m,p,E(g._payload),w)}if(hs(g)||Zr(g))return E!==null?null:f(m,p,g,w,null);Ri(m,g)}return null}function _(m,p,g,w,E){if(typeof w=="string"&&w!==""||typeof w=="number")return m=m.get(g)||null,l(p,m,""+w,E);if(typeof w=="object"&&w!==null){switch(w.$$typeof){case wi:return m=m.get(w.key===null?g:w.key)||null,a(p,m,w,E);case tr:return m=m.get(w.key===null?g:w.key)||null,u(p,m,w,E);case $t:var k=w._init;return _(m,p,g,k(w._payload),E)}if(hs(w)||Zr(w))return m=m.get(g)||null,f(p,m,w,E,null);Ri(p,w)}return null}function v(m,p,g,w){for(var E=null,k=null,N=p,b=p=0,$=null;N!==null&&b<g.length;b++){N.index>b?($=N,N=null):$=N.sibling;var O=d(m,N,g[b],w);if(O===null){N===null&&(N=$);break}t&&N&&O.alternate===null&&e(m,N),p=i(O,p,b),k===null?E=O:k.sibling=O,k=O,N=$}if(b===g.length)return n(m,N),X&&Nn(m,b),E;if(N===null){for(;b<g.length;b++)N=h(m,g[b],w),N!==null&&(p=i(N,p,b),k===null?E=N:k.sibling=N,k=N);return X&&Nn(m,b),E}for(N=r(m,N);b<g.length;b++)$=_(N,m,b,g[b],w),$!==null&&(t&&$.alternate!==null&&N.delete($.key===null?b:$.key),p=i($,p,b),k===null?E=$:k.sibling=$,k=$);return t&&N.forEach(function(oe){return e(m,oe)}),X&&Nn(m,b),E}function y(m,p,g,w){var E=Zr(g);if(typeof E!="function")throw Error(x(150));if(g=E.call(g),g==null)throw Error(x(151));for(var k=E=null,N=p,b=p=0,$=null,O=g.next();N!==null&&!O.done;b++,O=g.next()){N.index>b?($=N,N=null):$=N.sibling;var oe=d(m,N,O.value,w);if(oe===null){N===null&&(N=$);break}t&&N&&oe.alternate===null&&e(m,N),p=i(oe,p,b),k===null?E=oe:k.sibling=oe,k=oe,N=$}if(O.done)return n(m,N),X&&Nn(m,b),E;if(N===null){for(;!O.done;b++,O=g.next())O=h(m,O.value,w),O!==null&&(p=i(O,p,b),k===null?E=O:k.sibling=O,k=O);return X&&Nn(m,b),E}for(N=r(m,N);!O.done;b++,O=g.next())O=_(N,m,b,O.value,w),O!==null&&(t&&O.alternate!==null&&N.delete(O.key===null?b:O.key),p=i(O,p,b),k===null?E=O:k.sibling=O,k=O);return t&&N.forEach(function(ce){return e(m,ce)}),X&&Nn(m,b),E}function C(m,p,g,w){if(typeof g=="object"&&g!==null&&g.type===nr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case wi:e:{for(var E=g.key,k=p;k!==null;){if(k.key===E){if(E=g.type,E===nr){if(k.tag===7){n(m,k.sibling),p=s(k,g.props.children),p.return=m,m=p;break e}}else if(k.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===$t&&ah(E)===k.type){n(m,k.sibling),p=s(k,g.props),p.ref=ss(m,k,g),p.return=m,m=p;break e}n(m,k);break}else e(m,k);k=k.sibling}g.type===nr?(p=Ln(g.props.children,m.mode,w,g.key),p.return=m,m=p):(w=Yi(g.type,g.key,g.props,null,m.mode,w),w.ref=ss(m,p,g),w.return=m,m=w)}return o(m);case tr:e:{for(k=g.key;p!==null;){if(p.key===k)if(p.tag===4&&p.stateNode.containerInfo===g.containerInfo&&p.stateNode.implementation===g.implementation){n(m,p.sibling),p=s(p,g.children||[]),p.return=m,m=p;break e}else{n(m,p);break}else e(m,p);p=p.sibling}p=ia(g,m.mode,w),p.return=m,m=p}return o(m);case $t:return k=g._init,C(m,p,k(g._payload),w)}if(hs(g))return v(m,p,g,w);if(Zr(g))return y(m,p,g,w);Ri(m,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,p!==null&&p.tag===6?(n(m,p.sibling),p=s(p,g),p.return=m,m=p):(n(m,p),p=sa(g,m.mode,w),p.return=m,m=p),o(m)):n(m,p)}return C}var Or=um(!0),cm=um(!1),_o=wn(null),vo=null,cr=null,ic=null;function oc(){ic=cr=vo=null}function lc(t){var e=_o.current;Y(_o),t._currentValue=e}function Xa(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function wr(t,e){vo=t,ic=cr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(Oe=!0),t.firstContext=null)}function Xe(t){var e=t._currentValue;if(ic!==t)if(t={context:t,memoizedValue:e,next:null},cr===null){if(vo===null)throw Error(x(308));cr=t,vo.dependencies={lanes:0,firstContext:t}}else cr=cr.next=t;return e}var Rn=null;function ac(t){Rn===null?Rn=[t]:Rn.push(t)}function dm(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,ac(e)):(n.next=s.next,s.next=n),e.interleaved=n,Ot(t,r)}function Ot(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Ht=!1;function uc(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function hm(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function bt(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function sn(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,B&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Ot(t,n)}return s=r.interleaved,s===null?(e.next=e,ac(r)):(e.next=s.next,s.next=e),r.interleaved=e,Ot(t,n)}function $i(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,qu(t,n)}}function uh(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function yo(t,e,n,r){var s=t.updateQueue;Ht=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var a=l,u=a.next;a.next=null,o===null?i=u:o.next=u,o=a;var f=t.alternate;f!==null&&(f=f.updateQueue,l=f.lastBaseUpdate,l!==o&&(l===null?f.firstBaseUpdate=u:l.next=u,f.lastBaseUpdate=a))}if(i!==null){var h=s.baseState;o=0,f=u=a=null,l=i;do{var d=l.lane,_=l.eventTime;if((r&d)===d){f!==null&&(f=f.next={eventTime:_,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var v=t,y=l;switch(d=e,_=n,y.tag){case 1:if(v=y.payload,typeof v=="function"){h=v.call(_,h,d);break e}h=v;break e;case 3:v.flags=v.flags&-65537|128;case 0:if(v=y.payload,d=typeof v=="function"?v.call(_,h,d):v,d==null)break e;h=ee({},h,d);break e;case 2:Ht=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,d=s.effects,d===null?s.effects=[l]:d.push(l))}else _={eventTime:_,lane:d,tag:l.tag,payload:l.payload,callback:l.callback,next:null},f===null?(u=f=_,a=h):f=f.next=_,o|=d;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;d=l,l=d.next,d.next=null,s.lastBaseUpdate=d,s.shared.pending=null}}while(!0);if(f===null&&(a=h),s.baseState=a,s.firstBaseUpdate=u,s.lastBaseUpdate=f,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);Un|=o,t.lanes=o,t.memoizedState=h}}function ch(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(x(191,s));s.call(r)}}}var li={},gt=wn(li),zs=wn(li),Ws=wn(li);function An(t){if(t===li)throw Error(x(174));return t}function cc(t,e){switch(K(Ws,e),K(zs,t),K(gt,li),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Ra(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Ra(e,t)}Y(gt),K(gt,e)}function Dr(){Y(gt),Y(zs),Y(Ws)}function fm(t){An(Ws.current);var e=An(gt.current),n=Ra(e,t.type);e!==n&&(K(zs,t),K(gt,n))}function dc(t){zs.current===t&&(Y(gt),Y(zs))}var J=wn(0);function wo(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var Jl=[];function hc(){for(var t=0;t<Jl.length;t++)Jl[t]._workInProgressVersionPrimary=null;Jl.length=0}var Hi=Ut.ReactCurrentDispatcher,Zl=Ut.ReactCurrentBatchConfig,Bn=0,Z=null,le=null,fe=null,xo=!1,ws=!1,Vs=0,w0=0;function Ee(){throw Error(x(321))}function fc(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!dt(t[n],e[n]))return!1;return!0}function pc(t,e,n,r,s,i){if(Bn=i,Z=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Hi.current=t===null||t.memoizedState===null?C0:k0,t=n(r,s),ws){i=0;do{if(ws=!1,Vs=0,25<=i)throw Error(x(301));i+=1,fe=le=null,e.updateQueue=null,Hi.current=N0,t=n(r,s)}while(ws)}if(Hi.current=Eo,e=le!==null&&le.next!==null,Bn=0,fe=le=Z=null,xo=!1,e)throw Error(x(300));return t}function mc(){var t=Vs!==0;return Vs=0,t}function ft(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return fe===null?Z.memoizedState=fe=t:fe=fe.next=t,fe}function Je(){if(le===null){var t=Z.alternate;t=t!==null?t.memoizedState:null}else t=le.next;var e=fe===null?Z.memoizedState:fe.next;if(e!==null)fe=e,le=t;else{if(t===null)throw Error(x(310));le=t,t={memoizedState:le.memoizedState,baseState:le.baseState,baseQueue:le.baseQueue,queue:le.queue,next:null},fe===null?Z.memoizedState=fe=t:fe=fe.next=t}return fe}function $s(t,e){return typeof e=="function"?e(t):e}function ea(t){var e=Je(),n=e.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=t;var r=le,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,a=null,u=i;do{var f=u.lane;if((Bn&f)===f)a!==null&&(a=a.next={lane:0,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),r=u.hasEagerState?u.eagerState:t(r,u.action);else{var h={lane:f,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null};a===null?(l=a=h,o=r):a=a.next=h,Z.lanes|=f,Un|=f}u=u.next}while(u!==null&&u!==i);a===null?o=r:a.next=l,dt(r,e.memoizedState)||(Oe=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=a,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,Z.lanes|=i,Un|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function ta(t){var e=Je(),n=e.queue;if(n===null)throw Error(x(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);dt(i,e.memoizedState)||(Oe=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function pm(){}function mm(t,e){var n=Z,r=Je(),s=e(),i=!dt(r.memoizedState,s);if(i&&(r.memoizedState=s,Oe=!0),r=r.queue,gc(vm.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||fe!==null&&fe.memoizedState.tag&1){if(n.flags|=2048,Hs(9,_m.bind(null,n,r,s,e),void 0,null),ge===null)throw Error(x(349));Bn&30||gm(n,e,s)}return s}function gm(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=Z.updateQueue,e===null?(e={lastEffect:null,stores:null},Z.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function _m(t,e,n,r){e.value=n,e.getSnapshot=r,ym(e)&&wm(t)}function vm(t,e,n){return n(function(){ym(e)&&wm(t)})}function ym(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!dt(t,n)}catch{return!0}}function wm(t){var e=Ot(t,1);e!==null&&ut(e,t,1,-1)}function dh(t){var e=ft();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:$s,lastRenderedState:t},e.queue=t,t=t.dispatch=S0.bind(null,Z,t),[e.memoizedState,t]}function Hs(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=Z.updateQueue,e===null?(e={lastEffect:null,stores:null},Z.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function xm(){return Je().memoizedState}function Gi(t,e,n,r){var s=ft();Z.flags|=t,s.memoizedState=Hs(1|e,n,void 0,r===void 0?null:r)}function il(t,e,n,r){var s=Je();r=r===void 0?null:r;var i=void 0;if(le!==null){var o=le.memoizedState;if(i=o.destroy,r!==null&&fc(r,o.deps)){s.memoizedState=Hs(e,n,i,r);return}}Z.flags|=t,s.memoizedState=Hs(1|e,n,i,r)}function hh(t,e){return Gi(8390656,8,t,e)}function gc(t,e){return il(2048,8,t,e)}function Em(t,e){return il(4,2,t,e)}function Sm(t,e){return il(4,4,t,e)}function Cm(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function km(t,e,n){return n=n!=null?n.concat([t]):null,il(4,4,Cm.bind(null,e,t),n)}function _c(){}function Nm(t,e){var n=Je();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&fc(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Im(t,e){var n=Je();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&fc(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Tm(t,e,n){return Bn&21?(dt(n,e)||(n=Op(),Z.lanes|=n,Un|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,Oe=!0),t.memoizedState=n)}function x0(t,e){var n=W;W=n!==0&&4>n?n:4,t(!0);var r=Zl.transition;Zl.transition={};try{t(!1),e()}finally{W=n,Zl.transition=r}}function bm(){return Je().memoizedState}function E0(t,e,n){var r=ln(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},Pm(t))Rm(e,n);else if(n=dm(t,e,n,r),n!==null){var s=Te();ut(n,t,r,s),Am(n,e,r)}}function S0(t,e,n){var r=ln(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(Pm(t))Rm(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,dt(l,o)){var a=e.interleaved;a===null?(s.next=s,ac(e)):(s.next=a.next,a.next=s),e.interleaved=s;return}}catch{}finally{}n=dm(t,e,s,r),n!==null&&(s=Te(),ut(n,t,r,s),Am(n,e,r))}}function Pm(t){var e=t.alternate;return t===Z||e!==null&&e===Z}function Rm(t,e){ws=xo=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Am(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,qu(t,n)}}var Eo={readContext:Xe,useCallback:Ee,useContext:Ee,useEffect:Ee,useImperativeHandle:Ee,useInsertionEffect:Ee,useLayoutEffect:Ee,useMemo:Ee,useReducer:Ee,useRef:Ee,useState:Ee,useDebugValue:Ee,useDeferredValue:Ee,useTransition:Ee,useMutableSource:Ee,useSyncExternalStore:Ee,useId:Ee,unstable_isNewReconciler:!1},C0={readContext:Xe,useCallback:function(t,e){return ft().memoizedState=[t,e===void 0?null:e],t},useContext:Xe,useEffect:hh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Gi(4194308,4,Cm.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Gi(4194308,4,t,e)},useInsertionEffect:function(t,e){return Gi(4,2,t,e)},useMemo:function(t,e){var n=ft();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=ft();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=E0.bind(null,Z,t),[r.memoizedState,t]},useRef:function(t){var e=ft();return t={current:t},e.memoizedState=t},useState:dh,useDebugValue:_c,useDeferredValue:function(t){return ft().memoizedState=t},useTransition:function(){var t=dh(!1),e=t[0];return t=x0.bind(null,t[1]),ft().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=Z,s=ft();if(X){if(n===void 0)throw Error(x(407));n=n()}else{if(n=e(),ge===null)throw Error(x(349));Bn&30||gm(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,hh(vm.bind(null,r,i,t),[t]),r.flags|=2048,Hs(9,_m.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=ft(),e=ge.identifierPrefix;if(X){var n=St,r=Et;n=(r&~(1<<32-at(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Vs++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=w0++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},k0={readContext:Xe,useCallback:Nm,useContext:Xe,useEffect:gc,useImperativeHandle:km,useInsertionEffect:Em,useLayoutEffect:Sm,useMemo:Im,useReducer:ea,useRef:xm,useState:function(){return ea($s)},useDebugValue:_c,useDeferredValue:function(t){var e=Je();return Tm(e,le.memoizedState,t)},useTransition:function(){var t=ea($s)[0],e=Je().memoizedState;return[t,e]},useMutableSource:pm,useSyncExternalStore:mm,useId:bm,unstable_isNewReconciler:!1},N0={readContext:Xe,useCallback:Nm,useContext:Xe,useEffect:gc,useImperativeHandle:km,useInsertionEffect:Em,useLayoutEffect:Sm,useMemo:Im,useReducer:ta,useRef:xm,useState:function(){return ta($s)},useDebugValue:_c,useDeferredValue:function(t){var e=Je();return le===null?e.memoizedState=t:Tm(e,le.memoizedState,t)},useTransition:function(){var t=ta($s)[0],e=Je().memoizedState;return[t,e]},useMutableSource:pm,useSyncExternalStore:mm,useId:bm,unstable_isNewReconciler:!1};function nt(t,e){if(t&&t.defaultProps){e=ee({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function Ja(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:ee({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var ol={isMounted:function(t){return(t=t._reactInternals)?Qn(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=Te(),s=ln(t),i=bt(r,s);i.payload=e,n!=null&&(i.callback=n),e=sn(t,i,s),e!==null&&(ut(e,t,s,r),$i(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=Te(),s=ln(t),i=bt(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=sn(t,i,s),e!==null&&(ut(e,t,s,r),$i(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=Te(),r=ln(t),s=bt(n,r);s.tag=2,e!=null&&(s.callback=e),e=sn(t,s,r),e!==null&&(ut(e,t,r,n),$i(e,t,r))}};function fh(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!js(n,r)||!js(s,i):!0}function Om(t,e,n){var r=!1,s=mn,i=e.contextType;return typeof i=="object"&&i!==null?i=Xe(i):(s=je(e)?jn:Ne.current,r=e.contextTypes,i=(r=r!=null)?Rr(t,s):mn),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=ol,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function ph(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&ol.enqueueReplaceState(e,e.state,null)}function Za(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},uc(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Xe(i):(i=je(e)?jn:Ne.current,s.context=Rr(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(Ja(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&ol.enqueueReplaceState(s,s.state,null),yo(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Mr(t,e){try{var n="",r=e;do n+=ey(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function na(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function eu(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var I0=typeof WeakMap=="function"?WeakMap:Map;function Dm(t,e,n){n=bt(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){Co||(Co=!0,cu=r),eu(t,e)},n}function Mm(t,e,n){n=bt(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){eu(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){eu(t,e),typeof r!="function"&&(on===null?on=new Set([this]):on.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function mh(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new I0;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=z0.bind(null,t,e,n),e.then(t,t))}function gh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function _h(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=bt(-1,1),e.tag=2,sn(n,e,1))),n.lanes|=1),t)}var T0=Ut.ReactCurrentOwner,Oe=!1;function Ie(t,e,n,r){e.child=t===null?cm(e,null,n,r):Or(e,t.child,n,r)}function vh(t,e,n,r,s){n=n.render;var i=e.ref;return wr(e,s),r=pc(t,e,n,r,i,s),n=mc(),t!==null&&!Oe?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Dt(t,e,s)):(X&&n&&nc(e),e.flags|=1,Ie(t,e,r,s),e.child)}function yh(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!kc(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,Lm(t,e,i,r,s)):(t=Yi(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:js,n(o,r)&&t.ref===e.ref)return Dt(t,e,s)}return e.flags|=1,t=an(i,r),t.ref=e.ref,t.return=e,e.child=t}function Lm(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(js(i,r)&&t.ref===e.ref)if(Oe=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(Oe=!0);else return e.lanes=t.lanes,Dt(t,e,s)}return tu(t,e,n,r,s)}function jm(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},K(hr,ze),ze|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,K(hr,ze),ze|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,K(hr,ze),ze|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,K(hr,ze),ze|=r;return Ie(t,e,s,n),e.child}function Fm(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function tu(t,e,n,r,s){var i=je(n)?jn:Ne.current;return i=Rr(e,i),wr(e,s),n=pc(t,e,n,r,i,s),r=mc(),t!==null&&!Oe?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,Dt(t,e,s)):(X&&r&&nc(e),e.flags|=1,Ie(t,e,n,s),e.child)}function wh(t,e,n,r,s){if(je(n)){var i=!0;po(e)}else i=!1;if(wr(e,s),e.stateNode===null)Ki(t,e),Om(e,n,r),Za(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var a=o.context,u=n.contextType;typeof u=="object"&&u!==null?u=Xe(u):(u=je(n)?jn:Ne.current,u=Rr(e,u));var f=n.getDerivedStateFromProps,h=typeof f=="function"||typeof o.getSnapshotBeforeUpdate=="function";h||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||a!==u)&&ph(e,o,r,u),Ht=!1;var d=e.memoizedState;o.state=d,yo(e,r,o,s),a=e.memoizedState,l!==r||d!==a||Le.current||Ht?(typeof f=="function"&&(Ja(e,n,f,r),a=e.memoizedState),(l=Ht||fh(e,n,l,r,d,a,u))?(h||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=a),o.props=r,o.state=a,o.context=u,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,hm(t,e),l=e.memoizedProps,u=e.type===e.elementType?l:nt(e.type,l),o.props=u,h=e.pendingProps,d=o.context,a=n.contextType,typeof a=="object"&&a!==null?a=Xe(a):(a=je(n)?jn:Ne.current,a=Rr(e,a));var _=n.getDerivedStateFromProps;(f=typeof _=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==h||d!==a)&&ph(e,o,r,a),Ht=!1,d=e.memoizedState,o.state=d,yo(e,r,o,s);var v=e.memoizedState;l!==h||d!==v||Le.current||Ht?(typeof _=="function"&&(Ja(e,n,_,r),v=e.memoizedState),(u=Ht||fh(e,n,u,r,d,v,a)||!1)?(f||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,v,a),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,v,a)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=v),o.props=r,o.state=v,o.context=a,r=u):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&d===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&d===t.memoizedState||(e.flags|=1024),r=!1)}return nu(t,e,n,r,i,s)}function nu(t,e,n,r,s,i){Fm(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&ih(e,n,!1),Dt(t,e,i);r=e.stateNode,T0.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=Or(e,t.child,null,i),e.child=Or(e,null,l,i)):Ie(t,e,l,i),e.memoizedState=r.state,s&&ih(e,n,!0),e.child}function Bm(t){var e=t.stateNode;e.pendingContext?sh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&sh(t,e.context,!1),cc(t,e.containerInfo)}function xh(t,e,n,r,s){return Ar(),sc(s),e.flags|=256,Ie(t,e,n,r),e.child}var ru={dehydrated:null,treeContext:null,retryLane:0};function su(t){return{baseLanes:t,cachePool:null,transitions:null}}function Um(t,e,n){var r=e.pendingProps,s=J.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),K(J,s&1),t===null)return Ya(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=ul(o,r,0,null),t=Ln(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=su(n),e.memoizedState=ru,t):vc(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return b0(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var a={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=a,e.deletions=null):(r=an(s,a),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=an(l,i):(i=Ln(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?su(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=ru,r}return i=t.child,t=i.sibling,r=an(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function vc(t,e){return e=ul({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Ai(t,e,n,r){return r!==null&&sc(r),Or(e,t.child,null,n),t=vc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function b0(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=na(Error(x(422))),Ai(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=ul({mode:"visible",children:r.children},s,0,null),i=Ln(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&Or(e,t.child,null,o),e.child.memoizedState=su(o),e.memoizedState=ru,i);if(!(e.mode&1))return Ai(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(x(419)),r=na(i,r,void 0),Ai(t,e,o,r)}if(l=(o&t.childLanes)!==0,Oe||l){if(r=ge,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Ot(t,s),ut(r,t,s,-1))}return Cc(),r=na(Error(x(421))),Ai(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=W0.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,We=rn(s.nextSibling),Ve=e,X=!0,st=null,t!==null&&(Ke[qe++]=Et,Ke[qe++]=St,Ke[qe++]=Fn,Et=t.id,St=t.overflow,Fn=e),e=vc(e,r.children),e.flags|=4096,e)}function Eh(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),Xa(t.return,e,n)}function ra(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function zm(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(Ie(t,e,r.children,n),r=J.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Eh(t,n,e);else if(t.tag===19)Eh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(K(J,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&wo(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),ra(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&wo(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}ra(e,!0,n,null,i);break;case"together":ra(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Ki(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function Dt(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),Un|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(x(153));if(e.child!==null){for(t=e.child,n=an(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=an(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function P0(t,e,n){switch(e.tag){case 3:Bm(e),Ar();break;case 5:fm(e);break;case 1:je(e.type)&&po(e);break;case 4:cc(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;K(_o,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(K(J,J.current&1),e.flags|=128,null):n&e.child.childLanes?Um(t,e,n):(K(J,J.current&1),t=Dt(t,e,n),t!==null?t.sibling:null);K(J,J.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return zm(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),K(J,J.current),r)break;return null;case 22:case 23:return e.lanes=0,jm(t,e,n)}return Dt(t,e,n)}var Wm,iu,Vm,$m;Wm=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};iu=function(){};Vm=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,An(gt.current);var i=null;switch(n){case"input":s=Ia(t,s),r=Ia(t,r),i=[];break;case"select":s=ee({},s,{value:void 0}),r=ee({},r,{value:void 0}),i=[];break;case"textarea":s=Pa(t,s),r=Pa(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=ho)}Aa(n,r);var o;n=null;for(u in s)if(!r.hasOwnProperty(u)&&s.hasOwnProperty(u)&&s[u]!=null)if(u==="style"){var l=s[u];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else u!=="dangerouslySetInnerHTML"&&u!=="children"&&u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&u!=="autoFocus"&&(Ps.hasOwnProperty(u)?i||(i=[]):(i=i||[]).push(u,null));for(u in r){var a=r[u];if(l=s!=null?s[u]:void 0,r.hasOwnProperty(u)&&a!==l&&(a!=null||l!=null))if(u==="style")if(l){for(o in l)!l.hasOwnProperty(o)||a&&a.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in a)a.hasOwnProperty(o)&&l[o]!==a[o]&&(n||(n={}),n[o]=a[o])}else n||(i||(i=[]),i.push(u,n)),n=a;else u==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,l=l?l.__html:void 0,a!=null&&l!==a&&(i=i||[]).push(u,a)):u==="children"?typeof a!="string"&&typeof a!="number"||(i=i||[]).push(u,""+a):u!=="suppressContentEditableWarning"&&u!=="suppressHydrationWarning"&&(Ps.hasOwnProperty(u)?(a!=null&&u==="onScroll"&&q("scroll",t),i||l===a||(i=[])):(i=i||[]).push(u,a))}n&&(i=i||[]).push("style",n);var u=i;(e.updateQueue=u)&&(e.flags|=4)}};$m=function(t,e,n,r){n!==r&&(e.flags|=4)};function is(t,e){if(!X)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Se(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function R0(t,e,n){var r=e.pendingProps;switch(rc(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Se(e),null;case 1:return je(e.type)&&fo(),Se(e),null;case 3:return r=e.stateNode,Dr(),Y(Le),Y(Ne),hc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Pi(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,st!==null&&(fu(st),st=null))),iu(t,e),Se(e),null;case 5:dc(e);var s=An(Ws.current);if(n=e.type,t!==null&&e.stateNode!=null)Vm(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(x(166));return Se(e),null}if(t=An(gt.current),Pi(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[pt]=e,r[Us]=i,t=(e.mode&1)!==0,n){case"dialog":q("cancel",r),q("close",r);break;case"iframe":case"object":case"embed":q("load",r);break;case"video":case"audio":for(s=0;s<ps.length;s++)q(ps[s],r);break;case"source":q("error",r);break;case"img":case"image":case"link":q("error",r),q("load",r);break;case"details":q("toggle",r);break;case"input":Rd(r,i),q("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},q("invalid",r);break;case"textarea":Od(r,i),q("invalid",r)}Aa(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&bi(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&bi(r.textContent,l,t),s=["children",""+l]):Ps.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&q("scroll",r)}switch(n){case"input":xi(r),Ad(r,i,!0);break;case"textarea":xi(r),Dd(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=ho)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=vp(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[pt]=e,t[Us]=r,Wm(t,e,!1,!1),e.stateNode=t;e:{switch(o=Oa(n,r),n){case"dialog":q("cancel",t),q("close",t),s=r;break;case"iframe":case"object":case"embed":q("load",t),s=r;break;case"video":case"audio":for(s=0;s<ps.length;s++)q(ps[s],t);s=r;break;case"source":q("error",t),s=r;break;case"img":case"image":case"link":q("error",t),q("load",t),s=r;break;case"details":q("toggle",t),s=r;break;case"input":Rd(t,r),s=Ia(t,r),q("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=ee({},r,{value:void 0}),q("invalid",t);break;case"textarea":Od(t,r),s=Pa(t,r),q("invalid",t);break;default:s=r}Aa(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var a=l[i];i==="style"?xp(t,a):i==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&yp(t,a)):i==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&Rs(t,a):typeof a=="number"&&Rs(t,""+a):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(Ps.hasOwnProperty(i)?a!=null&&i==="onScroll"&&q("scroll",t):a!=null&&Wu(t,i,a,o))}switch(n){case"input":xi(t),Ad(t,r,!1);break;case"textarea":xi(t),Dd(t);break;case"option":r.value!=null&&t.setAttribute("value",""+pn(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?gr(t,!!r.multiple,i,!1):r.defaultValue!=null&&gr(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=ho)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Se(e),null;case 6:if(t&&e.stateNode!=null)$m(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(x(166));if(n=An(Ws.current),An(gt.current),Pi(e)){if(r=e.stateNode,n=e.memoizedProps,r[pt]=e,(i=r.nodeValue!==n)&&(t=Ve,t!==null))switch(t.tag){case 3:bi(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&bi(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[pt]=e,e.stateNode=r}return Se(e),null;case 13:if(Y(J),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(X&&We!==null&&e.mode&1&&!(e.flags&128))am(),Ar(),e.flags|=98560,i=!1;else if(i=Pi(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(x(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(x(317));i[pt]=e}else Ar(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Se(e),i=!1}else st!==null&&(fu(st),st=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||J.current&1?ue===0&&(ue=3):Cc())),e.updateQueue!==null&&(e.flags|=4),Se(e),null);case 4:return Dr(),iu(t,e),t===null&&Fs(e.stateNode.containerInfo),Se(e),null;case 10:return lc(e.type._context),Se(e),null;case 17:return je(e.type)&&fo(),Se(e),null;case 19:if(Y(J),i=e.memoizedState,i===null)return Se(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)is(i,!1);else{if(ue!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=wo(t),o!==null){for(e.flags|=128,is(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return K(J,J.current&1|2),e.child}t=t.sibling}i.tail!==null&&se()>Lr&&(e.flags|=128,r=!0,is(i,!1),e.lanes=4194304)}else{if(!r)if(t=wo(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),is(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!X)return Se(e),null}else 2*se()-i.renderingStartTime>Lr&&n!==1073741824&&(e.flags|=128,r=!0,is(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=se(),e.sibling=null,n=J.current,K(J,r?n&1|2:n&1),e):(Se(e),null);case 22:case 23:return Sc(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?ze&1073741824&&(Se(e),e.subtreeFlags&6&&(e.flags|=8192)):Se(e),null;case 24:return null;case 25:return null}throw Error(x(156,e.tag))}function A0(t,e){switch(rc(e),e.tag){case 1:return je(e.type)&&fo(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Dr(),Y(Le),Y(Ne),hc(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return dc(e),null;case 13:if(Y(J),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(x(340));Ar()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Y(J),null;case 4:return Dr(),null;case 10:return lc(e.type._context),null;case 22:case 23:return Sc(),null;case 24:return null;default:return null}}var Oi=!1,Ce=!1,O0=typeof WeakSet=="function"?WeakSet:Set,I=null;function dr(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){te(t,e,r)}else n.current=null}function ou(t,e,n){try{n()}catch(r){te(t,e,r)}}var Sh=!1;function D0(t,e){if(Va=ao,t=Qp(),tc(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,a=-1,u=0,f=0,h=t,d=null;t:for(;;){for(var _;h!==n||s!==0&&h.nodeType!==3||(l=o+s),h!==i||r!==0&&h.nodeType!==3||(a=o+r),h.nodeType===3&&(o+=h.nodeValue.length),(_=h.firstChild)!==null;)d=h,h=_;for(;;){if(h===t)break t;if(d===n&&++u===s&&(l=o),d===i&&++f===r&&(a=o),(_=h.nextSibling)!==null)break;h=d,d=h.parentNode}h=_}n=l===-1||a===-1?null:{start:l,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for($a={focusedElem:t,selectionRange:n},ao=!1,I=e;I!==null;)if(e=I,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,I=t;else for(;I!==null;){e=I;try{var v=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(v!==null){var y=v.memoizedProps,C=v.memoizedState,m=e.stateNode,p=m.getSnapshotBeforeUpdate(e.elementType===e.type?y:nt(e.type,y),C);m.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(x(163))}}catch(w){te(e,e.return,w)}if(t=e.sibling,t!==null){t.return=e.return,I=t;break}I=e.return}return v=Sh,Sh=!1,v}function xs(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&ou(e,n,i)}s=s.next}while(s!==r)}}function ll(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function lu(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function Hm(t){var e=t.alternate;e!==null&&(t.alternate=null,Hm(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[pt],delete e[Us],delete e[Ka],delete e[g0],delete e[_0])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function Gm(t){return t.tag===5||t.tag===3||t.tag===4}function Ch(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||Gm(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function au(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=ho));else if(r!==4&&(t=t.child,t!==null))for(au(t,e,n),t=t.sibling;t!==null;)au(t,e,n),t=t.sibling}function uu(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(uu(t,e,n),t=t.sibling;t!==null;)uu(t,e,n),t=t.sibling}var ve=null,rt=!1;function Wt(t,e,n){for(n=n.child;n!==null;)Km(t,e,n),n=n.sibling}function Km(t,e,n){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(Zo,n)}catch{}switch(n.tag){case 5:Ce||dr(n,e);case 6:var r=ve,s=rt;ve=null,Wt(t,e,n),ve=r,rt=s,ve!==null&&(rt?(t=ve,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):ve.removeChild(n.stateNode));break;case 18:ve!==null&&(rt?(t=ve,n=n.stateNode,t.nodeType===8?Yl(t.parentNode,n):t.nodeType===1&&Yl(t,n),Ms(t)):Yl(ve,n.stateNode));break;case 4:r=ve,s=rt,ve=n.stateNode.containerInfo,rt=!0,Wt(t,e,n),ve=r,rt=s;break;case 0:case 11:case 14:case 15:if(!Ce&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&ou(n,e,o),s=s.next}while(s!==r)}Wt(t,e,n);break;case 1:if(!Ce&&(dr(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){te(n,e,l)}Wt(t,e,n);break;case 21:Wt(t,e,n);break;case 22:n.mode&1?(Ce=(r=Ce)||n.memoizedState!==null,Wt(t,e,n),Ce=r):Wt(t,e,n);break;default:Wt(t,e,n)}}function kh(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new O0),e.forEach(function(r){var s=V0.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function tt(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:ve=l.stateNode,rt=!1;break e;case 3:ve=l.stateNode.containerInfo,rt=!0;break e;case 4:ve=l.stateNode.containerInfo,rt=!0;break e}l=l.return}if(ve===null)throw Error(x(160));Km(i,o,s),ve=null,rt=!1;var a=s.alternate;a!==null&&(a.return=null),s.return=null}catch(u){te(s,e,u)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)qm(e,t),e=e.sibling}function qm(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(tt(e,t),ht(t),r&4){try{xs(3,t,t.return),ll(3,t)}catch(y){te(t,t.return,y)}try{xs(5,t,t.return)}catch(y){te(t,t.return,y)}}break;case 1:tt(e,t),ht(t),r&512&&n!==null&&dr(n,n.return);break;case 5:if(tt(e,t),ht(t),r&512&&n!==null&&dr(n,n.return),t.flags&32){var s=t.stateNode;try{Rs(s,"")}catch(y){te(t,t.return,y)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,a=t.updateQueue;if(t.updateQueue=null,a!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&gp(s,i),Oa(l,o);var u=Oa(l,i);for(o=0;o<a.length;o+=2){var f=a[o],h=a[o+1];f==="style"?xp(s,h):f==="dangerouslySetInnerHTML"?yp(s,h):f==="children"?Rs(s,h):Wu(s,f,h,u)}switch(l){case"input":Ta(s,i);break;case"textarea":_p(s,i);break;case"select":var d=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var _=i.value;_!=null?gr(s,!!i.multiple,_,!1):d!==!!i.multiple&&(i.defaultValue!=null?gr(s,!!i.multiple,i.defaultValue,!0):gr(s,!!i.multiple,i.multiple?[]:"",!1))}s[Us]=i}catch(y){te(t,t.return,y)}}break;case 6:if(tt(e,t),ht(t),r&4){if(t.stateNode===null)throw Error(x(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(y){te(t,t.return,y)}}break;case 3:if(tt(e,t),ht(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Ms(e.containerInfo)}catch(y){te(t,t.return,y)}break;case 4:tt(e,t),ht(t);break;case 13:tt(e,t),ht(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(xc=se())),r&4&&kh(t);break;case 22:if(f=n!==null&&n.memoizedState!==null,t.mode&1?(Ce=(u=Ce)||f,tt(e,t),Ce=u):tt(e,t),ht(t),r&8192){if(u=t.memoizedState!==null,(t.stateNode.isHidden=u)&&!f&&t.mode&1)for(I=t,f=t.child;f!==null;){for(h=I=f;I!==null;){switch(d=I,_=d.child,d.tag){case 0:case 11:case 14:case 15:xs(4,d,d.return);break;case 1:dr(d,d.return);var v=d.stateNode;if(typeof v.componentWillUnmount=="function"){r=d,n=d.return;try{e=r,v.props=e.memoizedProps,v.state=e.memoizedState,v.componentWillUnmount()}catch(y){te(r,n,y)}}break;case 5:dr(d,d.return);break;case 22:if(d.memoizedState!==null){Ih(h);continue}}_!==null?(_.return=d,I=_):Ih(h)}f=f.sibling}e:for(f=null,h=t;;){if(h.tag===5){if(f===null){f=h;try{s=h.stateNode,u?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=h.stateNode,a=h.memoizedProps.style,o=a!=null&&a.hasOwnProperty("display")?a.display:null,l.style.display=wp("display",o))}catch(y){te(t,t.return,y)}}}else if(h.tag===6){if(f===null)try{h.stateNode.nodeValue=u?"":h.memoizedProps}catch(y){te(t,t.return,y)}}else if((h.tag!==22&&h.tag!==23||h.memoizedState===null||h===t)&&h.child!==null){h.child.return=h,h=h.child;continue}if(h===t)break e;for(;h.sibling===null;){if(h.return===null||h.return===t)break e;f===h&&(f=null),h=h.return}f===h&&(f=null),h.sibling.return=h.return,h=h.sibling}}break;case 19:tt(e,t),ht(t),r&4&&kh(t);break;case 21:break;default:tt(e,t),ht(t)}}function ht(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(Gm(n)){var r=n;break e}n=n.return}throw Error(x(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Rs(s,""),r.flags&=-33);var i=Ch(t);uu(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=Ch(t);au(t,l,o);break;default:throw Error(x(161))}}catch(a){te(t,t.return,a)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function M0(t,e,n){I=t,Qm(t)}function Qm(t,e,n){for(var r=(t.mode&1)!==0;I!==null;){var s=I,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Oi;if(!o){var l=s.alternate,a=l!==null&&l.memoizedState!==null||Ce;l=Oi;var u=Ce;if(Oi=o,(Ce=a)&&!u)for(I=s;I!==null;)o=I,a=o.child,o.tag===22&&o.memoizedState!==null?Th(s):a!==null?(a.return=o,I=a):Th(s);for(;i!==null;)I=i,Qm(i),i=i.sibling;I=s,Oi=l,Ce=u}Nh(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,I=i):Nh(t)}}function Nh(t){for(;I!==null;){var e=I;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Ce||ll(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Ce)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:nt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&ch(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}ch(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var a=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var u=e.alternate;if(u!==null){var f=u.memoizedState;if(f!==null){var h=f.dehydrated;h!==null&&Ms(h)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(x(163))}Ce||e.flags&512&&lu(e)}catch(d){te(e,e.return,d)}}if(e===t){I=null;break}if(n=e.sibling,n!==null){n.return=e.return,I=n;break}I=e.return}}function Ih(t){for(;I!==null;){var e=I;if(e===t){I=null;break}var n=e.sibling;if(n!==null){n.return=e.return,I=n;break}I=e.return}}function Th(t){for(;I!==null;){var e=I;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{ll(4,e)}catch(a){te(e,n,a)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(a){te(e,s,a)}}var i=e.return;try{lu(e)}catch(a){te(e,i,a)}break;case 5:var o=e.return;try{lu(e)}catch(a){te(e,o,a)}}}catch(a){te(e,e.return,a)}if(e===t){I=null;break}var l=e.sibling;if(l!==null){l.return=e.return,I=l;break}I=e.return}}var L0=Math.ceil,So=Ut.ReactCurrentDispatcher,yc=Ut.ReactCurrentOwner,Ye=Ut.ReactCurrentBatchConfig,B=0,ge=null,ie=null,we=0,ze=0,hr=wn(0),ue=0,Gs=null,Un=0,al=0,wc=0,Es=null,Ae=null,xc=0,Lr=1/0,yt=null,Co=!1,cu=null,on=null,Di=!1,Zt=null,ko=0,Ss=0,du=null,qi=-1,Qi=0;function Te(){return B&6?se():qi!==-1?qi:qi=se()}function ln(t){return t.mode&1?B&2&&we!==0?we&-we:y0.transition!==null?(Qi===0&&(Qi=Op()),Qi):(t=W,t!==0||(t=window.event,t=t===void 0?16:Up(t.type)),t):1}function ut(t,e,n,r){if(50<Ss)throw Ss=0,du=null,Error(x(185));si(t,n,r),(!(B&2)||t!==ge)&&(t===ge&&(!(B&2)&&(al|=n),ue===4&&Kt(t,we)),Fe(t,r),n===1&&B===0&&!(e.mode&1)&&(Lr=se()+500,sl&&xn()))}function Fe(t,e){var n=t.callbackNode;yy(t,e);var r=lo(t,t===ge?we:0);if(r===0)n!==null&&jd(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&jd(n),e===1)t.tag===0?v0(bh.bind(null,t)):im(bh.bind(null,t)),p0(function(){!(B&6)&&xn()}),n=null;else{switch(Dp(r)){case 1:n=Ku;break;case 4:n=Rp;break;case 16:n=oo;break;case 536870912:n=Ap;break;default:n=oo}n=rg(n,Ym.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function Ym(t,e){if(qi=-1,Qi=0,B&6)throw Error(x(327));var n=t.callbackNode;if(xr()&&t.callbackNode!==n)return null;var r=lo(t,t===ge?we:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=No(t,r);else{e=r;var s=B;B|=2;var i=Jm();(ge!==t||we!==e)&&(yt=null,Lr=se()+500,Mn(t,e));do try{B0();break}catch(l){Xm(t,l)}while(!0);oc(),So.current=i,B=s,ie!==null?e=0:(ge=null,we=0,e=ue)}if(e!==0){if(e===2&&(s=Fa(t),s!==0&&(r=s,e=hu(t,s))),e===1)throw n=Gs,Mn(t,0),Kt(t,r),Fe(t,se()),n;if(e===6)Kt(t,r);else{if(s=t.current.alternate,!(r&30)&&!j0(s)&&(e=No(t,r),e===2&&(i=Fa(t),i!==0&&(r=i,e=hu(t,i))),e===1))throw n=Gs,Mn(t,0),Kt(t,r),Fe(t,se()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(x(345));case 2:In(t,Ae,yt);break;case 3:if(Kt(t,r),(r&130023424)===r&&(e=xc+500-se(),10<e)){if(lo(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){Te(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Ga(In.bind(null,t,Ae,yt),e);break}In(t,Ae,yt);break;case 4:if(Kt(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-at(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=se()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*L0(r/1960))-r,10<r){t.timeoutHandle=Ga(In.bind(null,t,Ae,yt),r);break}In(t,Ae,yt);break;case 5:In(t,Ae,yt);break;default:throw Error(x(329))}}}return Fe(t,se()),t.callbackNode===n?Ym.bind(null,t):null}function hu(t,e){var n=Es;return t.current.memoizedState.isDehydrated&&(Mn(t,e).flags|=256),t=No(t,e),t!==2&&(e=Ae,Ae=n,e!==null&&fu(e)),t}function fu(t){Ae===null?Ae=t:Ae.push.apply(Ae,t)}function j0(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!dt(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function Kt(t,e){for(e&=~wc,e&=~al,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-at(e),r=1<<n;t[n]=-1,e&=~r}}function bh(t){if(B&6)throw Error(x(327));xr();var e=lo(t,0);if(!(e&1))return Fe(t,se()),null;var n=No(t,e);if(t.tag!==0&&n===2){var r=Fa(t);r!==0&&(e=r,n=hu(t,r))}if(n===1)throw n=Gs,Mn(t,0),Kt(t,e),Fe(t,se()),n;if(n===6)throw Error(x(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,In(t,Ae,yt),Fe(t,se()),null}function Ec(t,e){var n=B;B|=1;try{return t(e)}finally{B=n,B===0&&(Lr=se()+500,sl&&xn())}}function zn(t){Zt!==null&&Zt.tag===0&&!(B&6)&&xr();var e=B;B|=1;var n=Ye.transition,r=W;try{if(Ye.transition=null,W=1,t)return t()}finally{W=r,Ye.transition=n,B=e,!(B&6)&&xn()}}function Sc(){ze=hr.current,Y(hr)}function Mn(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,f0(n)),ie!==null)for(n=ie.return;n!==null;){var r=n;switch(rc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&fo();break;case 3:Dr(),Y(Le),Y(Ne),hc();break;case 5:dc(r);break;case 4:Dr();break;case 13:Y(J);break;case 19:Y(J);break;case 10:lc(r.type._context);break;case 22:case 23:Sc()}n=n.return}if(ge=t,ie=t=an(t.current,null),we=ze=e,ue=0,Gs=null,wc=al=Un=0,Ae=Es=null,Rn!==null){for(e=0;e<Rn.length;e++)if(n=Rn[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Rn=null}return t}function Xm(t,e){do{var n=ie;try{if(oc(),Hi.current=Eo,xo){for(var r=Z.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}xo=!1}if(Bn=0,fe=le=Z=null,ws=!1,Vs=0,yc.current=null,n===null||n.return===null){ue=1,Gs=e,ie=null;break}e:{var i=t,o=n.return,l=n,a=e;if(e=we,l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var u=a,f=l,h=f.tag;if(!(f.mode&1)&&(h===0||h===11||h===15)){var d=f.alternate;d?(f.updateQueue=d.updateQueue,f.memoizedState=d.memoizedState,f.lanes=d.lanes):(f.updateQueue=null,f.memoizedState=null)}var _=gh(o);if(_!==null){_.flags&=-257,_h(_,o,l,i,e),_.mode&1&&mh(i,u,e),e=_,a=u;var v=e.updateQueue;if(v===null){var y=new Set;y.add(a),e.updateQueue=y}else v.add(a);break e}else{if(!(e&1)){mh(i,u,e),Cc();break e}a=Error(x(426))}}else if(X&&l.mode&1){var C=gh(o);if(C!==null){!(C.flags&65536)&&(C.flags|=256),_h(C,o,l,i,e),sc(Mr(a,l));break e}}i=a=Mr(a,l),ue!==4&&(ue=2),Es===null?Es=[i]:Es.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var m=Dm(i,a,e);uh(i,m);break e;case 1:l=a;var p=i.type,g=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(on===null||!on.has(g)))){i.flags|=65536,e&=-e,i.lanes|=e;var w=Mm(i,l,e);uh(i,w);break e}}i=i.return}while(i!==null)}eg(n)}catch(E){e=E,ie===n&&n!==null&&(ie=n=n.return);continue}break}while(!0)}function Jm(){var t=So.current;return So.current=Eo,t===null?Eo:t}function Cc(){(ue===0||ue===3||ue===2)&&(ue=4),ge===null||!(Un&268435455)&&!(al&268435455)||Kt(ge,we)}function No(t,e){var n=B;B|=2;var r=Jm();(ge!==t||we!==e)&&(yt=null,Mn(t,e));do try{F0();break}catch(s){Xm(t,s)}while(!0);if(oc(),B=n,So.current=r,ie!==null)throw Error(x(261));return ge=null,we=0,ue}function F0(){for(;ie!==null;)Zm(ie)}function B0(){for(;ie!==null&&!cy();)Zm(ie)}function Zm(t){var e=ng(t.alternate,t,ze);t.memoizedProps=t.pendingProps,e===null?eg(t):ie=e,yc.current=null}function eg(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=A0(n,e),n!==null){n.flags&=32767,ie=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{ue=6,ie=null;return}}else if(n=R0(n,e,ze),n!==null){ie=n;return}if(e=e.sibling,e!==null){ie=e;return}ie=e=t}while(e!==null);ue===0&&(ue=5)}function In(t,e,n){var r=W,s=Ye.transition;try{Ye.transition=null,W=1,U0(t,e,n,r)}finally{Ye.transition=s,W=r}return null}function U0(t,e,n,r){do xr();while(Zt!==null);if(B&6)throw Error(x(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(x(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(wy(t,i),t===ge&&(ie=ge=null,we=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Di||(Di=!0,rg(oo,function(){return xr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ye.transition,Ye.transition=null;var o=W;W=1;var l=B;B|=4,yc.current=null,D0(t,n),qm(n,t),o0($a),ao=!!Va,$a=Va=null,t.current=n,M0(n),dy(),B=l,W=o,Ye.transition=i}else t.current=n;if(Di&&(Di=!1,Zt=t,ko=s),i=t.pendingLanes,i===0&&(on=null),py(n.stateNode),Fe(t,se()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(Co)throw Co=!1,t=cu,cu=null,t;return ko&1&&t.tag!==0&&xr(),i=t.pendingLanes,i&1?t===du?Ss++:(Ss=0,du=t):Ss=0,xn(),null}function xr(){if(Zt!==null){var t=Dp(ko),e=Ye.transition,n=W;try{if(Ye.transition=null,W=16>t?16:t,Zt===null)var r=!1;else{if(t=Zt,Zt=null,ko=0,B&6)throw Error(x(331));var s=B;for(B|=4,I=t.current;I!==null;){var i=I,o=i.child;if(I.flags&16){var l=i.deletions;if(l!==null){for(var a=0;a<l.length;a++){var u=l[a];for(I=u;I!==null;){var f=I;switch(f.tag){case 0:case 11:case 15:xs(8,f,i)}var h=f.child;if(h!==null)h.return=f,I=h;else for(;I!==null;){f=I;var d=f.sibling,_=f.return;if(Hm(f),f===u){I=null;break}if(d!==null){d.return=_,I=d;break}I=_}}}var v=i.alternate;if(v!==null){var y=v.child;if(y!==null){v.child=null;do{var C=y.sibling;y.sibling=null,y=C}while(y!==null)}}I=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,I=o;else e:for(;I!==null;){if(i=I,i.flags&2048)switch(i.tag){case 0:case 11:case 15:xs(9,i,i.return)}var m=i.sibling;if(m!==null){m.return=i.return,I=m;break e}I=i.return}}var p=t.current;for(I=p;I!==null;){o=I;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,I=g;else e:for(o=p;I!==null;){if(l=I,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:ll(9,l)}}catch(E){te(l,l.return,E)}if(l===o){I=null;break e}var w=l.sibling;if(w!==null){w.return=l.return,I=w;break e}I=l.return}}if(B=s,xn(),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(Zo,t)}catch{}r=!0}return r}finally{W=n,Ye.transition=e}}return!1}function Ph(t,e,n){e=Mr(n,e),e=Dm(t,e,1),t=sn(t,e,1),e=Te(),t!==null&&(si(t,1,e),Fe(t,e))}function te(t,e,n){if(t.tag===3)Ph(t,t,n);else for(;e!==null;){if(e.tag===3){Ph(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(on===null||!on.has(r))){t=Mr(n,t),t=Mm(e,t,1),e=sn(e,t,1),t=Te(),e!==null&&(si(e,1,t),Fe(e,t));break}}e=e.return}}function z0(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=Te(),t.pingedLanes|=t.suspendedLanes&n,ge===t&&(we&n)===n&&(ue===4||ue===3&&(we&130023424)===we&&500>se()-xc?Mn(t,0):wc|=n),Fe(t,e)}function tg(t,e){e===0&&(t.mode&1?(e=Ci,Ci<<=1,!(Ci&130023424)&&(Ci=4194304)):e=1);var n=Te();t=Ot(t,e),t!==null&&(si(t,e,n),Fe(t,n))}function W0(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),tg(t,n)}function V0(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(x(314))}r!==null&&r.delete(e),tg(t,n)}var ng;ng=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Le.current)Oe=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return Oe=!1,P0(t,e,n);Oe=!!(t.flags&131072)}else Oe=!1,X&&e.flags&1048576&&om(e,go,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Ki(t,e),t=e.pendingProps;var s=Rr(e,Ne.current);wr(e,n),s=pc(null,e,r,t,s,n);var i=mc();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,je(r)?(i=!0,po(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,uc(e),s.updater=ol,e.stateNode=s,s._reactInternals=e,Za(e,r,t,n),e=nu(null,e,r,!0,i,n)):(e.tag=0,X&&i&&nc(e),Ie(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Ki(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=H0(r),t=nt(r,t),s){case 0:e=tu(null,e,r,t,n);break e;case 1:e=wh(null,e,r,t,n);break e;case 11:e=vh(null,e,r,t,n);break e;case 14:e=yh(null,e,r,nt(r.type,t),n);break e}throw Error(x(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:nt(r,s),tu(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:nt(r,s),wh(t,e,r,s,n);case 3:e:{if(Bm(e),t===null)throw Error(x(387));r=e.pendingProps,i=e.memoizedState,s=i.element,hm(t,e),yo(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Mr(Error(x(423)),e),e=xh(t,e,r,n,s);break e}else if(r!==s){s=Mr(Error(x(424)),e),e=xh(t,e,r,n,s);break e}else for(We=rn(e.stateNode.containerInfo.firstChild),Ve=e,X=!0,st=null,n=cm(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Ar(),r===s){e=Dt(t,e,n);break e}Ie(t,e,r,n)}e=e.child}return e;case 5:return fm(e),t===null&&Ya(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Ha(r,s)?o=null:i!==null&&Ha(r,i)&&(e.flags|=32),Fm(t,e),Ie(t,e,o,n),e.child;case 6:return t===null&&Ya(e),null;case 13:return Um(t,e,n);case 4:return cc(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=Or(e,null,r,n):Ie(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:nt(r,s),vh(t,e,r,s,n);case 7:return Ie(t,e,e.pendingProps,n),e.child;case 8:return Ie(t,e,e.pendingProps.children,n),e.child;case 12:return Ie(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,K(_o,r._currentValue),r._currentValue=o,i!==null)if(dt(i.value,o)){if(i.children===s.children&&!Le.current){e=Dt(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var a=l.firstContext;a!==null;){if(a.context===r){if(i.tag===1){a=bt(-1,n&-n),a.tag=2;var u=i.updateQueue;if(u!==null){u=u.shared;var f=u.pending;f===null?a.next=a:(a.next=f.next,f.next=a),u.pending=a}}i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),Xa(i.return,n,e),l.lanes|=n;break}a=a.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(x(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),Xa(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Ie(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,wr(e,n),s=Xe(s),r=r(s),e.flags|=1,Ie(t,e,r,n),e.child;case 14:return r=e.type,s=nt(r,e.pendingProps),s=nt(r.type,s),yh(t,e,r,s,n);case 15:return Lm(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:nt(r,s),Ki(t,e),e.tag=1,je(r)?(t=!0,po(e)):t=!1,wr(e,n),Om(e,r,s),Za(e,r,s,n),nu(null,e,r,!0,t,n);case 19:return zm(t,e,n);case 22:return jm(t,e,n)}throw Error(x(156,e.tag))};function rg(t,e){return Pp(t,e)}function $0(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qe(t,e,n,r){return new $0(t,e,n,r)}function kc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function H0(t){if(typeof t=="function")return kc(t)?1:0;if(t!=null){if(t=t.$$typeof,t===$u)return 11;if(t===Hu)return 14}return 2}function an(t,e){var n=t.alternate;return n===null?(n=Qe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function Yi(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")kc(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case nr:return Ln(n.children,s,i,e);case Vu:o=8,s|=8;break;case Sa:return t=Qe(12,n,e,s|2),t.elementType=Sa,t.lanes=i,t;case Ca:return t=Qe(13,n,e,s),t.elementType=Ca,t.lanes=i,t;case ka:return t=Qe(19,n,e,s),t.elementType=ka,t.lanes=i,t;case fp:return ul(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case dp:o=10;break e;case hp:o=9;break e;case $u:o=11;break e;case Hu:o=14;break e;case $t:o=16,r=null;break e}throw Error(x(130,t==null?t:typeof t,""))}return e=Qe(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Ln(t,e,n,r){return t=Qe(7,t,r,e),t.lanes=n,t}function ul(t,e,n,r){return t=Qe(22,t,r,e),t.elementType=fp,t.lanes=n,t.stateNode={isHidden:!1},t}function sa(t,e,n){return t=Qe(6,t,null,e),t.lanes=n,t}function ia(t,e,n){return e=Qe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function G0(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Bl(0),this.expirationTimes=Bl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Bl(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function Nc(t,e,n,r,s,i,o,l,a){return t=new G0(t,e,n,l,a),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Qe(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},uc(i),t}function K0(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:tr,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function sg(t){if(!t)return mn;t=t._reactInternals;e:{if(Qn(t)!==t||t.tag!==1)throw Error(x(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(je(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(x(171))}if(t.tag===1){var n=t.type;if(je(n))return sm(t,n,e)}return e}function ig(t,e,n,r,s,i,o,l,a){return t=Nc(n,r,!0,t,s,i,o,l,a),t.context=sg(null),n=t.current,r=Te(),s=ln(n),i=bt(r,s),i.callback=e??null,sn(n,i,s),t.current.lanes=s,si(t,s,r),Fe(t,r),t}function cl(t,e,n,r){var s=e.current,i=Te(),o=ln(s);return n=sg(n),e.context===null?e.context=n:e.pendingContext=n,e=bt(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=sn(s,e,o),t!==null&&(ut(t,s,o,i),$i(t,s,o)),o}function Io(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function Rh(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Ic(t,e){Rh(t,e),(t=t.alternate)&&Rh(t,e)}function q0(){return null}var og=typeof reportError=="function"?reportError:function(t){console.error(t)};function Tc(t){this._internalRoot=t}dl.prototype.render=Tc.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(x(409));cl(t,e,null,null)};dl.prototype.unmount=Tc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;zn(function(){cl(null,t,null,null)}),e[At]=null}};function dl(t){this._internalRoot=t}dl.prototype.unstable_scheduleHydration=function(t){if(t){var e=jp();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Gt.length&&e!==0&&e<Gt[n].priority;n++);Gt.splice(n,0,t),n===0&&Bp(t)}};function bc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function hl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Ah(){}function Q0(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var u=Io(o);i.call(u)}}var o=ig(e,r,t,0,null,!1,!1,"",Ah);return t._reactRootContainer=o,t[At]=o.current,Fs(t.nodeType===8?t.parentNode:t),zn(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var u=Io(a);l.call(u)}}var a=Nc(t,0,!1,null,null,!1,!1,"",Ah);return t._reactRootContainer=a,t[At]=a.current,Fs(t.nodeType===8?t.parentNode:t),zn(function(){cl(e,a,n,r)}),a}function fl(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var a=Io(o);l.call(a)}}cl(e,o,t,s)}else o=Q0(n,e,t,s,r);return Io(o)}Mp=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=fs(e.pendingLanes);n!==0&&(qu(e,n|1),Fe(e,se()),!(B&6)&&(Lr=se()+500,xn()))}break;case 13:zn(function(){var r=Ot(t,1);if(r!==null){var s=Te();ut(r,t,1,s)}}),Ic(t,1)}};Qu=function(t){if(t.tag===13){var e=Ot(t,134217728);if(e!==null){var n=Te();ut(e,t,134217728,n)}Ic(t,134217728)}};Lp=function(t){if(t.tag===13){var e=ln(t),n=Ot(t,e);if(n!==null){var r=Te();ut(n,t,e,r)}Ic(t,e)}};jp=function(){return W};Fp=function(t,e){var n=W;try{return W=t,e()}finally{W=n}};Ma=function(t,e,n){switch(e){case"input":if(Ta(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=rl(r);if(!s)throw Error(x(90));mp(r),Ta(r,s)}}}break;case"textarea":_p(t,n);break;case"select":e=n.value,e!=null&&gr(t,!!n.multiple,e,!1)}};Cp=Ec;kp=zn;var Y0={usingClientEntryPoint:!1,Events:[oi,or,rl,Ep,Sp,Ec]},os={findFiberByHostInstance:Pn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},X0={bundleType:os.bundleType,version:os.version,rendererPackageName:os.rendererPackageName,rendererConfig:os.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Ut.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Tp(t),t===null?null:t.stateNode},findFiberByHostInstance:os.findFiberByHostInstance||q0,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Mi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Mi.isDisabled&&Mi.supportsFiber)try{Zo=Mi.inject(X0),mt=Mi}catch{}}He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Y0;He.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!bc(e))throw Error(x(200));return K0(t,e,null,n)};He.createRoot=function(t,e){if(!bc(t))throw Error(x(299));var n=!1,r="",s=og;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=Nc(t,1,!1,null,null,n,!1,r,s),t[At]=e.current,Fs(t.nodeType===8?t.parentNode:t),new Tc(e)};He.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(x(188)):(t=Object.keys(t).join(","),Error(x(268,t)));return t=Tp(e),t=t===null?null:t.stateNode,t};He.flushSync=function(t){return zn(t)};He.hydrate=function(t,e,n){if(!hl(e))throw Error(x(200));return fl(null,t,e,!0,n)};He.hydrateRoot=function(t,e,n){if(!bc(t))throw Error(x(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=og;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=ig(e,null,t,1,n??null,s,!1,i,o),t[At]=e.current,Fs(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new dl(e)};He.render=function(t,e,n){if(!hl(e))throw Error(x(200));return fl(null,t,e,!1,n)};He.unmountComponentAtNode=function(t){if(!hl(t))throw Error(x(40));return t._reactRootContainer?(zn(function(){fl(null,null,t,!1,function(){t._reactRootContainer=null,t[At]=null})}),!0):!1};He.unstable_batchedUpdates=Ec;He.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!hl(n))throw Error(x(200));if(t==null||t._reactInternals===void 0)throw Error(x(38));return fl(t,e,n,!1,r)};He.version="18.3.1-next-f1338f8080-20240426";function lg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(lg)}catch(t){console.error(t)}}lg(),lp.exports=He;var J0=lp.exports,Oh=J0;xa.createRoot=Oh.createRoot,xa.hydrateRoot=Oh.hydrateRoot;var Dh={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ag={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S=function(t,e){if(!t)throw Gr(e)},Gr=function(t){return new Error("Firebase Database ("+ag.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ug=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},Z0=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],a=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(a>>10)),e[r++]=String.fromCharCode(56320+(a&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Pc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,a=s+2<t.length,u=a?t[s+2]:0,f=i>>2,h=(i&3)<<4|l>>4;let d=(l&15)<<2|u>>6,_=u&63;a||(_=64,o||(d=64)),r.push(n[f],n[h],n[d],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ug(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):Z0(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const u=s<t.length?n[t.charAt(s)]:64;++s;const h=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||u==null||h==null)throw new ew;const d=i<<2|l>>4;if(r.push(d),u!==64){const _=l<<4&240|u>>2;if(r.push(_),h!==64){const v=u<<6&192|h;r.push(v)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class ew extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const cg=function(t){const e=ug(t);return Pc.encodeByteArray(e,!0)},To=function(t){return cg(t).replace(/\./g,"")},bo=function(t){try{return Pc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tw(t){return dg(void 0,t)}function dg(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!nw(n)||(t[n]=dg(t[n],e[n]));return t}function nw(t){return t!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rw(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sw=()=>rw().__FIREBASE_DEFAULTS__,iw=()=>{if(typeof process>"u"||typeof Dh>"u")return;const t=Dh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},ow=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&bo(t[1]);return e&&JSON.parse(e)},Rc=()=>{try{return sw()||iw()||ow()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},hg=t=>{var e,n;return(n=(e=Rc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},lw=t=>{const e=hg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},fg=()=>{var t;return(t=Rc())===null||t===void 0?void 0:t.config},pg=t=>{var e;return(e=Rc())===null||e===void 0?void 0:e[`_${t}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pl{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aw(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[To(JSON.stringify(n)),To(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ac(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(be())}function uw(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function cw(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function mg(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dw(){const t=be();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function hw(){return ag.NODE_ADMIN===!0}function fw(){try{return typeof indexedDB=="object"}catch{return!1}}function pw(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mw="FirebaseError";class En extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=mw,Object.setPrototypeOf(this,En.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ai.prototype.create)}}class ai{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?gw(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new En(s,l,r)}}function gw(t,e){return t.replace(_w,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const _w=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ks(t){return JSON.parse(t)}function me(t){return JSON.stringify(t)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gg=function(t){let e={},n={},r={},s="";try{const i=t.split(".");e=Ks(bo(i[0])||""),n=Ks(bo(i[1])||""),s=i[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:s}},vw=function(t){const e=gg(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},yw=function(t){const e=gg(t).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function jr(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function pu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Po(t,e,n){const r={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=e.call(n,t[s],s,t));return r}function Ro(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(Mh(i)&&Mh(o)){if(!Ro(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function Mh(t){return t!==null&&typeof t=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kr(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ww{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)r[h]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let h=0;h<16;h++)r[h]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let h=16;h<80;h++){const d=r[h-3]^r[h-8]^r[h-14]^r[h-16];r[h]=(d<<1|d>>>31)&4294967295}let s=this.chain_[0],i=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],u,f;for(let h=0;h<80;h++){h<40?h<20?(u=l^i&(o^l),f=1518500249):(u=i^o^l,f=1859775393):h<60?(u=i&o|l&(i|o),f=2400959708):(u=i^o^l,f=3395469782);const d=(s<<5|s>>>27)+u+a+f+r[h]&4294967295;a=l,l=o,o=(i<<30|i>>>2)&4294967295,i=s,s=d}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let s=0;const i=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(i[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}else for(;s<n;)if(i[o]=e[s],++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let i=24;i>=0;i-=8)e[r]=this.chain_[s]>>i&255,++r;return e}}function xw(t,e){const n=new Ew(t,e);return n.subscribe.bind(n)}class Ew{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");Sw(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=oa),s.error===void 0&&(s.error=oa),s.complete===void 0&&(s.complete=oa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Sw(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function oa(){}function Oc(t,e){return`${t} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cw=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);if(s>=55296&&s<=56319){const i=s-55296;r++,S(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;s=65536+(i<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},ml=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ze(t){return t&&t._delegate?t._delegate:t}class Wn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new pl;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Iw(e))try{this.getOrInitializeService({instanceIdentifier:Tn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Tn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tn){return this.instances.has(e)}getOptions(e=Tn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Nw(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Tn){return this.component?this.component.multipleInstances?e:Tn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Nw(t){return t===Tn?void 0:t}function Iw(t){return t.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tw{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new kw(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var V;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(V||(V={}));const bw={debug:V.DEBUG,verbose:V.VERBOSE,info:V.INFO,warn:V.WARN,error:V.ERROR,silent:V.SILENT},Pw=V.INFO,Rw={[V.DEBUG]:"log",[V.VERBOSE]:"log",[V.INFO]:"info",[V.WARN]:"warn",[V.ERROR]:"error"},Aw=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=Rw[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Dc{constructor(e){this.name=e,this._logLevel=Pw,this._logHandler=Aw,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in V))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?bw[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,V.DEBUG,...e),this._logHandler(this,V.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,V.VERBOSE,...e),this._logHandler(this,V.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,V.INFO,...e),this._logHandler(this,V.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,V.WARN,...e),this._logHandler(this,V.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,V.ERROR,...e),this._logHandler(this,V.ERROR,...e)}}const Ow=(t,e)=>e.some(n=>t instanceof n);let Lh,jh;function Dw(){return Lh||(Lh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Mw(){return jh||(jh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const _g=new WeakMap,mu=new WeakMap,vg=new WeakMap,la=new WeakMap,Mc=new WeakMap;function Lw(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(un(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&_g.set(n,t)}).catch(()=>{}),Mc.set(e,t),e}function jw(t){if(mu.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});mu.set(t,e)}let gu={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return mu.get(t);if(e==="objectStoreNames")return t.objectStoreNames||vg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return un(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function Fw(t){gu=t(gu)}function Bw(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(aa(this),e,...n);return vg.set(r,e.sort?e.sort():[e]),un(r)}:Mw().includes(t)?function(...e){return t.apply(aa(this),e),un(_g.get(this))}:function(...e){return un(t.apply(aa(this),e))}}function Uw(t){return typeof t=="function"?Bw(t):(t instanceof IDBTransaction&&jw(t),Ow(t,Dw())?new Proxy(t,gu):t)}function un(t){if(t instanceof IDBRequest)return Lw(t);if(la.has(t))return la.get(t);const e=Uw(t);return e!==t&&(la.set(t,e),Mc.set(e,t)),e}const aa=t=>Mc.get(t);function zw(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=un(o);return r&&o.addEventListener("upgradeneeded",a=>{r(un(o.result),a.oldVersion,a.newVersion,un(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",u=>s(u.oldVersion,u.newVersion,u))}).catch(()=>{}),l}const Ww=["get","getKey","getAll","getAllKeys","count"],Vw=["put","add","delete","clear"],ua=new Map;function Fh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ua.get(e))return ua.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Vw.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||Ww.includes(n)))return;const i=async function(o,...l){const a=this.transaction(o,s?"readwrite":"readonly");let u=a.store;return r&&(u=u.index(l.shift())),(await Promise.all([u[n](...l),s&&a.done]))[0]};return ua.set(e,i),i}Fw(t=>({...t,get:(e,n,r)=>Fh(e,n)||t.get(e,n,r),has:(e,n)=>!!Fh(e,n)||t.has(e,n)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $w{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Hw(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Hw(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const _u="@firebase/app",Bh="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mt=new Dc("@firebase/app"),Gw="@firebase/app-compat",Kw="@firebase/analytics-compat",qw="@firebase/analytics",Qw="@firebase/app-check-compat",Yw="@firebase/app-check",Xw="@firebase/auth",Jw="@firebase/auth-compat",Zw="@firebase/database",e1="@firebase/data-connect",t1="@firebase/database-compat",n1="@firebase/functions",r1="@firebase/functions-compat",s1="@firebase/installations",i1="@firebase/installations-compat",o1="@firebase/messaging",l1="@firebase/messaging-compat",a1="@firebase/performance",u1="@firebase/performance-compat",c1="@firebase/remote-config",d1="@firebase/remote-config-compat",h1="@firebase/storage",f1="@firebase/storage-compat",p1="@firebase/firestore",m1="@firebase/vertexai-preview",g1="@firebase/firestore-compat",_1="firebase",v1="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vu="[DEFAULT]",y1={[_u]:"fire-core",[Gw]:"fire-core-compat",[qw]:"fire-analytics",[Kw]:"fire-analytics-compat",[Yw]:"fire-app-check",[Qw]:"fire-app-check-compat",[Xw]:"fire-auth",[Jw]:"fire-auth-compat",[Zw]:"fire-rtdb",[e1]:"fire-data-connect",[t1]:"fire-rtdb-compat",[n1]:"fire-fn",[r1]:"fire-fn-compat",[s1]:"fire-iid",[i1]:"fire-iid-compat",[o1]:"fire-fcm",[l1]:"fire-fcm-compat",[a1]:"fire-perf",[u1]:"fire-perf-compat",[c1]:"fire-rc",[d1]:"fire-rc-compat",[h1]:"fire-gcs",[f1]:"fire-gcs-compat",[p1]:"fire-fst",[g1]:"fire-fst-compat",[m1]:"fire-vertex","fire-js":"fire-js",[_1]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ao=new Map,w1=new Map,yu=new Map;function Uh(t,e){try{t.container.addComponent(e)}catch(n){Mt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Fr(t){const e=t.name;if(yu.has(e))return Mt.debug(`There were multiple attempts to register component ${e}.`),!1;yu.set(e,t);for(const n of Ao.values())Uh(n,t);for(const n of w1.values())Uh(n,t);return!0}function Lc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ct(t){return t.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const x1={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},cn=new ai("app","Firebase",x1);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class E1{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Wn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw cn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr=v1;function yg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:vu,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw cn.create("bad-app-name",{appName:String(s)});if(n||(n=fg()),!n)throw cn.create("no-options");const i=Ao.get(s);if(i){if(Ro(n,i.options)&&Ro(r,i.config))return i;throw cn.create("duplicate-app",{appName:s})}const o=new Tw(s);for(const a of yu.values())o.addComponent(a);const l=new E1(n,r,o);return Ao.set(s,l),l}function wg(t=vu){const e=Ao.get(t);if(!e&&t===vu&&fg())return yg();if(!e)throw cn.create("no-app",{appName:t});return e}function dn(t,e,n){var r;let s=(r=y1[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Mt.warn(l.join(" "));return}Fr(new Wn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const S1="firebase-heartbeat-database",C1=1,qs="firebase-heartbeat-store";let ca=null;function xg(){return ca||(ca=zw(S1,C1,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(qs)}catch(n){console.warn(n)}}}}).catch(t=>{throw cn.create("idb-open",{originalErrorMessage:t.message})})),ca}async function k1(t){try{const n=(await xg()).transaction(qs),r=await n.objectStore(qs).get(Eg(t));return await n.done,r}catch(e){if(e instanceof En)Mt.warn(e.message);else{const n=cn.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Mt.warn(n.message)}}}async function zh(t,e){try{const r=(await xg()).transaction(qs,"readwrite");await r.objectStore(qs).put(e,Eg(t)),await r.done}catch(n){if(n instanceof En)Mt.warn(n.message);else{const r=cn.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Mt.warn(r.message)}}}function Eg(t){return`${t.name}!${t.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const N1=1024,I1=30*24*60*60*1e3;class T1{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new P1(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=Wh();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=I1}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Mt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=Wh(),{heartbeatsToSend:r,unsentEntries:s}=b1(this._heartbeatsCache.heartbeats),i=To(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Mt.warn(n),""}}}function Wh(){return new Date().toISOString().substring(0,10)}function b1(t,e=N1){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Vh(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),Vh(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class P1{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return fw()?pw().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await k1(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return zh(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return zh(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function Vh(t){return To(JSON.stringify({version:2,heartbeats:t})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function R1(t){Fr(new Wn("platform-logger",e=>new $w(e),"PRIVATE")),Fr(new Wn("heartbeat",e=>new T1(e),"PRIVATE")),dn(_u,Bh,t),dn(_u,Bh,"esm2017"),dn("fire-js","")}R1("");function jc(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function Sg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const A1=Sg,Cg=new ai("auth","Firebase",Sg());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oo=new Dc("@firebase/auth");function O1(t,...e){Oo.logLevel<=V.WARN&&Oo.warn(`Auth (${qr}): ${t}`,...e)}function Xi(t,...e){Oo.logLevel<=V.ERROR&&Oo.error(`Auth (${qr}): ${t}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lt(t,...e){throw Fc(t,...e)}function _t(t,...e){return Fc(t,...e)}function kg(t,e,n){const r=Object.assign(Object.assign({},A1()),{[e]:n});return new ai("auth","Firebase",r).create(e,{appName:t.name})}function hn(t){return kg(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Fc(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Cg.create(t,...e)}function R(t,e,...n){if(!t)throw Fc(e,...n)}function kt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw Xi(e),new Error(e)}function jt(t,e){t||kt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function D1(){return $h()==="http:"||$h()==="https:"}function $h(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M1(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(D1()||cw()||"connection"in navigator)?navigator.onLine:!0}function L1(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ui{constructor(e,n){this.shortDelay=e,this.longDelay=n,jt(n>e,"Short delay should be less than long delay!"),this.isMobile=Ac()||mg()}get(){return M1()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bc(t,e){jt(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ng{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;kt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;kt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;kt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const j1={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const F1=new ui(3e4,6e4);function gl(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Qr(t,e,n,r,s={}){return Ig(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Kr(Object.assign({key:t.config.apiKey},o)).slice(1),a=await t._getAdditionalHeaders();a["Content-Type"]="application/json",t.languageCode&&(a["X-Firebase-Locale"]=t.languageCode);const u=Object.assign({method:e,headers:a},i);return uw()||(u.referrerPolicy="no-referrer"),Ng.fetch()(bg(t,t.config.apiHost,n,l),u)})}async function Ig(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},j1),e);try{const s=new B1(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Li(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[a,u]=l.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw Li(t,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw Li(t,"email-already-in-use",o);if(a==="USER_DISABLED")throw Li(t,"user-disabled",o);const f=r[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(u)throw kg(t,f,u);Lt(t,f)}}catch(s){if(s instanceof En)throw s;Lt(t,"network-request-failed",{message:String(s)})}}async function Tg(t,e,n,r,s={}){const i=await Qr(t,e,n,r,s);return"mfaPendingCredential"in i&&Lt(t,"multi-factor-auth-required",{_serverResponse:i}),i}function bg(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Bc(t.config,s):`${t.config.apiScheme}://${s}`}class B1{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(_t(this.auth,"network-request-failed")),F1.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Li(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=_t(t,e,r);return s.customData._tokenResponse=n,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function U1(t,e){return Qr(t,"POST","/v1/accounts:delete",e)}async function Pg(t,e){return Qr(t,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Cs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function z1(t,e=!1){const n=Ze(t),r=await n.getIdToken(e),s=Uc(r);R(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:Cs(da(s.auth_time)),issuedAtTime:Cs(da(s.iat)),expirationTime:Cs(da(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function da(t){return Number(t)*1e3}function Uc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return Xi("JWT malformed, contained fewer than 3 sections"),null;try{const s=bo(n);return s?JSON.parse(s):(Xi("Failed to decode base64 JWT payload"),null)}catch(s){return Xi("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function Hh(t){const e=Uc(t);return R(e,"internal-error"),R(typeof e.exp<"u","internal-error"),R(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qs(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof En&&W1(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function W1({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V1{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=Cs(this.lastLoginAt),this.creationTime=Cs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Do(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Qs(t,Pg(n,{idToken:r}));R(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Rg(i.providerUserInfo):[],l=H1(t.providerData,o),a=t.isAnonymous,u=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),f=a?u:!1,h={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new xu(i.createdAt,i.lastLoginAt),isAnonymous:f};Object.assign(t,h)}async function $1(t){const e=Ze(t);await Do(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function H1(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Rg(t){return t.map(e=>{var{providerId:n}=e,r=jc(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function G1(t,e){const n=await Ig(t,{},async()=>{const r=Kr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=bg(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Ng.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function K1(t,e){return Qr(t,"POST","/v2/accounts:revokeToken",gl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Er{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){R(e.idToken,"internal-error"),R(typeof e.idToken<"u","internal-error"),R(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Hh(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){R(e.length!==0,"internal-error");const n=Hh(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(R(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await G1(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Er;return r&&(R(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(R(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(R(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Er,this.toJSON())}_performRefresh(){return kt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vt(t,e){R(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Nt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=jc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new V1(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new xu(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Qs(this,this.stsTokenManager.getToken(this.auth,e));return R(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return z1(this,e)}reload(){return $1(this)}_assign(e){this!==e&&(R(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Nt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){R(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Do(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ct(this.auth.app))return Promise.reject(hn(this.auth));const e=await this.getIdToken();return await Qs(this,U1(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,a,u,f;const h=(r=n.displayName)!==null&&r!==void 0?r:void 0,d=(s=n.email)!==null&&s!==void 0?s:void 0,_=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,v=(o=n.photoURL)!==null&&o!==void 0?o:void 0,y=(l=n.tenantId)!==null&&l!==void 0?l:void 0,C=(a=n._redirectEventId)!==null&&a!==void 0?a:void 0,m=(u=n.createdAt)!==null&&u!==void 0?u:void 0,p=(f=n.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:g,emailVerified:w,isAnonymous:E,providerData:k,stsTokenManager:N}=n;R(g&&N,e,"internal-error");const b=Er.fromJSON(this.name,N);R(typeof g=="string",e,"internal-error"),Vt(h,e.name),Vt(d,e.name),R(typeof w=="boolean",e,"internal-error"),R(typeof E=="boolean",e,"internal-error"),Vt(_,e.name),Vt(v,e.name),Vt(y,e.name),Vt(C,e.name),Vt(m,e.name),Vt(p,e.name);const $=new Nt({uid:g,auth:e,email:d,emailVerified:w,displayName:h,isAnonymous:E,photoURL:v,phoneNumber:_,tenantId:y,stsTokenManager:b,createdAt:m,lastLoginAt:p});return k&&Array.isArray(k)&&($.providerData=k.map(O=>Object.assign({},O))),C&&($._redirectEventId=C),$}static async _fromIdTokenResponse(e,n,r=!1){const s=new Er;s.updateFromServerResponse(n);const i=new Nt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Do(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];R(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Rg(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Er;l.updateFromIdToken(r);const a=new Nt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),u={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new xu(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(a,u),a}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gh=new Map;function It(t){jt(t instanceof Function,"Expected a class definition");let e=Gh.get(t);return e?(jt(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,Gh.set(t,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ag{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Ag.type="NONE";const Kh=Ag;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ji(t,e,n){return`firebase:${t}:${e}:${n}`}class Sr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=Ji(this.userKey,s.apiKey,i),this.fullPersistenceKey=Ji("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Nt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new Sr(It(Kh),e,r);const s=(await Promise.all(n.map(async u=>{if(await u._isAvailable())return u}))).filter(u=>u);let i=s[0]||It(Kh);const o=Ji(r,e.config.apiKey,e.name);let l=null;for(const u of n)try{const f=await u._get(o);if(f){const h=Nt._fromJSON(e,f);u!==i&&(l=h),i=u;break}}catch{}const a=s.filter(u=>u._shouldAllowMigration);return!i._shouldAllowMigration||!a.length?new Sr(i,e,r):(i=a[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async u=>{if(u!==i)try{await u._remove(o)}catch{}})),new Sr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qh(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Lg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Og(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Fg(e))return"Blackberry";if(Bg(e))return"Webos";if(Dg(e))return"Safari";if((e.includes("chrome/")||Mg(e))&&!e.includes("edge/"))return"Chrome";if(jg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Og(t=be()){return/firefox\//i.test(t)}function Dg(t=be()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Mg(t=be()){return/crios\//i.test(t)}function Lg(t=be()){return/iemobile/i.test(t)}function jg(t=be()){return/android/i.test(t)}function Fg(t=be()){return/blackberry/i.test(t)}function Bg(t=be()){return/webos/i.test(t)}function zc(t=be()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function q1(t=be()){var e;return zc(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function Q1(){return dw()&&document.documentMode===10}function Ug(t=be()){return zc(t)||jg(t)||Bg(t)||Fg(t)||/windows phone/i.test(t)||Lg(t)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(t,e=[]){let n;switch(t){case"Browser":n=qh(be());break;case"Worker":n=`${qh(be())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${qr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Y1{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const a=e(i);o(a)}catch(a){l(a)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function X1(t,e={}){return Qr(t,"GET","/v2/passwordPolicy",gl(t,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const J1=6;class Z1{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:J1,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=(n=a.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),a.isValid&&(a.isValid=(r=a.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),a.isValid&&(a.isValid=(s=a.containsLowercaseLetter)!==null&&s!==void 0?s:!0),a.isValid&&(a.isValid=(i=a.containsUppercaseLetter)!==null&&i!==void 0?i:!0),a.isValid&&(a.isValid=(o=a.containsNumericCharacter)!==null&&o!==void 0?o:!0),a.isValid&&(a.isValid=(l=a.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),a}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ex{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Qh(this),this.idTokenSubscription=new Qh(this),this.beforeStateQueue=new Y1(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Cg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=It(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await Sr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await Pg(this,{idToken:e}),r=await Nt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Ct(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===l)&&(a!=null&&a.user)&&(s=a.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return R(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Do(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=L1()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ct(this.app))return Promise.reject(hn(this));const n=e?Ze(e):null;return n&&R(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&R(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ct(this.app)?Promise.reject(hn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ct(this.app)?Promise.reject(hn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(It(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await X1(this),n=new Z1(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ai("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await K1(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&It(e)||this._popupRedirectResolver;R(n,this,"argument-error"),this.redirectPersistenceManager=await Sr.create(this,[It(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(R(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const a=e.addObserver(n,r,s);return()=>{o=!0,a()}}else{const a=e.addObserver(n);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return R(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=zg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&O1(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function _l(t){return Ze(t)}class Qh{constructor(e){this.auth=e,this.observer=null,this.addObserver=xw(n=>this.observer=n)}get next(){return R(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function tx(t){Wc=t}function nx(t){return Wc.loadJS(t)}function rx(){return Wc.gapiScript}function sx(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ix(t,e){const n=Lc(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Ro(i,e??{}))return s;Lt(s,"already-initialized")}return n.initialize({options:e})}function ox(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(It);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function lx(t,e,n){const r=_l(t);R(r._canInitEmulator,r,"emulator-config-failed"),R(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Wg(e),{host:o,port:l}=ax(e),a=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${a}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),ux()}function Wg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function ax(t){const e=Wg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:Yh(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:Yh(o)}}}function Yh(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function ux(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vg{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return kt("not implemented")}_getIdTokenResponse(e){return kt("not implemented")}_linkToIdToken(e,n){return kt("not implemented")}_getReauthenticationResolver(e){return kt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cr(t,e){return Tg(t,"POST","/v1/accounts:signInWithIdp",gl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cx="http://localhost";class Vn extends Vg{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Vn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Lt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=jc(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Vn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Cr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Cr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Cr(e,n)}buildRequest(){const e={requestUri:cx,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Kr(n)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $g{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ci extends $g{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt extends ci{constructor(){super("facebook.com")}static credential(e){return Vn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return qt.credential(e.oauthAccessToken)}catch{return null}}}qt.FACEBOOK_SIGN_IN_METHOD="facebook.com";qt.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt extends ci{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Vn._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Qt.credential(n,r)}catch{return null}}}Qt.GOOGLE_SIGN_IN_METHOD="google.com";Qt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yt extends ci{constructor(){super("github.com")}static credential(e){return Vn._fromParams({providerId:Yt.PROVIDER_ID,signInMethod:Yt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Yt.credentialFromTaggedObject(e)}static credentialFromError(e){return Yt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Yt.credential(e.oauthAccessToken)}catch{return null}}}Yt.GITHUB_SIGN_IN_METHOD="github.com";Yt.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt extends ci{constructor(){super("twitter.com")}static credential(e,n){return Vn._fromParams({providerId:Xt.PROVIDER_ID,signInMethod:Xt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return Xt.credentialFromTaggedObject(e)}static credentialFromError(e){return Xt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return Xt.credential(n,r)}catch{return null}}}Xt.TWITTER_SIGN_IN_METHOD="twitter.com";Xt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dx(t,e){return Tg(t,"POST","/v1/accounts:signUp",gl(t,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Nt._fromIdTokenResponse(e,r,s),o=Xh(r);return new gn({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=Xh(r);return new gn({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function Xh(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function hx(t){var e;if(Ct(t.app))return Promise.reject(hn(t));const n=_l(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new gn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await dx(n,{returnSecureToken:!0}),s=await gn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(s.user),s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Mo extends En{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Mo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Mo(e,n,r,s)}}function Hg(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Mo._fromErrorAndOperation(t,i,e,r):i})}async function fx(t,e,n=!1){const r=await Qs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return gn._forOperation(t,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function px(t,e,n=!1){const{auth:r}=t;if(Ct(r.app))return Promise.reject(hn(r));const s="reauthenticate";try{const i=await Qs(t,Hg(r,s,e,t),n);R(i.idToken,r,"internal-error");const o=Uc(i.idToken);R(o,r,"internal-error");const{sub:l}=o;return R(t.uid===l,r,"user-mismatch"),gn._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Lt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function mx(t,e,n=!1){if(Ct(t.app))return Promise.reject(hn(t));const r="signIn",s=await Hg(t,r,e),i=await gn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}function gx(t,e,n,r){return Ze(t).onIdTokenChanged(e,n,r)}function _x(t,e,n){return Ze(t).beforeAuthStateChanged(e,n)}function vx(t,e,n,r){return Ze(t).onAuthStateChanged(e,n,r)}const Lo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gg{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(Lo,"1"),this.storage.removeItem(Lo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yx=1e3,wx=10;class Kg extends Gg{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Ug(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,a)=>{this.notifyListeners(o,a)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);Q1()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,wx):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},yx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}Kg.type="LOCAL";const xx=Kg;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qg extends Gg{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}qg.type="SESSION";const Qg=qg;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ex(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new vl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async u=>u(n.origin,i)),a=await Ex(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:a})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}vl.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vc(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sx{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,a)=>{const u=Vc("",20);s.port1.start();const f=setTimeout(()=>{a(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(h){const d=h;if(d.data.eventId===u)switch(d.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(d.data.response);break;default:clearTimeout(f),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:u,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function vt(){return window}function Cx(t){vt().location.href=t}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yg(){return typeof vt().WorkerGlobalScope<"u"&&typeof vt().importScripts=="function"}async function kx(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Nx(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Ix(){return Yg()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xg="firebaseLocalStorageDb",Tx=1,jo="firebaseLocalStorage",Jg="fbase_key";class di{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function yl(t,e){return t.transaction([jo],e?"readwrite":"readonly").objectStore(jo)}function bx(){const t=indexedDB.deleteDatabase(Xg);return new di(t).toPromise()}function Eu(){const t=indexedDB.open(Xg,Tx);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(jo,{keyPath:Jg})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(jo)?e(r):(r.close(),await bx(),e(await Eu()))})})}async function Jh(t,e,n){const r=yl(t,!0).put({[Jg]:e,value:n});return new di(r).toPromise()}async function Px(t,e){const n=yl(t,!1).get(e),r=await new di(n).toPromise();return r===void 0?null:r.value}function Zh(t,e){const n=yl(t,!0).delete(e);return new di(n).toPromise()}const Rx=800,Ax=3;class Zg{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Eu(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Ax)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return Yg()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=vl._getInstance(Ix()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await kx(),!this.activeServiceWorker)return;this.sender=new Sx(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Nx()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Eu();return await Jh(e,Lo,"1"),await Zh(e,Lo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>Jh(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Px(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>Zh(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=yl(s,!1).getAll();return new di(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Rx)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Zg.type="LOCAL";const Ox=Zg;new ui(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Dx(t,e){return e?It(e):(R(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $c extends Vg{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Cr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Cr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Cr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function Mx(t){return mx(t.auth,new $c(t),t.bypassAuthState)}function Lx(t){const{auth:e,user:n}=t;return R(n,e,"internal-error"),px(n,new $c(t),t.bypassAuthState)}async function jx(t){const{auth:e,user:n}=t;return R(n,e,"internal-error"),fx(n,new $c(t),t.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class e_{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(a))}catch(u){this.reject(u)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Mx;case"linkViaPopup":case"linkViaRedirect":return jx;case"reauthViaPopup":case"reauthViaRedirect":return Lx;default:Lt(this.auth,"internal-error")}}resolve(e){jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){jt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fx=new ui(2e3,1e4);class fr extends e_{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,fr.currentPopupAction&&fr.currentPopupAction.cancel(),fr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return R(e,this.auth,"internal-error"),e}async onExecution(){jt(this.filter.length===1,"Popup operations only handle one event");const e=Vc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(_t(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_t(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,fr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_t(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Fx.get())};e()}}fr.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Bx="pendingRedirect",Zi=new Map;class Ux extends e_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=Zi.get(this.auth._key());if(!e){try{const r=await zx(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}Zi.set(this.auth._key(),e)}return this.bypassAuthState||Zi.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function zx(t,e){const n=$x(e),r=Vx(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Wx(t,e){Zi.set(t._key(),e)}function Vx(t){return It(t._redirectPersistence)}function $x(t){return Ji(Bx,t.config.apiKey,t.name)}async function Hx(t,e,n=!1){if(Ct(t.app))return Promise.reject(hn(t));const r=_l(t),s=Dx(r,e),o=await new Ux(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gx=10*60*1e3;class Kx{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!qx(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!t_(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(_t(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Gx&&this.cachedEventUids.clear(),this.cachedEventUids.has(ef(e))}saveEventToCache(e){this.cachedEventUids.add(ef(e)),this.lastProcessedEventTime=Date.now()}}function ef(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function t_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function qx(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return t_(t);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Qx(t,e={}){return Qr(t,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yx=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,Xx=/^https?/;async function Jx(t){if(t.config.emulator)return;const{authorizedDomains:e}=await Qx(t);for(const n of e)try{if(Zx(n))return}catch{}Lt(t,"unauthorized-domain")}function Zx(t){const e=wu(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!Xx.test(n))return!1;if(Yx.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const eE=new ui(3e4,6e4);function tf(){const t=vt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function tE(t){return new Promise((e,n)=>{var r,s,i;function o(){tf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{tf(),n(_t(t,"network-request-failed"))},timeout:eE.get()})}if(!((s=(r=vt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=vt().gapi)===null||i===void 0)&&i.load)o();else{const l=sx("iframefcb");return vt()[l]=()=>{gapi.load?o():n(_t(t,"network-request-failed"))},nx(`${rx()}?onload=${l}`).catch(a=>n(a))}}).catch(e=>{throw eo=null,e})}let eo=null;function nE(t){return eo=eo||tE(t),eo}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE=new ui(5e3,15e3),sE="__/auth/iframe",iE="emulator/auth/iframe",oE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},lE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function aE(t){const e=t.config;R(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Bc(e,iE):`https://${t.config.authDomain}/${sE}`,r={apiKey:e.apiKey,appName:t.name,v:qr},s=lE.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Kr(r).slice(1)}`}async function uE(t){const e=await nE(t),n=vt().gapi;return R(n,t,"internal-error"),e.open({where:document.body,url:aE(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:oE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=_t(t,"network-request-failed"),l=vt().setTimeout(()=>{i(o)},rE.get());function a(){vt().clearTimeout(l),s(r)}r.ping(a).then(a,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},dE=500,hE=600,fE="_blank",pE="http://localhost";class nf{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function mE(t,e,n,r=dE,s=hE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const a=Object.assign(Object.assign({},cE),{width:r.toString(),height:s.toString(),top:i,left:o}),u=be().toLowerCase();n&&(l=Mg(u)?fE:n),Og(u)&&(e=e||pE,a.scrollbars="yes");const f=Object.entries(a).reduce((d,[_,v])=>`${d}${_}=${v},`,"");if(q1(u)&&l!=="_self")return gE(e||"",l),new nf(null);const h=window.open(e||"",l,f);R(h,t,"popup-blocked");try{h.focus()}catch{}return new nf(h)}function gE(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _E="__/auth/handler",vE="emulator/auth/handler",yE=encodeURIComponent("fac");async function rf(t,e,n,r,s,i){R(t.config.authDomain,t,"auth-domain-config-required"),R(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:qr,eventId:s};if(e instanceof $g){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",pu(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,h]of Object.entries({}))o[f]=h}if(e instanceof ci){const f=e.getScopes().filter(h=>h!=="");f.length>0&&(o.scopes=f.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const f of Object.keys(l))l[f]===void 0&&delete l[f];const a=await t._getAppCheckToken(),u=a?`#${yE}=${encodeURIComponent(a)}`:"";return`${wE(t)}?${Kr(l).slice(1)}${u}`}function wE({config:t}){return t.emulator?Bc(t,vE):`https://${t.authDomain}/${_E}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha="webStorageSupport";class xE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=Qg,this._completeRedirectFn=Hx,this._overrideRedirectResult=Wx}async _openPopup(e,n,r,s){var i;jt((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await rf(e,n,r,wu(),s);return mE(e,o,Vc())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await rf(e,n,r,wu(),s);return Cx(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(jt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await uE(e),r=new Kx(e);return n.register("authEvent",s=>(R(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ha,{type:ha},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[ha];o!==void 0&&n(!!o),Lt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=Jx(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Ug()||Dg()||zc()}}const EE=xE;var sf="@firebase/auth",of="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class SE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){R(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function CE(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function kE(t){Fr(new Wn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;R(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const a={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:zg(t)},u=new ex(r,s,i,a);return ox(u,n),u},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Fr(new Wn("auth-internal",e=>{const n=_l(e.getProvider("auth").getImmediate());return(r=>new SE(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),dn(sf,of,CE(t)),dn(sf,of,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const NE=5*60,IE=pg("authIdTokenMaxAge")||NE;let lf=null;const TE=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>IE)return;const s=n==null?void 0:n.token;lf!==s&&(lf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function bE(t=wg()){const e=Lc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=ix(t,{popupRedirectResolver:EE,persistence:[Ox,xx,Qg]}),r=pg("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=TE(i.toString());_x(n,o,()=>o(n.currentUser)),gx(n,l=>o(l))}}const s=hg("auth");return s&&lx(n,`http://${s}`),n}function PE(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}tx({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=_t("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",PE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});kE("Browser");var af={};const uf="@firebase/database",cf="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let n_="";function RE(t){n_=t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class AE{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),me(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Ks(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class OE{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return zt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const r_=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new AE(e)}}catch{}return new OE},On=r_("localStorage"),DE=r_("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kr=new Dc("@firebase/database"),ME=function(){let t=1;return function(){return t++}}(),s_=function(t){const e=Cw(t),n=new ww;n.update(e);const r=n.digest();return Pc.encodeByteArray(r)},hi=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=hi.apply(null,r):typeof r=="object"?e+=me(r):e+=r,e+=" "}return e};let ks=null,df=!0;const LE=function(t,e){S(!0,"Can't turn on custom loggers persistently."),kr.logLevel=V.VERBOSE,ks=kr.log.bind(kr)},ke=function(...t){if(df===!0&&(df=!1,ks===null&&DE.get("logging_enabled")===!0&&LE()),ks){const e=hi.apply(null,t);ks(e)}},fi=function(t){return function(...e){ke(t,...e)}},Su=function(...t){const e="FIREBASE INTERNAL ERROR: "+hi(...t);kr.error(e)},Ft=function(...t){const e=`FIREBASE FATAL ERROR: ${hi(...t)}`;throw kr.error(e),new Error(e)},Be=function(...t){const e="FIREBASE WARNING: "+hi(...t);kr.warn(e)},jE=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Be("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},i_=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},FE=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Br="[MIN_NAME]",$n="[MAX_NAME]",Yr=function(t,e){if(t===e)return 0;if(t===Br||e===$n)return-1;if(e===Br||t===$n)return 1;{const n=hf(t),r=hf(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},BE=function(t,e){return t===e?0:t<e?-1:1},ls=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+me(e))},Hc=function(t){if(typeof t!="object"||t===null)return me(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=me(e[r]),n+=":",n+=Hc(t[e[r]]);return n+="}",n},o_=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let s=0;s<n;s+=e)s+e>n?r.push(t.substring(s,n)):r.push(t.substring(s,s+e));return r};function Ue(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const l_=function(t){S(!i_(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let s,i,o,l,a;t===0?(i=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),r),i=l+r,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-r-n))));const u=[];for(a=n;a;a-=1)u.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)u.push(i%2?1:0),i=Math.floor(i/2);u.push(s?1:0),u.reverse();const f=u.join("");let h="";for(a=0;a<64;a+=8){let d=parseInt(f.substr(a,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},UE=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},zE=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function WE(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const VE=new RegExp("^-?(0*)\\d{1,10}$"),$E=-2147483648,HE=2147483647,hf=function(t){if(VE.test(t)){const e=Number(t);if(e>=$E&&e<=HE)return e}return null},Xr=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Be("Exception was thrown by user callback.",n),e},Math.floor(0))}},GE=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ns=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class KE{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Be(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qE{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ke("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Be(e)}}class to{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}to.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gc="5",a_="v",u_="s",c_="r",d_="f",h_=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,f_="ls",p_="p",Cu="ac",m_="websocket",g_="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class __{constructor(e,n,r,s,i=!1,o="",l=!1,a=!1){this.secure=n,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=On.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&On.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function QE(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function v_(t,e,n){S(typeof e=="string","typeof type must == string"),S(typeof n=="object","typeof params must == object");let r;if(e===m_)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===g_)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);QE(t)&&(n.ns=t.namespace);const s=[];return Ue(n,(i,o)=>{s.push(i+"="+o)}),r+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YE{constructor(){this.counters_={}}incrementCounter(e,n=1){zt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return tw(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fa={},pa={};function Kc(t){const e=t.toString();return fa[e]||(fa[e]=new YE),fa[e]}function XE(t,e){const n=t.toString();return pa[n]||(pa[n]=e()),pa[n]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&Xr(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ff="start",ZE="close",eS="pLPCommand",tS="pRTLPCB",y_="id",w_="pw",x_="ser",nS="cb",rS="seg",sS="ts",iS="d",oS="dframe",E_=1870,S_=30,lS=E_-S_,aS=25e3,uS=3e4;class pr{constructor(e,n,r,s,i,o,l){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=fi(e),this.stats_=Kc(n),this.urlFn=a=>(this.appCheckToken&&(a[Cu]=this.appCheckToken),v_(n,g_,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new JE(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(uS)),FE(()=>{if(this.isClosed_)return;this.scriptTagHolder=new qc((...i)=>{const[o,l,a,u,f]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===ff)this.id=l,this.password=a;else if(o===ZE)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,l]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const r={};r[ff]="t",r[x_]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[nS]=this.scriptTagHolder.uniqueCallbackIdentifier),r[a_]=Gc,this.transportSessionId&&(r[u_]=this.transportSessionId),this.lastSessionId&&(r[f_]=this.lastSessionId),this.applicationId&&(r[p_]=this.applicationId),this.appCheckToken&&(r[Cu]=this.appCheckToken),typeof location<"u"&&location.hostname&&h_.test(location.hostname)&&(r[c_]=d_);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){pr.forceAllow_=!0}static forceDisallow(){pr.forceDisallow_=!0}static isAvailable(){return pr.forceAllow_?!0:!pr.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!UE()&&!zE()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=me(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=cg(n),s=o_(r,lS);for(let i=0;i<s.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[oS]="t",r[y_]=e,r[w_]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=me(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class qc{constructor(e,n,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=ME(),window[eS+this.uniqueCallbackIdentifier]=e,window[tS+this.uniqueCallbackIdentifier]=n,this.myIFrame=qc.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){ke("frame writing exception"),l.stack&&ke(l.stack),ke(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ke("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[y_]=this.myID,e[w_]=this.myPW,e[x_]=this.currentSerial;let n=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+S_+r.length<=E_;){const o=this.pendingSegs.shift();r=r+"&"+rS+s+"="+o.seg+"&"+sS+s+"="+o.ts+"&"+iS+s+"="+o.d,s++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(r,Math.floor(aS)),i=()=>{clearTimeout(s),r()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{ke("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const cS=16384,dS=45e3;let Fo=null;typeof MozWebSocket<"u"?Fo=MozWebSocket:typeof WebSocket<"u"&&(Fo=WebSocket);class it{constructor(e,n,r,s,i,o,l){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=fi(this.connId),this.stats_=Kc(n),this.connURL=it.connectionURL_(n,o,l,s,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,s,i){const o={};return o[a_]=Gc,typeof location<"u"&&location.hostname&&h_.test(location.hostname)&&(o[c_]=d_),n&&(o[u_]=n),r&&(o[f_]=r),s&&(o[Cu]=s),i&&(o[p_]=i),v_(e,m_,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,On.set("previous_websocket_failure",!0);try{let r;hw(),this.mySock=new Fo(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){it.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Fo!==null&&!it.forceDisallow_}static previouslyFailed(){return On.isInMemoryStorage||On.get("previous_websocket_failure")===!0}markConnectionHealthy(){On.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Ks(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(S(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=me(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=o_(n,cS);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(dS))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}it.responsesRequiredToBeHealthy=2;it.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ys{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[pr,it]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=it&&it.isAvailable();let r=n&&!it.previouslyFailed();if(e.webSocketOnly&&(n||Be("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[it];else{const s=this.transports_=[];for(const i of Ys.ALL_TRANSPORTS)i&&i.isAvailable()&&s.push(i);Ys.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ys.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hS=6e4,fS=5e3,pS=10*1024,mS=100*1024,ma="t",pf="d",gS="s",mf="r",_S="e",gf="o",_f="a",vf="n",yf="p",vS="h";class yS{constructor(e,n,r,s,i,o,l,a,u,f){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=i,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=u,this.lastSessionId=f,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=fi("c:"+this.id+":"),this.transportManager_=new Ys(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Ns(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>mS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>pS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(ma in e){const n=e[ma];n===_f?this.upgradeIfSecondaryHealthy_():n===mf?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===gf&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ls("t",e),r=ls("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:yf,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:_f,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:vf,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ls("t",e),r=ls("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ls(ma,e);if(pf in e){const r=e[pf];if(n===vS){const s=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===vf){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===gS?this.onConnectionShutdown_(r):n===mf?this.onReset_(r):n===_S?Su("Server Error: "+r):n===gf?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Su("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),Gc!==r&&Be("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Ns(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(hS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ns(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(fS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:yf,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(On.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{put(e,n,r,s){}merge(e,n,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class k_{constructor(e){this.allowedEvents_=e,this.listeners_={},S(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===n&&(!r||r===s[i].context)){s.splice(i,1);return}}validateEventType_(e){S(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo extends k_{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Ac()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Bo}getInitialEvent(e){return S(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wf=32,xf=768;class H{constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function z(){return new H("")}function M(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function _n(t){return t.pieces_.length-t.pieceNum_}function G(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new H(t.pieces_,e)}function N_(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function wS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function I_(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function T_(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new H(e,0)}function ae(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof H)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&n.push(r[s])}return new H(n,0)}function j(t){return t.pieceNum_>=t.pieces_.length}function De(t,e){const n=M(t),r=M(e);if(n===null)return e;if(n===r)return De(G(t),G(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function Qc(t,e){if(_n(t)!==_n(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function ot(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(_n(t)>_n(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class xS{constructor(e,n){this.errorPrefix_=n,this.parts_=I_(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=ml(this.parts_[r]);b_(this)}}function ES(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=ml(e),b_(t)}function SS(t){const e=t.parts_.pop();t.byteLength_-=ml(e),t.parts_.length>0&&(t.byteLength_-=1)}function b_(t){if(t.byteLength_>xf)throw new Error(t.errorPrefix_+"has a key path longer than "+xf+" bytes ("+t.byteLength_+").");if(t.parts_.length>wf)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+wf+") or object contains a cycle "+bn(t))}function bn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yc extends k_{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new Yc}getInitialEvent(e){return S(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const as=1e3,CS=60*5*1e3,Ef=30*1e3,kS=1.3,NS=3e4,IS="server_kill",Sf=3;class Pt extends C_{constructor(e,n,r,s,i,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=Pt.nextPersistentConnectionId_++,this.log_=fi("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=as,this.maxReconnectDelay_=CS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Yc.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Bo.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const s=++this.requestNumber_,i={r:s,a:e,b:n};this.log_(me(i)),S(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const n=new pl,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,r,s){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),S(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:n,query:e,tag:r};this.listens.get(o).set(i,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+r+" for "+s);const i={p:r},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,l=>{const a=l.d,u=l.s;Pt.warnOnListenWarnings_(a,n),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",l),u!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(u,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&zt(e,"w")){const r=jr(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();Be(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||yw(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Ef)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=vw(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,s=>{const i=s.s,o=s.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),S(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,n)}sendUnlisten_(e,n,r,s){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";s&&(i.q=r,i.t=s),this.sendRequest(o,i)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,s){const i={p:n,d:r};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,r,s){this.putInternal("p",e,n,r,s)}merge(e,n,r,s){this.putInternal("m",e,n,r,s)}putInternal(e,n,r,s,i){this.initConnection_();const o={p:n,d:r};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const i=r.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+me(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Su("Unrecognized action received from server: "+me(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){S(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=as,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=as,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>NS&&(this.reconnectDelay_=as),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*kS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Pt.nextConnectionId_++,i=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,r())},u=function(h){S(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(h)};this.realtime_={close:a,sendRequest:u};const f=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(f),this.appCheckTokenProvider_.getToken(f)]);o?ke("getToken() completed but was canceled"):(ke("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,l=new yS(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,_=>{Be(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(IS)},i))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Be(h),a())}}}interrupt(e){ke("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ke("Resuming connection for reason: "+e),delete this.interruptReasons_[e],pu(this.interruptReasons_)&&(this.reconnectDelay_=as,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(i=>Hc(i)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const r=new H(e).toString();let s;if(this.listens.has(r)){const i=this.listens.get(r);s=i.get(n),i.delete(n),i.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,n){ke("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Sf&&(this.reconnectDelay_=Ef,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ke("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Sf&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+n_.replace(/\./g,"-")]=1,Ac()?e["framework.cordova"]=1:mg()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Bo.getInstance().currentlyOnline();return pu(this.interruptReasons_)&&e}}Pt.nextPersistentConnectionId_=0;Pt.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new L(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wl{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new L(Br,e),s=new L(Br,n);return this.compare(r,s)!==0}minPost(){return L.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ji;class P_ extends wl{static get __EMPTY_NODE(){return ji}static set __EMPTY_NODE(e){ji=e}compare(e,n){return Yr(e.name,n.name)}isDefinedOn(e){throw Gr("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return L.MIN}maxPost(){return new L($n,ji)}makePost(e,n){return S(typeof e=="string","KeyIndex indexValue must always be a string."),new L(e,ji)}toString(){return".key"}}const Nr=new P_;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fi{constructor(e,n,r,s,i=null){this.isReverse_=s,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class pe{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??pe.RED,this.left=s??Me.EMPTY_NODE,this.right=i??Me.EMPTY_NODE}copy(e,n,r,s,i){return new pe(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return i<0?s=s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Me.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,s;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return Me.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,pe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,pe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}pe.RED=!0;pe.BLACK=!1;class TS{copy(e,n,r,s,i){return this}insert(e,n,r){return new pe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Me{constructor(e,n=Me.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Me(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,pe.BLACK,null,null))}remove(e){return new Me(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,pe.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,s=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Fi(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Fi(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Fi(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Fi(this.root_,null,this.comparator_,!0,e)}}Me.EMPTY_NODE=new TS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bS(t,e){return Yr(t.name,e.name)}function Xc(t,e){return Yr(t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ku;function PS(t){ku=t}const R_=function(t){return typeof t=="number"?"number:"+l_(t):"string:"+t},A_=function(t){if(t.isLeafNode()){const e=t.val();S(typeof e=="string"||typeof e=="number"||typeof e=="object"&&zt(e,".sv"),"Priority must be a string or number.")}else S(t===ku||t.isEmpty(),"priority of unexpected type.");S(t===ku||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Cf;class he{constructor(e,n=he.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,S(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),A_(this.priorityNode_)}static set __childrenNodeConstructor(e){Cf=e}static get __childrenNodeConstructor(){return Cf}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new he(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:he.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return j(e)?this:M(e)===".priority"?this.priorityNode_:he.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:he.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=M(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(S(r!==".priority"||_n(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,he.__childrenNodeConstructor.EMPTY_NODE.updateChild(G(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+R_(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=l_(this.value_):e+=this.value_,this.lazyHash_=s_(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===he.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof he.__childrenNodeConstructor?-1:(S(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,s=he.VALUE_TYPE_ORDER.indexOf(n),i=he.VALUE_TYPE_ORDER.indexOf(r);return S(s>=0,"Unknown leaf type: "+n),S(i>=0,"Unknown leaf type: "+r),s===i?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}he.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let O_,D_;function RS(t){O_=t}function AS(t){D_=t}class OS extends wl{compare(e,n){const r=e.node.getPriority(),s=n.node.getPriority(),i=r.compareTo(s);return i===0?Yr(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return L.MIN}maxPost(){return new L($n,new he("[PRIORITY-POST]",D_))}makePost(e,n){const r=O_(e);return new L(n,new he("[PRIORITY-POST]",r))}toString(){return".priority"}}const ne=new OS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const DS=Math.log(2);class MS{constructor(e){const n=i=>parseInt(Math.log(i)/DS,10),r=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Uo=function(t,e,n,r){t.sort(e);const s=function(a,u){const f=u-a;let h,d;if(f===0)return null;if(f===1)return h=t[a],d=n?n(h):h,new pe(d,h.node,pe.BLACK,null,null);{const _=parseInt(f/2,10)+a,v=s(a,_),y=s(_+1,u);return h=t[_],d=n?n(h):h,new pe(d,h.node,pe.BLACK,v,y)}},i=function(a){let u=null,f=null,h=t.length;const d=function(v,y){const C=h-v,m=h;h-=v;const p=s(C+1,m),g=t[C],w=n?n(g):g;_(new pe(w,g.node,y,null,p))},_=function(v){u?(u.left=v,u=v):(f=v,u=v)};for(let v=0;v<a.count;++v){const y=a.nextBitIsOne(),C=Math.pow(2,a.count-(v+1));y?d(C,pe.BLACK):(d(C,pe.BLACK),d(C,pe.RED))}return f},o=new MS(t.length),l=i(o);return new Me(r||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ga;const Zn={};class Tt{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return S(Zn&&ne,"ChildrenNode.ts has not been loaded"),ga=ga||new Tt({".priority":Zn},{".priority":ne}),ga}get(e){const n=jr(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Me?n:null}hasIndex(e){return zt(this.indexSet_,e.toString())}addIndex(e,n){S(e!==Nr,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const i=n.getIterator(L.Wrap);let o=i.getNext();for(;o;)s=s||e.isDefinedOn(o.node),r.push(o),o=i.getNext();let l;s?l=Uo(r,e.getCompare()):l=Zn;const a=e.toString(),u=Object.assign({},this.indexSet_);u[a]=e;const f=Object.assign({},this.indexes_);return f[a]=l,new Tt(f,u)}addToIndexes(e,n){const r=Po(this.indexes_,(s,i)=>{const o=jr(this.indexSet_,i);if(S(o,"Missing index implementation for "+i),s===Zn)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(L.Wrap);let u=a.getNext();for(;u;)u.name!==e.name&&l.push(u),u=a.getNext();return l.push(e),Uo(l,o.getCompare())}else return Zn;else{const l=n.get(e.name);let a=s;return l&&(a=a.remove(new L(e.name,l))),a.insert(e,e.node)}});return new Tt(r,this.indexSet_)}removeFromIndexes(e,n){const r=Po(this.indexes_,s=>{if(s===Zn)return s;{const i=n.get(e.name);return i?s.remove(new L(e.name,i)):s}});return new Tt(r,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let us;class P{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&A_(this.priorityNode_),this.children_.isEmpty()&&S(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return us||(us=new P(new Me(Xc),null,Tt.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||us}updatePriority(e){return this.children_.isEmpty()?this:new P(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?us:n}}getChild(e){const n=M(e);return n===null?this:this.getImmediateChild(n).getChild(G(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(S(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new L(e,n);let s,i;n.isEmpty()?(s=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(r,this.children_));const o=s.isEmpty()?us:this.priorityNode_;return new P(s,o,i)}}updateChild(e,n){const r=M(e);if(r===null)return n;{S(M(e)!==".priority"||_n(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(G(e),n);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,s=0,i=!0;if(this.forEachChild(ne,(o,l)=>{n[o]=l.val(e),r++,i&&P.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):i=!1}),!e&&i&&s<2*r){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+R_(this.getPriority().val())+":"),this.forEachChild(ne,(n,r)=>{const s=r.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":s_(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const s=this.resolveIndex_(r);if(s){const i=s.getPredecessorKey(new L(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new L(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new L(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,L.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)<0;)s.getNext(),i=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,L.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)>0;)s.getNext(),i=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===pi?-1:0}withIndex(e){if(e===Nr||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new P(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===Nr||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(ne),s=n.getIterator(ne);let i=r.getNext(),o=s.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=r.getNext(),o=s.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Nr?null:this.indexMap_.get(e.toString())}}P.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class LS extends P{constructor(){super(new Me(Xc),P.EMPTY_NODE,Tt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return P.EMPTY_NODE}isEmpty(){return!1}}const pi=new LS;Object.defineProperties(L,{MIN:{value:new L(Br,P.EMPTY_NODE)},MAX:{value:new L($n,pi)}});P_.__EMPTY_NODE=P.EMPTY_NODE;he.__childrenNodeConstructor=P;PS(pi);AS(pi);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jS=!0;function ye(t,e=null){if(t===null)return P.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),S(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new he(n,ye(e))}if(!(t instanceof Array)&&jS){const n=[];let r=!1;if(Ue(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=ye(l);a.isEmpty()||(r=r||!a.getPriority().isEmpty(),n.push(new L(o,a)))}}),n.length===0)return P.EMPTY_NODE;const i=Uo(n,bS,o=>o.name,Xc);if(r){const o=Uo(n,ne.getCompare());return new P(i,ye(e),new Tt({".priority":o},{".priority":ne}))}else return new P(i,ye(e),Tt.Default)}else{let n=P.EMPTY_NODE;return Ue(t,(r,s)=>{if(zt(t,r)&&r.substring(0,1)!=="."){const i=ye(s);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(r,i))}}),n.updatePriority(ye(e))}}RS(ye);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class FS extends wl{constructor(e){super(),this.indexPath_=e,S(!j(e)&&M(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),s=this.extractChild(n.node),i=r.compareTo(s);return i===0?Yr(e.name,n.name):i}makePost(e,n){const r=ye(e),s=P.EMPTY_NODE.updateChild(this.indexPath_,r);return new L(n,s)}maxPost(){const e=P.EMPTY_NODE.updateChild(this.indexPath_,pi);return new L($n,e)}toString(){return I_(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class BS extends wl{compare(e,n){const r=e.node.compareTo(n.node);return r===0?Yr(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return L.MIN}maxPost(){return L.MAX}makePost(e,n){const r=ye(e);return new L(n,r)}toString(){return".value"}}const US=new BS;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function M_(t){return{type:"value",snapshotNode:t}}function Ur(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function Xs(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function Js(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function zS(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jc{constructor(e){this.index_=e}updateChild(e,n,r,s,i,o){S(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(s).equals(r.getChild(s))&&l.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(Xs(n,l)):S(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Ur(n,r)):o.trackChildChange(Js(n,r,l))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(ne,(s,i)=>{n.hasChild(s)||r.trackChildChange(Xs(s,i))}),n.isLeafNode()||n.forEachChild(ne,(s,i)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(i)||r.trackChildChange(Js(s,i,o))}else r.trackChildChange(Ur(s,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?P.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zs{constructor(e){this.indexedFilter_=new Jc(e.getIndex()),this.index_=e.getIndex(),this.startPost_=Zs.getStartPost_(e),this.endPost_=Zs.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,s,i,o){return this.matches(new L(n,r))||(r=P.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,s,i,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=P.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(P.EMPTY_NODE);const i=this;return n.forEachChild(ne,(o,l)=>{i.matches(new L(o,l))||(s=s.updateImmediateChild(o,P.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class WS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new Zs(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,s,i,o){return this.rangedFilter_.matches(new L(n,r))||(r=P.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,s,i,o):this.fullLimitUpdateChild_(e,n,r,i,o)}updateFullNode(e,n,r){let s;if(n.isLeafNode()||n.isEmpty())s=P.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=P.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const l=i.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(P.EMPTY_NODE);let i;this.reverse_?i=s.getReverseIterator(this.index_):i=s.getIterator(this.index_);let o=0;for(;i.hasNext();){const l=i.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:s=s.updateImmediateChild(l.name,P.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,s,i){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,_)=>h(_,d)}else o=this.index_.getCompare();const l=e;S(l.numChildren()===this.limit_,"");const a=new L(n,r),u=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),f=this.rangedFilter_.matches(a);if(l.hasChild(n)){const h=l.getImmediateChild(n);let d=s.getChildAfterChild(this.index_,u,this.reverse_);for(;d!=null&&(d.name===n||l.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const _=d==null?1:o(d,a);if(f&&!r.isEmpty()&&_>=0)return i!=null&&i.trackChildChange(Js(n,r,h)),l.updateImmediateChild(n,r);{i!=null&&i.trackChildChange(Xs(n,h));const y=l.updateImmediateChild(n,P.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(i!=null&&i.trackChildChange(Ur(d.name,d.node)),y.updateImmediateChild(d.name,d.node)):y}}else return r.isEmpty()?e:f&&o(u,a)>=0?(i!=null&&(i.trackChildChange(Xs(u.name,u.node)),i.trackChildChange(Ur(n,r))),l.updateImmediateChild(n,r).updateImmediateChild(u.name,P.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zc{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=ne}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return S(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return S(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Br}hasEnd(){return this.endSet_}getIndexEndValue(){return S(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return S(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:$n}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return S(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===ne}copy(){const e=new Zc;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function VS(t){return t.loadsAllData()?new Jc(t.getIndex()):t.hasLimit()?new WS(t):new Zs(t)}function kf(t){const e={};if(t.isDefault())return e;let n;if(t.index_===ne?n="$priority":t.index_===US?n="$value":t.index_===Nr?n="$key":(S(t.index_ instanceof FS,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=me(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=me(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+me(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=me(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+me(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Nf(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==ne&&(e.i=t.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zo extends C_{constructor(e,n,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=fi("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(S(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,s){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=zo.getListenId_(e,r),l={};this.listens_[o]=l;const a=kf(e._queryParams);this.restRequest_(i+".json",a,(u,f)=>{let h=f;if(u===404&&(h=null,u=null),u===null&&this.onDataUpdate_(i,h,!1,r),jr(this.listens_,o)===l){let d;u?u===401?d="permission_denied":d="rest_error:"+u:d="ok",s(d,null)}})}unlisten(e,n){const r=zo.getListenId_(e,n);delete this.listens_[r]}get(e){const n=kf(e._queryParams),r=e._path.toString(),s=new pl;return this.restRequest_(r+".json",n,(i,o)=>{let l=o;i===404&&(l=null,i=null),i===null?(this.onDataUpdate_(r,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,i])=>{s&&s.accessToken&&(n.auth=s.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Kr(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(r&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=Ks(l.responseText)}catch{Be("Failed to parse JSON response for "+o+": "+l.responseText)}r(null,a)}else l.status!==401&&l.status!==404&&Be("Got unsuccessful REST response for "+o+" Status: "+l.status),r(l.status);r=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $S{constructor(){this.rootNode_=P.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wo(){return{value:null,children:new Map}}function L_(t,e,n){if(j(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=M(e);t.children.has(r)||t.children.set(r,Wo());const s=t.children.get(r);e=G(e),L_(s,e,n)}}function Nu(t,e,n){t.value!==null?n(e,t.value):HS(t,(r,s)=>{const i=new H(e.toString()+"/"+r);Nu(s,i,n)})}function HS(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class GS{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&Ue(this.last_,(r,s)=>{n[r]=n[r]-s}),this.last_=e,n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const If=10*1e3,KS=30*1e3,qS=5*60*1e3;class QS{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new GS(e);const r=If+(KS-If)*Math.random();Ns(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;Ue(e,(s,i)=>{i>0&&zt(this.statsToReport_,s)&&(n[s]=i,r=!0)}),r&&this.server_.reportStats(n),Ns(this.reportStats_.bind(this),Math.floor(Math.random()*2*qS))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var lt;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(lt||(lt={}));function j_(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function ed(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function td(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=lt.ACK_USER_WRITE,this.source=j_()}operationForChild(e){if(j(this.path)){if(this.affectedTree.value!=null)return S(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new H(e));return new Vo(z(),n,this.revert)}}else return S(M(this.path)===e,"operationForChild called for unrelated child."),new Vo(G(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e,n){this.source=e,this.path=n,this.type=lt.LISTEN_COMPLETE}operationForChild(e){return j(this.path)?new ei(this.source,z()):new ei(this.source,G(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=lt.OVERWRITE}operationForChild(e){return j(this.path)?new Hn(this.source,z(),this.snap.getImmediateChild(e)):new Hn(this.source,G(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ti{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=lt.MERGE}operationForChild(e){if(j(this.path)){const n=this.children.subtree(new H(e));return n.isEmpty()?null:n.value?new Hn(this.source,z(),n.value):new ti(this.source,z(),n)}else return S(M(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new ti(this.source,G(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(j(e))return this.isFullyInitialized()&&!this.filtered_;const n=M(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class YS{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function XS(t,e,n,r){const s=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(zS(o.childName,o.snapshotNode))}),cs(t,s,"child_removed",e,r,n),cs(t,s,"child_added",e,r,n),cs(t,s,"child_moved",i,r,n),cs(t,s,"child_changed",e,r,n),cs(t,s,"value",e,r,n),s}function cs(t,e,n,r,s,i){const o=r.filter(l=>l.type===n);o.sort((l,a)=>ZS(t,l,a)),o.forEach(l=>{const a=JS(t,l,i);s.forEach(u=>{u.respondsTo(l.type)&&e.push(u.createEvent(a,t.query_))})})}function JS(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function ZS(t,e,n){if(e.childName==null||n.childName==null)throw Gr("Should only compare child_ events.");const r=new L(e.childName,e.snapshotNode),s=new L(n.childName,n.snapshotNode);return t.index_.compare(r,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xl(t,e){return{eventCache:t,serverCache:e}}function Is(t,e,n,r){return xl(new Gn(e,n,r),t.serverCache)}function F_(t,e,n,r){return xl(t.eventCache,new Gn(e,n,r))}function Iu(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Kn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let _a;const eC=()=>(_a||(_a=new Me(BE)),_a);class Q{constructor(e,n=eC()){this.value=e,this.children=n}static fromObject(e){let n=new Q(null);return Ue(e,(r,s)=>{n=n.set(new H(r),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:z(),value:this.value};if(j(e))return null;{const r=M(e),s=this.children.get(r);if(s!==null){const i=s.findRootMostMatchingPathAndValue(G(e),n);return i!=null?{path:ae(new H(r),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(j(e))return this;{const n=M(e),r=this.children.get(n);return r!==null?r.subtree(G(e)):new Q(null)}}set(e,n){if(j(e))return new Q(n,this.children);{const r=M(e),i=(this.children.get(r)||new Q(null)).set(G(e),n),o=this.children.insert(r,i);return new Q(this.value,o)}}remove(e){if(j(e))return this.children.isEmpty()?new Q(null):new Q(null,this.children);{const n=M(e),r=this.children.get(n);if(r){const s=r.remove(G(e));let i;return s.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,s),this.value===null&&i.isEmpty()?new Q(null):new Q(this.value,i)}else return this}}get(e){if(j(e))return this.value;{const n=M(e),r=this.children.get(n);return r?r.get(G(e)):null}}setTree(e,n){if(j(e))return n;{const r=M(e),i=(this.children.get(r)||new Q(null)).setTree(G(e),n);let o;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),new Q(this.value,o)}}fold(e){return this.fold_(z(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((s,i)=>{r[s]=i.fold_(ae(e,s),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,z(),n)}findOnPath_(e,n,r){const s=this.value?r(n,this.value):!1;if(s)return s;if(j(e))return null;{const i=M(e),o=this.children.get(i);return o?o.findOnPath_(G(e),ae(n,i),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,z(),n)}foreachOnPath_(e,n,r){if(j(e))return this;{this.value&&r(n,this.value);const s=M(e),i=this.children.get(s);return i?i.foreachOnPath_(G(e),ae(n,s),r):new Q(null)}}foreach(e){this.foreach_(z(),e)}foreach_(e,n){this.children.inorderTraversal((r,s)=>{s.foreach_(ae(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ct{constructor(e){this.writeTree_=e}static empty(){return new ct(new Q(null))}}function Ts(t,e,n){if(j(e))return new ct(new Q(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let i=r.value;const o=De(s,e);return i=i.updateChild(o,n),new ct(t.writeTree_.set(s,i))}else{const s=new Q(n),i=t.writeTree_.setTree(e,s);return new ct(i)}}}function Tf(t,e,n){let r=t;return Ue(n,(s,i)=>{r=Ts(r,ae(e,s),i)}),r}function bf(t,e){if(j(e))return ct.empty();{const n=t.writeTree_.setTree(e,new Q(null));return new ct(n)}}function Tu(t,e){return Yn(t,e)!=null}function Yn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(De(n.path,e)):null}function Pf(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(ne,(r,s)=>{e.push(new L(r,s))}):t.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new L(r,s.value))}),e}function fn(t,e){if(j(e))return t;{const n=Yn(t,e);return n!=null?new ct(new Q(n)):new ct(t.writeTree_.subtree(e))}}function bu(t){return t.writeTree_.isEmpty()}function zr(t,e){return B_(z(),t.writeTree_,e)}function B_(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((s,i)=>{s===".priority"?(S(i.value!==null,"Priority writes must always be leaf nodes"),r=i.value):n=B_(ae(t,s),i,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(ae(t,".priority"),r)),n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nd(t,e){return V_(e,t)}function tC(t,e,n,r,s){S(r>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:s}),s&&(t.visibleWrites=Ts(t.visibleWrites,e,n)),t.lastWriteId=r}function nC(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function rC(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);S(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let s=r.visible,i=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&sC(l,r.path)?s=!1:ot(r.path,l.path)&&(i=!0)),o--}if(s){if(i)return iC(t),!0;if(r.snap)t.visibleWrites=bf(t.visibleWrites,r.path);else{const l=r.children;Ue(l,a=>{t.visibleWrites=bf(t.visibleWrites,ae(r.path,a))})}return!0}else return!1}function sC(t,e){if(t.snap)return ot(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&ot(ae(t.path,n),e))return!0;return!1}function iC(t){t.visibleWrites=U_(t.allWrites,oC,z()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function oC(t){return t.visible}function U_(t,e,n){let r=ct.empty();for(let s=0;s<t.length;++s){const i=t[s];if(e(i)){const o=i.path;let l;if(i.snap)ot(n,o)?(l=De(n,o),r=Ts(r,l,i.snap)):ot(o,n)&&(l=De(o,n),r=Ts(r,z(),i.snap.getChild(l)));else if(i.children){if(ot(n,o))l=De(n,o),r=Tf(r,l,i.children);else if(ot(o,n))if(l=De(o,n),j(l))r=Tf(r,z(),i.children);else{const a=jr(i.children,M(l));if(a){const u=a.getChild(G(l));r=Ts(r,z(),u)}}}else throw Gr("WriteRecord should have .snap or .children")}}return r}function z_(t,e,n,r,s){if(!r&&!s){const i=Yn(t.visibleWrites,e);if(i!=null)return i;{const o=fn(t.visibleWrites,e);if(bu(o))return n;if(n==null&&!Tu(o,z()))return null;{const l=n||P.EMPTY_NODE;return zr(o,l)}}}else{const i=fn(t.visibleWrites,e);if(!s&&bu(i))return n;if(!s&&n==null&&!Tu(i,z()))return null;{const o=function(u){return(u.visible||s)&&(!r||!~r.indexOf(u.writeId))&&(ot(u.path,e)||ot(e,u.path))},l=U_(t.allWrites,o,e),a=n||P.EMPTY_NODE;return zr(l,a)}}}function lC(t,e,n){let r=P.EMPTY_NODE;const s=Yn(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(ne,(i,o)=>{r=r.updateImmediateChild(i,o)}),r;if(n){const i=fn(t.visibleWrites,e);return n.forEachChild(ne,(o,l)=>{const a=zr(fn(i,new H(o)),l);r=r.updateImmediateChild(o,a)}),Pf(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const i=fn(t.visibleWrites,e);return Pf(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function aC(t,e,n,r,s){S(r||s,"Either existingEventSnap or existingServerSnap must exist");const i=ae(e,n);if(Tu(t.visibleWrites,i))return null;{const o=fn(t.visibleWrites,i);return bu(o)?s.getChild(n):zr(o,s.getChild(n))}}function uC(t,e,n,r){const s=ae(e,n),i=Yn(t.visibleWrites,s);if(i!=null)return i;if(r.isCompleteForChild(n)){const o=fn(t.visibleWrites,s);return zr(o,r.getNode().getImmediateChild(n))}else return null}function cC(t,e){return Yn(t.visibleWrites,e)}function dC(t,e,n,r,s,i,o){let l;const a=fn(t.visibleWrites,e),u=Yn(a,z());if(u!=null)l=u;else if(n!=null)l=zr(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const f=[],h=o.getCompare(),d=i?l.getReverseIteratorFrom(r,o):l.getIteratorFrom(r,o);let _=d.getNext();for(;_&&f.length<s;)h(_,r)!==0&&f.push(_),_=d.getNext();return f}else return[]}function hC(){return{visibleWrites:ct.empty(),allWrites:[],lastWriteId:-1}}function $o(t,e,n,r){return z_(t.writeTree,t.treePath,e,n,r)}function rd(t,e){return lC(t.writeTree,t.treePath,e)}function Rf(t,e,n,r){return aC(t.writeTree,t.treePath,e,n,r)}function Ho(t,e){return cC(t.writeTree,ae(t.treePath,e))}function fC(t,e,n,r,s,i){return dC(t.writeTree,t.treePath,e,n,r,s,i)}function sd(t,e,n){return uC(t.writeTree,t.treePath,e,n)}function W_(t,e){return V_(ae(t.treePath,e),t.writeTree)}function V_(t,e){return{treePath:t,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pC{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;S(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),S(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const i=s.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(r,Js(r,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(r,Xs(r,s.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(r,Ur(r,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(r,Js(r,e.snapshotNode,s.oldSnap));else throw Gr("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mC{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const $_=new mC;class id{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Gn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return sd(this.writes_,e,r)}}getChildAfterChild(e,n,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Kn(this.viewCache_),i=fC(this.writes_,s,n,1,r,e);return i.length===0?null:i[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gC(t){return{filter:t}}function _C(t,e){S(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),S(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function vC(t,e,n,r,s){const i=new pC;let o,l;if(n.type===lt.OVERWRITE){const u=n;u.source.fromUser?o=Pu(t,e,u.path,u.snap,r,s,i):(S(u.source.fromServer,"Unknown source."),l=u.source.tagged||e.serverCache.isFiltered()&&!j(u.path),o=Go(t,e,u.path,u.snap,r,s,l,i))}else if(n.type===lt.MERGE){const u=n;u.source.fromUser?o=wC(t,e,u.path,u.children,r,s,i):(S(u.source.fromServer,"Unknown source."),l=u.source.tagged||e.serverCache.isFiltered(),o=Ru(t,e,u.path,u.children,r,s,l,i))}else if(n.type===lt.ACK_USER_WRITE){const u=n;u.revert?o=SC(t,e,u.path,r,s,i):o=xC(t,e,u.path,u.affectedTree,r,s,i)}else if(n.type===lt.LISTEN_COMPLETE)o=EC(t,e,n.path,r,i);else throw Gr("Unknown operation type: "+n.type);const a=i.getChanges();return yC(e,o,a),{viewCache:o,changes:a}}function yC(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),i=Iu(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!r.getNode().equals(i)||!r.getNode().getPriority().equals(i.getPriority()))&&n.push(M_(Iu(e)))}}function H_(t,e,n,r,s,i){const o=e.eventCache;if(Ho(r,n)!=null)return e;{let l,a;if(j(n))if(S(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const u=Kn(e),f=u instanceof P?u:P.EMPTY_NODE,h=rd(r,f);l=t.filter.updateFullNode(e.eventCache.getNode(),h,i)}else{const u=$o(r,Kn(e));l=t.filter.updateFullNode(e.eventCache.getNode(),u,i)}else{const u=M(n);if(u===".priority"){S(_n(n)===1,"Can't have a priority with additional path components");const f=o.getNode();a=e.serverCache.getNode();const h=Rf(r,n,f,a);h!=null?l=t.filter.updatePriority(f,h):l=o.getNode()}else{const f=G(n);let h;if(o.isCompleteForChild(u)){a=e.serverCache.getNode();const d=Rf(r,n,o.getNode(),a);d!=null?h=o.getNode().getImmediateChild(u).updateChild(f,d):h=o.getNode().getImmediateChild(u)}else h=sd(r,u,e.serverCache);h!=null?l=t.filter.updateChild(o.getNode(),u,h,f,s,i):l=o.getNode()}}return Is(e,l,o.isFullyInitialized()||j(n),t.filter.filtersNodes())}}function Go(t,e,n,r,s,i,o,l){const a=e.serverCache;let u;const f=o?t.filter:t.filter.getIndexedFilter();if(j(n))u=f.updateFullNode(a.getNode(),r,null);else if(f.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(n,r);u=f.updateFullNode(a.getNode(),_,null)}else{const _=M(n);if(!a.isCompleteForPath(n)&&_n(n)>1)return e;const v=G(n),C=a.getNode().getImmediateChild(_).updateChild(v,r);_===".priority"?u=f.updatePriority(a.getNode(),C):u=f.updateChild(a.getNode(),_,C,v,$_,null)}const h=F_(e,u,a.isFullyInitialized()||j(n),f.filtersNodes()),d=new id(s,h,i);return H_(t,h,n,s,d,l)}function Pu(t,e,n,r,s,i,o){const l=e.eventCache;let a,u;const f=new id(s,e,i);if(j(n))u=t.filter.updateFullNode(e.eventCache.getNode(),r,o),a=Is(e,u,!0,t.filter.filtersNodes());else{const h=M(n);if(h===".priority")u=t.filter.updatePriority(e.eventCache.getNode(),r),a=Is(e,u,l.isFullyInitialized(),l.isFiltered());else{const d=G(n),_=l.getNode().getImmediateChild(h);let v;if(j(d))v=r;else{const y=f.getCompleteChild(h);y!=null?N_(d)===".priority"&&y.getChild(T_(d)).isEmpty()?v=y:v=y.updateChild(d,r):v=P.EMPTY_NODE}if(_.equals(v))a=e;else{const y=t.filter.updateChild(l.getNode(),h,v,d,f,o);a=Is(e,y,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function Af(t,e){return t.eventCache.isCompleteForChild(e)}function wC(t,e,n,r,s,i,o){let l=e;return r.foreach((a,u)=>{const f=ae(n,a);Af(e,M(f))&&(l=Pu(t,l,f,u,s,i,o))}),r.foreach((a,u)=>{const f=ae(n,a);Af(e,M(f))||(l=Pu(t,l,f,u,s,i,o))}),l}function Of(t,e,n){return n.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function Ru(t,e,n,r,s,i,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,u;j(n)?u=r:u=new Q(null).setTree(n,r);const f=e.serverCache.getNode();return u.children.inorderTraversal((h,d)=>{if(f.hasChild(h)){const _=e.serverCache.getNode().getImmediateChild(h),v=Of(t,_,d);a=Go(t,a,new H(h),v,s,i,o,l)}}),u.children.inorderTraversal((h,d)=>{const _=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!f.hasChild(h)&&!_){const v=e.serverCache.getNode().getImmediateChild(h),y=Of(t,v,d);a=Go(t,a,new H(h),y,s,i,o,l)}}),a}function xC(t,e,n,r,s,i,o){if(Ho(s,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(r.value!=null){if(j(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return Go(t,e,n,a.getNode().getChild(n),s,i,l,o);if(j(n)){let u=new Q(null);return a.getNode().forEachChild(Nr,(f,h)=>{u=u.set(new H(f),h)}),Ru(t,e,n,u,s,i,l,o)}else return e}else{let u=new Q(null);return r.foreach((f,h)=>{const d=ae(n,f);a.isCompleteForPath(d)&&(u=u.set(f,a.getNode().getChild(d)))}),Ru(t,e,n,u,s,i,l,o)}}function EC(t,e,n,r,s){const i=e.serverCache,o=F_(e,i.getNode(),i.isFullyInitialized()||j(n),i.isFiltered());return H_(t,o,n,r,$_,s)}function SC(t,e,n,r,s,i){let o;if(Ho(r,n)!=null)return e;{const l=new id(r,e,s),a=e.eventCache.getNode();let u;if(j(n)||M(n)===".priority"){let f;if(e.serverCache.isFullyInitialized())f=$o(r,Kn(e));else{const h=e.serverCache.getNode();S(h instanceof P,"serverChildren would be complete if leaf node"),f=rd(r,h)}f=f,u=t.filter.updateFullNode(a,f,i)}else{const f=M(n);let h=sd(r,f,e.serverCache);h==null&&e.serverCache.isCompleteForChild(f)&&(h=a.getImmediateChild(f)),h!=null?u=t.filter.updateChild(a,f,h,G(n),l,i):e.eventCache.getNode().hasChild(f)?u=t.filter.updateChild(a,f,P.EMPTY_NODE,G(n),l,i):u=a,u.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=$o(r,Kn(e)),o.isLeafNode()&&(u=t.filter.updateFullNode(u,o,i)))}return o=e.serverCache.isFullyInitialized()||Ho(r,z())!=null,Is(e,u,o,t.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class CC{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,s=new Jc(r.getIndex()),i=VS(r);this.processor_=gC(i);const o=n.serverCache,l=n.eventCache,a=s.updateFullNode(P.EMPTY_NODE,o.getNode(),null),u=i.updateFullNode(P.EMPTY_NODE,l.getNode(),null),f=new Gn(a,o.isFullyInitialized(),s.filtersNodes()),h=new Gn(u,l.isFullyInitialized(),i.filtersNodes());this.viewCache_=xl(h,f),this.eventGenerator_=new YS(this.query_)}get query(){return this.query_}}function kC(t){return t.viewCache_.serverCache.getNode()}function NC(t,e){const n=Kn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!j(e)&&!n.getImmediateChild(M(e)).isEmpty())?n.getChild(e):null}function Df(t){return t.eventRegistrations_.length===0}function IC(t,e){t.eventRegistrations_.push(e)}function Mf(t,e,n){const r=[];if(n){S(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,s);o&&r.push(o)})}if(e){let s=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return r}function Lf(t,e,n,r){e.type===lt.MERGE&&e.source.queryId!==null&&(S(Kn(t.viewCache_),"We should always have a full cache before handling merges"),S(Iu(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,i=vC(t.processor_,s,e,n,r);return _C(t.processor_,i.viewCache),S(i.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,G_(t,i.changes,i.viewCache.eventCache.getNode(),null)}function TC(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(ne,(i,o)=>{r.push(Ur(i,o))}),n.isFullyInitialized()&&r.push(M_(n.getNode())),G_(t,r,n.getNode(),e)}function G_(t,e,n,r){const s=r?[r]:t.eventRegistrations_;return XS(t.eventGenerator_,e,n,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ko;class bC{constructor(){this.views=new Map}}function PC(t){S(!Ko,"__referenceConstructor has already been defined"),Ko=t}function RC(){return S(Ko,"Reference.ts has not been loaded"),Ko}function AC(t){return t.views.size===0}function od(t,e,n,r){const s=e.source.queryId;if(s!==null){const i=t.views.get(s);return S(i!=null,"SyncTree gave us an op for an invalid query."),Lf(i,e,n,r)}else{let i=[];for(const o of t.views.values())i=i.concat(Lf(o,e,n,r));return i}}function OC(t,e,n,r,s){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let l=$o(n,s?r:null),a=!1;l?a=!0:r instanceof P?(l=rd(n,r),a=!1):(l=P.EMPTY_NODE,a=!1);const u=xl(new Gn(l,a,!1),new Gn(r,s,!1));return new CC(e,u)}return o}function DC(t,e,n,r,s,i){const o=OC(t,e,r,s,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),IC(o,n),TC(o,n)}function MC(t,e,n,r){const s=e._queryIdentifier,i=[];let o=[];const l=vn(t);if(s==="default")for(const[a,u]of t.views.entries())o=o.concat(Mf(u,n,r)),Df(u)&&(t.views.delete(a),u.query._queryParams.loadsAllData()||i.push(u.query));else{const a=t.views.get(s);a&&(o=o.concat(Mf(a,n,r)),Df(a)&&(t.views.delete(s),a.query._queryParams.loadsAllData()||i.push(a.query)))}return l&&!vn(t)&&i.push(new(RC())(e._repo,e._path)),{removed:i,events:o}}function K_(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Ir(t,e){let n=null;for(const r of t.views.values())n=n||NC(r,e);return n}function q_(t,e){if(e._queryParams.loadsAllData())return El(t);{const r=e._queryIdentifier;return t.views.get(r)}}function Q_(t,e){return q_(t,e)!=null}function vn(t){return El(t)!=null}function El(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let qo;function LC(t){S(!qo,"__referenceConstructor has already been defined"),qo=t}function jC(){return S(qo,"Reference.ts has not been loaded"),qo}let FC=1;class jf{constructor(e){this.listenProvider_=e,this.syncPointTree_=new Q(null),this.pendingWriteTree_=hC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Y_(t,e,n,r,s){return tC(t.pendingWriteTree_,e,n,r,s),s?mi(t,new Hn(j_(),e,n)):[]}function Dn(t,e,n=!1){const r=nC(t.pendingWriteTree_,e);if(rC(t.pendingWriteTree_,e)){let i=new Q(null);return r.snap!=null?i=i.set(z(),!0):Ue(r.children,o=>{i=i.set(new H(o),!0)}),mi(t,new Vo(r.path,i,n))}else return[]}function Sl(t,e,n){return mi(t,new Hn(ed(),e,n))}function BC(t,e,n){const r=Q.fromObject(n);return mi(t,new ti(ed(),e,r))}function UC(t,e){return mi(t,new ei(ed(),e))}function zC(t,e,n){const r=ad(t,n);if(r){const s=ud(r),i=s.path,o=s.queryId,l=De(i,e),a=new ei(td(o),l);return cd(t,i,a)}else return[]}function Au(t,e,n,r,s=!1){const i=e._path,o=t.syncPointTree_.get(i);let l=[];if(o&&(e._queryIdentifier==="default"||Q_(o,e))){const a=MC(o,e,n,r);AC(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const u=a.removed;if(l=a.events,!s){const f=u.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=t.syncPointTree_.findOnPath(i,(d,_)=>vn(_));if(f&&!h){const d=t.syncPointTree_.subtree(i);if(!d.isEmpty()){const _=$C(d);for(let v=0;v<_.length;++v){const y=_[v],C=y.query,m=Z_(t,y);t.listenProvider_.startListening(bs(C),Qo(t,C),m.hashFn,m.onComplete)}}}!h&&u.length>0&&!r&&(f?t.listenProvider_.stopListening(bs(e),null):u.forEach(d=>{const _=t.queryToTagMap.get(Cl(d));t.listenProvider_.stopListening(bs(d),_)}))}HC(t,u)}return l}function WC(t,e,n,r){const s=ad(t,r);if(s!=null){const i=ud(s),o=i.path,l=i.queryId,a=De(o,e),u=new Hn(td(l),a,n);return cd(t,o,u)}else return[]}function VC(t,e,n,r){const s=ad(t,r);if(s){const i=ud(s),o=i.path,l=i.queryId,a=De(o,e),u=Q.fromObject(n),f=new ti(td(l),a,u);return cd(t,o,f)}else return[]}function Ff(t,e,n,r=!1){const s=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(s,(d,_)=>{const v=De(d,s);i=i||Ir(_,v),o=o||vn(_)});let l=t.syncPointTree_.get(s);l?(o=o||vn(l),i=i||Ir(l,z())):(l=new bC,t.syncPointTree_=t.syncPointTree_.set(s,l));let a;i!=null?a=!0:(a=!1,i=P.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((_,v)=>{const y=Ir(v,z());y&&(i=i.updateImmediateChild(_,y))}));const u=Q_(l,e);if(!u&&!e._queryParams.loadsAllData()){const d=Cl(e);S(!t.queryToTagMap.has(d),"View does not exist, but we have a tag");const _=GC();t.queryToTagMap.set(d,_),t.tagToQueryMap.set(_,d)}const f=nd(t.pendingWriteTree_,s);let h=DC(l,e,n,f,i,a);if(!u&&!o&&!r){const d=q_(l,e);h=h.concat(KC(t,e,d))}return h}function ld(t,e,n){const s=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=De(o,e),u=Ir(l,a);if(u)return u});return z_(s,e,i,n,!0)}function mi(t,e){return X_(e,t.syncPointTree_,null,nd(t.pendingWriteTree_,z()))}function X_(t,e,n,r){if(j(t.path))return J_(t,e,n,r);{const s=e.get(z());n==null&&s!=null&&(n=Ir(s,z()));let i=[];const o=M(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const u=n?n.getImmediateChild(o):null,f=W_(r,o);i=i.concat(X_(l,a,u,f))}return s&&(i=i.concat(od(s,t,r,n))),i}}function J_(t,e,n,r){const s=e.get(z());n==null&&s!=null&&(n=Ir(s,z()));let i=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,u=W_(r,o),f=t.operationForChild(o);f&&(i=i.concat(J_(f,l,a,u)))}),s&&(i=i.concat(od(s,t,r,n))),i}function Z_(t,e){const n=e.query,r=Qo(t,n);return{hashFn:()=>(kC(e)||P.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return r?zC(t,n._path,r):UC(t,n._path);{const i=WE(s,n);return Au(t,n,null,i)}}}}function Qo(t,e){const n=Cl(e);return t.queryToTagMap.get(n)}function Cl(t){return t._path.toString()+"$"+t._queryIdentifier}function ad(t,e){return t.tagToQueryMap.get(e)}function ud(t){const e=t.indexOf("$");return S(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new H(t.substr(0,e))}}function cd(t,e,n){const r=t.syncPointTree_.get(e);S(r,"Missing sync point for query tag that we're tracking");const s=nd(t.pendingWriteTree_,e);return od(r,n,s,null)}function $C(t){return t.fold((e,n,r)=>{if(n&&vn(n))return[El(n)];{let s=[];return n&&(s=K_(n)),Ue(r,(i,o)=>{s=s.concat(o)}),s}})}function bs(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new(jC())(t._repo,t._path):t}function HC(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const s=Cl(r),i=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(i)}}}function GC(){return FC++}function KC(t,e,n){const r=e._path,s=Qo(t,e),i=Z_(t,n),o=t.listenProvider_.startListening(bs(e),s,i.hashFn,i.onComplete),l=t.syncPointTree_.subtree(r);if(s)S(!vn(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((u,f,h)=>{if(!j(u)&&f&&vn(f))return[El(f).query];{let d=[];return f&&(d=d.concat(K_(f).map(_=>_.query))),Ue(h,(_,v)=>{d=d.concat(v)}),d}});for(let u=0;u<a.length;++u){const f=a[u];t.listenProvider_.stopListening(bs(f),Qo(t,f))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dd{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new dd(n)}node(){return this.node_}}class hd{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=ae(this.path_,e);return new hd(this.syncTree_,n)}node(){return ld(this.syncTree_,this.path_)}}const qC=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Bf=function(t,e,n){if(!t||typeof t!="object")return t;if(S(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return QC(t[".sv"],e,n);if(typeof t[".sv"]=="object")return YC(t[".sv"],e);S(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},QC=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:S(!1,"Unexpected server value: "+t)}},YC=function(t,e,n){t.hasOwnProperty("increment")||S(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&S(!1,"Unexpected increment value: "+r);const s=e.node();if(S(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const o=s.getValue();return typeof o!="number"?r:o+r},XC=function(t,e,n,r){return fd(e,new hd(n,t),r)},ev=function(t,e,n){return fd(t,new dd(e),n)};function fd(t,e,n){const r=t.getPriority().val(),s=Bf(r,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,l=Bf(o.getValue(),e,n);return l!==o.getValue()||s!==o.getPriority().val()?new he(l,ye(s)):t}else{const o=t;return i=o,s!==o.getPriority().val()&&(i=i.updatePriority(new he(s))),o.forEachChild(ne,(l,a)=>{const u=fd(a,e.getImmediateChild(l),n);u!==a&&(i=i.updateImmediateChild(l,u))}),i}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function md(t,e){let n=e instanceof H?e:new H(e),r=t,s=M(n);for(;s!==null;){const i=jr(r.node.children,s)||{children:{},childCount:0};r=new pd(s,r,i),n=G(n),s=M(n)}return r}function Jr(t){return t.node.value}function tv(t,e){t.node.value=e,Ou(t)}function nv(t){return t.node.childCount>0}function JC(t){return Jr(t)===void 0&&!nv(t)}function kl(t,e){Ue(t.node.children,(n,r)=>{e(new pd(n,t,r))})}function rv(t,e,n,r){n&&e(t),kl(t,s=>{rv(s,e,!0)})}function ZC(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function gi(t){return new H(t.parent===null?t.name:gi(t.parent)+"/"+t.name)}function Ou(t){t.parent!==null&&ek(t.parent,t.name,t)}function ek(t,e,n){const r=JC(n),s=zt(t.node.children,e);r&&s?(delete t.node.children[e],t.node.childCount--,Ou(t)):!r&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Ou(t))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tk=/[\[\].#$\/\u0000-\u001F\u007F]/,nk=/[\[\].#$\u0000-\u001F\u007F]/,va=10*1024*1024,sv=function(t){return typeof t=="string"&&t.length!==0&&!tk.test(t)},iv=function(t){return typeof t=="string"&&t.length!==0&&!nk.test(t)},rk=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),iv(t)},sk=function(t,e,n,r){gd(Oc(t,"value"),e,n)},gd=function(t,e,n){const r=n instanceof H?new xS(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+bn(r));if(typeof e=="function")throw new Error(t+"contains a function "+bn(r)+" with contents = "+e.toString());if(i_(e))throw new Error(t+"contains "+e.toString()+" "+bn(r));if(typeof e=="string"&&e.length>va/3&&ml(e)>va)throw new Error(t+"contains a string greater than "+va+" utf8 bytes "+bn(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,i=!1;if(Ue(e,(o,l)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!sv(o)))throw new Error(t+" contains an invalid key ("+o+") "+bn(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);ES(r,o),gd(t,l,r),SS(r)}),s&&i)throw new Error(t+' contains ".value" child '+bn(r)+" in addition to actual children.")}},ov=function(t,e,n,r){if(!iv(n))throw new Error(Oc(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},ik=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),ov(t,e,n)},ok=function(t,e){if(M(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},lk=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!sv(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!rk(n))throw new Error(Oc(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ak{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function _d(t,e){let n=null;for(let r=0;r<e.length;r++){const s=e[r],i=s.getPath();n!==null&&!Qc(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(s)}n&&t.eventLists_.push(n)}function lv(t,e,n){_d(t,n),av(t,r=>Qc(r,e))}function Bt(t,e,n){_d(t,n),av(t,r=>ot(r,e)||ot(e,r))}function av(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const s=t.eventLists_[r];if(s){const i=s.path;e(i)?(uk(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function uk(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();ks&&ke("event: "+n.toString()),Xr(r)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ck="repo_interrupt",dk=25;class hk{constructor(e,n,r,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new ak,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Wo(),this.transactionQueueTree_=new pd,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function fk(t,e,n){if(t.stats_=Kc(t.repoInfo_),t.forceRestClient_||GE())t.server_=new zo(t.repoInfo_,(r,s,i,o)=>{Uf(t,r,s,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>zf(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{me(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new Pt(t.repoInfo_,e,(r,s,i,o)=>{Uf(t,r,s,i,o)},r=>{zf(t,r)},r=>{mk(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=XE(t.repoInfo_,()=>new QS(t.stats_,t.server_)),t.infoData_=new $S,t.infoSyncTree_=new jf({startListening:(r,s,i,o)=>{let l=[];const a=t.infoData_.getNode(r._path);return a.isEmpty()||(l=Sl(t.infoSyncTree_,r._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),yd(t,"connected",!1),t.serverSyncTree_=new jf({startListening:(r,s,i,o)=>(t.server_.listen(r,i,s,(l,a)=>{const u=o(l,a);Bt(t.eventQueue_,r._path,u)}),[]),stopListening:(r,s)=>{t.server_.unlisten(r,s)}})}function pk(t){const n=t.infoData_.getNode(new H(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function vd(t){return qC({timestamp:pk(t)})}function Uf(t,e,n,r,s){t.dataUpdateCount++;const i=new H(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(r){const a=Po(n,u=>ye(u));o=VC(t.serverSyncTree_,i,a,s)}else{const a=ye(n);o=WC(t.serverSyncTree_,i,a,s)}else if(r){const a=Po(n,u=>ye(u));o=BC(t.serverSyncTree_,i,a)}else{const a=ye(n);o=Sl(t.serverSyncTree_,i,a)}let l=i;o.length>0&&(l=Nl(t,i)),Bt(t.eventQueue_,l,o)}function zf(t,e){yd(t,"connected",e),e===!1&&_k(t)}function mk(t,e){Ue(e,(n,r)=>{yd(t,n,r)})}function yd(t,e,n){const r=new H("/.info/"+e),s=ye(n);t.infoData_.updateSnapshot(r,s);const i=Sl(t.infoSyncTree_,r,s);Bt(t.eventQueue_,r,i)}function uv(t){return t.nextWriteId_++}function gk(t,e,n,r,s){wd(t,"set",{path:e.toString(),value:n,priority:r});const i=vd(t),o=ye(n,r),l=ld(t.serverSyncTree_,e),a=ev(o,l,i),u=uv(t),f=Y_(t.serverSyncTree_,e,a,u,!0);_d(t.eventQueue_,f),t.server_.put(e.toString(),o.val(!0),(d,_)=>{const v=d==="ok";v||Be("set at "+e+" failed: "+d);const y=Dn(t.serverSyncTree_,u,!v);Bt(t.eventQueue_,e,y),wk(t,s,d,_)});const h=pv(t,e);Nl(t,h),Bt(t.eventQueue_,h,[])}function _k(t){wd(t,"onDisconnectEvents");const e=vd(t),n=Wo();Nu(t.onDisconnect_,z(),(s,i)=>{const o=XC(s,i,t.serverSyncTree_,e);L_(n,s,o)});let r=[];Nu(n,z(),(s,i)=>{r=r.concat(Sl(t.serverSyncTree_,s,i));const o=pv(t,s);Nl(t,o)}),t.onDisconnect_=Wo(),Bt(t.eventQueue_,z(),r)}function vk(t,e,n){let r;M(e._path)===".info"?r=Ff(t.infoSyncTree_,e,n):r=Ff(t.serverSyncTree_,e,n),lv(t.eventQueue_,e._path,r)}function Wf(t,e,n){let r;M(e._path)===".info"?r=Au(t.infoSyncTree_,e,n):r=Au(t.serverSyncTree_,e,n),lv(t.eventQueue_,e._path,r)}function yk(t){t.persistentConnection_&&t.persistentConnection_.interrupt(ck)}function wd(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ke(n,...e)}function wk(t,e,n,r){e&&Xr(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let i=s;r&&(i+=": "+r);const o=new Error(i);o.code=s,e(o)}})}function cv(t,e,n){return ld(t.serverSyncTree_,e,n)||P.EMPTY_NODE}function xd(t,e=t.transactionQueueTree_){if(e||Il(t,e),Jr(e)){const n=hv(t,e);S(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&xk(t,gi(e),n)}else nv(e)&&kl(e,n=>{xd(t,n)})}function xk(t,e,n){const r=n.map(u=>u.currentWriteId),s=cv(t,e,r);let i=s;const o=s.hash();for(let u=0;u<n.length;u++){const f=n[u];S(f.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),f.status=1,f.retryCount++;const h=De(e,f.path);i=i.updateChild(h,f.currentOutputSnapshotRaw)}const l=i.val(!0),a=e;t.server_.put(a.toString(),l,u=>{wd(t,"transaction put response",{path:a.toString(),status:u});let f=[];if(u==="ok"){const h=[];for(let d=0;d<n.length;d++)n[d].status=2,f=f.concat(Dn(t.serverSyncTree_,n[d].currentWriteId)),n[d].onComplete&&h.push(()=>n[d].onComplete(null,!0,n[d].currentOutputSnapshotResolved)),n[d].unwatcher();Il(t,md(t.transactionQueueTree_,e)),xd(t,t.transactionQueueTree_),Bt(t.eventQueue_,e,f);for(let d=0;d<h.length;d++)Xr(h[d])}else{if(u==="datastale")for(let h=0;h<n.length;h++)n[h].status===3?n[h].status=4:n[h].status=0;else{Be("transaction at "+a.toString()+" failed: "+u);for(let h=0;h<n.length;h++)n[h].status=4,n[h].abortReason=u}Nl(t,e)}},o)}function Nl(t,e){const n=dv(t,e),r=gi(n),s=hv(t,n);return Ek(t,s,r),r}function Ek(t,e,n){if(e.length===0)return;const r=[];let s=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],u=De(n,a.path);let f=!1,h;if(S(u!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)f=!0,h=a.abortReason,s=s.concat(Dn(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=dk)f=!0,h="maxretry",s=s.concat(Dn(t.serverSyncTree_,a.currentWriteId,!0));else{const d=cv(t,a.path,o);a.currentInputSnapshot=d;const _=e[l].update(d.val());if(_!==void 0){gd("transaction failed: Data returned ",_,a.path);let v=ye(_);typeof _=="object"&&_!=null&&zt(_,".priority")||(v=v.updatePriority(d.getPriority()));const C=a.currentWriteId,m=vd(t),p=ev(v,d,m);a.currentOutputSnapshotRaw=v,a.currentOutputSnapshotResolved=p,a.currentWriteId=uv(t),o.splice(o.indexOf(C),1),s=s.concat(Y_(t.serverSyncTree_,a.path,p,a.currentWriteId,a.applyLocally)),s=s.concat(Dn(t.serverSyncTree_,C,!0))}else f=!0,h="nodata",s=s.concat(Dn(t.serverSyncTree_,a.currentWriteId,!0))}Bt(t.eventQueue_,n,s),s=[],f&&(e[l].status=2,function(d){setTimeout(d,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(h==="nodata"?r.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):r.push(()=>e[l].onComplete(new Error(h),!1,null))))}Il(t,t.transactionQueueTree_);for(let l=0;l<r.length;l++)Xr(r[l]);xd(t,t.transactionQueueTree_)}function dv(t,e){let n,r=t.transactionQueueTree_;for(n=M(e);n!==null&&Jr(r)===void 0;)r=md(r,n),e=G(e),n=M(e);return r}function hv(t,e){const n=[];return fv(t,e,n),n.sort((r,s)=>r.order-s.order),n}function fv(t,e,n){const r=Jr(e);if(r)for(let s=0;s<r.length;s++)n.push(r[s]);kl(e,s=>{fv(t,s,n)})}function Il(t,e){const n=Jr(e);if(n){let r=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[r]=n[s],r++);n.length=r,tv(e,n.length>0?n:void 0)}kl(e,r=>{Il(t,r)})}function pv(t,e){const n=gi(dv(t,e)),r=md(t.transactionQueueTree_,e);return ZC(r,s=>{ya(t,s)}),ya(t,r),rv(r,s=>{ya(t,s)}),n}function ya(t,e){const n=Jr(e);if(n){const r=[];let s=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(S(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(S(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Dn(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?tv(e,void 0):n.length=i+1,Bt(t.eventQueue_,gi(e),s);for(let o=0;o<r.length;o++)Xr(r[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sk(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let s=n[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Ck(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Be(`Invalid query segment '${n}' in query '${t}'`)}return e}const Vf=function(t,e){const n=kk(t),r=n.namespace;n.domain==="firebase.com"&&Ft(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Ft("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||jE();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new __(n.host,n.secure,r,s,e,"",r!==n.subdomain),path:new H(n.pathString)}},kk=function(t){let e="",n="",r="",s="",i="",o=!0,l="https",a=443;if(typeof t=="string"){let u=t.indexOf("//");u>=0&&(l=t.substring(0,u-1),t=t.substring(u+2));let f=t.indexOf("/");f===-1&&(f=t.length);let h=t.indexOf("?");h===-1&&(h=t.length),e=t.substring(0,Math.min(f,h)),f<h&&(s=Sk(t.substring(f,h)));const d=Ck(t.substring(Math.min(t.length,h)));u=e.indexOf(":"),u>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(u+1),10)):u=e.length;const _=e.slice(0,u);if(_.toLowerCase()==="localhost")n="localhost";else if(_.split(".").length<=2)n=_;else{const v=e.indexOf(".");r=e.substring(0,v).toLowerCase(),n=e.substring(v+1),i=r}"ns"in d&&(i=d.ns)}return{host:e,port:a,domain:n,subdomain:r,secure:o,scheme:l,pathString:s,namespace:i}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nk{constructor(e,n,r,s){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+me(this.snapshot.exportVal())}}class Ik{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tk{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return S(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ed{constructor(e,n,r,s){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=s}get key(){return j(this._path)?null:N_(this._path)}get ref(){return new Sn(this._repo,this._path)}get _queryIdentifier(){const e=Nf(this._queryParams),n=Hc(e);return n==="{}"?"default":n}get _queryObject(){return Nf(this._queryParams)}isEqual(e){if(e=Ze(e),!(e instanceof Ed))return!1;const n=this._repo===e._repo,r=Qc(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+wS(this._path)}}class Sn extends Ed{constructor(e,n){super(e,n,new Zc,!1)}get parent(){const e=T_(this._path);return e===null?null:new Sn(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Yo{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new H(e),r=Du(this.ref,e);return new Yo(this._node.getChild(n),r,ne)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,s)=>e(new Yo(s,Du(this.ref,r),ne)))}hasChild(e){const n=new H(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function $f(t,e){return t=Ze(t),t._checkNotDeleted("ref"),Du(t._root,e)}function Du(t,e){return t=Ze(t),M(t._path)===null?ik("child","path",e):ov("child","path",e),new Sn(t._repo,ae(t._path,e))}function Hf(t,e){t=Ze(t),ok("set",t._path),sk("set",e,t._path);const n=new pl;return gk(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}class Sd{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new Nk("value",this,new Yo(e.snapshotNode,new Sn(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Ik(this,e,n):null}matches(e){return e instanceof Sd?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function bk(t,e,n,r,s){let i;if(typeof r=="object"&&(i=void 0,s=r),typeof r=="function"&&(i=r),s&&s.onlyOnce){const a=n,u=(f,h)=>{Wf(t._repo,t,l),a(f,h)};u.userCallback=n.userCallback,u.context=n.context,n=u}const o=new Tk(n,i||void 0),l=new Sd(o);return vk(t._repo,t,l),()=>Wf(t._repo,t,l)}function Pk(t,e,n,r){return bk(t,"value",e,n,r)}PC(Sn);LC(Sn);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Rk="FIREBASE_DATABASE_EMULATOR_HOST",Mu={};let Ak=!1;function Ok(t,e,n,r){t.repoInfo_=new __(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function Dk(t,e,n,r,s){let i=r||t.options.databaseURL;i===void 0&&(t.options.projectId||Ft("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ke("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=Vf(i,s),l=o.repoInfo,a;typeof process<"u"&&af&&(a=af[Rk]),a?(i=`http://${a}?ns=${l.namespace}`,o=Vf(i,s),l=o.repoInfo):o.repoInfo.secure;const u=new qE(t.name,t.options,e);lk("Invalid Firebase Database URL",o),j(o.path)||Ft("Database URL must point to the root of a Firebase Database (not including a child path).");const f=Lk(l,t,u,new KE(t.name,n));return new jk(f,t)}function Mk(t,e){const n=Mu[e];(!n||n[t.key]!==t)&&Ft(`Database ${e}(${t.repoInfo_}) has already been deleted.`),yk(t),delete n[t.key]}function Lk(t,e,n,r){let s=Mu[e.name];s||(s={},Mu[e.name]=s);let i=s[t.toURLString()];return i&&Ft("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new hk(t,Ak,n,r),s[t.toURLString()]=i,i}class jk{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(fk(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Sn(this._repo,z())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Mk(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Ft("Cannot call "+e+" on a deleted database.")}}function Fk(t=wg(),e){const n=Lc(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=lw("database");r&&Bk(n,...r)}return n}function Bk(t,e,n,r={}){t=Ze(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Ft("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let i;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&Ft('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),i=new to(to.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:aw(r.mockUserToken,t.app.options.projectId);i=new to(o)}Ok(s,e,n,i)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uk(t){RE(qr),Fr(new Wn("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return Dk(r,s,i,n)},"PUBLIC").setMultipleInstances(!0)),dn(uf,cf,t),dn(uf,cf,"esm2017")}Pt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Pt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Uk();/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var zk={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Wk=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),_e=(t,e)=>{const n=U.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:a,...u},f)=>U.createElement("svg",{ref:f,...zk,width:s,height:s,stroke:r,strokeWidth:o?Number(i)*24/Number(s):i,className:["lucide",`lucide-${Wk(t)}`,l].join(" "),...u},[...e.map(([h,d])=>U.createElement(h,d)),...Array.isArray(a)?a:[a]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mv=_e("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const gv=_e("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ni=_e("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Vk=_e("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Tl=_e("CircleDashed",[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0",key:"5ilxe3"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0",key:"11zvb9"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7",key:"1iw5b2"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8",key:"c0bmvh"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69",key:"1ruxm7"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8",key:"qkgqxc"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69",key:"1mcia2"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7",key:"1fvljs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _v=_e("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Xo=_e("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $k=_e("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const vv=_e("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const yv=_e("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Hk=_e("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Gk=_e("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const wv=_e("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bl=_e("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Kk=_e("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const mr=_e("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const qk=_e("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xv=_e("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);var Qk="firebase",Yk="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */dn(Qk,Yk,"app");const Xk={apiKey:"AIzaSyD4E1mAaY4HkId_h41YQz_kijN4R_h3In8",authDomain:"pestour-965ff.firebaseapp.com",databaseURL:"https://pestour-965ff-default-rtdb.firebaseio.com",projectId:"pestour-965ff",storageBucket:"pestour-965ff.firebasestorage.app",messagingSenderId:"518176676119",appId:"1:518176676119:web:a21a447983ba8deb297f52"},Ev=yg(Xk),Sv=bE(Ev),Gf=Fk(Ev),Jk=async()=>{try{return await hx(Sv),!0}catch(t){return console.error("Firebase Auth Error: Please enable Anonymous Sign-in in Firebase Console!",t),!1}},Zk={name:"Pallet Pes Tour",season:"Spring 2026",tagline:"Legends Start Here"},eN=[{id:"A1",name:"1AUTO1",group:"A"},{id:"A2",name:"Dra-Gon",group:"A"},{id:"A3",name:"Glanelalala",group:"A"},{id:"A4",name:"WinMeLbey",group:"A"},{id:"B1",name:"K-Vinn",group:"B"},{id:"B2",name:"Max-88",group:"B"},{id:"B3",name:"Reach OMG",group:"B"},{id:"B4",name:"so respec1",group:"B"},{id:"C1",name:"Petter-027",group:"C"},{id:"C2",name:"Player C2",group:"C"},{id:"C3",name:"Player C3",group:"C"},{id:"C4",name:"Player C4",group:"C"}],wa=t=>[{id:`M-${t}1`,groupId:t,p1Id:`${t}1`,p2Id:`${t}2`,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:`M-${t}2`,groupId:t,p1Id:`${t}3`,p2Id:`${t}4`,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:`M-${t}3`,groupId:t,p1Id:`${t}1`,p2Id:`${t}3`,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:`M-${t}4`,groupId:t,p1Id:`${t}2`,p2Id:`${t}4`,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:`M-${t}5`,groupId:t,p1Id:`${t}1`,p2Id:`${t}4`,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:`M-${t}6`,groupId:t,p1Id:`${t}2`,p2Id:`${t}3`,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}}],tN=[...wa("A"),...wa("B"),...wa("C")],no={settings:Zk,players:eN,matches:tN,bracket:[]},Pl=t=>{let e=0,n=0,r=0,s=0;["g1","g2","g3"].forEach(u=>{const f=t[u]||{};f.p1!==void 0&&f.p1!==null&&f.p2!==void 0&&f.p2!==null&&(r+=Number(f.p1),s+=Number(f.p2),Number(f.p1)>Number(f.p2)&&e++,Number(f.p2)>Number(f.p1)&&n++)});const o=e===2||n===2;let l=0,a=0;return o&&(e===2&&n===0&&(l=3,a=0),e===2&&n===1&&(l=2,a=1),n===2&&e===0&&(a=3,l=0),n===2&&e===1&&(a=2,l=1)),{p1Wins:e,p2Wins:n,p1Goals:r,p2Goals:s,isFinished:o,p1Pts:l,p2Pts:a}},nN=(t,e)=>{let n={};t.forEach(l=>{n[l.id]={...l,played:0,w:0,l:0,gf:0,ga:0,gd:0,pts:0}}),e.forEach(l=>{if(l.played){const a=Pl(l);a.isFinished&&(n[l.p1Id].played++,n[l.p2Id].played++,a.p1Wins>a.p2Wins?(n[l.p1Id].w++,n[l.p2Id].l++):(n[l.p2Id].w++,n[l.p1Id].l++),n[l.p1Id].gf+=a.p1Goals,n[l.p1Id].ga+=a.p2Goals,n[l.p1Id].gd=n[l.p1Id].gf-n[l.p1Id].ga,n[l.p1Id].pts+=a.p1Pts,n[l.p2Id].gf+=a.p2Goals,n[l.p2Id].ga+=a.p1Goals,n[l.p2Id].gd=n[l.p2Id].gf-n[l.p2Id].ga,n[l.p2Id].pts+=a.p2Pts)}});const r=(l,a)=>a.pts!==l.pts?a.pts-l.pts:a.gd!==l.gd?a.gd-l.gd:a.gf!==l.gf?a.gf-l.gf:l.name.localeCompare(a.name),s={A:[],B:[],C:[]};Object.values(n).forEach(l=>s[l.group].push(l)),s.A.sort(r),s.B.sort(r),s.C.sort(r);const i=[s.A[2],s.B[2],s.C[2]].filter(Boolean).sort(r);let o=[];return["A","B","C"].forEach(l=>{s[l][0]&&o.push({...s[l][0],seedType:`${l}1`}),s[l][1]&&o.push({...s[l][1],seedType:`${l}2`})}),i[0]&&o.push({...i[0],seedType:"Best3"}),i[1]&&o.push({...i[1],seedType:"Best3"}),o.sort(r),{groups:s,thirds:i,qualified:o}},er=t=>{if(!t||!t.played)return null;const e=Pl(t);return e.p1Wins>e.p2Wins?{id:t.p1Id,name:t.p1Name}:e.p2Wins>e.p1Wins?{id:t.p2Id,name:t.p2Name}:null},xt=t=>{if(!t||t.length===0)return[];let e=[...t];e.length===4&&(e.push({id:"SF-1",round:"SF",p1Id:null,p1Name:"TBD (QF1)",p2Id:null,p2Name:"TBD (QF2)",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}}),e.push({id:"SF-2",round:"SF",p1Id:null,p1Name:"TBD (QF3)",p2Id:null,p2Name:"TBD (QF4)",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}}),e.push({id:"F-1",round:"F",p1Id:null,p1Name:"TBD (SF1)",p2Id:null,p2Name:"TBD (SF2)",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}}));const n=f=>e.find(h=>h.id===f),r=(f,h)=>{const d=e.findIndex(_=>_.id===f);d!==-1&&(e[d]={...e[d],...h})},s=er(n("QF-1")),i=er(n("QF-2")),o=er(n("QF-3")),l=er(n("QF-4"));r("SF-1",{p1Id:s?s.id:null,p1Name:s?s.name:"TBD (QF1)",p2Id:i?i.id:null,p2Name:i?i.name:"TBD (QF2)"}),r("SF-2",{p1Id:o?o.id:null,p1Name:o?o.name:"TBD (QF3)",p2Id:l?l.id:null,p2Name:l?l.name:"TBD (QF4)"});const a=er(n("SF-1")),u=er(n("SF-2"));return r("F-1",{p1Id:a?a.id:null,p1Name:a?a.name:"TBD (SF1)",p2Id:u?u.id:null,p2Name:u?u.name:"TBD (SF2)"}),e},Cd="/PESTOUR/assets/pallet-D_LKp9NR.jpg",rN=Object.freeze(Object.defineProperty({__proto__:null,default:Cd},Symbol.toStringTag,{value:"Module"}));function sN({currentPage:t,setCurrentPage:e,isAdmin:n}){const r=[{id:"home",icon:$k,label:"Home"},{id:"standings",icon:mv,label:"Standings"},{id:"matches",icon:Xo,label:"Matches"},{id:"rules",icon:gv,label:"Rules"}];return n&&r.push({id:"knockout",icon:mr,label:"Knockout"}),r.push({id:"admin",icon:wv,label:"Admin"}),c.jsx("nav",{className:"sticky top-0 z-50 bg-[#0a0b10]/95 backdrop-blur-md border-b border-slate-800",children:c.jsxs("div",{className:"max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between",children:[c.jsxs("div",{className:"flex items-center gap-3 cursor-pointer",onClick:()=>e("home"),children:[c.jsx("div",{className:"w-10 h-10 rounded-full overflow-hidden shadow-[0_0_15px_rgba(71,112,255,0.4)] flex-shrink-0 border border-[#222B3D]",children:c.jsx("img",{src:Cd,alt:"Pallet Logo",className:"w-full h-full object-cover"})}),c.jsx("span",{className:"font-black text-2xl tracking-tighter text-[#A1B1DA] hidden sm:block font-sans",style:{textShadow:"0 0 10px rgba(161,177,218,0.3)"},children:"PES TOUR"})]}),c.jsx("div",{className:"flex space-x-1 overflow-x-auto no-scrollbar ml-auto mr-8",children:r.map(s=>{const i=t===s.id;return c.jsxs("button",{onClick:()=>e(s.id),className:`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-bold tracking-wide ${i?"bg-[#18233C] text-[#6384FF] shadow-[inset_0_1px_rgba(100,130,255,0.2)]":"text-[#8B9BB4] hover:text-[#C5D3EB] hover:bg-[#151D2E]"}`,children:[c.jsx(s.icon,{className:"w-4 h-4"}),c.jsx("span",{className:"hidden md:inline",children:s.label})]},s.id)})}),c.jsxs("div",{className:"flex items-center gap-4",children:[n&&c.jsxs("span",{className:"flex items-center gap-1 text-[#C084FC] bg-[#C084FC]/10 px-2.5 py-1 rounded-md border border-[#C084FC]/20 text-xs font-bold",children:[c.jsx(bl,{className:"w-3.5 h-3.5"})," ",c.jsx("span",{className:"hidden sm:inline",children:"Admin"})]}),c.jsx("button",{className:"text-[#8B9BB4] hover:text-white transition-colors",children:c.jsx(Kk,{className:"w-5 h-5"})})]})]})})}function iN({data:t,setCurrentPage:e}){const n=t.matches.filter(i=>i.played).length,r=t.matches.length,s=r===0?0:Math.round(n/r*100);return c.jsxs("div",{className:"space-y-8 animate-in fade-in duration-500 min-h-[80vh] flex flex-col justify-center",children:[c.jsxs("div",{className:"relative overflow-hidden rounded-3xl bg-[#0f141e] border border-[#222B3D] p-8 sm:p-14 text-center shadow-[0_0_50px_rgba(20,30,50,0.7)] group",children:[c.jsx("div",{className:"absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] transition-opacity group-hover:opacity-[0.05] pointer-events-none"}),c.jsx("div",{className:"absolute top-0 right-0 w-96 h-96 bg-[#4770FF] opacity-[0.03] blur-[120px] pointer-events-none rounded-full"}),c.jsx("div",{className:"absolute bottom-0 left-0 w-96 h-96 bg-[#C084FC] opacity-[0.03] blur-[120px] pointer-events-none rounded-full"}),c.jsxs("div",{className:"relative z-10 flex flex-col items-center",children:[c.jsx("div",{className:"inline-block rounded-[30px] overflow-hidden",children:c.jsx("img",{src:Cd,alt:"Pallet Logo",className:"w-full h-full object-cover p-2"})}),c.jsx("h1",{className:"text-5xl sm:text-7xl font-black tracking-tighter mb-4 text-[#E2E8F0] drop-shadow-md",children:t.settings.name}),c.jsxs("p",{className:"text-xl sm:text-2xl text-[#64748B] font-medium mb-10 tracking-wide",children:[t.settings.season," ",c.jsx("span",{className:"mx-2",children:"•"})," ",c.jsx("span",{className:"text-[#10B981] font-bold drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]",children:t.settings.tagline})]}),c.jsx("div",{className:"w-full max-w-lg bg-[#0a0b10] rounded-full p-2 border border-[#1E2738] shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]",children:c.jsx("div",{className:"relative h-4 w-full bg-[#1A2234] rounded-full overflow-hidden",children:c.jsx("div",{className:"absolute top-0 left-0 h-full bg-gradient-to-r from-[#4770FF] via-[#7B52FF] to-[#10B981] transition-all duration-1000 ease-out shadow-[0_0_10px_currentColor]",style:{width:`${s}%`}})})}),c.jsxs("p",{className:"mt-5 text-xs text-[#8B9BB4] font-black tracking-[0.2em] uppercase",children:["GROUP STAGE PROGRESS: ",s,"% / ",n," OF ",r," MATCHES COMPLETED"]})]})]}),c.jsx("div",{className:"flex justify-center pt-8",children:c.jsxs("button",{onClick:()=>e("standings"),className:"group flex flex-col items-center gap-3 text-[#64748B] hover:text-[#C084FC] transition-all duration-300",children:[c.jsx("span",{className:"text-xs font-black tracking-[0.2em] uppercase drop-shadow-md",children:"View Standings & Bracket"}),c.jsx("div",{className:"p-3.5 rounded-full bg-[#0f141e] border border-[#222B3D] group-hover:border-[#C084FC]/40 group-hover:bg-[#C084FC]/10 shadow-lg transition-all animate-bounce mt-2 group-hover:shadow-[0_0_20px_rgba(192,132,252,0.2)]",children:c.jsx(Vk,{className:"w-5 h-5"})})]})})]})}function Tr({game:t,label:e,match:n,p1Name:r,p2Name:s,onChange:i,isAdmin:o}){const l=n[t]||{},a=l.p1!==void 0?l.p1:null,u=l.p2!==void 0?l.p2:null,f=a!==null&&u!==null,h=f&&a>u,d=f&&u>a;return c.jsxs("div",{className:"flex items-center justify-between text-sm bg-[#0a0b10] rounded-xl p-3 border border-[#1E2738] shadow-inner transition-colors hover:border-[#334155]/50",children:[c.jsx("div",{className:`flex-1 text-right pr-4 font-black tracking-wide truncate ${h?"text-[#10B981]":d?"text-[#64748B]":"text-[#E2E8F0]"}`,children:r}),c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(Kf,{val:a,onChange:_=>i(n.id,t,"p1",_),disabled:!o}),c.jsx("span",{className:"text-[#64748B] text-[10px] font-black uppercase tracking-widest bg-[#131722] px-2 py-1 rounded-md border border-[#222B3D]",children:e}),c.jsx(Kf,{val:u,onChange:_=>i(n.id,t,"p2",_),disabled:!o})]}),c.jsx("div",{className:`flex-1 pl-4 font-black tracking-wide truncate ${d?"text-[#10B981]":h?"text-[#64748B]":"text-[#E2E8F0]"}`,children:s})]})}function Kf({val:t,onChange:e,disabled:n}){return n?c.jsx("div",{className:`w-9 h-9 flex items-center justify-center rounded-lg font-black text-lg ${t!==null?"bg-[#1E2738] text-white border border-[#334155] shadow-md":"bg-transparent text-[#475569] border border-dashed border-[#334155]"}`,children:t!==null?t:"-"}):c.jsx("input",{type:"number",min:"0",value:t===null?"":t,onChange:r=>e(r.target.value),className:"w-10 h-10 text-center bg-[#131722] border border-[#334155] text-white font-black text-lg focus:border-[#4770FF] focus:ring-2 focus:ring-[#4770FF]/50 outline-none hide-arrows transition-all rounded-lg shadow-inner"})}const oN="/PESTOUR/assets/1AUTO1-DvK8ZO3a.png",lN=Object.freeze(Object.defineProperty({__proto__:null,default:oN},Symbol.toStringTag,{value:"Module"})),aN="/PESTOUR/assets/Dra-Gon-h35qPsN9.png",uN=Object.freeze(Object.defineProperty({__proto__:null,default:aN},Symbol.toStringTag,{value:"Module"})),cN="/PESTOUR/assets/Glanelalala-BfjOw5VL.png",dN=Object.freeze(Object.defineProperty({__proto__:null,default:cN},Symbol.toStringTag,{value:"Module"})),hN="/PESTOUR/assets/Jak-Kroval-_OKZCweB.png",fN=Object.freeze(Object.defineProperty({__proto__:null,default:hN},Symbol.toStringTag,{value:"Module"})),pN="/PESTOUR/assets/K-Vinn-BuM-8vVe.png",mN=Object.freeze(Object.defineProperty({__proto__:null,default:pN},Symbol.toStringTag,{value:"Module"})),gN="/PESTOUR/assets/Max-88-zK7mCRl6.png",_N=Object.freeze(Object.defineProperty({__proto__:null,default:gN},Symbol.toStringTag,{value:"Module"})),vN="/PESTOUR/assets/MengZzz-DHzt8QA4.png",yN=Object.freeze(Object.defineProperty({__proto__:null,default:vN},Symbol.toStringTag,{value:"Module"})),wN="/PESTOUR/assets/Petter-027-BOdQbbdx.png",xN=Object.freeze(Object.defineProperty({__proto__:null,default:wN},Symbol.toStringTag,{value:"Module"})),EN="/PESTOUR/assets/Reach%20OMG-DkAsUodS.png",SN=Object.freeze(Object.defineProperty({__proto__:null,default:EN},Symbol.toStringTag,{value:"Module"})),CN="/PESTOUR/assets/SO-R3spec1-t6QiRiOJ.png",kN=Object.freeze(Object.defineProperty({__proto__:null,default:CN},Symbol.toStringTag,{value:"Module"})),NN="/PESTOUR/assets/Si%20Dav-BpBGgVm6.png",IN=Object.freeze(Object.defineProperty({__proto__:null,default:NN},Symbol.toStringTag,{value:"Module"})),TN="/PESTOUR/assets/Win%20Me%20Lbey-PZ2I4VLO.png",bN=Object.freeze(Object.defineProperty({__proto__:null,default:TN},Symbol.toStringTag,{value:"Module"})),qf=Object.assign({"../assets/1AUTO1.png":lN,"../assets/Dra-Gon.png":uN,"../assets/Glanelalala.png":dN,"../assets/Jak-Kroval.png":fN,"../assets/K-Vinn.png":mN,"../assets/Max-88.png":_N,"../assets/MengZzz.png":yN,"../assets/Petter-027.png":xN,"../assets/Reach OMG.png":SN,"../assets/SO-R3spec1.png":kN,"../assets/Si Dav.png":IN,"../assets/Win Me Lbey.png":bN,"../assets/pallet.jpg":rN}),PN=t=>{if(!t)return null;const e=s=>s.toLowerCase().replace(/[^a-z0-9]/g,"");let n=e(t);const r={sor3spac1:"sor3spec1"};r[n]&&(n=r[n]);for(const s in qf){const i=s.split("/").pop().replace(/\.[^/.]+$/,"");if(i==="pallet")continue;const o=e(i);if(o===n||o.includes(n)||n.includes(o))return qf[s].default}return null},Qf=["bg-[#ef4444]","bg-[#3b82f6]","bg-[#10b981]","bg-[#f59e0b]","bg-[#8b5cf6]","bg-[#ec4899]","bg-[#14b8a6]","bg-[#f97316]"],RN=t=>{if(!t||t.startsWith("TBD"))return"bg-[#334155]";let e=0;for(let n=0;n<t.length;n++)e=t.charCodeAt(n)+((e<<5)-e);return Qf[Math.abs(e)%Qf.length]};function Wr({name:t,className:e="w-8 h-8 text-xs"}){const n=PN(t);if(n)return c.jsx("div",{className:`rounded-full overflow-hidden flex-shrink-0 shadow-md border border-[#334155]/50 bg-[#0a0b10] flex items-center justify-center ${e}`,children:c.jsx("img",{src:n,alt:t||"Player avatar",className:"w-full h-full object-cover"})});const r=t&&!t.startsWith("TBD")?t.substring(0,2).toUpperCase():"?",s=RN(t);return c.jsx("div",{className:`rounded-full ${s} flex-shrink-0 flex items-center justify-center font-black text-white shadow-md border border-[#ffffff10] ${e}`,children:r})}function br({match:t,title:e,isAdmin:n,togglePlayed:r,handleScoreChange:s}){const i=Pl(t),o=t.g1||{},l=t.g2||{},a=t.g3||{},u=o.p1!==void 0&&o.p1!==null&&o.p2!==void 0&&o.p2!==null,f=l.p1!==void 0&&l.p1!==null&&l.p2!==void 0&&l.p2!==null;let h=!1;if(u&&f){let y=(o.p1>o.p2?1:0)+(l.p1>l.p2?1:0),C=(o.p2>o.p1?1:0)+(l.p2>l.p1?1:0);y===1&&C===1&&(h=!0)}const d=t.p1Id===null||t.p2Id===null;let _="from-[#C084FC] to-[#8B5CF6]",v="text-[#C084FC]";return t.id.startsWith("SF")?(_="from-[#F97316] to-[#F59E0B]",v="text-[#F97316]"):t.id.startsWith("F")&&(_="from-[#FACC15] to-[#F59E0B]",v="text-[#FACC15]"),c.jsxs("div",{className:`relative bg-[#131722] border ${d?"border-[#1E2738] opacity-70":"border-[#222B3D] hover:border-[#334155]"} rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group`,children:[c.jsx("div",{className:`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${_} shadow-[0_0_10px_currentColor]`}),c.jsxs("div",{className:"p-5 pl-7",children:[c.jsxs("div",{className:"flex justify-between items-center mb-5 pb-3 border-b border-[#1E2738]",children:[c.jsx("span",{className:`text-[10px] font-black uppercase tracking-[0.2em] ${v}`,children:e}),c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsxs("div",{className:"text-xl font-black tracking-widest text-white drop-shadow-md",children:[i.p1Wins," ",c.jsx("span",{className:"text-[#64748B] mx-1",children:"-"})," ",i.p2Wins]}),n&&!d&&r&&c.jsx("button",{onClick:()=>r(t.id),className:`p-1.5 rounded-lg border transition-all ${t.played?"bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.2)]":"bg-[#1E2738] border-[#334155] text-[#94A3B8] hover:bg-[#334155] hover:text-white"}`,children:t.played?c.jsx(ni,{className:"w-4 h-4"}):c.jsx(Tl,{className:"w-4 h-4"})}),!n&&t.played&&!d&&c.jsxs("span",{className:"text-[9px] text-[#10B981] font-black tracking-widest uppercase border border-[#10B981]/30 bg-[#10B981]/10 px-2.5 py-1.5 rounded flex items-center gap-1 shadow-[0_0_12px_rgba(16,185,129,0.15)]",children:[c.jsx(ni,{className:"w-3 h-3"})," Done"]})]})]}),c.jsxs("div",{className:"space-y-3",children:[c.jsxs("div",{className:"flex justify-between items-center px-1 mb-3",children:[c.jsxs("div",{className:"flex items-center gap-2 w-2/5",children:[c.jsx(Wr,{name:t.p1Name,className:"w-7 h-7 text-[10px] rounded-md"}),c.jsx("span",{className:"font-bold text-sm text-[#E2E8F0] truncate",title:t.p1Name,children:t.p1Name||"TBD"})]}),c.jsx("span",{className:"text-[10px] font-black tracking-widest text-[#64748B] uppercase",children:"VS"}),c.jsxs("div",{className:"flex items-center justify-end gap-2 w-2/5",children:[c.jsx("span",{className:"font-bold text-sm text-[#E2E8F0] truncate text-right",title:t.p2Name,children:t.p2Name||"TBD"}),c.jsx(Wr,{name:t.p2Name,className:"w-7 h-7 text-[10px] rounded-md"})]})]}),c.jsx(Tr,{game:"g1",label:"G1",match:t,p1Name:"",p2Name:"",onChange:s,isAdmin:n&&!d}),c.jsx(Tr,{game:"g2",label:"G2",match:t,p1Name:"",p2Name:"",onChange:s,isAdmin:n&&!d}),(h||a.p1!==void 0&&a.p1!==null||n&&!d)&&c.jsx("div",{className:`transition-all duration-500 overflow-hidden ${h||a.p1!==void 0&&a.p1!==null||n&&!d?"opacity-100 max-h-32 mt-3 pt-3 border-t border-dashed border-[#1E2738]":"opacity-0 max-h-0"}`,children:c.jsx(Tr,{game:"g3",label:"G3",match:t,p1Name:"",p2Name:"",onChange:s,isAdmin:n&&!d})})]})]})]})}function AN({standingsData:t,bracketData:e}){const n=(r,s,i=!1,o="bg-blue-500")=>c.jsxs("div",{className:"bg-[#131722] border border-[#222B3D] rounded-xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-500",children:[c.jsxs("div",{className:"p-4 border-b border-[#1E2738] flex items-center",children:[c.jsx("div",{className:`w-3 h-3 rounded-full ${o} mr-3 shadow-[0_0_8px_currentColor]`}),c.jsx("h3",{className:"font-black text-lg tracking-wider text-[#E2E8F0] uppercase",children:s})]}),c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-sm text-left border-collapse",children:[c.jsx("thead",{className:"text-xs text-[#8B9BB4] uppercase bg-[#181D2B] border-b border-[#222B3D]",children:c.jsxs("tr",{children:[c.jsx("th",{className:"px-4 py-3 font-semibold w-12 text-center border-l-4 border-transparent",children:"#"}),c.jsx("th",{className:"px-4 py-3 font-semibold",children:"PLAYER"}),c.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"MP"}),c.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"W-L"}),c.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"GF"}),c.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"GA"}),c.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"GD"}),c.jsx("th",{className:"px-4 py-3 font-black text-white text-center",children:"PTS"})]})}),c.jsx("tbody",{className:"bg-[#0a0b10]/50 divide-y divide-[#1E2738]",children:r.map((l,a)=>{let u="border-l-4 border-l-transparent";return i?a<2?u="border-l-4 border-l-[#10B981]":u="border-l-4 border-l-[#EF4444]":a<2?u="border-l-4 border-l-[#10B981]":a===2&&(u="border-l-4 border-l-[#F59E0B]"),c.jsxs("tr",{className:"hover:bg-[#1A2234] transition-colors group",children:[c.jsx("td",{className:`px-4 py-4 font-bold text-[#8B9BB4] text-center ${u}`,children:a+1}),c.jsx("td",{className:"px-4 py-4 min-w-[200px]",children:c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(Wr,{name:l.name,className:"w-8 h-8 text-xs"}),c.jsxs("div",{className:"flex flex-col",children:[c.jsx("span",{className:"font-bold text-[#E2E8F0] text-[15px]",children:l.name}),i&&c.jsxs("span",{className:"text-[10px] text-[#64748B] font-bold tracking-widest uppercase mt-0.5",children:["GROUP ",l.group]})]})]})}),c.jsx("td",{className:"px-3 py-4 text-center text-[#94A3B8] font-medium",children:l.played}),c.jsxs("td",{className:"px-3 py-4 text-center text-[#94A3B8] font-medium whitespace-nowrap",children:[l.w,"-",l.l]}),c.jsx("td",{className:"px-3 py-4 text-center text-[#94A3B8] font-mono",children:l.gf}),c.jsx("td",{className:"px-3 py-4 text-center text-[#94A3B8] font-mono",children:l.ga}),c.jsx("td",{className:`px-3 py-4 text-center font-mono font-medium ${l.gd>0?"text-[#10B981]":l.gd<0?"text-[#EF4444]":"text-[#94A3B8]"}`,children:l.gd>0?`+${l.gd}`:l.gd}),c.jsx("td",{className:"px-4 py-4 text-center font-black text-[#6384FF] text-lg",children:l.pts})]},l.id)})})]})})]});return c.jsxs("div",{className:"space-y-12",children:[c.jsxs("div",{className:"grid lg:grid-cols-2 gap-8",children:[n(t.groups.A,"GROUP A",!1,"bg-[#3B82F6]"),n(t.groups.B,"GROUP B",!1,"bg-[#F59E0B]"),n(t.groups.C,"GROUP C",!1,"bg-[#10B981]"),n(t.thirds,"BEST THIRD-PLACE",!0,"bg-[#A855F7]")]}),c.jsxs("div",{className:"mt-16 border-t border-[#1E2738] pt-12",children:[c.jsxs("h2",{className:"text-2xl font-black flex items-center gap-3 mb-6 text-[#E2E8F0] tracking-tight",children:[c.jsx(bl,{className:"text-[#C084FC] w-7 h-7"})," QUALIFIED 8 (SEEDING)"]}),c.jsx("div",{className:"bg-[#131722] border border-[#2B2144] rounded-xl overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.05)]",children:c.jsx("div",{className:"overflow-x-auto",children:c.jsxs("table",{className:"w-full text-sm text-left",children:[c.jsx("thead",{className:"bg-[#1A1829] text-[#C084FC] text-xs uppercase font-bold border-b border-[#2B2144]",children:c.jsxs("tr",{children:[c.jsx("th",{className:"px-6 py-4",children:"Seed"}),c.jsx("th",{className:"px-6 py-4",children:"Player"}),c.jsx("th",{className:"px-6 py-4 text-center",children:"Path"}),c.jsx("th",{className:"px-6 py-4 text-center",children:"PTS"}),c.jsx("th",{className:"px-6 py-4 text-center",children:"GD"}),c.jsx("th",{className:"px-6 py-4 text-center",children:"GF"})]})}),c.jsxs("tbody",{className:"divide-y divide-[#1E2738]",children:[t.qualified.map((r,s)=>c.jsxs("tr",{className:"hover:bg-[#1A2234] transition-colors",children:[c.jsxs("td",{className:"px-6 py-4 font-black text-lg text-[#64748B]",children:["#",s+1]}),c.jsx("td",{className:"px-6 py-4 font-bold text-base text-[#F8FAFC]",children:c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx(Wr,{name:r.name,className:"w-7 h-7 text-[10px]"}),r.name]})}),c.jsx("td",{className:"px-6 py-4 text-center",children:c.jsx("span",{className:`text-[11px] font-bold px-3 py-1.5 rounded-md border ${r.seedType.includes("1")?"bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20 shadow-[0_0_10px_rgba(245,158,11,0.2)]":r.seedType.includes("2")?"bg-[#94A3B8]/10 text-[#CBD5E1] border-[#94A3B8]/20":"bg-[#3B82F6]/10 text-[#60A5FA] border-[#3B82F6]/20 shadow-[0_0_10px_rgba(59,130,246,0.2)]"}`,children:r.seedType})}),c.jsx("td",{className:"px-6 py-4 text-center font-black text-[#E2E8F0] text-base",children:r.pts}),c.jsx("td",{className:"px-6 py-4 text-center font-mono font-medium text-[#94A3B8]",children:r.gd>0?`+${r.gd}`:r.gd}),c.jsx("td",{className:"px-6 py-4 text-center font-mono font-medium text-[#94A3B8]",children:r.gf})]},r.id)),t.qualified.length===0&&c.jsx("tr",{children:c.jsx("td",{colSpan:"6",className:"text-center py-12 text-[#64748B] font-medium",children:"No matches played yet. Waiting for group stage results."})})]})]})})})]}),e&&e.length>0&&c.jsxs("div",{className:"mt-16 pt-12 border-t border-[#1E2738]",children:[c.jsxs("h2",{className:"text-2xl font-black flex items-center gap-3 mb-10 text-[#F8FAFC]",children:[c.jsx(mr,{className:"text-[#FBBF24] w-7 h-7"})," KNOCKOUT BRACKET"]}),c.jsxs("div",{className:"space-y-16",children:[c.jsxs("div",{children:[c.jsxs("h3",{className:"text-sm font-black tracking-widest uppercase mb-6 text-[#C084FC] flex items-center gap-2",children:[c.jsx("span",{className:"w-2 h-2 rounded-full bg-[#C084FC] shadow-[0_0_8px_currentColor]"})," Quarterfinals"]}),c.jsx("div",{className:"grid md:grid-cols-2 gap-6",children:xt(e).filter(r=>r.id.startsWith("QF")).map((r,s)=>c.jsx(br,{match:r,title:`Quarterfinal ${s+1}`,isAdmin:!1},r.id))})]}),xt(e).filter(r=>r.id.startsWith("SF")).length>0&&c.jsxs("div",{children:[c.jsxs("h3",{className:"text-sm font-black tracking-widest uppercase mb-6 text-[#F97316] flex items-center gap-2",children:[c.jsx("span",{className:"w-2 h-2 rounded-full bg-[#F97316] shadow-[0_0_8px_currentColor]"})," Semifinals"]}),c.jsx("div",{className:"grid md:grid-cols-2 gap-6",children:xt(e).filter(r=>r.id.startsWith("SF")).map((r,s)=>c.jsx(br,{match:r,title:`Semifinal ${s+1}`,isAdmin:!1},r.id))})]}),xt(e).find(r=>r.id.startsWith("F"))&&c.jsxs("div",{children:[c.jsxs("h3",{className:"text-sm font-black tracking-widest uppercase mb-6 text-[#FBBF24] flex items-center gap-2",children:[c.jsx("span",{className:"w-2 h-2 rounded-full bg-[#FBBF24] shadow-[0_0_8px_currentColor]"})," Grand Final"]}),c.jsx("div",{className:"flex justify-center",children:c.jsx("div",{className:"w-full max-w-lg",children:c.jsx(br,{match:xt(e).find(r=>r.id.startsWith("F")),title:"Grand Final",isAdmin:!1})})})]})]})]})]})}function ON({data:t,updateData:e,isAdmin:n}){const[r,s]=U.useState("ALL"),[i,o]=U.useState("UPCOMING"),a=(r==="ALL"?t.matches:t.matches.filter(d=>d.groupId===r)).filter(d=>i==="UPCOMING"?!d.played:d.played),u=(d,_,v,y)=>{if(!n)return;const C=y===""?null:parseInt(y,10),m=t.matches.map(p=>p.id===d?{...p,[_]:{...p[_]||{},[v]:C}}:p);e({...t,matches:m})},f=d=>{if(!n)return;const _=t.matches.map(v=>v.id===d?{...v,played:!v.played}:v);e({...t,matches:_})},h=d=>{var _;return((_=t.players.find(v=>v.id===d))==null?void 0:_.name)||d};return c.jsxs("div",{className:"space-y-8 animate-in fade-in duration-500",children:[c.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0f141e] p-6 rounded-2xl border border-[#222B3D] shadow-xl",children:[c.jsxs("h2",{className:"text-3xl font-black flex items-center gap-3 text-[#E2E8F0]",children:[c.jsx(Xo,{className:"text-[#10B981] w-8 h-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]"}),"MATCH RESULTS"]}),c.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 w-full md:w-auto",children:[c.jsxs("div",{className:"flex bg-[#0a0b10] p-1.5 rounded-xl w-full sm:w-auto border border-[#1E2738] shadow-inner",children:[c.jsx("button",{onClick:()=>o("UPCOMING"),className:`flex-1 sm:flex-none px-6 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${i==="UPCOMING"?"bg-[#10B981] text-white shadow-lg shadow-[#10B981]/20":"text-[#64748B] hover:text-[#94A3B8]"}`,children:"Upcoming"}),c.jsx("button",{onClick:()=>o("PLAYED"),className:`flex-1 sm:flex-none px-6 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${i==="PLAYED"?"bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20":"text-[#64748B] hover:text-[#94A3B8]"}`,children:"Played"})]}),c.jsx("div",{className:"flex bg-[#0a0b10] p-1.5 rounded-xl w-full sm:w-auto border border-[#1E2738] shadow-inner",children:["ALL","A","B","C"].map(d=>c.jsx("button",{onClick:()=>s(d),className:`flex-1 sm:flex-none px-5 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${r===d?"bg-[#334155] text-white shadow":"text-[#64748B] hover:text-[#94A3B8]"}`,children:d==="ALL"?"ALL":`GR.${d}`},d))})]})]}),!n&&c.jsxs("div",{className:"bg-[#4770FF]/10 border border-[#4770FF]/20 text-[#6384FF] p-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-[0_4px_20px_rgba(71,112,255,0.05)]",children:[c.jsx(vv,{className:"w-5 h-5 flex-shrink-0"})," You are in view-only spectator mode. Admin login is required to input live match scores."]}),c.jsx("div",{className:"grid lg:grid-cols-2 gap-6",children:a.length===0?c.jsxs("div",{className:"col-span-full py-20 text-center text-[#64748B] bg-[#0f141e] rounded-2xl border border-dashed border-[#334155] flex flex-col items-center",children:[c.jsx(Xo,{className:"w-12 h-12 mb-4 opacity-20"}),c.jsxs("p",{className:"font-bold text-lg",children:["No ",i.toLowerCase()," matches found for this filter."]})]}):a.map(d=>{const _=h(d.p1Id),v=h(d.p2Id),y=Pl(d),C=d.g1||{},m=d.g2||{},p=d.g3||{},g=C.p1!==void 0&&C.p1!==null&&C.p2!==void 0&&C.p2!==null,w=m.p1!==void 0&&m.p1!==null&&m.p2!==void 0&&m.p2!==null;let E=!1;if(g&&w){let k=(C.p1>C.p2?1:0)+(m.p1>m.p2?1:0),N=(C.p2>C.p1?1:0)+(m.p2>m.p1?1:0);k===1&&N===1&&(E=!0)}return c.jsxs("div",{className:`border rounded-2xl p-6 transition-all duration-300 ${d.played?"bg-[#131722] border-[#222B3D] shadow-lg":"bg-[#0f141e]/50 border-[#1E2738]/50 opacity-90 hover:opacity-100 hover:border-[#334155]"}`,children:[c.jsxs("div",{className:"flex justify-between items-center mb-6 pb-4 border-b border-[#1E2738]",children:[c.jsxs("div",{className:"flex items-center gap-3",children:[c.jsx("span",{className:"text-xs font-black tracking-widest bg-[#0a0b10] border border-[#222B3D] px-3 py-1.5 rounded-md text-[#94A3B8] shadow-inner",children:d.id}),c.jsxs("span",{className:"text-[11px] font-black tracking-widest text-[#6384FF] uppercase bg-[#6384FF]/10 px-2 py-1 rounded",children:["Group ",d.groupId]})]}),c.jsxs("div",{className:"flex items-center gap-4",children:[c.jsxs("div",{className:"text-2xl font-black tracking-widest text-white drop-shadow-md",children:[y.p1Wins," ",c.jsx("span",{className:"text-[#64748B] mx-1",children:"-"})," ",y.p2Wins]}),n&&c.jsxs("button",{onClick:()=>f(d.id),className:`p-2 rounded-lg border flex items-center gap-2 text-[10px] uppercase font-black tracking-widest transition-all ${d.played?"bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] hover:bg-[#10B981]/30":"bg-[#1E293B] border-[#334155] text-[#94A3B8] hover:bg-[#334155] hover:text-white shadow-md"}`,children:[d.played?c.jsx(ni,{className:"w-4 h-4"}):c.jsx(Tl,{className:"w-4 h-4"}),c.jsx("span",{className:"hidden sm:inline",children:d.played?"OFFICIAL":"MARK DONE"})]}),!n&&d.played&&c.jsxs("span",{className:"text-[10px] tracking-widest text-[#10B981] font-black border border-[#10B981]/30 bg-[#10B981]/10 px-3 py-2 rounded-lg flex items-center gap-1.5 uppercase shadow-[0_0_15px_rgba(16,185,129,0.1)]",children:[c.jsx(ni,{className:"w-3.5 h-3.5"})," Official"]})]})]}),c.jsxs("div",{className:"space-y-4",children:[c.jsxs("div",{className:"flex justify-between items-center px-2 mb-2",children:[c.jsxs("div",{className:"flex items-center gap-2 w-1/3",children:[c.jsx(Wr,{name:_,className:"w-7 h-7 text-[10px] rounded-sm"}),c.jsx("span",{className:"font-bold text-sm text-[#E2E8F0] truncate",title:_,children:_})]}),c.jsx("span",{className:"text-[10px] font-black tracking-widest text-[#64748B] uppercase",children:"VS"}),c.jsxs("div",{className:"flex items-center justify-end gap-2 w-1/3",children:[c.jsx("span",{className:"font-bold text-sm text-[#E2E8F0] truncate text-right",title:v,children:v}),c.jsx(Wr,{name:v,className:"w-7 h-7 text-[10px] rounded-sm"})]})]}),c.jsx(Tr,{game:"g1",label:"G1",match:d,p1Name:"",p2Name:"",onChange:u,isAdmin:n}),c.jsx(Tr,{game:"g2",label:"G2",match:d,p1Name:"",p2Name:"",onChange:u,isAdmin:n}),(E||p.p1!==void 0&&p.p1!==null||n)&&c.jsx("div",{className:`transition-all duration-700 overflow-hidden ${E||p.p1!==void 0&&p.p1!==null||n?"opacity-100 max-h-32 mt-4":"opacity-0 max-h-0"}`,children:c.jsx(Tr,{game:"g3",label:"G3",match:d,p1Name:"",p2Name:"",onChange:u,isAdmin:n})})]})]},d.id)})})]})}function DN(){return c.jsxs("div",{className:"max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500",children:[c.jsxs("div",{className:"text-center space-y-4 mb-12",children:[c.jsx("div",{className:"inline-flex items-center justify-center p-4 rounded-2xl bg-[#C084FC]/10 border border-[#C084FC]/20 text-[#C084FC] mb-2 shadow-[0_0_30px_rgba(192,132,252,0.15)]",children:c.jsx(gv,{className:"w-10 h-10"})}),c.jsx("h2",{className:"text-4xl font-black tracking-tight text-[#E2E8F0] uppercase",children:"Tournament Official Rules"}),c.jsx("p",{className:"text-[#8B9BB4] text-lg max-w-2xl mx-auto",children:"Please review the format, scoring system, and qualification criteria for the Pallet PES Tour."})]}),c.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[c.jsxs("div",{className:"bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group",children:[c.jsx("div",{className:"absolute top-0 right-0 w-32 h-32 bg-[#10B981] opacity-[0.03] rounded-full blur-[40px] group-hover:opacity-[0.06] transition-opacity"}),c.jsxs("h3",{className:"text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider",children:[c.jsx("div",{className:"p-2 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20",children:c.jsx(Xo,{className:"w-6 h-6"})}),"Match Format"]}),c.jsxs("div",{className:"space-y-4 text-[#94A3B8]",children:[c.jsxs("p",{className:"font-medium text-[#CBD5E1]",children:["Every matchup is a ",c.jsx("strong",{className:"text-white",children:"Best-of-3 series"}),". The first player to win 2 games wins the series."]}),c.jsxs("ul",{className:"space-y-3",children:[c.jsxs("li",{className:"flex gap-3",children:[c.jsx("span",{className:"text-[#10B981] font-bold mt-0.5",children:"•"}),c.jsx("span",{children:'Each "game" is a full eFootball match.'})]}),c.jsxs("li",{className:"flex gap-3",children:[c.jsx("span",{className:"text-[#10B981] font-bold mt-0.5",children:"•"}),c.jsx("span",{children:"The series ends immediately if a player wins the first 2 games (2-0)."})]}),c.jsxs("li",{className:"flex gap-3",children:[c.jsx("span",{className:"text-[#10B981] font-bold mt-0.5",children:"•"}),c.jsx("span",{children:"Game 3 is only played if the series is tied 1-1."})]}),c.jsxs("li",{className:"flex gap-3",children:[c.jsx("span",{className:"text-[#10B981] font-bold mt-0.5",children:"•"}),c.jsx("span",{children:"Goals from all games count towards overall Goal Difference."})]})]})]})]}),c.jsxs("div",{className:"bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group",children:[c.jsx("div",{className:"absolute top-0 right-0 w-32 h-32 bg-[#F59E0B] opacity-[0.03] rounded-full blur-[40px] group-hover:opacity-[0.06] transition-opacity"}),c.jsxs("h3",{className:"text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider",children:[c.jsx("div",{className:"p-2 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20",children:c.jsx(mv,{className:"w-6 h-6"})}),"Points System"]}),c.jsx("div",{className:"bg-[#0a0b10] rounded-xl border border-[#1E2738] p-2 mt-2",children:c.jsxs("ul",{className:"divide-y divide-[#1E2738]",children:[c.jsxs("li",{className:"flex justify-between items-center p-4",children:[c.jsxs("span",{className:"text-[#E2E8F0] font-medium",children:["Win Series ",c.jsx("strong",{className:"text-white bg-[#334155] px-2 py-0.5 rounded ml-2",children:"2 - 0"})]}),c.jsx("span",{className:"text-[#10B981] font-black tracking-widest",children:"+3 PTS"})]}),c.jsxs("li",{className:"flex justify-between items-center p-4",children:[c.jsxs("span",{className:"text-[#E2E8F0] font-medium",children:["Win Series ",c.jsx("strong",{className:"text-white bg-[#334155] px-2 py-0.5 rounded ml-2",children:"2 - 1"})]}),c.jsx("span",{className:"text-[#10B981] font-black tracking-widest",children:"+2 PTS"})]}),c.jsxs("li",{className:"flex justify-between items-center p-4 bg-[#1A2234]",children:[c.jsxs("span",{className:"text-[#E2E8F0] font-medium",children:["Lose Series ",c.jsx("strong",{className:"text-[#94A3B8] bg-[#0a0b10] px-2 py-0.5 rounded ml-2 border border-[#334155]",children:"1 - 2"})]}),c.jsx("span",{className:"text-[#F59E0B] font-black tracking-widest",children:"+1 PTS"})]}),c.jsxs("li",{className:"flex justify-between items-center p-4 opacity-75",children:[c.jsxs("span",{className:"text-[#94A3B8] font-medium",children:["Lose Series ",c.jsx("strong",{className:"text-[#64748B] bg-[#0a0b10] px-2 py-0.5 rounded ml-2 border border-[#1E2738]",children:"0 - 2"})]}),c.jsx("span",{className:"text-[#64748B] font-black tracking-widest",children:"0 PTS"})]})]})})]}),c.jsxs("div",{className:"md:col-span-2 bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group",children:[c.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-[#6384FF] opacity-[0.03] rounded-full blur-[60px] group-hover:opacity-[0.05] transition-opacity"}),c.jsxs("h3",{className:"text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider",children:[c.jsx("div",{className:"p-2 rounded-xl bg-[#6384FF]/10 text-[#6384FF] border border-[#6384FF]/20",children:c.jsx(bl,{className:"w-6 h-6"})}),"Qualification & Tiebreakers"]}),c.jsxs("div",{className:"grid md:grid-cols-2 gap-8 pt-2",children:[c.jsxs("div",{className:"space-y-4",children:[c.jsxs("p",{className:"font-bold text-[#E2E8F0] text-lg border-b border-[#222B3D] pb-3",children:[c.jsx("span",{className:"text-[#6384FF]",children:"8 out of 12"})," players advance to the Knockout Stage:"]}),c.jsxs("ul",{className:"space-y-4 text-[#94A3B8]",children:[c.jsxs("li",{className:"flex items-start gap-4 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738]",children:[c.jsx("div",{className:"w-8 h-8 rounded-lg bg-[#3B82F6]/20 text-[#60A5FA] flex items-center justify-center font-black flex-shrink-0",children:"1"}),c.jsxs("p",{children:["The ",c.jsx("strong",{className:"text-white",children:"Top 2"})," from each group automatically qualify."]})]}),c.jsxs("li",{className:"flex items-start gap-4 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738]",children:[c.jsx("div",{className:"w-8 h-8 rounded-lg bg-[#A855F7]/20 text-[#C084FC] flex items-center justify-center font-black flex-shrink-0",children:"2"}),c.jsxs("p",{children:["The ",c.jsx("strong",{className:"text-white",children:"Best 2 Third-Place"})," finishers across all groups also advance."]})]})]})]}),c.jsxs("div",{className:"space-y-4 md:border-l md:border-[#1E2738] md:pl-8",children:[c.jsx("p",{className:"font-bold text-[#E2E8F0] text-lg border-b border-[#222B3D] pb-3",children:"Tiebreaker Order:"}),c.jsxs("ol",{className:"space-y-3",children:[c.jsxs("li",{className:"flex items-center gap-3 text-[#CBD5E1]",children:[c.jsx("span",{className:"text-[#64748B] font-mono font-bold",children:"1."}),c.jsx("span",{className:"font-bold text-white uppercase tracking-widest text-sm",children:"Total Points (PTS)"})]}),c.jsxs("li",{className:"flex items-center gap-3 text-[#94A3B8]",children:[c.jsx("span",{className:"text-[#64748B] font-mono font-bold",children:"2."}),c.jsx("span",{children:"Goal Difference (GD)"})]}),c.jsxs("li",{className:"flex items-center gap-3 text-[#94A3B8]",children:[c.jsx("span",{className:"text-[#64748B] font-mono font-bold",children:"3."}),c.jsx("span",{children:"Goals For (GF)"})]}),c.jsxs("li",{className:"flex items-center gap-3 text-[#94A3B8]",children:[c.jsx("span",{className:"text-[#64748B] font-mono font-bold",children:"4."}),c.jsx("span",{children:"Alphabetical Order"})]})]})]})]})]})]})]})}function MN({qualifiedPlayers:t,onClose:e,onComplete:n}){const[r,s]=U.useState([...t]),[i,o]=U.useState([]),[l,a]=U.useState({p1:null,p2:null}),[u,f]=U.useState(0),[h,d]=U.useState(!1),[_,v]=U.useState("Ready to draw."),[y,C]=U.useState(null),m=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#ec4899","#14b8a6","#f97316"],p=()=>{if(r.length===0)return"conic-gradient(#334155 0deg, #334155 360deg)";const w=360/r.length;let E=[];for(let k=0;k<r.length;k++){const N=k*w,b=(k+1)*w;E.push(`${m[k%m.length]} ${N}deg ${b}deg`)}return`conic-gradient(${E.join(", ")})`},g=w=>{if(h||r.length===0)return;d(!0),v(`Spinning for ${w==="p1"?"Home":"Away"}...`);let E=Math.floor(Math.random()*r.length),k=r[E];if(w==="p2"&&l.p1){const oe=r.filter(ce=>ce.group!==l.p1.group);if(oe.length>0){const ce=oe[Math.floor(Math.random()*oe.length)];E=r.findIndex(et=>et.id===ce.id),k=ce}else v("No cross-group available — same group match allowed.")}const N=360/r.length,b=360-(E*N+N/2),$=5*360,O=u+$+(b-u%360);f(O),setTimeout(()=>{d(!1),C(k),setTimeout(()=>{if(C(null),w==="p1")a({p1:k,p2:null}),s(r.filter(oe=>oe.id!==k.id)),v(`Home team selected: ${k.name}`);else{const oe={id:`QF-${i.length+1}`,p1Id:l.p1.id,p1Name:l.p1.name,p2Id:k.id,p2Name:k.name,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}};let ce=r.filter(Xn=>Xn.id!==k.id),et=[...i,oe];if(ce.length===2){const Xn={id:`QF-${et.length+1}`,p1Id:ce[0].id,p1Name:ce[0].name,p2Id:ce[1].id,p2Name:ce[1].name,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}};et.push(Xn),ce=[],v("Final match auto-generated!")}else v("Match drawn!");o(et),a({p1:null,p2:null}),s(ce)}},3e3)},8500)};return c.jsxs("div",{className:"fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in",children:[y&&c.jsx("div",{className:"absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md animate-in zoom-in duration-300",children:c.jsxs("div",{className:"flex flex-col items-center justify-center animate-bounce-in",children:[c.jsx("div",{className:"text-xl font-black text-slate-400 tracking-widest uppercase mb-4 animate-pulse",children:"Selected Player"}),c.jsx("div",{className:"text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-emerald-400 to-blue-500 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)] transform hover:scale-110 transition-transform cursor-default",children:y.name})]})}),c.jsxs("div",{className:`bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl transition-opacity duration-300 ${y?"opacity-20 pointer-events-none":"opacity-100"}`,children:[c.jsxs("div",{className:"flex-1 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50",children:[c.jsxs("div",{className:"relative w-64 h-64 sm:w-80 sm:h-80 mb-8",children:[c.jsx("div",{className:"absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-white drop-shadow-md"}),c.jsx("div",{className:"w-full h-full rounded-full border-4 border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative",style:{background:p(),transform:`rotate(${u}deg)`,transition:"transform 8.5s cubic-bezier(0.2, 0.8, 0.2, 1)"},children:r.map((w,E)=>{const k=360/r.length,N=E*k+k/2-90;return c.jsx("div",{className:"absolute top-1/2 left-1/2 origin-left font-bold text-white tracking-wider text-sm whitespace-nowrap drop-shadow-md",style:{transform:`translate(0, -50%) rotate(${N}deg) translateX(40px)`},children:w.name},w.id)})}),c.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800 border-4 border-slate-700 rounded-full z-10 shadow-inner"})]}),c.jsx("div",{className:"text-center h-12",children:c.jsx("p",{className:`font-mono text-sm ${h?"text-amber-400 animate-pulse":"text-slate-400"}`,children:_})}),c.jsxs("div",{className:"flex gap-4 mt-4 w-full justify-center",children:[c.jsx("button",{onClick:()=>g("p1"),disabled:h||l.p1!==null||r.length===0,className:"flex-1 max-w-[150px] py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold transition-colors",children:"Spin for Home"}),c.jsx("button",{onClick:()=>g("p2"),disabled:h||l.p1===null||r.length===0,className:"flex-1 max-w-[150px] py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold transition-colors",children:"Spin for Away"})]})]}),c.jsxs("div",{className:"flex-1 p-6 flex flex-col",children:[c.jsxs("div",{className:"flex justify-between items-center mb-6",children:[c.jsx("h3",{className:"text-xl font-black",children:"Live Draw Status"}),c.jsx("button",{onClick:e,className:"p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors",children:c.jsx(xv,{})})]}),c.jsxs("div",{className:"bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6",children:[c.jsx("h4",{className:"text-xs text-slate-500 font-bold uppercase tracking-widest mb-2",children:"Current Matchup"}),c.jsxs("div",{className:"flex items-center justify-between font-bold text-lg",children:[c.jsx("span",{className:l.p1?"text-blue-400":"text-slate-600",children:l.p1?l.p1.name:"???"}),c.jsx("span",{className:"text-slate-700 mx-4",children:"VS"}),c.jsx("span",{className:l.p2?"text-purple-400":"text-slate-600",children:l.p2?l.p2.name:"???"})]})]}),c.jsxs("div",{className:"flex-1",children:[c.jsx("h4",{className:"text-xs text-slate-500 font-bold uppercase tracking-widest mb-3",children:"Generated Matches"}),c.jsxs("div",{className:"space-y-2",children:[i.map((w,E)=>c.jsxs("div",{className:"flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50",children:[c.jsxs("span",{className:"text-slate-400 text-sm font-mono mr-3",children:["M",E+1]}),c.jsx("span",{className:"flex-1 text-right font-bold text-blue-300",children:w.p1Name}),c.jsx("span",{className:"mx-3 text-xs text-slate-500",children:"vs"}),c.jsx("span",{className:"flex-1 font-bold text-purple-300",children:w.p2Name})]},E)),i.length===0&&c.jsx("div",{className:"text-center py-8 text-slate-600 text-sm italic",children:"No matches drawn yet."})]})]}),c.jsx("button",{onClick:()=>n(i),disabled:i.length<4,className:"mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-black tracking-widest uppercase transition-colors",children:i.length<4?`Draw ${4-i.length} More`:"✅ Confirm Draw"})]})]})]})}function LN({data:t,updateData:e,standingsData:n,isAdmin:r}){const[s,i]=U.useState(!1),[o,l]=U.useState(t.bracket||[]);U.useEffect(()=>{t.bracket&&t.bracket.length>0?l(xt(t.bracket)):l([])},[t.bracket]);const a=y=>{const C=xt([...o,...y]);l(C),e({...t,bracket:C}),i(!1)},u=()=>{window.confirm("Are you sure you want to clear the knockout bracket?")&&(l([]),e({...t,bracket:[]}))},f=(y,C,m,p)=>{if(!r)return;const g=p===""?null:parseInt(p,10);let w=o.map(E=>E.id===y?{...E,[C]:{...E[C],[m]:g}}:E);w=xt(w),l(w),e({...t,bracket:w})},h=y=>{if(!r)return;let C=o.map(m=>m.id===y?{...m,played:!m.played}:m);C=xt(C),l(C),e({...t,bracket:C})},d=o.filter(y=>y.id.startsWith("QF")),_=o.filter(y=>y.id.startsWith("SF")),v=o.find(y=>y.id.startsWith("F"));return c.jsxs("div",{className:"space-y-8",children:[c.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800",children:[c.jsxs("div",{children:[c.jsxs("h2",{className:"text-2xl font-black flex items-center gap-2",children:[c.jsx(mr,{className:"text-yellow-500"})," Knockout Draw (Admin)"]}),c.jsx("p",{className:"text-sm text-slate-400 mt-1",children:"Manage and draw the knockout bracket here."})]}),r?c.jsxs("div",{className:"flex gap-2",children:[c.jsxs("button",{onClick:u,disabled:o.length===0,className:"px-4 py-2 bg-slate-800 hover:bg-red-900/50 text-red-400 rounded-lg text-sm font-bold border border-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2",children:[c.jsx(xv,{className:"w-4 h-4"})," Clear"]}),c.jsxs("button",{onClick:()=>i(!0),disabled:n.qualified.length<8||d.length>=4,className:"px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 flex items-center gap-2",children:[c.jsx(Tl,{className:"w-4 h-4"}),"Spin Draw"]})]}):c.jsxs("div",{className:"bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-400 flex items-center gap-2",children:[c.jsx(yv,{className:"w-3 h-3"})," Admin required for draw"]})]}),n.qualified.length<8&&o.length===0&&c.jsxs("div",{className:"bg-amber-900/20 border border-amber-500/30 text-amber-400 p-6 rounded-xl text-center",children:[c.jsx(vv,{className:"w-8 h-8 mx-auto mb-2 opacity-80"}),c.jsx("p",{className:"font-bold",children:"Group Stage Incomplete"}),c.jsx("p",{className:"text-sm mt-1 opacity-80",children:"Finish the group stage matches to generate the top 8 qualified players."})]}),o.length>0?c.jsxs("div",{className:"space-y-12",children:[c.jsxs("div",{children:[c.jsxs("h3",{className:"text-xl font-bold mb-4 text-purple-400 border-b border-purple-900/50 pb-2 flex items-center gap-2",children:[c.jsx(mr,{className:"w-5 h-5"})," Quarterfinals"]}),c.jsx("div",{className:"grid md:grid-cols-2 gap-6",children:d.map((y,C)=>c.jsx(br,{match:y,title:`Quarterfinal ${C+1}`,isAdmin:r,togglePlayed:h,handleScoreChange:f},y.id))})]}),_.length>0&&c.jsxs("div",{children:[c.jsxs("h3",{className:"text-xl font-bold mb-4 text-amber-400 border-b border-amber-900/50 pb-2 flex items-center gap-2",children:[c.jsx(_v,{className:"w-5 h-5"})," Semifinals"]}),c.jsx("div",{className:"grid md:grid-cols-2 gap-6",children:_.map((y,C)=>c.jsx(br,{match:y,title:`Semifinal ${C+1}`,isAdmin:r,togglePlayed:h,handleScoreChange:f},y.id))})]}),v&&c.jsxs("div",{children:[c.jsxs("h3",{className:"text-xl font-bold mb-4 text-yellow-400 border-b border-yellow-900/50 pb-2 flex items-center gap-2",children:[c.jsx(mr,{className:"w-5 h-5"})," Grand Final"]}),c.jsx("div",{className:"flex justify-center",children:c.jsx("div",{className:"w-full max-w-lg",children:c.jsx(br,{match:v,title:"Grand Final",isAdmin:r,togglePlayed:h,handleScoreChange:f})})})]})]}):n.qualified.length>=8&&c.jsxs("div",{className:"h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl text-slate-500",children:[c.jsx(mr,{className:"w-12 h-12 mb-3 opacity-20"}),c.jsx("p",{className:"font-bold",children:"No draw generated yet."}),r&&c.jsx("p",{className:"text-sm mt-1",children:'Click "Spin Draw" to generate matchups.'})]}),s&&c.jsx(MN,{qualifiedPlayers:n.qualified,onClose:()=>i(!1),onComplete:a})]})}function jN({data:t,updateData:e,isAdmin:n,setIsAdmin:r}){const[s,i]=U.useState(""),[o,l]=U.useState(!1),[a,u]=U.useState(t.settings),[f,h]=U.useState(t.players);U.useEffect(()=>{u(t.settings),h(t.players)},[t]);const d=m=>{m.preventDefault(),s==="admin"?(r(!0),l(!1),i("")):l(!0)},_=()=>{e({...t,settings:a})},v=(m,p)=>{h(f.map(g=>g.id===m?{...g,name:p}:g))},y=()=>{e({...t,players:f})},C=()=>{window.prompt("DANGER! This will delete all scores and reset to template. Type 'RESET' to confirm.")==="RESET"&&e(no)};return n?c.jsxs("div",{className:"space-y-8 animate-in fade-in duration-500",children:[c.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#C084FC]/10 p-6 rounded-2xl border border-[#C084FC]/30 shadow-[0_0_30px_rgba(192,132,252,0.1)] relative overflow-hidden group",children:[c.jsx("div",{className:"absolute top-0 left-0 w-64 h-64 bg-[#C084FC] opacity-[0.05] rounded-full blur-[60px] pointer-events-none"}),c.jsxs("div",{className:"relative z-10",children:[c.jsxs("h2",{className:"text-3xl font-black flex items-center gap-3 text-[#E2E8F0] tracking-tight",children:[c.jsx(bl,{className:"text-[#C084FC] w-8 h-8"})," Control Panel"]}),c.jsx("p",{className:"text-sm text-[#C084FC]/70 mt-1 font-bold tracking-wide",children:"Live synchronization is ACTIVE."})]}),c.jsx("div",{className:"relative z-10",children:c.jsxs("button",{onClick:()=>r(!1),className:"flex items-center gap-2 px-5 py-2.5 bg-[#0a0b10]/50 hover:bg-[#1E2738] border border-[#C084FC]/20 hover:border-[#C084FC]/50 text-[#C084FC] rounded-xl text-sm font-black tracking-widest uppercase transition-all shadow-md",children:[c.jsx(Hk,{className:"w-4 h-4"})," Lock"]})})]}),c.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[c.jsxs("div",{className:"bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl",children:[c.jsxs("h3",{className:"text-xl font-black mb-6 flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider",children:[c.jsx("div",{className:"p-2 rounded-xl bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20",children:c.jsx(wv,{className:"w-5 h-5"})}),"Tournament Info"]}),c.jsxs("div",{className:"space-y-5",children:[c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest",children:"Tournament Name"}),c.jsx("input",{value:a.name,onChange:m=>u({...a,name:m.target.value}),className:"w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest",children:"Season"}),c.jsx("input",{value:a.season,onChange:m=>u({...a,season:m.target.value}),className:"w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"})]}),c.jsxs("div",{children:[c.jsx("label",{className:"block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest",children:"Tagline"}),c.jsx("input",{value:a.tagline,onChange:m=>u({...a,tagline:m.target.value}),className:"w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"})]}),c.jsx("button",{onClick:_,className:"w-full mt-4 py-3.5 bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#60A5FA] rounded-xl font-black tracking-widest uppercase border border-[#3B82F6]/30 transition-colors",children:"Save Info Updates"})]})]}),c.jsxs("div",{className:"bg-[#131722] border border-[#EF4444]/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(239,68,68,0.05)] relative overflow-hidden group",children:[c.jsx("div",{className:"absolute top-0 right-0 w-48 h-48 bg-[#EF4444] opacity-[0.03] rounded-full blur-[50px] pointer-events-none"}),c.jsxs("h3",{className:"text-xl font-black mb-6 flex items-center gap-3 text-[#EF4444] uppercase tracking-wider relative z-10",children:[c.jsx("div",{className:"p-2 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20",children:c.jsx(_v,{className:"w-5 h-5"})}),"Danger Zone"]}),c.jsxs("p",{className:"text-[#94A3B8] font-medium leading-relaxed mb-8 relative z-10",children:["Resetting the tournament will permanently delete all scores, match histories, and knockout bracket data across all clients. ",c.jsx("strong",{className:"text-white",children:"This cannot be undone."})]}),c.jsxs("button",{onClick:C,className:"w-full py-4 bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white rounded-xl font-black uppercase tracking-widest border border-[#EF4444]/30 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] relative z-10",children:[c.jsx(Gk,{className:"w-5 h-5"})," Factory Reset"]})]})]}),c.jsxs("div",{className:"bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl",children:[c.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8",children:[c.jsxs("h3",{className:"text-xl font-black flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider",children:[c.jsx("div",{className:"p-2 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20",children:c.jsx(qk,{className:"w-5 h-5"})}),"Player Roster"]}),c.jsxs("button",{onClick:y,className:"px-6 py-3 bg-[#10B981] hover:bg-[#059669] text-white rounded-xl text-sm font-black tracking-widest uppercase shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all flex items-center gap-2",children:[c.jsx(ni,{className:"w-4 h-4"})," Save Roster Updates"]})]}),c.jsx("div",{className:"grid md:grid-cols-3 gap-6",children:["A","B","C"].map(m=>c.jsxs("div",{className:"bg-[#0a0b10] p-5 rounded-2xl border border-[#1E2738] shadow-inner",children:[c.jsxs("h4",{className:"font-black text-center text-[#64748B] mb-5 uppercase tracking-[0.2em]",children:["Group ",m]}),c.jsx("div",{className:"space-y-3",children:f.filter(p=>p.group===m).map(p=>c.jsxs("div",{className:"flex items-center gap-3 bg-[#131722] p-2 rounded-lg border border-[#222B3D]",children:[c.jsx("span",{className:"text-[10px] font-black tracking-wider text-[#64748B] bg-[#1E2738] px-2 py-1 rounded w-8 text-center",children:p.id}),c.jsx("input",{value:p.name,onChange:g=>v(p.id,g.target.value),className:"flex-1 bg-transparent border-none text-[#E2E8F0] px-2 py-1 text-sm focus:outline-none font-bold placeholder-[#475569]",placeholder:`Player ${p.id}`})]},p.id))})]},m))})]})]}):c.jsxs("div",{className:"max-w-md mx-auto mt-20 p-8 bg-[#131722] border border-[#222B3D] rounded-2xl shadow-[0_0_50px_rgba(20,30,50,0.5)] animate-in zoom-in-95 duration-500",children:[c.jsx("div",{className:"flex justify-center mb-6",children:c.jsx("div",{className:"w-20 h-20 bg-[#C084FC]/10 rounded-full flex items-center justify-center border border-[#C084FC]/20 shadow-[0_0_30px_rgba(192,132,252,0.15)]",children:c.jsx(yv,{className:"w-10 h-10 text-[#C084FC]"})})}),c.jsx("h2",{className:"text-3xl font-black text-center mb-2 text-[#E2E8F0] tracking-tight",children:"Admin Portal"}),c.jsx("p",{className:"text-[#8B9BB4] text-center text-sm mb-8 font-medium",children:"Authentication required to manage tournament."}),c.jsxs("form",{onSubmit:d,className:"space-y-6",children:[c.jsxs("div",{children:[c.jsx("input",{type:"password",placeholder:"Enter password",value:s,onChange:m=>i(m.target.value),className:"w-full bg-[#0a0b10] border border-[#1E2738] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] text-center text-lg text-white placeholder-[#475569] shadow-inner transition-colors font-mono"}),o&&c.jsx("p",{className:"text-[#EF4444] text-xs mt-3 text-center font-bold tracking-widest uppercase animate-pulse",children:"Incorrect password"})]}),c.jsx("button",{type:"submit",className:"w-full bg-gradient-to-r from-[#C084FC] to-[#9333EA] hover:from-[#A855F7] hover:to-[#7E22CE] text-white font-black tracking-widest uppercase py-4 rounded-xl shadow-[0_0_20px_rgba(192,132,252,0.3)] transition-all",children:"Unlock Dashboard"})]})]})}function FN(){const[t,e]=U.useState(null),[n,r]=U.useState("default-pes-app"),[s,i]=U.useState(no),[o,l]=U.useState(!0),[a,u]=U.useState("home"),[f,h]=U.useState(!1);U.useEffect(()=>{try{{Jk().then(y=>{y||(console.warn("Auth failed, running in local fallback mode."),l(!1))});const v=vx(Sv,y=>{y&&e(y)});return()=>v()}}catch(v){console.error("Firebase setup error",v),l(!1)}},[]),U.useEffect(()=>{if(!t)return;const v=$f(Gf,"tournament"),y=Pk(v,C=>{C.exists()?i(C.val()):(Hf(v,no),i(no)),l(!1)},C=>{console.error("Firebase RTDB sync error:",C),l(!1)});return()=>y()},[t,n]);const d=async v=>{if(i(v),t)try{const y=$f(Gf,"tournament");await Hf(y,v)}catch(y){console.error("Error saving data:",y)}},_=U.useMemo(()=>nN(s.players,s.matches),[s.players,s.matches]);return o?c.jsxs("div",{className:"min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 flex-col gap-4",children:[c.jsx(Tl,{className:"w-12 h-12 animate-spin"}),c.jsx("p",{className:"font-mono uppercase tracking-widest text-sm",children:"Loading Tournament Data..."})]}):c.jsxs("div",{className:"min-h-screen font-sans selection:bg-blue-500/30",children:[c.jsx(sN,{currentPage:a,setCurrentPage:u,isAdmin:f}),c.jsxs("main",{className:"max-w-6xl mx-auto p-4 md:p-6 pb-24",children:[a==="home"&&c.jsx(iN,{data:s,setCurrentPage:u}),a==="standings"&&c.jsx(AN,{standingsData:_,bracketData:s.bracket}),a==="matches"&&c.jsx(ON,{data:s,updateData:d,isAdmin:f}),a==="rules"&&c.jsx(DN,{}),a==="knockout"&&f&&c.jsx(LN,{data:s,updateData:d,standingsData:_,isAdmin:f}),a==="admin"&&c.jsx(jN,{data:s,updateData:d,isAdmin:f,setIsAdmin:h})]})]})}xa.createRoot(document.getElementById("root")).render(c.jsx(zv.StrictMode,{children:c.jsx(FN,{})}));
