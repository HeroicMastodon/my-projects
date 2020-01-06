<template>
    <div class="weather" v-if="!loading">
        <div :class="'heading ' + size">
            <div class="location-wrapper">
                <div class="location">
                    {{ proper(location) }}
                </div>
                <div class="date">
                    {{ date }}
                </div>
            </div>
            <div class="manage">
                <div :class="isPlace(location) ? 'remove' : 'add'" @click="addRemove()">
                    <div class="add-line"></div>
                    <div class="add-line"></div>
                </div>
                <div class="default"></div>
            </div>
        </div>
        <div
            id="weather-bar"
            :class="'weather-bar ' + size"
            v-if="size != 'mobile' || activeItem == 'weather'"
        >
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
        <template v-if="size != 'mobile' || activeItem == 'today'">
            <div :class="'sub-heading ' + size">24 Hour Forecast</div>
            <forecast-day :forecast="forecast" :size="size" />
        </template>
        <template v-if="size != 'mobile' || activeItem == 'week'">
            <div :class="'sub-heading ' + size">5 Day Forecast</div>
            <forecast-week :forecastList="forecast.list" :size="size" />
        </template>
        <div
            :class="'activation-buttons ' + activeItem"
            v-if="size == 'mobile'"
        >
            <button @click="setActive('weather')" class="weather-button">
                Weather
            </button>
            <button @click="setActive('today')" class="today-button">
                24 Hr
            </button>
            <button @click="setActive('week')" class="week-button">
                5 Day
            </button>
        </div>
    </div>
    <div v-else-if="error">
        Something went wrong retrieving the data. Make sure everything is
        spelled correctly or try again later.
    </div>
    <div v-else>
        <loader stroke="#aa5555" />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Prop } from 'vue-property-decorator';

import Loader from '@/components/Loader.vue';

const WeatherCard = () => ({
    component: import(
        /* webpackPrefetch: true */ '@/components/WeatherCard.vue'
    ) as any,
    loading: Loader,
    delay: 1
});
const DetailCard = () => ({
    component: import(
        /* webpackPrefetch: true */ '@/components/DetailCard.vue'
    ) as any,
    loading: Loader,
    delay: 1
});
const ForecastDay = () => ({
    component: import(
        /* webpackPrefetch: true */ '@/components/ForecastDay.vue'
    ) as any,
    loading: Loader,
    delay: 1
});
const ForecastWeek = () => ({
    component: import(
        /* webpackPrefetch: true */ '@/components/ForecastWeek.vue'
    ) as any,
    loading: Loader,
    delay: 1
});

import { WeatherRes } from '../types/WeatherRes';
import { getWeather, getForecast } from '../utils/weather';
import { ForecastRes } from '../types/Forecast';
import { proper, camelCase } from '../utils/helpers';
import { State, Action, Getter, Mutation } from 'vuex-class';
import { WeatherState } from '../store/weather/state';
import { namespace } from '../store/weather';

