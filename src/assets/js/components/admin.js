const Unidad = (update) =>{
  const container = $('<section class="container"></section>');

    //Mapa
    const mapContainer =$('<div class="map-container"></div>');
    mapContainer.append(samuMap());
    container.append(mapContainer);

    return container;
};
