import { DTOJobTitle } from './jobTitle.dto';

interface DTOStaff {
	id: number;
	idCard: number;
	telephone: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date;
}

export interface DTOResStaff extends DTOStaff {
	fullname: string;
	jobTitle: DTOJobTitle;
}

export interface DTOReqStaff extends DTOStaff {
	name: string;
	lastname: string;
	jobTitle: number;
}

// interface DTOHumanResource {
// 	contractorId?: number;
// 	contractorCed: number;
// 	contractorName: string;
// 	contractorLastname: string;
// 	contractorTelephone: string;
// 	contractorEmail: string;
// 	contractorCreatedAt?: Date;
// 	contractorUpdatedAt?: Date;
// 	contractorDeletedAt?: Date;
// }

// interface DTOLegalRepresentative {
// 	repId?: number;
// 	repCed: number;
// 	repName: string;
// 	repLastname: string;
// 	repTelephone: string;
// 	repEmail: string;
// 	repCreatedAt?: Date;
// 	repUpdatedAt?: Date;
// 	repDeletedAt?: Date;
// }

// interface DTOResHumanResource extends DTOHumanResource {
// 	contractorJobTitle: DTOJobTitle;
// }

// interface DTOResLegalRepresentative extends DTOLegalRepresentative {
// 	repJobTitle: DTOJobTitle;
// }

// interface DTOReqHumanResource extends DTOHumanResource {
// 	contractorJobTitle: number;
// }

// interface DTOReqLegalRepresentative extends DTOLegalRepresentative {
// 	repJobTitle: number;
// }
