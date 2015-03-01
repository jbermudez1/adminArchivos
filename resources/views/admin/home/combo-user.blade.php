<ul class="dropdown-menu dropdown-menu-right">
    <li class="dropdown-header">
        <strong>{{ Auth::user()->first_name . ' ' . Auth::user()->last_name . ' ( ' . Auth::user()->username . ' )' }}</strong>
    </li>
    <li>
        <a id="btn-open-password" href="#" class="logout" data-toggle="modal">
            <i class="fa fa-key fa-fw pull-right"></i>
            Cambiar Contraseña
        </a>
    </li>
    <li>
        <a href="account/logout" class="logout">
            <i class="fa fa-power-off fa-fw pull-right"></i>
            Cerrar Sesion
        </a>
    </li>
</ul>