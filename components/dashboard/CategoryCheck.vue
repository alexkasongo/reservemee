<template>
    <!-- CategoryCheck -->
    <section class="b-tooltips">
        <b-tooltip position="is-bottom" multilined style="width: 100%">
            <b-notification
                :closable="false"
                type="is-warning"
                aria-close-label="Close notification"
            >
                You currently have no services. Start by creating a category.
            </b-notification>
            <template v-slot:content>
                <b>Create a service.</b> You currently have no services. Start
                by creating a category.
            </template>
        </b-tooltip>
    </section>
    <!-- CategoryCheck -->
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
    name: 'CategoryCheck',
    computed: {
        ...mapGetters({
            user: 'user'
        })
    }
};
</script>

<style lang="scss" scoped></style>
