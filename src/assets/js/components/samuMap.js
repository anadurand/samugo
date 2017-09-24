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
