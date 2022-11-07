import { cities, district } from '@prisma/client';
import { DTOReqCity, DTOResCity } from '../dto/city.dto';
import { TCities } from '../types/cities.type';
import districtMapper from './district.mapper';

class Mapper {
	toPersistence(data: DTOReqCity): cities {
		return {
			cty_id: data.id!,
			cty_name: data.name,
			cty_district_id: data.district,
		};
	}
	toDTO(data: TCities): DTOResCity {
		return {
			id: data.cty_id,
			name: data.cty_name,
			district: districtMapper.toDTO(data.district),
		};
	}
}

export default new Mapper();
