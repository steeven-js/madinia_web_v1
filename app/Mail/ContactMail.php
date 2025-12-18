<?php

declare(strict_types=1);

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class ContactMail extends Mailable
{
    use Queueable, SerializesModels;

    public $contactData;

    public $isConfirmation;

    /**
     * Create a new message instance.
     */
    public function __construct(array $contactData, bool $isConfirmation = false)
    {
        $this->contactData = $contactData;
        $this->isConfirmation = $isConfirmation;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        if ($this->isConfirmation) {
            // Email envoyé au client → From = adresse officielle
            return new Envelope(
                from: new Address('contact@madinia.fr', 'Madin.IA'),
                subject: 'Confirmation de réception de votre message - Madin.IA',
                replyTo: [new Address('contact@madinia.fr', 'Madin.IA')]
            );
        }

        // Email envoyé à l'admin → From = adresse officielle, Reply-To = email du contact
        return new Envelope(
            from: new Address('contact@madinia.fr', 'Madin.IA - Contact'),
            subject: 'Nouveau message de contact - '.$this->contactData['subject'],
            replyTo: [new Address($this->contactData['email'], $this->contactData['firstName'].' '.$this->contactData['lastName'])]
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.contact',
            with: [
                'contactData' => $this->contactData,
                'isConfirmation' => $this->isConfirmation,
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
