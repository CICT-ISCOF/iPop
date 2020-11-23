<?php

namespace Database\Seeders;

use App\Models\CMS\ProgramArea;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class ProgramAreaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rpfp = ProgramArea::create([
            'title' => 'Responsible Parenthood and Family Planning Program',
            'description' => 'The Responsible Parenthood and Family Planning Program is one of the key component of the Philippine Population Management Program. The province objective is to help couples/parents exercise responsible parenting to develop the total well-being of children for them to become responsible and capable in contributing to the betterment of society, through the establishment of the Multi-Purpose Counseling and Family Development Centers and Information, Education & Communication (IEC) Advocacies.',
        ])
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
