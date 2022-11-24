export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]) {
        validadores[tipoDeInput] (input);
    }

    if(input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = ""
    }else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input)
    }
};

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]

const mensajesDeError = {
    nombre: {
        valueMissing: "El campo del nombre no puede estar vacio."
    },
    email: {
        valueMissing: "El campo del correo no puede estar vacio.",
        typeMismatch: "El correo no es valido."
    },
    password: {
        valueMissing: "El campo de la contraseña no puede estar vacio.",
        patternMismatch: "Al menos 6 caracteres, maximo 12, debe contener una letra minuscula, una letra mayúscula, un numero y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "El campo de la fecha de nacimiento no puede estar vacio.",
        customError: "Debes tener al menos 18 años de edad."
    },
    numero: {
        valueMissing: "El campo del numero Telefonico no puede estar vacio.",
        patternMismatch: "El formato requerido es de 10 numeros (XXXXXXXXXX)."
    },
    direccion: {
        valueMissing: "El campo de la dirección no puede estar vacio.",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres."
    },
    ciudad: {
        valueMissing: "El campo de la ciudad no puede estar vacio.",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres."
    },
    provincia: {
        valueMissing: "El campo de la provincia no puede estar vacio.",
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres."
    }

}

const validadores = {
    nacimiento: input => validarNacimiento(input)
};

function mostrarMensajeDeError(tipoDeInput, input) {
    let mensaje = "";
    tipoDeErrores.forEach (error => {
        if(input.validity[error]) {
            console.log(error);
            console.log(input.validity[error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });

    return mensaje
}

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = '';
    if(!mayorDeEdad(fechaCliente)) {
        mensaje = "Debes tener al menos 18 años de edad";
    }
    input.setCustomValidity(mensaje);
};

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
        );
    return( diferenciaFechas <= fechaActual);
};