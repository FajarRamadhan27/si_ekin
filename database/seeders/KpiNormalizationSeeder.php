<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class KpiNormalizationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $strSql = "
            INSERT INTO kpi_mapping (type, kpi_key_from, kpi_key_to, point)
            select 'MATRIX_NORMALIZATION' type
                , map.kpi_key_from
                , map.kpi_key_to
                , round(map.point/tot.point, 3) point
            from kpi_mapping map
                , kpi_point_summary tot
            where map.type = 'matrix_pairs'
            and map.kpi_key_to = tot.key
            and map.type = tot.type";

        DB::insert(str_replace("\n", "", $strSql), []);

        $strSql = "
            INSERT INTO kpi_point_summary (`type`, `key`, point)
            SELECT MAP.type
                , mst.label
                , ROUND(sum(map.point), 3)
            FROM mst_kpi_index mst
                , kpi_mapping map
            WHERE mst.label = map.kpi_key_from
                AND map.type = 'MATRIX_NORMALIZATION'
            GROUP BY mst.label";

        DB::insert(str_replace("\n", "", $strSql), []);
    }
}
