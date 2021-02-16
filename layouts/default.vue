<template>
    <div class="container">
        <!-- <client-only> -->
        <!-- <div v-if="loading" class="loading">
                <p>loading...</p>
            </div> -->
        <!-- <Navbar /> -->

        <section>
            <b-sidebar
                type="is-light"
                :fullheight="fullheight"
                :fullwidth="fullwidth"
                :overlay="overlay"
                :right="right"
                v-model="open"
                :on-cancel="closeCart"
            >
                <div>
                    <!-- <img :src="logo" alt="Reservemee logo" /> -->
                    <Cart />
                </div>
            </b-sidebar>
            <!-- TODO move to settings -->
            <!-- <div class="block">
                <b-field grouped group-multiline>
                    <div class="control">
                        <b-switch v-model="overlay">Overlay</b-switch>
                    </div>
                    <div class="control">
                        <b-switch v-model="fullheight">Fullheight</b-switch>
                    </div>
                    <div class="control">
                        <b-switch v-model="fullwidth">Fullwidth</b-switch>
                    </div>
                    <div class="control">
                        <b-switch v-model="right">Right</b-switch>
                    </div>
                </b-field>
            </div> -->
        </section>

        <!-- TODO add snackbar -->
        <!-- SNACKBAR -->
        <!-- <v-snackbar
                top
                v-model="snackbar"
                :timeout="timeout"
                :multi-line="multiLine"
            >
                {{ text }}

                <template v-slot:action="{ attrs }">
                    <div
                        color="teal darker-1"
                        text
                        v-bind="attrs"
                        @click="snackbar = false"
                    >
                        Close
                    </div>
                </template>
            </v-snackbar> -->
        <!-- SNACKBAR -->

        <div>
            <Nuxt />
        </div>
        <!-- </client-only> -->
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/plugins/firebase';
import logo from 'assets/images/logo.png';

import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    head: {},
    data() {
        return {
            logo: logo,
            user: '',
            role: '',
            open: false,
            overlay: false,
            fullheight: true,
            fullwidth: false,
            right: true
        };
    },
    computed: {
        ...mapGetters({
            loading: 'loaders/loading',
            userId: 'userId'
        }),
        ...mapState({
            loaders: 'loaders',
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
                return this.loaders.snackbar;
            },
            set() {
                return this.setSnackbar(false);
            }
        },
        cartState() {
            // const data = this.loaders.cartState
            return this.loaders.cartState;
        },
        warning() {
            if (this.snackbar) {
                // this.$buefy.snackbar.open({
                //     message:
                //         'Yellow button and positioned on top, click to close',
                //     type: 'is-warning',
                //     position: 'is-top',
                //     actionText: 'Retry',
                //     indefinite: true,
                //     onAction: () => {
                //         this.$buefy.toast.open({
                //             message: 'Action pressed',
                //             queue: false
                //         });
                //     }
                // });
            }
        }
    },
    watch: {
        cartState() {
            this.open = this.cartState;
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
            orders: null,
            setCartState: 'loaders/setCartState'
        }),
        closeCart() {
            this.setCartState(false);
        },
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
        },
        // warning() {
        //     this.$buefy.snackbar.open({
        //         message: 'Yellow button and positioned on top, click to close',
        //         type: 'is-warning',
        //         position: 'is-top',
        //         actionText: 'Retry',
        //         indefinite: true,
        //         onAction: () => {
        //             this.$buefy.toast.open({
        //                 message: 'Action pressed',
        //                 queue: false
        //             });
        //         }
        //     });
        // },
        async getUserRole() {
            // get logged in user role
            const userRole = await db
                .collection('roles')
                .doc(this.user.uid)
                .get();
            this.role = userRole.data().role;
            // get logged in user role - end
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;

                // get logged in user role
                this.getUserRole();
                // get logged in user role - end

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
// .margin {
//     // margin: 90px auto 0 auto;
//     margin-top: 90px;
// }

// .app {
//     position: relative;
// }

// .loading {
//     position: absolute;
//     top: 22px;
//     left: 50%;
// }

// .cart__width {
//     width: 600px;
// }
</style>
