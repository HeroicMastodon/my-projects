import { WeatherRes } from '@/types/WeatherRes';
import { ForecastRes } from '@/types/Forecast';

export interface State {
    user: object | null;
	places: Array<string>;
	defaultPlace: string;
    weather: WeatherRes | Empty;
    forecast: ForecastRes | Empty;
}

export interface Empty {

}

export const state: State = {
	user: null,
	places: [/* 'springville', 'provo', 'sundance', 'salt lake city, Ut' */],
	defaultPlace: '',
	weather: {},
	forecast: {}
};

export const stateFields = {
    user: 'user',
    places: 'places',
    weather: 'weather',
	forecast: 'forecast',
	defaultPlace: 'defaultPlace'
};
