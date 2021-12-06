//HEADER
const btn_balance = document.getElementById("btn-balance");
const btn_categorias = document.getElementById("btn-categorias");
const btn_reportes = document.getElementById("btn-reportes");
const menu_hamburguesa = document.getElementById("menu-hamburguesa")
const menu_nav = document.getElementById("menu-nav")
//CARDS PRINCIPALES
const cards_principales = document.getElementById("cards-principales");
const card_reportes = document.getElementById("card-reportes");
const sin_operaciones =  document.getElementById("sin-operaciones");
//BALANCE
const balance_ganancias = document.getElementById("balance-ganancias");
const balance_gastos = document.getElementById("balance-gastos");
const balance_total = document.getElementById("balance-total");
//OPERACIONES
const operaciones_cargadas = document.querySelector("#operaciones-cargadas");
const lista_operaciones = document.querySelector("#listado-operaciones");
const btn_nueva_operacion = document.querySelector("#boton-nueva-operacion");
const card_nueva_operacion = document.querySelector("#card-nueva-operacion");
const input_descripcion = document.querySelector("#descripcion-input");
const monto_input = document.querySelector("#monto-input");
const tipo_input = document.querySelector("#editar-tipo-operacion");
const fecha_input = document.querySelector("#editar-fecha-input");
const btn_cancelar_edicion = document.querySelector("#btn-cancelar-edicion-op");
//CATEGORIAS
const card_categorias = document.getElementById("card-categorias");
const lista_categorias = document.querySelector(".lista-categorias");
const input_categorias = document.getElementById("input-categorias");
const form_agregar_categorias = document.querySelector("#form-agregar-categorias");
const card_agregar_categorias = document.querySelector("#agregar-nuevas-categorias");
const card_editar_categorias = document.querySelector("#editar-categoria");
const input_editar_categorias = document.querySelector("#editar-categoria-input");
const select_categorias = document.querySelector("#select-de-categorias");
const cancelar_editar_cat = document.querySelector("#cancelar-categoria-boton");
const select_cat_carga = document.querySelector("#select-categorias-carga");
//FILTROS
const card_filtros = document.getElementById("card-filtros");
const btn_filtros = document.getElementById("btn-filtros");
const filtro_tipo = document.querySelector("#select-ordenar-tipo");
const filtro_categorias = document.querySelector("#select-de-categorias");
const filtro_fechas = document.querySelector("#date");
const filtro_orden = document.querySelector("#select-ordenar-por");
//RESUMEN
const cat_mayor_ganancia = document.getElementById("cat-mayor-ganancia")
const monto_mayor_ganancia = document.getElementById("monto-mayor-ganancia")
const cat_mayor_gasto = document.getElementById("cat-mayor-gasto")
const monto_mayor_gasto = document.getElementById ("monto-mayor-gasto")
const lista_totales = document.getElementById("lista-balance-categoria")
const categoria_mayor_balance = document.querySelector("#categoria-mayor-balance");
const monto_categoria_mayor_balance = document.querySelector("#monto-categoria-mayor-balance");
const mayor_ganancia_html = document.querySelector("#mes-mayor-ganancia")
const monto_mes_mayor_ganancia = document.querySelector("#monto-mes-mayor-ganancia")
const mes_mayor_gasto_html = document.querySelector("#mes-mayor-gasto")
const monto_mes_mayor_gasto = document.querySelector("#monto-mes-mayor-gasto")


//FUNCIONES BASICAS PARA NAVEGAR LA WEB

menu_hamburguesa.onclick = () => {
    menu_hamburguesa.classList.toggle("is-active");
    menu_nav.classList.toggle("is-active");
    btn_balance.classList.toggle("button");
    btn_categorias.classList.toggle("button")
    btn_reportes.classList.toggle("button")

  };



btn_balance.onclick = () => {

    card_categorias.classList.add("is-hidden");
    card_reportes.classList.add("is-hidden");
    cards_principales.classList.remove("is-hidden");

    agregarOperacionesAHTML(operacionesParaHTML)
}

