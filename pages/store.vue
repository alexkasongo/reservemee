<template>
    <div class="container store margin">
        <!-- BANNER -->
        <StoreBanner />
        <!-- BANNER END -->

        <div style="width: 100%">
            <div class="store__layout">
                <!-- SIDE BANNER -->
                <div class="store__left">
                    <SideBar />
                </div>
                <!-- SIDE BANNER END -->

                <div class="store__right">
                    <!-- STORE CATEGORIES -->
                    <StoreCategories />
                    <!-- STORE CATEGORIES END -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import StoreBanner from '@/components/client/StoreBanner';
import SideBar from '@/components/client/SideBar';
import StoreCategories from '@/components/client/StoreCategories';

export default {
    components: {
        StoreBanner,
        SideBar,
        StoreCategories
    }
};
</script>

<style lang="scss" scoped>
</style>