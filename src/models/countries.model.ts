import Repository from '../repositories/countries.respository';
import { ICountry, IDBCountry } from '../interfaces/country.interfaces';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDestroy,
} from '../interfaces/model.interface';
import { IResult } from '../interfaces/model.interfaces';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';

class CountriesModel
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<ICountry>,
		IUpdate<number, ICountry>,
		IDestroy<number>
{
	async store(body: ICountry): Promise<IResult> {
		try {
			const { name }: ICountry = body;
			const data: IDBCountry = {
				cntr_name: name,
			};
			const storeCountry: IDBCountry = await Repository.store(data);
			const result: ICountry = {
				id: storeCountry.cntr_id,
				name: storeCountry.cntr_name,
			};
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const getCountries: Array<IDBCountry> = await Repository.findAll();
			if (getCountries.length === 0) {
				return HTTPResponse(204);
			}
			const result: Array<ICountry> = getCountries.map((element) => {
				return {
					id: element.cntr_id,
					name: element.cntr_name,
				};
			});
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findOne(id: number): Promise<IResult> {
		try {
			const getCountry: IDBCountry | null = await Repository.findOne(id);
			if (!getCountry) {
				return HTTPResponse(204);
			}
			const result: ICountry = {
				id: getCountry!.cntr_id,
				name: getCountry!.cntr_name,
			};
			return HTTPResponse(200, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: ICountry): Promise<IResult> {
		try {
			const { name }: ICountry = body;
			const data: IDBCountry = {
				cntr_name: name,
			};
			const putCountry: IDBCountry = await Repository.update(id, data);
			if (Object.keys(putCountry).length === 0) {
				return HTTPResponse(204);
			}
			const result: ICountry = {
				id: putCountry!.cntr_id,
				name: putCountry!.cntr_name,
			};
			return HTTPResponse(201, result);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async destroy(id: number): Promise<IResult> {
		try {
			const destroyCountry: IDBCountry = await Repository.destroy(id);
			return HTTPResponse(204);
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
