<template>
    <div class="container">
        <div v-if="userLoaded.emailVerified" class="w-100 mt-2">
            <div class="card">
                <div class="card-body">
                    <h3>Your email address is verified.</h3>
                    <p>Verified: {{ userLoaded.emailVerified }}</p>
                    <button
                        @click="goToDashboard"
                        type="button"
                        class="btn btn-block btn-primary"
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
        <div v-if="verification" class="w-100 mt-2">
            <div class="card">
                <div class="card-body">
                    <h3>A verification email has been sent to your mailbox</h3>
                    <p>Verify your email address before signing in.</p>
                    <v-btn
                        @click="signout"
                        type="button"
                        color="teal darker-1"
                        dark
                    >
                        Signin
                    </v-btn>
                </div>
            </div>
        </div>
        <div v-if="!loading" class="d-flex flex-row justify-content-center">
            <div v-if="!userLoaded.emailVerified" class="w-100 mt-2">
                <div class="display-1 p-3">Verify Email</div>
                <v-card class="card-body">
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <v-text-field
                                type="text"
                                placeholder="Email"
                                v-model="email"
                                required
                            ></v-text-field>
                        </div>
                        <div v-if="errors" class="form-group text-muted">
                            {{ errors.message }}
                        </div>
                        <v-btn type="submit" color="teal darker-1" dark
                            >Submit</v-btn
                        >
                    </form>
                </v-card>
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
    watch: {
        $route() {
            // great spot for debuggin
            console.log(`verification.vue - 78 - 🤌🏾`, $route);
        }
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
        console.log(`verification.vue - 115 - 💦`, this.userId);
    }
};
</script>

<style></style>
