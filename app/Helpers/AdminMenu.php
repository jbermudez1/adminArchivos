<?php
/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 16:25
 */

namespace AdminFiles\Helpers;

class AdminMenu {

    public static function menu()
    {
        $items = [];
        $menu = __DIR__.'/../Data/admin_menu.json';
        $routes = array();

        if(file_exists($menu)) {
            $options = json_decode(file_get_contents($menu), true);
            foreach($options as $n => $o) {
                $item = [
                    'label' => $n,
                    'icon'  => $o['icon'],
                ];

                if(array_key_exists('children',$o))
                {
                    $childrens = array();
                    foreach($o['children'] as $n2 => $children)
                    {

                            array_push($childrens, [
                                'label' => $n2,
                                'route' => $children['route']
                            ]);
                            array_push($routes,$children['code']);
                    }

                    $item['childrens'] = $childrens;
                }
                else
                {
                    $item['route'] = $o['route'];
                    array_push($routes,$o['code']);
                }


                array_push($items, $item );
                }
            }

        return $items;
    }



}