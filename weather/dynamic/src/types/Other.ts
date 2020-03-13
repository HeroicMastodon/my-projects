export interface Namespace {
	namespace: string;
}

export class User {
	username = '';
	places: Array<string> = [];
	defaultPlace = '';
	settings = {};

	constructor(username = '', places: Array<string> = [], settings = {}, defaultPlace = '') {
		this.username = username;
		this.places = places;
		this.settings = settings;
		this.defaultPlace = defaultPlace;
	}
}