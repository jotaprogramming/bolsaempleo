import { district } from '@prisma/client';
import { DTOReqDistrict, DTOResDistrict } from '../dto/district.dto';
import { TDistrict } from '../types/district.type';
import countryMapper from './country.mapper';

class Mapper {
	toPersistence(data: DTOReqDistrict): district {
		return {
			dis_id: data.id!,
			dis_name: data.name,
			dis_country_id: data.country,
		};
	}
	toDTO(data: TDistrict): DTOResDistrict {
		return {
			id: data.dis_id,
			name: data.dis_name,
			country: countryMapper.toDTO(data.countries),
		};
	}
}

export default new Mapper();
