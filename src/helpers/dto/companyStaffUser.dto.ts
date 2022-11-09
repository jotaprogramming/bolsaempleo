import { DTOUser } from './user.dto';
// import {
// 	DTOResLegalRepresentative,
// 	DTOResHumanResource,
// 	DTOReqHumanResource,
// 	DTOReqLegalRepresentative,
// } from './staff.dto';
import { DTOReqCompany, DTOResCompany } from './company.dto';
import { DTOReqStaff, DTOResStaff } from './staff.dto';
import { DTOJobTitle } from './jobTitle.dto';

// DTOResLegalRepresentative,
// DTOResHumanResource {
export interface DTOCompanyStaffUser extends DTOReqCompany, DTOUser {
	staff: { jobTitle: number }[];
}

export interface DTOResCompanyStaffUser extends DTOResCompany {
	user: DTOUser;
	staff: DTOResStaff[];
}

export interface DTOReqCompanyStaffUser extends DTOReqCompany, DTOUser {
	staff: DTOReqStaff[];
}
