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

const storage = window.localStorage;

async function handleAuthToken(res: AxiosResponse<LoginRes>) {
    if (! res.headers || ! res.headers['authorization']) return;
    const token = (res.headers['authorization'].split(' ')[1]);
    storage.setItem('token', token);
}

// export class Proxy {
	export async function AuthenticateUser() {
		try {
            const token = storage.getItem('token');
            console.log(token);
            let res = await client.get<LoginRes>('user', {
                headers: {
                    Authorization: token != null ? `Bearer ${token}` : undefined
                }
            });
			let data = res.data;
			return data;
		} catch (e) {
			handleError(e);
		}
	}

	export async function RegisterUser(req: RegisterReq) {
		try {
            let res = await client.post<LoginRes>('register', req);
            await handleAuthToken(res);
			let data = res.data;
			return data;
		} catch (e) {
			handleError(e);
		}
	}

	export async function LoginUser(req: LoginReq) {
		try {
            let res = await client.post<LoginRes>('login', req);
            await handleAuthToken(res);
			let data = res.data;
			return data;
		} catch (error) {
			handleError(error);
		}
	}

	export async function Logout() {
		try {
            await client.delete('');
            storage.clear();
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