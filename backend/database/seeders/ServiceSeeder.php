<?php

namespace Database\Seeders;

use App\Models\CMS\Service;
use App\Models\Role;
use App\Models\User;
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
        $this->makeApproved($rpfp);
        $this->makeApproved(
            $rpfp->offers()->create(['title' => 'Pre-Marriage Orientation and Counseling'])
        );
    }

    protected function makeApproved($model)
    {
        $admin = User::role(Role::ADMIN)->first();
        $model->approval()->create([
            'requester_id' => $admin->id,
            'approver_id' => $admin->id,
            'approved' => true,
        ]);
    }
}
