@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h1>All Post Sub Types</h1>
      </div>

      <div class="col-md-4">
        <a href="{{ route('sub_types.create') }}" class="btn btn-primary pull-right" style="margin-top:15px;">Create New Sub Type</a>
      </div>
    </div>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>For Type</th>
          <th>Actions</th>
        </tr>
      </thead>


      <tbody>
        @foreach ($post_sub_types as $post_sub_type)
          <tr>
            <th>{{ $post_sub_type->id }}</th>
            <td>{{ $post_sub_type->name }}</td>
            <td>{{ $post_sub_type->post_type->name }}</td>
            <td><a href="{{ route('sub_types.edit', $post_sub_type->id) }}" class="btn btn-sm btn-default">Edit</a></td>
          </tr>
        @endforeach
      </tbody>
    </table>
    <div class="text-center">
      {{ $post_sub_types->links() }}
    </div>

  </div>
@endsection
