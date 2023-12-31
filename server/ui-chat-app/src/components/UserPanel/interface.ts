import { IUser } from "../Users/IUser";

export interface IUserPanel{
    socket:any;
    selectedUser:IUser|null|undefined;
    setSelectedUser: Function;
}