import { ActionTree } from 'vuex';
import { State } from './state';

import { getWeather, getForecast } from '@/utils/weather';

export const actions: ActionTree<State, State> = {
    async fetchWeather({ commit }, searchTerm): Promise<void> {
        try {
            const weather = await getWeather(searchTerm);
            commit('weatherLoaded', weather);
        } catch (error) {
            throw error;
        }
    },
    async fetchForecast({ commit }, searchTerm): Promise<void> {
        try {
            const forecast = await getForecast(searchTerm);
            commit('forecastLoaded', forecast);
        } catch (error) {
            throw error;
        }
    }
};

export interface fetchWeather {
    (searchTerm: string): void;
}

export interface fetchForecast {
    (searchTerm: string): void;
}

export const actionFields = {
    fetchWeather: 'fetchWeather',
    fetchForecast: 'fetchForecast'
};
