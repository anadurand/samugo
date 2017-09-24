"use strict";

const root = $(".root");
const render = (root) => {
    root.empty();
    const wrapper = $('<div class="wrapper"></div>');
}

const updated = function () {
    render(root);
}
const state = {
    pagina: null,
    unidad: null
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

  });
});
