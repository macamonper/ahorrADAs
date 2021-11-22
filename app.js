const BTN_BALANCE = document.getElementById("btn-balance");
const BTN_CATEGORIAS = document.getElementById("btn-categorias");
const BTN_REPORTES = document.getElementById("btn-reportes");
const CARDS_PRINCIPALES = document.getElementById("cards-principales");


const CARD_CATEGORIAS = document.getElementById("card-categorias");
const CARD_REPORTES = document.getElementById("card-reportes");
const BTN_FILTROS = document.getElementById("btn-filtros");
const CARD_FILTROS = document.getElementById("card-filtros");
const BTN_AGREGAR_CAT = document.getElementById("btn-agregar-cat");
const INPUT_CATEGORIAS = document.getElementById("input-categorias");
const BTN_NUEVA_OPERACION = document.querySelector("#boton-nueva-operacion")


const VISTA_OPERACIONES = document.querySelector("#vista-operaciones-cargadas")

const vistaOperacionesTitulos = document.querySelector("#vista-operaciones-titulos")
const vistaSinOperaciones = document.querySelector("#sin-operaciones")

const CARD_NUEVA_OPERACION = document.querySelector("#form-nueva-operacion")

const SELECT_CATEGORIAS = document.querySelector("#select-de-categorias")
const SELECT_CATEGORIAS_CARGA = document.querySelector("#select-categorias-carga")

const LISTA_CATEGORIAS = document.querySelector(".lista-categorias")
const CARD_EDITAR_CATEGORIAS = document.querySelector("#editar-categoria")
const INPUT_EDITAR_CATEGORIAS = document.querySelector("#editar-categoria-input")
const CANCELAR_EDITAR_CAT = document.querySelector("#cancelar-categoria-boton")
const EDITAR_CATEGORIA = document.querySelector("#editar-categoria-boton")
const CARD_AGREGAR_CATEGORIAS = document.querySelector("#agregar-nuevas-categorias")


const INPUT_DESCRIPCION = document.querySelector("#descripcion-input")
const MONTO_INPUT = document.querySelector("#monto-input")
const TIPO_INPUT = document.querySelector("#editar-tipo-operacion")
const FECHA_INPUT = document.querySelector("#editar-fecha-input")

const listadoOperaciones = document.querySelector("#listado-operaciones")

const formAgregarCategorias = document.querySelector("#form-agregar-categorias")
const secciontitulosDeOperacionesCargadas = document.querySelector("#operaciones-cargadas")

//FUNCIONES BASICAS PARA NAVEGAR LA WEB
BTN_BALANCE.onclick = () => {
    CARD_CATEGORIAS.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    formGuardarOperaciones.classList.add("is-hidden");
    CARDS_PRINCIPALES.classList.remove("is-hidden");
 
    agregarOperacionesAHTML()
}

BTN_CATEGORIAS.onclick = () => {
    CARDS_PRINCIPALES.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    CARD_CATEGORIAS.classList.remove("is-hidden");
    CARD_AGREGAR_CATEGORIAS.classList.remove("is-hidden");
    CARD_EDITAR_CATEGORIAS.classList.add("is-hidden");
    LISTA_CATEGORIAS.classList.remove("is-hidden");
    formGuardarOperaciones.classList.add("is-hidden");

}

BTN_REPORTES.onclick = () => {
    CARDS_PRINCIPALES.classList.add("is-hidden");
    CARD_CATEGORIAS.classList.add("is-hidden");
    CARD_REPORTES.classList.remove("is-hidden");
}

BTN_FILTROS.onclick = () => {
    if (BTN_FILTROS.innerHTML === "Mostrar filtros") {
        BTN_FILTROS.innerHTML = "Ocultar filtros"
        CARD_FILTROS.classList.remove("is-hidden");
    } else {
        BTN_FILTROS.innerHTML = "Mostrar filtros"
        CARD_FILTROS.classList.add("is-hidden");
    }
}

BTN_NUEVA_OPERACION.onclick = () => {
    mostrarFormOperaciones()
}

