window.table = App.initDT('.table');
$('[data-toggle="tooltip"], .enable-tooltip').tooltip({container: 'body', animation: false});

$('#btn-save').click(function(e){
    if($('#form-create').valid()){
        $('#btn-save').prop('disabled',true);
        CRUD.action('#form-create', function(){
            setTimeout(function(){
                $(window.$contenedor).load(CRUD.url_base,function(){
                    $('#modal-create').modal('hide');
                    $('.modal-backdrop').remove();
                });
            },2000)
            $('#btn-save').prop('disabled',false);
        });
    }
    e.preventDefault();
});

$('.edit').click(function(e){
    Helper.blockPage();
    CRUD.show('#div-modal',$(this).data('id'),'edit',function() {
        Helper.unblockPage();
        $('#modal-edit').modal({show:true});
        $('#btn-edit').click(function(){
            if($('#form-edit').valid()) {
                $('#btn-edit').prop('disabled',true);
                CRUD.action('#form-edit', function () {
                    setTimeout(function(){
                        Helper.blockPage();
                        $(window.$contenedor).load(CRUD.url_base, function () {
                            $('#modal-edit').modal('hide');
                            $('.modal-backdrop').remove();
                            Helper.unblockPage();
                        })
                    },2000);
                    $('#btn-edit').prop('disabled',false);
                });
            }
        });
    });
    e.preventDefault();
})

$('.delete').click(function(e){
    Helper.blockPage();
    CRUD.show('#div-modal',$(this).data('id'),'delete',function() {
        Helper.unblockPage();
        $('#modal-delete').modal({show:true});
        $('#btn-delete').click(function(){
            $('#btn-delete').prop('disabled',true);
            CRUD.action('#form-delete',function(){
                $(window.$contenedor).load(CRUD.url_base ,function(){
                    $('#modal-delete').modal('hide');
                    $('.modal-backdrop').remove();
                })
                $('#btn-delete').prop('disabled',true);
            });
        });
    });

    e.preventDefault();
})