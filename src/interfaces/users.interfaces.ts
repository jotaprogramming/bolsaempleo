import { users } from '@prisma/client';

export interface IDBUsers extends users {}

export interface IUser {
	username?: string;
	email?: string;
	password: string;
}
