<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;

    protected $fillable = [
        'schedule_id',
        'user_id',
    ];

    public function schedule()
    {
        return $this->belongsTo(Schedule::class);
    }
}
