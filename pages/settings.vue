<template>
    <div class="settings">
        <div class="sidebar-page">
            <section class="sidebar-layout">
                <b-sidebar
                    position="static"
                    :mobile="mobile"
                    :expand-on-hover="expandOnHover"
                    :reduce="reduce"
                    :fullheight="true"
                    type="is-light"
                    open
                    class="sidebar"
                >
                    <div class="p-1">
                        <div class="block">
                            <ul>
                                <li v-if="user.photoURL">
                                    <img
                                        :src="user.photoURL"
                                        style="height: 100px"
                                    />
                                </li>
                                <li v-else>
                                    <img
                                        src="https://via.placeholder.com/250"
                                    />
                                </li>

                                <li>{{ user.displayName }}</li>
                            </ul>
                        </div>
                        <b-menu class="is-custom-mobile">
                            <b-menu-list label="Settings">
                                <div v-for="(item, i) in items" :key="i">
                                    <b-menu-item
                                        @click="onLinkClick(item)"
                                        :icon="item.icon"
                                        :label="item.text"
                                    >
                                    </b-menu-item>
                                </div>
                            </b-menu-list>

                            <b-menu-list label="Actions">
                                <b-menu-item
                                    icon="logout"
                                    label="Logout"
                                ></b-menu-item>
                            </b-menu-list>
                        </b-menu>
                    </div>
                </b-sidebar>

                <div class="settings-container">
                    <div class="ml-5 mr-5">
                        <ProfileInformation
                            v-if="
                                this.selected === 'Profile Information' ||
                                this.selected === ''
                            "
                        />
                        <StoreSettings
                            v-if="
                                this.selected === 'Store Settings' && role.admin
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
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { db } from '@/plugins/firebase';

export default {
    data: () => ({
        user: [],
        role: null,
        items: null,
        source: 'https://via.placeholder.com/500',
        selected: '',
        expandOnHover: false,
        mobile: 'reduce',
        reduce: false
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
                    { icon: 'account-outline', text: 'Profile Information' },
                    { icon: 'cart-outline', text: 'Store Settings' },
                    { icon: 'shield-outline', text: 'Security' },
                    { icon: 'bell-outline', text: 'Notifications' },
                    { icon: 'credit-card-outline', text: 'Billing' },
                    { icon: 'cog-outline', text: 'Account Settings' },
                    { icon: 'help-circle-outline', text: 'Help' }
                ];
            } else if (this.role.customer) {
                return [
                    { icon: 'account-outline', text: 'Profile Information' },
                    { icon: 'shield-outline', text: 'Security' },
                    { icon: 'bell-outline', text: 'Notifications' },
                    { icon: 'credit-card-outline', text: 'Billing' },
                    { icon: 'cog-outline', text: 'Account Settings' },
                    { icon: 'help-circle-outline', text: 'Help' }
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
                    this.mini = false;
                } else {
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
        firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this.user = user;

                // get logged in user role
                await db
                    .collection('roles')
                    .doc(user.uid)
                    .get()
                    .then((res) => {
                        this.role = res.data().role;
                        this.items = this.validatedItems;
                    });

                // get logged in user role - end
            }
        });

        // start tracking the viewport
        this.viewPort;
    }
};
</script>

<style lang="scss">
.p-1 {
    padding: 1em;
}
.sidebar-page {
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: 100%;
    min-height: 100vh;
    .sidebar-layout {
        display: flex;
        flex-direction: row;
        // height: calc(100vh - 56px);
        min-height: 100vh;
    }
}
@media screen and (max-width: 1023px) {
    .b-sidebar {
        .sidebar-content {
            box-shadow: none;
            &.is-mini-mobile {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
@media screen and (min-width: 1024px) {
    .b-sidebar {
        .sidebar-content {
            box-shadow: none;
            &.is-mini {
                &:not(.is-mini-expand),
                &.is-mini-expand:not(:hover) {
                    .menu-list {
                        li {
                            a {
                                span:nth-child(2) {
                                    display: none;
                                }
                            }
                            ul {
                                padding-left: 0;
                                li {
                                    a {
                                        display: inline-block;
                                    }
                                }
                            }
                        }
                    }
                    .menu-label:not(:last-child) {
                        margin-bottom: 0;
                    }
                }
            }
        }
    }
}
.is-mini-expand {
    .menu-list a {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}
.settings-container {
    width: 100%;
}
</style>
