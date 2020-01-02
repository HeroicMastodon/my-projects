import { ActionTree } from 'vuex';
import { WeatherState } from './state';
import { RootState } from '../index';
import { getWeather, getForecast } from '@/utils/weather';



export const actions: ActionTree<WeatherState, RootState> = {
    async fetchWeather({ commit }, searchTerm) : Promise<void> {
        try {
            const weather = await getWeather(searchTerm);
            commit('weatherLoaded', weather);
        } catch (error) {
            throw error;
        }
    },
    async fetchForecast({ commit }, searchTerm) : Promise<void> {
        try {
            const forecast = await getForecast(searchTerm);
            commit('forecastLoaded', forecast);
        } catch (error) {
            throw error;
        }
    }
}