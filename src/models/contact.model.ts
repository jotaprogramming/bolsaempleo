import Repository from '../helpers/repositories/contact.repository';
import {
	IFindAll,
	IFindOne,
	IStore,
	IUpdate,
	IDestroy,
} from '../helpers/interfaces/model.interface';
import { IResult, IMessage } from '../helpers/interfaces/result.interface';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';
import { contact, companies } from '@prisma/client';
import verifyEmail from '../utils/email';
import numberSize from '../utils/numberSize';
import { IContactDTO } from '../helpers/interfaces/contact.interface';
import { validateContact } from '../utils/validate';
import contactMapper from '../helpers/mappers/contact.mapper';

class Model
	implements
		IFindAll<IResult>,
		IFindOne<number>,
		IStore<IContactDTO>,
		IUpdate<number, IContactDTO>,
		IDestroy<number>
{
	async store(body: IContactDTO): Promise<IResult> {
		try {
			const dataMap: contact = contactMapper.toPersistence(body);
			const data: contact | IMessage = await validateContact(dataMap);
			if ('message' in data) {
				return HTTPResponse(200, data);
			}
			const result: contact = await Repository.store(data);
			const dataDTO: IContactDTO = contactMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findAll(): Promise<IResult> {
		try {
			const result: Array<contact> = await Repository.findAll();
			if (result.length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: Array<IContactDTO> = result.map((item) => {
				return contactMapper.toDTO(item);
			});
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findOne(id: number): Promise<IResult> {
		try {
			const result: contact | null = await Repository.findOne(id);
			if (!result) {
				return HTTPResponse(204);
			}
			const dataDTO: IContactDTO = contactMapper.toDTO(result);
			return HTTPResponse(200, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async update(id: number, body: IContactDTO): Promise<IResult> {
		try {
			const dataMap: contact = contactMapper.toPersistence(body);
			const data: contact | IMessage = await validateContact(dataMap);
			if ('message' in data) {
				return HTTPResponse(200, data);
			}
			const result: contact = await Repository.update(id, data);
			if (Object.keys(result).length === 0) {
				return HTTPResponse(204);
			}
			const dataDTO: IContactDTO = contactMapper.toDTO(result);
			return HTTPResponse(201, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async destroy(id: number): Promise<IResult> {
		try {
			const result: contact = await Repository.destroy(id);
			const dataDTO: IContactDTO = contactMapper.toDTO(result);
			return HTTPResponse(204, dataDTO);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
