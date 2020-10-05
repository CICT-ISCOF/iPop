<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use WithFaker;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function testExample()
    {
        $response = $this->post('/auth/login', [
            'username' => 'admin',
            'password' => 'admin'
        ], [
            'Accept' => 'application/json',
            'X-Auth-Mode' => 'Password',
        ]);

        $response->assertStatus(200);
    }
}
