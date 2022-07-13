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
                $karakter = rand(1, 5);
                $absensi = rand(1, 5);
                $teamwork = rand(1, 5);
                $pencapaian = rand(1, 5);
                $loyalitas = rand(1, 5);
                $efisiensi = rand(1, 5);

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
                    'nilai_akhir' => $nilaiAkhir
                ];

                array_push($assessments, $assessment);
                $i--;
            } while ($i > 0);

            DB::table('penilaian')->insert($assessments);
        }
    }
}
