<template>
    <div class="mt-3">
        <div v-if="!user" class="mt-2">
            <p>loading...</p>
        </div>

        <div v-if="user" class="row gutters-sm">
            <!-- TITLES -->
            <div class="col-md-4 d-none d-md-block">
                <!-- <v-card class="mx-auto" max-width="400">
                    <v-list>
                        <v-list-item-group
                            v-model="model"
                            mandatory
                            color="indigo"
                        >
                            <v-list-item v-for="(item, i) in items" :key="i">
                                <a
                                    style="display: flex; text-decoration: none"
                                    :href="item.href"
                                    data-toggle="tab"
                                >
                                    <v-list-item-icon>
                                        <v-icon v-text="item.icon"></v-icon>
                                    </v-list-item-icon>

                                    <v-list-item-content>
                                        <v-list-item-title
                                            v-text="item.text"
                                        ></v-list-item-title>
                                    </v-list-item-content>
                                </a>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-card> -->
                <div class="card">
                    <div class="card-body">
                        <nav class="nav flex-column nav-pills nav-gap-y-1">
                            <a
                                href="#profile"
                                data-toggle="tab"
                                class="nav-item nav-link has-icon nav-link-faded active"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-user mr-2"
                                >
                                    <path
                                        d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                                    />
                                    <circle cx="12" cy="7" r="4" /></svg
                                >Profile Information
                            </a>
                            <a
                                href="#store"
                                data-toggle="tab"
                                class="nav-item nav-link has-icon nav-link-faded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-activity mr-2"
                                >
                                    <circle cx="8" cy="21" r="2" />
                                    <circle cx="20" cy="21" r="2" />
                                    <path
                                        d="M5.67 6H23l-1.68 8.39a2 2 0 0 1-2 1.61H8.75a2 2 0 0 1-2-1.74L5.23 2.74A2 2 0 0 0 3.25 1H1"
                                    /></svg
                                >Store Settings
                            </a>
                            <a
                                href="#security"
                                data-toggle="tab"
                                class="nav-item nav-link has-icon nav-link-faded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-shield mr-2"
                                >
                                    <path
                                        d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                                    /></svg
                                >Security
                            </a>
                            <a
                                href="#notification"
                                data-toggle="tab"
                                class="nav-item nav-link has-icon nav-link-faded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-bell mr-2"
                                >
                                    <path
                                        d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                                    />
                                    <path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg
                                >Notification
                            </a>
                            <a
                                href="#billing"
                                data-toggle="tab"
                                class="nav-item nav-link has-icon nav-link-faded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-credit-card mr-2"
                                >
                                    <rect
                                        x="1"
                                        y="4"
                                        width="22"
                                        height="16"
                                        rx="2"
                                        ry="2"
                                    />
                                    <line x1="1" y1="10" x2="23" y2="10" /></svg
                                >Billing
                            </a>
                            <a
                                href="#account"
                                data-toggle="tab"
                                class="nav-item nav-link has-icon nav-link-faded"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    stroke-width="2"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    class="feather feather-settings mr-2"
                                >
                                    <circle cx="12" cy="12" r="3" />
                                    <path
                                        d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                                    /></svg
                                >Account Settings
                            </a>
                        </nav>
                    </div>
                </div>
            </div>
            <!-- TITLES END -->

            <div class="col-md-8">
                <div class="card">
                    <!-- CARD HEADER -->
                    <div
                        class="card-header border-bottom mb-3 d-flex d-md-none"
                    >
                        <ul
                            class="nav nav-tabs card-header-tabs nav-gap-x-1"
                            role="tablist"
                        >
                            <li class="nav-item">
                                <a
                                    href="#profile"
                                    data-toggle="tab"
                                    class="nav-link has-icon overideLinks active"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-user"
                                    >
                                        <path
                                            d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                                        />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    href="#store"
                                    data-toggle="tab"
                                    class="nav-link has-icon overideLinks"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-settings"
                                    >
                                        <circle cx="12" cy="12" r="3" />
                                        <path
                                            d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    href="#security"
                                    data-toggle="tab"
                                    class="nav-link has-icon overideLinks"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-shield"
                                    >
                                        <path
                                            d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
                                        />
                                    </svg>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    href="#notification"
                                    data-toggle="tab"
                                    class="nav-link has-icon overideLinks"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-bell"
                                    >
                                        <path
                                            d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                                        />
                                        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                                    </svg>
                                </a>
                            </li>
                            <li class="nav-item">
                                <a
                                    href="#billing"
                                    data-toggle="tab"
                                    class="nav-link has-icon overideLinks"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        class="feather feather-credit-card"
                                    >
                                        <rect
                                            x="1"
                                            y="4"
                                            width="22"
                                            height="16"
                                            rx="2"
                                            ry="2"
                                        />
                                        <line x1="1" y1="10" x2="23" y2="10" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <!-- CARD HEADER END -->

                    <div class="card-body tab-content">
                        <!-- PROFILE -->
                        <div class="tab-pane active" id="profile">
                            <h6>YOUR PROFILE INFORMATION</h6>
                            <hr />
                            <form @submit.prevent="onUpdProfileInfo">
                                <div class="form-group">
                                    <label for="exampleFormControlFile1"
                                        >Picture</label
                                    >
                                    <input
                                        class="form-control"
                                        name="imageUrl"
                                        label="Image URL"
                                        v-model="profileInfo.photoUrl"
                                    />
                                </div>
                                <div
                                    class="form-group imgPreview"
                                    v-bind:style="{
                                        'background-image':
                                            'url(' + profileInfo.photoUrl + ')'
                                    }"
                                ></div>
                                <div class="form-group">
                                    <label for="fullName">Full Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        aria-describedby="fullNameHelp"
                                        placeholder="Enter your fullname"
                                        v-model="profileInfo.name"
                                    />
                                    <small class="form-text text-muted"
                                        >Your name may appear around here where
                                        you are mentioned. You can change or
                                        remove it at any time.</small
                                    >
                                </div>
                                <div class="form-group small text-muted">
                                    All of the fields on this page are optional
                                    and can be deleted at any time, and by
                                    filling them out, you're giving us consent
                                    to share this data wherever your user
                                    profile appears.
                                </div>
                                <v-btn type="submit" class="teal darken-1" dark>
                                    Update Profile
                                </v-btn>
                                <button type="reset" class="btn btn-light">
                                    Reset Changes
                                </button>
                            </form>
                        </div>
                        <!-- PROFILE END -->

                        <!-- STORE INFORMATION -->
                        <div class="tab-pane" id="store">
                            <h6>YOUR STORE INFORMATION</h6>
                            <hr />
                            <form @submit.prevent="onUpdStoreInfo">
                                <div class="form-group">
                                    <label for="exampleFormControlFile1"
                                        >Logo</label
                                    >
                                    <input
                                        required
                                        class="form-control"
                                        name="imageUrl"
                                        label="Image URL"
                                        v-model="form.storeLogo"
                                    />
                                </div>
                                <div
                                    required
                                    class="form-group imgPreview"
                                    v-bind:style="{
                                        'background-image':
                                            'url(' + form.storeLogo + ')'
                                    }"
                                ></div>
                                <div class="form-group">
                                    <label for="fullName">Store Name</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        aria-describedby="storeNameHelp"
                                        placeholder="Enter your store name"
                                        v-model="form.storeName"
                                    />
                                    <small class="form-text text-muted"
                                        >Your name may appear around here where
                                        you are mentioned. You can change or
                                        remove it at any time.</small
                                    >
                                </div>
                                <div class="form-group">
                                    <label for="fullName">Store Email</label>
                                    <input
                                        type="email"
                                        class="form-control"
                                        aria-describedby="storeEmailHelp"
                                        placeholder="Enter your store email"
                                        v-model="form.storeEmail"
                                    />
                                </div>
                                <div class="form-group">
                                    <label for="fullName"
                                        >Store phone number</label
                                    >
                                    <input
                                        type="tel"
                                        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                                        class="form-control"
                                        aria-describedby="storeEmailHelp"
                                        placeholder="Enter your store phone number"
                                        v-model="form.storePhoneNumber"
                                    />
                                    <small class="form-text text-muted"
                                        >Format: 123-456-7890</small
                                    >
                                </div>
                                <div class="form-group">
                                    <label for="bio">Your Store Bio</label>
                                    <textarea
                                        class="form-control autosize"
                                        placeholder="Write a description of your store"
                                        v-model="form.storeBio"
                                        style="
                                            overflow: hidden;
                                            overflow-wrap: break-word;
                                            resize: none;
                                            height: 62px;
                                        "
                                    ></textarea>
                                </div>
                                <div class="form-group">
                                    <label for="exampleFormControlFile1"
                                        >Store Banner</label
                                    >
                                    <input
                                        required
                                        class="form-control"
                                        name="imageUrl"
                                        label="Image URL"
                                        v-model="form.storeBanner"
                                    />
                                </div>
                                <div
                                    required
                                    class="form-group imgPreview"
                                    v-bind:style="{
                                        'background-image':
                                            'url(' + form.storeBanner + ')'
                                    }"
                                ></div>
                                <div class="form-group">
                                    <label for="location">Location</label>
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder="Enter your location"
                                        v-model="form.storeLocation"
                                    />
                                </div>
                                <div class="form-group small text-muted">
                                    All of the fields on this page are optional
                                    and can be deleted at any time, and by
                                    filling them out, you're giving us consent
                                    to share this data wherever your user
                                    profile appears.
                                </div>
                                <v-btn type="submit" class="teal darken-1" dark>
                                    Save Settings
                                </v-btn>
                                <button type="reset" class="btn btn-light">
                                    Reset Changes
                                </button>
                            </form>
                        </div>
                        <!-- STORE INFORMATION END -->

                        <!-- SECURITY SETTINGS -->
                        <div class="tab-pane" id="security">
                            <h6>SECURITY SETTINGS</h6>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <label class="d-block"
                                        >Change Password</label
                                    >
                                    <input
                                        type="password"
                                        class="form-control"
                                        placeholder="Enter your current password"
                                        v-model="currentPassword"
                                        required
                                    />
                                    <div
                                        v-if="errors"
                                        class="form-group text-muted"
                                    >
                                        {{ errors.message }}
                                    </div>
                                    <input
                                        type="password"
                                        class="form-control mt-1"
                                        placeholder="New password"
                                        v-model="newPassword"
                                        required
                                    />
                                    <input
                                        type="password"
                                        class="form-control mt-1 mb-4"
                                        placeholder="Confirm new password"
                                        v-model="confirmNewPassword"
                                        required
                                    />
                                    <div
                                        v-if="errors"
                                        class="form-group text-muted"
                                    >
                                        {{ errors.message }}
                                    </div>
                                    <v-btn
                                        @click="changePassword"
                                        color="red darken-1"
                                        type="button"
                                    >
                                        Change
                                    </v-btn>
                                </div>
                            </form>
                            <hr />
                            <form>
                                <div class="form-group mb-0">
                                    <label class="d-block">Sessions</label>
                                    <p class="font-size-sm text-secondary">
                                        This is a list of devices that have
                                        logged into your account. Revoke any
                                        sessions that you do not recognize.
                                    </p>
                                    <ul class="list-group list-group-sm">
                                        <li class="list-group-item has-icon">
                                            <div>
                                                <h6 class="mb-0">
                                                    San Francisco City
                                                    190.24.335.55
                                                </h6>
                                                <small class="text-muted"
                                                    >Your current session seen
                                                    in United States</small
                                                >
                                            </div>
                                            <button
                                                class="btn btn-light btn-sm ml-auto"
                                                type="button"
                                            >
                                                More info
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                        <!-- SECURITY SETTINGS END -->

                        <!-- NOTIFICATION SETTINGS -->
                        <div class="tab-pane" id="notification">
                            <h6>NOTIFICATION SETTINGS</h6>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <label class="d-block mb-0"
                                        >Security Alerts</label
                                    >
                                    <div class="small text-muted mb-3">
                                        Receive security alert notifications via
                                        email
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck1"
                                            checked
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck1"
                                            >Email each time a vulnerability is
                                            found</label
                                        >
                                    </div>
                                    <div class="custom-control custom-checkbox">
                                        <input
                                            type="checkbox"
                                            class="custom-control-input"
                                            id="customCheck2"
                                            checked
                                        />
                                        <label
                                            class="custom-control-label"
                                            for="customCheck2"
                                            >Email a digest summary of
                                            vulnerability</label
                                        >
                                    </div>
                                </div>
                                <div class="form-group mb-0">
                                    <label class="d-block"
                                        >SMS Notifications</label
                                    >
                                    <ul class="list-group list-group-sm">
                                        <li class="list-group-item has-icon">
                                            Comments
                                            <div
                                                class="custom-control custom-control-nolabel custom-switch ml-auto"
                                            >
                                                <input
                                                    type="checkbox"
                                                    class="custom-control-input"
                                                    id="customSwitch1"
                                                    checked
                                                />
                                                <label
                                                    class="custom-control-label"
                                                    for="customSwitch1"
                                                ></label>
                                            </div>
                                        </li>
                                        <li class="list-group-item has-icon">
                                            Updates From People
                                            <div
                                                class="custom-control custom-control-nolabel custom-switch ml-auto"
                                            >
                                                <input
                                                    type="checkbox"
                                                    class="custom-control-input"
                                                    id="customSwitch2"
                                                />
                                                <label
                                                    class="custom-control-label"
                                                    for="customSwitch2"
                                                ></label>
                                            </div>
                                        </li>
                                        <li class="list-group-item has-icon">
                                            Reminders
                                            <div
                                                class="custom-control custom-control-nolabel custom-switch ml-auto"
                                            >
                                                <input
                                                    type="checkbox"
                                                    class="custom-control-input"
                                                    id="customSwitch3"
                                                    checked
                                                />
                                                <label
                                                    class="custom-control-label"
                                                    for="customSwitch3"
                                                ></label>
                                            </div>
                                        </li>
                                        <li class="list-group-item has-icon">
                                            Events
                                            <div
                                                class="custom-control custom-control-nolabel custom-switch ml-auto"
                                            >
                                                <input
                                                    type="checkbox"
                                                    class="custom-control-input"
                                                    id="customSwitch4"
                                                />
                                                <label
                                                    class="custom-control-label"
                                                    for="customSwitch4"
                                                ></label>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </form>
                        </div>
                        <!-- NOTIFICATION SETTINGS END -->

                        <!-- BILLING -->
                        <div class="tab-pane" id="billing">
                            <h6>BILLING SETTINGS</h6>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <label class="d-block mb-0"
                                        >Payment Method</label
                                    >
                                    <div class="small text-muted mb-3">
                                        You have not added a payment method
                                    </div>
                                    <v-btn
                                        dark
                                        class="cyan darken-1"
                                        type="button"
                                    >
                                        Add Payment Method
                                    </v-btn>
                                </div>
                                <div class="form-group mb-0">
                                    <label class="d-block"
                                        >Payment History</label
                                    >
                                    <div
                                        class="border border-gray-500 bg-gray-200 p-3 text-center font-size-sm"
                                    >
                                        You have not made any payment.
                                    </div>
                                </div>
                            </form>
                        </div>
                        <!-- BILLING END -->

                        <!-- ACCOUNT -->
                        <div class="tab-pane" id="account">
                            <h6>ACCOUNT SETTINGS</h6>
                            <hr />
                            <form>
                                <div class="form-group">
                                    <label class="d-block text-danger"
                                        >Delete Account</label
                                    >
                                    <p class="text-muted font-size-sm">
                                        Once you delete your account, there is
                                        no going back. Please be certain.
                                    </p>
                                </div>
                                <v-btn
                                    @click="deleteAccount"
                                    color="red darken-1"
                                    type="button"
                                >
                                    Delete Account
                                </v-btn>
                            </form>
                        </div>
                        <!-- ACCOUNT END -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { mapGetters, mapActions } from 'vuex';

