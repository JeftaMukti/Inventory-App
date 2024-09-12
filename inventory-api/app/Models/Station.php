<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Station extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'location',
        'manager',
    ];

    public function distributionRecord()
    {
        return $this->hasMany(DistributionRecord::class);
    }
}
