<template>
    <div class="signin">
        <div v-if="loading" class="col-md-6 mt-2">
            <p>loading...</p>
        </div>
        <div class="signin__left"></div>
        <div class="signin__right">
            <div v-if="!loading" class="d-flex flex-row justify-content-center">
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

                            <div v-if="errors" class="form-group text-muted">
                                {{ errors.message }}
                            </div>

                            <div v-if="errors" class="form-group text-muted">
                                Don't have an account?
                                <nuxt-link to="/signup">Signup</nuxt-link>
                            </div>
                            <div class="form-group text-muted">
                                Forgot your password?
                                <nuxt-link to="/password-reset"
                                    >Reset password</nuxt-link
                                >
                            </div>

                            <v-btn
                                type="submit"
                                class="teal darken-1"
                                dark
                                elevation="2"
                                >Sign in</v-btn
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
    },
    mounted() {
        this.email = localStorage.getItem('email');
    }
};
</script>

<style lang="scss" scoped>
.signin {
    display: flex;
    height: 100vh;
    &__left {
        width: 35%;
        background-color: white;
    }
    &__right {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 65%;
        background-color: #00897b;
    }
}
</style>
