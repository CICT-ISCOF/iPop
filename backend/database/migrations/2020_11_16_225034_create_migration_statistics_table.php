<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMigrationStatisticsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('migration_statistics', function (Blueprint $table) {
            $table->id();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year');
            $table->unsignedDouble('total_population')->default(0);
            $table->unsignedDouble('total_in_migrations')->default(0);
            $table->unsignedDouble('total_out_migrations')->default(0);
            $table->unsignedDouble('net_migrations')->default(0);
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
        Schema::dropIfExists('migration_statistics');
    }
}
