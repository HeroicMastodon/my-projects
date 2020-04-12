<template>
    <div class="weather" v-if="!loading && weather && forecast">
        <div :class="'heading ' + size">
            <div class="location-wrapper">
                <div class="location">
                    {{ proper(location) }}
                </div>
                <div class="date">
                    {{ date }}
                </div>
            </div>
            <div v-if="user" class="manage">
                <div class="button-group">
                    <button class="add-button" @click="addRemove()">
						<div class="button-text" v-if="size != 'mobile'">
							{{
								!isPlace(location)
									? 'Add to My Places'
									: 'Remove from My Places'
							}}
						</div>
                        <button :class="isPlace(location) ? 'remove' : 'add'">
                            <div class="add-line"></div>
                            <div class="add-line"></div>
                        </button>
                    </button>
                </div>
                <div class="button-group">
                    <button
                        v-if="!isDefaultPlace(location)"
                        class="button-group"
                        type="button"
                        @click="setDefaultLocation(location)"
                    >
                        Set default
						<template v-if="size != 'mobile'">
							location
						</template>
                    </button>
                    <div v-else class="button-group">
						<template v-if="size != 'mobile'">
                        	This is your 
						</template>
						default location
                    </div>
                </div>
            </div>
        </div>
        <div
            id="weather-bar"
            :class="'weather-bar ' + size"
            v-if="(size != 'mobile' || activeItem == 'weather') && weather.weather"
        >
            <weather-card
                class="card card-left"
                :icon="weather.weather.icon"
                :temp="weather.details.temp"
                :description="weather.weather.description"
                :size="size"
            />
            <detail-card
                class="card card-right"
                :details="weather.details"
                :sun="weather.sun"
                :precip="weather.precip"
                :wind="weather.wind"
                :size="size"
                :feelsLike="weather.details.feels_like"
            />
        </div>
        <template v-if="size != 'mobile' || activeItem == 'today'">
            <div :class="'sub-heading ' + size">24 Hour Forecast</div>
            <forecast-day :forecast="forecast" :size="size" />
        </template>
        <template v-if="size != 'mobile' || activeItem == 'week'">
            <div :class="'sub-heading ' + size">5 Day Forecast</div>
            <forecast-week :forecastList="forecast.list" :size="size" />
        </template>
        <div
            :class="'activation-buttons ' + activeItem"
            v-if="size == 'mobile'"
        >
            <button @click="setActive('weather')" class="weather-button">
                Weather
            </button>
            <button @click="setActive('today')" class="today-button">
                24 Hr
            </button>
            <button @click="setActive('week')" class="week-button">
                5 Day
            </button>
        </div>
    </div>
    <div v-else-if="error">
        Something went wrong retrieving the data. Make sure everything is
        spelled correctly or try again later.
    </div>
    <div v-else-if="searchOnly" class="auth">
        <template v-if="user">
			<div class="message">
            	Welcome {{user.realName}}! Looks like you don't have a saved location! Search for a location in the
            	top bar to see the weather.
			</div>
        </template>
        <template v-else>
            <div class="message">
                Welcome to Assorted Folk's simple weather app. To get started,
                please login, create an account, or search for a place to view.
            </div>
            <auth />
        </template>
    </div>
    <div v-else>
        <loader stroke="#aa5555" />
    </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Prop } from 'vue-property-decorator';

import Loader from '@/components/Loader.vue';

// const WeatherCard = () => ({
//     component: import(
//         /* webpackPrefetch: true */ '@/components/WeatherCard.vue'
//     ) as any,
//     loading: Loader,
//     delay: 1
// });
// const DetailCard = () => ({
//     component: import(
//         /* webpackPrefetch: true */ '@/components/DetailCard.vue'
//     ) as any,
//     loading: Loader,
//     delay: 1
// });
// const ForecastDay = () => ({
//     component: import(
//         /* webpackPrefetch: true */ '@/components/ForecastDay.vue'
//     ) as any,
//     loading: Loader,
//     delay: 1
// });
// const ForecastWeek = () => ({
//     component: import(
//         /* webpackPrefetch: true */ '@/components/ForecastWeek.vue'
//     ) as any,
//     loading: Loader,
//     delay: 1
// });

