<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    

    protected $fillable = [
        'from', 'to', 'text'
    ];
    protected $casts = [
        'created_at' => 'datetime:h:m:s m/d ',
    ];

 

}
