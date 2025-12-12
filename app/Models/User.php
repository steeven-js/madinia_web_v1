<?php

declare(strict_types=1);

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Filament\Auth\MultiFactor\Email\Contracts\HasEmailAuthentication;
use Filament\Models\Contracts\FilamentUser;
use Filament\Panel;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable implements FilamentUser, HasEmailAuthentication, MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'has_email_authentication',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'has_email_authentication' => 'boolean',
        ];
    }

    public function canAccessPanel(Panel $panel): bool
    {
        return str_ends_with($this->email, '@madinia.fr');
        // return str_ends_with($this->email, '@madinia.fr') && $this->hasVerifiedEmail();
    }

    public function hasEmailAuthentication(): bool
    {
        // This method should return true if the user has enabled email authentication.
        return (bool) ($this->has_email_authentication ?? false);
    }

    public function toggleEmailAuthentication(bool $condition): void
    {
        // This method should save whether or not the user has enabled email authentication.
        $this->has_email_authentication = $condition;
        $this->save();
    }
}
