const BALANCE= document.getElementById ("btn-balance");
const BTN_CATEGORIAS= document.getElementById("btn-categorias");
const REPORTES= document.getElementById("btn-reportes");
const CARD_BALANCE= document.getElementById("card-balance");
const CARD_CATEGORIAS= document.getElementById("card-categorias");
const CARD_REPORTES= document.getElementById("card-reportes");
const BTN_FILTROS= document.getElementById("btn-filtros");
const CARD_FILTROS = document.getElementById("card-filtros");
const BTN_AGREGAR_CAT = document.getElementById("btn-agregar-cat");
const INPUT_CATEGORIAS = document.getElementById("input-categorias");


const botonNuevaOperacion = document.querySelector("#boton-nueva-operacion")
const vistaOperaciones = document.querySelector("#vista-operaciones")
const vistaOperacionesTitulos = document.querySelector("#vista-operaciones-titulos")
const vistaSinOperaciones = document.querySelector("#sin-operaciones")

const formNuevaOperacion = document.querySelector("#form-nueva-operacion")
const selectCategorias = document.querySelector("#select-de-categorias")
const listaCategorias = document.querySelector("#lista-categorias")


const inputDescripcion = document.querySelector("#descripcion-input")
const montoInput = document.querySelector("#monto-input")
const tipoInput = document.querySelector("#editar-tipo-operacion")
const fechaInput = document.querySelector("#editar-fecha-input")

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
//AGREGAR CATEGORIAS

const categorias = ["Alimentos", "Mascotas", "Sueldo", "Transporte"];

    const obtenerCategorias = () =>{
        const catEnLS = localStorage.getItem("categorias")

        if (catEnLS === null){
            return categorias
        
        }
        else{
        return JSON.parse (catEnLS)
        }
    }

const AgregarCategoriasAlSelect = () =>{
    const categorias = obtenerCategorias()

    const categoriasString = categorias.reduce ((acc,categoria) => {
        return acc + `<option value="${categoria}">${categoria}</option>`
    },"")

    INPUT_CATEGORIAS.innerHTML = categoriasString
}

const agregarCategoriasHTML = () => {
    const categorias = obtenerCategorias()
    const lista = document.querySelector("#lista-categorias")

    const categoriasString = categorias.reduce((acc,elemento,index) =>{
        return acc + `
        <div id="lista-categorias" class="columns">
            <div class="column is-9">
                <p class="tag is-primary is-light "> ${elemento}</p>
            </div>
            <div class="column is-1 has-text-right">
                <button class="button is-ghost is-size-7 m-0">Editar</button>

            </div>

            <div class="column is-2 ">
                <button class="button is-ghost  is-size-7">Eliminar</button>

            </div>`
    },"")
}