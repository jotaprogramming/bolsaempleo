import {
	companies,
	companies_staff,
	staff,
	users,
	users_companies,
} from '@prisma/client';

export type TCompanyStaffUser = companies_staff & {
	companies: companies & {
		users_companies: (users_companies & {
			users: users;
		})[];
	};
	staff: staff;
};
