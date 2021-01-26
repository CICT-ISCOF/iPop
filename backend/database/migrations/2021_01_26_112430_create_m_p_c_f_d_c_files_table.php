<?php

use App\Models\File;
use App\Models\MPCFDC;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMPCFDCFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('m_p_c_f_d_c_files', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(new MPCFDC(), 'mpcfdc_id');
            $table->foreignIdFor(new File());
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
        Schema::dropIfExists('m_p_c_f_d_c_files');
    }
}
