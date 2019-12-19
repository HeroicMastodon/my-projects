<template>
    <div class="weather">
        <weather-card class="card card-left" />
        <detail-card class="card card-right" />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Prop } from 'vue-property-decorator';
import WeatherCard from '@/components/WeatherCard.vue';
import DetailCard from '@/components/DetailCard.vue';

@Component({
    name: 'weather',
    components: {
        WeatherCard,
        DetailCard
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

        //TODO: Remove
        overflow:hidden;

        .card {
            
        }

        .card-left {
            border-right: 5px solid black;
        }
    }
</style>
