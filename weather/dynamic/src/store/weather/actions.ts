import { ActionTree } from 'vuex';
import { WeatherState } from './state';
import { RootState } from '../index';
import { getWeather, getForecast } from '@/utils/weather';



export const actions: ActionTree<WeatherState, RootState> = {
    async fetchWeather({ commit }, searchTerm) {
        try {
            const weather = await getWeather(searchTerm);
            commit('weatherLoaded', weather);
            console.log(weather);
        } catch (error) {
            console.error('something went wrong');
        }
    },
    async fetchForecast({ commit }, searchTerm) {
        try {
            const forecast = await getForecast(searchTerm);
            commit('forecastLoaded', forecast);
            console.log(forecast);
        } catch (error) {
            console.error('something went wrong')
        }
    }
}