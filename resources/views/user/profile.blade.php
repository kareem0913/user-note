@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Profile') }}</div>

                <div class="card-body">
                    <div id="profile-content">
                       
                    </div>
                    <a href="/profile/update" class="btn m-3"> Edit</a>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    @vite('resources/js/profile/profile.js')
@endsection
