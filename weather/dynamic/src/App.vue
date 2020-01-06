<template>
    <div id="app">
		<!-- Make nav sticky and put the page nav buttons here -->
        <nav-bar class="weather-nav">
            <template v-slot:brandContent>Brand</template>
            <template v-slot:bars>
                <router-link class="item" to="/">
                    Your Places
                </router-link>
                <form class="search-wrapper" @submit.prevent="search()">
                    <input type="text" name="search" placeholder="City, State, Country" v-model="searchTerm">
                    <button class="search-button">Search</button>
                </form>
            </template>
			<template v-slot:side>
				<places/>
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
import Places from '@/components/Places.vue';

@Component({
    components: {
		NavBar,
		Places
    }
})
export default class App extends Vue {
	@State('user', {namespace}) user!: any;

    searchTerm = '';

    async created() {
    }

    search() {
        const path = '/weather/' + this.searchTerm;

        if (path != this.$route.fullPath && this.searchTerm != '') {
            this.$router.push('/weather/' + this.searchTerm);
        }
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
