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

// export class Proxy {
	export async function AuthenticateUser() {
		try {
			let res = await client.get<LoginRes>('user');
			let data = res.data;
			return data;
		} catch (e) {
			handleError(e);
		}
	}

	export async function RegisterUser(req: RegisterReq) {
		try {
			let res = await client.post<LoginRes>('register', req);
			let data = res.data;
			return data;
		} catch (e) {
			handleError(e);
		}
	}

	export async function LoginUser(req: LoginReq) {
		try {
			let res = await client.post<LoginRes>('login', req);
			let data = res.data;
			return data;
		} catch (error) {
			handleError(error);
		}
	}

	export async function Logout() {
		try {
			await client.delete('');
		} catch (error) {
			handleError(error);
		}
	}

	export async function UpdateWeather(req: WeatherUpdateReq) {
		try {
			await client.post<WeatherRes>('update', req);
		} catch (error) {
			handleError(error)
		}
	}

	function handleError(e: any) {
		let error: AxiosError<ErrorRes> = e;
		if (error && error.response) {
			throw new ProxyError(error.response.data.detail);
		}

		throw new ProxyError("An error occured");
	}
// }