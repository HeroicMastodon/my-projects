import axios, { AxiosResponse, AxiosError } from 'axios';
import { RegisterReq, LoginReq } from './requests';
import { User } from '@/types/Other';
import { ErrorRes } from './response';
import { ProxyError } from './proxyError';

const client = axios.create({
	baseURL: '/api/weather',
	responseType: 'json',
	headers: {
		'Content-Type': 'application/json'
	}
})

export class Proxy {
	static async AuthenticateUser(token:string) {
		try {let res = await client.get<User>('weather');
			let data = res.data;
			console.log(data);
			return data;
		} catch (e) {
			this.handleError(e);
		}
	}

	static async RegisterUser(req: RegisterReq) {
		try {
			let res = await client.post<User>('register', req);
			console.log(res.data);
			let data = res.data;
			return data;
		} catch (e) {
			this.handleError(e);
		}
	}

	static async LoginUser(req: LoginReq) {
		try {
			let res = await client.post<User>('login', req);
			console.log(res.data);
			let data = res.data;
			return data;
		} catch (error) {
			this.handleError(error);
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