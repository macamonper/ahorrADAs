const BALANCE= document.getElementById ("btn-balance");
const BTN_CATEGORIAS= document.getElementById("btn-categorias");
const REPORTES= document.getElementById("btn-reportes");
const CARD_BALANCE= document.getElementById("card-balance");
const CARD_CATEGORIAS= document.getElementById("card-categorias");
const CARD_REPORTES= document.getElementById("card-reportes");
const BTN_FILTROS= document.getElementById("btn-filtros");
const CARD_FILTROS = document.getElementById("card-filtros");
const selectCategorias=document.querySelector("#select-de-categorias")
const listaCategorias=document.querySelector("#lista-categorias")
const botonAgregarCategoria=document.querySelector("#btn-agregar-categoria")
const inputAgregarCategoria=document.querySelector("#input-agregar-categoria")




//FUNCIONES BASICAS PARA NAVEGAR LA WEB
BALANCE.onclick = () => {
    CARD_CATEGORIAS.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    CARD_BALANCE.classList.remove("is-hidden");
 }
 
BTN_CATEGORIAS.onclick = () => {
    CARD_BALANCE.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    CARD_CATEGORIAS.classList.remove("is-hidden");

 }

REPORTES.onclick= () => {
    CARD_BALANCE.classList.add("is-hidden");
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

//SECCION AGREGAR CATEGORIAS 
//AGREGAR CATEGORIAS AL SELECT OPERACIONES
//GUARDAR CATEGORIAS EN LS

//CATEGORIAS PRECARGADAS

const categorias=[]
//"Comida", "Servicios", "Salidas", "Educacion, Transporte", "Trabajo"

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

    selectCategorias.innerHTML = categoriasString
}

const agregarCategoriasAHTML = () => {
    const categorias = obtenerCategorias()
    const categoriasAHTML = categorias.reduce((acc, categoria, index) => {
        return acc + `
        <div class="columns is-vcentered">
        <div class="column">
            <span class="tag is-primary is-light">${categoria}</span>
        </div>

        <div class="column is-narrow">
            <button id=btn-editar-${index} class="button is-ghost is-size-7">Editar</button>
            <button id=btn-borrar-${index} class="button is-ghost is-size-7">Eliminar</button>

        </div>

       `
    }, "")
    listaCategorias.innerHTML = categoriasAHTML
}

agregarCategoriasAlSelect()
agregarCategoriasAHTML()

botonAgregarCategoria.onclick=()=>{
    const nuevaCategoria = inputAgregarCategoria.value
    const categorias = obtenerCategorias()
    categorias.push(nuevaCategoria)
    inputAgregarCategoria.value = ""

    const categoriasConvertidasAJSON = JSON.stringify(categorias)
    localStorage.setItem("categorias", categoriasConvertidasAJSON)

    agregarCategoriasAlSelect()
    agregarCategoriasAHTML()
}

