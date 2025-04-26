<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Tymon\JWTAuth\Facades\JWTAuth;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $user_id = $request->query('user_id');

        if ($user_id) {
            $tasks = Task::where('user_id', $user_id)->paginate(10);
        } else {
            $tasks = Task::paginate(10);
        }

        return response()->json($tasks);
    }


    public function store(Request $request)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $validated = $request->validate([
            'description' => 'required|string',
            'hours_spent' => 'required|numeric',
            'hourly_rate' => 'required|numeric',
            'additional_charges' => 'nullable|numeric',
        ]);

        $task = Task::create([
            'id' => Str::uuid(),
            'user_id' => $user->id,
            'employee_name' => $user->name,
            'description' => $validated['description'],
            'hours_spent' => $validated['hours_spent'],
            'hourly_rate' => $validated['hourly_rate'],
            'additional_charges' => $validated['additional_charges'] ?? 0,
            'total_remuneration' => ($validated['hours_spent'] * $validated['hourly_rate']) + ($validated['additional_charges'] ?? 0),
        ]);

        return response()->json($task, 201);
    }

    public function show($id)
    {
        $task = Task::findOrFail($id);
        return response()->json($task);
    }

    public function update(Request $request, $id)
    {
        $user = JWTAuth::parseToken()->authenticate();
        $task = Task::findOrFail($id);

        if ($task->user_id !== $user->id) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $validated = $request->validate([
            'description' => 'sometimes|required|string',
            'hours_spent' => 'sometimes|required|numeric|min:0',
            'hourly_rate' => 'sometimes|required|numeric|min:0',
            'additional_charges' => 'nullable|numeric',
        ]);

        $updateData = [
            'employee_name' => $user->name,
        ];

        if ($request->has('description')) {
            $updateData['description'] = $validated['description'];
        }
        if ($request->has('hours_spent')) {
            $updateData['hours_spent'] = $validated['hours_spent'];
        }
        if ($request->has('hourly_rate')) {
            $updateData['hourly_rate'] = $validated['hourly_rate'];
        }
        if ($request->has('additional_charges')) {
            $updateData['additional_charges'] = $validated['additional_charges'] ?? 0;
        }

        if (isset($updateData['hours_spent']) || isset($updateData['hourly_rate']) || isset($updateData['additional_charges'])) {
            $hours = $updateData['hours_spent'] ?? $task->hours_spent;
            $rate = $updateData['hourly_rate'] ?? $task->hourly_rate;
            $charges = $updateData['additional_charges'] ?? $task->additional_charges;
            $updateData['total_remuneration'] = ($hours * $rate) + $charges;
        }

        // Update task
        $task->update($updateData);

        return response()->json($task); 
    }

    public function destroy($id)
    {
        $user = JWTAuth::parseToken()->authenticate();

        $task = Task::findOrFail($id);

        if ($user->id !== $task->user_id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $task->delete();

        return response()->json(['message' => 'Task berhasil dihapus']);
    }
}
