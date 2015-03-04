@extends('admin.layout.modal')

@section('modal-title')
    Eliminar Archivo
@stop

@section('modal-id')
    "modal-delete"
@stop

@section('modal-body')
    {!! Form::open(['url' => 'manager/delete','id'=>'form-delete','method' => 'POST','class'=>'form-horizontal']) !!}
        {!! Form::hidden('id',$id) !!}
        ¿Esta seguro que desea eliminarlo?
    {!! Form::close() !!}
@stop

@section('modal-footer')
    <button id="btn-delete" type="button" class="btn btn-effect-ripple btn-primary">Si, seguro</button>
    <button type="button" class="btn btn-effect-ripple btn-danger" data-dismiss="modal">Cancelar</button>
@stop