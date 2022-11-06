import { Request, Response } from 'express';
import { IStore, IDelete } from '../interfaces/controller.interfaces';
import Model from '../models/companies_staff.model';
import companiesModel from '../models/companies.model';
import { companies_staff, companies, staff, users } from '@prisma/client';
import { IResult } from '../interfaces/result.interface';
import { ICompanies } from '../interfaces/companies.interfaces';
import staffModel from '../models/staff.model';
import usersModel from '../models/users.model';

class companies_staffController
	implements IStore<Request, Response>, IDelete<Request, Response>
{
	async store(req: Request, res: Response): Promise<void> {
		const body: ICompanies = req.body;
		const company: companies = body.company;
		const legal_representative: staff = body.legal_representative;
		const human_resources: staff = body.human_resources;
		const user: users = body.user;
		const data1: IResult = await Model.store(
			company,
			user,
			legal_representative
		);
		const data2: IResult = await Model.store(
			company,
			user,
			human_resources
		);
		const data: IResult = {
			status:
				data1.status >= 400
					? data1.status
					: data2.status >= 400
					? data2.status
					: data1.status,
			result: {
				legal_representative: data1,
				human_resources: data2,
			},
		};
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
		const dataCompaniesStaff: IResult = await Model.findStaff(parseInt(id));
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
		const dataUsersCompanies: IResult = await Model.findUser(parseInt(id));
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

export default new companies_staffController();
