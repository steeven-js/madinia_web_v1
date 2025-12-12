<?php

declare(strict_types=1);

namespace App\Console\Commands;

use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class CreateAdminUser extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'admin:create {--email=} {--password=} {--name=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Créer un utilisateur administrateur pour accéder à Filament';

    /**
     * Execute the console command.
     */
    public function handle(): int
    {
        $this->info('🔧 Création d\'un utilisateur administrateur...');
        $this->newLine();

        $email = $this->option('email') ?? $this->ask('Email', 'admin@example.com');
        $name = $this->option('name') ?? $this->ask('Nom', 'Administrateur');
        $password = $this->option('password') ?? $this->secret('Mot de passe (min. 8 caractères)');

        if (strlen($password) < 8) {
            $this->error('❌ Le mot de passe doit contenir au moins 8 caractères.');

            return self::FAILURE;
        }

        if (User::where('email', $email)->exists()) {
            $this->error('❌ Un utilisateur avec cet email existe déjà.');

            return self::FAILURE;
        }

        $user = User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
        ]);

        $this->newLine();
        $this->info('✅ Utilisateur créé avec succès !');
        $this->newLine();
        $this->table(
            ['Champ', 'Valeur'],
            [
                ['ID', $user->id],
                ['Nom', $user->name],
                ['Email', $user->email],
            ]
        );
        $this->newLine();
        $this->info('🎉 Vous pouvez maintenant vous connecter à /admin');

        return self::SUCCESS;
    }
}
