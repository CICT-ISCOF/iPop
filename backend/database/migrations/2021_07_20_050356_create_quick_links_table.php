<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuickLinksTable extends Migration
{
    public function up()
    {
        Schema::create('quick_links', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('title');
            $table->string('url');
        });
    }

    public function down()
    {
        Schema::dropIfExists('quick_links');
    }
}
