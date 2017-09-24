const Admin = (update) =>{
  const container = $('<section class="container"></section>');

    //Mapa
    const mapContainer =$('<div class="map-container"></div>');
    const mapa = $('<div id="map"></div>');


    // mapContainer.append(samuMap());
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