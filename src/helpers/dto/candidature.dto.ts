import { DTOReqGraduate } from './graduate.dto';
import { DTOResOffice } from './office.dto';

interface DTOCandidature {
	id: number;
	status: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface DTOResCandidature extends DTOCandidature {
	offer: DTOResOffice;
	graduate: DTOReqGraduate;
}

export interface DTOReqCandidature extends DTOCandidature {
	offer: number;
	graduate: number;
}
