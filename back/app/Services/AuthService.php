<?php

namespace App\Services;

use App\Repositories\UserRepository;

class AuthService extends BaseService
{
    public $repo;

    public function __construct(UserRepository $userRepository)
    {
        $this->repo = $userRepository;
    }

    public function create($input)   
    {
        $user = $this->repo->create($input);

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'status' => 'success',
            'data' => [
                'user' => $user,
                'access_token' => $token,
            ]
        ];
    }

    public function login($credentials)
    {
        $user = $this->repo->findOnEmail($credentials['email']);

        if (!$user || !password_verify($credentials['password'], $user->password)) {
            return [
                'status' => 'error',
                'message' => 'Неверные учетные данные',
            ];
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return [
            'status' => 'success',
            'data' => [
                'user' => $user,
                'access_token' => $token,
            ],
        ];
    }
}
