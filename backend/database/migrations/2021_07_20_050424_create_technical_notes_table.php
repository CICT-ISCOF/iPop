<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTechnicalNotesTable extends Migration
{
    public function up()
    {
        Schema::create('technical_notes', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title')->index();
            $table->text('body');
            $table->string('type')->index();
        });
    }

    public function down()
    {
        Schema::dropIfExists('technical_notes');
    }
}
