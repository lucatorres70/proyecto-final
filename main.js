const input_tareas = document.querySelector(".input_tareas");
const filtros = document.querySelectorAll(".filtros");
const borrar_btn = document.querySelector(".borrar_btn");
const lista_tareas = document.querySelector(".lista_tareas");

let editar = false;
let tarea_editada = false;

let lista = JSON.parse(localStorage.getItem("to_do_list"));



filtros.forEach(btn => {
    btn.addEventListener("click", () => {
        document.querySelector("span.activas").classList.remove("active");
        btn.classList.add("activas");
        mostrar_to_do(btn.id);
    })
})


function mostrar_to_do(filtro) {
    let li = "";
    if(lista) {
        lista.forEach((todo, id) => {
            let completada = todo.status == "completadas" ? "completadasi" : "";
            if(filtro == todo.status || filtro == "todas") {
                li += `
                <li class="tarea">
                    <label for="${id}">
                        <input type="checkbox" id="1">
                        <p class="${completada}}">${todo.name}</p>
                    </label>
                    <div class="opciones">
                        <i class="uil uil-ellipsis-h"></i>
                        <ul class="menu_tareas">
                            <li> <i class="uil uil-pen">Editar</i></li>
                            <li> <i class="uil uil-trash">Eliminar</i></li>
                        </ul>
                    </div>
                </li>`
            }
        })
    }
    lista_tareas.innerHTML = li || `<span>No hay ninguna tarea aca</span>`;
    let tareas = lista_tareas.querySelectorAll(".task");
    !tareas.length ? borrar_btn.classList.remove("activas") : borrar_btn.classList.add("activas")
}