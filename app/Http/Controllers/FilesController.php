<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 25/02/15
 * Time: 19:54
 */

namespace AdminFiles\Http\Controllers;

use Illuminate\Http\Request;
use AdminFiles\Repositories\CategoryRepo;
use AdminFiles\Repositories\FileRepo;
use AdminFiles\Helpers\FormX;
use AdminFiles\Helpers\UploadX;
use Illuminate\Database\Eloquent\Collection;

class FilesController extends Controller {
    protected $module = '_files';
    protected $categoryRepo;
    protected $repo;
    protected $rules = array(
        'name' => 'required',
        'id_category' => 'required|numeric|min:1'
    );

    function __construct(CategoryRepo $categoryRepo,FileRepo $fileRepo)
    {
        $this->categoryRepo = $categoryRepo;
        $this->repo = $fileRepo;
        $this->middleware('auth');
    }

    public function index()
    {
        $colors =  Collection::make(['primary', 'danger', 'muted', 'info', 'warning', 'success']);;
        $categories = $this->categoryRepo->getList();
        $color_categories = array();

        foreach($categories as $id => $category)
        {
            $color_categories[$id] = $colors->random();
        }

        $files = $this->repo->getWithRelations();
        $fields = $this->fields();

        return view('admin.' . $this->module . '.manager',compact('color_categories','categories','files','fields'));
    }

    public function fields()
    {
        return FormX::make()
            ->input('name','Nombre','Nombre:')
            ->select('id_category','Categoria:',$this->categoryRepo->getList())
            ->file('file','Archivo');
    }

    public function postUpload(Request $request)
    {
        $data = $request->all();
        $success = true;
        $message = "Registro guardado exitosamente";
        $record = null;
        if(!$request->hasFile('file'))
        {
            return [
                'message' => 'Debe elegir un archivo',
                'success' => false
            ];
        }

        $validator = \Validator::make($data,$this->rules);


        if($validator->passes())
        {
            $data['id_user'] = \Auth::id();
            $record = $this->repo->create($data);
            $file = UploadX::uploadFile($request->file('file'),'files',$record->id);
            $record->route = $file['url'];
            $record->type = $file['extension'];
            $record->save();
            $div_file = (string) view('admin.' . $this->module . '.file',[
                'file' => $record,
                'color' => 'muted'
            ]);

            return compact('success','message','record','div_file');
        }
        else
        {
            $success=false;
            $message = $validator->messages();
            return compact('success','message','record');
        }
    }

    public function postDelete(Request $request)
    {
        $id = $request->get('id');
        $file = $this->repo->findOrFail($id);
        if($file)
        {
            UploadX::deleteFile($file->route);
            $file->delete();

            return ['message'=>'Archivo eliminado exitosamente','success'=>true];
        }
        else
        {
            return ['message'=>'No se pudo procesar tu peticion','success'=>false];
        }
    }

    public function getDelete($id)
    {
        return view('admin._files.delete',compact('id'));
    }

    public function getDownload($id)
    {
        $file = $this->repo->findOrFail($id);
        return UploadX::downloadFile($file->route,$file->name . '.' . $file->type);
    }
}