<template>
    <div class="signin">
        <div class="signin__left"></div>
        <div class="signin__right">
            <div class="signin__right-card">
                <h1 class="title" style="color: #ccc">Signin</h1>
                <form @keyup.enter="onSubmit">
                    <b-field>
                        <b-input
                            placeholder="Email"
                            v-model="email"
                            type="email"
                            maxlength="30"
                            icon="email"
                            icon-right="close-circle"
                            icon-right-clickable
                            @icon-right-click="clearIconClick"
                        >
                        </b-input>
                    </b-field>

                    <b-field>
                        <b-input
                            placeholder="Password"
                            type="password"
                            v-model="password"
                            password-reveal
                            icon="lock"
                        >
                        </b-input>
                    </b-field>
                    <b-field v-if="error">
                        <p style="color: red">{{ this.error }}</p>
                    </b-field>
                    <b-field v-if="errors">
                        <p style="color: red">{{ this.errors }}</p>
                    </b-field>
                    <b-field class="buttons">
                        <b-button
                            label="signin"
                            aria-label="signin"
                            :loading="loading"
                            type="submit"
                            class="button is-primary"
                            @click="onSubmit"
                            expanded
                            >signin</b-button
                        >
                    </b-field>
                    <div class="is-flex is-justify-content-space-between">
                        <b-field>
                            <p
                                @click="$router.push('/signup')"
                                style="cursor: pointer; color: #7957d5"
                            >
                                Create customer account
                            </p>
                        </b-field>
                        <b-field>
                            <p
                                @click="$router.push('/signup-admin')"
                                style="cursor: pointer; color: #7957d5"
                            >
                                Create store account
                            </p>
                        </b-field>
                    </div>
                    <div class="is-flex is-justify-content-space-between">
                        <b-field>
                            <p
                                @click="$router.push('/password-reset')"
                                style="cursor: pointer; color: #7957d5"
                            >
                                Forgot password?
                            </p>
                        </b-field>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            email: '',
            password: '',
            error: ''
        };
    },
    computed: {
        ...mapGetters({
            loading: 'loaders/loading',
            errors: 'signupError'
        })
    },
    methods: {
        ...mapActions(['login']),
        onSubmit() {
            if (this.email === '' || this.password === '') {
                this.error = 'you must enter both email and password.';
                return;
            }
            this.error = '';
            let loginDetails = {
                email: this.email,
                password: this.password
            };
            // clear local errors
            this.error = '';
            // clear vuex errors
            this.$store.commit('ERRORS', '');
            // signin
            this.login(loginDetails);
        },
        clearIconClick() {
            this.email = '';
        }
    },
    mounted() {
        if (process.browser) {
            this.email = localStorage.getItem('email');
        }
    }
};
</script>

<style lang="scss" scoped></style>
