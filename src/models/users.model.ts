import Repository from '../helpers/repositories/users.repository';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDelete,
} from '../helpers/interfaces/model.interface';
import { IResult } from '../helpers/interfaces/result.interface';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';
import bcrypt from 'bcrypt';
import verifyEmail from '../utils/email';
import { users } from '@prisma/client';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<users>,
		IUpdate<number, users>,
		IDelete<number>
{
	async store(body: users): Promise<IResult> {
		try {
			const email: string = body.email;
			const isEmail = verifyEmail(email);
			if (!isEmail) {
				return HTTPResponse(200, {
					message: '¡El valor ingresado no es un correo electrónico!',
				});
			}
			const result: users = await Repository.store(body);
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async match(username: string, password: string) {
		try {
			let user: users | null = null;
			let result: users | null = null;
			const isEmail = verifyEmail(username);
			if (isEmail) {
				user = await Repository.matchEmail(username);
			} else {
				user = await Repository.matchUsername(username);
			}
			if (user) {
				const pass: boolean = await bcrypt.compare(
					password,
					user.password
				);
				if (pass) {
					result = user;
				}
			}
			if (!result) {
				return HTTPResponse(200, {
					message:
						'Credenciales incorrectas. Vuelve a intentarlo o selecciona "¿He olvidado mi usuario o contraseña?" para cambiarla.',
				});
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<users> = await Repository.findAll();
			if (result.length === 0) {
				return HTTPResponse(204);
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findOne(id: number): Promise<IResult> {
		try {
			const result: users | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: users): Promise<IResult> {
		try {
			const email: string = body.email;
			const isEmail = verifyEmail(email);
			if (!isEmail) {
				return HTTPResponse(200, {
					message: '¡El valor ingresado no es un correo electrónico!',
				});
			}
			const result: users = await Repository.update(id, body);
			if (Object.keys(result).length === 0) {
				return HTTPResponse(204);
			}
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async delete(id: number): Promise<IResult> {
		try {
			const result: users = await Repository.delete(id);
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
