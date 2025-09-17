
export class ToDoList {
    constructor(){
        this.todolist = [];
        this.categories = ["default"];
    }
    displayOnConsole(){
        for (let todo of this.todolist)
            console.log(todo);
    }
    addToDo(title, description, dueDate, priority, category) {
        let todo = new ToDo(title, description, dueDate, priority, category);
        this.todolist.push(todo);
    }
    deleteToDoAt(index){
        this.todolist.splice(index, 1);
    }
    addNewCategory(name){
        this.categories.push(name);
    }
    getTodoList(){
        return this.todolist;
    }
}

class ToDo {
    constructor(title, description, dueDate, priority, category){
        this._title = title;
        this._description = description;
        this._dueDate = dueDate;
        this._priority = priority;
        this._category = category;
        this._completed = false;
        this._id = crypto.randomUUID();
    }
    get title(){ return this._title;}
    get id() {return this._id;}
}


