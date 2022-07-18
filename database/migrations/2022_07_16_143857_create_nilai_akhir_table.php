<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNilaiAkhirTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('nilai_akhir', function (Blueprint $table) {
            $table->id();
            $table->string('penilaian_id');
            $table->string('id_user');
            $table->double('karakter')->nullable();
            $table->double('absensi')->nullable();
            $table->double('teamwork')->nullable();
            $table->double('pencapaian')->nullable();
            $table->double('loyalitas')->nullable();
            $table->double('efisiensi')->nullable();
            $table->double('nilai_akhir')->nullable();
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
        Schema::dropIfExists('nilai_akhir');
    }
}
