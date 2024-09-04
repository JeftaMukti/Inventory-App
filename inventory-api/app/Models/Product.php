<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'discription',
        'supplier_id',
        'stock_qty'
    ];

    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }

    public function distributionRecord()
    {
        return $this->hasMany(DistributionRecord::class);
    }

    public function purchaseRecord()
    {
        return $this->hasMany(PurchaseRecord::class);
    }
}
