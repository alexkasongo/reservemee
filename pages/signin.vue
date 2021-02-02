<template>
    <div class="signin">
        <div class="signin__left"></div>
        <div class="signin__right">
            <div class="signin__right-card">
                <!-- <div class="h1">Signin</div> -->
                <!-- <validation-observer ref="observer" v-slot="{ invalid }">
                    <form @submit.prevent="onSubmit">

                        <validation-provider
                            v-slot="{ errors }"
                            name="email"
                            rules="required|email"
                        >
                            <v-text-field
                                v-model="email"
                                :error-messages="errors"
                                label="E-mail"
                                required
                            ></v-text-field>
                        </validation-provider>


                        <validation-provider
                            v-slot="{ errors }"
                            name="Password"
                            rules="required|max:10"
                        >
                            <v-text-field
                                type="password"
                                v-model="password"
                                :counter="10"
                                :error-messages="errors"
                                label="Password"
                                required
                            ></v-text-field>
                        </validation-provider>


                        <div v-if="errors" class="form-group text-muted mt-3">
                            {{ errors.message }}
                        </div>


                        <v-btn
                            class="mr-4"
                            type="submit"
                            :loading="loading"
                            :disabled="invalid"
                        >
                            signin
                        </v-btn>
                        <v-btn @click="clear"> clear </v-btn>
                    </form>
                </validation-observer> -->

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

                        <b-field class="buttons">
                            <b-button
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
            password: ''
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
            if (this.email || this.password === '') {
                this.error = 'you must fill in email and password.';
                return;
            }
            let loginDetails = {
                email: this.email,
                password: this.password
            };
            // console.log(`signin.vue - 150 - 🍎`, loginDetails);
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
