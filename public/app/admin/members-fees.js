$(function(){
    // Initializa Datatables
    App.initDT('.table-fp');

    // Initialize Tabs
    $('[data-toggle="tabs"] a, .enable-tabs a').click(function(e){ e.preventDefault(); $(this).tab('show'); });

    // Initialize Tooltips
    $('[data-toggle="tooltip"], .enable-tooltip').tooltip({container: 'body', animation: false});

    // Events
    $('#btn-back-fees').on('click',function(e){
        $('#div-fees').fadeOut();
        $list_title.text("Listado");
        $('#list').fadeIn();

        e.preventDefault();
    });

    $('.withdrawal-valid').on('click',confirmWithdrawal);
    $('.payment-valid').on('click',confirmPayment);
    // Functions

    // - Fees

    // - Payments

    // - Transfers

    // - Withdrawals
    function confirmWithdrawal(e){
        var el = $(this)
        var id = el.data('id');
        Helper.blockPage();
        $('#confirm').load('admin/withdrawals/confirm/' + id,function(){
            Helper.unblockPage();
            $('#modal-confirm').modal({show:true});
            $('#btn-confirm-withdrawal').on('click',function(){
                if($('#form-confirm').valid()){
                    var option = $('#form-confirm [name=isaccepted]').prop('checked');
                    CRUD.action(document.getElementById('form-confirm'), function(response){
                        $('#modal-confirm').modal('hide');
                        $('.modal-backdrop').remove();

                        var label = el.closest('tr').find('.label');
                        var acceptedBy = el.closest('tr').find('.acceptedBy')
                        var acceptedAt = el.closest('tr').find('.acceptedAt')
                        label.removeClass('label-warning');

                        acceptedBy.text(response.administrator)
                        acceptedAt.text(response.validat);
                        if(option){
                            label.addClass('label-success').text('PAGO ACEPTADO');

                        }else{
                            label.addClass('label-danger').text('PAGO RECHAZADO');
                        }
                        el.remove();
                    });
                }
            });
        });
        e.preventDefault();
        return false;
    }

    function confirmPayment(e){
        var el = $(this)
        var id = el.data('id');
        Helper.blockPage();
        $('#confirm').load('admin/payments/confirm/' + id,function(){
            Helper.unblockPage();
            $('#modal-confirm').modal({show:true});
            $('#btn-confirm-payment').on('click',function(){
                if($('#form-confirm').valid()){
                    var option = $('#form-confirm [name=isvalid]').prop('checked');
                    CRUD.action(document.getElementById('form-confirm'), function(response){
                        $('#modal-confirm').modal('hide');
                        $('.modal-backdrop').remove();

                        var label = el.closest('tr').find('.label');
                        var acceptedBy = el.closest('tr').find('.acceptedBy')
                        var acceptedAt = el.closest('tr').find('.acceptedAt')
                        label.removeClass('label-primary');

                        acceptedBy.text(response.administrator)
                        acceptedAt.text(response.acceptedat);
                        if(option){
                            label.addClass('label-success').text('PAGO ACEPTADO');

                        }else{
                            label.addClass('label-danger').text('PAGO RECHAZADO');
                        }
                        el.remove();
                    });
                }
            });
        });
        e.preventDefault();
        return false;
    }
});