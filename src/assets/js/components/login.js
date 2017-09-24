'use strict';

const LogIn = (updated) => {

    const parent = $('<div class="row"></div>');
    const form = $('<form class="col s12"></form>');
    const divUser = $('<div class="input-field col s10 offset-s1"><i class="material-icons prefix">account_circle</i></div>');
    const inputUser = $('<input id="icon_prefix" type="text" class="validate">');
    const labelUser = $('<label for="icon_prefix">Usuario</label>');
    const divPass = $('<div class="input-field col s10 offset-s1"><i class="material-icons prefix">lock_outline</i></div>');
    const inputPass = $('<input id="icon_prefix" type="text" class="validate">');
    const labelPass = $('<label for="icon_prefix">Contraseña</label>');
    const divSede = $('<div class="input-field col s10 offset-s1"></div>');
    const select = $('<select><option value="" disabled selected>Selecciona tu sede</option></select>');
    const labelSede = $('<label>Sede: </label>');
    const divBtn = $('<div class="col s10 offset-s1 center-align ingreso"></div>');
    const btn = $('<a class="waves-effect waves-light btn-large">Ingresar</a>');

    // state.locales.forEach((local) => {
    //     const option = $('<option value="'+local.name+'">'+local.name+'</option>');
    //     select.append(option);

    //     option.on("click", (e)=> {
    //         e.preventDefault();
    //         state.selectedSede = local;
    //     });

    // });
    
    divSede.append(select);
    divSede.append(labelSede);
    divUser.append(inputUser);
    divUser.append(labelUser);
    divPass.append(inputPass);
    divPass.append(labelPass);
    form.append(divUser);
    form.append(divPass);
    form.append(divSede);
    divBtn.append(btn);
    
    parent.append(form);
    parent.append(divBtn);

    btn.on("click", (e) => {
        e.preventDefault();
        state.pagina = 2;
        state.userName = inputUser.val();
        state.userPass = inputPass.val();
        updated();
    });



    return parent
}