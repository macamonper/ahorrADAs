const BALANCE= document.getElementById ("btn-balance");
const CATEGORIAS= document.getElementById("btn-categorias");
const REPORTES= document.getElementById("btn-reportes");
const CARD_BALANCE= document.getElementById("card-balance");
const CARD_CATEGORIAS= document.getElementById("card-categorias");
const CARD_REPORTES= document.getElementById("card-reportes");
const BTN_FILTROS= document.getElementById("btn-filtros");
const CARD_FILTROS = document.getElementById("card-filtros");


BALANCE.onclick = () => {
    CARD_CATEGORIAS.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    CARD_BALANCE.classList.remove("is-hidden");
 }
 
CATEGORIAS.onclick = () => {
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

    