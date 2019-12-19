<template>
    <div class="weather">
        <weather-card class="card card-left" />
        <weather-card class="card card-right" />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Prop } from 'vue-property-decorator';
import WeatherCard from '@/components/WeatherCard.vue';

@Component({
    name: 'weather',
    components: {
        WeatherCard
    }
})
export default class Weather extends Vue {
    @Prop() private msg!: String;

    
}
</script>

<style lang="scss" scoped>
    .weather {
        display: flex;
        margin: 10px;
        align-content: center;
        justify-content: center;
        height: 300px;
        width: 100%;

        .card {
            
        }

        .card-left {
            border-right: 5px solid black;
        }
    }
</style>
