<template>
    <div id="weather-bar" :class="'weather ' + size" v-if="!loading">
        <weather-card
            class="card card-left"
            :icon="weather.weather.icon"
            :temp="weather.details.temp"
            :description="weather.weather.description"
            :size="size"
        />
        <detail-card
            class="card card-right"
            :details="weather.details"
            :sun="weather.sun"
            :precip="weather.precip"
            :wind="weather.wind"
            :size="size"
        />
    </div>
    <div v-else>
        <loader stroke="#aa5555" />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Prop } from 'vue-property-decorator';

import WeatherCard from '@/components/WeatherCard.vue';
import DetailCard from '@/components/DetailCard.vue';
import Loader from '@/components/Loader.vue';

import { WeatherRes } from '../types/WeatherRes';
import { getWeather, getForecast } from '../utils/weather';
import { Forecast } from '../types/Forecast';

@Component({
    name: 'weather',
    components: {
        WeatherCard,
        DetailCard,
        Loader
    }
})
export default class Weather extends Vue {
    @Prop() private msg!: String;

    readonly tabletSize = 1300;
    readonly mobileSize = 768;

    weather!: WeatherRes | undefined;
    forecast!: Forecast | undefined;
    loading: boolean = true;
    size: string = 'desktop';

    async created() {
        if (window.innerWidth < this.mobileSize) {
            this.size = 'mobile';
        } else if (window.innerWidth < this.tabletSize) {
            this.size = 'tablet';
        }

        this.weather = await getWeather('springville');
        this.forecast = await getForecast('springville');

        if (this.weather != undefined && this.forecast != undefined) {
            window.addEventListener('resize', this.handleResize);
            this.loading = false;
        }
    }

    handleResize(event: Event) {
        const width = window.innerWidth;
        const element = this.$el;
        const currSize = this.size;

        if (width < this.mobileSize && currSize != 'mobile') {
            this.size = 'mobile';
        } else if (
            width < this.tabletSize &&
            width >= this.mobileSize &&
            currSize != 'tablet'
        ) {
            this.size = 'tablet';
        } else if (width > this.tabletSize && currSize != 'desktop') {
            this.size = 'desktop';
        }
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/__stuff.scss';

.weather {
    display: flex;
    margin: 10px;
    align-content: center;
    justify-content: center;
    height: 300px;
    width: 100%;

    &.desktop {
    }

    .card {
        border-bottom: none;
    }

    .card-left {
        border-right: 5px solid black;
        border-bottom: none;
    }

    &.tablet {
        height: 200px;
    }

    &.mobile {
        height: 100%;
        flex-direction: column;

        .card {
            border-bottom: solid 5px black;
        }

        .card-left {
            border-right: none;
            height: 160px;
        }

        .card-right {
            height: 140px;
        }
    }
}
</style>
