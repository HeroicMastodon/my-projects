import { MutationTree } from 'vuex';
import { State } from './state';
import { WeatherRes } from '@/types/WeatherRes';
import { ForecastRes } from '@/types/Forecast';
import { User } from '@/types/Other';
import { LoginRes } from '@/proxy/response';

function handleError(e: any) {
	
}

function weatherLoaded(state: State, weather: WeatherRes) {
    state.weather = weather;
}

export interface weatherLoaded {
    (weather: WeatherRes): void;
}

function forecastLoaded(state: State, forecast: ForecastRes) {
    state.forecast = forecast;
}

export interface forecastLoaded {
    (forecast: ForecastRes): void;
}

function addPlace(state: State, place: string) {
    state.places.push(place);
}

export interface addPlace {
    (place: string): void;
}

function removePlace(state: State, place: string) {
    state.places.splice(state.places.indexOf(place), 1);
}

export interface removePlace {
    (place: string): void;
}

function setDefaultLocation(state: State, place: string) {
	let places = state.places;
	if (!places.includes(place)) places.push(place);
    state.defaultPlace = place;
}

export interface setDefaultLocation {
    (place: string): void;
}

function setUser(state: State, user: User) {
	state.user = user;
} export interface setUser {
	(user: User): void;
}

function init(state: State, data: LoginRes) {
	state.user = data.user;
	state.defaultPlace = data.defaultPlace;
	state.places = data.places;
} export interface init {
	(data: LoginRes): void;
}

function resetState(state: State) {
	state.user = null;
	state.defaultPlace = '';
	state.places = [];
}
export interface resetState {
	(): void;
}

export const mutations: MutationTree<State> = {
    weatherLoaded,
    forecastLoaded,
    addPlace,
    removePlace,
	setDefaultLocation,
	setUser,
	init,
	resetState,
};

export const mutationFields = {
    weatherLoaded: 'weatherLoaded',
    forecastLoaded: 'forecastLoaded',
    addPlace: 'addPlace',
    removePlace: 'removePlace',
	setDefaultLocation: 'setDefaultLocation',
	setUser: 'setUser',
	init: 'init',
	resetState: 'resetState',
};
