<?php
use Illuminate\Database\Seeder;
use AdminFiles\Repositories\UserRepo;

class AdminUserTableSeeder extends Seeder {

    public function run()
    {
        $repo = new UserRepo();

        $repo->create([
            'username' => 'admin',
            'password' => 'admin',
            'first_name' => 'Yoel',
            'last_name' => 'Monzon',
            'type' => 'administrator'
        ]);
    }
}