<template>
    <div class="container">
        <v-data-table
            :headers="headers"
            :items="desserts"
            sort-by="calories"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Bookings</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                color="teal darker-1"
                                dark
                                class="mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                New Booking
                            </v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                                <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.name"
                                                label="Dessert name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.calories"
                                                label="Calories"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.date"
                                                label="date (g)"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.time"
                                                label="time (g)"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12" sm="6" md="4">
                                            <v-text-field
                                                v-model="editedItem.price"
                                                label="price (g)"
                                            ></v-text-field>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card-text>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="close"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn color="teal darken-1" text @click="save">
                                    Save
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                    <v-dialog v-model="dialogDelete" max-width="500px">
                        <v-card>
                            <v-card-title class="headline"
                                >Are you sure you want to delete this
                                item?</v-card-title
                            >
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="closeDelete"
                                    >Cancel</v-btn
                                >
                                <v-btn
                                    color="teal darken-1"
                                    text
                                    @click="deleteItemConfirm"
                                    >OK</v-btn
                                >
                                <v-spacer></v-spacer>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:no-data>
                <v-btn color="primary" @click="initialize"> Reset </v-btn>
            </template>
        </v-data-table>
    </div>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Service',
                align: 'start',
                sortable: false,
                value: 'name'
            },
            // { text: 'Service', value: 'calories' },
            { text: 'Booking Date', value: 'date' },
            { text: 'Booking Time', value: 'time' },
            { text: 'Price', value: 'price' },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,
            date: 0,
            time: 0,
            price: 0
        },
        defaultItem: {
            name: '',
            calories: 0,
            date: 0,
            time: 0,
            price: 0
        }
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
        }
    },

    watch: {
        dialog(val) {
            val || this.close();
        },
        dialogDelete(val) {
            val || this.closeDelete();
        }
    },

    created() {
        this.initialize();
    },

    methods: {
        initialize() {
            this.desserts = [
                {
                    name: 'Service one',
                    calories: 159,
                    date: '12-07-20',
                    time: '07:00',
                    price: '$15'
                },
                {
                    name: 'Service two',
                    calories: 237,
                    date: '12-07-20',
                    time: '09:00',
                    price: '$25'
                },
                {
                    name: 'Service three',
                    calories: 262,
                    date: '12-07-20',
                    time: '13:00',
                    price: '$45'
                },
                {
                    name: 'Service four',
                    calories: 305,
                    date: '12-07-20',
                    time: '15:00',
                    price: '$15'
                },
                {
                    name: 'Service five',
                    calories: 356,
                    date: '12-07-20',
                    time: '09:00',
                    price: '$15'
                },
                {
                    name: 'Service six',
                    calories: 375,
                    date: '12-07-20',
                    time: '11:00',
                    price: '$20'
                },
                {
                    name: 'Service six',
                    calories: 375,
                    date: '12-07-20',
                    time: '08:00',
                    price: '$25'
                }
            ];
        },

        editItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },

        deleteItem(item) {
            this.editedIndex = this.desserts.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            this.desserts.splice(this.editedIndex, 1);
            this.closeDelete();
        },

        close() {
            this.dialog = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        closeDelete() {
            this.dialogDelete = false;
            this.$nextTick(() => {
                this.editedItem = Object.assign({}, this.defaultItem);
                this.editedIndex = -1;
            });
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.desserts[this.editedIndex], this.editedItem);
            } else {
                this.desserts.push(this.editedItem);
            }
            this.close();
        }
    }
};
</script>

<style scoped>
</style>
