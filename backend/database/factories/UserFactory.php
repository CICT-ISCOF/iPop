<?php


namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = User::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'fullname' => $this->faker->name,
            'username' => $this->faker->userName,
            'district' => '4',
            'municipality' => 'Barotac Nuevo',
            'barangay' => 'Lagubang',
            'password' => Hash::make('admin'),
        ];
    }
}
