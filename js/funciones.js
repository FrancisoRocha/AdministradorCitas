import Notificacion from "./classes/Notificacion.js";
import AdmiCitas from "./classes/Admicitas.js";
import { citaObjeto, editando } from "./variables.js";
import { formulario, formularioInput, pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput } from "./selectores.js";

const citas = new AdmiCitas();
export function datosCita(e) {
    citaObjeto[e.target.name] = e.target.value;
}

export function submitFormulario(e) {
    e.preventDefault();

    //VALIDAR FORMULARIO
    if (Object.values(citaObjeto).some((valor) => valor.trim() === "")) {
        new Notificacion({
            texto: "Todos los campos son obligatorios",
            tipo: "error",
        });
        return;
    }

    if (editando.value) {
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
    editando.value = false;
}

export function reiniciarObjeto() {
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
export function generaId() {
    return Math.random().toString(36).substring(2) + Date.now();
}

export function cargarEdicion(cita) {
    Object.assign(citaObjeto, cita);

    pacienteInput.value = cita.paciente;
    propietarioInput.value = cita.propietario;
    emailInput.value = cita.email;
    fechaInput.value = cita.fecha;
    sintomasInput.value = cita.sintomas;

    editando.value = true;

    formularioInput.value = "Guardar Cambios";
}
