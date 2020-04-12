import { ActionTree } from 'vuex';
import { State } from './state';

import { getWeather, getForecast } from '@/utils/weather';
import { mutationFields } from '@/store/mutations';
import { LoginReq, RegisterReq, WeatherUpdateReq } from '@/proxy/requests';
import { User } from '@/types/Other';
import { UpdateWeather, LoginUser, RegisterUser, AuthenticateUser, Logout } from '@/proxy/proxy';
import { ProxyError } from '@/proxy/proxyError';

function handleError(e: any): string {
    if (e instanceof ProxyError) {
        return e.message;
    }
	console.error(e);
    return 'Something went wrong.';
}

interface Commit {
    (mutationField: string, payload?: any): any;
}

async function fetchWeather(
    { commit }: any,
	city: string,
	state?: string,
	country?: string
): Promise<string> {
    try {
        const weather = await getWeather(city, state, country);
        commit(mutationFields.weatherLoaded, weather);
        return '';
    } catch (error) {
        return handleError(error);
    }
}
export interface fetchWeather {
    (city: string, state?: string, country?: string): Promise<string>;
}

async function fetchForecast(
    { commit }: any,
	city: string,
	state?: string,
	country?: string
): Promise<string> {
    try {
        const forecast = await getForecast(city, state, country);
        commit(mutationFields.forecastLoaded, forecast);
        return '';
    } catch (error) {
        return handleError(error);
    }
}
export interface fetchForecast {
    (city: string, state?: string, country?: string): Promise<string>;
}

async function updateDefaultLocation(
    { commit, state }: { commit: Commit; state: State },
    location: string
): Promise<string> {
    try {
        if (state.user) {
            await UpdateWeather(
                new WeatherUpdateReq(state.places, location)
            );
            commit(mutationFields.setDefaultLocation, location);
            return '';
        }
        let error = 'Must be logged in to make this request.';
        console.error(error);
        return error;
    } catch (error) {
        return handleError(error);
    }
}
export interface updateDefaultLocation {
    (location: string): Promise<void>;
}

async function addNewPlace({ commit, state }: { commit: Commit, state: State }, place: string) {
	try {
		if (state.user) {
			let places = state.places;
			places.push(place);
			await UpdateWeather(new WeatherUpdateReq(places, state.defaultPlace));
			// commit(mutationFields.addPlace, place);
			return '';
		}

		return 'Must be logged in to make this request.';
	} catch (error) {
		return handleError(error);
	}
}
export interface addNewPlace {
	(place: string): string;
}

async function removeOldPlace({ commit, state }: { commit: Commit, state: State }, place: string) {
	try {
		if (state.user) {
			if (state.defaultPlace == place) {
				state.defaultPlace = '';
			}

			state.places.splice(state.places.indexOf(place), 1);

			await UpdateWeather(new WeatherUpdateReq(state.places, state.defaultPlace));

			return '';
		}
	} catch (error) {
		return handleError(error);
	}
}
export interface removeOldPlace {
	(place: string): string;
}

async function login({ commit }: { commit: Commit }, request: LoginReq) {
    try {
		let user = await LoginUser(request);
		console.log(user);
        commit(mutationFields.init, user);
        return '';
    } catch (error) {
        return handleError(error);
    }
}
export interface LoginAction {
    (request: LoginReq): Promise<string>;
}

async function register(
    { commit }: any,
    request: RegisterReq
): Promise<String> {
	try {
		console.log('hello')
        let user = await RegisterUser(request);
        commit(mutationFields.init, user);
        return '';
    } catch (error) {
        return handleError(error);
    }
}
export interface RegisterAction {
    (request: RegisterReq): Promise<string>;
}

async function getUser({ commit }: { commit: Commit }) {
    try {
        let user = await AuthenticateUser();
        commit(mutationFields.init, user);
        return '';
    } catch (error) {
        return handleError(error);
    }
}
export interface GetUserAction {
    (): Promise<string>;
}

async function logout({ commit }: { commit: Commit }) {
	try {
		await Logout();
		commit(mutationFields.resetState);
	} catch (error) {
		return handleError(error);
	}
}
export interface LogoutAction {
	(): Promise<string>;
}

export const actions: ActionTree<State, State> = {
    fetchWeather,
    fetchForecast,
    updateDefaultLocation,
    login,
    register,
	getUser,
	logout,
	addNewPlace,
	removeOldPlace
};

export const actionFields = {
    fetchWeather: 'fetchWeather',
    fetchForecast: 'fetchForecast',
    updateDefaultLocation: 'updateDefaultLocation',
    login: 'login',
    register: 'register',
	getUser: 'getUser',
	logout: 'logout',
	addNewPlace: 'addNewPlace',
	removeOldPlace: 'removeOldPlace'
};
