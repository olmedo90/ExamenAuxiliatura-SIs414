import ToDoModels from "../models/ToDoModels.js";

let inittest = async () => {
    var todmodel = new ToDoModels();
    todmodel.createtodo("test1", "descripcion", new Date(), "hora", true );
    todmodel.createtodo("test2", "descripcion", new Date(), "hora", true );
    todmodel.createtodo("test3", "descripcion", new Date(), "hora", true );

    console.log(await todmodel.getTodo());
  };
  inittest();