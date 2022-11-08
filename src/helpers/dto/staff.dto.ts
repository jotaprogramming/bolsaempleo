import { DTOJobTitle } from './jobTitle.dto';

interface DTOHumanResource {
	contractorId?: number;
	contractorCed: number;
	contractorName: string;
	contractorLastname: string;
	contractorTelephone: string;
	contractorEmail: string;
	contractorCreatedAt?: Date;
	contractorUpdatedAt?: Date;
	contractorDeletedAt?: Date;
}

interface DTOLegalRepresentative {
	repId?: number;
	repCed: number;
	repName: string;
	repLastname: string;
	repTelephone: string;
	repEmail: string;
	repCreatedAt?: Date;
	repUpdatedAt?: Date;
	repDeletedAt?: Date;
}

export interface DTOResHumanResource extends DTOHumanResource {
	contractorJobTitle: DTOJobTitle;
}

export interface DTOResLegalRepresentative extends DTOLegalRepresentative {
	repJobTitle: DTOJobTitle;
}

export interface DTOReqHumanResource extends DTOHumanResource {
	contractorJobTitle: number;
}

export interface DTOReqLegalRepresentative extends DTOLegalRepresentative {
	repJobTitle: number;
}
