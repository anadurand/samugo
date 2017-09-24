const showMap = (inputSearch) => {
    const mapa = $('<div id="map"></div>');
    let latitud, longitud;
    $( _ =>{
        //Crea el mapa
        const map = new GMaps({
            div: '#map',
            lat: -12.043333,
            lng: -77.028333,
            setZoom: 12
        });

        //Añade marcador a Mapa
        state.unidad.forEach((elem)=> {
          addMarkerMap(map,elem);
        });

        //Ubicación actual
        const divDistance = $(`<div class="distance"></div>`);
        GMaps.geolocate({
            success: function(position) {
                latitud = position.coords.latitude;
                longitud = position.coords.longitude;
                map.setCenter(latitud, longitud);

                  map.addMarker({
                    lat: latitud,
                    lng: longitud,
                    color: 'blue',
                    animation: google.maps.Animation.DROP,
                    setZoom:9,
                    infoWindow: {
                        content: '<div style="color:#212121;"><strong>Tu ubicación actual:</strong><p>Lima</p></div>'
                    }
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
    return mapa;
};

function addMarkerMap(map,elem) {
    map.addMarker({
        lat: elem.latitud,
        lng: elem.longitud,
        title: elem.nombre,
        animation: google.maps.Animation.DROP,
        color: elem.colorEstado,

        infoWindow: {
            content: `<div style="color:#212121;">
                        <strong>${elem.nameSamu}</strong>
                        <p>${elem.tipoSamu}</p>
                      </div>`
        }
    });
}
