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

const Unidad = (update) =>{
  const container = $('<section class="container"></section>');

    //Mapa
    const mapContainer =$('<div class="map-container"></div>');
    mapContainer.append(samuMap());
    container.append(mapContainer);

    return container;
};

'use strict';

const Camara = (updated) => {

    const photoContainer = $('<section class="photo-container"></section>');

    const photoCont = $('<div class="photo-container__cont"></div>');
    const divMsj = $('<div class="cont_text"><h4>Tómate una foto para identificarte</h4></div>')

    const videoHtml = $("<video id='video' width='100%'></video>");
    const imgHtml = $("<img id='img' src=''>");
    const canvasHtml = $("<canvas id='canva' width='250' height='250'></canvas>");
    const buttonHtml = $("<div id='button' class='circle'><i id='camara' class='material-icons'>camera_alt</i></div>");

    const photoFooter = $('<div class="photo-container__footer"></div>');
    const ok = $('<div id="seleccionar"  class="circle"><i  class="material-icons">check</i></div>');
    const error = $('<div class="error">Imagen no pertenece a usuario. <br> Registrese correctamente </div>');


    photoCont.append(divMsj);
    photoContainer.append(photoCont);


    photoContainer.append(videoHtml);
    photoContainer.append(imgHtml);
    photoContainer.append(canvasHtml);
    photoContainer.append(videoHtml);
    photoFooter.append(ok);
    photoFooter.append(buttonHtml);
    photoContainer.append(photoFooter);
   


    ok.on('click', function (e) {
        e.preventDefault();

        if (validarFoto()) {
            state.pagina = 3;
            update();
        }else {
            photoContainer.append(error);
            state.userName = "";
            state.userPass = "";
            state.selectedSede = "";
            state.pagina = 1;
            setTimeout(updated, 3000);
        }

    });

    
    return photoContainer;

}


'use strict';

const Home = (updated) => {

    const parent = $('<div class="loading"></div>');
    const emergencia = $('<a class="waves-effect waves-light btn-large">Emergencias</a>');
    const registro = $('<a class="waves-effect waves-light btn-large">Registro Asistencia</a>');
    const insumos = $('<a class="waves-effect waves-light btn-large">Manejo Insumos</a>');

    parent.append(emergencia);
    parent.append(registro);
    parent.append(insumos);

    registro.on("click", (e) => {
        e.preventDefault();
        state.pagina = 1;
        updated();
    });



    return parent
}
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
    //const select = $('<select><option value="" disabled selected>Selecciona tu sede</option></select>');
    const labelSede = $('<label>Sede: </label>');
    const divBtn = $('<div class="col s10 offset-s1 center-align ingreso"></div>');
    const btn = $('<a class="waves-effect waves-light btn-large">Ingresar</a>');

    //mientras que sede es central
    const option = $('<span value="central">Central</span>');

    //divSede.append(select);
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
        state.pagina = 7;
        state.userName = inputUser.val();
        state.userPass = inputPass.val();
        updated();
    });



    return parent
}

const samuMap = () => {
    const mapa = $('<div id="map"></div>');
    let latitud, longitud;

    return mapa;
};

$( _ =>{
  let latitud, longitud;
    const map = new GMaps({
        div: '#map',
        lat: -12.043333,
        lng: -77.028333,
        setZoom: 12
    });

    GMaps.geolocate({
        success: function(position) {
            latitud = position.coords.latitud;
            longitud = position.coords.longitud;
            map.setCenter(latitud, longitud);
            map.addMarker({
                lat: latitud,
                lng: longitud,
                color: 'blue',
                animation: google.maps.Animation.DROP,
                setZoom:9,
            });

        },
        error: (error) => {
            alert('Geolocalización fallada: '+error.message);
        },
        not_supported: () => {
            alert("Tu navegador no soporta la API de geolocation");
        }
    });
});

function addMarkerMap(map,elem) {
    map.addMarker({
        lat: elem.latitud,
        lng: elem.longitud,
        animation: google.maps.Animation.DROP,
    });
}

'use strict';

function initCamera () {

    var video = document.querySelector('#video');
    var canvas = document.querySelector('#canva');
    var button = document.querySelector('#button');
    var img = document.querySelector('#img');

    console.log(canvas);
    canvas.style.display = 'none';
    img.style.display = 'none';

    navigator.getUserMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia);

    if (navigator.getUserMedia) {
        navigator.getUserMedia({ video: true }, function (stream) {
            video.src = window.URL.createObjectURL(stream);
            video.play();
        }, function (error) { console.log(error); })
    } else alert("Tienes un navegador obsoleto");

    video.addEventListener('loadedmetadata', function () {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    }, false);

    button.addEventListener('click', function () {
        canvas.getContext('2d').drawImage(video, 0, 0);
        var imgData = canvas.toDataURL('image/png');
        img.setAttribute('src', imgData);
        state.photoTaken = imgData;

        img.style.display = 'block';
        video.style.display = 'none';
    });
}