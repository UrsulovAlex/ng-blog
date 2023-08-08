import { Roles } from "../enum/roles.enum";

export interface IUser {
    id: number,
    nickName: string, 
    role: Roles, 
    createdAt: string, 
    posts: any[],
}