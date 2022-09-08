<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers;
use App\Http\Controllers\PrCollectionController;
use App\Http\Controllers\PrCvetController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';

Route::get('/pr_collections', [PrCollectionController::class, 'index'])->name('pr_collection.index');
Route::get('/pr_collections/create', [PrCollectionController::class, 'create'])->name('pr_collection.create');
Route::post('/pr_collections', [PrCollectionController::class, 'store'])->name('pr_collection.store');

Route::get('/pr_cvets', [PrCvetController::class, 'index'])->name('pr_cvet.index');
Route::get('/pr_cvets/create', [PrCvetController::class, 'create'])->name('pr_cvet.create');
Route::post('/pr_cvets', [PrCvetController::class, 'store'])->name('pr_cvet.store');
Route::get('/pr_cvets/{id}', [PrCvetController::class, 'show'])->name('pr_cvet.show');

Route::get('/test_swiper', function () {
    return view('test_swiper');
});