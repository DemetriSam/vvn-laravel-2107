<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'original',
        'imageable_id',
        'imageable_type'
    ];

    /**
     * Get the parent imageable model (user or post).
     */
    public function imageable()
    {
        return $this->morphTo();
    }
}
