<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePersonnelDirectoriesTable extends Migration
{
    public function up()
    {
        Schema::create('personnel_directories', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('type');
            $table->string('name');
            $table->string('position');
            $table->string('phone');
            $table->string('email');
        });
    }

    public function down()
    {
        Schema::dropIfExists('personnel_directories');
    }
}
