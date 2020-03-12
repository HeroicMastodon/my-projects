import { ActionTree } from 'vuex';
import { State } from './state';

import { getWeather, getForecast } from '@/utils/weather';
import { mutationFields } from '@/store/mutations';

async function fetchWeather(
    { commit }: any,
    searchTerm: string
): Promise<void> {
    try {
        const weather = await getWeather(searchTerm);
        commit(mutationFields.weatherLoaded, weather);
    } catch (error) {
        throw error;
    }
}

export interface fetchWeather {
    (searchTerm: string): void;
}

async function fetchForecast(
    { commit }: any,
    searchTerm: string
): Promise<void> {
    try {
        const forecast = await getForecast(searchTerm);
        commit(mutationFields.forecastLoaded, forecast);
    } catch (error) {
        throw error;
    }
}
export interface fetchForecast {
    (searchTerm: string): void;
}

async function updateDefaultLocation({ commit }: any, location: string) {
	try {
		commit(mutationFields.setDefaultLocation, location);
	} catch (error) {
		throw error;
	}
}
export interface updateDefaultLocation {
	(location: string): Promise<any>;
}

export const actions: ActionTree<State, State> = {
    fetchWeather,
	fetchForecast,
	updateDefaultLocation
};

export const actionFields = {
    fetchWeather: fetchWeather.name,
	fetchForecast: fetchForecast.name,
	updateDefaultLocation: updateDefaultLocation.name
};
