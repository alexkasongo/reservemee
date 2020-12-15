<template>
    <div class="cart">
        <v-simple-table fixed-header height="400px">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Shopping Cart</th>
                        <th class="text-left">Description</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">Quantity</th>
                        <th class="product-removal">Remove</th>
                        <th class="text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" :key="order.id">
                        <td>
                            <div class="p-3 product-image">
                                <v-img
                                    lazy-src="https://picsum.photos/id/11/10/6"
                                    max-height="150"
                                    max-width="250"
                                    :src="order.serviceImage"
                                ></v-img>
                            </div>
                        </td>
                        <td>
                            <div class="product-details">
                                <div class="product-title">
                                    {{ order.serviceName }}
                                </div>
                                <p class="product-description">
                                    {{ order.serviceDescription }}
                                </p>
                            </div>
                        </td>

                        <td>
                            <div class="product-price">
                                {{ order.servicePrice }}
                            </div>
                        </td>
                        <td>
                            <input type="number" value="1" min="1" />
                        </td>
                        <td>
                            <div class="product-removal">
                                <v-btn class="remove-product"> Remove </v-btn>
                            </div>
                        </td>
                        <td>
                            <div class="product-line-price">
                                {{ order.servicePrice }}
                            </div>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <v-simple-table fixed-header height="400px">
            <template v-slot:default>
                <thead>
                    <tr>
                        <th class="text-left">Shopping Cart</th>
                        <th class="text-left">Description</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">Quantity</th>
                        <th class="product-removal">Remove</th>
                        <th class="text-left">Total</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                            <div class="pt-10 pr-10 cart__total-container">
                                <div class="cart__totals">
                                    <div class="cart__totals-item">
                                        <div class="cart__totals-label">
                                            Subtotal
                                        </div>
                                        <div class="cart__totals-label">
                                            Tax (5%)
                                        </div>
                                        <div class="cart__totals-label">
                                            Shipping
                                        </div>
                                        <div class="cart__totals-grand-label">
                                            Grand Total
                                        </div>
                                    </div>
                                    <div class="cart__totals-item">
                                        <div
                                            class="totals-value"
                                            id="cart-subtotal"
                                        >
                                            71.97
                                        </div>
                                        <div class="totals-value" id="cart-tax">
                                            3.60
                                        </div>
                                        <div
                                            class="totals-value"
                                            id="cart-shipping"
                                        >
                                            15.00
                                        </div>
                                        <div
                                            class="totals-value"
                                            id="cart-total"
                                        >
                                            90.57
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="cart__checkout-btn pt-5 pr-10">
                                <v-btn class="cart__checkout">Checkout</v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
        <!-- <v-data-table
            :headers="headers"
            :items="orders"
            :sort-by="['calories', 'fat']"
            :sort-desc="[false, true]"
            multi-sort
            class="elevation-1"
        ></v-data-table> -->
        <!-- <div class="cart__total-container">
            <div class="cart__totals">
                <div class="cart__totals-item">
                    <div class="cart__totals-label">Subtotal</div>
                    <div class="cart__totals-label">Tax (5%)</div>
                    <div class="cart__totals-label">Shipping</div>
                    <div class="cart__totals-grand-label">Grand Total</div>
                </div>
                <div class="cart__totals-item">
                    <div class="totals-value" id="cart-subtotal">71.97</div>
                    <div class="totals-value" id="cart-tax">3.60</div>
                    <div class="totals-value" id="cart-shipping">15.00</div>
                    <div class="totals-value" id="cart-total">90.57</div>
                </div>
            </div>
        </div>
        <v-btn class="cart__checkout">Checkout</v-btn> -->
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        orders: [],
        headers: [
            {
                text: 'Shopping Cart',
                align: 'start',
                sortable: false,
                value: 'name'
            },
            { text: 'Description', value: 'serviceDescription' },
            { text: 'Price', value: 'servicePrice' },
            { text: 'Quantity', value: 1 },
            { text: 'Action', value: 'remove' },
            { text: 'Total', value: 'servicePrice' }
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
    &__total-container {
        background: darkcyan;
        width: 100%;
    }
    &__totals {
        display: flex;
        justify-content: space-between;
        // width: 300px;
        // margin: 0 0 20px auto;
        background: coral;
    }
    &__totals-label {
        margin: 0 0 10px 0;
    }
    &__checkout-btn {
        display: flex;
        justify-content: flex-end;
    }
}
/* Totals section */
</style>