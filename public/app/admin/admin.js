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
            window.$contenedor = Admin.$contenedor;
        }
    };
}();