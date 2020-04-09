export interface Namespace {
	namespace: string;
}

export interface User {
	username: string;
	email: string;
	realName: string;
	places: Array<string>;
	defaultPlace: string;
}