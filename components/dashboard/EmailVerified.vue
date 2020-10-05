<template>
    <!-- EmailVerified -->
    <!-- FIXME move email verificaiton logic here -->
    <div class="card">
        <div class="card-body">
            <h3 v-if="user">
                Your email address is not verified {{ user.name }}.
            </h3>
            <p>Please verify your email.</p>
            <v-btn
                @click="verifyEmail"
                type="button"
                color="teal darken-1"
                dark
                block
            >
                Verify Email
            </v-btn>
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

<style lang="scss" scoped></style>
