<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KpiMappingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $kpiMapping = [

            // Karakter KPI
            [
                'kpi_key_from' => 'Karakter',
                'kpi_key_to' => 'Karakter',
                'point' => 1
            ],
            [
                'kpi_key_from' => 'Karakter',
                'kpi_key_to' => 'Absensi',
                'point' => 5
            ],
            [
                'kpi_key_from' => 'Karakter',
                'kpi_key_to' => 'Teamwork',
                'point' => 3.333
            ],
            [
                'kpi_key_from' => 'Karakter',
                'kpi_key_to' => 'Pencapaian',
                'point' => 10
            ],
            [
                'kpi_key_from' => 'Karakter',
                'kpi_key_to' => 'Loyalitas',
                'point' => 10
            ],
            [
                'kpi_key_from' => 'Karakter',
                'kpi_key_to' => 'Efisiensi',
                'point' => 0.333
            ],

            // Absensi KPI
            [
                'kpi_key_from' => 'Absensi',
                'kpi_key_to' => 'Karakter',
                'point' => 0.2
            ],
            [
                'kpi_key_from' => 'Absensi',
                'kpi_key_to' => 'Absensi',
                'point' => 1
            ],
            [
                'kpi_key_from' => 'Absensi',
                'kpi_key_to' => 'Teamwork',
                'point' => 1.5
            ],
            [
                'kpi_key_from' => 'Absensi',
                'kpi_key_to' => 'Pencapaian',
                'point' => 2
            ],
            [
                'kpi_key_from' => 'Absensi',
                'kpi_key_to' => 'Loyalitas',
                'point' => 2
            ],
            [
                'kpi_key_from' => 'Absensi',
                'kpi_key_to' => 'Efisiensi',
                'point' => 1.5
            ],

            // Teamwork KPI
            [
                'kpi_key_from' => 'Teamwork',
                'kpi_key_to' => 'Karakter',
                'point' => 0.3
            ],
            [
                'kpi_key_from' => 'Teamwork',
                'kpi_key_to' => 'Absensi',
                'point' => 0.666
            ],
            [
                'kpi_key_from' => 'Teamwork',
                'kpi_key_to' => 'Teamwork',
                'point' => 1
            ],
            [
                'kpi_key_from' => 'Teamwork',
                'kpi_key_to' => 'Pencapaian',
                'point' => 3
            ],
            [
                'kpi_key_from' => 'Teamwork',
                'kpi_key_to' => 'Loyalitas',
                'point' => 3
            ],
            [
                'kpi_key_from' => 'Teamwork',
                'kpi_key_to' => 'Efisiensi',
                'point' => 1
            ],

            // Pencapaian KPI
            [
                'kpi_key_from' => 'Pencapaian',
                'kpi_key_to' => 'Karakter',
                'point' => 0.1
            ],
            [
                'kpi_key_from' => 'Pencapaian',
                'kpi_key_to' => 'Absensi',
                'point' => 2
            ],
            [
                'kpi_key_from' => 'Pencapaian',
                'kpi_key_to' => 'Teamwork',
                'point' => 3
            ],
            [
                'kpi_key_from' => 'Pencapaian',
                'kpi_key_to' => 'Pencapaian',
                'point' => 1
            ],
            [
                'kpi_key_from' => 'Pencapaian',
                'kpi_key_to' => 'Loyalitas',
                'point' => 1
            ],
            [
                'kpi_key_from' => 'Pencapaian',
                'kpi_key_to' => 'Efisiensi',
                'point' => 3
            ],

            // Loyalitas KPI
            [
                'kpi_key_from' => 'Loyalitas',
                'kpi_key_to' => 'Karakter',
                'point' => 0.1
            ],
            [
                'kpi_key_from' => 'Loyalitas',
                'kpi_key_to' => 'Absensi',
                'point' => 2
            ],
            [
                'kpi_key_from' => 'Loyalitas',
                'kpi_key_to' => 'Teamwork',
                'point' => 3
            ],
            [
                'kpi_key_from' => 'Loyalitas',
                'kpi_key_to' => 'Pencapaian',
                'point' => 1
            ],
            [
                'kpi_key_from' => 'Loyalitas',
                'kpi_key_to' => 'Loyalitas',
                'point' => 1
            ],
            [
                'kpi_key_from' => 'Loyalitas',
                'kpi_key_to' => 'Efisiensi',
                'point' => 3
            ],

            // Loyalitas KPI
            [
                'kpi_key_from' => 'Efisiensi',
                'kpi_key_to' => 'Karakter',
                'point' => 0.3
            ],
            [
                'kpi_key_from' => 'Efisiensi',
                'kpi_key_to' => 'Absensi',
                'point' => 0.666
            ],
            [
                'kpi_key_from' => 'Efisiensi',
                'kpi_key_to' => 'Teamwork',
                'point' => 1
            ],
            [
                'kpi_key_from' => 'Efisiensi',
                'kpi_key_to' => 'Pencapaian',
                'point' => 3
            ],
            [
                'kpi_key_from' => 'Efisiensi',
                'kpi_key_to' => 'Loyalitas',
                'point' => 3
            ],
            [
                'kpi_key_from' => 'Efisiensi',
                'kpi_key_to' => 'Efisiensi',
                'point' => 1
            ],
        ];

        DB::table('kpi_mapping')->insert($kpiMapping);
    }
}
