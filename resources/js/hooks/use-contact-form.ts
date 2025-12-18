import type { UseFormReturn } from 'react-hook-form';

import { toast } from 'sonner';
import { useState } from 'react';
import { router } from '@inertiajs/react';

// Type pour les données du formulaire de contact
interface ContactFormData {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  phone?: string;
  services: string[];
  budget: number[];
  message: string;
}

// Type pour les méthodes du formulaire
interface ContactFormMethods extends UseFormReturn<ContactFormData> {
  reset: () => void;
}

/**
 * Hook personnalisé pour gérer le formulaire de contact
 * Gère la soumission des données et l'envoi d'email via API Laravel
 *
 * @param methods - Méthodes de gestion du formulaire (react-hook-form)
 * @returns Objet contenant l'état de soumission, l'erreur et la fonction de soumission
 */
export function useContactForm(methods: ContactFormMethods) {
  // États pour gérer la soumission et les erreurs
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Gère la soumission du formulaire de contact
   * - Envoie les données vers le controller Laravel
   * - Gère les retours utilisateur (succès/erreur)
   *
   * @param data - Données du formulaire
   */
  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Transformation des données pour correspondre au format attendu par Laravel
      const formData = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone || '',
        company: data.company || '',
        subject: `Demande de contact - ${data.services.join(', ')}`,
        message: `Services demandés: ${data.services.join(', ')}\n\nBudget: ${data.budget[0]}€ - ${data.budget[1]}€\n\nMessage:\n${data.message}`,
      };

      // Envoi des données via Inertia.js
      router.post('/contact', formData, {
        preserveScroll: true,
        onSuccess: (page) => {
          toast.success(
            'Votre message a été envoyé avec succès ! Nous vous répondrons dans les plus brefs délais.'
          );
          methods.reset();
        },
        onError: (errors) => {
          console.error('❌ Error in contact form submission:', errors);

          // Gestion des erreurs de validation
          if (
            errors.firstName ||
            errors.lastName ||
            errors.email ||
            errors.services ||
            errors.budget ||
            errors.message
          ) {
            const errorMessage = 'Veuillez corriger les erreurs dans le formulaire';
            toast.error(errorMessage);
            setError(errorMessage);
          } else {
            const errorMessage = "Une erreur est survenue lors de l'envoi de votre message";
            toast.error(errorMessage);
            setError(errorMessage);
          }
        },
        onFinish: () => {
          setIsSubmitting(false);
        },
      });
    } catch (err) {
      // Erreur : notification et stockage du message d'erreur
      console.error('❌ Error in contact form submission:', err);

      const errorMessage = "Une erreur est survenue lors de l'envoi de votre message";

      toast.error(errorMessage);
      setError(errorMessage);
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    error,
    onSubmit,
  };
}
