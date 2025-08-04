<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

/**
 * App\Models\Member
 *
 * @property int $id
 * @property string $member_id
 * @property string $full_name
 * @property string $employee_id
 * @property string $company_name
 * @property string $department
 * @property string $phone_number
 * @property string $email
 * @property \Illuminate\Support\Carbon $membership_start_date
 * @property \Illuminate\Support\Carbon|null $membership_end_date
 * @property string $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User|null $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Member newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Member newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Member query()
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereCompanyName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereDepartment($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereEmployeeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereMembershipEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereMembershipStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member active()
 * @method static \Database\Factories\MemberFactory factory($count = null, $state = [])
 * @method static Member create(array $attributes = [])
 * @method static Member firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Member extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'member_id',
        'full_name',
        'employee_id',
        'company_name',
        'department',
        'phone_number',
        'email',
        'membership_start_date',
        'membership_end_date',
        'status',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'membership_start_date' => 'date',
        'membership_end_date' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'members';

    /**
     * Boot the model.
     */
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($member) {
            if (empty($member->member_id)) {
                $member->member_id = self::generateMemberId();
            }
        });
    }

    /**
     * Generate a unique member ID.
     *
     * @return string
     */
    public static function generateMemberId(): string
    {
        $year = date('Y');
        $prefix = 'SP' . $year;
        
        $lastMember = self::where('member_id', 'like', $prefix . '%')
            ->orderBy('member_id', 'desc')
            ->first();
        
        if ($lastMember) {
            $lastNumber = (int) substr($lastMember->member_id, -4);
            $nextNumber = $lastNumber + 1;
        } else {
            $nextNumber = 1;
        }
        
        return $prefix . str_pad((string) $nextNumber, 4, '0', STR_PAD_LEFT);
    }

    /**
     * Scope a query to only include active members.
     *
     * @param  \Illuminate\Database\Eloquent\Builder  $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Get the user associated with this member.
     */
    public function user(): HasOne
    {
        return $this->hasOne(User::class);
    }
}