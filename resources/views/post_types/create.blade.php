@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="col col-sm-6 border border-secondary p-4 mt-5">
      <h1>New Type</h1>
      <hr />
    <form method="post" action="{{ route('types.store') }}"  enctype="multipart/form-data">
      {{ csrf_field() }}
      <div class="form-group pb-4">
        <label for="name">Post Type</label>
        <input type="text" class="form-control" id="name" name="name" placeholder="Name" value="{{ old('name') }}">
      </div>

      <button type="submit" class="btn btn-primary btn-lg">Save Type</button>
    </form>
    </div>
  </div>
@endsection
