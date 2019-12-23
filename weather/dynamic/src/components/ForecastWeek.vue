<template>
    <div v-if="week" class="forecast-week">
        <forecast-card
            v-for="(day, index) in week" :key="index"
            :forecastItem="day"
            :size="'desktop'"
            :direction="'horizontal'"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Prop, Component} from 'vue-property-decorator';
import { ForecastItem } from '../types/Forecast';
import { getDayFromHourlyForecast } from '../utils/weather';

import ForecastCard from '@/components/ForecastCard.vue';

@Component({
    name: 'forecastWeek',
    components: {
        ForecastCard
    }
})
export default class ForecastWeek extends Vue{
    @Prop() forecastList!: Array<ForecastItem>;

    week!: Array<ForecastItem>;
    
    created() {
        if (this.forecastList) {
            getDayFromHourlyForecast(this.forecastList);
            
            this.getDaysFromList(this.forecastList);
        }
    }

    getDaysFromList(list: Array<ForecastItem>) {
        this.week = new Array();

        let date = list[0].time.date;
        let day: Array<ForecastItem> = new Array();
        list.forEach((item) => {
            if (item.time.date != date) {
                this.week.push(getDayFromHourlyForecast(day));
                day = new Array();
                date = item.time.date;
            }

            day.push(item);
        })
        this.week.push(getDayFromHourlyForecast(day));
    }
}
</script>