btn_categorias.onclick = () => {

    cards_principales.classList.add("is-hidden");
    card_reportes.classList.add("is-hidden");
    card_categorias.classList.remove("is-hidden");

}

btn_reportes.onclick= () => {

    cards_principales.classList.add("is-hidden");
    card_categorias.classList.add("is-hidden");
    card_reportes.classList.remove("is-hidden");
}

btn_filtros.onclick = () => {

    if (btn_filtros.innerHTML=== "Mostrar filtros"){
        btn_filtros.innerHTML = "Ocultar filtros"
        card_filtros.classList.remove("is-hidden");
    }else{
        btn_filtros.innerHTML = "Mostrar filtros"
        card_filtros.classList.add("is-hidden");
    }
}

//LOCAL STORAGE
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

    select_categorias.innerHTML = categoriasString

    const categoriasSinTodos = categorias.filter( categoria => categoria !== "todos") 


    const categoriasSelectOperaciones = categoriasSinTodos.reduce((acc, categoria) => {

        return acc + `<option value=${categoria}>${categoria}</option>`

    }, "")

    select_cat_carga.innerHTML = categoriasSelectOperaciones

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

    lista_categorias.innerHTML = categoriasAHTML;
 

}

form_agregar_categorias.onsubmit = (e) => {

	e.preventDefault()
	
	const categorias = obtenerCategorias()

	let nuevaCategoria = input_categorias.value


   if (categorias.indexOf(nuevaCategoria) === -1 ){
		
    categorias.push(nuevaCategoria)

		input_categorias.value = ""

		guardarEnLocalStorage("categorias", categorias)

		agregarCatASelects()
		
		agregarCategoriasAHTML(operacionesParaHTML)
		
	}
	else if (nuevaCategoria = nuevaCategoria){

		alert("Esa categoria ya existe. Por favor ingresa otro nombre.")
	}
}

agregarCatASelects()
agregarCategoriasAHTML()


