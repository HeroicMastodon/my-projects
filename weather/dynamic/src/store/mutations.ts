import { MutationTree } from 'vuex';
import { State } from './state';
import { WeatherRes } from '@/types/WeatherRes';
import { ForecastRes } from '@/types/Forecast';
import { User } from '@/types/Other';

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
	state.defaultPlace = user.defaultPlace;
	state.places = user.places;
} export interface setUser {
	(user: User): void;
}

export const mutations: MutationTree<State> = {
    weatherLoaded,
    forecastLoaded,
    addPlace,
    removePlace,
	setDefaultLocation,
	setUser
};

export const mutationFields = {
    weatherLoaded: weatherLoaded.name,
    forecastLoaded: forecastLoaded.name,
    addPlace: addPlace.name,
    removePlace: removePlace.name,
	setDefaultLocation: setDefaultLocation.name,
	setUser: setUser.name
};
