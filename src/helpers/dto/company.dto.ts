import { DTOResCity } from './city.dto';
import { DTOResStaff } from './staff.dto';
// import { DTOResHumanResource, DTOResLegalRepresentative } from './staff.dto';
import { DTOUser } from './user.dto';

interface DTOCompany {
	nit: number;
	companyName: string;
	address: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface DTOReqCompany extends DTOCompany {
	city: number;
}

export interface DTOResCompany extends DTOCompany {
	city: DTOResCity;
	// user: DTOUser;
	// staff: DTOResStaff[];
}
