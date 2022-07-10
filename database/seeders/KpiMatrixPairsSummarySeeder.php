<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KpiMatrixPairsSummarySeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $strSql = "
            INSERT INTO kpi_point_summary (`type`, `key`, point)
            SELECT map.type
                , mst.label
                , SUM(map.point)
            FROM mst_kpi_index mst
                , kpi_mapping map
            WHERE mst.label = map.kpi_key_to
                AND map.type = 'MATRIX_PAIRS'
            GROUP BY mst.label
        ";

        DB::insert(str_replace("\n", "", $strSql), []);
    }
}
