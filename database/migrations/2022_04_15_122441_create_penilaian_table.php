<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePenilaianTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('penilaian', function (Blueprint $table) {
            $table->id();
            $table->string('tanggal');
            $table->string('id_user');
            $table->integer('karakter')->nullable();
            $table->integer('absensi')->nullable();
            $table->integer('teamwork')->nullable();
            $table->integer('pencapaian')->nullable();
            $table->integer('loyalitas')->nullable();
            $table->integer('efisiensi')->nullable();
            $table->integer('nilai_akhir')->nullable();
            $table->string('catatan')->nullable();
            $table->string('tampilkan_hasil')->default('N');
            $table->string('approve_yn')->default('N');
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
        Schema::dropIfExists('penilaian');
    }
}
