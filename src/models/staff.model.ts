import Repository from '../helpers/repositories/staff.repository';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDelete,
} from '../helpers/interfaces/model.interface';
import { IMessage, IResult } from '../helpers/interfaces/result.interface';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';
import { staff } from '@prisma/client';
import { validateStaff } from '../utils/validate';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<staff>,
		IUpdate<number, staff>,
		IDelete<number>
{
	async store(body: staff): Promise<IResult> {
		try {
			const data: staff | IMessage = await validateStaff(body);
			if ('message' in data) {
				return HTTPResponse(200, data);
			}
			const result: staff = await Repository.store(data);
			return HTTPResponse(201, result);
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
			const data: staff | IMessage = await validateStaff(body);
			if ('message' in data) {
				return HTTPResponse(200, data);
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
export default new Model();
