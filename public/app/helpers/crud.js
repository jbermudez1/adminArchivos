/*
 *  Document   : crud.js
 *  Author     : GTechnology
 */

var CRUD = function(){
    return {
        url_base: '',
        ajax: function(url,data,beforeSend,success) {
            $.ajax({
                url: url,
                data: data,
                cache: false,
                contentType: false,
                beforeSend: beforeSend,
                type: 'GET',
                success: function(response){
                    if (success && typeof success === "function" ){
                        success(response);
                    }
                },
                error: function(xhr,ajaxOptions,thrownError){
                    console.log(xhr.status);
                    console.error(thrownError);
                }
            });
        },
        uploadImage: function(e) {
            var file, fr, holder,label,input;
            file = e.target.files[0];
            holder = $(this).parent().parent().parent().parent().find('.holder');
            input = $(this).parent().parent().parent().find('input[type=text]');
            label = $(e.target).val().replace(/\\/g, '/').replace(/.*\//, '');
            if (file) {
                fr = new FileReader();
                fr.onloadend = function(img) {
                    holder.css({
                        background: "url('" + img.target.result + "') no-repeat center center",
                        backgroundSize: 'cover'
                    });
                    input.val(label);
                    return holder.find('i').hide();
                };
                return fr.readAsDataURL(file);
            }
        },
        uploadFile: function(e) {
            var file, fr, holder,label,input;
            file = e.target.files[0];
            input = $(this).parent().parent().parent().find('input[type=text]');
            label = $(e.target).val().replace(/\\/g, '/').replace(/.*\//, '');
            if (file) {
                fr = new FileReader();
                fr.onloadend = function(file) {
                    input.val(label);
                };
                return fr.readAsDataURL(file);
            }
        },
        prepareData: function(form) {
            var data, fields;
            data = new FormData();
            fields = $(form).find('input, textarea, select');
            fields.each(function() {
                var input;
                input = $(this);
                if (input.is('[type=file]')) {
                    if (input[0].files.length > 0) {
                        data.append(input.prop('name'), input[0].files[0]);
                    }
                }
                else if(input.is('[type=checkbox]')){
                    data.append(input.prop('name'),input.prop('checked'))
                }
                else{
                    data.append(input.prop('name'), input.val());
                }
            });
            return data;
        },
        action: function(form,callback){
            var data = this.prepareData(form);
            form = $(form);
            $.ajax({
                url: form.prop('action'),
                data: data,
                cache: false,
                contentType: false,
                processData: false,
                type: form.prop('method'),
                success: function(response){
                    console.log(response);
                    if(response) {
                        var alert = form.parent().parent().find('.alert');
                        if(response.success){
                            alert.removeClass('alert-danger').addClass('alert-success');
                        }else{
                            alert.html(response.message);
                            alert.removeClass('alert-success').addClass('alert-danger');
                        }
                        alert.html(response.message);
                        alert.fadeIn();

                        if (callback && typeof callback === "function" ){
                            callback(response);
                        }
                    }
                },
                error: function(xhr,ajaxOptions,thrownError){
                    console.log(xhr.status);
                    console.error(thrownError);
                }
            });
        },
        show: function(div,url,action,callback){
            var url =this.url_base + '/' + url + '?action=' + action;
            console.log(url);
            $(div).load(url,callback);
        }
    }
}();