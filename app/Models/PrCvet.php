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
        'image',
        'published',
        'pr_collection_id'
    ];

    public function pr_collection()
    {
        return $this->belongsTo(PrCollection::class);
    }

    public function image()
    {
        return $this->morphOne(\App\Models\PrImage::class, 'imageable');
    }
}
