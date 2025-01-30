import { formulario } from '../selectores.js'


export default //NOTIFICACION DE ERROR
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
