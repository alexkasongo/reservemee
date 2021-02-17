<template>
    <div>
        <form>
            <div class="form-group mt-4">
                <b-field label="Forgot your password?">
                    <b-input
                        type="email"
                        class="form-control"
                        placeholder="Enter your email address"
                        v-model="email"
                    />
                </b-field>
                <b-field>
                    <b-input
                        type="email"
                        class="form-control mt-1 mb-3"
                        placeholder="Confirm your email address"
                        v-model="emailConfirm"
                    />
                </b-field>
                <small class="form-text text-muted mb-4">{{
                    errors.message
                }}</small>
                <b-button
                    label="Send me reset password instructions"
                    aria-label="Send me password reset instructions"
                    @click="resetPassword"
                    type="is-primary"
                >
                    Send me reset password instructions
                </b-button>
            </div>
        </form>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
    data() {
        return {
            email: '',
            emailConfirm: '',
            errors: '',
            alert: ''
        };
    },
    methods: {
        async resetPassword() {
            if (this.email !== this.emailConfirm) {
            } else if (this.email === this.emailConfirm) {
                await firebase
                    .auth()
                    .sendPasswordResetEmail(this.emailConfirm)
                    .then(() => {
                        // Email sent.
                        this.alert = 'Email sent.';
                        this.$swal({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: `An Email has been sent to you.`,
                            showConfirmButton: true,
                            timer: 60000
                        });
                        this.$router.push('/signin');
                    })
                    .catch((error) => {
                        // An error happened.
                        this.errors = error;
                        this.$swal({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: `${error.message}`,
                            showConfirmButton: true,
                            timer: 60000
                        });
                    });
            }
        }
    }
};
</script>

<style></style>
