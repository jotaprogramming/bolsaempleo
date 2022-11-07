import prisma from '../../config/db';
import { cities, countries, district } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDestroy,
} from '../interfaces/repositories.interface';
import { TCities } from '../types/cities.type';

class Repository
	implements
		IStore<cities>,
		IFindAll<cities>,
		IFindOne<number, cities>,
		IUpdate<number, cities>,
		IDestroy<number, cities>
{
	async store(data: cities): Promise<TCities> {
		return await prisma.cities.create({
			data: data,
			include: {
				district: {
					include: {
						countries: true,
					},
				},
			},
		});
	}
	async findAll(): Promise<Array<TCities>> {
		return await prisma.cities.findMany({
			orderBy: {
				cty_name: 'asc',
			},
			include: {
				district: {
					include: {
						countries: true,
					},
				},
			},
		});
	}
	async findOne(id: number): Promise<TCities | null> {
		return await prisma.cities.findUnique({
			where: {
				cty_id: id,
			},
			include: {
				district: {
					include: {
						countries: true,
					},
				},
			},
		});
	}
	async update(id: number, data: cities): Promise<TCities> {
		return await prisma.cities.update({
			where: {
				cty_id: id,
			},
			include: {
				district: {
					include: {
						countries: true,
					},
				},
			},
			data: data,
		});
	}
	async destroy(id: number): Promise<TCities> {
		return await prisma.cities.delete({
			where: {
				cty_id: id,
			},
			include: {
				district: {
					include: {
						countries: true,
					},
				},
			},
		});
	}
}

export default new Repository();
