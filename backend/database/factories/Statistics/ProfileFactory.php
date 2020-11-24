<?php

namespace Database\Factories\Statistics;

use App\Models\Barangay;
use App\Models\Municipality;
use App\Models\Role;
use App\Models\Statistics\Profile;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProfileFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Profile::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $municipality = Municipality::all()->random(1)[0];
        return [
            'municipality' => $municipality->name,
            'barangay' => Barangay::where('municipality_code', $municipality->code)
                ->get()
                ->random(1)[0]
                ->name,
            'year' => $this->faker->year,
            'coverage' => 'N\A',
            'barangays' => 1,
            'land_area' => '32,000km2',
            'household_population' => 0,
            'males' => 5,
            'females' => 10,
            'sex_ratio' => '1:2',
            'median_age' => '24',
            'doubling' => 'N\A',
            'growth_rate' => '5%',
            'average_household_size' => 2,
            'density' => 'N\A',
            'age_dependency_ratio' => '3:1',
            'child_dependency_ratio' => '3:6',
            'old_age_dependency_ratio' => '8:4',
        ];
    }

    public function configure()
    {
        return $this->afterCreating(function ($profile) {
            $admin = User::role(Role::ADMIN)->first();
            $profile->approval()
                ->create([
                    'requester_id' => $admin->id,
                    'approver_id' => $admin->id,
                    'approved' => true,
                ]);
        });
    }
}
