import prisma from '../config/db';
import { contact } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDestroy,
} from '../helpers/interfaces/repositories.interface';

class contactRepository
	implements
		IStore<contact>,
		IFindAll<contact>,
		IFindOne<number, contact>,
		IUpdate<number, contact>,
		IDestroy<number, contact>
{
	async store(data: contact): Promise<contact> {
		return await prisma.contact.create({
			data: data,
		});
	}
	async findAll(): Promise<Array<contact>> {
		return await prisma.contact.findMany({
			orderBy: {
				con_id: 'asc',
			},
		});
	}
	async findOne(id: number): Promise<contact | null> {
		return await prisma.contact.findUnique({
			where: {
				con_id: id,
			},
		});
	}
	async update(id: number, data: contact): Promise<contact> {
		return await prisma.contact.update({
			where: {
				con_id: id,
			},
			data: data,
		});
	}
	async destroy(id: number): Promise<contact> {
		return await prisma.contact.delete({
			where: {
				con_id: id,
			},
		});
	}
}

export default new contactRepository();
