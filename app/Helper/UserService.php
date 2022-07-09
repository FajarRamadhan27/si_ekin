<?php

namespace App\Helper;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserService {

    public $email, $password, $name, $jabatan, $no_telp;

    public function __construct($email, $password, $name, $aktif_yn, $role, $jabatan='', $no_telp='')
    {
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
        $this->jabatan = $jabatan;
        $this->no_telp = $no_telp;
        $this->aktif_yn = $aktif_yn;
        $this->role = $role;
    }

    public function validateInput($email=true, $name=true)
    {
        $validator = Validator::make(
            [
                'email' => $this->email,
                'password' => $this->password,
                'name' => $this->name
            ],
            [
                'email' => ['required', 'email', Rule::when($email, ['unique:users'])],
                'password' => [Rule::when($email,['required', 'string', Password::min(6)])],
                'name' => [Rule::when($name, ['required', 'string'])]
            ]
        );

        if ($validator->fails()) {
            return ['status' => false, 'messages' => $validator->getMessageBag()];
        }

        return ['status' => true ];
    }

    public function register()
    {
        $validate = $this->validateInput();

        if ($validate['status'] === false) return $validate;

        $user = User::create(
            [
                'id' => Carbon::now()->format('YmdHms'),
                'email' => $this->email,
                'password' => Hash::make($this->password),
                'name' => $this->name,
                'aktif_yn' => $this->aktif_yn,
                'role' => 'Karyawan'
            ]
        );

        $token = $user->createToken($this->email)->plainTextToken;

        return ['status' => true, 'token' => $token, 'user' => $user, 'messages' => []];
    }

    public function login()
    {
        $validate = $this->validateInput(false, false);

        if ($validate['status'] === false) return $validate;

        $user = User::where('email', $this->email)->first();

        if(!Hash::check($this->password, optional($user)->password)) {
            return ['status' => false, 'messages' => 'Incorrect email or password!'];
        }

        $token = $user->createToken($user->email)->plainTextToken;
        return ['status' => true, 'token' => $token, 'user' => $user];
    }

    public function create() {
        $validator = Validator::make(
            [
                'email' => $this->email,
                'name' => $this->name,
                'jabatan' => $this->jabatan,
                'no_telp' => $this->no_telp
            ],
            [
                'email' => ['required', 'email', 'unique:users'],
                'name' => ['required'],
                'jabatan' => ['required'],
                'no_telp' => ['required'],
            ]
        );

        if ($validator->fails()) {
            return ['status' => false, 'messages' => $validator->getMessageBag()];
        }

        $user = User::create(
            [
                'id' => Carbon::now()->format('ymdu'),
                'email' => $this->email,
                'password' => Hash::make('12345678'),
                'name' => $this->name,
                'jabatan' => $this->jabatan,
                'no_telp' => $this->no_telp
            ]
        );

        return ['status' => true, 'user' => $user];
    }
}
