import { ActionTree } from 'vuex';
import { State } from './state';

import { getWeather, getForecast } from '@/utils/weather';
import { mutationFields } from '@/store/mutations';
import { LoginReq, RegisterReq } from '@/proxy/requests';
import { User } from '@/types/Other';
import { Proxy } from '@/proxy/proxy';

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

async function login({ commit }: any, request: LoginReq) {
	try {
		let user = new User(request.username, ['springville'], {}, 'springville');
		commit(mutationFields.setUser, user);
	} catch (error) {
		throw error;
	}
} export interface LoginAction {
	(request: LoginReq): Promise<any>;
}

async function register({ commit }: any, request: RegisterReq) {
	try {
		await Proxy.RegisterUser(request);
		let user = new User(request.username, [], {}, '');
		commit(mutationFields.setUser, user);
	} catch (error) {
		throw error;
	}
} export interface RegisterAction {
	(request: RegisterReq): Promise<any>;
}

export const actions: ActionTree<State, State> = {
    fetchWeather,
	fetchForecast,
	updateDefaultLocation,
	login,
	register
};

export const actionFields = {
    fetchWeather: fetchWeather.name,
	fetchForecast: fetchForecast.name,
	updateDefaultLocation: updateDefaultLocation.name,
	login: login.name,
	register: register.name
};
