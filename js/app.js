// SELECTORES
const pacienteInput = document.querySelector("#paciente");
const propietarioInput = document.querySelector("#propietario");
const emailInput = document.querySelector("#email");
const fechaInput = document.querySelector("#fecha");
const sintomasInput = document.querySelector("#sintomas");
const formulario = document.querySelector("#formulario-cita");
const formularioInput = document.querySelector(
  "#formulario-cita input[type='submit']",
);
const contenedorCitas = document.querySelector("#citas");

//EVENTOS
pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);
formulario.addEventListener("submit", submitFormulario);

let editando = false;

//Objeto de cita
const citaObjeto = {
  id: generaId(),
  paciente: "",
  propietario: "",
  email: "",
  fecha: "",
  sintomas: "",
};

//NOTIFICACION DE ERROR
class Notificacion {
  constructor({ texto, tipo }) {
    this.texto = texto;
    this.tipo = tipo;

    this.mostrar();
  }

  mostrar() {
    //CREAR NOTIFICACION
    const alerta = document.createElement("DIV");
    alerta.classList.add(
      "text-center",
      "w-full",
      "p-3",
      "text-white",
      "my-5",
      "alert",
      "uppercase",
      "font-bold",
      "text-sm",
    );

    //ELIMINA ALERTAS DUPLICADAS
    const alertaPrevia = document.querySelector(".alert");
    alertaPrevia?.remove();

    //SI ES DE TIPO ERROR AGREGA UNA CLASE
    this.tipo === "error"
      ? alerta.classList.add("bg-red-500")
      : alerta.classList.add("bg-green-500");

    //MENSAJE DE ERROR
    alerta.textContent = this.texto;

    //INSERTAR EN EL DOM
    formulario.parentElement.insertBefore(alerta, formulario);

    //QUITAR LA ALERTA DESPUES DE 5 SEGUNDOS
    setTimeout(() => {
      alerta.remove();
    }, 5000);
  }
}

class AdmiCitas {
  constructor() {
    this.citas = [];
  }
  agregar(citas) {
    this.citas = [...this.citas, citas];
    this.mostrar();
  }

  editar(citasActualizadas) {
    this.citas = this.citas.map((cita) =>
      cita.id === citasActualizadas.id ? citasActualizadas : cita,
    );
    this.mostrar();
  }
  eliminar(id) {
    this.citas = this.citas.filter((cita) => cita.id !== id);
    this.mostrar();
  }

  mostrar() {
    //LIMPIAR HTML
    while (contenedorCitas.firstChild) {
      contenedorCitas.removeChild(contenedorCitas.firstChild);
    }
    //SI HAY CITAS
    if (this.citas.length === 0) {
      contenedorCitas.innerHTML =
        '<p class="text-xl mt-5 mb-10 text-center">No Hay Pacientes</p>';
      return;
    }
    //GENERANDO CITAS
    this.citas.forEach((cita) => {
      const divCita = document.createElement("div");
      divCita.classList.add(
        "mx-5",
        "my-10",
        "bg-white",
        "shadow-md",
        "px-5",
        "py-10",
        "rounded-xl",
        "p-3",
      );

      const paciente = document.createElement("p");
      paciente.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case",
      );
      paciente.innerHTML = `<span class="font-bold uppercase">Paciente: </span> ${cita.paciente}`;

      const propietario = document.createElement("p");
      propietario.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case",
      );
      propietario.innerHTML = `<span class="font-bold uppercase">Propietario: </span> ${cita.propietario}`;

      const email = document.createElement("p");
      email.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case",
      );
      email.innerHTML = `<span class="font-bold uppercase">E-mail: </span> ${cita.email}`;

      const fecha = document.createElement("p");
      fecha.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case",
      );
      fecha.innerHTML = `<span class="font-bold uppercase">Fecha: </span> ${cita.fecha}`;

      const sintomas = document.createElement("p");
      sintomas.classList.add(
        "font-normal",
        "mb-3",
        "text-gray-700",
        "normal-case",
      );
      sintomas.innerHTML = `<span class="font-bold uppercase">Síntomas: </span> ${cita.sintomas}`;

      //BOTON EDITAR
      const btnEditar = document.createElement("button");
      btnEditar.classList.add(
        "py-2",
        "px-10",
        "bg-indigo-600",
        "hover:bg-indigo-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "flex",
        "items-center",
        "gap-2",
        "btn-editar",
      );
      btnEditar.innerHTML =
        'Editar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';
      const clone = structuredClone(cita);
      btnEditar.onclick = () => cargarEdicion(clone);
      //BOTON ELIMINAR
      const btnEliminar = document.createElement("button");
      btnEliminar.classList.add(
        "py-2",
        "px-10",
        "bg-red-600",
        "hover:bg-red-700",
        "text-white",
        "font-bold",
        "uppercase",
        "rounded-lg",
        "flex",
        "items-center",
        "gap-2",
      );
      btnEliminar.innerHTML =
        'Eliminar <svg fill="none" class="h-5 w-5" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>';
      btnEliminar.onclick = () => this.eliminar(cita.id);
      //BOTONES EN EL DIV
      const contenedorBotones = document.createElement("DIV");
      contenedorBotones.classList.add("flex", "justify-between", "mt-10");
      contenedorBotones.appendChild(btnEditar);
      contenedorBotones.appendChild(btnEliminar);

      // Agregar al HTML
      divCita.appendChild(paciente);
      divCita.appendChild(propietario);
      divCita.appendChild(email);
      divCita.appendChild(fecha);
      divCita.appendChild(sintomas);
      divCita.appendChild(contenedorBotones);
      contenedorCitas.appendChild(divCita);
    });
  }
}

function datosCita(e) {
  citaObjeto[e.target.name] = e.target.value;
}

const citas = new AdmiCitas();

function submitFormulario(e) {
  e.preventDefault();

  //VALIDAR FORMULARIO
  if (Object.values(citaObjeto).some((valor) => valor.trim() === "")) {
    new Notificacion({
      texto: "Todos los campos son obligatorios",
      tipo: "error",
    });
    return;
  }

  if (editando) {
    citas.editar({ ...citaObjeto });
    new Notificacion({
      texto: "Paciente Editado",
      tipo: "exito",
    });
  } else {
    citas.agregar({ ...citaObjeto });
    //NOTIFICAION EXITOSA
    new Notificacion({
      texto: "Paciente Registrado",
      tipo: "exito",
    });
  }
  formulario.reset();
  reiniciarObjeto();
  formularioInput.value = "Registrar Paciente";
  editando = false;
}

function reiniciarObjeto() {
  //REINICIA EL OBJETO
  //citaObjeto.paciente = "";
  //citaObjeto.propietario = "";
  //citaObjeto.email = "";
  //citaObjeto.fecha = "";
  //citaObjeto.sintomas = "";

  Object.assign(citaObjeto, {
    id: generaId(),
    paciente: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: "",
  });
}

//GENERA ID UNICO
function generaId() {
  return Math.random().toString(36).substring(2) + Date.now();
}

function cargarEdicion(cita) {
  Object.assign(citaObjeto, cita);

  pacienteInput.value = cita.paciente;
  propietarioInput.value = cita.propietario;
  emailInput.value = cita.email;
  fechaInput.value = cita.fecha;
  sintomasInput.value = cita.sintomas;

  editando = true;

  formularioInput.value = "Guardar Cambios";
}
