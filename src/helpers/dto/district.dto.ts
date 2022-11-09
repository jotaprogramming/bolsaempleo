import { DTOCountry } from './country.dto';
import { DTOName } from './name.dto';

export interface DTOResDistrict extends DTOName {
	country: DTOCountry;
}

export interface DTOReqDistrict extends DTOName {
	country: number;
}
