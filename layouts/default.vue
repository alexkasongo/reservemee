<template>
    <v-app>
        <client-only>
            <!-- SNACKBAR -->
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
            <!-- SNACKBAR -->
            <v-card class="rounded-0 mx-auto overflow-hidden">
                <div v-if="loading" class="loading">
                    <p>loading...</p>
                </div>
                <!-- NAVBAR -->
                <v-app-bar color="teal darken-1" fixed flat>
                    <!-- open drawer -->
                    <v-app-bar-nav-icon
                        color="white"
                        @click.stop="drawer = !drawer"
                    ></v-app-bar-nav-icon>
                    <!-- open drawer end -->

                    <!-- FIXME -->
                    <v-btn
                        v-if="user"
                        color="white"
                        @click="goHome(user)"
                        elevation="0"
                        text
                        x-large
                    >
                        ReserveMee
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-tooltip open-delay="200" bottom v-if="user">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
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
                            </v-btn>
                        </template>
                        <span>Messages</span>
                    </v-tooltip>
                    <!-- MESSAGES END -->

                    <!-- NOTIFICATIONS START -->
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
                                        <v-btn
                                            dark
                                            icon
                                            v-bind="attrs"
                                            v-on="{ ...tooltip, ...menu }"
                                        >
                                            <v-icon color="white"
                                                >mdi-bell-outline</v-icon
                                            >
                                        </v-btn>
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
                    <!-- NOTIFICATIONS END -->

                    <!-- CART START -->
                    <v-tooltip open-delay="200" bottom v-if="user">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="primary"
                                dark
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click.stop="drawerRight = !drawerRight"
                            >
                                <v-badge
                                    :content="orders"
                                    :value="orders"
                                    color="red darker-1"
                                    overlap
                                >
                                    <v-icon color="white">mdi-cart</v-icon>
                                </v-badge>
                            </v-btn>
                        </template>
                        <span>View Cart</span>
                    </v-tooltip>
                    <!-- CART END -->
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
                                        <v-btn
                                            elevation="0"
                                            icon
                                            dark
                                            v-bind="attrs"
                                            v-on="{ ...tooltip, ...menu }"
                                        >
                                            <v-icon>mdi-dots-vertical</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Open menu</span>
                                </v-tooltip>
                            </template>
                            <!-- <v-btn elevation="0" icon dark>
                                <v-icon>mdi-dots-vertical</v-icon>
                            </v-btn> -->
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
                    <!-- THREE DOTS END -->

                    <!-- if router name is not Sign in then show, else do not show -->
                    <div v-if="this.$route.name !== 'signin'">
                        <v-btn
                            outlined
                            elevation="0"
                            text
                            class="text-lowercase white"
                            v-if="!user"
                            @click="signin"
                            >Sign In</v-btn
                        >
                    </div>
                    <div v-else>
                        <v-btn
                            outlined
                            elevation="0"
                            text
                            class="text-lowercase white"
                            v-if="!user"
                            @click="signup"
                            >Sign Up</v-btn
                        >
                        <v-btn
                            outlined
                            elevation="0"
                            text
                            class="text-lowercase white"
                            v-if="!user"
                            @click="$router.push('/signup-admin')"
                            >Admin</v-btn
                        >
                    </div>
                </v-app-bar>
                <!-- NAVBAR END -->

                <!-- DRAWER LEFT-->
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
                            <v-btn class="teal darker-1" block dark>
                                Logout
                            </v-btn>
                        </div>
                    </template>
                </v-navigation-drawer>
                <!-- DRAWER LEFT END -->

                <!-- DRAWER RIGHT-->
                <v-navigation-drawer
                    v-model="drawerRight"
                    fixed
                    temporary
                    height="100vh"
                    class="cart-width"
                    right
                >
                    <div>
                        <v-btn @click.stop="drawerRight = !drawerRight" icon>
                            <v-icon color="teal darker-1"
                                >mdi-chevron-right</v-icon
                            >
                        </v-btn>
                    </div>
                    <Cart />
                </v-navigation-drawer>
                <!-- DRAWER RIGHT END -->
            </v-card>

            <div class="margin">
                <Nuxt />
            </div>
        </client-only>
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
            drawerDown: false,
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
            ],
            nav: [
                {
                    title: 'Settings',
                    icon: 'mdi-cog'
                },
                {
                    title: 'Bookmarks',
                    icon: 'mdi-heart-outline'
                },
                {
                    title: 'Logout',
                    icon: 'mdi-logout-variant'
                }
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
        clickToggleDrawer() {
            this.drawerDown = !this.drawerDown;
        },
        dropDown(item) {
            if (item.title === 'Settings') {
                this.$router.push('/settings');
            }
            if (item.title === 'Logout') {
                this.signout();
            }
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
    // margin: 90px auto 0 auto;
    margin-top: 90px;
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
