<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PatientController;
// use App\Http\Controllers\PaymentController;
use App\Http\Controllers\MailController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('register',[UserController::class, 'register']);
// Route::post('register', 'UserController@register');
Route::post('login', [UserController::class, 'login']);
Route::get('profile', [UserController::class, 'getAuthenticatedUser']);
// Route::get('patient', [PatientController::class, 'index']);
Route::resource('patient', PatientController::class);
Route::post('getSpecificPatient', [PatientController::class, 'getSpecificPatient']);

// paypal
// Route::post('create-payment', [PaymentController::class, 'create']);

// mail
Route::post('send-email',[MailController::class, 'sendEmail']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


