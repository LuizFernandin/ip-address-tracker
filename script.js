function load(positionInit) {
    $("div").remove(".mapboxgl-canary");
    $("div").remove(".mapboxgl-canvas-container");
    $("div").remove(".mapboxgl-control-container");

    positionInit = (typeof positionInit == 'undefined') ? positionInit = [-73.968898, 40.778848] : positionInit;

    console.log(positionInit)
    
    let geojson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
            type: 'Point',
            coordinates: positionInit
            },
        }]
    };

    mapboxgl.accessToken = 'pk.eyJ1IjoibHVpemZlcm5hbmRpbiIsImEiOiJja2x6YmhxeWowcjMzMnZxa2djNTg4eWsyIn0.eCE8ppXmgqkAjqMpE6BsDQ';
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/streets-v11',
        center: positionInit,
        zoom: 13
    });

    geojson.features.forEach(function(marker) {
        let el = document.createElement('div');
        el.className = 'marker';
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(map);
    });

}

const form = document.querySelector("#some-form")
form.addEventListener('submit', e => {
    e.preventDefault()

    let ip = $("#ipIpnput").val();

    const api_key = "at_Fn9vtS5t80WUp6i0z8dH2xiAMATVv";
    $(function () {
       $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {apiKey: api_key, ipAddress: ip},
            beforeSend: function() {
                // $("#map").hide()
                // $("#map").css('max-width', '0');
                // $("#map").css('max-height', '0');
            },
            success: function(data) {

                $("#ipResult").text(data.ip)
                $("#locationResult").text(data.location.region + ", " + data.location.country)
                $("#timeZoneResult").text("UTC " + data.location.timezone)
                $("#ispResult").text(data.isp)

                let positionNew = [data.location.lng, data.location.lat]
                load(positionNew);

                // $("#map").show()
                // $("#map").css('max-width', '100vw');
                // $("#map").css('max-height', '100vh');
           }
       });
    });

})