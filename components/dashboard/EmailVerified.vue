<template>
    <!-- EmailVerified -->
    <!-- FIXME move email verificaiton logic here -->
    <div class="w-100 mb-5">
        <v-card class="light-blue lighten-5" elevation="0">
            <div class="card-body">
                <h5 v-if="user">
                    Your email address is not verified {{ user.name }}.
                </h5>
                <p>Please verify your email.</p>
                <v-btn
                    @click="verifyEmail"
                    type="button"
                    color="blue-grey darken-3
"
                    dark
                    block
                >
                    Verify Email
                </v-btn>
            </div>
        </v-card>
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
