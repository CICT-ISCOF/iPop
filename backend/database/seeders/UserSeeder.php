<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::factory()->create();
        $role = Role::findOrCreate('Super Admin');
        $permission = Permission::create(['name' => 'Assign Permissions']);
        $role->givePermissionTo($permission);
        $role->save();
        $user->assignRole($role);
        $user->save();
    }
}
