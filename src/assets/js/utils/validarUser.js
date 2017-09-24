'use strict';

const validarUser = () => {
    var result = false;
    state.total.personal.forEach((usuario) => {
        if(state.userName == usuario.user && state.userPass == usuario.password && state.userSede == usuario.sede){
             result = true;
             state.userName=  usuario.nombre;
             state.pagina = 2;
             state.selectedUser = usuario;

             console.log(state.userName);
             if(state.userName == "Administrador"){
                 state.pagina = 7;
             }
        }
    });

    return result;
}
