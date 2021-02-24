<template>
    <div class="service">
        <!-- BEUFY -->
        <section class="mb-5">
            <b-button
                aria-label="View service instructions"
                label="Instructions"
                :disabled="isActive"
                @click="isActive = true"
            />
            <b-notification
                class="mb-5"
                v-model="isActive"
                aria-close-label="Close notification"
                animation="fade"
            >
                <ul>
                    <li>
                        - Create a new category by clicking create category.
                    </li>
                    <li>
                        - Edit the category name by clicking on the pencil icon.
                    </li>
                    <li>- Delete a category by clicking on the trash icon.</li>
                </ul>
            </b-notification>
        </section>

        <section class="service__border">
            <b-field>
                <b-button @click="onCreateCategory" class="is-primary mb-5"
                    >Create Category</b-button
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
                    {{ props.row.name | capitalize }}
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
                    <span @click="deleteItem(props.row)">
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
                            <b-button
                                @click="isCardModalActive = false"
                                label="close"
                                aria-label="close"
                            >
                                Close
                            </b-button>
                            <b-button
                                label="Create"
                                aria-label="Create category"
                                class="is-primary"
                                v-if="formTitle === 'New Category'"
                                @click="save"
                            >
                                Create
                            </b-button>
                            <b-button
                                label="Update"
                                aria-label="Update category"
                                v-else
                                @click="update"
                                class="is-primary"
                            >
                                Update
                            </b-button>
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
        isCardModalActive: false,
        isActive: false
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
            this.isCardModalActive = true;
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
            this.editedItem = Object.assign({}, item);
            this.editedIndex = item.id;
            this.isCardModalActive = true;
            this.item = item;
        },

        deleteItem(item) {
            this.deleteItemConfirm(item);
        },

        deleteItemConfirm(item) {
            const payload = {
                userId: this.user.uid,
                id: item.id
            };
            this.deleteCategory(payload);
            this.loadCategories(this.user.uid);
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
            // format categories
            let res = this.editedItem.name.replace(/\s+/g, '-').toLowerCase();

            let data = {
                category: res,
                description: this.editedItem.description,
                userId: this.user.uid
            };
            await this.createCategory(data);
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
// .service {
//     &__border {
//         border: 1px solid #ffdd57;
//         border-top-right-radius: 4px;
//         border-bottom-right-radius: 4px;
//         border-bottom-left-radius: 4px;
//         color: rgba(0, 0, 0, 0.7);
//         padding: 1.5rem;
//     }
// }

.dialog {
    height: 400px;
}
</style>
