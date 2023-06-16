
const url = "http://localhost:8090/api/colegio"//En esta url se pone el link de la api


const listarDatos = async () => {
    let respuesta = ""
    let body = document.getElementById("contenido")


    fetch(url, {
        method: 'GET',
        mode: 'cors',
        headers: { "content-type": "application/json; charset=UTF-8" }
    }) //Consulta, trabaja o consume apis de JS
        .then((resp) => resp.json()) //Tiene la respuesta y la almacena
        .then(function (data) {
            console.log(data)
            let listaColegios = data.colegios
            return listaColegios.map(function (colegio) {
                respuesta += `<tr><td>${colegio.direccion}</td>` +
                    `<td>${colegio.latitud}</td>` +
                    `<td>${colegio.longitud}</td>` +
                    `<td>${colegio.descripcion}</td>` +
                    `<td>${colegio.fechaReporte}</td>` +
                    `<td><a class="waves-effect waves-light btn modal-trigger blue" href="#modal1" onclick ='editar(${JSON.stringify(colegio)})'>Editar</a><a href="#" onclick='eliminar("${colegio._id}")' class="waves-effect waves-light red btn-small" style="margin-left: 20px;">Eliminar</a></td></tr>`
                body.innerHTML = respuesta
            })

        })





    //Este es donde vamos a poner el mensaje, llevar el mensaje a un DIV con tablas


    //div es solo una variable, indica el objeto donde se pone la información
}
const validateDireccion = () => {
    let direccion = document.getElementById('direccion').value;
    let texto;

    if (direccion === null || direccion === '' || direccion.length === 0) {
        texto = 'direccion vacia'
        alert(texto)
        return false;
    } else {
        return true;
    }
}

const validateDireccionNueva = () => {
    let direccion = document.getElementById('direccionNueva').value;
    let texto;

    if (direccion === null || direccion === '' || direccion.length === 0) {
        texto = 'direccion vacia'
        alert(texto)
        return false;
    } else {
        return true;
    }
}

const validateFecha = () => {
    let fecha = document.getElementById('fecha').value;
    let texto;
    let expresion = /^\d{4}-\d{2}-\d{2}$/;

    if (fecha === null || fecha === '' || fecha.length === 0) {
        texto = 'fecha vacia'
        alert(texto)
        return false;
    } else if (!expresion.test(fecha)) {
        texto = 'fecha formato erroneo'
        alert(texto)
        return false;
    } else {
        return true;
    }
};

const validateLatitud = () => {
    let latitud = document.getElementById('latitud').value
    let texto
    let expresion = /[0-9]/

    if (latitud === null || latitud === '' || latitud.length === 0) {
        texto = 'latitud vacia'
        alert(texto)
        return false;
    } else if (!expresion.test(latitud)) {
        texto = 'latitud solo numeros'
        alert(texto)
        return false;
    } else if (latitud > 6.2 || latitud < 6.14) {
        texto = 'latitud rango erroneo'
        alert(texto)
        return false;
    } else {
        return true;
    }
}

const validateLongitud = () => {
    let longitud = document.getElementById('longitud').value
    let texto
    let expresion = /[0-9]/

    if (longitud === null || longitud === '' || longitud.length === 0) {
        texto = 'longitud vacia'
        alert(texto)
        return false;
    } else if (!expresion.test(longitud)) {
        texto = 'latitud solo numeros'
        alert(texto)
        return false;
    } else if (longitud > -75.43 || longitud < -75.50) {
        texto = 'longitud rango erroneo'
        alert(texto)
        return false;
    } else {
        return true;
    }
}

const validateDescripcion = () => {
    let descripcion = document.getElementById('descripcion').value
    let texto

    if (descripcion === null || descripcion === '' || descripcion.length === 0) {
        texto = 'descripcion vacia'
        alert(texto)
        return false;
    } else {
        return true;
    }
}

const registrar = async () => {
    //capturar valores    
    let _direccion = document.getElementById('direccion').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value
    let _fecha = document.getElementById('fecha').value


    const dirResult = validateDireccion()
    const fechaResult = validateFecha()
    const latResul = validateLatitud()
    const logResult = validateLongitud()
    const descResult = validateDescripcion()

    if (fechaResult && latResul && logResult && descResult && dirResult) {
        let objeto = {
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion,
            fechaReporte: _fecha
        }
        fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(objeto),//Convertir el objeto a un json
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
            .then((resp) => resp.json())
            .then(JSON => {
                alert(JSON.msg)

            })


    }
}



if (document.querySelector('#btnRegistrar')) {
    document.querySelector('#btnRegistrar').addEventListener('click', registrar)
}

const editar = (colegio) => {

    document.getElementById('direccion').value = colegio.direccion
    document.getElementById('latitud').value = colegio.latitud
    document.getElementById('longitud').value = colegio.longitud
    document.getElementById('descripcion').value = colegio.descripcion
}

const eliminar = (id) => {
    if (confirm('¿Desea realizar la eliminación?') == true) {

        let objeto = {
            _id: id,
        }
        fetch(url, {
            method: 'DELETE',
            mode: 'cors',
            body: JSON.stringify(objeto),//Convertir el objeto a un json
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
            .then((resp) => resp.json())
            .then(JSON => {
                alert(JSON.msg)
            })


    }
}
const asignarFecha = () => {
    let today = new Date();
    let date = today.getFullYear() + '-' + (today.getMonth() + 1 < 10 ? '0' : '') + (today.getMonth() + 1) + '-' + today.getDate();
    document.getElementById('fecha').value = date;
}


const actualizar = async () => {
    //capturar valores    
    let _direccionVieja = document.getElementById('direccion').value;
    let _direccion = document.getElementById('direccionNueva').value
    let _latitud = document.getElementById('latitud').value
    let _longitud = document.getElementById('longitud').value
    let _descripcion = document.getElementById('descripcion').value

    const latResul = validateLatitud()
    const logResult = validateLongitud()
    const descResult = validateDescripcion()
    const dirResult = validateDireccionNueva()




    if (latResul && logResult && descResult && dirResult) {
        let objeto = {
            direccionVieja: _direccionVieja,
            direccion: _direccion,
            latitud: _latitud,
            longitud: _longitud,
            descripcion: _descripcion,
        }
        alert(objeto)
        fetch(url, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify(objeto),//Convertir el objeto a un json
            headers: { "content-type": "application/json; charset=UTF-8" }
        })
            .then((resp) => resp.json())
            .then(JSON => {
                alert(JSON.msg)
            })
    }

}


if (document.querySelector('#btnActualizar')) {
    document.querySelector('#btnActualizar').addEventListener('click', actualizar)
}

