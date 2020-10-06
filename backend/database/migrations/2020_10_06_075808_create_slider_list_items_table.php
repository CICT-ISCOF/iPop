<?php

use App\Models\File;
use App\Models\CMS\SliderList;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSliderListItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('slider_list_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(new SliderList());
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
        Schema::dropIfExists('slider_list_items');
    }
}
