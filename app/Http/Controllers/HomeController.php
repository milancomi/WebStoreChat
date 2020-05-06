<?php

namespace App\Http\Controllers;

use App\Mail\RegistrationMail;
use App\Post;
use App\User;
use Session;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Storage;
use Throwable;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public $dropbox;

    public function __construct()
    {
        $this->middleware('auth');
          $this->dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();
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

    public function deactivate(Request $request)
    {
        $user_id= $request->id;
        $user = User::where('id',$user_id)->first();

        try {
            $this->dropbox->delete("public/upload/".$user->id.$user->name);
            $posts= Post::where('user_id',$user_id)->delete();
            $user->delete();
            Session::flash('info','You have successfully deleted your account.');
               } catch (Throwable $e) {
    
                $posts= Post::where('user_id',$user_id)->delete();
                $user->delete();
                Session::flash('info','You have successfully deleted your account.');        }

        
   
   
    
     
      
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
