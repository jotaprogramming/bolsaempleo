import { countries } from '@prisma/client';
import { DTOCountry } from '../dto/country.dto';
class Mapper {
	toPersistence(data: DTOCountry): countries {
		return {
			cntr_id: data.id!,
			cntr_name: data.name,
		};
	}
	toDTO(data: countries): DTOCountry {
		return {
			id: data.cntr_id!,
			name: data.cntr_name,
		};
	}
}

export default new Mapper();
