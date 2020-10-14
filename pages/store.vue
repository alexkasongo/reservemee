<template>
    <div>
        <v-card class="mx-auto" max-width="400" rounded="0">
            <div class="store__card">
                <v-img
                    class="white--text align-end"
                    height="440px"
                    src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
                >
                    <div class="store__card-title">
                        <v-btn>Click Me</v-btn>
                    </div>
                </v-img>
            </div>

            <v-card-subtitle class="pb-0"> Number 10 </v-card-subtitle>

            <v-card-text class="text--primary">
                <div>Whitehaven Beach</div>

                <div>Whitsunday Island, Whitsunday Islands</div>
            </v-card-text>

            <v-card-actions>
                <v-btn color="orange" text> Share </v-btn>

                <v-btn color="orange" text> Explore </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.store {
    &__card {
        margin-top: 56px;
        position: relative;
    }
    &__card-title {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
}
</style>