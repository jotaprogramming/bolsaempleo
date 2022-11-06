import prisma from '../config/db';
import { graduates } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDelete,
} from '../helpers/interfaces/repositories.interface';

class Repository
	implements
		IStore<graduates>,
		IFindAll<graduates>,
		IFindOne<number, graduates>,
		IUpdate<number, graduates>,
		IDelete<number, graduates>
{
	async store(data: graduates): Promise<graduates> {
		return await prisma.graduates.create({
			data: data,
		});
	}
	async findAll(): Promise<Array<graduates>> {
		return await prisma.graduates.findMany({
			orderBy: {
				grd_ced: 'asc',
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
				offices: {
					include: {
						cities: {
							select: {
								cty_name: true,
							},
						},
					},
				},
			},
		});
	}
	async findOne(id: number): Promise<graduates | null> {
		return await prisma.graduates.findUnique({
			where: {
				grd_ced: id,
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
				offices: {
					include: {
						cities: {
							select: {
								cty_name: true,
							},
						},
					},
				},
			},
		});
	}
	async update(id: number, data: graduates): Promise<graduates> {
		return await prisma.graduates.update({
			where: {
				grd_ced: id,
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
				offices: {
					include: {
						cities: {
							select: {
								cty_name: true,
							},
						},
					},
				},
			},
			data: data,
		});
	}
	async delete(id: number): Promise<graduates> {
		return await prisma.graduates.update({
			where: {
				grd_ced: id,
			},
			data: {
				grd_deleted_at: new Date(Date.now()),
			},
		});
	}
}

export default new Repository();
