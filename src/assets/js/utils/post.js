'use strict';
const Postregister = () => {

    $.post("https://sheetsu.com/apis/v1.0/5a03e72dda6e", { "Nombre": state.selectedUser.nombre, "Apellido": state.selectedUser.apellidos, "User": state.selectedUser.user, "Password": state.selectedUser.password, "Sede": state.selectedUser.sede,"Foto": state.selectedUser.foto, "Turno": state.selectedUser.turno, "Dia": state.selectedUser.Dia, "Hora": state.selectedUser.Hora, "Cargo": state.selectedUser.cargo, "Asistencia": state.selectedUser.estado, "Observacion": state.selectedUser.motivo }, function (result) {
        console.log("Enviando Data");
    });
};