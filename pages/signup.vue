<template>
    <div class="signup">
        <div class="signup__left"></div>
        <div class="signup__right">
            <div class="signup__right-card">
                <h1 class="title" style="color: #ccc">Customer Signup</h1>
                <form @keyup.enter="onSubmit">
                    <b-field>
                        <b-input
                            placeholder="Name"
                            v-model="name"
                            type="text"
                            maxlength="30"
                            icon="account"
                        >
                        </b-input>
                    </b-field>

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
                            placeholder="Passwordm"
                            type="password"
                            v-model="password"
                            password-reveal
                            icon="lock"
                        >
                        </b-input>
                    </b-field>
                    <b-field v-if="error" style="color: red">
                        <p>{{ this.error }}</p>
                    </b-field>
                    <b-field v-if="errors" style="color: red">
                        <p>{{ this.errors }}</p>
                    </b-field>
                    <b-field class="buttons">
                        <b-button
                            label="signup"
                            aria-label="signup"
                            :loading="loading"
                            type="submit"
                            class="button is-primary"
                            @click="onSubmit"
                            expanded
                            >signup</b-button
                        >
                    </b-field>
                    <div class="is-flex is-justify-content-space-between">
                        <b-field>
                            <a
                                @click="$router.push('/signin')"
                                style="cursor: pointer; color: #7957d5"
                            >
                                Login
                            </a>
                        </b-field>
                        <b-field>
                            <a
                                @click="$router.push('/signup-admin')"
                                style="cursor: pointer; color: #7957d5"
                            >
                                Create store account
                            </a>
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
    data: () => ({
        name: '',
        phone: '',
        email: '',
        password: '',
        error: ''
    }),
    computed: {
        ...mapGetters({
            loading: 'loaders/loading',
            errors: 'signupError'
        })
    },
    methods: {
        ...mapActions(['signup']),
        onSubmit() {
            if (this.name === '' || this.email === '' || this.password === '') {
                this.error = 'you must enter both email and password.';
                return;
            }
            let signupDetails = {
                name: this.name,
                email: this.email,
                password: this.password,
                role: {
                    customer: true
                }
            };
            // clear local errors
            this.error = '';
            // clear vuex errors
            this.$store.commit('ERRORS', '');
            // signup
            this.signup(signupDetails);
            this.clear;
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
