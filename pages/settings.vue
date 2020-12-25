<template>
    <div class="settings">
        <v-app>
            <v-app>
                <v-navigation-drawer
                    class="margin"
                    v-model="drawer"
                    app
                    permanent
                    :mini-variant="mini"
                >
                    <v-list-item class="px-2">
                        <v-list-item-avatar v-if="user.photoURL">
                            <v-img :src="user.photoURL"></v-img>
                        </v-list-item-avatar>
                        <v-list-item-avatar v-else>
                            <v-img
                                src="https://via.placeholder.com/250"
                            ></v-img>
                        </v-list-item-avatar>

                        <v-list-item-title>{{
                            user.displayName
                        }}</v-list-item-title>
                    </v-list-item>
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
                                    v-if="
                                        this.selected === 'Store Settings' &&
                                        role.admin
                                    "
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
import * as firebase from 'firebase/app';
import 'firebase/auth';

export default {
    data: () => ({
        user: [],
        role: [],
        drawer: null,
        items: null,
        mini: false,
        source: 'https://via.placeholder.com/500',
        selected: ''
    }),
    methods: {
        onLinkClick(item) {
            this.selected = item.text;
        }
    },
    computed: {
        validatedItems() {
            if (this.role.admin) {
                return [
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
                ];
            } else if (this.role.customer) {
                return [
                    { icon: 'mdi-account', text: 'Profile Information' },
                    { divider: true },
                    { icon: 'mdi-shield', text: 'Security' },
                    { divider: true },
                    { icon: 'mdi-bell', text: 'Notifications' },
                    { divider: true },
                    { icon: 'mdi-credit-card', text: 'Billing' },
                    { icon: 'mdi-cog', text: 'Account Settings' },
                    { icon: 'mdi-help-circle', text: 'Help' }
                ];
            }
        },
        viewPort() {
            // Define our viewportWidth variable
            let viewportWidth;

            // Set/update the viewportWidth value
            let setViewportWidth = function () {
                viewportWidth =
                    window.innerWidth || document.documentElement.clientWidth;
            };

            // Log the viewport width into the console
            let logWidth = () => {
                if (viewportWidth > 640) {
                    // console.log('Wide viewport');
                    this.mini = false;
                } else {
                    // console.log('Small viewport');
                    this.mini = true;
                }
            };

            // Set our initial width and log it
            setViewportWidth();
            logWidth();

            // On resize events, recalculate and log
            window.addEventListener(
                'resize',
                function () {
                    setViewportWidth();
                    logWidth();
                },
                false
            );
        }
    },
    mounted() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                // User is signed in.
                // check user status
                firebase
                    .auth()
                    .currentUser.getIdTokenResult()
                    .then((tokenResult) => {
                        if (tokenResult) {
                            this.role = tokenResult.claims;
                            console.log(this.validatedItems);
                            this.items = this.validatedItems;
                        }
                    });

                this.user = user;
            }
        });

        // start tracking the viewport
        this.viewPort;
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