import { job_title, staff } from '@prisma/client';

export type TStaff = staff & {
	job_title: job_title;
};
