//HEADER
const BTN_BALANCE = document.getElementById("btn-balance");
const BTN_CATEGORIAS = document.getElementById("btn-categorias");
const BTN_REPORTES = document.getElementById("btn-reportes");
//CARDS PRINCIPALES
const CARDS_PRINCIPALES = document.getElementById("cards-principales");
const CARD_REPORTES = document.getElementById("card-reportes");
const SIN_OPERACIONES =  document.getElementById("sin-operaciones");
//BALANCE
const BALANCE_GANANCIAS = document.getElementById("balance-ganancias");
const BALANCE_GASTOS = document.getElementById("balance-gastos");
const BALANCE_TOTAL = document.getElementById("balance-total");
//OPERACIONES
const OPERACIONES_CARGADAS = document.querySelector("#operaciones-cargadas");
const LISTA_OPERACIONES = document.querySelector("#listado-operaciones");
const BTN_NUEVA_OPERACION = document.querySelector("#boton-nueva-operacion");
const CARD_NUEVA_OPERACION = document.querySelector("#card-nueva-operacion");
const INPUT_DESCRIPCION = document.querySelector("#descripcion-input");
const MONTO_INPUT = document.querySelector("#monto-input");
const TIPO_INPUT = document.querySelector("#editar-tipo-operacion");
const FECHA_INPUT = document.querySelector("#editar-fecha-input");
const BOTON_CANCELAR_EDICION = document.querySelector("#btn-cancelar-edicion-op");
//CATEGORIAS
const CARD_CATEGORIAS = document.getElementById("card-categorias");
const LISTA_CATEGORIAS = document.querySelector(".lista-categorias");
const INPUT_CATEGORIAS = document.getElementById("input-categorias");
const FORM_AGREGAR_CATEGORIAS = document.querySelector("#form-agregar-categorias");
const CARD_AGREGAR_CATEGORIAS = document.querySelector("#agregar-nuevas-categorias");
const CARD_EDITAR_CATEGORIAS = document.querySelector("#editar-categoria");
const INPUT_EDITAR_CATEGORIAS = document.querySelector("#editar-categoria-input");
const SELECT_CATEGORIAS = document.querySelector("#select-de-categorias");
const CANCELAR_EDITAR_CAT = document.querySelector("#cancelar-categoria-boton");
const SELECT_CATEGORIAS_CARGA = document.querySelector("#select-categorias-carga");
//FILTROS
const CARD_FILTROS = document.getElementById("card-filtros");
const BTN_FILTROS = document.getElementById("btn-filtros");
const FILTRO_TIPO = document.querySelector("#select-ordenar-tipo");
const FILTRO_CATEGORIAS = document.querySelector("#select-de-categorias");
const FILTRO_FECHAS = document.querySelector("#date");
const FILTRO_ORDEN = document.querySelector("#select-ordenar-por");
//RESUMEN
const CAT_MAYOR_GANANCIA = document.getElementById("cat-mayor-ganancia")
const MONTO_MAYOR_GANANCIA = document.getElementById("monto-mayor-ganancia")
const CAT_MAYOR_GASTO = document.getElementById("cat-mayor-gasto")
const MONTO_MAYOR_GASTO = document.getElementById ("monto-mayor-gasto")
const LISTA_TOTALES = document.getElementById("lista-balance-categoria")


//FUNCIONES BASICAS PARA NAVEGAR LA WEB

BTN_BALANCE.onclick = () => {

    CARD_CATEGORIAS.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    CARDS_PRINCIPALES.classList.remove("is-hidden");

    agregarOperacionesAHTML(OPERACIONES_PARA_HTML)
}

