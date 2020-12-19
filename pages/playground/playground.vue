<template>
    <div id="app">
        <v-app id="inspire">
            <v-app id="keep">
                <v-app-bar app clipped-left color="teal darker-1">
                    <v-app-bar-nav-icon
                        @click="drawer = !drawer"
                    ></v-app-bar-nav-icon>
                    <span class="title ml-3 mr-5">Google</span>
                    <v-text-field
                        solo-inverted
                        flat
                        hide-details
                        label="Search"
                    ></v-text-field>

                    <v-spacer></v-spacer>
                </v-app-bar>

                <v-navigation-drawer
                    v-model="drawer"
                    app
                    clipped
                    color="grey lighten-4"
                    :mini-variant.sync="mini"
                >
                    <v-btn icon @click.stop="mini = !mini">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-list dense class="grey lighten-4">
                        <template v-for="(item, i) in items">
                            <v-divider
                                v-if="item.divider"
                                :key="i"
                                dark
                                class="my-4"
                            ></v-divider>
                            <v-list-item v-else :key="i" link>
                                <v-list-item-action>
                                    <v-icon>{{ item.icon }}</v-icon>
                                </v-list-item-action>
                                <v-list-item-content>
                                    <v-list-item-title class="grey--text">
                                        {{ item.text }}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-list>
                </v-navigation-drawer>

                <v-main>
                    <v-container fluid class="grey lighten-4 fill-height">
                        <v-row justify="center" align="center">
                            <v-col class="shrink">
                                <v-tooltip right>
                                    <template v-slot:activator="{ on }">
                                        <v-btn
                                            :href="source"
                                            icon
                                            large
                                            target="_blank"
                                            v-on="on"
                                        >
                                            <v-icon large>mdi-code-tags</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Source</span>
                                </v-tooltip>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-main>
            </v-app>
        </v-app>
    </div>
</template>

<script>
export default {
    data: () => ({
        drawer: null,
        items: [
            { icon: 'mdi-account', text: 'Profile Information' },
            { icon: 'mdi-cart', text: 'Store Settings' },
            { divider: true },
            { icon: 'mdi-shield', text: 'Security' },
            { divider: true },
            { icon: 'mdi-bell', text: 'Notifications' },
            { divider: true },
            { icon: 'mdi-credit-card', text: 'Billing' },
            { icon: 'mdi-cog', text: 'Account Settings' },
            { icon: 'mdi-help-circle', text: 'Help' }
        ],
        mini: false
    })
};
</script>

<style lang="scss" scoped>
#keep .v-navigation-drawer__border {
    display: none;
}
</style>