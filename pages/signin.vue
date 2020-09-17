<template>
    <div class="container">
        <div v-if="loading" class="col-md-6 mt-2">
            <p>loading...</p>
        </div>
        <div v-if="!loading" class="d-flex flex-row justify-content-center">
            <div class="col-md-8 mt-5">
                <div class="card">
                    <div class="card-header">Sign In</div>

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

                            <div class="form-group">
                                <input
                                    type="password"
                                    placeholder="Password"
                                    v-model="password"
                                    class="form-control"
                                    required
                                />
                            </div>

                            <div v-if="errors" class="form-group text-muted">{{ errors.message }}</div>

                            <div v-if="errors" class="form-group text-muted">
                                Don't have an account?
                                <a href="/signup">signup</a>
                            </div>
                            <div class="form-group text-muted">
                                Forgot your password?
                                <a href="/password-reset">Reset password</a>
                            </div>

                            <button class="btn btn-primary">Signin</button>
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
            password: ''
        };
    },
    computed: {
        ...mapGetters({
            errors: 'signupError'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['login']),
        onSubmit() {
            let loginDetails = {
                email: this.email,
                password: this.password
            };
            this.login(loginDetails);
        }
    }
};
</script>

<style>
</style>