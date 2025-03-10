// const datosLaboratorios = JSON.parse('<?= JSON.stringify(datosLaboratorios).replace(/<\/script/g, ' <\\/script').replace(/ < !--/g, '<\\!--') ?>');
// function mostrarDatos() {
//     const seleccionado = document.getElementById('laboratorioSelect').value.trim().toUpperCase();
//     // Obtener los campos del formulario
//     const personaContacto = document.getElementById('personaContacto');
//     const correoContacto = document.getElementById('correoContacto');
//     const telefonoContacto = document.getElementById('telefonoContacto');
//     const ubicacionContacto = document.getElementById('ubicacionContacto');

//     if (seleccionado === "OTRA DEPENDENCIA" || seleccionado === "") {
//         // Mostrar campo de otra dependencia solo si es necesario
//         document.getElementById('otraDependenciaCampo').style.display = (seleccionado === "OTRA DEPENDENCIA") ? 'block' : 'none';

//         // Limpiar los campos de contacto
//         personaContacto.value = '';
//         correoContacto.value = '';
//         telefonoContacto.value = '';
//         ubicacionContacto.value = '';

//     } else {
//         document.getElementById('otraDependenciaCampo').style.display = 'none';

//         const datos = datosLaboratorios.find(lab => lab.nombreLaboratorio.trim().toUpperCase() === seleccionado);

//         if (datos) {
//             personaContacto.value = datos.coordinador || '';
//             correoContacto.value = datos.correoLaboratorio || '';
//             telefonoContacto.value = datos.telefono || '';
//             ubicacionContacto.value = datos.ubicacion || '';
//         } else {
//             // Si no encuentra datos, limpia los campos
//             personaContacto.value = '';
//             correoContacto.value = '';
//             telefonoContacto.value = '';
//             ubicacionContacto.value = '';
//         }
//     }
// }

function validarTipoIntervencion() {
    const tipo = document.getElementById('tipoIntervencion').value;
    const campoOtra = document.getElementById('campoOtraIntervencion');
    const otraInput = document.getElementById('otraIntervencion');

    if (tipo === "Otra") {
        campoOtra.style.display = 'block';
        otraInput.setAttribute('required', 'required');
    } else {
        campoOtra.style.display = 'none';
        otraInput.removeAttribute('required');
        otraInput.value = '';
    }
}

// Validación de archivos (cantidad, tamaño y extensiones)
const tamañoMaximo = 5 * 1024 * 1024; // 5MB
const extensionesPermitidas = ['pdf', 'jpg', 'jpeg', 'png', 'doc', 'docx', 'mp4'];

function validarArchivo(input, contenedorSiguiente) {
    input.addEventListener('change', function () {
        const archivo = this.files[0];

        if (archivo) {
            const nombreArchivo = archivo.name.toLowerCase();
            const extensionArchivo = nombreArchivo.split('.').pop();

            if (!extensionesPermitidas.includes(extensionArchivo)) {
                alert(`El archivo "${archivo.name}" tiene una extensión no permitida. Solo se aceptan PDF, JPG, PNG, DOC, DOCX y MP4.`);
                this.value = '';
                ocultarSiguientes(contenedorSiguiente);
                return;
            }

            if (archivo.size > tamañoMaximo) {
                alert(`El archivo "${archivo.name}" supera el tamaño máximo permitido de 5MB.`);
                this.value = '';
                ocultarSiguientes(contenedorSiguiente);
                return;
            }

            if (contenedorSiguiente) {
                contenedorSiguiente.style.display = 'block';
            }
        } else {
            ocultarSiguientes(contenedorSiguiente);
        }
    });
}

function ocultarSiguientes(contenedor) {
    if (contenedor) {
        contenedor.querySelector('input').value = '';
        contenedor.style.display = 'none';
        const siguienteContenedor = contenedor.nextElementSibling;
        ocultarSiguientes(siguienteContenedor);
    }
}

// Aplicar validación a cada archivo
validarArchivo(
    document.getElementById('archivoEvidencia1'),
    document.getElementById('contenedorArchivo2')
);

validarArchivo(
    document.getElementById('archivoEvidencia2'),
    document.getElementById('contenedorArchivo3')
);

validarArchivo(
    document.getElementById('archivoEvidencia3'),
    null
);



// Validar política de tratamiento de datos personales
document.getElementById('btnEnviar').addEventListener('click', function (event) {
    const aceptacionDatos = document.getElementById('aceptacionDatos');

    if (!aceptacionDatos.checked) {
        event.preventDefault(); // Detiene el envío
        document.getElementById('errorAceptacionDatos').style.display = 'block';
        alert('Debes aceptar la Política de Tratamiento de Datos Personales para enviar la solicitud.');
    } else {
        document.getElementById('errorAceptacionDatos').style.display = 'none';
    }
});