'use strict';

const validarUser = () => {
    var result = false;
    state.total.personal.forEach((usuario) => {
        if(state.userName == usuario.user && state.userPass == usuario.password && state.userSede == usuario.sede){
             result = true;
             state.pagina = 2;
             state.selectedUser = usuario;
             if(state.userName == "ADM-001"){
                 state.pagina = 7;
             }
        }
    });

    return result;
}