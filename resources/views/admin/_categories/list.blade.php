@extends('admin.list.list')

@section('list-title')
    Categorias
@stop

@section('list-content')
    @parent

@section('list-content-columns')
    <th class="text-center" style="width: 50px;">#</th>
    <th>Nombre</th>
    <th>Descripcion</th>
    <th>Usuario</th>
    <th class="text-center" style="width: 75px;"><i class="fa fa-flash"></i></th>
@stop

@section('list-content-values')
    @foreach($data as $key => $value)
        <tr>
            <td class="text-center">{{ $key + 1 }}</td>
            <td>{{ $value->name }}</td>
            <td>{{ $value->description }}</td>
            <td>{{ $value->user->username }}</td>
            <td class="text-center">
                <a href="#" data-id="{{ $value->id }}" data-toggle="tooltip" title="Editar" class="btn btn-effect-ripple btn-xs btn-success edit"><i class="fa fa-pencil"></i></a>
                <a href="#" data-id="{{ $value->id }}" data-toggle="tooltip" title="Eliminar" class="btn btn-effect-ripple btn-xs btn-danger delete"><i class="fa fa-times"></i></a>
            </td>
        </tr>
    @endforeach
@stop

@include('admin._categories.create',compact('fields'))

<div id="div-modal"></div>
<script>
    $(function(){
        CRUD.url_base = 'categories';
        //validaron
        Helper.rules = {
            'name':{
                required : true
            },
            'description'  : {
                required  : true
            }
        };
        Helper.messages = {
            'name':{
                required: 'Debe ingresar un nombre'
            },
            'description' : {
                'required' : 'Debe ingresar una descipcion'
            }
        }
        Helper.validate('#form-create');


    })
</script>
{!! HTML::script('app/helpers/crud_operate.js') !!}
@stop