/*
 *  Document   : admin.js
 *  Author     : GTechnology

 */

var Admin = function() {
    var removeLinks = function() {
        $('.sidebar-nav').find('.active').removeClass('active');
    }

    var assignLinks = function (referencia) {
        var $link = $("a[href='" + referencia + "']");
        $link.addClass('active');
        $link.parents('li .menu').addClass('active');
    }

    var $app = null;

    return {
        $contenedor : '#page',
        form_password: function() {
            $('#btn-open-password').click(function(e){
                $('#modal-password').modal({show:true});
                var form = $('#form-password');
                form.find('input').not(':hidden').val('');

                var alert = form.parent().parent().find('.alert');
                alert.hide();
                e.preventDefault();
            });

            // Validate form password
            Helper.rules = {
                'password':{
                    required : true
                },
                'new-password'  : {
                    required  : true,
                    minlength: 5
                },
                'new-password-confirm' : {
                    equalTo: "#new-password"
                }
            };
            Helper.messages = {
                'password':{
                    required: 'Debe ingresar la contraseña actual'
                },
                'new-password': {
                    required: 'Debe ingresar la nueva contraseña',
                    minlength: "Debe tener al menos 5 caracteres"
                },
                'new-password-confirm' : {
                    'equalTo' : 'Debe ser igual a la contraseña nueva'
                }
            }
            Helper.validate('#form-password');

            // Configure event to button change
            $('#btn-password').click(function(){
                if($('#form-password').valid()) {
                    $('#btn-password').prop('disabled',true);
                    CRUD.action('#form-password', function () {
                        $('#btn-password').prop('disabled',false);
                        setTimeout(function(){
                            $('#modal-password').modal('hide');
                        },1500)
                    });
                }
            });
        },
        init: function() {
            $app = $.sammy(this.$contenedor, function() {
                // Configure routes of Sammy
                this.get('#/:route',function(context) {
                    var $route = this.params['route'];
                    console.info('Get route ---> ' + $route);
                    removeLinks();
                    Helper.blockPage();
                    context.app.swap('');

                    if($route=='manager') {
                        $('#page-content').addClass('inner-sidebar-left');
                    }else {
                        $('#page-content').removeClass('inner-sidebar-left');
                    }

                    context.$element().load($route,function(){
                        assignLinks('#/' + $route);
                        $('.tooltip').remove();
                        Helper.unblockPage();
                    });
                });

                // Route not found
                this.notFound= function  (context) {
                    console.info('No se ha encontrado la URL: ' + context);
                }
            });

            $app.run('#/manager');
            App.datatables();
            Admin.form_password();
            window.$contenedor = Admin.$contenedor;
        }
    };
}();