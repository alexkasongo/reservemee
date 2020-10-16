import * as firebase from 'firebase/app';
import 'firebase/auth';

export default function ({ app, store, route, redirect }) {

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
