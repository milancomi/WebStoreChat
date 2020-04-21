<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\View as FacadesView;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Redirect;


class DropboxController extends Controller
{
    public function uploadToDropbox()
    {
      return  FacadesView::make('dropbox');
    }


    public function uploadToDropboxFile(Request $request)
    {

        $file_src =  $request->file('upload_file');

        $is_file_uploaded = Storage::disk('dropbox')->put('public-uploads',$file_src);

        if($is_file_uploaded){

            return Redirect::back()->withErrors(['msg'=>'Sucessfully file uploaded to dropbox']);

        } else{
            return Redirect::back()->withErrors(['msg'=>'Failed to file uploaded to dropbox']);


        }

    }
}
