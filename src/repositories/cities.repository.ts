import prisma from '../config/db';
import { cities } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDestroy,
} from '../helpers/interfaces/repositories.interface';

class citiesRepository
	implements
		IStore<cities>,
		IFindAll<cities>,
		IFindOne<number, cities>,
		IUpdate<number, cities>,
		IDestroy<number, cities>
{
	async store(data: cities): Promise<cities> {
		return await prisma.cities.create({
			data: data,
		});
	}
	async findAll(): Promise<Array<cities>> {
		return await prisma.cities.findMany({
			orderBy: {
				cty_name: 'asc',
			},
			include: {
				district: true,
			},
		});
	}
	async findOne(id: number): Promise<cities | null> {
		return await prisma.cities.findUnique({
			where: {
				cty_id: id,
			},
			include: {
				district: true,
			},
		});
	}
	async update(id: number, data: cities): Promise<cities> {
		return await prisma.cities.update({
			where: {
				cty_id: id,
			},
			include: {
				district: true,
			},
			data: data,
		});
	}
	async destroy(id: number): Promise<cities> {
		return await prisma.cities.delete({
			where: {
				cty_id: id,
			},
			include: {
				district: true,
			},
		});
	}
}

export default new citiesRepository();
