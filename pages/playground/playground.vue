<template>
    <div>
        <p>{{ count }}</p>
        <p>
            <button @click="increment">+</button>
            <button @click="decrement">-</button>
        </p>
        <small>Check out your localStorage to see the updates.</small>

        <br />
        <br />

        <v-btn @click="showAlert" elevation="2">Click Me</v-btn>
    </div>
</template>

<script>
export default {
    computed: {
        count() {
            return this.$store.state.count;
        }
    },
    methods: {
        increment() {
            this.$store.commit('increment');
        },
        decrement() {
            this.$store.commit('decrement');
        },
        showAlert() {
            // Use sweetalert2
            this.$swal({
                toast: true,
                position: 'top-end',
                icon: 'success',
                title: 'Your work has been saved',
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
};
</script>

<style scoped></style>
