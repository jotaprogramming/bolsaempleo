import { DTOResCity } from './city.dto';
import { DTOResOffice } from './office.dto';

interface DTOGraduate {
	id: number;
	telephone: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface DTOResGraduate extends DTOGraduate {
	fullName: string;
	office: DTOResOffice;
	city: DTOResCity;
}

export interface DTOReqGraduate extends DTOGraduate {
	firstName: string;
	secondName: string;
	firstSurname: string;
	secondSurname: string;
	office: number;
	city: number;
}
