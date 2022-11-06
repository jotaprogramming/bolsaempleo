import Repository from '../repositories/contact.repository';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDestroy,
} from '../helpers/interfaces/model.interface';
import { IResult } from '../helpers/interfaces/result.interface';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';
import { contact } from '@prisma/client';
import verifyEmail from '../utils/email';
import numberSize from '../utils/numberSize';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<contact>,
		IUpdate<number, contact>,
		IDestroy<number>
{
	async refactor(body: contact): Promise<contact | {}> {
		const email: string = body.con_email;
		const phone: number = body.con_phone;
		const telephone: string = body.con_telephone;
		const isEmail = verifyEmail(email);
		if (!isEmail) {
			return {
				message: '¡El valor ingresado no es un correo electrónico!',
				field: 'con_email',
			};
		}
		const rangePhone = numberSize(phone, 7, 7);
		if (rangePhone) {
			return {
				message: rangePhone,
				field: 'con_phone',
			};
		}
		const rangeTelephone = numberSize(telephone, 10, 10);
		if (rangeTelephone) {
			return {
				message: rangeTelephone,
				field: 'con_telephone',
			};
		}
		return body;
	}
	async store(body: contact): Promise<IResult> {
		try {
			const data = await this.refactor(body);
			if ('message' in data) {
				return HTTPResponse(200, data);
			}
			const result: contact = await Repository.store(body);
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<contact> = await Repository.findAll();
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
			const result: contact | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: contact): Promise<IResult> {
		try {
			const data = await this.refactor(body);
			if ('message' in data) {
				return HTTPResponse(200, data);
			}
			const result: contact = await Repository.update(id, body);
			if (Object.keys(result).length === 0) {
				return HTTPResponse(204);
			}
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async destroy(id: number): Promise<IResult> {
		try {
			const result: contact = await Repository.destroy(id);
			return HTTPResponse(204, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
