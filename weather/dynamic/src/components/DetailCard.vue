<template>
    <div :class="'detail-card ' + size">
        <div class="group">
            <!-- temps -->
            <div class="detail">
                <div class="value">{{ details.temp_min + '&deg;' }}</div>
                <div class="name">High</div>
            </div>
            <div class="detail">
                <div class="value">{{ details.temp_max + '&deg;' }}</div>
                <div class="name">Low</div>
            </div>
        </div>
        <div class="group">
            <!-- wind and precip -->
            <div class="detail">
                <div class="value">{{ wind.speed + 'mph' }}</div>
                <div class="name">Wind</div>
            </div>
            <div class="detail">
                <div class="value">{{ precipitation.amount + ' in' }}</div>
                <div class="name">{{ proper(precipitation.type) }}</div>
            </div>
        </div>
        <div class="group">
            <!-- Sunrise/set -->
            <div class="detail">
                <div class="value">{{ getTime(sun.rise) }}</div>
                <div class="name">Sunrise</div>
            </div>
            <div class="detail">
                <div class="value">{{ getTime(sun.set) }}</div>
                <div class="name">Sunset</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import { WeatherRes, WeatherMain, Sun, Precip, Wind } from '@/types/WeatherRes';
import { getWeather } from '@/utils/weather';

@Component({
    name: 'detailCard'
})
export default class DetailCard extends Vue {
    @Prop() private msg!: string;
    @Prop() details!: WeatherMain;
    @Prop() sun!: Sun;
    // TODO: Use 'feels like' instead of precipitation
    @Prop() precip!: Precip;
    @Prop() wind!: Wind;
    @Prop() size!: string;

    precipitation!: any;
    weather: WeatherRes | undefined;
    place: string = 'springville';
    loading: Boolean = true;
    errMsg: String = 'Nothing to show here';

    async created() {
        this.precipitation = this.getPrecip();
    }

    getTime(time: number) {
        let date = new Date(time * 1000);
        let minutes = '0' + date.getMinutes();
        let hours = '0' + date.getHours();

        return hours.substr(-2) + ':' + minutes.substr(-2);
    }

    getPrecip() {
        if (this.precip == null) {
            return {
                type: 'rain',
                amount: 0
            };
        }

        let amount = 0;
        const conversion = 25.4;

        if (this.precip.threeHour != undefined) {
            amount = Math.round(this.precip.threeHour / conversion);
        } else if (this.precip.oneHour != undefined) {
            amount = Math.round(this.precip.oneHour / conversion);
        }

        return {
            type: this.precip.type,
            amount: amount
        };
    }

    proper(name: string) {
        return name[0].toUpperCase() + name.slice(1);
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

    &.tablet {
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
    &.mobile {
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
