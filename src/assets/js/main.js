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
            wrapper.append(LogIn(updated));
            break;
        case 2:
            wrapper.append(Camara(updated));
            break;
        case 3:
            wrapper.append(Time(updated));
            break;
        case 4:
            wrapper.append(AsistenciaOk(updated));
            break;
        case 5:
            wrapper.append(Ausente(updated));
            break;
        case 6:
            wrapper.append(AusenteOk(updated));
            break;
        case 7:
            wrapper.append(Unidad(updated));
            break;
    };

    root.append(wrapper);

    if(state.pagina == 2){
        initCamera();
    }
}

const updated = function () {
    render(root);
}
const state = {
    pagina: null
}


$(_ => {
  var config = {
    apiKey: "AIzaSyBdR77WTmQPJ4ByaPCsNRxJiKSxpPxYmfU",
    authDomain: "samugo-ffbbd.firebaseapp.com",
    databaseURL: "https://samugo-ffbbd.firebaseio.com",
    projectId: "samugo-ffbbd",
    storageBucket: "samugo-ffbbd.appspot.com",
    messagingSenderId: "955932477926"
  };

   firebase.initializeApp(config);

   var database = firebase.database();

    database.ref().on("value", function(snap){

    state.total = snap.val();
    console.log(state.total);

    const root = $(".root");
    render(root);

  });
});
