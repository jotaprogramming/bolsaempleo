import prisma from '../config/db';
import { district } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDestroy,
} from '../helpers/interfaces/repositories.interface';

class Repository
	implements
		IStore<district>,
		IFindAll<district>,
		IFindOne<number, district>,
		IUpdate<number, district>,
		IDestroy<number, district>
{
	async store(data: district): Promise<district> {
		return await prisma.district.create({
			data: data,
		});
	}
	async findAll(): Promise<Array<district>> {
		return await prisma.district.findMany({
			orderBy: {
				dis_name: 'asc',
			},
			include: {
				countries: true,
			},
		});
	}
	async findOne(id: number): Promise<district | null> {
		return await prisma.district.findUnique({
			where: {
				dis_id: id,
			},
			include: {
				countries: true,
			},
		});
	}
	async update(id: number, data: district): Promise<district> {
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
	async destroy(id: number): Promise<district> {
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
