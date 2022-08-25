<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PrCvet extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'images',
        'published',
        'pr_collection_id'
    ];

    public $resizes = [
        [574, 574],
        [1148, 1148],
        [828, 1400],
        [414, 700],
        [320, 320],
        [640, 640],
        [325, 325]
    ];

    public function pr_collection()
    {
        return $this->belongsTo(PrCollection::class);
    }

    public function images()
    {
        return $this->morphMany(\App\Models\PrImage::class, 'imageable');
    }
}
