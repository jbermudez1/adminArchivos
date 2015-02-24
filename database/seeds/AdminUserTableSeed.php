<?php
use Illuminate\Database\Seeder;
use AdminFiles\Repositories\UserRepo;

/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 24/02/15
 * Time: 12:38
 */

class AdminUserTableSeeder extends Seeder {

    public function run()
    {
        $repo = new UserRepo();

        $repo->create([
            'username' => 'admin',
            'password' => \Hash::make('admin'),
            'first_name' => 'Yoel',
            'last_name' => 'Monzon',
            'type' => 'administrator'
        ]);
    }
}