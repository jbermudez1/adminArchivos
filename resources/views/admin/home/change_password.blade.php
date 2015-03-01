@extends('admin.layout.modal')

@section('modal-title')
    Cambiar Contraseña
@stop

@section('modal-id')
    "modal-password"
@stop

@section('modal-body')
    {!! Form::open(['url' => 'users/password','id'=>'form-password','method' => 'POST','class'=>'form-horizontal']) !!}
        <div class="form-group">
            <label class="col-md-3 control-label" for="password">Contraseña Actual:</label>
            <div class="col-md-9">
                <input type="password"  name="password" class="form-control" placeholder="Contraseña Actual">
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-3 control-label" for="new-password">Contraseña Nueva:</label>
            <div class="col-md-9">
                <input type="password" id="new-password"  name="new-password" class="form-control" placeholder="Contraseña Nueva" >
            </div>
        </div>
        <div class="form-group">
            <label class="col-md-3 control-label" for="new-password-confirm">Confirmar Contraseña:</label>
            <div class="col-md-9">
                <input type="password"  name="new-password-confirm" class="form-control" placeholder="Contraseña Confirmada">
            </div>
        </div>
    {!! Form::close() !!}
@stop

@section('modal-footer')
    @parent
    <button id="btn-password" type="button" class="btn btn-effect-ripple btn-primary">Cambiar Contraseña</button>
    <button type="button" class="btn btn-effect-ripple btn-danger" data-dismiss="modal">Cancelar</button>
@stop