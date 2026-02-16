// M. Natasha Suarez Falcon

const CATEGORIAS = ["Gasto fijo", "Gasto variable"]; // Array 1
const STORAGE_KEY = "balance_historial";

const form = document.getElementById("form");
const ingresoEl = document.getElementById("ingreso");
const fijoEl = document.getElementById("fijo");
const variableEl = document.getElementById("variable");

const resultadoEl = document.getElementById("resultado");
const historialEl = document.getElementById("historial");
const categoriasEl = document.getElementById("categorias");

const btnGuardar = document.getElementById("guardar");
const btnBorrar = document.getElementById("borrar");

let ultimo = null;

function num(el) {
  return Number(el.value);
}

function balance(ingreso, fijo, variable) {
  return ingreso - (fijo + variable);
}

function texto(balance) {
  if (balance > 0) return "Te sobra: $" + balance.toFixed(2);
  if (balance === 0) return "Quedaste en cero.";
  return "Te falta: $" + Math.abs(balance).toFixed(2);
}

function leerHistorial() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const arr = raw ? JSON.parse(raw) : [];
  return Array.isArray(arr) ? arr : [];
}

function guardarHistorial(arr) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(arr));
}

function pintarHistorial() {
  const historial = leerHistorial(); // Array 2
  historialEl.innerHTML = "";

  for (let i = 0; i < historial.length; i++) {
    const r = historial[i];
    const li = document.createElement("li");
    li.textContent =
      "Ingreso $" + r.ingreso.toFixed(2) +
      " | Fijo $" + r.fijo.toFixed(2) +
      " | Variable $" + r.variable.toFixed(2) +
      " | Balance $" + r.balance.toFixed(2);
    historialEl.appendChild(li);
  }
}

function pintarCategorias() {
  categoriasEl.innerHTML = "";
  for (let i = 0; i < CATEGORIAS.length; i++) {
    const li = document.createElement("li");
    li.textContent = CATEGORIAS[i];
    categoriasEl.appendChild(li);
  }
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const ingreso = num(ingresoEl);
  const fijo = num(fijoEl);
  const variable = num(variableEl);

  if (ingreso < 0 || fijo < 0 || variable < 0) {
    resultadoEl.textContent = "No uses números negativos.";
    ultimo = null;
    return;
  }

  const b = balance(ingreso, fijo, variable);
  resultadoEl.textContent = texto(b);

  ultimo = { ingreso, fijo, variable, balance: b };
});

btnGuardar.addEventListener("click", function () {
  if (!ultimo) {
    resultadoEl.textContent = "Primero calcula y luego guarda.";
    return;
  }

  const historial = leerHistorial();
  historial.push(ultimo);
  guardarHistorial(historial);

  pintarHistorial();
  resultadoEl.textContent = "Guardado.";
});

btnBorrar.addEventListener("click", function () {
  localStorage.removeItem(STORAGE_KEY);
  pintarHistorial();
  resultadoEl.textContent = "Historial borrado.";
});

pintarCategorias();
pintarHistorial();
