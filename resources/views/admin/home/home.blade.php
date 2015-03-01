@extends('admin.layout.layout')

@section('title')
    @parent
    - Inicio
@stop

@section('content')
    <div id="page-wrapper" class="page-loading">
        <div id="page-container" class="header-fixed-top sidebar-visible-lg-full">

            @include('admin.home.sidebar',compact('menu'))

            <div id="main-container">
                @include('admin.layout.header')

                <div id="page-content" class="monitor">
                    @include('admin.layout.preloader')
                    @include('admin.layout.preloader-div')
                    @include('admin.home.change_password')
                    <div id="page"></div>
                </div>
            </div>
        </div>
    </div>
@stop

@section('other-scripts')
    <script src='/assets/js/sammy.min.js'></script>
    <script src='/assets/js/app.js'></script>
    <script src='/app/helpers/helper.js'></script>
    <script src='/app/admin/admin.js'></script>
    <script src='/app/helpers/crud.js'></script>

    <script>
        $(function(){
            Admin.init();
        });
    </script>
@stop