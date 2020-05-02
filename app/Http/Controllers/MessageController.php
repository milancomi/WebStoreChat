<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    
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
