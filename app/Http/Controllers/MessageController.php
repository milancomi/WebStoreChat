<?php

namespace App\Http\Controllers;

use App\Message;
use App\User;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function allMessages(Request $request)
    {
    
        $id=2;
        $from = Message::where('from',$id)->orWhere('to',$id)->pluck('from');
        $to = Message::where('from',$id)->orWhere('to',$id)->pluck('to');

        
        $users = User::where('id','!=',$id)->whereIn('id',$from)->orWhereIn('id',$to)->where('id','!=',$id)->get();
 
        
        return response()->json($users);
    }
    
    public function newMsg(Request $request)
    {
        $message = $request->message;
        $from= $request->from_user_id;
        $for_post=$request->for_post_id;
        $to_user =$request->to_user_id;


       $msg =  Message::create([
            'from'=>$from,
            'to'=>$to_user,
            'text'=>$message
        ]);

        return response()->json($msg);
    }
}
