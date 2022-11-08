import { staff } from '@prisma/client';
import {
	DTOReqHumanResource,
	DTOReqLegalRepresentative,
	DTOResHumanResource,
	DTOResLegalRepresentative,
} from '../dto/staff.dto';
import { TStaff } from '../types/staff.type';
import jobTitleMapper from './jobTitle.mapper';

class Mapper {
	toDTOHumanResource(data: TStaff): DTOResHumanResource {
		return {
			contractorId: data.stf_id,
			contractorCed: data.stf_ced,
			contractorName: data.stf_name,
			contractorLastname: data.stf_lastname,
			contractorTelephone: data.stf_telephone,
			contractorEmail: data.stf_email,
			contractorJobTitle: jobTitleMapper.toDTO(data.job_title),
			contractorCreatedAt: data.stf_created_at,
			contractorUpdatedAt: data.stf_updated_at!,
			contractorDeletedAt: data.stf_deleted_at!,
		};
	}
	toDTOLegalRepresentative(data: TStaff): DTOResLegalRepresentative {
		return {
			repId: data.stf_id,
			repCed: data.stf_ced,
			repName: data.stf_name,
			repLastname: data.stf_lastname,
			repTelephone: data.stf_telephone,
			repEmail: data.stf_email,
			repJobTitle: jobTitleMapper.toDTO(data.job_title),
			repCreatedAt: data.stf_created_at,
			repUpdatedAt: data.stf_updated_at!,
			repDeletedAt: data.stf_deleted_at!,
		};
	}
}

export default new Mapper();
