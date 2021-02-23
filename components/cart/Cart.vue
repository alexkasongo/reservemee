<template>
    <div class="cart mt-5">
        <!-- <div class="">
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
                        <img
                            class="cart__image"
                            lazy-src="https://picsum.photos/id/11/10/6"
                            :src="item.serviceImage"
                        />
                    </div>
                </template>
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small @click="deleteItem(item)">
                        mdi-delete
                    </v-icon>
                </template>
                <template v-slot:[`item.quantity`]>
                    <v-text-field label="1"></v-text-field>
                </template>
            </v-data-table>

            <div class="pt-10 pr-10 cart__total-container">
                <v-row class="cart__totals">
                    <v-col class="cart__totals-item">
                        <div class="cart__totals-label">Subtotal</div>
                        <div class="cart__totals-label">Tax (6.5%)</div>
                        <div class="cart__totals-grand-label">Grand Total</div>
                    </v-col>
                    <v-col class="cart__totals-item">
                        <div class="cart__totals-value" id="cart-tax">
                            {{ subTotal }}
                        </div>
                        <div class="cart__totals-value" id="cart-shipping">
                            {{ tax }}
                        </div>
                        <div class="cart__totals-value" id="cart-total">
                            {{ grandTotal }}
                        </div>
                    </v-col>
                </v-row>
                <div class="cart__checkout-btn pt-5 pr-0 pb-10">
                    <div
                        color="teal darker-1"
                        dark
                        x-large
                        class="cart__checkout"
                    >
                        Checkout
                    </div>
                </div>
            </div>
        </div> -->

        <!-- Header -->
        <header class="container">
            <h1 class="title">Shopping Cart</h1>

            <ul class="breadcrumb">
                <li>Home</li>
                <li>Shopping Cart</li>
            </ul>

            <span class="count">2 items in the bag</span>
        </header>
        <!-- Header End -->

        <section class="container" v-if="orders.length <= 0">
            <b-notification
                :closable="false"
                aria-close-label="Empty cart"
                type="is-success is-light"
            >
                Cart is empty
            </b-notification>
        </section>

        <!-- Product -->
        <section class="container">
            <ul class="products" v-for="(order, id) in orders" :key="id">
                <li class="row" key="{index}">
                    <div class="col left">
                        <div class="thumbnail">
                            <a href="#">
                                <img :src="order.serviceImage" />
                            </a>
                        </div>
                        <div class="detail">
                            <div class="name">
                                <a href="#">product name</a>
                            </div>
                            <div class="description">
                                {{ order.description }}
                            </div>
                            <div class="price">{{ order.price }}.99</div>
                        </div>
                    </div>

                    <div class="col right">
                        <div class="quantity">
                            <input
                                type="text"
                                class="quantity"
                                step="1"
                                value="1"
                            />
                        </div>

                        <div class="remove">
                            <svg
                                version="1.1"
                                class="close"
                                x="0px"
                                y="0px"
                                viewBox="0 0 60 60"
                                enableBackground="new 0 0 60 60"
                            >
                                <polygon
                                    points="38.936,23.561 36.814,21.439 30.562,27.691 24.311,21.439 22.189,23.561 28.441,29.812 22.189,36.064 24.311,38.186 30.562,31.934 36.814,38.186 38.936,36.064 32.684,29.812"
                                />
                            </svg>
                        </div>
                    </div>
                </li>
            </ul>
        </section>
        <!-- Product End -->
        <!-- To checkout -->
        <section class="container">
            <div class="promotion">
                <label htmlFor="promo-code">Have A Promo Code?</label>
                <input type="text" />
                <button type="button" />
            </div>

            <div class="summary">
                <ul>
                    <li>Subtotal <span>$11.98</span></li>
                    <!-- {discount > 0 && (
                    <li>
                    Discount <span>{formatCurrency(discount)}</span>
                    </li>
                )} -->
                    <li>Tax <span>$5.00</span></li>
                    <li class="total">Total <span>$16.98</span></li>
                </ul>
            </div>

            <div class="checkout">
                <button type="button">Check Out</button>
            </div>
        </section>
        <!-- To checkout End-->
    </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
    data: () => ({
        item: '',
        orders: [] || null,
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
        ],
        subTotal: 0,
        tax: 0,
        grandTotal: 0,
        isActive: true,
        mobile: ''
    }),
    computed: {
        ...mapState({
            ordersState: 'cart'
        })
    },
    methods: {
        deleteItem(ev) {}
    },
    async mounted() {
        this.orders = await this.ordersState.order;

        // WORK OUT CART TOTAL
        const orders = this.ordersState.order;
        let total = 0;
        orders.forEach((order) => {
            total += parseInt(order.servicePrice);
        });
        this.subTotal = total;
        // Tax only
        this.tax = Math.round((6.5 / 100) * total * 100 + Number.EPSILON) / 100;

        // Tex inclusive
        this.grandTotal = (6.5 / 100) * total + total;
        // WORK OUT CART TOTAL END
    }
};
</script>

<style lang="scss" scoped>
img {
    max-width: 100%;
    vertical-align: middle;
    border-radius: 4px;
}

