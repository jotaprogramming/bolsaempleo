import Repository from '../repositories/districts.repository';
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
import { district } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';

class districtModel
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<district>,
		IUpdate<number, district>,
		IDestroy<number>
{
	async store(body: district): Promise<IResult> {
		try {
			const data: district = await objectCapitalize(body);
			const result: district = await Repository.store(data);
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<district> = await Repository.findAll();
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
			const result: district | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: district): Promise<IResult> {
		try {
			const data: district = await objectCapitalize(body);
			const result: district = await Repository.update(id, body);
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
			const result: district = await Repository.destroy(id);
			return HTTPResponse(204, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new districtModel();
