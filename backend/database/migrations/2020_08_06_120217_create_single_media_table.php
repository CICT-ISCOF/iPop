<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSingleMediaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('single_media', function (Blueprint $table) {
            $table->id();
            $table->foreignId('link_id');
            $table
                ->foreign('link_id')
                ->references('id')
                ->on('links');
            $table->foreignId('file_id');
            $table
                ->foreign('file_id')
                ->references('id')
                ->on('files');
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
        Schema::dropIfExists('single_media');
    }
}
