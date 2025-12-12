<?php

declare(strict_types=1);

namespace App\Mail;

use App\Models\PreinscriptionFormation;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class SessionPlanifieeMail extends Mailable
{
    use Queueable, SerializesModels;

    public PreinscriptionFormation $preinscription;

    /**
     * Create a new message instance.
     */
    public function __construct(PreinscriptionFormation $preinscription)
    {
        $this->preinscription = $preinscription;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            from: new Address('contact@madinia.fr', 'Madin.IA - Formations'),
            subject: '🎉 Session planifiée pour '.$this->preinscription->formation->title,
            replyTo: [new Address('contact@madinia.fr', 'Madin.IA')]
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.session-planifiee',
            with: [
                'preinscription' => $this->preinscription,
            ]
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
