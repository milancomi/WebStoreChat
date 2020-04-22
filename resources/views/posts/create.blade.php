@extends('layouts.app')
@section('script')
<script src="https://cdn.tiny.cloud/1/wsx160zd1et99qm1988cicdr1wf08ok9i4i8xj62jc3qg1wk/tinymce/5/tinymce.min.js" referrerpolicy="origin"></script>

<script>
tinymce.init({
  selector:'textarea',
  plugins: "link code",
  });

</script>
@endsection
@section('content')
  <div class="container">
    <h1>New Post</h1>
    <hr />
    <form method="post" action="{{ route('posts.store') }}"  enctype="multipart/form-data">
      {{ csrf_field() }}
      <div class="form-group">
        <label for="post_title">Title</label>
        <input type="text" class="form-control" id="post_title" name="title" placeholder="Title" value="{{ old('title') }}">
      </div>

      <div class="form-group">
        <label for="post_content">Post Content</label>
        <textarea class="form-control" rows="8" id="post_content" name="content" placeholder="Write something amazing..." value="{{ old('content') }}"></textarea>
      </div>

      <div class="form-group">
        <label><input type="checkbox" name="published" style="margin-right: 15px;">Published</label>
      </div>

      <div class="form-group mb-3">
        <label for="exampleFormControlFile1">Add file/image</label>
        <input type="file" name="upload_file" class="form-control-file" id="exampleFormControlFile1" multiple="true">
      </div>

      <button type="submit" class="btn btn-primary btn-lg">Save Post</button>
    </form>

  </div>
@endsection
