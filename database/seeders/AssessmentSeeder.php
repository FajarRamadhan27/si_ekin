<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AssessmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = DB::table('users')->where('id', '<>', '1')->get();

        foreach ($users as $user) {

            $i=6;
            $assessments = [];

            do {
                $karakter = rand(60, 100);
                    $absensi = rand(60, 100);
                    $teamwork = rand(60, 100);
                    $pencapaian = rand(60, 100);
                    $loyalitas = rand(60, 100);
                    $efisiensi = rand(60, 100);

                    $nilaiAkhir = ($karakter + $absensi + $teamwork + $pencapaian + $loyalitas + $efisiensi) / 6;

                $assessment = [
                    'tanggal' => '20220'.$i,
                    'id_user' => $user->id,
                    'karakter' => $karakter,
                    'absensi' => $absensi,
                    'teamwork' => $teamwork,
                    'pencapaian' => $pencapaian,
                    'loyalitas' => $loyalitas,
                    'efisiensi' => $efisiensi,
                    'nilai_akhir' => $nilaiAkhir,
                    'tampilkan_hasil' => 1
                ];

                array_push($assessments, $assessment);
                $i--;
            } while ($i > 0);

            DB::table('penilaian')->insert($assessments);
        }
    }
}
