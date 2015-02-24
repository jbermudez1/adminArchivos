<?php

namespace AdminFiles\Repositories;

use AdminFiles\Repositories\Base\BaseRepo;
use AdminFiles\Models\Category;

/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 13:34
 */

class CategoryRepo extends BaseRepo {
    public function getModel()
    {
        return new Category();
    }
}