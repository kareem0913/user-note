@extends('layouts.app')

@section('title', 'The list of tasks')

@section('content')
<nav class="w-100 d-flex justify-content-center m-4">
    <a href="{{ route('tasks.create') }}" class="link">Add Task!</a>
</nav>
<div class="container w-100 d-flex justify-content-center gap-3 mx-auto py-8" id="tasks-container">
    <!-- Tasks will be inserted here -->
</div>
@endsection

@section('scripts')
    @vite('resources/js/tasks/tasks.js')
@endsection
