<template>
    <b-navbar>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    @click="goHome(user)"
                    src="https://raw.githubusercontent.com/buefy/buefy/dev/static/img/buefy-logo.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                />
            </b-navbar-item>
        </template>
        <template #start>
            <b-navbar-item @click="goHome(user)"> Dasboard </b-navbar-item>
            <b-navbar-dropdown label="Info">
                <div v-for="(item, index) in nav" :key="index">
                    <b-navbar-item @click="dropDown(item)">{{
                        item.title
                    }}</b-navbar-item>
                </div>
            </b-navbar-dropdown>
        </template>

        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <a @click="signin" class="button is-light"> Log in </a>
                    <a @click="signup" class="button is-primary">
                        <strong>Sign up</strong>
                    </a>
                    <a
                        @click="$router.push('/signup-admin')"
                        class="button is-primary"
                    >
                        <strong>Admin</strong>
                    </a>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/plugins/firebase';

import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    head: {},
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
        openCart() {
            this.drawerRight = !this.drawerRight;
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
