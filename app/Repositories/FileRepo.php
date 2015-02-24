<?php

namespace AdminFiles\Repositories;

use AdminFiles\Repositories\Base\BaseRepo;
use AdminFiles\Models\File;

/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 13:33
 */

class FileRepo extends BaseRepo {

    public function getModel()
    {
        return new File();
    }

}