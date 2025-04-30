<?php

namespace App\Repositories;

use App\Models\Exercise;

class ExercisesRepository extends BaseRepository
{
    public $model;

    public function __construct(Exercise $exercise)
    {
        $this->model = $exercise;
    }
}