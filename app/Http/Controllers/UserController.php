<?php

namespace App\Http\Controllers;

use App\Helper\UserService;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function register(Request $request)
    {
        $response = (new UserService($request->email, $request->password, $request->name, 'N', 'Karyawan'))
            ->register($request->deviceName);

        return response()->json($response);
    }

    public function login(Request $request)
    {
        $response = (new UserService($request->email, $request->password, '', '', ''))
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
                'Y',
                $request->role,
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
                'email' => $request->email,
                'role' => $request->role,
            ]);

        return response()->json(['status' => true, 'user' => $user]);
    }

    /**
     * Get employee avatar
     *
     * @return \Illuminate\http\JsonResponse
     */
    public function getAva()
    {
        return asset('images/profile.jpg');
    }

    /**
     * Get Employee detail
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function getDetailEmployee($id)
    {
        $user = User::where('id', $id)->firstOrFail();

        return response()->json($user);
    }

    /**
     * Reset employee password
     *
     * @param  Request $request
     * @param  string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function changePassword(Request $request, $id)
    {
        $user = User::where('id', $id)->firstOrFail();

        if (!Hash::check($request->oldPassword, optional($user)->password)) {
            return [
                'status' => false,
                'messages' => 'Password lama tidak sesuai!'
            ];
        }

        $user->password = Hash::make($request->newPassword);
        $user->save();

        return [
            'status' => true,
            'messages' => 'Password berhasil di Perbarui.'
        ];
    }

    /**
     * Change user status
     *
     * @param  Request $request
     * @param  string $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function changeActiveYn($id)
    {
        $user = User::where('id', $id)->firstOrFail();

        $user->aktif_yn = $user->aktif_yn === 'Y' ? 'N' : 'Y';
        $user->save();

        return [
            'status' => true,
            'messages' => 'Status user berhasil diperbaharui.'
        ];
    }

    /**
     * Get total employee
     *
     * @param  Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getTotalEmployee()
    {
        $user = DB::select('SELECT COUNT(*) AS TOTAL_EMPLOYEE FROM USERS WHERE AKTIF_YN = ?', ['Y']);

        return response()->json($user);
    }

    /**
     * Find Users
     *
     * @param  Request $request
     * @param  string $key
     * @return \Illuminate\Http\JsonResponse
     */
    public function findUser($key)
    {
        $user = DB::select("SELECT ID, NAME, JABATAN FROM USERS WHERE ID NOT IN (1) AND NAME LIKE ?", ['%'.$key.'%']);

        return response()->json($user);
    }
}
