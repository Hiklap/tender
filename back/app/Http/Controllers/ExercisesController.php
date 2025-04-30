<?php

namespace App\Http\Controllers;

use App\Http\Requests\ExerciseRequest;
use App\Models\Exercise;
use App\Services\ExercisesService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ExercisesController extends Controller
{
    use ApiResponse;

    private $service;

    public function __construct(ExercisesService $exercisesService)
    {
        $this->service = $exercisesService;
    }

    public function index()
    {
        return $this->success(['exercises' => Exercise::all()]);
    }

    public function show(Exercise $exercise)
    {
        return $this->success(['exercise' => $exercise]);
    }

    public function store(ExerciseRequest $request)
    {
        $validatedData = $request->validated();

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
            $validatedData['image'] = $imagePath;
        }

        $exercise = $this->service->create($validatedData);

        return $this->success($exercise);
    }

    public function update(Exercise $exercise, ExerciseRequest $request)
    {
        $exercise = $this->service->update($exercise->id(), $request->validated());

        return $this->success(['exercise' => $exercise]);
    }
}
