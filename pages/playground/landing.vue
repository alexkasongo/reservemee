<template>
    <div class="margin wrapper">
        <splide
            :slides="slides"
            :options="options"
            ref="secondary"
            @splide:moved="moved"
        >
            <splide-slide v-for="slide in slides" :key="slide.id">
                <img :src="slide.src" />
            </splide-slide>
        </splide>

        <splide :options="primaryOptions" ref="primary">
            <splide-slide v-for="slide in slides" :key="slide.id">
                <img :src="slide.src" />
            </splide-slide>
        </splide>
    </div>
</template>

<script>
export default {
    data() {
        return {
            slides: [
                { src: 'https://via.placeholder.com/150/FFADAD' },
                { src: 'https://via.placeholder.com/150/264653' },
                { src: 'https://via.placeholder.com/150/2A9D8F' },
                { src: 'https://via.placeholder.com/150/E9C46A' },
                { src: 'https://via.placeholder.com/150/F4A261' },
                { src: 'https://via.placeholder.com/150/E76F51' },
                { src: 'https://via.placeholder.com/150/E63946' },
                { src: 'https://via.placeholder.com/150/F1FAEE' },
                { src: 'https://via.placeholder.com/150/A8DADC' },
                { src: 'https://via.placeholder.com/150/457B9D' }
            ],
            primaryOptions: {
                type: 'loop',
                width: 800,
                pagination: false,
                arrows: false
            },
            options: {
                type: 'slide',
                rewind: true,
                width: 800,
                gap: '1rem',
                pagination: false,
                fixedWidth: 110,
                fixedHeight: 70,
                cover: true,
                focus: 'center',
                isNavigation: true
            }
        };
    },

    mounted() {
        // Attept to add a slide.
        // setTimeout(() => {
        //     this.slides.push({
        //         src: 'https://via.placeholder.com/150'
        //     });
        // }, 1);
        this.$refs.primary.sync(this.$refs.secondary.splide);
    },
    methods: {
        moved(splide, newIndex) {
            // console.log('moved', newIndex);
        }
    }
};
</script>
