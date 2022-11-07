import { users } from '@prisma/client';
import { DTOUser } from '../dto/user.dto';

class Mapper {
	toDTO(data: users): DTOUser {
		return {
			userId: data.usr_id,
			username: data.username,
			userEmail: data.email,
			password: data.password,
			aboutMe: data.about_me!,
			role: data.usr_rol_id,
			userCreatedAt: data.usr_created_at,
			userUpdatedAt: data.usr_updated_at!,
			userDeletedAt: data.usr_deleted_at!,
		};
	}
}

export default new Mapper();
