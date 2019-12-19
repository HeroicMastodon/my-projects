<template>
    <div v-if="!loading" class="weather-card">
        <div class="icon">
            <i :class="'owi owi-' + weather.weather.icon"></i>
        </div>
        <div class="details">
            <div class="temp">{{ weather.details.temp + '&deg;' }}</div>
            <div class="description">
                {{ camelCase(weather.weather.description) }}
            </div>
        </div>
    </div>
    <div v-else>
        {{ errMsg }}
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { WeatherRes } from '@/types/WeatherRes';
import { getWeather } from '@/utils/weather';

@Component({
    name: 'weatherCard'
})
export default class WeatherCard extends Vue {
    @Prop() private msg!: string;

    weather: WeatherRes | undefined;
    place: string = 'springville';
    loading: Boolean = true;
    errMsg: String = 'Nothing to show here';

    async created() {
        this.weather = await getWeather(this.place);
        console.log(this.weather);

        if (this.weather == undefined) {
            this.errMsg = 'Something went wrong';
        } else {
            this.loading = false;
        }
    }

    proper(name: string) {
        return name[0].toUpperCase() + name.slice(1);
    }

    camelCase(sentence: string) {
        let arr = sentence.split(' ');

        // return arr.map((item) => {
        //     return this.proper(item);
        // }).join(' ');
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
.weather-card {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    background-color: #999999;
    padding: 10px;
    height: 100%;

    .details {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
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
        }
    }
}
</style>
