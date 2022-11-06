import prisma from '../config/db';
import { staff } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDelete,
} from '../helpers/interfaces/repositories.interface';

interface IId {
	stf_id: number;
}
interface ICed {
	stf_ced: number;
}

class staffRepository
	implements
		IStore<staff>,
		IFindAll<staff>,
		IFindOne<number, staff>,
		IUpdate<number, staff>,
		IDelete<number, staff>
{
	async store(data: staff): Promise<staff> {
		return await prisma.staff.create({
			data: data,
		});
	}
	async findAll(): Promise<Array<staff>> {
		return await prisma.staff.findMany({
			orderBy: {
				stf_name: 'asc',
			},
			include: {
				job_title: true,
			},
		});
	}
	async findOne(id: number): Promise<staff | null> {
		return await prisma.staff.findUnique({
			where: {
				stf_id: id,
			},
			include: {
				job_title: true,
			},
		});
	}
	async update(id: number, data: staff): Promise<staff> {
		return await prisma.staff.update({
			where: {
				stf_id: id,
			},
			include: {
				job_title: true,
			},
			data: data,
		});
	}
	async delete(id: number): Promise<staff> {
		return await prisma.staff.update({
			where: {
				stf_id: id,
			},
			data: {
				stf_deleted_at: new Date(Date.now()),
			},
		});
	}
}

export default new staffRepository();
