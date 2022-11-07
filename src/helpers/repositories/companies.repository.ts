import prisma from '../../config/db';
import { companies } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDelete,
} from '../interfaces/repositories.interface';
import { TCompany } from '../types/company.type';

class Repository
	implements
		IFindAll<TCompany>,
		IFindOne<number, TCompany>,
		IUpdate<number, TCompany>,
		IDelete<number, TCompany>
{
	async findAll(): Promise<Array<TCompany>> {
		return await prisma.companies.findMany({
			orderBy: {
				com_name: 'asc',
			},
			include: {
				cities: {
					include: {
						district: {
							include: {
								countries: true,
							},
						},
					},
				},
				companies_staff: {
					include: {
						staff: {
							include: {
								job_title: true,
							},
						},
					},
				},
				users_companies: {
					include: {
						users: true,
					},
				},
			},
		});
	}
	async findOne(id: number): Promise<TCompany | null> {
		return await prisma.companies.findUnique({
			where: {
				com_nit: id,
			},
			include: {
				cities: {
					include: {
						district: {
							include: {
								countries: true,
							},
						},
					},
				},
				companies_staff: {
					include: {
						companies: false,
						staff: {
							include: {
								job_title: true,
							},
						},
					},
				},
				users_companies: {
					include: {
						companies: false,
						users: true,
					},
				},
			},
		});
	}
	async update(id: number, data: companies): Promise<TCompany> {
		return await prisma.companies.update({
			where: {
				com_nit: id,
			},
			include: {
				cities: {
					include: {
						district: {
							include: {
								countries: true,
							},
						},
					},
				},
				companies_staff: {
					include: {
						staff: {
							include: {
								job_title: true,
							},
						},
					},
				},
				users_companies: {
					include: {
						users: true,
					},
				},
			},
			data: data,
		});
	}
	async delete(id: number): Promise<TCompany> {
		return await prisma.companies.update({
			where: {
				com_nit: id,
			},
			include: {
				cities: {
					include: {
						district: {
							include: {
								countries: true,
							},
						},
					},
				},
				companies_staff: {
					include: {
						staff: {
							include: {
								job_title: true,
							},
						},
					},
				},
				users_companies: {
					include: {
						users: true,
					},
				},
			},
			data: {
				com_deleted_at: new Date(Date.now()),
			},
		});
	}
}

export default new Repository();
