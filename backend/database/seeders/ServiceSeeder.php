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
        $this->makeApproved(
            $rpfp->offers()->create(['title' => 'Establishment of Multi-Purpose Counselling and Family Development Centers'])
        );
        $this->makeApproved(
            $rpfp->offers()->create(['title' => 'RP Lectures and Family Development Sessions'])
        );
        $this->makeApproved(
            $rpfp->offers()->create(['title' => 'Training for Pre-Marriage Counselors'])
        );

        $ahyd = Service::create(['title' => 'Adolescent Health & Youth Development Program']);
        $this->makeApproved($ahyd);
        $this->makeApproved(
            $ahyd->offers()->create(['title' => 'Establishment of School-Based Multi-Purpose Teen Centers'])
        );
        $this->makeApproved(
            $ahyd->offers()->create(['title' => 'AHYD Lectures/Symposia/Classes'])
        );
        $this->makeApproved(
            $ahyd->offers()->create(['title' => 'Training for Peer Helpers and Teen Center Coordinators'])
        );

        $pdi = Service::create(['title' => 'Population and Development Integration']);
        $this->makeApproved($pdi);
        $this->makeApproved(
            $pdi->offers()->create(['title' => 'Gender-Responsive PopDev Planning'])
        );
        $this->makeApproved(
            $pdi->offers()->create(['title' => 'PopDev Workshop'])
        );

        $pdm = Service::create(['title' => 'Population Data Management']);
        $this->makeApproved($pdm);
        $this->makeApproved(
            $pdm->offers()->create(['title' => 'Provision of Population and Population-Related Data'])
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
