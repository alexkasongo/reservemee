<template>
    <div class="g-padding store margin">
        <div class="container">
            <!-- BANNER -->
            <StoreBanner />
            <!-- BANNER END -->

            <div style="width: 100%">
                <div class="store__layout">
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
    data: () => ({
        icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram']
    }),
    components: {
        StoreBanner,
        SideBar,
        StoreCategories
    }
};
</script>

<style lang="scss" scoped></style>
