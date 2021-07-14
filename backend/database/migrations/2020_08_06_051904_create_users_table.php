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
            $table->string('username')->unique();
            $table->string('fullname');
            $table->string('district')->nullable();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->string('password');
            $table
                ->string('question')
                ->nullable();
            $table
                ->string('answer')
                ->unique()
                ->nullable();
            $table
                ->string('pin')
                ->unique()
                ->nullable();
            $table->unsignedTinyInteger('iterations')->default(0);
            $table->foreignId('profile_picture_id')->nullable();
            $table->string('assigned_municipality')->nullable();
            $table->string('assigned_barangay')->nullable();
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
