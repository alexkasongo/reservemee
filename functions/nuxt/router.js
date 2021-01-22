import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _07cafb8e = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _1f090c93 = () => interopDefault(import('../pages/password-reset.vue' /* webpackChunkName: "pages/password-reset" */))
const _6bb44899 = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _5b806418 = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _7016ba8e = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _f9fddf60 = () => interopDefault(import('../pages/signup-admin.vue' /* webpackChunkName: "pages/signup-admin" */))
const _778ec74a = () => interopDefault(import('../pages/store.vue' /* webpackChunkName: "pages/store" */))
const _fa6670de = () => interopDefault(import('../pages/verification.vue' /* webpackChunkName: "pages/verification" */))
const _24dea600 = () => interopDefault(import('../pages/inbox/admin.vue' /* webpackChunkName: "pages/inbox/admin" */))
const _9b3d4e8e = () => interopDefault(import('../pages/playground/landing.vue' /* webpackChunkName: "pages/playground/landing" */))
const _2cde9709 = () => interopDefault(import('../pages/playground/playground.vue' /* webpackChunkName: "pages/playground/playground" */))
const _898cb16c = () => interopDefault(import('../pages/service/bookings.vue' /* webpackChunkName: "pages/service/bookings" */))
const _346a93f4 = () => interopDefault(import('../pages/service/create-service.vue' /* webpackChunkName: "pages/service/create-service" */))
const _b8e69078 = () => interopDefault(import('../pages/appointment/_id.vue' /* webpackChunkName: "pages/appointment/_id" */))
const _7ab50b02 = () => interopDefault(import('../pages/customer/_id.vue' /* webpackChunkName: "pages/customer/_id" */))
const _2b9ff92b = () => interopDefault(import('../pages/inbox/_id.vue' /* webpackChunkName: "pages/inbox/_id" */))
const _5f26fcce = () => interopDefault(import('../pages/profile/_id.vue' /* webpackChunkName: "pages/profile/_id" */))
const _b6f7244c = () => interopDefault(import('../pages/service/_id.vue' /* webpackChunkName: "pages/service/_id" */))
const _a94c473c = () => interopDefault(import('../pages/store-front/_id.vue' /* webpackChunkName: "pages/store-front/_id" */))
const _c4dd3cb2 = () => interopDefault(import('../pages/update-category/_id.vue' /* webpackChunkName: "pages/update-category/_id" */))
const _ded57a5c = () => interopDefault(import('../pages/update-service/_id.vue' /* webpackChunkName: "pages/update-service/_id" */))
const _2f3d6bcc = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _07cafb8e,
    name: "dashboard"
  }, {
    path: "/password-reset",
    component: _1f090c93,
    name: "password-reset"
  }, {
    path: "/settings",
    component: _6bb44899,
    name: "settings"
  }, {
    path: "/signin",
    component: _5b806418,
    name: "signin"
  }, {
    path: "/signup",
    component: _7016ba8e,
    name: "signup"
  }, {
    path: "/signup-admin",
    component: _f9fddf60,
    name: "signup-admin"
  }, {
    path: "/store",
    component: _778ec74a,
    name: "store"
  }, {
    path: "/verification",
    component: _fa6670de,
    name: "verification"
  }, {
    path: "/inbox/admin",
    component: _24dea600,
    name: "inbox-admin"
  }, {
    path: "/playground/landing",
    component: _9b3d4e8e,
    name: "playground-landing"
  }, {
    path: "/playground/playground",
    component: _2cde9709,
    name: "playground-playground"
  }, {
    path: "/service/bookings",
    component: _898cb16c,
    name: "service-bookings"
  }, {
    path: "/service/create-service",
    component: _346a93f4,
    name: "service-create-service"
  }, {
    path: "/appointment/:id?",
    component: _b8e69078,
    name: "appointment-id"
  }, {
    path: "/customer/:id?",
    component: _7ab50b02,
    name: "customer-id"
  }, {
    path: "/inbox/:id?",
    component: _2b9ff92b,
    name: "inbox-id"
  }, {
    path: "/profile/:id?",
    component: _5f26fcce,
    name: "profile-id"
  }, {
    path: "/service/:id?",
    component: _b6f7244c,
    name: "service-id"
  }, {
    path: "/store-front/:id?",
    component: _a94c473c,
    name: "store-front-id"
  }, {
    path: "/update-category/:id?",
    component: _c4dd3cb2,
    name: "update-category-id"
  }, {
    path: "/update-service/:id?",
    component: _ded57a5c,
    name: "update-service-id"
  }, {
    path: "/",
    component: _2f3d6bcc,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
