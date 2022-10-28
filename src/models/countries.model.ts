import Repository from '../repositories/countries.respository';
import { ICountries, IDBCountries } from '../utils/interfaces/countries.interface';

class CountriesModel {
	async findAll(): Promise<Array<ICountries>> {
		try {
			const getCountries: Array<IDBCountries> = await Repository.getAll();
			const data : Array<ICountries> = getCountries.map(element => {
				return {
					id: element.cntr_id,
					name: element.cntr_name
				}
			})
			return data;
		} catch (error: any) {
			// throw new Error('Internal Server Error');
			return [];
		}
	}
}

export default new CountriesModel();
