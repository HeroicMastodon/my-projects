import axios, { AxiosResponse, AxiosError } from 'axios';
import { RegisterReq, LoginReq, WeatherUpdateReq } from './requests';
import { User } from '@/types/Other';
import { ErrorRes, LoginRes } from './response';
import { ProxyError } from './proxyError';
import { WeatherRes } from '@/types/WeatherRes';

const client = axios.create({
	baseURL: '/api/weather',
	responseType: 'json',
	headers: {
		'Content-Type': 'application/json'
	}
})

export class Proxy {
	static async AuthenticateUser() {
		try {
			let res = await client.get<LoginRes>('user');
			let data = res.data;
			return data;
		} catch (e) {
			this.handleError(e);
		}
	}

	static async RegisterUser(req: RegisterReq) {
		try {
			let res = await client.post<LoginRes>('register', req);
			let data = res.data;
			return data;
		} catch (e) {
			this.handleError(e);
		}
	}

	static async LoginUser(req: LoginReq) {
		try {
			let res = await client.post<LoginRes>('login', req);
			let data = res.data;
			return data;
		} catch (error) {
			this.handleError(error);
		}
	}

	static async Logout() {
		try {
			await client.delete('');
		} catch (error) {
			this.handleError(error);
		}
	}

	static async UpdateWeather(req: WeatherUpdateReq) {
		try {
			await client.post<WeatherRes>('update', req);
		} catch (error) {
			this.handleError(error)
		}
	}

	private static handleError(e: any) {
		let error: AxiosError<ErrorRes> = e;
		if (error && error.response) {
			throw new ProxyError(error.response.data.detail);
		}

		throw new ProxyError("An error occured");
	}
}