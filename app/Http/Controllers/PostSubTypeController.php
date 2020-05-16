<?php

namespace App\Http\Controllers;

use App\PostSubType;
use App\PostType;
use Illuminate\Http\Request;

class PostSubTypeController extends Controller
{
    public function __construct()
    {
    //   $this->middleware('auth', ['except' => ['show']]);
    }
    
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
      $post_sub_types = PostSubType::with('post_type')->paginate(20);
      return view('post_sub_types.index',compact('post_sub_types'));
    }
    
    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
      
        $post_types = PostType::all();
      
        return view('post_sub_types.create',compact('post_types'));
    }
    
    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        PostSubType::create([
            'name'=>$request->name,
            'post_type_id'=>$request->type_id,
        ]);
    
        return redirect()->route('sub_types.index');
    //   $this->validate($request, [
    //     'title' => 'required|max:255',
    //     'content' => 'required',
    //   ]);
    
    //   $user = PostSubType();
    
    //   $post = $user->post_sub_types()->create([
    //     'title' => $request->title,
    //     'content' => $request->content,
    //     'published' => $request->has('published')
    //   ]);
    
    //   return redirect()->route('post_sub_types.show', $post->id);
    }
    
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
    //   $post = PostSubType::findOrFail($id);
    //   return view('post_sub_types.show')->withPost($post);
    }
    
    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    //   $post = PostSubType::findOrFail($id);
    //   return view('post_sub_types.edit')->withPost($post);
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
    //   $this->validate($request, [
    //     'title' => 'required|max:255',
    //     'content' => 'required',
    //   ]);
    
    //   $post = PostSubType::findOrFail($id);
    //   $post->title = $request->title;
    //   $post->content = $request->content;
    //   $post->published = ($request->has('published') ? true : false);
    //   $post->save();
    
    //   return redirect()->route('post_sub_types.show', $post->id);
    }
    
    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
      PostSubType::destroy($id);
    }
    }