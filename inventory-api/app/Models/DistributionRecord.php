<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DistributionRecord extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'product_id',
        'station_id',
        'product_qty',
        'distribution_date'
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }

    public function station()
    {
        return $this->belongsTo(Station::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

