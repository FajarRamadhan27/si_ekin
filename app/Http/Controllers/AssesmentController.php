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
            'message' => $request->showYn === 1 ? 'Penilaian berhasil ditampilkan.' : 'Penilaian berhasil disembunyikan.',
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
