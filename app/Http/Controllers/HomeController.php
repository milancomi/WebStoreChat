<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationMail;
use Session;
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








public function messages()
{
    return redirect()->route('messageRoute')->with('warning','Don\'t Open this link');

}

public function messagee()
{
    session()->flash('error','error message'); 
    session()->flash('success','error success'); 
    session()->flash('warning','error warning'); 
    session()->flash('info','error info'); 

    
    return view('test');
}
}
