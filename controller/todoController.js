/*import todomodel from "../models/ToDoModels.js";

var roles = new RolesModel();
var USER = new UserModel();

class todoController{
    constructor() {}
    async createTodo(request, response) {
      var data = request.body;
      if (!USER.checkEmaildb(data.email)) {
        response
          .status(200)
          .json({ serverResponse: "El email ya esta registrado" });
        return;
      }
      var result = await USER.createUser(
        data.name,
        data.lastname,
        data.email,
        Sha1(data.password),
        new Date(),
        data.age
      );
      response.status(200).json(result);
    }
}*/
import todo from "../models/ToDoModels.js";
class TodoController {
    constructor() {}
        async createtodo(request, response){
            var data = request.body;
            var Todo =  new todo();
            var result = await Todo.createtodo(
                data.name, 
                data.description, 
                new Date(), 
                data.hour, 
                data.done);
            response.status(200).json(result);
        }
}
export default TodoController;