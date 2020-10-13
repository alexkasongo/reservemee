<template>
    <div class="mt-5">
        <v-row dense>
            <v-col v-for="(item, i) in items" :key="i" cols="12">
                <v-card :color="item.color" dark>
                    <div class="d-flex flex-no-wrap justify-space-between">
                        <div>
                            <v-card-title
                                class="headline"
                                v-text="item.title"
                            ></v-card-title>

                            <v-card-subtitle
                                v-text="item.description"
                            ></v-card-subtitle>

                            <v-card-action>
                                <v-btn class="ml-2 mt-5" small text>
                                    View All
                                </v-btn>
                            </v-card-action>
                        </div>

                        <v-avatar class="ma-3" size="125" tile>
                            <v-img :src="item.src"></v-img>
                        </v-avatar>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12">
                <v-card class="mx-auto elevation-20" color="purple" dark>
                    <v-row justify="space-between">
                        <v-col cols="8">
                            <v-card-title>
                                <div>
                                    <div class="headline">Halycon Days</div>
                                    <div>Ellie Goulding</div>
                                    <div>(2013)</div>
                                </div>
                            </v-card-title>
                        </v-col>
                        <v-img
                            class="shrink ma-2"
                            contain
                            height="125px"
                            src="https://cdn.vuetifyjs.com/images/cards/halcyon.png"
                            style="flex-basis: 125px"
                        ></v-img>
                    </v-row>
                    <v-divider dark></v-divider>
                    <v-card-actions class="pa-4">
                        Rate this album
                        <v-spacer></v-spacer>
                        <span class="grey--text text--lighten-2 caption mr-2">
                            ({{ rating }})
                        </span>
                        <v-rating
                            v-model="rating"
                            background-color="white"
                            color="yellow accent-4"
                            dense
                            half-increments
                            hover
                            size="18"
                        ></v-rating>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data: () => ({
        items: [
            {
                color: '#263238',
                src:
                    'https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
                title: 'Nail Extension',
                description: 'Cleaning Nail System'
            },
            {
                color: '#1F7087',
                src:
                    'https://images.unsplash.com/photo-1491295192310-9b78234be718?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
                title: 'Gel Nail Polish',
                description: 'Foster the People'
            },
            {
                color: '#952175',
                src:
                    'https://images.unsplash.com/photo-1599948128020-9a44505b0d1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
                title: 'Treatments',
                description: 'Classic Nail Polish'
            }
        ],
        rating: 4.3
    })
};
</script>

<style lang="scss" scoped></style>
