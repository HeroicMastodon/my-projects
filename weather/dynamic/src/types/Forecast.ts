export class ForecastRes {
    list!: Array<ForecastItem>;
    readonly dayMap = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thur',
        'Fri',
        'Sat'
    ]

    constructor({ list } : {list: Array<any>}) {
        if (list) {
            this.list = new Array<ForecastItem>();
        }

        list.forEach((item) => {
            let date: Date | Time = new Date(item.dt * 1000);

            date = {
                dateTime: date,
                day: this.dayMap[date.getDay()],
                date: date.getDate(),
                time: extractTime(date)
            } as Time;

            let newItem = {
                time: date,
                clouds: item.clouds,
                main: item.main,
                weather: item.weather[0],
                wind: item.wind
            } as ForecastItem;

            this.list.push(newItem);
        });

    }
}

export interface ForecastRes {
    list: Array<ForecastItem>
}

export function extractTime(date: Date) {
    let hour: number | string = date.getHours();
    let frame: string = '';

    if (hour < 12) {
        hour = hour == 0 ? '12' : hour.toString();
        frame = 'am';
    }
    else {
        hour = (hour - 12).toString();
        frame = 'pm';
    }

    return hour + frame;
}


export interface ForecastItem {
    time: Time;
    main: ForecastMain;
    weather: ForecastWeather;
    clouds: ForecastClouds;
    wind: ForecastWind;
}

export interface Time {
    dateTime: Date;
    day: string;
    date: number;
    time: string;
}

export interface ForecastMain {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
}

export interface ForecastWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface ForecastClouds {
    all: number;
}

export interface ForecastWind {
    speed: number;
    deg: number;
}