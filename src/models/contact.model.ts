import Repository from '../repositories/contact.repository';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDestroy,
} from '../interfaces/model.interface';
import { IResult } from '../interfaces/result.interface';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';
import { contact } from '@prisma/client';
import verifyEmail from '../utils/email';
import numberSize from '../utils/numberSize';

class contactModel
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<contact>,
		IUpdate<number, contact>,
		IDestroy<number>
{
	async store(body: contact): Promise<IResult> {
		try {
			const email: string = body.con_email;
			const phone: number = body.con_phone;
			const telephone: number = body.con_telephone;
			const isEmail = verifyEmail(email);
			if (!isEmail) {
				return HTTPResponse(200, {
					message: '¡El valor ingresado no es un correo electrónico!',
				});
			}
			const rangePhone = numberSize(phone, 6, 6);
			if (rangePhone) {
				return HTTPResponse(200, {
					message: rangePhone,
					field: 'phone',
				});
			}
			const rangeTelephone = numberSize(telephone, 10, 10);
			if (rangeTelephone) {
				return HTTPResponse(200, {
					message: rangeTelephone,
					field: 'telephone',
				});
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
			const email: string = body.con_email;
			const isEmail = verifyEmail(email);
			if (!isEmail) {
				return HTTPResponse(200, {
					message: '¡El valor ingresado no es un correo electrónico!',
				});
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
export default new contactModel();
