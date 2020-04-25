<?php

namespace App\Http\Controllers;

use App\Dropfile;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
class DropfileController extends Controller
{
public function __construct() {
    $this->dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();
}


public function index()
{
    $files = DropFile::all();
    return view('dropboxtest.drop-index',compact('files'));
}



public function store(Request $request)
{

    // try{

        if($request->hasFile('file')){
            $files = $request->file('file');

            foreach($files as $file){
                $fileExtension  = $file->getClientOriginalExtension();
                $mimeType       = $file->getClientMimeType();
                $fileSize       = $file->getMaxFilesize();
                $newName        = uniqid() . '.'.$fileExtension;

            }
                Storage::disk('dropbox')->putFileAs('public/upload',$file, $newName);

                $this->dropbox->createSharedLinkWithSettings('public/upload/'.$newName);
                Dropfile::create([
                    'file_title'=>$newName,
                    'file_type' =>$mimeType,
                    'file_size'=>$fileSize
                ]);
        }


    // }catch (\Exception $e){
    //     return "Message: {$e->getMessage()}";
    // }
}

public function show($fileTitle)
{
    try {
        $link        = $this->dropbox->listSharedLinks('public/upload/'.$fileTitle);
        $raw         = explode("?",$link[0]['url']);
        $path        = $raw[0]. '?raw=1';
        $tempPath    = tempnam(sys_get_temp_dir(),$path);

        $copy = copy($path,$tempPath);

        return response()->file($tempPath);


    } catch (\Exception $e) {
        return abort(404);
    }
}

public function get($filename)
{
    $all_files = collect($this->dropbox->listSharedLinks());
    $file = $all_files->where('name','midMalaSlika-1-71.jpg')->first();
    $file_url = str_replace('dl=0','raw=1',$file['url']);

    return $file_url;->file($file_url);
    
    // (new Response($file, 200))
    //         ->header('Content-Type', Storage::mimeType($filename));

    

}






public function download($fileTitle)
{
try {
    return Storage::disk('dropbox')->download('public/upload/'. $fileTitle);
} catch (\Exception $e) {
    return abort(404);
}

}

public function destroy($id)
{
    try {
        $file = DropFile::find($id);
        Storage::disk('dropbox')->delete('public/upload/' .$file->file_title);
        $file->delete();

        return redirect('drop');
    } catch (\Exception $e) {
        return abort(404);
    }
}

}
