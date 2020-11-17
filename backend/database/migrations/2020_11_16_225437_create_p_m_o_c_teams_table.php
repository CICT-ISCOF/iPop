<?php

use App\Models\File;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePMOCTeamsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('p_m_o_c_teams', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position');
            $table->foreignIdFor(new File(), 'photo_id');
            $table->unsignedBigInteger('priority')->default(0);
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
        Schema::dropIfExists('p_m_o_c_teams');
    }
}
