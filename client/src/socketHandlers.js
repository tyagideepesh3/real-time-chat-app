import { User } from "./users.js";
class SocketHandlers {
  createSocketHandler = (socket) => {
    socket.on("addUser", (data) => {
      console.log(data);
      let user = new User();
      user.AddUser(data);

      const users = user.GetAllUsers();
      console.log(users);
      socket.emit("GetUsersList", users);
    });
    socket.on("getUserList", () => {
      let user = new User();
      const allUsers = user.GetAllUsers();
      console.log(allUsers);
      socket.emit("GetUsersList", allUsers);
    });

    socket.on("GetUserDetails", ({ userId }, callback) => {
      console.log(userId);
      let user = new User();
      const UserDetails = user.GetUserById(userId);
      callback(UserDetails);
      //   socket.emit("UserDetails", UserDetails);
    });
  };
}
export { SocketHandlers };
