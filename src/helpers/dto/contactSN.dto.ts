import { DTOContact } from './contact.dto';
import { DTOSocialNetwork } from './socialNetwork.dto';

interface DTOContactSN {
	id: number;
	path: string;
}

export interface DTOResContactSN extends DTOContactSN {
	contact: DTOContact;
	socialNetwork: DTOSocialNetwork;
}

export interface DTOReqContactSN extends DTOContactSN {
	contact: number;
	socialNetwork: number;
}
