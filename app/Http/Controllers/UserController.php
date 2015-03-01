<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 25/02/15
 * Time: 15:24
 */

namespace AdminFiles\Http\Controllers;

use AdminFiles\Repositories\UserRepo;
use AdminFiles\Helpers\FormX;
use Illuminate\Http\Request;

class UserController extends CrudController {
    protected $rules = array(

    );
    protected $module = '_users';

    function __construct(UserRepo $userRepo)
    {
        parent::__construct();
        $this->repo = $userRepo;
    }

    public function fields($data=null)
    {
        $type = [
            'administrator' => 'Administrador',
            'user' => 'Usuario Normal'
        ];

        if($data)
        {
            return FormX::make()
                ->input('username','Usuario','Usuario',$data->username)
                ->select('type','Tipo:',$type,$data->type)
                ->input('first_name','Nombre','Nombre',$data->first_name)
                ->input('last_name','Apellido','Apellido',$data->last_name)
                ->checkbox('enabled','Activo',$data->enabled);

        }
        else
        {
            return FormX::make()
                ->input('username','Usuario:','Usuario')
                ->input('password','Contraseña:','Contraseña','','password')
                ->select('type','Tipo:',$type)
                ->input('first_name','Nombre:','Nombre')
                ->input('last_name','Apellido:','Apellido')
                ->checkbox('enabled','Activo:');
        }
    }

    public function change_password(Request $request)
    {
        // Get user active
        $user = $this->repo->findOrFail(\Auth::id());

        if($user)
        {
            $data = $request->all();
            $success = true;
            $message = "Contraseña actualizada exitosamente";

            // Validate data
            $validator = \Validator::make($data, [
                'password' => 'required',
                'new-password' => 'required|min:5',
                'new-password-confirm' => 'required|same:new-password'
            ]);

            if($validator->passes())
            {
                $data['password'] = \Hash::make($data['new-password']);
                $this->repo->update($user,$data);
            }
            else
            {
                $success = false;
                $message = "Algunos campos son requeridos";
            }

            return compact('success','message');
        }
    }

}