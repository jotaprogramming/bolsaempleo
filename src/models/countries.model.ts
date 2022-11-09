import Repository from '../helpers/repositories/countries.repository';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDestroy,
} from '../helpers/interfaces/model.interface';
import { IResult } from '../helpers/interfaces/result.interface';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';
import { countries } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';
import { DTOCountry } from '../helpers/dto/country.dto';
import countryMapper from '../helpers/mappers/country.mapper';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<DTOCountry>,
		IUpdate<number, DTOCountry>,
		IDestroy<number>
{
	async store(body: DTOCountry): Promise<IResult> {
		try {
			const dataMap: countries = countryMapper.toPersistence(body);
			const data: countries = await objectCapitalize(dataMap);
			const result: countries = await Repository.store(data);
			const dataDTO: DTOCountry = countryMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
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
			const dataDTO: Array<DTOCountry> = result.map((item) => {
				return countryMapper.toDTO(item);
			});
			return HTTPResponse(200, dataDTO);
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
			const dataDTO: DTOCountry = countryMapper.toDTO(result);
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: DTOCountry): Promise<IResult> {
		try {
			const dataMap: countries = countryMapper.toPersistence(body);
			const data: countries = await objectCapitalize(dataMap);
			const result: countries = await Repository.update(id, data);
			if (Object.keys(result).length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: DTOCountry = countryMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async destroy(id: number): Promise<IResult> {
		try {
			const result: countries = await Repository.destroy(id);
			const dataDTO: DTOCountry = countryMapper.toDTO(result);
			return HTTPResponse(204, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
