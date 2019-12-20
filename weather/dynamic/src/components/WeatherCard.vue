<template>
    <div class="weather-card">
        <div class="icon">
            <i :class="'owi owi-' + icon"></i>
        </div>
        <div class="details">
            <div class="temp">{{ temp + '&deg;' }}</div>
            <div class="description">
                {{ camelCase(description) }}
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { WeatherRes } from '@/types/WeatherRes';
import { getWeather } from '@/utils/weather';
import {proper, camelCase} from '@/utils/helpers';

@Component({
    name: 'weatherCard'
})
export default class WeatherCard extends Vue {
    @Prop() private description!: string;
    @Prop() private icon!: string;
    @Prop() private temp!: number;


    async created() {

    }

    camelCase = (value: string) => {
        return camelCase(value)
    } 

}
</script>

<style scoped lang="scss">
@import '../scss/__stuff.scss';

.weather-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #999999;
    // padding: 10px;
    height: 100%;

    .details {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 50%;
        height: 100%;

        .temp {
            font-size: 150px;
        }

        .description {
            font-size: 50px;
        }
    }

    .icon {
        width: 50%;
        height: 100%;

        .owi {
            font-size: 250px;
            padding-top: 25px;
        }
    }
}

@media only screen and (max-width: $tablet-size) {
    .weather-card {
        .details {
            .temp {
                font-size: 100px;
            }

            .description {
                font-size: 30px;
            }
        }

        .icon {
            .owi {
                font-size: 150px;
            }
        }
    }
}

@media only screen and (max-width: $mobile-size) {
    .weather-card {
        .details {
            .temp {
                font-size: 75px;
            }

            .description {
                font-size: 30px;
            }
        }

        .icon {
            .owi {
                font-size: 125px;
            }
        }
    }
}
</style>
