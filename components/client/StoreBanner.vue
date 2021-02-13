<template>
    <div>
        <!-- <img
            class="rounded-xl"
            lazy-src="https://picsum.photos/id/11/10/6"
            max-height="300"
            max-width="100%"
            src="https://via.placeholder.com/1200"
        /> -->

        <section class="hero is-small is-primary header__bg">
            <div class="hero-body">
                <p class="title">Store</p>
                <p class="subtitle">Advert</p>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'StoreBanner'
};
</script>

<style lang="scss" scoped>
.header {
    &__bg {
        border-radius: 24px;
    }
}
</style>
