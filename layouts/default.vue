<template>
    <div class="container">
        <!-- <client-only> -->
        <!-- <div v-if="loading" class="loading">
                <p>loading...</p>
            </div> -->
        <Navbar />

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

        <!-- <div class="rounded-0 mx-auto overflow-hidden">
                <v-app-bar color="teal darken-1" fixed flat>
                    <v-app-bar-nav-icon
                        color="white"
                        @click.stop="drawer = !drawer"
                    ></v-app-bar-nav-icon>

                    <div
                        v-if="user"
                        color="white"
                        @click="goHome(user)"
                        elevation="0"
                        text
                        x-large
                    >
                        ReserveMee
                    </div>

                    


                    <v-tooltip open-delay="200" bottom v-if="user">
                        <template v-slot:activator="{ on, attrs }">
                            <div
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                icon
                            >
                                <v-icon
                                    v-if="role.customer"
                                    @click="$router.push(`/inbox/${user.uid}`)"
                                    color="white"
                                    >mdi-message</v-icon
                                >
                                <v-icon
                                    v-if="role.admin"
                                    @click="$router.push('/inbox/admin')"
                                    color="white"
                                    >mdi-message</v-icon
                                >
                            </div>
                        </template>
                        <span>Messages</span>
                    </v-tooltip>



                    <div class="text-center" v-if="user">
                        <v-menu
                            nudge-bottom="56"
                            transition="slide-y-transition"
                            open-delay="200"
                        >
                            <template v-slot:activator="{ on: menu, attrs }">
                                <v-tooltip open-delay="200" bottom>
                                    <template
                                        v-slot:activator="{ on: tooltip }"
                                    >
                                        <div
                                            dark
                                            icon
                                            v-bind="attrs"
                                            v-on="{ ...tooltip, ...menu }"
                                        >
                                            <v-icon color="white"
                                                >mdi-bell-outline</v-icon
                                            >
                                        </div>
                                    </template>
                                    <span>Notifications</span>
                                </v-tooltip>
                            </template>
                            <v-list width="250px">
                                <v-list-item
                                    v-for="notice in notifications"
                                    :key="notice.id"
                                    link
                                >
                                    <v-list-item-icon>
                                        <v-icon>mdi-cog-outline </v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title>{{
                                            notice.message
                                        }}</v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>



                    <v-tooltip open-delay="200" bottom v-if="user">
                        <template v-slot:activator="{ on, attrs }">
                            <div
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click.stop="openCart"
                            >
                                <v-badge
                                    :content="orders"
                                    :value="orders"
                                    color="red darker-1"
                                    overlap
                                >
                                    <v-icon color="white">mdi-cart</v-icon>
                                </v-badge>
                            </div>
                        </template>
                        <span>View Cart</span>
                    </v-tooltip>

                    <div class="text-center" v-if="user">
                        <v-menu
                            nudge-bottom="56"
                            transition="slide-y-transition"
                            open-delay="200"
                        >
                            <template v-slot:activator="{ on: menu, attrs }">
                                <v-tooltip
                                    nudge-bottom="66"
                                    open-delay="200"
                                    bottoma
                                >
                                    <template
                                        v-slot:activator="{ on: tooltip }"
                                    >
                                        <div
                                            elevation="0"
                                            icon
                                            dark
                                            v-bind="attrs"
                                            v-on="{ ...tooltip, ...menu }"
                                        >
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </div>
                                    </template>
                                    <span>Open menu</span>
                                </v-tooltip>
                            </template>
                            <v-list width="250px">
                                <v-list-item
                                    v-for="(item, index) in nav"
                                    :key="index"
                                    link
                                >
                                    <v-list-item-title
                                        width="100%"
                                        @click="dropDown(item)"
                                        >{{ item.title }}</v-list-item-title
                                    >
                                </v-list-item>
                            </v-list>
                        </v-menu>
                    </div>


                    <div v-if="this.$route.name !== 'signin'">
                        <div
                            outlined
                            elevation="0"
                            text
                            class="text-lowercase white"
                            v-if="!user"
                            @click="signin"
                            >Sign In</div
                        >
                    </div>
                    <div v-else>
                        <div
                            outlined
                            elevation="0"
                            text
                            class="text-lowercase white"
                            v-if="!user"
                            @click="signup"
                            >Sign Up</div
                        >
                        <div
                            outlined
                            elevation="0"
                            text
                            class="text-lowercase white"
                            v-if="!user"
                            @click="$router.push('/signup-admin')"
                            >Admin</div
                        >
                    </div>
                </v-app-bar>



                <v-navigation-drawer
                    v-model="drawer"
                    fixed
                    temporary
                    height="100vh"
                >
                    <v-list nav>
                        <v-list-item-group
                            v-model="group"
                            active-class="teal--text text--accent-4"
                        >
                            <div v-if="user">
                                <v-list-item @click="goToStore" link>
                                    <v-list-item-icon>
                                        <v-icon>mdi-cart</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            >Store</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    v-if="role.admin"
                                    @click="goToDashboard"
                                    link
                                >
                                    <v-list-item-icon>
                                        <v-icon
                                            >mdi-view-dashboard-outline</v-icon
                                        >
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            >Dashboard</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item
                                    v-if="role.admin"
                                    @click="goToBookings"
                                    link
                                >
                                    <v-list-item-icon>
                                        <v-icon>mdi-cart-arrow-down</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            >Bookings</v-list-item-title
                                        >
                                    </v-list-item-content>
                                </v-list-item>
                            </div>

                            <div v-if="!user">
                                <v-list-item @click="signin">
                                    <v-list-item-icon>
                                        <v-icon>mdi-login</v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-title
                                        ><a>Sign In</a></v-list-item-title
                                    >
                                </v-list-item>
                            </div>

                            <div v-if="!user">
                                <v-list-item @click="signup">
                                    <v-list-item-icon>
                                        <v-icon
                                            >mdi-account-plus-outline</v-icon
                                        >
                                    </v-list-item-icon>

                                    <v-list-item-title
                                        ><a>Sign Up</a></v-list-item-title
                                    >
                                </v-list-item>
                            </div>
                        </v-list-item-group>
                    </v-list>

                    <template v-if="user" v-slot:append>
                        <div @click="signout" class="pa-2">
                            <div class="teal darker-1" block dark>
                                Logout
                            </div>
                        </div>
                    </template>
                </v-navigation-drawer>

                <v-navigation-drawer
                    v-model="drawerRight"
                    fixed
                    temporary
                    height="100vh"
                    class="cart-width"
                    right
                >
                    <div>
                        <div @click.stop="drawerRight = !drawerRight" icon>
                            <v-icon color="teal darker-1"
                                >mdi-chevron-right</v-icon
                            >
                        </div>
                    </div>
                    <Cart />
                </v-navigation-drawer>
            </div> -->

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
                console.log(`default.vue - 432 - 🥎`, this.snackbar);
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
