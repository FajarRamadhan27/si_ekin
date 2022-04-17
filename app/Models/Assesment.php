<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


/**
 * Assessment Model.
 */
class Assesment extends Model
{
    use HasFactory;

    /**
     * The table associated with  the model.
     *
     * @var String
     */
    protected $table = 'penilaian';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id','tanggal', 'id_user', 'karakter', 'absensi', 'teamwork', 'pencapaian', 'loyalitas', 'efisiensi', 'nilai_akhir', 'catatan', 'tampilkan_hasil'
    ];

    /**
     * Each Assessment belongs to one user.
     *
     * @return User
     */
    public function user()
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