@Component({
    name: 'weather',
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

    @State('weather') weatherState?: WeatherState;
    @Action('fetchWeather', { namespace }) getWeather?: any;
    @Action('fetchForecast', { namespace }) getForecast?: any;
    @Getter('isPlace', { namespace: 'user' }) isPlace?: any;
    @State('places', {namespace: 'user'}) places?: Array<string>;
    @Mutation('addPlace', { namespace: 'user'}) addPlace?: any;
    @Mutation('removePlace', {namespace: 'user'}) removePlace?: any;


    readonly tabletSize = 1050;
    readonly mobileSize = 765;

    weather!: WeatherRes;
    forecast!: ForecastRes | undefined;
    loading: boolean = true;
    size: string = 'desktop';
    location: string = 'springville';
    date: string = 'Monday December 23';
    activeItem: string = 'weather';
    error: boolean = false;

    async created() {
        if (this.$route.params.hasOwnProperty('place')) {
            this.location = this.$route.params.place;
		}
		else if (this.places != undefined) {
			this.location = this.places[0];
		}
        if (window.innerWidth < this.mobileSize) {
            this.size = 'mobile';
        } else if (window.innerWidth < this.tabletSize) {
            this.size = 'tablet';
        }

        console.log(this.places);

        try {
            await this.getWeather(this.location);
            await this.getForecast(this.location);

            if (this.weatherState != undefined) {
                this.weather = this.weatherState.weather as WeatherRes;
                this.forecast = this.weatherState.forecast as ForecastRes;
            }

            window.addEventListener('resize', this.handleResize);

            let date = new Date().toDateString().split(' ');
            this.date = date[0] + ', ' + date[1] + ' ' + date[2];

            this.loading = false;
            this.error = false;
        } catch (error) {
            console.error(error);
            this.error = true;
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

    proper = (word: string) => {
        return camelCase(word);
    };

    setActive(item: string) {
        this.activeItem = item;
    }

    showWeather() {
        this.activeItem = 'weather';
    }

    showToday() {
        this.activeItem = 'today';
    }

    showForecast() {
        this.activeItem = 'week';
    }

    addRemove() {
        if (this.isPlace(this.location)) {
            this.removePlace(this.location);
        }
        else {
            this.addPlace(this.location);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/__stuff.scss';

.weather {
    width: 90vw;
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    z-index: -1;

    .heading {
        width: 100%;
        text-align: left;
        align-self: flex-start;
        display: flex;
        justify-content: space-between;

        .location-wrapper {
            .location {
                font-size: 60px;
                font-weight: bold;
            }

            .date {
                font-size: 35px;
            }
        }

        .manage {
            border: 2px black solid;
            display: flex;
            flex-direction: column;

            .add {
                border: 2px black solid;
                width: 20px;
                height: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .add-line {
                    transition: 0.2s;
                    width: 18px;
                    height: 2px;
                    background-color: black;

                    &:last-child {
                        transform: rotate(90deg) translateX(-1px);
                    }
                }
            }

            .remove {
                border: 2px black solid;
                width: 20px;
                height: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;

                .add-line {
                    transition: 0.2s;
                    width: 18px;
                    height: 1px;
                    background-color: black;
                }
            }
        }

        &.mobile,
        &.tablet {
            .location {
                font-size: 35px;
            }

            .date {
                font-size: 25px;
            }
        }
    }

    .sub-heading {
        font-size: 35px;
        text-align: left;

        &.mobile,
        &.tablet {
            display: none;
        }
    }

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
            height: 340px;
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

    .activation-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 0;
        position: fixed;
        top: 480px;
        left: 0px;
        width: 100%;
        z-index: -1;

        button {
            background: transparent;
            border: none;
            margin: 10px 0;
            font-size: 7vw;
            width: fit-content;

            box-shadow: 6px 6px 6px 0 rgba(0, 0, 0, 0.247),
                -6px -6px 6px 0 rgb(255, 255, 255);

            &:focus {
                outline: none;

                box-shadow: inset 9px 9px 9px 0 rgba(0, 0, 0, 0.247),
                    inset -9px -9px 5px 0 rgb(255, 255, 255);
            }
        }

        &.weather {
            .weather-button {
                box-shadow: inset 9px 9px 9px 0 rgba(0, 0, 0, 0.247),
                    inset -9px -9px 5px 0 rgb(255, 255, 255);
            }
        }
        &.today {
            .today-button {
                box-shadow: inset 9px 9px 9px 0 rgba(0, 0, 0, 0.247),
                    inset -9px -9px 5px 0 rgb(255, 255, 255);
            }
        }
        &.week {
            .week-button {
                box-shadow: inset 9px 9px 9px 0 rgba(0, 0, 0, 0.247),
                    inset -9px -9px 9px 0 rgb(255, 255, 255);
            }
        }
    }
}

// @media only screen and (max-width: 1600px) {
//     .weather {
//         max-width: 1025px;
//     }
// }
// @media only screen and (max-width: 1100px) {
//     .weather {
//         max-width: 760px;
//     }
// }
// @media only screen and (max-width: 800px) {
//     .weather {
//         max-width: 300px;
//     }
// }
</style>
