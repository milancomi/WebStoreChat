<?php

namespace App\Http\Controllers;

use App\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{

    public function allMessages(Request $request)
    {
    
        $msgs = Message::where('from',7)->orWhere('to',7)->select('to')->get();

        dd($msgs);
        return response()->json($msgs);
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
