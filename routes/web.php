<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ContactController;

// Main page
Route::get('/', [HomeController::class, 'index'])->name('home');

// Contact form
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');