formAgregarCategorias.onsubmit = (e) => {
    e.preventDefault()
    const nuevaCategoria = INPUT_CATEGORIAS.value
    const categorias = obtenerCategorias()
    if (categorias.indexOf(nuevaCategoria) === -1) {
        categorias.push(nuevaCategoria)
        INPUT_CATEGORIAS.value = ""

        guardarEnLocalStorage("categorias", categorias)
        agregarCategoriasAlSelect()
        agregarCategoriasAHTML()
    }

}

//CATEGORIAS EXISTENTES
const categorias = ["Comida", "Servicios", "Salidas", "Educacion", "Transporte", "Trabajo"]


const guardarEnLocalStorage = (clave, objeto) => {
    const objetoConvertidoAJSON = JSON.stringify(objeto)
    return localStorage.setItem(clave, objetoConvertidoAJSON)

}

const obtenerCategorias = () => {
    const categoriasEnLocalStorage = localStorage.getItem("categorias")
    if (categoriasEnLocalStorage === null) {
        return categorias
    }
    else {
        return JSON.parse(categoriasEnLocalStorage)
    }
}

const agregarCategoriasAlSelect = () => {
    const categorias = obtenerCategorias()
    const categoriasString = categorias.reduce((acc, categoria) => {
        return acc + `<option value=${categoria}>${categoria}</option>`
    }, "")

    SELECT_CATEGORIAS_CARGA.innerHTML = categoriasString
    SELECT_CATEGORIAS.innerHTML = categoriasString
}

const agregarCategoriasAHTML = () => {

    const categorias = obtenerCategorias()

    const categoriasAHTML = categorias.reduce((acc, categoria, index) => {
        return acc + `

        <div class="columns ">

            <div class="column is-9">
                <p class="tag is-primary is-light "> ${categoria} </p>
            </div>
            <div class="column is-1 has-text-right">
                <button onclick="editarCategoria('${categoria}')" id="editar-categorias-${index}" class="button is-ghost is-size-7 m-0">Editar</button>
            </div>

            <div class="column is-2 ">
                <button  onclick="eliminarCategoria('${categoria}')" id="eliminar-categorias-${index}" class="button is-ghost  is-size-7">Eliminar</button>
            </div>

        </div>

       `
    }, "")

    LISTA_CATEGORIAS.innerHTML = categoriasAHTML;


}

agregarCategoriasAlSelect()
agregarCategoriasAHTML()


const editarCategoria = (categoria) => {

    CARD_EDITAR_CATEGORIAS.classList.remove("is-hidden")
    CARD_AGREGAR_CATEGORIAS.classList.add("is-hidden")
    LISTA_CATEGORIAS.classList.add("is-hidden")
    INPUT_EDITAR_CATEGORIAS.value = categoria

    CARD_EDITAR_CATEGORIAS.onsubmit = (e) => {

        e.preventDefault()
        const categorias = obtenerCategorias()
        if (categorias.indexOf(INPUT_EDITAR_CATEGORIAS.value) === -1 || categoria === INPUT_EDITAR_CATEGORIAS.value) {
            const indice = categorias.indexOf(categoria)
            categorias[indice] = INPUT_EDITAR_CATEGORIAS.value
            guardarEnLocalStorage("categorias", categorias)
            agregarCategoriasAHTML()
            agregarCategoriasAlSelect()
            CARD_EDITAR_CATEGORIAS.classList.add("is-hidden")
            CARD_AGREGAR_CATEGORIAS.classList.remove("is-hidden")
            LISTA_CATEGORIAS.classList.remove("is-hidden")
        }
    }
}


const eliminarCategoria = (categoria) => {
    const categorias = obtenerCategorias()
    const categoriasFiltradas = categorias.filter((elemento) => {
        return elemento != categoria
    })
    guardarEnLocalStorage("categorias", categoriasFiltradas)
    agregarCategoriasAHTML()
}

CANCELAR_EDITAR_CAT.onclick = () => {
    CARD_EDITAR_CATEGORIAS.classList.add("is-hidden")
    CARD_AGREGAR_CATEGORIAS.classList.remove("is-hidden")
    LISTA_CATEGORIAS.classList.remove("is-hidden")
}


//SECCION OPERACIONES

const operaciones = []