export default {
    data() {
        return {
            user: '',
            test: '',
            loggedInUser: '',
            alert: '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
            errors: '',
            currentUser: {
                name: ''
            },
            profileInfo: {
                name: '',
                photoUrl: ''
            },
            form: {
                storeLogo: '', // https://via.placeholder.com/500
                storeName: '',
                storeBio: '',
                storeBanner: '', // https://via.placeholder.com/500
                storeLocation: ''
            },
            items: [
                {
                    icon: 'mdi-wifi',
                    text: 'Profile Information',
                    href: '#profile'
                },
                {
                    icon: 'mdi-bluetooth',
                    text: 'Store Settings',
                    href: '#store'
                },
                {
                    icon: 'mdi-chart-donut',
                    text: 'Security',
                    href: '#security'
                },
                {
                    icon: 'mdi-chart-donut',
                    text: 'Notification',
                    href: '#notification'
                },
                {
                    icon: 'mdi-chart-donut',
                    text: 'Billing',
                    href: '#billing'
                },
                {
                    icon: 'mdi-chart-donut',
                    text: 'Account Settings',
                    href: '#account'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            categories: 'categories',
            storeProfile: 'storeProfile',
            storeAlert: 'alert',
            userData: 'userData'
        }),
        loading() {
            return this.$store.getters.loading;
        },
        userInfo() {
            return this.$store.state.userData;
        }
    },
    methods: {
        ...mapActions([
            'updateStoreProfile',
            'loadStoreProfile',
            'loadUserIdData',
            'updateUserProfile',
            'loadUser',
            'closeAlert'
        ]),
        async signout() {
            await firebase
                .auth()
                .signOut()
                .then(() => {
                    console.log('🏝 🚧');
                    this.user = '';
                    localStorage.clear('email');
                });
            this.$router.push('/signin');
        },
        changePassword() {
            if (this.newPassword !== this.confirmNewPassword) {
                console.log('Passwords do not match');
                this.$swal({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Passwords do not match.',
                    showConfirmButton: false,
                    timer: 3000
                });
            } else {
                this.$swal({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, change it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        if (this.newPassword === this.confirmNewPassword) {
                            console.log('Passwords match');
                            console.log(
                                `current:`,
                                this.currentPassword,
                                `new:`,
                                this.confirmNewPassword
                            );

                            const currentPassword = this.currentPassword;
                            const newPassword = this.confirmNewPassword;

                            this.reauthenticate(currentPassword);
                            this.changePasswordNow(
                                currentPassword,
                                newPassword
                            );
                        }
                    }
                });
            }
        },
        reauthenticate(currentPassword) {
            const user = firebase.auth().currentUser;
            const cred = firebase.auth.EmailAuthProvider.credential(
                this.user.email,
                currentPassword
            );
            return user.reauthenticateWithCredential(cred);
        },
        changePasswordNow(currentPassword, newPassword) {
            this.reauthenticate(currentPassword)
                .then(() => {
                    var user = firebase.auth().currentUser;
                    user.updatePassword(newPassword)
                        .then(() => {
                            console.log('Password updated! 🙈 🙏🏾 🏆 ');
                            this.$swal({
                                toast: true,
                                position: 'top-end',
                                icon: 'success',
                                title: 'Password changed.',
                                showConfirmButton: false,
                                timer: 3000
                            });
                            this.signout();
                        })
                        .catch((error) => {
                            this.errors = error;
                            console.log('🇿🇦', error);
                        });
                })
                .catch((error) => {
                    this.errors = error;
                    console.log('🧩', error);
                });
            this.signout;
        },
        async deleteAccount() {
            const categoryDelete = await firebase
                .database()
                .ref('categories')
                .child(`${this.categories[0].id}`);
            categoryDelete.remove();
        },
        onUpdProfileInfo() {
            const payload = {
                name: this.profileInfo.name,
                photoUrl: this.profileInfo.photoUrl
            };
            this.updateUserProfile(payload);
        },
        closeAlert() {
            this.closeAlert();
        },
        onUpdStoreInfo() {
            //NOTE replace empty space with a dash and lowercase all uppercases
            let storeName = this.form.storeName
                .replace(/\s+/g, '-')
                .toLowerCase();

            const data = {
                userId: this.user.uid,
                storeLogo: this.form.storeLogo,
                storeName: storeName,
                storeEmail: this.form.storeEmail,
                storePhoneNumber: this.form.storePhoneNumber,
                storeBio: this.form.storeBio,
                storeBanner: this.form.storeBanner,
                storeLocation: this.form.storeLocation
            };

            this.updateStoreProfile(data);
            // this.alert = 'Saved...';
        }
    },
    mounted() {
        // observer to keep track of the user's sign-in status.
        // on onUpdProfileInfo user details are updated in firebase triggering observer
        // allowing for reactive user update experience
        firebase.auth().onAuthStateChanged((user) => {
            if (user !== null) {
                this.user = user;
                this.profileInfo.name = user.displayName;
                this.profileInfo.photoUrl = user.photoURL;
            }
        });
        // if the state is undfined or the object does not exist, return null
        if (
            this.$store.state.userData.length <= 0 ||
            !this.$store.state.userData[0].storeProfile
        ) {
            return null;
        } else {
            this.form.storeLogo = this.userInfo[0].storeProfile.storeLogo;
            this.form.storeName = this.userInfo[0].storeProfile.storeName;
            this.form.storeEmail = this.userInfo[0].storeProfile.storeEmail;
            this.form.storePhoneNumber = this.userInfo[0].storeProfile.storePhoneNumber;
            this.form.storeBio = this.userInfo[0].storeProfile.storeBio;
            this.form.storeBanner = this.userInfo[0].storeProfile.storeBanner;
            this.form.storeLocation = this.userInfo[0].storeProfile.storeLocation;
        }
    }
};
</script>

<style lang="scss" scoped>
.imgPreview {
    height: 200px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}
</style>
