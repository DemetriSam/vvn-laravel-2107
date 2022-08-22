<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrCollection extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'price',
        'description',
        'images',
        'published'
    ];

    public function pr_cvets()
    {
        return $this->hasMany(PrCvet::class);
    }

    public function image()
    {
        return $this->morphOne(\App\Models\PrImage::class, 'imageable');
    }
}
