<?php

namespace AdminFiles\Repositories;

use AdminFiles\Repositories\Base\BaseRepo;
use AdminFiles\Models\User;

/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 13:32
 */

class UserRepo extends BaseRepo {

    public function getModel()
    {
        return new User();
    }

    public function create(array $data)
    {
        $data['password'] = \Hash::make($data['password']);
        return $this->getModel()->create($data);
    }
}