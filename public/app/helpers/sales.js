$(function(){
    window.table = App.initDT('.table');
    $('[data-toggle="tooltip"], .enable-tooltip').tooltip({container: 'body', animation: false});
    $('[data-toggle="popover"], .enable-popover').popover({container: 'body', animation: true});



    // Events
    $('.detail').on('click',function(e){
        var el = $(this)
        var id = el.data('id');
        Helper.blockPage();
        $('#div-modal').load('member/detailSearch/' + id, function(){
            Helper.unblockPage();
            $('#modal-detail').modal({show:true});
        });
        e.preventDefault();
    });

    //Events
    $('.create').on('click',function(e){
        var id = $(this).data('id');
        Helper.blockPage();
        $('#div-modal').load('member/fees/createPayment/'+id,function(){
            Helper.unblockPage();
            $('#modal-create').modal({show:true});

            $('#btn-save').click(function(e){
                if($('#form-create').valid()) {
                    CRUD.action(document.getElementById('form-create'), function(){
                        $(window.$contenedor).load(CRUD.url_base + '/sales',function(){
                            $('#modal-create').modal('hide');
                            $('.modal-backdrop').remove();
                        })
                    });
                    e.preventDefault();
                }
            });
        });
        e.preventDefault();
    });

    $('.edit').on('click',function(e){
        var id = $(this).data('id');
        Helper.blockPage();
        $('#div-modal').load('member/fees/editPayment/'+id,function(){
            Helper.unblockPage();
            $('#modal-edit').modal({show:true});

            $('#btn-edit').click(function(e){
                if($('#form-edit').valid()) {
                    CRUD.action(document.getElementById('form-edit'), function(){
                        $(window.$contenedor).load(CRUD.url_base + '/sales',function(){
                            $('#modal-edit').modal('hide');
                            $('.modal-backdrop').remove();
                        })
                    });
                }
                e.preventDefault();
            });
        });
        e.preventDefault();
    });

    $('.cancel').on('click',function(e) {
        var id = $(this).data('id');
        Helper.blockPage();
        $('#div-modal').load('member/cancelSale/' + id,function(){
            Helper.unblockPage();
            $('#modal-cancel-sale').modal({show:true});

            $('#btn-cancel').click(function(e) {
                if($('#form-cancel').valid()) {
                    CRUD.action(document.getElementById('form-cancel'),function(){
                        setTimeout(function(){
                            $(window.$contenedor).load(CRUD.url_base + '/sales',function(){
                                $('#modal-cancel-sale').modal('hide');
                                $('.modal-backdrop').remove();
                            })
                        },2000);
                    });
                }
                e.preventDefault();
            });
        });
        e.preventDefault();
    });
});