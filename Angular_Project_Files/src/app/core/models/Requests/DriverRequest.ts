import { UserProfile } from "../UserProfile";


export interface DriverRequest {
    driversLicense: string;
    user: UserProfile;
}