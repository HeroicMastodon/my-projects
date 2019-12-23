<template>
    <div class="forecast-card">

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

    created() {
        let test: ForecastItem;
        console.log(this.forecastItem);
    }
}
</script>
