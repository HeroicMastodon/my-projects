<template>
    <div id="app">
        <nav-bar class="weather-nav">
            <template v-slot:brandContent>Brand</template>
            <template v-slot:bars>
                <router-link class="item" to="/">
                    Your Places
                </router-link>
            </template>
        </nav-bar>
        <router-view class="route" :key="$router.currentRoute.fullPath" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State, Getter } from 'vuex-class';
import NavBar from '@/components/assortedfolk/AFNav.vue';
import { Store } from 'vuex';
import { WeatherRes } from './types/WeatherRes';
import { WeatherState } from './store/weather/state';
import { namespace } from '@/store/user';

@Component({
    components: {
        NavBar
    }
})
export default class App extends Vue {
    // @Action('fetchWeather', {namespace}) fetchWeather: any;
    // @Action('fetchForecast', {namespace}) fetchForecast: any;
    @State('user', {namespace}) user!: any;
    // @Getter('getWeather', {namespace}) getWeather: any;

    async created() {
        // await this.fetchWeather('provo');
        // await this.fetchForecast('provo');

        // await this.fetchWeather('springville');
        // console.log(this.getWeather);

        // if (this.weather != undefined) {
        //     console.log(this.weather.details);
        // }
    }
}
</script>

<style lang="scss">
@import './assets/scss/test.scss';

#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin: auto;
    // max-width: 1500px;
    // display: flex;
    // justify-content: center;
    // align-items: center;
    width: 100%;
    box-sizing: border-box;
}
body {
    height: 100%;
    background-color: #ececec;
    margin: 0;
}

.weather-nav {
    font-size: 20px;
}

.route {
    z-index: -1;
    max-width: 1500px;
    // max-width: 1500px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
