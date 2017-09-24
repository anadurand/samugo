'use strict';

var Horas, Fechas;

const Time = (updated) => {

    const parent = $('<div class=""></div>');
    const divMsj = $('<div class="msjInicial">Ahora registra tu hora de entrada</div>');
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
        ValidPuntualidad(update);
    });

    enlace.on('click', (e) => {
        e.preventDefault();
        console.log(Fechas);
        if (Fechas != undefined && Horas != undefined) {
            clearInterval(interval);
            state.user.Estado = "Ausente";
            // state.user.Dia = Fechas;
            state.userHora = Horas;
            state.page = 5;
            update();
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