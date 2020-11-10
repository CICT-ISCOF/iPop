<?php

namespace Database\Seeders;

use App\Models\Barangay;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BarangaySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        $sql = file_get_contents(storage_path('ph/barangays.sql'));

        $statements = array_filter(array_map('trim', explode(';', $sql)));

        foreach($statements as $statement) {
            DB::statement($statement);
        }
    }
}
