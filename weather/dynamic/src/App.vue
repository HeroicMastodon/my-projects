<template>
    <div id="app">
        <!-- Make nav sticky and put the page nav buttons here -->
        <nav-bar
            class="weather-nav"
            :active-class="sidebarOpen ? 'active' : ''"
        >
            <template v-slot:brandContent>
                <div class="toggle-container" @click="toggle()">
                    <toggle :active-class="sidebarOpen ? 'active' : ''" />
                    <div class="item">
                        <div>
                            Your Places
                        </div>
                    </div>
                </div>
            </template>
            <template v-slot:bars>
                <form class="search-wrapper" @submit.prevent="search()">
                    <input
                        type="text"
                        name="search"
                        placeholder="City, State, Country"
                        v-model="searchTerm"
                    />
                    <button class="search-button" title="test">Search</button>
                </form>
            </template>
            <template v-slot:side>
                <places />
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
import Places from '@/components/Places.vue';
import Toggle from '@/components/assortedfolk/AFToggle.vue';
import { State as storeState, stateFields } from './store/state';

@Component({
    components: {
        NavBar,
        Places,
        Toggle
    }
})
export default class App extends Vue {
    @State(stateFields.user) user!: any;

    searchTerm = '';
    sidebarOpen = false;

    async created() {}

    search() {
        const path = '/weather/' + this.searchTerm;

        if (path != this.$route.fullPath && this.searchTerm != '') {
            this.$router.push('/weather/' + this.searchTerm);
        }
    }

    toggle() {
        this.sidebarOpen = !this.sidebarOpen;
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

.toggle-container {
    display: flex;
    height: 100%;
    overflow: hidden;

    &:hover {
        cursor: pointer;
    }
    .item {
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.search-wrapper {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
        height: 15px;
        margin-left: 10px;
    }

    button {
        height: 25px;
        margin-left: 10px;
    }
}
</style>
