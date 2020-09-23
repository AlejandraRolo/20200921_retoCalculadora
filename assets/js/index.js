/* DECLARAR ARRAYS */
const operaciones= ['%', 'CE', 'C', '<--', '1/X', 'X^2', 'ƴx', '/', '*', '-', '+', '±', '=']
const numeros= ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0']
let lstHistorialCalcStorage = localStorage.getItem('lstHistorialCalc')===null ? [] : JSON.parse(localStorage.getItem('lstHistorialCalc'));

// obtener controles
const cajaNumeros= document.getElementById('cajaNumeros')
const botones= document.getElementById('botones')
const btnHistorial= document.getElementById('btnHistorial')
const btnHistorialSetet= document.getElementById('btnHistorialSetet')
const cajaDisplay= document.getElementById('cajaDisplay')
const lstHistorial = document.getElementById('lstHistorial')

// variables
let num1= 0
let num2= 0
let numTemp= 0
let resultado= 0
let numeroNuevo= false
let tempOperacion
let reset= false

/* FUNCIONES */

let sumar= (a,b)=> a+b;
let restar= (a,b)=> a-b;
let multiplicar= (a,b)=> a*b;
let dividir= (a,b)=> a/b;

function crearHistorial(){
    let valor= cajaDisplay.innerText + " " + resultado
    let etiqueta_li = document.createElement("li");
    etiqueta_li.innerHTML = valor
    lstHistorial.appendChild(etiqueta_li)

    lstHistorialCalcStorage.push(valor)
    localStorage.setItem('lstHistorialCalc', JSON.stringify(lstHistorialCalcStorage));
}

/*      EVENTOS DE CONTROLES    */

botones.addEventListener("click", (e)=> {
    
    const valorSel= e.target.textContent
    let esNumero = false
    let esOperacion= false
    
    // validar si es numero
    for(let i= 0; i<numeros.length; i++){
        if(valorSel== numeros[i]){
            esNumero= true
        }
    }

    // validar si es operacion
    for(let i= 0; i<operaciones.length; i++){
        if(valorSel== operaciones[i]){
            esOperacion= true
        }
    }

    if(esNumero) {
        cajaDisplay.innerText+= valorSel
        if(num1== 0){
            cajaNumeros.value+= valorSel
            numTemp= cajaNumeros.value
            num1= 0
        }else{
            if(numeroNuevo){
                cajaNumeros.value= ''
            }
            numeroNuevo= false
            cajaNumeros.value+= valorSel
            num2= cajaNumeros.value
        }
    }

    if(esOperacion){
        numeroNuevo= true
        valorSel== "CE" ? reset= true : valorSel== "C" ? reset= true : reset= false
        if(!reset){
            num1= numTemp
            cajaDisplay.innerText+= valorSel
            cajaNumeros.value= ''
            valorSel!= "=" ? tempOperacion= valorSel : tempOperacion
        }else{
            num1= 0
            num2= 0
            numTemp= 0
            resultado= 0
            tempOperacion;
            cajaNumeros.value= ''
            cajaDisplay.innerText= ''
        }
        
        if(num1> 0 && num2> 0){
            switch(valorSel){
                case "+":{
                   
                        //cajaNumeros.value= ''
                    
                    resultado= sumar(parseInt(num1), parseInt(num2))
                    num1= resultado
                    numTemp= resultado
                    cajaNumeros.value= resultado
                }
                break;
                case "-":{
                    resultado= restar(parseInt(num1), parseInt(num2))
                    num1= resultado
                    numTemp= resultado
                    cajaNumeros.value= resultado
                }
                break;
                case "*":{
                    resultado= multiplicar(parseInt(num1), parseInt(num2))
                    num1= resultado
                    numTemp= resultado
                    cajaNumeros.value= resultado
                }
                break;
                case "/":{
                    resultado= dividir(parseInt(num1), parseInt(num2))
                    num1= resultado
                    numTemp= resultado
                    cajaNumeros.value= resultado
                }
                break;
                case "=":{
                    if(tempOperacion== "+"){
                        resultado= sumar(parseInt(num1), parseInt(num2))
                    }
                    if(tempOperacion== "-"){
                        resultado= restar(parseInt(num1), parseInt(num2))
                    }
                    if(tempOperacion== "*"){
                        resultado= multiplicar(parseInt(num1), parseInt(num2))
                    }
                    if(tempOperacion== "/"){
                        resultado= dividir(parseInt(num1), parseInt(num2))
                    }
                    cajaNumeros.value= resultado
                    num1= resultado
                    numTemp= resultado
                    num2= 0
                    crearHistorial()
                }
                break;
            }
        }
    }
})

btnHistorial.addEventListener("click", ()=>{
    lstHistorial.innerText= ''
    if(lstHistorialCalcStorage.length> 0){
        for(let i= 0; i< lstHistorialCalcStorage.length; i++){
            let etiqueta_li = document.createElement("li");
            etiqueta_li.innerHTML = lstHistorialCalcStorage[i]
            lstHistorial.appendChild(etiqueta_li)
        }
    }
})

btnHistorialSetet.addEventListener("click", ()=>{
    localStorage.removeItem('lstHistorialCalc')
    lstHistorial.innerText= ''
})


