import { WeatherRes } from '@/types/WeatherRes';
import { ForecastRes } from '@/types/Forecast';

export interface State {
    user: any;
    places: Array<string>;
    weather?: WeatherRes;
    forecast?: ForecastRes;
}

export const state: State = {
    user: {},
    places: ['springville', 'provo', 'sundance', 'salt lake city, Ut'],
	weather: undefined,
	forecast: undefined
};

export const stateFields = {
    user: 'user',
    places: 'places',
    weather: 'weather',
    forecast: 'forecast'
};
