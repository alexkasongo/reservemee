<template>
    <div>
        <div v-if="loading">
            <p>Loading...</p>
        </div>
        <div class="signup">
            <div class="signup__left"></div>
            <div class="signup__right">
                <div v-if="!loading" class="col-6">
                    <!-- <div class="card">
                        <div class="card-header">Sign Up</div>

                        <div class="card-body">
                            <form @submit.prevent="onSubmit">
                                <div class="form-group">
                                    <input
                                        type="text"
                                        placeholder="Name"
                                        v-model="name"
                                        class="form-control"
                                        required
                                    />
                                </div>

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

                                <div
                                    v-if="errors"
                                    class="form-group text-muted"
                                >
                                    {{ errors.message }}
                                </div>

                                <div class="form-group">
                                    <div class="form-check">
                                        <input
                                            class="form-check-input"
                                            type="checkbox"
                                            value
                                            id="invalidCheck2"
                                            required
                                        />
                                        <label class="form-check-label"
                                            >Agree to terms and
                                            conditions</label
                                        >
                                    </div>
                                </div>

                                <v-btn type="submit" class="teal darken-1" dark
                                    >Submit</v-btn
                                >
                            </form>
                        </div>
                    </div> -->

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
                            <!-- Submit Button -->
                            <v-btn
                                class="mr-4"
                                type="submit"
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

export default {
    components: {
        ValidationProvider,
        ValidationObserver
    },
    data: () => ({
        name: '',
        phone: '',
        email: '',
        password: '',
        name: '',
        email: '',
        checkbox: null
    }),
    computed: {
        ...mapGetters({
            errors: 'signupError'
        }),
        loading() {
            return this.$store.getters.loading;
        }
    },
    methods: {
        ...mapActions(['signup']),
        onSubmit() {
            let signupDetails = {
                name: this.name,
                email: this.email,
                password: this.password
            };
            this.signup(signupDetails);
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
    },
    mounted() {
        this.email = localStorage.getItem('email');
    }
};
</script>

<style lang="scss" scoped>
.signup {
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
