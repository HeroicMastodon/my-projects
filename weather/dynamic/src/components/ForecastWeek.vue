<template>
    <div v-if="week" :class="'forecast-week ' + size">
        <forecast-card
            v-for="(day, index) in filterWeek()" :key="index"
            :forecastItem="day"
            :size="size"
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
    @Prop() size!: string;

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

    filterWeek() {
        return this.week.slice(1);
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/__stuff.scss';

.forecast-week {
    width: 100%;
    display: block;
    min-width: 0;
    z-index: -1;


    &.mobile {
        height: 320px;
    }
}
</style>