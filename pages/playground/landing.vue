<template>
    <div class="settings">
        <v-app>
            <v-app>
                <v-navigation-drawer
                    class="margin"
                    v-model="drawer"
                    app
                    clipped
                    :mini-variant.sync="mini"
                >
                    <v-btn icon @click.stop="mini = !mini">
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-list dense>
                        <template v-for="(item, i) in items">
                            <v-divider
                                v-if="item.divider"
                                :key="i"
                                dark
                                class="my-4"
                            ></v-divider>

                            <v-list-item
                                v-else
                                :key="i"
                                @click="onLinkClick(item)"
                                link
                            >
                                <v-list-item-action>
                                    <v-icon color="teal darker-1">{{
                                        item.icon
                                    }}</v-icon>
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
                    <v-container fluid class="fill-height">
                        <v-row class="settings__right-row">
                            <v-col>
                                <ProfileInformation
                                    v-if="
                                        this.selected ===
                                            'Profile Information' ||
                                        this.selected === ''
                                    "
                                />
                                <StoreSettings
                                    v-if="this.selected === 'Store Settings'"
                                />
                                <Security v-if="this.selected === 'Security'" />
                                <Notifications
                                    v-if="this.selected === 'Notifications'"
                                />
                                <Billing v-if="this.selected === 'Billing'" />
                                <AccountSettings
                                    v-if="this.selected === 'Account Settings'"
                                />
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
        mini: false,
        source: 'https://via.placeholder.com/500',
        selected: ''
    }),
    methods: {
        onLinkClick(item) {
            this.selected = item.text;
        }
    }
};
</script>

<style lang="scss" scoped>
.margin {
    // margin: 90px auto 0 auto;
    margin-top: 64px;
}
.settings {
    &__right-row {
        height: 100%;
    }
}
</style>
