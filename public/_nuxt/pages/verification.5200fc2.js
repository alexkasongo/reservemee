(window.webpackJsonp=window.webpackJsonp||[]).push([[28],{576:function(e,t,r){"use strict";r.r(t);r(11),r(9),r(6),r(4),r(10),r(45);var n=r(13),o=r(1),c=r(8),l=(r(104),r(54));function d(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,r)}return t}function v(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f={data:function(){return{email:"",notification:""}},computed:v({},Object(l.c)({verification:"verificationSent",loading:"loaders/loading",errors:"signupError",userLoaded:"user",userId:"user"})),methods:v(v({},Object(l.b)(["verifyEmail","loadUserId","user"])),{},{onSubmit:function(){var e={email:this.userLoaded.email};this.verifyEmail(e).then((function(e){}))},signout:function(){var e=this;return Object(n.a)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,c.auth().signOut().then((function(t){e.user="",window.localStorage.removeItem("email"),window.localStorage.removeItem("vuex")}));case 2:e.$router.push("/signin");case 3:case"end":return t.stop()}}),t)})))()},goToDashboard:function(){this.$router.push("/dashboard")}}),mounted:function(){var e=this;this.email=this.userLoaded.email,c.auth().onAuthStateChanged((function(t){t?e.user=t:(window.localStorage.removeItem("vuex"),localStorage.clear())}))}},m=r(41),h=r(75),y=r.n(h),_=r(117),w=r(185),O=r(77),component=Object(m.a)(f,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"container"},[e.userLoaded.emailVerified?r("div",{staticClass:"w-100 mt-2"},[r("div",{staticClass:"card"},[r("div",{staticClass:"card-body"},[r("h3",[e._v("Your email address is verified.")]),e._v(" "),r("p",[e._v("Verified: "+e._s(e.userLoaded.emailVerified))]),e._v(" "),r("button",{staticClass:"btn btn-block btn-primary",attrs:{type:"button"},on:{click:e.goToDashboard}},[e._v("\n                    Go to Dashboard\n                ")])])])]):e._e(),e._v(" "),e.verification?r("div",{staticClass:"w-100 mt-2"},[r("div",{staticClass:"card"},[r("div",{staticClass:"card-body"},[r("h3",[e._v("A verification email has been sent to your mailbox")]),e._v(" "),r("p",[e._v("Verify your email address before signing in.")]),e._v(" "),r("v-btn",{attrs:{type:"button",color:"teal darker-1",dark:""},on:{click:e.signout}},[e._v("\n                    Signin\n                ")])],1)])]):e._e(),e._v(" "),e.loading?e._e():r("div",{staticClass:"d-flex flex-row justify-content-center"},[e.userLoaded.emailVerified?e._e():r("div",{staticClass:"w-100 mt-2"},[r("div",{staticClass:"display-1 p-3"},[e._v("Verify Email")]),e._v(" "),r("v-card",{staticClass:"card-body"},[r("form",{on:{submit:function(t){return t.preventDefault(),e.onSubmit(t)}}},[r("div",{staticClass:"form-group"},[r("v-text-field",{attrs:{type:"text",placeholder:"Email",required:""},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})],1),e._v(" "),e.errors?r("div",{staticClass:"form-group text-muted"},[e._v("\n                        "+e._s(e.errors.message)+"\n                    ")]):e._e(),e._v(" "),r("v-btn",{attrs:{type:"submit",color:"teal darker-1",dark:""}},[e._v("Submit")])],1)])],1)])])}),[],!1,null,null,null);t.default=component.exports;y()(component,{VBtn:_.a,VCard:w.a,VTextField:O.a})}}]);