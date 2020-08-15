<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSliderTablesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slider_tables', function (Blueprint $table) {
            $table->id();
            $table->foreignId('link_id');
            $table
                ->foreign('link_id')
                ->references('id')
                ->on('links');
            $table->unsignedTinyInteger('position');
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
        Schema::dropIfExists('slider_tables');
    }
}
