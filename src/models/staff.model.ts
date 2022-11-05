import Repository from '../repositories/staff.repository';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDelete,
} from '../interfaces/model.interface';
import { IResult } from '../interfaces/result.interface';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';
import { staff } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';
import verifyEmail from '../utils/email';
import numberSize from '../utils/numberSize';

class staffModel
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<staff>,
		IUpdate<number, staff>,
		IDelete<number>
{
	async refactor(body: staff): Promise<staff | IResult> {
		const data: staff = body;
		const names = await objectCapitalize({
			stf_name: body.stf_name,
			stf_lastname: body.stf_lastname,
		});
		const isEmail = verifyEmail(data.stf_email);
		if (!isEmail) {
			return HTTPResponse(200, {
				message: '¡El valor ingresado no es un correo electrónico!',
			});
		}
		const rangePhone = numberSize(data.stf_telephone, 6, 10);
		if (rangePhone) {
			return HTTPResponse(200, {
				message: rangePhone,
				field: 'telephone',
			});
		}
		data['stf_name'] = names.stf_name;
		data['stf_lastname'] = names.stf_lastname;
		return data;
	}
	async store(body: staff): Promise<IResult> {
		try {
			const data: staff | IResult = await this.refactor(body);
			if ('status' in data) {
				return data;
			}
			const result: staff = await Repository.store(data);
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<staff> = await Repository.findAll();
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
			const result: staff | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: staff): Promise<IResult> {
		try {
			const data: staff | IResult = await this.refactor(body);
			if ('status' in data) {
				return data;
			}
			const result: staff = await Repository.update(id, data);
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
			const result: staff = await Repository.delete(id);
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new staffModel();
