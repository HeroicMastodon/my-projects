import { MutationTree } from 'vuex';
import { State } from './state';
import { WeatherRes } from '@/types/WeatherRes';
import { ForecastRes } from '@/types/Forecast';

export const mutations: MutationTree<State> = {
    weatherLoaded(state, weather: WeatherRes) {
        state.weather = weather;
    },
    forecastLoaded(state, forecast: ForecastRes) {
        state.forecast = forecast;
    },
    addPlace(state, place: string) {
        state.places.push(place);
    },
    removePlace(state, place: string) {
        state.places.splice(state.places.indexOf(place), 1);
    }
};

export const mutationFields = {
	weatherLoaded: 'weatherLoaded',
	forecastLoaded: 'forecastLoaded',
	addPlace: 'addPlace',
	removePlace: 'removePlace'
}


export interface addPlace {
    (place: string): void;
}

export interface removePlace {
	(place: string): void
}

export interface forecastLoaded {
	(forecast: ForecastRes): void;
}

export interface weatherLoaded {
	(weather: WeatherRes): void;
}
