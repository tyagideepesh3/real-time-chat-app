import { IUser } from "../Users/IUser"

export interface IChatPanel{
    selectedUser:IUser|null|undefined;
    setSelectedUser:Function
}