
import todo from "../models/ToDoModels.js";
var Todo =  new todo();
class TodoController {
    constructor() {}
        async createtodo(request, response){
            var data = request.body;

            var result = await Todo.createtodo(
                data.name, 
                data.description, 
                new Date(), 
                data.hour, 
                data.done);
            response.status(200).json(result);
        }
        async gettodo(request, response){
            let result = await Todo.gettodo();
            response.status(200).json(result);
        }
        async updatetodo(request, response){
            var id = request.params.id;
            var updata= request.body;
            var result = await Todo.updatetodo(id, updata );
            //console.log(id);
            response.status(200).json(result);
        }
        async deletetodo(request, response){
          var id = request.params.id;
          var result = await Todo.deletetodo(id)
          response.status(200).json(result);
      }
}
export default TodoController;