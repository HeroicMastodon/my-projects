<template>
    <div id="app">
        <nav-bar class="weather-nav">
            <template v-slot:brandContent>Brand</template>
        </nav-bar>
        <router-view class="route" :key="$router.currentRoute.fullPath" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import NavBar from '@/components/assortedfolk/AFNav.vue';

@Component({
    components: {
        NavBar
    }
})
export default class App extends Vue {
    created() {
        // console.log(this.$router.currentRoute.fullPath)
    }
}
</script>

<style lang="scss">
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
    font-size: 10px;
}

.route {
    max-width: 1500px;
    // max-width: 1500px;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
