<template>
    <div class="signin">
        <div class="signin__left"></div>
        <div class="signin__right">
            <div class="col-6">
                <div class="h1">Signin</div>
                <validation-observer ref="observer" v-slot="{ invalid }">
                    <form @submit.prevent="onSubmit">
                        <!-- Email -->
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
                        <!-- Email End -->
                        <!-- Password -->
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
                        <!-- Password End -->
                        <!-- ERRORS -->
                        <div v-if="errors" class="form-group text-muted mt-3">
                            {{ errors.message }}
                        </div>
                        <!-- ERRORS END -->
                        <!-- Submit Button -->
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
                </validation-observer>
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
            let loginDetails = {
                email: this.email,
                password: this.password
            };
            this.login(loginDetails);
        },
        // Vee Validate
        submit() {
            this.$refs.observer.validate();
        },
        clear() {
            this.name = '';
            this.email = '';
            this.select = null;
            this.checkbox = null;
            this.$refs.observer.reset();
        }
        // Vee Validate End
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
        // background-color: #00897b;
    }
}
</style>
