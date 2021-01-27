<?php

use App\Models\File;
use App\Models\SBMPTC;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSBMPTCPersonnelsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('s_b_m_p_t_c_personnels', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('position')->nullable();
            $table->foreignIdFor(new File(), 'photo_id');
            $table->foreignIdFor(new SBMPTC(), 'sbmptc_id');
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
        Schema::dropIfExists('s_b_m_p_t_c_personnels');
    }
}
