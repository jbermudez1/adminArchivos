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

    var $contenedor_default = "#page";
    var $old_class = "";
    var $old_container = "";

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

                    var $link = $("a[href='#/" + $route + "']");
                    if($link.data('container').length>0) {
                        $old_class = $link.data('class');
                        this.element_selector = $link.data('container');
                        $(this.element_selector).addClass($old_class);
                    } else {
                        $(Admin.$contenedor).removeClass($old_class);
                        this.element_selector = $contenedor_default;
                    }

                    Admin.$contenedor= this.element_selector;

                    context.$element().load($route,function(){
                        assignLinks('#/' + $route);
                        $('.tooltip').remove();
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

            $app.run('#/manager');
            App.datatables();
            window.$contenedor = Admin.$contenedor;
        }
    };
}();