// const Auth = () => ({
//     component: import(
//         /* webpackPrefetch: true */ '@/components/Auth.vue'
//     ) as any,
//     loading: Loader,
//     delay: 1
// });

import { WeatherRes } from '../types/WeatherRes';
import { getWeather, getForecast } from '../utils/weather';
import { ForecastRes } from '../types/Forecast';
import { proper, camelCase } from '../utils/helpers';
import {  Action, Getter, Mutation, State} from 'vuex-class';
import { stateFields } from '../store/state';
import {
    actionFields,
    fetchWeather,
    fetchForecast,
    updateDefaultLocation,
	GetUserAction,
	addNewPlace,
    LoginAction
} from '../store/actions';
import { getterFields, isPlace, isDefaultPlace } from '../store/getters';
import {
    mutationFields,
    addPlace,
    removePlace,
    setDefaultLocation
} from '../store/mutations';
import { User } from '../types/Other';
import WeatherCard from '@/components/WeatherCard.vue';
import DetailCard from '@/components/DetailCard.vue';
import ForecastDay from '@/components/ForecastDay.vue';
import ForecastWeek from '@/components/ForecastWeek.vue';
import Auth from '@/components/Auth.vue';

@Component({
    name: 'weather',
    components: {
        WeatherCard,
        DetailCard,
        Loader,
        ForecastDay,
        ForecastWeek,
        Auth
    }
})
export default class Weather extends Vue {
    @Prop() private msg!: String;

@State
    @State(stateFields.weather) weather?: WeatherRes;
    @State(stateFields.forecast) forecast?: ForecastRes;
    @State(stateFields.defaultPlace) defaultPlace!: string;
    @State(stateFields.user) user?: User | null;

    @Action(actionFields.fetchWeather) getWeather!: fetchWeather;
    @Action(actionFields.fetchForecast) getForecast!: fetchForecast;
    @Action(actionFields.updateDefaultLocation)
	setDefaultLocation!: updateDefaultLocation;
	@Action(actionFields.getUser) getUser!: GetUserAction;
	@Action(actionFields.addNewPlace) addPlace!: addNewPlace;

    @Getter(getterFields.isPlace) isPlace!: isPlace;
    @Getter(getterFields.isDefaultPlace) isDefaultPlace!: isDefaultPlace;

    @State(stateFields.places) places!: Array<string>;

    // @Mutation(mutationFields.addPlace) addPlace!: addPlace;
    @Mutation(mutationFields.removePlace) removePlace!: removePlace;

    readonly tabletSize = 1050;
    readonly mobileSize = 765;

    loading: boolean = true;
    size: string = 'desktop';
    location: string = '';
    date: string = 'Monday December 23';
    activeItem: string = 'weather';
    error: boolean = false;
    searchOnly: boolean = false;

    async created() {
		if (! this.user) {
			try {
				await this.getUser();
			} catch (error) {
				console.error(error);
			}
		}
        await this.initPage();
	}
	
	async initPage() {
		this.loading = true;
		this.searchOnly = false;
		if (this.$route.params.hasOwnProperty('place')) {
            this.location = this.$route.params.place;
		} else if (this.defaultPlace && this.defaultPlace != '') {
			this.$router.push('/weather/' + this.defaultPlace);
		} else if (this.places && this.places.length > 0) {
            this.location = this.places[0];
        } else {
            this.searchOnly = true;
        }

        if (window.innerWidth < this.mobileSize) {
            this.size = 'mobile';
        } else if (window.innerWidth < this.tabletSize) {
            this.size = 'tablet';
        }

        if (this.location) {
            try {
				let split = this.location.split(',');
				if (split.length === 1) {
					split.push('');
				}
				if (split.length === 2) {
					split.push('')
				}
                await this.getWeather(split[0], split[1], split[2]);
                await this.getForecast(split[0]), split[1], split[2];

                window.addEventListener('resize', this.handleResize);

                let date = new Date().toDateString().split(' ');
                this.date = date[0] + ', ' + date[1] + ' ' + date[2];

                this.loading = false;
                this.error = false;
            } catch (error) {
                console.error(error);
                this.error = true;
            }
        }
	}

