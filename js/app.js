import { pacienteInput, propietarioInput, emailInput, fechaInput, sintomasInput, formulario} from './selectores.js'
import { datosCita, submitFormulario } from './funciones.js';

//EVENTOS
pacienteInput.addEventListener("change", datosCita);
propietarioInput.addEventListener("change", datosCita);
emailInput.addEventListener("change", datosCita);
fechaInput.addEventListener("change", datosCita);
sintomasInput.addEventListener("change", datosCita);
formulario.addEventListener("submit", submitFormulario);



