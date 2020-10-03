<template>
    <!-- CategoryCheck -->
    <div class="w-100">
        <div class="card">
            <div class="card-body">
                <h3 v-if="user">Welcome {{ user.name }}</h3>
                <p>
                    You currently have no services. Start by creating a
                    category.
                </p>

                <v-btn
                    @click="onCreateInitCat"
                    type="button"
                    block
                    color="teal darken-1"
                    dark
                    >Create Category</v-btn
                >
            </div>
        </div>
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
        ...mapActions(['createUserTable']),
        onCreateInitCat() {
            // this.createUserTable(this.user.uid);
            this.$router.push('/service/create-category');
        }
    }
};
</script>

<style lang="scss" scoped></style>
