<?php

namespace App;
use App\Traits\UserFileUrl;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class DropFile extends Model
{
  use UserFileUrl;
    protected $guarded = [];

    public function post()
    {
      return $this->hasMany('App\Post');
    }

}
