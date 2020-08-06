<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePopulationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('populations', function (Blueprint $table) {
            $table->id();
            $table->morphs('stateable');
            $table->date('census');
            $table->unsignedBigInteger('births');
            $table->unsignedBigInteger('deaths');
            $table->unsignedBigInteger('total');
            $table->unsignedBigInteger('males');
            $table->unsignedBigInteger('females');
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
        Schema::dropIfExists('populations');
    }
}
