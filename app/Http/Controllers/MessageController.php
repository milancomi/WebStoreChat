<?php

namespace App\Http\Controllers;

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
            ->orderBy('created_at', 'desc')
            ->get();

            return response()->json($messages);
    }
    public function newMsg(Request $request)
    {
        $message = $request->message;
        $from = $request->from_user_id;
        $for_post = $request->for_post_id;
        $to_user = $request->to_user_id;

        $msg = Message::create([
            'from' => $from,
            'to' => $to_user,
            'text' => $message,
        ]);

        return response()->json($msg);
    }
}
