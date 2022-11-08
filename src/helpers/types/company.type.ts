import {
	cities,
	companies,
	companies_staff,
	countries,
	district,
	job_title,
	staff,
	users,
	users_companies,
} from '@prisma/client';
import { TStaff } from './staff.type';

export type TCompany = companies & {
	cities: cities & {
		district: district & {
			countries: countries;
		};
	};
	companies_staff: (companies_staff & {
		staff: TStaff;
	})[];
	users_companies: (users_companies & {
		users: users;
	})[];
};
