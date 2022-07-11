import './styles.css';
import { Todo, TodoList} from './classes'; //* busca el index de la carpeta donde se encuentran todos las importaciones
import { crearTodoHTML } from './js/funciones';
// import { Todo } from './classes/todo.class';
// import { TodoList } from './classes/todo-list.class';

export const todoList = new TodoList(); //* Se exporta para poder utilizarlo en el archivo de funciones.js

//* como solo se manda un solo argumento se puede obviar haciendo referencia a  la función 
// -todoList.todos.forEach( todo => crearTodoHTML( todo ));
todoList.todos.forEach( crearTodoHTML );
console.log( 'todos', todoList.todos );




// ------------- Accediendo a métodos de los Todos ----------------
// const newTodo = new Todo('Aprender JavaScript');
// -todoList.nuevoTodo( newTodo );
// -todoList.todos[0].imprimirClase();



// ---------------------- Instancia de la clase de prueba -----------------------------
// const tarea1 = new Todo('Aprender JavaScript');
// // tarea1.completado = true;
// -todoList.nuevoTodo( tarea1 );
// crearTodoHTML( tarea1 );

// console.log( todoList );
