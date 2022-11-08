import { job_title, staff } from '@prisma/client';
import { DTOJobTitle } from '../dto/jobTitle.dto';

class Mapper {
	toDTO(data: job_title): DTOJobTitle {
		return {
			id: data.jt_id!,
			name: data.jt_name,
		};
	}
}

export default new Mapper();
