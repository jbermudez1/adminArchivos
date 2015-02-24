$(function() {
    // Initializa Datatables
    App.initDT('.table-fp');

    // Initialize Tabs
    $('[data-toggle="tabs"] a, .enable-tabs a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    // Initialize Tooltips
    $('[data-toggle="tooltip"], .enable-tooltip').tooltip({container: 'body', animation: false});

    // Variables
    var $select = $('.select-select2').select2();

    // Events
    $select.on("change",getFilterReport);

    // Functions
    function getFilterReport() {
        // Load filters
        var option = $('#idTypeReport').val();
        var data = {
            option: option
        };

        Helper.blockPage();
        $('#divFilter').load('admin/report/filter',data,function(){
            // Set event
            $('#form-filter').on('submit',function(e){
                var el = $(this);
                var data = el.serialize();
                var option = el.data('option');

                window.open('admin/report/' + option + '?' + data,'Reporte');

                e.preventDefault();
                return false;
            });
            Helper.unblockPage();
        });
    }
});