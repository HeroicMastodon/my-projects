import { Module } from 'vuex';
import { WeatherState } from './state';
import { RootState } from '../index';
import { actions } from './actions';
import { mutations } from './mutations';
import { getters } from './getters';

export const state: WeatherState = {
    weather: undefined,
    forecast: undefined
}

export const namespace: string = 'weather';

export const weather: Module<WeatherState, RootState> = {
    namespaced: true,
    state,
    actions,
    mutations,
    getters
}