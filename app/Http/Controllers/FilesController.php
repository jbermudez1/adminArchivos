<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 25/02/15
 * Time: 19:54
 */

namespace AdminFiles\Http\Controllers;

use AdminFiles\Repositories\CategoryRepo;
use AdminFiles\Repositories\FileRepo;
use Illuminate\Database\Eloquent\Collection;

class FilesController extends Controller {
    protected $module = '_files';
    protected $categoryRepo;
    protected $fileRepo;

    function __construct(CategoryRepo $categoryRepo,FileRepo $fileRepo)
    {
        $this->categoryRepo = $categoryRepo;
        $this->fileRepo = $fileRepo;
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

        $files = $this->fileRepo->getWithRelations();

        return view('admin.' . $this->module . '.manager',compact('color_categories','categories','files'));
    }
}