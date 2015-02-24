/*
 *  Document   : admin.js
 *  Author     : GTechnology

 */

var Monitor =  function() {
    var $page_content, $monitor, $parameters;

    // Draw Map
    var drawMap = function(latitude, longitude) {
        var map = new GMaps({
            div: '#page',
            lat: latitude,
            lng: longitude,
            zoom: 12
        });
        map.refresh();

        var data = null;
        for (var i = 0; i < Admin.$alerts.length; i++) {
            data = Admin.$alerts[i];

            var marker = map.addMarker({
                lat: data.latitude,
                lng: data.longitude,
                icon: 'assets/img/alert.png',
                id: data.id,
                infoWindow: {
                    content: '<span><strong>Miembro:</strong> ' + data.member.person.name + ' ' + data.member.person.lastname + ' </span> <br /> ' +
                    '<span><strong>Area:</strong> ' + data.area.description + '</span> <br />' +
                    '<span><strong>Direccion:</strong> ' + data.address + '</span> <br/>' +
                    '<span><strong>Observacion:</strong>' + data.observation + '</span>'
                }
            });

            if ($parameters && $parameters.id == Admin.$alerts[i].id) {
                map.setCenter($parameters.latitude, $parameters.longitude);
                map.setZoom(15);

                marker.setAnimation(google.maps.Animation.BOUNCE);
            }
        }

        return map;
    }

    var getValue = function(string) {
        return parseInt(string.substr(0, string.indexOf('p')));
    }

    //Geolocalization
    var successGeo = function(position) {
        Admin.$map = drawMap(position.coords.latitude, position.coords.longitude);
        Admin.$latitude = position.coords.latitude;
        Admin.$longitude = position.coords.longitude;
    }

    var errorGeo = function(msg) {
        Admin.$map = drawMap(14.622273, -90.562246);
        Admin.$latitude = 14.622273;
        Admin.$longitude = -90.562246;
    }

    return {
        init: function() {
            $monitor = $('#page');
            $page_content = $('#page-content');
            $page_content.attrchange({
                callback: function () {
                    var el = $(this);
                    var pt = getValue(el.css('padding-top'));
                    var pb = getValue(el.css('padding-bottom'));
                    var height = getValue(el.css('min-height'));
                    var height_final = height - pt - pb;

                    $monitor.css('height', height_final);

                    if (Admin.$map)
                        Admin.$map.refresh();

                }
            }).resizable();
            $parameters = Helper.getUrlParameters();

            if (Admin.$latitude) {
                Admin.$map = drawMap(Admin.$latitude, Admin.$longitude);
            } else {
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
                } else {
                    console.log('Geolocalization not supported');
                }
            }
        }
    }
}();