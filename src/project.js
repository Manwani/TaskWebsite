export default class Project{
    constructor(name){
        this.name = name;
        this.projArray = [];
    }

    addTodo(todo){
        this.projArray.push(todo);
    }

    editTodo(id, editedTodo){
        
        let whichTodo = this.projArray[id];
        let editedTask = editedTodo;
        

         for(const val in whichTodo){
            if(editedTask[val]!== whichTodo[val]){
                whichTodo[val] = editedTask[val];
            }
        } 

    }

    get Todo(){
        return this.projArray;
    }


    removeTodo(id){
        //let indexToRemove = this.projArray.findIndex((element) => element == todo);
        this.projArray.splice(id, 1);
        
    }

    listTodo(){
        //console.log(this.projArray);
        for(const todo of this.projArray){
            console.log(todo);
        }
    }
}
