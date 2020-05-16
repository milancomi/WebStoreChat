@extends('layouts.app')

@section('content')
  <div class="container">
    <div class="row">
      <div class="col-md-8">
        <h1>All Post Types</h1>
      </div>

      <div class="col-md-4">
        <a href="{{ route('types.create') }}" class="btn btn-primary pull-right" style="margin-top:15px;">Create New Type</a>
      </div>
    </div>
    <hr />
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        @foreach ($post_types as $post_type)
          <tr>
            <th>{{ $post_type->id }}</th>
            <td>{{ $post_type->name }}</td>
            <td><a href="{{ route('sub_types.edit', $post_type->id) }}" class="btn btn-sm btn-default">Edit</a></td>
          </tr>
        @endforeach
      </tbody>
    </table>
    <div class="text-center">
      {{ $post_types->links() }}
    </div>

  </div>
@endsection
