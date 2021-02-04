<template>
    <v-footer dark padless>
        <div flat tile class="teal darker-1 white--text text-center">
            <div-text>
                <div
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4 white--text"
                    icon
                >
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                </div>
            </div-text>

            <div-text class="white--text pt-0">
                Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit
                amet. Mauris cursus commodo interdum. Praesent ut risus eget
                metus luctus accumsan id ultrices nunc. Sed at orci sed massa
                consectetur dignissim a sit amet dui. Duis commodo vitae velit
                et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat
                augue vel ipsum ultrices, cursus iaculis dui sollicitudin.
                Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci
                varius natoque penatibus et magnis dis parturient montes,
                nascetur ridiculus mus.
            </div-text>

            <v-divider></v-divider>

            <div-text class="white--text">
                {{ new Date().getFullYear() }} —
                <strong>Aleko</strong>
            </div-text>
        </div>
    </v-footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
