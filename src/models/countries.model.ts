import Repository from '../repositories/countries.repository';
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
import { countries } from '@prisma/client';

class CountriesModel
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<countries>,
		IUpdate<number, countries>,
		IDestroy<number>
{
	async store(body: countries): Promise<IResult> {
		try {
			// const { name }: countries = body;
			// const data: countries = {
			// 	cntr_name: name,
			// };
			const result: countries = await Repository.store(body);
			// const result: countries = {
			// 	id: storeCountry.cntr_id,
			// 	name: storeCountry.cntr_name,
			// };
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<countries> = await Repository.findAll();
			if (result.length === 0) {
				return HTTPResponse(204);
			}
			// const result: Array<countries> = getCountries.map((element) => {
			// 	return {
			// 		id: element.cntr_id,
			// 		name: element.cntr_name,
			// 	};
			// });
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findOne(id: number): Promise<IResult> {
		try {
			const result: countries | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			// const result: countries = {
			// 	id: getCountry!.cntr_id,
			// 	name: getCountry!.cntr_name,
			// };
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: countries): Promise<IResult> {
		try {
			// const { name }: countries = body;
			// const data: countries = {
			// 	cntr_name: name,
			// };
			const result: countries = await Repository.update(id, body);
			if (Object.keys(result).length === 0) {
				return HTTPResponse(204);
			}
			// const result: countries = {
			// 	id: putCountry!.cntr_id,
			// 	name: putCountry!.cntr_name,
			// };
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async destroy(id: number): Promise<IResult> {
		try {
			const result: countries = await Repository.destroy(id);
			return HTTPResponse(204, result);
		} catch (error: any) {
			return typeError(error);
		}
		/*
		try {
			return HTTPResponse(204);
		} catch (error: any) {
			return typeError(error);
		}
		*/
	}
}
export default new CountriesModel();
