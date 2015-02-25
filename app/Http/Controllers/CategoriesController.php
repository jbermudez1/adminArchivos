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
        $this->repo = $categoryRepo;
    }

    public function fields($data = null)
    {
        if($data)
        {
            return FormX::make()
                ->textarea('question','Pregunta:','Ingrese pregunta',$data->question)
                ->textarea('answer','Respuesta:','Ingrese Respuesta',$data->answer);
        }
        else
        {
            return FormX::make()
                ->textarea('question','Pregunta:','Ingrese pregunta')
                ->textarea('answer','Respuesta:','Ingrese Respuesta');
        }
    }

}
