(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{489:function(t,e,r){"use strict";r.r(e);var o={name:"StoreBanner"},c=r(41),n=r(75),l=r.n(n),d=r(151),component=Object(c.a)(o,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("v-img",{staticClass:"rounded-xl",attrs:{"lazy-src":"https://picsum.photos/id/11/10/6","max-height":"300","max-width":"100%",src:"https://via.placeholder.com/1200"}})],1)}),[],!1,null,"5b5d2358",null);e.default=component.exports;l()(component,{VImg:d.a})},490:function(t,e,r){"use strict";r.r(e);var o=r(8),c=(r(126),{name:"StoreCategories",data:function(){return{stores:[],comments:null,storesLoading:!1,uid:"RGfjW6W4YMUgClckhJE5PccAtSF3",sorting:[{text:"Sort",image:"https://via.placeholder.com/150"},{text:"Product type",image:"https://via.placeholder.com/150"},{text:"Location",image:"https://via.placeholder.com/150"},{text:"Price Range",image:"https://via.placeholder.com/150"},{text:"Mobile",image:"https://via.placeholder.com/150"},{text:"Specials",image:"https://via.placeholder.com/150"}],newStores:[{text:"Store 1",image:"https://via.placeholder.com/150"},{text:"Store 2",image:"https://via.placeholder.com/150"},{text:"Store 3",image:"https://via.placeholder.com/150"},{text:"Store 4",image:"https://via.placeholder.com/150"},{text:"Store 5",image:"https://via.placeholder.com/150"},{text:"Store 6",image:"https://via.placeholder.com/150"}],fav:!1}},computed:{user:function(){return this.$store.getters.user},test:function(){return this.stores.filter((function(t){t.storeProfile}))}},methods:{viewStore:function(t){this.$router.push({name:"store-front-id",params:{id:t.storeId}})}},created:function(){var t=this;o.database().ref("users").once("value").then((function(data){t.storesLoading=!0;var e=[],r=[],o=data.val();for(var c in o)r.push({data:o[c]});var n=r.filter((function(t){return t.data.storeProfile})).filter((function(t){return void 0!==t.data.storeProfile.storeBanner}));for(var l in n)e.push({storeBanner:n[l].data.storeProfile.storeBanner,storeBio:n[l].data.storeProfile.storeBio,storeEmail:n[l].data.storeProfile.storeEmail,storeId:n[l].data.storeProfile.storeId,storeLocation:n[l].data.storeProfile.storeLocation,storeLogo:n[l].data.storeProfile.storeLogo,storeName:n[l].data.storeProfile.storeName,storeOwnerImage:n[l].data.storeProfile.storeOwnerImage,storePhoneNumber:n[l].data.storeProfile.storePhoneNumber});t.stores=e,t.storesLoading=!1})).catch((function(t){console.log("🙈",t)}))}}),n=r(41),l=r(75),d=r.n(l),v=r(117),m=r(185),f=r(124),h=r(98),_=r(432),component=Object(n.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"categories"},[r("div",{staticClass:"display-1"},[t._v("Popular Stores")]),t._v(" "),r("div",{staticClass:"categories__sort-card"},t._l(t.sorting,(function(e,o){return r("div",{key:o,staticClass:"categories__sort rounded-lg"},[r("div",{staticClass:"categories__sort-text"},[t._v("\n                "+t._s(e.text)+"\n            ")])])})),0),t._v(" "),t.storesLoading?r("div",[r("p",[t._v("Loading...")])]):t._e(),t._v(" "),t.storesLoading?t._e():r("div",{staticClass:"categories__popular"},t._l(t.stores,(function(e,o){return r("div",{key:o},[r("v-card",{staticClass:"rounded-xl mb-3",staticStyle:{width:"100%"},attrs:{outlined:"",elevation:"0",ripple:!1}},[r("div",{staticClass:"services__left-card d-flex flex-no-wrap justify-space-between"},[r("div",{staticClass:"services__left-card-img-container"},[r("img",{staticClass:"services__left-service-img",attrs:{src:e.storeBanner,alt:""}})]),t._v(" "),r("div",{staticClass:"services__left-card-info"},[r("v-card-title",{staticClass:"headline"},[t._v(t._s(t._f("capitalize")(e.storeName)))]),t._v(" "),r("v-card-subtitle",[t._v(t._s(t._f("truncate")(e.storeBio,50,"...")))]),t._v(" "),r("v-card-text",{staticClass:"display-1 text--primary services__left-card-price"},[r("v-btn",{attrs:{elevation:"0"},on:{click:function(r){return t.viewStore(e)}}},[t._v("Visit Store")])],1),t._v(" "),r("v-card-actions",[r("v-spacer"),t._v(" "),r("v-btn",{class:t.fav?"red--text":"",attrs:{icon:""},on:{click:function(e){t.fav=!t.fav}}},[r("v-icon",[t._v("mdi-heart")])],1)],1)],1)])])],1)})),0)])}),[],!1,null,"dd399d7c",null);e.default=component.exports;d()(component,{VBtn:v.a,VCard:m.a,VCardActions:f.a,VCardSubtitle:f.b,VCardText:f.c,VCardTitle:f.d,VIcon:h.a,VSpacer:_.a})},568:function(t,e,r){"use strict";r.r(e);var o=r(489),c={name:"SideBar",data:function(){return{categories:[{text:"Home",image:"https://via.placeholder.com/150"},{text:"Top Stores",image:"https://via.placeholder.com/150"},{text:"New Stores",image:"https://via.placeholder.com/150"},{text:"Services",image:"https://via.placeholder.com/150"},{text:"Mobile Services",image:"https://via.placeholder.com/150"},{text:"Specials",image:"https://via.placeholder.com/150"}]}}},n=r(41),l=Object(n.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"side-bar"},t._l(t.categories,(function(e,o){return r("div",{key:o,staticClass:"side-bar__categories rounded-lg"},[r("div",{},[t._v(t._s(e.text))])])})),0)}),[],!1,null,"5bf46aa8",null).exports,d=r(490),v={data:function(){return{icons:["mdi-facebook","mdi-twitter","mdi-linkedin","mdi-instagram"]}},components:{StoreBanner:o.default,SideBar:l,StoreCategories:d.default}},m=Object(n.a)(v,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"store margin"},[e("div",{staticClass:"container"},[e("StoreBanner"),this._v(" "),e("div",{staticStyle:{width:"100%"}},[e("div",{staticClass:"store__layout"},[e("StoreCategories")],1)])],1)])}),[],!1,null,"4443c024",null);e.default=m.exports;installComponents(m,{StoreBanner:r(489).default,StoreCategories:r(490).default})}}]);