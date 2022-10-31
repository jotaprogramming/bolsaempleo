import prisma from '../config/db';
import { ICountry, IDBCountry } from '../interfaces/country.interfaces';
import {
	IFindAll,
	IStore,
	IUpdate,
	IFindOne,
	IDestroy,
} from '../interfaces/repositories.interface';

class CountriesRepository
	implements
		IStore<IDBCountry>,
		IFindAll<IDBCountry>,
		IFindOne<number, IDBCountry>,
		IUpdate<number, IDBCountry>,
		IDestroy<number, IDBCountry>
{
	async store(body: IDBCountry): Promise<IDBCountry> {
		const { cntr_name } = body;
		return await prisma.countries.create({
			data: {
				cntr_name,
			},
		});
	}
	async findAll(): Promise<Array<IDBCountry>> {
		return await prisma.countries.findMany({
			orderBy: {
				cntr_name: 'asc',
			},
		});
	}
	async findOne(id: number): Promise<IDBCountry | null> {
		return await prisma.countries.findUnique({
			where: {
				cntr_id: id,
			},
		});
	}
	async update(id: number, data: IDBCountry): Promise<IDBCountry> {
		return await prisma.countries.update({
			where: {
				cntr_id: id,
			},
			data: data,
		});
	}
	async destroy(id: number): Promise<IDBCountry> {
		return await prisma.countries.delete({
			where: {
				cntr_id: id,
			},
		});
	}
}

export default new CountriesRepository();
