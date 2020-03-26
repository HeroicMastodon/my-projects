import { User } from '@/types/Other';

export interface LoginRes {
	user: User;
	places: Array<string>;
	defaultPlace: string;
}