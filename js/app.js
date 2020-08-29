// Variables
const carrito = document.getElementById('carrito');
const cursos = document.getElementById('lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');



// Listeners
cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se presiona "Agregar Carrito"
    cursos.addEventListener('click', comprarCurso);

    // Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // al cargar el documento, mostrar localstorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Funciones
// Funcion que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    // Delegation para agregar carrito
    if(e.target.classList.contains('agregar-carrito')) {
        const curso = e.target.parentElement.parentElement;
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);

    }

    if(e.target.classList.contains('agregar-carrito')) {
        const precioCurso = document.querySelector('.precio span'). textContent;

        sumarcursos = Number(precioCurso) + 1;

        console.log(sumarcursos);
    }

}


// Lee los datos del curso 
function leerDatosCurso(curso) {
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span'). textContent,
        id: curso.querySelector('a').getAttribute('data-id')
    }

    insertarCarrito(infoCurso);
}

// Muestra el curso seleccionado en el carrito
function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}
// Elimina el surso del carrito en el dom
function eliminarCurso(e) {
    e.preventDefault();

    let curso,
        cursoId;
    if(e.target.classList.contains('borrar-curso') ) {
        e.target.parentElement.parentElement.remove();
        curso = e.target.parentElement.parentElement;
        cursoId = curso.querySelector('a').getAttribute('data-id');
    }
    eliminarCursoLocalStorage(cursoId);
}
// Elimina los cursos del carrito en el Dom
function vaciarCarrito() {
    while(listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    
    // Vaciar localStorage
    vaciarLocalStorage();

    return false;
}

// Almacenar cursos en el carrito a local storage
function guardarCursoLocalStorage(curso) {
    let cursos;
    // toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();

    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos) );
}

// Comprueba que haya elementos en el localStorage
function obtenerCursosLocalStorage() {
    let cursosLS;

    //Comprobamos si hay algo en localStorage
    if(localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse( localStorage.getItem('cursos') );
    }
    return cursosLS;
}

// imprime los cursos de local storage en el carrito 
function leerLocalStorage() {
    let cursosLS;

    cursosLS = obtenerCursosLocalStorage();

    cursosLS.forEach(function(curso){
        // construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);

    });
}

// Elimina el curso por el id del local storage
function eliminarCursoLocalStorage(curso) {
    let cursosLS;
    // obtener el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    // comparamos el id del curso borrado con los del localStorage
    cursosLS.forEach(function(cursoLS, index) {
        if(cursoLS.id == curso) {
            cursosLS.splice(index, 1);
        }
    });
    // añadir el arreglo actual a storage 
    localStorage.setItem('cursos', JSON.stringify(cursosLS) );
}

// elimina todos los cursos de local storge
function vaciarLocalStorage() {
    localStorage.clear();
}