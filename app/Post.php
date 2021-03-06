<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    protected $fillable = [
        'title', 'content', 'published','price'
    ];

    public function user()
    {
      return $this->belongsTo('App\User');
    }

    public function files() {
      return $this->hasMany('App\DropFile');
    }

}
