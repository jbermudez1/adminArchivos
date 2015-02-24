/*
 *  Document   : admin.js
 *  Author     : GTechnology

 */

var Admin = function() {
    var removeLinks = function() {
        $('.sidebar-nav').find('.active').removeClass('active');
    }

    var assignLinks = function (referencia) {
        $link = $("a[href='" + referencia + "']");
        $link.addClass('active');
        $link.parents('li .menu').addClass('active');
    }

    var $app = null;

    return {
        $contenedor : '#page',
        $idarea:null,
        $latitude: null,
        $longitude: null,
        $alerts: null,
        init: function() {
            $app = $.sammy(this.$contenedor, function() {
                // Configure routes of Sammy
                this.get('#/:route',function(context) {
                    var $route = this.params['route'];
                    removeLinks();
                    Helper.blockPage();
                    context.app.swap('');
                    context.$element().load("admin/" + $route,function(){
                        assignLinks('#/' + $route);
                        $('.tooltip').remove();
                        if($route!="monitor")
                            $(Admin.$contenedor).attr('style','');
                        Helper.unblockPage();
                    });
                });

                this.get('#/:route/:option/:field',function(context) {
                    var $route = this.params['route'];
                    var $option = this.params['option'];
                    var $field = this.params['field'];
                    removeLinks();
                    Helper.blockPage();
                    context.app.swap('');
                    context.$element().load("admin/" + $route + '/' + $option + '/' + $field,function(){
                        assignLinks('#/' + $route);
                        $('.tooltip').remove();
                        if($route!="monitor")
                            $(Admin.$contenedor).attr('style','');
                        Helper.unblockPage();
                    });
                });

                // Route not found
                this.notFound= function  (context) {
                    console.info('No se ha encontrado la URL: ' + context);
                }
            });

            $app.run('#/monitor');
            App.datatables();
            window.$contenedor = Admin.$contenedor;

            // Get Alerts
            $.ajax({
                url: 'admin/getAlerts',
                type: 'POST',
                dataType: 'json',
                success: function(response){
                    Admin.$alerts = response.data;
                }
            });

            // Load Alerts
            $('#alerts-list').load('admin/getAlerts',function(){
                $('.alert-update').on('submit',function(e){
                    var el = $(this);
                    var id = el.prop('id');
                    var parent = el.parents('.alert-base');
                    CRUD.action(document.getElementById(id), function(response){
                        if(response.success){
                            Helper.alert('Exito',response.message,'success')
                            //debugger;
                            parent.find('.observation').text(el.find('[name=observation]').val());
                            parent.find('.observation').fadeIn();

                            //Remove form
                            el.parent().remove();
                        }else{
                            Helper.alert('Error',response.message,'danger');
                        }
                    });
                    e.preventDefault();
                });
            });
        }
    };
}();