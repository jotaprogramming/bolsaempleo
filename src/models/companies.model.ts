import Repository from '../repositories/companies.repository';
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
import { companies } from '@prisma/client';

class companiesModel
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<companies>,
		IUpdate<number, companies>,
		IDelete<number>
{
	async store(body: companies): Promise<IResult> {
		try {
			const result: companies = await Repository.store(body);
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<companies> = await Repository.findAll();
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
			const result: companies | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: companies): Promise<IResult> {
		try {
			const result: companies = await Repository.update(id, body);
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
			const result: companies = await Repository.delete(id);
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new companiesModel();