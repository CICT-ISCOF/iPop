<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMonthChartsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('month_charts', function (Blueprint $table) {
            $table->id();
            $table->string('municipality')->nullable();
            $table->string('barangay')->nullable();
            $table->year('year');
            $table->string('type');
            $table->enum('month', [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December',
            ]);
            $table->unsignedBigInteger('males')->default(0);
            $table->unsignedBigInteger('females')->default(0);
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
        Schema::dropIfExists('month_charts');
    }
}
