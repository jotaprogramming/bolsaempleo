import { users } from '@prisma/client';

export interface IDBUsers extends users {}

export interface IUser {
	usr_id?: number;
	username: string;
	password: string;
	about_me?: string;
	usr_rol_id: number;
	usr_created_at?: Date;
	usr_updated_at?: Date;
	usr_deleted_at?: Date;
}

export interface IUser {
	username: string;
	password: string;
}
