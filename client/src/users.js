import { UniqueString } from "unique-string-generator";
const Users = [];
class User {
  GetAllUsers = () => {
    return Users;
  };
  GetAllUsersByActivationStatus = (activationStatus) => {
    return Users.filter((user) => user.isActive === activationStatus);
  };
  AddUser = (user) => {
    const newUser = user;
    newUser.id = UniqueString();
    Users.push(user);
  };
  GetUserById = (userId) => {
    return Users.find((user) => user.id === userId);
  };
}
export { User };
