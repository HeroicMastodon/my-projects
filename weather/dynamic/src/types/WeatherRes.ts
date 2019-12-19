export class WeatherRes {
    coordinates: Coordinates;
    weather: Weather;
    details: WeatherMain;
    sun: Sun;
    wind: Wind | undefined;
    clouds: Clouds | undefined;
    precip: Precip | null;

    constructor({
        clouds,
        coord,
        main,
        weather,
        wind,
        sys,
        rain,
        snow,
        timezone
    }: {
        clouds: any;
        coord: any;
        main: any;
        weather: any;
        wind: any;
        sys: any;
        rain: any;
            snow: any;
            timezone: any;
        }) {
        this.coordinates = {
            lattitude: coord.lat,
            longitude: coord.lon
        };

        let temp: any = weather[0];
        this.weather = temp;

        this.details = main;
        this.details.temp = Math.round(this.details.temp);
        this.details.temp_min = Math.round(this.details.temp_min);
        this.details.temp_max = Math.round(this.details.temp_max);

        this.sun = {
            rise: sys.sunrise,
            set: sys.sunset
        };

        if (typeof wind != undefined) {
            this.wind = wind;

            if (this.wind != undefined) {
                this.wind.speed = Math.round(this.wind.speed);
            }
        }

        if (typeof clouds != undefined) {
            this.clouds = clouds;
        }

        if (snow != undefined) {
            this.precip = {
                type: "snow",
                oneHour: snow["1h"],
                threeHour: snow["3h"]
            }
        }
        else if (rain != undefined) {
            this.precip = {
                type: 'rain',
                oneHour: rain['1h'],
                threeHour: rain['3h']
            };
        }
        else {
            this.precip = null;
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

export interface Precip {
    type: string;
    oneHour: number;
    threeHour: number;
}