const editarCategoria = (categoria) => {

    card_editar_categorias.classList.remove("is-hidden")
    card_agregar_categorias.classList.add("is-hidden")
    lista_categorias.classList.add("is-hidden")
    input_editar_categorias.value = categoria

    card_editar_categorias.onsubmit = (e) => {

        e.preventDefault()
        const categorias = obtenerCategorias()

        if (categorias.indexOf(input_editar_categorias.value) === -1 ||
         categoria === input_editar_categorias.value) {

            const indice = categorias.indexOf(categoria)

            categorias[indice] = input_editar_categorias.value

            guardarEnLocalStorage("categorias", categorias)

            agregarCategoriasAHTML()

            agregarCatASelects()

            card_editar_categorias.classList.add("is-hidden")
            card_agregar_categorias.classList.remove("is-hidden")
            lista_categorias.classList.remove("is-hidden")
        }
        else if (input_editar_categorias.value = categoria){
        
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

cancelar_editar_cat.onclick=()=>{
    card_editar_categorias.classList.add("is-hidden")
    card_agregar_categorias.classList.remove("is-hidden")
    lista_categorias.classList.remove("is-hidden")

}

//SECCION OPERACIONES

const operaciones = []

const operacionesParaHTML = obtenerOperaciones()


btn_nueva_operacion.onclick = () => {
    
    mostrarFormOperaciones()
    
}
const agregarOperacionesAHTML = (arr) => {
    
    const operacionesAHTML = arr.reduce((acc, elemento, index) => {

        return acc + `
        <div class="columns is-multiline is-mobile is-vcentered">
            <div class="column is-3-tablet is-6-mobile">
                <p class="has-text-weight-semibold">
                    ${elemento.descripcion}
                </p>
            </div>
            <div class="column column is-3-tablet is-6-mobile has-text-right-mobile ">
                <span class ="tag is-primary is-light">
                    ${elemento.categoria}
                </span>
            </div>
            <div class="column is-2-tablet has-text-grey is-hidden-mobile has-text-right-tablet has-text-centered">   
                ${new Date(elemento.fecha).toLocaleDateString("es-AR",{timeZone:"UTC"})}
            </div>
            <div class="column is-2-tablet is-6-mobile has-text-weight-bold has-text-right-tablet is-size-4-mobile ${elemento.tipo === "ganancia"
            ? 'has-text-success'
            : 'has-text-danger'}">
                ${elemento.tipo === "ganancia" ? '+' : '-'}$${
                elemento.monto
              }
            </div>
            <div class="column is-2-tablet is-6-mobile has-text-right">
                <button onclick='mostrarFormOperaciones(${JSON.stringify(elemento)},${index})' id=editar-operacion-${index} class="button is-small is-ghost pr-5">Editar</button>
                <button onclick='eliminarOperacion(${index})' id=eliminar-operacion-${index} class="button is-small is-ghost">Eliminar</button>
            </div>
        </div>
        `
    }, "")

    lista_operaciones.innerHTML = operacionesAHTML
    
    if (operacionesAHTML.length > 0) {
        operaciones_cargadas.classList.remove("is-hidden")
        lista_operaciones.classList.remove("is-hidden")
        sin_operaciones.classList.add("is-hidden")
    }
    else {
        operaciones_cargadas.classList.add("is-hidden")
        lista_operaciones.classList.add("is-hidden")
        sin_operaciones.classList.remove("is-hidden")
    }
}
//FECHA ACTUAL

Date.prototype.toDateInputValue = ( function() {
    const local = new Date(this);
    return local.toJSON().slice(0,10);
});

fecha_input.value = new Date().toDateInputValue();
filtro_fechas.value = new Date().toDateInputValue();


const mostrarFormOperaciones = (operacion, indice) => {

    operaciones_cargadas.classList.add("is-hidden")
    cards_principales.classList.add("is-hidden")
    card_nueva_operacion.classList.remove("is-hidden")


    if (operacion) {
        input_descripcion.value = operacion.descripcion
        monto_input.value = operacion.monto
        tipo_input.value = operacion.tipo
        select_cat_carga.value = operacion.categoria
        fecha_input.value = operacion.fecha
    }

    card_nueva_operacion.onsubmit = (e) => {

        const nuevaOperacion = {
            descripcion: input_descripcion.value,
            monto:Number(monto_input.value),
            tipo: tipo_input.value,
            categoria: select_cat_carga.value,
            fecha:fecha_input.value,

        }

        const operaciones = obtenerOperaciones()

        if (indice > -1) {
            operaciones[indice] = nuevaOperacion

        }
        else {

            operaciones.push(nuevaOperacion)
        }

        card_nueva_operacion.reset()

        guardarEnLocalStorage("operaciones", operaciones)

        card_nueva_operacion.classList.add("is-hidden")
        cards_principales.classList.remove("is-hidden")

        agregarOperacionesAHTML(operaciones)
    }
}
agregarOperacionesAHTML(operacionesParaHTML)


btn_nueva_operacion.onclick = () => {

    mostrarFormOperaciones()
    
}

const eliminarOperacion=(index)=>{

    operacionesParaHTML.splice(index,1)

    guardarEnLocalStorage("operaciones", operacionesParaHTML)

    agregarOperacionesAHTML(operacionesParaHTML)

    card_nueva_operacion.classList.add("is-hidden")

    cards_principales.classList.remove("is-hidden")


    balance(operacionesParaHTML)

}

btn_cancelar_edicion.onclick = () => {

    card_nueva_operacion.classList.add("is-hidden")
    cards_principales.classList.remove("is-hidden")
    agregarOperacionesAHTML(operacionesParaHTML)

}

agregarCatASelects()

// FUNCIONES PARA FILTROS

let operacionesAFiltrar = obtenerOperaciones()

const aplicarFiltros = () => {

    const tipoFiltro = filtro_tipo.value

    const filtradoPorTipo = operacionesAFiltrar.filter((operacion) => {
        if (tipoFiltro === "todos") {
            return operacion
        }
        return operacion.tipo === tipoFiltro
    })

    const categoriaFiltro = filtro_categorias.value

    const filtradoPorCategoria = filtradoPorTipo.filter((operacion) => {
        if (categoriaFiltro === "todos") {
            return operacion
        }
        return operacion.categoria === categoriaFiltro
    })

    const fechaFiltro = filtro_fechas.value
    const filtradoPorFechas = filtradoPorCategoria.filter((operacion) => {
        if (fechaFiltro === null) {
            return operacion
        }
        return operacion.fecha >= fechaFiltro
    })

    const ordenFiltro = filtro_orden.value
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


filtro_fechas.onchange = () => {

    const arrayFiltrado = aplicarFiltros()
   
    agregarOperacionesAHTML(arrayFiltrado)
    balance(arrayFiltrado)

}


filtro_tipo.onchange = () => {
    const arrayFiltrado = aplicarFiltros()

    agregarOperacionesAHTML(arrayFiltrado)
    balance(arrayFiltrado)
    
}

filtro_categorias.onchange = () => {
    const arrayFiltrado = aplicarFiltros()
    
    agregarOperacionesAHTML(arrayFiltrado)
    balance(arrayFiltrado)
    
}


filtro_orden.onchange = () => {
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


    balance_ganancias.innerHTML = `+$${sumaGanancias}`
    balance_gastos.innerHTML = `-$${sumaGastos}`
    
    if(total < 0){
        balance_total.innerHTML = `${total}`

        balance_total.classList.remove("has-text-success")

        balance_total.classList.add("has-text-danger")
    }
    if(total >= 0 ){
        balance_total.innerHTML = `+${total}`

        balance_total.classList.remove("has-text-danger")

        balance_total.classList.add("has-text-success")
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

monto_mayor_ganancia.innerHTML = `+$${mayorGanancia.monto}`
cat_mayor_ganancia.innerHTML = mayorGanancia.categoria


const operacionesGastos = operacionesReportes.filter ((operacion) =>{
    return operacion.tipo === "gasto"
})

const mayorGasto = operacionesGastos.reduce(function (acc, operacion) {
    return ( acc.monto > operacion.monto) ? acc : operacion
}) 

monto_mayor_gasto.innerHTML = `-$${mayorGasto.monto}`
cat_mayor_gasto.innerHTML = mayorGasto.categoria

   
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


for (const operacion of operacionPorCategoria){
    
    if(!operacion.length){

        for (const indice in operacionPorCategoria){

            if(operacion===operacionPorCategoria[indice]){
                operacionPorCategoria.splice(indice,1)
            }
        }

    }
}

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

lista_totales.innerHTML = operacionesBalanceAHTML



//CATEGORIA CON MAYOR BALANCE

const catMayorBalance= [...operacionesBalanceParaHTML]

 catMayorBalance.sort((a,b)=>{

     return b.totalBalance-a.totalBalance

 })

categoria_mayor_balance.innerText = catMayorBalance[0].nombre
monto_categoria_mayor_balance.innerText = `$${catMayorBalance[0].totalBalance}`


// MESES CON MAYOR GASTO Y GANANCIAR
        
let mayor_ganancia = 0
let mes_mayor_ganancia = ""
let mayor_gasto = 0
let mes_mayor_gasto = ""
        
const mesesConMayorGastoYGanancia = operacionesReportes.map((operacion) => {
    if (operacion.tipo === "ganancia") {
        if (operacion.monto > mayor_ganancia) {
            mayor_ganancia = operacion.monto
            mes_mayor_ganancia = operacion.fecha
        }
    }
        
    if (operacion.tipo === "gasto") {
        if (operacion.monto > mayor_gasto) {
            mayor_gasto = operacion.monto
            mes_mayor_gasto = operacion.fecha
        }
    }
})
        
mayor_ganancia_html.innerText = mes_mayor_ganancia
monto_mes_mayor_ganancia.innerText = `$${mayor_ganancia}`
mes_mayor_gasto_html.innerText = mes_mayor_gasto
monto_mes_mayor_gasto.innerText = `-$${mayor_gasto}`
