<?php

namespace Database\Seeders;

use App\Models\CMS\Service;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rpfp = Service::create(['title' => 'Responsible Parenthood and Family Planning Program']);
        $rpfp->offers()->create(['title' => 'Pre-Marriage Orientation and Counseling']);
    }
}
