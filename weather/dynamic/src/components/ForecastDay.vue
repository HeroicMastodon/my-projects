<template> 
<div v-if="forecast" class="forecast">
    <forecast-card 
        :forecastItem="forecast[0]"
    />
</div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from 'vue-property-decorator';

import ForecastCard from '@/components/ForecastCard.vue';

import { ForecastRes } from '../types/Forecast';

@Component({
    name: 'forecast',
    components:{
        ForecastCard
    } 
})
export default class ForecastDay extends Vue {
    @Prop() forecast!: ForecastRes | undefined;

    created() {
        console.log(this.forecast);
    }
}
</script>

<style lang="scss" scoped>
.forecast {
    // width: 100%;
}
</style>
