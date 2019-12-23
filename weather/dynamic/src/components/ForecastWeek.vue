<template>
    <div class="forecast-week"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Prop, Component} from 'vue-property-decorator';
import { ForecastItem } from '../types/Forecast';
import { getDayFromHourlyForecast } from '../utils/weather';

@Component({
    name: 'forecastWeek'
})
export default class ForecastWeek extends Vue{
    @Prop() forecastList!: Array<ForecastItem>;
    
    created() {
        if (this.forecastList) {
            getDayFromHourlyForecast(this.forecastList);
        }
    }
}
</script>