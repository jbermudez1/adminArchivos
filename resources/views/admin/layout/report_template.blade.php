<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>@section('title') @show</title>

    {{ HTML::style('http://fonts.googleapis.com/css?family=Open+Sans') }}
    {{ HTML::style('/assets/css/normalize.css') }}
    {{ HTML::style('/assets/css/bootstrap_report.min.css') }}
    {{ HTML::style('/app/css/generic/report.css') }}

    @section('other-styles')
    @show
</head>
<body>
    @section('header')
        <div class="text-center header">
            <div class="section-header logo-div text-left">
                <img class="logo" src="assets/img/seguridadpoder.png" alt="Logo"/>
            </div>

            <div class="section-header">
                <p class="title">@section('title-report') Reporte de Miembros @show</p>
            </div>


            <div class="section-header text-right">
                <p class="date">
                    @datetime(time())
                </p>
            </div>
        </div>
        <br/>
        <hr/>
    @show

    @section('content')
        <table class="table table-bordered">
            <thead>
                <tr class="active">
                    @yield('columns-header')
                </tr>
            </thead>
            <tfoot>
                @section('columns-footer')
                @show
            </tfoot>
            <tbody>
                @yield('columns-data')
            </tbody>
        </table>
    @show

    @section('footer')
        <div class="text-center footer">
            <hr/>
            - Seguridad y Poder -
        </div>
    @show
</body>
</html>