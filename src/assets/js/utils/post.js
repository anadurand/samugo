'use strict';
const Postregister = (updated) => {

    $.post("https://sheetsu.com/apis/v1.0/50c5e101da79", { "Coder": state.userName, "Email": state.user.Email, "Codigo": state.user.Codigo, "Squad": state.user.Squad, "Tipo": state.user.Tipo, "Dia": state.user.Dia, "Hora": state.user.Hora, "Estado": state.user.Estado, "Motivo": state.user.Motivo, "Sede": state.user.Sede }, function (result) {
        console.log("Enviando Data");
    });
};