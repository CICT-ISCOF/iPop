<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBarangaysTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('barangays', function (Blueprint $table) {
            $table->id();
            $table->string('code')->index();
            $table->string('name')->index();
            $table->string('region_code');
            $table
                ->foreign('region_code')
                ->references('code')
                ->on('regions');
            $table->string('province_code');
            $table
                ->foreign('province_code')
                ->references('code')
                ->on('provinces');
            $table->string('municipality_code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('barangays');
    }
}
