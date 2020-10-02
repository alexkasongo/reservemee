<template>
    <!-- Messages -->
    <div class="ribbon-box">
        <div class="ribbon ribbon-primary">Messages</div>
        <div class="clearfix"></div>
        <div
            class="inbox-widget"
            v-for="customer in customerInfo"
            :key="customer.id"
        >
            <div class="inbox-item">
                <div class="inbox-item__left">
                    <div class="inbox-item-img">
                        <img
                            src="https://via.placeholder.com/150"
                            class="rounded-circle"
                            alt
                        />
                    </div>
                    <div>
                        <p class="inbox-item-author">{{ customer.name }}</p>
                        <p class="inbox-item-text">
                            {{ customer.message }}
                        </p>
                    </div>
                </div>

                <div class="inbox-item__left">
                    <v-btn class="teal darken-1" dark> Reply </v-btn>
                </div>
            </div>
        </div>
    </div>
    <!-- Messages -->
</template>

<script>
import { mapGetters } from 'vuex';

export default {
    name: 'Messages',
    data: () => ({
        customerInfo: [
            {
                id: '1',
                name: 'Aleko',
                message: 'Thank you so much for the...'
            },
            {
                id: 2,
                name: 'Kay Love',
                message: 'Amazing, I love you...'
            },
            {
                id: 3,
                name: 'Tine Wangu',
                message: 'Well done, you have out done...'
            },
            {
                id: 4,
                name: 'Aleko',
                message: 'I did not receive my order...'
            },
            {
                id: 5,
                name: 'Andrea',
                message: 'I would like to make multiple...'
            },
            {
                id: 6,
                name: 'Michelle',
                message: 'I will pay anything for your...'
            }
        ]
    }),
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
};
</script>

<style lang="scss" scoped></style>
