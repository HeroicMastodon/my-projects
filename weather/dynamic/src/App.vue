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
                <template v-if="user">
                    <places @selected="toggle()" />
                    <button class="redirect-button" @click="logoutUser()">
                        Logout
                    </button>
                </template>
                <template v-else>
                    <div>Login or register to save places you want to see!</div>
                    <button
                        v-if="$route.fullPath != '/'"
                        class="redirect-button"
                        @click="redirectToLogin()"
                    >
                        Login or Register
                    </button>
                </template>
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
import { User } from './types/Other';
import { actionFields, LogoutAction } from './store/actions';

@Component({
    components: {
        NavBar,
        Places,
        Toggle
    }
})
export default class App extends Vue {
    @State(stateFields.user) user!: User | null;

    @Action(actionFields.logout) logout!: LogoutAction;

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

    async logoutUser() {
        await this.logout();
        this.$router.go(0);
    }

    redirectToLogin() {
        this.$router.replace('/');
        this.sidebarOpen = false;
    }
}
</script>

<style lang="scss">
@import './assets/scss/test.scss';
@import './scss/__stuff';

#app {
	// font-family: 'Avenir', Helvetica, Arial, sans-serif;
	font-family: 'noto-sans';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: $grayText;
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
    background-color: $lightGray;
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
		color: $darkBlueText;
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
        background-color: $lightGray;
		color: $lightGrayText;
		border: none;
		padding: 5px 0;
		padding-left: 5px;
        &::placeholder {
			color: $grayText;
			font-weight: bold;
        }
    }

    button {
        height: 25px;
		margin-left: 10px;
		background-color: $lightBlue;
		border: none;
		color: $lightBlueText;
    }
}

button {
	border:none;
	border-radius: 10px;
	font-weight: bold;
	padding: 5px 8px;
}

.redirect-button {
	border: none;
	background-color: $lightBlue;
	font-size: 16px;
}

@media only screen and (max-width: 800px) {
    .toggle-container .item {
        display: none;
    }
}
</style>
