<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Providers\RouteServiceProvider;
use App\User;
use Illuminate\Foundation\Auth\AuthenticatesUsers;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class LoginController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles authenticating users for the application and
    | redirecting them to your home screen. The controller uses a trait
    | to conveniently provide its functionality to your applications.
    |
    */

    use AuthenticatesUsers;
    /**
     * Where to redirect users after login.
     *
     * @var string
     */
    protected $redirectTo = RouteServiceProvider::HOME;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest')->except('logout');
    }

    /**
     * Facebook,Google,LinkedIn Auth Providers
     */

    public function redirectToFacebookProvider()
    {
        return Socialite::driver('facebook')->redirect();
    }

    public function redirectToGoogleProvider()
    {
        return Socialite::driver('google')->redirect();
    }

    public function redirectToLinkedInProvider()
    {
        return Socialite::driver('linkedin')->redirect();
    }





    /**
     * Facebook,Google,LinkedIn
     *
     * On Success Auth Handlerss
     */




    public function handleFacebookProviderCallback()
    {
        $userSocial = Socialite::driver('facebook')->user();


        $findUser =User::where('email',$userSocial->email)->first();

        if($findUser){

            Auth::login($findUser);
            return redirect()->route('home')->with('success','You logged in with facebook,explore now !'); 

        }else{

        $user = new User();
        $user->name = $userSocial->name;
        $user->email = $userSocial->email;
        $user->password = bcrypt('123456');

        $user->save();
        //  !!!!!!!!!!!!!!!!!!
         Auth::login($user);
         return redirect()->route('home')->with('success','You logged in with facebook,explore now !'); 

        }



    }





    public function handleLinkedInProviderCallback()
    {
        $userSocial = Socialite::driver('linkedin')->user();


        $findUser =User::where('email',$userSocial->email)->first();

        if($findUser){

            Auth::login($findUser);
            return redirect()->route('home')->with('success','You logged in with LinkedIn,explore now !'); ;

        }else{

        $user = new User();
        $user->name = $userSocial->name;
        $user->email = $userSocial->email;
        $user->password = bcrypt('123456');

        $user->save();
        //  !!!!!!!!!!!!!!!!!!
         Auth::login($user);
         return redirect()->route('home')->with('success','You logged in with LinkedIn,explore now !'); ;

        }



    }


    public function handleGoogleProviderCallback()
    {
        // $userSocial = Socialite::driver('google')->user();
        $userSocial = Socialite::driver('google')->stateless()->user();


        $findUser =User::where('email',$userSocial->email)->first();

        if($findUser){

            Auth::login($findUser);
            return redirect()->route('home')->with('success','You logged in with Google+,explore now !'); ;

        }else{

        $user = new User();
        $user->name = $userSocial->name;
        $user->email = $userSocial->email;
        $user->password = bcrypt('123456');

        $user->save();
        //  !!!!!!!!!!!!!!!!!!
         Auth::login($user);
         return redirect()->route('home')->with('success','You logged in with Google+,explore now !'); ;

        }



    }

}
