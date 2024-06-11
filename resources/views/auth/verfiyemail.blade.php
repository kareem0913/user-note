@extends('layouts.app')

@section('content')

@endsection


@section('scripts')
    @vite('resources/js/redirect-if-auth.js')
    @vite('resources/js/resetPassword/verfiy-email.js');
@endsection
