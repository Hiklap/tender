<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileRequest;
use App\Models\User;
use App\Services\ProfileService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    use ApiResponse;
    
    private $service;

    public function __construct(ProfileService $profileService)
    {
        $this->service = $profileService;
    }

    public function index()
    {
        //
    }

    public function show()
    {
        return $this->success(['user' => Auth::user()]);
    }

    public function update(ProfileRequest $request)
    {
        $user = $this->service->update(Auth::id(), $request->validated());

        return $this->success(['user' => $user]);
    }
}
