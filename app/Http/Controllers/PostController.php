<?php

namespace App\Http\Controllers;

use App\DropFile;
use Illuminate\Http\Request;
use App\Post;
use Auth;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    
    public $dropbox;
    public function __construct()
    {
      $this->middleware('auth', ['except' => ['show']]);
      $this->dropbox = Storage::disk('dropbox')->getDriver()->getAdapter()->getClient();

    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $posts = Post::paginate(25);
      return view('posts.index')->withPosts($posts);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      return view('posts.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

      $this->validate($request, [
        'title' => 'required|max:255',
        'content' => 'required',
      ]);

      $user = Auth::user();

      $post = $user->posts()->create([
        'title' => $request->title,
        'content' => $request->content,
        'published' => $request->has('published')
      ]);

      if($request->hasFile('upload_file')){



        
        
            $file             = $request->file('upload_file');
            $fileOriginalName = $file->getClientOriginalName();          
            $fileExtension    = $file->getClientOriginalExtension();
            $fileName         = basename($fileOriginalName,'.'.$fileExtension);
            $mimeType         = $file->getMimeType();
            $fileSize         = $file->getMaxFilesize();
            $newName          = $fileName .'-'.$user->id.'-'.$post->id.'.'.$fileExtension;
           
            Storage::disk('dropbox')->putFileAs("public/upload/$user->id/$post->id/",$file, $newName);

            $this->dropbox->createSharedLinkWithSettings("public/upload/$user->id/$post->id/".$newName);
            $drop_file = $post->files()->create([
              'user_id'=> $user->id,
              'file_title'=>$newName,
              'file_type'=>$mimeType,
              'file_size'=>$fileSize
            ]);
      
    }

      $all_posts = Post::latest()->take(5)->with('files')->get();
      // $all_posts = Post::with('files')->latest()->take(5)->get();

          return response()->json(['postData'=>$all_posts]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
      $post = Post::findOrFail($id);
      return view('posts.show')->withPost($post);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
      $post = Post::findOrFail($id);
      return view('posts.edit')->withPost($post);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
      $this->validate($request, [
        'title' => 'required|max:255',
        'content' => 'required',
      ]);

      $post = Post::findOrFail($id);
      $post->title = $request->title;
      $post->content = $request->content;
      $post->published = ($request->has('published') ? true : false);
      $post->save();

      return redirect()->route('posts.show', $post->id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      Post::destroy($id);
    }
}
