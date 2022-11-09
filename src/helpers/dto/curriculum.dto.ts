import { DTOUser } from './user.dto';

interface DTOCurriculum {
	id: number;
	pdf: Buffer;
}

export interface DTOResCurriculum extends DTOCurriculum {
	user: DTOUser;
}

export interface DTOReqCurriculum extends DTOCurriculum {
	user: number;
}
