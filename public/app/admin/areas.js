$(function(){
    $('[data-toggle="tooltip"], .enable-tooltip').tooltip({container: 'body', animation: false});

    var $mapCreate,$mapEdit,$mapView,$list_title,$color1,$color2,$indexNew=0,$indexEdit=0,
        $pointsNew = Array(),
        $pointsEdit = Array(),
        $pointsView = Array(),
        $poligons = Array();

    window.table = App.initDT('.table');
    $list_title = $('#list-description');
    $color1 = Helper.color('#color-create',function(hex,opacity){
        if($mapCreate)
            drawPoligon($pointsNew,$mapCreate,hex);
    });
    $color2 = Helper.color('#color-edit',function(hex,opacity){
        if($mapEdit)
            drawPoligon($pointsEdit,$mapEdit,hex);
    });

    // Events
    $('#btn-create').on('click',function(e){
        $('#list').fadeOut();
        $list_title.text("Crear");
        $('#div-create').fadeIn();
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(successGeo, errorGeo);
        } else {
            console.log('Geolocalization not supported');
        }
        e.preventDefault();
    });

    $('#btn-save').on('click',function(){
        var data = $('#form-create').serialize();
        var form = document.getElementById('form-create');
        $pointsNew = $pointsNew.filter(function(n){
            return n!=null;
        });

        data += '&points=' + JSON.stringify($pointsNew);
        Helper.blockPage();

        $.ajax({
            url: form.action,
            data: data,
            dataType: 'json',
            type: form.method,
            success: function(response){
                Helper.unblockPage();
                if(response) {
                    if(response.success){
                        Helper.alert('Exito',response.message,'success');
                        setTimeout(function(){$(Admin.$contenedor).load("admin/areas");},1000);
                    }else{
                        Helper.alert('Error',response.message,'danger');
                    }
                }
            },
            error: function(xhr,ajaxOptions,thrownError){
                console.log(xhr.status);
                console.error(thrownError);
            }
        });
    });

    $('#btn-cancel-create').on('click',function(){
        $('#div-create').fadeOut();
        $list_title.text('Listado');
        $('#list').fadeIn();
    });

    $('#btn-edit').on('click',function(){
        var data = $('#form-edit').serialize();
        var form = document.getElementById('form-edit');
        $pointsEdit = $pointsEdit.filter(function(n){
            return n!=null;
        });
        data += '&points=' + JSON.stringify($pointsEdit);
        Helper.blockPage();
        $.ajax({
            url: form.action + '/' + $(form).data('id'),
            data: data,
            dataType: 'json',
            type: form.method,
            success: function(response){
                Helper.unblockPage();
                if(response) {
                    if(response.success){
                        Helper.alert('Exito',response.message,'success');
                        setTimeout(function(){$(Admin.$contenedor).load("admin/areas");},1000);
                    }else{
                        Helper.alert('Error',response.message,'danger');
                    }
                }
            },
            error: function(xhr,ajaxOptions,thrownError){
                console.log(xhr.status);
                console.error(thrownError);
            }
        });
    });

    $('#btn-cancel-edit').on('click',function(){
        $('#div-edit').fadeOut();
        $list_title.text('Listado');
        $('#list').fadeIn();
    })

    $('.edit').on('click',function(e){
        var id = $(this).data('id');
        $.ajax({
            url: 'admin/areas/' + id + '/edit',
            dataType: 'json',
            type: 'GET',
            success: function(response) {
                // Head
                $('#form-edit [name=code]').val(response.data.code);
                $('#form-edit [name=description]').val(response.data.description);
                $('#form-edit [name=color]').val(response.data.color);
                $('#form-edit').data('id',id);

                // Points
                $mapEdit = new GMaps({
                    div: '#mapEdit',
                    zoom: 12,
                    lat: 14.589177,
                    lng: -90.525627,
                    click: function(e){
                        var nMarkers = $mapEdit.markers.length;
                        //if ( ($tipo==1 && nMarkers==0) || $tipo==0 ) {
                        if (true){
                            $mapEdit.addMarker({
                                lat: e.latLng.lat(),
                                lng: e.latLng.lng(),
                                id: $indexEdit,
                                draggable: true,
                                dragend: function(e){
                                    $pointsEdit[this.id] = {latitude:e.latLng.lat(),longitude:e.latLng.lng()};
                                    drawPoligon($pointsEdit,$mapEdit,$color2.val() || "#000000");
                                },
                                click: function(e){
                                    $mapEdit.removeMarker(this);
                                    $pointsEdit[this.id] = null;
                                    drawPoligon($pointsEdit,$mapEdit,$color2.val() || "#000000");
                                }
                            });

                        }else{
                            Helper.alert("Error","Debe elegir una forma","danger");
                        }
                        $indexEdit+=1

                        $pointsEdit.push({latitude: e.latLng.lat(),longitude: e.latLng.lng()});
                        drawPoligon($pointsEdit,$mapEdit,$color2.val() || "#000000");
                    }
                });

                var counter=0;
                $.each(response.data.points,function(key,value){
                    if (counter==0){
                        $mapEdit.setCenter(parseFloat(value.latitude), parseFloat(value.longitude));
                        counter+=1
                    }

                    $mapEdit.addMarker({
                        lat: value.latitude,
                        lng: value.longitude,
                        id: $indexEdit,
                        draggable: true,
                        dragend: function(e){
                            $pointsEdit[this.id] = {latitude:e.latLng.lat(),longitude:e.latLng.lng()};
                            drawPoligon($pointsEdit,$mapEdit,$color2.val() || "#000000");
                        },
                        click: function(e){
                            $mapEdit.removeMarker(this);
                            $pointsEdit[this.id] = null;
                            drawPoligon($pointsEdit,$mapEdit,$color2.val() || "#000000");
                        }
                    });

                    $pointsEdit.push({latitude:parseFloat(value.latitude),longitude:parseFloat(value.longitude)});
                    $indexEdit+=1;
                });

                drawPoligon($pointsEdit,$mapEdit,$color2.val() || "#000000");

                $('#list').fadeOut();
                $list_title.text("Editar");
                $('#div-edit').fadeIn();
                $mapEdit.refresh();
            }
        });

        e.preventDefault();
    });

    $('.view').on('click',function(e){
        var id = $(this).data('id');
        $.ajax({
            url: 'admin/areas/' + id + '/edit',
            dataType: 'json',
            type: 'GET',
            success: function(response) {
                var counter=0;
                $pointsView = new Array();
                // Points
                $mapView = new GMaps({
                    div: '#mapView',
                    zoom: 10,
                    lat: 14.589177,
                    lng: -90.525627
                });
                $.each(response.data.points,function(key,value){
                    if (counter==0){
                        $mapView.setCenter(parseFloat(value.latitude), parseFloat(value.longitude));
                    }
                    $pointsView.push({latitude:parseFloat(value.latitude),longitude:parseFloat(value.longitude)});
                    counter+=1;
                });

                drawPoligon($pointsView,$mapView,response.data.color);
                setTimeout(function(){
                    $mapView.refresh();
                },1000);

                $('#modal-view').modal({show:true});
            }
        });

        e.preventDefault();
    });

    // Draw Map
    function drawMapCreate(latitude, longitude) {
        var map =  new GMaps({
            div: '#mapCreate',
            lat: latitude,
            lng: longitude,
            zoom: 12,
            click: function(e){
                //Number markers
                var nMarkers = $mapCreate.markers.length;
                //if ( ($tipo==1 && nMarkers==0) || $tipo==0 ) {
                if(true) {
                    $mapCreate.addMarker({
                        lat: e.latLng.lat(),
                        lng: e.latLng.lng(),
                        id: $indexNew,
                        draggable: true,
                        dragend: function(e){
                            $pointsNew[this.id] = {latitude:e.latLng.lat(),longitude:e.latLng.lng()};
                            drawPoligon($pointsNew,$mapCreate,$color1.val() || "#000000");
                        },
                        click: function(e){
                            $mapCreate.removeMarker(this);
                            $pointsNew[this.id] = null;
                            drawPoligon($pointsNew,$mapCreate,$color1.val() || "#000000");
                        }
                    });

                    $pointsNew.push({latitude:e.latLng.lat(),longitude: e.latLng.lng()});
                    $indexNew+=1;
                    drawPoligon($pointsNew,$mapCreate,$color1.val() || "#000000");
                }
                else{
                    Helper.alert("Error","Debe elegir una forma");
                };
            }
        });
        map.refresh();
        return map;
    }

    // Draw poligon
    function drawPoligon(points,map,color) {
        if ($poligons!=null) {
            var counter =$poligons.length;

            for (var i = 0; i < counter; i++) {
                map.removePolygon($poligons[i]);
            };

            $poligons=Array();
            map.polygons= Array();
        };

        if (points.length>0) {
            if (false) {
                var radio = parseInt($('#txtradio').val());
                if (isNaN(radio)) { radio = 500; };
                var polygon = map.drawCircle({
                    strokeColor: color,
                    strokeOpacity: 1,
                    strokeWeight: 3,
                    fillColor: color,
                    fillOpacity: 0.6,
                    lat: points[0][0],
                    lng: points[0][1],
                    radius: radio
                });
                $poligons.push(polygon);
            } else{
                var pointsDraw = new Array();
                for (var i = 0; i < points.length; i++) {
                    if (points[i]) {
                        pointsDraw.push(Array(points[i].latitude,points[i].longitude));
                    };
                };

                if (points.length>1) {
                    var polygon = map.drawPolygon({
                        paths: pointsDraw,
                        strokeColor: color,
                        strokeOpacity: 1,
                        strokeWeight: 3,
                        fillColor: color,
                        fillOpacity: 0.6
                    });
                    $poligons.push(polygon);
                };
            };
        };
    }

    //Geolocalization
    function successGeo(position) {
        $mapCreate = drawMapCreate(position.coords.latitude,position.coords.longitude);
    }

    function errorGeo(msg) {
        $mapCreate = drawMapCreate(14.622273, -90.562246);
    }


});


