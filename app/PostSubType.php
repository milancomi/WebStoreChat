<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class PostSubType extends Model
{
    protected $guarded = [];

    protected $fillable = [
        'name','post_type_id'
    ];


    public function post_type()
    {
      return $this->belongsTo('App\PostType');
    }

}
