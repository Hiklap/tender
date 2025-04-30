<?php

namespace App\Services;

use App\Repositories\ExercisesRepository;

class ExercisesService extends BaseService
{
    public $repo;

    public function __construct(ExercisesRepository $exerciseRepository)
    {
        $this->repo = $exerciseRepository;
    }
}