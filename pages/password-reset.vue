<template>
    <div class="container">
        <form>
            <div class="form-group">
                <label class="d-block">Reset Password</label>
                <input
                    type="email"
                    class="form-control"
                    placeholder="Enter your email address"
                    v-model="email"
                />
                <input
                    type="email"
                    class="form-control mt-1"
                    placeholder="Confirm your email address"
                    v-model="emailConfirm"
                />
                <button @click="resetPassword" class="btn btn-info mt-2" type="button">Reset</button>
                <p
                    class="small text-muted mt-2"
                >A password reset email will be sent to your email address. Follow the steps to reset your password.</p>
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
                console.log(`password-reset.vue - 38 - Emails don't match🇵🇲`);
            } else if (this.email === this.emailConfirm) {
                console.log(`password-reset.vue - 38 - Yay emails match🇵🇲`);
                await firebase
                    .auth()
                    .sendPasswordResetEmail(this.emailConfirm)
                    .then(() => {
                        // Email sent.
                        this.alert = 'Email sent.';
                        alert(`index.js - 173 - EMAIL SENT`);
                        this.$router.push('/signin');
                    })
                    .catch((error) => {
                        // An error happened.
                        console.log(
                            `password-reset.vue - 56 - variable`,
                            error
                        );
                        this.errors = error;
                    });
            }
        }
    }
};
</script>

<style>
</style>