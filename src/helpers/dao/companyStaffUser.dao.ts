import { companies, staff, users } from '@prisma/client';

export interface DAOCompanyStaffUser {
	company: companies;
	user: users;
	legal_representative: staff;
	human_resources: staff;
}
