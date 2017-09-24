'use strict';

const Home = (updated) => {

    const parent = $('<div class="loading"></div>');
    const emergencia = $('<a class="waves-effect waves-light btn-large">Emergencias</a>');
    const registro = $('<a class="waves-effect waves-light btn-large">Registro Asistencia</a>');
    const insumos = $('<a class="waves-effect waves-light btn-large">Manejo Insumos</a>');

    parent.append(emergencia);
    parent.append(registro);
    parent.append(insumos);

    registro.on("click", (e) => {
        e.preventDefault();
        state.pagina = 1;
        updated();
    });



    return parent
}