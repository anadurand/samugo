'use strict';

const VerificarUbi = (update) => {
    initMap(update);
}


function harold(standIn) {
    if (standIn < 10) {
        standIn = '0' + standIn
    }
    return standIn;
}
var UbicacionX, checkP, fechaP;

const ValidPuntualidad = (update) => {
    var punt1 = "0000";
    var punt2 = "0930";
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
            state.userEstado = "Tarde";
            state.page = 3;
            VerificarUbi(update);
        } else {
            state.userEstado = "Puntual";
            state.userMotivo = "";
            state.page = 2;
            VerificarUbi(update);
        }
    } else {
        state.userEstado = "Tarde";
        state.page = 3;
        VerificarUbi(update);
    }
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
            var posLab = {
                lat: -12.126025,
                lng: -77.020663
            }
            //  var posLab={
            //   lat: -12.0507126,
            //   lng: -77.045422
            // }


            var labX = Math.sqrt(Math.pow(posLab.lat, 2) + Math.pow(posLab.lng, 2));
            var distancia = (Math.abs(labX - posX)) * 1000;
            var RadioWork = 0.002429195 * 1000;

            if (distancia >= RadioWork) {
                console.log("Aun no estas en laboratoria");
                $('#msjError').text("Aún no estas en Laboratoria , vuelve a registrarte cuando llegues");
                setTimeout(function () {
                    state.page = 1;
                    update();
                }, 3000);
            } else {
                console.log("Estas cerca de tu ubicacion");
                if (state.userEstado != "Tarde") {
                    state.userHora = checkP;
                    state.userDia = fechaP;
                    Postregister();
                }
                state.userHora = checkP;
                state.userDia = fechaP;
                update();
            }

        });

    } else {
        $('#msjError').text("Tu navegador no soporta la geolocalización");
        setTimeout(function () {
            state.page = null;
            update();
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