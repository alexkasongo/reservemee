<template>
    <!-- EmailVerified -->
    <div class="card">
        <div class="card-body">
            <h3 v-if="user">Your email address is not verified.</h3>
            <p>Verified: {{ user.emailVerified }}</p>
            <button
                @click="verifyEmail"
                type="button"
                class="btn btn-block btn-success"
            >Verify Email</button>
        </div>
    </div>
    <!-- EmailVerified -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'EmailVerified',
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    methods: {
        verifyEmail() {
            this.$router.push('/verification');
        }
    }
};
</script>

<style lang="scss" scoped>
</style>