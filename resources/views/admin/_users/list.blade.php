@extends('admin.list.list')

@section('list-title')
    Usuarios
@stop

@section('list-content')
    @parent

@section('list-content-columns')
    <th class="text-center" style="width: 50px;">#</th>
    <th>Usuario</th>
    <th>Tipo</th>
    <th>Nombre</th>
    <th>Apellido</th>
    <th>Estado</th>
    <th class="text-center" style="width: 75px;"><i class="fa fa-flash"></i></th>
@stop

@section('list-content-values')
    @foreach($data as $key => $value)
        <tr>
            <td class="text-center">{{ $key + 1 }}</td>
            <td>{{ $value->username }}</td>
            <td>{{ $value->type }}</td>
            <td>{{ $value->first_name }}</td>
            <td>{{ $value->last_name }}</td>
            <td>
                @if($value->enabled)
                    <span class="label label-primary">Activo</span>
                @else
                    <span class="label label-danger">Inactivo</span>
                @endif
            </td>
            <td class="text-center">
                <a href="#" data-id="{{ $value->id }}" data-toggle="tooltip" title="Editar" class="btn btn-effect-ripple btn-xs btn-success edit"><i class="fa fa-pencil"></i></a>
                <a href="#" data-id="{{ $value->id }}" data-toggle="tooltip" title="Eliminar" class="btn btn-effect-ripple btn-xs btn-danger delete"><i class="fa fa-times"></i></a>
            </td>
        </tr>
    @endforeach
@stop

@include('admin._users.create',compact('fields'))

<div id="div-modal"></div>
<script>
    $(function(){
        CRUD.url_base = 'users';
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