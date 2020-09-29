<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'username' => 'admin',
            'fullname' => 'admin',
            'district' => '6',
            'municipality' => 'Barotac Nuevo',
            'barangay' => 'Main Poblacion',
            'password' => Hash::make('admin'),
            'role' => 'Super Admin',
        ]);
        factory(User::class, 10)->create();
    }
}
