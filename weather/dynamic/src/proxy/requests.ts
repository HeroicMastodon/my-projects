export class LoginReq implements ServerRequest {
	username = '';
	password = '';

	constructor(username = '', password = '') {
		if (username != null) this.username = username;
		if (password != null) this.password = password;
	}

	isValid() {
		return this.username != '' && this.password != '';
	}
}

export class RegisterReq implements ServerRequest {
	username = '';
	password = '';
	realName = '';
	email = '';

	constructor(username = '', password = '', realName = '', email = '') {
		this.username = username;
		this.password = password;
		this.realName = realName;
		this.email = email;
	}

	isValid() {
		return this.username != '' && this.password != '' && this.realName != '' && this.email != '';
	}
}

export class WeatherUpdateReq implements ServerRequest {
	places: Array<string> = [];
	defaultPlace: string = '';

	public constructor(places: Array<string>, defaultPlace: string) {
		this.places = places;
		this.defaultPlace = defaultPlace;
	}

	isValid(): boolean {
		return this.places != null && this.places != undefined && this.defaultPlace != null && this.defaultPlace != undefined;
	}
}

export interface ServerRequest {
	isValid(): boolean;
}