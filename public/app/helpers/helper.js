/*
 *  Document   : admin.js
 *  Author     : GTechnology

 */

var Helper = function() {
    Number.prototype.formatMoney = function(c, d, t){
        var n = this,
            c = isNaN(c = Math.abs(c)) ? 2 : c,
            d = d || ".",
            t = t || ",",
            s = n < 0 ? "-" : "",
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "",
            j = (j = i.length) > 3 ? j % 3 : 0;
        return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
    };

    var loader_div = $('#loader-div');
    var loader_page = $('#loader-page');
    return {
        rules: null,
        messages:null,
        blockPage: function() {
            loader_page.fadeIn();
        },
        unblockPage:  function() {
            loader_page.hide();
        },
        blockDiv: function(id_div) {
            var el = $(id_div);

            // Find preloader
            var preloader = el.find('.preloader').first();
            if(preloader.length>0) {
                preloader.fadeIn()
            }else {
                var clone = loader_div.clone();
                el.css('position','relative');
                el.append(clone);
                clone.fadeIn();
            }
        },
        unblockDiv: function(id_div) {
            var el = $(id_div);

            // Find preloader
            var preloader = el.find('.preloader').first();
            if(preloader.length>0)
                preloader.hide();
        },
        alert: function(title, message,type){
            type = type || "success";
            $.bootstrapGrowl('<h4><strong>' + title + '</strong></h4> <p>' + message + '</p>', {
                type: type,
                delay: 3000,
                allow_dismiss: true,
                offset: {from: 'top', amount: 20}
            });
        },
        color: function(selector,change) {
            $(selector).minicolors({
                control: $(this).attr('data-control') || 'hue',
                defaultValue: $(this).attr('data-defaultValue') || '',
                inline: $(this).attr('data-inline') === 'true',
                letterCase: $(this).attr('data-letterCase') || 'lowercase',
                opacity: $(this).attr('data-opacity'),
                position: $(this).attr('data-position') || 'bottom left',
                change: change,
                theme: 'bootstrap'
            });
            return $(selector);
        },
        getUrlParameter: function(param) {
            var sPageURL = window.location.hash.substr(window.location.hash.indexOf('?') + 1)

            if (sPageURL.indexOf('#')==0)
                return null;

            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == param)
                {
                    return sParameterName[1];
                }
            }
        },
        getUrlParameters: function() {
            var sPageURL = window.location.hash.substr(window.location.hash.indexOf('?') + 1)

            if (sPageURL.indexOf('#')==0)
                return null;

            var sURLVariables = sPageURL.split('&');
            var result = {};
            for (var i = 0; i < sURLVariables.length; i++)
            {
                var sParameterName = sURLVariables[i].split('=');
                result[sParameterName[0]] = sParameterName[1];
            }

            if(Helper.sizeObject(result) > 0 )
                return result;
            else
                return null;
        },
        sizeObject:  function(obj){
            var size = 0, key;
            for (key in obj) {
                if (obj.hasOwnProperty(key)) size++;
            }
            return size;
        },
        validate: function(idform){
            $(idform).validate({
                errorClass: 'help-block animation-pullUp', // You can change the animation class for a different entrance animation - check animations page
                errorElement: 'div',
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
                rules: Helper.rules,
                messages: Helper.messages
            });
        },
        goTo: function (container, idElementTo, duration,last_difference){
            if (duration < 0) return;

            last_difference = typeof last_difference !== 'undefined' ? last_difference : -1;
            to = document.getElementById(idElementTo);

            var difference = to.offsetTop - container.scrollTop;
            var perTick = difference / duration * 10;

            if (last_difference === difference ) return;

            setTimeout(function() {
                container.scrollTop = container.scrollTop + perTick;
                if (container.scrollTop === to.offsetTop) return;
                Helper.goTo(container, to.id, duration - 10,difference);
            }, 10);
        }
    };
}();