BTN_CATEGORIAS.onclick = () => {

    CARDS_PRINCIPALES.classList.add("is-hidden");
    CARD_REPORTES.classList.add("is-hidden");
    CARD_CATEGORIAS.classList.remove("is-hidden");

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
const obtenerOperaciones = () => {

    const operacionesEnLocalStorage = localStorage.getItem("operaciones")
    if (operacionesEnLocalStorage === null) {
        return operaciones
}
    else {
        return JSON.parse(operacionesEnLocalStorage)
    }

}
//CATEGORIAS EXISTENTES

const categorias = ["todos", "comida", "servicios", "salidas", "educacion", "transporte", "trabajo"]


const agregarCatASelects = () => {

    const categorias = obtenerCategorias()

    const categoriasString = categorias.reduce((acc, categoria) => {

        return acc + `<option value=${categoria}>${categoria}</option>`

    }, "")

    SELECT_CATEGORIAS.innerHTML = categoriasString

    const categoriasSinTodos = categorias.filter( categoria => categoria !== "todos") 


    const categoriasSelectOperaciones = categoriasSinTodos.reduce((acc, categoria) => {

        return acc + `<option value=${categoria}>${categoria}</option>`

    }, "")

    SELECT_CATEGORIAS_CARGA.innerHTML = categoriasSelectOperaciones

}


const agregarCategoriasAHTML = () => {

    const categorias = obtenerCategorias()

    const categoriasSinTodos = categorias.filter( categoria => categoria !== "todos") 


    const categoriasAHTML = categoriasSinTodos.reduce((acc, categoria, index) => {

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

FORM_AGREGAR_CATEGORIAS.onsubmit = (e) => {

	e.preventDefault()
	
	const categorias = obtenerCategorias()

	let nuevaCategoria = INPUT_CATEGORIAS.value


   if (categorias.indexOf(nuevaCategoria) === -1 ){
		
    categorias.push(nuevaCategoria)

		INPUT_CATEGORIAS.value = ""

		guardarEnLocalStorage("categorias", categorias)

		agregarCatASelects()
		
		agregarCategoriasAHTML(OPERACIONES_PARA_HTML)
		
	}
	else if (nuevaCategoria = nuevaCategoria){

		alert("Esa categoria ya existe. Por favor ingresa otro nombre.")
	}
}

agregarCatASelects()
agregarCategoriasAHTML()


const editarCategoria = (categoria) => {

    CARD_EDITAR_CATEGORIAS.classList.remove("is-hidden")
    CARD_AGREGAR_CATEGORIAS.classList.add("is-hidden")
    LISTA_CATEGORIAS.classList.add("is-hidden")
    INPUT_EDITAR_CATEGORIAS.value = categoria

    CARD_EDITAR_CATEGORIAS.onsubmit = (e) => {

        e.preventDefault()
        const categorias = obtenerCategorias()

        if (categorias.indexOf(INPUT_EDITAR_CATEGORIAS.value) === -1 ||
         categoria === INPUT_EDITAR_CATEGORIAS.value) {

            const indice = categorias.indexOf(categoria)

            categorias[indice] = INPUT_EDITAR_CATEGORIAS.value

            guardarEnLocalStorage("categorias", categorias)

            agregarCategoriasAHTML()

            agregarCatASelects()

            CARD_EDITAR_CATEGORIAS.classList.add("is-hidden")
            CARD_AGREGAR_CATEGORIAS.classList.remove("is-hidden")
            LISTA_CATEGORIAS.classList.remove("is-hidden")
        }
        else if (INPUT_EDITAR_CATEGORIAS.value = categoria){
        
            alert("Esa categoria ya existe. Por favor ingresa otro nombre.")
        }
    }
}

const eliminarCategoria = (categoria) => {

    const categorias = obtenerCategorias()
    const categoriasFiltradas=categorias.filter((elemento) => {
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

//SECCION OPERACIONES

const operaciones = []

const OPERACIONES_PARA_HTML = obtenerOperaciones()

BTN_NUEVA_OPERACION.onclick = () => {
    
    mostrarFormOperaciones()
    
}
const agregarOperacionesAHTML = (arr) => {
    
    const operacionesAHTML = arr.reduce((acc, elemento, index) => {

        return acc + `
        <div class="columns">
            <div class="column is-3 ">
                <p class="has-text-weight-semibold">
                    ${elemento.descripcion}
                </p>
            </div>
            <div class="column is-2 ">
                <span class ="tag is-primary is-light">
                    ${elemento.categoria}
                </span>
            </div>
            <div class="column is-3 has-text-grey has-text-centered">   
                ${new Date(elemento.fecha).toLocaleDateString("es-AR",{timeZone:"UTC"})}
            </div>
            <div class="column is-2 has-text-weight-bold ${elemento.tipo === "ganancia"
            ? 'has-text-success'
            : 'has-text-danger'}">

                ${elemento.tipo === "ganancia" ? '+' : '-'}$${
                elemento.monto
              }
            </div>
            <div class="column is-2 has-text-right">
                <button onclick='mostrarFormOperaciones(${JSON.stringify(elemento)},${index})' id=editar-operacion-${index} class="button is-small is-ghost pr-5">Editar</button>
                <button onclick='eliminarOperacion(${index})' id=eliminar-operacion-${index} class="button is-small is-ghost">Eliminar</button>
            </div>
        </div>
        `
    }, "")

    LISTA_OPERACIONES.innerHTML = operacionesAHTML
    
    if (operacionesAHTML.length > 0) {
        OPERACIONES_CARGADAS.classList.remove("is-hidden")
        LISTA_OPERACIONES.classList.remove("is-hidden")
        SIN_OPERACIONES.classList.add("is-hidden")
    }
    else {
        OPERACIONES_CARGADAS.classList.add("is-hidden")
        LISTA_OPERACIONES.classList.add("is-hidden")
        SIN_OPERACIONES.classList.remove("is-hidden")
    }
}
//FECHA ACTUAL
Date.prototype.toDateInputValue = ( function() {
    const local = new Date(this);
    return local.toJSON().slice(0,10);
});

FECHA_INPUT.value = new Date().toDateInputValue();
FILTRO_FECHAS.value = new Date().toDateInputValue();

const mostrarFormOperaciones = (operacion, indice) => {

    OPERACIONES_CARGADAS.classList.add("is-hidden")
    CARDS_PRINCIPALES.classList.add("is-hidden")
    CARD_NUEVA_OPERACION.classList.remove("is-hidden")


    if (operacion) {
        INPUT_DESCRIPCION.value = operacion.descripcion
        MONTO_INPUT.value = operacion.monto
        TIPO_INPUT.value = operacion.tipo
        SELECT_CATEGORIAS_CARGA.value = operacion.categoria
        FECHA_INPUT.value = operacion.fecha
    }

    CARD_NUEVA_OPERACION.onsubmit = (e) => {

        const nuevaOperacion = {
            descripcion: INPUT_DESCRIPCION.value,
            monto:Number(MONTO_INPUT.value),
            tipo: TIPO_INPUT.value,
            categoria: SELECT_CATEGORIAS_CARGA.value,
            fecha:FECHA_INPUT.value,

        }

        const operaciones = obtenerOperaciones()

        if (indice > -1) {
            operaciones[indice] = nuevaOperacion

        }
        else {

            operaciones.push(nuevaOperacion)
        }

        CARD_NUEVA_OPERACION.reset()

        guardarEnLocalStorage("operaciones", operaciones)

        CARD_NUEVA_OPERACION.classList.add("is-hidden")
        CARDS_PRINCIPALES.classList.remove("is-hidden")

        agregarOperacionesAHTML(operaciones)
    }
}
agregarOperacionesAHTML(OPERACIONES_PARA_HTML)

BTN_NUEVA_OPERACION.onclick = () => {
    mostrarFormOperaciones()
    
}

const eliminarOperacion=(index)=>{

    OPERACIONES_PARA_HTML.splice(index,1)

    guardarEnLocalStorage("operaciones", operaciones)

    agregarOperacionesAHTML(OPERACIONES_PARA_HTML)

    CARD_NUEVA_OPERACION.classList.add("is-hidden")

    CARDS_PRINCIPALES.classList.remove("is-hidden")

    agregarOperacionesAHTML(OPERACIONES_PARA_HTML)

    balance(OPERACIONES_PARA_HTML)

}

BOTON_CANCELAR_EDICION.onclick = () => {
    CARD_NUEVA_OPERACION.classList.add("is-hidden")
    CARDS_PRINCIPALES.classList.remove("is-hidden")
    agregarOperacionesAHTML(OPERACIONES_PARA_HTML)

}

agregarCatASelects()

// FUNCIONES PARA FILTROS

let operacionesAFiltrar = obtenerOperaciones()

const aplicarFiltros = () => {

    const tipoFiltro = FILTRO_TIPO.value

    const filtradoPorTipo = operacionesAFiltrar.filter((operacion) => {
        if (tipoFiltro === "todos") {
            return operacion
        }
        return operacion.tipo === tipoFiltro
    })

    const categoriaFiltro = FILTRO_CATEGORIAS.value

    const filtradoPorCategoria = filtradoPorTipo.filter((operacion) => {
        if (categoriaFiltro === "todos") {
            return operacion
        }
        return operacion.categoria === categoriaFiltro
    })

    const fechaFiltro = FILTRO_FECHAS.value
    const filtradoPorFechas = filtradoPorCategoria.filter((operacion) => {
        if (fechaFiltro === null) {
            return operacion
        }
        return operacion.fecha >= fechaFiltro
    })

    const ordenFiltro = FILTRO_ORDEN.value
    let copiaFiltradoPorFechas = [...filtradoPorFechas]
    


    const filtradoFinal = copiaFiltradoPorFechas.sort((a, b) => {

        let nameA = a.descripcion.toUpperCase()
        let nameB = b.descripcion.toUpperCase()

        if (ordenFiltro === "mas-reciente") {
            return new Date(b.fecha) - new Date(a.fecha)    
        }

        else if (ordenFiltro === "menos-reciente") {
            return new Date(a.fecha) - new Date(b.fecha)
        }

        else if (ordenFiltro === "mayor-monto") {
            return b.monto - a.monto
        }

        else if (ordenFiltro === "menor-monto") {
            return a.monto - b.monto
        }

        else if (ordenFiltro === "a-z" && nameA < nameB) {
            
            return -1
        }

        else if (ordenFiltro === "z-a" && nameA > nameB) {
            return -1
        }

    })

  return filtradoFinal

}


FILTRO_FECHAS.onchange = () => {

    const arrayFiltrado = aplicarFiltros()
   
    agregarOperacionesAHTML(arrayFiltrado)
    balance(arrayFiltrado)


}


FILTRO_TIPO.onchange = () => {
    const arrayFiltrado = aplicarFiltros()

    agregarOperacionesAHTML(arrayFiltrado)
    balance(arrayFiltrado)

    
}

FILTRO_CATEGORIAS.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    

    agregarOperacionesAHTML(arrayFiltrado)
    balance(arrayFiltrado)

    
}


FILTRO_ORDEN.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    
    agregarOperacionesAHTML(arrayFiltrado)


}
// BALANCE //

let operacionesBalance = obtenerOperaciones();

const balance = (arr) => { 

    const gastos = arr.filter((elemento) =>{
        return elemento.tipo ==="gasto"
    })

    const ganancias = arr.filter ((elemento) =>{
        return elemento.tipo ==="ganancia"
    })

   const sumaGastos = gastos.reduce ((acc,elemento) =>{
       return acc + elemento.monto
   },0)

   const sumaGanancias = ganancias.reduce ((acc,elemento) =>{
    return acc + elemento.monto
   },0)

   const total = sumaGanancias - sumaGastos


    BALANCE_GANANCIAS.innerHTML = sumaGanancias
    BALANCE_GASTOS.innerHTML = sumaGastos
    
    if(total < 0){
        BALANCE_TOTAL.innerHTML = `${total}`

        BALANCE_TOTAL.classList.remove("has-text-success")

        BALANCE_TOTAL.classList.add("has-text-danger")
    }
    if(total >= 0 ){
        BALANCE_TOTAL.innerHTML = `+${total}`

        BALANCE_TOTAL.classList.remove("has-text-danger")

        BALANCE_TOTAL.classList.add("has-text-success")
    }


}
balance(operacionesBalance)


//REPORTES

const operacionesReportes = obtenerOperaciones()
const categoriasReportes = obtenerCategorias()

const operacionesGanancias = operacionesReportes.filter((operacion) =>{
    return operacion.tipo ==="ganancia"
})


const mayorGanancia = operacionesGanancias.reduce(function (acc, operacion) {
    return ( acc.monto > operacion.monto) ? acc : operacion
}) 

MONTO_MAYOR_GANANCIA.innerHTML = `+$${mayorGanancia.monto}`
CAT_MAYOR_GANANCIA.innerHTML = mayorGanancia.categoria


const operacionesGastos = operacionesReportes.filter ((operacion) =>{
    return operacion.tipo === "gasto"
})

const mayorGasto = operacionesGastos.reduce(function (acc, operacion) {
    return ( acc.monto > operacion.monto) ? acc : operacion
}) 

MONTO_MAYOR_GASTO.innerHTML = `-$${mayorGasto.monto}`
CAT_MAYOR_GASTO.innerHTML = mayorGasto.categoria

   
let operacionPorCategoria = []

const separarPorCategoria = () => {
  
    categoriasReportes.map((categoria) => {
        operacionPorCategoria.push([])
    })
  
   operacionesReportes.map((operacion) => {
            const indiceCategoria = categoriasReportes.indexOf(operacion.categoria)
            operacionPorCategoria[indiceCategoria].push(operacion)
    })
}
separarPorCategoria()


const operacionesBalanceParaHTML = operacionPorCategoria.map((arrayPorCategoria)=>{

    let gananciaBalance = 0 ;
    let gastosBalance = 0;
    let totalBalance = 0;
    let categoria = "";
    for ( const operacion of arrayPorCategoria){

        categoria = operacion.categoria

        if(operacion.tipo == "ganancia"){
            gananciaBalance += operacion.monto
            
        }else{
            gastosBalance += operacion.monto
        }

        totalBalance = gananciaBalance - gastosBalance
    }

return {
        nombre: categoria,
        gananciaBalance,
        gastosBalance,
        totalBalance,
    }
    
})

const operacionesBalanceAHTML = operacionesBalanceParaHTML.reduce((acc,operacion) => {

    return acc + `
    <div class="columns">
        <div class="column has-text-weight-semibold">${operacion.nombre}</div>
        <div class="column has-text-success has-text-right">$+${operacion.gananciaBalance}</div>
        <div class="column has-text-danger has-text-right ">$-${operacion.gastosBalance}</div>
        <div class="column has-text-right">${operacion.totalBalance > 0 ? "+" : ""}$${operacion.totalBalance}</div>
    </div>
    `
},"")

LISTA_TOTALES.innerHTML = operacionesBalanceAHTML



//CATEGORIA MAYOR GANANCIA
const copia1= [...operacionesBalanceParaHTML]
 copia1.sort((a,b)=>{

    return b.gananciaBalance - a.gananciaBalance
})

console.log(copia1)

//CATEGORIA MAYOR GASTO
const copia2= [...operacionesBalanceParaHTML]

 copia2.sort((a,b)=>{
     
    return b.gastosBalance - a.gastosBalance
}) 
console.log(copia2)


//CATEGORIA CON MAYOR BALANCE

const copia3= [...operacionesBalanceParaHTML]

 copia3.sort((a,b)=>{
     return b.totalBalance-a.totalBalance
 })
 console.log(copia3)

