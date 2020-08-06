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
            $table->string('email')->unique();
            $table->enum('provider_type', [
                'Facebook',
                'Google',
                'Twitter',
                'Instagram',
                'N/A',
            ]);
            $table
                ->string('provider_id')
                ->unique()
                ->nullable();
            $table->foreignId('profile_picture_id');
            $table
                ->foreign('profile_picture_id')
                ->references('id')
                ->on('files');
            $table->string('password');
            $table
                ->enum('access_level', ['Administrator', 'Moderator', 'Normal'])
                ->default('Normal');
            $table->rememberToken();
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
