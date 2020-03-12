import { GetterTree } from 'vuex';
import { State } from './state';
import { WeatherRes } from '@/types/WeatherRes';

function isPlace(state: State) {
    return (another: string) => {
		const { places } = state;
		let test = places.includes(another);
		return test;
    };
}
export interface isPlace {
    (another: string): boolean;
}

function getWeather(state: State): WeatherRes | undefined {
    const weather = state.weather as WeatherRes;

    return weather;
}

function isDefaultPlace(state: State) {
	return (place: string): boolean => state.defaultPlace.toLowerCase() == place.toLowerCase();
} 
export interface isDefaultPlace {
	(place: string): boolean;
}

export const getters: GetterTree<State, State> = {
	isPlace,
	getWeather,
	isDefaultPlace
};

export const getterFields = {
    isPlace: isPlace.name,
	getWeather: getWeather.name,
	isDefaultPlace: isDefaultPlace.name
};
