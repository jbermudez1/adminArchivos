<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 13:06
 */

namespace AdminFiles\Repositories\Base;

interface BaseInterface {

    public function findOrFail($id);

    public function findWithRelations($id);

    public function findByField($field, $value,$comparator = '=');

    public function create(array $data);

    public function update($entity, array $data);

    public function delete($entity);

    public function getAll();

    public function getWithRelations();

}