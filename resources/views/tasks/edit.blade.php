@extends('layouts.app')

@section('title', 'Edit Task')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">{{ __('Edit The Task') }}</div>

                <div class="card-body">
                    <form id="editTaskForm"> 
                        @csrf
                        <div class="row mb-3">
                            <label for="title" class="col-md-4 col-form-label text-md-end">{{ __('Title') }}</label>

                            <div class="col-md-6">
                                <input id="title" type="text" class="form-control" name="title" autocomplete="title" autofocus>
                              
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="description" class="col-md-4 col-form-label text-md-end">{{ __('Description') }}</label>

                            <div class="col-md-6">
                                <input id="description" type="description" class="form-control" name="description" autocomplete="description">
                            
                            </div>
                        </div>

                        <div class="row mb-3">
                            <label for="long_description" class="col-md-4 col-form-label text-md-end">{{ __('Long Description') }}</label>

                            <div class="col-md-6">
                                <textarea name="long_description" id="long_description" cols="10" rows="5" class="form-control"></textarea>
                            </div>
                        </div>


                        <div class="row mb-0">
                            <div class="col-md-6 offset-md-4">
                                <button type="submit" class="btn">
                                    {{ __('Edit') }}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
    @vite('resources/js/tasks/edit-task.js')
@endsection