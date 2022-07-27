<?php

namespace App\Http\Controllers;

use App\Models\Assesment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AssesmentController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($period, Request $request)
    {
        $strSql = "
            SELECT *
            FROM (
                SELECT '1' sort,
                    penilaian.id,
                    users.name,
                    penilaian.id as penilaian_id,
                    penilaian.karakter,
                    penilaian.absensi,
                    penilaian.teamwork,
                    penilaian.pencapaian,
                    penilaian.loyalitas,
                    penilaian.efisiensi,
                    penilaian.nilai_akhir,
                    penilaian.catatan,
                    penilaian.tampilkan_hasil,
                    penilaian.tanggal
                FROM users
                    , penilaian
                WHERE users.id = penilaian.id_user
                    AND penilaian.approve_yn != 'Y'
                    AND penilaian.id_user like ?
                    AND penilaian.tanggal = ?
                UNION ALL
                SELECT '2' sort,
                    penilaian.penilaian_id id,
                    users.name,
                    penilaian.penilaian_id,
                    penilaian.karakter,
                    penilaian.absensi,
                    penilaian.teamwork,
                    penilaian.pencapaian,
                    penilaian.loyalitas,
                    penilaian.efisiensi,
                    penilaian.nilai_akhir,
                    '' catatan,
                    '' tampilkan_hasil,
                    '' tanggal
                FROM users
                    , nilai_akhir penilaian
                    , penilaian nilai
                WHERE users.id = penilaian.id_user
                    AND penilaian.penilaian_id = nilai.id
                    AND nilai.approve_yn != 'Y'
                    AND penilaian.id_user like ?
                    AND nilai.tanggal = ?
            ) A
            ORDER BY name, penilaian_id, sort
        ";

        $user = DB::select(str_replace("\n", "", $strSql), [$request->id.'%', $period, $request->id.'%', $period]);

        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getUserAssessmentByPeriod($userId, $period)
    {
        $user = DB::table('users')
            ->leftJoin('penilaian', 'users.id', '=', 'penilaian.id_user')
            ->select(
                'penilaian.id',
                'users.name',
                'penilaian.id as penilaian_id',
                'penilaian.karakter',
                'penilaian.absensi',
                'penilaian.teamwork',
                'penilaian.pencapaian',
                'penilaian.loyalitas',
                'penilaian.efisiensi',
                'penilaian.nilai_akhir',
                'penilaian.catatan',
                'penilaian.approve_yn',
            )
            ->where('penilaian.tanggal', '=', $period)
            ->where('users.id', '=', $userId)
            ->orderBy('users.name')
            ->get();

        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function assessmentHistory($id_user, $period)
    {
        $sql = "
            SELECT u.name
                , p.id
                , p.tanggal
                , p.karakter
                , p.absensi
                , p.teamwork
                , p.pencapaian
                , p.loyalitas
                , p.efisiensi
                , p.nilai_akhir
                , p.catatan
                , c.num AS rank
            FROM users u
                , penilaian p
                , (
                    SELECT
                        @row_number:=CASE
                            WHEN @tanggal = A.tanggal
                                THEN @row_number + 1
                            ELSE 1
                        END AS num,
                        @tanggal:=tanggal tanggal,
                    A. id,
                        A.nilai_akhir
                    FROM penilaian A
                    ORDER BY tanggal, NILAI_AKHIR DESC
                ) c
            WHERE u.id = p.id_user
                AND p.approve_yn = 'Y'
                AND p.id = c.id
                AND u.id = ?
                AND SUBSTR(p.tanggal, 1, 4) = ?
            ORDER BY P.tanggal";

            DB::statement(DB::raw('set @ROW_NUM := 0'));

        $user = DB::select(str_replace("\n", "", $sql), [$id_user, $period]);

        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function kpiIndex()
    {
        $sql = "
            SELECT MST.LABEL
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Karakter' AND MAP.type = 'MATRIX_PAIRS') AS Karakter
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Absensi' AND MAP.type = 'MATRIX_PAIRS') AS Absensi
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Teamwork' AND MAP.type = 'MATRIX_PAIRS') AS Teamwork
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Pencapaian' AND MAP.type = 'MATRIX_PAIRS') AS Pencapaian
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Loyalitas' AND MAP.type = 'MATRIX_PAIRS') AS Loyalitas
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Efisiensi' AND MAP.type = 'MATRIX_PAIRS') AS Efisiensi
            FROM mst_kpi_index MST
            UNION ALL
            SELECT 'Jumlah' LABEL
                , (SELECT POINT FROM kpi_point_summary WHERE `key` = 'Karakter' AND TYPE ='MATRIX_PAIRS') AS Karakter
                , (SELECT POINT FROM kpi_point_summary WHERE `key` = 'Absensi' AND TYPE ='MATRIX_PAIRS') AS Absensi
                , (SELECT POINT FROM kpi_point_summary WHERE `key` = 'Teamwork' AND TYPE ='MATRIX_PAIRS') AS Teamwork
                , (SELECT POINT FROM kpi_point_summary WHERE `key` = 'Pencapaian' AND TYPE ='MATRIX_PAIRS') AS Pencapaian
                , (SELECT POINT FROM kpi_point_summary WHERE `key` = 'Loyalitas' AND TYPE ='MATRIX_PAIRS') AS Loyalitas
                , (SELECT POINT FROM kpi_point_summary WHERE `key` = 'Efisiensi' AND TYPE ='MATRIX_PAIRS') AS Efisiensi
            FROM DUAL";

        $user = DB::select(str_replace("\n", "", $sql), []);

        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function kpiNormalization()
    {
        $sql = "
            SELECT MST.LABEL
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Karakter' AND MAP.type = 'MATRIX_NORMALIZATION') AS Karakter
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Absensi' AND MAP.type = 'MATRIX_NORMALIZATION') AS Absensi
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Teamwork' AND MAP.type = 'MATRIX_NORMALIZATION') AS Teamwork
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Pencapaian' AND MAP.type = 'MATRIX_NORMALIZATION') AS Pencapaian
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Loyalitas' AND MAP.type = 'MATRIX_NORMALIZATION') AS Loyalitas
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Efisiensi' AND MAP.type = 'MATRIX_NORMALIZATION') AS Efisiensi
                , (SELECT POINT FROM kpi_point_summary sum WHERE sum.TYPE = 'MATRIX_NORMALIZATION' AND sum.KEY = mst.LABEL) Jumlah
                , ROUND((SELECT POINT FROM kpi_point_summary sum WHERE sum.TYPE = 'MATRIX_NORMALIZATION' AND sum.KEY = mst.LABEL) / 6, 3) Prioritas
            FROM mst_kpi_index MST";

        $user = DB::select(str_replace("\n", "", $sql), []);

        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function kpiRowSummary()
    {
        $sql = "
            SELECT MST.LABEL
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Karakter' AND MAP.type = 'MATRIX_ROW_SUMMARY') AS Karakter
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Absensi' AND MAP.type = 'MATRIX_ROW_SUMMARY') AS Absensi
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Teamwork' AND MAP.type = 'MATRIX_ROW_SUMMARY') AS Teamwork
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Pencapaian' AND MAP.type = 'MATRIX_ROW_SUMMARY') AS Pencapaian
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Loyalitas' AND MAP.type = 'MATRIX_ROW_SUMMARY') AS Loyalitas
                , (SELECT POINT FROM kpi_mapping MAP WHERE MST.LABEL = MAP.kpi_key_from AND MAP.kpi_key_to = 'Efisiensi' AND MAP.type = 'MATRIX_ROW_SUMMARY') AS Efisiensi
                , (SELECT POINT FROM kpi_point_summary sum WHERE sum.TYPE = 'MATRIX_ROW_SUMMARY' AND sum.KEY = mst.LABEL) Jumlah
            FROM mst_kpi_index MST";

        $user = DB::select(str_replace("\n", "", $sql), []);

        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function kpiCosistencyRatio()
    {
        $sql = "
            SELECT LABEL
                , Jumlah
                , Prioritas
                , SUBSTRING(Hasil, 1, 6) Hasil
            FROM (
                SELECT A.LABEL
                , A.Jumlah
                , A.Prioritas
                , ROUND(Jumlah + Prioritas, 3) Hasil
            FROM
            (
                SELECT MST.LABEL
                    , (SELECT POINT FROM kpi_point_summary sum WHERE sum.TYPE = 'MATRIX_ROW_SUMMARY' AND sum.KEY = mst.LABEL) Jumlah
                    , ROUND((SELECT POINT FROM kpi_point_summary sum WHERE sum.TYPE = 'MATRIX_NORMALIZATION' AND sum.KEY = mst.LABEL) / 6, 3) Prioritas
                    FROM mst_kpi_index MST
                ) A
                UNION ALL
                SELECT '' LABEL
                    , '' Jumlah
                    , '' Prioritas
                    , ROUND(SUM(A.hasil), 3) Hasil
                FROM (
                    SELECT ROUND(JUmlah + Prioritas, 3) Hasil
                    FROM
                    (
                        SELECT MST.LABEL
                        , (SELECT POINT FROM kpi_point_summary sum WHERE sum.TYPE = 'MATRIX_ROW_SUMMARY' AND sum.KEY = mst.LABEL) Jumlah
                        , ROUND((SELECT POINT FROM kpi_point_summary sum WHERE sum.TYPE = 'MATRIX_NORMALIZATION' AND sum.KEY = mst.LABEL) / 6, 3) Prioritas
                        FROM mst_kpi_index MST
                    ) A
                ) A
            ) MAIN
        ";

        $user = DB::select(str_replace("\n", "", $sql), []);

        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getRank($period)
    {
        $strSql = "
            SELECT  @ROW_NUM:=@ROW_NUM+1 AS rank
                , MAIN.*
            FROM (
                SELECT p.id
                    , u.name
                    , u.jabatan
                    , p.tanggal
                    , n.nilai_akhir
                FROM users U
                    LEFT join penilaian P
                        ON u.id = p.id_user
                    LEFT join nilai_akhir n
                        ON p.id = n.penilaian_id
                WHERE p.tanggal = ?
                    AND p.approve_yn = 'Y'
                ORDER BY n.nilai_akhir desc
            ) MAIN";

        DB::statement(DB::raw('set @ROW_NUM := 0'));
        $user = DB::select(str_replace("\n", "", $strSql), [$period]);


        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function assessmentsApproval($period, Request $request)
    {
        $strSql = "
            SELECT *
            FROM (
                SELECT '1' sort,
                    penilaian.id,
                    users.name,
                    penilaian.id as penilaian_id,
                    penilaian.karakter,
                    penilaian.absensi,
                    penilaian.teamwork,
                    penilaian.pencapaian,
                    penilaian.loyalitas,
                    penilaian.efisiensi,
                    penilaian.nilai_akhir,
                    penilaian.catatan,
                    penilaian.approve_yn,
                    penilaian.tanggal
                FROM users
                    , penilaian
                WHERE users.id = penilaian.id_user
                    AND penilaian.tampilkan_hasil = 'Y'
                    AND penilaian.id_user like ?
                    AND penilaian.tanggal = ?
                UNION ALL
                SELECT '2' sort,
                    penilaian.penilaian_id id,
                    users.name,
                    penilaian.penilaian_id,
                    penilaian.karakter,
                    penilaian.absensi,
                    penilaian.teamwork,
                    penilaian.pencapaian,
                    penilaian.loyalitas,
                    penilaian.efisiensi,
                    penilaian.nilai_akhir,
                    '' catatan,
                    '' approve_yn,
                    '' tanggal
                FROM users
                    , nilai_akhir penilaian
                    , penilaian nilai
                WHERE users.id = penilaian.id_user
                    AND penilaian.penilaian_id = nilai.id
                    AND nilai.tampilkan_hasil = 'Y'
                    AND penilaian.id_user like ?
                    AND nilai.tanggal = ?
            ) A
            ORDER BY name, penilaian_id, sort
        ";

        $user = DB::select(str_replace("\n", "", $strSql), [$request->id.'%', $period, $request->id.'%', $period]);

        return response()->json($user);
    }

    /**
     * Show assessment to user Y/N
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function showAssessmentYn($id, Request $request)
    {
        $assessment = Assesment::where('id', $id)->firstOrFail();

        $assessment->tampilkan_hasil = $request->showYn;
        $assessment->save();

        return response()->json([
            'status' => true,
            'message' => $request->showYn === 'Y' ? 'Penilaian berhasil ditampilkan.' : 'Penilaian berhasil disembunyikan.',
            'data' => $assessment
        ]);
    }

    /**
     * Approve assessment to user Y/N
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function approveAssessmentsYn($id, Request $request)
    {
        $assessment = Assesment::where('id', $id)->firstOrFail();

        $assessment->approve_yn = $request->approveYn;
        $assessment->save();

        return response()->json([
            'status' => true,
            'message' => $request->approveYn === 'Y' ? 'Penilaian berhasil disetujui.' : 'Penilaian berhasil ditolak.',
            'data' => $assessment
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @return \Illuminate\Http\Response
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteAssessment($id)
    {
        DB::delete("DELETE FROM PENILAIAN WHERE ID = ? ", [$id]);

        return response()->json([
            'status' => true,
            'message' => "Penilaian berhasil di hapus",
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function edit(Request $request)
    {
        DB::table('penilaian')
            ->updateOrInsert(
                [
                    'id' => $request->penilaian_id,
                ],
                [
                    'tanggal' => $request->period,
                    'id_user' => $request->user_id,
                    'karakter' => $request->karakter,
                    'absensi' => $request->absensi,
                    'teamwork' => $request->teamwork,
                    'pencapaian' => $request->pencapaian,
                    'loyalitas' => $request->loyalitas,
                    'efisiensi' => $request->efisiensi,
                    'nilai_akhir' => null,
                    'catatan' => $request->catatan,
                    'tampilkan_hasil' => 'N',
                    'approve_yn' => 'N'
                ]
            );

        $penilaian = DB::select('select * from penilaian where tanggal = ? and id_user = ?', [$request->period, $request->user_id]);
        $prioritasSql = "
                SELECT MAX(case when POINT.label = 'Karakter' then POINT.Prioritas END) Karakter
                    , MAX(case when POINT.label = 'Absensi' then POINT.Prioritas END) Absensi
                    , MAX(case when POINT.label = 'Teamwork' then POINT.Prioritas END) Teamwork
                    , MAX(case when POINT.label = 'Pencapaian' then POINT.Prioritas END) Pencapaian
                    , MAX(case when POINT.label = 'Loyalitas' then POINT.Prioritas END) Loyalitas
                    , MAX(case when POINT.label = 'Efisiensi' then POINT.Prioritas END) Efisiensi
                FROM
                (SELECT 'Prioritas' join_key FROM DUAL) label
                LEFT JOIN (
                    SELECT 'Prioritas' join_key
                    , MST.LABEL
                    , ROUND((SELECT POINT FROM kpi_point_summary sum WHERE sum.TYPE = 'MATRIX_NORMALIZATION' AND sum.KEY = mst.LABEL) / 6, 3) Prioritas
                FROM mst_kpi_index MST
                ) POINT
                ON label.join_key = POINT.join_key";

        $prioritas = DB::select(str_replace("\n", "", $prioritasSql), []);

        $naKarakter = $penilaian[0]->karakter * $prioritas[0]->Karakter;
        $naAbsensi = $penilaian[0]->absensi * $prioritas[0]->Absensi;
        $naTeamwork = $penilaian[0]->teamwork * $prioritas[0]->Teamwork;
        $naPencapaian = $penilaian[0]->pencapaian * $prioritas[0]->Pencapaian;
        $naLoyalitas = $penilaian[0]->loyalitas * $prioritas[0]->Loyalitas;
        $naEfisiensi = $penilaian[0]->efisiensi * $prioritas[0]->Efisiensi;
        $nilaiAKhir = $naKarakter + $naAbsensi + $naTeamwork + $naPencapaian + $naLoyalitas + $naEfisiensi;

        DB::table('nilai_akhir')
            ->updateOrInsert(
                [
                    'penilaian_id' => $penilaian[0]->id,
                ],
                [
                    'id_user' => $penilaian[0]->id_user,
                    'karakter' => $naKarakter,
                    'absensi' => $naAbsensi,
                    'teamwork' => $naTeamwork,
                    'pencapaian' => $naPencapaian,
                    'loyalitas' => $naLoyalitas,
                    'efisiensi' => $naEfisiensi,
                    'nilai_akhir' => $nilaiAKhir
                ]
            );

        return response()->json([
            'status' => true,
            'message' => "Penilaian berhasil disimpan",
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function bulkShowYn(Request $request)
    {
        DB::table('penilaian')->whereIn('id', $request->ids)
            ->lazyById()->each(function ($assessment) {
                DB::table('penilaian')
                    ->where('id', $assessment->id)
                    ->update(['tampilkan_hasil' => $assessment->tampilkan_hasil === 'Y' ? 'N' : 'Y']);
            });

        return response()->json([
            'status' => true, 'message' => 'Penilaian berhasil diperbaharui.'
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function bulkApprove(Request $request)
    {
        DB::table('penilaian')->whereIn('id', $request->ids)
            ->lazyById()->each(function ($assessment) {
                DB::table('penilaian')
                    ->where('id', $assessment->id)
                    ->update(['approve_yn' => $assessment->approve_yn === 'Y' ? 'N' : 'Y']);
            });

        return response()->json([
            'status' => true, 'message' => 'Penilaian berhasil diperbaharui.'
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Assesment  $assesment
     * @return \Illuminate\Http\Response
     */
    public function destroy(Assesment $assesment)
    {
        //
    }
}
