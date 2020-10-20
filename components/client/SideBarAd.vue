<template>
    <div class="side-bar-ad">
        <div
            class="side-bar-ad__ad rounded-lg"
            v-for="(category, id) in categories"
            :key="id"
        >
            <div class="">{{ category.text }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBarAd',
    data: () => ({
        categories: [{ text: 'Ad', image: 'https://via.placeholder.com/150' }]
    })
};
</script>

<style lang="scss" scoped>
</style>