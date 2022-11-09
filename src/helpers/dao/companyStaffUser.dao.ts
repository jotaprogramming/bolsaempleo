import { companies, staff, users } from '@prisma/client';

export interface DAOCompanyStaffUser {
	company: companies;
	user: users;
	staff: staff[];
	// legal_representative: staff;
	// human_resources: staff;
}
