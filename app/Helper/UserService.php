<?php

namespace App\Helper;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;

class UserService {

    public $email, $password;

    public function __construct($email, $password, $name = '')
    {
        $this->email = $email;
        $this->password = $password;
        $this->name = $name;
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
                'email' => ['required', 'email:rfc,dns', Rule::when($email, ['unique:users'])],
                'password' => [Rule::when($email,['required', 'string', Password::min(8)])],
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
                'email' => $this->email,
                'password' => Hash::make($this->password),
                'name' => $this->name
            ]
        );

        $token = $user->createToken($this->email)->plainTextToken;

        return ['status' => true, 'token' => $token, 'user' => $user];
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
}
