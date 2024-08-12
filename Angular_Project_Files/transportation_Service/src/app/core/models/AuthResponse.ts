import { Role } from "./Role"

export interface AuthResponse {
    token:string,
    refreshToken:string
    role : Role
}