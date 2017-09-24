'user strict';

const AsistenciaOk = (updated) => {
    const parent = $('<div class=""></div>');
    const msj = $('<div class=""><h5>' + state.userName +' gracias por registrarte</h5></div>');
    const dia = $('<div>Dìa : '+ state.selectedUser.Dia +'</div>');
    const hora = $('<div>Hora: ' + state.selectedUser.Hora + '</div>');
    const estado = $('<div>Asistencia: '+ state.selectedUser.estado + '</div>');
    
    
    msj.append(dia);
    msj.append(hora);
    msj.append(estado);

    if(state.selectedUser.motivo != ""){
        const motivo = $('<div>Motivo: ' + state.selectedUser.motivo + '</div>');
        msj.append(motivo);
    }

    parent.append(msj);

    setTimeout(function () {
        state.pagina = 1;
        updated();
    }, 5000);

    return parent;
}