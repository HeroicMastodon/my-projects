"use strict";
exports.__esModule = true;
var WeatherRes = /** @class */ (function () {
    function WeatherRes(_a) {
        var clouds = _a.clouds, coord = _a.coord, main = _a.main, weather = _a.weather, wind = _a.wind, sys = _a.sys;
        this.coordinates = {
            lattitude: coord.lat,
            longitude: coord.lon
        };
        var temp = weather[0];
        this.weather = temp;
        this.details = main;
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
    WeatherRes.prototype.getAll = function () {
        return this;
    };
    return WeatherRes;
}());
exports.WeatherRes = WeatherRes;
