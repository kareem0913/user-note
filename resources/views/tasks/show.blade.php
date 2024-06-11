@extends('layouts.app')

@section('title', 'The list of tasks')

@section('content')
<nav class="w-100 d-flex justify-content-center m-4">
    {{-- <a href="{{ route('tasks.create') }}" class="link">Add Task!</a> --}}
</nav>
<div class="container mx-auto py-8">
    <div class="card mb-4" id="task-details">
        <!-- Task details will be inserted here -->
    </div>
    <div class="d-flex justify-content-center">
        <button id="edit-btn" class="btn btn-primary mr-2">Edit</button>
        <button id="toggle-btn" class="btn btn-warning mr-2">Toggle Complete</button>
        <button id="delete-btn" class="btn btn-danger">Delete</button>
    </div>
</div>
@endsection

@section('scripts')
    @vite('resources/js/tasks/task.js')
@endsection
