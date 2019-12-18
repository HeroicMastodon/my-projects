import { WeatherRes } from '../types/WeatherRes';
import axios, {AxiosResponse} from 'axios'; 

const apId = 'a2562e8c0a361ae54423c1402545f3a1';
const units = 'imperial';
const weatherQuery = 'http://api.openweathermap.org/data/2.5/weather?q=';
const forcastQuery = 'http://api.openweathermap.org/data/2.5/forecast?q=';

function constructQuery(type: string, value: string): string {
    return type + value + ',US&units=imperial' + '&APPID=' + apId;
}

export async function getWeather(value: string): Promise<WeatherRes | undefined> {
    let query = constructQuery(weatherQuery, 'springville');
    let res = (await axios.get(query)) || null;
    let data;

    if (res != null) {
        data = new WeatherRes(res.data);
    }

    return data;
}
