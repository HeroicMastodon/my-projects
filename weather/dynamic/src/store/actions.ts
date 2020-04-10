import { ActionTree } from 'vuex';
import { State } from './state';

import { getWeather, getForecast } from '@/utils/weather';
import { mutationFields } from '@/store/mutations';
import { LoginReq, RegisterReq, WeatherUpdateReq } from '@/proxy/requests';
import { User } from '@/types/Other';
import { Proxy } from '@/proxy/proxy';
import { ProxyError } from '@/proxy/proxyError';

// TODO: Make all fucntions return error strings.
function handleError(e: any): string {
    if (e instanceof ProxyError) {
        return e.message;
    }

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
            Proxy.UpdateWeather(
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
			await Proxy.UpdateWeather(new WeatherUpdateReq(places, state.defaultPlace));
			// commit(mutationFields.addPlace, place);
			return '';
		}

		return 'Must be logged in to make this request.';
	} catch (error) {
		return handleError(error);
	}
}
export interface addNewPlace {
	(place: string): void;
}

async function login({ commit }: { commit: Commit }, request: LoginReq) {
    try {
        let user = await Proxy.LoginUser(request);
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
        let user = await Proxy.RegisterUser(request);
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
        let user = await Proxy.AuthenticateUser();
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
		await Proxy.Logout();
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
};

export const actionFields = {
    fetchWeather: fetchWeather.name,
    fetchForecast: fetchForecast.name,
    updateDefaultLocation: updateDefaultLocation.name,
    login: login.name,
    register: register.name,
	getUser: getUser.name,
	logout: logout.name,
	addNewPlace: addNewPlace.name
};
