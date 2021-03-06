<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 12:41
 */

namespace AdminFiles\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model {

    protected $table ='categories';
    protected $fillable = ['name','description','id_user'];
    public $relations = ['user','files'];
    public $timestamps = false;

    public function user()
    {
        return $this->hasOne('AdminFiles\Models\User','id','id_user');
    }

    public function files()
    {
        return $this->hasMany('AdminFiles\Models\File','id_category','id');
    }
}