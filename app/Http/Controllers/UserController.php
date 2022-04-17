<?php

namespace App\Http\Controllers;

use App\Helper\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $response = (new UserService($request->email, $request->password, $request->name))
            ->register($request->deviceName);

        return response()->json($response);
    }

    public function login(Request $request)
    {
        $response = (new UserService($request->email, $request->password))
            ->login($request->deviceName);

        return response()->json($response);
    }

    public function getEmployee() {
        return response()->json(User::orderByDesc('updated_at')->get());
    }

    public function create(Request $request) {
        $response = (
            new UserService(
                $request->email,
                $request->password,
                $request->name,
                $request->jabatan,
                $request->no_telp
            )
        )
        ->create($request->deviceName);

        return response()->json($response);
    }

    public function delete(Request $request) {
        $user = User::whereIn('id', $request->ids)->where('id', '!=' , $request->user()->id)->delete();

        return response()->json(['status' => true, 'messages' => $user.= ' Data Berhasil di Hapus...']);
    }

    public function update(Request $request, $id) {
        $user = User::where('id', $request->id)
            ->update([
                'name' => $request->name,
                'jabatan' => $request->jabatan,
                'no_telp' => $request->no_telp,
                'email' => $request->email
            ]);

        return response()->json(['status' => true, 'user' => $user]);
    }

    /**
     * Get user assessments per month.
     *
     * @return \Illuminate\Http\Response\JSON
     */
    public function getAssessments($period)
    {
        $user = DB::table('users')
            ->leftJoin('penilaian', 'users.id', '=', 'penilaian.id_user')
            ->select(
                'users.id',
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
}
