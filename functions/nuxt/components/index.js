export { default as Calendar } from '../../components/Calendar.vue'
export { default as BookingCalendar } from '../../components/cart/BookingCalendar.vue'
export { default as Cart } from '../../components/cart/Cart.vue'
export { default as QuickBook } from '../../components/cart/QuickBook.vue'
export { default as Chat } from '../../components/chat/Chat.vue'
export { default as Messages } from '../../components/chat/Messages.vue'
export { default as NewMessage } from '../../components/chat/NewMessage.vue'
export { default as NewProfileMsg } from '../../components/chat/NewProfileMsg.vue'
export { default as StoreMessages } from '../../components/chat/StoreMessages.vue'
export { default as HorizontalCard } from '../../components/client/HorizontalCard.vue'
export { default as Ratings } from '../../components/client/Ratings.vue'
export { default as SideBar } from '../../components/client/SideBar.vue'
export { default as SideBarAd } from '../../components/client/SideBarAd.vue'
export { default as StoreBanner } from '../../components/client/StoreBanner.vue'
export { default as StoreCategories } from '../../components/client/StoreCategories.vue'
export { default as BusinessInfo } from '../../components/dashboard/BusinessInfo.vue'
export { default as CategoryCheck } from '../../components/dashboard/CategoryCheck.vue'
export { default as EmailVerified } from '../../components/dashboard/EmailVerified.vue'
export { default as Header } from '../../components/dashboard/Header.vue'
export { default as ManageServices } from '../../components/dashboard/ManageServices.vue'
export { default as Scheduling } from '../../components/dashboard/Scheduling.vue'
export { default as StoreSummary } from '../../components/dashboard/StoreSummary.vue'
export { default as UpcomingEvents } from '../../components/dashboard/UpcomingEvents.vue'
export { default as DefaultManageServices } from '../../components/default/DefaultManageServices.vue'
export { default as AccountSettings } from '../../components/profile/AccountSettings.vue'
export { default as Billing } from '../../components/profile/Billing.vue'
export { default as Notifications } from '../../components/profile/Notifications.vue'
export { default as ProfileInformation } from '../../components/profile/ProfileInformation.vue'
export { default as Security } from '../../components/profile/Security.vue'
export { default as StoreSettings } from '../../components/profile/StoreSettings.vue'

export const LazyCalendar = import('../../components/Calendar.vue' /* webpackChunkName: "components/Calendar" */).then(c => c.default || c)
export const LazyBookingCalendar = import('../../components/cart/BookingCalendar.vue' /* webpackChunkName: "components/cart/BookingCalendar" */).then(c => c.default || c)
export const LazyCart = import('../../components/cart/Cart.vue' /* webpackChunkName: "components/cart/Cart" */).then(c => c.default || c)
export const LazyQuickBook = import('../../components/cart/QuickBook.vue' /* webpackChunkName: "components/cart/QuickBook" */).then(c => c.default || c)
export const LazyChat = import('../../components/chat/Chat.vue' /* webpackChunkName: "components/chat/Chat" */).then(c => c.default || c)
export const LazyMessages = import('../../components/chat/Messages.vue' /* webpackChunkName: "components/chat/Messages" */).then(c => c.default || c)
export const LazyNewMessage = import('../../components/chat/NewMessage.vue' /* webpackChunkName: "components/chat/NewMessage" */).then(c => c.default || c)
export const LazyNewProfileMsg = import('../../components/chat/NewProfileMsg.vue' /* webpackChunkName: "components/chat/NewProfileMsg" */).then(c => c.default || c)
export const LazyStoreMessages = import('../../components/chat/StoreMessages.vue' /* webpackChunkName: "components/chat/StoreMessages" */).then(c => c.default || c)
export const LazyHorizontalCard = import('../../components/client/HorizontalCard.vue' /* webpackChunkName: "components/client/HorizontalCard" */).then(c => c.default || c)
export const LazyRatings = import('../../components/client/Ratings.vue' /* webpackChunkName: "components/client/Ratings" */).then(c => c.default || c)
export const LazySideBar = import('../../components/client/SideBar.vue' /* webpackChunkName: "components/client/SideBar" */).then(c => c.default || c)
export const LazySideBarAd = import('../../components/client/SideBarAd.vue' /* webpackChunkName: "components/client/SideBarAd" */).then(c => c.default || c)
export const LazyStoreBanner = import('../../components/client/StoreBanner.vue' /* webpackChunkName: "components/client/StoreBanner" */).then(c => c.default || c)
export const LazyStoreCategories = import('../../components/client/StoreCategories.vue' /* webpackChunkName: "components/client/StoreCategories" */).then(c => c.default || c)
export const LazyBusinessInfo = import('../../components/dashboard/BusinessInfo.vue' /* webpackChunkName: "components/dashboard/BusinessInfo" */).then(c => c.default || c)
export const LazyCategoryCheck = import('../../components/dashboard/CategoryCheck.vue' /* webpackChunkName: "components/dashboard/CategoryCheck" */).then(c => c.default || c)
export const LazyEmailVerified = import('../../components/dashboard/EmailVerified.vue' /* webpackChunkName: "components/dashboard/EmailVerified" */).then(c => c.default || c)
export const LazyHeader = import('../../components/dashboard/Header.vue' /* webpackChunkName: "components/dashboard/Header" */).then(c => c.default || c)
export const LazyManageServices = import('../../components/dashboard/ManageServices.vue' /* webpackChunkName: "components/dashboard/ManageServices" */).then(c => c.default || c)
export const LazyScheduling = import('../../components/dashboard/Scheduling.vue' /* webpackChunkName: "components/dashboard/Scheduling" */).then(c => c.default || c)
export const LazyStoreSummary = import('../../components/dashboard/StoreSummary.vue' /* webpackChunkName: "components/dashboard/StoreSummary" */).then(c => c.default || c)
export const LazyUpcomingEvents = import('../../components/dashboard/UpcomingEvents.vue' /* webpackChunkName: "components/dashboard/UpcomingEvents" */).then(c => c.default || c)
export const LazyDefaultManageServices = import('../../components/default/DefaultManageServices.vue' /* webpackChunkName: "components/default/DefaultManageServices" */).then(c => c.default || c)
export const LazyAccountSettings = import('../../components/profile/AccountSettings.vue' /* webpackChunkName: "components/profile/AccountSettings" */).then(c => c.default || c)
export const LazyBilling = import('../../components/profile/Billing.vue' /* webpackChunkName: "components/profile/Billing" */).then(c => c.default || c)
export const LazyNotifications = import('../../components/profile/Notifications.vue' /* webpackChunkName: "components/profile/Notifications" */).then(c => c.default || c)
export const LazyProfileInformation = import('../../components/profile/ProfileInformation.vue' /* webpackChunkName: "components/profile/ProfileInformation" */).then(c => c.default || c)
export const LazySecurity = import('../../components/profile/Security.vue' /* webpackChunkName: "components/profile/Security" */).then(c => c.default || c)
export const LazyStoreSettings = import('../../components/profile/StoreSettings.vue' /* webpackChunkName: "components/profile/StoreSettings" */).then(c => c.default || c)
