$(function(){
    // Variables
    window.$list_title = $('#list-description');

    // Events
    $('.status').on('click',prepareStatus);

    $('#form-create').formwizard({
        disableUIStyles: true,
        validationEnabled: true,
        validationOptions: {
            errorClass: 'help-block animation-slideDown', // You can change the animation class for a different entrance animation - check animations page
            errorElement: 'span',
            errorPlacement: function(error, e) {
                e.parents('.form-group > div').append(error);
            },
            highlight: function(e) {
                $(e).closest('.form-group').removeClass('has-success has-error').addClass('has-error');
                $(e).closest('.help-block').remove();
            },
            success: function(e) {
                // You can use the following if you would like to highlight with green color the input after successful validation!
                e.closest('.form-group').removeClass('has-success has-error'); // e.closest('.form-group').removeClass('has-success has-error').addClass('has-success');
                e.closest('.help-block').remove();
            },
            rules: {
                'user': {
                    required: true,
                    minlength: 2
                },
                'password': {
                    required: true,
                    minlength: 5
                },
                'confirm-password': {
                    required: true,
                    equalTo: '#password-original'
                },
                'email': {
                    required: true,
                    email: true
                },
                'name': {
                    required: true
                },
                'lastname': {
                    required:true
                },
                'dpi': {
                    required: true,
                    digits: true
                },
                'address': {
                    required: true,
                    minlength: 5
                },
                'phone': {
                    required: true,
                    digits: true
                },
                'idbank': {
                    required: true
                },
                'accountnumber': {
                    required: true,
                    digits: true
                },
                'idarea': {
                    required: true
                }
            },
            messages: {
                'user': {
                    required: 'Por favor ingrese un nombre de usuario',
                    minlength: 'El nombre de usuario debe ser de al menos 2 caracteres'
                },
                'password': {
                    required: 'Por favor ingrese una contraseña',
                    minlength: 'Tu contraseña debe ser de al menos 5 caracteres'
                },
                'confirm-password': {
                    required: 'Por favor ingrese una contraseña',
                    equalTo: 'Por favor ingrese la misma contraseña',
                    minlength: 'Tu contraseña debe ser de al menos 5 caracteres'
                },
                'email': 'Por favor ingrese una direccion de correo valida',
                'name': 'Por favor ingrese su nombre',
                'lastname': 'Por favor ingrese su apellido',
                'dpi': 'Por favor ingrese su DPI, se aceptan solo digitos',
                'address': {
                    required: 'Por favor ingrese su direccion',
                    minlength: 'La direccion debe ser de al menos 5 caracteres '
                },
                'phone': 'Por favor ingrese su numero de telefono, solo se aceptan digitos',
                'idbank': 'Por favor eliga un banco',
                'accountnumber': 'Por favor ingrese su numero de cuenta, solo se aceptan digitos',
                'idarea': 'Por favor seleccione un area'
            }
        },
        inDuration: 0,
        outDuration: 0,
        textBack: 'Atras',
        textNext: 'Siguiente',
        textSubmit: 'Confirmar'
    });

    $('#form-create').submit(function(e){
        if($('#form-create').valid()){
            CRUD.action(document.getElementById('form-create'), function(){
                $(Admin.$contenedor).load('admin/members',function(){
                    $('#modal-create').modal('hide');
                    $('.modal-backdrop').remove();
                })
            });
        }
        e.preventDefault();
        return false;
    });

    // Functions
    function prepareStatus(e){
        var id = $(this).data('id');
        $('#div-status').load('admin/members/status/'+id,function(){
            $('#modal-status').modal({show:true});
            $('#btn-status').click(function(){
                var form = $('#form-status');
                var action = form.prop('action');
                action = action + '/' + id;
                form.prop('action',action);

                CRUD.action(document.getElementById('form-status'), function () {
                    $(Admin.$contenedor).load('admin/members', function () {
                        $('#modal-status').modal('hide');
                        $('.modal-backdrop').remove();
                    })
                });
            });
        });
        e.preventDefault();
    }

    // Plugins
    window.table = App.initDT('.table');
    $('[data-toggle="tooltip"], .enable-tooltip').tooltip({container: 'body', animation: false});
});