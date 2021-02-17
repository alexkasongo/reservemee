<template>
    <!-- EmailVerified -->
    <section class="b-tooltips">
        <b-tooltip position="is-bottom" multilined style="width: 100%">
            <b-notification
                :closable="false"
                style="cursor: pointer"
                @click="onSubmit"
                type="is-warning"
                aria-close-label="Close notification"
            >
                Verify your email {{ user.name }}
            </b-notification>
            <template v-slot:content>
                <b>Email verification</b>, click on this notification to get a
                verification email sent to you.
            </template>
        </b-tooltip>
    </section>
    <!-- EmailVerified -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'EmailVerified',
    computed: {
        ...mapGetters({
            user: 'user',
            loading: 'loaders/loading'
        })
    },

    methods: {
        ...mapActions(['verifyEmail', 'loadUserId']),
        onSubmit() {
            this.verifyEmail();
        },
        async signout() {
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    if (process.browser) {
                        localStorage.removeItem('email');
                        localStorage.removeItem('vuex');
                    }
                });
            this.$router.push('/signin');
        }
    }
};
</script>

<style lang="scss" scoped></style>
