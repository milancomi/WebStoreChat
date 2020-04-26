<?php

use App\DropFile;
use App\Events\UserEvent;
use App\Jobs\SendRegisterMailJob;
use App\Mail\TESTTTT;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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






// https://bestof.test/axiosGet'
Route::get('axiosGet', function () {

    $user = User::all();

    return response()->json($user);
});



/**
  WEBSOCKET REDIS ROUTES
 */


Route::get('/home', 'HomeController@index')->name('home');

Route::post('/ping', function (Request $request) {
    $user = User::find($request->id);
    $message = $request->message;

    event(new UserEvent($user, $message));
});



Route::get('/ping2', function () {

    $user = User::find(55);
    $message  = ["blablalb" => "lablalbab"];
    event(new UserEvent($user, $message));
});
////// ENDDD WEBSOCKET

Auth::routes();

/**
  LOGIN WITH SOCIALITE , FACEBOOK, GOOGLE, LINKEDIN

 */


Route::get('login/facebook', 'Auth\LoginController@redirectToFacebookProvider')->name('facebook-login');
Route::get('login/facebook/callback', 'Auth\LoginController@handleFacebookProviderCallback');

Route::get('login/google', 'Auth\LoginController@redirectToGoogleProvider')->name('google-login');
Route::get('login/google/callback', 'Auth\LoginController@handleGoogleProviderCallback');


Route::get('login/linkedin', 'Auth\LoginController@redirectToLinkedInProvider')->name('linkedin-login');
Route::get('login/linkedin/callback', 'Auth\LoginController@handleLinkedInProviderCallback');

// END SOCIALITE

// MAIL SEND



 Route::get('/send',function(){
    $mail_info = [
        'user_name' => 'name',
        'user_email' => 'milancomi96@gmail.com',
    ];

    $job = (new SendRegisterMailJob($mail_info))->delay(Carbon::now()->addSeconds(5));
    dispatch($job);

    // Mail::to('milancomi96@gmail.com')->send(new TESTTTT());

 });
// Route::get('/sendwithjob',function(){

//     $data = ['user_name'=>'Zoka','user_email'=>'milancomi96@gmail.com'];
//     $job = (new SendRegisterMailJob($data))->delay(Carbon::now()->addSeconds(5));
//     dispatch($job);
// });

// END MAIl


/**
 POSTS CRUD
 */
Route::resource('/posts', 'PostController');
// END POSTS

/**
 DROPBOX
 */

Route::get('drop','DropfileController@index');
Route::post('drop','DropfileController@store');

Route::get('drop/{filetitle}','DropfileController@show');
Route::get('drop/{filetitle}/download','DropfileController@download');
Route::get('drop/{id}/destroy','DropfileController@destroy');



/// END DROPBOX





Route::get('drop/{filetitle}','DropfileController@show');

Route::get('/fmsg','HomeController@messages');
Route::get('/fmsgShow','HomeController@messagee')->name('messageRoute');


//  SERVER RENDER


$games = [
    ['id'=>1,'thumbnail'=>'1.jpg','title'=>'ries of the Tomb Raider','desc'=>'wefowefwfewef'],
    ['id'=>2,'thumbnail'=>'1.jpg','title'=>'ries of the Tomb Raider','desc'=>'wefowefwfewef'],
    ['id'=>3,'thumbnail'=>'1.jpg','title'=>'ries of the Tomb Raider','desc'=>'wefowefwfewef'],
    ['id'=>4,'thumbnail'=>'1.jpg','title'=>'ries of the Tomb Raider','desc'=>'wefowefwfewef']

];



// Route::get('/dropAccess',function(){
//    $drop =  DropFile::all();
//     $url = $drop->first()->file_title;

// });




// // Controller
// public function get($filename) {
//     $file = Storage::get($filename);
 
//     return (new Response($file, 200))
//         ->header('Content-Type', Storage::mimeType($filename));
// } 

// // View
// <img src="{{ route('getentry', $filename) }}" alt="Alt stuff" />


Route::get('/get_all_posts','PostController@getAll');


