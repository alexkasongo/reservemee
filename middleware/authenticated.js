import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function ({ app, store, route, redirect }) {
    const user = store.state.user;



    //NOTE anything that matches the route name admin gets blocked
    const blockedProfile = /\/profile\/*/g;
    const blockedPlayground = /\/playground\/*/g;
    const homeRoute = '/';

    //TODO
    // Users can register as admin or customer
    // admins can view admin page and crud 

    //TODO
    // customers can only view store

    app.router.beforeEach((to, from, next) => {

        firebase.auth().onAuthStateChanged(user => {

            if (user) {
                firebase.auth().currentUser.getIdTokenResult()
                    .then(function ({
                        claims
                    }) {

                        if (claims.customer) {
                            if (to.path !== '/store')
                                return next({
                                    path: '/store',
                                })
                        }

                    })
            } else {
                if (to.matched.some(record => record.meta.auth)) {
                    next({
                        path: '/store',
                        query: {
                            redirect: to.fullPath
                        }
                    })
                } else {
                    next()
                }
            }

        })

        next()

    })


}
