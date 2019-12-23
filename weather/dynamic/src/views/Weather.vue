<template>
    <div class="weather" v-if="!loading">
        <div class="heading">
            <div class="location">
                {{proper(location)}}
            </div>
            <div class="date">
                {{date}}
            </div>
        </div>
        <div id="weather-bar" :class="'weather-bar ' + size">
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
                :feelsLike="weather.details.feels_like"
            />
        </div>
        <div class="sub-heading">24 Hour Forecast</div>
        <forecast-day :forecast="forecast" :size="size" />
        <div class="sub-heading">5 Day Forecast</div>
        <forecast-week :forecastList="forecast.list" />
    </div>
    <div v-else>
        <loader stroke="#aa5555" />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import {Component, Vue, Prop} from "vue-property-decorator";

import WeatherCard from "@/components/WeatherCard.vue";
import DetailCard from "@/components/DetailCard.vue";
import Loader from "@/components/Loader.vue";
import ForecastDay from "@/components/ForecastDay.vue";
import ForecastWeek from "@/components/ForecastWeek.vue";

import {WeatherRes} from "../types/WeatherRes";
import {getWeather, getForecast} from "../utils/weather";
import {ForecastRes} from "../types/Forecast";
import { proper } from '../utils/helpers';

@Component({
    name: "weather",
    components: {
        WeatherCard,
        DetailCard,
        Loader,
        ForecastDay,
        ForecastWeek
    }
})
export default class Weather extends Vue {
    @Prop() private msg!: String;

    readonly tabletSize = 1300;
    readonly mobileSize = 768;

    weather!: WeatherRes;
    forecast!: ForecastRes | undefined;
    loading: boolean = true;
    size: string = "desktop";
    location: string = "springville, UT";
    date: string = "Monday December 23";

    async created() {
        if (window.innerWidth < this.mobileSize) {
            this.size = "mobile";
        } else if (window.innerWidth < this.tabletSize) {
            this.size = "tablet";
        }

        try {
            this.weather = await getWeather(this.location);
            this.forecast = await getForecast(this.location);

            console.log(this.weather);

            window.addEventListener("resize", this.handleResize);
            this.loading = false;
            
        } catch (error) {
            console.error(error);
        }
    }

    handleResize(event: Event) {
        const width = window.innerWidth;
        const element = this.$el;
        const currSize = this.size;

        if (width < this.mobileSize && currSize != "mobile") {
            this.size = "mobile";
        } else if (
            width < this.tabletSize &&
            width >= this.mobileSize &&
            currSize != "tablet"
        ) {
            this.size = "tablet";
        } else if (width > this.tabletSize && currSize != "desktop") {
            this.size = "desktop";
        }
    }

    beforeDestroy() {
        window.removeEventListener("resize", this.handleResize);
    }

    proper = (word: string) => {
        return proper(word);
    }
}
</script>

<style lang="scss" scoped>
@import "../scss/__stuff.scss";

.weather {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 10px;

    .weather-bar {
        display: flex;
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
}
</style>
