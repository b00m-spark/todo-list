
class ToDoList {
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
}

class ToDo {
    constructor(title, description, dueDate, priority, category){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.category = category;
        this.completed = false;
        this.id = crypto.randomUUID();
    }
}

const list = new ToDoList();
list.addToDo("Read", "read new book", "2025-10-01", "high", "default");
list.addToDo("Complete survey", "saved in email", "2025-10-01", "medium", "default");
list.displayOnConsole();
