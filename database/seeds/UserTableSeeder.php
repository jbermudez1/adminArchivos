<?php
use Illuminate\Database\Seeder;
use AdminFiles\Repositories\UserRepo;
use Faker\Factory as Faker;

class UserTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();
        $userRepo = new UserRepo();
        for($i=0; $i<10; $i++)
        {
            $username = strtolower($faker->userName);
            $userRepo->create([
                'username' => $username,
                'password' => $username,
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'enabled' => true,
                'type' => 'user'
            ]);
        }
    }
}