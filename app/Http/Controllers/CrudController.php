<?php namespace AdminFiles\Http\Controllers;

use AdminFiles\Http\Requests;
use AdminFiles\Http\Controllers\Controller;
use AdminFiles\Helpers\FunctionX;

class CrudController extends Controller {

    protected $rules = array();
    protected $repo;
    protected $module = '';
    protected $root = 'admin';
    protected $code = '';

    public function fields($data = null){}
    public function updateRules($data =null) {}

    function __construct()
    {
        $this->middleware('auth');
    }

	public function getList()
	{
        $data = $this->repo->getAll();
        $fields = $this->fields();

        return view($this->root . '/' . $this->module  .'/list', compact('data','fields'));
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function getCreate()
	{
        return view($this->root . '/' . $this->module . '/create');
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function postCreate()
	{
        $data = FunctionX::validateData(Input::all());

        $validator = Validator::make($data, $this->rules);
        $success = true;
        $message = "Registro guardado exitosamente";
        $record = null;
        if ($validator->passes())
        {
            $record = $this->repo->create($data);
            return compact('success','message','record','data');
        }
        else
        {
            $success=false;
            $message = $validator->messages();
            return compact('success','message','record','data');
        }
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function getShow($id)
	{
        $action = Input::get('action');
        $data = $this->repo->findOrFail($id);
        if($action=='delete')
        {
            return view($this->root . '/' . $this->module . '/delete',compact('data'));
        }
        else if ($action=='edit')
        {
            $fields = $this->fields($data);
            return view($this->root . '/' . $this->module .'/edit',compact('data','fields'));
        }
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function getEdit($id)
	{
        $data = $this->repo->findOrFail($id);
        $fields = $this->fields($data);
        return View::make($this->root . '/' . $this->module . '/edit',compact('data','fields'));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function postEdit($id)
	{
        $record_old = $this->repo->findOrFail($id);

        $data = FunctionX::validateData(Input::all());
        $this->updateRules($record_old);
        $validator = Validator::make($data, $this->rules);
        $success = true;
        $message = "Registro guardado exitosamente";
        $record = null;

        if ($validator->passes())
        {
            $record = $this->repo->update($record_old, $data);
            return compact('success','message','record');
        }
        else
        {
            $success=false;
            $message="Ocurrio un error";
            return compact('success','message','record');
        }
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function postDelete($id)
	{
        $this->repo->delete($id);
        return ['success'=>'true','message'=>'Registro eliminado exitosamente'];
	}

}
