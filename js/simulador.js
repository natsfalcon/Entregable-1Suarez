//M. Natasha Suarez Falcon

const AHORRO_RECOMENDADO = 0.2;


const categoriasGastos = ["Gastos fijos", "Gastos variables"];


function pedirMonto(mensaje) {
  let monto = Number(prompt(mensaje));
  return monto;
}


function calcularBalance(ingreso, gastosTotales) {
  let balance = ingreso - gastosTotales;
  let mensaje = "Resultado del balance mensual:\n\n";

  if (balance > 0) {
    mensaje += "Tienes un ahorro de $" + balance;
  } else if (balance === 0) {
    mensaje += "Estás en equilibrio financiero.";
  } else {
    mensaje += "Tienes un déficit de $" + Math.abs(balance);
  }

  return mensaje;
}


function mostrarResultado(resultado) {
  alert(resultado);
  console.log(resultado);
}


alert("Bienvenido al simulador de balance financiero");

let ingresoMensual = pedirMonto("Ingresa tu ingreso mensual:");

let gastosTotales = 0;
for (let i = 0; i < categoriasGastos.length; i++) {
  let gasto = pedirMonto("Ingresa el monto de " + categoriasGastos[i] + ":");
  gastosTotales += gasto;
}

let resultadoFinal = calcularBalance(ingresoMensual, gastosTotales);
mostrarResultado(resultadoFinal);
