<template>
    <v-app>
        <v-card
            class="rounded-0 mx-auto overflow-hidden"
            height="100%"
            width="100%"
        >
            <!-- NAVBAR -->
            <v-app-bar color="teal darken-1" dark fixed>
                <v-app-bar-nav-icon
                    @click.stop="drawer = !drawer"
                ></v-app-bar-nav-icon>

                <v-toolbar-title @click="goHome(user)">
                    Bookme
                </v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn v-if="user" icon>
                    <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn v-if="user" icon>
                    <v-icon>mdi-bell</v-icon>
                </v-btn>

                <v-menu
                    v-if="user"
                    bottom
                    left
                    transition="scale-transition"
                    origin="top right 0"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn dark icon v-bind="attrs" v-on="on">
                            <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                    </template>

                    <v-list width="250px">
                        <v-list-item @click="viewProfile(user.uid)" link>
                            <v-list-item-icon>
                                <v-icon>mdi-cog-outline </v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title>Settings</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list>
                </v-menu>
                <!-- if router name is not Sign in then show, else do not show -->
                <div v-if="this.$route.name !== 'signin'">
                    <v-btn v-if="!user" @click="signin">Sign In</v-btn>
                </div>
            </v-app-bar>
            <!-- NAVBAR END -->

            <!-- DRAWER -->
            <v-navigation-drawer
                v-model="drawer"
                absolute
                temporary
                height="100vh"
            >
                <v-list nav>
                    <v-list-item-group
                        v-model="group"
                        active-class="teal--text text--accent-4"
                    >
                        <div v-if="user">
                            <v-list-item @click="goToDashboard" link>
                                <v-list-item-icon>
                                    <v-icon>mdi-view-dashboard-outline</v-icon>
                                </v-list-item-icon>

                                <v-list-item-content>
                                    <v-list-item-title
                                        >Dashboard</v-list-item-title
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
                                    <v-icon>mdi-account-plus-outline</v-icon>
                                </v-list-item-icon>

                                <v-list-item-title
                                    ><a>Sign Up</a></v-list-item-title
                                >
                            </v-list-item>
                        </div>

                        <div v-if="user">
                            <v-list-item @click="signout">
                                <v-list-item-icon>
                                    <v-icon>mdi-logout</v-icon>
                                </v-list-item-icon>

                                <v-list-item-title
                                    ><a>Sign out</a></v-list-item-title
                                >
                            </v-list-item>
                        </div>
                    </v-list-item-group>
                </v-list>

                <template v-if="user" v-slot:append>
                    <div @click="signout" class="pa-2">
                        <v-btn block> Logout </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>
            <!-- DRAWER END -->

            <div class="container margin">
                <Nuxt />
            </div>
        </v-card>
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
            loading: false,
            drawer: false,
            group: null,
            items: [
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me' },
                { title: 'Click Me 2' }
            ]
        };
    },
    computed: {
        ...mapGetters({
            userId: 'userId'
        })
    },
    watch: {
        $route() {
            $('.navbar-collapse').collapse('hide');
            this.loadServices(this.userId);
            // great spot for debuggin
        },
        group() {
            this.drawer = false;
        }
    },
    methods: {
        ...mapActions([
            'loadUser',
            'loadUserId',
            'userEmail',
            'loadUserIdProfile',
            'loadUserIdData',
            'loadCategories',
            'loadServices'
        ]),
        async signout() {
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    console.log('🏝 🚧');
                    this.user = '';
                    window.localStorage.removeItem('vuex');
                    window.localStorage.removeItem('email');
                });
            this.$router.push('/');
            this.loading = false;
        },
        goHome(user) {
            if (user) {
                this.$router.push('/dashboard');
            } else {
                this.$router.push('/');
            }
        },
        signin() {
            this.$router.push('/signin');
        },
        signup() {
            this.$router.push('/signup');
        },
        goToDashboard() {
            this.$router.push('/dashboard');
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
                // show loading when mounted
                this.loading = true;
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

                // stop loading when all content is loaded
                this.loading = false;
            } else {
                // No user is signed in.
            }
        });
    }
};
</script>

<style>
.margin {
    margin: 64px auto 0 auto;
}
</style>
