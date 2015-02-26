$(function(){
    CRUD.url_base = 'admin/banners';
    Helper.rules = {'name':{ required: true }};
    Helper.messages = {'name' : 'Ingrese un nombre'};
    Helper.validate('#form-create');
    $('#form-create input[type=file]').on('change',CRUD.uploadFile);

    // Functions to create
    $('#btn-save').click(function(e){
        if($('#form-create').valid()){
            $('#btn-save').prop('disabled',true);

            CRUD.action('#form-create', function(response){
                setTimeout(function(){
                    $('#modal-create').modal('hide');
                    $('.modal-backdrop').remove();

                    $('#list-files').append(response.div_file);

                    // Clear form
                    var form = $('#form-create');
                    var alert = form.parent().parent().find('.alert');
                    alert.hide();
                    form.find('input').val('');
                },1000)
                $('#btn-save').prop('disabled',false);
            });
        }
        e.preventDefault();
    });
});