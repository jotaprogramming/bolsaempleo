import Repository from '../repositories/graduates.repository';
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
import { graduates } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';
import { IGraduate } from '../interfaces/gradutes.interface';

class graduatesModel
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
			return HTTPResponse(200, result);
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
			// result.map(item => {
			// 	const data : IGraduate = {
			// 		grd_ced: item.grd_ced,
			// 		grd_fir_name: item.grd_fir_name,
			// 		grd_sec_name: item.grd_sec_name,
			// 		grd_fir_surname: item.grd_fir_surname,
			// 		grd_sec_surname: item.grd_sec_surname,
			// 		grd_email: item.grd_email,
			// 		grd_off_id: item.grd_off_id,
			// 		grd_cty_id: item.grd_cty_id,
			// 		grd_created_at: item.grd_created_at,
			// 		grd_updated_at: item.grd_updated_at,
			// 		grd_deleted_at: item.grd_deleted_at,
			// 	}
			// })
			return HTTPResponse(200, result);
		} catch (error: any) {
			console.log(
				'🚀 ~ file: graduates.model.ts ~ line 45 ~ findAll ~ error',
				error
			);
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
export default new graduatesModel();
