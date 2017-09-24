'user strict';

const Getregister = () => {

    $.get("https://sheetsu.com/apis/v1.0/5a03e72dda6e", (data) => {
        console.log(data);
        state.asistencia = data;
        const coderToday = [], sedes = [];

        $.each(state.asistencia, (i, e) => {
            if (e.Dia === harold(state.Dia.getDate()) + "/" + harold((state.Dia.getMonth() + 1)) + "/" + harold(state.Dia.getFullYear())) {
                basesToday.push(e);
            }
        });
        $.each(baseToday, (i, e) => {

            if ($.inArray(e.Sede, sedes) === -1) {
                sedes.push(e.Sede);
            }
        });

        $.each(sedes, (i, e) => {
            baseToday.forEach(function (base) {
                if (e == base.Sede) {
                    switch (base.Asistencia) {
                        case 'Ausente': ausentes++;
                            Tausentes++;
                            break;
                        case 'Puntual': puntuales++;
                            Tpuntuales++;
                            break;
                        case 'Tarde': tarde++;
                            Ttarde++;
                            break;
                    }

                    // detalle(coder, divBody);
                }

            });
           
        });
    });
}