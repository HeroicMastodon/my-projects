<template>
    <div
        :class="'forecast-card ' + direction + ' ' + size"
        v-if="direction == 'vertical'"
    >
        <div class="time">{{ time }}</div>
        <div class="icon"><i :class="'owi owi-' + icon"></i></div>
        <div class="temp">{{ temp + '&deg;' }}</div>
    </div>
    <div
        :class="'forecast-card ' + direction + ' ' + size"
        v-else-if="direction == 'horizontal'"
    >
        <div class="group">
            <div class="day">
                {{ day }}
            </div>
            <div class="date">{{ date }}</div>
        </div>
        <div class="icon"><i :class="'owi owi-' + icon"></i></div>
        <div class="group">
            <div class="temp">{{ low + "&deg;" }}</div>
            <div>Low</div>
        </div>
        <div class="group">
            <div class="temp">{{ high + "&deg;" }}</div>
            <div>High</div>
        </div>
        <div class="group" v-if="size != 'mobile'">
            <div class="wind">{{ wind + "mph" }}</div>
            <div>Wind</div>
        </div>
        <div class="group" v-if="size != 'mobile'">
            <div class="feels-like">{{ feelsLike + "&deg;" }}</div>
            <div>Feels Like</div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ForecastRes, ForecastItem } from '../types/Forecast';

@Component({
    name: 'forecastCard',
    components: {}
})
export default class ForecastCard extends Vue {
    @Prop() forecastItem!: ForecastItem | undefined;
    @Prop() direction!: string;
    @Prop() size!: string;

    // vertical card
    time!: string;
    icon!: string;
    temp!: number;

    // horizontal card
    date!: string;
    low!: number;
    high!: number;
    wind!: number;
    feelsLike!: number;
    day!: string;

    created() {
        if (this.forecastItem) {
            this.time = this.forecastItem.time.time;
            this.icon = this.forecastItem.weather.icon;
            this.temp = Math.round(this.forecastItem.main.temp);

            let date = this.forecastItem.time.dateTime;
            this.date = date.getMonth() + 1 + '/' + date.getDate();

            this.low = Math.round(this.forecastItem.main.temp_min);
            this.high = Math.round(this.forecastItem.main.temp_max);
            this.feelsLike = Math.round(this.forecastItem.main.feels_like);
            this.wind = Math.round(this.forecastItem.wind.speed);
            this.day = this.forecastItem.time.day;
        }
    }
}
</script>

<style lang="scss" scoped>
.forecast-card {
    display: flex;
    justify-content: space-evenly;

    &.vertical {
        flex-direction: column;
        height: 300px;
        background-color: gray;
        width: 150px;

        .time {
            font-size: 50px;
        }

        .icon i {
            font-size: 120px;
        }

        .temp {
            font-size: 50px;
        }

        &.tablet {
            width: 100px;
            height: 200px;

            .time,
            .temp {
                font-size: 30px;
            }

            .icon i {
                font-size: 90px;
            }
        }

        &.mobile {
            margin: 0 10px;
            width: 120px;
            height: 200px;
            padding: 0 5px;

            .time,
            .temp {
                font-size: 30px;
            }

            .icon i {
                font-size: 90px;
            }
        }
    }

    &.horizontal {
        background-color: rgb(158, 158, 158);
        height: 50px;
        margin-top: 5px;
        padding: 5px 0;
        width: 100%;
        min-width: 280px;

        justify-content: space-evenly;

        .group {
            width: fit-content;
            div:first-child {
                font-size: 20px;
                font-weight: bold;
            }

            div:nth-child(2) {
                font-size: 20px;
            }
        }

        .icon {
            font-size: 50px;
        }

    }
}
</style>
