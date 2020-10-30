<template>
    <v-card class="mx-auto rounded-xl">
        <v-card-title class="headline"> Rate My Service </v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="justify-space-between">
            <v-btn text> No Thanks </v-btn>
            <v-btn color="primary" text> Rate Now </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
export default {
    name: 'Ratings',
    data: () => ({
        rating: 4.5
    })
};
</script>