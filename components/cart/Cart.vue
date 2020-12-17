<template>
    <div class="cart">
        <v-data-table
            :headers="headers"
            :items="orders"
            :items-per-page="5"
            sort-by="calories"
            class="elevation-1"
        >
            <template v-slot:top> </template>
            <template v-slot:[`item.serviceImage`]="{ item }">
                <div class="p-3">
                    <v-img
                        lazy-src="https://picsum.photos/id/11/10/6"
                        max-height="100"
                        max-width="150"
                        :src="item.serviceImage"
                    ></v-img>
                </div>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:[`item.quantity`]>
                <v-text-field label="1"></v-text-field>
            </template>
        </v-data-table>

        <div class="pt-10 pr-10 cart__total-container">
            <div class="cart__totals">
                <div class="cart__totals-item">
                    <div class="cart__totals-label">Subtotal</div>
                    <div class="cart__totals-label">Tax (5%)</div>
                    <div class="cart__totals-label">Shipping</div>
                    <div class="cart__totals-grand-label display-1">
                        Grand Total
                    </div>
                </div>
                <div class="cart__totals-item">
                    <div class="cart__totals-value" id="cart-subtotal">
                        71.97
                    </div>
                    <div class="cart__totals-value" id="cart-tax">3.60</div>
                    <div class="cart__totals-value" id="cart-shipping">
                        15.00
                    </div>
                    <div
                        class="cart__totals-value display-1"
                        id="cart-total display-1"
                    >
                        90.57
                    </div>
                </div>
            </div>
            <div class="cart__checkout-btn pt-5 pr-0 pb-10">
                <v-btn color="teal darker-1" dark x-large class="cart__checkout"
                    >Checkout</v-btn
                >
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        item: '',
        orders: [],
        headers: [
            {
                text: 'Shopping Cart',
                align: 'start',
                sortable: false,
                value: 'serviceImage'
            },
            {
                text: 'Description',
                sortable: false,
                value: 'serviceDescription'
            },
            { text: 'Price', sortable: false, value: 'servicePrice' },
            { text: 'Quantity', sortable: false, value: 'quantity' },
            { text: 'Actions', sortable: false, value: 'actions' },
            { text: 'Total', sortable: false, value: 'servicePrice' }
        ]
    }),
    computed: {
        ...mapState({
            ordersState: 'cart'
        })
        // orders() {
        //     return this.ordersState.order;
        // }
    },
    methods: {
        deleteItem(ev) {
            console.log(`Cart.vue - 151 - 🐣`, ev);
        }
    },
    mounted() {
        console.log(`playground.vue - 52 - 💦`, this.ordersState);
        this.orders = this.ordersState.order;
        console.log(`playground.vue - 68 - 🏝`, this.ordersState);
    }
};
</script>

<style lang="scss" scoped>
/* Totals section */
.cart {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &__total-container {
        // background: darkcyan;
        width: 100%;
    }
    &__totals {
        display: flex;
        justify-content: space-between;
        width: 400px;
        margin: 0 0 0 auto;
        // background: coral;
    }
    &__totals-label {
        margin: 0 0 10px 0;
        text-align: right;
    }
    // &__totals-grand-label {
    //     font-weight: bold;
    // }
    &__totals-value {
        margin: 0 0 10px 0;
        text-align: right;
    }
    &__checkout-btn {
        display: flex;
        justify-content: flex-end;
    }
}
/* Totals section */
</style>