<template>
    <div class="weather" v-if="!loading">
        <weather-card
            class="card card-left"
            :icon="weather.weather.icon"
            :temp="weather.details.temp"
            :description="weather.weather.description"
        />
        <detail-card 
            class="card card-right" 
            :details="weather.details"
            :sun="weather.sun"
            :precip="weather.precip"
            :wind="weather.wind"
        />
    </div>
    <div v-else>

    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Prop } from 'vue-property-decorator';
import WeatherCard from '@/components/WeatherCard.vue';
import DetailCard from '@/components/DetailCard.vue';
import { WeatherRes } from '../types/WeatherRes';
import { getWeather } from '../utils/weather';

@Component({
    name: 'weather',
    components: {
        WeatherCard,
        DetailCard
    }
})
export default class Weather extends Vue {
    @Prop() private msg!: String;
    weather!: WeatherRes | undefined;
    loading: boolean = true;

    async created() {
        this.weather = await getWeather('springville');

        if (this.weather != undefined) {
            this.loading = false;
        }
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

    .card {
    }

    .card-left {
        border-right: 5px solid black;
    }
}

@media only screen and (max-width: $tablet-size) {
    .weather {
        height: 200px;
    }
}

@media only screen and (max-width: $mobile-size) {
    .weather {
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
