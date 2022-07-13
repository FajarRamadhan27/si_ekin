<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KpiIndexSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $kpiIndex = [
            [
                'id' => 1,
                'label'=> 'Karakter',
            ],
            [
                'key' => 2,
                'label' => 'Absensi'
            ],
            [
                'key' => 3,
                'label' => 'Teamwork'
            ],
            [
                'key' => 4,
                'label' => 'Pencapaian',
            ],
            [
                'key' => 5,
                'laebl' => 'Loyalitas'
            ],
            [
                'key' => 6,
                'label' => 'Efisiensi'
            ]
        ];

        DB::table('mst_kpi_index')->insert($kpiIndex);
    }
}
