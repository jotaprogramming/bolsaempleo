import { DTOResDistrict } from './district.dto';
import { DTOName } from './name.dto';

export interface DTOResCity extends DTOName {
	district: DTOResDistrict;
}

export interface DTOReqCity extends DTOName {
	district: number;
}
