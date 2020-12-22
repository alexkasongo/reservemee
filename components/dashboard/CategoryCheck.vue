<template>
    <!-- CategoryCheck -->
    <div class="w-100">
        <v-alert
            style="cursor: pointer"
            @click="onCreateInitCat"
            icon="mdi-alert-circle-outline"
            text
            type="info"
            >You currently have no services. Start by creating a
            category.</v-alert
        >
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
