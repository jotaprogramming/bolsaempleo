import Repository from '../helpers/repositories/cities.repository';
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
import { cities } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';
import cityMapper from '../helpers/mappers/city.mapper';
import { DTOReqCity, DTOResCity } from '../helpers/dto/city.dto';
import { TCities } from '../helpers/types/cities.type';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<DTOReqCity>,
		IUpdate<number, DTOReqCity>,
		IDestroy<number>
{
	async store(body: DTOReqCity): Promise<IResult> {
		try {
			const dataMap: cities = cityMapper.toPersistence(body);
			const data: cities = await objectCapitalize(dataMap);
			const result: TCities = await Repository.store(data);
			const dataDTO: DTOResCity = cityMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<TCities> = await Repository.findAll();
			if (result.length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: Array<DTOResCity> = result.map((item) => {
				return cityMapper.toDTO(item);
			});
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findOne(id: number): Promise<IResult> {
		try {
			const result: TCities | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			const dataDTO: DTOResCity = cityMapper.toDTO(result);
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: DTOReqCity): Promise<IResult> {
		try {
			const dataMap: cities = cityMapper.toPersistence(body);
			const data: cities = await objectCapitalize(dataMap);
			const result: TCities = await Repository.update(id, data);
			if (Object.keys(result).length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: DTOResCity = cityMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async destroy(id: number): Promise<IResult> {
		try {
			const result: TCities = await Repository.destroy(id);
			const dataDTO: DTOResCity = cityMapper.toDTO(result);
			return HTTPResponse(204, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
