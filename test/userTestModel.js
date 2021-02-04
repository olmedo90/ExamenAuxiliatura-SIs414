import UserModel from "../models/userModel.js";
var inittest = async () => {
  var usermodel = new UserModel();
  /*usermodel.createUser(
    "Test1",
    "Test 1 lastname",
    "test@gmail.com",
    "1234",
    new Date(),
    16
  );
  usermodel.createUser(
    "Test2",
    "Test 2 lastname",
    "test2@gmail.com",
    "1234",
    new Date(),
    13
  );
  usermodel.createUser(
    "Test1",
    "Test 2 lastname",
    "test3@gmail.com",
    "1234",
    new Date(),
    12
  );
  usermodel.createUser(
    "Test1",
    "Test 2 lastname",
    "test4@gmail.com",
    "1234",
    new Date(),
    16
  );
  console.log(await usermodel.getUsers());*/
  //usermodel.deleteUser("60146018e49f7308a951795c");

  //await usermodel.updateModel("60146018e49f7308a951795d", { name: "Ramon" });
  //console.log(await usermodel.getUsers());
};
inittest();
