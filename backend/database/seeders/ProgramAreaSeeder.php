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
        ]);
        $this->makeApproved($rpfp);
        $this->makeApproved(
            $rpfp->activities()->create([
                'title' => 'THE MULTI-PURPOSE COUNSELLING AND FAMILY DEVELOPMENT CENTERS',
                'description' => 'The Responsible Parenthood and Family Planning Program is one of the key component of the Philippine Population Management Program. The province objective is to help couples/parents exercise responsible parenting to develop the total well-being of children for them to become responsible and capable in contributing to the betterment of society, through the establishment of the Multi-Purpose Counseling and Family Development Centers and Information, Education & Communication (IEC) Advocacies.',
            ])
        );

        $ahyd = ProgramArea::create([
            'title' => 'Adolescent Health & Youth Development Program',
            'description' => 'The Adolescent Health and Youth Development Program is one of the key component of the Philippine Population Management Program. The province’s objective is to help in the development and growth of adolescents and youth for them to become responsible and productive members of the society, through the establishment of the School-Based Multi-Purpose Teen Centers and Information, Education & Communication (IEC) Advocacies.',
        ]);
        $this->makeApproved($ahyd);
        $this->makeApproved(
            $ahyd->activities()->create([
                'title' => 'SCHOOL-BASED MULTI-PURPOSE TEENCENTERS',
                'description' => 'The Responsible Parenthood and Family Planning Program is one of the key component of the Philippine Population Management Program. The province objective is to help couples/parents exercise responsible parenting to develop the total well-being of children for them to become responsible and capable in contributing to the betterment of society, through the establishment of the Multi-Purpose Counseling and Family Development Centers and Information, Education & Communication (IEC) Advocacies.',
            ])
        );

        $cpdbmp = ProgramArea::create([
            'title' => 'Comprehensive Population Data Banking and Management Project',
            'description' => 'The Population Office is mandated to establish and maintain an updated population data bank for program operations, development planning, and an educational program to ensure people’s participation in and understanding of population development.',
        ]);
        $this->makeApproved($cpdbmp);
        $this->makeApproved(
            $cpdbmp->activities()->create([
                'title' => 'THE BARANGAY SERVICE POINT OFFICERS',
                'description' => 'The Responsible Parenthood and Family Planning Program is one of the key component of the Philippine Population Management Program. The province objective is to help couples/parents exercise responsible parenting to develop the total well-being of children for them to become responsible and capable in contributing to the betterment of society, through the establishment of the Multi-Purpose Counseling and Family Development Centers and Information, Education & Communication (IEC) Advocacies.',
            ])
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
