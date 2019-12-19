export class WeatherRes {
    coordinates: Coordinates;
    weather: Weather;
    details: WeatherMain;
    sun: Sun;
    wind: Wind | undefined;
    clouds: Clouds | undefined;

    constructor({
        clouds,
        coord,
        main,
        weather,
        wind,
        sys
    }: {
        clouds: any;
        coord: any;
        main: any;
        weather: any;
        wind: any;
        sys: any;
    }) {
        this.coordinates = {
            lattitude: coord.lat,
            longitude: coord.lon
        };

        let temp: any = weather[0];
        this.weather = temp;

        this.details = main;
        this.details.temp = Math.round(this.details.temp);

        this.sun = {
            rise: sys.sunrise,
            set: sys.sunset
        };

        if (typeof wind != undefined) {
            this.wind = wind;
        }

        if (typeof clouds != undefined) {
            this.clouds = clouds;
        }
    }

    public getAll() {
        return this;
    }
}

export interface Coordinates {
    longitude: number;
    lattitude: number;
}

export interface Weather {
    id: number | string;
    main: string | Array<string>;
    description: string;
    icon: string;
}

export interface WeatherMain {
    temp: number;
    pressure: number;
    humidity: number;
    temp_min: number;
    temp_max: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Clouds {
    all: number;
}

export interface Sun {
    rise: number;
    set: number;
}
