<template>
    <div class="service">
        <!-- <v-data-table
            :headers="headers"
            :items="categories"
            :items-per-page="5"
            sort-by="calories"
            class="elevation-1"
        >
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>My Categories</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    
                    <div v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on, attrs }">
                            <div
                                dark
                                class="teal darken-1 mb-2"
                                v-bind="attrs"
                                v-on="on"
                            >
                                New Category
                            </div>
                        </template>


                        <div>
                            <div-title>
                                <span class="headline">{{ formTitle }}</span>
                            </div-title>

                            <div-text>
                                <v-container>
                                    <v-row>
                                        <v-col cols="12">
                                            <v-text-field
                                                v-model="editedItem.name"
                                                label="Category name"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col cols="12">
                                            <v-textarea
                                                v-model="editedItem.description"
                                                label="Description"
                                            ></v-textarea>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </div-text>

                            <div>
                                
                                <div
                                    color="teal darken-1"
                                    text
                                    @click="close"
                                >
                                    Cancel
                                </div>
                                <div
                                    v-if="formTitle === 'New Category'"
                                    color="teal darken-1"
                                    text
                                    @click="save"
                                >
                                    Create
                                </div>
                                <div
                                    v-else
                                    color="teal darken-1"
                                    text
                                    @click="update"
                                >
                                    Update
                                </div>
                            </div>
                        </div>
                    </div>


                    <div v-model="dialogDelete" max-width="500px">
                        <div>
                            <div-title class="headline"
                                >Are you sure you want to delete this
                                item?</div-title
                            >
                            <div>
                                
                                <div
                                    color="teal darken-1"
                                    text
                                    @click="closeDelete"
                                    >Cancel</div
                                >
                                <div
                                    color="teal darken-1"
                                    text
                                    @click="deleteItemConfirm"
                                    >OK</div
                                >
                                
                            </div>
                        </div>
                    </div>
                </v-toolbar>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
                <v-icon small class="mr-2" @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <template v-slot:[`item.services`]="{ item }">
                <div
                    elevation="0"
                    small
                    class="mr-2"
                    @click="goToService(item.name)"
                >
                    View Services
                </div>
            </template>
        </v-data-table> -->

        <!-- BEUFY -->

        <section class="service__border">
            <b-field>
                <b-button @click="onCreateCategory" class="is-primary mb-5"
                    >Create Service</b-button
                >
            </b-field>
            <b-table
                :data="categories"
                :paginated="isPaginated"
                :per-page="perPage"
                :current-page.sync="currentPage"
                :pagination-simple="isPaginationSimple"
                :pagination-position="paginationPosition"
                :default-sort-direction="defaultSortDirection"
                :pagination-rounded="isPaginationRounded"
                :sort-icon="sortIcon"
                :sort-icon-size="sortIconSize"
                default-sort="user.first_name"
                aria-next-label="Next page"
                aria-previous-label="Previous page"
                aria-page-label="Page"
                aria-current-label="Current page"
            >
                <b-table-column
                    field="name"
                    label="Name"
                    sortable
                    v-slot="props"
                >
                    {{ props.row.name }}
                </b-table-column>

                <b-table-column
                    field="description"
                    label="Description"
                    sortable
                    v-slot="props"
                >
                    {{ props.row.description }}
                </b-table-column>

                <b-table-column
                    field="name"
                    label="Services"
                    centered
                    v-slot="props"
                >
                    <span
                        class="tag is-success"
                        style="cursor: pointer"
                        @click="goToService(props.row.name)"
                    >
                        View Services
                    </span>
                </b-table-column>

                <b-table-column label="Actions" numeric v-slot="props">
                    <span @click="editItem(props.row)">
                        <b-icon icon="pencil" style="cursor: pointer"> </b-icon>
                    </span>
                    <span @click="deleteItem(item.row)">
                        <b-icon icon="delete" style="cursor: pointer"> </b-icon>
                    </span>
                </b-table-column>
            </b-table>
        </section>

        <section>
            <b-modal
                v-model="isCardModalActive"
                :width="450"
                scroll="keep"
                :destroy-on-hide="false"
                aria-role="dialog"
                aria-label="Events Modal"
                aria-modal
            >
                <section class="card">
                    <div class="field card-content dialog">
                        <div class="field">
                            <b-field label="Name">
                                <b-input v-model="editedItem.name"></b-input>
                            </b-field>
                            <b-field label="Details">
                                <b-input
                                    maxlength="200"
                                    type="textarea"
                                    v-model="editedItem.description"
                                ></b-input>
                            </b-field>
                        </div>

                        <div>
                            <b-button @click="close"> Cancel </b-button>
                            <b-button
                                class="is-primary"
                                v-if="formTitle === 'New Category'"
                                @click="save"
                            >
                                Create
                            </b-button>
                            <b-button v-else @click="update"> Update </b-button>
                        </div>
                    </div>
                </section>
            </b-modal>
        </section>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'ManageServices',
    data: () => ({
        item: '',
        dialog: false,
        dialogDelete: false,
        headers: [
            {
                text: 'Categories',
                sortable: false,
                align: 'start',
                value: 'name'
            },
            { text: 'Description', value: 'description' },
            { text: 'Services', value: 'services', sortable: false },
            { text: 'Actions', value: 'actions', sortable: false }
        ],
        editedIndex: -1,
        editedItem: {
            name: '',
            description: ''
        },
        defaultItem: {
            name: '',
            description: ''
        },
        // NEW
        isPaginated: true,
        isPaginationSimple: true,
        isPaginationRounded: true,
        paginationPosition: 'bottom',
        defaultSortDirection: 'asc',
        sortIcon: 'arrow-up',
        sortIconSize: 'is-small',
        currentPage: 1,
        perPage: 5,
        // MODAL
        isCardModalActive: false
    }),
    computed: {
        ...mapGetters({
            categories: 'dashboard/categories',
            services: 'dashboard/services',
            loading: 'loaders/loading',
            user: 'user'
        }),
        formTitle() {
            return this.editedIndex === -1 ? 'New Category' : 'Edit Category';
        }
    },
    methods: {
        ...mapActions({
            createCategory: 'dashboard/createCategory',
            loadCategories: 'dashboard/loadCategories',
            deleteCategory: 'dashboard/deleteCategory',
            updateCategory: 'dashboard/updateCategory',
            loadServices: 'dashboard/loadServices'
        }),
        onCreateService() {
            this.$router.push('/service/create-service');
        },
        onCreateCategory() {
            console.log(`ManageServices.vue - 316 - ✅`, this.formTitle);
            this.isCardModalActive = true;
            // this.$router.push('/service/create-category');
        },
        goToService(service) {
            this.$router.push({
                name: 'service-id',
                params: {
                    id: service
                }
            });
        },
        updCategory(id) {
            this.$router.push({
                name: 'update-category-id',
                params: {
                    id: id
                }
            });
        },
        removeCategory(id) {
            const payload = {
                userId: this.user.uid,
                id: id
            };
            this.$swal({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.deleteCategory(payload);
                    this.loadCategories(this.user.uid);
                    this.$swal(
                        'Deleted!',
                        'Category has been Deleted.',
                        'success'
                    );
                }
            });
        },

        editItem(item) {
            console.log(`ManageServices.vue - 374 - 🌎`, item);
            this.editedItem = Object.assign({}, item);
            this.editedIndex = item.id;
            this.isCardModalActive = true;
            this.item = item;
        },

        deleteItem(item) {
            this.item = item;
            this.dialogDelete = true;
        },

        deleteItemConfirm() {
            const payload = {
                userId: this.user.uid,
                id: this.item.id
            };

            this.loadCategories(this.user.uid);
            this.deleteCategory(payload);
            this.$swal({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Deleted',
                showConfirmButton: false,
                timer: 2500
            });

            this.closeDelete();
        },

        close() {
            this.isCardModalActive = false;
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

        async save() {
            // category with dashes
            let res = this.editedItem.name.replace(/\s+/g, '-').toLowerCase();

            let data = {
                category: res,
                description: this.editedItem.description,
                userId: this.user.uid
            };
            await this.createCategory(data);
            // this.loadCategories();
            this.close();
        },
        async update() {
            let categoryName = this.editedItem.name
                .replace(/\s+/g, '-')
                .toLowerCase();

            let data = {
                description: this.editedItem.description,
                userId: this.user.uid,
                name: categoryName,
                id: this.item.id
            };

            await this.updateCategory(data).then(() => {
                this.loadCategories(this.user.uid);
            });

            this.close();
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

    mounted() {
        this.loadCategories(this.user.uid);
    }
};
</script>

<style lang="scss" scoped>
.service {
    &__border {
        border: 1px solid #ffdd57;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
        color: rgba(0, 0, 0, 0.7);
        padding: 1.5rem;
    }
}

.dialog {
    height: 400px;
}
</style>
