import Repository from '../repositories/cities.repository';
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
import { cities } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';

class citiesModel
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<cities>,
		IUpdate<number, cities>,
		IDestroy<number>
{
	async store(body: cities): Promise<IResult> {
		try {
			const data: cities = await objectCapitalize(body);
			const result: cities = await Repository.store(data);
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<cities> = await Repository.findAll();
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
			const result: cities | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: cities): Promise<IResult> {
		try {
			const data: cities = await objectCapitalize(body);
			const result: cities = await Repository.update(id, data);
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
			const result: cities = await Repository.destroy(id);
			return HTTPResponse(204, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new citiesModel();
