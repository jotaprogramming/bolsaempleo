import prisma from '../config/db';
import { companies, staff } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDelete
} from '../interfaces/repositories.interface';

class companiesRepository
	implements
		IStore<companies>,
		IFindAll<companies>,
		IFindOne<number, companies>,
		IUpdate<number, companies>,
		IDelete<number, companies>
{
	async store(data: companies): Promise<companies> {
		return await prisma.companies.create({
			data: data,
		});
	}
	async findAll(): Promise<Array<companies>> {
		return await prisma.companies.findMany({
			orderBy: {
				com_name: 'asc',
			},
			include: {
				cities: true,
				companies_staff: {
					include: {
						staff: true
					}
				}
			},
		});
	}
	async findOne(id: number): Promise<companies | null> {
		return await prisma.companies.findUnique({
			where: {
				com_nit: id,
			},
			include: {
				cities: true,
			},
		});
	}
	async update(id: number, data: companies): Promise<companies> {
		return await prisma.companies.update({
			where: {
				com_nit: id,
			},
			include: {
				cities: true,
			},
			data: data,
		});
	}
	async delete(id: number): Promise<companies> {
		return await prisma.companies.update({
			where: {
				com_nit: id,
			},
			data: {
				com_deleted_at: new Date(Date.now()),
			},
		});
	}
}

export default new companiesRepository();
