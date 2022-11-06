import Repository from '../repositories/companies_staff.repository';
import { IResult } from '../interfaces/result.interface';
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
import verifyEmail from '../utils/email';
import numberSize from '../utils/numberSize';

class companies_staffModel {
	async refactorStaff(body: staff): Promise<staff | IResult> {
		const data: staff = body;
		const names = await objectCapitalize({
			stf_name: body.stf_name,
			stf_lastname: body.stf_lastname,
		});
		const isEmail = verifyEmail(data.stf_email);
		if (!isEmail) {
			return HTTPResponse(200, {
				message: `¡El valor (${data.stf_email}) ingresado no es un correo electrónico!`,
				field: 'stf_email',
			});
		}
		const rangePhone = numberSize(data.stf_telephone, 6, 10);
		if (rangePhone) {
			return HTTPResponse(200, {
				message: rangePhone,
				field: 'telephone',
			});
		}
		data['stf_name'] = names.stf_name;
		data['stf_lastname'] = names.stf_lastname;
		return data;
	}
	async store(
		companies: companies,
		user: users,
		staff: staff
	): Promise<IResult> {
		try {
			const fcompanies: companies = await objectCapitalize(companies);
			const fstaff: staff | IResult = await this.refactorStaff(staff);
			if ('status' in fstaff) {
				return fstaff;
			}
			const result: companies_staff = await Repository.store(
				fcompanies,
				user,
				fstaff
			);
			return HTTPResponse(200, result);
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
export default new companies_staffModel();
