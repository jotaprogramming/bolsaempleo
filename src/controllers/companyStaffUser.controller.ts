import { Request, Response } from 'express';
import { IStore, IDelete } from '../helpers/interfaces/controller.interfaces';
import companiesStaffModel from '../models/companyStaffUser.model';
import companiesModel from '../models/companies.model';
import { IResult } from '../helpers/interfaces/result.interface';
import {
	DTOCompanyStaffUser,
	DTOReqCompanyStaffUser,
	// DTOResCompanyStaffUser,
} from '../helpers/dto/companyStaffUser.dto';
import staffModel from '../models/staff.model';
import usersModel from '../models/users.model';

class Controller
	implements IStore<Request, Response>, IDelete<Request, Response>
{
	async store(req: Request, res: Response): Promise<void> {
		const body: DTOReqCompanyStaffUser = req.body;
		const data: IResult = await companiesStaffModel.store(body);
		res.status(data.status).json(data.result);
	}

	async delete(req: Request, res: Response): Promise<void> {
		const id: string = req.params.id;
		const dataCompanies: IResult = await companiesModel.delete(
			parseInt(id)
		);
		if (dataCompanies.status !== 200) {
			res.status(dataCompanies.status).json(dataCompanies.result);
			return;
		}
		const dataCompaniesStaff: IResult = await companiesStaffModel.findStaff(
			parseInt(id)
		);
		if (dataCompaniesStaff.status !== 200) {
			res.status(dataCompaniesStaff.status).json(
				dataCompaniesStaff.result
			);
			return;
		}
		const tempStaff = Object.values(dataCompaniesStaff.result);
		const dataStaff = [];
		for (let i = 0; i < tempStaff.length; i++) {
			const item = tempStaff[i];
			if (typeof item === 'number') {
				const staff = await staffModel.delete(item);
				if (staff.status !== 200) {
					res.status(staff.status).json(staff.result);
					return;
				}
				dataStaff.push(staff.result);
			}
		}
		const dataUsersCompanies: IResult = await companiesStaffModel.findUser(
			parseInt(id)
		);
		if (dataUsersCompanies.status !== 200) {
			res.status(dataUsersCompanies.status).json(
				dataUsersCompanies.result
			);
			return;
		}
		const tempUser: number[] = Object.values(dataUsersCompanies.result);
		const dataUser = await usersModel.delete(tempUser[0]);
		if (dataUser.status !== 200) {
			res.status(dataUser.status).json(dataUser.result);
			return;
		}
		res.status(200).json({
			company: dataCompanies.result,
			user: dataUser.result,
			staff: dataStaff,
		});
		return;
	}
}

export default new Controller();
