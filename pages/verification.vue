<template>
    <div class="container">
        <div v-if="userLoaded.emailVerified" class="w-100 mt-2">
            <div class="card">
                <div class="card-content">
                    <div class="card-body">
                        <h3 class="title is-3">
                            Your email address is verified
                        </h3>
                        <b-button
                            @click="goToDashboard"
                            type="is-primary"
                            class="btn btn-block btn-primary"
                        >
                            Go to Dashboard
                        </b-button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="verification" class="w-100 mt-2">
            <div class="card">
                <div class="card-content">
                    <h3 class="title is-3">
                        A verification email has been sent to your mailbox
                    </h3>
                    <h2 class="subtitle">
                        Verify your email address before signing in.
                    </h2>
                    <b-field>
                        <b-button
                            @click="signout"
                            type="is-primary"
                            color="teal darker-1"
                            dark
                        >
                            Signin
                        </b-button>
                    </b-field>
                </div>
            </div>
        </div>
        <div v-if="!loading" class="d-flex flex-row justify-content-center">
            <div v-if="!userLoaded.emailVerified" class="w-100 mt-2">
                <div class="card-body">
                    <form>
                        <h1 class="title is-3">Verify Email</h1>
                        <b-field>
                            <b-input
                                type="text"
                                placeholder="Email"
                                v-model="email"
                                required
                            ></b-input>
                        </b-field>
                        <div v-if="errors" class="text-muted">
                            {{ errors.message }}
                        </div>
                        <b-field>
                            <b-button
                                type="is-primary"
                                @click="onSubmit"
                                color="teal darker-1"
                                dark
                            >
                                Submit
                            </b-button>
                        </b-field>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            email: '',
            notification: ''
        };
    },
    computed: {
        ...mapGetters({
            verification: 'verificationSent',
            loading: 'loaders/loading',
            errors: 'signupError',
            userLoaded: 'user',
            userId: 'user'
        })
    },
    methods: {
        ...mapActions(['verifyEmail', 'loadUserId', 'user']),
        onSubmit() {
            let emailAddress = {
                email: this.userLoaded.email
            };
            this.verifyEmail(emailAddress).then((res) => {
                // this.user();
            });
        },
        async signout() {
            await firebase
                .auth()
                .signOut()
                .then((result) => {
                    this.user = '';
                    window.localStorage.removeItem('email');
                    window.localStorage.removeItem('vuex');
                });
            this.$router.push('/signin');
        },
        goToDashboard() {
            this.$router.push('/dashboard');
        }
    },
    mounted() {
        this.email = this.userLoaded.email;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // check user status
                this.user = user;
            } else {
                // No user is signed in.
                window.localStorage.removeItem('vuex');
                localStorage.clear();
            }
        });
    }
};
</script>

<style></style>
