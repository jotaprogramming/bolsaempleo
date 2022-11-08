import { DTOUser } from './user.dto';
import {
	DTOResLegalRepresentative,
	DTOResHumanResource,
	DTOReqHumanResource,
	DTOReqLegalRepresentative,
} from './staff.dto';
import { DTOReqCompany, DTOResCompany } from './company.dto';

export interface DTOResCompanyStaffUser
	extends DTOResCompany,
		DTOUser,
		DTOResLegalRepresentative,
		DTOResHumanResource {}

export interface DTOReqCompanyStaffUser
	extends DTOReqCompany,
		DTOUser,
		DTOReqLegalRepresentative,
		DTOReqHumanResource {}
