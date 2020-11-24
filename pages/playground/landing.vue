<template>
    <div class="margin">
        <splide
            :options="secondaryOptions"
            ref="secondary"
            @splide:moved="moved"
            :slides="slides"
        >
            <splide-slide v-for="slide in slides" :key="slide.id">
                <div class="slider-image">
                    <!-- <img :src="slide.src" /> -->
                    <div>{{ slide.color }}</div>
                </div>
            </splide-slide>
        </splide>

        <splide :options="primaryOptions" ref="primary" :slides="slides">
            <splide-slide v-for="slide in slides" :key="slide.id">
                <!-- <img :src="slide.src" /> -->
                <div class="slider-image">
                    <!-- <img :src="slide.src" /> -->
                    <div>{{ slide.color }}</div>
                </div>
            </splide-slide>
        </splide>
    </div>
</template>

<script>
import { db } from '@/plugins/firebase';

export default {
    data() {
        return {
            slides: [],
            // slides: [
            //     { src: 'https://via.placeholder.com/150/FFADAD' },
            //     { src: 'https://via.placeholder.com/150/264653' },
            //     { src: 'https://via.placeholder.com/150/2A9D8F' },
            //     { src: 'https://via.placeholder.com/150/E9C46A' },
            //     { src: 'https://via.placeholder.com/150/F4A261' },
            //     { src: 'https://via.placeholder.com/150/E76F51' },
            //     { src: 'https://via.placeholder.com/150/E63946' },
            //     { src: 'https://via.placeholder.com/150/F1FAEE' },
            //     { src: 'https://via.placeholder.com/150/A8DADC' },
            //     { src: 'https://via.placeholder.com/150/457B9D' }
            // ],
            primaryOptions: {
                type: 'loop',
                // width: 800,
                pagination: false,
                arrows: false,
                fixedHeight: 185
            },
            secondaryOptions: {
                type: 'slide',
                rewind: true,
                // width: 800,
                pagination: false,
                fixedWidth: 150,
                fixedHeight: 185,
                cover: true,
                focus: 'center',
                isNavigation: true
            }
        };
    },

    mounted() {
        this.getEvents();
        this.$refs.primary.sync(this.$refs.secondary.splide);
    },
    methods: {
        moved(splide, newIndex) {},
        async getEvents() {
            let snapshot = await db
                .collection('jKWLSv7dhUfUIDXWalNfnDZKX2I2')
                .get();
            let events = [];
            // loop through and push events on each itteration
            snapshot.forEach((doc) => {
                let appData = [];
                appData.id = doc.id;
                appData.color = doc.data().color;
                appData.details = doc.data().details;
                appData.end = doc.data().end.toDate();
                appData.name = doc.data().name;
                appData.start = doc.data().start.toDate();
                // Must include timed:boolean else timed events will not be displayed accordingly
                appData.timed = doc.data().timed;
                events.push(appData);
            });
            this.slides = events;
            console.log(`landing.vue - 91 - 🌕`, events);
        }
    }
};
</script>

<style lang="scss" scoped>
.slider-image {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    background-color: lemonchiffon;
    // width: 150px;
    // height: 100px;
    height: 100%;
    width: 100%;
}
</style>