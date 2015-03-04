@extends('admin.layout.modal')

@section('modal-title')
    Editar Usuario
@stop

@section('modal-id')
    "modal-edit"
@stop

@section('modal-body')
    {!! Form::open(['route' => ['users.update', $data->id],'id'=>'form-edit','method' => 'PUT','class'=>'form-horizontal']) !!}
    {!! $fields !!}
    {!! Form::close() !!}
@stop

@section('modal-footer')
    <button id="btn-edit" type="button" class="btn btn-effect-ripple btn-primary">Guardar</button>
    <button type="button" class="btn btn-effect-ripple btn-danger" data-dismiss="modal">Cancelar</button>
@stop
<script>
    $(function(){Helper.validate('#form-edit');})
</script>