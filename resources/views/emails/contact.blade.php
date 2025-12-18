@component('mail::message')

@if($isConfirmation)
# Merci pour votre message !

Bonjour {{ $contactData['firstName'] }} {{ $contactData['lastName'] }},

Nous avons bien reçu votre message concernant "{{ $contactData['subject'] }}".

Notre équipe vous répondra dans les plus brefs délais.

**Récapitulatif de votre message :**
- **Nom :** {{ $contactData['firstName'] }} {{ $contactData['lastName'] }}
- **Email :** {{ $contactData['email'] }}
@if(isset($contactData['phone']) && $contactData['phone'])
- **Téléphone :** {{ $contactData['phone'] }}
@endif
@if(isset($contactData['company']) && $contactData['company'])
- **Entreprise :** {{ $contactData['company'] }}
@endif
- **Sujet :** {{ $contactData['subject'] }}

**Votre message :**
{{ $contactData['message'] }}

@component('mail::button', ['url' => config('app.url')])
Visiter notre site
@endcomponent

@else
# Nouveau message de contact

Vous avez reçu un nouveau message de contact :

**Informations du contact :**
- **Nom :** {{ $contactData['firstName'] }} {{ $contactData['lastName'] }}
- **Email :** {{ $contactData['email'] }}
@if(isset($contactData['phone']) && $contactData['phone'])
- **Téléphone :** {{ $contactData['phone'] }}
@endif
@if(isset($contactData['company']) && $contactData['company'])
- **Entreprise :** {{ $contactData['company'] }}
@endif
- **Sujet :** {{ $contactData['subject'] }}

**Message :**
{{ $contactData['message'] }}

@component('mail::button', ['url' => 'mailto:' . $contactData['email']])
Répondre directement
@endcomponent

@endif

Cordialement,<br>
{{ config('app.name') }}
@endcomponent
