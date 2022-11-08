import { DTOResCity } from './city.dto';
import { DTOContact } from './contact.dto';

interface DTOOffice {
	id: number;
	address: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface DTOResOffice extends DTOOffice {
	city: DTOResCity;
	contact: DTOContact;
}

export interface DTOReqOffice extends DTOOffice {
	city: number;
	contact: number;
}