    handleResize(event: Event) {
        const width = window.innerWidth;
        const element = this.$el;
        const currSize = this.size;

        if (width < this.mobileSize && currSize != 'mobile') {
            this.size = 'mobile';
        } else if (
            width < this.tabletSize &&
            width >= this.mobileSize &&
            currSize != 'tablet'
        ) {
            this.size = 'tablet';
        } else if (width > this.tabletSize && currSize != 'desktop') {
            this.size = 'desktop';
        }
    }

    beforeDestroy() {
        window.removeEventListener('resize', this.handleResize);
    }

    proper = (word: string) => {
        return camelCase(word);
    };

    setActive(item: string) {
		console.log('something')
        this.activeItem = item;
    }

    addRemove() {
        if (this.isPlace(this.location)) {
            this.removePlace(this.location);
        } else {
            this.addPlace(this.location);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/__stuff.scss';

.weather {
    width: 90vw;
    display: flex;
    flex-direction: column;
    margin: 10px auto;
    // z-index: -1;

    .heading {
        width: 100%;
        text-align: left;
        align-self: flex-start;
        display: flex;
        justify-content: space-between;

        .location-wrapper {
            .location {
                font-size: 60px;
                font-weight: bold;
            }

            .date {
                font-size: 35px;
            }
        }

        .manage {
            display: flex;
            flex-direction: column;
			align-items: flex-end;

            .button-group {
                display: flex;
				margin-bottom: 10px;

				button {
					border: none;
					background: $lightBlue;
				}

                .add-button {
                    display: flex;
					height: fit-content;
					align-items: center;
					justify-content: space-between;
					background: $lightBlue;
					border: none;

					.button-text {
						height: 100%;
					}

                    .add {
                        border: none;
                        width: 20px;
                        height: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
						margin-left: 5px;
						background-color: $lightBlue;
						

                        .add-line {
                            transition: 0.2s;
                            width: 18px;
							height: 2px;
                            background-color: black;

                            &:last-child {
                                transform: rotate(90deg) translateX(-2px);
                            }
                        }
                    }

                    .remove {
                        border: none;
                        width: 20px;
                        height: 20px;
						margin-left: 5px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
						justify-content: center;
						background-color: $lightBlue;

						&:focus {
							border: none;
						}

                        .add-line {
                            transition: 0.2s;
                            width: 18px;
                            height: 1px;
                            background-color: black;
                        }
                    }
                }
            }
        }

        &.mobile,
        &.tablet {
            .location {
                font-size: 35px;
            }

            .date {
                font-size: 25px;
            }
        }
    }

    .sub-heading {
        font-size: 35px;
        text-align: left;

        &.mobile {
            display: none;
        }
    }

    .weather-bar {
        display: flex;
        align-content: center;
        justify-content: center;
        height: 300px;
        width: 100%;

        &.desktop {
        }

        .card {
			border-bottom: none;

			&:first-child {
				margin-right: 1.5em;
			}
        }

        // .card-left {
        //     border-right: 5px solid $darkGray;
        //     border-bottom: none;
        // }

        &.tablet {
            height: 200px;
        }

        &.mobile {
            height: 320px;
            flex-direction: column;

            .card {
				// border-bottom: solid 5px $darkGray;
				// margin-bottom: 1em;
				// margin-right: 0;
				&:first-child {
					margin-right: 0;
					margin-bottom: 1em;
				
				}
            }

            .card-left {
                // border-right: none;
                height: 160px;
            }

            .card-right {
                height: 140px;
            }
        }
    }

    .activation-buttons {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        margin: 0;
        // position: fixed;
        // top: 480px;
        // left: 0px;
        width: 100%;
        // z-index: 1;

        button {
            background-color: $lightBlue;
            border: none;
            margin: 10px 0;
            font-size: 7vw;
            width: fit-content;
		}
    }
}

.auth {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	width: 100vw;
	max-width: 100vw;
	
	div {
		width: calc(100% - 32px);
	}

	.message {
		width: fit-content;
	}
}

// @media only screen and (max-width: 1600px) {
//     .weather {
//         max-width: 1025px;
//     }
// }
// @media only screen and (max-width: 1100px) {
//     .weather {
//         max-width: 760px;
//     }
// }
// @media only screen and (max-width: 800px) {
//     .weather {
//         max-width: 300px;
//     }
// }
</style>
