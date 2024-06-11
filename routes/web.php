<?php

use Illuminate\Support\Facades\Route;


Route::get('/', function () {
    return view('home');
});

Route::middleware('guest')->group(function () {
    Route::get('/register', fn () => view('auth.register'))->name('register');
    Route::get('/login', fn () => view('auth.login'))->name('login');
});

Route::get('/profile', fn () => view('user.profile'));
Route::get('/profile/update', fn () => view('user.edit'));

Route::get('/tasks', fn () => view('tasks.index'))->name('tasks.index');
Route::get('/create-task', fn () => view('tasks.create'))->name('tasks.create');
Route::get('/tasks/{task}', fn () => view('tasks.show'))->name('tasks.show');
Route::get('/edit-task/{task}', fn () => view('tasks.edit'))->name('tasks.edit');

Route::get('/forgotPassword', fn () => view('auth.forgetpassword'))->name('auth.forgetpassword');
Route::get('/reset-password', fn () => view('auth.reset-password'))->name('auth.reset-password');
Route::get('/verfiy-email', fn () => view('auth.verfiyemail'))->name('auth.verfiyemail');
