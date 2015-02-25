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
        init: function() {
            $app = $.sammy(this.$contenedor, function() {
                // Configure routes of Sammy
                this.get('#/:route',function(context) {
                    var $route = this.params['route'];
                    removeLinks();
                    Helper.blockPage();
                    context.app.swap('');
                    context.$element().load($route,function(){
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

            $app.run('#/categories');
            App.datatables();
            window.$contenedor = Admin.$contenedor;
        }
    };
}();