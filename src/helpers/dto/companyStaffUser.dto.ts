import { DTOUser } from './user.dto';
import { DTOLegalRepresentative, DTOHumanResource } from './staff.dto';
import { DTOCompany } from './company.dto';

export interface DTOCompanyStaffUser
	extends DTOCompany,
		DTOUser,
		DTOLegalRepresentative,
		DTOHumanResource {}
