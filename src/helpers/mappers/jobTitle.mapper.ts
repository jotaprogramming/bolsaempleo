import { job_title, staff } from '@prisma/client';
import { DTOJobTitle } from '../dto/jobTitle.dto';

class Mapper {
	toPersistence(data: DTOJobTitle): job_title {
		return {
			jt_id: data.id!,
			jt_name: data.name,
		};
	}
	toDTO(data: job_title): DTOJobTitle {
		return {
			id: data.jt_id!,
			name: data.jt_name,
		};
	}
}

export default new Mapper();
