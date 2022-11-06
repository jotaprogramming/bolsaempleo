import { companies, staff, users } from '@prisma/client';

export interface ICompanies {
	company: companies;
	user: users;
	legal_representative: staff;
	human_resources: staff;
}
