"use strict";


const root = $(".root");
const render = (root) => {
    root.empty();
    const wrapper = $('<div class="wrapper"></div>');

    switch (state.pagina) {
        case null:
            wrapper.append(Home(updated));
            break;
        case 1:
            wrapper.append(Recicla(updated));
            break;
        case 2:
            wrapper.append(MapaRecicla(updated));
            break;
        case 3:
            wrapper.append(RutaRecicla(updated));
            break;
        case 4:
            wrapper.append(FormAcopio(updated));
            break;
        case 5:
            wrapper.append(SuccesAcopio(updated));
            break;
        case 6:
            wrapper.append(TipsR(updated));
            break;
        case 7:
            wrapper.append(TipDetail(updated));
            break;
    };

    root.append(wrapper);

}

const updated = function () {
    render(root);
}
const state = {
    pagina: null,
}


$(_ => {
   
    const root = $(".root");
    render(root);
});
