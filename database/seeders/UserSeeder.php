<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $users = [
            [
                'id' => 1,
                'name' => 'Default Owner',
                'email' => 'owner@email.com',
                'password' => Hash::make('owner'),
                'aktif_yn' => 'Y',
                'role' => 'Owner',
                'jabatan' => 'Owner',
            ],
            [
                'id' => Carbon::now()->format('ymdu'),
                'name' => 'Ratih Kusuma',
                'email' => 'ratihkusuma123@gmail.com',
                'password' => Hash::make('000000'),
                'aktif_yn' => 'Y',
                'role' => 'Leader',
                'jabatan' => 'Manager Operasional',
            ],
            [
                'id' => Carbon::now()->format('ymdu'),
                'name' => 'Raihan Anugrah',
                'email' => 'raihananugrah123@gmail.com',
                'password' => Hash::make('000000'),
                'aktif_yn' => 'Y',
                'role' => 'Karyawan',
                'jabatan' => 'Staff',
            ],
            [
                'id' => Carbon::now()->format('ymdu'),
                'name' => 'Byun Baekhyun',
                'email' => 'byunbakehyun@email.com',
                'password' => Hash::make('000000'),
                'aktif_yn' => 'Y',
                'role' => 'Karyawan',
                'jabatan' => 'Staff',
            ],
            [
                'id' => Carbon::now()->format('ymdu'),
                'name' => 'Shaquela Andini',
                'email' => 'shaquela123@email.com',
                'password' => Hash::make('000000'),
                'aktif_yn' => 'Y',
                'role' => 'Karyawan',
                'jabatan' => 'Staff',
            ],
            [
                'id' => Carbon::now()->format('ymdu'),
                'name' => 'Risa Permata',
                'email' => 'risapermata123@email.com',
                'password' => Hash::make('000000'),
                'aktif_yn' => 'Y',
                'role' => 'Karyawan',
                'jabatan' => 'Staff',
            ],
        ];

        DB::table('users')->insert($users);
    }
}
