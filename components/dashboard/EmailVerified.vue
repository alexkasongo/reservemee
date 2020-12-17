<template>
    <!-- EmailVerified -->
    <div class="w-100 mb-5">
        <v-alert
            class="mb-0"
            style="cursor: pointer"
            @click="onSubmit"
            icon="mdi-alert-circle-outline"
            text
            type="info"
            ><span v-if="user">
                Click to verify your email {{ user.name }}.
            </span></v-alert
        >
        <v-progress-linear
            v-if="loading"
            indeterminate
            class="rounded-xl"
            color="primary"
        ></v-progress-linear>
    </div>
    <!-- EmailVerified -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
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
                .then((result) => {
                    // this.user = '';
                    window.localStorage.removeItem('email');
                    window.localStorage.removeItem('vuex');
                });
            this.$router.push('/signin');
        }
    }
};
</script>

<style lang="scss" scoped></style>
