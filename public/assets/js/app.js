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
            wrapper.append(Admin(updated));
            break;
    };

    root.append(wrapper);

    if(state.pagina == 1){
        $('select').material_select();
    }
    if(state.pagina == 2){
        initCamera();
    }
    if(state.pagina == 7) {
        initMapa();
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

const Admin = (update) =>{
  const container = $('<section class="container"></section>');

    //Mapa
    const mapContainer =$('<div class="map-container"></div>');
    const mapa = $('<div id="map"></div>');


    mapContainer.append(mapa);
    container.append(mapContainer);

    
       
    
    
    return container;
  };
  
  function initMapa() {

    const map = new GMaps({
      div: '#map',
      lat: -12.043333,
      lng: -77.028333,
      setZoom: 12
    });

    GMaps.geolocate({
      success: (position) => {
        map.setCenter(position.coords.latitude, position.coords.longitude);
        map.setZoom(14);

        map.addMarker({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          title: "Posición actual",
        });


      },
      error: function (error) {
        alert('Geolocalización fallada: ' + error.message);
      },
      not_supported: function () {
        alert("Tu navegador no soporta la API geolocation");
      }
    });


  };
'user strict';

const AsistenciaOk = (updated) => {
    const parent = $('<div class=""></div>');
    const msj = $('<div class=""><h5>' + state.userName +' gracias por registrarte</h5></div>');
    const dia = $('<div>Dìa : '+ state.selectedUser.Dia +'</div>');
    const hora = $('<div>Hora: ' + state.selectedUser.Hora + '</div>');
    const estado = $('<div>Asistencia: '+ state.selectedUser.estado + '</div>');
    
    
    msj.append(dia);
    msj.append(hora);
    msj.append(estado);

    if(state.selectedUser.motivo != ""){
        const motivo = $('<div>Motivo: ' + state.selectedUser.motivo + '</div>');
        msj.append(motivo);
    }

    parent.append(msj);

    setTimeout(function () {
        state.pagina = 1;
        updated();
    }, 5000);

    return parent;
}
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
'use strict';

const Camara = (updateD) => {

    const photoContainer = $('<section class="photo-container"></section>');


    const photoCont = $('<div class="photo-container__cont"></div>');
    const divMsj = $('<div class="cont_text center-align"><h5>Hola: '+ state.userName +'Tómate una foto para identificarte</h5></div>')

    const videoHtml = $("<video id='video' width='100%'></video>");
    const imgHtml = $("<img id='img' src=''>");
    const canvasHtml = $("<canvas id='canva' width='250' height='250'></canvas>");
    const buttonHtml = $("<div id='button' class='circle'><i id='camara' class='material-icons'>camera_alt</i></div>");

    const photoFooter = $('<div class="photo-container__footer"></div>');
    const ok = $('<div id="seleccionar"  class="circle"><i  class="material-icons">check</i>Validar</div>');
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
        const validacion = validarFoto();
        console.log(validacion + "  validiiiii");
        if (validacion == true) {
            state.pagina = 3;
            updated();
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
    const select = $('<select class="sedes"><option value="" disabled selected>Selecciona tu sede</option></select>');
    const labelSede = $('<label>Sede: </label>');
    const divBtn = $('<div class="col s10 offset-s1 center-align ingreso"></div>');
    const btn = $('<a class="waves-effect waves-light btn-large">Ingresar</a>');
    const error = $('<div class="error">Usuario o Contraseña invalidos</div>');

    state.total.locales.forEach((local) => {
        const option = $('<option value="'+local.name+'">'+local.name+'</option>');
        select.append(option);
        
    });
    
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
        state.userName = inputUser.val();
        state.userPass = inputPass.val();
        state.userSede = select.val();
        if (validarUser()){
            state.selectedSede = LocalSede(state.userSede);
            updated();

        }else {
            parent.append(error);
        }
    });
    
    
    
    return parent
}
function LocalSede (local) {
    var c = "";
    state.total.locales.forEach((sede) => {
        if(sede.name == local){
            c = sede;
        }
    });
    return c;
}
'use strict';

var Horas, Fechas;

const Time = (updated) => {

    const parent = $('<div class=""></div>');
    const divMsj = $('<div class="msjInicial">'+ state.userName  +', ahora registra tu hora de entrada</div>');
    const cont_reloj = $('<section class="container cont_timer"></section>');

    const cont_timer = $('<div class="cont_clock"></div>');
    const cont_day = $('<div class="day"></div>');
    const cont_clock = $('<h1 class="clock"></h1>');
    const btn_present = $('<button type="button"  class="verde" id="btn_present" name="button" class="verde">Registrar</button>');
    const msjError = $('<p id="msjError"></p>');
    const div_register = $('<div class="enlace"></div>');
    const enlace = $('<a href="#" class="active">Registrar ausencia</a>');

    cont_timer.append(cont_day);
    cont_timer.append(cont_clock);
    cont_timer.append(btn_present, msjError);
    div_register.append(enlace);
    cont_timer.append(div_register);
    cont_reloj.append(cont_timer);

    parent.append(divMsj);
    parent.append(cont_reloj);

    var interval = setInterval(clock, 1000);


    btn_present.on('click', (e) => {
        e.preventDefault();

        clearInterval(interval);
        ValidPuntualidad(updated);
    });

    enlace.on('click', (e) => {
        e.preventDefault();
        console.log(Fechas);
        if (Fechas != undefined && Horas != undefined) {
            clearInterval(interval);
            state.selectedUser.Hora = Horas;
            state.selectedUser.Dia = Fechas;
            state.pagina = 5;
            updated();
        }
    });

    return parent
}

