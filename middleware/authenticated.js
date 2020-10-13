export default function ({ app, store, route, redirect }) {
    const user = store.state.user;
    // const userEmail = store.state.user.uid;

    //NOTE anything that matches the route name admin gets blocked
    const blockedProfile = /\/profile\/*/g;
    const blockedPlayground = /\/playground\/*/g;
    const homeRoute = '/';

    //TODO
    // Users can register as admin or customer
    // admins can view admin page and crud 

    //TODO
    // customers can only view store

}
