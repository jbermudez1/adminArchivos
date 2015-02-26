<?php
use Illuminate\Database\Seeder;
use AdminFiles\Repositories\CategoryRepo;
use AdminFiles\Repositories\FileRepo;
use Faker\Factory as Faker;
use Illuminate\Support\Collection;

/**
 * Created by PhpStorm.
 * User: YOEL
 * Date: 25/02/15
 * Time: 20:24
 */

class CategoriesAndFilesTableSeeder extends Seeder {

    public function run()
    {
        $faker = Faker::create();
        $categoryRepo = new CategoryRepo();
        $fileRepo = new FileRepo();
        $type = Collection::make([
            'pdf',
            'docx',
            'xls',
            'png',
            'jpg'
        ]);

        for($i=0; $i<10; $i++)
        {
            $category = $categoryRepo->create([
                'name' => $faker->word,
                'description' => $faker->paragraph(),
                'id_user' => 1
            ]);
            $limit_files = rand(2,6);
            for($j=0; $j<$limit_files; $j++)
            {
                // Create files for the category
                $fileRepo->create([
                    'name' => $faker->word,
                    'type' => $type->random(),
                    'route' => '',
                    'count_views' => 0,
                    'id_category' => $category->id,
                    'id_user' => rand(2,11)
                ]);
            }
        }

    }
}