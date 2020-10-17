<template>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="5"
        sort-by="description"
        class="elevation-1"
    >
        <template v-slot:top>
            <v-toolbar flat>
                <v-toolbar-title>My Categories</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-btn
                    @click="onCreateInitCat"
                    color="teal darker-1"
                    dark
                    class="mb-2"
                >
                    New Category
                </v-btn>
                <v-dialog v-model="dialog" max-width="500px">
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
                                            v-model="editedItem.description"
                                            label="description"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.services"
                                            label="services (g)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.carbs"
                                            label="Carbs (g)"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="4">
                                        <v-text-field
                                            v-model="editedItem.protein"
                                            label="Protein (g)"
                                        ></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-container>
                        </v-card-text>

                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="teal darken-1" text @click="close">
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
        <template v-slot:[`item.services`]="">
            <v-btn elevation="0" small class="mr-2"> View Services </v-btn>
        </template>
        <template v-slot:no-data>
            <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
    </v-data-table>
</template>

<script>
export default {
    data: () => ({
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Categories',
                align: 'start',
                sortable: false,
                value: 'name'
            },
            { text: 'Description', value: 'description' },
            { text: 'Services', value: 'services', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        desserts: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            description: 0,
            services: 0
        },
        defaultItem: {
            name: '',
            description: 0,
            services: 0
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
        onCreateInitCat() {
            // this.createUserTable(this.user.uid);
            this.$router.push('/service/create-category');
        },
        initialize() {
            this.desserts = [
                {
                    name: 'Category One',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Two',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Three',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Four',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Five',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Six',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Seven',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Eight',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Nine',
                    description: 'Description',
                    services: 'View Services'
                },
                {
                    name: 'Category Ten',
                    description: 'Description',
                    services: 'View Services'
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

<style lang="scss" scoped>
</style>