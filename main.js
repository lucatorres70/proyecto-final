const input_tareas = document.querySelector(".input_tareas input");
const filtros = document.querySelectorAll(".filtros span");
const lista_tareas = document.querySelector(".lista_tareas");
const borrar_btn = document.querySelector(".borrar_btn");
const clima = document.querySelector(".clima");

let editar_id = false;
let tarea_editada = false;
let todos = JSON.parse(localStorage.getItem("todo-list"));



filtros.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.activas").classList.remove("activas");
        btn.classList.add("activas");
        mostrar_lista(btn.id);
    });
});



function mostrar_lista(filtro) {
    let li_tag = "";
    if(todos) {
        todos.forEach((todo, id) => {
            let completadas = todo.status == "completadas" ? "esta_completada" : "";
            if(filtro == todo.status || filtro == "todas") {
                li_tag += `<li class="tarea">
                            <label for="${id}">
                                <input onclick="actualizar_estado(this)" type="checkbox" id="${id}" ${completadas}>
                                <p class="${completadas}">${todo.name}</p>
                            </label>
                            <div class="opciones">
                                <i onclick="mostrar_menu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="menu_tareas">
                                    <li onclick='editar_tarea(${id}, "${todo.name}")'><i class="uil uil-pen"></i>Editar</li>
                                    <li onclick='eliminar_tarea(${id}, "${filtro}")'><i class="uil uil-trash"></i>Eliminar</li>
                                </ul>
                            </div>
                        </li>`;
            }
        });
    }
    lista_tareas.innerHTML = li_tag || `<span>No hay ninguna tarea aca</span>`;
    let tareas = lista_tareas.querySelectorAll(".tarea");
    tareas.length ? borrar_btn.classList.remove("activas") : borrar_btn.classList.add("activas");
    lista_tareas.offsetHeight >= 300 ? lista_tareas.classList.add("overflow") : lista_tareas.classList.remove("overflow");
}


mostrar_lista("all");
function mostrar_menu(tarea_seleccionada) {
    let menu_div = tarea_seleccionada.parentElement.lastElementChild;
    menu_div.classList.add("mostrar");
    document.addEventListener("click", e => {
        if(e.target.tagName != "I" || e.target != tarea_seleccionada) {
            menu_div.classList.remove("mostrar");
        }
    });
}


function actualizar_estado(tarea_seleccionada) {
    let tarea_nombre = tarea_seleccionada.parentElement.lastElementChild;
    if(tarea_seleccionada.checked) {
        tarea_nombre.classList.add("esta_completada");
        todos[tarea_seleccionada.id].status = "completadas";
    } else {
        tarea_nombre.classList.remove("esta_completada");
        todos[tarea_seleccionada.id].status = "pendientes";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos))
}


function editar_tarea(id_tarea, texto_nombre) {
    editar_id = id_tarea;
    tarea_editada = true;
    input_tareas.value = texto_nombre;
    input_tareas.focus();
    input_tareas.classList.add("activas");
}


function eliminar_tarea(id_borrada, filtro) {
    tarea_editada = false;
    todos.splice(id_borrada, 1);
    localStorage.setItem("todo-list", JSON.stringify(todos));
    mostrar_lista(filtro);
}


borrar_btn.addEventListener("click", function() {
    Swal.fire({
        title: '¿Desea eliminar todas las tareas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
 
        if (result.isConfirmed) {
            tarea_editada = false;
            todos.splice(0, todos.length);
            localStorage.setItem("todo-list", JSON.stringify(todos));
            mostrar_lista()
        }
    })
});


input_tareas.addEventListener("keyup", e => {
    let nueva_tarea = input_tareas.value.trim();
    if(e.key == "Enter" && nueva_tarea) {
        if(!tarea_editada) {
            todos = !todos ? [] : todos;
            let tarea_info = {name: nueva_tarea, status: "pendientes"};
            todos.push(tarea_info);
        } else {
            tarea_editada = false;
            todos[editar_id].name = nueva_tarea;
        }
        input_tareas.value = "";
        localStorage.setItem("todo-list", JSON.stringify(todos));
        mostrar_lista(document.querySelector("span.activas").id);
    }
});


fetch("https://api.openweathermap.org/data/2.5/weather?q=Haedo&appid=49c520d24704949f366bf8d5552ff87f")
    .then( response => response.json())
    .then( data => {
        temperatura = data.main.temp - 273+"°";
        clima.innerHTML = `<p>Haedo ${temperatura}</p>`
    });