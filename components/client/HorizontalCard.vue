<template>
    <!-- <v-app-bar dark color="pink">
            <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <v-toolbar-title>My Services</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar> -->
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
        ]
    })
};
</script>

<style lang="scss" scoped></style>
