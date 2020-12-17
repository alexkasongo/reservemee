<template>
    <!-- EmailVerified -->
    <div class="w-100 mb-5">
        <v-alert
            style="cursor: pointer"
            @click="onSubmit"
            icon="mdi-alert-circle-outline"
            text
            type="info"
            ><span v-if="user">
                Click to verify your email {{ user.name }}.
            </span></v-alert
        >
    </div>
    <!-- EmailVerified -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'EmailVerified',
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    methods: {
        ...mapActions(['verifyEmail', 'loadUserId', 'user']),
        onSubmit() {
            this.verifyEmail(emailAddress);
        },
        async signout() {
            await firebase
                .auth()
                .signOut()
                .then((result) => {
                    this.user = '';
                    window.localStorage.removeItem('email');
                    window.localStorage.removeItem('vuex');
                });
            this.$router.push('/signin');
        }
    }
};
</script>

<style lang="scss" scoped></style>
