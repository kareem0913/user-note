<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class TaskController extends Controller
{
    public function index()
    {
        $tasks = Auth::user()->tasks()->latest()->get();
        return response()->json($tasks, 200);
    }

    public function store(TaskRequest $request)
    {
        try {
            $validate = $request->validate([
                'title' => 'required|max:255',
                'description' => 'required',
                'long_description' => 'required'
            ]);
            $task = $request->user()->tasks()->create($validate);
            return response()->json(['task' => $task], 201);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        } catch (\Exception $e) {
            // If there's a server error, return a 500 Internal Server Error status code
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function show(Task $task)
    {
        $this->authorize('view', $task);
        return response()->json($task, 201);
    }

    public function update(TaskRequest $request, Task $task)
    {
        try {
            $this->authorize('update', $task);
            $validate = $request->validate([
                'title' => 'required|max:255',
                'description' => 'required',
                'long_description' => 'required'
            ]);

            $task->update($validate);
            return response()->json($task, 200);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        } catch (\Exception $e) {
            // If there's a server error, return a 500 Internal Server Error status code
            return response()->json(['message' => 'Something went wrong'], 500);
        }
    }

    public function toggleCompleted(Task $task)
    {
        $this->authorize('update', $task);
        $task->toggleComplete();
        return response()->json(['message' => 'task is toggle'], 200);
    }

    public function destroy(Task $task)
    {
        $this->authorize('delete', $task);
        $task->delete();
        return response()->json(null, 204);
    }
}
