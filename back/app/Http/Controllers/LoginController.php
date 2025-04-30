<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\LoginRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;

class LoginController extends Controller
{
    use ApiResponse;
    
    private $service;

    public function __construct(AuthService $authService)
    {
        $this->service = $authService;
    }

    public function store(LoginRequest $request)
    {
        $response = $this->service->login($request->validated());

        return match ($response['status']) {
            'error' => $this->error($response['message'], 401),
            default => $this->success($response['data'], 201),
        };
    }
}
