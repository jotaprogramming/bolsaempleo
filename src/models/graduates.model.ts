import Repository from '../helpers/repositories/graduates.repository';
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
import { graduates } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<graduates>,
		IUpdate<number, graduates>,
		IDelete<number>
{
	async refactor(body: graduates): Promise<graduates> {
		const data: graduates = await objectCapitalize(body);
		data['grd_email'] = body.grd_email;
		return data;
	}
	async store(body: graduates): Promise<IResult> {
		try {
			const data: graduates = await this.refactor(body);
			const result: graduates = await Repository.store(data);
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<graduates> = await Repository.findAll();
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
			const result: graduates | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: graduates): Promise<IResult> {
		try {
			const data: graduates = await this.refactor(body);
			const result: graduates = await Repository.update(id, data);
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
			const result: graduates = await Repository.delete(id);
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
