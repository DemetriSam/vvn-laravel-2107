<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class PrImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'orig_img',
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

    public function make_resizes($sizes = [])
    {
        $image = Image::make(Storage::path($this->orig_img));

        [$dir_path, $filename_body, $filename_ext] = $this->map_filepath($this->orig_img);

        $resizes = [];

        foreach ($sizes as $size) {
            $width = $size[0];
            $height = $size[1];

            $resize = clone $image;

            $resize->fit($width, $height);
            
            $resize_format = $width . 'x' . $height;
            $resize_path = Storage::disk('public')->path($dir_path) . $filename_body . '_' . $resize_format . '.' . $filename_ext;

            $resize->save(
                $resize_path,
                100
            );

            $fordb = [
                'format' => $resize_format,
                'file' => $resize_path
            ];

            $resizes[] = $fordb;
        }

        $this->saveResizes($resizes);
    }

    public function saveResizes($resizes)
    {
        
    }

    public function map_filepath($filepath)
    {
        $members = explode('/', $filepath);
        $reversed = array_reverse($members);

        $file_name = $reversed[0];
        $filename_members = explode('.', $file_name);
        $filename_members_reversed = array_reverse($filename_members);

        $filename_ext = $filename_members_reversed[0];

        unset($filename_members_reversed[0]);
        $filename_members = array_reverse($filename_members_reversed);

        $filename_body = implode('.', $filename_members);

        unset($reversed[0]);
        $straight = array_reverse($reversed);

        $dir_path = implode('/', $straight) . '/';

        return [$dir_path, $filename_body, $filename_ext];
    }
}
