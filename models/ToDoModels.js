import mongoose from "../connection/connect.js";
import modelenum from "../utils/enumModel.js";
class todo{
    constructor(){
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
            this.mymodel = mongoose.model("todo", this.todoSchema);
            modelenum["todo"] = this.mymodel;
        } else {
            this.mymodel = modelenum["todo"]; 
        }
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
    gettodo() {
        return new Promise((resolve, reject) => {
            this.mymodel.find({}, (err, docs) => {
                if(err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
            });
        });
        
    }
    updatetodo(id, todoobject){
        return new Promise((resolve, reject)=>{
            this.mymodel.update({_id: id}, {$set: todoobject}, (err, docs) => {
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
        return new Promise((resolve, rejest) => {
            this.mymodel.remove({_id: id}).then((err, docs)=> {
                if(err){
                    console.log(err);
                    resolve(err);
                    return;
                }
                resolve(docs);
            }); 
        })
        }
        async hechoTodo(id) {
            let don='true';
            const result = await this.mymodel.update(
            { _id: id },
            { $set: { done: don } }
            );
            return result;
        }
        
    getModel(){
        return this.mymodel;
    }
}
export default todo;

// FINISH