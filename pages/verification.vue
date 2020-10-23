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
                <div class="card">
                    <div class="card-header">Verify Email</div>

                    <div class="card-body">
                        <form @submit.prevent="onSubmit">
                            <div class="form-group">
                                <input
                                    type="text"
                                    placeholder="Email"
                                    v-model="email"
                                    class="form-control"
                                    required
                                />
                            </div>
                            <div v-if="errors" class="form-group text-muted">
                                {{ errors.message }}
                            </div>
                            <v-btn type="submit" color="teal darker-1" dark
                                >Submit</v-btn
                            >
                        </form>
                    </div>
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
            errors: 'signupError',
            userLoaded: 'user',
            verification: 'verificationSent',
            userId: 'user'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['verifyEmail', 'loadUserId', 'user']),
        onSubmit() {
            let emailAddress = {
                email: this.userLoaded.email
            };
            this.verifyEmail(emailAddress).then((res) => {
                this.user();
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
    }
};
</script>

<style></style>
