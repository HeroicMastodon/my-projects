import { GetterTree } from 'vuex';
import { State } from './state';
import { WeatherRes } from '@/types/WeatherRes';

export const getters: GetterTree<State, State> = {
    isPlace(state) {
        return (another: string) => {
            const { places } = state;
            return places.includes(another);
        };
    },
    getWeather(state): WeatherRes | undefined {
        const { weather } = state;

        return weather;
    }
};

export interface isPlace {
	(another: string): boolean
}

export const getterFields = {
	isPlace: 'isPlace',
	getWeather: 'getWeather'
}