import { generaId } from "./funciones.js";

let editando = {
    value: false
}

//Objeto de cita
const citaObjeto = {
    id: generaId(),
    paciente: "",
    propietario: "",
    email: "",
    fecha: "",
    sintomas: "",
};

export {
    editando,
    citaObjeto,
}
