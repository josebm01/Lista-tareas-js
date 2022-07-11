import { Todo } from "./todo.class";

export class TodoList {

    constructor(){
        this.cargarLocalStorage();
    }

    nuevoTodo( todo ){
        this.todos.push( todo );
        this.guardarLocalStorage();
    }

    eliminarTodo( id ){
        //* Se reemplaza el valor del arreglo original con el filtrado, mostrando los todos menos el que se le envía
        this.todos = this.todos.filter( todo => todo.id != id);
        this.guardarLocalStorage();
    }

    marcarCompletado( id ){
        
        for (const todo of this.todos){

            // console.log(id, todo.id);

            if(todo.id == id){
                todo.completado = !todo.completado;
                this.guardarLocalStorage();

                break;
            }
        }
    }

    eliminarCompletados(){
        //* devolviendo los todos que no se encuentren completados
        this.todos = this.todos.filter( todo => !todo.completado );
        this.guardarLocalStorage();
    }

    
    guardarLocalStorage(){
        localStorage.setItem( 'todo', JSON.stringify( this.todos ) );
    }

    cargarLocalStorage(){

        this.todos = ( localStorage.getItem('todo') ) 
            ? JSON.parse( localStorage.getItem( 'todo' ) ) 
            : [];

        // if( localStorage.getItem( 'todo' ) ){

        //     this.todos = JSON.parse( localStorage.getItem( 'todo' ) );

        //     console.log( 'En localStorage', this.todos );

        // } else {
        //     this.todos = [];
        // }

        //* recorriendo los elementos del arreglo principal y genera otro nuevo
        //* el primer argumento se manda a la función 
        this.todos = this.todos.map( Todo.fromJson ); 

    }

}

