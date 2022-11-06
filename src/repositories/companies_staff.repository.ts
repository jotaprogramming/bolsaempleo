import prisma from '../config/db';
import {
	companies,
	companies_staff,
	staff,
	users,
	users_companies,
} from '@prisma/client';
import '../helpers/middlewares/encrypt';

class Repository {
	async store(
		companies: companies,
		user: users,
		staff: staff
	): Promise<companies_staff> {
		return await prisma.companies_staff.create({
			data: {
				companies: {
					connectOrCreate: {
						where: {
							com_nit: companies.com_nit,
						},
						create: {
							...companies,
							users_companies: {
								create: {
									users: {
										create: user,
									},
								},
							},
						},
					},
				},
				staff: {
					create: staff,
				},
			},
		});
	}
	async findStaff(id: number): Promise<Array<companies_staff>> {
		return await prisma.companies_staff.findMany({
			where: {
				cs_com_nit: id,
			},
			include: {
				companies: true,
				staff: true,
			},
		});
	}
	async findUser(id: number): Promise<Array<users_companies>> {
		return await prisma.users_companies.findMany({
			where: {
				uc_com_nit: id,
			},
			include: {
				companies: true,
				users: true,
			},
		});
	}
}

export default new Repository();
