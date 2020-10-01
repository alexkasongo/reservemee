export default function ({ app, store, route, redirect }) {
    const user = store.state.user;
    // const userEmail = store.state.user.uid;

    //NOTE anything that matches the route name admin gets blocked
    const blockedProfile = /\/profile\/*/g;
    const blockedPlayground = /\/playground\/*/g;
    const homeRoute = '/';

    //NOTE if there is no user in the store and the route is one that
    // we're blocking then redirect
    // if (!user) {
    //     redirect('/');
    // }
    //NOTE if there is no user in the store and the route is one that
    // we're blocking then redirect
    // if (
    //     route.path.match(blockedProfile) ||
    //     route.path.match(blockedPlayground)
    // ) {
    //     redirect('/');
    // }

    // console.log(`authenticated.js - 26 - variable`, user);
}
