<template>
    <!-- CategoryCheck -->
    <div class="w-100 mb-5">
        <v-card class="light-blue lighten-5" elevation="0">
            <div class="card-body">
                <h5 v-if="user">Welcome {{ user.name }}</h5>
                <p>
                    You currently have no services. Start by creating a
                    category.
                </p>

                <v-btn
                    @click="onCreateInitCat"
                    type="button"
                    block
                    color="blue-grey darken-3
"
                    dark
                    >Create Category</v-btn
                >
            </div>
        </v-card>
    </div>
    <!-- CategoryCheck -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CategoryCheck',
    computed: {
        ...mapGetters({
            user: 'user'
        })
    },
    methods: {
        onCreateInitCat() {
            this.$router.push('/service/create-category');
        }
    }
};
</script>

<style lang="scss" scoped></style>
