<?php

use App\Models\CMS\CardList;
use App\Models\File;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCardListItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('card_list_items', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(new CardList());
            $table->string('title');
            $table->text('description');
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
        Schema::dropIfExists('card_list_items');
    }
}
