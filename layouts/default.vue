<template>
    <v-app>
        <v-snackbar
            top
            v-model="snackbar"
            :timeout="timeout"
            :multi-line="multiLine"
        >
            {{ text }}

            <template v-slot:action="{ attrs }">
                <v-btn
                    color="teal darker-1"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                >
                    Close
                </v-btn>
            </template>
        </v-snackbar>

        <div class="margin margin-bt">
            <Nuxt />
        </div>
    </v-app>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    head: {
        script: [
            { src: 'https://code.jquery.com/jquery-3.3.1.slim.min.js' },
            {
                src:
                    'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js'
            },
            {
                src:
                    'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js'
            }
        ],
        link: [
            {
                rel: 'stylesheet',
                type: 'text/css',
                href:
                    'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'
            }
        ]
    },
    data() {
        return {
            user: '',
            role: '',
            drawer: false,
            drawerRight: false,
            group: null,
            groupRight: null,
            multiLine: true,
            text: 'Success.',
            timeout: 3000,
            notifications: [
                { message: 'Noticfication example one' },
                { message: 'Noticfication example two' },
                { message: 'Noticfication example three' },
                { message: 'Noticfication example four' },
                { message: 'Noticfication example five' }
            ]
        };
    },
    computed: {
        ...mapGetters({
            loading: 'loaders/loading',
            userId: 'userId'
        }),
        ...mapState({
            snackbarState: 'loaders',
            cart: 'cart'
        }),
        orders: {
            // return this.cart.order;
            get() {
                return this.cart.order.length;
            },
            set() {
                return new Array();
            }
        },
        storeProfile() {
            if (
                // if the state is undfined or the object does not exist, return null
                this.$store.state.userData.length <= 0 ||
                !this.$store.state.userData[0].storeProfile
            ) {
                return null;
            } else {
                const data = this.$store.state.userData[0].storeProfile;
                return data;
            }
        },
        snackbar: {
            get() {
                return this.snackbarState.snackbar;
            },
            set() {
                return this.setSnackbar(false);
            }
        }
    },
    watch: {
        $route() {
            $('.navbar-collapse').collapse('hide');
            this.loadServices(this.userId);
            // great spot for debuggin
        },
        group() {
            this.drawer = false;
        },
        groupRight() {
            this.drawerRight = false;
        }
    },
    methods: {
        ...mapActions({
            loadUser: 'loadUser',
            loadUserId: 'loadUserId',
            userEmail: 'userEmail',
            loadUserIdProfile: 'loadUserIdProfile',
            loadUserIdData: 'dashboard/loadUserIdData',
            loadCategories: 'dashboard/loadCategories',
            loadServices: 'dashboard/loadServices',
            setSnackbar: 'loaders/setSnackbar',
            removeUserData: 'removeUserData',
            orders: null
        }),
        signin() {
            this.$router.replace('/signin');
        },
        async signout() {
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    this.removeUserData();
                })
                .then(() => {
                    this.user = '';
                    this.$router.push('/');
                });
        },
        signup() {
            this.$router.push('/signup');
        },
        goHome(user) {
            if (user) {
                if (this.role.admin) {
                    this.$router.push('/dashboard');
                }
                if (this.role.customer) {
                    this.$router.push('/store');
                }
            } else {
                this.$router.push('/');
            }
        },
        goToStore() {
            this.$router.push('/store');
        },
        goToDashboard() {
            this.$router.push('/dashboard');
        },
        goToBookings() {
            this.$router.push('/service/bookings');
        },
        goToCalendar() {
            this.$router.push('/calendar');
        },
        viewProfile(id) {
            this.$router.push({
                name: 'profile-id',
                params: {
                    id: id
                }
            });
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // check user status
                firebase
                    .auth()
                    .currentUser.getIdTokenResult()
                    .then((tokenResult) => {
                        if (tokenResult) {
                            this.role = tokenResult.claims;
                        }
                    });

                this.user = user;

                const userDetails = {
                    name: user.displayName,
                    email: user.email,
                    photoUrl: user.photoURL,
                    emailVerified: user.emailVerified,
                    uid: user.uid
                };

                this.loadUser(userDetails);
                this.loadUserId(user.uid);
                this.loadUserIdData(user.uid);
                this.loadCategories(user.uid);
                this.loadServices(user.uid);
            } else {
                // No user is signed in.
                window.localStorage.removeItem('vuex');
                localStorage.clear();
            }
        });
    }
};
</script>

<style lang="scss" scoped>
.margin {
    margin: 90px auto 300px auto;
}

.app {
    position: relative;
}

.loading {
    position: absolute;
    top: 22px;
    left: 50%;
}
</style>
