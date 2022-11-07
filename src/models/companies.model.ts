import Repository from '../helpers/repositories/companies.repository';
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
import { companies } from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';
import { DTOCompany } from '../helpers/dto/company.dto';
import companyMapper from '../helpers/mappers/company.mapper';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IUpdate<number, DTOCompany>,
		IDelete<number>
{
	async findAll(): Promise<IResult> {
		try {
			const result: Array<companies> = await Repository.findAll();
			if (result.length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: Array<DTOCompany> = result.map((item) => {
				return companyMapper.toDTO(item);
			});
			return HTTPResponse(200, dataDTO);
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
			const dataDTO: DTOCompany = companyMapper.toDTO(result);
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: DTOCompany): Promise<IResult> {
		try {
			const data: companies = await objectCapitalize(body);
			const result: companies = await Repository.update(id, data);
			if (Object.keys(result).length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: DTOCompany = companyMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async delete(id: number): Promise<IResult> {
		try {
			const result: companies = await Repository.delete(id);
			const dataDTO: DTOCompany = companyMapper.toDTO(result);
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
