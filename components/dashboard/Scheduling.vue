<template>
    <div>
        <v-row cols="12" sm="6">
            <v-col v-for="(store, id) in stores" :key="id">
                <div
                    outlined
                    elevation="0"
                    class="rounded-xl mb-3"
                    style="width: 100%"
                >
                    <div class="row no-gutters">
                        <div
                            class="categories__store-card col-md-4"
                            v-bind:style="{
                                'background-image':
                                    'url(' + store.storeBanner + ')'
                            }"
                        ></div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    {{ store.storeName | capitalize }}
                                </h5>
                                <p class="card-text">
                                    {{ store.storeBio | truncate(50, '...') }}
                                </p>

                                <div elevation="0">Visit Store</div>
                            </div>
                        </div>
                    </div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: 'Bookings',
    data: () => ({
        stores: [
            {
                storeBanner: 'https://via.placeholder.com/1200',
                storeName: 'Tomato loving',
                storeBio:
                    'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolo.'
            },
            {
                storeBanner: 'https://via.placeholder.com/1200',
                storeName: 'Tomato loving',
                storeBio:
                    'Nulla porttitor accumsan tincidunt. Pellentesque in ipsum id orci porta dapibus. Lorem ipsum dolo.'
            }
        ]
    }),
    methods: {
        goToBookings() {
            this.$router.push('/service/bookings');
        },
        goToCalendar() {
            this.$router.push('/calendar');
        }
    }
};
</script>

<style></style>
