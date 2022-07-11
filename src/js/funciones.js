import { Todo } from "../classes";
import { todoList, TodoList } from '../index';

//* Referencias al HTML
const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltros     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');


export const crearTodoHTML = ( todo ) => {

    const htmlTodo = `
    <li class=" ${ (todo.completado) ? 'completed' : '' } " data-id="${ todo.id } ">
		<div class="view">
			<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' } >
			<label> ${ todo.tarea } </label>
			<button class="destroy"></button>
		</div>
		<input class="edit" value="Create a TodoMVC template">
	</li>
    `;

    //* Creando el elemento HTML a utilizar
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    //* Se elimina el div que se utilizaba para insertar todo el elemento HTML anterior, lo que se insertará será el primer hijo (<li>)
    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;

}


//! Obtener el texto de la tarea que escribe el usuario
// keyup es cuando presionan y sueltan una tecla
txtInput.addEventListener('keyup', ( event ) => {
    if( event.keyCode === 13 && txtInput.value.length > 0 ){
        // console.log( txtInput.value );

        const nuevoTodo = new Todo( txtInput.value );
        
        todoList.nuevoTodo( nuevoTodo );
        // console.log( todoList );

        crearTodoHTML( nuevoTodo );

        //* Eliminando el texto del input
        txtInput.value = '';
    }

});



//! Saber que elemento se selecciona
divTodoList.addEventListener('click', (event) => {
    const nombreElemento = event.target.localName; // input, label o button
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');    
    // console.log( todoId );

    if( nombreElemento.includes('input') ){ // click en input   
    
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');
    
    } else if ( nombreElemento.includes('button') ){ // se debe eliminar el todo

        todoList.eliminarTodo( todoId );
        //* removimiendolo del html
        divTodoList.removeChild( todoElemento );

    }

    // console.log(todoList);

});


//! Tachar completados
btnBorrar.addEventListener('click', () => {

    todoList.eliminarCompletados();

    //* recorriendo los todos de manera inversa para evitar error con los índices
    for( let i = divTodoList.children.length - 1; i >= 0; i-- ){
        const elemento = divTodoList.children[i];
        // console.log(elemento);

        //* evaluando si el elemento tiene esa clase
        if( elemento.classList.contains('completed') ){
            divTodoList.removeChild( elemento );
        }
    }
});


//! Filtrar en pendientes o completados
ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text;
    if(!filtro ) return;

    //* quitando la clase selected para agregarsela al li de opciones seleccionada
    anchorFiltros.forEach( elem => elem.classList.remove('selected'));
    event.target.classList.add('selected'); 

    //* mostrando los TODOS que se hayan seleccionado
    for( const elemento of divTodoList.children ){
        //* clase de CSS
        elemento.classList.remove('hidden');
        //* estado del elemento actual
        const completado = elemento.classList.contains('completed');

        switch( filtro ){
            case 'Pendientes':
                if( completado ){
                    elemento.classList.add('hidden');
                }
                break;
            
            case 'Completados':
                if( !completado ){
                    elemento.classList.add('hidden');
                }
                break;
        }

        
    }

})