<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', 'HomeController@index');
Route::get('denied', 'HomeController@denied');
Route::get('manager', 'FilesController@index');

Route::post('users/password', 'UserController@change_password');

// CRUD'S
Route::resource('categories', 'CategoriesController');
Route::resource('users', 'UserController');

Route::controllers([
	'account' => 'Auth\AuthController',
    'manager' => 'FilesController'
]);