const obtenerOperaciones = () => {
    const operacionesEnLocalStorage = localStorage.getItem("operaciones")
    if (operacionesEnLocalStorage === null) {
        return operaciones
    }
    else {
        return JSON.parse(operacionesEnLocalStorage)
    }

}

const agregarOperacionesAHTML = () => {
    const operaciones = obtenerOperaciones()
    const operacionesAHTML = operaciones.reduce((acc, operacion, index) => {
        return acc + `
        <div class="columns">
        <div class="column is-3">${operacion.descripcion}</div>
        <div class="column is-3">${operacion.categoria}</div>
        <div class="column is-2">${new Date(operacion.fecha).toLocaleDateString("es-AR", {timeZone:"UTC"})}</div>
        <div class="column is-2">${operacion.monto}</div>
        <div class="column is-2">
            <button onclick='mostrarFormOperaciones(${JSON.stringify(operacion)},${index})' id=editar-operacion-${index} class="button is-small is-outlined mb-1">Editar</button>
            <button onclick='eliminarOperacion(${index})' id=eliminar-operacion-${index} class="button is-small   is-outlined">Eliminar</button>
        </div>
    </div>
`
    }, "")
    listadoOperaciones.innerHTML = operacionesAHTML
    if (operaciones.length > 0) {
        vistaSinOperaciones.classList.add("is-hidden")
        listadoOperaciones.classList.remove("is-hidden")
        VISTA_OPERACIONES.classList.remove("is-hidden")
    }
    else {
        vistaSinOperaciones.classList.remove("is-hidden")
        listadoOperaciones.classList.add("is-hidden")
        VISTA_OPERACIONES.classList.add("is-hidden")

    }
}
agregarCategoriasAHTML()


const formGuardarOperaciones = document.querySelector("#form-guardar-operaciones")



agregarOperacionesAHTML()
agregarCategoriasAlSelect()


const tituloFormOperaciones = document.querySelector("#titulo-form-operaciones")

const mostrarFormOperaciones = (operacion, indice) => {
    VISTA_OPERACIONES.classList.add("is-hidden")
    CARDS_PRINCIPALES.classList.add("is-hidden")
    formGuardarOperaciones.classList.remove("is-hidden")

    if (operacion) {
        INPUT_DESCRIPCION.value = operacion.descripcion
        MONTO_INPUT.value = operacion.monto
        TIPO_INPUT.value = operacion.tipo
        SELECT_CATEGORIAS.value = operacion.categoria
        FECHA_INPUT.value = operacion.fecha
    }

    formGuardarOperaciones.onsubmit = (e) => {
        e.preventDefault()
        const nuevaOperacion = {
            descripcion: INPUT_DESCRIPCION.value,
            monto:Number(MONTO_INPUT.value),
            tipo: TIPO_INPUT.value,
            categoria: SELECT_CATEGORIAS.value,
            fecha:FECHA_INPUT.value,

        }
        const operaciones = obtenerOperaciones()

        if (indice > -1) {
            operaciones[indice] = nuevaOperacion

        }
        else {

            operaciones.push(nuevaOperacion)
        }
        formGuardarOperaciones.reset()
        guardarEnLocalStorage("operaciones", operaciones)
        agregarOperacionesAHTML()
        formGuardarOperaciones.classList.add("is-hidden")

        CARDS_PRINCIPALES.classList.remove("is-hidden")

        agregarOperacionesAHTML()


    }
}

const eliminarOperacion=(index)=>{
    const operaciones=obtenerOperaciones()
    operaciones.splice(index,1)
    guardarEnLocalStorage("operaciones", operaciones)
    agregarOperacionesAHTML()
    formGuardarOperaciones.classList.add("is-hidden")

    CARDS_PRINCIPALES.classList.remove("is-hidden")

    agregarOperacionesAHTML()
}

const botonCancelarForm=document.querySelector("#btn-cancelar")
botonCancelarForm.onclick=()=>{
    formGuardarOperaciones.classList.add("is-hidden")
    CARDS_PRINCIPALES.classList.remove("is-hidden")
    agregarOperacionesAHTML()
}

agregarCategoriasAlSelect()