$(function(){
    var $alert_base = $('#alert-example');
    var $alert_list = $('#alerts-list');
    var $node;
    var $audio = document.createElement('audio');

    connectNode();

    function connectNode () {
        if(typeof io !="undefined")
        {
            $node = io.connect("http://104.131.59.219:3000");
            $node.on("connect", function() {
                if(Admin.$idarea) {
                    $node.emit('joinArea',Admin.$idarea);
                }else{
                    $node.emit('joinSuper');
                }
                console.info('Conectado al servidor');
            });

            $node.on('connect-super',function(data){
                console.info(data);
            });

            $node.on('connect-area',function(data){
                console.info(data);
            });

            $node.on('showAlert',showAlert);
            $node.on('falseAlert',falseAlert);
        }
        else
        {
            Helper.alert('Error','Verifique su conexion a internet','warning')
        }
    }

    function showAlert(data)
    {
        // Notify
        Helper.alert('Alerta','Se ha recibido una nueva alerta','danger');

        // Add alert
        var alert_new = $(data.html);
        alert_new.data('id',data.id);
        alert_new.addClass('not-visible');
        $alert_list.prepend(alert_new);

        alert_new.fadeIn();

        // Add marker
        if(Admin.$map)
        {
            var marker = Admin.$map.addMarker({
                lat: data.alert.latitude,
                lng: data.alert.longitude,
                icon: 'assets/img/alert.png',
                id: data.alert.id,
                infoWindow: {
                    content: '<span><strong>Miembro:</strong> ' + data.alert.member.person.name + ' ' + data.alert.member.person.lastname + ' </span> <br /> ' +
                    '<span><strong>Area:</strong> ' + data.alert.area.description + '</span> <br />' +
                    '<span><strong>Direccion:</strong> ' + data.alert.address + '</span> <br/>' +
                    '<span><strong>Hora y Fecha:</strong>' + data.alert.created_at + '</span> <br/>' +
                    '<span><strong>Observacion:</strong>' + data.alert.observation + '</span>'
                }
            });

            Admin.$map.setCenter(data.alert.latitude,data.alert.longitude);
            Admin.$map.setZoom(15);

            marker.setAnimation(google.maps.Animation.BOUNCE);
        }

        // Add data
        Admin.$alerts.push(data.alert);

        // Set Event
        var form = alert_new.find('form');
        var id = form.prop('id');

        form.on('submit',function(e){
            CRUD.action(document.getElementById(id), function(response){
                if(response.success){
                    Helper.alert('Exito',response.message,'success')

                    alert_new.find('.observation').text(form.find('[name=observation]').val());
                    alert_new.find('.observation').fadeIn();
                    //Remove form
                    form.parent().remove();
                }else{
                    Helper.alert('Error',response.message,'danger');
                }
            });
            e.preventDefault();
        })

        playAlert();
    }

    function falseAlert(data)
    {
        // Notify
        Helper.alert('Alerta','La alerta de <strong>' + data.alert.member.person.name + ' ' + data.alert.member.person.lastname + '</strong> fue una falsa alarma','warning')

        // Get alert and modify
        var alert_div = $('#alert-' + data.alert.id);
        alert_div.find('.label-danger').fadeIn();

        playAlert();
    }

    function playAlert(){
        if ($audio != null && $audio.canPlayType && $audio.canPlayType("audio/mpeg"))
        {
            $audio.src = "assets/mp3/alert.mp3";
            $audio.play();
        }else{
            console.log('Error al reproducir');
        }
    }
});