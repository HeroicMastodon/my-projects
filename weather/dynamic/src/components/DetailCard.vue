<template>
    <div v-if="!loading" class="detail-card">
        <div class="group">
            <!-- temps -->
            <div class="detail">
                <div class="value">{{details.temp_min + "&deg;"}}</div>
                <div class="name">High</div>
            </div>
            <div class="detail">
                <div class="value">{{details.temp_max + "&deg;"}}</div>
                <div class="name">Low</div>
            </div>
        </div>
        <div class="group">
            <!-- wind and precip -->
            <div class="detail">
                <div class="value">{{wind.speed + "mph"}}</div>
                <div class="name">Wind</div>
            </div>
            <div class="detail">
                <div class="value">{{precip.amount + " in"}}</div>
                <div class="name">{{proper(precip.type)}}</div>
            </div>
        </div>
        <div class="group">
            <!-- Sunrise/set -->
            <div class="detail">
                <div class="value">{{getTime(sun.rise)}}</div>
                <div class="name">Sunrise</div>
            </div>
            <div class="detail">
                <div class="value">{{getTime(sun.set)}}</div>
                <div class="name">Sunset</div>
            </div>
        </div>
    </div>
    <div v-else>
        {{ errMsg }}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { WeatherRes, WeatherMain, Sun, Precip, Wind } from '@/types/WeatherRes';
import { getWeather } from '@/utils/weather';

@Component({
    name: 'detailCard'
})
export default class DetailCard extends Vue {
    @Prop() private msg!: string;
    @Prop() details!: WeatherMain;
    @Prop() sun!: Sun;
    @Prop() precip!: Precip;
    @Prop() wind!: Wind;

    weather: WeatherRes | undefined;
    place: string = 'springville';
    loading: Boolean = true;
    errMsg: String = 'Nothing to show here';
    precip: any;

    async created() {
        this.weather = await getWeather(this.place);
        console.log(this.weather);

        if (this.weather == undefined) {
            this.errMsg = 'Something went wrong';
        } else {
            this.loading = false;
            this.precip = this.getPrecip();
        }
    }

    getTime(time: number) {
        let date = new Date(time * 1000);
        console.log(date, date.getHours(), date.getMinutes());
        let minutes = "0" + date.getMinutes();
        let hours = "0" + date.getHours();

        return hours.substr(-2) + ":" + minutes.substr(-2);
    }

    getPrecip() {
        let precip = null;
        if (this.weather) {
            precip = this.weather.precip || null;
        }

        if (precip == null) {
            return {
                type: "rain",
                amount: 0
            };
        }

        let amount = 0;
        const conversion = 25.4;

        if (precip.threeHour != undefined) {
            amount = Math.round(precip.threeHour / conversion);
        }
        else if (precip.oneHour != undefined) {
            amount = Math.round(precip.oneHour / conversion);
        }

        return {
            type: precip.type,
            amount: amount
        }
    }

    proper(name: string) {
        return name[0].toUpperCase() + name.slice(1);
    }

    camelCase(sentence: string) {
        let arr = sentence.split(' ');

        return arr.reduce((before, current) => {
            if (before[0] !== before[0].toUpperCase()) {
                before = this.proper(before);
            }

            before += ' ' + this.proper(current);
            return before;
        });
    }
}
</script>

<style scoped lang="scss">
@import '../scss/__stuff.scss';

.detail-card {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
    height: 100%;

    background-color: #2222;

    .group {
        display: flex;

        flex-direction: column;
        justify-content: space-evenly;

        .detail {

            .value {
                font-size: 50px;
                font-weight: bold;
            }

            .name {
                font-size: 25px;
            }

        }
    }
}

@media only screen and (max-width: $tablet-size) {
    .detail-card {
        .group {

            .detail {

                .value {
                    font-size: 35px;
                    font-weight: inherit;
                }

                .name {
                    font-size: 20px;
                }
            }
        }
    }
}

@media only screen and (max-width: $mobile-size) {
    .detail-card {
        .group {

            .detail {

                .value {
                    font-size: 25px;
                    font-weight: inherit;
                }

                .name {
                    font-size: 15px;
                }
            }
        }
    }
}
</style>
