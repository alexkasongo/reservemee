<template>
    <div class="container">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <nuxt-link class="navbar-brand" to="/">Bookme</nuxt-link>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active"></li>
                    <li class="nav-item active">
                        <nuxt-link v-if="user" to="/dashboard" class="nav-link">Dashboard</nuxt-link>
                    </li>
                    <li class="nav-item active">
                        <a v-if="user" @click="signout" class="nav-link">Sign out</a>
                    </li>
                </ul>
                <form class="form-inline my-2 my-lg-0">
                    <a v-if="user" @click="viewProfile(user.uid)" class="navbar-brand">Profile</a>
                </form>
                <form class="form-inline my-2 my-lg-0">
                    <!-- <div v-if="loading"> -->
                    <nuxt-link v-if="!user" to="/signup" class="nav-link text-dark">Sign Up</nuxt-link>
                    <nuxt-link
                        v-if="!user"
                        class="btn btn-dark"
                        style="background-color:transparent; color:black;"
                        to="/signin"
                    >Sign In</nuxt-link>
                    <!-- </div> -->
                </form>
            </div>
        </nav>
        <Nuxt />
    </div>
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
            loading: false
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
                    localStorage.clear('email');
                });
            this.$router.push('/');
            this.loading = false;
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
            // show loading when mounted
            this.loading = true;
            this.user = user;
            // stop loading when all content is loaded
            this.loading = false;
            if (user !== null) {
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
            }
        });
    }
};
</script>

<style>
html {
    font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
}

.button--green {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #3b8070;
    color: #3b8070;
    text-decoration: none;
    padding: 10px 30px;
}

.button--green:hover {
    color: #fff;
    background-color: #3b8070;
}

.button--grey {
    display: inline-block;
    border-radius: 4px;
    border: 1px solid #35495e;
    color: #35495e;
    text-decoration: none;
    padding: 10px 30px;
    margin-left: 15px;
}

.button--grey:hover {
    color: #fff;
    background-color: #35495e;
}
</style>
