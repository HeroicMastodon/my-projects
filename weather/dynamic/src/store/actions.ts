import { ActionTree } from 'vuex';
import { State } from './state';

import { getWeather, getForecast } from '@/utils/weather';
import { mutationFields } from '@/store/mutations';
import { LoginReq, RegisterReq } from '@/proxy/requests';
import { User } from '@/types/Other';
import { Proxy } from '@/proxy/proxy';

// TODO: Make all fucntions return error strings.

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
	(location: string): Promise<void>;
}

async function login({ commit }: any, request: LoginReq) {
	try {
		let user = await Proxy.LoginUser(request);
		commit(mutationFields.setUser, user);
	} catch (error) {
		throw error;
	}
} export interface LoginAction {
	(request: LoginReq): Promise<void>;
}

async function register({ commit }: any, request: RegisterReq): Promise<String> {
	try {
		let user = await Proxy.RegisterUser(request);
		commit(mutationFields.setUser, user);
		return '';
	} catch (error) {
		throw error;
	}
} export interface RegisterAction {
	(request: RegisterReq): Promise<String>;
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
