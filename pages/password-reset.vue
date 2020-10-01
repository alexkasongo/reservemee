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
                <small class="form-text text-muted">{{ errors.message }}</small>
                <button
                    @click="resetPassword"
                    class="btn btn-info mt-2"
                    type="button"
                >
                    Send me reset password instructions
                </button>
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
                        console.log(
                            `password-reset.vue - 56 - variable`,
                            error
                        );
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
