import { WeatherRes } from '../types/WeatherRes';
import axios, { AxiosResponse } from 'axios';
import {ForecastRes, ForecastItem, Time, ForecastClouds, ForecastWind} from '@/types/Forecast';
import { ProxyError } from '@/proxy/proxyError';

const apId = 'a2562e8c0a361ae54423c1402545f3a1';
const units = 'imperial';
const weatherQuery = 'https://api.openweathermap.org/data/2.5/weather?q=';
const forcastQuery = 'https://api.openweathermap.org/data/2.5/forecast?q=';
const client = axios.create({
	baseURL: 'https://api.openweathermap.org/data/2.5/'
});

function constructQuery(type: string, city: string, state: string = 'Utah', country: string = 'US'): string {
    return type + city + ',' + state + ',' + country + '&units=imperial' + '&APPID=' + apId;
}

export async function getWeather(
	city: string,
	state: string = 'Utah',
	country: string = 'Us'
): Promise<WeatherRes> {
	console.log('get weahter was called')
	try {
		let query = constructQuery(weatherQuery, city, state, country);
		let res = (await client.get(query)) || null;
	
		if (res != null) {
			return new WeatherRes(res.data);
		}

		throw new ProxyError("Unable to retrieve weather");
	} catch (e) {
		throw new ProxyError("Unable to retrieve weather");
	}

}

export async function getForecast(
           city: string,
           state: string = 'Utah',
           country: string = 'US'
): Promise<ForecastRes> {
	console.log('get forecast was called')
	try {
		let query = constructQuery(forcastQuery, city);
		let res = (await client.get(query)) || null;
	
		if (res != null) {
			return new ForecastRes(res.data);
		}

		throw new ProxyError('Unable to retrieve forecast')
	} catch (e) {
		throw 'Unable to retrive forecast';
	}
}

export function getDayFromHourlyForecast(list: Array<ForecastItem>): ForecastItem {
    const length = list.length;
    const begin = list[0];
    const end = list[length - 1];

    let tempSum: number = 0;
    let feelsLikeSum: number = 0;
    let windSum: number = 0;
    let iconSumMap: Map<string, number> = new Map();
    let descriptionSumMap: Map<string, number> = new Map();

    let tempMin: number = begin.main.temp_min;
    let tempMax: number = 0;

    list.forEach((item) => {
        tempSum += item.main.temp;
        feelsLikeSum += item.main.feels_like;
        windSum += item.wind.speed;

        let iconMapVal = iconSumMap.get(item.weather.icon);

        if (iconMapVal != undefined) {
            iconSumMap.set(item.weather.icon, (iconMapVal + 1))
        }
        else {
            iconSumMap.set(item.weather.icon, 1);
        }

        let descrMapVal = descriptionSumMap.get(item.weather.description);

        if (descrMapVal != undefined) {
            descriptionSumMap.set(item.weather.description, descrMapVal + 1);
        }
        else {
            descriptionSumMap.set(item.weather.description, 1);
        }

        tempMin = tempMin <= item.main.temp_min ? tempMin : item.main.temp_min;
        tempMax = tempMax >= item.main.temp_max ? tempMax : item.main.temp_max;
    });

    let avgTemp = tempSum / length;
    let avgFeelsLike = feelsLikeSum / length;
    let avgWind = windSum / length;

    let majorIcon: string = '';
    let majorIconOcc: number = 0;

    iconSumMap.forEach((occurances, icon) => {
        if (occurances > majorIconOcc) {
            majorIcon = icon;
            majorIconOcc = occurances;
        }
    }); 

    majorIcon = majorIcon.substring(0, majorIcon.length - 1) + 'd';

    let majorDesc = '';
    let majorDescOcc = 0;

    descriptionSumMap.forEach((occ, desc) => {
        if (occ > majorDescOcc) {
            majorDesc = desc;
            majorDescOcc = occ;
        }
    })

    const clouds: ForecastClouds = begin.clouds;
    const time = begin.time;

    let main = begin.main;
    main.temp_max = tempMax;
    main.temp_min = tempMin;
    main.temp = avgTemp;
    main.feels_like = avgFeelsLike;
    
    let weather = begin.weather;
    weather.description = majorDesc;
    weather.icon = majorIcon;

    const wind: ForecastWind = {
        deg: begin.wind.deg,
        speed: avgWind
    }

    return {
        clouds,
        main,
        time,
        weather,
        wind
    };
}
