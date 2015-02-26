<?php namespace AdminFiles\Http\Controllers;

use AdminFiles\Repositories\CategoryRepo;

use AdminFiles\Helpers\FormX;
use AdminFiles\Http\Controllers\CrudController;

class CategoriesController extends CrudController
{

    protected $rules = array(
        'id_user' => 'required',
        'name'=> 'required',
        'description' => 'required',
    );

    protected $module = '_categories';
    public function __construct(CategoryRepo $categoryRepo)
    {
        parent::__construct();
        $this->repo = $categoryRepo;
    }

    public function fields($data = null)
    {
        if($data)
        {
            return FormX::make()
                ->hidden('id_user',$data->id_user)
                ->input('name','Nombre:','Nombre',$data->name)
                ->textarea('description','Descripcion:','Ingrese Descripcion',$data->description);
        }
        else
        {
            return FormX::make()
                ->hidden('id_user',\Auth::id())
                ->input('name','Nombre:','Nombre')
                ->textarea('description','Descripcion:','Ingrese Descripcion');
        }
    }

}
