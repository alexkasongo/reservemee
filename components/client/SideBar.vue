<template>
    <div class="side-bar">
        <div
            class="side-bar__categories rounded-lg"
            v-for="(category, id) in categories"
            :key="id"
        >
            <div class="">{{ category.text }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SideBar',
    data: () => ({
        categories: [
            { text: 'Home', image: 'https://via.placeholder.com/150' },
            { text: 'Top Stores', image: 'https://via.placeholder.com/150' },
            { text: 'New Stores', image: 'https://via.placeholder.com/150' },
            { text: 'Services', image: 'https://via.placeholder.com/150' },
            {
                text: 'Mobile Services',
                image: 'https://via.placeholder.com/150'
            },
            { text: 'Specials', image: 'https://via.placeholder.com/150' }
        ]
    })
};
</script>

<style lang="scss" scoped>
</style>