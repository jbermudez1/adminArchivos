$(function(){
    $('#form-increment').on('submit',function(e){
        CRUD.action(document.getElementById('form-increment'), function(response){
            if(response.success){
                Helper.alert('Exito',response.message,'success');
                $("#btn-back").trigger("click");
            }else{
                Helper.alert('Error',response.message,'error');
            }
        });
        e.preventDefault();
    });
});