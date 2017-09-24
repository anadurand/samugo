const Admin = (update) =>{
  let Tausentes = 0, Tpuntuales = 0 ,Ttarde = 0;
  const container = $('<section class="container"></section>');

  //Mapa
  const mapContainer =$('<div class="map-container"></div>');
  const mapa = $('<div id="map"></div>');

  const reportSamu = $('<div class="samu-container"></div>');
  const container_OK =$('<section class="container center-align"></section>');
  const cont_asisOK =$('<div class="row"></div>') ;
  const cont_title =$(`<div class="title_asis left-align"><p>Buen día Alejandra</p><p> Revisa la Asistencia de Hoy : ${harold(state.dia.getDate()) + "/" + harold((state.dia.getMonth() +1)) + "/" + harold(state.dia.getFullYear())}</p> </div>`) ;
  const divTotales =$('<div class="flex_center"><h4>Registro Total</h4></div>');
  const totalPuntual=$('<div class="sizedetail"><p class="Puntual">Puntual</p><p></p></div>');
  const TPuntual=$('<p></p>');
  const totalTarde=$('<div class="sizedetail"><p class="Tarde">Tarde</p><p></p></div>');
  const TTarde=$('<p></p>');
  const totalAusente=$('<div class="sizedetail"><p class="Ausente">Ausente</p><p></p></div>');
  const TAusente=$('<p></p>');
  divTotales.append(totalPuntual,totalTarde,totalAusente);
  totalPuntual.append(TPuntual);
  totalTarde.append(TTarde);
  totalAusente.append(TAusente);
  const detalle_samus = $(`<div id="samus"></div>`)
  container_OK.append(cont_asisOK,cont_title,divTotales,detalle_samus);

  const samuToday = [], sedes = [];

  $.get("https://sheetsu.com/apis/v1.0/5a03e72dda6e",(data)=> {
    console.log(data);
    state.asistencia = data;
    console.log(state.asistencia);

    $.each(state.asistencia,(i,e)=>{
      if( e.Dia === harold(state.dia.getDate()) + "/" + harold((state.dia.getMonth() +1)) + "/" + harold(state.dia.getFullYear())){
        samuToday.push(e);
      }
    });

    $.each(samuToday,(i,e)=>{
      if($.inArray(e.Sede,sedes)===-1){
        sedes.push(e.Sede);
      }
    });

    let ausentes = 0, puntuales = 0, tarde = 0;

    $.each(sedes,(i,e)=>{
      const  divSamus = $(`<ul class="collapsible" data-collapsible="expandable" id =${e}></ul>`);
      const li =$('<li></li>');
      const divHeader =$('<div class="collapsible-header"></div>');
      const divBody =$('<div class="collapsible-body"></div>');
      const title = $(`<div class="title_samu"><h4 class="left-align">${e}</h4></div>`);
      const bodyCase =$('<div class="flex_center"></div>');
      title.append(bodyCase);
      samuToday.forEach(function(samu){
        if(e == samu.Sede){
          switch (samu.Asistencia) {
            case 'Ausente' : ausentes++;
            Tausentes++;
            break;
            case 'Puntual' : puntuales++;
            Tpuntuales++;
            break;
            case 'Tarde' : tarde++;
            Ttarde++;
            break;
          }

          detalle(samu, divBody);
        }

      });
      detalle_samus.append(divSamus);
      divSamus.prepend(li);
      li.append(divHeader ,divBody);
      divHeader.append(title)
      bodyCase.append(`<div class="sizedetail"><p class="Ausente">Ausente </p><p>${ausentes}</p></div>`);
      bodyCase.append(`<div class="sizedetail"><p class="Puntual">Puntual </p><p> ${puntuales}</p></div>`);
      bodyCase.append(`<div class="sizedetail"><p class="Tarde">Tarde </p><p> ${tarde}</p></div>`);

      ausentes = 0;
      puntuales = 0;
      tarde = 0;
      $(document).ready(function(){
        console.log("hola");
        $('.collapsible').collapsible();
      });
    });
    console.log(Tpuntuales);
    console.log(Tausentes);
    TPuntual.text(Tpuntuales);
    TAusente.text(Tausentes);
    TTarde.text(Ttarde);
  });

  mapContainer.append(mapa);
  reportSamu.append(container_OK);

  container.append(mapContainer);
  container.append(reportSamu);
  return container;
};

const detalle = (samu, container)=> {
  const divImg =$('<div class="detail_samu"></div>');
  const imgSamu =$(`<img src="assets/img/${samu.Tipo}.svg"  class="img-responsive" alt="foto">`)
  const spanSamu = $(`<p>${samu.Samu}</p>`);
  const spanEstado = $(`<span class="${samu.Estado}">${samu.Estado}</span>`);
  container.append(divImg);
  divImg.append(imgSamu,spanSamu,spanEstado);
}

function initMapa() {

  const map = new GMaps({
    div: '#map',
    lat: -12.043333,
    lng: -77.028333,
    zoom: 12
  });
  state.total.locales.forEach((elem)=> {
    addMarkerMap(map,elem);
  });

  GMaps.geolocate({
    success: (position) => {
      map.setCenter(position.coords.latitude, position.coords.longitude);
      map.setZoom(13);
    },
    error: function (error) {
      alert('Geolocalización fallada: ' + error.message);
    },
    not_supported: function () {
      alert("Tu navegador no soporta la API geolocation");
    }
  });


};

function addMarkerMap(map,elem) {
  map.addMarker({
    lat: elem.latitud,
    lng: elem.longitud,
    color: 'gray',
    zoom: 12
  });
}
