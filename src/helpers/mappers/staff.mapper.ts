import { staff } from '@prisma/client';
import {
	// DTOReqHumanResource,
	// DTOReqLegalRepresentative,
	DTOReqStaff,
	DTOResStaff,
	// DTOResHumanResource,
	// DTOResLegalRepresentative,
} from '../dto/staff.dto';
import { TStaff } from '../types/staff.type';
import jobTitleMapper from './jobTitle.mapper';

class Mapper {
	toPersistence(data: DTOReqStaff): staff {
		return {
			stf_id: data.id!,
			stf_ced: data.idCard,
			stf_name: data.name,
			stf_lastname: data.lastname,
			stf_telephone: data.telephone,
			stf_email: data.email,
			stf_jt_id: data.jobTitle,
			stf_created_at: data.createdAt!,
			stf_updated_at: data.updatedAt!,
			stf_deleted_at: data.deletedAt!,
		};
	}
	toDTO(data: TStaff): DTOResStaff {
		return {
			id: data.stf_id,
			idCard: data.stf_ced,
			fullname: `${data.stf_name} ${data.stf_lastname}`,
			telephone: data.stf_telephone,
			email: data.stf_email,
			jobTitle: jobTitleMapper.toDTO(data.job_title),
			createdAt: data.stf_created_at,
			updatedAt: data.stf_updated_at!,
			deletedAt: data.stf_deleted_at!,
		};
	}
	// toDTOHumanResource(data: TStaff): DTOResHumanResource {
	// 	return {
	// 		contractorId: data.stf_id,
	// 		contractorCed: data.stf_ced,
	// 		contractorName: data.stf_name,
	// 		contractorLastname: data.stf_lastname,
	// 		contractorTelephone: data.stf_telephone,
	// 		contractorEmail: data.stf_email,
	// 		contractorJobTitle: jobTitleMapper.toDTO(data.job_title),
	// 		contractorCreatedAt: data.stf_created_at,
	// 		contractorUpdatedAt: data.stf_updated_at!,
	// 		contractorDeletedAt: data.stf_deleted_at!,
	// 	};
	// }
	// toDTOLegalRepresentative(data: TStaff): DTOResLegalRepresentative {
	// 	return {
	// 		repId: data.stf_id,
	// 		repCed: data.stf_ced,
	// 		repName: data.stf_name,
	// 		repLastname: data.stf_lastname,
	// 		repTelephone: data.stf_telephone,
	// 		repEmail: data.stf_email,
	// 		repJobTitle: jobTitleMapper.toDTO(data.job_title),
	// 		repCreatedAt: data.stf_created_at,
	// 		repUpdatedAt: data.stf_updated_at!,
	// 		repDeletedAt: data.stf_deleted_at!,
	// 	};
	// }
}

export default new Mapper();
