import Repository from '../helpers/repositories/companyStaffUser.repository';
import { IMessage, IResult } from '../helpers/interfaces/result.interface';
import typeError from '../utils/error';
import HTTPResponse from '../utils/httpResponse';
import {
	companies,
	companies_staff,
	staff,
	users,
	users_companies,
} from '@prisma/client';
import { objectCapitalize } from '../utils/formatting';
import { validateStaff } from '../utils/validate';
import { DTOCompanyStaffUser } from '../helpers/dto/companyStaffUser.dto';
import companiesMapper from '../helpers/mappers/companyStaffUser.mapper';
import { DAOCompanyStaffUser } from '../helpers/dao/companyStaffUser.dao';

class Model {
	async store(data: DTOCompanyStaffUser): Promise<IResult> {
		try {
			const dataMap: DAOCompanyStaffUser =
				companiesMapper.toPersistence(data);
			const company: companies = await objectCapitalize(dataMap.company);
			const user: users = dataMap.user;
			const legalRepresentative: staff | IMessage = await validateStaff(
				dataMap.legal_representative
			);
			if ('message' in legalRepresentative) {
				return HTTPResponse(200, legalRepresentative);
			}
			const humanResource: staff | IMessage = await validateStaff(
				dataMap.human_resources
			);
			if ('message' in humanResource) {
				return HTTPResponse(200, humanResource);
			}
			await Repository.store(company, user, legalRepresentative);
			await Repository.store(company, user, humanResource);
			return HTTPResponse(201);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findStaff(id: number): Promise<IResult> {
		try {
			const result: Array<companies_staff> = await Repository.findStaff(
				id
			);
			if (result.length === 0) {
				return HTTPResponse(204);
			}
			const staff = result.map((item) => {
				return item.cs_stf_id;
			});
			return HTTPResponse(200, staff);
		} catch (error: any) {
			return typeError(error);
		}
	}
	async findUser(id: number): Promise<IResult> {
		try {
			const result: Array<users_companies> = await Repository.findUser(
				id
			);
			if (result.length === 0) {
				return HTTPResponse(204);
			}
			const user = result.map((item) => {
				return item.uc_usr_id;
			});
			return HTTPResponse(200, user);
		} catch (error: any) {
			return typeError(error);
		}
	}
}
export default new Model();
