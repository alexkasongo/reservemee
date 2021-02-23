<template>
    <b-navbar class="mb-5">
        <template #brand>
            <b-navbar-item @click="$router.push('/')">
                <img
                    @click="goHome(user)"
                    :src="logo"
                    alt="Reservemee logo"
                    style="max-width: 145px"
                />
            </b-navbar-item>
        </template>

        <template #start>
            <b-navbar-item @click="$router.push('/store')">
                Store
            </b-navbar-item>
            <b-navbar-item v-if="user" @click="goHome(user)">
                Dasboard
            </b-navbar-item>
        </template>

        <template #end>
            <b-navbar-item v-if="user && mobile === false" @click="openCart">
                <div>Cart</div>
            </b-navbar-item>
            <b-navbar-item
                v-if="user && mobile === true"
                @click="openMobileCart"
            >
                <div>Cart</div>
            </b-navbar-item>

            <b-navbar-dropdown label="Info">
                <b-navbar-item
                    @click="$router.push(`/inbox/${user.uid}`)"
                    v-if="user && role.customer"
                    >Inbox</b-navbar-item
                >
                <b-navbar-item
                    @click="$router.push('/inbox/admin')"
                    v-if="user && role.admin"
                    >Inbox</b-navbar-item
                >
                <div v-for="(item, index) in nav" :key="index">
                    <b-navbar-item v-if="user" @click="dropDown(item)">{{
                        item.title
                    }}</b-navbar-item>
                </div>

                <b-navbar-item v-if="!user" @click="signin">
                    Signin
                </b-navbar-item>
            </b-navbar-dropdown>
            <!-- <b-button type="is-primary" @click="isMobileModalActive = true">
                test
            </b-button> -->

            <!-- Fullscreen cart modal -->
            <b-modal
                v-model="isMobileModalActive"
                full-screen
                scroll="keep"
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-label="Cart Modal"
                aria-modal
            >
                <div>
                    <CartMobile />
                    <b-button
                        label="Cancel"
                        aria-label="Cance add to cart"
                        @click="close"
                    >
                        Cancel
                    </b-button>
                </div>
            </b-modal>
            <!-- Fullscreen cart modal end -->
        </template>
    </b-navbar>
</template>

<script>
import logo from 'assets/images/logo.png';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/plugins/firebase';

import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    name: 'Navbar',
    data() {
        return {
            logo: logo,
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
                    title: 'Settings'
                },
                {
                    title: 'Bookmarks'
                },
                {
                    title: 'Logout'
                }
            ],
            mobile: false,
            isMobileModalActive: false
        };
    },
    computed: {
        ...mapGetters({
            loading: 'loaders/loading',
            userId: 'userId'
        }),
        ...mapState({
            loaders: 'loaders',
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
        },
        mobileCartState() {
            return this.loaders.mobileCartState;
        },
        viewPort() {
            // Define our viewportWidth variable
            let viewportWidth;

            // Set/update the viewportWidth value
            let setViewportWidth = function () {
                viewportWidth =
                    window.innerWidth || document.documentElement.clientWidth;
            };

            // Log the viewport width into the console
            let logWidth = () => {
                if (viewportWidth > 768) {
                    this.mobile = false;
                } else {
                    this.mobile = true;
                }
            };

            // Set our initial width and log it
            setViewportWidth();
            logWidth();

            // On resize events, recalculate and log
            window.addEventListener(
                'resize',
                function () {
                    setViewportWidth();
                    logWidth();
                },
                false
            );
        }
    },
    watch: {
        mobileCartState() {
            this.isMobileModalActive = this.mobileCartState;
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
            setCartState: 'loaders/setCartState',
            setMobileCartState: 'loaders/setMobileCartState'
        }),
        openCart() {
            this.setCartState(true);
        },
        openMobileCart() {
            this.setMobileCartState(true);
        },
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
        },
        async getUserRole() {
            // get logged in user role
            const userRole = await db
                .collection('roles')
                .doc(this.user.uid)
                .get();
            this.role = userRole.data().role;
            // get logged in user role - end
        },
        close() {
            this.isMobileModalActive = false;
            this.setMobileCartState(false);
        }
    },
    created() {
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
                if (process.browser) {
                    localStorage.removeItem('vuex');
                    localStorage.clear();
                }
            }
        });
        if (process.client) {
            // start tracking the viewport
            this.viewPort;
            this.setMobileCartState(false);
        }
    }
};
</script>