a {
    text-decoration: none;
    color: #333333;
}

a:hover {
    color: #f58551;
}

button {
    background-color: #16cc9b;
    border: 2px solid #16cc9b;
    color: #ffffff;
    transition: all 0.25s linear;
    cursor: pointer;
}

button::after {
    position: relative;
    right: 0;
    content: ' \276f';
    transition: all 0.15s linear;
}

button:hover {
    background-color: #f58551;
    border-color: #f58551;
}

button:hover::after {
    right: -5px;
}

button:focus {
    outline: none;
}

ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
}

input {
    transition: all 0.25s linear;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
}

input {
    outline: none;
}

.container {
    width: 90%;
    margin: 0 auto;
    overflow: auto;
}

/* --- HEADER --- */
header.container {
    margin-bottom: 1.5rem;
}

header .breadcrumb {
    color: #7d7d7d;
}

header .breadcrumb li {
    float: left;
    padding: 0 6px;
}

header .breadcrumb li:first-child {
    padding-left: 2px;
}

header .breadcrumb li:not(:last-child)::after {
    content: ' \276f';
    padding-left: 8px;
}

header .count {
    float: right;
    color: #333333;
}

/* --- PRODUCT LIST --- */
.products {
    border-top: 1px solid #ddd;
}

.products > li {
    padding: 1rem 0;
    border-bottom: 1px solid #ddd;
}

.row {
    position: relative;
    overflow: auto;
    width: 100%;
}

.col,
.quantity,
.remove {
    float: left;
}

.col.left {
    width: 70%;
}

.col.right {
    width: 30%;
    position: absolute;
    right: 0;
    top: calc(50% - 30px);
}

.detail {
    padding: 0 0.5rem;
    line-height: 2.2rem;
}

.detail .name {
    font-size: 1.2rem;
}

.detail .description {
    color: #7d7d7d;
    font-size: 1rem;
}

.detail .price {
    font-size: 1.5rem;
}

.quantity,
.remove {
    width: 50%;
    text-align: center;
}

.remove svg {
    width: 60px;
    height: 60px;
}

.quantity > input {
    display: inline-block;
    width: 60px;
    height: 60px;
    position: relative;
    left: calc(50% - 30px);
    background: #fff;
    border: 2px solid #ddd;
    color: #7f7f7f;
    text-align: center;
    font: 600 1.5rem Helvetica, Arial, sans-serif;
}

.quantity > input:hover,
.quantity > input:focus {
    border-color: #f58551;
}

.close {
    fill: #7d7d7d;
    transition: color 150ms linear, background-color 150ms linear,
        fill 150ms linear, 150ms opacity linear;
    cursor: pointer;
}

.close:hover {
    fill: #f58551;
}

/* --- SUMMARY --- */
.promotion,
.summary,
.checkout {
    float: left;
    width: 100%;
    margin-top: 1.5rem;
}

.promotion > label {
    float: left;
    width: 100%;
    margin-bottom: 1rem;
}

.promotion > input {
    float: left;
    width: 80%;
    font-size: 1rem;
    padding: 0.5rem 0 0.5rem 1.8rem;
    border: 2px solid #16cc9b;
    border-radius: 2rem 0 0 2rem;
}

.promotion:hover > input {
    border-color: #f58551;
}

.promotion > button {
    float: left;
    width: 20%;
    padding: 0.5rem 0;
    border-radius: 0 2rem 2rem 0;
}

.promotion:hover > button {
    border-color: #f58551;
    background-color: #f58551;
}

.promotion > button::after {
    content: '\276f';
    font-size: 1rem;
}

.summary {
    font-size: 1.2rem;
    text-align: right;
}

.summary ul li {
    padding: 0.5rem 0;
}

.summary ul li span {
    display: inline-block;
    width: 30%;
}

.summary ul li.total {
    font-weight: bold;
}

.checkout {
    text-align: right;
}

.checkout > button {
    font-size: 1.2rem;
    padding: 0.8rem 2.8rem;
    border-radius: 1.5rem;
}

.empty-product {
    text-align: center;
}

.empty-product > button {
    font-size: 1.3rem;
    padding: 10px 30px;
    border-radius: 5px;
}

/* --- SMALL SCREEN --- */
@media all and (max-width: 599px) {
    .thumbnail img {
        display: none;
    }

    .quantity > input {
        width: 40px;
        height: 40px;
        left: calc(50% - 20px);
    }

    .remove svg {
        width: 40px;
        height: 40px;
    }
}

/* --- MEDIUM & LARGE SCREEN --- */
@media all and (min-width: 600px) {
    html {
        font-size: 14px;
    }

    .container {
        width: 75%;
        max-width: 960px;
    }

    .thumbnail,
    .detail {
        float: left;
    }

    .thumbnail {
        width: 35%;
    }

    .detail {
        width: 65%;
    }

    .promotion,
    .summary {
        width: 50%;
    }

    .checkout {
        width: 100%;
    }

    .checkout,
    .summary {
        text-align: right;
    }
}

/* --- LARGE SCREEN --- */
@media all and (min-width: 992px) {
    html {
        font-size: 16px;
    }
}
</style>
