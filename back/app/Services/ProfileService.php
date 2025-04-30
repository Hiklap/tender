<?php

namespace App\Services;

use App\Repositories\UserRepository;

class ProfileService extends BaseService
{
    public $repo;

    public function __construct(UserRepository $userRepository)
    {
        $this->repo = $userRepository;
    }
   
}