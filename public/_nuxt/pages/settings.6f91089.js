(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{466:function(t,e,n){var content=n(523);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(15).default)("8d3baab8",content,!0,{sourceMap:!1})},522:function(t,e,n){"use strict";var o=n(466);n.n(o).a},523:function(t,e,n){(e=n(14)(!1)).push([t.i,".margin[data-v-0ffb4750]{margin-top:64px}.settings__right-row[data-v-0ffb4750]{height:100%}",""]),t.exports=e},572:function(t,e,n){"use strict";n.r(e);var o=n(8),r=(n(104),{data:function(){return{user:[],role:[],drawer:null,items:null,mini:!1,source:"https://via.placeholder.com/500",selected:""}},methods:{onLinkClick:function(t){this.selected=t.text}},computed:{validatedItems:function(){return this.role.admin?[{icon:"mdi-account",text:"Profile Information"},{icon:"mdi-cart",text:"Store Settings"},{divider:!0},{icon:"mdi-shield",text:"Security"},{divider:!0},{icon:"mdi-bell",text:"Notifications"},{divider:!0},{icon:"mdi-credit-card",text:"Billing"},{icon:"mdi-cog",text:"Account Settings"},{icon:"mdi-help-circle",text:"Help"}]:this.role.customer?[{icon:"mdi-account",text:"Profile Information"},{divider:!0},{icon:"mdi-shield",text:"Security"},{divider:!0},{icon:"mdi-bell",text:"Notifications"},{divider:!0},{icon:"mdi-credit-card",text:"Billing"},{icon:"mdi-cog",text:"Account Settings"},{icon:"mdi-help-circle",text:"Help"}]:void 0},viewPort:function(){var t,e=this,n=function(){t=window.innerWidth||document.documentElement.clientWidth},o=function(){e.mini=!(t>640)};n(),o(),window.addEventListener("resize",(function(){n(),o()}),!1)}},mounted:function(){var t=this;o.auth().onAuthStateChanged((function(e){e&&(o.auth().currentUser.getIdTokenResult().then((function(e){e&&(t.role=e.claims,console.log(t.validatedItems),t.items=t.validatedItems)})),t.user=e)})),this.viewPort}}),c=(n(522),n(41)),l=n(75),d=n.n(l),v=n(430),m=n(428),f=n(446),h=n(179),_=n(98),w=n(151),x=n(180),S=n(116),I=n(178),V=n(181),k=n(53),C=n(482),y=n(431),L=n(429),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"settings"},[n("v-app",[n("v-app",[n("v-navigation-drawer",{staticClass:"margin",attrs:{app:"",permanent:"","mini-variant":t.mini},model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},[n("v-list-item",{staticClass:"px-2"},[t.user.photoURL?n("v-list-item-avatar",[n("v-img",{attrs:{src:t.user.photoURL}})],1):n("v-list-item-avatar",[n("v-img",{attrs:{src:"https://via.placeholder.com/250"}})],1),t._v(" "),n("v-list-item-title",[t._v(t._s(t.user.displayName))])],1),t._v(" "),n("v-list",{attrs:{dense:""}},[t._l(t.items,(function(e,i){return[e.divider?n("v-divider",{key:i,staticClass:"my-4",attrs:{dark:""}}):n("v-list-item",{key:i,attrs:{link:""},on:{click:function(n){return t.onLinkClick(e)}}},[n("v-list-item-action",[n("v-icon",{attrs:{color:"teal darker-1"}},[t._v(t._s(e.icon))])],1),t._v(" "),n("v-list-item-content",[n("v-list-item-title",{staticClass:"grey--text"},[t._v("\n                                    "+t._s(e.text)+"\n                                ")])],1)],1)]}))],2)],1),t._v(" "),n("v-main",[n("v-container",{staticClass:"fill-height",attrs:{fluid:""}},[n("v-row",{staticClass:"settings__right-row"},[n("v-col",["Profile Information"===this.selected||""===this.selected?n("ProfileInformation"):t._e(),t._v(" "),"Store Settings"===this.selected&&t.role.admin?n("StoreSettings"):t._e(),t._v(" "),"Security"===this.selected?n("Security"):t._e(),t._v(" "),"Notifications"===this.selected?n("Notifications"):t._e(),t._v(" "),"Billing"===this.selected?n("Billing"):t._e(),t._v(" "),"Account Settings"===this.selected?n("AccountSettings"):t._e()],1)],1)],1)],1)],1)],1)],1)}),[],!1,null,"0ffb4750",null);e.default=component.exports;d()(component,{ProfileInformation:n(483).default,StoreSettings:n(484).default,Security:n(485).default,Notifications:n(486).default,Billing:n(487).default,AccountSettings:n(488).default}),d()(component,{VApp:v.a,VCol:m.a,VContainer:f.a,VDivider:h.a,VIcon:_.a,VImg:w.a,VList:x.a,VListItem:S.a,VListItemAction:I.a,VListItemAvatar:V.a,VListItemContent:k.a,VListItemTitle:k.c,VMain:C.a,VNavigationDrawer:y.a,VRow:L.a})}}]);