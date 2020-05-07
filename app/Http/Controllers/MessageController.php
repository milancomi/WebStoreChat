<?php

namespace App\Http\Controllers;

use App\Events\NewMessageEvent;
use App\Message;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MessageController extends Controller
{

    public function allMessagedUsers(Request $request)
    {

        $id = Auth::user()->id;
        $from = Message::where('from', $id)->orWhere('to', $id)->pluck('from');
        $to = Message::where('from', $id)->orWhere('to', $id)->pluck('to');

        $users = User::where('id', '!=', $id)->whereIn('id', $from)->orWhereIn('id', $to)->where('id', '!=', $id)->get();

        return response()->json($users);
    }

    public function getAllMessagedUsers($id)
    {

        $id = Auth::user()->id;
        $from = Message::where('from', $id)->orWhere('to', $id)->pluck('from');
        $to = Message::where('from', $id)->orWhere('to', $id)->pluck('to');

        $users = User::where('id', '!=', $id)->whereIn('id', $from)->orWhereIn('id', $to)->where('id', '!=', $id)->get();

        return $users;
    }
    public function allMessagedUsersInverseForBroadcast($id)
    {

        $from = Message::where('from', $id)->orWhere('to', $id)->pluck('from');
        $to = Message::where('from', $id)->orWhere('to', $id)->pluck('to');

        $users = User::where('id', '!=', $id)->whereIn('id', $from)->orWhereIn('id', $to)->where('id', '!=', $id)->get();

        return $users;
    }
    public function messageById($id)
    {

        $auth_id = Auth::user()->id;

        $messages = Message::where(function ($query) use ($auth_id, $id) {
            return $query->where('from', $auth_id)
                ->where('to', '=', $id);
        })
            ->orWhere(function ($query) use ($auth_id, $id) {
                return $query->where('to', $auth_id)
                    ->where('from', '=', $id);
            })
            ->orderBy('created_at', 'asc')
            ->get();

            $user_name = User::where('id',$id)->first()->name;
            
            return response()->json(['messages'=>$messages,'user_name'=>$user_name]);
    }
    public function newMsg(Request $request)
    {
        $message = $request->message;
        // $from2 = $request->from_user_id;
        $from = Auth::user()->id;        
        $to_user = $request->to_user_id;

        $msg = Message::create([
            'from' => $from,
            'to' => $to_user,
            'text' => $message,
        ]);

        $users =  $this->allMessagedUsersInverseForBroadcast($to_user);
        broadcast(new NewMessageEvent($msg,$users));

        $users1 = $this->getAllMessagedUsers($from);
        return response()->json($users1);
    }




    public function newMsgChat(Request $request)
    {
        $from = Auth::user()->id;        
        $to_user = $request->to_user_id;
        $message = $request->message;

        $msg = Message::create([
            'from' => $from,
            'to' => $to_user,
            'text' => $message,
        ]);
       $users = [];
        
        broadcast(new NewMessageEvent($msg,$users));
        return response()->json($msg);
    }

}
