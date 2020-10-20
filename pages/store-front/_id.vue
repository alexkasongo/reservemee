<template>
    <div class="container margin">
        <h1>Welcome to your store: {{ this.$route.params.name }}</h1>
        <p>id: {{ this.$route.params.id }}</p>
    </div>
</template>

<script>
export default {
    watch: {
        $route() {
            // this.loadServices(this.userId);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>