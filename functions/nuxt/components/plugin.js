import Vue from 'vue'

const components = {
  Cart: () => import('../../components/cart/Cart.vue' /* webpackChunkName: "components/cart" */).then(c => c.default || c),
  CartMobile: () => import('../../components/cart/CartMobile.vue' /* webpackChunkName: "components/cart-mobile" */).then(c => c.default || c),
  Messages: () => import('../../components/chat/Messages.vue' /* webpackChunkName: "components/messages" */).then(c => c.default || c),
  StoreMessages: () => import('../../components/chat/StoreMessages.vue' /* webpackChunkName: "components/store-messages" */).then(c => c.default || c),
  HorizontalCard: () => import('../../components/client/HorizontalCard.vue' /* webpackChunkName: "components/horizontal-card" */).then(c => c.default || c),
  Ratings: () => import('../../components/client/Ratings.vue' /* webpackChunkName: "components/ratings" */).then(c => c.default || c),
  SideBar: () => import('../../components/client/SideBar.vue' /* webpackChunkName: "components/side-bar" */).then(c => c.default || c),
  SideBarAd: () => import('../../components/client/SideBarAd.vue' /* webpackChunkName: "components/side-bar-ad" */).then(c => c.default || c),
  StoreBanner: () => import('../../components/client/StoreBanner.vue' /* webpackChunkName: "components/store-banner" */).then(c => c.default || c),
  StoreCategories: () => import('../../components/client/StoreCategories.vue' /* webpackChunkName: "components/store-categories" */).then(c => c.default || c),
  BookingCalendar: () => import('../../components/dashboard/BookingCalendar.vue' /* webpackChunkName: "components/booking-calendar" */).then(c => c.default || c),
  BusinessInfo: () => import('../../components/dashboard/BusinessInfo.vue' /* webpackChunkName: "components/business-info" */).then(c => c.default || c),
  CategoryCheck: () => import('../../components/dashboard/CategoryCheck.vue' /* webpackChunkName: "components/category-check" */).then(c => c.default || c),
  EmailVerified: () => import('../../components/dashboard/EmailVerified.vue' /* webpackChunkName: "components/email-verified" */).then(c => c.default || c),
  EventCalendar: () => import('../../components/dashboard/EventCalendar.vue' /* webpackChunkName: "components/event-calendar" */).then(c => c.default || c),
  Header: () => import('../../components/dashboard/Header.vue' /* webpackChunkName: "components/header" */).then(c => c.default || c),
  ManageServices: () => import('../../components/dashboard/ManageServices.vue' /* webpackChunkName: "components/manage-services" */).then(c => c.default || c),
  Scheduling: () => import('../../components/dashboard/Scheduling.vue' /* webpackChunkName: "components/scheduling" */).then(c => c.default || c),
  StoreSummary: () => import('../../components/dashboard/StoreSummary.vue' /* webpackChunkName: "components/store-summary" */).then(c => c.default || c),
  UpcomingEvents: () => import('../../components/dashboard/UpcomingEvents.vue' /* webpackChunkName: "components/upcoming-events" */).then(c => c.default || c),
  AccountSettings: () => import('../../components/profile/AccountSettings.vue' /* webpackChunkName: "components/account-settings" */).then(c => c.default || c),
  Billing: () => import('../../components/profile/Billing.vue' /* webpackChunkName: "components/billing" */).then(c => c.default || c),
  Notifications: () => import('../../components/profile/Notifications.vue' /* webpackChunkName: "components/notifications" */).then(c => c.default || c),
  ProfileInformation: () => import('../../components/profile/ProfileInformation.vue' /* webpackChunkName: "components/profile-information" */).then(c => c.default || c),
  Security: () => import('../../components/profile/Security.vue' /* webpackChunkName: "components/security" */).then(c => c.default || c),
  StoreSettings: () => import('../../components/profile/StoreSettings.vue' /* webpackChunkName: "components/store-settings" */).then(c => c.default || c),
  Navbar: () => import('../../components/ui/Navbar.vue' /* webpackChunkName: "components/navbar" */).then(c => c.default || c)
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
