<?php
namespace App\Traits;

use Illuminate\Support\Facades\Storage;

trait UserFileUrl
{

    public function getFileTitleAttribute($value)
    {
      
      $dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();
      $all_files = collect($dropbox->listSharedLinks());
      $file = $all_files->where('name',$value)->first();

      $file_url = str_replace('dl=0','raw=1',$file['url']);
     $value = $file_url;
      return $value;
  
    }
}
