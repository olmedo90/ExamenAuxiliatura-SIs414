import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
import RolesModel from "./rolesModel.js";

class todo{
    Constructor(){
        this.Schema = mongoose.Schema;
        this.todoSchema = new this.Schema({
            name: String,
            description : String,
            date: Date,
            hour: String,
            done : Boolean
        });
        //this.mymodel = mongoose.model('todo', this.todoSchema);
       // console.log(this.mymodel+"****");
        if (modelenum["todo"] == null) {
            this.mymodel = mongoose.model("todo", this.UserSchema);
            modelenum["todo"] = this.mymodel;
          } else {
            this.mymodel = modelenum["todo"];
          }
    }
    getTodo() {
        return this.mymodel;
    }
    createtodo(name, description, date, hour,done){
        let todo = {
            name,
            description,
            date,
            hour,
            done
        };
        var newtodo =new this.mymodel(todo);
        return new Promise((resolve, reject)=>{
            newtodo.save().then((err, docs)=>{
                console.log("modelo todo registrado");
                resolve(docs);
            });
        })
    }
    async gettodo(){
        return await this.mymodel.find({});
    }
    updatetodo(id, todoobject){
        return new Promise((resolve, reject)=>{
             this.mymodel.update({_id: id}, {$set: todoobject},(err, docs) => {
            if(err){
                console.log(err);
                resolve(err);
                return;
            }
            resolve(docs);
        });
        }); 
    }
    deletetodo(id){
        this.mymodel.remove({_id: id}).then((err, docs)=> {
            if(err){
                console.log(err);
                resolve(err);
                return;
            }
            resolve(docs);
        }); 
    }

}
export default todo;