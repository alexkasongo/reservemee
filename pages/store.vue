<template>
    <div class="store margin">
        <div class="container">
            <!-- BANNER -->
            <StoreBanner />
            <!-- BANNER END -->

            <div style="width: 100%">
                <div class="store__layout">
                    <!-- SIDE BANNER -->
                    <div class="store__left">
                        <SideBar />
                        <SideBarAd />
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
        <v-footer dark padless>
            <v-card flat tile class="teal darker-1 white--text text-center">
                <v-card-text>
                    <v-btn
                        v-for="icon in icons"
                        :key="icon"
                        class="mx-4 white--text"
                        icon
                    >
                        <v-icon size="24px">
                            {{ icon }}
                        </v-icon>
                    </v-btn>
                </v-card-text>

                <v-card-text class="white--text pt-0">
                    Phasellus feugiat arcu sapien, et iaculis ipsum elementum
                    sit amet. Mauris cursus commodo interdum. Praesent ut risus
                    eget metus luctus accumsan id ultrices nunc. Sed at orci sed
                    massa consectetur dignissim a sit amet dui. Duis commodo
                    vitae velit et faucibus. Morbi vehicula lacinia malesuada.
                    Nulla placerat augue vel ipsum ultrices, cursus iaculis dui
                    sollicitudin. Vestibulum eu ipsum vel diam elementum tempor
                    vel ut orci. parturient montes, nascetur ridiculus mus.
                </v-card-text>

                <v-divider></v-divider>

                <v-card-text class="white--text">
                    {{ new Date().getFullYear() }} —
                    <strong>Aleko</strong>
                </v-card-text>
            </v-card>
        </v-footer>
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

<style lang="scss" scoped>
</style>