import { DTOResCompany } from './company.dto';
import { DTOContractType } from './contractType.dto';
import { DTOCurrency } from './currency.dto';
import { DTOWorkday } from './workday.dto';

interface DTOOffer {
	id: number;
	title: string;
	salary: number;
	vacancies: number;
	modality: string;
	hiring: Date;
	description?: string;
	requisites?: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface DTOResOffer extends DTOOffer {
	company: number;
	currency: number;
	contractType?: number;
	workday?: number;
}

export interface DTOReqOffer extends DTOOffer {
	company: DTOResCompany;
	currency: DTOCurrency;
	contractType?: DTOContractType;
	workday?: DTOWorkday;
}
