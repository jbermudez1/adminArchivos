$(function(){
    CRUD.url_base = 'admin/banners';
    Helper.rules = {'name':{ required: true }};
    Helper.messages = {'name' : 'Ingrese un nombre'};
    Helper.validate('#form-create');
    $('#form-create input[type=file]').on('change',CRUD.uploadFile);

    // Events to buttons
    $('#btn-open-create').click(function(e){
        $('#modal-create').modal({show:true});
        var form = $('#form-create');
        form.find('input').not(':hidden').val('');

        var alert = form.parent().parent().find('.alert');
        alert.hide();
        e.preventDefault();
    });

    $('#btn-save').click(function(e){
        if($('#form-create').valid()){
            $('#btn-save').prop('disabled',true);
            Helper.blockDiv('#modal-create  .modal-content');
            CRUD.action('#form-create', function(response){
                Helper.unblockDiv('#modal-create  .modal-content');
                setTimeout(function(){
                    $('#modal-create').modal('hide');
                    $('.modal-backdrop').remove();

                    $('#list-files').append(response.div_file);
                },1000)
                $('#btn-save').prop('disabled',false);
            });
        }
        e.preventDefault();
    });
});