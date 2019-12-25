<template>
    <div v-if="forecast" :class="'forecast ' + size">
        <forecast-card
            v-for="i in 8"
            :key="i"
            :forecastItem="forecast.list[i]"
            :test="'test'"
            direction="vertical"
            :size="size"
        />
    </div>
    <div v-else class="error">
        {{ error }}
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import ForecastCard from '@/components/ForecastCard.vue';

import { ForecastRes } from '../types/Forecast';

@Component({
    name: 'forecast',
    components: {
        ForecastCard
    }
})
export default class ForecastDay extends Vue {
    @Prop() forecast!: ForecastRes | undefined;
    @Prop() size!: string;
    @Prop() showMobileView!: boolean;
    error!: string;

    created() {
        if (!this.forecast) {
            this.error = 'Something went wrong';
        }
    }
}
</script>

<style lang="scss" scoped>
.forecast {
    // width: 100%;
    background-color: #3333;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;

    &.tablet {
        justify-content: space-evenly;
        overflow: auto;
    }

    &.mobile {
        justify-content: space-evenly;
        height: 340px;
    }
}
</style>
