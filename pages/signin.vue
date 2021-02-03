<template>
    <div class="signin">
        <div class="signin__left"></div>
        <div class="signin__right">
            <div class="signin__right-card">
                <form @submit.prevent="onSubmit">
                    <section>
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
                                >signin</b-button
                            >
                        </b-field>
                    </section>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { mapGetters, mapActions } from 'vuex';

import { required, email, max } from 'vee-validate/dist/rules';
import {
    extend,
    ValidationObserver,
    ValidationProvider,
    setInteractionMode
} from 'vee-validate';

/*
 ** Vee Validate
 */
setInteractionMode('eager');

extend('required', {
    ...required,
    message: '{_field_} can not be empty'
});

extend('max', {
    ...max,
    message: '{_field_} may not be greater than {length} characters'
});

extend('email', {
    ...email,
    message: 'Email must be valid'
});
// Vee Validate End

export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
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
        }
        // Vee Validate
        // submit() {
        //     this.$refs.observer.validate();
        // },
        // clear() {
        //     this.name = '';
        //     this.email = '';
        //     this.select = null;
        //     this.checkbox = null;
        //     this.$refs.observer.reset();
        // }
        // Vee Validate End
    },
    mounted() {
        this.email = localStorage.getItem('email');
    }
};
</script>

<style lang="scss" scoped></style>
