export interface DTOUser {
	userId?: number;
	username: string;
	userEmail: string;
	password: string;
	aboutMe?: string;
	role: number;
	userCreatedAt?: Date;
	userUpdatedAt?: Date;
	userDeletedAt?: Date;
}
