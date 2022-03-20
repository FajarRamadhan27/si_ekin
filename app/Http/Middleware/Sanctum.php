<?php

namespace App\Http\Middleware;

use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Laravel\Sanctum\PersonalAccessToken;

class Sanctum
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $bearer = $request->bearerToken();

        if ($token = PersonalAccessToken::findToken($bearer))
        {
            if ($user = User::find($token->tokenable_id))
            {
                Auth::login($user);
                return $next($request);
            }
        }

        return response()->json([
            'success' => false,
            'error' => 'Access denied.',
        ]);
    }
}
