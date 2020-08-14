<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            // $table->string('email')->unique();
            $table->string('username')->unique();
            $table->string('fullname');
            $table->string('district');
            $table->string('municipality');
            $table->string('barangay');
            $table->string('password');
            $table
                ->string('question')
                ->unique()
                ->nullable();
            $table
                ->string('answer')
                ->unique()
                ->nullable();
            $table
                ->string('pin')
                ->unique()
                ->nullable();
            $table->enum('role', ['Super Admin', 'PPO', 'PPO1', 'BSPO']);
            // $table->rememberToken();
            // $table
            //     ->enum('provider_type', [
            //         'Facebook',
            //         'Google',
            //         'Twitter',
            //         'Instagram',
            //         'N/A',
            //     ])
            //     ->default('N/A');
            // $table
            //     ->string('provider_id')
            //     ->unique()
            //     ->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
