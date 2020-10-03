<template>
    <!-- BusinessInfo -->
    <div class="mb-5">
        <h4 class="header-title mt-0">Store Bio</h4>
        <div class="panel-body">
            <p class="text-muted font-13">{{ storeProfile.storeBio }}</p>
            <hr />
            <div class="text-left">
                <p class="text-muted font-13">
                    <strong>Store Name :</strong>
                    <span class="m-l-15">{{
                        storeProfile.storeName | capitalize
                    }}</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Mobile :</strong>
                    <span class="m-l-15">{{
                        storeProfile.storePhoneNumber
                    }}</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Email :</strong>
                    <span class="m-l-15">{{ storeProfile.storeEmail }}</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Location :</strong>
                    <span class="m-l-15">{{ storeProfile.storeLocation }}</span>
                </p>
                <p class="text-muted font-13">
                    <strong>Services :</strong>
                    <span v-for="(service, id) in services" :key="id">
                        <span class="m-l-5">
                            <span
                                class="flag-icon flag-icon-us m-r-5 m-t-0"
                                title="us"
                            ></span>
                            <span>{{ service.name }}</span>
                        </span>
                    </span>
                </p>
            </div>
            <ul class="social-links list-inline mt-4 mb-0">
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Facebook"
                    >
                        <i class="fa text-dark fa-facebook"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Twitter"
                    >
                        <i class="fa text-dark fa-twitter"></i>
                    </a>
                </li>
                <li class="list-inline-item">
                    <a
                        title
                        data-placement="top"
                        data-toggle="tooltip"
                        class="tooltips"
                        href
                        data-original-title="Skype"
                    >
                        <i class="fa text-dark fa-skype"></i>
                    </a>
                </li>
            </ul>
        </div>
    </div>
    <!-- BusinessInfo -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'BusinessInfo',
    data() {
        return {
            services: [
                {
                    name: 'Service1'
                },
                {
                    name: 'Service2'
                },
                {
                    name: 'Service3'
                },
                {
                    name: 'Service4'
                }
            ]
        };
    },
    computed: {
        ...mapGetters({
            user: 'user'
        }),
        storeProfile() {
            const data = this.$store.state.userData[0].storeProfile;
            return data;
        }
    }
};
</script>

<style lang="scss" scoped></style>
