'user strict';

const Ausente = (updated) => {

    const body_modal = $('<div class="container"></div>');
    const cont_modal = $('<div class="row"></div>');
    const cont_div = $('<div class="col s12 center-align"></div>');
    const title_name = $('<h4>' + state.userName + '</h4>');
    const msj = $('<p>Por favor cuéntanos  por qué no vas a asistir.</p>');
    const message = $('<textarea id="message" class="materialize-textarea"></textarea>');
    const button = $('<a class="btn col s12 montserrat">Enviar</a>');

    cont_div.append(title_name, msj, message, button);
    cont_modal.append(cont_div);

    body_modal.append(cont_modal);

    button.on('click', (e) => {
        e.preventDefault();
        console.log("mensaje enviado");
        state.selectedUser.motivo = message.val();
        state.selectedUser.estado = "Ausente";
        state.pagina = 4;
        Postregister();
        updated();
    });

    return body_modal;
};