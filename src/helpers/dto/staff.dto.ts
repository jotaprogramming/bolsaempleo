export interface DTOHumanResource {
	contractorId?: number;
	contractorCed: number;
	contractorName: string;
	contractorLastname: string;
	contractorTelephone: string;
	contractorEmail: string;
	contractorJobTitle: number;
	contractorCreatedAt?: Date;
	contractorUpdatedAt?: Date;
	contractorDeletedAt?: Date;
}

export interface DTOLegalRepresentative {
	repId?: number;
	repCed: number;
	repName: string;
	repLastname: string;
	repTelephone: string;
	repEmail: string;
	repJobTitle: number;
	repCreatedAt?: Date;
	repUpdatedAt?: Date;
	repDeletedAt?: Date;
}
