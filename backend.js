
export class ToDoList {
    constructor(){
        this.todolist = [];
        this.categories = ["default","school","life"];
    }
    findIndexWithId(id){
        return this.todolist.findIndex(todo => todo.id === id);
    }

    displayOnConsole(){
        for (let todo of this.todolist)
            console.log(todo);
    }
    addToDo(title, description, dueDate, priority, category) {
        let todo = new ToDo(title, description, dueDate, priority, category);
        this.todolist.push(todo);
    }
    deleteToDoWithId(id){
        const index = this.findIndexWithId(id);
        this.todolist.splice(index, 1);
    }
    addNewCategory(name){
        this.categories.push(name);
    }
    getTodoList(){
        return this.todolist;
    }
    getToDo(id){
        return this.todolist.find(todo => todo.id === id);
    }
    getToDoAt(id){
        return this.todolist.findIndex(todo => todo.id === id);
    }
    changeTitleOf(newTitle, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].title = newTitle;
    }
    changeDescriptionOf(newDes, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].description = newDes;
    }
    changeDueDateOf(newDate, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].dueDate = newDate;
    }
    changePriorityOf(newPriority, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].priority = newPriority;
    }
    changeCompletedStatusOf(id){
        const index = this.findIndexWithId(id);
        this.todolist[index].toggleCompleted();
    }
    changeCategoryOf(newCat, id){
        const index = this.findIndexWithId(id);
        this.todolist[index].category = newCat;
    }
    getCategories(){
        return this.categories;
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
    set title(newTitle) { this._title = newTitle;}
    get description() {return this._description;}
    set description(newDescrip) {this._description = newDescrip;}
    get dueDate() {return this._dueDate;}
    set dueDate(date) { this._dueDate = date;}
    get priority() {return this._priority;}
    set priority(priority) {this._priority = priority;};
    get category() {return this._category;}
    set category(cat) {this._category = cat;};
    get completed() {return this._completed;}

    toggleCompleted(){
        if (this._completed)
            this._completed = false;
        else
            this._completed = true;
    }

     get id() {return this._id;}
}


