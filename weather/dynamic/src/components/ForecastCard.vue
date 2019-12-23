<template>
    <div :class="'forecast-card ' + direction + ' ' + size">
        <div class="time">{{time}}</div>
        <div class="icon"><i :class="'owi owi-' + icon"></i></div>
        <div class="temp">{{temp + "&deg;"}}</div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import { ForecastRes, ForecastItem } from "../types/Forecast";

@Component({
    name: "forecastCard",
    components: {}
})
export default class ForecastCard extends Vue {
    @Prop() forecastItem!: ForecastItem | undefined;
    @Prop() direction!: string;
    @Prop() size!: string;

    time!: string;
    icon!: string;
    temp!: number;

    created() {
        if (this.forecastItem) {
            this.time = this.forecastItem.time.time;
            this.icon = this.forecastItem.weather.icon;
            this.temp = Math.round(this.forecastItem.main.temp);
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
            font-size:  120px;
        }

        .temp {
            font-size: 50px;
        }

        &.tablet {
            width: 100px;
            height: 200px;

            .time, .temp {
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

            .time, .temp {
                font-size: 30px;
            }

            .icon i {
                font-size: 90px;
            }
        }
    }
}
</style>