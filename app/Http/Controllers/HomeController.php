<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationMail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('home');
    }


    public function send(Request $request)
    {

    $data = [
        'user_name'=>$request->name,
        'user_email' => $request->message

    ];
    $gmail =  Mail::to('milancomi96@gmail.com')->send(new RegistrationMail($data));

}

}
