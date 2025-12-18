# Configuration du formulaire de contact

## Configuration Email (.env)

Ajoutez ces variables dans votre fichier `.env` :

```env
# Configuration email pour le formulaire de contact
MAIL_MAILER=smtp
MAIL_HOST=sandbox.smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USERNAME=your_mailtrap_username
MAIL_PASSWORD=your_mailtrap_password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=contact@madinia.fr
MAIL_FROM_NAME="${APP_NAME}"

# Email de l'administrateur (reçoit les messages de contact)
MAIL_ADMIN_EMAIL=contact@madinia.fr
```

## Production

En production, remplacez Mailtrap par votre service SMTP réel (Gmail, SendGrid, Mailgun, etc.)

Exemple avec Gmail :
```env
MAIL_MAILER=smtp
MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=contact@madinia.fr
MAIL_FROM_NAME="${APP_NAME}"
MAIL_ADMIN_EMAIL=contact@madinia.fr
```

## Test

Pour tester le formulaire :
1. Accédez à `/contact`
2. Remplissez le formulaire
3. Vérifiez vos emails sur Mailtrap (en dev) ou votre boîte email (en prod)

## Fichiers créés

### Backend (Laravel)
- `app/Http/Controllers/ContactController.php` - Controller pour gérer le formulaire
- `app/Http/Requests/ContactRequest.php` - Validation des données
- `app/Mail/ContactMail.php` - Classe Mailable pour les emails
- `resources/views/emails/contact.blade.php` - Template email

### Frontend (React)
- `resources/js/pages/contact.tsx` - Page de contact
- `resources/js/sections/_contact/contact-form.tsx` - Formulaire
- `resources/js/sections/_contact/contact-info.tsx` - Informations de contact
- `resources/js/hooks/use-contact-form.ts` - Hook pour gérer la soumission

### Routes
```php
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
```
