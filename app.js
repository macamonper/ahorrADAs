const BTN_BALANCE= document.getElementById ("btn-balance");
const BTN_CATEGORIAS= document.getElementById("btn-categorias");
const BTN_REPORTES= document.getElementById("btn-reportes");
const CARDS_PRINCIPALES= document.getElementById("cards-principales");
const CARD_CATEGORIAS= document.getElementById("card-categorias");
const CARD_REPORTES= document.getElementById("card-reportes");
const BTN_FILTROS= document.getElementById("btn-filtros");
const CARD_FILTROS = document.getElementById("card-filtros");
const BTN_AGREGAR_CAT = document.getElementById("btn-agregar-cat");
const INPUT_CATEGORIAS = document.getElementById("input-categorias");
const BTN_NUEVA_OPERACION = document.querySelector("#boton-nueva-operacion")

const VISTA_OPERACIONES = document.querySelector("#vista-operaciones")

const vistaOperacionesTitulos = document.querySelector("#vista-operaciones-titulos")
const vistaSinOperaciones = document.querySelector("#sin-operaciones")

const CARD_NUEVA_OPERACION = document.querySelector("#form-nueva-operacion")
const SELECT_CATEGORIAS = document.querySelector("#select-de-categorias")
const LISTA_CATEGORIAS = document.querySelector(".lista-categorias")
const CARD_EDITAR_CATEGORIAS = document.querySelector("#editar-categoria")
const INPUT_EDITAR_CATEGORIAS = document.querySelector("#editar-categoria-input")
const CANCELAR_EDITAR_CAT = document.querySelector("#cancelar-categoria-boton")
const EDITAR_CATEGORIA = document.querySelector("#editar-categoria-boton")
const CARD_AGREGAR_CATEGORIAS =document.querySelector("#agregar-nuevas-categorias")


const INPUT_DESCRIPCION = document.querySelector("#descripcion-input")
const MONTO_INPUT = document.querySelector("#monto-input")
const TIPO_INPUT = document.querySelector("#editar-tipo-operacion")
const FECHA_INPUT = document.querySelector("#editar-fecha-input")

//FUNCIONES BASICAS PARA NAVEGAR LA WEB
BTN_BALANCE.onclick = () => {
    CARD_CATEGORIAS.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    CARDS_PRINCIPALES.classList.remove("is-hidden");
    VISTA_OPERACIONES.classList.remove("is-hidden")
    CARD_NUEVA_OPERACION.classList.add("is-hidden")

 }
 
BTN_CATEGORIAS.onclick = () => {
    CARDS_PRINCIPALES.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    CARD_CATEGORIAS.classList.remove("is-hidden");
    CARD_AGREGAR_CATEGORIAS.classList.remove ("is-hidden");
    CARD_EDITAR_CATEGORIAS.classList.add ("is-hidden");
 }

BTN_REPORTES.onclick= () => {
    CARDS_PRINCIPALES.classList.add("is-hidden");
    CARD_CATEGORIAS.classList.add("is-hidden");
    CARD_REPORTES.classList.remove("is-hidden");
}

BTN_FILTROS.onclick = () => {
    if (BTN_FILTROS.innerHTML=== "Mostrar filtros"){
        BTN_FILTROS.innerHTML = "Ocultar filtros"
        CARD_FILTROS.classList.remove("is-hidden");
    }else{
        BTN_FILTROS.innerHTML = "Mostrar filtros"
        CARD_FILTROS.classList.add("is-hidden");
    }
}

BTN_NUEVA_OPERACION.onclick = () => {
    VISTA_OPERACIONES.classList.add("is-hidden")
    CARD_NUEVA_OPERACION.classList.remove("is-hidden")
    CARDS_PRINCIPALES.classList.add("is-hidden")
    CARD_FILTROS.classList.add("is-hidden")
    CARD_REPORTES.classList.add("is-hidden")
}

BTN_AGREGAR_CAT.onclick = () => {
    const nuevaCategoria = INPUT_CATEGORIAS.value
    const categorias = obtenerCategorias()
    categorias.push(nuevaCategoria)
    INPUT_CATEGORIAS.value = ""

    guardarEnLocalStorage("categorias", categorias)
    agregarCategoriasAlSelect()
    agregarCategoriasAHTML()
}

//CATEGORIAS EXISTENTES
const categorias = ["Comida", "Servicios", "Salidas", "Educacion", "Transporte", "Trabajo"]

//const categoriasConvertidasAJSON = JSON.stringify(categorias)
//localStorage.setItem("categorias", categoriasConvertidasAJSON)

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
    //crearBotonesEliminar()

}

agregarCategoriasAlSelect()
agregarCategoriasAHTML()


const editarCategoria = (categoria) => {

    CARD_EDITAR_CATEGORIAS.classList.remove("is-hidden")
    CARD_AGREGAR_CATEGORIAS.classList.add("is-hidden")
    LISTA_CATEGORIAS.classList.add("is-hidden")
    INPUT_EDITAR_CATEGORIAS.value = categoria

    CARD_EDITAR_CATEGORIAS.onsubmit = (e) => {

        e.preventDefault()//esto hace que no se recargue la pagina, en este caso.
        const categorias = obtenerCategorias()
        const indice = categorias.indexOf(categoria)
        categorias[indice] = INPUT_EDITAR_CATEGORIAS.value
        guardarEnLocalStorage("categorias", categorias)
        agregarCategoriasAHTML()
        CARD_EDITAR_CATEGORIAS.classList.add("is-hidden")
        CARD_AGREGAR_CATEGORIAS.classList.remove("is-hidden")
    }
}


const eliminarCategoria = (categoria) =>{
    const categorias = obtenerCategorias()
    //const indice=categorias.indexOf(categoria) esto se usaria si utilizo slice
    const categoriasFiltradas=categorias.filter((elemento)=>{
        return elemento != categoria
    })
    guardarEnLocalStorage("categorias",categoriasFiltradas)
    agregarCategoriasAHTML()
}

CANCELAR_EDITAR_CAT.onclick=()=>{
    CARD_EDITAR_CATEGORIAS.classList.add("is-hidden")
    CARD_AGREGAR_CATEGORIAS.classList.remove("is-hidden")
    LISTA_CATEGORIAS.classList.remove("is-hidden")

}





    