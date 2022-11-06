import prisma from '../config/db';
import { offices } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDelete,
} from '../helpers/interfaces/repositories.interface';

class Repository
	implements
		IStore<offices>,
		IFindAll<offices>,
		IFindOne<number, offices>,
		IUpdate<number, offices>,
		IDelete<number, offices>
{
	async store(data: offices): Promise<offices> {
		return await prisma.offices.create({
			data: data,
		});
	}
	async findAll(): Promise<Array<offices>> {
		return await prisma.offices.findMany({
			orderBy: {
				off_id: 'asc',
			},
			include: {
				cities: {
					select: {
						cty_id: true,
						cty_name: true,
					},
				},
			},
		});
	}
	async findOne(id: number): Promise<offices | null> {
		return await prisma.offices.findUnique({
			where: {
				off_id: id,
			},
			include: {
				cities: {
					select: {
						cty_id: true,
						cty_name: true,
					},
				},
			},
		});
	}
	async update(id: number, data: offices): Promise<offices> {
		return await prisma.offices.update({
			where: {
				off_id: id,
			},
			include: {
				cities: {
					select: {
						cty_id: true,
						cty_name: true,
					},
				},
			},
			data: data,
		});
	}
	async delete(id: number): Promise<offices> {
		return await prisma.offices.update({
			where: {
				off_id: id,
			},
			data: {
				off_deleted_at: new Date(Date.now()),
			},
		});
	}
}

export default new Repository();
