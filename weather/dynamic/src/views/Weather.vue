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
@import '../scss/__stuff.scss';

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

@media only screen and (max-width: $tablet-size) {
    .weather {
        height: 200px;
    }
}

@media only screen and (max-width: $mobile-size) {
    .weather {
        height: 100%;
        flex-direction: column;
        overflow: hidden;

        .card {
            border-bottom: solid 5px black;
        }

        .card-left {
            border-right: none;
            height: 180px;
            overflow: hidden;
        }

        .card-right {
            height: 140px;
            overflow: hidden;
        }
    }
}
</style>
