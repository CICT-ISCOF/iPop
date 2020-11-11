<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use App\Models\Permission;
use App\Models\Role;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::factory()->create(['username' => 'admin']);

        $this->bootRoles();
        $this->bootPermissions();

        $role = Role::findOrCreate(Role::ADMIN);
        $role->givePermissionTo(Permission::ASSIGN);
        $role->save();
        $user->assignRole($role);
        $user->save();
    }

    protected function bootRoles()
    {
        collect(Role::DEFAULTS)
            ->each(function ($role) {
                Role::create(['name' => $role]);
            });
    }

    protected function bootPermissions()
    {
        collect(Permission::DEFAULTS)
            ->each(function ($permission) {
                Permission::create(['name' => $permission]);
            });
    }
}
