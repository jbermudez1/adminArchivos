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
                $add = true;
                if(array_key_exists('type',$o))
                    $add = (\Auth::user()->type == $o['type']);

                if($add)
                {
                    $item = [
                        'label' => $n,
                        'icon'  => $o['icon'],
                        'route' => $o['route'],
                        'container' => isset($o['container']) ? $o['container'] : '',
                        'class' => isset($o['class']) ? $o['class'] : ''
                    ];

                    array_push($routes,$o['code']);
                    array_push($items, $item );
                }
            }
        }
        // Add routes to session
        \Session::push('routes',$routes);
        return $items;
    }



}