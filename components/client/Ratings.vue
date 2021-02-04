<template>
    <div>
        <div-title class="headline"> Rate My Service </div-title>
        <div-text>
            If you enjoy using my service, please take a few seconds to rate
            your experience with my service. It really helps!

            <div class="text-center mt-12">
                <v-rating
                    v-model="rating"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    empty-icon="$ratingFull"
                    half-increments
                    hover
                    medium
                ></v-rating>
            </div>
        </div-text>
        <v-divider></v-divider>
        <div class="justify-space-between">
            <div text>No Thanks</div>
            <div color="primary" text>Rate Now</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Ratings',
    data: () => ({
        rating: 4.5
    })
};
</script>
