<template>
    <div v-if="! loading" class="weather-card">
        <div class="temp">{{ weather.details.temp }}</div>
        <div class="icon"></div>
        <div class="description">{{weather.weather.description}}</div>
    </div>
    <div v-else>
        {{errMsg}}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { WeatherRes } from '@/types/WeatherRes';
import axios, { AxiosResponse } from 'axios';
import {getWeather} from '@/utils/weather';

@Component({
    name: 'weatherCard'
})
export default class WeatherCard extends Vue {
    @Prop() private msg!: string;

    weather: WeatherRes | undefined;
    loading: Boolean = true;
    errMsg: String = "Nothing to show here";

    async created() {
        this.weather = await getWeather('springville');
        console.log(this.weather);

        if (this.weather == undefined) {
            this.errMsg = "Something went wrong";
        }
        else {
            this.loading = false;
        }
    }
}
</script>

<style scoped lang="scss"></style>
