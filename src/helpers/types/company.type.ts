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

type ICompaniesStaff = companies_staff & {
	staff: staff & {
		job_title: job_title;
	};
};

export type TCompany = companies & {
	cities: cities & {
		district: district & {
			countries: countries;
		};
	};
	companies_staff: (companies_staff & {
		staff: staff & {
			job_title: job_title;
		};
	})[];
	users_companies: (users_companies & {
		users: users;
	})[];
};
