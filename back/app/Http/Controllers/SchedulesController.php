<?php

namespace App\Http\Controllers;

use App\Http\Requests\SchedulesRequest;
use App\Models\Schedule;
use App\Models\Exercise;
use App\Traits\ApiResponse;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SchedulesController extends Controller
{
    use ApiResponse;

    public function index()
    {
        return $this->success([
            'schedules' => Schedule::with('exercise')
                ->where('date', '>=', Carbon::today())
                ->orderBy('date', 'asc')
                ->get()
        ]);

    }

    public function show(Schedule $schedule)
    {
        return $this->success(['schedule' => $schedule]);
    }

    public function store(SchedulesRequest $request)
    {
        $validatedData = $request->validated();
        $exerciseId = $validatedData['exercise_id'];

        $exercise = Exercise::findOrFail($exerciseId);

        if (empty($validatedData['end_time'])) {
            $startTime = Carbon::createFromFormat('H:i', $validatedData['start_time']);
            $endTime = $startTime->copy()->addMinutes($exercise->duration);
            $validatedData['end_time'] = $endTime->format('H:i');
        }

        $schedule = Schedule::create($validatedData);

        return $this->success($schedule);
    }
}
