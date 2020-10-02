<template>
    <div>
        <div v-if="loading" class="col-md-6 mt-2">
            <p>loading...</p>
        </div>
        <div v-if="!loading" class="d-flex flex-row justify-content-center">
            <div class="col-md-8 mt-5">
                <div class="card">
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

                            <div v-if="errors" class="form-group text-muted">
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
                                        >Agree to terms and conditions</label
                                    >
                                </div>
                            </div>

                            <v-btn type="submit" class="teal darken-1" dark
                                >Submit</v-btn
                            >
                        </form>
                    </div>
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
        ...mapActions(['signup']),
        onSubmit() {
            let signupDetails = {
                name: this.name,
                email: this.email,
                password: this.password
            };
            this.signup(signupDetails);
        }
    },
    mounted() {
        this.email = localStorage.getItem('email');
    }
    // destroyed() {
    //     localStorage.clear();
    // }
};
</script>

<style></style>
