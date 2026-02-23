(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();function Rv(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}var lp={exports:{}},sl={},ap={exports:{}},U={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var ui=Symbol.for("react.element"),Pv=Symbol.for("react.portal"),Av=Symbol.for("react.fragment"),Ov=Symbol.for("react.strict_mode"),jv=Symbol.for("react.profiler"),Dv=Symbol.for("react.provider"),Mv=Symbol.for("react.context"),Fv=Symbol.for("react.forward_ref"),Lv=Symbol.for("react.suspense"),Bv=Symbol.for("react.memo"),Uv=Symbol.for("react.lazy"),Bd=Symbol.iterator;function zv(t){return t===null||typeof t!="object"?null:(t=Bd&&t[Bd]||t["@@iterator"],typeof t=="function"?t:null)}var up={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},cp=Object.assign,dp={};function Gr(t,e,n){this.props=t,this.context=e,this.refs=dp,this.updater=n||up}Gr.prototype.isReactComponent={};Gr.prototype.setState=function(t,e){if(typeof t!="object"&&typeof t!="function"&&t!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,t,e,"setState")};Gr.prototype.forceUpdate=function(t){this.updater.enqueueForceUpdate(this,t,"forceUpdate")};function hp(){}hp.prototype=Gr.prototype;function Hu(t,e,n){this.props=t,this.context=e,this.refs=dp,this.updater=n||up}var $u=Hu.prototype=new hp;$u.constructor=Hu;cp($u,Gr.prototype);$u.isPureReactComponent=!0;var Ud=Array.isArray,fp=Object.prototype.hasOwnProperty,Gu={current:null},pp={key:!0,ref:!0,__self:!0,__source:!0};function mp(t,e,n){var r,s={},i=null,o=null;if(e!=null)for(r in e.ref!==void 0&&(o=e.ref),e.key!==void 0&&(i=""+e.key),e)fp.call(e,r)&&!pp.hasOwnProperty(r)&&(s[r]=e[r]);var l=arguments.length-2;if(l===1)s.children=n;else if(1<l){for(var a=Array(l),c=0;c<l;c++)a[c]=arguments[c+2];s.children=a}if(t&&t.defaultProps)for(r in l=t.defaultProps,l)s[r]===void 0&&(s[r]=l[r]);return{$$typeof:ui,type:t,key:i,ref:o,props:s,_owner:Gu.current}}function Wv(t,e){return{$$typeof:ui,type:t.type,key:e,ref:t.ref,props:t.props,_owner:t._owner}}function Ku(t){return typeof t=="object"&&t!==null&&t.$$typeof===ui}function Vv(t){var e={"=":"=0",":":"=2"};return"$"+t.replace(/[=:]/g,function(n){return e[n]})}var zd=/\/+/g;function zl(t,e){return typeof t=="object"&&t!==null&&t.key!=null?Vv(""+t.key):e.toString(36)}function $i(t,e,n,r,s){var i=typeof t;(i==="undefined"||i==="boolean")&&(t=null);var o=!1;if(t===null)o=!0;else switch(i){case"string":case"number":o=!0;break;case"object":switch(t.$$typeof){case ui:case Pv:o=!0}}if(o)return o=t,s=s(o),t=r===""?"."+zl(o,0):r,Ud(s)?(n="",t!=null&&(n=t.replace(zd,"$&/")+"/"),$i(s,e,n,"",function(c){return c})):s!=null&&(Ku(s)&&(s=Wv(s,n+(!s.key||o&&o.key===s.key?"":(""+s.key).replace(zd,"$&/")+"/")+t)),e.push(s)),1;if(o=0,r=r===""?".":r+":",Ud(t))for(var l=0;l<t.length;l++){i=t[l];var a=r+zl(i,l);o+=$i(i,e,n,a,s)}else if(a=zv(t),typeof a=="function")for(t=a.call(t),l=0;!(i=t.next()).done;)i=i.value,a=r+zl(i,l++),o+=$i(i,e,n,a,s);else if(i==="object")throw e=String(t),Error("Objects are not valid as a React child (found: "+(e==="[object Object]"?"object with keys {"+Object.keys(t).join(", ")+"}":e)+"). If you meant to render a collection of children, use an array instead.");return o}function ki(t,e,n){if(t==null)return t;var r=[],s=0;return $i(t,r,"","",function(i){return e.call(n,i,s++)}),r}function Hv(t){if(t._status===-1){var e=t._result;e=e(),e.then(function(n){(t._status===0||t._status===-1)&&(t._status=1,t._result=n)},function(n){(t._status===0||t._status===-1)&&(t._status=2,t._result=n)}),t._status===-1&&(t._status=0,t._result=e)}if(t._status===1)return t._result.default;throw t._result}var Pe={current:null},Gi={transition:null},$v={ReactCurrentDispatcher:Pe,ReactCurrentBatchConfig:Gi,ReactCurrentOwner:Gu};function gp(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:ki,forEach:function(t,e,n){ki(t,function(){e.apply(this,arguments)},n)},count:function(t){var e=0;return ki(t,function(){e++}),e},toArray:function(t){return ki(t,function(e){return e})||[]},only:function(t){if(!Ku(t))throw Error("React.Children.only expected to receive a single React element child.");return t}};U.Component=Gr;U.Fragment=Av;U.Profiler=jv;U.PureComponent=Hu;U.StrictMode=Ov;U.Suspense=Lv;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=$v;U.act=gp;U.cloneElement=function(t,e,n){if(t==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+t+".");var r=cp({},t.props),s=t.key,i=t.ref,o=t._owner;if(e!=null){if(e.ref!==void 0&&(i=e.ref,o=Gu.current),e.key!==void 0&&(s=""+e.key),t.type&&t.type.defaultProps)var l=t.type.defaultProps;for(a in e)fp.call(e,a)&&!pp.hasOwnProperty(a)&&(r[a]=e[a]===void 0&&l!==void 0?l[a]:e[a])}var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){l=Array(a);for(var c=0;c<a;c++)l[c]=arguments[c+2];r.children=l}return{$$typeof:ui,type:t.type,key:s,ref:i,props:r,_owner:o}};U.createContext=function(t){return t={$$typeof:Mv,_currentValue:t,_currentValue2:t,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},t.Provider={$$typeof:Dv,_context:t},t.Consumer=t};U.createElement=mp;U.createFactory=function(t){var e=mp.bind(null,t);return e.type=t,e};U.createRef=function(){return{current:null}};U.forwardRef=function(t){return{$$typeof:Fv,render:t}};U.isValidElement=Ku;U.lazy=function(t){return{$$typeof:Uv,_payload:{_status:-1,_result:t},_init:Hv}};U.memo=function(t,e){return{$$typeof:Bv,type:t,compare:e===void 0?null:e}};U.startTransition=function(t){var e=Gi.transition;Gi.transition={};try{t()}finally{Gi.transition=e}};U.unstable_act=gp;U.useCallback=function(t,e){return Pe.current.useCallback(t,e)};U.useContext=function(t){return Pe.current.useContext(t)};U.useDebugValue=function(){};U.useDeferredValue=function(t){return Pe.current.useDeferredValue(t)};U.useEffect=function(t,e){return Pe.current.useEffect(t,e)};U.useId=function(){return Pe.current.useId()};U.useImperativeHandle=function(t,e,n){return Pe.current.useImperativeHandle(t,e,n)};U.useInsertionEffect=function(t,e){return Pe.current.useInsertionEffect(t,e)};U.useLayoutEffect=function(t,e){return Pe.current.useLayoutEffect(t,e)};U.useMemo=function(t,e){return Pe.current.useMemo(t,e)};U.useReducer=function(t,e,n){return Pe.current.useReducer(t,e,n)};U.useRef=function(t){return Pe.current.useRef(t)};U.useState=function(t){return Pe.current.useState(t)};U.useSyncExternalStore=function(t,e,n){return Pe.current.useSyncExternalStore(t,e,n)};U.useTransition=function(){return Pe.current.useTransition()};U.version="18.3.1";ap.exports=U;var j=ap.exports;const Gv=Rv(j);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kv=j,Qv=Symbol.for("react.element"),qv=Symbol.for("react.fragment"),Yv=Object.prototype.hasOwnProperty,Xv=Kv.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Jv={key:!0,ref:!0,__self:!0,__source:!0};function _p(t,e,n){var r,s={},i=null,o=null;n!==void 0&&(i=""+n),e.key!==void 0&&(i=""+e.key),e.ref!==void 0&&(o=e.ref);for(r in e)Yv.call(e,r)&&!Jv.hasOwnProperty(r)&&(s[r]=e[r]);if(t&&t.defaultProps)for(r in e=t.defaultProps,e)s[r]===void 0&&(s[r]=e[r]);return{$$typeof:Qv,type:t,key:i,ref:o,props:s,_owner:Xv.current}}sl.Fragment=qv;sl.jsx=_p;sl.jsxs=_p;lp.exports=sl;var u=lp.exports,Ia={},vp={exports:{}},He={},yp={exports:{}},xp={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(t){function e(b,O){var D=b.length;b.push(O);e:for(;0<D;){var ie=D-1>>>1,ce=b[ie];if(0<s(ce,O))b[ie]=O,b[D]=ce,D=ie;else break e}}function n(b){return b.length===0?null:b[0]}function r(b){if(b.length===0)return null;var O=b[0],D=b.pop();if(D!==O){b[0]=D;e:for(var ie=0,ce=b.length,Si=ce>>>1;ie<Si;){var Cn=2*(ie+1)-1,Ul=b[Cn],kn=Cn+1,Ci=b[kn];if(0>s(Ul,D))kn<ce&&0>s(Ci,Ul)?(b[ie]=Ci,b[kn]=D,ie=kn):(b[ie]=Ul,b[Cn]=D,ie=Cn);else if(kn<ce&&0>s(Ci,D))b[ie]=Ci,b[kn]=D,ie=kn;else break e}}return O}function s(b,O){var D=b.sortIndex-O.sortIndex;return D!==0?D:b.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var i=performance;t.unstable_now=function(){return i.now()}}else{var o=Date,l=o.now();t.unstable_now=function(){return o.now()-l}}var a=[],c=[],h=1,d=null,f=3,_=!1,y=!1,v=!1,w=typeof setTimeout=="function"?setTimeout:null,m=typeof clearTimeout=="function"?clearTimeout:null,p=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function g(b){for(var O=n(c);O!==null;){if(O.callback===null)r(c);else if(O.startTime<=b)r(c),O.sortIndex=O.expirationTime,e(a,O);else break;O=n(c)}}function x(b){if(v=!1,g(b),!y)if(n(a)!==null)y=!0,Ll(E);else{var O=n(c);O!==null&&Bl(x,O.startTime-b)}}function E(b,O){y=!1,v&&(v=!1,m(T),T=-1),_=!0;var D=f;try{for(g(O),d=n(a);d!==null&&(!(d.expirationTime>O)||b&&!Ne());){var ie=d.callback;if(typeof ie=="function"){d.callback=null,f=d.priorityLevel;var ce=ie(d.expirationTime<=O);O=t.unstable_now(),typeof ce=="function"?d.callback=ce:d===n(a)&&r(a),g(O)}else r(a);d=n(a)}if(d!==null)var Si=!0;else{var Cn=n(c);Cn!==null&&Bl(x,Cn.startTime-O),Si=!1}return Si}finally{d=null,f=D,_=!1}}var S=!1,N=null,T=-1,L=5,P=-1;function Ne(){return!(t.unstable_now()-P<L)}function Sn(){if(N!==null){var b=t.unstable_now();P=b;var O=!0;try{O=N(!0,b)}finally{O?ns():(S=!1,N=null)}}else S=!1}var ns;if(typeof p=="function")ns=function(){p(Sn)};else if(typeof MessageChannel<"u"){var Ld=new MessageChannel,Tv=Ld.port2;Ld.port1.onmessage=Sn,ns=function(){Tv.postMessage(null)}}else ns=function(){w(Sn,0)};function Ll(b){N=b,S||(S=!0,ns())}function Bl(b,O){T=w(function(){b(t.unstable_now())},O)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(b){b.callback=null},t.unstable_continueExecution=function(){y||_||(y=!0,Ll(E))},t.unstable_forceFrameRate=function(b){0>b||125<b?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):L=0<b?Math.floor(1e3/b):5},t.unstable_getCurrentPriorityLevel=function(){return f},t.unstable_getFirstCallbackNode=function(){return n(a)},t.unstable_next=function(b){switch(f){case 1:case 2:case 3:var O=3;break;default:O=f}var D=f;f=O;try{return b()}finally{f=D}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(b,O){switch(b){case 1:case 2:case 3:case 4:case 5:break;default:b=3}var D=f;f=b;try{return O()}finally{f=D}},t.unstable_scheduleCallback=function(b,O,D){var ie=t.unstable_now();switch(typeof D=="object"&&D!==null?(D=D.delay,D=typeof D=="number"&&0<D?ie+D:ie):D=ie,b){case 1:var ce=-1;break;case 2:ce=250;break;case 5:ce=1073741823;break;case 4:ce=1e4;break;default:ce=5e3}return ce=D+ce,b={id:h++,callback:O,priorityLevel:b,startTime:D,expirationTime:ce,sortIndex:-1},D>ie?(b.sortIndex=D,e(c,b),n(a)===null&&b===n(c)&&(v?(m(T),T=-1):v=!0,Bl(x,D-ie))):(b.sortIndex=ce,e(a,b),y||_||(y=!0,Ll(E))),b},t.unstable_shouldYield=Ne,t.unstable_wrapCallback=function(b){var O=f;return function(){var D=f;f=O;try{return b.apply(this,arguments)}finally{f=D}}}})(xp);yp.exports=xp;var Zv=yp.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var e0=j,Ve=Zv;function C(t){for(var e="https://reactjs.org/docs/error-decoder.html?invariant="+t,n=1;n<arguments.length;n++)e+="&args[]="+encodeURIComponent(arguments[n]);return"Minified React error #"+t+"; visit "+e+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var wp=new Set,js={};function qn(t,e){Pr(t,e),Pr(t+"Capture",e)}function Pr(t,e){for(js[t]=e,t=0;t<e.length;t++)wp.add(e[t])}var Pt=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),ba=Object.prototype.hasOwnProperty,t0=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Wd={},Vd={};function n0(t){return ba.call(Vd,t)?!0:ba.call(Wd,t)?!1:t0.test(t)?Vd[t]=!0:(Wd[t]=!0,!1)}function r0(t,e,n,r){if(n!==null&&n.type===0)return!1;switch(typeof e){case"function":case"symbol":return!0;case"boolean":return r?!1:n!==null?!n.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function s0(t,e,n,r){if(e===null||typeof e>"u"||r0(t,e,n,r))return!0;if(r)return!1;if(n!==null)switch(n.type){case 3:return!e;case 4:return e===!1;case 5:return isNaN(e);case 6:return isNaN(e)||1>e}return!1}function Ae(t,e,n,r,s,i,o){this.acceptsBooleans=e===2||e===3||e===4,this.attributeName=r,this.attributeNamespace=s,this.mustUseProperty=n,this.propertyName=t,this.type=e,this.sanitizeURL=i,this.removeEmptyString=o}var xe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){xe[t]=new Ae(t,0,!1,t,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var e=t[0];xe[e]=new Ae(e,1,!1,t[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(t){xe[t]=new Ae(t,2,!1,t.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){xe[t]=new Ae(t,2,!1,t,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){xe[t]=new Ae(t,3,!1,t.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(t){xe[t]=new Ae(t,3,!0,t,null,!1,!1)});["capture","download"].forEach(function(t){xe[t]=new Ae(t,4,!1,t,null,!1,!1)});["cols","rows","size","span"].forEach(function(t){xe[t]=new Ae(t,6,!1,t,null,!1,!1)});["rowSpan","start"].forEach(function(t){xe[t]=new Ae(t,5,!1,t.toLowerCase(),null,!1,!1)});var Qu=/[\-:]([a-z])/g;function qu(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var e=t.replace(Qu,qu);xe[e]=new Ae(e,1,!1,t,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var e=t.replace(Qu,qu);xe[e]=new Ae(e,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(t){var e=t.replace(Qu,qu);xe[e]=new Ae(e,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(t){xe[t]=new Ae(t,1,!1,t.toLowerCase(),null,!1,!1)});xe.xlinkHref=new Ae("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(t){xe[t]=new Ae(t,1,!1,t.toLowerCase(),null,!0,!0)});function Yu(t,e,n,r){var s=xe.hasOwnProperty(e)?xe[e]:null;(s!==null?s.type!==0:r||!(2<e.length)||e[0]!=="o"&&e[0]!=="O"||e[1]!=="n"&&e[1]!=="N")&&(s0(e,n,s,r)&&(n=null),r||s===null?n0(e)&&(n===null?t.removeAttribute(e):t.setAttribute(e,""+n)):s.mustUseProperty?t[s.propertyName]=n===null?s.type===3?!1:"":n:(e=s.attributeName,r=s.attributeNamespace,n===null?t.removeAttribute(e):(s=s.type,n=s===3||s===4&&n===!0?"":""+n,r?t.setAttributeNS(r,e,n):t.setAttribute(e,n))))}var Bt=e0.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Ni=Symbol.for("react.element"),nr=Symbol.for("react.portal"),rr=Symbol.for("react.fragment"),Xu=Symbol.for("react.strict_mode"),Ta=Symbol.for("react.profiler"),Ep=Symbol.for("react.provider"),Sp=Symbol.for("react.context"),Ju=Symbol.for("react.forward_ref"),Ra=Symbol.for("react.suspense"),Pa=Symbol.for("react.suspense_list"),Zu=Symbol.for("react.memo"),Wt=Symbol.for("react.lazy"),Cp=Symbol.for("react.offscreen"),Hd=Symbol.iterator;function rs(t){return t===null||typeof t!="object"?null:(t=Hd&&t[Hd]||t["@@iterator"],typeof t=="function"?t:null)}var te=Object.assign,Wl;function ms(t){if(Wl===void 0)try{throw Error()}catch(n){var e=n.stack.trim().match(/\n( *(at )?)/);Wl=e&&e[1]||""}return`
`+Wl+t}var Vl=!1;function Hl(t,e){if(!t||Vl)return"";Vl=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(e)if(e=function(){throw Error()},Object.defineProperty(e.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(e,[])}catch(c){var r=c}Reflect.construct(t,[],e)}else{try{e.call()}catch(c){r=c}t.call(e.prototype)}else{try{throw Error()}catch(c){r=c}t()}}catch(c){if(c&&r&&typeof c.stack=="string"){for(var s=c.stack.split(`
`),i=r.stack.split(`
`),o=s.length-1,l=i.length-1;1<=o&&0<=l&&s[o]!==i[l];)l--;for(;1<=o&&0<=l;o--,l--)if(s[o]!==i[l]){if(o!==1||l!==1)do if(o--,l--,0>l||s[o]!==i[l]){var a=`
`+s[o].replace(" at new "," at ");return t.displayName&&a.includes("<anonymous>")&&(a=a.replace("<anonymous>",t.displayName)),a}while(1<=o&&0<=l);break}}}finally{Vl=!1,Error.prepareStackTrace=n}return(t=t?t.displayName||t.name:"")?ms(t):""}function i0(t){switch(t.tag){case 5:return ms(t.type);case 16:return ms("Lazy");case 13:return ms("Suspense");case 19:return ms("SuspenseList");case 0:case 2:case 15:return t=Hl(t.type,!1),t;case 11:return t=Hl(t.type.render,!1),t;case 1:return t=Hl(t.type,!0),t;default:return""}}function Aa(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case rr:return"Fragment";case nr:return"Portal";case Ta:return"Profiler";case Xu:return"StrictMode";case Ra:return"Suspense";case Pa:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case Sp:return(t.displayName||"Context")+".Consumer";case Ep:return(t._context.displayName||"Context")+".Provider";case Ju:var e=t.render;return t=t.displayName,t||(t=e.displayName||e.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case Zu:return e=t.displayName||null,e!==null?e:Aa(t.type)||"Memo";case Wt:e=t._payload,t=t._init;try{return Aa(t(e))}catch{}}return null}function o0(t){var e=t.type;switch(t.tag){case 24:return"Cache";case 9:return(e.displayName||"Context")+".Consumer";case 10:return(e._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=e.render,t=t.displayName||t.name||"",e.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return e;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return Aa(e);case 8:return e===Xu?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e}return null}function fn(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function kp(t){var e=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(e==="checkbox"||e==="radio")}function l0(t){var e=kp(t)?"checked":"value",n=Object.getOwnPropertyDescriptor(t.constructor.prototype,e),r=""+t[e];if(!t.hasOwnProperty(e)&&typeof n<"u"&&typeof n.get=="function"&&typeof n.set=="function"){var s=n.get,i=n.set;return Object.defineProperty(t,e,{configurable:!0,get:function(){return s.call(this)},set:function(o){r=""+o,i.call(this,o)}}),Object.defineProperty(t,e,{enumerable:n.enumerable}),{getValue:function(){return r},setValue:function(o){r=""+o},stopTracking:function(){t._valueTracker=null,delete t[e]}}}}function Ii(t){t._valueTracker||(t._valueTracker=l0(t))}function Np(t){if(!t)return!1;var e=t._valueTracker;if(!e)return!0;var n=e.getValue(),r="";return t&&(r=kp(t)?t.checked?"true":"false":t.value),t=r,t!==n?(e.setValue(t),!0):!1}function ao(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function Oa(t,e){var n=e.checked;return te({},e,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:n??t._wrapperState.initialChecked})}function $d(t,e){var n=e.defaultValue==null?"":e.defaultValue,r=e.checked!=null?e.checked:e.defaultChecked;n=fn(e.value!=null?e.value:n),t._wrapperState={initialChecked:r,initialValue:n,controlled:e.type==="checkbox"||e.type==="radio"?e.checked!=null:e.value!=null}}function Ip(t,e){e=e.checked,e!=null&&Yu(t,"checked",e,!1)}function ja(t,e){Ip(t,e);var n=fn(e.value),r=e.type;if(n!=null)r==="number"?(n===0&&t.value===""||t.value!=n)&&(t.value=""+n):t.value!==""+n&&(t.value=""+n);else if(r==="submit"||r==="reset"){t.removeAttribute("value");return}e.hasOwnProperty("value")?Da(t,e.type,n):e.hasOwnProperty("defaultValue")&&Da(t,e.type,fn(e.defaultValue)),e.checked==null&&e.defaultChecked!=null&&(t.defaultChecked=!!e.defaultChecked)}function Gd(t,e,n){if(e.hasOwnProperty("value")||e.hasOwnProperty("defaultValue")){var r=e.type;if(!(r!=="submit"&&r!=="reset"||e.value!==void 0&&e.value!==null))return;e=""+t._wrapperState.initialValue,n||e===t.value||(t.value=e),t.defaultValue=e}n=t.name,n!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,n!==""&&(t.name=n)}function Da(t,e,n){(e!=="number"||ao(t.ownerDocument)!==t)&&(n==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+n&&(t.defaultValue=""+n))}var gs=Array.isArray;function vr(t,e,n,r){if(t=t.options,e){e={};for(var s=0;s<n.length;s++)e["$"+n[s]]=!0;for(n=0;n<t.length;n++)s=e.hasOwnProperty("$"+t[n].value),t[n].selected!==s&&(t[n].selected=s),s&&r&&(t[n].defaultSelected=!0)}else{for(n=""+fn(n),e=null,s=0;s<t.length;s++){if(t[s].value===n){t[s].selected=!0,r&&(t[s].defaultSelected=!0);return}e!==null||t[s].disabled||(e=t[s])}e!==null&&(e.selected=!0)}}function Ma(t,e){if(e.dangerouslySetInnerHTML!=null)throw Error(C(91));return te({},e,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function Kd(t,e){var n=e.value;if(n==null){if(n=e.children,e=e.defaultValue,n!=null){if(e!=null)throw Error(C(92));if(gs(n)){if(1<n.length)throw Error(C(93));n=n[0]}e=n}e==null&&(e=""),n=e}t._wrapperState={initialValue:fn(n)}}function bp(t,e){var n=fn(e.value),r=fn(e.defaultValue);n!=null&&(n=""+n,n!==t.value&&(t.value=n),e.defaultValue==null&&t.defaultValue!==n&&(t.defaultValue=n)),r!=null&&(t.defaultValue=""+r)}function Qd(t){var e=t.textContent;e===t._wrapperState.initialValue&&e!==""&&e!==null&&(t.value=e)}function Tp(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Fa(t,e){return t==null||t==="http://www.w3.org/1999/xhtml"?Tp(e):t==="http://www.w3.org/2000/svg"&&e==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var bi,Rp=function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(e,n,r,s){MSApp.execUnsafeLocalFunction(function(){return t(e,n,r,s)})}:t}(function(t,e){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=e;else{for(bi=bi||document.createElement("div"),bi.innerHTML="<svg>"+e.valueOf().toString()+"</svg>",e=bi.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;e.firstChild;)t.appendChild(e.firstChild)}});function Ds(t,e){if(e){var n=t.firstChild;if(n&&n===t.lastChild&&n.nodeType===3){n.nodeValue=e;return}}t.textContent=e}var ys={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},a0=["Webkit","ms","Moz","O"];Object.keys(ys).forEach(function(t){a0.forEach(function(e){e=e+t.charAt(0).toUpperCase()+t.substring(1),ys[e]=ys[t]})});function Pp(t,e,n){return e==null||typeof e=="boolean"||e===""?"":n||typeof e!="number"||e===0||ys.hasOwnProperty(t)&&ys[t]?(""+e).trim():e+"px"}function Ap(t,e){t=t.style;for(var n in e)if(e.hasOwnProperty(n)){var r=n.indexOf("--")===0,s=Pp(n,e[n],r);n==="float"&&(n="cssFloat"),r?t.setProperty(n,s):t[n]=s}}var u0=te({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function La(t,e){if(e){if(u0[t]&&(e.children!=null||e.dangerouslySetInnerHTML!=null))throw Error(C(137,t));if(e.dangerouslySetInnerHTML!=null){if(e.children!=null)throw Error(C(60));if(typeof e.dangerouslySetInnerHTML!="object"||!("__html"in e.dangerouslySetInnerHTML))throw Error(C(61))}if(e.style!=null&&typeof e.style!="object")throw Error(C(62))}}function Ba(t,e){if(t.indexOf("-")===-1)return typeof e.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ua=null;function ec(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var za=null,yr=null,xr=null;function qd(t){if(t=hi(t)){if(typeof za!="function")throw Error(C(280));var e=t.stateNode;e&&(e=ul(e),za(t.stateNode,t.type,e))}}function Op(t){yr?xr?xr.push(t):xr=[t]:yr=t}function jp(){if(yr){var t=yr,e=xr;if(xr=yr=null,qd(t),e)for(t=0;t<e.length;t++)qd(e[t])}}function Dp(t,e){return t(e)}function Mp(){}var $l=!1;function Fp(t,e,n){if($l)return t(e,n);$l=!0;try{return Dp(t,e,n)}finally{$l=!1,(yr!==null||xr!==null)&&(Mp(),jp())}}function Ms(t,e){var n=t.stateNode;if(n===null)return null;var r=ul(n);if(r===null)return null;n=r[e];e:switch(e){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(r=!r.disabled)||(t=t.type,r=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!r;break e;default:t=!1}if(t)return null;if(n&&typeof n!="function")throw Error(C(231,e,typeof n));return n}var Wa=!1;if(Pt)try{var ss={};Object.defineProperty(ss,"passive",{get:function(){Wa=!0}}),window.addEventListener("test",ss,ss),window.removeEventListener("test",ss,ss)}catch{Wa=!1}function c0(t,e,n,r,s,i,o,l,a){var c=Array.prototype.slice.call(arguments,3);try{e.apply(n,c)}catch(h){this.onError(h)}}var xs=!1,uo=null,co=!1,Va=null,d0={onError:function(t){xs=!0,uo=t}};function h0(t,e,n,r,s,i,o,l,a){xs=!1,uo=null,c0.apply(d0,arguments)}function f0(t,e,n,r,s,i,o,l,a){if(h0.apply(this,arguments),xs){if(xs){var c=uo;xs=!1,uo=null}else throw Error(C(198));co||(co=!0,Va=c)}}function Yn(t){var e=t,n=t;if(t.alternate)for(;e.return;)e=e.return;else{t=e;do e=t,e.flags&4098&&(n=e.return),t=e.return;while(t)}return e.tag===3?n:null}function Lp(t){if(t.tag===13){var e=t.memoizedState;if(e===null&&(t=t.alternate,t!==null&&(e=t.memoizedState)),e!==null)return e.dehydrated}return null}function Yd(t){if(Yn(t)!==t)throw Error(C(188))}function p0(t){var e=t.alternate;if(!e){if(e=Yn(t),e===null)throw Error(C(188));return e!==t?null:t}for(var n=t,r=e;;){var s=n.return;if(s===null)break;var i=s.alternate;if(i===null){if(r=s.return,r!==null){n=r;continue}break}if(s.child===i.child){for(i=s.child;i;){if(i===n)return Yd(s),t;if(i===r)return Yd(s),e;i=i.sibling}throw Error(C(188))}if(n.return!==r.return)n=s,r=i;else{for(var o=!1,l=s.child;l;){if(l===n){o=!0,n=s,r=i;break}if(l===r){o=!0,r=s,n=i;break}l=l.sibling}if(!o){for(l=i.child;l;){if(l===n){o=!0,n=i,r=s;break}if(l===r){o=!0,r=i,n=s;break}l=l.sibling}if(!o)throw Error(C(189))}}if(n.alternate!==r)throw Error(C(190))}if(n.tag!==3)throw Error(C(188));return n.stateNode.current===n?t:e}function Bp(t){return t=p0(t),t!==null?Up(t):null}function Up(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var e=Up(t);if(e!==null)return e;t=t.sibling}return null}var zp=Ve.unstable_scheduleCallback,Xd=Ve.unstable_cancelCallback,m0=Ve.unstable_shouldYield,g0=Ve.unstable_requestPaint,oe=Ve.unstable_now,_0=Ve.unstable_getCurrentPriorityLevel,tc=Ve.unstable_ImmediatePriority,Wp=Ve.unstable_UserBlockingPriority,ho=Ve.unstable_NormalPriority,v0=Ve.unstable_LowPriority,Vp=Ve.unstable_IdlePriority,il=null,mt=null;function y0(t){if(mt&&typeof mt.onCommitFiberRoot=="function")try{mt.onCommitFiberRoot(il,t,void 0,(t.current.flags&128)===128)}catch{}}var ot=Math.clz32?Math.clz32:E0,x0=Math.log,w0=Math.LN2;function E0(t){return t>>>=0,t===0?32:31-(x0(t)/w0|0)|0}var Ti=64,Ri=4194304;function _s(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function fo(t,e){var n=t.pendingLanes;if(n===0)return 0;var r=0,s=t.suspendedLanes,i=t.pingedLanes,o=n&268435455;if(o!==0){var l=o&~s;l!==0?r=_s(l):(i&=o,i!==0&&(r=_s(i)))}else o=n&~s,o!==0?r=_s(o):i!==0&&(r=_s(i));if(r===0)return 0;if(e!==0&&e!==r&&!(e&s)&&(s=r&-r,i=e&-e,s>=i||s===16&&(i&4194240)!==0))return e;if(r&4&&(r|=n&16),e=t.entangledLanes,e!==0)for(t=t.entanglements,e&=r;0<e;)n=31-ot(e),s=1<<n,r|=t[n],e&=~s;return r}function S0(t,e){switch(t){case 1:case 2:case 4:return e+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function C0(t,e){for(var n=t.suspendedLanes,r=t.pingedLanes,s=t.expirationTimes,i=t.pendingLanes;0<i;){var o=31-ot(i),l=1<<o,a=s[o];a===-1?(!(l&n)||l&r)&&(s[o]=S0(l,e)):a<=e&&(t.expiredLanes|=l),i&=~l}}function Ha(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Hp(){var t=Ti;return Ti<<=1,!(Ti&4194240)&&(Ti=64),t}function Gl(t){for(var e=[],n=0;31>n;n++)e.push(t);return e}function ci(t,e,n){t.pendingLanes|=e,e!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,e=31-ot(e),t[e]=n}function k0(t,e){var n=t.pendingLanes&~e;t.pendingLanes=e,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=e,t.mutableReadLanes&=e,t.entangledLanes&=e,e=t.entanglements;var r=t.eventTimes;for(t=t.expirationTimes;0<n;){var s=31-ot(n),i=1<<s;e[s]=0,r[s]=-1,t[s]=-1,n&=~i}}function nc(t,e){var n=t.entangledLanes|=e;for(t=t.entanglements;n;){var r=31-ot(n),s=1<<r;s&e|t[r]&e&&(t[r]|=e),n&=~s}}var V=0;function $p(t){return t&=-t,1<t?4<t?t&268435455?16:536870912:4:1}var Gp,rc,Kp,Qp,qp,$a=!1,Pi=[],Zt=null,en=null,tn=null,Fs=new Map,Ls=new Map,Ht=[],N0="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Jd(t,e){switch(t){case"focusin":case"focusout":Zt=null;break;case"dragenter":case"dragleave":en=null;break;case"mouseover":case"mouseout":tn=null;break;case"pointerover":case"pointerout":Fs.delete(e.pointerId);break;case"gotpointercapture":case"lostpointercapture":Ls.delete(e.pointerId)}}function is(t,e,n,r,s,i){return t===null||t.nativeEvent!==i?(t={blockedOn:e,domEventName:n,eventSystemFlags:r,nativeEvent:i,targetContainers:[s]},e!==null&&(e=hi(e),e!==null&&rc(e)),t):(t.eventSystemFlags|=r,e=t.targetContainers,s!==null&&e.indexOf(s)===-1&&e.push(s),t)}function I0(t,e,n,r,s){switch(e){case"focusin":return Zt=is(Zt,t,e,n,r,s),!0;case"dragenter":return en=is(en,t,e,n,r,s),!0;case"mouseover":return tn=is(tn,t,e,n,r,s),!0;case"pointerover":var i=s.pointerId;return Fs.set(i,is(Fs.get(i)||null,t,e,n,r,s)),!0;case"gotpointercapture":return i=s.pointerId,Ls.set(i,is(Ls.get(i)||null,t,e,n,r,s)),!0}return!1}function Yp(t){var e=Rn(t.target);if(e!==null){var n=Yn(e);if(n!==null){if(e=n.tag,e===13){if(e=Lp(n),e!==null){t.blockedOn=e,qp(t.priority,function(){Kp(n)});return}}else if(e===3&&n.stateNode.current.memoizedState.isDehydrated){t.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Ki(t){if(t.blockedOn!==null)return!1;for(var e=t.targetContainers;0<e.length;){var n=Ga(t.domEventName,t.eventSystemFlags,e[0],t.nativeEvent);if(n===null){n=t.nativeEvent;var r=new n.constructor(n.type,n);Ua=r,n.target.dispatchEvent(r),Ua=null}else return e=hi(n),e!==null&&rc(e),t.blockedOn=n,!1;e.shift()}return!0}function Zd(t,e,n){Ki(t)&&n.delete(e)}function b0(){$a=!1,Zt!==null&&Ki(Zt)&&(Zt=null),en!==null&&Ki(en)&&(en=null),tn!==null&&Ki(tn)&&(tn=null),Fs.forEach(Zd),Ls.forEach(Zd)}function os(t,e){t.blockedOn===e&&(t.blockedOn=null,$a||($a=!0,Ve.unstable_scheduleCallback(Ve.unstable_NormalPriority,b0)))}function Bs(t){function e(s){return os(s,t)}if(0<Pi.length){os(Pi[0],t);for(var n=1;n<Pi.length;n++){var r=Pi[n];r.blockedOn===t&&(r.blockedOn=null)}}for(Zt!==null&&os(Zt,t),en!==null&&os(en,t),tn!==null&&os(tn,t),Fs.forEach(e),Ls.forEach(e),n=0;n<Ht.length;n++)r=Ht[n],r.blockedOn===t&&(r.blockedOn=null);for(;0<Ht.length&&(n=Ht[0],n.blockedOn===null);)Yp(n),n.blockedOn===null&&Ht.shift()}var wr=Bt.ReactCurrentBatchConfig,po=!0;function T0(t,e,n,r){var s=V,i=wr.transition;wr.transition=null;try{V=1,sc(t,e,n,r)}finally{V=s,wr.transition=i}}function R0(t,e,n,r){var s=V,i=wr.transition;wr.transition=null;try{V=4,sc(t,e,n,r)}finally{V=s,wr.transition=i}}function sc(t,e,n,r){if(po){var s=Ga(t,e,n,r);if(s===null)na(t,e,r,mo,n),Jd(t,r);else if(I0(s,t,e,n,r))r.stopPropagation();else if(Jd(t,r),e&4&&-1<N0.indexOf(t)){for(;s!==null;){var i=hi(s);if(i!==null&&Gp(i),i=Ga(t,e,n,r),i===null&&na(t,e,r,mo,n),i===s)break;s=i}s!==null&&r.stopPropagation()}else na(t,e,r,null,n)}}var mo=null;function Ga(t,e,n,r){if(mo=null,t=ec(r),t=Rn(t),t!==null)if(e=Yn(t),e===null)t=null;else if(n=e.tag,n===13){if(t=Lp(e),t!==null)return t;t=null}else if(n===3){if(e.stateNode.current.memoizedState.isDehydrated)return e.tag===3?e.stateNode.containerInfo:null;t=null}else e!==t&&(t=null);return mo=t,null}function Xp(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(_0()){case tc:return 1;case Wp:return 4;case ho:case v0:return 16;case Vp:return 536870912;default:return 16}default:return 16}}var Yt=null,ic=null,Qi=null;function Jp(){if(Qi)return Qi;var t,e=ic,n=e.length,r,s="value"in Yt?Yt.value:Yt.textContent,i=s.length;for(t=0;t<n&&e[t]===s[t];t++);var o=n-t;for(r=1;r<=o&&e[n-r]===s[i-r];r++);return Qi=s.slice(t,1<r?1-r:void 0)}function qi(t){var e=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&e===13&&(t=13)):t=e,t===10&&(t=13),32<=t||t===13?t:0}function Ai(){return!0}function eh(){return!1}function $e(t){function e(n,r,s,i,o){this._reactName=n,this._targetInst=s,this.type=r,this.nativeEvent=i,this.target=o,this.currentTarget=null;for(var l in t)t.hasOwnProperty(l)&&(n=t[l],this[l]=n?n(i):i[l]);return this.isDefaultPrevented=(i.defaultPrevented!=null?i.defaultPrevented:i.returnValue===!1)?Ai:eh,this.isPropagationStopped=eh,this}return te(e.prototype,{preventDefault:function(){this.defaultPrevented=!0;var n=this.nativeEvent;n&&(n.preventDefault?n.preventDefault():typeof n.returnValue!="unknown"&&(n.returnValue=!1),this.isDefaultPrevented=Ai)},stopPropagation:function(){var n=this.nativeEvent;n&&(n.stopPropagation?n.stopPropagation():typeof n.cancelBubble!="unknown"&&(n.cancelBubble=!0),this.isPropagationStopped=Ai)},persist:function(){},isPersistent:Ai}),e}var Kr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},oc=$e(Kr),di=te({},Kr,{view:0,detail:0}),P0=$e(di),Kl,Ql,ls,ol=te({},di,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:lc,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==ls&&(ls&&t.type==="mousemove"?(Kl=t.screenX-ls.screenX,Ql=t.screenY-ls.screenY):Ql=Kl=0,ls=t),Kl)},movementY:function(t){return"movementY"in t?t.movementY:Ql}}),th=$e(ol),A0=te({},ol,{dataTransfer:0}),O0=$e(A0),j0=te({},di,{relatedTarget:0}),ql=$e(j0),D0=te({},Kr,{animationName:0,elapsedTime:0,pseudoElement:0}),M0=$e(D0),F0=te({},Kr,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),L0=$e(F0),B0=te({},Kr,{data:0}),nh=$e(B0),U0={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},z0={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},W0={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function V0(t){var e=this.nativeEvent;return e.getModifierState?e.getModifierState(t):(t=W0[t])?!!e[t]:!1}function lc(){return V0}var H0=te({},di,{key:function(t){if(t.key){var e=U0[t.key]||t.key;if(e!=="Unidentified")return e}return t.type==="keypress"?(t=qi(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?z0[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:lc,charCode:function(t){return t.type==="keypress"?qi(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?qi(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),$0=$e(H0),G0=te({},ol,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),rh=$e(G0),K0=te({},di,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:lc}),Q0=$e(K0),q0=te({},Kr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Y0=$e(q0),X0=te({},ol,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),J0=$e(X0),Z0=[9,13,27,32],ac=Pt&&"CompositionEvent"in window,ws=null;Pt&&"documentMode"in document&&(ws=document.documentMode);var ey=Pt&&"TextEvent"in window&&!ws,Zp=Pt&&(!ac||ws&&8<ws&&11>=ws),sh=" ",ih=!1;function em(t,e){switch(t){case"keyup":return Z0.indexOf(e.keyCode)!==-1;case"keydown":return e.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function tm(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var sr=!1;function ty(t,e){switch(t){case"compositionend":return tm(e);case"keypress":return e.which!==32?null:(ih=!0,sh);case"textInput":return t=e.data,t===sh&&ih?null:t;default:return null}}function ny(t,e){if(sr)return t==="compositionend"||!ac&&em(t,e)?(t=Jp(),Qi=ic=Yt=null,sr=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(e.ctrlKey||e.altKey||e.metaKey)||e.ctrlKey&&e.altKey){if(e.char&&1<e.char.length)return e.char;if(e.which)return String.fromCharCode(e.which)}return null;case"compositionend":return Zp&&e.locale!=="ko"?null:e.data;default:return null}}var ry={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function oh(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e==="input"?!!ry[t.type]:e==="textarea"}function nm(t,e,n,r){Op(r),e=go(e,"onChange"),0<e.length&&(n=new oc("onChange","change",null,n,r),t.push({event:n,listeners:e}))}var Es=null,Us=null;function sy(t){fm(t,0)}function ll(t){var e=lr(t);if(Np(e))return t}function iy(t,e){if(t==="change")return e}var rm=!1;if(Pt){var Yl;if(Pt){var Xl="oninput"in document;if(!Xl){var lh=document.createElement("div");lh.setAttribute("oninput","return;"),Xl=typeof lh.oninput=="function"}Yl=Xl}else Yl=!1;rm=Yl&&(!document.documentMode||9<document.documentMode)}function ah(){Es&&(Es.detachEvent("onpropertychange",sm),Us=Es=null)}function sm(t){if(t.propertyName==="value"&&ll(Us)){var e=[];nm(e,Us,t,ec(t)),Fp(sy,e)}}function oy(t,e,n){t==="focusin"?(ah(),Es=e,Us=n,Es.attachEvent("onpropertychange",sm)):t==="focusout"&&ah()}function ly(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return ll(Us)}function ay(t,e){if(t==="click")return ll(e)}function uy(t,e){if(t==="input"||t==="change")return ll(e)}function cy(t,e){return t===e&&(t!==0||1/t===1/e)||t!==t&&e!==e}var ut=typeof Object.is=="function"?Object.is:cy;function zs(t,e){if(ut(t,e))return!0;if(typeof t!="object"||t===null||typeof e!="object"||e===null)return!1;var n=Object.keys(t),r=Object.keys(e);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var s=n[r];if(!ba.call(e,s)||!ut(t[s],e[s]))return!1}return!0}function uh(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function ch(t,e){var n=uh(t);t=0;for(var r;n;){if(n.nodeType===3){if(r=t+n.textContent.length,t<=e&&r>=e)return{node:n,offset:e-t};t=r}e:{for(;n;){if(n.nextSibling){n=n.nextSibling;break e}n=n.parentNode}n=void 0}n=uh(n)}}function im(t,e){return t&&e?t===e?!0:t&&t.nodeType===3?!1:e&&e.nodeType===3?im(t,e.parentNode):"contains"in t?t.contains(e):t.compareDocumentPosition?!!(t.compareDocumentPosition(e)&16):!1:!1}function om(){for(var t=window,e=ao();e instanceof t.HTMLIFrameElement;){try{var n=typeof e.contentWindow.location.href=="string"}catch{n=!1}if(n)t=e.contentWindow;else break;e=ao(t.document)}return e}function uc(t){var e=t&&t.nodeName&&t.nodeName.toLowerCase();return e&&(e==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||e==="textarea"||t.contentEditable==="true")}function dy(t){var e=om(),n=t.focusedElem,r=t.selectionRange;if(e!==n&&n&&n.ownerDocument&&im(n.ownerDocument.documentElement,n)){if(r!==null&&uc(n)){if(e=r.start,t=r.end,t===void 0&&(t=e),"selectionStart"in n)n.selectionStart=e,n.selectionEnd=Math.min(t,n.value.length);else if(t=(e=n.ownerDocument||document)&&e.defaultView||window,t.getSelection){t=t.getSelection();var s=n.textContent.length,i=Math.min(r.start,s);r=r.end===void 0?i:Math.min(r.end,s),!t.extend&&i>r&&(s=r,r=i,i=s),s=ch(n,i);var o=ch(n,r);s&&o&&(t.rangeCount!==1||t.anchorNode!==s.node||t.anchorOffset!==s.offset||t.focusNode!==o.node||t.focusOffset!==o.offset)&&(e=e.createRange(),e.setStart(s.node,s.offset),t.removeAllRanges(),i>r?(t.addRange(e),t.extend(o.node,o.offset)):(e.setEnd(o.node,o.offset),t.addRange(e)))}}for(e=[],t=n;t=t.parentNode;)t.nodeType===1&&e.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof n.focus=="function"&&n.focus(),n=0;n<e.length;n++)t=e[n],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var hy=Pt&&"documentMode"in document&&11>=document.documentMode,ir=null,Ka=null,Ss=null,Qa=!1;function dh(t,e,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;Qa||ir==null||ir!==ao(r)||(r=ir,"selectionStart"in r&&uc(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Ss&&zs(Ss,r)||(Ss=r,r=go(Ka,"onSelect"),0<r.length&&(e=new oc("onSelect","select",null,e,n),t.push({event:e,listeners:r}),e.target=ir)))}function Oi(t,e){var n={};return n[t.toLowerCase()]=e.toLowerCase(),n["Webkit"+t]="webkit"+e,n["Moz"+t]="moz"+e,n}var or={animationend:Oi("Animation","AnimationEnd"),animationiteration:Oi("Animation","AnimationIteration"),animationstart:Oi("Animation","AnimationStart"),transitionend:Oi("Transition","TransitionEnd")},Jl={},lm={};Pt&&(lm=document.createElement("div").style,"AnimationEvent"in window||(delete or.animationend.animation,delete or.animationiteration.animation,delete or.animationstart.animation),"TransitionEvent"in window||delete or.transitionend.transition);function al(t){if(Jl[t])return Jl[t];if(!or[t])return t;var e=or[t],n;for(n in e)if(e.hasOwnProperty(n)&&n in lm)return Jl[t]=e[n];return t}var am=al("animationend"),um=al("animationiteration"),cm=al("animationstart"),dm=al("transitionend"),hm=new Map,hh="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function vn(t,e){hm.set(t,e),qn(e,[t])}for(var Zl=0;Zl<hh.length;Zl++){var ea=hh[Zl],fy=ea.toLowerCase(),py=ea[0].toUpperCase()+ea.slice(1);vn(fy,"on"+py)}vn(am,"onAnimationEnd");vn(um,"onAnimationIteration");vn(cm,"onAnimationStart");vn("dblclick","onDoubleClick");vn("focusin","onFocus");vn("focusout","onBlur");vn(dm,"onTransitionEnd");Pr("onMouseEnter",["mouseout","mouseover"]);Pr("onMouseLeave",["mouseout","mouseover"]);Pr("onPointerEnter",["pointerout","pointerover"]);Pr("onPointerLeave",["pointerout","pointerover"]);qn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));qn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));qn("onBeforeInput",["compositionend","keypress","textInput","paste"]);qn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));qn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));qn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var vs="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),my=new Set("cancel close invalid load scroll toggle".split(" ").concat(vs));function fh(t,e,n){var r=t.type||"unknown-event";t.currentTarget=n,f0(r,e,void 0,t),t.currentTarget=null}function fm(t,e){e=(e&4)!==0;for(var n=0;n<t.length;n++){var r=t[n],s=r.event;r=r.listeners;e:{var i=void 0;if(e)for(var o=r.length-1;0<=o;o--){var l=r[o],a=l.instance,c=l.currentTarget;if(l=l.listener,a!==i&&s.isPropagationStopped())break e;fh(s,l,c),i=a}else for(o=0;o<r.length;o++){if(l=r[o],a=l.instance,c=l.currentTarget,l=l.listener,a!==i&&s.isPropagationStopped())break e;fh(s,l,c),i=a}}}if(co)throw t=Va,co=!1,Va=null,t}function q(t,e){var n=e[Za];n===void 0&&(n=e[Za]=new Set);var r=t+"__bubble";n.has(r)||(pm(e,t,2,!1),n.add(r))}function ta(t,e,n){var r=0;e&&(r|=4),pm(n,t,r,e)}var ji="_reactListening"+Math.random().toString(36).slice(2);function Ws(t){if(!t[ji]){t[ji]=!0,wp.forEach(function(n){n!=="selectionchange"&&(my.has(n)||ta(n,!1,t),ta(n,!0,t))});var e=t.nodeType===9?t:t.ownerDocument;e===null||e[ji]||(e[ji]=!0,ta("selectionchange",!1,e))}}function pm(t,e,n,r){switch(Xp(e)){case 1:var s=T0;break;case 4:s=R0;break;default:s=sc}n=s.bind(null,e,n,t),s=void 0,!Wa||e!=="touchstart"&&e!=="touchmove"&&e!=="wheel"||(s=!0),r?s!==void 0?t.addEventListener(e,n,{capture:!0,passive:s}):t.addEventListener(e,n,!0):s!==void 0?t.addEventListener(e,n,{passive:s}):t.addEventListener(e,n,!1)}function na(t,e,n,r,s){var i=r;if(!(e&1)&&!(e&2)&&r!==null)e:for(;;){if(r===null)return;var o=r.tag;if(o===3||o===4){var l=r.stateNode.containerInfo;if(l===s||l.nodeType===8&&l.parentNode===s)break;if(o===4)for(o=r.return;o!==null;){var a=o.tag;if((a===3||a===4)&&(a=o.stateNode.containerInfo,a===s||a.nodeType===8&&a.parentNode===s))return;o=o.return}for(;l!==null;){if(o=Rn(l),o===null)return;if(a=o.tag,a===5||a===6){r=i=o;continue e}l=l.parentNode}}r=r.return}Fp(function(){var c=i,h=ec(n),d=[];e:{var f=hm.get(t);if(f!==void 0){var _=oc,y=t;switch(t){case"keypress":if(qi(n)===0)break e;case"keydown":case"keyup":_=$0;break;case"focusin":y="focus",_=ql;break;case"focusout":y="blur",_=ql;break;case"beforeblur":case"afterblur":_=ql;break;case"click":if(n.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":_=th;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":_=O0;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":_=Q0;break;case am:case um:case cm:_=M0;break;case dm:_=Y0;break;case"scroll":_=P0;break;case"wheel":_=J0;break;case"copy":case"cut":case"paste":_=L0;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":_=rh}var v=(e&4)!==0,w=!v&&t==="scroll",m=v?f!==null?f+"Capture":null:f;v=[];for(var p=c,g;p!==null;){g=p;var x=g.stateNode;if(g.tag===5&&x!==null&&(g=x,m!==null&&(x=Ms(p,m),x!=null&&v.push(Vs(p,x,g)))),w)break;p=p.return}0<v.length&&(f=new _(f,y,null,n,h),d.push({event:f,listeners:v}))}}if(!(e&7)){e:{if(f=t==="mouseover"||t==="pointerover",_=t==="mouseout"||t==="pointerout",f&&n!==Ua&&(y=n.relatedTarget||n.fromElement)&&(Rn(y)||y[At]))break e;if((_||f)&&(f=h.window===h?h:(f=h.ownerDocument)?f.defaultView||f.parentWindow:window,_?(y=n.relatedTarget||n.toElement,_=c,y=y?Rn(y):null,y!==null&&(w=Yn(y),y!==w||y.tag!==5&&y.tag!==6)&&(y=null)):(_=null,y=c),_!==y)){if(v=th,x="onMouseLeave",m="onMouseEnter",p="mouse",(t==="pointerout"||t==="pointerover")&&(v=rh,x="onPointerLeave",m="onPointerEnter",p="pointer"),w=_==null?f:lr(_),g=y==null?f:lr(y),f=new v(x,p+"leave",_,n,h),f.target=w,f.relatedTarget=g,x=null,Rn(h)===c&&(v=new v(m,p+"enter",y,n,h),v.target=g,v.relatedTarget=w,x=v),w=x,_&&y)t:{for(v=_,m=y,p=0,g=v;g;g=Zn(g))p++;for(g=0,x=m;x;x=Zn(x))g++;for(;0<p-g;)v=Zn(v),p--;for(;0<g-p;)m=Zn(m),g--;for(;p--;){if(v===m||m!==null&&v===m.alternate)break t;v=Zn(v),m=Zn(m)}v=null}else v=null;_!==null&&ph(d,f,_,v,!1),y!==null&&w!==null&&ph(d,w,y,v,!0)}}e:{if(f=c?lr(c):window,_=f.nodeName&&f.nodeName.toLowerCase(),_==="select"||_==="input"&&f.type==="file")var E=iy;else if(oh(f))if(rm)E=uy;else{E=ly;var S=oy}else(_=f.nodeName)&&_.toLowerCase()==="input"&&(f.type==="checkbox"||f.type==="radio")&&(E=ay);if(E&&(E=E(t,c))){nm(d,E,n,h);break e}S&&S(t,f,c),t==="focusout"&&(S=f._wrapperState)&&S.controlled&&f.type==="number"&&Da(f,"number",f.value)}switch(S=c?lr(c):window,t){case"focusin":(oh(S)||S.contentEditable==="true")&&(ir=S,Ka=c,Ss=null);break;case"focusout":Ss=Ka=ir=null;break;case"mousedown":Qa=!0;break;case"contextmenu":case"mouseup":case"dragend":Qa=!1,dh(d,n,h);break;case"selectionchange":if(hy)break;case"keydown":case"keyup":dh(d,n,h)}var N;if(ac)e:{switch(t){case"compositionstart":var T="onCompositionStart";break e;case"compositionend":T="onCompositionEnd";break e;case"compositionupdate":T="onCompositionUpdate";break e}T=void 0}else sr?em(t,n)&&(T="onCompositionEnd"):t==="keydown"&&n.keyCode===229&&(T="onCompositionStart");T&&(Zp&&n.locale!=="ko"&&(sr||T!=="onCompositionStart"?T==="onCompositionEnd"&&sr&&(N=Jp()):(Yt=h,ic="value"in Yt?Yt.value:Yt.textContent,sr=!0)),S=go(c,T),0<S.length&&(T=new nh(T,t,null,n,h),d.push({event:T,listeners:S}),N?T.data=N:(N=tm(n),N!==null&&(T.data=N)))),(N=ey?ty(t,n):ny(t,n))&&(c=go(c,"onBeforeInput"),0<c.length&&(h=new nh("onBeforeInput","beforeinput",null,n,h),d.push({event:h,listeners:c}),h.data=N))}fm(d,e)})}function Vs(t,e,n){return{instance:t,listener:e,currentTarget:n}}function go(t,e){for(var n=e+"Capture",r=[];t!==null;){var s=t,i=s.stateNode;s.tag===5&&i!==null&&(s=i,i=Ms(t,n),i!=null&&r.unshift(Vs(t,i,s)),i=Ms(t,e),i!=null&&r.push(Vs(t,i,s))),t=t.return}return r}function Zn(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function ph(t,e,n,r,s){for(var i=e._reactName,o=[];n!==null&&n!==r;){var l=n,a=l.alternate,c=l.stateNode;if(a!==null&&a===r)break;l.tag===5&&c!==null&&(l=c,s?(a=Ms(n,i),a!=null&&o.unshift(Vs(n,a,l))):s||(a=Ms(n,i),a!=null&&o.push(Vs(n,a,l)))),n=n.return}o.length!==0&&t.push({event:e,listeners:o})}var gy=/\r\n?/g,_y=/\u0000|\uFFFD/g;function mh(t){return(typeof t=="string"?t:""+t).replace(gy,`
`).replace(_y,"")}function Di(t,e,n){if(e=mh(e),mh(t)!==e&&n)throw Error(C(425))}function _o(){}var qa=null,Ya=null;function Xa(t,e){return t==="textarea"||t==="noscript"||typeof e.children=="string"||typeof e.children=="number"||typeof e.dangerouslySetInnerHTML=="object"&&e.dangerouslySetInnerHTML!==null&&e.dangerouslySetInnerHTML.__html!=null}var Ja=typeof setTimeout=="function"?setTimeout:void 0,vy=typeof clearTimeout=="function"?clearTimeout:void 0,gh=typeof Promise=="function"?Promise:void 0,yy=typeof queueMicrotask=="function"?queueMicrotask:typeof gh<"u"?function(t){return gh.resolve(null).then(t).catch(xy)}:Ja;function xy(t){setTimeout(function(){throw t})}function ra(t,e){var n=e,r=0;do{var s=n.nextSibling;if(t.removeChild(n),s&&s.nodeType===8)if(n=s.data,n==="/$"){if(r===0){t.removeChild(s),Bs(e);return}r--}else n!=="$"&&n!=="$?"&&n!=="$!"||r++;n=s}while(n);Bs(e)}function nn(t){for(;t!=null;t=t.nextSibling){var e=t.nodeType;if(e===1||e===3)break;if(e===8){if(e=t.data,e==="$"||e==="$!"||e==="$?")break;if(e==="/$")return null}}return t}function _h(t){t=t.previousSibling;for(var e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="$"||n==="$!"||n==="$?"){if(e===0)return t;e--}else n==="/$"&&e++}t=t.previousSibling}return null}var Qr=Math.random().toString(36).slice(2),ft="__reactFiber$"+Qr,Hs="__reactProps$"+Qr,At="__reactContainer$"+Qr,Za="__reactEvents$"+Qr,wy="__reactListeners$"+Qr,Ey="__reactHandles$"+Qr;function Rn(t){var e=t[ft];if(e)return e;for(var n=t.parentNode;n;){if(e=n[At]||n[ft]){if(n=e.alternate,e.child!==null||n!==null&&n.child!==null)for(t=_h(t);t!==null;){if(n=t[ft])return n;t=_h(t)}return e}t=n,n=t.parentNode}return null}function hi(t){return t=t[ft]||t[At],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function lr(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(C(33))}function ul(t){return t[Hs]||null}var eu=[],ar=-1;function yn(t){return{current:t}}function Y(t){0>ar||(t.current=eu[ar],eu[ar]=null,ar--)}function Q(t,e){ar++,eu[ar]=t.current,t.current=e}var pn={},ke=yn(pn),Fe=yn(!1),Ln=pn;function Ar(t,e){var n=t.type.contextTypes;if(!n)return pn;var r=t.stateNode;if(r&&r.__reactInternalMemoizedUnmaskedChildContext===e)return r.__reactInternalMemoizedMaskedChildContext;var s={},i;for(i in n)s[i]=e[i];return r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=e,t.__reactInternalMemoizedMaskedChildContext=s),s}function Le(t){return t=t.childContextTypes,t!=null}function vo(){Y(Fe),Y(ke)}function vh(t,e,n){if(ke.current!==pn)throw Error(C(168));Q(ke,e),Q(Fe,n)}function mm(t,e,n){var r=t.stateNode;if(e=e.childContextTypes,typeof r.getChildContext!="function")return n;r=r.getChildContext();for(var s in r)if(!(s in e))throw Error(C(108,o0(t)||"Unknown",s));return te({},n,r)}function yo(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||pn,Ln=ke.current,Q(ke,t),Q(Fe,Fe.current),!0}function yh(t,e,n){var r=t.stateNode;if(!r)throw Error(C(169));n?(t=mm(t,e,Ln),r.__reactInternalMemoizedMergedChildContext=t,Y(Fe),Y(ke),Q(ke,t)):Y(Fe),Q(Fe,n)}var wt=null,cl=!1,sa=!1;function gm(t){wt===null?wt=[t]:wt.push(t)}function Sy(t){cl=!0,gm(t)}function xn(){if(!sa&&wt!==null){sa=!0;var t=0,e=V;try{var n=wt;for(V=1;t<n.length;t++){var r=n[t];do r=r(!0);while(r!==null)}wt=null,cl=!1}catch(s){throw wt!==null&&(wt=wt.slice(t+1)),zp(tc,xn),s}finally{V=e,sa=!1}}return null}var ur=[],cr=0,xo=null,wo=0,Ge=[],Ke=0,Bn=null,Et=1,St="";function Nn(t,e){ur[cr++]=wo,ur[cr++]=xo,xo=t,wo=e}function _m(t,e,n){Ge[Ke++]=Et,Ge[Ke++]=St,Ge[Ke++]=Bn,Bn=t;var r=Et;t=St;var s=32-ot(r)-1;r&=~(1<<s),n+=1;var i=32-ot(e)+s;if(30<i){var o=s-s%5;i=(r&(1<<o)-1).toString(32),r>>=o,s-=o,Et=1<<32-ot(e)+s|n<<s|r,St=i+t}else Et=1<<i|n<<s|r,St=t}function cc(t){t.return!==null&&(Nn(t,1),_m(t,1,0))}function dc(t){for(;t===xo;)xo=ur[--cr],ur[cr]=null,wo=ur[--cr],ur[cr]=null;for(;t===Bn;)Bn=Ge[--Ke],Ge[Ke]=null,St=Ge[--Ke],Ge[Ke]=null,Et=Ge[--Ke],Ge[Ke]=null}var We=null,ze=null,J=!1,rt=null;function vm(t,e){var n=Qe(5,null,null,0);n.elementType="DELETED",n.stateNode=e,n.return=t,e=t.deletions,e===null?(t.deletions=[n],t.flags|=16):e.push(n)}function xh(t,e){switch(t.tag){case 5:var n=t.type;return e=e.nodeType!==1||n.toLowerCase()!==e.nodeName.toLowerCase()?null:e,e!==null?(t.stateNode=e,We=t,ze=nn(e.firstChild),!0):!1;case 6:return e=t.pendingProps===""||e.nodeType!==3?null:e,e!==null?(t.stateNode=e,We=t,ze=null,!0):!1;case 13:return e=e.nodeType!==8?null:e,e!==null?(n=Bn!==null?{id:Et,overflow:St}:null,t.memoizedState={dehydrated:e,treeContext:n,retryLane:1073741824},n=Qe(18,null,null,0),n.stateNode=e,n.return=t,t.child=n,We=t,ze=null,!0):!1;default:return!1}}function tu(t){return(t.mode&1)!==0&&(t.flags&128)===0}function nu(t){if(J){var e=ze;if(e){var n=e;if(!xh(t,e)){if(tu(t))throw Error(C(418));e=nn(n.nextSibling);var r=We;e&&xh(t,e)?vm(r,n):(t.flags=t.flags&-4097|2,J=!1,We=t)}}else{if(tu(t))throw Error(C(418));t.flags=t.flags&-4097|2,J=!1,We=t}}}function wh(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;We=t}function Mi(t){if(t!==We)return!1;if(!J)return wh(t),J=!0,!1;var e;if((e=t.tag!==3)&&!(e=t.tag!==5)&&(e=t.type,e=e!=="head"&&e!=="body"&&!Xa(t.type,t.memoizedProps)),e&&(e=ze)){if(tu(t))throw ym(),Error(C(418));for(;e;)vm(t,e),e=nn(e.nextSibling)}if(wh(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(C(317));e:{for(t=t.nextSibling,e=0;t;){if(t.nodeType===8){var n=t.data;if(n==="/$"){if(e===0){ze=nn(t.nextSibling);break e}e--}else n!=="$"&&n!=="$!"&&n!=="$?"||e++}t=t.nextSibling}ze=null}}else ze=We?nn(t.stateNode.nextSibling):null;return!0}function ym(){for(var t=ze;t;)t=nn(t.nextSibling)}function Or(){ze=We=null,J=!1}function hc(t){rt===null?rt=[t]:rt.push(t)}var Cy=Bt.ReactCurrentBatchConfig;function as(t,e,n){if(t=n.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(n._owner){if(n=n._owner,n){if(n.tag!==1)throw Error(C(309));var r=n.stateNode}if(!r)throw Error(C(147,t));var s=r,i=""+t;return e!==null&&e.ref!==null&&typeof e.ref=="function"&&e.ref._stringRef===i?e.ref:(e=function(o){var l=s.refs;o===null?delete l[i]:l[i]=o},e._stringRef=i,e)}if(typeof t!="string")throw Error(C(284));if(!n._owner)throw Error(C(290,t))}return t}function Fi(t,e){throw t=Object.prototype.toString.call(e),Error(C(31,t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t))}function Eh(t){var e=t._init;return e(t._payload)}function xm(t){function e(m,p){if(t){var g=m.deletions;g===null?(m.deletions=[p],m.flags|=16):g.push(p)}}function n(m,p){if(!t)return null;for(;p!==null;)e(m,p),p=p.sibling;return null}function r(m,p){for(m=new Map;p!==null;)p.key!==null?m.set(p.key,p):m.set(p.index,p),p=p.sibling;return m}function s(m,p){return m=ln(m,p),m.index=0,m.sibling=null,m}function i(m,p,g){return m.index=g,t?(g=m.alternate,g!==null?(g=g.index,g<p?(m.flags|=2,p):g):(m.flags|=2,p)):(m.flags|=1048576,p)}function o(m){return t&&m.alternate===null&&(m.flags|=2),m}function l(m,p,g,x){return p===null||p.tag!==6?(p=da(g,m.mode,x),p.return=m,p):(p=s(p,g),p.return=m,p)}function a(m,p,g,x){var E=g.type;return E===rr?h(m,p,g.props.children,x,g.key):p!==null&&(p.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Wt&&Eh(E)===p.type)?(x=s(p,g.props),x.ref=as(m,p,g),x.return=m,x):(x=no(g.type,g.key,g.props,null,m.mode,x),x.ref=as(m,p,g),x.return=m,x)}function c(m,p,g,x){return p===null||p.tag!==4||p.stateNode.containerInfo!==g.containerInfo||p.stateNode.implementation!==g.implementation?(p=ha(g,m.mode,x),p.return=m,p):(p=s(p,g.children||[]),p.return=m,p)}function h(m,p,g,x,E){return p===null||p.tag!==7?(p=Mn(g,m.mode,x,E),p.return=m,p):(p=s(p,g),p.return=m,p)}function d(m,p,g){if(typeof p=="string"&&p!==""||typeof p=="number")return p=da(""+p,m.mode,g),p.return=m,p;if(typeof p=="object"&&p!==null){switch(p.$$typeof){case Ni:return g=no(p.type,p.key,p.props,null,m.mode,g),g.ref=as(m,null,p),g.return=m,g;case nr:return p=ha(p,m.mode,g),p.return=m,p;case Wt:var x=p._init;return d(m,x(p._payload),g)}if(gs(p)||rs(p))return p=Mn(p,m.mode,g,null),p.return=m,p;Fi(m,p)}return null}function f(m,p,g,x){var E=p!==null?p.key:null;if(typeof g=="string"&&g!==""||typeof g=="number")return E!==null?null:l(m,p,""+g,x);if(typeof g=="object"&&g!==null){switch(g.$$typeof){case Ni:return g.key===E?a(m,p,g,x):null;case nr:return g.key===E?c(m,p,g,x):null;case Wt:return E=g._init,f(m,p,E(g._payload),x)}if(gs(g)||rs(g))return E!==null?null:h(m,p,g,x,null);Fi(m,g)}return null}function _(m,p,g,x,E){if(typeof x=="string"&&x!==""||typeof x=="number")return m=m.get(g)||null,l(p,m,""+x,E);if(typeof x=="object"&&x!==null){switch(x.$$typeof){case Ni:return m=m.get(x.key===null?g:x.key)||null,a(p,m,x,E);case nr:return m=m.get(x.key===null?g:x.key)||null,c(p,m,x,E);case Wt:var S=x._init;return _(m,p,g,S(x._payload),E)}if(gs(x)||rs(x))return m=m.get(g)||null,h(p,m,x,E,null);Fi(p,x)}return null}function y(m,p,g,x){for(var E=null,S=null,N=p,T=p=0,L=null;N!==null&&T<g.length;T++){N.index>T?(L=N,N=null):L=N.sibling;var P=f(m,N,g[T],x);if(P===null){N===null&&(N=L);break}t&&N&&P.alternate===null&&e(m,N),p=i(P,p,T),S===null?E=P:S.sibling=P,S=P,N=L}if(T===g.length)return n(m,N),J&&Nn(m,T),E;if(N===null){for(;T<g.length;T++)N=d(m,g[T],x),N!==null&&(p=i(N,p,T),S===null?E=N:S.sibling=N,S=N);return J&&Nn(m,T),E}for(N=r(m,N);T<g.length;T++)L=_(N,m,T,g[T],x),L!==null&&(t&&L.alternate!==null&&N.delete(L.key===null?T:L.key),p=i(L,p,T),S===null?E=L:S.sibling=L,S=L);return t&&N.forEach(function(Ne){return e(m,Ne)}),J&&Nn(m,T),E}function v(m,p,g,x){var E=rs(g);if(typeof E!="function")throw Error(C(150));if(g=E.call(g),g==null)throw Error(C(151));for(var S=E=null,N=p,T=p=0,L=null,P=g.next();N!==null&&!P.done;T++,P=g.next()){N.index>T?(L=N,N=null):L=N.sibling;var Ne=f(m,N,P.value,x);if(Ne===null){N===null&&(N=L);break}t&&N&&Ne.alternate===null&&e(m,N),p=i(Ne,p,T),S===null?E=Ne:S.sibling=Ne,S=Ne,N=L}if(P.done)return n(m,N),J&&Nn(m,T),E;if(N===null){for(;!P.done;T++,P=g.next())P=d(m,P.value,x),P!==null&&(p=i(P,p,T),S===null?E=P:S.sibling=P,S=P);return J&&Nn(m,T),E}for(N=r(m,N);!P.done;T++,P=g.next())P=_(N,m,T,P.value,x),P!==null&&(t&&P.alternate!==null&&N.delete(P.key===null?T:P.key),p=i(P,p,T),S===null?E=P:S.sibling=P,S=P);return t&&N.forEach(function(Sn){return e(m,Sn)}),J&&Nn(m,T),E}function w(m,p,g,x){if(typeof g=="object"&&g!==null&&g.type===rr&&g.key===null&&(g=g.props.children),typeof g=="object"&&g!==null){switch(g.$$typeof){case Ni:e:{for(var E=g.key,S=p;S!==null;){if(S.key===E){if(E=g.type,E===rr){if(S.tag===7){n(m,S.sibling),p=s(S,g.props.children),p.return=m,m=p;break e}}else if(S.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===Wt&&Eh(E)===S.type){n(m,S.sibling),p=s(S,g.props),p.ref=as(m,S,g),p.return=m,m=p;break e}n(m,S);break}else e(m,S);S=S.sibling}g.type===rr?(p=Mn(g.props.children,m.mode,x,g.key),p.return=m,m=p):(x=no(g.type,g.key,g.props,null,m.mode,x),x.ref=as(m,p,g),x.return=m,m=x)}return o(m);case nr:e:{for(S=g.key;p!==null;){if(p.key===S)if(p.tag===4&&p.stateNode.containerInfo===g.containerInfo&&p.stateNode.implementation===g.implementation){n(m,p.sibling),p=s(p,g.children||[]),p.return=m,m=p;break e}else{n(m,p);break}else e(m,p);p=p.sibling}p=ha(g,m.mode,x),p.return=m,m=p}return o(m);case Wt:return S=g._init,w(m,p,S(g._payload),x)}if(gs(g))return y(m,p,g,x);if(rs(g))return v(m,p,g,x);Fi(m,g)}return typeof g=="string"&&g!==""||typeof g=="number"?(g=""+g,p!==null&&p.tag===6?(n(m,p.sibling),p=s(p,g),p.return=m,m=p):(n(m,p),p=da(g,m.mode,x),p.return=m,m=p),o(m)):n(m,p)}return w}var jr=xm(!0),wm=xm(!1),Eo=yn(null),So=null,dr=null,fc=null;function pc(){fc=dr=So=null}function mc(t){var e=Eo.current;Y(Eo),t._currentValue=e}function ru(t,e,n){for(;t!==null;){var r=t.alternate;if((t.childLanes&e)!==e?(t.childLanes|=e,r!==null&&(r.childLanes|=e)):r!==null&&(r.childLanes&e)!==e&&(r.childLanes|=e),t===n)break;t=t.return}}function Er(t,e){So=t,fc=dr=null,t=t.dependencies,t!==null&&t.firstContext!==null&&(t.lanes&e&&(je=!0),t.firstContext=null)}function Xe(t){var e=t._currentValue;if(fc!==t)if(t={context:t,memoizedValue:e,next:null},dr===null){if(So===null)throw Error(C(308));dr=t,So.dependencies={lanes:0,firstContext:t}}else dr=dr.next=t;return e}var Pn=null;function gc(t){Pn===null?Pn=[t]:Pn.push(t)}function Em(t,e,n,r){var s=e.interleaved;return s===null?(n.next=n,gc(e)):(n.next=s.next,s.next=n),e.interleaved=n,Ot(t,r)}function Ot(t,e){t.lanes|=e;var n=t.alternate;for(n!==null&&(n.lanes|=e),n=t,t=t.return;t!==null;)t.childLanes|=e,n=t.alternate,n!==null&&(n.childLanes|=e),n=t,t=t.return;return n.tag===3?n.stateNode:null}var Vt=!1;function _c(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Sm(t,e){t=t.updateQueue,e.updateQueue===t&&(e.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function Tt(t,e){return{eventTime:t,lane:e,tag:0,payload:null,callback:null,next:null}}function rn(t,e,n){var r=t.updateQueue;if(r===null)return null;if(r=r.shared,z&2){var s=r.pending;return s===null?e.next=e:(e.next=s.next,s.next=e),r.pending=e,Ot(t,n)}return s=r.interleaved,s===null?(e.next=e,gc(r)):(e.next=s.next,s.next=e),r.interleaved=e,Ot(t,n)}function Yi(t,e,n){if(e=e.updateQueue,e!==null&&(e=e.shared,(n&4194240)!==0)){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,nc(t,n)}}function Sh(t,e){var n=t.updateQueue,r=t.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var s=null,i=null;if(n=n.firstBaseUpdate,n!==null){do{var o={eventTime:n.eventTime,lane:n.lane,tag:n.tag,payload:n.payload,callback:n.callback,next:null};i===null?s=i=o:i=i.next=o,n=n.next}while(n!==null);i===null?s=i=e:i=i.next=e}else s=i=e;n={baseState:r.baseState,firstBaseUpdate:s,lastBaseUpdate:i,shared:r.shared,effects:r.effects},t.updateQueue=n;return}t=n.lastBaseUpdate,t===null?n.firstBaseUpdate=e:t.next=e,n.lastBaseUpdate=e}function Co(t,e,n,r){var s=t.updateQueue;Vt=!1;var i=s.firstBaseUpdate,o=s.lastBaseUpdate,l=s.shared.pending;if(l!==null){s.shared.pending=null;var a=l,c=a.next;a.next=null,o===null?i=c:o.next=c,o=a;var h=t.alternate;h!==null&&(h=h.updateQueue,l=h.lastBaseUpdate,l!==o&&(l===null?h.firstBaseUpdate=c:l.next=c,h.lastBaseUpdate=a))}if(i!==null){var d=s.baseState;o=0,h=c=a=null,l=i;do{var f=l.lane,_=l.eventTime;if((r&f)===f){h!==null&&(h=h.next={eventTime:_,lane:0,tag:l.tag,payload:l.payload,callback:l.callback,next:null});e:{var y=t,v=l;switch(f=e,_=n,v.tag){case 1:if(y=v.payload,typeof y=="function"){d=y.call(_,d,f);break e}d=y;break e;case 3:y.flags=y.flags&-65537|128;case 0:if(y=v.payload,f=typeof y=="function"?y.call(_,d,f):y,f==null)break e;d=te({},d,f);break e;case 2:Vt=!0}}l.callback!==null&&l.lane!==0&&(t.flags|=64,f=s.effects,f===null?s.effects=[l]:f.push(l))}else _={eventTime:_,lane:f,tag:l.tag,payload:l.payload,callback:l.callback,next:null},h===null?(c=h=_,a=d):h=h.next=_,o|=f;if(l=l.next,l===null){if(l=s.shared.pending,l===null)break;f=l,l=f.next,f.next=null,s.lastBaseUpdate=f,s.shared.pending=null}}while(!0);if(h===null&&(a=d),s.baseState=a,s.firstBaseUpdate=c,s.lastBaseUpdate=h,e=s.shared.interleaved,e!==null){s=e;do o|=s.lane,s=s.next;while(s!==e)}else i===null&&(s.shared.lanes=0);zn|=o,t.lanes=o,t.memoizedState=d}}function Ch(t,e,n){if(t=e.effects,e.effects=null,t!==null)for(e=0;e<t.length;e++){var r=t[e],s=r.callback;if(s!==null){if(r.callback=null,r=n,typeof s!="function")throw Error(C(191,s));s.call(r)}}}var fi={},gt=yn(fi),$s=yn(fi),Gs=yn(fi);function An(t){if(t===fi)throw Error(C(174));return t}function vc(t,e){switch(Q(Gs,e),Q($s,t),Q(gt,fi),t=e.nodeType,t){case 9:case 11:e=(e=e.documentElement)?e.namespaceURI:Fa(null,"");break;default:t=t===8?e.parentNode:e,e=t.namespaceURI||null,t=t.tagName,e=Fa(e,t)}Y(gt),Q(gt,e)}function Dr(){Y(gt),Y($s),Y(Gs)}function Cm(t){An(Gs.current);var e=An(gt.current),n=Fa(e,t.type);e!==n&&(Q($s,t),Q(gt,n))}function yc(t){$s.current===t&&(Y(gt),Y($s))}var Z=yn(0);function ko(t){for(var e=t;e!==null;){if(e.tag===13){var n=e.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||n.data==="$?"||n.data==="$!"))return e}else if(e.tag===19&&e.memoizedProps.revealOrder!==void 0){if(e.flags&128)return e}else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return null;e=e.return}e.sibling.return=e.return,e=e.sibling}return null}var ia=[];function xc(){for(var t=0;t<ia.length;t++)ia[t]._workInProgressVersionPrimary=null;ia.length=0}var Xi=Bt.ReactCurrentDispatcher,oa=Bt.ReactCurrentBatchConfig,Un=0,ee=null,ae=null,he=null,No=!1,Cs=!1,Ks=0,ky=0;function Ee(){throw Error(C(321))}function wc(t,e){if(e===null)return!1;for(var n=0;n<e.length&&n<t.length;n++)if(!ut(t[n],e[n]))return!1;return!0}function Ec(t,e,n,r,s,i){if(Un=i,ee=e,e.memoizedState=null,e.updateQueue=null,e.lanes=0,Xi.current=t===null||t.memoizedState===null?Ty:Ry,t=n(r,s),Cs){i=0;do{if(Cs=!1,Ks=0,25<=i)throw Error(C(301));i+=1,he=ae=null,e.updateQueue=null,Xi.current=Py,t=n(r,s)}while(Cs)}if(Xi.current=Io,e=ae!==null&&ae.next!==null,Un=0,he=ae=ee=null,No=!1,e)throw Error(C(300));return t}function Sc(){var t=Ks!==0;return Ks=0,t}function ht(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return he===null?ee.memoizedState=he=t:he=he.next=t,he}function Je(){if(ae===null){var t=ee.alternate;t=t!==null?t.memoizedState:null}else t=ae.next;var e=he===null?ee.memoizedState:he.next;if(e!==null)he=e,ae=t;else{if(t===null)throw Error(C(310));ae=t,t={memoizedState:ae.memoizedState,baseState:ae.baseState,baseQueue:ae.baseQueue,queue:ae.queue,next:null},he===null?ee.memoizedState=he=t:he=he.next=t}return he}function Qs(t,e){return typeof e=="function"?e(t):e}function la(t){var e=Je(),n=e.queue;if(n===null)throw Error(C(311));n.lastRenderedReducer=t;var r=ae,s=r.baseQueue,i=n.pending;if(i!==null){if(s!==null){var o=s.next;s.next=i.next,i.next=o}r.baseQueue=s=i,n.pending=null}if(s!==null){i=s.next,r=r.baseState;var l=o=null,a=null,c=i;do{var h=c.lane;if((Un&h)===h)a!==null&&(a=a.next={lane:0,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null}),r=c.hasEagerState?c.eagerState:t(r,c.action);else{var d={lane:h,action:c.action,hasEagerState:c.hasEagerState,eagerState:c.eagerState,next:null};a===null?(l=a=d,o=r):a=a.next=d,ee.lanes|=h,zn|=h}c=c.next}while(c!==null&&c!==i);a===null?o=r:a.next=l,ut(r,e.memoizedState)||(je=!0),e.memoizedState=r,e.baseState=o,e.baseQueue=a,n.lastRenderedState=r}if(t=n.interleaved,t!==null){s=t;do i=s.lane,ee.lanes|=i,zn|=i,s=s.next;while(s!==t)}else s===null&&(n.lanes=0);return[e.memoizedState,n.dispatch]}function aa(t){var e=Je(),n=e.queue;if(n===null)throw Error(C(311));n.lastRenderedReducer=t;var r=n.dispatch,s=n.pending,i=e.memoizedState;if(s!==null){n.pending=null;var o=s=s.next;do i=t(i,o.action),o=o.next;while(o!==s);ut(i,e.memoizedState)||(je=!0),e.memoizedState=i,e.baseQueue===null&&(e.baseState=i),n.lastRenderedState=i}return[i,r]}function km(){}function Nm(t,e){var n=ee,r=Je(),s=e(),i=!ut(r.memoizedState,s);if(i&&(r.memoizedState=s,je=!0),r=r.queue,Cc(Tm.bind(null,n,r,t),[t]),r.getSnapshot!==e||i||he!==null&&he.memoizedState.tag&1){if(n.flags|=2048,qs(9,bm.bind(null,n,r,s,e),void 0,null),ge===null)throw Error(C(349));Un&30||Im(n,e,s)}return s}function Im(t,e,n){t.flags|=16384,t={getSnapshot:e,value:n},e=ee.updateQueue,e===null?(e={lastEffect:null,stores:null},ee.updateQueue=e,e.stores=[t]):(n=e.stores,n===null?e.stores=[t]:n.push(t))}function bm(t,e,n,r){e.value=n,e.getSnapshot=r,Rm(e)&&Pm(t)}function Tm(t,e,n){return n(function(){Rm(e)&&Pm(t)})}function Rm(t){var e=t.getSnapshot;t=t.value;try{var n=e();return!ut(t,n)}catch{return!0}}function Pm(t){var e=Ot(t,1);e!==null&&lt(e,t,1,-1)}function kh(t){var e=ht();return typeof t=="function"&&(t=t()),e.memoizedState=e.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:Qs,lastRenderedState:t},e.queue=t,t=t.dispatch=by.bind(null,ee,t),[e.memoizedState,t]}function qs(t,e,n,r){return t={tag:t,create:e,destroy:n,deps:r,next:null},e=ee.updateQueue,e===null?(e={lastEffect:null,stores:null},ee.updateQueue=e,e.lastEffect=t.next=t):(n=e.lastEffect,n===null?e.lastEffect=t.next=t:(r=n.next,n.next=t,t.next=r,e.lastEffect=t)),t}function Am(){return Je().memoizedState}function Ji(t,e,n,r){var s=ht();ee.flags|=t,s.memoizedState=qs(1|e,n,void 0,r===void 0?null:r)}function dl(t,e,n,r){var s=Je();r=r===void 0?null:r;var i=void 0;if(ae!==null){var o=ae.memoizedState;if(i=o.destroy,r!==null&&wc(r,o.deps)){s.memoizedState=qs(e,n,i,r);return}}ee.flags|=t,s.memoizedState=qs(1|e,n,i,r)}function Nh(t,e){return Ji(8390656,8,t,e)}function Cc(t,e){return dl(2048,8,t,e)}function Om(t,e){return dl(4,2,t,e)}function jm(t,e){return dl(4,4,t,e)}function Dm(t,e){if(typeof e=="function")return t=t(),e(t),function(){e(null)};if(e!=null)return t=t(),e.current=t,function(){e.current=null}}function Mm(t,e,n){return n=n!=null?n.concat([t]):null,dl(4,4,Dm.bind(null,e,t),n)}function kc(){}function Fm(t,e){var n=Je();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&wc(e,r[1])?r[0]:(n.memoizedState=[t,e],t)}function Lm(t,e){var n=Je();e=e===void 0?null:e;var r=n.memoizedState;return r!==null&&e!==null&&wc(e,r[1])?r[0]:(t=t(),n.memoizedState=[t,e],t)}function Bm(t,e,n){return Un&21?(ut(n,e)||(n=Hp(),ee.lanes|=n,zn|=n,t.baseState=!0),e):(t.baseState&&(t.baseState=!1,je=!0),t.memoizedState=n)}function Ny(t,e){var n=V;V=n!==0&&4>n?n:4,t(!0);var r=oa.transition;oa.transition={};try{t(!1),e()}finally{V=n,oa.transition=r}}function Um(){return Je().memoizedState}function Iy(t,e,n){var r=on(t);if(n={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null},zm(t))Wm(e,n);else if(n=Em(t,e,n,r),n!==null){var s=be();lt(n,t,r,s),Vm(n,e,r)}}function by(t,e,n){var r=on(t),s={lane:r,action:n,hasEagerState:!1,eagerState:null,next:null};if(zm(t))Wm(e,s);else{var i=t.alternate;if(t.lanes===0&&(i===null||i.lanes===0)&&(i=e.lastRenderedReducer,i!==null))try{var o=e.lastRenderedState,l=i(o,n);if(s.hasEagerState=!0,s.eagerState=l,ut(l,o)){var a=e.interleaved;a===null?(s.next=s,gc(e)):(s.next=a.next,a.next=s),e.interleaved=s;return}}catch{}finally{}n=Em(t,e,s,r),n!==null&&(s=be(),lt(n,t,r,s),Vm(n,e,r))}}function zm(t){var e=t.alternate;return t===ee||e!==null&&e===ee}function Wm(t,e){Cs=No=!0;var n=t.pending;n===null?e.next=e:(e.next=n.next,n.next=e),t.pending=e}function Vm(t,e,n){if(n&4194240){var r=e.lanes;r&=t.pendingLanes,n|=r,e.lanes=n,nc(t,n)}}var Io={readContext:Xe,useCallback:Ee,useContext:Ee,useEffect:Ee,useImperativeHandle:Ee,useInsertionEffect:Ee,useLayoutEffect:Ee,useMemo:Ee,useReducer:Ee,useRef:Ee,useState:Ee,useDebugValue:Ee,useDeferredValue:Ee,useTransition:Ee,useMutableSource:Ee,useSyncExternalStore:Ee,useId:Ee,unstable_isNewReconciler:!1},Ty={readContext:Xe,useCallback:function(t,e){return ht().memoizedState=[t,e===void 0?null:e],t},useContext:Xe,useEffect:Nh,useImperativeHandle:function(t,e,n){return n=n!=null?n.concat([t]):null,Ji(4194308,4,Dm.bind(null,e,t),n)},useLayoutEffect:function(t,e){return Ji(4194308,4,t,e)},useInsertionEffect:function(t,e){return Ji(4,2,t,e)},useMemo:function(t,e){var n=ht();return e=e===void 0?null:e,t=t(),n.memoizedState=[t,e],t},useReducer:function(t,e,n){var r=ht();return e=n!==void 0?n(e):e,r.memoizedState=r.baseState=e,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:e},r.queue=t,t=t.dispatch=Iy.bind(null,ee,t),[r.memoizedState,t]},useRef:function(t){var e=ht();return t={current:t},e.memoizedState=t},useState:kh,useDebugValue:kc,useDeferredValue:function(t){return ht().memoizedState=t},useTransition:function(){var t=kh(!1),e=t[0];return t=Ny.bind(null,t[1]),ht().memoizedState=t,[e,t]},useMutableSource:function(){},useSyncExternalStore:function(t,e,n){var r=ee,s=ht();if(J){if(n===void 0)throw Error(C(407));n=n()}else{if(n=e(),ge===null)throw Error(C(349));Un&30||Im(r,e,n)}s.memoizedState=n;var i={value:n,getSnapshot:e};return s.queue=i,Nh(Tm.bind(null,r,i,t),[t]),r.flags|=2048,qs(9,bm.bind(null,r,i,n,e),void 0,null),n},useId:function(){var t=ht(),e=ge.identifierPrefix;if(J){var n=St,r=Et;n=(r&~(1<<32-ot(r)-1)).toString(32)+n,e=":"+e+"R"+n,n=Ks++,0<n&&(e+="H"+n.toString(32)),e+=":"}else n=ky++,e=":"+e+"r"+n.toString(32)+":";return t.memoizedState=e},unstable_isNewReconciler:!1},Ry={readContext:Xe,useCallback:Fm,useContext:Xe,useEffect:Cc,useImperativeHandle:Mm,useInsertionEffect:Om,useLayoutEffect:jm,useMemo:Lm,useReducer:la,useRef:Am,useState:function(){return la(Qs)},useDebugValue:kc,useDeferredValue:function(t){var e=Je();return Bm(e,ae.memoizedState,t)},useTransition:function(){var t=la(Qs)[0],e=Je().memoizedState;return[t,e]},useMutableSource:km,useSyncExternalStore:Nm,useId:Um,unstable_isNewReconciler:!1},Py={readContext:Xe,useCallback:Fm,useContext:Xe,useEffect:Cc,useImperativeHandle:Mm,useInsertionEffect:Om,useLayoutEffect:jm,useMemo:Lm,useReducer:aa,useRef:Am,useState:function(){return aa(Qs)},useDebugValue:kc,useDeferredValue:function(t){var e=Je();return ae===null?e.memoizedState=t:Bm(e,ae.memoizedState,t)},useTransition:function(){var t=aa(Qs)[0],e=Je().memoizedState;return[t,e]},useMutableSource:km,useSyncExternalStore:Nm,useId:Um,unstable_isNewReconciler:!1};function tt(t,e){if(t&&t.defaultProps){e=te({},e),t=t.defaultProps;for(var n in t)e[n]===void 0&&(e[n]=t[n]);return e}return e}function su(t,e,n,r){e=t.memoizedState,n=n(r,e),n=n==null?e:te({},e,n),t.memoizedState=n,t.lanes===0&&(t.updateQueue.baseState=n)}var hl={isMounted:function(t){return(t=t._reactInternals)?Yn(t)===t:!1},enqueueSetState:function(t,e,n){t=t._reactInternals;var r=be(),s=on(t),i=Tt(r,s);i.payload=e,n!=null&&(i.callback=n),e=rn(t,i,s),e!==null&&(lt(e,t,s,r),Yi(e,t,s))},enqueueReplaceState:function(t,e,n){t=t._reactInternals;var r=be(),s=on(t),i=Tt(r,s);i.tag=1,i.payload=e,n!=null&&(i.callback=n),e=rn(t,i,s),e!==null&&(lt(e,t,s,r),Yi(e,t,s))},enqueueForceUpdate:function(t,e){t=t._reactInternals;var n=be(),r=on(t),s=Tt(n,r);s.tag=2,e!=null&&(s.callback=e),e=rn(t,s,r),e!==null&&(lt(e,t,r,n),Yi(e,t,r))}};function Ih(t,e,n,r,s,i,o){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(r,i,o):e.prototype&&e.prototype.isPureReactComponent?!zs(n,r)||!zs(s,i):!0}function Hm(t,e,n){var r=!1,s=pn,i=e.contextType;return typeof i=="object"&&i!==null?i=Xe(i):(s=Le(e)?Ln:ke.current,r=e.contextTypes,i=(r=r!=null)?Ar(t,s):pn),e=new e(n,i),t.memoizedState=e.state!==null&&e.state!==void 0?e.state:null,e.updater=hl,t.stateNode=e,e._reactInternals=t,r&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=s,t.__reactInternalMemoizedMaskedChildContext=i),e}function bh(t,e,n,r){t=e.state,typeof e.componentWillReceiveProps=="function"&&e.componentWillReceiveProps(n,r),typeof e.UNSAFE_componentWillReceiveProps=="function"&&e.UNSAFE_componentWillReceiveProps(n,r),e.state!==t&&hl.enqueueReplaceState(e,e.state,null)}function iu(t,e,n,r){var s=t.stateNode;s.props=n,s.state=t.memoizedState,s.refs={},_c(t);var i=e.contextType;typeof i=="object"&&i!==null?s.context=Xe(i):(i=Le(e)?Ln:ke.current,s.context=Ar(t,i)),s.state=t.memoizedState,i=e.getDerivedStateFromProps,typeof i=="function"&&(su(t,e,i,n),s.state=t.memoizedState),typeof e.getDerivedStateFromProps=="function"||typeof s.getSnapshotBeforeUpdate=="function"||typeof s.UNSAFE_componentWillMount!="function"&&typeof s.componentWillMount!="function"||(e=s.state,typeof s.componentWillMount=="function"&&s.componentWillMount(),typeof s.UNSAFE_componentWillMount=="function"&&s.UNSAFE_componentWillMount(),e!==s.state&&hl.enqueueReplaceState(s,s.state,null),Co(t,n,s,r),s.state=t.memoizedState),typeof s.componentDidMount=="function"&&(t.flags|=4194308)}function Mr(t,e){try{var n="",r=e;do n+=i0(r),r=r.return;while(r);var s=n}catch(i){s=`
Error generating stack: `+i.message+`
`+i.stack}return{value:t,source:e,stack:s,digest:null}}function ua(t,e,n){return{value:t,source:null,stack:n??null,digest:e??null}}function ou(t,e){try{console.error(e.value)}catch(n){setTimeout(function(){throw n})}}var Ay=typeof WeakMap=="function"?WeakMap:Map;function $m(t,e,n){n=Tt(-1,n),n.tag=3,n.payload={element:null};var r=e.value;return n.callback=function(){To||(To=!0,gu=r),ou(t,e)},n}function Gm(t,e,n){n=Tt(-1,n),n.tag=3;var r=t.type.getDerivedStateFromError;if(typeof r=="function"){var s=e.value;n.payload=function(){return r(s)},n.callback=function(){ou(t,e)}}var i=t.stateNode;return i!==null&&typeof i.componentDidCatch=="function"&&(n.callback=function(){ou(t,e),typeof r!="function"&&(sn===null?sn=new Set([this]):sn.add(this));var o=e.stack;this.componentDidCatch(e.value,{componentStack:o!==null?o:""})}),n}function Th(t,e,n){var r=t.pingCache;if(r===null){r=t.pingCache=new Ay;var s=new Set;r.set(e,s)}else s=r.get(e),s===void 0&&(s=new Set,r.set(e,s));s.has(n)||(s.add(n),t=Gy.bind(null,t,e,n),e.then(t,t))}function Rh(t){do{var e;if((e=t.tag===13)&&(e=t.memoizedState,e=e!==null?e.dehydrated!==null:!0),e)return t;t=t.return}while(t!==null);return null}function Ph(t,e,n,r,s){return t.mode&1?(t.flags|=65536,t.lanes=s,t):(t===e?t.flags|=65536:(t.flags|=128,n.flags|=131072,n.flags&=-52805,n.tag===1&&(n.alternate===null?n.tag=17:(e=Tt(-1,1),e.tag=2,rn(n,e,1))),n.lanes|=1),t)}var Oy=Bt.ReactCurrentOwner,je=!1;function Ie(t,e,n,r){e.child=t===null?wm(e,null,n,r):jr(e,t.child,n,r)}function Ah(t,e,n,r,s){n=n.render;var i=e.ref;return Er(e,s),r=Ec(t,e,n,r,i,s),n=Sc(),t!==null&&!je?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,jt(t,e,s)):(J&&n&&cc(e),e.flags|=1,Ie(t,e,r,s),e.child)}function Oh(t,e,n,r,s){if(t===null){var i=n.type;return typeof i=="function"&&!Oc(i)&&i.defaultProps===void 0&&n.compare===null&&n.defaultProps===void 0?(e.tag=15,e.type=i,Km(t,e,i,r,s)):(t=no(n.type,null,r,e,e.mode,s),t.ref=e.ref,t.return=e,e.child=t)}if(i=t.child,!(t.lanes&s)){var o=i.memoizedProps;if(n=n.compare,n=n!==null?n:zs,n(o,r)&&t.ref===e.ref)return jt(t,e,s)}return e.flags|=1,t=ln(i,r),t.ref=e.ref,t.return=e,e.child=t}function Km(t,e,n,r,s){if(t!==null){var i=t.memoizedProps;if(zs(i,r)&&t.ref===e.ref)if(je=!1,e.pendingProps=r=i,(t.lanes&s)!==0)t.flags&131072&&(je=!0);else return e.lanes=t.lanes,jt(t,e,s)}return lu(t,e,n,r,s)}function Qm(t,e,n){var r=e.pendingProps,s=r.children,i=t!==null?t.memoizedState:null;if(r.mode==="hidden")if(!(e.mode&1))e.memoizedState={baseLanes:0,cachePool:null,transitions:null},Q(fr,Ue),Ue|=n;else{if(!(n&1073741824))return t=i!==null?i.baseLanes|n:n,e.lanes=e.childLanes=1073741824,e.memoizedState={baseLanes:t,cachePool:null,transitions:null},e.updateQueue=null,Q(fr,Ue),Ue|=t,null;e.memoizedState={baseLanes:0,cachePool:null,transitions:null},r=i!==null?i.baseLanes:n,Q(fr,Ue),Ue|=r}else i!==null?(r=i.baseLanes|n,e.memoizedState=null):r=n,Q(fr,Ue),Ue|=r;return Ie(t,e,s,n),e.child}function qm(t,e){var n=e.ref;(t===null&&n!==null||t!==null&&t.ref!==n)&&(e.flags|=512,e.flags|=2097152)}function lu(t,e,n,r,s){var i=Le(n)?Ln:ke.current;return i=Ar(e,i),Er(e,s),n=Ec(t,e,n,r,i,s),r=Sc(),t!==null&&!je?(e.updateQueue=t.updateQueue,e.flags&=-2053,t.lanes&=~s,jt(t,e,s)):(J&&r&&cc(e),e.flags|=1,Ie(t,e,n,s),e.child)}function jh(t,e,n,r,s){if(Le(n)){var i=!0;yo(e)}else i=!1;if(Er(e,s),e.stateNode===null)Zi(t,e),Hm(e,n,r),iu(e,n,r,s),r=!0;else if(t===null){var o=e.stateNode,l=e.memoizedProps;o.props=l;var a=o.context,c=n.contextType;typeof c=="object"&&c!==null?c=Xe(c):(c=Le(n)?Ln:ke.current,c=Ar(e,c));var h=n.getDerivedStateFromProps,d=typeof h=="function"||typeof o.getSnapshotBeforeUpdate=="function";d||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==r||a!==c)&&bh(e,o,r,c),Vt=!1;var f=e.memoizedState;o.state=f,Co(e,r,o,s),a=e.memoizedState,l!==r||f!==a||Fe.current||Vt?(typeof h=="function"&&(su(e,n,h,r),a=e.memoizedState),(l=Vt||Ih(e,n,l,r,f,a,c))?(d||typeof o.UNSAFE_componentWillMount!="function"&&typeof o.componentWillMount!="function"||(typeof o.componentWillMount=="function"&&o.componentWillMount(),typeof o.UNSAFE_componentWillMount=="function"&&o.UNSAFE_componentWillMount()),typeof o.componentDidMount=="function"&&(e.flags|=4194308)):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),e.memoizedProps=r,e.memoizedState=a),o.props=r,o.state=a,o.context=c,r=l):(typeof o.componentDidMount=="function"&&(e.flags|=4194308),r=!1)}else{o=e.stateNode,Sm(t,e),l=e.memoizedProps,c=e.type===e.elementType?l:tt(e.type,l),o.props=c,d=e.pendingProps,f=o.context,a=n.contextType,typeof a=="object"&&a!==null?a=Xe(a):(a=Le(n)?Ln:ke.current,a=Ar(e,a));var _=n.getDerivedStateFromProps;(h=typeof _=="function"||typeof o.getSnapshotBeforeUpdate=="function")||typeof o.UNSAFE_componentWillReceiveProps!="function"&&typeof o.componentWillReceiveProps!="function"||(l!==d||f!==a)&&bh(e,o,r,a),Vt=!1,f=e.memoizedState,o.state=f,Co(e,r,o,s);var y=e.memoizedState;l!==d||f!==y||Fe.current||Vt?(typeof _=="function"&&(su(e,n,_,r),y=e.memoizedState),(c=Vt||Ih(e,n,c,r,f,y,a)||!1)?(h||typeof o.UNSAFE_componentWillUpdate!="function"&&typeof o.componentWillUpdate!="function"||(typeof o.componentWillUpdate=="function"&&o.componentWillUpdate(r,y,a),typeof o.UNSAFE_componentWillUpdate=="function"&&o.UNSAFE_componentWillUpdate(r,y,a)),typeof o.componentDidUpdate=="function"&&(e.flags|=4),typeof o.getSnapshotBeforeUpdate=="function"&&(e.flags|=1024)):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),e.memoizedProps=r,e.memoizedState=y),o.props=r,o.state=y,o.context=a,r=c):(typeof o.componentDidUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=4),typeof o.getSnapshotBeforeUpdate!="function"||l===t.memoizedProps&&f===t.memoizedState||(e.flags|=1024),r=!1)}return au(t,e,n,r,i,s)}function au(t,e,n,r,s,i){qm(t,e);var o=(e.flags&128)!==0;if(!r&&!o)return s&&yh(e,n,!1),jt(t,e,i);r=e.stateNode,Oy.current=e;var l=o&&typeof n.getDerivedStateFromError!="function"?null:r.render();return e.flags|=1,t!==null&&o?(e.child=jr(e,t.child,null,i),e.child=jr(e,null,l,i)):Ie(t,e,l,i),e.memoizedState=r.state,s&&yh(e,n,!0),e.child}function Ym(t){var e=t.stateNode;e.pendingContext?vh(t,e.pendingContext,e.pendingContext!==e.context):e.context&&vh(t,e.context,!1),vc(t,e.containerInfo)}function Dh(t,e,n,r,s){return Or(),hc(s),e.flags|=256,Ie(t,e,n,r),e.child}var uu={dehydrated:null,treeContext:null,retryLane:0};function cu(t){return{baseLanes:t,cachePool:null,transitions:null}}function Xm(t,e,n){var r=e.pendingProps,s=Z.current,i=!1,o=(e.flags&128)!==0,l;if((l=o)||(l=t!==null&&t.memoizedState===null?!1:(s&2)!==0),l?(i=!0,e.flags&=-129):(t===null||t.memoizedState!==null)&&(s|=1),Q(Z,s&1),t===null)return nu(e),t=e.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?(e.mode&1?t.data==="$!"?e.lanes=8:e.lanes=1073741824:e.lanes=1,null):(o=r.children,t=r.fallback,i?(r=e.mode,i=e.child,o={mode:"hidden",children:o},!(r&1)&&i!==null?(i.childLanes=0,i.pendingProps=o):i=ml(o,r,0,null),t=Mn(t,r,n,null),i.return=e,t.return=e,i.sibling=t,e.child=i,e.child.memoizedState=cu(n),e.memoizedState=uu,t):Nc(e,o));if(s=t.memoizedState,s!==null&&(l=s.dehydrated,l!==null))return jy(t,e,o,r,l,s,n);if(i){i=r.fallback,o=e.mode,s=t.child,l=s.sibling;var a={mode:"hidden",children:r.children};return!(o&1)&&e.child!==s?(r=e.child,r.childLanes=0,r.pendingProps=a,e.deletions=null):(r=ln(s,a),r.subtreeFlags=s.subtreeFlags&14680064),l!==null?i=ln(l,i):(i=Mn(i,o,n,null),i.flags|=2),i.return=e,r.return=e,r.sibling=i,e.child=r,r=i,i=e.child,o=t.child.memoizedState,o=o===null?cu(n):{baseLanes:o.baseLanes|n,cachePool:null,transitions:o.transitions},i.memoizedState=o,i.childLanes=t.childLanes&~n,e.memoizedState=uu,r}return i=t.child,t=i.sibling,r=ln(i,{mode:"visible",children:r.children}),!(e.mode&1)&&(r.lanes=n),r.return=e,r.sibling=null,t!==null&&(n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)),e.child=r,e.memoizedState=null,r}function Nc(t,e){return e=ml({mode:"visible",children:e},t.mode,0,null),e.return=t,t.child=e}function Li(t,e,n,r){return r!==null&&hc(r),jr(e,t.child,null,n),t=Nc(e,e.pendingProps.children),t.flags|=2,e.memoizedState=null,t}function jy(t,e,n,r,s,i,o){if(n)return e.flags&256?(e.flags&=-257,r=ua(Error(C(422))),Li(t,e,o,r)):e.memoizedState!==null?(e.child=t.child,e.flags|=128,null):(i=r.fallback,s=e.mode,r=ml({mode:"visible",children:r.children},s,0,null),i=Mn(i,s,o,null),i.flags|=2,r.return=e,i.return=e,r.sibling=i,e.child=r,e.mode&1&&jr(e,t.child,null,o),e.child.memoizedState=cu(o),e.memoizedState=uu,i);if(!(e.mode&1))return Li(t,e,o,null);if(s.data==="$!"){if(r=s.nextSibling&&s.nextSibling.dataset,r)var l=r.dgst;return r=l,i=Error(C(419)),r=ua(i,r,void 0),Li(t,e,o,r)}if(l=(o&t.childLanes)!==0,je||l){if(r=ge,r!==null){switch(o&-o){case 4:s=2;break;case 16:s=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:s=32;break;case 536870912:s=268435456;break;default:s=0}s=s&(r.suspendedLanes|o)?0:s,s!==0&&s!==i.retryLane&&(i.retryLane=s,Ot(t,s),lt(r,t,s,-1))}return Ac(),r=ua(Error(C(421))),Li(t,e,o,r)}return s.data==="$?"?(e.flags|=128,e.child=t.child,e=Ky.bind(null,t),s._reactRetry=e,null):(t=i.treeContext,ze=nn(s.nextSibling),We=e,J=!0,rt=null,t!==null&&(Ge[Ke++]=Et,Ge[Ke++]=St,Ge[Ke++]=Bn,Et=t.id,St=t.overflow,Bn=e),e=Nc(e,r.children),e.flags|=4096,e)}function Mh(t,e,n){t.lanes|=e;var r=t.alternate;r!==null&&(r.lanes|=e),ru(t.return,e,n)}function ca(t,e,n,r,s){var i=t.memoizedState;i===null?t.memoizedState={isBackwards:e,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:s}:(i.isBackwards=e,i.rendering=null,i.renderingStartTime=0,i.last=r,i.tail=n,i.tailMode=s)}function Jm(t,e,n){var r=e.pendingProps,s=r.revealOrder,i=r.tail;if(Ie(t,e,r.children,n),r=Z.current,r&2)r=r&1|2,e.flags|=128;else{if(t!==null&&t.flags&128)e:for(t=e.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&Mh(t,n,e);else if(t.tag===19)Mh(t,n,e);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break e;for(;t.sibling===null;){if(t.return===null||t.return===e)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}r&=1}if(Q(Z,r),!(e.mode&1))e.memoizedState=null;else switch(s){case"forwards":for(n=e.child,s=null;n!==null;)t=n.alternate,t!==null&&ko(t)===null&&(s=n),n=n.sibling;n=s,n===null?(s=e.child,e.child=null):(s=n.sibling,n.sibling=null),ca(e,!1,s,n,i);break;case"backwards":for(n=null,s=e.child,e.child=null;s!==null;){if(t=s.alternate,t!==null&&ko(t)===null){e.child=s;break}t=s.sibling,s.sibling=n,n=s,s=t}ca(e,!0,n,null,i);break;case"together":ca(e,!1,null,null,void 0);break;default:e.memoizedState=null}return e.child}function Zi(t,e){!(e.mode&1)&&t!==null&&(t.alternate=null,e.alternate=null,e.flags|=2)}function jt(t,e,n){if(t!==null&&(e.dependencies=t.dependencies),zn|=e.lanes,!(n&e.childLanes))return null;if(t!==null&&e.child!==t.child)throw Error(C(153));if(e.child!==null){for(t=e.child,n=ln(t,t.pendingProps),e.child=n,n.return=e;t.sibling!==null;)t=t.sibling,n=n.sibling=ln(t,t.pendingProps),n.return=e;n.sibling=null}return e.child}function Dy(t,e,n){switch(e.tag){case 3:Ym(e),Or();break;case 5:Cm(e);break;case 1:Le(e.type)&&yo(e);break;case 4:vc(e,e.stateNode.containerInfo);break;case 10:var r=e.type._context,s=e.memoizedProps.value;Q(Eo,r._currentValue),r._currentValue=s;break;case 13:if(r=e.memoizedState,r!==null)return r.dehydrated!==null?(Q(Z,Z.current&1),e.flags|=128,null):n&e.child.childLanes?Xm(t,e,n):(Q(Z,Z.current&1),t=jt(t,e,n),t!==null?t.sibling:null);Q(Z,Z.current&1);break;case 19:if(r=(n&e.childLanes)!==0,t.flags&128){if(r)return Jm(t,e,n);e.flags|=128}if(s=e.memoizedState,s!==null&&(s.rendering=null,s.tail=null,s.lastEffect=null),Q(Z,Z.current),r)break;return null;case 22:case 23:return e.lanes=0,Qm(t,e,n)}return jt(t,e,n)}var Zm,du,eg,tg;Zm=function(t,e){for(var n=e.child;n!==null;){if(n.tag===5||n.tag===6)t.appendChild(n.stateNode);else if(n.tag!==4&&n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return;n=n.return}n.sibling.return=n.return,n=n.sibling}};du=function(){};eg=function(t,e,n,r){var s=t.memoizedProps;if(s!==r){t=e.stateNode,An(gt.current);var i=null;switch(n){case"input":s=Oa(t,s),r=Oa(t,r),i=[];break;case"select":s=te({},s,{value:void 0}),r=te({},r,{value:void 0}),i=[];break;case"textarea":s=Ma(t,s),r=Ma(t,r),i=[];break;default:typeof s.onClick!="function"&&typeof r.onClick=="function"&&(t.onclick=_o)}La(n,r);var o;n=null;for(c in s)if(!r.hasOwnProperty(c)&&s.hasOwnProperty(c)&&s[c]!=null)if(c==="style"){var l=s[c];for(o in l)l.hasOwnProperty(o)&&(n||(n={}),n[o]="")}else c!=="dangerouslySetInnerHTML"&&c!=="children"&&c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&c!=="autoFocus"&&(js.hasOwnProperty(c)?i||(i=[]):(i=i||[]).push(c,null));for(c in r){var a=r[c];if(l=s!=null?s[c]:void 0,r.hasOwnProperty(c)&&a!==l&&(a!=null||l!=null))if(c==="style")if(l){for(o in l)!l.hasOwnProperty(o)||a&&a.hasOwnProperty(o)||(n||(n={}),n[o]="");for(o in a)a.hasOwnProperty(o)&&l[o]!==a[o]&&(n||(n={}),n[o]=a[o])}else n||(i||(i=[]),i.push(c,n)),n=a;else c==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,l=l?l.__html:void 0,a!=null&&l!==a&&(i=i||[]).push(c,a)):c==="children"?typeof a!="string"&&typeof a!="number"||(i=i||[]).push(c,""+a):c!=="suppressContentEditableWarning"&&c!=="suppressHydrationWarning"&&(js.hasOwnProperty(c)?(a!=null&&c==="onScroll"&&q("scroll",t),i||l===a||(i=[])):(i=i||[]).push(c,a))}n&&(i=i||[]).push("style",n);var c=i;(e.updateQueue=c)&&(e.flags|=4)}};tg=function(t,e,n,r){n!==r&&(e.flags|=4)};function us(t,e){if(!J)switch(t.tailMode){case"hidden":e=t.tail;for(var n=null;e!==null;)e.alternate!==null&&(n=e),e=e.sibling;n===null?t.tail=null:n.sibling=null;break;case"collapsed":n=t.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e||t.tail===null?t.tail=null:t.tail.sibling=null:r.sibling=null}}function Se(t){var e=t.alternate!==null&&t.alternate.child===t.child,n=0,r=0;if(e)for(var s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags&14680064,r|=s.flags&14680064,s.return=t,s=s.sibling;else for(s=t.child;s!==null;)n|=s.lanes|s.childLanes,r|=s.subtreeFlags,r|=s.flags,s.return=t,s=s.sibling;return t.subtreeFlags|=r,t.childLanes=n,e}function My(t,e,n){var r=e.pendingProps;switch(dc(e),e.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return Se(e),null;case 1:return Le(e.type)&&vo(),Se(e),null;case 3:return r=e.stateNode,Dr(),Y(Fe),Y(ke),xc(),r.pendingContext&&(r.context=r.pendingContext,r.pendingContext=null),(t===null||t.child===null)&&(Mi(e)?e.flags|=4:t===null||t.memoizedState.isDehydrated&&!(e.flags&256)||(e.flags|=1024,rt!==null&&(yu(rt),rt=null))),du(t,e),Se(e),null;case 5:yc(e);var s=An(Gs.current);if(n=e.type,t!==null&&e.stateNode!=null)eg(t,e,n,r,s),t.ref!==e.ref&&(e.flags|=512,e.flags|=2097152);else{if(!r){if(e.stateNode===null)throw Error(C(166));return Se(e),null}if(t=An(gt.current),Mi(e)){r=e.stateNode,n=e.type;var i=e.memoizedProps;switch(r[ft]=e,r[Hs]=i,t=(e.mode&1)!==0,n){case"dialog":q("cancel",r),q("close",r);break;case"iframe":case"object":case"embed":q("load",r);break;case"video":case"audio":for(s=0;s<vs.length;s++)q(vs[s],r);break;case"source":q("error",r);break;case"img":case"image":case"link":q("error",r),q("load",r);break;case"details":q("toggle",r);break;case"input":$d(r,i),q("invalid",r);break;case"select":r._wrapperState={wasMultiple:!!i.multiple},q("invalid",r);break;case"textarea":Kd(r,i),q("invalid",r)}La(n,i),s=null;for(var o in i)if(i.hasOwnProperty(o)){var l=i[o];o==="children"?typeof l=="string"?r.textContent!==l&&(i.suppressHydrationWarning!==!0&&Di(r.textContent,l,t),s=["children",l]):typeof l=="number"&&r.textContent!==""+l&&(i.suppressHydrationWarning!==!0&&Di(r.textContent,l,t),s=["children",""+l]):js.hasOwnProperty(o)&&l!=null&&o==="onScroll"&&q("scroll",r)}switch(n){case"input":Ii(r),Gd(r,i,!0);break;case"textarea":Ii(r),Qd(r);break;case"select":case"option":break;default:typeof i.onClick=="function"&&(r.onclick=_o)}r=s,e.updateQueue=r,r!==null&&(e.flags|=4)}else{o=s.nodeType===9?s:s.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=Tp(n)),t==="http://www.w3.org/1999/xhtml"?n==="script"?(t=o.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof r.is=="string"?t=o.createElement(n,{is:r.is}):(t=o.createElement(n),n==="select"&&(o=t,r.multiple?o.multiple=!0:r.size&&(o.size=r.size))):t=o.createElementNS(t,n),t[ft]=e,t[Hs]=r,Zm(t,e,!1,!1),e.stateNode=t;e:{switch(o=Ba(n,r),n){case"dialog":q("cancel",t),q("close",t),s=r;break;case"iframe":case"object":case"embed":q("load",t),s=r;break;case"video":case"audio":for(s=0;s<vs.length;s++)q(vs[s],t);s=r;break;case"source":q("error",t),s=r;break;case"img":case"image":case"link":q("error",t),q("load",t),s=r;break;case"details":q("toggle",t),s=r;break;case"input":$d(t,r),s=Oa(t,r),q("invalid",t);break;case"option":s=r;break;case"select":t._wrapperState={wasMultiple:!!r.multiple},s=te({},r,{value:void 0}),q("invalid",t);break;case"textarea":Kd(t,r),s=Ma(t,r),q("invalid",t);break;default:s=r}La(n,s),l=s;for(i in l)if(l.hasOwnProperty(i)){var a=l[i];i==="style"?Ap(t,a):i==="dangerouslySetInnerHTML"?(a=a?a.__html:void 0,a!=null&&Rp(t,a)):i==="children"?typeof a=="string"?(n!=="textarea"||a!=="")&&Ds(t,a):typeof a=="number"&&Ds(t,""+a):i!=="suppressContentEditableWarning"&&i!=="suppressHydrationWarning"&&i!=="autoFocus"&&(js.hasOwnProperty(i)?a!=null&&i==="onScroll"&&q("scroll",t):a!=null&&Yu(t,i,a,o))}switch(n){case"input":Ii(t),Gd(t,r,!1);break;case"textarea":Ii(t),Qd(t);break;case"option":r.value!=null&&t.setAttribute("value",""+fn(r.value));break;case"select":t.multiple=!!r.multiple,i=r.value,i!=null?vr(t,!!r.multiple,i,!1):r.defaultValue!=null&&vr(t,!!r.multiple,r.defaultValue,!0);break;default:typeof s.onClick=="function"&&(t.onclick=_o)}switch(n){case"button":case"input":case"select":case"textarea":r=!!r.autoFocus;break e;case"img":r=!0;break e;default:r=!1}}r&&(e.flags|=4)}e.ref!==null&&(e.flags|=512,e.flags|=2097152)}return Se(e),null;case 6:if(t&&e.stateNode!=null)tg(t,e,t.memoizedProps,r);else{if(typeof r!="string"&&e.stateNode===null)throw Error(C(166));if(n=An(Gs.current),An(gt.current),Mi(e)){if(r=e.stateNode,n=e.memoizedProps,r[ft]=e,(i=r.nodeValue!==n)&&(t=We,t!==null))switch(t.tag){case 3:Di(r.nodeValue,n,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Di(r.nodeValue,n,(t.mode&1)!==0)}i&&(e.flags|=4)}else r=(n.nodeType===9?n:n.ownerDocument).createTextNode(r),r[ft]=e,e.stateNode=r}return Se(e),null;case 13:if(Y(Z),r=e.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(J&&ze!==null&&e.mode&1&&!(e.flags&128))ym(),Or(),e.flags|=98560,i=!1;else if(i=Mi(e),r!==null&&r.dehydrated!==null){if(t===null){if(!i)throw Error(C(318));if(i=e.memoizedState,i=i!==null?i.dehydrated:null,!i)throw Error(C(317));i[ft]=e}else Or(),!(e.flags&128)&&(e.memoizedState=null),e.flags|=4;Se(e),i=!1}else rt!==null&&(yu(rt),rt=null),i=!0;if(!i)return e.flags&65536?e:null}return e.flags&128?(e.lanes=n,e):(r=r!==null,r!==(t!==null&&t.memoizedState!==null)&&r&&(e.child.flags|=8192,e.mode&1&&(t===null||Z.current&1?ue===0&&(ue=3):Ac())),e.updateQueue!==null&&(e.flags|=4),Se(e),null);case 4:return Dr(),du(t,e),t===null&&Ws(e.stateNode.containerInfo),Se(e),null;case 10:return mc(e.type._context),Se(e),null;case 17:return Le(e.type)&&vo(),Se(e),null;case 19:if(Y(Z),i=e.memoizedState,i===null)return Se(e),null;if(r=(e.flags&128)!==0,o=i.rendering,o===null)if(r)us(i,!1);else{if(ue!==0||t!==null&&t.flags&128)for(t=e.child;t!==null;){if(o=ko(t),o!==null){for(e.flags|=128,us(i,!1),r=o.updateQueue,r!==null&&(e.updateQueue=r,e.flags|=4),e.subtreeFlags=0,r=n,n=e.child;n!==null;)i=n,t=r,i.flags&=14680066,o=i.alternate,o===null?(i.childLanes=0,i.lanes=t,i.child=null,i.subtreeFlags=0,i.memoizedProps=null,i.memoizedState=null,i.updateQueue=null,i.dependencies=null,i.stateNode=null):(i.childLanes=o.childLanes,i.lanes=o.lanes,i.child=o.child,i.subtreeFlags=0,i.deletions=null,i.memoizedProps=o.memoizedProps,i.memoizedState=o.memoizedState,i.updateQueue=o.updateQueue,i.type=o.type,t=o.dependencies,i.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),n=n.sibling;return Q(Z,Z.current&1|2),e.child}t=t.sibling}i.tail!==null&&oe()>Fr&&(e.flags|=128,r=!0,us(i,!1),e.lanes=4194304)}else{if(!r)if(t=ko(o),t!==null){if(e.flags|=128,r=!0,n=t.updateQueue,n!==null&&(e.updateQueue=n,e.flags|=4),us(i,!0),i.tail===null&&i.tailMode==="hidden"&&!o.alternate&&!J)return Se(e),null}else 2*oe()-i.renderingStartTime>Fr&&n!==1073741824&&(e.flags|=128,r=!0,us(i,!1),e.lanes=4194304);i.isBackwards?(o.sibling=e.child,e.child=o):(n=i.last,n!==null?n.sibling=o:e.child=o,i.last=o)}return i.tail!==null?(e=i.tail,i.rendering=e,i.tail=e.sibling,i.renderingStartTime=oe(),e.sibling=null,n=Z.current,Q(Z,r?n&1|2:n&1),e):(Se(e),null);case 22:case 23:return Pc(),r=e.memoizedState!==null,t!==null&&t.memoizedState!==null!==r&&(e.flags|=8192),r&&e.mode&1?Ue&1073741824&&(Se(e),e.subtreeFlags&6&&(e.flags|=8192)):Se(e),null;case 24:return null;case 25:return null}throw Error(C(156,e.tag))}function Fy(t,e){switch(dc(e),e.tag){case 1:return Le(e.type)&&vo(),t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 3:return Dr(),Y(Fe),Y(ke),xc(),t=e.flags,t&65536&&!(t&128)?(e.flags=t&-65537|128,e):null;case 5:return yc(e),null;case 13:if(Y(Z),t=e.memoizedState,t!==null&&t.dehydrated!==null){if(e.alternate===null)throw Error(C(340));Or()}return t=e.flags,t&65536?(e.flags=t&-65537|128,e):null;case 19:return Y(Z),null;case 4:return Dr(),null;case 10:return mc(e.type._context),null;case 22:case 23:return Pc(),null;case 24:return null;default:return null}}var Bi=!1,Ce=!1,Ly=typeof WeakSet=="function"?WeakSet:Set,I=null;function hr(t,e){var n=t.ref;if(n!==null)if(typeof n=="function")try{n(null)}catch(r){ne(t,e,r)}else n.current=null}function hu(t,e,n){try{n()}catch(r){ne(t,e,r)}}var Fh=!1;function By(t,e){if(qa=po,t=om(),uc(t)){if("selectionStart"in t)var n={start:t.selectionStart,end:t.selectionEnd};else e:{n=(n=t.ownerDocument)&&n.defaultView||window;var r=n.getSelection&&n.getSelection();if(r&&r.rangeCount!==0){n=r.anchorNode;var s=r.anchorOffset,i=r.focusNode;r=r.focusOffset;try{n.nodeType,i.nodeType}catch{n=null;break e}var o=0,l=-1,a=-1,c=0,h=0,d=t,f=null;t:for(;;){for(var _;d!==n||s!==0&&d.nodeType!==3||(l=o+s),d!==i||r!==0&&d.nodeType!==3||(a=o+r),d.nodeType===3&&(o+=d.nodeValue.length),(_=d.firstChild)!==null;)f=d,d=_;for(;;){if(d===t)break t;if(f===n&&++c===s&&(l=o),f===i&&++h===r&&(a=o),(_=d.nextSibling)!==null)break;d=f,f=d.parentNode}d=_}n=l===-1||a===-1?null:{start:l,end:a}}else n=null}n=n||{start:0,end:0}}else n=null;for(Ya={focusedElem:t,selectionRange:n},po=!1,I=e;I!==null;)if(e=I,t=e.child,(e.subtreeFlags&1028)!==0&&t!==null)t.return=e,I=t;else for(;I!==null;){e=I;try{var y=e.alternate;if(e.flags&1024)switch(e.tag){case 0:case 11:case 15:break;case 1:if(y!==null){var v=y.memoizedProps,w=y.memoizedState,m=e.stateNode,p=m.getSnapshotBeforeUpdate(e.elementType===e.type?v:tt(e.type,v),w);m.__reactInternalSnapshotBeforeUpdate=p}break;case 3:var g=e.stateNode.containerInfo;g.nodeType===1?g.textContent="":g.nodeType===9&&g.documentElement&&g.removeChild(g.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(C(163))}}catch(x){ne(e,e.return,x)}if(t=e.sibling,t!==null){t.return=e.return,I=t;break}I=e.return}return y=Fh,Fh=!1,y}function ks(t,e,n){var r=e.updateQueue;if(r=r!==null?r.lastEffect:null,r!==null){var s=r=r.next;do{if((s.tag&t)===t){var i=s.destroy;s.destroy=void 0,i!==void 0&&hu(e,n,i)}s=s.next}while(s!==r)}}function fl(t,e){if(e=e.updateQueue,e=e!==null?e.lastEffect:null,e!==null){var n=e=e.next;do{if((n.tag&t)===t){var r=n.create;n.destroy=r()}n=n.next}while(n!==e)}}function fu(t){var e=t.ref;if(e!==null){var n=t.stateNode;switch(t.tag){case 5:t=n;break;default:t=n}typeof e=="function"?e(t):e.current=t}}function ng(t){var e=t.alternate;e!==null&&(t.alternate=null,ng(e)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(e=t.stateNode,e!==null&&(delete e[ft],delete e[Hs],delete e[Za],delete e[wy],delete e[Ey])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function rg(t){return t.tag===5||t.tag===3||t.tag===4}function Lh(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||rg(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function pu(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.nodeType===8?n.parentNode.insertBefore(t,e):n.insertBefore(t,e):(n.nodeType===8?(e=n.parentNode,e.insertBefore(t,n)):(e=n,e.appendChild(t)),n=n._reactRootContainer,n!=null||e.onclick!==null||(e.onclick=_o));else if(r!==4&&(t=t.child,t!==null))for(pu(t,e,n),t=t.sibling;t!==null;)pu(t,e,n),t=t.sibling}function mu(t,e,n){var r=t.tag;if(r===5||r===6)t=t.stateNode,e?n.insertBefore(t,e):n.appendChild(t);else if(r!==4&&(t=t.child,t!==null))for(mu(t,e,n),t=t.sibling;t!==null;)mu(t,e,n),t=t.sibling}var _e=null,nt=!1;function Ut(t,e,n){for(n=n.child;n!==null;)sg(t,e,n),n=n.sibling}function sg(t,e,n){if(mt&&typeof mt.onCommitFiberUnmount=="function")try{mt.onCommitFiberUnmount(il,n)}catch{}switch(n.tag){case 5:Ce||hr(n,e);case 6:var r=_e,s=nt;_e=null,Ut(t,e,n),_e=r,nt=s,_e!==null&&(nt?(t=_e,n=n.stateNode,t.nodeType===8?t.parentNode.removeChild(n):t.removeChild(n)):_e.removeChild(n.stateNode));break;case 18:_e!==null&&(nt?(t=_e,n=n.stateNode,t.nodeType===8?ra(t.parentNode,n):t.nodeType===1&&ra(t,n),Bs(t)):ra(_e,n.stateNode));break;case 4:r=_e,s=nt,_e=n.stateNode.containerInfo,nt=!0,Ut(t,e,n),_e=r,nt=s;break;case 0:case 11:case 14:case 15:if(!Ce&&(r=n.updateQueue,r!==null&&(r=r.lastEffect,r!==null))){s=r=r.next;do{var i=s,o=i.destroy;i=i.tag,o!==void 0&&(i&2||i&4)&&hu(n,e,o),s=s.next}while(s!==r)}Ut(t,e,n);break;case 1:if(!Ce&&(hr(n,e),r=n.stateNode,typeof r.componentWillUnmount=="function"))try{r.props=n.memoizedProps,r.state=n.memoizedState,r.componentWillUnmount()}catch(l){ne(n,e,l)}Ut(t,e,n);break;case 21:Ut(t,e,n);break;case 22:n.mode&1?(Ce=(r=Ce)||n.memoizedState!==null,Ut(t,e,n),Ce=r):Ut(t,e,n);break;default:Ut(t,e,n)}}function Bh(t){var e=t.updateQueue;if(e!==null){t.updateQueue=null;var n=t.stateNode;n===null&&(n=t.stateNode=new Ly),e.forEach(function(r){var s=Qy.bind(null,t,r);n.has(r)||(n.add(r),r.then(s,s))})}}function et(t,e){var n=e.deletions;if(n!==null)for(var r=0;r<n.length;r++){var s=n[r];try{var i=t,o=e,l=o;e:for(;l!==null;){switch(l.tag){case 5:_e=l.stateNode,nt=!1;break e;case 3:_e=l.stateNode.containerInfo,nt=!0;break e;case 4:_e=l.stateNode.containerInfo,nt=!0;break e}l=l.return}if(_e===null)throw Error(C(160));sg(i,o,s),_e=null,nt=!1;var a=s.alternate;a!==null&&(a.return=null),s.return=null}catch(c){ne(s,e,c)}}if(e.subtreeFlags&12854)for(e=e.child;e!==null;)ig(e,t),e=e.sibling}function ig(t,e){var n=t.alternate,r=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(et(e,t),dt(t),r&4){try{ks(3,t,t.return),fl(3,t)}catch(v){ne(t,t.return,v)}try{ks(5,t,t.return)}catch(v){ne(t,t.return,v)}}break;case 1:et(e,t),dt(t),r&512&&n!==null&&hr(n,n.return);break;case 5:if(et(e,t),dt(t),r&512&&n!==null&&hr(n,n.return),t.flags&32){var s=t.stateNode;try{Ds(s,"")}catch(v){ne(t,t.return,v)}}if(r&4&&(s=t.stateNode,s!=null)){var i=t.memoizedProps,o=n!==null?n.memoizedProps:i,l=t.type,a=t.updateQueue;if(t.updateQueue=null,a!==null)try{l==="input"&&i.type==="radio"&&i.name!=null&&Ip(s,i),Ba(l,o);var c=Ba(l,i);for(o=0;o<a.length;o+=2){var h=a[o],d=a[o+1];h==="style"?Ap(s,d):h==="dangerouslySetInnerHTML"?Rp(s,d):h==="children"?Ds(s,d):Yu(s,h,d,c)}switch(l){case"input":ja(s,i);break;case"textarea":bp(s,i);break;case"select":var f=s._wrapperState.wasMultiple;s._wrapperState.wasMultiple=!!i.multiple;var _=i.value;_!=null?vr(s,!!i.multiple,_,!1):f!==!!i.multiple&&(i.defaultValue!=null?vr(s,!!i.multiple,i.defaultValue,!0):vr(s,!!i.multiple,i.multiple?[]:"",!1))}s[Hs]=i}catch(v){ne(t,t.return,v)}}break;case 6:if(et(e,t),dt(t),r&4){if(t.stateNode===null)throw Error(C(162));s=t.stateNode,i=t.memoizedProps;try{s.nodeValue=i}catch(v){ne(t,t.return,v)}}break;case 3:if(et(e,t),dt(t),r&4&&n!==null&&n.memoizedState.isDehydrated)try{Bs(e.containerInfo)}catch(v){ne(t,t.return,v)}break;case 4:et(e,t),dt(t);break;case 13:et(e,t),dt(t),s=t.child,s.flags&8192&&(i=s.memoizedState!==null,s.stateNode.isHidden=i,!i||s.alternate!==null&&s.alternate.memoizedState!==null||(Tc=oe())),r&4&&Bh(t);break;case 22:if(h=n!==null&&n.memoizedState!==null,t.mode&1?(Ce=(c=Ce)||h,et(e,t),Ce=c):et(e,t),dt(t),r&8192){if(c=t.memoizedState!==null,(t.stateNode.isHidden=c)&&!h&&t.mode&1)for(I=t,h=t.child;h!==null;){for(d=I=h;I!==null;){switch(f=I,_=f.child,f.tag){case 0:case 11:case 14:case 15:ks(4,f,f.return);break;case 1:hr(f,f.return);var y=f.stateNode;if(typeof y.componentWillUnmount=="function"){r=f,n=f.return;try{e=r,y.props=e.memoizedProps,y.state=e.memoizedState,y.componentWillUnmount()}catch(v){ne(r,n,v)}}break;case 5:hr(f,f.return);break;case 22:if(f.memoizedState!==null){zh(d);continue}}_!==null?(_.return=f,I=_):zh(d)}h=h.sibling}e:for(h=null,d=t;;){if(d.tag===5){if(h===null){h=d;try{s=d.stateNode,c?(i=s.style,typeof i.setProperty=="function"?i.setProperty("display","none","important"):i.display="none"):(l=d.stateNode,a=d.memoizedProps.style,o=a!=null&&a.hasOwnProperty("display")?a.display:null,l.style.display=Pp("display",o))}catch(v){ne(t,t.return,v)}}}else if(d.tag===6){if(h===null)try{d.stateNode.nodeValue=c?"":d.memoizedProps}catch(v){ne(t,t.return,v)}}else if((d.tag!==22&&d.tag!==23||d.memoizedState===null||d===t)&&d.child!==null){d.child.return=d,d=d.child;continue}if(d===t)break e;for(;d.sibling===null;){if(d.return===null||d.return===t)break e;h===d&&(h=null),d=d.return}h===d&&(h=null),d.sibling.return=d.return,d=d.sibling}}break;case 19:et(e,t),dt(t),r&4&&Bh(t);break;case 21:break;default:et(e,t),dt(t)}}function dt(t){var e=t.flags;if(e&2){try{e:{for(var n=t.return;n!==null;){if(rg(n)){var r=n;break e}n=n.return}throw Error(C(160))}switch(r.tag){case 5:var s=r.stateNode;r.flags&32&&(Ds(s,""),r.flags&=-33);var i=Lh(t);mu(t,i,s);break;case 3:case 4:var o=r.stateNode.containerInfo,l=Lh(t);pu(t,l,o);break;default:throw Error(C(161))}}catch(a){ne(t,t.return,a)}t.flags&=-3}e&4096&&(t.flags&=-4097)}function Uy(t,e,n){I=t,og(t)}function og(t,e,n){for(var r=(t.mode&1)!==0;I!==null;){var s=I,i=s.child;if(s.tag===22&&r){var o=s.memoizedState!==null||Bi;if(!o){var l=s.alternate,a=l!==null&&l.memoizedState!==null||Ce;l=Bi;var c=Ce;if(Bi=o,(Ce=a)&&!c)for(I=s;I!==null;)o=I,a=o.child,o.tag===22&&o.memoizedState!==null?Wh(s):a!==null?(a.return=o,I=a):Wh(s);for(;i!==null;)I=i,og(i),i=i.sibling;I=s,Bi=l,Ce=c}Uh(t)}else s.subtreeFlags&8772&&i!==null?(i.return=s,I=i):Uh(t)}}function Uh(t){for(;I!==null;){var e=I;if(e.flags&8772){var n=e.alternate;try{if(e.flags&8772)switch(e.tag){case 0:case 11:case 15:Ce||fl(5,e);break;case 1:var r=e.stateNode;if(e.flags&4&&!Ce)if(n===null)r.componentDidMount();else{var s=e.elementType===e.type?n.memoizedProps:tt(e.type,n.memoizedProps);r.componentDidUpdate(s,n.memoizedState,r.__reactInternalSnapshotBeforeUpdate)}var i=e.updateQueue;i!==null&&Ch(e,i,r);break;case 3:var o=e.updateQueue;if(o!==null){if(n=null,e.child!==null)switch(e.child.tag){case 5:n=e.child.stateNode;break;case 1:n=e.child.stateNode}Ch(e,o,n)}break;case 5:var l=e.stateNode;if(n===null&&e.flags&4){n=l;var a=e.memoizedProps;switch(e.type){case"button":case"input":case"select":case"textarea":a.autoFocus&&n.focus();break;case"img":a.src&&(n.src=a.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(e.memoizedState===null){var c=e.alternate;if(c!==null){var h=c.memoizedState;if(h!==null){var d=h.dehydrated;d!==null&&Bs(d)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(C(163))}Ce||e.flags&512&&fu(e)}catch(f){ne(e,e.return,f)}}if(e===t){I=null;break}if(n=e.sibling,n!==null){n.return=e.return,I=n;break}I=e.return}}function zh(t){for(;I!==null;){var e=I;if(e===t){I=null;break}var n=e.sibling;if(n!==null){n.return=e.return,I=n;break}I=e.return}}function Wh(t){for(;I!==null;){var e=I;try{switch(e.tag){case 0:case 11:case 15:var n=e.return;try{fl(4,e)}catch(a){ne(e,n,a)}break;case 1:var r=e.stateNode;if(typeof r.componentDidMount=="function"){var s=e.return;try{r.componentDidMount()}catch(a){ne(e,s,a)}}var i=e.return;try{fu(e)}catch(a){ne(e,i,a)}break;case 5:var o=e.return;try{fu(e)}catch(a){ne(e,o,a)}}}catch(a){ne(e,e.return,a)}if(e===t){I=null;break}var l=e.sibling;if(l!==null){l.return=e.return,I=l;break}I=e.return}}var zy=Math.ceil,bo=Bt.ReactCurrentDispatcher,Ic=Bt.ReactCurrentOwner,Ye=Bt.ReactCurrentBatchConfig,z=0,ge=null,le=null,ye=0,Ue=0,fr=yn(0),ue=0,Ys=null,zn=0,pl=0,bc=0,Ns=null,Oe=null,Tc=0,Fr=1/0,xt=null,To=!1,gu=null,sn=null,Ui=!1,Xt=null,Ro=0,Is=0,_u=null,eo=-1,to=0;function be(){return z&6?oe():eo!==-1?eo:eo=oe()}function on(t){return t.mode&1?z&2&&ye!==0?ye&-ye:Cy.transition!==null?(to===0&&(to=Hp()),to):(t=V,t!==0||(t=window.event,t=t===void 0?16:Xp(t.type)),t):1}function lt(t,e,n,r){if(50<Is)throw Is=0,_u=null,Error(C(185));ci(t,n,r),(!(z&2)||t!==ge)&&(t===ge&&(!(z&2)&&(pl|=n),ue===4&&$t(t,ye)),Be(t,r),n===1&&z===0&&!(e.mode&1)&&(Fr=oe()+500,cl&&xn()))}function Be(t,e){var n=t.callbackNode;C0(t,e);var r=fo(t,t===ge?ye:0);if(r===0)n!==null&&Xd(n),t.callbackNode=null,t.callbackPriority=0;else if(e=r&-r,t.callbackPriority!==e){if(n!=null&&Xd(n),e===1)t.tag===0?Sy(Vh.bind(null,t)):gm(Vh.bind(null,t)),yy(function(){!(z&6)&&xn()}),n=null;else{switch($p(r)){case 1:n=tc;break;case 4:n=Wp;break;case 16:n=ho;break;case 536870912:n=Vp;break;default:n=ho}n=pg(n,lg.bind(null,t))}t.callbackPriority=e,t.callbackNode=n}}function lg(t,e){if(eo=-1,to=0,z&6)throw Error(C(327));var n=t.callbackNode;if(Sr()&&t.callbackNode!==n)return null;var r=fo(t,t===ge?ye:0);if(r===0)return null;if(r&30||r&t.expiredLanes||e)e=Po(t,r);else{e=r;var s=z;z|=2;var i=ug();(ge!==t||ye!==e)&&(xt=null,Fr=oe()+500,Dn(t,e));do try{Hy();break}catch(l){ag(t,l)}while(!0);pc(),bo.current=i,z=s,le!==null?e=0:(ge=null,ye=0,e=ue)}if(e!==0){if(e===2&&(s=Ha(t),s!==0&&(r=s,e=vu(t,s))),e===1)throw n=Ys,Dn(t,0),$t(t,r),Be(t,oe()),n;if(e===6)$t(t,r);else{if(s=t.current.alternate,!(r&30)&&!Wy(s)&&(e=Po(t,r),e===2&&(i=Ha(t),i!==0&&(r=i,e=vu(t,i))),e===1))throw n=Ys,Dn(t,0),$t(t,r),Be(t,oe()),n;switch(t.finishedWork=s,t.finishedLanes=r,e){case 0:case 1:throw Error(C(345));case 2:In(t,Oe,xt);break;case 3:if($t(t,r),(r&130023424)===r&&(e=Tc+500-oe(),10<e)){if(fo(t,0)!==0)break;if(s=t.suspendedLanes,(s&r)!==r){be(),t.pingedLanes|=t.suspendedLanes&s;break}t.timeoutHandle=Ja(In.bind(null,t,Oe,xt),e);break}In(t,Oe,xt);break;case 4:if($t(t,r),(r&4194240)===r)break;for(e=t.eventTimes,s=-1;0<r;){var o=31-ot(r);i=1<<o,o=e[o],o>s&&(s=o),r&=~i}if(r=s,r=oe()-r,r=(120>r?120:480>r?480:1080>r?1080:1920>r?1920:3e3>r?3e3:4320>r?4320:1960*zy(r/1960))-r,10<r){t.timeoutHandle=Ja(In.bind(null,t,Oe,xt),r);break}In(t,Oe,xt);break;case 5:In(t,Oe,xt);break;default:throw Error(C(329))}}}return Be(t,oe()),t.callbackNode===n?lg.bind(null,t):null}function vu(t,e){var n=Ns;return t.current.memoizedState.isDehydrated&&(Dn(t,e).flags|=256),t=Po(t,e),t!==2&&(e=Oe,Oe=n,e!==null&&yu(e)),t}function yu(t){Oe===null?Oe=t:Oe.push.apply(Oe,t)}function Wy(t){for(var e=t;;){if(e.flags&16384){var n=e.updateQueue;if(n!==null&&(n=n.stores,n!==null))for(var r=0;r<n.length;r++){var s=n[r],i=s.getSnapshot;s=s.value;try{if(!ut(i(),s))return!1}catch{return!1}}}if(n=e.child,e.subtreeFlags&16384&&n!==null)n.return=e,e=n;else{if(e===t)break;for(;e.sibling===null;){if(e.return===null||e.return===t)return!0;e=e.return}e.sibling.return=e.return,e=e.sibling}}return!0}function $t(t,e){for(e&=~bc,e&=~pl,t.suspendedLanes|=e,t.pingedLanes&=~e,t=t.expirationTimes;0<e;){var n=31-ot(e),r=1<<n;t[n]=-1,e&=~r}}function Vh(t){if(z&6)throw Error(C(327));Sr();var e=fo(t,0);if(!(e&1))return Be(t,oe()),null;var n=Po(t,e);if(t.tag!==0&&n===2){var r=Ha(t);r!==0&&(e=r,n=vu(t,r))}if(n===1)throw n=Ys,Dn(t,0),$t(t,e),Be(t,oe()),n;if(n===6)throw Error(C(345));return t.finishedWork=t.current.alternate,t.finishedLanes=e,In(t,Oe,xt),Be(t,oe()),null}function Rc(t,e){var n=z;z|=1;try{return t(e)}finally{z=n,z===0&&(Fr=oe()+500,cl&&xn())}}function Wn(t){Xt!==null&&Xt.tag===0&&!(z&6)&&Sr();var e=z;z|=1;var n=Ye.transition,r=V;try{if(Ye.transition=null,V=1,t)return t()}finally{V=r,Ye.transition=n,z=e,!(z&6)&&xn()}}function Pc(){Ue=fr.current,Y(fr)}function Dn(t,e){t.finishedWork=null,t.finishedLanes=0;var n=t.timeoutHandle;if(n!==-1&&(t.timeoutHandle=-1,vy(n)),le!==null)for(n=le.return;n!==null;){var r=n;switch(dc(r),r.tag){case 1:r=r.type.childContextTypes,r!=null&&vo();break;case 3:Dr(),Y(Fe),Y(ke),xc();break;case 5:yc(r);break;case 4:Dr();break;case 13:Y(Z);break;case 19:Y(Z);break;case 10:mc(r.type._context);break;case 22:case 23:Pc()}n=n.return}if(ge=t,le=t=ln(t.current,null),ye=Ue=e,ue=0,Ys=null,bc=pl=zn=0,Oe=Ns=null,Pn!==null){for(e=0;e<Pn.length;e++)if(n=Pn[e],r=n.interleaved,r!==null){n.interleaved=null;var s=r.next,i=n.pending;if(i!==null){var o=i.next;i.next=s,r.next=o}n.pending=r}Pn=null}return t}function ag(t,e){do{var n=le;try{if(pc(),Xi.current=Io,No){for(var r=ee.memoizedState;r!==null;){var s=r.queue;s!==null&&(s.pending=null),r=r.next}No=!1}if(Un=0,he=ae=ee=null,Cs=!1,Ks=0,Ic.current=null,n===null||n.return===null){ue=1,Ys=e,le=null;break}e:{var i=t,o=n.return,l=n,a=e;if(e=ye,l.flags|=32768,a!==null&&typeof a=="object"&&typeof a.then=="function"){var c=a,h=l,d=h.tag;if(!(h.mode&1)&&(d===0||d===11||d===15)){var f=h.alternate;f?(h.updateQueue=f.updateQueue,h.memoizedState=f.memoizedState,h.lanes=f.lanes):(h.updateQueue=null,h.memoizedState=null)}var _=Rh(o);if(_!==null){_.flags&=-257,Ph(_,o,l,i,e),_.mode&1&&Th(i,c,e),e=_,a=c;var y=e.updateQueue;if(y===null){var v=new Set;v.add(a),e.updateQueue=v}else y.add(a);break e}else{if(!(e&1)){Th(i,c,e),Ac();break e}a=Error(C(426))}}else if(J&&l.mode&1){var w=Rh(o);if(w!==null){!(w.flags&65536)&&(w.flags|=256),Ph(w,o,l,i,e),hc(Mr(a,l));break e}}i=a=Mr(a,l),ue!==4&&(ue=2),Ns===null?Ns=[i]:Ns.push(i),i=o;do{switch(i.tag){case 3:i.flags|=65536,e&=-e,i.lanes|=e;var m=$m(i,a,e);Sh(i,m);break e;case 1:l=a;var p=i.type,g=i.stateNode;if(!(i.flags&128)&&(typeof p.getDerivedStateFromError=="function"||g!==null&&typeof g.componentDidCatch=="function"&&(sn===null||!sn.has(g)))){i.flags|=65536,e&=-e,i.lanes|=e;var x=Gm(i,l,e);Sh(i,x);break e}}i=i.return}while(i!==null)}dg(n)}catch(E){e=E,le===n&&n!==null&&(le=n=n.return);continue}break}while(!0)}function ug(){var t=bo.current;return bo.current=Io,t===null?Io:t}function Ac(){(ue===0||ue===3||ue===2)&&(ue=4),ge===null||!(zn&268435455)&&!(pl&268435455)||$t(ge,ye)}function Po(t,e){var n=z;z|=2;var r=ug();(ge!==t||ye!==e)&&(xt=null,Dn(t,e));do try{Vy();break}catch(s){ag(t,s)}while(!0);if(pc(),z=n,bo.current=r,le!==null)throw Error(C(261));return ge=null,ye=0,ue}function Vy(){for(;le!==null;)cg(le)}function Hy(){for(;le!==null&&!m0();)cg(le)}function cg(t){var e=fg(t.alternate,t,Ue);t.memoizedProps=t.pendingProps,e===null?dg(t):le=e,Ic.current=null}function dg(t){var e=t;do{var n=e.alternate;if(t=e.return,e.flags&32768){if(n=Fy(n,e),n!==null){n.flags&=32767,le=n;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{ue=6,le=null;return}}else if(n=My(n,e,Ue),n!==null){le=n;return}if(e=e.sibling,e!==null){le=e;return}le=e=t}while(e!==null);ue===0&&(ue=5)}function In(t,e,n){var r=V,s=Ye.transition;try{Ye.transition=null,V=1,$y(t,e,n,r)}finally{Ye.transition=s,V=r}return null}function $y(t,e,n,r){do Sr();while(Xt!==null);if(z&6)throw Error(C(327));n=t.finishedWork;var s=t.finishedLanes;if(n===null)return null;if(t.finishedWork=null,t.finishedLanes=0,n===t.current)throw Error(C(177));t.callbackNode=null,t.callbackPriority=0;var i=n.lanes|n.childLanes;if(k0(t,i),t===ge&&(le=ge=null,ye=0),!(n.subtreeFlags&2064)&&!(n.flags&2064)||Ui||(Ui=!0,pg(ho,function(){return Sr(),null})),i=(n.flags&15990)!==0,n.subtreeFlags&15990||i){i=Ye.transition,Ye.transition=null;var o=V;V=1;var l=z;z|=4,Ic.current=null,By(t,n),ig(n,t),dy(Ya),po=!!qa,Ya=qa=null,t.current=n,Uy(n),g0(),z=l,V=o,Ye.transition=i}else t.current=n;if(Ui&&(Ui=!1,Xt=t,Ro=s),i=t.pendingLanes,i===0&&(sn=null),y0(n.stateNode),Be(t,oe()),e!==null)for(r=t.onRecoverableError,n=0;n<e.length;n++)s=e[n],r(s.value,{componentStack:s.stack,digest:s.digest});if(To)throw To=!1,t=gu,gu=null,t;return Ro&1&&t.tag!==0&&Sr(),i=t.pendingLanes,i&1?t===_u?Is++:(Is=0,_u=t):Is=0,xn(),null}function Sr(){if(Xt!==null){var t=$p(Ro),e=Ye.transition,n=V;try{if(Ye.transition=null,V=16>t?16:t,Xt===null)var r=!1;else{if(t=Xt,Xt=null,Ro=0,z&6)throw Error(C(331));var s=z;for(z|=4,I=t.current;I!==null;){var i=I,o=i.child;if(I.flags&16){var l=i.deletions;if(l!==null){for(var a=0;a<l.length;a++){var c=l[a];for(I=c;I!==null;){var h=I;switch(h.tag){case 0:case 11:case 15:ks(8,h,i)}var d=h.child;if(d!==null)d.return=h,I=d;else for(;I!==null;){h=I;var f=h.sibling,_=h.return;if(ng(h),h===c){I=null;break}if(f!==null){f.return=_,I=f;break}I=_}}}var y=i.alternate;if(y!==null){var v=y.child;if(v!==null){y.child=null;do{var w=v.sibling;v.sibling=null,v=w}while(v!==null)}}I=i}}if(i.subtreeFlags&2064&&o!==null)o.return=i,I=o;else e:for(;I!==null;){if(i=I,i.flags&2048)switch(i.tag){case 0:case 11:case 15:ks(9,i,i.return)}var m=i.sibling;if(m!==null){m.return=i.return,I=m;break e}I=i.return}}var p=t.current;for(I=p;I!==null;){o=I;var g=o.child;if(o.subtreeFlags&2064&&g!==null)g.return=o,I=g;else e:for(o=p;I!==null;){if(l=I,l.flags&2048)try{switch(l.tag){case 0:case 11:case 15:fl(9,l)}}catch(E){ne(l,l.return,E)}if(l===o){I=null;break e}var x=l.sibling;if(x!==null){x.return=l.return,I=x;break e}I=l.return}}if(z=s,xn(),mt&&typeof mt.onPostCommitFiberRoot=="function")try{mt.onPostCommitFiberRoot(il,t)}catch{}r=!0}return r}finally{V=n,Ye.transition=e}}return!1}function Hh(t,e,n){e=Mr(n,e),e=$m(t,e,1),t=rn(t,e,1),e=be(),t!==null&&(ci(t,1,e),Be(t,e))}function ne(t,e,n){if(t.tag===3)Hh(t,t,n);else for(;e!==null;){if(e.tag===3){Hh(e,t,n);break}else if(e.tag===1){var r=e.stateNode;if(typeof e.type.getDerivedStateFromError=="function"||typeof r.componentDidCatch=="function"&&(sn===null||!sn.has(r))){t=Mr(n,t),t=Gm(e,t,1),e=rn(e,t,1),t=be(),e!==null&&(ci(e,1,t),Be(e,t));break}}e=e.return}}function Gy(t,e,n){var r=t.pingCache;r!==null&&r.delete(e),e=be(),t.pingedLanes|=t.suspendedLanes&n,ge===t&&(ye&n)===n&&(ue===4||ue===3&&(ye&130023424)===ye&&500>oe()-Tc?Dn(t,0):bc|=n),Be(t,e)}function hg(t,e){e===0&&(t.mode&1?(e=Ri,Ri<<=1,!(Ri&130023424)&&(Ri=4194304)):e=1);var n=be();t=Ot(t,e),t!==null&&(ci(t,e,n),Be(t,n))}function Ky(t){var e=t.memoizedState,n=0;e!==null&&(n=e.retryLane),hg(t,n)}function Qy(t,e){var n=0;switch(t.tag){case 13:var r=t.stateNode,s=t.memoizedState;s!==null&&(n=s.retryLane);break;case 19:r=t.stateNode;break;default:throw Error(C(314))}r!==null&&r.delete(e),hg(t,n)}var fg;fg=function(t,e,n){if(t!==null)if(t.memoizedProps!==e.pendingProps||Fe.current)je=!0;else{if(!(t.lanes&n)&&!(e.flags&128))return je=!1,Dy(t,e,n);je=!!(t.flags&131072)}else je=!1,J&&e.flags&1048576&&_m(e,wo,e.index);switch(e.lanes=0,e.tag){case 2:var r=e.type;Zi(t,e),t=e.pendingProps;var s=Ar(e,ke.current);Er(e,n),s=Ec(null,e,r,t,s,n);var i=Sc();return e.flags|=1,typeof s=="object"&&s!==null&&typeof s.render=="function"&&s.$$typeof===void 0?(e.tag=1,e.memoizedState=null,e.updateQueue=null,Le(r)?(i=!0,yo(e)):i=!1,e.memoizedState=s.state!==null&&s.state!==void 0?s.state:null,_c(e),s.updater=hl,e.stateNode=s,s._reactInternals=e,iu(e,r,t,n),e=au(null,e,r,!0,i,n)):(e.tag=0,J&&i&&cc(e),Ie(null,e,s,n),e=e.child),e;case 16:r=e.elementType;e:{switch(Zi(t,e),t=e.pendingProps,s=r._init,r=s(r._payload),e.type=r,s=e.tag=Yy(r),t=tt(r,t),s){case 0:e=lu(null,e,r,t,n);break e;case 1:e=jh(null,e,r,t,n);break e;case 11:e=Ah(null,e,r,t,n);break e;case 14:e=Oh(null,e,r,tt(r.type,t),n);break e}throw Error(C(306,r,""))}return e;case 0:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:tt(r,s),lu(t,e,r,s,n);case 1:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:tt(r,s),jh(t,e,r,s,n);case 3:e:{if(Ym(e),t===null)throw Error(C(387));r=e.pendingProps,i=e.memoizedState,s=i.element,Sm(t,e),Co(e,r,null,n);var o=e.memoizedState;if(r=o.element,i.isDehydrated)if(i={element:r,isDehydrated:!1,cache:o.cache,pendingSuspenseBoundaries:o.pendingSuspenseBoundaries,transitions:o.transitions},e.updateQueue.baseState=i,e.memoizedState=i,e.flags&256){s=Mr(Error(C(423)),e),e=Dh(t,e,r,n,s);break e}else if(r!==s){s=Mr(Error(C(424)),e),e=Dh(t,e,r,n,s);break e}else for(ze=nn(e.stateNode.containerInfo.firstChild),We=e,J=!0,rt=null,n=wm(e,null,r,n),e.child=n;n;)n.flags=n.flags&-3|4096,n=n.sibling;else{if(Or(),r===s){e=jt(t,e,n);break e}Ie(t,e,r,n)}e=e.child}return e;case 5:return Cm(e),t===null&&nu(e),r=e.type,s=e.pendingProps,i=t!==null?t.memoizedProps:null,o=s.children,Xa(r,s)?o=null:i!==null&&Xa(r,i)&&(e.flags|=32),qm(t,e),Ie(t,e,o,n),e.child;case 6:return t===null&&nu(e),null;case 13:return Xm(t,e,n);case 4:return vc(e,e.stateNode.containerInfo),r=e.pendingProps,t===null?e.child=jr(e,null,r,n):Ie(t,e,r,n),e.child;case 11:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:tt(r,s),Ah(t,e,r,s,n);case 7:return Ie(t,e,e.pendingProps,n),e.child;case 8:return Ie(t,e,e.pendingProps.children,n),e.child;case 12:return Ie(t,e,e.pendingProps.children,n),e.child;case 10:e:{if(r=e.type._context,s=e.pendingProps,i=e.memoizedProps,o=s.value,Q(Eo,r._currentValue),r._currentValue=o,i!==null)if(ut(i.value,o)){if(i.children===s.children&&!Fe.current){e=jt(t,e,n);break e}}else for(i=e.child,i!==null&&(i.return=e);i!==null;){var l=i.dependencies;if(l!==null){o=i.child;for(var a=l.firstContext;a!==null;){if(a.context===r){if(i.tag===1){a=Tt(-1,n&-n),a.tag=2;var c=i.updateQueue;if(c!==null){c=c.shared;var h=c.pending;h===null?a.next=a:(a.next=h.next,h.next=a),c.pending=a}}i.lanes|=n,a=i.alternate,a!==null&&(a.lanes|=n),ru(i.return,n,e),l.lanes|=n;break}a=a.next}}else if(i.tag===10)o=i.type===e.type?null:i.child;else if(i.tag===18){if(o=i.return,o===null)throw Error(C(341));o.lanes|=n,l=o.alternate,l!==null&&(l.lanes|=n),ru(o,n,e),o=i.sibling}else o=i.child;if(o!==null)o.return=i;else for(o=i;o!==null;){if(o===e){o=null;break}if(i=o.sibling,i!==null){i.return=o.return,o=i;break}o=o.return}i=o}Ie(t,e,s.children,n),e=e.child}return e;case 9:return s=e.type,r=e.pendingProps.children,Er(e,n),s=Xe(s),r=r(s),e.flags|=1,Ie(t,e,r,n),e.child;case 14:return r=e.type,s=tt(r,e.pendingProps),s=tt(r.type,s),Oh(t,e,r,s,n);case 15:return Km(t,e,e.type,e.pendingProps,n);case 17:return r=e.type,s=e.pendingProps,s=e.elementType===r?s:tt(r,s),Zi(t,e),e.tag=1,Le(r)?(t=!0,yo(e)):t=!1,Er(e,n),Hm(e,r,s),iu(e,r,s,n),au(null,e,r,!0,t,n);case 19:return Jm(t,e,n);case 22:return Qm(t,e,n)}throw Error(C(156,e.tag))};function pg(t,e){return zp(t,e)}function qy(t,e,n,r){this.tag=t,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=e,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Qe(t,e,n,r){return new qy(t,e,n,r)}function Oc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function Yy(t){if(typeof t=="function")return Oc(t)?1:0;if(t!=null){if(t=t.$$typeof,t===Ju)return 11;if(t===Zu)return 14}return 2}function ln(t,e){var n=t.alternate;return n===null?(n=Qe(t.tag,e,t.key,t.mode),n.elementType=t.elementType,n.type=t.type,n.stateNode=t.stateNode,n.alternate=t,t.alternate=n):(n.pendingProps=e,n.type=t.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=t.flags&14680064,n.childLanes=t.childLanes,n.lanes=t.lanes,n.child=t.child,n.memoizedProps=t.memoizedProps,n.memoizedState=t.memoizedState,n.updateQueue=t.updateQueue,e=t.dependencies,n.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext},n.sibling=t.sibling,n.index=t.index,n.ref=t.ref,n}function no(t,e,n,r,s,i){var o=2;if(r=t,typeof t=="function")Oc(t)&&(o=1);else if(typeof t=="string")o=5;else e:switch(t){case rr:return Mn(n.children,s,i,e);case Xu:o=8,s|=8;break;case Ta:return t=Qe(12,n,e,s|2),t.elementType=Ta,t.lanes=i,t;case Ra:return t=Qe(13,n,e,s),t.elementType=Ra,t.lanes=i,t;case Pa:return t=Qe(19,n,e,s),t.elementType=Pa,t.lanes=i,t;case Cp:return ml(n,s,i,e);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Ep:o=10;break e;case Sp:o=9;break e;case Ju:o=11;break e;case Zu:o=14;break e;case Wt:o=16,r=null;break e}throw Error(C(130,t==null?t:typeof t,""))}return e=Qe(o,n,e,s),e.elementType=t,e.type=r,e.lanes=i,e}function Mn(t,e,n,r){return t=Qe(7,t,r,e),t.lanes=n,t}function ml(t,e,n,r){return t=Qe(22,t,r,e),t.elementType=Cp,t.lanes=n,t.stateNode={isHidden:!1},t}function da(t,e,n){return t=Qe(6,t,null,e),t.lanes=n,t}function ha(t,e,n){return e=Qe(4,t.children!==null?t.children:[],t.key,e),e.lanes=n,e.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},e}function Xy(t,e,n,r,s){this.tag=e,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Gl(0),this.expirationTimes=Gl(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Gl(0),this.identifierPrefix=r,this.onRecoverableError=s,this.mutableSourceEagerHydrationData=null}function jc(t,e,n,r,s,i,o,l,a){return t=new Xy(t,e,n,l,a),e===1?(e=1,i===!0&&(e|=8)):e=0,i=Qe(3,null,null,e),t.current=i,i.stateNode=t,i.memoizedState={element:r,isDehydrated:n,cache:null,transitions:null,pendingSuspenseBoundaries:null},_c(i),t}function Jy(t,e,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:nr,key:r==null?null:""+r,children:t,containerInfo:e,implementation:n}}function mg(t){if(!t)return pn;t=t._reactInternals;e:{if(Yn(t)!==t||t.tag!==1)throw Error(C(170));var e=t;do{switch(e.tag){case 3:e=e.stateNode.context;break e;case 1:if(Le(e.type)){e=e.stateNode.__reactInternalMemoizedMergedChildContext;break e}}e=e.return}while(e!==null);throw Error(C(171))}if(t.tag===1){var n=t.type;if(Le(n))return mm(t,n,e)}return e}function gg(t,e,n,r,s,i,o,l,a){return t=jc(n,r,!0,t,s,i,o,l,a),t.context=mg(null),n=t.current,r=be(),s=on(n),i=Tt(r,s),i.callback=e??null,rn(n,i,s),t.current.lanes=s,ci(t,s,r),Be(t,r),t}function gl(t,e,n,r){var s=e.current,i=be(),o=on(s);return n=mg(n),e.context===null?e.context=n:e.pendingContext=n,e=Tt(i,o),e.payload={element:t},r=r===void 0?null:r,r!==null&&(e.callback=r),t=rn(s,e,o),t!==null&&(lt(t,s,o,i),Yi(t,s,o)),o}function Ao(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function $h(t,e){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var n=t.retryLane;t.retryLane=n!==0&&n<e?n:e}}function Dc(t,e){$h(t,e),(t=t.alternate)&&$h(t,e)}function Zy(){return null}var _g=typeof reportError=="function"?reportError:function(t){console.error(t)};function Mc(t){this._internalRoot=t}_l.prototype.render=Mc.prototype.render=function(t){var e=this._internalRoot;if(e===null)throw Error(C(409));gl(t,e,null,null)};_l.prototype.unmount=Mc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var e=t.containerInfo;Wn(function(){gl(null,t,null,null)}),e[At]=null}};function _l(t){this._internalRoot=t}_l.prototype.unstable_scheduleHydration=function(t){if(t){var e=Qp();t={blockedOn:null,target:t,priority:e};for(var n=0;n<Ht.length&&e!==0&&e<Ht[n].priority;n++);Ht.splice(n,0,t),n===0&&Yp(t)}};function Fc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function vl(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function Gh(){}function e1(t,e,n,r,s){if(s){if(typeof r=="function"){var i=r;r=function(){var c=Ao(o);i.call(c)}}var o=gg(e,r,t,0,null,!1,!1,"",Gh);return t._reactRootContainer=o,t[At]=o.current,Ws(t.nodeType===8?t.parentNode:t),Wn(),o}for(;s=t.lastChild;)t.removeChild(s);if(typeof r=="function"){var l=r;r=function(){var c=Ao(a);l.call(c)}}var a=jc(t,0,!1,null,null,!1,!1,"",Gh);return t._reactRootContainer=a,t[At]=a.current,Ws(t.nodeType===8?t.parentNode:t),Wn(function(){gl(e,a,n,r)}),a}function yl(t,e,n,r,s){var i=n._reactRootContainer;if(i){var o=i;if(typeof s=="function"){var l=s;s=function(){var a=Ao(o);l.call(a)}}gl(e,o,t,s)}else o=e1(n,e,t,s,r);return Ao(o)}Gp=function(t){switch(t.tag){case 3:var e=t.stateNode;if(e.current.memoizedState.isDehydrated){var n=_s(e.pendingLanes);n!==0&&(nc(e,n|1),Be(e,oe()),!(z&6)&&(Fr=oe()+500,xn()))}break;case 13:Wn(function(){var r=Ot(t,1);if(r!==null){var s=be();lt(r,t,1,s)}}),Dc(t,1)}};rc=function(t){if(t.tag===13){var e=Ot(t,134217728);if(e!==null){var n=be();lt(e,t,134217728,n)}Dc(t,134217728)}};Kp=function(t){if(t.tag===13){var e=on(t),n=Ot(t,e);if(n!==null){var r=be();lt(n,t,e,r)}Dc(t,e)}};Qp=function(){return V};qp=function(t,e){var n=V;try{return V=t,e()}finally{V=n}};za=function(t,e,n){switch(e){case"input":if(ja(t,n),e=n.name,n.type==="radio"&&e!=null){for(n=t;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll("input[name="+JSON.stringify(""+e)+'][type="radio"]'),e=0;e<n.length;e++){var r=n[e];if(r!==t&&r.form===t.form){var s=ul(r);if(!s)throw Error(C(90));Np(r),ja(r,s)}}}break;case"textarea":bp(t,n);break;case"select":e=n.value,e!=null&&vr(t,!!n.multiple,e,!1)}};Dp=Rc;Mp=Wn;var t1={usingClientEntryPoint:!1,Events:[hi,lr,ul,Op,jp,Rc]},cs={findFiberByHostInstance:Rn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},n1={bundleType:cs.bundleType,version:cs.version,rendererPackageName:cs.rendererPackageName,rendererConfig:cs.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:Bt.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Bp(t),t===null?null:t.stateNode},findFiberByHostInstance:cs.findFiberByHostInstance||Zy,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var zi=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!zi.isDisabled&&zi.supportsFiber)try{il=zi.inject(n1),mt=zi}catch{}}He.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=t1;He.createPortal=function(t,e){var n=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Fc(e))throw Error(C(200));return Jy(t,e,null,n)};He.createRoot=function(t,e){if(!Fc(t))throw Error(C(299));var n=!1,r="",s=_g;return e!=null&&(e.unstable_strictMode===!0&&(n=!0),e.identifierPrefix!==void 0&&(r=e.identifierPrefix),e.onRecoverableError!==void 0&&(s=e.onRecoverableError)),e=jc(t,1,!1,null,null,n,!1,r,s),t[At]=e.current,Ws(t.nodeType===8?t.parentNode:t),new Mc(e)};He.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var e=t._reactInternals;if(e===void 0)throw typeof t.render=="function"?Error(C(188)):(t=Object.keys(t).join(","),Error(C(268,t)));return t=Bp(e),t=t===null?null:t.stateNode,t};He.flushSync=function(t){return Wn(t)};He.hydrate=function(t,e,n){if(!vl(e))throw Error(C(200));return yl(null,t,e,!0,n)};He.hydrateRoot=function(t,e,n){if(!Fc(t))throw Error(C(405));var r=n!=null&&n.hydratedSources||null,s=!1,i="",o=_g;if(n!=null&&(n.unstable_strictMode===!0&&(s=!0),n.identifierPrefix!==void 0&&(i=n.identifierPrefix),n.onRecoverableError!==void 0&&(o=n.onRecoverableError)),e=gg(e,null,t,1,n??null,s,!1,i,o),t[At]=e.current,Ws(t),r)for(t=0;t<r.length;t++)n=r[t],s=n._getVersion,s=s(n._source),e.mutableSourceEagerHydrationData==null?e.mutableSourceEagerHydrationData=[n,s]:e.mutableSourceEagerHydrationData.push(n,s);return new _l(e)};He.render=function(t,e,n){if(!vl(e))throw Error(C(200));return yl(null,t,e,!1,n)};He.unmountComponentAtNode=function(t){if(!vl(t))throw Error(C(40));return t._reactRootContainer?(Wn(function(){yl(null,null,t,!1,function(){t._reactRootContainer=null,t[At]=null})}),!0):!1};He.unstable_batchedUpdates=Rc;He.unstable_renderSubtreeIntoContainer=function(t,e,n,r){if(!vl(n))throw Error(C(200));if(t==null||t._reactInternals===void 0)throw Error(C(38));return yl(t,e,n,!1,r)};He.version="18.3.1-next-f1338f8080-20240426";function vg(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(vg)}catch(t){console.error(t)}}vg(),vp.exports=He;var r1=vp.exports,Kh=r1;Ia.createRoot=Kh.createRoot,Ia.hydrateRoot=Kh.hydrateRoot;var Qh={};/**
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
 */const yg={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const k=function(t,e){if(!t)throw qr(e)},qr=function(t){return new Error("Firebase Database ("+yg.SDK_VERSION+") INTERNAL ASSERT FAILED: "+t)};/**
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
 */const xg=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):(s&64512)===55296&&r+1<t.length&&(t.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(t.charCodeAt(++r)&1023),e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},s1=function(t){const e=[];let n=0,r=0;for(;n<t.length;){const s=t[n++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=t[n++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=t[n++],o=t[n++],l=t[n++],a=((s&7)<<18|(i&63)<<12|(o&63)<<6|l&63)-65536;e[r++]=String.fromCharCode(55296+(a>>10)),e[r++]=String.fromCharCode(56320+(a&1023))}else{const i=t[n++],o=t[n++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Lc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();const n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<t.length;s+=3){const i=t[s],o=s+1<t.length,l=o?t[s+1]:0,a=s+2<t.length,c=a?t[s+2]:0,h=i>>2,d=(i&3)<<4|l>>4;let f=(l&15)<<2|c>>6,_=c&63;a||(_=64,o||(f=64)),r.push(n[h],n[d],n[f],n[_])}return r.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(xg(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):s1(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();const n=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<t.length;){const i=n[t.charAt(s++)],l=s<t.length?n[t.charAt(s)]:0;++s;const c=s<t.length?n[t.charAt(s)]:64;++s;const d=s<t.length?n[t.charAt(s)]:64;if(++s,i==null||l==null||c==null||d==null)throw new i1;const f=i<<2|l>>4;if(r.push(f),c!==64){const _=l<<4&240|c>>2;if(r.push(_),d!==64){const y=c<<6&192|d;r.push(y)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}};class i1 extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const wg=function(t){const e=xg(t);return Lc.encodeByteArray(e,!0)},Oo=function(t){return wg(t).replace(/\./g,"")},jo=function(t){try{return Lc.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function o1(t){return Eg(void 0,t)}function Eg(t,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const n=e;return new Date(n.getTime());case Object:t===void 0&&(t={});break;case Array:t=[];break;default:return e}for(const n in e)!e.hasOwnProperty(n)||!l1(n)||(t[n]=Eg(t[n],e[n]));return t}function l1(t){return t!=="__proto__"}/**
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
 */function a1(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
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
 */const u1=()=>a1().__FIREBASE_DEFAULTS__,c1=()=>{if(typeof process>"u"||typeof Qh>"u")return;const t=Qh.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},d1=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=t&&jo(t[1]);return e&&JSON.parse(e)},Bc=()=>{try{return u1()||c1()||d1()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},Sg=t=>{var e,n;return(n=(e=Bc())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},h1=t=>{const e=Sg(t);if(!e)return;const n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),r]:[e.substring(0,n),r]},Cg=()=>{var t;return(t=Bc())===null||t===void 0?void 0:t.config},kg=t=>{var e;return(e=Bc())===null||e===void 0?void 0:e[`_${t}`]};/**
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
 */class pi{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,r)=>{n?this.reject(n):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,r))}}}/**
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
 */function f1(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const n={alg:"none",type:"JWT"},r=e||"demo-project",s=t.iat||0,i=t.sub||t.user_id;if(!i)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:i,user_id:i,firebase:{sign_in_provider:"custom",identities:{}}},t);return[Oo(JSON.stringify(n)),Oo(JSON.stringify(o)),""].join(".")}/**
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
 */function Re(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Uc(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Re())}function p1(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function m1(){const t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function Ng(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function g1(){const t=Re();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function _1(){return yg.NODE_ADMIN===!0}function v1(){try{return typeof indexedDB=="object"}catch{return!1}}function y1(){return new Promise((t,e)=>{try{let n=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),n||self.indexedDB.deleteDatabase(r),t(!0)},s.onupgradeneeded=()=>{n=!1},s.onerror=()=>{var i;e(((i=s.error)===null||i===void 0?void 0:i.message)||"")}}catch(n){e(n)}})}/**
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
 */const x1="FirebaseError";class wn extends Error{constructor(e,n,r){super(n),this.code=e,this.customData=r,this.name=x1,Object.setPrototypeOf(this,wn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,mi.prototype.create)}}class mi{constructor(e,n,r){this.service=e,this.serviceName=n,this.errors=r}create(e,...n){const r=n[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?w1(i,r):"Error",l=`${this.serviceName}: ${o} (${s}).`;return new wn(s,l,r)}}function w1(t,e){return t.replace(E1,(n,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const E1=/\{\$([^}]+)}/g;/**
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
 */function Xs(t){return JSON.parse(t)}function me(t){return JSON.stringify(t)}/**
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
 */const Ig=function(t){let e={},n={},r={},s="";try{const i=t.split(".");e=Xs(jo(i[0])||""),n=Xs(jo(i[1])||""),s=i[2],r=n.d||{},delete n.d}catch{}return{header:e,claims:n,data:r,signature:s}},S1=function(t){const e=Ig(t),n=e.claims;return!!n&&typeof n=="object"&&n.hasOwnProperty("iat")},C1=function(t){const e=Ig(t).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function yt(t,e){return Object.prototype.hasOwnProperty.call(t,e)}function Lr(t,e){if(Object.prototype.hasOwnProperty.call(t,e))return t[e]}function xu(t){for(const e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function Do(t,e,n){const r={};for(const s in t)Object.prototype.hasOwnProperty.call(t,s)&&(r[s]=e.call(n,t[s],s,t));return r}function Mo(t,e){if(t===e)return!0;const n=Object.keys(t),r=Object.keys(e);for(const s of n){if(!r.includes(s))return!1;const i=t[s],o=e[s];if(qh(i)&&qh(o)){if(!Mo(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!n.includes(s))return!1;return!0}function qh(t){return t!==null&&typeof t=="object"}/**
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
 */function Yr(t){const e=[];for(const[n,r]of Object.entries(t))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}/**
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
 */class k1{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,n){n||(n=0);const r=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)r[d]=e.charCodeAt(n)<<24|e.charCodeAt(n+1)<<16|e.charCodeAt(n+2)<<8|e.charCodeAt(n+3),n+=4;else for(let d=0;d<16;d++)r[d]=e[n]<<24|e[n+1]<<16|e[n+2]<<8|e[n+3],n+=4;for(let d=16;d<80;d++){const f=r[d-3]^r[d-8]^r[d-14]^r[d-16];r[d]=(f<<1|f>>>31)&4294967295}let s=this.chain_[0],i=this.chain_[1],o=this.chain_[2],l=this.chain_[3],a=this.chain_[4],c,h;for(let d=0;d<80;d++){d<40?d<20?(c=l^i&(o^l),h=1518500249):(c=i^o^l,h=1859775393):d<60?(c=i&o|l&(i|o),h=2400959708):(c=i^o^l,h=3395469782);const f=(s<<5|s>>>27)+c+a+h+r[d]&4294967295;a=l,l=o,o=(i<<30|i>>>2)&4294967295,i=s,s=f}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+i&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+l&4294967295,this.chain_[4]=this.chain_[4]+a&4294967295}update(e,n){if(e==null)return;n===void 0&&(n=e.length);const r=n-this.blockSize;let s=0;const i=this.buf_;let o=this.inbuf_;for(;s<n;){if(o===0)for(;s<=r;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<n;)if(i[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}else for(;s<n;)if(i[o]=e[s],++o,++s,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=n}digest(){const e=[];let n=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=n&255,n/=256;this.compress_(this.buf_);let r=0;for(let s=0;s<5;s++)for(let i=24;i>=0;i-=8)e[r]=this.chain_[s]>>i&255,++r;return e}}function N1(t,e){const n=new I1(t,e);return n.subscribe.bind(n)}class I1{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,r){let s;if(e===void 0&&n===void 0&&r===void 0)throw new Error("Missing Observer.");b1(e,["next","error","complete"])?s=e:s={next:e,error:n,complete:r},s.next===void 0&&(s.next=fa),s.error===void 0&&(s.error=fa),s.complete===void 0&&(s.complete=fa);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function b1(t,e){if(typeof t!="object"||t===null)return!1;for(const n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function fa(){}function xl(t,e){return`${t} failed: ${e} argument `}/**
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
 */const T1=function(t){const e=[];let n=0;for(let r=0;r<t.length;r++){let s=t.charCodeAt(r);if(s>=55296&&s<=56319){const i=s-55296;r++,k(r<t.length,"Surrogate pair missing trail surrogate.");const o=t.charCodeAt(r)-56320;s=65536+(i<<10)+o}s<128?e[n++]=s:s<2048?(e[n++]=s>>6|192,e[n++]=s&63|128):s<65536?(e[n++]=s>>12|224,e[n++]=s>>6&63|128,e[n++]=s&63|128):(e[n++]=s>>18|240,e[n++]=s>>12&63|128,e[n++]=s>>6&63|128,e[n++]=s&63|128)}return e},wl=function(t){let e=0;for(let n=0;n<t.length;n++){const r=t.charCodeAt(n);r<128?e++:r<2048?e+=2:r>=55296&&r<=56319?(e+=4,n++):e+=3}return e};/**
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
 */function Ze(t){return t&&t._delegate?t._delegate:t}class Vn{constructor(e,n,r){this.name=e,this.instanceFactory=n,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const bn="[DEFAULT]";/**
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
 */class R1{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){const r=new pi;if(this.instancesDeferred.set(n,r),this.isInitialized(n)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:n});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(n=e==null?void 0:e.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(i){if(s)return null;throw i}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(A1(e))try{this.getOrInitializeService({instanceIdentifier:bn})}catch{}for(const[n,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(n);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=bn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=bn){return this.instances.has(e)}getOptions(e=bn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:n={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:n});for(const[i,o]of this.instancesDeferred.entries()){const l=this.normalizeInstanceIdentifier(i);r===l&&o.resolve(s)}return s}onInit(e,n){var r;const s=this.normalizeInstanceIdentifier(n),i=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;i.add(e),this.onInitCallbacks.set(s,i);const o=this.instances.get(s);return o&&e(o,s),()=>{i.delete(e)}}invokeOnInitCallbacks(e,n){const r=this.onInitCallbacks.get(n);if(r)for(const s of r)try{s(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:P1(e),options:n}),this.instances.set(e,r),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=bn){return this.component?this.component.multipleInstances?e:bn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function P1(t){return t===bn?void 0:t}function A1(t){return t.instantiationMode==="EAGER"}/**
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
 */class O1{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const n=new R1(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var H;(function(t){t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT"})(H||(H={}));const j1={debug:H.DEBUG,verbose:H.VERBOSE,info:H.INFO,warn:H.WARN,error:H.ERROR,silent:H.SILENT},D1=H.INFO,M1={[H.DEBUG]:"log",[H.VERBOSE]:"log",[H.INFO]:"info",[H.WARN]:"warn",[H.ERROR]:"error"},F1=(t,e,...n)=>{if(e<t.logLevel)return;const r=new Date().toISOString(),s=M1[e];if(s)console[s](`[${r}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class zc{constructor(e){this.name=e,this._logLevel=D1,this._logHandler=F1,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in H))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?j1[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,H.DEBUG,...e),this._logHandler(this,H.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,H.VERBOSE,...e),this._logHandler(this,H.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,H.INFO,...e),this._logHandler(this,H.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,H.WARN,...e),this._logHandler(this,H.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,H.ERROR,...e),this._logHandler(this,H.ERROR,...e)}}const L1=(t,e)=>e.some(n=>t instanceof n);let Yh,Xh;function B1(){return Yh||(Yh=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function U1(){return Xh||(Xh=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const bg=new WeakMap,wu=new WeakMap,Tg=new WeakMap,pa=new WeakMap,Wc=new WeakMap;function z1(t){const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("success",i),t.removeEventListener("error",o)},i=()=>{n(an(t.result)),s()},o=()=>{r(t.error),s()};t.addEventListener("success",i),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&bg.set(n,t)}).catch(()=>{}),Wc.set(e,t),e}function W1(t){if(wu.has(t))return;const e=new Promise((n,r)=>{const s=()=>{t.removeEventListener("complete",i),t.removeEventListener("error",o),t.removeEventListener("abort",o)},i=()=>{n(),s()},o=()=>{r(t.error||new DOMException("AbortError","AbortError")),s()};t.addEventListener("complete",i),t.addEventListener("error",o),t.addEventListener("abort",o)});wu.set(t,e)}let Eu={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return wu.get(t);if(e==="objectStoreNames")return t.objectStoreNames||Tg.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return an(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function V1(t){Eu=t(Eu)}function H1(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){const r=t.call(ma(this),e,...n);return Tg.set(r,e.sort?e.sort():[e]),an(r)}:U1().includes(t)?function(...e){return t.apply(ma(this),e),an(bg.get(this))}:function(...e){return an(t.apply(ma(this),e))}}function $1(t){return typeof t=="function"?H1(t):(t instanceof IDBTransaction&&W1(t),L1(t,B1())?new Proxy(t,Eu):t)}function an(t){if(t instanceof IDBRequest)return z1(t);if(pa.has(t))return pa.get(t);const e=$1(t);return e!==t&&(pa.set(t,e),Wc.set(e,t)),e}const ma=t=>Wc.get(t);function G1(t,e,{blocked:n,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(t,e),l=an(o);return r&&o.addEventListener("upgradeneeded",a=>{r(an(o.result),a.oldVersion,a.newVersion,an(o.transaction),a)}),n&&o.addEventListener("blocked",a=>n(a.oldVersion,a.newVersion,a)),l.then(a=>{i&&a.addEventListener("close",()=>i()),s&&a.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),l}const K1=["get","getKey","getAll","getAllKeys","count"],Q1=["put","add","delete","clear"],ga=new Map;function Jh(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(ga.get(e))return ga.get(e);const n=e.replace(/FromIndex$/,""),r=e!==n,s=Q1.includes(n);if(!(n in(r?IDBIndex:IDBObjectStore).prototype)||!(s||K1.includes(n)))return;const i=async function(o,...l){const a=this.transaction(o,s?"readwrite":"readonly");let c=a.store;return r&&(c=c.index(l.shift())),(await Promise.all([c[n](...l),s&&a.done]))[0]};return ga.set(e,i),i}V1(t=>({...t,get:(e,n,r)=>Jh(e,n)||t.get(e,n,r),has:(e,n)=>!!Jh(e,n)||t.has(e,n)}));/**
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
 */class q1{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Y1(n)){const r=n.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(n=>n).join(" ")}}function Y1(t){const e=t.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Su="@firebase/app",Zh="0.10.13";/**
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
 */const Dt=new zc("@firebase/app"),X1="@firebase/app-compat",J1="@firebase/analytics-compat",Z1="@firebase/analytics",ex="@firebase/app-check-compat",tx="@firebase/app-check",nx="@firebase/auth",rx="@firebase/auth-compat",sx="@firebase/database",ix="@firebase/data-connect",ox="@firebase/database-compat",lx="@firebase/functions",ax="@firebase/functions-compat",ux="@firebase/installations",cx="@firebase/installations-compat",dx="@firebase/messaging",hx="@firebase/messaging-compat",fx="@firebase/performance",px="@firebase/performance-compat",mx="@firebase/remote-config",gx="@firebase/remote-config-compat",_x="@firebase/storage",vx="@firebase/storage-compat",yx="@firebase/firestore",xx="@firebase/vertexai-preview",wx="@firebase/firestore-compat",Ex="firebase",Sx="10.14.1";/**
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
 */const Cu="[DEFAULT]",Cx={[Su]:"fire-core",[X1]:"fire-core-compat",[Z1]:"fire-analytics",[J1]:"fire-analytics-compat",[tx]:"fire-app-check",[ex]:"fire-app-check-compat",[nx]:"fire-auth",[rx]:"fire-auth-compat",[sx]:"fire-rtdb",[ix]:"fire-data-connect",[ox]:"fire-rtdb-compat",[lx]:"fire-fn",[ax]:"fire-fn-compat",[ux]:"fire-iid",[cx]:"fire-iid-compat",[dx]:"fire-fcm",[hx]:"fire-fcm-compat",[fx]:"fire-perf",[px]:"fire-perf-compat",[mx]:"fire-rc",[gx]:"fire-rc-compat",[_x]:"fire-gcs",[vx]:"fire-gcs-compat",[yx]:"fire-fst",[wx]:"fire-fst-compat",[xx]:"fire-vertex","fire-js":"fire-js",[Ex]:"fire-js-all"};/**
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
 */const Fo=new Map,kx=new Map,ku=new Map;function ef(t,e){try{t.container.addComponent(e)}catch(n){Dt.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function Br(t){const e=t.name;if(ku.has(e))return Dt.debug(`There were multiple attempts to register component ${e}.`),!1;ku.set(e,t);for(const n of Fo.values())ef(n,t);for(const n of kx.values())ef(n,t);return!0}function Vc(t,e){const n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function Ct(t){return t.settings!==void 0}/**
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
 */const Nx={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},un=new mi("app","Firebase",Nx);/**
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
 */class Ix{constructor(e,n,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Vn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw un.create("app-deleted",{appName:this._name})}}/**
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
 */const Xr=Sx;function Rg(t,e={}){let n=t;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Cu,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw un.create("bad-app-name",{appName:String(s)});if(n||(n=Cg()),!n)throw un.create("no-options");const i=Fo.get(s);if(i){if(Mo(n,i.options)&&Mo(r,i.config))return i;throw un.create("duplicate-app",{appName:s})}const o=new O1(s);for(const a of ku.values())o.addComponent(a);const l=new Ix(n,r,o);return Fo.set(s,l),l}function Pg(t=Cu){const e=Fo.get(t);if(!e&&t===Cu&&Cg())return Rg();if(!e)throw un.create("no-app",{appName:t});return e}function cn(t,e,n){var r;let s=(r=Cx[t])!==null&&r!==void 0?r:t;n&&(s+=`-${n}`);const i=s.match(/\s|\//),o=e.match(/\s|\//);if(i||o){const l=[`Unable to register library "${s}" with version "${e}":`];i&&l.push(`library name "${s}" contains illegal characters (whitespace or "/")`),i&&o&&l.push("and"),o&&l.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Dt.warn(l.join(" "));return}Br(new Vn(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
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
 */const bx="firebase-heartbeat-database",Tx=1,Js="firebase-heartbeat-store";let _a=null;function Ag(){return _a||(_a=G1(bx,Tx,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(Js)}catch(n){console.warn(n)}}}}).catch(t=>{throw un.create("idb-open",{originalErrorMessage:t.message})})),_a}async function Rx(t){try{const n=(await Ag()).transaction(Js),r=await n.objectStore(Js).get(Og(t));return await n.done,r}catch(e){if(e instanceof wn)Dt.warn(e.message);else{const n=un.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});Dt.warn(n.message)}}}async function tf(t,e){try{const r=(await Ag()).transaction(Js,"readwrite");await r.objectStore(Js).put(e,Og(t)),await r.done}catch(n){if(n instanceof wn)Dt.warn(n.message);else{const r=un.create("idb-set",{originalErrorMessage:n==null?void 0:n.message});Dt.warn(r.message)}}}function Og(t){return`${t.name}!${t.options.appId}`}/**
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
 */const Px=1024,Ax=30*24*60*60*1e3;class Ox{constructor(e){this.container=e,this._heartbeatsCache=null;const n=this.container.getProvider("app").getImmediate();this._storage=new Dx(n),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,n;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),i=nf();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===i||this._heartbeatsCache.heartbeats.some(o=>o.date===i)?void 0:(this._heartbeatsCache.heartbeats.push({date:i,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const l=new Date(o.date).valueOf();return Date.now()-l<=Ax}),this._storage.overwrite(this._heartbeatsCache))}catch(r){Dt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const n=nf(),{heartbeatsToSend:r,unsentEntries:s}=jx(this._heartbeatsCache.heartbeats),i=Oo(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=n,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),i}catch(n){return Dt.warn(n),""}}}function nf(){return new Date().toISOString().substring(0,10)}function jx(t,e=Px){const n=[];let r=t.slice();for(const s of t){const i=n.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),rf(n)>e){i.dates.pop();break}}else if(n.push({agent:s.agent,dates:[s.date]}),rf(n)>e){n.pop();break}r=r.slice(1)}return{heartbeatsToSend:n,unsentEntries:r}}class Dx{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return v1()?y1().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const n=await Rx(this.app);return n!=null&&n.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return tf(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var n;if(await this._canUseIndexedDBPromise){const s=await this.read();return tf(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function rf(t){return Oo(JSON.stringify({version:2,heartbeats:t})).length}/**
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
 */function Mx(t){Br(new Vn("platform-logger",e=>new q1(e),"PRIVATE")),Br(new Vn("heartbeat",e=>new Ox(e),"PRIVATE")),cn(Su,Zh,t),cn(Su,Zh,"esm2017"),cn("fire-js","")}Mx("");var Fx="firebase",Lx="10.14.1";/**
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
 */cn(Fx,Lx,"app");function Hc(t,e){var n={};for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&e.indexOf(r)<0&&(n[r]=t[r]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(t);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(t,r[s])&&(n[r[s]]=t[r[s]]);return n}function jg(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Bx=jg,Dg=new mi("auth","Firebase",jg());/**
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
 */const Lo=new zc("@firebase/auth");function Ux(t,...e){Lo.logLevel<=H.WARN&&Lo.warn(`Auth (${Xr}): ${t}`,...e)}function ro(t,...e){Lo.logLevel<=H.ERROR&&Lo.error(`Auth (${Xr}): ${t}`,...e)}/**
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
 */function Mt(t,...e){throw $c(t,...e)}function _t(t,...e){return $c(t,...e)}function Mg(t,e,n){const r=Object.assign(Object.assign({},Bx()),{[e]:n});return new mi("auth","Firebase",r).create(e,{appName:t.name})}function dn(t){return Mg(t,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function $c(t,...e){if(typeof t!="string"){const n=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=t.name),t._errorFactory.create(n,...r)}return Dg.create(t,...e)}function A(t,e,...n){if(!t)throw $c(e,...n)}function kt(t){const e="INTERNAL ASSERTION FAILED: "+t;throw ro(e),new Error(e)}function Ft(t,e){t||kt(e)}/**
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
 */function Nu(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.href)||""}function zx(){return sf()==="http:"||sf()==="https:"}function sf(){var t;return typeof self<"u"&&((t=self.location)===null||t===void 0?void 0:t.protocol)||null}/**
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
 */function Wx(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(zx()||m1()||"connection"in navigator)?navigator.onLine:!0}function Vx(){if(typeof navigator>"u")return null;const t=navigator;return t.languages&&t.languages[0]||t.language||null}/**
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
 */class gi{constructor(e,n){this.shortDelay=e,this.longDelay=n,Ft(n>e,"Short delay should be less than long delay!"),this.isMobile=Uc()||Ng()}get(){return Wx()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
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
 */function Gc(t,e){Ft(t.emulator,"Emulator should always be set here");const{url:n}=t.emulator;return e?`${n}${e.startsWith("/")?e.slice(1):e}`:n}/**
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
 */class Fg{static initialize(e,n,r){this.fetchImpl=e,n&&(this.headersImpl=n),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;kt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;kt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;kt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
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
 */const Hx={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
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
 */const $x=new gi(3e4,6e4);function El(t,e){return t.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:t.tenantId}):e}async function Jr(t,e,n,r,s={}){return Lg(t,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const l=Yr(Object.assign({key:t.config.apiKey},o)).slice(1),a=await t._getAdditionalHeaders();a["Content-Type"]="application/json",t.languageCode&&(a["X-Firebase-Locale"]=t.languageCode);const c=Object.assign({method:e,headers:a},i);return p1()||(c.referrerPolicy="no-referrer"),Fg.fetch()(Ug(t,t.config.apiHost,n,l),c)})}async function Lg(t,e,n){t._canInitEmulator=!1;const r=Object.assign(Object.assign({},Hx),e);try{const s=new Gx(t),i=await Promise.race([n(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Wi(t,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const l=i.ok?o.errorMessage:o.error.message,[a,c]=l.split(" : ");if(a==="FEDERATED_USER_ID_ALREADY_LINKED")throw Wi(t,"credential-already-in-use",o);if(a==="EMAIL_EXISTS")throw Wi(t,"email-already-in-use",o);if(a==="USER_DISABLED")throw Wi(t,"user-disabled",o);const h=r[a]||a.toLowerCase().replace(/[_\s]+/g,"-");if(c)throw Mg(t,h,c);Mt(t,h)}}catch(s){if(s instanceof wn)throw s;Mt(t,"network-request-failed",{message:String(s)})}}async function Bg(t,e,n,r,s={}){const i=await Jr(t,e,n,r,s);return"mfaPendingCredential"in i&&Mt(t,"multi-factor-auth-required",{_serverResponse:i}),i}function Ug(t,e,n,r){const s=`${e}${n}?${r}`;return t.config.emulator?Gc(t.config,s):`${t.config.apiScheme}://${s}`}class Gx{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((n,r)=>{this.timer=setTimeout(()=>r(_t(this.auth,"network-request-failed")),$x.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function Wi(t,e,n){const r={appName:t.name};n.email&&(r.email=n.email),n.phoneNumber&&(r.phoneNumber=n.phoneNumber);const s=_t(t,e,r);return s.customData._tokenResponse=n,s}/**
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
 */async function Kx(t,e){return Jr(t,"POST","/v1/accounts:delete",e)}async function zg(t,e){return Jr(t,"POST","/v1/accounts:lookup",e)}/**
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
 */function bs(t){if(t)try{const e=new Date(Number(t));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Qx(t,e=!1){const n=Ze(t),r=await n.getIdToken(e),s=Kc(r);A(s&&s.exp&&s.auth_time&&s.iat,n.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i==null?void 0:i.sign_in_provider;return{claims:s,token:r,authTime:bs(va(s.auth_time)),issuedAtTime:bs(va(s.iat)),expirationTime:bs(va(s.exp)),signInProvider:o||null,signInSecondFactor:(i==null?void 0:i.sign_in_second_factor)||null}}function va(t){return Number(t)*1e3}function Kc(t){const[e,n,r]=t.split(".");if(e===void 0||n===void 0||r===void 0)return ro("JWT malformed, contained fewer than 3 sections"),null;try{const s=jo(n);return s?JSON.parse(s):(ro("Failed to decode base64 JWT payload"),null)}catch(s){return ro("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function of(t){const e=Kc(t);return A(e,"internal-error"),A(typeof e.exp<"u","internal-error"),A(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
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
 */async function Zs(t,e,n=!1){if(n)return e;try{return await e}catch(r){throw r instanceof wn&&qx(r)&&t.auth.currentUser===t&&await t.auth.signOut(),r}}function qx({code:t}){return t==="auth/user-disabled"||t==="auth/user-token-expired"}/**
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
 */class Yx{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var n;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((n=this.user.stsTokenManager.expirationTime)!==null&&n!==void 0?n:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const n=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},n)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
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
 */class Iu{constructor(e,n){this.createdAt=e,this.lastLoginAt=n,this._initializeTime()}_initializeTime(){this.lastSignInTime=bs(this.lastLoginAt),this.creationTime=bs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
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
 */async function Bo(t){var e;const n=t.auth,r=await t.getIdToken(),s=await Zs(t,zg(n,{idToken:r}));A(s==null?void 0:s.users.length,n,"internal-error");const i=s.users[0];t._notifyReloadListener(i);const o=!((e=i.providerUserInfo)===null||e===void 0)&&e.length?Wg(i.providerUserInfo):[],l=Jx(t.providerData,o),a=t.isAnonymous,c=!(t.email&&i.passwordHash)&&!(l!=null&&l.length),h=a?c:!1,d={uid:i.localId,displayName:i.displayName||null,photoURL:i.photoUrl||null,email:i.email||null,emailVerified:i.emailVerified||!1,phoneNumber:i.phoneNumber||null,tenantId:i.tenantId||null,providerData:l,metadata:new Iu(i.createdAt,i.lastLoginAt),isAnonymous:h};Object.assign(t,d)}async function Xx(t){const e=Ze(t);await Bo(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Jx(t,e){return[...t.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function Wg(t){return t.map(e=>{var{providerId:n}=e,r=Hc(e,["providerId"]);return{providerId:n,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
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
 */async function Zx(t,e){const n=await Lg(t,{},async()=>{const r=Yr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=t.config,o=Ug(t,s,"/v1/token",`key=${i}`),l=await t._getAdditionalHeaders();return l["Content-Type"]="application/x-www-form-urlencoded",Fg.fetch()(o,{method:"POST",headers:l,body:r})});return{accessToken:n.access_token,expiresIn:n.expires_in,refreshToken:n.refresh_token}}async function ew(t,e){return Jr(t,"POST","/v2/accounts:revokeToken",El(t,e))}/**
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
 */class Cr{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){A(e.idToken,"internal-error"),A(typeof e.idToken<"u","internal-error"),A(typeof e.refreshToken<"u","internal-error");const n="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):of(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,n)}updateFromIdToken(e){A(e.length!==0,"internal-error");const n=of(e);this.updateTokensAndExpiration(e,null,n)}async getToken(e,n=!1){return!n&&this.accessToken&&!this.isExpired?this.accessToken:(A(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,n){const{accessToken:r,refreshToken:s,expiresIn:i}=await Zx(e,n);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,n,r){this.refreshToken=n||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,n){const{refreshToken:r,accessToken:s,expirationTime:i}=n,o=new Cr;return r&&(A(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(A(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(A(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new Cr,this.toJSON())}_performRefresh(){return kt("not implemented")}}/**
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
 */function zt(t,e){A(typeof t=="string"||typeof t>"u","internal-error",{appName:e})}class Nt{constructor(e){var{uid:n,auth:r,stsTokenManager:s}=e,i=Hc(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new Yx(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=n,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=i.displayName||null,this.email=i.email||null,this.emailVerified=i.emailVerified||!1,this.phoneNumber=i.phoneNumber||null,this.photoURL=i.photoURL||null,this.isAnonymous=i.isAnonymous||!1,this.tenantId=i.tenantId||null,this.providerData=i.providerData?[...i.providerData]:[],this.metadata=new Iu(i.createdAt||void 0,i.lastLoginAt||void 0)}async getIdToken(e){const n=await Zs(this,this.stsTokenManager.getToken(this.auth,e));return A(n,this.auth,"internal-error"),this.accessToken!==n&&(this.accessToken=n,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),n}getIdTokenResult(e){return Qx(this,e)}reload(){return Xx(this)}_assign(e){this!==e&&(A(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(n=>Object.assign({},n)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const n=new Nt(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return n.metadata._copy(this.metadata),n}_onReload(e){A(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,n=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),n&&await Bo(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(Ct(this.auth.app))return Promise.reject(dn(this.auth));const e=await this.getIdToken();return await Zs(this,Kx(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,n){var r,s,i,o,l,a,c,h;const d=(r=n.displayName)!==null&&r!==void 0?r:void 0,f=(s=n.email)!==null&&s!==void 0?s:void 0,_=(i=n.phoneNumber)!==null&&i!==void 0?i:void 0,y=(o=n.photoURL)!==null&&o!==void 0?o:void 0,v=(l=n.tenantId)!==null&&l!==void 0?l:void 0,w=(a=n._redirectEventId)!==null&&a!==void 0?a:void 0,m=(c=n.createdAt)!==null&&c!==void 0?c:void 0,p=(h=n.lastLoginAt)!==null&&h!==void 0?h:void 0,{uid:g,emailVerified:x,isAnonymous:E,providerData:S,stsTokenManager:N}=n;A(g&&N,e,"internal-error");const T=Cr.fromJSON(this.name,N);A(typeof g=="string",e,"internal-error"),zt(d,e.name),zt(f,e.name),A(typeof x=="boolean",e,"internal-error"),A(typeof E=="boolean",e,"internal-error"),zt(_,e.name),zt(y,e.name),zt(v,e.name),zt(w,e.name),zt(m,e.name),zt(p,e.name);const L=new Nt({uid:g,auth:e,email:f,emailVerified:x,displayName:d,isAnonymous:E,photoURL:y,phoneNumber:_,tenantId:v,stsTokenManager:T,createdAt:m,lastLoginAt:p});return S&&Array.isArray(S)&&(L.providerData=S.map(P=>Object.assign({},P))),w&&(L._redirectEventId=w),L}static async _fromIdTokenResponse(e,n,r=!1){const s=new Cr;s.updateFromServerResponse(n);const i=new Nt({uid:n.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await Bo(i),i}static async _fromGetAccountInfoResponse(e,n,r){const s=n.users[0];A(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?Wg(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!(i!=null&&i.length),l=new Cr;l.updateFromIdToken(r);const a=new Nt({uid:s.localId,auth:e,stsTokenManager:l,isAnonymous:o}),c={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Iu(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(i!=null&&i.length)};return Object.assign(a,c),a}}/**
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
 */const lf=new Map;function It(t){Ft(t instanceof Function,"Expected a class definition");let e=lf.get(t);return e?(Ft(e instanceof t,"Instance stored in cache mismatched with class"),e):(e=new t,lf.set(t,e),e)}/**
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
 */class Vg{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,n){this.storage[e]=n}async _get(e){const n=this.storage[e];return n===void 0?null:n}async _remove(e){delete this.storage[e]}_addListener(e,n){}_removeListener(e,n){}}Vg.type="NONE";const af=Vg;/**
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
 */function so(t,e,n){return`firebase:${t}:${e}:${n}`}class kr{constructor(e,n,r){this.persistence=e,this.auth=n,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=so(this.userKey,s.apiKey,i),this.fullPersistenceKey=so("persistence",s.apiKey,i),this.boundEventHandler=n._onStorageEvent.bind(n),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Nt._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const n=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,n)return this.setCurrentUser(n)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,n,r="authUser"){if(!n.length)return new kr(It(af),e,r);const s=(await Promise.all(n.map(async c=>{if(await c._isAvailable())return c}))).filter(c=>c);let i=s[0]||It(af);const o=so(r,e.config.apiKey,e.name);let l=null;for(const c of n)try{const h=await c._get(o);if(h){const d=Nt._fromJSON(e,h);c!==i&&(l=d),i=c;break}}catch{}const a=s.filter(c=>c._shouldAllowMigration);return!i._shouldAllowMigration||!a.length?new kr(i,e,r):(i=a[0],l&&await i._set(o,l.toJSON()),await Promise.all(n.map(async c=>{if(c!==i)try{await c._remove(o)}catch{}})),new kr(i,e,r))}}/**
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
 */function uf(t){const e=t.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Kg(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Hg(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(qg(e))return"Blackberry";if(Yg(e))return"Webos";if($g(e))return"Safari";if((e.includes("chrome/")||Gg(e))&&!e.includes("edge/"))return"Chrome";if(Qg(e))return"Android";{const n=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=t.match(n);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function Hg(t=Re()){return/firefox\//i.test(t)}function $g(t=Re()){const e=t.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Gg(t=Re()){return/crios\//i.test(t)}function Kg(t=Re()){return/iemobile/i.test(t)}function Qg(t=Re()){return/android/i.test(t)}function qg(t=Re()){return/blackberry/i.test(t)}function Yg(t=Re()){return/webos/i.test(t)}function Qc(t=Re()){return/iphone|ipad|ipod/i.test(t)||/macintosh/i.test(t)&&/mobile/i.test(t)}function tw(t=Re()){var e;return Qc(t)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function nw(){return g1()&&document.documentMode===10}function Xg(t=Re()){return Qc(t)||Qg(t)||Yg(t)||qg(t)||/windows phone/i.test(t)||Kg(t)}/**
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
 */function Jg(t,e=[]){let n;switch(t){case"Browser":n=uf(Re());break;case"Worker":n=`${uf(Re())}-${t}`;break;default:n=t}const r=e.length?e.join(","):"FirebaseCore-web";return`${n}/JsCore/${Xr}/${r}`}/**
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
 */class rw{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,n){const r=i=>new Promise((o,l)=>{try{const a=e(i);o(a)}catch(a){l(a)}});r.onAbort=n,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const n=[];try{for(const r of this.queue)await r(e),r.onAbort&&n.push(r.onAbort)}catch(r){n.reverse();for(const s of n)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
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
 */async function sw(t,e={}){return Jr(t,"GET","/v2/passwordPolicy",El(t,e))}/**
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
 */const iw=6;class ow{constructor(e){var n,r,s,i;const o=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(n=o.minPasswordLength)!==null&&n!==void 0?n:iw,o.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=o.maxPasswordLength),o.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=o.containsLowercaseCharacter),o.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=o.containsUppercaseCharacter),o.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=o.containsNumericCharacter),o.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=o.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(i=e.forceUpgradeOnSignin)!==null&&i!==void 0?i:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var n,r,s,i,o,l;const a={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,a),this.validatePasswordCharacterOptions(e,a),a.isValid&&(a.isValid=(n=a.meetsMinPasswordLength)!==null&&n!==void 0?n:!0),a.isValid&&(a.isValid=(r=a.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),a.isValid&&(a.isValid=(s=a.containsLowercaseLetter)!==null&&s!==void 0?s:!0),a.isValid&&(a.isValid=(i=a.containsUppercaseLetter)!==null&&i!==void 0?i:!0),a.isValid&&(a.isValid=(o=a.containsNumericCharacter)!==null&&o!==void 0?o:!0),a.isValid&&(a.isValid=(l=a.containsNonAlphanumericCharacter)!==null&&l!==void 0?l:!0),a}validatePasswordLengthOptions(e,n){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(n.meetsMinPasswordLength=e.length>=r),s&&(n.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,n){this.updatePasswordCharacterOptionsStatuses(n,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(n,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,n,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=n)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
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
 */class lw{constructor(e,n,r,s){this.app=e,this.heartbeatServiceProvider=n,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new cf(this),this.idTokenSubscription=new cf(this),this.beforeStateQueue=new rw(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Dg,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,n){return n&&(this._popupRedirectResolver=It(n)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await kr.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(n),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const n=await zg(this,{idToken:e}),r=await Nt._fromGetAccountInfoResponse(this,n,e);await this.directlySetCurrentUser(r)}catch(n){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",n),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var n;if(Ct(this.app)){const o=this.app.settings.authIdToken;return o?new Promise(l=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(o).then(l,l))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,i=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const o=(n=this.redirectUser)===null||n===void 0?void 0:n._redirectEventId,l=s==null?void 0:s._redirectEventId,a=await this.tryRedirectSignIn(e);(!o||o===l)&&(a!=null&&a.user)&&(s=a.user,i=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(i)try{await this.beforeStateQueue.runMiddleware(s)}catch(o){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(o))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return A(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let n=null;try{n=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return n}async reloadAndSetCurrentUserOrClear(e){try{await Bo(e)}catch(n){if((n==null?void 0:n.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Vx()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(Ct(this.app))return Promise.reject(dn(this));const n=e?Ze(e):null;return n&&A(n.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(n&&n._clone(this))}async _updateCurrentUser(e,n=!1){if(!this._deleted)return e&&A(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),n||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return Ct(this.app)?Promise.reject(dn(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return Ct(this.app)?Promise.reject(dn(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(It(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const n=this._getPasswordPolicyInternal();return n.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):n.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await sw(this),n=new ow(e);this.tenantId===null?this._projectPasswordPolicy=n:this._tenantPasswordPolicies[this.tenantId]=n}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new mi("auth","Firebase",e())}onAuthStateChanged(e,n,r){return this.registerStateListener(this.authStateSubscription,e,n,r)}beforeAuthStateChanged(e,n){return this.beforeStateQueue.pushCallback(e,n)}onIdTokenChanged(e,n,r){return this.registerStateListener(this.idTokenSubscription,e,n,r)}authStateReady(){return new Promise((e,n)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},n)}})}async revokeAccessToken(e){if(this.currentUser){const n=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:n};this.tenantId!=null&&(r.tenantId=this.tenantId),await ew(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,n){const r=await this.getOrInitRedirectPersistenceManager(n);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const n=e&&It(e)||this._popupRedirectResolver;A(n,this,"argument-error"),this.redirectPersistenceManager=await kr.create(this,[It(n._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var n,r;return this._isInitialized&&await this.queue(async()=>{}),((n=this._currentUser)===null||n===void 0?void 0:n._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,n;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(n=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&n!==void 0?n:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,n,r,s){if(this._deleted)return()=>{};const i=typeof n=="function"?n:n.next.bind(n);let o=!1;const l=this._isInitialized?Promise.resolve():this._initializationPromise;if(A(l,this,"internal-error"),l.then(()=>{o||i(this.currentUser)}),typeof n=="function"){const a=e.addObserver(n,r,s);return()=>{o=!0,a()}}else{const a=e.addObserver(n);return()=>{o=!0,a()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return A(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Jg(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const n={"X-Client-Version":this.clientVersion};this.app.options.appId&&(n["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(n["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(n["X-Firebase-AppCheck"]=s),n}async _getAppCheckToken(){var e;const n=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return n!=null&&n.error&&Ux(`Error while retrieving App Check token: ${n.error}`),n==null?void 0:n.token}}function Sl(t){return Ze(t)}class cf{constructor(e){this.auth=e,this.observer=null,this.addObserver=N1(n=>this.observer=n)}get next(){return A(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
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
 */let qc={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function aw(t){qc=t}function uw(t){return qc.loadJS(t)}function cw(){return qc.gapiScript}function dw(t){return`__${t}${Math.floor(Math.random()*1e6)}`}/**
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
 */function hw(t,e){const n=Vc(t,"auth");if(n.isInitialized()){const s=n.getImmediate(),i=n.getOptions();if(Mo(i,e??{}))return s;Mt(s,"already-initialized")}return n.initialize({options:e})}function fw(t,e){const n=(e==null?void 0:e.persistence)||[],r=(Array.isArray(n)?n:[n]).map(It);e!=null&&e.errorMap&&t._updateErrorMap(e.errorMap),t._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function pw(t,e,n){const r=Sl(t);A(r._canInitEmulator,r,"emulator-config-failed"),A(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Zg(e),{host:o,port:l}=mw(e),a=l===null?"":`:${l}`;r.config.emulator={url:`${i}//${o}${a}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:o,port:l,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})}),gw()}function Zg(t){const e=t.indexOf(":");return e<0?"":t.substr(0,e+1)}function mw(t){const e=Zg(t),n=/(\/\/)?([^?#/]+)/.exec(t.substr(e.length));if(!n)return{host:"",port:null};const r=n[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:df(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:df(o)}}}function df(t){if(!t)return null;const e=Number(t);return isNaN(e)?null:e}function gw(){function t(){const e=document.createElement("p"),n=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",n.position="fixed",n.width="100%",n.backgroundColor="#ffffff",n.border=".1em solid #000000",n.color="#b50000",n.bottom="0px",n.left="0px",n.margin="0px",n.zIndex="10000",n.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",t):t())}/**
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
 */class e_{constructor(e,n){this.providerId=e,this.signInMethod=n}toJSON(){return kt("not implemented")}_getIdTokenResponse(e){return kt("not implemented")}_linkToIdToken(e,n){return kt("not implemented")}_getReauthenticationResolver(e){return kt("not implemented")}}/**
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
 */async function Nr(t,e){return Bg(t,"POST","/v1/accounts:signInWithIdp",El(t,e))}/**
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
 */const _w="http://localhost";class Hn extends e_{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const n=new Hn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(n.idToken=e.idToken),e.accessToken&&(n.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(n.nonce=e.nonce),e.pendingToken&&(n.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(n.accessToken=e.oauthToken,n.secret=e.oauthTokenSecret):Mt("argument-error"),n}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const n=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=n,i=Hc(n,["providerId","signInMethod"]);if(!r||!s)return null;const o=new Hn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const n=this.buildRequest();return Nr(e,n)}_linkToIdToken(e,n){const r=this.buildRequest();return r.idToken=n,Nr(e,r)}_getReauthenticationResolver(e){const n=this.buildRequest();return n.autoCreate=!1,Nr(e,n)}buildRequest(){const e={requestUri:_w,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const n={};this.idToken&&(n.id_token=this.idToken),this.accessToken&&(n.access_token=this.accessToken),this.secret&&(n.oauth_token_secret=this.secret),n.providerId=this.providerId,this.nonce&&!this.pendingToken&&(n.nonce=this.nonce),e.postBody=Yr(n)}return e}}/**
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
 */class t_{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
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
 */class _i extends t_{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
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
 */class Gt extends _i{constructor(){super("facebook.com")}static credential(e){return Hn._fromParams({providerId:Gt.PROVIDER_ID,signInMethod:Gt.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Gt.credentialFromTaggedObject(e)}static credentialFromError(e){return Gt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Gt.credential(e.oauthAccessToken)}catch{return null}}}Gt.FACEBOOK_SIGN_IN_METHOD="facebook.com";Gt.PROVIDER_ID="facebook.com";/**
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
 */class Kt extends _i{constructor(){super("google.com"),this.addScope("profile")}static credential(e,n){return Hn._fromParams({providerId:Kt.PROVIDER_ID,signInMethod:Kt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:n})}static credentialFromResult(e){return Kt.credentialFromTaggedObject(e)}static credentialFromError(e){return Kt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:n,oauthAccessToken:r}=e;if(!n&&!r)return null;try{return Kt.credential(n,r)}catch{return null}}}Kt.GOOGLE_SIGN_IN_METHOD="google.com";Kt.PROVIDER_ID="google.com";/**
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
 */class Qt extends _i{constructor(){super("github.com")}static credential(e){return Hn._fromParams({providerId:Qt.PROVIDER_ID,signInMethod:Qt.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return Qt.credentialFromTaggedObject(e)}static credentialFromError(e){return Qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return Qt.credential(e.oauthAccessToken)}catch{return null}}}Qt.GITHUB_SIGN_IN_METHOD="github.com";Qt.PROVIDER_ID="github.com";/**
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
 */class qt extends _i{constructor(){super("twitter.com")}static credential(e,n){return Hn._fromParams({providerId:qt.PROVIDER_ID,signInMethod:qt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:n})}static credentialFromResult(e){return qt.credentialFromTaggedObject(e)}static credentialFromError(e){return qt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:n,oauthTokenSecret:r}=e;if(!n||!r)return null;try{return qt.credential(n,r)}catch{return null}}}qt.TWITTER_SIGN_IN_METHOD="twitter.com";qt.PROVIDER_ID="twitter.com";/**
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
 */async function vw(t,e){return Bg(t,"POST","/v1/accounts:signUp",El(t,e))}/**
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
 */class mn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,n,r,s=!1){const i=await Nt._fromIdTokenResponse(e,r,s),o=hf(r);return new mn({user:i,providerId:o,_tokenResponse:r,operationType:n})}static async _forOperation(e,n,r){await e._updateTokensIfNecessary(r,!0);const s=hf(r);return new mn({user:e,providerId:s,_tokenResponse:r,operationType:n})}}function hf(t){return t.providerId?t.providerId:"phoneNumber"in t?"phone":null}/**
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
 */async function yw(t){var e;if(Ct(t.app))return Promise.reject(dn(t));const n=Sl(t);if(await n._initializationPromise,!((e=n.currentUser)===null||e===void 0)&&e.isAnonymous)return new mn({user:n.currentUser,providerId:null,operationType:"signIn"});const r=await vw(n,{returnSecureToken:!0}),s=await mn._fromIdTokenResponse(n,"signIn",r,!0);return await n._updateCurrentUser(s.user),s}/**
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
 */class Uo extends wn{constructor(e,n,r,s){var i;super(n.code,n.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,Uo.prototype),this.customData={appName:e.name,tenantId:(i=e.tenantId)!==null&&i!==void 0?i:void 0,_serverResponse:n.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,n,r,s){return new Uo(e,n,r,s)}}function n_(t,e,n,r){return(e==="reauthenticate"?n._getReauthenticationResolver(t):n._getIdTokenResponse(t)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?Uo._fromErrorAndOperation(t,i,e,r):i})}async function xw(t,e,n=!1){const r=await Zs(t,e._linkToIdToken(t.auth,await t.getIdToken()),n);return mn._forOperation(t,"link",r)}/**
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
 */async function ww(t,e,n=!1){const{auth:r}=t;if(Ct(r.app))return Promise.reject(dn(r));const s="reauthenticate";try{const i=await Zs(t,n_(r,s,e,t),n);A(i.idToken,r,"internal-error");const o=Kc(i.idToken);A(o,r,"internal-error");const{sub:l}=o;return A(t.uid===l,r,"user-mismatch"),mn._forOperation(t,s,i)}catch(i){throw(i==null?void 0:i.code)==="auth/user-not-found"&&Mt(r,"user-mismatch"),i}}/**
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
 */async function Ew(t,e,n=!1){if(Ct(t.app))return Promise.reject(dn(t));const r="signIn",s=await n_(t,r,e),i=await mn._fromIdTokenResponse(t,r,s);return n||await t._updateCurrentUser(i.user),i}function Sw(t,e,n,r){return Ze(t).onIdTokenChanged(e,n,r)}function Cw(t,e,n){return Ze(t).beforeAuthStateChanged(e,n)}const zo="__sak";/**
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
 */class r_{constructor(e,n){this.storageRetriever=e,this.type=n}_isAvailable(){try{return this.storage?(this.storage.setItem(zo,"1"),this.storage.removeItem(zo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,n){return this.storage.setItem(e,JSON.stringify(n)),Promise.resolve()}_get(e){const n=this.storage.getItem(e);return Promise.resolve(n?JSON.parse(n):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
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
 */const kw=1e3,Nw=10;class s_ extends r_{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,n)=>this.onStorageEvent(e,n),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Xg(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const n of Object.keys(this.listeners)){const r=this.storage.getItem(n),s=this.localCache[n];r!==s&&e(n,s,r)}}onStorageEvent(e,n=!1){if(!e.key){this.forAllChangedKeys((o,l,a)=>{this.notifyListeners(o,a)});return}const r=e.key;n?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!n&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);nw()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Nw):s()}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n&&JSON.parse(n))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,n,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:n,newValue:r}),!0)})},kw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,n){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,n){await super._set(e,n),this.localCache[e]=JSON.stringify(n)}async _get(e){const n=await super._get(e);return this.localCache[e]=JSON.stringify(n),n}async _remove(e){await super._remove(e),delete this.localCache[e]}}s_.type="LOCAL";const Iw=s_;/**
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
 */class i_ extends r_{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,n){}_removeListener(e,n){}}i_.type="SESSION";const o_=i_;/**
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
 */function bw(t){return Promise.all(t.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(n){return{fulfilled:!1,reason:n}}}))}/**
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
 */class Cl{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const n=this.receivers.find(s=>s.isListeningto(e));if(n)return n;const r=new Cl(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const n=e,{eventId:r,eventType:s,data:i}=n.data,o=this.handlersMap[s];if(!(o!=null&&o.size))return;n.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const l=Array.from(o).map(async c=>c(n.origin,i)),a=await bw(l);n.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:a})}_subscribe(e,n){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(n)}_unsubscribe(e,n){this.handlersMap[e]&&n&&this.handlersMap[e].delete(n),(!n||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}Cl.receivers=[];/**
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
 */function Yc(t="",e=10){let n="";for(let r=0;r<e;r++)n+=Math.floor(Math.random()*10);return t+n}/**
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
 */class Tw{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,n,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((l,a)=>{const c=Yc("",20);s.port1.start();const h=setTimeout(()=>{a(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(d){const f=d;if(f.data.eventId===c)switch(f.data.status){case"ack":clearTimeout(h),i=setTimeout(()=>{a(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),l(f.data.response);break;default:clearTimeout(h),clearTimeout(i),a(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:c,data:n},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
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
 */function vt(){return window}function Rw(t){vt().location.href=t}/**
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
 */function l_(){return typeof vt().WorkerGlobalScope<"u"&&typeof vt().importScripts=="function"}async function Pw(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Aw(){var t;return((t=navigator==null?void 0:navigator.serviceWorker)===null||t===void 0?void 0:t.controller)||null}function Ow(){return l_()?self:null}/**
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
 */const a_="firebaseLocalStorageDb",jw=1,Wo="firebaseLocalStorage",u_="fbase_key";class vi{constructor(e){this.request=e}toPromise(){return new Promise((e,n)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{n(this.request.error)})})}}function kl(t,e){return t.transaction([Wo],e?"readwrite":"readonly").objectStore(Wo)}function Dw(){const t=indexedDB.deleteDatabase(a_);return new vi(t).toPromise()}function bu(){const t=indexedDB.open(a_,jw);return new Promise((e,n)=>{t.addEventListener("error",()=>{n(t.error)}),t.addEventListener("upgradeneeded",()=>{const r=t.result;try{r.createObjectStore(Wo,{keyPath:u_})}catch(s){n(s)}}),t.addEventListener("success",async()=>{const r=t.result;r.objectStoreNames.contains(Wo)?e(r):(r.close(),await Dw(),e(await bu()))})})}async function ff(t,e,n){const r=kl(t,!0).put({[u_]:e,value:n});return new vi(r).toPromise()}async function Mw(t,e){const n=kl(t,!1).get(e),r=await new vi(n).toPromise();return r===void 0?null:r.value}function pf(t,e){const n=kl(t,!0).delete(e);return new vi(n).toPromise()}const Fw=800,Lw=3;class c_{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await bu(),this.db)}async _withRetries(e){let n=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(n++>Lw)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return l_()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=Cl._getInstance(Ow()),this.receiver._subscribe("keyChanged",async(e,n)=>({keyProcessed:(await this._poll()).includes(n.key)})),this.receiver._subscribe("ping",async(e,n)=>["keyChanged"])}async initializeSender(){var e,n;if(this.activeServiceWorker=await Pw(),!this.activeServiceWorker)return;this.sender=new Tw(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((n=r[0])===null||n===void 0)&&n.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Aw()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await bu();return await ff(e,zo,"1"),await pf(e,zo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,n){return this._withPendingWrite(async()=>(await this._withRetries(r=>ff(r,e,n)),this.localCache[e]=n,this.notifyServiceWorker(e)))}async _get(e){const n=await this._withRetries(r=>Mw(r,e));return this.localCache[e]=n,n}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(n=>pf(n,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=kl(s,!1).getAll();return new vi(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const n=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),n.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),n.push(s));return n}notifyListeners(e,n){this.localCache[e]=n;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(n)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Fw)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,n){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(n)}_removeListener(e,n){this.listeners[e]&&(this.listeners[e].delete(n),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}c_.type="LOCAL";const Bw=c_;new gi(3e4,6e4);/**
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
 */function Uw(t,e){return e?It(e):(A(t._popupRedirectResolver,t,"argument-error"),t._popupRedirectResolver)}/**
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
 */class Xc extends e_{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Nr(e,this._buildIdpRequest())}_linkToIdToken(e,n){return Nr(e,this._buildIdpRequest(n))}_getReauthenticationResolver(e){return Nr(e,this._buildIdpRequest())}_buildIdpRequest(e){const n={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(n.idToken=e),n}}function zw(t){return Ew(t.auth,new Xc(t),t.bypassAuthState)}function Ww(t){const{auth:e,user:n}=t;return A(n,e,"internal-error"),ww(n,new Xc(t),t.bypassAuthState)}async function Vw(t){const{auth:e,user:n}=t;return A(n,e,"internal-error"),xw(n,new Xc(t),t.bypassAuthState)}/**
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
 */class d_{constructor(e,n,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(n)?n:[n]}execute(){return new Promise(async(e,n)=>{this.pendingPromise={resolve:e,reject:n};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:n,sessionId:r,postBody:s,tenantId:i,error:o,type:l}=e;if(o){this.reject(o);return}const a={auth:this.auth,requestUri:n,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(l)(a))}catch(c){this.reject(c)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return zw;case"linkViaPopup":case"linkViaRedirect":return Vw;case"reauthViaPopup":case"reauthViaRedirect":return Ww;default:Mt(this.auth,"internal-error")}}resolve(e){Ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Ft(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
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
 */const Hw=new gi(2e3,1e4);class pr extends d_{constructor(e,n,r,s,i){super(e,n,s,i),this.provider=r,this.authWindow=null,this.pollId=null,pr.currentPopupAction&&pr.currentPopupAction.cancel(),pr.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return A(e,this.auth,"internal-error"),e}async onExecution(){Ft(this.filter.length===1,"Popup operations only handle one event");const e=Yc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(n=>{this.reject(n)}),this.resolver._isIframeWebStorageSupported(this.auth,n=>{n||this.reject(_t(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(_t(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,pr.currentPopupAction=null}pollUserCancellation(){const e=()=>{var n,r;if(!((r=(n=this.authWindow)===null||n===void 0?void 0:n.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(_t(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,Hw.get())};e()}}pr.currentPopupAction=null;/**
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
 */const $w="pendingRedirect",io=new Map;class Gw extends d_{constructor(e,n,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],n,void 0,r),this.eventId=null}async execute(){let e=io.get(this.auth._key());if(!e){try{const r=await Kw(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(n){e=()=>Promise.reject(n)}io.set(this.auth._key(),e)}return this.bypassAuthState||io.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const n=await this.auth._redirectUserForId(e.eventId);if(n)return this.user=n,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function Kw(t,e){const n=Yw(e),r=qw(t);if(!await r._isAvailable())return!1;const s=await r._get(n)==="true";return await r._remove(n),s}function Qw(t,e){io.set(t._key(),e)}function qw(t){return It(t._redirectPersistence)}function Yw(t){return so($w,t.config.apiKey,t.name)}async function Xw(t,e,n=!1){if(Ct(t.app))return Promise.reject(dn(t));const r=Sl(t),s=Uw(r,e),o=await new Gw(r,s,n).execute();return o&&!n&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
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
 */const Jw=10*60*1e3;class Zw{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let n=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(n=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!eE(e)||(this.hasHandledPotentialRedirect=!0,n||(this.queuedRedirectEvent=e,n=!0)),n}sendToConsumer(e,n){var r;if(e.error&&!h_(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";n.onError(_t(this.auth,s))}else n.onAuthEvent(e)}isEventForConsumer(e,n){const r=n.eventId===null||!!e.eventId&&e.eventId===n.eventId;return n.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=Jw&&this.cachedEventUids.clear(),this.cachedEventUids.has(mf(e))}saveEventToCache(e){this.cachedEventUids.add(mf(e)),this.lastProcessedEventTime=Date.now()}}function mf(t){return[t.type,t.eventId,t.sessionId,t.tenantId].filter(e=>e).join("-")}function h_({type:t,error:e}){return t==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function eE(t){switch(t.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return h_(t);default:return!1}}/**
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
 */async function tE(t,e={}){return Jr(t,"GET","/v1/projects",e)}/**
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
 */const nE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,rE=/^https?/;async function sE(t){if(t.config.emulator)return;const{authorizedDomains:e}=await tE(t);for(const n of e)try{if(iE(n))return}catch{}Mt(t,"unauthorized-domain")}function iE(t){const e=Nu(),{protocol:n,hostname:r}=new URL(e);if(t.startsWith("chrome-extension://")){const o=new URL(t);return o.hostname===""&&r===""?n==="chrome-extension:"&&t.replace("chrome-extension://","")===e.replace("chrome-extension://",""):n==="chrome-extension:"&&o.hostname===r}if(!rE.test(n))return!1;if(nE.test(t))return r===t;const s=t.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
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
 */const oE=new gi(3e4,6e4);function gf(){const t=vt().___jsl;if(t!=null&&t.H){for(const e of Object.keys(t.H))if(t.H[e].r=t.H[e].r||[],t.H[e].L=t.H[e].L||[],t.H[e].r=[...t.H[e].L],t.CP)for(let n=0;n<t.CP.length;n++)t.CP[n]=null}}function lE(t){return new Promise((e,n)=>{var r,s,i;function o(){gf(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{gf(),n(_t(t,"network-request-failed"))},timeout:oE.get()})}if(!((s=(r=vt().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((i=vt().gapi)===null||i===void 0)&&i.load)o();else{const l=dw("iframefcb");return vt()[l]=()=>{gapi.load?o():n(_t(t,"network-request-failed"))},uw(`${cw()}?onload=${l}`).catch(a=>n(a))}}).catch(e=>{throw oo=null,e})}let oo=null;function aE(t){return oo=oo||lE(t),oo}/**
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
 */const uE=new gi(5e3,15e3),cE="__/auth/iframe",dE="emulator/auth/iframe",hE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},fE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function pE(t){const e=t.config;A(e.authDomain,t,"auth-domain-config-required");const n=e.emulator?Gc(e,dE):`https://${t.config.authDomain}/${cE}`,r={apiKey:e.apiKey,appName:t.name,v:Xr},s=fE.get(t.config.apiHost);s&&(r.eid=s);const i=t._getFrameworks();return i.length&&(r.fw=i.join(",")),`${n}?${Yr(r).slice(1)}`}async function mE(t){const e=await aE(t),n=vt().gapi;return A(n,t,"internal-error"),e.open({where:document.body,url:pE(t),messageHandlersFilter:n.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:hE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=_t(t,"network-request-failed"),l=vt().setTimeout(()=>{i(o)},uE.get());function a(){vt().clearTimeout(l),s(r)}r.ping(a).then(a,()=>{i(o)})}))}/**
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
 */const gE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},_E=500,vE=600,yE="_blank",xE="http://localhost";class _f{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function wE(t,e,n,r=_E,s=vE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let l="";const a=Object.assign(Object.assign({},gE),{width:r.toString(),height:s.toString(),top:i,left:o}),c=Re().toLowerCase();n&&(l=Gg(c)?yE:n),Hg(c)&&(e=e||xE,a.scrollbars="yes");const h=Object.entries(a).reduce((f,[_,y])=>`${f}${_}=${y},`,"");if(tw(c)&&l!=="_self")return EE(e||"",l),new _f(null);const d=window.open(e||"",l,h);A(d,t,"popup-blocked");try{d.focus()}catch{}return new _f(d)}function EE(t,e){const n=document.createElement("a");n.href=t,n.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),n.dispatchEvent(r)}/**
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
 */const SE="__/auth/handler",CE="emulator/auth/handler",kE=encodeURIComponent("fac");async function vf(t,e,n,r,s,i){A(t.config.authDomain,t,"auth-domain-config-required"),A(t.config.apiKey,t,"invalid-api-key");const o={apiKey:t.config.apiKey,appName:t.name,authType:n,redirectUrl:r,v:Xr,eventId:s};if(e instanceof t_){e.setDefaultLanguage(t.languageCode),o.providerId=e.providerId||"",xu(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[h,d]of Object.entries({}))o[h]=d}if(e instanceof _i){const h=e.getScopes().filter(d=>d!=="");h.length>0&&(o.scopes=h.join(","))}t.tenantId&&(o.tid=t.tenantId);const l=o;for(const h of Object.keys(l))l[h]===void 0&&delete l[h];const a=await t._getAppCheckToken(),c=a?`#${kE}=${encodeURIComponent(a)}`:"";return`${NE(t)}?${Yr(l).slice(1)}${c}`}function NE({config:t}){return t.emulator?Gc(t,CE):`https://${t.authDomain}/${SE}`}/**
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
 */const ya="webStorageSupport";class IE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=o_,this._completeRedirectFn=Xw,this._overrideRedirectResult=Qw}async _openPopup(e,n,r,s){var i;Ft((i=this.eventManagers[e._key()])===null||i===void 0?void 0:i.manager,"_initialize() not called before _openPopup()");const o=await vf(e,n,r,Nu(),s);return wE(e,o,Yc())}async _openRedirect(e,n,r,s){await this._originValidation(e);const i=await vf(e,n,r,Nu(),s);return Rw(i),new Promise(()=>{})}_initialize(e){const n=e._key();if(this.eventManagers[n]){const{manager:s,promise:i}=this.eventManagers[n];return s?Promise.resolve(s):(Ft(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[n]={promise:r},r.catch(()=>{delete this.eventManagers[n]}),r}async initAndGetManager(e){const n=await mE(e),r=new Zw(e);return n.register("authEvent",s=>(A(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=n,r}_isIframeWebStorageSupported(e,n){this.iframes[e._key()].send(ya,{type:ya},s=>{var i;const o=(i=s==null?void 0:s[0])===null||i===void 0?void 0:i[ya];o!==void 0&&n(!!o),Mt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const n=e._key();return this.originValidationPromises[n]||(this.originValidationPromises[n]=sE(e)),this.originValidationPromises[n]}get _shouldInitProactively(){return Xg()||$g()||Qc()}}const bE=IE;var yf="@firebase/auth",xf="1.7.9";/**
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
 */class TE{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const n=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,n),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const n=this.internalListeners.get(e);n&&(this.internalListeners.delete(e),n(),this.updateProactiveRefresh())}assertAuthConfigured(){A(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
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
 */function RE(t){switch(t){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function PE(t){Br(new Vn("auth",(e,{options:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:l}=r.options;A(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const a={apiKey:o,authDomain:l,clientPlatform:t,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Jg(t)},c=new lw(r,s,i,a);return fw(c,n),c},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,n,r)=>{e.getProvider("auth-internal").initialize()})),Br(new Vn("auth-internal",e=>{const n=Sl(e.getProvider("auth").getImmediate());return(r=>new TE(r))(n)},"PRIVATE").setInstantiationMode("EXPLICIT")),cn(yf,xf,RE(t)),cn(yf,xf,"esm2017")}/**
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
 */const AE=5*60,OE=kg("authIdTokenMaxAge")||AE;let wf=null;const jE=t=>async e=>{const n=e&&await e.getIdTokenResult(),r=n&&(new Date().getTime()-Date.parse(n.issuedAtTime))/1e3;if(r&&r>OE)return;const s=n==null?void 0:n.token;wf!==s&&(wf=s,await fetch(t,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function DE(t=Pg()){const e=Vc(t,"auth");if(e.isInitialized())return e.getImmediate();const n=hw(t,{popupRedirectResolver:bE,persistence:[Bw,Iw,o_]}),r=kg("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=jE(i.toString());Cw(n,o,()=>o(n.currentUser)),Sw(n,l=>o(l))}}const s=Sg("auth");return s&&pw(n,`http://${s}`),n}function ME(){var t,e;return(e=(t=document.getElementsByTagName("head"))===null||t===void 0?void 0:t[0])!==null&&e!==void 0?e:document}aw({loadJS(t){return new Promise((e,n)=>{const r=document.createElement("script");r.setAttribute("src",t),r.onload=e,r.onerror=s=>{const i=_t("internal-error");i.customData=s,n(i)},r.type="text/javascript",r.charset="UTF-8",ME().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});PE("Browser");var Ef={};const Sf="@firebase/database",Cf="1.0.8";/**
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
 */let f_="";function FE(t){f_=t}/**
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
 */class LE{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,n){n==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),me(n))}get(e){const n=this.domStorage_.getItem(this.prefixedName_(e));return n==null?null:Xs(n)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class BE{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,n){n==null?delete this.cache_[e]:this.cache_[e]=n}get(e){return yt(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const p_=function(t){try{if(typeof window<"u"&&typeof window[t]<"u"){const e=window[t];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new LE(e)}}catch{}return new BE},On=p_("localStorage"),UE=p_("sessionStorage");/**
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
 */const Ir=new zc("@firebase/database"),zE=function(){let t=1;return function(){return t++}}(),m_=function(t){const e=T1(t),n=new k1;n.update(e);const r=n.digest();return Lc.encodeByteArray(r)},yi=function(...t){let e="";for(let n=0;n<t.length;n++){const r=t[n];Array.isArray(r)||r&&typeof r=="object"&&typeof r.length=="number"?e+=yi.apply(null,r):typeof r=="object"?e+=me(r):e+=r,e+=" "}return e};let Ts=null,kf=!0;const WE=function(t,e){k(!0,"Can't turn on custom loggers persistently."),Ir.logLevel=H.VERBOSE,Ts=Ir.log.bind(Ir)},ve=function(...t){if(kf===!0&&(kf=!1,Ts===null&&UE.get("logging_enabled")===!0&&WE()),Ts){const e=yi.apply(null,t);Ts(e)}},xi=function(t){return function(...e){ve(t,...e)}},Tu=function(...t){const e="FIREBASE INTERNAL ERROR: "+yi(...t);Ir.error(e)},Lt=function(...t){const e=`FIREBASE FATAL ERROR: ${yi(...t)}`;throw Ir.error(e),new Error(e)},Te=function(...t){const e="FIREBASE WARNING: "+yi(...t);Ir.warn(e)},VE=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Te("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},Jc=function(t){return typeof t=="number"&&(t!==t||t===Number.POSITIVE_INFINITY||t===Number.NEGATIVE_INFINITY)},HE=function(t){if(document.readyState==="complete")t();else{let e=!1;const n=function(){if(!document.body){setTimeout(n,Math.floor(10));return}e||(e=!0,t())};document.addEventListener?(document.addEventListener("DOMContentLoaded",n,!1),window.addEventListener("load",n,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&n()}),window.attachEvent("onload",n))}},Ur="[MIN_NAME]",$n="[MAX_NAME]",Xn=function(t,e){if(t===e)return 0;if(t===Ur||e===$n)return-1;if(e===Ur||t===$n)return 1;{const n=Nf(t),r=Nf(e);return n!==null?r!==null?n-r===0?t.length-e.length:n-r:-1:r!==null?1:t<e?-1:1}},$E=function(t,e){return t===e?0:t<e?-1:1},ds=function(t,e){if(e&&t in e)return e[t];throw new Error("Missing required key ("+t+") in object: "+me(e))},Zc=function(t){if(typeof t!="object"||t===null)return me(t);const e=[];for(const r in t)e.push(r);e.sort();let n="{";for(let r=0;r<e.length;r++)r!==0&&(n+=","),n+=me(e[r]),n+=":",n+=Zc(t[e[r]]);return n+="}",n},g_=function(t,e){const n=t.length;if(n<=e)return[t];const r=[];for(let s=0;s<n;s+=e)s+e>n?r.push(t.substring(s,n)):r.push(t.substring(s,s+e));return r};function we(t,e){for(const n in t)t.hasOwnProperty(n)&&e(n,t[n])}const __=function(t){k(!Jc(t),"Invalid JSON number");const e=11,n=52,r=(1<<e-1)-1;let s,i,o,l,a;t===0?(i=0,o=0,s=1/t===-1/0?1:0):(s=t<0,t=Math.abs(t),t>=Math.pow(2,1-r)?(l=Math.min(Math.floor(Math.log(t)/Math.LN2),r),i=l+r,o=Math.round(t*Math.pow(2,n-l)-Math.pow(2,n))):(i=0,o=Math.round(t/Math.pow(2,1-r-n))));const c=[];for(a=n;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(i%2?1:0),i=Math.floor(i/2);c.push(s?1:0),c.reverse();const h=c.join("");let d="";for(a=0;a<64;a+=8){let f=parseInt(h.substr(a,8),2).toString(16);f.length===1&&(f="0"+f),d=d+f}return d.toLowerCase()},GE=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},KE=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function QE(t,e){let n="Unknown Error";t==="too_big"?n="The data requested exceeds the maximum size that can be accessed with a single request.":t==="permission_denied"?n="Client doesn't have permission to access the desired data.":t==="unavailable"&&(n="The service is unavailable");const r=new Error(t+" at "+e._path.toString()+": "+n);return r.code=t.toUpperCase(),r}const qE=new RegExp("^-?(0*)\\d{1,10}$"),YE=-2147483648,XE=2147483647,Nf=function(t){if(qE.test(t)){const e=Number(t);if(e>=YE&&e<=XE)return e}return null},Zr=function(t){try{t()}catch(e){setTimeout(()=>{const n=e.stack||"";throw Te("Exception was thrown by user callback.",n),e},Math.floor(0))}},JE=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Rs=function(t,e){const n=setTimeout(t,e);return typeof n=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(n):typeof n=="object"&&n.unref&&n.unref(),n};/**
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
 */class ZE{constructor(e,n){this.appName_=e,this.appCheckProvider=n,this.appCheck=n==null?void 0:n.getImmediate({optional:!0}),this.appCheck||n==null||n.get().then(r=>this.appCheck=r)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((n,r)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){var n;(n=this.appCheckProvider)===null||n===void 0||n.get().then(r=>r.addTokenListener(e))}notifyForInvalidToken(){Te(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class eS{constructor(e,n,r){this.appName_=e,this.firebaseOptions_=n,this.authProvider_=r,this.auth_=null,this.auth_=r.getImmediate({optional:!0}),this.auth_||r.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(n=>n&&n.code==="auth/token-not-initialized"?(ve("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(n)):new Promise((n,r)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(n,r):n(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(n=>n.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(n=>n.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Te(e)}}class lo{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}lo.OWNER="owner";/**
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
 */const ed="5",v_="v",y_="s",x_="r",w_="f",E_=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,S_="ls",C_="p",Ru="ac",k_="websocket",N_="long_polling";/**
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
 */class I_{constructor(e,n,r,s,i=!1,o="",l=!1,a=!1){this.secure=n,this.namespace=r,this.webSocketOnly=s,this.nodeAdmin=i,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=On.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&On.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",n=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${n}`}}function tS(t){return t.host!==t.internalHost||t.isCustomHost()||t.includeNamespaceInQueryParams}function b_(t,e,n){k(typeof e=="string","typeof type must == string"),k(typeof n=="object","typeof params must == object");let r;if(e===k_)r=(t.secure?"wss://":"ws://")+t.internalHost+"/.ws?";else if(e===N_)r=(t.secure?"https://":"http://")+t.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);tS(t)&&(n.ns=t.namespace);const s=[];return we(n,(i,o)=>{s.push(i+"="+o)}),r+s.join("&")}/**
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
 */class nS{constructor(){this.counters_={}}incrementCounter(e,n=1){yt(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=n}get(){return o1(this.counters_)}}/**
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
 */const xa={},wa={};function td(t){const e=t.toString();return xa[e]||(xa[e]=new nS),xa[e]}function rS(t,e){const n=t.toString();return wa[n]||(wa[n]=e()),wa[n]}/**
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
 */class sS{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,n){this.closeAfterResponse=e,this.onClose=n,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,n){for(this.pendingResponses[e]=n;this.pendingResponses[this.currentResponseNum];){const r=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<r.length;++s)r[s]&&Zr(()=>{this.onMessage_(r[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const If="start",iS="close",oS="pLPCommand",lS="pRTLPCB",T_="id",R_="pw",P_="ser",aS="cb",uS="seg",cS="ts",dS="d",hS="dframe",A_=1870,O_=30,fS=A_-O_,pS=25e3,mS=3e4;class mr{constructor(e,n,r,s,i,o,l){this.connId=e,this.repoInfo=n,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=xi(e),this.stats_=td(n),this.urlFn=a=>(this.appCheckToken&&(a[Ru]=this.appCheckToken),b_(n,N_,a))}open(e,n){this.curSegmentNum=0,this.onDisconnect_=n,this.myPacketOrderer=new sS(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(mS)),HE(()=>{if(this.isClosed_)return;this.scriptTagHolder=new nd((...i)=>{const[o,l,a,c,h]=i;if(this.incrementIncomingBytes_(i),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===If)this.id=l,this.password=a;else if(o===iS)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...i)=>{const[o,l]=i;this.incrementIncomingBytes_(i),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const r={};r[If]="t",r[P_]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(r[aS]=this.scriptTagHolder.uniqueCallbackIdentifier),r[v_]=ed,this.transportSessionId&&(r[y_]=this.transportSessionId),this.lastSessionId&&(r[S_]=this.lastSessionId),this.applicationId&&(r[C_]=this.applicationId),this.appCheckToken&&(r[Ru]=this.appCheckToken),typeof location<"u"&&location.hostname&&E_.test(location.hostname)&&(r[x_]=w_);const s=this.urlFn(r);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){mr.forceAllow_=!0}static forceDisallow(){mr.forceDisallow_=!0}static isAvailable(){return mr.forceAllow_?!0:!mr.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!GE()&&!KE()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const n=me(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=wg(n),s=g_(r,fS);for(let i=0;i<s.length;i++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[i]),this.curSegmentNum++}addDisconnectPingFrame(e,n){this.myDisconnFrame=document.createElement("iframe");const r={};r[hS]="t",r[T_]=e,r[R_]=n,this.myDisconnFrame.src=this.urlFn(r),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const n=me(e).length;this.bytesReceived+=n,this.stats_.incrementCounter("bytes_received",n)}}class nd{constructor(e,n,r,s){this.onDisconnect=r,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=zE(),window[oS+this.uniqueCallbackIdentifier]=e,window[lS+this.uniqueCallbackIdentifier]=n,this.myIFrame=nd.createIFrame_();let i="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(i='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+i+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){ve("frame writing exception"),l.stack&&ve(l.stack),ve(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ve("No IE domain setting required")}catch{const r=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+r+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,n){for(this.myID=e,this.myPW=n,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[T_]=this.myID,e[R_]=this.myPW,e[P_]=this.currentSerial;let n=this.urlFn(e),r="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+O_+r.length<=A_;){const o=this.pendingSegs.shift();r=r+"&"+uS+s+"="+o.seg+"&"+cS+s+"="+o.ts+"&"+dS+s+"="+o.d,s++}return n=n+r,this.addLongPollTag_(n,this.currentSerial),!0}else return!1}enqueueSegment(e,n,r){this.pendingSegs.push({seg:e,ts:n,d:r}),this.alive&&this.newRequest_()}addLongPollTag_(e,n){this.outstandingRequests.add(n);const r=()=>{this.outstandingRequests.delete(n),this.newRequest_()},s=setTimeout(r,Math.floor(pS)),i=()=>{clearTimeout(s),r()};this.addTag(e,i)}addTag(e,n){setTimeout(()=>{try{if(!this.sendNewPolls)return;const r=this.myIFrame.doc.createElement("script");r.type="text/javascript",r.async=!0,r.src=e,r.onload=r.onreadystatechange=function(){const s=r.readyState;(!s||s==="loaded"||s==="complete")&&(r.onload=r.onreadystatechange=null,r.parentNode&&r.parentNode.removeChild(r),n())},r.onerror=()=>{ve("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(r)}catch{}},Math.floor(1))}}/**
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
 */const gS=16384,_S=45e3;let Vo=null;typeof MozWebSocket<"u"?Vo=MozWebSocket:typeof WebSocket<"u"&&(Vo=WebSocket);class st{constructor(e,n,r,s,i,o,l){this.connId=e,this.applicationId=r,this.appCheckToken=s,this.authToken=i,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=xi(this.connId),this.stats_=td(n),this.connURL=st.connectionURL_(n,o,l,s,r),this.nodeAdmin=n.nodeAdmin}static connectionURL_(e,n,r,s,i){const o={};return o[v_]=ed,typeof location<"u"&&location.hostname&&E_.test(location.hostname)&&(o[x_]=w_),n&&(o[y_]=n),r&&(o[S_]=r),s&&(o[Ru]=s),i&&(o[C_]=i),b_(e,k_,o)}open(e,n){this.onDisconnect=n,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,On.set("previous_websocket_failure",!0);try{let r;_1(),this.mySock=new Vo(this.connURL,[],r)}catch(r){this.log_("Error instantiating WebSocket.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=r=>{this.handleIncomingFrame(r)},this.mySock.onerror=r=>{this.log_("WebSocket error.  Closing connection.");const s=r.message||r.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){st.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const n=/Android ([0-9]{0,}\.[0-9]{0,})/,r=navigator.userAgent.match(n);r&&r.length>1&&parseFloat(r[1])<4.4&&(e=!0)}return!e&&Vo!==null&&!st.forceDisallow_}static previouslyFailed(){return On.isInMemoryStorage||On.get("previous_websocket_failure")===!0}markConnectionHealthy(){On.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const n=this.frames.join("");this.frames=null;const r=Xs(n);this.onMessage(r)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(k(this.frames===null,"We already have a frame buffer"),e.length<=6){const n=Number(e);if(!isNaN(n))return this.handleNewFrameCount_(n),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const n=e.data;if(this.bytesReceived+=n.length,this.stats_.incrementCounter("bytes_received",n.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(n);else{const r=this.extractFrameCount_(n);r!==null&&this.appendFrame_(r)}}send(e){this.resetKeepAlive();const n=me(e);this.bytesSent+=n.length,this.stats_.incrementCounter("bytes_sent",n.length);const r=g_(n,gS);r.length>1&&this.sendString_(String(r.length));for(let s=0;s<r.length;s++)this.sendString_(r[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(_S))}sendString_(e){try{this.mySock.send(e)}catch(n){this.log_("Exception thrown from WebSocket.send():",n.message||n.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}st.responsesRequiredToBeHealthy=2;st.healthyTimeout=3e4;/**
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
 */class ei{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[mr,st]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const n=st&&st.isAvailable();let r=n&&!st.previouslyFailed();if(e.webSocketOnly&&(n||Te("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),r=!0),r)this.transports_=[st];else{const s=this.transports_=[];for(const i of ei.ALL_TRANSPORTS)i&&i.isAvailable()&&s.push(i);ei.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}ei.globalTransportInitialized_=!1;/**
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
 */const vS=6e4,yS=5e3,xS=10*1024,wS=100*1024,Ea="t",bf="d",ES="s",Tf="r",SS="e",Rf="o",Pf="a",Af="n",Of="p",CS="h";class kS{constructor(e,n,r,s,i,o,l,a,c,h){this.id=e,this.repoInfo_=n,this.applicationId_=r,this.appCheckToken_=s,this.authToken_=i,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=xi("c:"+this.id+":"),this.transportManager_=new ei(n),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.conn_),r=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(n,r)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Rs(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>wS?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>xS?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return n=>{e===this.conn_?this.onConnectionLost_(n):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return n=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(n):e===this.secondaryConn_?this.onSecondaryMessageReceived_(n):this.log_("message on old connection"))}}sendRequest(e){const n={t:"d",d:e};this.sendData_(n)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(Ea in e){const n=e[Ea];n===Pf?this.upgradeIfSecondaryHealthy_():n===Tf?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):n===Rf&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const n=ds("t",e),r=ds("d",e);if(n==="c")this.onSecondaryControl_(r);else if(n==="d")this.pendingDataMessages.push(r);else throw new Error("Unknown protocol layer: "+n)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Of,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Pf,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Af,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const n=ds("t",e),r=ds("d",e);n==="c"?this.onControl_(r):n==="d"&&this.onDataMessage_(r)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const n=ds(Ea,e);if(bf in e){const r=e[bf];if(n===CS){const s=Object.assign({},r);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(n===Af){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else n===ES?this.onConnectionShutdown_(r):n===Tf?this.onReset_(r):n===SS?Tu("Server Error: "+r):n===Rf?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Tu("Unknown control packet command: "+n)}}onHandshake_(e){const n=e.ts,r=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,n),ed!==r&&Te("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const n=this.connReceiver_(this.secondaryConn_),r=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(n,r),Rs(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(vS))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,n){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(n,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Rs(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(yS))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Of,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(On.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class j_{put(e,n,r,s){}merge(e,n,r,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,n,r){}onDisconnectMerge(e,n,r){}onDisconnectCancel(e,n){}reportStats(e){}}/**
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
 */class D_{constructor(e){this.allowedEvents_=e,this.listeners_={},k(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...n){if(Array.isArray(this.listeners_[e])){const r=[...this.listeners_[e]];for(let s=0;s<r.length;s++)r[s].callback.apply(r[s].context,n)}}on(e,n,r){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:n,context:r});const s=this.getInitialEvent(e);s&&n.apply(r,s)}off(e,n,r){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let i=0;i<s.length;i++)if(s[i].callback===n&&(!r||r===s[i].context)){s.splice(i,1);return}}validateEventType_(e){k(this.allowedEvents_.find(n=>n===e),"Unknown event: "+e)}}/**
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
 */class Ho extends D_{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Uc()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Ho}getInitialEvent(e){return k(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const jf=32,Df=768;class ${constructor(e,n){if(n===void 0){this.pieces_=e.split("/");let r=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[r]=this.pieces_[s],r++);this.pieces_.length=r,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=n}toString(){let e="";for(let n=this.pieceNum_;n<this.pieces_.length;n++)this.pieces_[n]!==""&&(e+="/"+this.pieces_[n]);return e||"/"}}function W(){return new $("")}function M(t){return t.pieceNum_>=t.pieces_.length?null:t.pieces_[t.pieceNum_]}function gn(t){return t.pieces_.length-t.pieceNum_}function K(t){let e=t.pieceNum_;return e<t.pieces_.length&&e++,new $(t.pieces_,e)}function rd(t){return t.pieceNum_<t.pieces_.length?t.pieces_[t.pieces_.length-1]:null}function NS(t){let e="";for(let n=t.pieceNum_;n<t.pieces_.length;n++)t.pieces_[n]!==""&&(e+="/"+encodeURIComponent(String(t.pieces_[n])));return e||"/"}function ti(t,e=0){return t.pieces_.slice(t.pieceNum_+e)}function M_(t){if(t.pieceNum_>=t.pieces_.length)return null;const e=[];for(let n=t.pieceNum_;n<t.pieces_.length-1;n++)e.push(t.pieces_[n]);return new $(e,0)}function re(t,e){const n=[];for(let r=t.pieceNum_;r<t.pieces_.length;r++)n.push(t.pieces_[r]);if(e instanceof $)for(let r=e.pieceNum_;r<e.pieces_.length;r++)n.push(e.pieces_[r]);else{const r=e.split("/");for(let s=0;s<r.length;s++)r[s].length>0&&n.push(r[s])}return new $(n,0)}function B(t){return t.pieceNum_>=t.pieces_.length}function De(t,e){const n=M(t),r=M(e);if(n===null)return e;if(n===r)return De(K(t),K(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+t+")")}function IS(t,e){const n=ti(t,0),r=ti(e,0);for(let s=0;s<n.length&&s<r.length;s++){const i=Xn(n[s],r[s]);if(i!==0)return i}return n.length===r.length?0:n.length<r.length?-1:1}function sd(t,e){if(gn(t)!==gn(e))return!1;for(let n=t.pieceNum_,r=e.pieceNum_;n<=t.pieces_.length;n++,r++)if(t.pieces_[n]!==e.pieces_[r])return!1;return!0}function qe(t,e){let n=t.pieceNum_,r=e.pieceNum_;if(gn(t)>gn(e))return!1;for(;n<t.pieces_.length;){if(t.pieces_[n]!==e.pieces_[r])return!1;++n,++r}return!0}class bS{constructor(e,n){this.errorPrefix_=n,this.parts_=ti(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let r=0;r<this.parts_.length;r++)this.byteLength_+=wl(this.parts_[r]);F_(this)}}function TS(t,e){t.parts_.length>0&&(t.byteLength_+=1),t.parts_.push(e),t.byteLength_+=wl(e),F_(t)}function RS(t){const e=t.parts_.pop();t.byteLength_-=wl(e),t.parts_.length>0&&(t.byteLength_-=1)}function F_(t){if(t.byteLength_>Df)throw new Error(t.errorPrefix_+"has a key path longer than "+Df+" bytes ("+t.byteLength_+").");if(t.parts_.length>jf)throw new Error(t.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+jf+") or object contains a cycle "+Tn(t))}function Tn(t){return t.parts_.length===0?"":"in property '"+t.parts_.join(".")+"'"}/**
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
 */class id extends D_{constructor(){super(["visible"]);let e,n;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(n="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(n="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(n="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(n="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,n&&document.addEventListener(n,()=>{const r=!document[e];r!==this.visible_&&(this.visible_=r,this.trigger("visible",r))},!1)}static getInstance(){return new id}getInitialEvent(e){return k(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const hs=1e3,PS=60*5*1e3,Mf=30*1e3,AS=1.3,OS=3e4,jS="server_kill",Ff=3;class Rt extends j_{constructor(e,n,r,s,i,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=n,this.onDataUpdate_=r,this.onConnectStatus_=s,this.onServerInfoUpdate_=i,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=Rt.nextPersistentConnectionId_++,this.log_=xi("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=hs,this.maxReconnectDelay_=PS,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");id.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Ho.getInstance().on("online",this.onOnline_,this)}sendRequest(e,n,r){const s=++this.requestNumber_,i={r:s,a:e,b:n};this.log_(me(i)),k(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(i),r&&(this.requestCBHash_[s]=r)}get(e){this.initConnection_();const n=new pi,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?n.resolve(l):n.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const i=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(i),n.promise}listen(e,n,r,s){this.initConnection_();const i=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+i),this.listens.has(o)||this.listens.set(o,new Map),k(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),k(!this.listens.get(o).has(i),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:n,query:e,tag:r};this.listens.get(o).set(i,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const n=this.outstandingGets_[e];this.sendRequest("g",n.request,r=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),n.onComplete&&n.onComplete(r)})}sendListen_(e){const n=e.query,r=n._path.toString(),s=n._queryIdentifier;this.log_("Listen on "+r+" for "+s);const i={p:r},o="q";e.tag&&(i.q=n._queryObject,i.t=e.tag),i.h=e.hashFn(),this.sendRequest(o,i,l=>{const a=l.d,c=l.s;Rt.warnOnListenWarnings_(a,n),(this.listens.get(r)&&this.listens.get(r).get(s))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(r,s),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,n){if(e&&typeof e=="object"&&yt(e,"w")){const r=Lr(e,"w");if(Array.isArray(r)&&~r.indexOf("no_index")){const s='".indexOn": "'+n._queryParams.getIndex().toString()+'"',i=n._path.toString();Te(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${i} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||C1(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Mf)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,n=S1(e)?"auth":"gauth",r={cred:e};this.authOverride_===null?r.noauth=!0:typeof this.authOverride_=="object"&&(r.authvar=this.authOverride_),this.sendRequest(n,r,s=>{const i=s.s,o=s.d||"error";this.authToken_===e&&(i==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(i,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const n=e.s,r=e.d||"error";n==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(n,r)})}unlisten(e,n){const r=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+r+" "+s),k(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(r,s)&&this.connected_&&this.sendUnlisten_(r,s,e._queryObject,n)}sendUnlisten_(e,n,r,s){this.log_("Unlisten on "+e+" for "+n);const i={p:e},o="n";s&&(i.q=r,i.t=s),this.sendRequest(o,i)}onDisconnectPut(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:n,onComplete:r})}onDisconnectMerge(e,n,r){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,n,r):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:n,onComplete:r})}onDisconnectCancel(e,n){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,n):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:n})}sendOnDisconnect_(e,n,r,s){const i={p:n,d:r};this.log_("onDisconnect "+e,i),this.sendRequest(e,i,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,n,r,s){this.putInternal("p",e,n,r,s)}merge(e,n,r,s){this.putInternal("m",e,n,r,s)}putInternal(e,n,r,s,i){this.initConnection_();const o={p:n,d:r};i!==void 0&&(o.h=i),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+n)}sendPut_(e){const n=this.outstandingPuts_[e].action,r=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(n,r,i=>{this.log_(n+" response",i),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(i.s,i.d)})}reportStats(e){if(this.connected_){const n={c:e};this.log_("reportStats",n),this.sendRequest("s",n,r=>{if(r.s!=="ok"){const i=r.d;this.log_("reportStats","Error sending stats: "+i)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+me(e));const n=e.r,r=this.requestCBHash_[n];r&&(delete this.requestCBHash_[n],r(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,n){this.log_("handleServerMessage",e,n),e==="d"?this.onDataUpdate_(n.p,n.d,!1,n.t):e==="m"?this.onDataUpdate_(n.p,n.d,!0,n.t):e==="c"?this.onListenRevoked_(n.p,n.q):e==="ac"?this.onAuthRevoked_(n.s,n.d):e==="apc"?this.onAppCheckRevoked_(n.s,n.d):e==="sd"?this.onSecurityDebugPacket_(n):Tu("Unrecognized action received from server: "+me(e)+`
Are you using the latest client?`)}onReady_(e,n){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=n,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){k(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=hs,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=hs,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>OS&&(this.reconnectDelay_=hs),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let n=Math.max(0,this.reconnectDelay_-e);n=Math.random()*n,this.log_("Trying to reconnect in "+n+"ms"),this.scheduleConnect_(n),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*AS)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),n=this.onReady_.bind(this),r=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Rt.nextConnectionId_++,i=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,r())},c=function(d){k(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(d)};this.realtime_={close:a,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,f]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?ve("getToken() completed but was canceled"):(ve("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=f&&f.token,l=new kS(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,n,r,_=>{Te(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(jS)},i))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&Te(d),a())}}}interrupt(e){ve("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ve("Resuming connection for reason: "+e),delete this.interruptReasons_[e],xu(this.interruptReasons_)&&(this.reconnectDelay_=hs,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const n=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:n})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const n=this.outstandingPuts_[e];n&&"h"in n.request&&n.queued&&(n.onComplete&&n.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,n){let r;n?r=n.map(i=>Zc(i)).join("$"):r="default";const s=this.removeListen_(e,r);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,n){const r=new $(e).toString();let s;if(this.listens.has(r)){const i=this.listens.get(r);s=i.get(n),i.delete(n),i.size===0&&this.listens.delete(r)}else s=void 0;return s}onAuthRevoked_(e,n){ve("Auth token revoked: "+e+"/"+n),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ff&&(this.reconnectDelay_=Mf,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,n){ve("App check token revoked: "+e+"/"+n),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ff&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const n of e.values())this.sendListen_(n);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let n="js";e["sdk."+n+"."+f_.replace(/\./g,"-")]=1,Uc()?e["framework.cordova"]=1:Ng()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Ho.getInstance().currentlyOnline();return xu(this.interruptReasons_)&&e}}Rt.nextPersistentConnectionId_=0;Rt.nextConnectionId_=0;/**
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
 */class F{constructor(e,n){this.name=e,this.node=n}static Wrap(e,n){return new F(e,n)}}/**
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
 */class Nl{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,n){const r=new F(Ur,e),s=new F(Ur,n);return this.compare(r,s)!==0}minPost(){return F.MIN}}/**
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
 */let Vi;class L_ extends Nl{static get __EMPTY_NODE(){return Vi}static set __EMPTY_NODE(e){Vi=e}compare(e,n){return Xn(e.name,n.name)}isDefinedOn(e){throw qr("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,n){return!1}minPost(){return F.MIN}maxPost(){return new F($n,Vi)}makePost(e,n){return k(typeof e=="string","KeyIndex indexValue must always be a string."),new F(e,Vi)}toString(){return".key"}}const br=new L_;/**
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
 */class Hi{constructor(e,n,r,s,i=null){this.isReverse_=s,this.resultGenerator_=i,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=n?r(e.key,n):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),n;if(this.resultGenerator_?n=this.resultGenerator_(e.key,e.value):n={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return n}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class fe{constructor(e,n,r,s,i){this.key=e,this.value=n,this.color=r??fe.RED,this.left=s??Me.EMPTY_NODE,this.right=i??Me.EMPTY_NODE}copy(e,n,r,s,i){return new fe(e??this.key,n??this.value,r??this.color,s??this.left,i??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,n,r){let s=this;const i=r(e,s.key);return i<0?s=s.copy(null,null,null,s.left.insert(e,n,r),null):i===0?s=s.copy(null,n,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,n,r)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return Me.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,n){let r,s;if(r=this,n(e,r.key)<0)!r.left.isEmpty()&&!r.left.isRed_()&&!r.left.left.isRed_()&&(r=r.moveRedLeft_()),r=r.copy(null,null,null,r.left.remove(e,n),null);else{if(r.left.isRed_()&&(r=r.rotateRight_()),!r.right.isEmpty()&&!r.right.isRed_()&&!r.right.left.isRed_()&&(r=r.moveRedRight_()),n(e,r.key)===0){if(r.right.isEmpty())return Me.EMPTY_NODE;s=r.right.min_(),r=r.copy(s.key,s.value,null,null,r.right.removeMin_())}r=r.copy(null,null,null,null,r.right.remove(e,n))}return r.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,fe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,fe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),n=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,n)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}fe.RED=!0;fe.BLACK=!1;class DS{copy(e,n,r,s,i){return this}insert(e,n,r){return new fe(e,n,null)}remove(e,n){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Me{constructor(e,n=Me.EMPTY_NODE){this.comparator_=e,this.root_=n}insert(e,n){return new Me(this.comparator_,this.root_.insert(e,n,this.comparator_).copy(null,null,fe.BLACK,null,null))}remove(e){return new Me(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,fe.BLACK,null,null))}get(e){let n,r=this.root_;for(;!r.isEmpty();){if(n=this.comparator_(e,r.key),n===0)return r.value;n<0?r=r.left:n>0&&(r=r.right)}return null}getPredecessorKey(e){let n,r=this.root_,s=null;for(;!r.isEmpty();)if(n=this.comparator_(e,r.key),n===0){if(r.left.isEmpty())return s?s.key:null;for(r=r.left;!r.right.isEmpty();)r=r.right;return r.key}else n<0?r=r.left:n>0&&(s=r,r=r.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Hi(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,n){return new Hi(this.root_,e,this.comparator_,!1,n)}getReverseIteratorFrom(e,n){return new Hi(this.root_,e,this.comparator_,!0,n)}getReverseIterator(e){return new Hi(this.root_,null,this.comparator_,!0,e)}}Me.EMPTY_NODE=new DS;/**
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
 */function MS(t,e){return Xn(t.name,e.name)}function od(t,e){return Xn(t,e)}/**
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
 */let Pu;function FS(t){Pu=t}const B_=function(t){return typeof t=="number"?"number:"+__(t):"string:"+t},U_=function(t){if(t.isLeafNode()){const e=t.val();k(typeof e=="string"||typeof e=="number"||typeof e=="object"&&yt(e,".sv"),"Priority must be a string or number.")}else k(t===Pu||t.isEmpty(),"priority of unexpected type.");k(t===Pu||t.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let Lf;class de{constructor(e,n=de.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=n,this.lazyHash_=null,k(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),U_(this.priorityNode_)}static set __childrenNodeConstructor(e){Lf=e}static get __childrenNodeConstructor(){return Lf}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new de(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:de.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return B(e)?this:M(e)===".priority"?this.priorityNode_:de.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,n){return null}updateImmediateChild(e,n){return e===".priority"?this.updatePriority(n):n.isEmpty()&&e!==".priority"?this:de.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,n).updatePriority(this.priorityNode_)}updateChild(e,n){const r=M(e);return r===null?n:n.isEmpty()&&r!==".priority"?this:(k(r!==".priority"||gn(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(r,de.__childrenNodeConstructor.EMPTY_NODE.updateChild(K(e),n)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,n){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+B_(this.priorityNode_.val())+":");const n=typeof this.value_;e+=n+":",n==="number"?e+=__(this.value_):e+=this.value_,this.lazyHash_=m_(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===de.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof de.__childrenNodeConstructor?-1:(k(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const n=typeof e.value_,r=typeof this.value_,s=de.VALUE_TYPE_ORDER.indexOf(n),i=de.VALUE_TYPE_ORDER.indexOf(r);return k(s>=0,"Unknown leaf type: "+n),k(i>=0,"Unknown leaf type: "+r),s===i?r==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:i-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const n=e;return this.value_===n.value_&&this.priorityNode_.equals(n.priorityNode_)}else return!1}}de.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let z_,W_;function LS(t){z_=t}function BS(t){W_=t}class US extends Nl{compare(e,n){const r=e.node.getPriority(),s=n.node.getPriority(),i=r.compareTo(s);return i===0?Xn(e.name,n.name):i}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,n){return!e.getPriority().equals(n.getPriority())}minPost(){return F.MIN}maxPost(){return new F($n,new de("[PRIORITY-POST]",W_))}makePost(e,n){const r=z_(e);return new F(n,new de("[PRIORITY-POST]",r))}toString(){return".priority"}}const se=new US;/**
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
 */const zS=Math.log(2);class WS{constructor(e){const n=i=>parseInt(Math.log(i)/zS,10),r=i=>parseInt(Array(i+1).join("1"),2);this.count=n(e+1),this.current_=this.count-1;const s=r(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const $o=function(t,e,n,r){t.sort(e);const s=function(a,c){const h=c-a;let d,f;if(h===0)return null;if(h===1)return d=t[a],f=n?n(d):d,new fe(f,d.node,fe.BLACK,null,null);{const _=parseInt(h/2,10)+a,y=s(a,_),v=s(_+1,c);return d=t[_],f=n?n(d):d,new fe(f,d.node,fe.BLACK,y,v)}},i=function(a){let c=null,h=null,d=t.length;const f=function(y,v){const w=d-y,m=d;d-=y;const p=s(w+1,m),g=t[w],x=n?n(g):g;_(new fe(x,g.node,v,null,p))},_=function(y){c?(c.left=y,c=y):(h=y,c=y)};for(let y=0;y<a.count;++y){const v=a.nextBitIsOne(),w=Math.pow(2,a.count-(y+1));v?f(w,fe.BLACK):(f(w,fe.BLACK),f(w,fe.RED))}return h},o=new WS(t.length),l=i(o);return new Me(r||e,l)};/**
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
 */let Sa;const er={};class bt{constructor(e,n){this.indexes_=e,this.indexSet_=n}static get Default(){return k(er&&se,"ChildrenNode.ts has not been loaded"),Sa=Sa||new bt({".priority":er},{".priority":se}),Sa}get(e){const n=Lr(this.indexes_,e);if(!n)throw new Error("No index defined for "+e);return n instanceof Me?n:null}hasIndex(e){return yt(this.indexSet_,e.toString())}addIndex(e,n){k(e!==br,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const r=[];let s=!1;const i=n.getIterator(F.Wrap);let o=i.getNext();for(;o;)s=s||e.isDefinedOn(o.node),r.push(o),o=i.getNext();let l;s?l=$o(r,e.getCompare()):l=er;const a=e.toString(),c=Object.assign({},this.indexSet_);c[a]=e;const h=Object.assign({},this.indexes_);return h[a]=l,new bt(h,c)}addToIndexes(e,n){const r=Do(this.indexes_,(s,i)=>{const o=Lr(this.indexSet_,i);if(k(o,"Missing index implementation for "+i),s===er)if(o.isDefinedOn(e.node)){const l=[],a=n.getIterator(F.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),$o(l,o.getCompare())}else return er;else{const l=n.get(e.name);let a=s;return l&&(a=a.remove(new F(e.name,l))),a.insert(e,e.node)}});return new bt(r,this.indexSet_)}removeFromIndexes(e,n){const r=Do(this.indexes_,s=>{if(s===er)return s;{const i=n.get(e.name);return i?s.remove(new F(e.name,i)):s}});return new bt(r,this.indexSet_)}}/**
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
 */let fs;class R{constructor(e,n,r){this.children_=e,this.priorityNode_=n,this.indexMap_=r,this.lazyHash_=null,this.priorityNode_&&U_(this.priorityNode_),this.children_.isEmpty()&&k(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return fs||(fs=new R(new Me(od),null,bt.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||fs}updatePriority(e){return this.children_.isEmpty()?this:new R(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const n=this.children_.get(e);return n===null?fs:n}}getChild(e){const n=M(e);return n===null?this:this.getImmediateChild(n).getChild(K(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,n){if(k(n,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(n);{const r=new F(e,n);let s,i;n.isEmpty()?(s=this.children_.remove(e),i=this.indexMap_.removeFromIndexes(r,this.children_)):(s=this.children_.insert(e,n),i=this.indexMap_.addToIndexes(r,this.children_));const o=s.isEmpty()?fs:this.priorityNode_;return new R(s,o,i)}}updateChild(e,n){const r=M(e);if(r===null)return n;{k(M(e)!==".priority"||gn(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(r).updateChild(K(e),n);return this.updateImmediateChild(r,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const n={};let r=0,s=0,i=!0;if(this.forEachChild(se,(o,l)=>{n[o]=l.val(e),r++,i&&R.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):i=!1}),!e&&i&&s<2*r){const o=[];for(const l in n)o[l]=n[l];return o}else return e&&!this.getPriority().isEmpty()&&(n[".priority"]=this.getPriority().val()),n}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+B_(this.getPriority().val())+":"),this.forEachChild(se,(n,r)=>{const s=r.hash();s!==""&&(e+=":"+n+":"+s)}),this.lazyHash_=e===""?"":m_(e)}return this.lazyHash_}getPredecessorChildName(e,n,r){const s=this.resolveIndex_(r);if(s){const i=s.getPredecessorKey(new F(e,n));return i?i.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.minKey();return r&&r.name}else return this.children_.minKey()}getFirstChild(e){const n=this.getFirstChildName(e);return n?new F(n,this.children_.get(n)):null}getLastChildName(e){const n=this.resolveIndex_(e);if(n){const r=n.maxKey();return r&&r.name}else return this.children_.maxKey()}getLastChild(e){const n=this.getLastChildName(e);return n?new F(n,this.children_.get(n)):null}forEachChild(e,n){const r=this.resolveIndex_(e);return r?r.inorderTraversal(s=>n(s.name,s.node)):this.children_.inorderTraversal(n)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,F.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)<0;)s.getNext(),i=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,n){const r=this.resolveIndex_(n);if(r)return r.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,F.Wrap);let i=s.peek();for(;i!=null&&n.compare(i,e)>0;)s.getNext(),i=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===wi?-1:0}withIndex(e){if(e===br||this.indexMap_.hasIndex(e))return this;{const n=this.indexMap_.addIndex(e,this.children_);return new R(this.children_,this.priorityNode_,n)}}isIndexed(e){return e===br||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const n=e;if(this.getPriority().equals(n.getPriority()))if(this.children_.count()===n.children_.count()){const r=this.getIterator(se),s=n.getIterator(se);let i=r.getNext(),o=s.getNext();for(;i&&o;){if(i.name!==o.name||!i.node.equals(o.node))return!1;i=r.getNext(),o=s.getNext()}return i===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===br?null:this.indexMap_.get(e.toString())}}R.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class VS extends R{constructor(){super(new Me(od),R.EMPTY_NODE,bt.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return R.EMPTY_NODE}isEmpty(){return!1}}const wi=new VS;Object.defineProperties(F,{MIN:{value:new F(Ur,R.EMPTY_NODE)},MAX:{value:new F($n,wi)}});L_.__EMPTY_NODE=R.EMPTY_NODE;de.__childrenNodeConstructor=R;FS(wi);BS(wi);/**
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
 */const HS=!0;function pe(t,e=null){if(t===null)return R.EMPTY_NODE;if(typeof t=="object"&&".priority"in t&&(e=t[".priority"]),k(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof t=="object"&&".value"in t&&t[".value"]!==null&&(t=t[".value"]),typeof t!="object"||".sv"in t){const n=t;return new de(n,pe(e))}if(!(t instanceof Array)&&HS){const n=[];let r=!1;if(we(t,(o,l)=>{if(o.substring(0,1)!=="."){const a=pe(l);a.isEmpty()||(r=r||!a.getPriority().isEmpty(),n.push(new F(o,a)))}}),n.length===0)return R.EMPTY_NODE;const i=$o(n,MS,o=>o.name,od);if(r){const o=$o(n,se.getCompare());return new R(i,pe(e),new bt({".priority":o},{".priority":se}))}else return new R(i,pe(e),bt.Default)}else{let n=R.EMPTY_NODE;return we(t,(r,s)=>{if(yt(t,r)&&r.substring(0,1)!=="."){const i=pe(s);(i.isLeafNode()||!i.isEmpty())&&(n=n.updateImmediateChild(r,i))}}),n.updatePriority(pe(e))}}LS(pe);/**
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
 */class $S extends Nl{constructor(e){super(),this.indexPath_=e,k(!B(e)&&M(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,n){const r=this.extractChild(e.node),s=this.extractChild(n.node),i=r.compareTo(s);return i===0?Xn(e.name,n.name):i}makePost(e,n){const r=pe(e),s=R.EMPTY_NODE.updateChild(this.indexPath_,r);return new F(n,s)}maxPost(){const e=R.EMPTY_NODE.updateChild(this.indexPath_,wi);return new F($n,e)}toString(){return ti(this.indexPath_,0).join("/")}}/**
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
 */class GS extends Nl{compare(e,n){const r=e.node.compareTo(n.node);return r===0?Xn(e.name,n.name):r}isDefinedOn(e){return!0}indexedValueChanged(e,n){return!e.equals(n)}minPost(){return F.MIN}maxPost(){return F.MAX}makePost(e,n){const r=pe(e);return new F(n,r)}toString(){return".value"}}const KS=new GS;/**
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
 */function V_(t){return{type:"value",snapshotNode:t}}function zr(t,e){return{type:"child_added",snapshotNode:e,childName:t}}function ni(t,e){return{type:"child_removed",snapshotNode:e,childName:t}}function ri(t,e,n){return{type:"child_changed",snapshotNode:e,childName:t,oldSnap:n}}function QS(t,e){return{type:"child_moved",snapshotNode:e,childName:t}}/**
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
 */class ld{constructor(e){this.index_=e}updateChild(e,n,r,s,i,o){k(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(n);return l.getChild(s).equals(r.getChild(s))&&l.isEmpty()===r.isEmpty()||(o!=null&&(r.isEmpty()?e.hasChild(n)?o.trackChildChange(ni(n,l)):k(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(zr(n,r)):o.trackChildChange(ri(n,r,l))),e.isLeafNode()&&r.isEmpty())?e:e.updateImmediateChild(n,r).withIndex(this.index_)}updateFullNode(e,n,r){return r!=null&&(e.isLeafNode()||e.forEachChild(se,(s,i)=>{n.hasChild(s)||r.trackChildChange(ni(s,i))}),n.isLeafNode()||n.forEachChild(se,(s,i)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(i)||r.trackChildChange(ri(s,i,o))}else r.trackChildChange(zr(s,i))})),n.withIndex(this.index_)}updatePriority(e,n){return e.isEmpty()?R.EMPTY_NODE:e.updatePriority(n)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class si{constructor(e){this.indexedFilter_=new ld(e.getIndex()),this.index_=e.getIndex(),this.startPost_=si.getStartPost_(e),this.endPost_=si.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const n=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,r=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return n&&r}updateChild(e,n,r,s,i,o){return this.matches(new F(n,r))||(r=R.EMPTY_NODE),this.indexedFilter_.updateChild(e,n,r,s,i,o)}updateFullNode(e,n,r){n.isLeafNode()&&(n=R.EMPTY_NODE);let s=n.withIndex(this.index_);s=s.updatePriority(R.EMPTY_NODE);const i=this;return n.forEachChild(se,(o,l)=>{i.matches(new F(o,l))||(s=s.updateImmediateChild(o,R.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const n=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),n)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const n=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),n)}else return e.getIndex().maxPost()}}/**
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
 */class qS{constructor(e){this.withinDirectionalStart=n=>this.reverse_?this.withinEndPost(n):this.withinStartPost(n),this.withinDirectionalEnd=n=>this.reverse_?this.withinStartPost(n):this.withinEndPost(n),this.withinStartPost=n=>{const r=this.index_.compare(this.rangedFilter_.getStartPost(),n);return this.startIsInclusive_?r<=0:r<0},this.withinEndPost=n=>{const r=this.index_.compare(n,this.rangedFilter_.getEndPost());return this.endIsInclusive_?r<=0:r<0},this.rangedFilter_=new si(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,n,r,s,i,o){return this.rangedFilter_.matches(new F(n,r))||(r=R.EMPTY_NODE),e.getImmediateChild(n).equals(r)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,n,r,s,i,o):this.fullLimitUpdateChild_(e,n,r,i,o)}updateFullNode(e,n,r){let s;if(n.isLeafNode()||n.isEmpty())s=R.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<n.numChildren()&&n.isIndexed(this.index_)){s=R.EMPTY_NODE.withIndex(this.index_);let i;this.reverse_?i=n.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):i=n.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;i.hasNext()&&o<this.limit_;){const l=i.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{s=n.withIndex(this.index_),s=s.updatePriority(R.EMPTY_NODE);let i;this.reverse_?i=s.getReverseIterator(this.index_):i=s.getIterator(this.index_);let o=0;for(;i.hasNext();){const l=i.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:s=s.updateImmediateChild(l.name,R.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,r)}updatePriority(e,n){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,n,r,s,i){let o;if(this.reverse_){const d=this.index_.getCompare();o=(f,_)=>d(_,f)}else o=this.index_.getCompare();const l=e;k(l.numChildren()===this.limit_,"");const a=new F(n,r),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),h=this.rangedFilter_.matches(a);if(l.hasChild(n)){const d=l.getImmediateChild(n);let f=s.getChildAfterChild(this.index_,c,this.reverse_);for(;f!=null&&(f.name===n||l.hasChild(f.name));)f=s.getChildAfterChild(this.index_,f,this.reverse_);const _=f==null?1:o(f,a);if(h&&!r.isEmpty()&&_>=0)return i!=null&&i.trackChildChange(ri(n,r,d)),l.updateImmediateChild(n,r);{i!=null&&i.trackChildChange(ni(n,d));const v=l.updateImmediateChild(n,R.EMPTY_NODE);return f!=null&&this.rangedFilter_.matches(f)?(i!=null&&i.trackChildChange(zr(f.name,f.node)),v.updateImmediateChild(f.name,f.node)):v}}else return r.isEmpty()?e:h&&o(c,a)>=0?(i!=null&&(i.trackChildChange(ni(c.name,c.node)),i.trackChildChange(zr(n,r))),l.updateImmediateChild(n,r).updateImmediateChild(c.name,R.EMPTY_NODE)):e}}/**
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
 */class ad{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=se}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return k(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return k(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Ur}hasEnd(){return this.endSet_}getIndexEndValue(){return k(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return k(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:$n}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return k(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===se}copy(){const e=new ad;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function YS(t){return t.loadsAllData()?new ld(t.getIndex()):t.hasLimit()?new qS(t):new si(t)}function Bf(t){const e={};if(t.isDefault())return e;let n;if(t.index_===se?n="$priority":t.index_===KS?n="$value":t.index_===br?n="$key":(k(t.index_ instanceof $S,"Unrecognized index type!"),n=t.index_.toString()),e.orderBy=me(n),t.startSet_){const r=t.startAfterSet_?"startAfter":"startAt";e[r]=me(t.indexStartValue_),t.startNameSet_&&(e[r]+=","+me(t.indexStartName_))}if(t.endSet_){const r=t.endBeforeSet_?"endBefore":"endAt";e[r]=me(t.indexEndValue_),t.endNameSet_&&(e[r]+=","+me(t.indexEndName_))}return t.limitSet_&&(t.isViewFromLeft()?e.limitToFirst=t.limit_:e.limitToLast=t.limit_),e}function Uf(t){const e={};if(t.startSet_&&(e.sp=t.indexStartValue_,t.startNameSet_&&(e.sn=t.indexStartName_),e.sin=!t.startAfterSet_),t.endSet_&&(e.ep=t.indexEndValue_,t.endNameSet_&&(e.en=t.indexEndName_),e.ein=!t.endBeforeSet_),t.limitSet_){e.l=t.limit_;let n=t.viewFrom_;n===""&&(t.isViewFromLeft()?n="l":n="r"),e.vf=n}return t.index_!==se&&(e.i=t.index_.toString()),e}/**
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
 */class Go extends j_{constructor(e,n,r,s){super(),this.repoInfo_=e,this.onDataUpdate_=n,this.authTokenProvider_=r,this.appCheckTokenProvider_=s,this.log_=xi("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,n){return n!==void 0?"tag$"+n:(k(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,n,r,s){const i=e._path.toString();this.log_("Listen called for "+i+" "+e._queryIdentifier);const o=Go.getListenId_(e,r),l={};this.listens_[o]=l;const a=Bf(e._queryParams);this.restRequest_(i+".json",a,(c,h)=>{let d=h;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(i,d,!1,r),Lr(this.listens_,o)===l){let f;c?c===401?f="permission_denied":f="rest_error:"+c:f="ok",s(f,null)}})}unlisten(e,n){const r=Go.getListenId_(e,n);delete this.listens_[r]}get(e){const n=Bf(e._queryParams),r=e._path.toString(),s=new pi;return this.restRequest_(r+".json",n,(i,o)=>{let l=o;i===404&&(l=null,i=null),i===null?(this.onDataUpdate_(r,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,n={},r){return n.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,i])=>{s&&s.accessToken&&(n.auth=s.accessToken),i&&i.token&&(n.ac=i.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+Yr(n);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(r&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=Xs(l.responseText)}catch{Te("Failed to parse JSON response for "+o+": "+l.responseText)}r(null,a)}else l.status!==401&&l.status!==404&&Te("Got unsuccessful REST response for "+o+" Status: "+l.status),r(l.status);r=null}},l.open("GET",o,!0),l.send()})}}/**
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
 */class XS{constructor(){this.rootNode_=R.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,n){this.rootNode_=this.rootNode_.updateChild(e,n)}}/**
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
 */function Ko(){return{value:null,children:new Map}}function H_(t,e,n){if(B(e))t.value=n,t.children.clear();else if(t.value!==null)t.value=t.value.updateChild(e,n);else{const r=M(e);t.children.has(r)||t.children.set(r,Ko());const s=t.children.get(r);e=K(e),H_(s,e,n)}}function Au(t,e,n){t.value!==null?n(e,t.value):JS(t,(r,s)=>{const i=new $(e.toString()+"/"+r);Au(s,i,n)})}function JS(t,e){t.children.forEach((n,r)=>{e(r,n)})}/**
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
 */class ZS{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),n=Object.assign({},e);return this.last_&&we(this.last_,(r,s)=>{n[r]=n[r]-s}),this.last_=e,n}}/**
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
 */const zf=10*1e3,eC=30*1e3,tC=5*60*1e3;class nC{constructor(e,n){this.server_=n,this.statsToReport_={},this.statsListener_=new ZS(e);const r=zf+(eC-zf)*Math.random();Rs(this.reportStats_.bind(this),Math.floor(r))}reportStats_(){const e=this.statsListener_.get(),n={};let r=!1;we(e,(s,i)=>{i>0&&yt(this.statsToReport_,s)&&(n[s]=i,r=!0)}),r&&this.server_.reportStats(n),Rs(this.reportStats_.bind(this),Math.floor(Math.random()*2*tC))}}/**
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
 */var it;(function(t){t[t.OVERWRITE=0]="OVERWRITE",t[t.MERGE=1]="MERGE",t[t.ACK_USER_WRITE=2]="ACK_USER_WRITE",t[t.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(it||(it={}));function ud(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function cd(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function dd(t){return{fromUser:!1,fromServer:!0,queryId:t,tagged:!0}}/**
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
 */class Qo{constructor(e,n,r){this.path=e,this.affectedTree=n,this.revert=r,this.type=it.ACK_USER_WRITE,this.source=ud()}operationForChild(e){if(B(this.path)){if(this.affectedTree.value!=null)return k(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const n=this.affectedTree.subtree(new $(e));return new Qo(W(),n,this.revert)}}else return k(M(this.path)===e,"operationForChild called for unrelated child."),new Qo(K(this.path),this.affectedTree,this.revert)}}/**
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
 */class ii{constructor(e,n){this.source=e,this.path=n,this.type=it.LISTEN_COMPLETE}operationForChild(e){return B(this.path)?new ii(this.source,W()):new ii(this.source,K(this.path))}}/**
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
 */class Gn{constructor(e,n,r){this.source=e,this.path=n,this.snap=r,this.type=it.OVERWRITE}operationForChild(e){return B(this.path)?new Gn(this.source,W(),this.snap.getImmediateChild(e)):new Gn(this.source,K(this.path),this.snap)}}/**
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
 */class Wr{constructor(e,n,r){this.source=e,this.path=n,this.children=r,this.type=it.MERGE}operationForChild(e){if(B(this.path)){const n=this.children.subtree(new $(e));return n.isEmpty()?null:n.value?new Gn(this.source,W(),n.value):new Wr(this.source,W(),n)}else return k(M(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new Wr(this.source,K(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class Kn{constructor(e,n,r){this.node_=e,this.fullyInitialized_=n,this.filtered_=r}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(B(e))return this.isFullyInitialized()&&!this.filtered_;const n=M(e);return this.isCompleteForChild(n)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class rC{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function sC(t,e,n,r){const s=[],i=[];return e.forEach(o=>{o.type==="child_changed"&&t.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&i.push(QS(o.childName,o.snapshotNode))}),ps(t,s,"child_removed",e,r,n),ps(t,s,"child_added",e,r,n),ps(t,s,"child_moved",i,r,n),ps(t,s,"child_changed",e,r,n),ps(t,s,"value",e,r,n),s}function ps(t,e,n,r,s,i){const o=r.filter(l=>l.type===n);o.sort((l,a)=>oC(t,l,a)),o.forEach(l=>{const a=iC(t,l,i);s.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,t.query_))})})}function iC(t,e,n){return e.type==="value"||e.type==="child_removed"||(e.prevName=n.getPredecessorChildName(e.childName,e.snapshotNode,t.index_)),e}function oC(t,e,n){if(e.childName==null||n.childName==null)throw qr("Should only compare child_ events.");const r=new F(e.childName,e.snapshotNode),s=new F(n.childName,n.snapshotNode);return t.index_.compare(r,s)}/**
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
 */function Il(t,e){return{eventCache:t,serverCache:e}}function Ps(t,e,n,r){return Il(new Kn(e,n,r),t.serverCache)}function $_(t,e,n,r){return Il(t.eventCache,new Kn(e,n,r))}function Ou(t){return t.eventCache.isFullyInitialized()?t.eventCache.getNode():null}function Qn(t){return t.serverCache.isFullyInitialized()?t.serverCache.getNode():null}/**
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
 */let Ca;const lC=()=>(Ca||(Ca=new Me($E)),Ca);class G{constructor(e,n=lC()){this.value=e,this.children=n}static fromObject(e){let n=new G(null);return we(e,(r,s)=>{n=n.set(new $(r),s)}),n}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,n){if(this.value!=null&&n(this.value))return{path:W(),value:this.value};if(B(e))return null;{const r=M(e),s=this.children.get(r);if(s!==null){const i=s.findRootMostMatchingPathAndValue(K(e),n);return i!=null?{path:re(new $(r),i.path),value:i.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(B(e))return this;{const n=M(e),r=this.children.get(n);return r!==null?r.subtree(K(e)):new G(null)}}set(e,n){if(B(e))return new G(n,this.children);{const r=M(e),i=(this.children.get(r)||new G(null)).set(K(e),n),o=this.children.insert(r,i);return new G(this.value,o)}}remove(e){if(B(e))return this.children.isEmpty()?new G(null):new G(null,this.children);{const n=M(e),r=this.children.get(n);if(r){const s=r.remove(K(e));let i;return s.isEmpty()?i=this.children.remove(n):i=this.children.insert(n,s),this.value===null&&i.isEmpty()?new G(null):new G(this.value,i)}else return this}}get(e){if(B(e))return this.value;{const n=M(e),r=this.children.get(n);return r?r.get(K(e)):null}}setTree(e,n){if(B(e))return n;{const r=M(e),i=(this.children.get(r)||new G(null)).setTree(K(e),n);let o;return i.isEmpty()?o=this.children.remove(r):o=this.children.insert(r,i),new G(this.value,o)}}fold(e){return this.fold_(W(),e)}fold_(e,n){const r={};return this.children.inorderTraversal((s,i)=>{r[s]=i.fold_(re(e,s),n)}),n(e,this.value,r)}findOnPath(e,n){return this.findOnPath_(e,W(),n)}findOnPath_(e,n,r){const s=this.value?r(n,this.value):!1;if(s)return s;if(B(e))return null;{const i=M(e),o=this.children.get(i);return o?o.findOnPath_(K(e),re(n,i),r):null}}foreachOnPath(e,n){return this.foreachOnPath_(e,W(),n)}foreachOnPath_(e,n,r){if(B(e))return this;{this.value&&r(n,this.value);const s=M(e),i=this.children.get(s);return i?i.foreachOnPath_(K(e),re(n,s),r):new G(null)}}foreach(e){this.foreach_(W(),e)}foreach_(e,n){this.children.inorderTraversal((r,s)=>{s.foreach_(re(e,r),n)}),this.value&&n(e,this.value)}foreachChild(e){this.children.inorderTraversal((n,r)=>{r.value&&e(n,r.value)})}}/**
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
 */class at{constructor(e){this.writeTree_=e}static empty(){return new at(new G(null))}}function As(t,e,n){if(B(e))return new at(new G(n));{const r=t.writeTree_.findRootMostValueAndPath(e);if(r!=null){const s=r.path;let i=r.value;const o=De(s,e);return i=i.updateChild(o,n),new at(t.writeTree_.set(s,i))}else{const s=new G(n),i=t.writeTree_.setTree(e,s);return new at(i)}}}function ju(t,e,n){let r=t;return we(n,(s,i)=>{r=As(r,re(e,s),i)}),r}function Wf(t,e){if(B(e))return at.empty();{const n=t.writeTree_.setTree(e,new G(null));return new at(n)}}function Du(t,e){return Jn(t,e)!=null}function Jn(t,e){const n=t.writeTree_.findRootMostValueAndPath(e);return n!=null?t.writeTree_.get(n.path).getChild(De(n.path,e)):null}function Vf(t){const e=[],n=t.writeTree_.value;return n!=null?n.isLeafNode()||n.forEachChild(se,(r,s)=>{e.push(new F(r,s))}):t.writeTree_.children.inorderTraversal((r,s)=>{s.value!=null&&e.push(new F(r,s.value))}),e}function hn(t,e){if(B(e))return t;{const n=Jn(t,e);return n!=null?new at(new G(n)):new at(t.writeTree_.subtree(e))}}function Mu(t){return t.writeTree_.isEmpty()}function Vr(t,e){return G_(W(),t.writeTree_,e)}function G_(t,e,n){if(e.value!=null)return n.updateChild(t,e.value);{let r=null;return e.children.inorderTraversal((s,i)=>{s===".priority"?(k(i.value!==null,"Priority writes must always be leaf nodes"),r=i.value):n=G_(re(t,s),i,n)}),!n.getChild(t).isEmpty()&&r!==null&&(n=n.updateChild(re(t,".priority"),r)),n}}/**
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
 */function hd(t,e){return Y_(e,t)}function aC(t,e,n,r,s){k(r>t.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),t.allWrites.push({path:e,snap:n,writeId:r,visible:s}),s&&(t.visibleWrites=As(t.visibleWrites,e,n)),t.lastWriteId=r}function uC(t,e,n,r){k(r>t.lastWriteId,"Stacking an older merge on top of newer ones"),t.allWrites.push({path:e,children:n,writeId:r,visible:!0}),t.visibleWrites=ju(t.visibleWrites,e,n),t.lastWriteId=r}function cC(t,e){for(let n=0;n<t.allWrites.length;n++){const r=t.allWrites[n];if(r.writeId===e)return r}return null}function dC(t,e){const n=t.allWrites.findIndex(l=>l.writeId===e);k(n>=0,"removeWrite called with nonexistent writeId.");const r=t.allWrites[n];t.allWrites.splice(n,1);let s=r.visible,i=!1,o=t.allWrites.length-1;for(;s&&o>=0;){const l=t.allWrites[o];l.visible&&(o>=n&&hC(l,r.path)?s=!1:qe(r.path,l.path)&&(i=!0)),o--}if(s){if(i)return fC(t),!0;if(r.snap)t.visibleWrites=Wf(t.visibleWrites,r.path);else{const l=r.children;we(l,a=>{t.visibleWrites=Wf(t.visibleWrites,re(r.path,a))})}return!0}else return!1}function hC(t,e){if(t.snap)return qe(t.path,e);for(const n in t.children)if(t.children.hasOwnProperty(n)&&qe(re(t.path,n),e))return!0;return!1}function fC(t){t.visibleWrites=K_(t.allWrites,pC,W()),t.allWrites.length>0?t.lastWriteId=t.allWrites[t.allWrites.length-1].writeId:t.lastWriteId=-1}function pC(t){return t.visible}function K_(t,e,n){let r=at.empty();for(let s=0;s<t.length;++s){const i=t[s];if(e(i)){const o=i.path;let l;if(i.snap)qe(n,o)?(l=De(n,o),r=As(r,l,i.snap)):qe(o,n)&&(l=De(o,n),r=As(r,W(),i.snap.getChild(l)));else if(i.children){if(qe(n,o))l=De(n,o),r=ju(r,l,i.children);else if(qe(o,n))if(l=De(o,n),B(l))r=ju(r,W(),i.children);else{const a=Lr(i.children,M(l));if(a){const c=a.getChild(K(l));r=As(r,W(),c)}}}else throw qr("WriteRecord should have .snap or .children")}}return r}function Q_(t,e,n,r,s){if(!r&&!s){const i=Jn(t.visibleWrites,e);if(i!=null)return i;{const o=hn(t.visibleWrites,e);if(Mu(o))return n;if(n==null&&!Du(o,W()))return null;{const l=n||R.EMPTY_NODE;return Vr(o,l)}}}else{const i=hn(t.visibleWrites,e);if(!s&&Mu(i))return n;if(!s&&n==null&&!Du(i,W()))return null;{const o=function(c){return(c.visible||s)&&(!r||!~r.indexOf(c.writeId))&&(qe(c.path,e)||qe(e,c.path))},l=K_(t.allWrites,o,e),a=n||R.EMPTY_NODE;return Vr(l,a)}}}function mC(t,e,n){let r=R.EMPTY_NODE;const s=Jn(t.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(se,(i,o)=>{r=r.updateImmediateChild(i,o)}),r;if(n){const i=hn(t.visibleWrites,e);return n.forEachChild(se,(o,l)=>{const a=Vr(hn(i,new $(o)),l);r=r.updateImmediateChild(o,a)}),Vf(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}else{const i=hn(t.visibleWrites,e);return Vf(i).forEach(o=>{r=r.updateImmediateChild(o.name,o.node)}),r}}function gC(t,e,n,r,s){k(r||s,"Either existingEventSnap or existingServerSnap must exist");const i=re(e,n);if(Du(t.visibleWrites,i))return null;{const o=hn(t.visibleWrites,i);return Mu(o)?s.getChild(n):Vr(o,s.getChild(n))}}function _C(t,e,n,r){const s=re(e,n),i=Jn(t.visibleWrites,s);if(i!=null)return i;if(r.isCompleteForChild(n)){const o=hn(t.visibleWrites,s);return Vr(o,r.getNode().getImmediateChild(n))}else return null}function vC(t,e){return Jn(t.visibleWrites,e)}function yC(t,e,n,r,s,i,o){let l;const a=hn(t.visibleWrites,e),c=Jn(a,W());if(c!=null)l=c;else if(n!=null)l=Vr(a,n);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const h=[],d=o.getCompare(),f=i?l.getReverseIteratorFrom(r,o):l.getIteratorFrom(r,o);let _=f.getNext();for(;_&&h.length<s;)d(_,r)!==0&&h.push(_),_=f.getNext();return h}else return[]}function xC(){return{visibleWrites:at.empty(),allWrites:[],lastWriteId:-1}}function qo(t,e,n,r){return Q_(t.writeTree,t.treePath,e,n,r)}function fd(t,e){return mC(t.writeTree,t.treePath,e)}function Hf(t,e,n,r){return gC(t.writeTree,t.treePath,e,n,r)}function Yo(t,e){return vC(t.writeTree,re(t.treePath,e))}function wC(t,e,n,r,s,i){return yC(t.writeTree,t.treePath,e,n,r,s,i)}function pd(t,e,n){return _C(t.writeTree,t.treePath,e,n)}function q_(t,e){return Y_(re(t.treePath,e),t.writeTree)}function Y_(t,e){return{treePath:t,writeTree:e}}/**
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
 */class EC{constructor(){this.changeMap=new Map}trackChildChange(e){const n=e.type,r=e.childName;k(n==="child_added"||n==="child_changed"||n==="child_removed","Only child changes supported for tracking"),k(r!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(r);if(s){const i=s.type;if(n==="child_added"&&i==="child_removed")this.changeMap.set(r,ri(r,e.snapshotNode,s.snapshotNode));else if(n==="child_removed"&&i==="child_added")this.changeMap.delete(r);else if(n==="child_removed"&&i==="child_changed")this.changeMap.set(r,ni(r,s.oldSnap));else if(n==="child_changed"&&i==="child_added")this.changeMap.set(r,zr(r,e.snapshotNode));else if(n==="child_changed"&&i==="child_changed")this.changeMap.set(r,ri(r,e.snapshotNode,s.oldSnap));else throw qr("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(r,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class SC{getCompleteChild(e){return null}getChildAfterChild(e,n,r){return null}}const X_=new SC;class md{constructor(e,n,r=null){this.writes_=e,this.viewCache_=n,this.optCompleteServerCache_=r}getCompleteChild(e){const n=this.viewCache_.eventCache;if(n.isCompleteForChild(e))return n.getNode().getImmediateChild(e);{const r=this.optCompleteServerCache_!=null?new Kn(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return pd(this.writes_,e,r)}}getChildAfterChild(e,n,r){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Qn(this.viewCache_),i=wC(this.writes_,s,n,1,r,e);return i.length===0?null:i[0]}}/**
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
 */function CC(t){return{filter:t}}function kC(t,e){k(e.eventCache.getNode().isIndexed(t.filter.getIndex()),"Event snap not indexed"),k(e.serverCache.getNode().isIndexed(t.filter.getIndex()),"Server snap not indexed")}function NC(t,e,n,r,s){const i=new EC;let o,l;if(n.type===it.OVERWRITE){const c=n;c.source.fromUser?o=Fu(t,e,c.path,c.snap,r,s,i):(k(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!B(c.path),o=Xo(t,e,c.path,c.snap,r,s,l,i))}else if(n.type===it.MERGE){const c=n;c.source.fromUser?o=bC(t,e,c.path,c.children,r,s,i):(k(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=Lu(t,e,c.path,c.children,r,s,l,i))}else if(n.type===it.ACK_USER_WRITE){const c=n;c.revert?o=PC(t,e,c.path,r,s,i):o=TC(t,e,c.path,c.affectedTree,r,s,i)}else if(n.type===it.LISTEN_COMPLETE)o=RC(t,e,n.path,r,i);else throw qr("Unknown operation type: "+n.type);const a=i.getChanges();return IC(e,o,a),{viewCache:o,changes:a}}function IC(t,e,n){const r=e.eventCache;if(r.isFullyInitialized()){const s=r.getNode().isLeafNode()||r.getNode().isEmpty(),i=Ou(t);(n.length>0||!t.eventCache.isFullyInitialized()||s&&!r.getNode().equals(i)||!r.getNode().getPriority().equals(i.getPriority()))&&n.push(V_(Ou(e)))}}function J_(t,e,n,r,s,i){const o=e.eventCache;if(Yo(r,n)!=null)return e;{let l,a;if(B(n))if(k(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Qn(e),h=c instanceof R?c:R.EMPTY_NODE,d=fd(r,h);l=t.filter.updateFullNode(e.eventCache.getNode(),d,i)}else{const c=qo(r,Qn(e));l=t.filter.updateFullNode(e.eventCache.getNode(),c,i)}else{const c=M(n);if(c===".priority"){k(gn(n)===1,"Can't have a priority with additional path components");const h=o.getNode();a=e.serverCache.getNode();const d=Hf(r,n,h,a);d!=null?l=t.filter.updatePriority(h,d):l=o.getNode()}else{const h=K(n);let d;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const f=Hf(r,n,o.getNode(),a);f!=null?d=o.getNode().getImmediateChild(c).updateChild(h,f):d=o.getNode().getImmediateChild(c)}else d=pd(r,c,e.serverCache);d!=null?l=t.filter.updateChild(o.getNode(),c,d,h,s,i):l=o.getNode()}}return Ps(e,l,o.isFullyInitialized()||B(n),t.filter.filtersNodes())}}function Xo(t,e,n,r,s,i,o,l){const a=e.serverCache;let c;const h=o?t.filter:t.filter.getIndexedFilter();if(B(n))c=h.updateFullNode(a.getNode(),r,null);else if(h.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(n,r);c=h.updateFullNode(a.getNode(),_,null)}else{const _=M(n);if(!a.isCompleteForPath(n)&&gn(n)>1)return e;const y=K(n),w=a.getNode().getImmediateChild(_).updateChild(y,r);_===".priority"?c=h.updatePriority(a.getNode(),w):c=h.updateChild(a.getNode(),_,w,y,X_,null)}const d=$_(e,c,a.isFullyInitialized()||B(n),h.filtersNodes()),f=new md(s,d,i);return J_(t,d,n,s,f,l)}function Fu(t,e,n,r,s,i,o){const l=e.eventCache;let a,c;const h=new md(s,e,i);if(B(n))c=t.filter.updateFullNode(e.eventCache.getNode(),r,o),a=Ps(e,c,!0,t.filter.filtersNodes());else{const d=M(n);if(d===".priority")c=t.filter.updatePriority(e.eventCache.getNode(),r),a=Ps(e,c,l.isFullyInitialized(),l.isFiltered());else{const f=K(n),_=l.getNode().getImmediateChild(d);let y;if(B(f))y=r;else{const v=h.getCompleteChild(d);v!=null?rd(f)===".priority"&&v.getChild(M_(f)).isEmpty()?y=v:y=v.updateChild(f,r):y=R.EMPTY_NODE}if(_.equals(y))a=e;else{const v=t.filter.updateChild(l.getNode(),d,y,f,h,o);a=Ps(e,v,l.isFullyInitialized(),t.filter.filtersNodes())}}}return a}function $f(t,e){return t.eventCache.isCompleteForChild(e)}function bC(t,e,n,r,s,i,o){let l=e;return r.foreach((a,c)=>{const h=re(n,a);$f(e,M(h))&&(l=Fu(t,l,h,c,s,i,o))}),r.foreach((a,c)=>{const h=re(n,a);$f(e,M(h))||(l=Fu(t,l,h,c,s,i,o))}),l}function Gf(t,e,n){return n.foreach((r,s)=>{e=e.updateChild(r,s)}),e}function Lu(t,e,n,r,s,i,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;B(n)?c=r:c=new G(null).setTree(n,r);const h=e.serverCache.getNode();return c.children.inorderTraversal((d,f)=>{if(h.hasChild(d)){const _=e.serverCache.getNode().getImmediateChild(d),y=Gf(t,_,f);a=Xo(t,a,new $(d),y,s,i,o,l)}}),c.children.inorderTraversal((d,f)=>{const _=!e.serverCache.isCompleteForChild(d)&&f.value===null;if(!h.hasChild(d)&&!_){const y=e.serverCache.getNode().getImmediateChild(d),v=Gf(t,y,f);a=Xo(t,a,new $(d),v,s,i,o,l)}}),a}function TC(t,e,n,r,s,i,o){if(Yo(s,n)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(r.value!=null){if(B(n)&&a.isFullyInitialized()||a.isCompleteForPath(n))return Xo(t,e,n,a.getNode().getChild(n),s,i,l,o);if(B(n)){let c=new G(null);return a.getNode().forEachChild(br,(h,d)=>{c=c.set(new $(h),d)}),Lu(t,e,n,c,s,i,l,o)}else return e}else{let c=new G(null);return r.foreach((h,d)=>{const f=re(n,h);a.isCompleteForPath(f)&&(c=c.set(h,a.getNode().getChild(f)))}),Lu(t,e,n,c,s,i,l,o)}}function RC(t,e,n,r,s){const i=e.serverCache,o=$_(e,i.getNode(),i.isFullyInitialized()||B(n),i.isFiltered());return J_(t,o,n,r,X_,s)}function PC(t,e,n,r,s,i){let o;if(Yo(r,n)!=null)return e;{const l=new md(r,e,s),a=e.eventCache.getNode();let c;if(B(n)||M(n)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=qo(r,Qn(e));else{const d=e.serverCache.getNode();k(d instanceof R,"serverChildren would be complete if leaf node"),h=fd(r,d)}h=h,c=t.filter.updateFullNode(a,h,i)}else{const h=M(n);let d=pd(r,h,e.serverCache);d==null&&e.serverCache.isCompleteForChild(h)&&(d=a.getImmediateChild(h)),d!=null?c=t.filter.updateChild(a,h,d,K(n),l,i):e.eventCache.getNode().hasChild(h)?c=t.filter.updateChild(a,h,R.EMPTY_NODE,K(n),l,i):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=qo(r,Qn(e)),o.isLeafNode()&&(c=t.filter.updateFullNode(c,o,i)))}return o=e.serverCache.isFullyInitialized()||Yo(r,W())!=null,Ps(e,c,o,t.filter.filtersNodes())}}/**
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
 */class AC{constructor(e,n){this.query_=e,this.eventRegistrations_=[];const r=this.query_._queryParams,s=new ld(r.getIndex()),i=YS(r);this.processor_=CC(i);const o=n.serverCache,l=n.eventCache,a=s.updateFullNode(R.EMPTY_NODE,o.getNode(),null),c=i.updateFullNode(R.EMPTY_NODE,l.getNode(),null),h=new Kn(a,o.isFullyInitialized(),s.filtersNodes()),d=new Kn(c,l.isFullyInitialized(),i.filtersNodes());this.viewCache_=Il(d,h),this.eventGenerator_=new rC(this.query_)}get query(){return this.query_}}function OC(t){return t.viewCache_.serverCache.getNode()}function jC(t,e){const n=Qn(t.viewCache_);return n&&(t.query._queryParams.loadsAllData()||!B(e)&&!n.getImmediateChild(M(e)).isEmpty())?n.getChild(e):null}function Kf(t){return t.eventRegistrations_.length===0}function DC(t,e){t.eventRegistrations_.push(e)}function Qf(t,e,n){const r=[];if(n){k(e==null,"A cancel should cancel all event registrations.");const s=t.query._path;t.eventRegistrations_.forEach(i=>{const o=i.createCancelEvent(n,s);o&&r.push(o)})}if(e){let s=[];for(let i=0;i<t.eventRegistrations_.length;++i){const o=t.eventRegistrations_[i];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(t.eventRegistrations_.slice(i+1));break}}t.eventRegistrations_=s}else t.eventRegistrations_=[];return r}function qf(t,e,n,r){e.type===it.MERGE&&e.source.queryId!==null&&(k(Qn(t.viewCache_),"We should always have a full cache before handling merges"),k(Ou(t.viewCache_),"Missing event cache, even though we have a server cache"));const s=t.viewCache_,i=NC(t.processor_,s,e,n,r);return kC(t.processor_,i.viewCache),k(i.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),t.viewCache_=i.viewCache,Z_(t,i.changes,i.viewCache.eventCache.getNode(),null)}function MC(t,e){const n=t.viewCache_.eventCache,r=[];return n.getNode().isLeafNode()||n.getNode().forEachChild(se,(i,o)=>{r.push(zr(i,o))}),n.isFullyInitialized()&&r.push(V_(n.getNode())),Z_(t,r,n.getNode(),e)}function Z_(t,e,n,r){const s=r?[r]:t.eventRegistrations_;return sC(t.eventGenerator_,e,n,s)}/**
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
 */let Jo;class FC{constructor(){this.views=new Map}}function LC(t){k(!Jo,"__referenceConstructor has already been defined"),Jo=t}function BC(){return k(Jo,"Reference.ts has not been loaded"),Jo}function UC(t){return t.views.size===0}function gd(t,e,n,r){const s=e.source.queryId;if(s!==null){const i=t.views.get(s);return k(i!=null,"SyncTree gave us an op for an invalid query."),qf(i,e,n,r)}else{let i=[];for(const o of t.views.values())i=i.concat(qf(o,e,n,r));return i}}function zC(t,e,n,r,s){const i=e._queryIdentifier,o=t.views.get(i);if(!o){let l=qo(n,s?r:null),a=!1;l?a=!0:r instanceof R?(l=fd(n,r),a=!1):(l=R.EMPTY_NODE,a=!1);const c=Il(new Kn(l,a,!1),new Kn(r,s,!1));return new AC(e,c)}return o}function WC(t,e,n,r,s,i){const o=zC(t,e,r,s,i);return t.views.has(e._queryIdentifier)||t.views.set(e._queryIdentifier,o),DC(o,n),MC(o,n)}function VC(t,e,n,r){const s=e._queryIdentifier,i=[];let o=[];const l=_n(t);if(s==="default")for(const[a,c]of t.views.entries())o=o.concat(Qf(c,n,r)),Kf(c)&&(t.views.delete(a),c.query._queryParams.loadsAllData()||i.push(c.query));else{const a=t.views.get(s);a&&(o=o.concat(Qf(a,n,r)),Kf(a)&&(t.views.delete(s),a.query._queryParams.loadsAllData()||i.push(a.query)))}return l&&!_n(t)&&i.push(new(BC())(e._repo,e._path)),{removed:i,events:o}}function ev(t){const e=[];for(const n of t.views.values())n.query._queryParams.loadsAllData()||e.push(n);return e}function Tr(t,e){let n=null;for(const r of t.views.values())n=n||jC(r,e);return n}function tv(t,e){if(e._queryParams.loadsAllData())return bl(t);{const r=e._queryIdentifier;return t.views.get(r)}}function nv(t,e){return tv(t,e)!=null}function _n(t){return bl(t)!=null}function bl(t){for(const e of t.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let Zo;function HC(t){k(!Zo,"__referenceConstructor has already been defined"),Zo=t}function $C(){return k(Zo,"Reference.ts has not been loaded"),Zo}let GC=1;class Yf{constructor(e){this.listenProvider_=e,this.syncPointTree_=new G(null),this.pendingWriteTree_=xC(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function rv(t,e,n,r,s){return aC(t.pendingWriteTree_,e,n,r,s),s?es(t,new Gn(ud(),e,n)):[]}function KC(t,e,n,r){uC(t.pendingWriteTree_,e,n,r);const s=G.fromObject(n);return es(t,new Wr(ud(),e,s))}function Jt(t,e,n=!1){const r=cC(t.pendingWriteTree_,e);if(dC(t.pendingWriteTree_,e)){let i=new G(null);return r.snap!=null?i=i.set(W(),!0):we(r.children,o=>{i=i.set(new $(o),!0)}),es(t,new Qo(r.path,i,n))}else return[]}function Tl(t,e,n){return es(t,new Gn(cd(),e,n))}function QC(t,e,n){const r=G.fromObject(n);return es(t,new Wr(cd(),e,r))}function qC(t,e){return es(t,new ii(cd(),e))}function YC(t,e,n){const r=vd(t,n);if(r){const s=yd(r),i=s.path,o=s.queryId,l=De(i,e),a=new ii(dd(o),l);return xd(t,i,a)}else return[]}function Bu(t,e,n,r,s=!1){const i=e._path,o=t.syncPointTree_.get(i);let l=[];if(o&&(e._queryIdentifier==="default"||nv(o,e))){const a=VC(o,e,n,r);UC(o)&&(t.syncPointTree_=t.syncPointTree_.remove(i));const c=a.removed;if(l=a.events,!s){const h=c.findIndex(f=>f._queryParams.loadsAllData())!==-1,d=t.syncPointTree_.findOnPath(i,(f,_)=>_n(_));if(h&&!d){const f=t.syncPointTree_.subtree(i);if(!f.isEmpty()){const _=ZC(f);for(let y=0;y<_.length;++y){const v=_[y],w=v.query,m=ov(t,v);t.listenProvider_.startListening(Os(w),el(t,w),m.hashFn,m.onComplete)}}}!d&&c.length>0&&!r&&(h?t.listenProvider_.stopListening(Os(e),null):c.forEach(f=>{const _=t.queryToTagMap.get(Rl(f));t.listenProvider_.stopListening(Os(f),_)}))}ek(t,c)}return l}function XC(t,e,n,r){const s=vd(t,r);if(s!=null){const i=yd(s),o=i.path,l=i.queryId,a=De(o,e),c=new Gn(dd(l),a,n);return xd(t,o,c)}else return[]}function JC(t,e,n,r){const s=vd(t,r);if(s){const i=yd(s),o=i.path,l=i.queryId,a=De(o,e),c=G.fromObject(n),h=new Wr(dd(l),a,c);return xd(t,o,h)}else return[]}function Xf(t,e,n,r=!1){const s=e._path;let i=null,o=!1;t.syncPointTree_.foreachOnPath(s,(f,_)=>{const y=De(f,s);i=i||Tr(_,y),o=o||_n(_)});let l=t.syncPointTree_.get(s);l?(o=o||_n(l),i=i||Tr(l,W())):(l=new FC,t.syncPointTree_=t.syncPointTree_.set(s,l));let a;i!=null?a=!0:(a=!1,i=R.EMPTY_NODE,t.syncPointTree_.subtree(s).foreachChild((_,y)=>{const v=Tr(y,W());v&&(i=i.updateImmediateChild(_,v))}));const c=nv(l,e);if(!c&&!e._queryParams.loadsAllData()){const f=Rl(e);k(!t.queryToTagMap.has(f),"View does not exist, but we have a tag");const _=tk();t.queryToTagMap.set(f,_),t.tagToQueryMap.set(_,f)}const h=hd(t.pendingWriteTree_,s);let d=WC(l,e,n,h,i,a);if(!c&&!o&&!r){const f=tv(l,e);d=d.concat(nk(t,e,f))}return d}function _d(t,e,n){const s=t.pendingWriteTree_,i=t.syncPointTree_.findOnPath(e,(o,l)=>{const a=De(o,e),c=Tr(l,a);if(c)return c});return Q_(s,e,i,n,!0)}function es(t,e){return sv(e,t.syncPointTree_,null,hd(t.pendingWriteTree_,W()))}function sv(t,e,n,r){if(B(t.path))return iv(t,e,n,r);{const s=e.get(W());n==null&&s!=null&&(n=Tr(s,W()));let i=[];const o=M(t.path),l=t.operationForChild(o),a=e.children.get(o);if(a&&l){const c=n?n.getImmediateChild(o):null,h=q_(r,o);i=i.concat(sv(l,a,c,h))}return s&&(i=i.concat(gd(s,t,r,n))),i}}function iv(t,e,n,r){const s=e.get(W());n==null&&s!=null&&(n=Tr(s,W()));let i=[];return e.children.inorderTraversal((o,l)=>{const a=n?n.getImmediateChild(o):null,c=q_(r,o),h=t.operationForChild(o);h&&(i=i.concat(iv(h,l,a,c)))}),s&&(i=i.concat(gd(s,t,r,n))),i}function ov(t,e){const n=e.query,r=el(t,n);return{hashFn:()=>(OC(e)||R.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return r?YC(t,n._path,r):qC(t,n._path);{const i=QE(s,n);return Bu(t,n,null,i)}}}}function el(t,e){const n=Rl(e);return t.queryToTagMap.get(n)}function Rl(t){return t._path.toString()+"$"+t._queryIdentifier}function vd(t,e){return t.tagToQueryMap.get(e)}function yd(t){const e=t.indexOf("$");return k(e!==-1&&e<t.length-1,"Bad queryKey."),{queryId:t.substr(e+1),path:new $(t.substr(0,e))}}function xd(t,e,n){const r=t.syncPointTree_.get(e);k(r,"Missing sync point for query tag that we're tracking");const s=hd(t.pendingWriteTree_,e);return gd(r,n,s,null)}function ZC(t){return t.fold((e,n,r)=>{if(n&&_n(n))return[bl(n)];{let s=[];return n&&(s=ev(n)),we(r,(i,o)=>{s=s.concat(o)}),s}})}function Os(t){return t._queryParams.loadsAllData()&&!t._queryParams.isDefault()?new($C())(t._repo,t._path):t}function ek(t,e){for(let n=0;n<e.length;++n){const r=e[n];if(!r._queryParams.loadsAllData()){const s=Rl(r),i=t.queryToTagMap.get(s);t.queryToTagMap.delete(s),t.tagToQueryMap.delete(i)}}}function tk(){return GC++}function nk(t,e,n){const r=e._path,s=el(t,e),i=ov(t,n),o=t.listenProvider_.startListening(Os(e),s,i.hashFn,i.onComplete),l=t.syncPointTree_.subtree(r);if(s)k(!_n(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,h,d)=>{if(!B(c)&&h&&_n(h))return[bl(h).query];{let f=[];return h&&(f=f.concat(ev(h).map(_=>_.query))),we(d,(_,y)=>{f=f.concat(y)}),f}});for(let c=0;c<a.length;++c){const h=a[c];t.listenProvider_.stopListening(Os(h),el(t,h))}}return o}/**
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
 */class wd{constructor(e){this.node_=e}getImmediateChild(e){const n=this.node_.getImmediateChild(e);return new wd(n)}node(){return this.node_}}class Ed{constructor(e,n){this.syncTree_=e,this.path_=n}getImmediateChild(e){const n=re(this.path_,e);return new Ed(this.syncTree_,n)}node(){return _d(this.syncTree_,this.path_)}}const rk=function(t){return t=t||{},t.timestamp=t.timestamp||new Date().getTime(),t},Jf=function(t,e,n){if(!t||typeof t!="object")return t;if(k(".sv"in t,"Unexpected leaf node or priority contents"),typeof t[".sv"]=="string")return sk(t[".sv"],e,n);if(typeof t[".sv"]=="object")return ik(t[".sv"],e);k(!1,"Unexpected server value: "+JSON.stringify(t,null,2))},sk=function(t,e,n){switch(t){case"timestamp":return n.timestamp;default:k(!1,"Unexpected server value: "+t)}},ik=function(t,e,n){t.hasOwnProperty("increment")||k(!1,"Unexpected server value: "+JSON.stringify(t,null,2));const r=t.increment;typeof r!="number"&&k(!1,"Unexpected increment value: "+r);const s=e.node();if(k(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return r;const o=s.getValue();return typeof o!="number"?r:o+r},lv=function(t,e,n,r){return Sd(e,new Ed(n,t),r)},av=function(t,e,n){return Sd(t,new wd(e),n)};function Sd(t,e,n){const r=t.getPriority().val(),s=Jf(r,e.getImmediateChild(".priority"),n);let i;if(t.isLeafNode()){const o=t,l=Jf(o.getValue(),e,n);return l!==o.getValue()||s!==o.getPriority().val()?new de(l,pe(s)):t}else{const o=t;return i=o,s!==o.getPriority().val()&&(i=i.updatePriority(new de(s))),o.forEachChild(se,(l,a)=>{const c=Sd(a,e.getImmediateChild(l),n);c!==a&&(i=i.updateImmediateChild(l,c))}),i}}/**
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
 */class Cd{constructor(e="",n=null,r={children:{},childCount:0}){this.name=e,this.parent=n,this.node=r}}function kd(t,e){let n=e instanceof $?e:new $(e),r=t,s=M(n);for(;s!==null;){const i=Lr(r.node.children,s)||{children:{},childCount:0};r=new Cd(s,r,i),n=K(n),s=M(n)}return r}function ts(t){return t.node.value}function uv(t,e){t.node.value=e,Uu(t)}function cv(t){return t.node.childCount>0}function ok(t){return ts(t)===void 0&&!cv(t)}function Pl(t,e){we(t.node.children,(n,r)=>{e(new Cd(n,t,r))})}function dv(t,e,n,r){n&&e(t),Pl(t,s=>{dv(s,e,!0)})}function lk(t,e,n){let r=t.parent;for(;r!==null;){if(e(r))return!0;r=r.parent}return!1}function Ei(t){return new $(t.parent===null?t.name:Ei(t.parent)+"/"+t.name)}function Uu(t){t.parent!==null&&ak(t.parent,t.name,t)}function ak(t,e,n){const r=ok(n),s=yt(t.node.children,e);r&&s?(delete t.node.children[e],t.node.childCount--,Uu(t)):!r&&!s&&(t.node.children[e]=n.node,t.node.childCount++,Uu(t))}/**
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
 */const uk=/[\[\].#$\/\u0000-\u001F\u007F]/,ck=/[\[\].#$\u0000-\u001F\u007F]/,ka=10*1024*1024,Nd=function(t){return typeof t=="string"&&t.length!==0&&!uk.test(t)},hv=function(t){return typeof t=="string"&&t.length!==0&&!ck.test(t)},dk=function(t){return t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),hv(t)},hk=function(t){return t===null||typeof t=="string"||typeof t=="number"&&!Jc(t)||t&&typeof t=="object"&&yt(t,".sv")},fv=function(t,e,n,r){r&&e===void 0||Al(xl(t,"value"),e,n)},Al=function(t,e,n){const r=n instanceof $?new bS(n,t):n;if(e===void 0)throw new Error(t+"contains undefined "+Tn(r));if(typeof e=="function")throw new Error(t+"contains a function "+Tn(r)+" with contents = "+e.toString());if(Jc(e))throw new Error(t+"contains "+e.toString()+" "+Tn(r));if(typeof e=="string"&&e.length>ka/3&&wl(e)>ka)throw new Error(t+"contains a string greater than "+ka+" utf8 bytes "+Tn(r)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,i=!1;if(we(e,(o,l)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(i=!0,!Nd(o)))throw new Error(t+" contains an invalid key ("+o+") "+Tn(r)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);TS(r,o),Al(t,l,r),RS(r)}),s&&i)throw new Error(t+' contains ".value" child '+Tn(r)+" in addition to actual children.")}},fk=function(t,e){let n,r;for(n=0;n<e.length;n++){r=e[n];const i=ti(r);for(let o=0;o<i.length;o++)if(!(i[o]===".priority"&&o===i.length-1)){if(!Nd(i[o]))throw new Error(t+"contains an invalid key ("+i[o]+") in path "+r.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(IS);let s=null;for(n=0;n<e.length;n++){if(r=e[n],s!==null&&qe(s,r))throw new Error(t+"contains a path "+s.toString()+" that is ancestor of another path "+r.toString());s=r}},pk=function(t,e,n,r){const s=xl(t,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const i=[];we(e,(o,l)=>{const a=new $(o);if(Al(s,l,re(n,a)),rd(a)===".priority"&&!hk(l))throw new Error(s+"contains an invalid value for '"+a.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");i.push(a)}),fk(s,i)},pv=function(t,e,n,r){if(!hv(n))throw new Error(xl(t,e)+'was an invalid path = "'+n+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},mk=function(t,e,n,r){n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),pv(t,e,n)},Id=function(t,e){if(M(e)===".info")throw new Error(t+" failed = Can't modify data under /.info/")},gk=function(t,e){const n=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Nd(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||n.length!==0&&!dk(n))throw new Error(xl(t,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class _k{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function Ol(t,e){let n=null;for(let r=0;r<e.length;r++){const s=e[r],i=s.getPath();n!==null&&!sd(i,n.path)&&(t.eventLists_.push(n),n=null),n===null&&(n={events:[],path:i}),n.events.push(s)}n&&t.eventLists_.push(n)}function mv(t,e,n){Ol(t,n),gv(t,r=>sd(r,e))}function ct(t,e,n){Ol(t,n),gv(t,r=>qe(r,e)||qe(e,r))}function gv(t,e){t.recursionDepth_++;let n=!0;for(let r=0;r<t.eventLists_.length;r++){const s=t.eventLists_[r];if(s){const i=s.path;e(i)?(vk(t.eventLists_[r]),t.eventLists_[r]=null):n=!1}}n&&(t.eventLists_=[]),t.recursionDepth_--}function vk(t){for(let e=0;e<t.events.length;e++){const n=t.events[e];if(n!==null){t.events[e]=null;const r=n.getEventRunner();Ts&&ve("event: "+n.toString()),Zr(r)}}}/**
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
 */const yk="repo_interrupt",xk=25;class wk{constructor(e,n,r,s){this.repoInfo_=e,this.forceRestClient_=n,this.authTokenProvider_=r,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new _k,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Ko(),this.transactionQueueTree_=new Cd,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function Ek(t,e,n){if(t.stats_=td(t.repoInfo_),t.forceRestClient_||JE())t.server_=new Go(t.repoInfo_,(r,s,i,o)=>{Zf(t,r,s,i,o)},t.authTokenProvider_,t.appCheckProvider_),setTimeout(()=>ep(t,!0),0);else{if(typeof n<"u"&&n!==null){if(typeof n!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{me(n)}catch(r){throw new Error("Invalid authOverride provided: "+r)}}t.persistentConnection_=new Rt(t.repoInfo_,e,(r,s,i,o)=>{Zf(t,r,s,i,o)},r=>{ep(t,r)},r=>{Sk(t,r)},t.authTokenProvider_,t.appCheckProvider_,n),t.server_=t.persistentConnection_}t.authTokenProvider_.addTokenChangeListener(r=>{t.server_.refreshAuthToken(r)}),t.appCheckProvider_.addTokenChangeListener(r=>{t.server_.refreshAppCheckToken(r.token)}),t.statsReporter_=rS(t.repoInfo_,()=>new nC(t.stats_,t.server_)),t.infoData_=new XS,t.infoSyncTree_=new Yf({startListening:(r,s,i,o)=>{let l=[];const a=t.infoData_.getNode(r._path);return a.isEmpty()||(l=Tl(t.infoSyncTree_,r._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),bd(t,"connected",!1),t.serverSyncTree_=new Yf({startListening:(r,s,i,o)=>(t.server_.listen(r,i,s,(l,a)=>{const c=o(l,a);ct(t.eventQueue_,r._path,c)}),[]),stopListening:(r,s)=>{t.server_.unlisten(r,s)}})}function _v(t){const n=t.infoData_.getNode(new $(".info/serverTimeOffset")).val()||0;return new Date().getTime()+n}function jl(t){return rk({timestamp:_v(t)})}function Zf(t,e,n,r,s){t.dataUpdateCount++;const i=new $(e);n=t.interceptServerDataCallback_?t.interceptServerDataCallback_(e,n):n;let o=[];if(s)if(r){const a=Do(n,c=>pe(c));o=JC(t.serverSyncTree_,i,a,s)}else{const a=pe(n);o=XC(t.serverSyncTree_,i,a,s)}else if(r){const a=Do(n,c=>pe(c));o=QC(t.serverSyncTree_,i,a)}else{const a=pe(n);o=Tl(t.serverSyncTree_,i,a)}let l=i;o.length>0&&(l=Hr(t,i)),ct(t.eventQueue_,l,o)}function ep(t,e){bd(t,"connected",e),e===!1&&Nk(t)}function Sk(t,e){we(e,(n,r)=>{bd(t,n,r)})}function bd(t,e,n){const r=new $("/.info/"+e),s=pe(n);t.infoData_.updateSnapshot(r,s);const i=Tl(t.infoSyncTree_,r,s);ct(t.eventQueue_,r,i)}function Td(t){return t.nextWriteId_++}function Ck(t,e,n,r,s){Dl(t,"set",{path:e.toString(),value:n,priority:r});const i=jl(t),o=pe(n,r),l=_d(t.serverSyncTree_,e),a=av(o,l,i),c=Td(t),h=rv(t.serverSyncTree_,e,a,c,!0);Ol(t.eventQueue_,h),t.server_.put(e.toString(),o.val(!0),(f,_)=>{const y=f==="ok";y||Te("set at "+e+" failed: "+f);const v=Jt(t.serverSyncTree_,c,!y);ct(t.eventQueue_,e,v),zu(t,s,f,_)});const d=Pd(t,e);Hr(t,d),ct(t.eventQueue_,d,[])}function kk(t,e,n,r){Dl(t,"update",{path:e.toString(),value:n});let s=!0;const i=jl(t),o={};if(we(n,(l,a)=>{s=!1,o[l]=lv(re(e,l),pe(a),t.serverSyncTree_,i)}),s)ve("update() called with empty data.  Don't do anything."),zu(t,r,"ok",void 0);else{const l=Td(t),a=KC(t.serverSyncTree_,e,o,l);Ol(t.eventQueue_,a),t.server_.merge(e.toString(),n,(c,h)=>{const d=c==="ok";d||Te("update at "+e+" failed: "+c);const f=Jt(t.serverSyncTree_,l,!d),_=f.length>0?Hr(t,e):e;ct(t.eventQueue_,_,f),zu(t,r,c,h)}),we(n,c=>{const h=Pd(t,re(e,c));Hr(t,h)}),ct(t.eventQueue_,e,[])}}function Nk(t){Dl(t,"onDisconnectEvents");const e=jl(t),n=Ko();Au(t.onDisconnect_,W(),(s,i)=>{const o=lv(s,i,t.serverSyncTree_,e);H_(n,s,o)});let r=[];Au(n,W(),(s,i)=>{r=r.concat(Tl(t.serverSyncTree_,s,i));const o=Pd(t,s);Hr(t,o)}),t.onDisconnect_=Ko(),ct(t.eventQueue_,W(),r)}function Ik(t,e,n){let r;M(e._path)===".info"?r=Xf(t.infoSyncTree_,e,n):r=Xf(t.serverSyncTree_,e,n),mv(t.eventQueue_,e._path,r)}function bk(t,e,n){let r;M(e._path)===".info"?r=Bu(t.infoSyncTree_,e,n):r=Bu(t.serverSyncTree_,e,n),mv(t.eventQueue_,e._path,r)}function Tk(t){t.persistentConnection_&&t.persistentConnection_.interrupt(yk)}function Dl(t,...e){let n="";t.persistentConnection_&&(n=t.persistentConnection_.id+":"),ve(n,...e)}function zu(t,e,n,r){e&&Zr(()=>{if(n==="ok")e(null);else{const s=(n||"error").toUpperCase();let i=s;r&&(i+=": "+r);const o=new Error(i);o.code=s,e(o)}})}function vv(t,e,n){return _d(t.serverSyncTree_,e,n)||R.EMPTY_NODE}function Rd(t,e=t.transactionQueueTree_){if(e||Ml(t,e),ts(e)){const n=xv(t,e);k(n.length>0,"Sending zero length transaction queue"),n.every(s=>s.status===0)&&Rk(t,Ei(e),n)}else cv(e)&&Pl(e,n=>{Rd(t,n)})}function Rk(t,e,n){const r=n.map(c=>c.currentWriteId),s=vv(t,e,r);let i=s;const o=s.hash();for(let c=0;c<n.length;c++){const h=n[c];k(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const d=De(e,h.path);i=i.updateChild(d,h.currentOutputSnapshotRaw)}const l=i.val(!0),a=e;t.server_.put(a.toString(),l,c=>{Dl(t,"transaction put response",{path:a.toString(),status:c});let h=[];if(c==="ok"){const d=[];for(let f=0;f<n.length;f++)n[f].status=2,h=h.concat(Jt(t.serverSyncTree_,n[f].currentWriteId)),n[f].onComplete&&d.push(()=>n[f].onComplete(null,!0,n[f].currentOutputSnapshotResolved)),n[f].unwatcher();Ml(t,kd(t.transactionQueueTree_,e)),Rd(t,t.transactionQueueTree_),ct(t.eventQueue_,e,h);for(let f=0;f<d.length;f++)Zr(d[f])}else{if(c==="datastale")for(let d=0;d<n.length;d++)n[d].status===3?n[d].status=4:n[d].status=0;else{Te("transaction at "+a.toString()+" failed: "+c);for(let d=0;d<n.length;d++)n[d].status=4,n[d].abortReason=c}Hr(t,e)}},o)}function Hr(t,e){const n=yv(t,e),r=Ei(n),s=xv(t,n);return Pk(t,s,r),r}function Pk(t,e,n){if(e.length===0)return;const r=[];let s=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=De(n,a.path);let h=!1,d;if(k(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)h=!0,d=a.abortReason,s=s.concat(Jt(t.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=xk)h=!0,d="maxretry",s=s.concat(Jt(t.serverSyncTree_,a.currentWriteId,!0));else{const f=vv(t,a.path,o);a.currentInputSnapshot=f;const _=e[l].update(f.val());if(_!==void 0){Al("transaction failed: Data returned ",_,a.path);let y=pe(_);typeof _=="object"&&_!=null&&yt(_,".priority")||(y=y.updatePriority(f.getPriority()));const w=a.currentWriteId,m=jl(t),p=av(y,f,m);a.currentOutputSnapshotRaw=y,a.currentOutputSnapshotResolved=p,a.currentWriteId=Td(t),o.splice(o.indexOf(w),1),s=s.concat(rv(t.serverSyncTree_,a.path,p,a.currentWriteId,a.applyLocally)),s=s.concat(Jt(t.serverSyncTree_,w,!0))}else h=!0,d="nodata",s=s.concat(Jt(t.serverSyncTree_,a.currentWriteId,!0))}ct(t.eventQueue_,n,s),s=[],h&&(e[l].status=2,function(f){setTimeout(f,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(d==="nodata"?r.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):r.push(()=>e[l].onComplete(new Error(d),!1,null))))}Ml(t,t.transactionQueueTree_);for(let l=0;l<r.length;l++)Zr(r[l]);Rd(t,t.transactionQueueTree_)}function yv(t,e){let n,r=t.transactionQueueTree_;for(n=M(e);n!==null&&ts(r)===void 0;)r=kd(r,n),e=K(e),n=M(e);return r}function xv(t,e){const n=[];return wv(t,e,n),n.sort((r,s)=>r.order-s.order),n}function wv(t,e,n){const r=ts(e);if(r)for(let s=0;s<r.length;s++)n.push(r[s]);Pl(e,s=>{wv(t,s,n)})}function Ml(t,e){const n=ts(e);if(n){let r=0;for(let s=0;s<n.length;s++)n[s].status!==2&&(n[r]=n[s],r++);n.length=r,uv(e,n.length>0?n:void 0)}Pl(e,r=>{Ml(t,r)})}function Pd(t,e){const n=Ei(yv(t,e)),r=kd(t.transactionQueueTree_,e);return lk(r,s=>{Na(t,s)}),Na(t,r),dv(r,s=>{Na(t,s)}),n}function Na(t,e){const n=ts(e);if(n){const r=[];let s=[],i=-1;for(let o=0;o<n.length;o++)n[o].status===3||(n[o].status===1?(k(i===o-1,"All SENT items should be at beginning of queue."),i=o,n[o].status=3,n[o].abortReason="set"):(k(n[o].status===0,"Unexpected transaction status in abort"),n[o].unwatcher(),s=s.concat(Jt(t.serverSyncTree_,n[o].currentWriteId,!0)),n[o].onComplete&&r.push(n[o].onComplete.bind(null,new Error("set"),!1,null))));i===-1?uv(e,void 0):n.length=i+1,ct(t.eventQueue_,Ei(e),s);for(let o=0;o<r.length;o++)Zr(r[o])}}/**
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
 */function Ak(t){let e="";const n=t.split("/");for(let r=0;r<n.length;r++)if(n[r].length>0){let s=n[r];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Ok(t){const e={};t.charAt(0)==="?"&&(t=t.substring(1));for(const n of t.split("&")){if(n.length===0)continue;const r=n.split("=");r.length===2?e[decodeURIComponent(r[0])]=decodeURIComponent(r[1]):Te(`Invalid query segment '${n}' in query '${t}'`)}return e}const tp=function(t,e){const n=jk(t),r=n.namespace;n.domain==="firebase.com"&&Lt(n.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!r||r==="undefined")&&n.domain!=="localhost"&&Lt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),n.secure||VE();const s=n.scheme==="ws"||n.scheme==="wss";return{repoInfo:new I_(n.host,n.secure,r,s,e,"",r!==n.subdomain),path:new $(n.pathString)}},jk=function(t){let e="",n="",r="",s="",i="",o=!0,l="https",a=443;if(typeof t=="string"){let c=t.indexOf("//");c>=0&&(l=t.substring(0,c-1),t=t.substring(c+2));let h=t.indexOf("/");h===-1&&(h=t.length);let d=t.indexOf("?");d===-1&&(d=t.length),e=t.substring(0,Math.min(h,d)),h<d&&(s=Ak(t.substring(h,d)));const f=Ok(t.substring(Math.min(t.length,d)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")n="localhost";else if(_.split(".").length<=2)n=_;else{const y=e.indexOf(".");r=e.substring(0,y).toLowerCase(),n=e.substring(y+1),i=r}"ns"in f&&(i=f.ns)}return{host:e,port:a,domain:n,subdomain:r,secure:o,scheme:l,pathString:s,namespace:i}};/**
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
 */const np="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Dk=function(){let t=0;const e=[];return function(n){const r=n===t;t=n;let s;const i=new Array(8);for(s=7;s>=0;s--)i[s]=np.charAt(n%64),n=Math.floor(n/64);k(n===0,"Cannot push at time == 0");let o=i.join("");if(r){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=np.charAt(e[s]);return k(o.length===20,"nextPushId: Length should be 20."),o}}();/**
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
 */class Mk{constructor(e,n,r,s){this.eventType=e,this.eventRegistration=n,this.snapshot=r,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+me(this.snapshot.exportVal())}}class Fk{constructor(e,n,r){this.eventRegistration=e,this.error=n,this.path=r}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class Lk{constructor(e,n){this.snapshotCallback=e,this.cancelCallback=n}onValue(e,n){this.snapshotCallback.call(null,e,n)}onCancel(e){return k(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class Ad{constructor(e,n,r,s){this._repo=e,this._path=n,this._queryParams=r,this._orderByCalled=s}get key(){return B(this._path)?null:rd(this._path)}get ref(){return new En(this._repo,this._path)}get _queryIdentifier(){const e=Uf(this._queryParams),n=Zc(e);return n==="{}"?"default":n}get _queryObject(){return Uf(this._queryParams)}isEqual(e){if(e=Ze(e),!(e instanceof Ad))return!1;const n=this._repo===e._repo,r=sd(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return n&&r&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+NS(this._path)}}class En extends Ad{constructor(e,n){super(e,n,new ad,!1)}get parent(){const e=M_(this._path);return e===null?null:new En(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class tl{constructor(e,n,r){this._node=e,this.ref=n,this._index=r}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const n=new $(e),r=oi(this.ref,e);return new tl(this._node.getChild(n),r,se)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(r,s)=>e(new tl(s,oi(this.ref,r),se)))}hasChild(e){const n=new $(e);return!this._node.getChild(n).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function gr(t,e){return t=Ze(t),t._checkNotDeleted("ref"),e!==void 0?oi(t._root,e):t._root}function oi(t,e){return t=Ze(t),M(t._path)===null?mk("child","path",e):pv("child","path",e),new En(t._repo,re(t._path,e))}function Bk(t,e){t=Ze(t),Id("push",t._path),fv("push",e,t._path,!0);const n=_v(t._repo),r=Dk(n),s=oi(t,r),i=oi(t,r);let o;return e!=null?o=nl(i,e).then(()=>i):o=Promise.resolve(i),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function Uk(t){return Id("remove",t._path),nl(t,null)}function nl(t,e){t=Ze(t),Id("set",t._path),fv("set",e,t._path,!1);const n=new pi;return Ck(t._repo,t._path,e,null,n.wrapCallback(()=>{})),n.promise}function zk(t,e){pk("update",e,t._path);const n=new pi;return kk(t._repo,t._path,e,n.wrapCallback(()=>{})),n.promise}class Od{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,n){const r=n._queryParams.getIndex();return new Mk("value",this,new tl(e.snapshotNode,new En(n._repo,n._path),r))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,n){return this.callbackContext.hasCancelCallback?new Fk(this,e,n):null}matches(e){return e instanceof Od?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}function Wk(t,e,n,r,s){const i=new Lk(n,void 0),o=new Od(i);return Ik(t._repo,t,o),()=>bk(t._repo,t,o)}function Ev(t,e,n,r){return Wk(t,"value",e)}LC(En);HC(En);/**
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
 */const Vk="FIREBASE_DATABASE_EMULATOR_HOST",Wu={};let Hk=!1;function $k(t,e,n,r){t.repoInfo_=new I_(`${e}:${n}`,!1,t.repoInfo_.namespace,t.repoInfo_.webSocketOnly,t.repoInfo_.nodeAdmin,t.repoInfo_.persistenceKey,t.repoInfo_.includeNamespaceInQueryParams,!0),r&&(t.authTokenProvider_=r)}function Gk(t,e,n,r,s){let i=r||t.options.databaseURL;i===void 0&&(t.options.projectId||Lt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ve("Using default host for project ",t.options.projectId),i=`${t.options.projectId}-default-rtdb.firebaseio.com`);let o=tp(i,s),l=o.repoInfo,a;typeof process<"u"&&Ef&&(a=Ef[Vk]),a?(i=`http://${a}?ns=${l.namespace}`,o=tp(i,s),l=o.repoInfo):o.repoInfo.secure;const c=new eS(t.name,t.options,e);gk("Invalid Firebase Database URL",o),B(o.path)||Lt("Database URL must point to the root of a Firebase Database (not including a child path).");const h=Qk(l,t,c,new ZE(t.name,n));return new qk(h,t)}function Kk(t,e){const n=Wu[e];(!n||n[t.key]!==t)&&Lt(`Database ${e}(${t.repoInfo_}) has already been deleted.`),Tk(t),delete n[t.key]}function Qk(t,e,n,r){let s=Wu[e.name];s||(s={},Wu[e.name]=s);let i=s[t.toURLString()];return i&&Lt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),i=new wk(t,Hk,n,r),s[t.toURLString()]=i,i}class qk{constructor(e,n){this._repoInternal=e,this.app=n,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(Ek(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new En(this._repo,W())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Kk(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&Lt("Cannot call "+e+" on a deleted database.")}}function Yk(t=Pg(),e){const n=Vc(t,"database").getImmediate({identifier:e});if(!n._instanceStarted){const r=h1("database");r&&Xk(n,...r)}return n}function Xk(t,e,n,r={}){t=Ze(t),t._checkNotDeleted("useEmulator"),t._instanceStarted&&Lt("Cannot call useEmulator() after instance has already been initialized.");const s=t._repoInternal;let i;if(s.repoInfo_.nodeAdmin)r.mockUserToken&&Lt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),i=new lo(lo.OWNER);else if(r.mockUserToken){const o=typeof r.mockUserToken=="string"?r.mockUserToken:f1(r.mockUserToken,t.app.options.projectId);i=new lo(o)}$k(s,e,n,i)}/**
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
 */function Jk(t){FE(Xr),Br(new Vn("database",(e,{instanceIdentifier:n})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),i=e.getProvider("app-check-internal");return Gk(r,s,i,n)},"PUBLIC").setMultipleInstances(!0)),cn(Sf,Cf,t),cn(Sf,Cf,"esm2017")}/**
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
 */const Zk={".sv":"timestamp"};function e2(){return Zk}Rt.prototype.simpleListen=function(t,e){this.sendRequest("q",{p:t},e)};Rt.prototype.echo=function(t,e){this.sendRequest("echo",{d:t},e)};Jk();const t2={apiKey:"AIzaSyD4E1mAaY4HkId_h41YQz_kijN4R_h3In8",authDomain:"pestour-965ff.firebaseapp.com",databaseURL:void 0,projectId:"pestour-965ff",storageBucket:"pestour-965ff.firebasestorage.app",messagingSenderId:"518176676119",appId:"1:518176676119:web:a21a447983ba8deb297f52"},Sv=Rg(t2),n2=DE(Sv),_r=Yk(Sv),r2=async()=>{try{return await yw(n2),!0}catch(t){return console.error("Firebase Auth Error: Please enable Anonymous Sign-in in Firebase Console!",t),!1}},s2={name:"PALLET EFOOTBALL",season:"Summer 2026",tagline:"Legends Start Here",registrationOpen:!0},i2=[{group:"A",id:"A1",name:"Dra-Gon"},{group:"A",id:"A2",name:"Jak-Kroval"},{group:"A",id:"A3",name:"Max-88"},{group:"A",id:"A4",name:"Petter-027"},{group:"B",id:"B1",name:"MengZzz"},{group:"B",id:"B2",name:"Reach OMG"},{group:"B",id:"B3",name:"Si Dav"},{group:"B",id:"B4",name:"SO-R3spec1"},{group:"C",id:"C1",name:"1AUTO1"},{group:"C",id:"C2",name:"Glanelalala"},{group:"C",id:"C3",name:"Win Me Lbey"},{group:"C",id:"C4",name:"K-Vinn"}],o2=[{id:"M-A1",groupId:"A",p1Id:"A1",p2Id:"A2",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-A2",groupId:"A",p1Id:"A3",p2Id:"A4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-A3",groupId:"A",p1Id:"A1",p2Id:"A3",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-A4",groupId:"A",p1Id:"A2",p2Id:"A4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-A5",groupId:"A",p1Id:"A1",p2Id:"A4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-A6",groupId:"A",p1Id:"A2",p2Id:"A3",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-B1",groupId:"B",p1Id:"B1",p2Id:"B2",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-B2",groupId:"B",p1Id:"B3",p2Id:"B4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-B3",groupId:"B",p1Id:"B1",p2Id:"B3",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-B4",groupId:"B",p1Id:"B2",p2Id:"B4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-B5",groupId:"B",p1Id:"B1",p2Id:"B4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-B6",groupId:"B",p1Id:"B2",p2Id:"B3",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-C1",groupId:"C",p1Id:"C1",p2Id:"C2",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-C2",groupId:"C",p1Id:"C3",p2Id:"C4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-C3",groupId:"C",p1Id:"C1",p2Id:"C3",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-C4",groupId:"C",p1Id:"C2",p2Id:"C4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-C5",groupId:"C",p1Id:"C1",p2Id:"C4",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}},{id:"M-C6",groupId:"C",p1Id:"C2",p2Id:"C3",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}}],Vu={settings:s2,players:i2,matches:o2,bracket:[]},Fl=t=>{let e=0,n=0,r=0,s=0;["g1","g2","g3"].forEach(c=>{t[c]&&t[c].p1!==null&&t[c].p2!==null&&(r+=Number(t[c].p1),s+=Number(t[c].p2),Number(t[c].p1)>Number(t[c].p2)&&e++,Number(t[c].p2)>Number(t[c].p1)&&n++)});const o=e===2||n===2;let l=0,a=0;return o&&(e===2&&n===0&&(l=3,a=0),e===2&&n===1&&(l=2,a=1),n===2&&e===0&&(a=3,l=0),n===2&&e===1&&(a=2,l=1)),{p1Wins:e,p2Wins:n,p1Goals:r,p2Goals:s,isFinished:o,p1Pts:l,p2Pts:a}},l2=(t,e)=>{let n={};t.forEach(l=>{n[l.id]={...l,played:0,w:0,l:0,gf:0,ga:0,gd:0,pts:0}}),e.forEach(l=>{if(l.played){const a=Fl(l);a.isFinished&&(n[l.p1Id].played++,n[l.p2Id].played++,a.p1Wins>a.p2Wins?(n[l.p1Id].w++,n[l.p2Id].l++):(n[l.p2Id].w++,n[l.p1Id].l++),n[l.p1Id].gf+=a.p1Goals,n[l.p1Id].ga+=a.p2Goals,n[l.p1Id].gd=n[l.p1Id].gf-n[l.p1Id].ga,n[l.p1Id].pts+=a.p1Pts,n[l.p2Id].gf+=a.p2Goals,n[l.p2Id].ga+=a.p1Goals,n[l.p2Id].gd=n[l.p2Id].gf-n[l.p2Id].ga,n[l.p2Id].pts+=a.p2Pts)}});const r=(l,a)=>a.pts!==l.pts?a.pts-l.pts:a.gd!==l.gd?a.gd-l.gd:a.gf!==l.gf?a.gf-l.gf:l.name.localeCompare(a.name),s={A:[],B:[],C:[]};Object.values(n).forEach(l=>s[l.group].push(l)),s.A.sort(r),s.B.sort(r),s.C.sort(r);const i=[s.A[2],s.B[2],s.C[2]].filter(Boolean).sort(r);let o=[];return["A","B","C"].forEach(l=>{s[l][0]&&o.push({...s[l][0],seedType:`${l}1`}),s[l][1]&&o.push({...s[l][1],seedType:`${l}2`})}),i[0]&&o.push({...i[0],seedType:"Best3"}),i[1]&&o.push({...i[1],seedType:"Best3"}),o.sort(r),{groups:s,thirds:i,qualified:o}},tr=t=>{if(!t||!t.played)return null;const e=Fl(t);return e.p1Wins>e.p2Wins?{id:t.p1Id,name:t.p1Name}:e.p2Wins>e.p1Wins?{id:t.p2Id,name:t.p2Name}:null},jn=t=>{if(!t||t.length===0)return[];let e=[...t];e.length===4&&(e.push({id:"SF-1",round:"SF",p1Id:null,p1Name:"TBD (QF1)",p2Id:null,p2Name:"TBD (QF2)",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}}),e.push({id:"SF-2",round:"SF",p1Id:null,p1Name:"TBD (QF3)",p2Id:null,p2Name:"TBD (QF4)",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}}),e.push({id:"F-1",round:"F",p1Id:null,p1Name:"TBD (SF1)",p2Id:null,p2Name:"TBD (SF2)",played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}}));const n=h=>e.find(d=>d.id===h),r=(h,d)=>{const f=e.findIndex(_=>_.id===h);f!==-1&&(e[f]={...e[f],...d})},s=tr(n("QF-1")),i=tr(n("QF-2")),o=tr(n("QF-3")),l=tr(n("QF-4"));r("SF-1",{p1Id:s?s.id:null,p1Name:s?s.name:"TBD (QF1)",p2Id:i?i.id:null,p2Name:i?i.name:"TBD (QF2)"}),r("SF-2",{p1Id:o?o.id:null,p1Name:o?o.name:"TBD (QF3)",p2Id:l?l.id:null,p2Name:l?l.name:"TBD (QF4)"});const a=tr(n("SF-1")),c=tr(n("SF-2"));return r("F-1",{p1Id:a?a.id:null,p1Name:a?a.name:"TBD (SF1)",p2Id:c?c.id:null,p2Name:c?c.name:"TBD (SF2)"}),e};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var a2={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const u2=t=>t.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),X=(t,e)=>{const n=j.forwardRef(({color:r="currentColor",size:s=24,strokeWidth:i=2,absoluteStrokeWidth:o,className:l="",children:a,...c},h)=>j.createElement("svg",{ref:h,...a2,width:s,height:s,stroke:r,strokeWidth:o?Number(i)*24/Number(s):i,className:["lucide",`lucide-${u2(t)}`,l].join(" "),...c},[...e.map(([d,f])=>j.createElement(d,f)),...Array.isArray(a)?a:[a]]));return n.displayName=`${t}`,n};/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const jd=X("BarChart3",[["path",{d:"M3 3v18h18",key:"1s2lah"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Cv=X("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $r=X("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c2=X("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const d2=X("ChevronDown",[["path",{d:"m6 9 6 6 6-6",key:"qrunsl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h2=X("ChevronUp",[["path",{d:"m18 15-6-6-6 6",key:"153udz"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Dd=X("CircleDashed",[["path",{d:"M10.1 2.182a10 10 0 0 1 3.8 0",key:"5ilxe3"}],["path",{d:"M13.9 21.818a10 10 0 0 1-3.8 0",key:"11zvb9"}],["path",{d:"M17.609 3.721a10 10 0 0 1 2.69 2.7",key:"1iw5b2"}],["path",{d:"M2.182 13.9a10 10 0 0 1 0-3.8",key:"c0bmvh"}],["path",{d:"M20.279 17.609a10 10 0 0 1-2.7 2.69",key:"1ruxm7"}],["path",{d:"M21.818 10.1a10 10 0 0 1 0 3.8",key:"qkgqxc"}],["path",{d:"M3.721 6.391a10 10 0 0 1 2.7-2.69",key:"1mcia2"}],["path",{d:"M6.391 20.279a10 10 0 0 1-2.69-2.7",key:"1fvljs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const f2=X("Flame",[["path",{d:"M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z",key:"96xj49"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const li=X("Gamepad2",[["line",{x1:"6",x2:"10",y1:"11",y2:"11",key:"1gktln"}],["line",{x1:"8",x2:"8",y1:"9",y2:"13",key:"qnk9ow"}],["line",{x1:"15",x2:"15.01",y1:"12",y2:"12",key:"krot7o"}],["line",{x1:"18",x2:"18.01",y1:"10",y2:"10",key:"1lcuu1"}],["path",{d:"M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z",key:"mfqc10"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p2=X("Home",[["path",{d:"m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",key:"y5dka4"}],["polyline",{points:"9 22 9 12 15 12 15 22",key:"e2us08"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const kv=X("Info",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M12 16v-4",key:"1dtifu"}],["path",{d:"M12 8h.01",key:"e9boi3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Nv=X("Lock",[["rect",{width:"18",height:"11",x:"3",y:"11",rx:"2",ry:"2",key:"1w4ew1"}],["path",{d:"M7 11V7a5 5 0 0 1 10 0v4",key:"fwvmzm"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m2=X("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g2=X("Moon",[["path",{d:"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",key:"a7tn18"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _2=X("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Iv=X("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rp=X("ShieldAlert",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"M12 8v4",key:"1got3b"}],["path",{d:"M12 16h.01",key:"1drbdi"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Md=X("ShieldCheck",[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v2=X("Sparkles",[["path",{d:"m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z",key:"17u4zn"}],["path",{d:"M5 3v4",key:"bklmnn"}],["path",{d:"M19 17v4",key:"iiml17"}],["path",{d:"M3 5h4",key:"nem4j1"}],["path",{d:"M17 19h4",key:"lbex7p"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y2=X("Sun",[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x2=X("Trash2",[["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6",key:"4alrt4"}],["path",{d:"M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2",key:"v07s0e"}],["line",{x1:"10",x2:"10",y1:"11",y2:"17",key:"1uufr5"}],["line",{x1:"14",x2:"14",y1:"11",y2:"17",key:"xtxkd"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Fn=X("Trophy",[["path",{d:"M6 9H4.5a2.5 2.5 0 0 1 0-5H6",key:"17hqa7"}],["path",{d:"M18 9h1.5a2.5 2.5 0 0 0 0-5H18",key:"lmptdp"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22",key:"1nw9bq"}],["path",{d:"M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22",key:"1np0yb"}],["path",{d:"M18 2H6v7a6 6 0 0 0 12 0V2Z",key:"u46fv3"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const rl=X("UserPlus",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["line",{x1:"19",x2:"19",y1:"8",y2:"14",key:"1bvyxn"}],["line",{x1:"22",x2:"16",y1:"11",y2:"11",key:"1shjgl"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const w2=X("Users",[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["path",{d:"M16 3.13a4 4 0 0 1 0 7.75",key:"1da9ce"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const bv=X("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]),Fd="/PESTOUR/assets/pallet-D_LKp9NR.jpg",E2=Object.freeze(Object.defineProperty({__proto__:null,default:Fd},Symbol.toStringTag,{value:"Module"}));function S2({currentPage:t,setCurrentPage:e,isAdmin:n,isLightMode:r,setIsLightMode:s}){const[i,o]=j.useState(!0);j.useEffect(()=>{let a=window.scrollY;const c=()=>{const h=window.scrollY;h>a&&h>60?o(!1):o(!0),a=h};return window.addEventListener("scroll",c,{passive:!0}),()=>window.removeEventListener("scroll",c)},[]);const l=[{id:"home",icon:p2,label:"Home"},{id:"register",icon:rl,label:"Register"},{id:"standings",icon:jd,label:"Standings"},{id:"matches",icon:li,label:"Schedule"},{id:"rules",icon:Cv,label:"Rules"}];return n&&l.push({id:"knockout",icon:Fn,label:"Knockout"}),l.push({id:"admin",icon:Iv,label:"Admin"}),u.jsx("nav",{className:`sticky top-0 z-50 bg-[#0a0b10]/95 backdrop-blur-md border-b border-slate-800 transition-transform duration-300 ${i?"translate-y-0":"-translate-y-full"}`,children:u.jsxs("div",{className:"max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between",children:[u.jsxs("div",{className:"flex items-center gap-3 cursor-pointer",onClick:()=>e("home"),children:[u.jsx("div",{className:"w-10 h-10 flex-shrink-0",children:u.jsx("img",{src:Fd,alt:"Pallet Logo",className:"w-full h-full object-contain drop-shadow-[0_0_10px_rgba(71,112,255,0.4)]"})}),u.jsx("span",{className:"font-black text-2xl tracking-tighter text-[#A1B1DA] hidden sm:block font-sans",style:{textShadow:"0 0 10px rgba(161,177,218,0.3)"},children:"PES TOUR"})]}),u.jsx("div",{className:"flex space-x-1 overflow-x-auto no-scrollbar ml-auto mr-8",children:l.map(a=>{const c=t===a.id;return u.jsxs("button",{onClick:()=>e(a.id),className:`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-bold tracking-wide ${c?"bg-[#18233C] text-[#6384FF] shadow-[inset_0_1px_rgba(100,130,255,0.2)]":"text-[#8B9BB4] hover:text-[#C5D3EB] hover:bg-[#151D2E]"}`,children:[u.jsx(a.icon,{className:"w-4 h-4"}),u.jsx("span",{className:"hidden md:inline",children:a.label})]},a.id)})}),u.jsxs("div",{className:"flex items-center gap-4",children:[n&&u.jsxs("span",{className:"flex items-center gap-1 text-[#C084FC] bg-[#C084FC]/10 px-2.5 py-1 rounded-md border border-[#C084FC]/20 text-xs font-bold",children:[u.jsx(Md,{className:"w-3.5 h-3.5"})," ",u.jsx("span",{className:"hidden sm:inline",children:"Admin"})]}),u.jsx("button",{onClick:()=>s(a=>!a),className:`transition-colors p-2 rounded-lg ${r?"text-amber-500 bg-amber-500/10 hover:bg-amber-500/20":"text-[#8B9BB4] hover:text-white hover:bg-[#1E2738]"}`,children:r?u.jsx(g2,{className:"w-5 h-5"}):u.jsx(y2,{className:"w-5 h-5"})})]})]})})}function C2({data:t,setCurrentPage:e}){const n=t.matches.filter(h=>h.played).length,r=t.matches.length,s=(t.bracket||[]).filter(h=>h.played).length,i=7,o=n+s,l=r+i,a=l===0?0:Math.round(o/l*100),c=l-o;return u.jsxs("div",{className:"space-y-6 animate-in fade-in duration-500 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-12",children:[u.jsxs("div",{className:"relative overflow-hidden rounded-[32px] bg-[#0A0D14] border border-[#1E2738]/60 py-16 px-8 sm:px-16 text-center shadow-[0_0_50px_rgba(0,0,0,0.4)] flex flex-col items-center",children:[u.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-[#6384FF] opacity-[0.04] blur-[150px] pointer-events-none rounded-full"}),u.jsx("div",{className:"absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-[#C084FC] opacity-[0.03] blur-[100px] pointer-events-none rounded-full"}),u.jsxs("div",{className:"relative z-10 flex flex-col items-center w-full",children:[u.jsxs("div",{className:"mb-10 px-4 py-1.5 rounded-full bg-[#131C32] border border-[#2D3A5D]/50 flex items-center gap-2 shadow-inner",children:[u.jsx("div",{className:"w-1.5 h-1.5 rounded-full bg-[#60A5FA] shadow-[0_0_8px_#60A5FA]"}),u.jsx("span",{className:"text-[11px] font-black tracking-widest uppercase text-[#8B9BB4]",children:t.settings.season})]}),u.jsx("div",{className:"mb-10 inline-block overflow-hidden shadow-[0_0_40px_rgba(253,224,71,0.05)] border-2 border-[#FDE047]/10 rounded-[20px] bg-[#111827]",children:u.jsx("img",{src:Fd,alt:"Pallet Logo",className:"w-[300px] h-auto object-cover block"})}),u.jsx("h1",{className:"text-4xl sm:text-6xl md:text-[64px] font-black tracking-tighter mb-4 text-[#A5B4FC] drop-shadow-md uppercase w-full",children:t.settings.name}),u.jsx("p",{className:"text-[#8B9BB4] text-lg sm:text-xl font-medium mb-12 tracking-wide w-full max-w-lg",children:t.settings.tagline}),u.jsxs("div",{className:"flex flex-col sm:flex-row items-center gap-4 w-full justify-center max-w-[640px] mx-auto",children:[u.jsxs("button",{onClick:()=>e("register"),className:"w-full sm:w-1/3 flex items-center justify-center gap-2 py-4 px-6 rounded-[20px] bg-gradient-to-r from-[#F59E0B] to-[#D97706] hover:from-[#FBBF24] hover:to-[#B45309] text-white font-black tracking-wide transition-all shadow-[0_0_20px_rgba(245,158,11,0.25)] border border-[#F59E0B]/30 text-sm",children:[u.jsx(rl,{className:"w-4 h-4"})," Register"]}),u.jsxs("button",{onClick:()=>e("standings"),className:"w-full sm:w-1/3 flex items-center justify-center gap-2 py-4 px-6 rounded-[20px] bg-gradient-to-r from-[#8B78FF] to-[#6384FF] hover:from-[#7863FF] hover:to-[#4A6BFF] text-white font-black tracking-wide transition-all shadow-[0_0_20px_rgba(99,132,255,0.25)] border border-[#8B78FF]/30 text-sm",children:[u.jsx(jd,{className:"w-4 h-4"})," Standings"]}),u.jsxs("button",{onClick:()=>e("matches"),className:"w-full sm:w-1/3 flex items-center justify-center gap-2 py-4 px-6 rounded-[20px] bg-[#131A2B] hover:bg-[#1E2738] border border-[#222B3D] text-[#E2E8F0] font-black tracking-wide transition-all shadow-md text-sm",children:[u.jsx(li,{className:"w-4 h-4"})," Schedule"]})]})]})]}),u.jsxs("div",{className:"bg-[#0A0D14] rounded-[24px] border border-[#1E2738]/60 p-8 sm:p-10 shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden flex flex-col justify-center",children:[u.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-[#38BDF8] opacity-[0.02] blur-[80px] pointer-events-none rounded-full"}),u.jsxs("div",{className:"flex justify-between items-center mb-6 relative z-10",children:[u.jsxs("div",{className:"flex items-center gap-3 mt-1",children:[u.jsx(Fn,{className:"w-6 h-6 text-[#F59E0B] drop-shadow-[0_0_10px_rgba(245,158,11,0.5)]"}),u.jsx("h2",{className:"text-[#F8FAFC] font-black tracking-wide text-lg sm:text-xl",children:"Tournament Progress"})]}),u.jsxs("div",{className:"flex items-center gap-3",children:[u.jsxs("div",{className:"hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20",children:[u.jsx("div",{className:"w-2 h-2 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_8px_#10B981]"}),u.jsx("span",{className:"text-[10px] font-black text-[#10B981] tracking-widest uppercase mt-0.5",children:"LIVE SYNC"})]}),u.jsxs("div",{className:"px-3.5 py-1.5 rounded-full bg-[#131C32] border border-[#2D3A5D]/50 text-[10px] font-black text-[#8B78FF] tracking-widest uppercase mt-0.5",children:[a,"% Complete"]})]})]}),u.jsxs("div",{className:"relative z-10",children:[u.jsx("div",{className:"w-full h-3 md:h-3.5 bg-[#131A2B] rounded-full overflow-hidden border border-[#1E2738] shadow-inner mb-4",children:u.jsx("div",{className:"h-full bg-gradient-to-r from-[#2DD4BF] via-[#38BDF8] to-[#93A5FF] rounded-full transition-all duration-1000 ease-out shadow-[0_0_20px_rgba(56,189,248,0.4)]",style:{width:`${a}%`}})}),u.jsxs("div",{className:"flex justify-between items-center px-1",children:[u.jsxs("span",{className:"text-[#8B9BB4] text-xs font-bold",children:[o," of ",l," matches played"]}),u.jsxs("span",{className:"text-[#475569] text-xs font-medium",children:[c," remaining"]})]})]})]})]})}function Rr({game:t,label:e,match:n,p1Name:r,p2Name:s,onChange:i,isAdmin:o}){const l=n[t].p1,a=n[t].p2,c=l!==null&&a!==null,h=c&&l>a,d=c&&a>l;return u.jsxs("div",{className:"flex items-center justify-between text-sm bg-[#0a0b10] rounded-xl p-3 border border-[#1E2738] shadow-inner transition-colors hover:border-[#334155]/50",children:[u.jsx("div",{className:`flex-1 text-right pr-4 font-black tracking-wide truncate ${h?"text-[#10B981]":d?"text-[#64748B]":"text-[#E2E8F0]"}`,children:r}),u.jsxs("div",{className:"flex items-center gap-3",children:[u.jsx(sp,{val:l,onChange:f=>i(n.id,t,"p1",f),disabled:!o}),u.jsx("span",{className:"text-[#64748B] text-[10px] font-black uppercase tracking-widest bg-[#131722] px-2 py-1 rounded-md border border-[#222B3D]",children:e}),u.jsx(sp,{val:a,onChange:f=>i(n.id,t,"p2",f),disabled:!o})]}),u.jsx("div",{className:`flex-1 pl-4 font-black tracking-wide truncate ${d?"text-[#10B981]":h?"text-[#64748B]":"text-[#E2E8F0]"}`,children:s})]})}function sp({val:t,onChange:e,disabled:n}){return n?u.jsx("div",{className:`w-9 h-9 flex items-center justify-center rounded-lg font-black text-lg ${t!==null?"bg-[#1E2738] text-white border border-[#334155] shadow-md":"bg-transparent text-[#475569] border border-dashed border-[#334155]"}`,children:t!==null?t:"-"}):u.jsx("input",{type:"number",min:"0",value:t===null?"":t,onChange:r=>e(r.target.value),className:"w-10 h-10 text-center bg-[#131722] border border-[#334155] text-white font-black text-lg focus:border-[#4770FF] focus:ring-2 focus:ring-[#4770FF]/50 outline-none hide-arrows transition-all rounded-lg shadow-inner"})}const k2="/PESTOUR/assets/1AUTO1-DvK8ZO3a.png",N2=Object.freeze(Object.defineProperty({__proto__:null,default:k2},Symbol.toStringTag,{value:"Module"})),I2="/PESTOUR/assets/Dra-Gon-CUrHFvIX.png",b2=Object.freeze(Object.defineProperty({__proto__:null,default:I2},Symbol.toStringTag,{value:"Module"})),T2="/PESTOUR/assets/Glanelalala-BfjOw5VL.png",R2=Object.freeze(Object.defineProperty({__proto__:null,default:T2},Symbol.toStringTag,{value:"Module"})),P2="/PESTOUR/assets/Jak-Kroval-BZxbAbpI.png",A2=Object.freeze(Object.defineProperty({__proto__:null,default:P2},Symbol.toStringTag,{value:"Module"})),O2="/PESTOUR/assets/K-Vinn-BuM-8vVe.png",j2=Object.freeze(Object.defineProperty({__proto__:null,default:O2},Symbol.toStringTag,{value:"Module"})),D2="/PESTOUR/assets/Max-88-zK7mCRl6.png",M2=Object.freeze(Object.defineProperty({__proto__:null,default:D2},Symbol.toStringTag,{value:"Module"})),F2="/PESTOUR/assets/MengZzz-CRiHD205.png",L2=Object.freeze(Object.defineProperty({__proto__:null,default:F2},Symbol.toStringTag,{value:"Module"})),B2="/PESTOUR/assets/Petter-027-BOdQbbdx.png",U2=Object.freeze(Object.defineProperty({__proto__:null,default:B2},Symbol.toStringTag,{value:"Module"})),z2="/PESTOUR/assets/Reach%20OMG-DkAsUodS.png",W2=Object.freeze(Object.defineProperty({__proto__:null,default:z2},Symbol.toStringTag,{value:"Module"})),V2="/PESTOUR/assets/SO-R3spec1-t6QiRiOJ.png",H2=Object.freeze(Object.defineProperty({__proto__:null,default:V2},Symbol.toStringTag,{value:"Module"})),$2="/PESTOUR/assets/Si%20Dav-BaplQlyX.png",G2=Object.freeze(Object.defineProperty({__proto__:null,default:$2},Symbol.toStringTag,{value:"Module"})),K2="/PESTOUR/assets/Win%20Me%20Lbey-PZ2I4VLO.png",Q2=Object.freeze(Object.defineProperty({__proto__:null,default:K2},Symbol.toStringTag,{value:"Module"})),ip=Object.assign({"../assets/1AUTO1.png":N2,"../assets/Dra-Gon.png":b2,"../assets/Glanelalala.png":R2,"../assets/Jak-Kroval.png":A2,"../assets/K-Vinn.png":j2,"../assets/Max-88.png":M2,"../assets/MengZzz.png":L2,"../assets/Petter-027.png":U2,"../assets/Reach OMG.png":W2,"../assets/SO-R3spec1.png":H2,"../assets/Si Dav.png":G2,"../assets/Win Me Lbey.png":Q2,"../assets/pallet.jpg":E2}),q2=t=>{if(!t)return null;const e=s=>s.toLowerCase().replace(/[^a-z0-9]/g,"");let n=e(t);const r={sor3spac1:"sor3spec1"};r[n]&&(n=r[n]);for(const s in ip){const i=s.split("/").pop().replace(/\.[^/.]+$/,"");if(i==="pallet")continue;const o=e(i);if(o===n||o.includes(n)||n.includes(o))return ip[s].default}return null},op=["bg-[#ef4444]","bg-[#3b82f6]","bg-[#10b981]","bg-[#f59e0b]","bg-[#8b5cf6]","bg-[#ec4899]","bg-[#14b8a6]","bg-[#f97316]"],Y2=t=>{if(!t||t.startsWith("TBD"))return"bg-[#334155]";let e=0;for(let n=0;n<t.length;n++)e=t.charCodeAt(n)+((e<<5)-e);return op[Math.abs(e)%op.length]};function ai({name:t,className:e="w-8 h-8 text-xs"}){const n=q2(t);if(n)return u.jsx("div",{className:`flex-shrink-0 flex items-center justify-center ${e.replace(/rounded-\w+/,"").replace(/shadow-\w+/,"").replace(/border\b/,"")}`,children:u.jsx("img",{src:n,alt:t||"Player avatar",className:"w-full h-full object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"})});const r=t&&!t.startsWith("TBD")?t.substring(0,2).toUpperCase():"?",s=Y2(t);return u.jsx("div",{className:`rounded-full ${s} flex-shrink-0 flex items-center justify-center font-black text-white shadow-md border border-[#ffffff10] ${e}`,children:r})}function pt({match:t,title:e,isAdmin:n,togglePlayed:r,handleScoreChange:s,hideGames:i=!1}){const o=Fl(t),l=t.g1||{},a=t.g2||{},c=t.g3||{},h=l.p1!==void 0&&l.p1!==null&&l.p2!==void 0&&l.p2!==null,d=a.p1!==void 0&&a.p1!==null&&a.p2!==void 0&&a.p2!==null;let f=!1;if(h&&d){let w=(l.p1>l.p2?1:0)+(a.p1>a.p2?1:0),m=(l.p2>l.p1?1:0)+(a.p2>a.p1?1:0);w===1&&m===1&&(f=!0)}const _=t.p1Id===null||t.p2Id===null;let y="from-[#C084FC] to-[#8B5CF6]",v="text-[#C084FC]";return t.id.startsWith("SF")?(y="from-[#F97316] to-[#F59E0B]",v="text-[#F97316]"):t.id.startsWith("F")&&(y="from-[#FACC15] to-[#F59E0B]",v="text-[#FACC15]"),u.jsxs("div",{className:`relative bg-[#131722] border ${_?"border-[#1E2738] opacity-70":"border-[#222B3D] hover:border-[#334155]"} rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group`,children:[u.jsx("div",{className:`absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b ${y} shadow-[0_0_10px_currentColor]`}),u.jsxs("div",{className:"p-5 pl-7",children:[u.jsxs("div",{className:"flex justify-between items-center mb-5 pb-3 border-b border-[#1E2738]",children:[u.jsx("span",{className:`text-[10px] font-black uppercase tracking-[0.2em] ${v}`,children:e}),u.jsxs("div",{className:"flex items-center gap-4",children:[u.jsxs("div",{className:"text-xl font-black tracking-widest text-white drop-shadow-md",children:[o.p1Wins," ",u.jsx("span",{className:"text-[#64748B] mx-1",children:"-"})," ",o.p2Wins]}),n&&!_&&r&&u.jsx("button",{onClick:()=>r(t.id),className:`p-1.5 rounded-lg border transition-all ${t.played?"bg-[#10B981]/20 border-[#10B981]/50 text-[#10B981] shadow-[0_0_10px_rgba(16,185,129,0.2)]":"bg-[#1E2738] border-[#334155] text-[#94A3B8] hover:bg-[#334155] hover:text-white"}`,children:t.played?u.jsx($r,{className:"w-4 h-4"}):u.jsx(Dd,{className:"w-4 h-4"})}),!n&&t.played&&!_&&u.jsxs("span",{className:"text-[9px] text-[#10B981] font-black tracking-widest uppercase border border-[#10B981]/30 bg-[#10B981]/10 px-2.5 py-1.5 rounded flex items-center gap-1 shadow-[0_0_12px_rgba(16,185,129,0.15)]",children:[u.jsx($r,{className:"w-3 h-3"})," Done"]})]})]}),u.jsxs("div",{className:"space-y-3",children:[u.jsxs("div",{className:"flex justify-between items-center px-1 mb-3",children:[u.jsxs("div",{className:"flex items-center gap-2 w-2/5",children:[u.jsx(ai,{name:t.p1Name,className:"w-7 h-7 text-[10px] rounded-md"}),u.jsx("span",{className:"font-bold text-sm text-[#E2E8F0] truncate",title:t.p1Name,children:t.p1Name||"TBD"})]}),u.jsx("span",{className:"text-[10px] font-black tracking-widest text-[#64748B] uppercase",children:"VS"}),u.jsxs("div",{className:"flex items-center justify-end gap-2 w-2/5",children:[u.jsx("span",{className:"font-bold text-sm text-[#E2E8F0] truncate text-right",title:t.p2Name,children:t.p2Name||"TBD"}),u.jsx(ai,{name:t.p2Name,className:"w-7 h-7 text-[10px] rounded-md"})]})]}),!i&&u.jsxs(u.Fragment,{children:[u.jsx(Rr,{game:"g1",label:"G1",match:t,p1Name:"",p2Name:"",onChange:s,isAdmin:n&&!_}),u.jsx(Rr,{game:"g2",label:"G2",match:t,p1Name:"",p2Name:"",onChange:s,isAdmin:n&&!_}),(f||c.p1!==void 0&&c.p1!==null||n)&&u.jsx("div",{className:`transition-all duration-500 overflow-hidden ${f||c.p1!==void 0&&c.p1!==null||n?"opacity-100 max-h-32 mt-3 pt-3 border-t border-dashed border-[#1E2738]":"opacity-0 max-h-0"}`,children:u.jsx(Rr,{game:"g3",label:"G3",match:t,p1Name:"",p2Name:"",onChange:s,isAdmin:n&&!_})})]})]})]})]})}function X2({standingsData:t,bracketData:e}){const n=(l,a,c=!1,h="bg-blue-500")=>u.jsxs("div",{className:"bg-[#131722] border border-[#222B3D] rounded-xl overflow-hidden shadow-xl animate-in fade-in zoom-in-95 duration-500",children:[u.jsxs("div",{className:"p-4 border-b border-[#1E2738] flex items-center",children:[u.jsx("div",{className:`w-3 h-3 rounded-full ${h} mr-3 shadow-[0_0_8px_currentColor]`}),u.jsx("h3",{className:"font-black text-lg tracking-wider text-[#E2E8F0] uppercase",children:a})]}),u.jsx("div",{className:"overflow-x-auto",children:u.jsxs("table",{className:"w-full text-sm text-left border-collapse",children:[u.jsx("thead",{className:"text-xs text-[#8B9BB4] uppercase bg-[#181D2B] border-b border-[#222B3D]",children:u.jsxs("tr",{children:[u.jsx("th",{className:"px-4 py-3 font-semibold w-12 text-center border-l-4 border-transparent",children:"#"}),u.jsx("th",{className:"px-4 py-3 font-semibold",children:"PLAYER"}),u.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"MP"}),u.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"W-L"}),u.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"GF"}),u.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"GA"}),u.jsx("th",{className:"px-3 py-3 font-semibold text-center",children:"GD"}),u.jsx("th",{className:"px-4 py-3 font-black text-white text-center",children:"PTS"})]})}),u.jsx("tbody",{className:"bg-[#0a0b10]/50 divide-y divide-[#1E2738]",children:l.map((d,f)=>{let _="border-l-4 border-l-transparent";return c?f<2?_="border-l-4 border-l-[#10B981]":_="border-l-4 border-l-[#EF4444]":f<2?_="border-l-4 border-l-[#10B981]":f===2&&(_="border-l-4 border-l-[#F59E0B]"),u.jsxs("tr",{className:"hover:bg-[#1A2234] transition-colors group",children:[u.jsx("td",{className:`px-4 py-4 font-bold text-[#8B9BB4] text-center ${_}`,children:f+1}),u.jsx("td",{className:"px-4 py-4 min-w-[200px]",children:u.jsxs("div",{className:"flex items-center gap-3",children:[u.jsx(ai,{name:d.name,className:"w-8 h-8 text-xs"}),u.jsxs("div",{className:"flex flex-col",children:[u.jsx("span",{className:"font-bold text-[#E2E8F0] text-[15px]",children:d.name}),c&&u.jsxs("span",{className:"text-[10px] text-[#64748B] font-bold tracking-widest uppercase mt-0.5",children:["GROUP ",d.group]})]})]})}),u.jsx("td",{className:"px-3 py-4 text-center text-[#94A3B8] font-medium",children:d.played}),u.jsxs("td",{className:"px-3 py-4 text-center text-[#94A3B8] font-medium whitespace-nowrap",children:[d.w,"-",d.l]}),u.jsx("td",{className:"px-3 py-4 text-center text-[#94A3B8] font-mono",children:d.gf}),u.jsx("td",{className:"px-3 py-4 text-center text-[#94A3B8] font-mono",children:d.ga}),u.jsx("td",{className:`px-3 py-4 text-center font-mono font-medium ${d.gd>0?"text-[#10B981]":d.gd<0?"text-[#EF4444]":"text-[#94A3B8]"}`,children:d.gd>0?`+${d.gd}`:d.gd}),u.jsx("td",{className:"px-4 py-4 text-center font-black text-[#6384FF] text-lg",children:d.pts})]},d.id)})})]})})]}),r=e&&e.length>0?jn(e):[],s=r.filter(l=>l.id.startsWith("QF")),i=r.filter(l=>l.id.startsWith("SF")),o=r.find(l=>l.id.startsWith("F"));return u.jsxs("div",{className:"space-y-12",children:[u.jsxs("div",{className:"grid lg:grid-cols-2 gap-8",children:[n(t.groups.A,"GROUP A",!1,"bg-[#3B82F6]"),n(t.groups.B,"GROUP B",!1,"bg-[#F59E0B]"),n(t.groups.C,"GROUP C",!1,"bg-[#10B981]")]}),r.length>0&&u.jsxs("div",{className:"mt-16 pt-12 border-t border-[#1E2738]",children:[u.jsxs("h2",{className:"text-2xl font-black flex items-center gap-3 mb-10 text-[#F8FAFC]",children:[u.jsx(Fn,{className:"text-[#FBBF24] w-7 h-7"})," KNOCKOUT BRACKET"]}),u.jsxs("div",{className:"flex flex-col lg:flex-row justify-between items-center lg:items-center w-full min-w-max overflow-x-auto gap-12 py-16 pb-24 px-8 min-h-[700px] relative mt-12 bg-[#080b12] rounded-3xl border border-[#1E2738] shadow-2xl",children:[u.jsx("div",{className:"flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10",children:s.filter(l=>l.id==="QF-1"||l.id==="QF-2").map((l,a)=>u.jsx(pt,{match:l,title:`Quarterfinal ${a+1}`,isAdmin:!1,hideGames:!0},l.id))}),i.filter(l=>l.id==="SF-1").length>0&&u.jsx("div",{className:"flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 relative px-4",children:i.filter(l=>l.id==="SF-1").map(l=>u.jsx(pt,{match:l,title:"Semifinal 1",isAdmin:!1,hideGames:!0},l.id))}),o&&u.jsxs("div",{className:"flex flex-col justify-center w-full lg:w-96 shrink-0 z-20 px-4 md:scale-110 transition-transform duration-500 hover:scale-110",children:[u.jsxs("div",{className:"text-center mb-8 relative",children:[u.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FBBF24] opacity-[0.05] blur-[80px] rounded-full pointer-events-none"}),u.jsx(Fn,{className:"mx-auto text-[#FBBF24] w-16 h-16 mb-4 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"}),u.jsx("h3",{className:"font-black text-2xl text-white tracking-[0.2em] uppercase drop-shadow-md",children:"Championship"}),u.jsx("p",{className:"text-xs text-[#FBBF24] font-bold tracking-widest mt-2 uppercase",children:"Best of 3 Series"})]}),u.jsx("div",{className:"shadow-[0_0_50px_rgba(251,191,36,0.15)] rounded-2xl",children:u.jsx(pt,{match:o,title:"Grand Final",isAdmin:!1,hideGames:!0})})]}),i.filter(l=>l.id==="SF-2").length>0&&u.jsx("div",{className:"flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 relative px-4",children:i.filter(l=>l.id==="SF-2").map(l=>u.jsx(pt,{match:l,title:"Semifinal 2",isAdmin:!1,hideGames:!0},l.id))}),u.jsx("div",{className:"flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10",children:s.filter(l=>l.id==="QF-3"||l.id==="QF-4").map((l,a)=>u.jsx(pt,{match:l,title:`Quarterfinal ${a+3}`,isAdmin:!1,hideGames:!0},l.id))}),u.jsx("div",{className:"absolute inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-[0.02] pointer-events-none",style:{backgroundImage:"url('https://www.transparenttextures.com/patterns/cubes.png')"}}),u.jsx("div",{className:"absolute top-0 left-0 w-96 h-96 bg-[#C084FC] opacity-[0.05] rounded-full blur-[120px] pointer-events-none"}),u.jsx("div",{className:"absolute bottom-0 right-0 w-96 h-96 bg-[#10B981] opacity-[0.05] rounded-full blur-[120px] pointer-events-none"})]})]})]})}function J2({data:t,updateData:e,isAdmin:n}){const[r,s]=j.useState("ALL"),[i,o]=j.useState("UPCOMING"),[l,a]=j.useState({}),c=w=>{a(m=>({...m,[w]:!m[w]}))},h=(t.bracket||[]).filter(w=>w.p1Id&&w.p2Id),d=[...t.matches,...h],f=(r==="ALL"?d:r==="KNOCKOUT"?h:t.matches.filter(w=>w.groupId===r)).filter(w=>i==="UPCOMING"?!w.played:w.played),_=(w,m,p,g)=>{if(!n)return;const x=g===""?null:parseInt(g,10);if(w.startsWith("QF")||w.startsWith("SF")||w.startsWith("F")){let E=(t.bracket||[]).map(S=>S.id===w?{...S,[m]:{...S[m]||{},[p]:x}}:S);E=jn(E),e({...t,bracket:E})}else{const E=t.matches.map(S=>S.id===w?{...S,[m]:{...S[m]||{},[p]:x}}:S);e({...t,matches:E})}},y=w=>{if(n)if(w.startsWith("QF")||w.startsWith("SF")||w.startsWith("F")){let m=(t.bracket||[]).map(p=>p.id===w?{...p,played:!p.played}:p);m=jn(m),e({...t,bracket:m})}else{const m=t.matches.map(p=>p.id===w?{...p,played:!p.played}:p);e({...t,matches:m})}},v=w=>{var m;return((m=t.players.find(p=>p.id===w))==null?void 0:m.name)||w};return u.jsxs("div",{className:"space-y-8 animate-in fade-in duration-500",children:[u.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-[#0f141e] p-6 rounded-2xl border border-[#222B3D] shadow-xl",children:[u.jsxs("h2",{className:"text-3xl font-black flex items-center gap-3 text-[#E2E8F0] tracking-wider uppercase",children:[u.jsx(li,{className:"text-[#10B981] w-8 h-8 drop-shadow-[0_0_12px_rgba(16,185,129,0.3)]"}),"SCHEDULE"]}),u.jsxs("div",{className:"flex flex-col sm:flex-row gap-4 w-full md:w-auto",children:[u.jsxs("div",{className:"flex bg-[#0a0b10] p-1.5 rounded-xl w-full sm:w-auto border border-[#1E2738] shadow-inner",children:[u.jsx("button",{onClick:()=>o("UPCOMING"),className:`flex-1 sm:flex-none px-6 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${i==="UPCOMING"?"bg-[#10B981] text-white shadow-lg shadow-[#10B981]/20":"text-[#64748B] hover:text-[#94A3B8]"}`,children:"Upcoming"}),u.jsx("button",{onClick:()=>o("PLAYED"),className:`flex-1 sm:flex-none px-6 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${i==="PLAYED"?"bg-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/20":"text-[#64748B] hover:text-[#94A3B8]"}`,children:"Played"})]}),u.jsx("div",{className:"flex bg-[#0a0b10] p-1.5 rounded-xl w-full sm:w-auto border border-[#1E2738] shadow-inner",children:["ALL","A","B","C","KNOCKOUT"].map(w=>u.jsx("button",{onClick:()=>s(w),className:`flex-1 sm:flex-none px-5 py-2.5 text-xs tracking-widest uppercase font-black rounded-lg transition-all ${r===w?"bg-[#334155] text-white shadow":"text-[#64748B] hover:text-[#94A3B8]"}`,children:w==="ALL"?"ALL":w==="KNOCKOUT"?"KNOCKOUT":`GR.${w}`},w))})]})]}),!n&&u.jsxs("div",{className:"bg-[#4770FF]/10 border border-[#4770FF]/20 text-[#6384FF] p-4 rounded-xl text-sm font-bold flex items-center gap-3 shadow-[0_4px_20px_rgba(71,112,255,0.05)]",children:[u.jsx(kv,{className:"w-5 h-5 flex-shrink-0"})," You are in view-only spectator mode. Admin login is required to input live match scores."]}),u.jsx("div",{className:"flex flex-col gap-4 w-full max-w-5xl mx-auto",children:f.length===0?u.jsxs("div",{className:"py-20 text-center text-[#64748B] bg-[#0f141e] rounded-2xl border border-dashed border-[#334155] flex flex-col items-center",children:[u.jsx(li,{className:"w-12 h-12 mb-4 opacity-20"}),u.jsxs("p",{className:"font-bold text-lg",children:["No ",i.toLowerCase()," matches found for this filter."]})]}):f.map(w=>{const m=v(w.p1Id),p=v(w.p2Id),g=Fl(w),x=w.g1||{},E=w.g2||{},S=w.g3||{},N=x.p1!==void 0&&x.p1!==null&&x.p2!==void 0&&x.p2!==null,T=E.p1!==void 0&&E.p1!==null&&E.p2!==void 0&&E.p2!==null;let L=!1;if(N&&T){let Ne=(x.p1>x.p2?1:0)+(E.p1>E.p2?1:0),Sn=(x.p2>x.p1?1:0)+(E.p2>E.p1?1:0);Ne===1&&Sn===1&&(L=!0)}const P=w.id.startsWith("QF")?"QUARTERFINAL":w.id.startsWith("SF")?"SEMIFINAL":w.id.startsWith("F")?"GRAND FINAL":`GROUP ${w.groupId}`;return u.jsxs("div",{className:`relative flex flex-col overflow-hidden w-full border border-[#1E2738]/60 transition-all duration-300 rounded-[20px] ${w.played?"bg-[#10141D]":"bg-[#0B0F19]/90 hover:bg-[#0B0F19] hover:border-[#334155]/60"}`,children:[u.jsxs("div",{className:"flex flex-col items-center w-full px-4 sm:px-8 py-6 relative z-10",children:[u.jsx("div",{className:"flex items-center gap-3 mb-6",children:u.jsxs("span",{className:"text-[10px] sm:text-[11px] font-black tracking-[0.2em] text-[#8B9BB4] flex items-center gap-2 sm:gap-4 uppercase",children:[u.jsx("span",{className:"text-[#6384FF]",children:P}),u.jsx("span",{className:"w-1 h-1 rounded-full bg-[#334155]"}),u.jsxs("span",{children:["MATCH ",w.id.replace(/\D/g,"")||w.id]}),u.jsx("span",{className:"w-1 h-1 rounded-full bg-[#334155]"}),u.jsx("span",{className:"text-[#10B981]",children:"BO3"}),w.played&&u.jsxs(u.Fragment,{children:[u.jsx("span",{className:"w-1 h-1 rounded-full bg-[#334155]"}),u.jsxs("span",{className:"text-[#10B981] flex items-center gap-1",children:[u.jsx($r,{className:"w-3 h-3"})," OFFICIAL"]})]})]})}),u.jsxs("div",{className:"flex justify-between items-center w-full",children:[u.jsxs("div",{className:"flex items-center gap-3 sm:gap-6 w-[40%] justify-start",children:[u.jsx(ai,{name:m,className:"w-12 h-12 sm:w-20 sm:h-20 text-xs sm:text-lg shrink-0 drop-shadow-xl"}),u.jsx("span",{className:"font-black text-lg sm:text-3xl text-[#F8FAFC] truncate tracking-wide",title:m,children:m})]}),u.jsx("div",{className:"flex flex-col items-center justify-center w-[20%]",children:w.played||g.p1Wins>0||g.p2Wins>0?u.jsxs("div",{className:"text-3xl sm:text-5xl font-black tracking-widest text-white drop-shadow-[0_2px_15px_rgba(255,255,255,0.1)]",children:[g.p1Wins," ",u.jsx("span",{className:"text-[#475569] mx-2 sm:mx-4",children:"-"})," ",g.p2Wins]}):u.jsx("span",{className:"text-sm sm:text-2xl font-black tracking-[0.3em] text-[#475569] uppercase italic opacity-70",children:"VS"})}),u.jsxs("div",{className:"flex items-center justify-end gap-3 sm:gap-6 w-[40%]",children:[u.jsx("span",{className:"font-black text-lg sm:text-3xl text-[#F8FAFC] truncate text-right tracking-wide",title:p,children:p}),u.jsx(ai,{name:p,className:"w-12 h-12 sm:w-20 sm:h-20 text-xs sm:text-lg shrink-0 drop-shadow-xl"})]})]})]}),(n||w.played)&&u.jsxs("div",{className:"w-full bg-[#0a0b10]/80 border-t border-[#1E2738]/50 p-4 sm:p-6 flex flex-col items-center",children:[u.jsxs("div",{className:"flex justify-center items-center gap-4 mb-4",children:[n&&u.jsxs("button",{onClick:()=>y(w.id),className:`px-6 py-2 rounded-xl border flex items-center gap-2 text-[10px] sm:text-xs uppercase font-black tracking-widest transition-all ${w.played?"bg-[#10B981]/10 border-[#10B981]/30 text-[#10B981] hover:bg-[#10B981]/20":"bg-[#1E293B]/70 border-[#334155]/80 text-[#94A3B8] hover:bg-[#334155] hover:text-white shadow-md"}`,children:[w.played?u.jsx($r,{className:"w-4 h-4"}):u.jsx(Dd,{className:"w-4 h-4"}),u.jsx("span",{children:w.played?"MARK UNOFFICIAL":"MARK DONE"})]}),u.jsxs("button",{onClick:()=>c(w.id),className:"px-6 py-2 rounded-xl border bg-[#1E293B]/70 border-[#334155]/80 text-[#94A3B8] hover:bg-[#334155] hover:text-white transition-all shadow-md flex items-center gap-2 text-[10px] sm:text-xs uppercase font-black tracking-widest",children:[u.jsx("span",{children:l[w.id]?"HIDE GAMES":"SHOW GAMES"}),l[w.id]?u.jsx(h2,{className:"w-4 h-4"}):u.jsx(d2,{className:"w-4 h-4"})]})]}),u.jsxs("div",{className:`w-full max-w-3xl mx-auto space-y-3 transition-all duration-500 overflow-hidden ${l[w.id]?"opacity-100 max-h-[500px] mt-2":"opacity-0 max-h-0 pointer-events-none m-0"}`,children:[u.jsx(Rr,{game:"g1",label:"G1",match:w,p1Name:"",p2Name:"",onChange:_,isAdmin:n}),u.jsx(Rr,{game:"g2",label:"G2",match:w,p1Name:"",p2Name:"",onChange:_,isAdmin:n}),(L||S.p1!==void 0&&S.p1!==null||n)&&u.jsx("div",{className:`transition-all duration-700 overflow-hidden ${L||S.p1!==void 0&&S.p1!==null||n?"opacity-100 max-h-32 mt-3":"opacity-0 max-h-0"}`,children:u.jsx(Rr,{game:"g3",label:"G3",match:w,p1Name:"",p2Name:"",onChange:_,isAdmin:n})})]})]})]},w.id)})})]})}function Z2(){return u.jsxs("div",{className:"max-w-4xl mx-auto space-y-12 animate-in fade-in zoom-in-95 duration-500",children:[u.jsxs("div",{className:"text-center space-y-4 mb-12",children:[u.jsx("div",{className:"inline-flex items-center justify-center p-4 rounded-2xl bg-[#C084FC]/10 border border-[#C084FC]/20 text-[#C084FC] mb-2 shadow-[0_0_30px_rgba(192,132,252,0.15)]",children:u.jsx(Cv,{className:"w-10 h-10"})}),u.jsx("h2",{className:"text-4xl font-black tracking-tight text-[#E2E8F0] uppercase",children:"Tournament Official Rules"}),u.jsx("p",{className:"text-[#8B9BB4] text-lg max-w-2xl mx-auto",children:"Please review the format, scoring system, and qualification criteria for the Pallet PES Tour."})]}),u.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[u.jsxs("div",{className:"bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group",children:[u.jsx("div",{className:"absolute top-0 right-0 w-32 h-32 bg-[#10B981] opacity-[0.03] rounded-full blur-[40px] group-hover:opacity-[0.06] transition-opacity"}),u.jsxs("h3",{className:"text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider",children:[u.jsx("div",{className:"p-2 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20",children:u.jsx(li,{className:"w-6 h-6"})}),"Match Format"]}),u.jsxs("div",{className:"space-y-4 text-[#94A3B8]",children:[u.jsxs("p",{className:"font-medium text-[#CBD5E1]",children:["Every matchup is a ",u.jsx("strong",{className:"text-white",children:"Best-of-3 series"}),". The first player to win 2 games wins the series."]}),u.jsxs("ul",{className:"space-y-3",children:[u.jsxs("li",{className:"flex gap-3",children:[u.jsx("span",{className:"text-[#10B981] font-bold mt-0.5",children:"•"}),u.jsx("span",{children:'Each "game" is a full eFootball match.'})]}),u.jsxs("li",{className:"flex gap-3",children:[u.jsx("span",{className:"text-[#10B981] font-bold mt-0.5",children:"•"}),u.jsx("span",{children:"The series ends immediately if a player wins the first 2 games (2-0)."})]}),u.jsxs("li",{className:"flex gap-3",children:[u.jsx("span",{className:"text-[#10B981] font-bold mt-0.5",children:"•"}),u.jsx("span",{children:"Game 3 is only played if the series is tied 1-1."})]}),u.jsxs("li",{className:"flex gap-3",children:[u.jsx("span",{className:"text-[#10B981] font-bold mt-0.5",children:"•"}),u.jsx("span",{children:"Goals from all games count towards overall Goal Difference."})]})]})]})]}),u.jsxs("div",{className:"bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group",children:[u.jsx("div",{className:"absolute top-0 right-0 w-32 h-32 bg-[#F59E0B] opacity-[0.03] rounded-full blur-[40px] group-hover:opacity-[0.06] transition-opacity"}),u.jsxs("h3",{className:"text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider",children:[u.jsx("div",{className:"p-2 rounded-xl bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20",children:u.jsx(jd,{className:"w-6 h-6"})}),"Points System"]}),u.jsx("div",{className:"bg-[#0a0b10] rounded-xl border border-[#1E2738] p-2 mt-2",children:u.jsxs("ul",{className:"divide-y divide-[#1E2738]",children:[u.jsxs("li",{className:"flex justify-between items-center p-4",children:[u.jsxs("span",{className:"text-[#E2E8F0] font-medium",children:["Win Series ",u.jsx("strong",{className:"text-white bg-[#334155] px-2 py-0.5 rounded ml-2",children:"2 - 0"})]}),u.jsx("span",{className:"text-[#10B981] font-black tracking-widest",children:"+3 PTS"})]}),u.jsxs("li",{className:"flex justify-between items-center p-4",children:[u.jsxs("span",{className:"text-[#E2E8F0] font-medium",children:["Win Series ",u.jsx("strong",{className:"text-white bg-[#334155] px-2 py-0.5 rounded ml-2",children:"2 - 1"})]}),u.jsx("span",{className:"text-[#10B981] font-black tracking-widest",children:"+2 PTS"})]}),u.jsxs("li",{className:"flex justify-between items-center p-4 bg-[#1A2234]",children:[u.jsxs("span",{className:"text-[#E2E8F0] font-medium",children:["Lose Series ",u.jsx("strong",{className:"text-[#94A3B8] bg-[#0a0b10] px-2 py-0.5 rounded ml-2 border border-[#334155]",children:"1 - 2"})]}),u.jsx("span",{className:"text-[#F59E0B] font-black tracking-widest",children:"+1 PTS"})]}),u.jsxs("li",{className:"flex justify-between items-center p-4 opacity-75",children:[u.jsxs("span",{className:"text-[#94A3B8] font-medium",children:["Lose Series ",u.jsx("strong",{className:"text-[#64748B] bg-[#0a0b10] px-2 py-0.5 rounded ml-2 border border-[#1E2738]",children:"0 - 2"})]}),u.jsx("span",{className:"text-[#64748B] font-black tracking-widest",children:"0 PTS"})]})]})})]}),u.jsxs("div",{className:"md:col-span-2 bg-[#131722] p-8 rounded-2xl border border-[#222B3D] shadow-xl hover:border-[#334155] transition-colors relative overflow-hidden group",children:[u.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-[#6384FF] opacity-[0.03] rounded-full blur-[60px] group-hover:opacity-[0.05] transition-opacity"}),u.jsxs("h3",{className:"text-xl font-black text-[#E2E8F0] mb-6 flex items-center gap-3 uppercase tracking-wider",children:[u.jsx("div",{className:"p-2 rounded-xl bg-[#6384FF]/10 text-[#6384FF] border border-[#6384FF]/20",children:u.jsx(Md,{className:"w-6 h-6"})}),"Qualification & Tiebreakers"]}),u.jsxs("div",{className:"grid md:grid-cols-2 gap-8 pt-2",children:[u.jsxs("div",{className:"space-y-4",children:[u.jsxs("p",{className:"font-bold text-[#E2E8F0] text-lg border-b border-[#222B3D] pb-3",children:[u.jsx("span",{className:"text-[#6384FF]",children:"8 out of 12"})," players advance to the Knockout Stage:"]}),u.jsxs("ul",{className:"space-y-4 text-[#94A3B8]",children:[u.jsxs("li",{className:"flex items-start gap-4 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738]",children:[u.jsx("div",{className:"w-8 h-8 rounded-lg bg-[#3B82F6]/20 text-[#60A5FA] flex items-center justify-center font-black flex-shrink-0",children:"1"}),u.jsxs("p",{children:["The ",u.jsx("strong",{className:"text-white",children:"Top 2"})," from each group automatically qualify."]})]}),u.jsxs("li",{className:"flex items-start gap-4 p-4 rounded-xl bg-[#0a0b10] border border-[#1E2738]",children:[u.jsx("div",{className:"w-8 h-8 rounded-lg bg-[#A855F7]/20 text-[#C084FC] flex items-center justify-center font-black flex-shrink-0",children:"2"}),u.jsxs("p",{children:["The ",u.jsx("strong",{className:"text-white",children:"Best 2 Third-Place"})," finishers across all groups also advance."]})]})]})]}),u.jsxs("div",{className:"space-y-4 md:border-l md:border-[#1E2738] md:pl-8",children:[u.jsx("p",{className:"font-bold text-[#E2E8F0] text-lg border-b border-[#222B3D] pb-3",children:"Tiebreaker Order:"}),u.jsxs("ol",{className:"space-y-3",children:[u.jsxs("li",{className:"flex items-center gap-3 text-[#CBD5E1]",children:[u.jsx("span",{className:"text-[#64748B] font-mono font-bold",children:"1."}),u.jsx("span",{className:"font-bold text-white uppercase tracking-widest text-sm",children:"Total Points (PTS)"})]}),u.jsxs("li",{className:"flex items-center gap-3 text-[#94A3B8]",children:[u.jsx("span",{className:"text-[#64748B] font-mono font-bold",children:"2."}),u.jsx("span",{children:"Goal Difference (GD)"})]}),u.jsxs("li",{className:"flex items-center gap-3 text-[#94A3B8]",children:[u.jsx("span",{className:"text-[#64748B] font-mono font-bold",children:"3."}),u.jsx("span",{children:"Goals For (GF)"})]}),u.jsxs("li",{className:"flex items-center gap-3 text-[#94A3B8]",children:[u.jsx("span",{className:"text-[#64748B] font-mono font-bold",children:"4."}),u.jsx("span",{children:"Alphabetical Order"})]})]})]})]})]})]})]})}function eN({qualifiedPlayers:t,onClose:e,onComplete:n}){const[r,s]=j.useState([...t]),[i,o]=j.useState([]),[l,a]=j.useState({p1:null,p2:null}),[c,h]=j.useState(0),[d,f]=j.useState(!1),[_,y]=j.useState("Ready to draw."),v=["#ef4444","#3b82f6","#10b981","#f59e0b","#8b5cf6","#ec4899","#14b8a6","#f97316"],w=()=>{if(r.length===0)return"conic-gradient(#334155 0deg, #334155 360deg)";const p=360/r.length;let g=[];for(let x=0;x<r.length;x++){const E=x*p,S=(x+1)*p;g.push(`${v[x%v.length]} ${E}deg ${S}deg`)}return`conic-gradient(${g.join(", ")})`},m=p=>{if(d||r.length===0)return;f(!0),y(`Spinning for ${p==="p1"?"Home":"Away"}...`);let g=Math.floor(Math.random()*r.length),x=r[g];if(p==="p2"&&l.p1){const L=r.filter(P=>P.group!==l.p1.group);if(L.length>0){const P=L[Math.floor(Math.random()*L.length)];g=r.findIndex(Ne=>Ne.id===P.id),x=P}else y("No cross-group available — same group match allowed.")}const E=360/r.length,S=360-(g*E+E/2),N=5*360,T=c+N+(S-c%360);h(T),setTimeout(()=>{if(f(!1),p==="p1")a({p1:x,p2:null}),s(r.filter(L=>L.id!==x.id)),y(`Home team selected: ${x.name}`);else{const L={id:`QF-${i.length+1}`,p1Id:l.p1.id,p1Name:l.p1.name,p2Id:x.id,p2Name:x.name,played:!1,g1:{p1:null,p2:null},g2:{p1:null,p2:null},g3:{p1:null,p2:null}};o([...i,L]),a({p1:null,p2:null}),s(r.filter(P=>P.id!==x.id)),y("Match drawn!")}},4e3)};return u.jsx("div",{className:"fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in",children:u.jsxs("div",{className:"bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto flex flex-col md:flex-row shadow-2xl",children:[u.jsxs("div",{className:"flex-1 p-8 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/50",children:[u.jsxs("div",{className:"relative w-64 h-64 sm:w-80 sm:h-80 mb-8",children:[u.jsx("div",{className:"absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0 border-l-[15px] border-r-[15px] border-t-[25px] border-l-transparent border-r-transparent border-t-white drop-shadow-md"}),u.jsx("div",{className:"w-full h-full rounded-full border-4 border-slate-800 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden relative",style:{background:w(),transform:`rotate(${c}deg)`,transition:"transform 4s cubic-bezier(0.2, 0.8, 0.2, 1)"},children:r.map((p,g)=>{const x=360/r.length,E=g*x+x/2;return u.jsx("div",{className:"absolute top-1/2 left-1/2 origin-left font-bold text-white tracking-wider text-sm whitespace-nowrap drop-shadow-md",style:{transform:`translate(0, -50%) rotate(${E}deg) translateX(40px)`},children:p.name},p.id)})}),u.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-800 border-4 border-slate-700 rounded-full z-10 shadow-inner"})]}),u.jsx("div",{className:"text-center h-12",children:u.jsx("p",{className:`font-mono text-sm ${d?"text-amber-400 animate-pulse":"text-slate-400"}`,children:_})}),u.jsxs("div",{className:"flex gap-4 mt-4 w-full justify-center",children:[u.jsx("button",{onClick:()=>m("p1"),disabled:d||l.p1!==null||r.length===0,className:"flex-1 max-w-[150px] py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold transition-colors",children:"Spin for Home"}),u.jsx("button",{onClick:()=>m("p2"),disabled:d||l.p1===null||r.length===0,className:"flex-1 max-w-[150px] py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-bold transition-colors",children:"Spin for Away"})]})]}),u.jsxs("div",{className:"flex-1 p-6 flex flex-col",children:[u.jsxs("div",{className:"flex justify-between items-center mb-6",children:[u.jsx("h3",{className:"text-xl font-black",children:"Live Draw Status"}),u.jsx("button",{onClick:e,className:"p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors",children:u.jsx(bv,{})})]}),u.jsxs("div",{className:"bg-slate-950 rounded-xl p-4 border border-slate-800 mb-6",children:[u.jsx("h4",{className:"text-xs text-slate-500 font-bold uppercase tracking-widest mb-2",children:"Current Matchup"}),u.jsxs("div",{className:"flex items-center justify-between font-bold text-lg",children:[u.jsx("span",{className:l.p1?"text-blue-400":"text-slate-600",children:l.p1?l.p1.name:"???"}),u.jsx("span",{className:"text-slate-700 mx-4",children:"VS"}),u.jsx("span",{className:l.p2?"text-purple-400":"text-slate-600",children:l.p2?l.p2.name:"???"})]})]}),u.jsxs("div",{className:"flex-1",children:[u.jsx("h4",{className:"text-xs text-slate-500 font-bold uppercase tracking-widest mb-3",children:"Generated Matches"}),u.jsxs("div",{className:"space-y-2",children:[i.map((p,g)=>u.jsxs("div",{className:"flex justify-between items-center p-3 bg-slate-800/50 rounded-lg border border-slate-700/50",children:[u.jsxs("span",{className:"text-slate-400 text-sm font-mono mr-3",children:["M",g+1]}),u.jsx("span",{className:"flex-1 text-right font-bold text-blue-300",children:p.p1Name}),u.jsx("span",{className:"mx-3 text-xs text-slate-500",children:"vs"}),u.jsx("span",{className:"flex-1 font-bold text-purple-300",children:p.p2Name})]},g)),i.length===0&&u.jsx("div",{className:"text-center py-8 text-slate-600 text-sm italic",children:"No matches drawn yet."})]})]}),u.jsx("button",{onClick:()=>n(i),disabled:i.length<4,className:"mt-6 w-full py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 disabled:text-slate-500 rounded-xl font-black tracking-widest uppercase transition-colors",children:i.length<4?`Draw ${4-i.length} More`:"✅ Confirm Draw"})]})]})})}function tN({data:t,updateData:e,standingsData:n,isAdmin:r}){const[s,i]=j.useState(!1),[o,l]=j.useState(t.bracket||[]);j.useEffect(()=>{t.bracket&&t.bracket.length>0?l(jn(t.bracket)):l([])},[t.bracket]);const a=v=>{const w=jn([...o,...v]);l(w),e({...t,bracket:w}),i(!1)},c=()=>{window.confirm("Are you sure you want to clear the knockout bracket?")&&(l([]),e({...t,bracket:[]}))},h=(v,w,m,p)=>{if(!r)return;const g=p===""?null:parseInt(p,10);let x=o.map(E=>E.id===v?{...E,[w]:{...E[w],[m]:g}}:E);x=jn(x),l(x),e({...t,bracket:x})},d=v=>{if(!r)return;let w=o.map(m=>m.id===v?{...m,played:!m.played}:m);w=jn(w),l(w),e({...t,bracket:w})},f=o.filter(v=>v.id.startsWith("QF")),_=o.filter(v=>v.id.startsWith("SF")),y=o.find(v=>v.id.startsWith("F"));return u.jsxs("div",{className:"space-y-8",children:[u.jsxs("div",{className:"flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900 p-4 rounded-xl border border-slate-800",children:[u.jsxs("div",{children:[u.jsxs("h2",{className:"text-2xl font-black flex items-center gap-2",children:[u.jsx(Fn,{className:"text-yellow-500"})," Knockout Draw (Admin)"]}),u.jsx("p",{className:"text-sm text-slate-400 mt-1",children:"Manage and draw the knockout bracket here."})]}),r?u.jsxs("div",{className:"flex gap-2",children:[u.jsxs("button",{onClick:c,disabled:o.length===0,className:"px-4 py-2 bg-slate-800 hover:bg-red-900/50 text-red-400 rounded-lg text-sm font-bold border border-slate-700 transition-colors disabled:opacity-50 flex items-center gap-2",children:[u.jsx(bv,{className:"w-4 h-4"})," Clear"]}),u.jsxs("button",{onClick:()=>i(!0),disabled:n.qualified.length<8||f.length>=4,className:"px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white rounded-lg text-sm font-bold shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all disabled:opacity-50 flex items-center gap-2",children:[u.jsx(Dd,{className:"w-4 h-4"}),"Spin Draw"]})]}):u.jsxs("div",{className:"bg-slate-800/50 px-3 py-1.5 rounded border border-slate-700 text-xs text-slate-400 flex items-center gap-2",children:[u.jsx(Nv,{className:"w-3 h-3"})," Admin required for draw"]})]}),n.qualified.length<8&&o.length===0&&u.jsxs("div",{className:"bg-amber-900/20 border border-amber-500/30 text-amber-400 p-6 rounded-xl text-center",children:[u.jsx(kv,{className:"w-8 h-8 mx-auto mb-2 opacity-80"}),u.jsx("p",{className:"font-bold",children:"Group Stage Incomplete"}),u.jsx("p",{className:"text-sm mt-1 opacity-80",children:"Finish the group stage matches to generate the top 8 qualified players."})]}),o.length>0?u.jsxs("div",{className:"flex flex-col lg:flex-row justify-between items-center lg:items-center w-full min-w-max overflow-x-auto gap-12 py-16 pb-24 px-8 min-h-[700px] relative mt-12 bg-[#080b12] rounded-3xl border border-[#1E2738] shadow-2xl",children:[u.jsx("div",{className:"flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10",children:f.filter(v=>v.id==="QF-1"||v.id==="QF-2").map((v,w)=>u.jsx(pt,{match:v,title:`Quarterfinal ${w+1}`,isAdmin:r,togglePlayed:d,handleScoreChange:h},v.id))}),_.filter(v=>v.id==="SF-1").length>0&&u.jsx("div",{className:"flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 relative px-4",children:_.filter(v=>v.id==="SF-1").map(v=>u.jsx(pt,{match:v,title:"Semifinal 1",isAdmin:r,togglePlayed:d,handleScoreChange:h},v.id))}),y&&u.jsxs("div",{className:"flex flex-col justify-center w-full lg:w-96 shrink-0 z-20 px-4 md:scale-110 transition-transform duration-500 hover:scale-110",children:[u.jsxs("div",{className:"text-center mb-8 relative",children:[u.jsx("div",{className:"absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#FBBF24] opacity-[0.05] blur-[80px] rounded-full pointer-events-none"}),u.jsx(Fn,{className:"mx-auto text-[#FBBF24] w-16 h-16 mb-4 drop-shadow-[0_0_20px_rgba(251,191,36,0.6)]"}),u.jsx("h3",{className:"font-black text-2xl text-white tracking-[0.2em] uppercase drop-shadow-md",children:"Championship"}),u.jsx("p",{className:"text-xs text-[#FBBF24] font-bold tracking-widest mt-2 uppercase",children:"Best of 3 Series"})]}),u.jsx("div",{className:"shadow-[0_0_50px_rgba(251,191,36,0.15)] rounded-2xl",children:u.jsx(pt,{match:y,title:"Grand Final",isAdmin:r,togglePlayed:d,handleScoreChange:h})})]}),_.filter(v=>v.id==="SF-2").length>0&&u.jsx("div",{className:"flex flex-col justify-center w-full lg:w-80 shrink-0 z-10 relative px-4",children:_.filter(v=>v.id==="SF-2").map(v=>u.jsx(pt,{match:v,title:"Semifinal 2",isAdmin:r,togglePlayed:d,handleScoreChange:h},v.id))}),u.jsx("div",{className:"flex flex-col justify-around w-full lg:w-80 shrink-0 space-y-24 z-10",children:f.filter(v=>v.id==="QF-3"||v.id==="QF-4").map((v,w)=>u.jsx(pt,{match:v,title:`Quarterfinal ${w+3}`,isAdmin:r,togglePlayed:d,handleScoreChange:h},v.id))}),u.jsx("div",{className:"absolute inset-0 z-0 bg-center bg-no-repeat bg-contain opacity-[0.02] pointer-events-none",style:{backgroundImage:"url('https://www.transparenttextures.com/patterns/cubes.png')"}}),u.jsx("div",{className:"absolute top-0 left-0 w-96 h-96 bg-[#C084FC] opacity-[0.05] rounded-full blur-[120px] pointer-events-none"}),u.jsx("div",{className:"absolute bottom-0 right-0 w-96 h-96 bg-[#10B981] opacity-[0.05] rounded-full blur-[120px] pointer-events-none"})]}):n.qualified.length>=8&&u.jsxs("div",{className:"h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-2xl text-slate-500",children:[u.jsx(Fn,{className:"w-12 h-12 mb-3 opacity-20"}),u.jsx("p",{className:"font-bold",children:"No draw generated yet."}),r&&u.jsx("p",{className:"text-sm mt-1",children:'Click "Spin Draw" to generate matchups.'})]}),s&&u.jsx(eN,{qualifiedPlayers:n.qualified,onClose:()=>i(!1),onComplete:a})]})}function nN({data:t,updateData:e,isAdmin:n,setIsAdmin:r}){const[s,i]=j.useState(""),[o,l]=j.useState(!1),[a,c]=j.useState(t.settings),[h,d]=j.useState(t.players);j.useEffect(()=>{c(t.settings),d(t.players)},[t]);const f=E=>{E.preventDefault(),s==="admin"?(r(!0),l(!1),i("")):l(!0)},[_,y]=j.useState(!1),[v,w]=j.useState(!1),m=()=>{e({...t,settings:a}),y(!0),setTimeout(()=>y(!1),2500)},p=(E,S)=>{d(h.map(N=>N.id===E?{...N,name:S}:N))},g=()=>{e({...t,players:h}),w(!0),setTimeout(()=>w(!1),2500)},x=()=>{window.prompt("DANGER! This will delete all scores and reset to template. Type 'RESET' to confirm.")==="RESET"&&e(Vu)};return n?u.jsxs("div",{className:"space-y-8 animate-in fade-in duration-500",children:[u.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#C084FC]/10 p-6 rounded-2xl border border-[#C084FC]/30 shadow-[0_0_30px_rgba(192,132,252,0.1)] relative overflow-hidden group",children:[u.jsx("div",{className:"absolute top-0 left-0 w-64 h-64 bg-[#C084FC] opacity-[0.05] rounded-full blur-[60px] pointer-events-none"}),u.jsxs("div",{className:"relative z-10",children:[u.jsxs("h2",{className:"text-3xl font-black flex items-center gap-3 text-[#E2E8F0] tracking-tight",children:[u.jsx(Md,{className:"text-[#C084FC] w-8 h-8"})," Control Panel"]}),u.jsx("p",{className:"text-sm text-[#C084FC]/70 mt-1 font-bold tracking-wide",children:"Live synchronization is ACTIVE."})]}),u.jsx("div",{className:"relative z-10",children:u.jsxs("button",{onClick:()=>r(!1),className:"flex items-center gap-2 px-5 py-2.5 bg-[#0a0b10]/50 hover:bg-[#1E2738] border border-[#C084FC]/20 hover:border-[#C084FC]/50 text-[#C084FC] rounded-xl text-sm font-black tracking-widest uppercase transition-all shadow-md",children:[u.jsx(m2,{className:"w-4 h-4"})," Lock"]})})]}),u.jsxs("div",{className:"grid md:grid-cols-2 gap-8",children:[u.jsxs("div",{className:"bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl",children:[u.jsxs("h3",{className:"text-xl font-black mb-6 flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider",children:[u.jsx("div",{className:"p-2 rounded-xl bg-[#3B82F6]/10 text-[#60A5FA] border border-[#3B82F6]/20",children:u.jsx(Iv,{className:"w-5 h-5"})}),"Tournament Info"]}),u.jsxs("div",{className:"space-y-5",children:[u.jsxs("div",{children:[u.jsx("label",{className:"block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest",children:"Tournament Name"}),u.jsx("input",{value:a.name,onChange:E=>c({...a,name:E.target.value}),className:"w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"})]}),u.jsxs("div",{children:[u.jsx("label",{className:"block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest",children:"Season"}),u.jsx("input",{value:a.season,onChange:E=>c({...a,season:E.target.value}),className:"w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"})]}),u.jsxs("div",{children:[u.jsx("label",{className:"block text-xs text-[#64748B] font-black mb-2 uppercase tracking-widest",children:"Tagline"}),u.jsx("input",{value:a.tagline,onChange:E=>c({...a,tagline:E.target.value}),className:"w-full bg-[#0a0b10] border border-[#1E2738] text-[#E2E8F0] rounded-xl px-4 py-3 focus:border-[#3B82F6] focus:ring-1 focus:ring-[#3B82F6] outline-none shadow-inner transition-all font-medium"})]}),u.jsxs("label",{className:"flex items-center gap-3 p-4 bg-[#0a0b10] border border-[#1E2738] rounded-xl cursor-pointer hover:border-[#3B82F6] transition-all",children:[u.jsx("input",{type:"checkbox",checked:a.registrationOpen??!0,onChange:E=>c({...a,registrationOpen:E.target.checked}),className:"w-5 h-5 rounded border-[#1E2738] text-[#3B82F6] focus:ring-[#3B82F6] bg-[#131722]"}),u.jsx("span",{className:"text-sm font-bold text-[#E2E8F0] tracking-wide",children:"Registration Open"})]}),u.jsx("button",{onClick:m,disabled:_,className:`w-full mt-4 py-3.5 rounded-xl font-black tracking-widest uppercase border transition-colors ${_?"bg-emerald-500/10 text-emerald-400 border-emerald-500/30 cursor-default":"bg-[#3B82F6]/10 hover:bg-[#3B82F6]/20 text-[#60A5FA] border-[#3B82F6]/30"}`,children:_?"✓ Saved Successfully":"Save Info Updates"})]})]}),u.jsxs("div",{className:"bg-[#131722] border border-[#EF4444]/20 rounded-2xl p-8 shadow-[0_0_30px_rgba(239,68,68,0.05)] relative overflow-hidden group",children:[u.jsx("div",{className:"absolute top-0 right-0 w-48 h-48 bg-[#EF4444] opacity-[0.03] rounded-full blur-[50px] pointer-events-none"}),u.jsxs("h3",{className:"text-xl font-black mb-6 flex items-center gap-3 text-[#EF4444] uppercase tracking-wider relative z-10",children:[u.jsx("div",{className:"p-2 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/20",children:u.jsx(f2,{className:"w-5 h-5"})}),"Danger Zone"]}),u.jsxs("p",{className:"text-[#94A3B8] font-medium leading-relaxed mb-8 relative z-10",children:["Resetting the tournament will permanently delete all scores, match histories, and knockout bracket data across all clients. ",u.jsx("strong",{className:"text-white",children:"This cannot be undone."})]}),u.jsxs("button",{onClick:x,className:"w-full py-4 bg-[#EF4444]/10 hover:bg-[#EF4444] text-[#EF4444] hover:text-white rounded-xl font-black uppercase tracking-widest border border-[#EF4444]/30 transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(239,68,68,0.1)] hover:shadow-[0_0_30px_rgba(239,68,68,0.4)] relative z-10",children:[u.jsx(_2,{className:"w-5 h-5"})," Factory Reset"]})]})]}),u.jsxs("div",{className:"bg-[#131722] border border-[#222B3D] rounded-2xl p-8 shadow-xl",children:[u.jsxs("div",{className:"flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8",children:[u.jsxs("h3",{className:"text-xl font-black flex items-center gap-3 text-[#E2E8F0] uppercase tracking-wider",children:[u.jsx("div",{className:"p-2 rounded-xl bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/20",children:u.jsx(w2,{className:"w-5 h-5"})}),"Player Roster"]}),u.jsxs("button",{onClick:g,disabled:v,className:`px-6 py-3 rounded-xl text-sm font-black tracking-widest uppercase transition-all flex items-center gap-2 ${v?"bg-emerald-600 text-white/90 shadow-none cursor-default":"bg-[#10B981] hover:bg-[#059669] text-white shadow-[0_0_20px_rgba(16,185,129,0.3)]"}`,children:[u.jsx($r,{className:"w-4 h-4"})," ",v?"Roster Saved!":"Save Roster Updates"]})]}),u.jsx("div",{className:"grid md:grid-cols-3 gap-6",children:["A","B","C"].map(E=>u.jsxs("div",{className:"bg-[#0a0b10] p-5 rounded-2xl border border-[#1E2738] shadow-inner",children:[u.jsxs("h4",{className:"font-black text-center text-[#64748B] mb-5 uppercase tracking-[0.2em]",children:["Group ",E]}),u.jsx("div",{className:"space-y-3",children:h.filter(S=>S.group===E).map(S=>u.jsxs("div",{className:"flex items-center gap-3 bg-[#131722] p-2 rounded-lg border border-[#222B3D]",children:[u.jsx("span",{className:"text-[10px] font-black tracking-wider text-[#64748B] bg-[#1E2738] px-2 py-1 rounded w-8 text-center",children:S.id}),u.jsx("input",{value:S.name,onChange:N=>p(S.id,N.target.value),className:"flex-1 bg-transparent border-none text-[#E2E8F0] px-2 py-1 text-sm focus:outline-none font-bold placeholder-[#475569]",placeholder:`Player ${S.id}`})]},S.id))})]},E))})]})]}):u.jsxs("div",{className:"max-w-md mx-auto mt-20 p-8 bg-[#131722] border border-[#222B3D] rounded-2xl shadow-[0_0_50px_rgba(20,30,50,0.5)] animate-in zoom-in-95 duration-500",children:[u.jsx("div",{className:"flex justify-center mb-6",children:u.jsx("div",{className:"w-20 h-20 bg-[#C084FC]/10 rounded-full flex items-center justify-center border border-[#C084FC]/20 shadow-[0_0_30px_rgba(192,132,252,0.15)]",children:u.jsx(Nv,{className:"w-10 h-10 text-[#C084FC]"})})}),u.jsx("h2",{className:"text-3xl font-black text-center mb-2 text-[#E2E8F0] tracking-tight",children:"Admin Portal"}),u.jsx("p",{className:"text-[#8B9BB4] text-center text-sm mb-8 font-medium",children:"Authentication required to manage tournament."}),u.jsxs("form",{onSubmit:f,className:"space-y-6",children:[u.jsxs("div",{children:[u.jsx("input",{type:"password",placeholder:"Enter password",value:s,onChange:E=>i(E.target.value),className:"w-full bg-[#0a0b10] border border-[#1E2738] rounded-xl px-5 py-4 focus:outline-none focus:border-[#C084FC] focus:ring-1 focus:ring-[#C084FC] text-center text-lg text-white placeholder-[#475569] shadow-inner transition-colors font-mono"}),o&&u.jsx("p",{className:"text-[#EF4444] text-xs mt-3 text-center font-bold tracking-widest uppercase animate-pulse",children:"Incorrect password"})]}),u.jsx("button",{type:"submit",className:"w-full bg-gradient-to-r from-[#C084FC] to-[#9333EA] hover:from-[#A855F7] hover:to-[#7E22CE] text-white font-black tracking-widest uppercase py-4 rounded-xl shadow-[0_0_20px_rgba(192,132,252,0.3)] transition-all",children:"Unlock Dashboard"})]})]})}function rN({isAdmin:t,isOpen:e=!0}){const[n,r]=j.useState([]),[s,i]=j.useState(""),[o,l]=j.useState(""),[a,c]=j.useState(!1),[h,d]=j.useState(""),[f,_]=j.useState("");j.useEffect(()=>{const m=gr(_r,"registrations"),p=Ev(m,g=>{const x=g.val();if(x){const E=Object.keys(x).map(S=>({id:S,...x[S]})).sort((S,N)=>N.timestamp-S.timestamp);r(E)}else r([])});return()=>p()},[]);const y=async m=>{if(m.preventDefault(),_(""),d(""),!s.trim()){_("In-Game Name is required.");return}if(n.some(g=>g.name.toLowerCase()===s.trim().toLowerCase())){_("This name is already registered!");return}c(!0);try{const g=gr(_r,"registrations");await Bk(g,{name:s.trim(),team:o.trim()||"Free Agent",timestamp:e2(),status:"pending"}),d("Successfully registered! Waiting for admin approval."),i(""),l(""),setTimeout(()=>d(""),5e3)}catch(g){console.error("Registration error:",g),_("Registration failed. Please try again.")}finally{c(!1)}},v=async m=>{if(window.confirm("Are you sure you want to remove this player?"))try{await Uk(gr(_r,`registrations/${m}`))}catch(p){console.error("Error deleting registration:",p)}},w=async m=>{try{await zk(gr(_r,`registrations/${m}`),{status:"approved"})}catch(p){console.error("Error approving registration:",p)}};return u.jsxs("div",{className:"space-y-8 animate-in fade-in duration-500 w-full max-w-5xl mx-auto flex flex-col justify-center mt-2 pb-12",children:[u.jsxs("div",{className:"relative overflow-hidden rounded-[32px] bg-[#0A0D14] border border-[#1E2738]/60 p-8 sm:p-12 text-center shadow-[0_0_50px_rgba(0,0,0,0.4)] flex flex-col items-center",children:[u.jsx("div",{className:"absolute top-0 right-0 w-64 h-64 bg-[#6384FF] opacity-[0.03] blur-[100px] pointer-events-none rounded-full"}),u.jsxs("div",{className:"relative z-10",children:[u.jsx("div",{className:"inline-flex items-center justify-center p-3 rounded-2xl bg-[#131C32] border border-[#2D3A5D]/50 shadow-inner mb-6",children:u.jsx(rl,{className:"w-8 h-8 text-[#A5B4FC] drop-shadow-[0_0_15px_rgba(165,180,252,0.5)]"})}),u.jsx("h1",{className:"text-3xl sm:text-5xl font-black tracking-tighter mb-4 text-[#F8FAFC] drop-shadow-md uppercase",children:"Season Registration"}),u.jsx("p",{className:"text-[#8B9BB4] font-medium tracking-wide max-w-lg mx-auto",children:"Secure your spot in the upcoming tournament. Only the best compete here."})]})]}),u.jsxs("div",{className:"grid grid-cols-1 lg:grid-cols-2 gap-8",children:[u.jsxs("div",{className:"bg-[#0A0D14] rounded-[24px] border border-[#1E2738]/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] relative overflow-hidden h-fit",children:[u.jsx("div",{className:"absolute top-1/2 left-[-100px] w-64 h-64 bg-[#C084FC] opacity-[0.02] blur-[80px] pointer-events-none rounded-full"}),u.jsxs("h2",{className:"text-2xl font-black text-[#E2E8F0] tracking-wide mb-6 flex items-center gap-2 relative z-10",children:[u.jsx(v2,{className:"w-5 h-5 text-[#C084FC]"})," Join the Roster"]}),h&&u.jsxs("div",{className:"mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-3 text-emerald-400 font-medium relative z-10",children:[u.jsx($r,{className:"w-5 h-5 flex-shrink-0"}),u.jsx("p",{className:"text-sm",children:h})]}),f&&u.jsxs("div",{className:"mb-6 p-4 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center gap-3 text-rose-400 font-medium relative z-10",children:[u.jsx(rp,{className:"w-5 h-5 flex-shrink-0"}),u.jsx("p",{className:"text-sm",children:f})]}),e?u.jsxs("form",{onSubmit:y,className:"space-y-5 relative z-10",children:[u.jsxs("div",{className:"space-y-1.5",children:[u.jsxs("label",{className:"text-xs font-bold text-[#8B9BB4] uppercase tracking-wider ml-1",children:["In-Game Name ",u.jsx("span",{className:"text-rose-400",children:"*"})]}),u.jsx("input",{type:"text",value:s,onChange:m=>i(m.target.value),placeholder:"e.g. MasterPlayer88",className:"w-full bg-[#131A2B] border border-[#222B3D] text-[#E2E8F0] px-4 py-3.5 rounded-xl outline-none focus:border-[#6384FF]/50 focus:ring-1 focus:ring-[#6384FF]/50 transition-all font-medium placeholder:text-[#475569]"})]}),u.jsxs("div",{className:"space-y-1.5",children:[u.jsx("label",{className:"text-xs font-bold text-[#8B9BB4] uppercase tracking-wider ml-1",children:"Team / Clan (Optional)"}),u.jsx("input",{type:"text",value:o,onChange:m=>l(m.target.value),placeholder:"e.g. Team Liquid",className:"w-full bg-[#131A2B] border border-[#222B3D] text-[#E2E8F0] px-4 py-3.5 rounded-xl outline-none focus:border-[#6384FF]/50 focus:ring-1 focus:ring-[#6384FF]/50 transition-all font-medium placeholder:text-[#475569]"})]}),u.jsx("button",{type:"submit",disabled:a,className:`w-full py-4 px-6 rounded-xl font-black tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(99,132,255,0.15)] mt-4 ${a?"bg-[#1E2738] text-[#475569] cursor-not-allowed":"bg-gradient-to-r from-[#8B78FF] to-[#6384FF] hover:from-[#7863FF] hover:to-[#4A6BFF] text-white border border-[#8B78FF]/30 hover:shadow-[0_0_30px_rgba(99,132,255,0.3)]"}`,children:a?"Registering...":"Register Now"})]}):u.jsxs("div",{className:"flex flex-col items-center justify-center p-8 border-2 border-dashed border-[#1E2738]/50 rounded-xl bg-[#0a0b10]/50 relative z-10 text-center h-[280px]",children:[u.jsx("div",{className:"w-16 h-16 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 border border-rose-500/20",children:u.jsx(rp,{className:"w-8 h-8 text-rose-400"})}),u.jsx("h3",{className:"text-[#E2E8F0] font-black text-xl mb-2 tracking-wide",children:"Registration Closed"}),u.jsx("p",{className:"text-[#8B9BB4] font-medium text-sm",children:"We are not accepting any new players at this time. Please check back later for the next season!"})]})]}),u.jsxs("div",{className:"bg-[#0A0D14] rounded-[24px] border border-[#1E2738]/60 p-6 sm:p-8 shadow-[0_0_40px_rgba(0,0,0,0.3)] flex flex-col h-[500px]",children:[u.jsx("div",{className:"flex justify-between items-center mb-6",children:u.jsxs("h2",{className:"text-xl font-black text-[#E2E8F0] tracking-wide relative flex items-center gap-3",children:["Registered Players",u.jsx("span",{className:"bg-[#131C32] border border-[#2D3A5D]/50 text-[#A5B4FC] text-xs py-1 px-2.5 rounded-full font-bold",children:n.length})]})}),u.jsx("div",{className:"flex-1 overflow-y-auto no-scrollbar pr-2 space-y-3",children:n.length===0?u.jsxs("div",{className:"h-full flex flex-col items-center justify-center text-center p-6 border-2 border-dashed border-[#1E2738] rounded-xl",children:[u.jsx("div",{className:"w-12 h-12 rounded-full bg-[#131A2B] flex items-center justify-center mb-3",children:u.jsx(rl,{className:"w-5 h-5 text-[#475569]"})}),u.jsx("p",{className:"text-[#8B9BB4] font-medium",children:"No players registered yet."}),u.jsx("p",{className:"text-[#475569] text-xs mt-1",children:"Be the first to join the tournament."})]}):n.map((m,p)=>u.jsxs("div",{className:"group flex items-center justify-between p-4 rounded-xl bg-[#131A2B] border border-[#222B3D] hover:border-[#2D3A5D] hover:bg-[#18233C] transition-all",children:[u.jsxs("div",{className:"flex items-center gap-4",children:[u.jsx("div",{className:"w-10 h-10 rounded-full bg-[#0A0D14] border border-[#2D3A5D]/50 flex items-center justify-center text-[#A5B4FC] font-black text-sm shadow-inner overflow-hidden",children:m.name.substring(0,2).toUpperCase()}),u.jsxs("div",{children:[u.jsx("p",{className:"text-[#F8FAFC] font-bold text-sm tracking-wide group-hover:text-[#A5B4FC] transition-colors",children:m.name}),u.jsx("p",{className:"text-[#475569] text-xs font-semibold",children:m.team})]})]}),u.jsxs("div",{className:"flex items-center gap-3",children:[u.jsx("span",{className:`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded border ${m.status==="approved"?"bg-emerald-500/10 border-emerald-500/20 text-emerald-400":"bg-[#F59E0B]/10 border-[#F59E0B]/20 text-[#F59E0B]"}`,children:m.status||"Pending"}),t&&u.jsxs(u.Fragment,{children:[m.status!=="approved"&&u.jsx("button",{onClick:()=>w(m.id),className:"text-emerald-400/50 hover:text-emerald-400 hover:bg-emerald-400/10 p-1.5 rounded transition-all opacity-0 group-hover:opacity-100",title:"Approve",children:u.jsx(c2,{className:"w-4 h-4"})}),u.jsx("button",{onClick:()=>v(m.id),className:"text-rose-400/50 hover:text-rose-400 hover:bg-rose-400/10 p-1.5 rounded transition-all opacity-0 group-hover:opacity-100",title:"Remove",children:u.jsx(x2,{className:"w-4 h-4"})})]})]})]},m.id))})]})]})]})}function sN(){const[t,e]=j.useState("home"),[n,r]=j.useState(null),[s,i]=j.useState(!1),[o,l]=j.useState(!0),[a,c]=j.useState(()=>localStorage.getItem("theme")==="light");j.useEffect(()=>{a?(document.documentElement.classList.add("light-theme"),localStorage.setItem("theme","light")):(document.documentElement.classList.remove("light-theme"),localStorage.setItem("theme","dark"))},[a]),j.useEffect(()=>{(async()=>{await r2();const _=gr(_r,"tournament"),y=Ev(_,v=>{const w=v.val();w?r(w):(nl(_,Vu),r(Vu)),l(!1)});return()=>y()})()},[]);const h=async f=>{const _=gr(_r,"tournament");try{await nl(_,f)}catch(y){console.error("Error updating document: ",y)}};if(o||!n)return u.jsxs("div",{className:"min-h-screen bg-slate-950 flex items-center justify-center text-emerald-400 flex-col gap-4",children:[u.jsx("svg",{xmlns:"http://www.w3.org/2000/svg",width:"48",height:"48",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",className:"w-12 h-12 animate-spin",children:u.jsx("circle",{cx:"12",cy:"12",r:"10",strokeDasharray:"6 4"})}),u.jsx("p",{className:"font-mono uppercase tracking-widest text-sm",children:"Loading Tournament Data..."})]});const d=l2(n.players,n.matches);return u.jsxs("div",{className:"min-h-screen font-sans selection:bg-blue-500/30",children:[u.jsx(S2,{currentPage:t,setCurrentPage:e,isAdmin:s,isLightMode:a,setIsLightMode:c}),u.jsxs("main",{className:"max-w-6xl mx-auto p-4 md:p-6 pb-24",children:[t==="home"&&u.jsx(C2,{data:n,setCurrentPage:e}),t==="register"&&u.jsx(rN,{isAdmin:s,isOpen:n.settings.registrationOpen}),t==="standings"&&u.jsx(X2,{standingsData:d,bracketData:n.bracket}),t==="matches"&&u.jsx(J2,{data:n,updateData:h,isAdmin:s}),t==="rules"&&u.jsx(Z2,{}),t==="knockout"&&s&&u.jsx(tN,{data:n,updateData:h,standingsData:d,isAdmin:s}),t==="admin"&&u.jsx(nN,{data:n,updateData:h,isAdmin:s,setIsAdmin:i})]})]})}Ia.createRoot(document.getElementById("root")).render(u.jsx(Gv.StrictMode,{children:u.jsx(sN,{})}));
