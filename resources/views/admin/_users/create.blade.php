@extends('admin.layout.modal')

@section('modal-title')
    Crear Usuario
@stop

@section('modal-id')
    "modal-create"
@stop

@section('modal-body')
    {!! Form::open(['url' => 'users','id'=>'form-create','method' => 'POST','class'=>'form-horizontal']) !!}
    {!! $fields !!}
    {!! Form::close() !!}
@stop

@section('modal-footer')
    <button id="btn-save" type="button" class="btn btn-effect-ripple btn-primary">Guardar</button>
    <button type="button" class="btn btn-effect-ripple btn-danger" data-dismiss="modal">Cancelar</button>
@stop