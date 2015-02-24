$(function(){
    // Events
    $('.permission').on('click',getPermission);


    // Functions
    function getPermission(e) {
        Helper.blockPage();
        var id = $(this).data('id');
        $('#div-permission').load('admin/getPermissions/' + id,function(){
            Helper.goTo(document.body,'div-permission',500);
            Helper.unblockPage();
        });

        e.preventDefault();
    }
});