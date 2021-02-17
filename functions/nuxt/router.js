import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _6736fb5e = () => interopDefault(import('../pages/dashboard.vue' /* webpackChunkName: "pages/dashboard" */))
const _31346ec3 = () => interopDefault(import('../pages/password-reset.vue' /* webpackChunkName: "pages/password-reset" */))
const _5c3de26e = () => interopDefault(import('../pages/settings.vue' /* webpackChunkName: "pages/settings" */))
const _2188f648 = () => interopDefault(import('../pages/signin.vue' /* webpackChunkName: "pages/signin" */))
const _361f4cbe = () => interopDefault(import('../pages/signup.vue' /* webpackChunkName: "pages/signup" */))
const _48018300 = () => interopDefault(import('../pages/signup-admin.vue' /* webpackChunkName: "pages/signup-admin" */))
const _4ebd042b = () => interopDefault(import('../pages/store.vue' /* webpackChunkName: "pages/store" */))
const _486a147e = () => interopDefault(import('../pages/verification.vue' /* webpackChunkName: "pages/verification" */))
const _5949f1d0 = () => interopDefault(import('../pages/inbox/admin.vue' /* webpackChunkName: "pages/inbox/admin" */))
const _1eb022e9 = () => interopDefault(import('../pages/playground/landing.vue' /* webpackChunkName: "pages/playground/landing" */))
const _11b95ed9 = () => interopDefault(import('../pages/playground/playground.vue' /* webpackChunkName: "pages/playground/playground" */))
const _1fd5850c = () => interopDefault(import('../pages/service/bookings.vue' /* webpackChunkName: "pages/service/bookings" */))
const _2a2e73b8 = () => interopDefault(import('../pages/service/create-service.vue' /* webpackChunkName: "pages/service/create-service" */))
const _1ba3a8af = () => interopDefault(import('../pages/customer/_id.vue' /* webpackChunkName: "pages/customer/_id" */))
const _e9e80e0a = () => interopDefault(import('../pages/inbox/_id.vue' /* webpackChunkName: "pages/inbox/_id" */))
const _4e208cac = () => interopDefault(import('../pages/service/_id.vue' /* webpackChunkName: "pages/service/_id" */))
const _42ca7f9c = () => interopDefault(import('../pages/store-front/_id.vue' /* webpackChunkName: "pages/store-front/_id" */))
const _89c84512 = () => interopDefault(import('../pages/update-category/_id.vue' /* webpackChunkName: "pages/update-category/_id" */))
const _0637e5fc = () => interopDefault(import('../pages/update-service/_id.vue' /* webpackChunkName: "pages/update-service/_id" */))
const _8c7c58c8 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/dashboard",
    component: _6736fb5e,
    name: "dashboard"
  }, {
    path: "/password-reset",
    component: _31346ec3,
    name: "password-reset"
  }, {
    path: "/settings",
    component: _5c3de26e,
    name: "settings"
  }, {
    path: "/signin",
    component: _2188f648,
    name: "signin"
  }, {
    path: "/signup",
    component: _361f4cbe,
    name: "signup"
  }, {
    path: "/signup-admin",
    component: _48018300,
    name: "signup-admin"
  }, {
    path: "/store",
    component: _4ebd042b,
    name: "store"
  }, {
    path: "/verification",
    component: _486a147e,
    name: "verification"
  }, {
    path: "/inbox/admin",
    component: _5949f1d0,
    name: "inbox-admin"
  }, {
    path: "/playground/landing",
    component: _1eb022e9,
    name: "playground-landing"
  }, {
    path: "/playground/playground",
    component: _11b95ed9,
    name: "playground-playground"
  }, {
    path: "/service/bookings",
    component: _1fd5850c,
    name: "service-bookings"
  }, {
    path: "/service/create-service",
    component: _2a2e73b8,
    name: "service-create-service"
  }, {
    path: "/customer/:id?",
    component: _1ba3a8af,
    name: "customer-id"
  }, {
    path: "/inbox/:id?",
    component: _e9e80e0a,
    name: "inbox-id"
  }, {
    path: "/service/:id?",
    component: _4e208cac,
    name: "service-id"
  }, {
    path: "/store-front/:id?",
    component: _42ca7f9c,
    name: "store-front-id"
  }, {
    path: "/update-category/:id?",
    component: _89c84512,
    name: "update-category-id"
  }, {
    path: "/update-service/:id?",
    component: _0637e5fc,
    name: "update-service-id"
  }, {
    path: "/",
    component: _8c7c58c8,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
