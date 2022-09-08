<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\PrImage;

class PrImageTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

    protected $pr_image;

    public function test_example()
    {
        $response = $this->get('/');

        $response->assertStatus(200);
    }

    /**
     * @group pr_image_tests
     */
    public function test_make_resizes()
    {
        $file_path = 'pr_collection_images/0ZDCQaCozLUxjWAfOObxX20rIFbOlQN3W4FMFcSs.jpg';
        $pr_image = PrImage::create(['orig_img' => $file_path]);

        $pr_image->make_resizes([
            [300, 300],
            [400, 600],
            [500, 100]
        ]);
         
        collect(json_decode($pr_image->resizes))->dump();

        $pr_image->save();

        $this->pr_image = $pr_image;

    }

    /**
     * @group pr_image_tests
     */
    public function test_get_resize()
    {

        $this->test_make_resizes();

        $result = $this->pr_image->get_resize('300x300');
        print_r($result);

        $get_path_in_filesystem = true;
        $result = $this->pr_image->get_resize('300x300', $get_path_in_filesystem);
        $this->assertFileExists($result);
    }

    
}
