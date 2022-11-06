import prisma from '../config/db';
import { countries } from '@prisma/client';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDestroy,
} from '../helpers/interfaces/repositories.interface';

class CountriesRepository
	implements
		IStore<countries>,
		IFindAll<countries>,
		IFindOne<number, countries>,
		IUpdate<number, countries>,
		IDestroy<number, countries>
{
	async store(body: countries): Promise<countries> {
		return await prisma.countries.create({
			data: body,
		});
	}
	async findAll(): Promise<Array<countries>> {
		return await prisma.countries.findMany({
			orderBy: {
				cntr_name: 'asc',
			},
		});
	}
	async findOne(id: number): Promise<countries | null> {
		return await prisma.countries.findUnique({
			where: {
				cntr_id: id,
			},
		});
	}
	async update(id: number, data: countries): Promise<countries> {
		return await prisma.countries.update({
			where: {
				cntr_id: id,
			},
			data: data,
		});
	}
	async destroy(id: number): Promise<countries> {
		return await prisma.countries.delete({
			where: {
				cntr_id: id,
			},
		});
	}
}

export default new CountriesRepository();
