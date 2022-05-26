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
                'id' => Carbon::now()->format('YmdHms'),
                'name' => 'Default Owner',
                'email' => 'owner@email.com',
                'password' => Hash::make('owner'),
                'aktif_yn' => 'Y',
                'role' => 'Owner',
                'jabatan' => 'Owner',
            ]
        ];

        DB::table('users')->insert($users);
    }
}
