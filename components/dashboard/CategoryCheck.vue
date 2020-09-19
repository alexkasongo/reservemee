<template>
    <!-- CategoryCheck -->
    <div class="w-100">
        <div class="card">
            <div class="card-header">Dashboard</div>
            <div class="card-body">
                <h3 v-if="user">Welcome {{ user.name }}</h3>
                <p>You currently have no services. Start by creating a category.</p>

                <button
                    @click="onCreateInitCat"
                    type="button"
                    class="btn btn-block btn-success"
                >Create Category</button>
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
            this.createUserTable(this.userId);
            this.$router.push('/service/create-category');
        }
    }
};
</script>

<style lang="scss" scoped>
</style>