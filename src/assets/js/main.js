"use strict";


const root = $(".root");
const render = (root) => {
    root.empty();
    const wrapper = $('<div class="wrapper"></div>');
    wrapper.append(Home(updated));
    root.append(wrapper);

}

const updated = function () {
    render(root);
}
const state = {
    pagina: null,
    unidad: null
}


$(_ => {

    const root = $(".root");
    render(root);
});
