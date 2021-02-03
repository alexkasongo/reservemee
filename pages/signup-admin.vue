<template>
    <div>
        <div class="signup">
            <div class="signup__left"></div>
            <div class="signup__right">
                <div class="signin__right-card">
                    <form @keyup.enter="onSubmit">
                        <b-field label="Name">
                            <b-input v-model="name" type="text" maxlength="30">
                            </b-input>
                        </b-field>

                        <b-field label="Email">
                            <b-input
                                v-model="email"
                                type="email"
                                maxlength="30"
                            >
                            </b-input>
                        </b-field>

                        <b-field label="Password">
                            <b-input
                                type="password"
                                v-model="password"
                                password-reveal
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
                                >signup</b-button
                            >
                        </b-field>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            password: '',
            error: ''
        };
    },
    computed: {
        ...mapGetters({
            errors: 'signupError',
            loading: 'loaders/loading'
        })
    },
    methods: {
        ...mapActions(['signupAdmin']),
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
                    admin: true
                }
            };
            this.signupAdmin(signupDetails);
        }
    },
    mounted() {
        this.email = localStorage.getItem('email');
    }
};
</script>

<style lang="scss" scoped></style>
