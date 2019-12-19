<template>
    <div v-if="!loading" class="weather-card">
        <div class="icon">
            <div class="description">{{ camelCase(weather.weather.description) }}</div>
            <img
                :src="
                    'http://openweathermap.org/img/w/' +
                        weather.weather.icon +
                        '.png'
                "
            />
        </div>
        <div class="temp">{{ weather.details.temp + ' &deg;F' }}</div>
        <h4 class="header">{{ proper(place) }}</h4>
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
        
        return arr.map((item) => {
            return this.proper(item);
        }).join(' ');
    }
}
</script>

<style scoped lang="scss">
.weather-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .icon {
        display: flex;
        align-items: center;
    }
}
</style>
