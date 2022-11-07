import { DTOResCity } from './city.dto';
import { DTOHumanResource, DTOLegalRepresentative } from './staff.dto';
import { DTOUser } from './user.dto';

export interface DTOCompany {
	nit: number;
	companyName: string;
	address: string;
	city: number;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface DTOResCompany {
	nit: number;
	companyName: string;
	address: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
	city: DTOResCity;
	user: DTOUser;
	staff: {
		legalRepresentative: DTOLegalRepresentative;
		humanResource: DTOHumanResource;
	};
}
