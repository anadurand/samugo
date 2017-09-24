'use strict';

const Camara = (updated) => {

    const photoContainer = $('<section class="photo-container"></section>');

    const photoCont = $('<div class="photo-container__cont"></div>');
    const divMsj = $('<div class="cont_text"><h4>Hola: '+ state.userName +'Tómate una foto para identificarte</h4></div>')

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
        const validacion = validarFoto();
        if (validacion == true) {
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

