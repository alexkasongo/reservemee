(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{439:function(t,e,n){"use strict";n.d(e,"a",(function(){return c}));var o=n(61),r=n(0),c=Object(r.i)("v-toolbar__title"),l=Object(r.i)("v-toolbar__items");o.a},446:function(t,e,n){"use strict";n(76),n(6),n(4),n(10),n(250),n(192);var o=n(2);var r,c=n(28);e.a=(r="container",o.a.extend({name:"v-".concat(r),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,e){var n=e.props,data=e.data,o=e.children;data.staticClass="".concat(r," ").concat(data.staticClass||"").trim();var c=data.attrs;if(c){data.attrs={};var l=Object.keys(c).filter((function(t){if("slot"===t)return!1;var e=c[t];return t.startsWith("data-")?(data.attrs[t]=e,!1):e||"string"==typeof e}));l.length&&(data.staticClass+=" ".concat(l.join(" ")))}return n.id&&(data.domProps=data.domProps||{},data.domProps.id=n.id),t(n.tag,data,o)}})).extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var n,o=e.props,data=e.data,r=e.children,l=data.attrs;return l&&(data.attrs={},n=Object.keys(l).filter((function(t){if("slot"===t)return!1;var e=l[t];return t.startsWith("data-")?(data.attrs[t]=e,!1):e||"string"==typeof e}))),o.id&&(data.domProps=data.domProps||{},data.domProps.id=o.id),t(o.tag,Object(c.a)(data,{staticClass:"container",class:Array({"container--fluid":o.fluid}).concat(n||[])}),r)}})},463:function(t,e,n){var content=n(464);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(15).default)("2065bca8",content,!0,{sourceMap:!1})},464:function(t,e,n){(e=n(14)(!1)).push([t.i,".v-dialog{border-radius:4px;margin:24px;overflow-y:auto;pointer-events:auto;transition:.3s cubic-bezier(.25,.8,.25,1);width:100%;z-index:inherit;box-shadow:0 11px 15px -7px rgba(0,0,0,.2),0 24px 38px 3px rgba(0,0,0,.14),0 9px 46px 8px rgba(0,0,0,.12)}.v-dialog:not(.v-dialog--fullscreen){max-height:90%}.v-dialog>*{width:100%}.v-dialog>.v-card>.v-card__title{font-size:1.25rem;font-weight:500;letter-spacing:.0125em;padding:16px 24px 10px}.v-dialog>.v-card>.v-card__subtitle,.v-dialog>.v-card>.v-card__text{padding:0 24px 20px}.v-dialog__content{align-items:center;display:flex;height:100%;justify-content:center;left:0;pointer-events:none;position:fixed;top:0;transition:.2s cubic-bezier(.25,.8,.25,1),z-index 1ms;width:100%;z-index:6;outline:none}.v-dialog__container{display:none}.v-dialog__container--attached{display:inline}.v-dialog--animated{-webkit-animation-duration:.15s;animation-duration:.15s;-webkit-animation-name:animate-dialog;animation-name:animate-dialog;-webkit-animation-timing-function:cubic-bezier(.25,.8,.25,1);animation-timing-function:cubic-bezier(.25,.8,.25,1)}.v-dialog--fullscreen{border-radius:0;margin:0;height:100%;position:fixed;overflow-y:auto;top:0;left:0}.v-dialog--fullscreen>.v-card{min-height:100%;min-width:100%;margin:0!important;padding:0!important}.v-dialog--scrollable,.v-dialog--scrollable>form{display:flex}.v-dialog--scrollable>.v-card,.v-dialog--scrollable>form>.v-card{display:flex;flex:1 1 100%;flex-direction:column;max-height:100%;max-width:100%}.v-dialog--scrollable>.v-card>.v-card__actions,.v-dialog--scrollable>.v-card>.v-card__title,.v-dialog--scrollable>form>.v-card>.v-card__actions,.v-dialog--scrollable>form>.v-card>.v-card__title{flex:0 0 auto}.v-dialog--scrollable>.v-card>.v-card__text,.v-dialog--scrollable>form>.v-card>.v-card__text{-webkit-backface-visibility:hidden;backface-visibility:hidden;flex:1 1 auto;overflow-y:auto}@-webkit-keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}@keyframes animate-dialog{0%{transform:scale(1)}50%{transform:scale(1.03)}to{transform:scale(1)}}",""]),t.exports=e},517:function(t,e,n){"use strict";n(11),n(9),n(6),n(4),n(10);var o=n(23),r=(n(62),n(27),n(31),n(1)),c=(n(17),n(463),n(409)),l=n(82),d=n(92),v=n(141),m=n(201),h=n(200),f=n(199),x=n(24),y=n(91),_=n(3),k=n(7),w=n(0);function O(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function I(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var C=Object(_.a)(l.a,d.a,v.a,m.a,h.a,f.a,x.a);e.a=C.extend({name:"v-dialog",directives:{ClickOutside:y.a},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200}},computed:{classes:function(){var t;return t={},Object(r.a)(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(r.a)(t,"v-dialog--active",this.isActive),Object(r.a)(t,"v-dialog--persistent",this.persistent),Object(r.a)(t,"v-dialog--fullscreen",this.fullscreen),Object(r.a)(t,"v-dialog--scrollable",this.scrollable),Object(r.a)(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(k.e)("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!=typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):m.a.options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$refs.content.focus(),t.bind()}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===w.y.esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var n=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),r=Object(o.a)(n).find((function(t){return!t.hasAttribute("disabled")}));r&&r.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(c.a,{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:I({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var content=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[content]):content},genInnerContent:function(){var data={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(data.style=I(I({},data.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(w.g)(this.maxWidth),width:"auto"===this.width?void 0:Object(w.g)(this.width)})),this.$createElement("div",data,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},580:function(t,e,n){"use strict";n.r(e);var o={data:function(){return{dialog:!1,dialogDelete:!1,headers:[{text:"Service",align:"start",sortable:!1,value:"name"},{text:"Booking Date",value:"date"},{text:"Booking Time",value:"time"},{text:"Price",value:"price"},{text:"Actions",value:"actions",sortable:!1}],desserts:[],editedIndex:-1,editedItem:{name:"",calories:0,date:0,time:0,price:0},defaultItem:{name:"",calories:0,date:0,time:0,price:0}}},computed:{formTitle:function(){return-1===this.editedIndex?"New Item":"Edit Item"}},watch:{dialog:function(t){t||this.close()},dialogDelete:function(t){t||this.closeDelete()}},created:function(){this.initialize()},methods:{initialize:function(){this.desserts=[{name:"Service one",calories:159,date:"12-07-20",time:"07:00",price:"$15"},{name:"Service two",calories:237,date:"12-07-20",time:"09:00",price:"$25"},{name:"Service three",calories:262,date:"12-07-20",time:"13:00",price:"$45"},{name:"Service four",calories:305,date:"12-07-20",time:"15:00",price:"$15"},{name:"Service five",calories:356,date:"12-07-20",time:"09:00",price:"$15"},{name:"Service six",calories:375,date:"12-07-20",time:"11:00",price:"$20"},{name:"Service six",calories:375,date:"12-07-20",time:"08:00",price:"$25"}]},editItem:function(t){this.editedIndex=this.desserts.indexOf(t),this.editedItem=Object.assign({},t),this.dialog=!0},deleteItem:function(t){this.editedIndex=this.desserts.indexOf(t),this.editedItem=Object.assign({},t),this.dialogDelete=!0},deleteItemConfirm:function(){this.desserts.splice(this.editedIndex,1),this.closeDelete()},close:function(){var t=this;this.dialog=!1,this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}))},closeDelete:function(){var t=this;this.dialogDelete=!1,this.$nextTick((function(){t.editedItem=Object.assign({},t.defaultItem),t.editedIndex=-1}))},save:function(){this.editedIndex>-1?Object.assign(this.desserts[this.editedIndex],this.editedItem):this.desserts.push(this.editedItem),this.close()}}},r=n(41),c=n(75),l=n.n(c),d=n(117),v=n(185),m=n(124),h=n(428),f=n(446),x=n(434),y=n(517),_=n(179),k=n(98),w=n(429),O=n(432),I=n(77),C=n(61),j=n(439),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("v-data-table",{staticClass:"elevation-1",attrs:{headers:t.headers,items:t.desserts,"sort-by":"calories"},scopedSlots:t._u([{key:"top",fn:function(){return[n("v-toolbar",{attrs:{flat:""}},[n("v-toolbar-title",[t._v("Bookings")]),t._v(" "),n("v-divider",{staticClass:"mx-4",attrs:{inset:"",vertical:""}}),t._v(" "),n("v-spacer"),t._v(" "),n("v-dialog",{attrs:{"max-width":"500px"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.on,r=e.attrs;return[n("v-btn",t._g(t._b({staticClass:"mb-2",attrs:{color:"teal darker-1",dark:""}},"v-btn",r,!1),o),[t._v("\n                            New Booking\n                        ")])]}}]),model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[t._v(" "),n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),t._v(" "),n("v-card-text",[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"Dessert name"},model:{value:t.editedItem.name,callback:function(e){t.$set(t.editedItem,"name",e)},expression:"editedItem.name"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"Calories"},model:{value:t.editedItem.calories,callback:function(e){t.$set(t.editedItem,"calories",e)},expression:"editedItem.calories"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"date (g)"},model:{value:t.editedItem.date,callback:function(e){t.$set(t.editedItem,"date",e)},expression:"editedItem.date"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"time (g)"},model:{value:t.editedItem.time,callback:function(e){t.$set(t.editedItem,"time",e)},expression:"editedItem.time"}})],1),t._v(" "),n("v-col",{attrs:{cols:"12",sm:"6",md:"4"}},[n("v-text-field",{attrs:{label:"price (g)"},model:{value:t.editedItem.price,callback:function(e){t.$set(t.editedItem,"price",e)},expression:"editedItem.price"}})],1)],1)],1)],1),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"teal darken-1",text:""},on:{click:t.close}},[t._v("\n                                Cancel\n                            ")]),t._v(" "),n("v-btn",{attrs:{color:"teal darken-1",text:""},on:{click:t.save}},[t._v("\n                                Save\n                            ")])],1)],1)],1),t._v(" "),n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialogDelete,callback:function(e){t.dialogDelete=e},expression:"dialogDelete"}},[n("v-card",[n("v-card-title",{staticClass:"headline"},[t._v("Are you sure you want to delete this\n                            item?")]),t._v(" "),n("v-card-actions",[n("v-spacer"),t._v(" "),n("v-btn",{attrs:{color:"teal darken-1",text:""},on:{click:t.closeDelete}},[t._v("Cancel")]),t._v(" "),n("v-btn",{attrs:{color:"teal darken-1",text:""},on:{click:t.deleteItemConfirm}},[t._v("OK")]),t._v(" "),n("v-spacer")],1)],1)],1)],1)]},proxy:!0},{key:"item.actions",fn:function(e){var o=e.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(o)}}},[t._v("\n                mdi-pencil\n            ")]),t._v(" "),n("v-icon",{attrs:{small:""},on:{click:function(e){return t.deleteItem(o)}}},[t._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){return[n("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v(" Reset ")])]},proxy:!0}],null,!0)})],1)}),[],!1,null,"61ccf284",null);e.default=component.exports;l()(component,{VBtn:d.a,VCard:v.a,VCardActions:m.a,VCardText:m.c,VCardTitle:m.d,VCol:h.a,VContainer:f.a,VDataTable:x.a,VDialog:y.a,VDivider:_.a,VIcon:k.a,VRow:w.a,VSpacer:O.a,VTextField:I.a,VToolbar:C.a,VToolbarTitle:j.a})}}]);