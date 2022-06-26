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
    public function index($period)
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
                'penilaian.tampilkan_hasil',
                'penilaian.tanggal'
            )
            ->where('penilaian.tanggal', '=', $period)
            ->orderBy('users.name')
            ->get();

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
    public function getRank($period)
    {
        $user = DB::table('users')
            ->leftJoin('penilaian', 'users.id', '=', 'penilaian.id_user')
            ->select(
                'penilaian.id',
                'users.name',
                'users.jabatan',
                'penilaian.tanggal',
                'penilaian.nilai_akhir'
            )
            ->where('penilaian.approve_yn', '=', 'Y')
            ->where('penilaian.tanggal', '=', $period)
            ->orderBy('penilaian.nilai_akhir', 'desc')
            ->get();

        return response()->json($user);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function assessmentsApproval($period)
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
                'penilaian.tanggal'
            )
            ->where('penilaian.tanggal', '=', $period)
            ->where('penilaian.tampilkan_hasil', '=', 'Y')
            ->orderBy('users.name')
            ->get();

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
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Assesment  $assesment
     * @return \Illuminate\Http\Response
     */
    public function show(Assesment $assesment)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Assesment  $assesment
     * @return \Illuminate\Http\Response
     */
    public function edit(Assesment $assesment)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Assesment  $assesment
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Assesment $assesment)
    {
        //
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
