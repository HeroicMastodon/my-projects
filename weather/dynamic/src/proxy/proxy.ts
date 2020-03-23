import axios, { AxiosResponse } from 'axios';
import { RegisterReq, LoginReq } from './requests';
import { User } from '@/types/Other';

export class Proxy {
	static readonly URL_BASE: string = 'http://localhost:5000/';

	static async AuthenticateUser(token:string) {
		let res = await axios.get<any, AxiosResponse<User>>(this.URL_BASE + 'user');
		let data = res.data;
		console.log(data);
	}

	static async RegisterUser(req: RegisterReq) {
		let res = await axios.post<any, AxiosResponse<User>>(this.URL_BASE + 'user', req);
		console.log(res.data);
	}

	async LoginUser(req: LoginReq) {

	}
}