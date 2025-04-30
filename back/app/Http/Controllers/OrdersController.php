<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Notifications\OrderCreated;
use App\Traits\ApiResponse;
use Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Notification;

class OrdersController extends Controller
{
    use ApiResponse;

    public function index()
    {
        return $this->success(['orders' => Order::all()]);
    }

    public function show(Order $order)
    {
        return $this->success(['order' => $order]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'schedule_id' => 'required|exists:schedules,id',
        ]);

        $userId = Auth::id();

        $exists = Order::where('user_id', $userId)
                    ->where('schedule_id', $validatedData['schedule_id'])
                    ->exists();

        if ($exists) {
            return response()->json([
                'error' => 'Вы уже записаны на это занятие.'
            ], 422);
        }

        $user = Auth::user();
        $validatedData['user_id'] = $userId;
        $order = Order::create($validatedData);


        Notification::send($user, new OrderCreated($order));

        return $this->success(['order' => $order]);
    }

    public function update(Order $order, Request $request)
    {
        $order = $order->update($request->validate([
            'schedule_id' => 'required|exists:schedules,id',
        ]));
        return $this->success(['order' => $order]);
    }

    public function destroy(Order $order)
    {
        $order->delete();
        return $this->success(['message' => 'Успешно']);
    }

    public function myOrders()
    {
        return $this->success([
            'orders' => Order::with('schedule.exercise')
                ->where('user_id', Auth::id())
                ->get()
        ]);
    }



}
