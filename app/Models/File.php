<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 12:49
 */

namespace AdminFiles\Models;

use Illuminate\Database\Eloquent\Model;

class File extends Model {

    protected $table ='files';
    protected $fillable = ['name','type','route','count_views','id_category','id_user'];
    public $relations = ['category','user'];

    public function category()
    {
        return $this->hasOne('AdminFiles\Models\Category','id','id_category');
    }

    public function user()
    {
        return $this->hasOne('AdminFiles\Models\Category','id','id_user');
    }

}