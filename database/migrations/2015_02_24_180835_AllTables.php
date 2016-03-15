<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AllTables extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('users',function(Blueprint $table){
            $table->increments('id');
            $table->string('username')->unique();
            $table->string('password',60);
            $table->string('first_name');
            $table->string('last_name');
            $table->boolean('enabled')->default(true);
            $table->enum('type',['administrator','user']);
            $table->rememberToken();
            $table->timestamps();
        });

        Schema::create('categories',function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->text('description');

            $table->integer('id_user')->unsigned();
            $table->foreign('id_user')->references('id')->on('users');
        });

        Schema::create('files',function(Blueprint $table){
            $table->increments('id');
            $table->string('name');
            $table->string('type', 10);
            $table->string('route');

            $table->integer('count_views')->unsigned();

            $table->integer('id_category')->unsigned();
            $table->foreign('id_category')->references('id')->on('categories');

            $table->integer('id_user')->unsigned();
            $table->foreign('id_user')->references('id')->on('users');

            $table->timestamps();
        });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('files');
        Schema::drop('categories');
        Schema::drop('users');
	}

}
