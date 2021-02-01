<template>
    <div>
        <!-- <div v-if="loading">
            <p>Loading...</p>
        </div> -->
        <div class="signup">
            <div class="signup__left"></div>
            <div class="signup__right">
                <div class="signin__right-card">
                    <div class="h1">Admin Signup</div>
                    <validation-observer ref="observer" v-slot="{ invalid }">
                        <form @submit.prevent="onSubmit">
                            <!-- Name -->
                            <validation-provider
                                v-slot="{ errors }"
                                name="Name"
                                rules="required|max:10"
                            >
                                <v-text-field
                                    v-model="name"
                                    :counter="10"
                                    :error-messages="errors"
                                    label="Name"
                                    required
                                ></v-text-field>
                            </validation-provider>
                            <!-- Name End -->
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
                            <div v-if="errors" class="form-group text-muted">
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
                                submit
                            </v-btn>
                            <v-btn @click="clear"> clear </v-btn>
                        </form>
                    </validation-observer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
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
            name: '',
            phone: '',
            email: '',
            password: ''
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
            let signupDetails = {
                name: this.name,
                email: this.email,
                password: this.password,
                role: {
                    admin: true
                }
            };
            this.signupAdmin(signupDetails);
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

<style lang="scss" scoped></style>
