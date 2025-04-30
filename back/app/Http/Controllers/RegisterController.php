<?php

namespace App\Http\Controllers;

use App\Http\Requests\RegisterRequest;
use App\Services\AuthService;
use App\Traits\ApiResponse;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    use ApiResponse;
    
    private $service;

    public function __construct(AuthService $authService)
    {
        $this->service = $authService;
    }
    
    public function store(RegisterRequest $request)
    {
        $response = $this->service->create($request->validated());

        return $this->success(['user' => $response['data']]);
    }
}
