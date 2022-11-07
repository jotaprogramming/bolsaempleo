import Repository from '../helpers/repositories/districts.repository';
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
import { district } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';
import { TDistrict } from '../helpers/types/district.type';
import { DTOReqDistrict, DTOResDistrict } from '../helpers/dto/district.dto';
import districtMapper from '../helpers/mappers/district.mapper';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<DTOReqDistrict>,
		IUpdate<number, DTOReqDistrict>,
		IDestroy<number>
{
	async store(body: DTOReqDistrict): Promise<IResult> {
		try {
			const dataMap: district = districtMapper.toPersistence(body);
			const data: district = await objectCapitalize(dataMap);
			const result: TDistrict = await Repository.store(data);
			const dataDTO: DTOResDistrict = districtMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<TDistrict> = await Repository.findAll();
			if (result.length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: Array<DTOResDistrict> = result.map((item) => {
				return districtMapper.toDTO(item);
			});
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findOne(id: number): Promise<IResult> {
		try {
			const result: TDistrict | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			const dataDTO: DTOResDistrict = districtMapper.toDTO(result);
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: DTOReqDistrict): Promise<IResult> {
		try {
			const dataMap: district = districtMapper.toPersistence(body);
			const data: district = await objectCapitalize(dataMap);
			const result: TDistrict = await Repository.update(id, data);
			if (Object.keys(result).length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: DTOResDistrict = districtMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async destroy(id: number): Promise<IResult> {
		try {
			const result: TDistrict = await Repository.destroy(id);
			const dataDTO: DTOResDistrict = districtMapper.toDTO(result);
			return HTTPResponse(204, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
