import prisma from '../../config/db';
import { district } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDestroy,
} from '../interfaces/repositories.interface';
import { TDistrict } from '../types/district.type';

class Repository
	implements
		IStore<district>,
		IFindAll<district>,
		IFindOne<number, district>,
		IUpdate<number, district>,
		IDestroy<number, district>
{
	async store(data: district): Promise<TDistrict> {
		return await prisma.district.create({
			data: data,
			include: {
				countries: true,
			},
		});
	}
	async findAll(): Promise<Array<TDistrict>> {
		return await prisma.district.findMany({
			orderBy: {
				dis_name: 'asc',
			},
			include: {
				countries: true,
			},
		});
	}
	async findOne(id: number): Promise<TDistrict | null> {
		return await prisma.district.findUnique({
			where: {
				dis_id: id,
			},
			include: {
				countries: true,
			},
		});
	}
	async update(id: number, data: district): Promise<TDistrict> {
		return await prisma.district.update({
			where: {
				dis_id: id,
			},
			include: {
				countries: true,
			},
			data: data,
		});
	}
	async destroy(id: number): Promise<TDistrict> {
		return await prisma.district.delete({
			where: {
				dis_id: id,
			},
			include: {
				countries: true,
			},
		});
	}
}

export default new Repository();
