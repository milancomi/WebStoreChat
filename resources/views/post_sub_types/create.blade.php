@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="col col-sm-6 border border-secondary p-4 mt-5">
      <h1>New Sub Type</h1>
      <hr />
    <form method="post" action="{{ route('sub_types.store') }}"  enctype="multipart/form-data">
      {{ csrf_field() }}
      <div class="form-group ">
        <label for="name">Post sub type name</label>
        <input type="text" class="form-control" id="name" name="name" placeholder="write name" value="{{ old('name') }}">
      </div>

      <div class="form-group pb-4 pt-3">
        <label for="name">Post type</label>
        <select  class="form-control" id="type_id" name="type_id" >
        
          @if(!(empty($post_types))){

        @foreach($post_types as $post_type)
            {
                <option value={{$post_type->id}}>{{$post_type->name}}</option>
            }
          }
          @endforeach  
      @endif
      
        </select>
      </div>
      <button type="submit" class="btn btn-primary btn-lg">Save Sub Type</button>
    </form>
  </div>

  </div>
@endsection
