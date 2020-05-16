<?php

namespace App\Http\Controllers;

use App\PostType;
use Illuminate\Http\Request;

class PostTypeController extends Controller
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
  $post_types= PostType::paginate(25);
  return view('post_types.index',compact('post_types'));
}

/**
 * Show the form for creating a new resource.
 *
 * @return \Illuminate\Http\Response
 */
public function create()
{
  return view('post_types.create');
}

/**
 * Store a newly created resource in storage.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\Response
 */
public function store(Request $request)
{
    PostType::create([
        'name'=>$request->name
    ]);

    return redirect()->route('types.index');
//   $this->validate($request, [
//     'title' => 'required|max:255',
//     'content' => 'required',
//   ]);

//   $user = PostType();

//   $post = $user->post_types()->create([
//     'title' => $request->title,
//     'content' => $request->content,
//     'published' => $request->has('published')
//   ]);

//   return redirect()->route('post_types.show', $post->id);
}

/**
 * Display the specified resource.
 *
 * @param  int  $id
 * @return \Illuminate\Http\Response
 */
public function show($id)
{
//   $post = PostType::findOrFail($id);
//   return view('post_types.show')->withPost($post);
}

/**
 * Show the form for editing the specified resource.
 *
 * @param  int  $id
 * @return \Illuminate\Http\Response
 */
public function edit($id)
{
//   $post = PostType::findOrFail($id);
//   return view('post_types.edit')->withPost($post);
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

//   $post = PostType::findOrFail($id);
//   $post->title = $request->title;
//   $post->content = $request->content;
//   $post->published = ($request->has('published') ? true : false);
//   $post->save();

//   return redirect()->route('post_types.show', $post->id);
}

/**
 * Remove the specified resource from storage.
 *
 * @param  int  $id
 * @return \Illuminate\Http\Response
 */
public function destroy($id)
{
  PostType::destroy($id);
}
}