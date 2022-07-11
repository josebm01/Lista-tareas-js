export class Todo {

    //* se crea el método para poder hacer una instancia de la clase y poder recuperar sus métodos, ya que solo tiene las propiedades   
    static fromJson({ id, tarea, completado, creado }){
        const tempTodo = new Todo( tarea );

        tempTodo.id = id;
        tempTodo.completado = completado;
        tempTodo.creado = creado;

        return tempTodo;   
    }   

    constructor( tarea ){
        this.tarea = tarea;

        this.id = new Date().getTime();
        this.completado = false;
        this.creado = new Date();
    }

    imprimirClase(){
        console.log(`${ this.tarea } - ${ this.id }`);
    }

}