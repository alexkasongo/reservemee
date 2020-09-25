export default function ({ app, store, route, redirect }) {

    // const user = store.state.user;
    const userEmail = store.state.user.uid

    //NOTE anything that matches the route name admin gets blocked
    const blockedRoute = /\/profile\/*/g;
    const homeRoute = '/';

    //NOTE if there is no user in the store and the route is one that 
    // we're blocking then redirect
    // if (!user && route.path.match(blockedRoute)) {
    //     redirect("/");
    // }

    // if(user && route.path === homeRoute) {
    //     redirect('/admin');
    // }

    // Every time the route changes (fired on initialization too)
    // app.router.afterEach((to, from) => {
    //     console.log(`authenticated.js - 21 - 🚂 ROUTE CHANGE`);
    // })

    if (route.path.match(blockedRoute)) {
        // console.log(`authenticated.js - 21 - 🚂 `);
    }

}