function clock () {
    var time = new Date(),
        hours = time.getHours(),
        minutes = time.getMinutes(),
        seconds = time.getSeconds(),
        dia = time.getDate(),
        mes = time.getMonth() + 1,
        year = time.getFullYear();

    Horas = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
    Fechas = harold(dia) + "/" + harold(mes) + "/" + year;
    $('.day').text(harold(dia) + "/" + harold(mes) + "/" + year);
    $('.clock').text(harold(hours) + ":" + harold(minutes) + ":" + harold(seconds));
}

'user strict';

const Getregister = () => {

    $.get("https://sheetsu.com/apis/v1.0/5a03e72dda6e", (data) => {
        console.log(data);
        state.asistencia = data;
    });
};
'use strict';

function initCamera () {

    var video = document.querySelector('#video');
    var canvas = document.querySelector('#canva');
    var button = document.querySelector('#button');
    var img = document.querySelector('#img');

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
        console.log(imgData);
        img.style.display = 'block';
        video.style.display = 'none';
    });
}
'use strict';
const Postregister = () => {

    $.post("https://sheetsu.com/apis/v1.0/5a03e72dda6e", { "Nombre": state.selectedUser.nombre, "Apellido": state.selectedUser.apellidos, "User": state.selectedUser.user, "Password": state.selectedUser.password, "Sede": state.selectedUser.sede,"Foto": state.selectedUser.foto, "Turno": state.selectedUser.turno, "Dia": state.selectedUser.Dia, "Hora": state.selectedUser.Hora, "Cargo": state.selectedUser.cargo, "Asistencia": state.selectedUser.estado, "Observacion": state.selectedUser.motivo }, function (result) {
        console.log("Enviando Data");
    });
};
'use strict';

const VerificarUbi = (updated) => {
    initMap(updated);
}


function harold(standIn) {
    if (standIn < 10) {
        standIn = '0' + standIn
    }
    return standIn;
}
var UbicacionX, checkP, fechaP;

const ValidPuntualidad = (updated) => {
    BuscarHora();
    var punt1 = state.turno.horaP1;
    var punt2 = state.turno.horaP2;
    var actual = new Date();
    var hours = actual.getHours();
    var minutes = actual.getMinutes();
    var seconds = actual.getSeconds();
    var dia = actual.getDate();
    var mes = actual.getMonth() + 1;
    var year = actual.getFullYear();

    checkP = harold(hours) + ":" + harold(minutes) + ":" + harold(seconds);
    fechaP = harold(dia) + "/" + harold(mes) + "/" + year;
    state.time = checkP;

        if (parseInt(punt1.slice(0, 2)) <= hours && hours <= parseInt(punt2.slice(0, 2))) {
            if (hours == parseInt(punt2.slice(0, 2)) && minutes > parseInt(punt2.slice(2, 4))) {
                state.selectedUser.estado = "Tarde";
                state.selectedUser.motivo = "";
                
                state.pagina = 4;
                VerificarUbi(updated);
            } else {
                state.selectedUser.estado = "Puntual";
                state.selectedUser.motivo = "";
                state.pagina = 4;
                VerificarUbi(updated);
            }
        } else {
            state.selectedUser.estado = "Tarde";
            state.selectedUser.motivo = "";
            
            state.pagina = 4;
            VerificarUbi(updated);
        }

    
}

const BuscarHora = () => {
    state.total.turno.forEach((turn)=> {
        if(turn.horario == state.selectedUser.turno){
            state.turno = turn;
        }
    });
}

function initMap(update) {
    var pos;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            console.log(pos);
            var posX = Math.sqrt(Math.pow(pos.lat, 2) + Math.pow(pos.lng, 2));

            var labX = Math.sqrt(Math.pow(state.selectedSede.latitud, 2) + Math.pow(state.selectedSede.longitud, 2));
            var distancia = (Math.abs(labX - posX)) * 1000;
            var RadioWork = 0.002429195 * 1000;

            if (distancia >= RadioWork) {
                console.log("Aun no estas en laboratoria");
                $('#msjError').text("Aún no estas en tu sede , vuelve a registrarte cuando llegues");
                setTimeout(function () {
                    state.pagina = 1;
                    updated();
                }, 3000);
            } else {
                console.log("Estas cerca de tu ubicacion");
                    state.selectedUser.Hora = checkP;
                    state.selectedUser.Dia = fechaP;
                    Postregister();          
                    updated();
            }

        });

    } else {
        $('#msjError').text("Tu navegador no soporta la geolocalización");
        setTimeout(function () {
            state.pagina = 1;
            updated();
        }, 3000);
    }
}


const Reingreso = () => {
    var actual = new Date();
    var dia = actual.getDate();
    var mes = actual.getMonth() + 1;
    var year = actual.getFullYear();
    var Freingreso = harold(dia) + "/" + harold(mes) + "/" + year;
    return Freingreso;
}
const PedirHora = () => {
    var time = new Date(),
        dia = time.getDate(),
        mes = time.getMonth() + 1,
        year = time.getFullYear();

    var Fechas = harold(dia) + "/" + harold(mes) + "/" + year;
    return Fechas;
}

'use strict';

const validarUser = () => {
    var result = false;
    state.total.personal.forEach((usuario) => {
        if(state.userName == usuario.user && state.userPass == usuario.password && state.userSede == usuario.sede){
             result = true;
             state.userName=  usuario.nombre;
             state.pagina = 2;
             state.selectedUser = usuario;

             if(state.userName == "Administrador"){
                 state.pagina = 7;
             }
        }
    });

    return result;
}

'use strict';

const validarFoto = () => {
  return true;
}
