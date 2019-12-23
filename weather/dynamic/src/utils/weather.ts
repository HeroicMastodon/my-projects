import { WeatherRes } from '../types/WeatherRes';
import axios, { AxiosResponse } from 'axios';
import {ForecastRes, ForecastItem, Time, ForecastClouds, ForecastWind} from '@/types/Forecast';

const apId = 'a2562e8c0a361ae54423c1402545f3a1';
const units = 'imperial';
const weatherQuery = 'http://api.openweathermap.org/data/2.5/weather?q=';
const forcastQuery = 'http://api.openweathermap.org/data/2.5/forecast?q=';

function constructQuery(type: string, value: string): string {
    return type + value + ',US&units=imperial' + '&APPID=' + apId;
}

export async function getWeather(
    value: string
): Promise<WeatherRes> {
    let query = constructQuery(weatherQuery, value);
    let res = (await axios.get(query)) || null;

    if (res != null) {
        return new WeatherRes(res.data);
    }

    throw "request failed";
}

export async function getForecast(value: string) : Promise<ForecastRes | undefined> {
    let query = constructQuery(forcastQuery, value);
    let res = await axios.get(query) || null;

    if (res != null) {
        return new ForecastRes(res.data);
    }

    throw "request failed";
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
