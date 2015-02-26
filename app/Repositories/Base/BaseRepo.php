<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 13:02
 */

namespace AdminFiles\Repositories\Base;

use AdminFiles\Repositories\Base\BaseInterface;

abstract class BaseRepo implements BaseInterface {
    protected $repo;
    protected $relations = array();

    public abstract function getModel();

    function __construct()
    {
            $this->relations = $this->getModel()->relations;
    }

    public function findOrFail($id)
    {
        return $this->getModel()
                    ->findOrFail($id);
    }

    public function findByField($field, $value, $comparator = '=')
    {
        return $this->getModel()
                    ->where($field,$comparator,$value)
                    ->get()
                    ->first();
    }


    public function findWithRelations($id)
    {
        return $this->getModel()
                    ->with($this->relations)
                    ->find($id);
    }

    public function create(array $data)
    {
        return $this->getModel()->create($data);
    }

    public function update($entity, array $data)
    {
        if(is_numeric($entity))
            $entity = $this->findOrFail($entity);

        $entity->fill($data);
        $entity->save();

        return $entity;
    }

    public function delete($entity)
    {
        if(is_numeric($entity))
            $entity = $this->findOrFail($entity);

        $entity->delete();
        return $entity;
    }

    public function getAll()
    {
        return $this->getModel()
                    ->all();
    }

    public function getWithRelations()
    {
        return $this->getModel()
                    ->with($this->relations)
                    ->get();
    }


}