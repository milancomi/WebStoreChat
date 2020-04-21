@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="flex-center position-ref full-height">
                        @if($errors->any())
                        <h4>{{$errors->first()}}</h4>
                        @endif
                    <div class="content">
                        <div class="title m-b-md">
                            Laravel
                        </div>
                    </div>
                    <form action="/upload-to-dropbox" method="post" enctype="multipart/form-data">
                    @csrf
                    <input type="file" name="upload_file" id="" multiple="true">
                    <button type="submit">Submit </button>
                    </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
