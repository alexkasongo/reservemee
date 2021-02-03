<template>
    <div class="signin">
        <div class="signin__left"></div>
        <div class="signin__right">
            <div class="signin__right-card">
                <form class="signin__right-form" @keyup.enter="onSubmit">
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
                        <p>{{ this.error }}</p>
                    </b-field>
                    <b-field class="buttons">
                        <b-button
                            :loading="loading"
                            type="submit"
                            class="button is-primary"
                            @click="onSubmit"
                            expanded
                            >signin</b-button
                        >
                    </b-field>
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
            let loginDetails = {
                email: this.email,
                password: this.password
            };
            this.login(loginDetails);
        },
        clearIconClick() {
            this.email = '';
        }
    },
    mounted() {
        this.email = localStorage.getItem('email');
    }
};
</script>

<style lang="scss" scoped></style>
