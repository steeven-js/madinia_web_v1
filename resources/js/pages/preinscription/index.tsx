import type { FormEvent } from 'react';

import { useState, useEffect } from 'react';
import { Head, useForm, usePage, router } from '@inertiajs/react';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { CONFIG } from '@/global-config';
import { MainLayout } from '@/layouts/main';

import { toast } from '@/components/snackbar';

// Types
interface Formation {
    id: number;
    title: string;
    duration: string;
    category: string;
    level: string;
}

interface Option {
    value: string;
    label: string;
}

interface PageProps {
    formations: Formation[];
    moyensFinancement: Option[];
    formatsFormation: Option[];
    flash?: {
        success?: string;
        error?: string;
    };
    [key: string]: any;
}

// Icônes du processus
const ProcessStep = ({ icon, text }: { icon: string; text: string }) => (
    <Box sx={{ textAlign: 'center', flex: 1 }}>
        <Typography variant="h3" sx={{ mb: 1 }}>
            {icon}
        </Typography>
        <Typography
            variant="body2"
            sx={{
                color: 'text.primary',
                opacity: 0.8,
            }}
        >
            {text}
        </Typography>
    </Box>
);

export default function PreinscriptionPage() {
    const theme = useTheme();
    const { formations, moyensFinancement, formatsFormation, flash } = usePage<PageProps>().props;
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Récupérer l'ID de formation depuis les query params si présent
    const getFormationIdFromUrl = () => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            const formationId = params.get('formation_id');
            return formationId || '';
        }
        return '';
    };

    const { data, setData, post, processing, errors, reset } = useForm({
        nom: '',
        prenom: '',
        email: '',
        telephone: '',
        formation_id: getFormationIdFromUrl(),
        moyen_financement: '',
        format_preference: '',
        commentaires: '',
    });

    // Pré-remplir la formation si elle est passée en paramètre URL
    useEffect(() => {
        const formationIdFromUrl = getFormationIdFromUrl();
        if (formationIdFromUrl && data.formation_id !== formationIdFromUrl) {
            setData('formation_id', formationIdFromUrl);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Afficher un toast de succès si le message flash existe
    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success);
        }
    }, [flash?.success]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        post('/formations/preinscription', {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setIsSubmitting(false);
                const successMessage =
                    'Merci pour votre inscription ! Nous vous contacterons dès que la prochaine session sera ouverte. ' +
                    'Vous recevrez également une confirmation par e-mail.';
                toast.success(successMessage);
            },
            onError: (errors) => {
                setIsSubmitting(false);
                if ((errors as any).preinscription) {
                    toast.error((errors as any).preinscription);
                } else if (errors && Object.keys(errors).length > 0) {
                    const errorMessages = Object.values(errors).flat().filter(Boolean);
                    if (errorMessages.length > 0) {
                        toast.error((errorMessages[0] as string) || 'Veuillez corriger les erreurs dans le formulaire');
                    }
                } else {
                    toast.error('Une erreur est survenue lors de l\'enregistrement de votre pré-inscription. Veuillez réessayer.');
                }
            },
        });
    };

    const metadata = {
        title: `Pré-inscription aux formations - ${CONFIG.appName}`,
        description:
            'Inscrivez-vous à la prochaine session de formation. Soyez notifié dès que le groupe est complet.',
    };

    return (
        <MainLayout
            slotProps={{
                header: {
                    sx: { position: { md: 'fixed' } },
                },
            }}
        >
            <Head title={metadata.title}>
                <meta name="description" content={metadata.description} />
            </Head>

            {/* Section d'en-tête */}
            <Box
                sx={{
                    pt: { xs: 12, md: 15 },
                    pb: { xs: 4, md: 6 },
                }}
            >
                <Container>
                    <Stack spacing={2} alignItems="center" textAlign="center" sx={{ mb: 4 }}>
                        <Typography
                            variant="h2"
                            component="h1"
                            sx={{
                                fontWeight: 700,
                                background: (theme) =>
                                    `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.dark})`,
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            Rejoignez la prochaine session de formation
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                color: 'text.primary',
                                maxWidth: 700,
                                lineHeight: 1.6,
                                opacity: 0.9,
                            }}
                        >
                            Inscrivez-vous dès maintenant et soyez prévenu(e) dès que la prochaine
                            session est ouverte.
                        </Typography>
                    </Stack>

                    {/* Processus d'inscription */}
                    <Box
                        sx={{
                            display: 'flex',
                            gap: 2,
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            mt: 4,
                        }}
                    >
                        <ProcessStep icon="🧍‍♀️" text="Vous vous inscrivez" />
                        <Typography
                            variant="h4"
                            sx={{
                                alignSelf: 'center',
                                color: 'text.secondary',
                                opacity: 0.6,
                            }}
                        >
                            →
                        </Typography>
                        <ProcessStep icon="👥" text="Groupe se constitue" />
                        <Typography
                            variant="h4"
                            sx={{
                                alignSelf: 'center',
                                color: 'text.secondary',
                                opacity: 0.6,
                            }}
                        >
                            →
                        </Typography>
                        <ProcessStep icon="📅" text="Date proposée" />
                        <Typography
                            variant="h4"
                            sx={{
                                alignSelf: 'center',
                                color: 'text.secondary',
                                opacity: 0.6,
                            }}
                        >
                            →
                        </Typography>
                        <ProcessStep icon="🚀" text="Formation lancée" />
                    </Box>
                </Container>
            </Box>

            {/* Section du formulaire */}
            <Container sx={{ py: { xs: 6, md: 10 } }}>
                <Grid container spacing={4}>
                    {/* Colonne d'information */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card
                            sx={{
                                height: '100%',
                                bgcolor: 'background.paper',
                                background: (theme) =>
                                    `linear-gradient(135deg, ${alpha(theme.palette.primary.main, 0.05)}, ${alpha(theme.palette.secondary?.main || theme.palette.primary.main, 0.05)})`,
                                border: (theme) => `1px solid ${theme.palette.divider}`,
                            }}
                        >
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
                                    💡 Comment ça marche ?
                                </Typography>

                                <Stack spacing={3}>
                                    <Box>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            1. Inscription
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Remplissez le formulaire avec vos informations et la
                                            formation souhaitée.
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            2. Constitution du groupe
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Nos formations démarrent dès qu'un groupe de 8 personnes
                                            minimum est constitué.
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            3. Notification
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Vous recevrez un e-mail dès qu'une date de session sera
                                            planifiée.
                                        </Typography>
                                    </Box>

                                    <Box>
                                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                                            4. Inscription officielle
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Confirmez votre participation et complétez votre dossier
                                            de financement.
                                        </Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Colonne du formulaire */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{ bgcolor: 'background.paper' }}>
                            <CardContent sx={{ p: 4 }}>
                                <Typography variant="h4" sx={{ mb: 1, fontWeight: 600 }}>
                                    Formulaire de pré-inscription
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                    Les champs marqués d'un astérisque (*) sont obligatoires.
                                </Typography>

                                <form onSubmit={handleSubmit}>
                                    <Stack spacing={3}>
                                        {/* Nom et Prénom */}
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    label="Nom"
                                                    value={data.nom}
                                                    onChange={(e) => setData('nom', e.target.value)}
                                                    error={!!errors.nom}
                                                    helperText={errors.nom}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    label="Prénom"
                                                    value={data.prenom}
                                                    onChange={(e) =>
                                                        setData('prenom', e.target.value)
                                                    }
                                                    error={!!errors.prenom}
                                                    helperText={errors.prenom}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* Email et Téléphone */}
                                        <Grid container spacing={2}>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    type="email"
                                                    label="Adresse e-mail"
                                                    value={data.email}
                                                    onChange={(e) =>
                                                        setData('email', e.target.value)
                                                    }
                                                    error={!!errors.email}
                                                    helperText={errors.email}
                                                />
                                            </Grid>
                                            <Grid size={{ xs: 12, sm: 6 }}>
                                                <TextField
                                                    fullWidth
                                                    required
                                                    type="tel"
                                                    label="Numéro de téléphone"
                                                    value={data.telephone}
                                                    onChange={(e) =>
                                                        setData('telephone', e.target.value)
                                                    }
                                                    error={!!errors.telephone}
                                                    helperText={errors.telephone}
                                                />
                                            </Grid>
                                        </Grid>

                                        {/* Formation souhaitée */}
                                        <TextField
                                            fullWidth
                                            required
                                            select
                                            label="Formation souhaitée"
                                            value={data.formation_id}
                                            onChange={(e) =>
                                                setData('formation_id', e.target.value)
                                            }
                                            error={!!errors.formation_id}
                                            helperText={
                                                errors.formation_id ||
                                                'Sélectionnez la formation qui vous intéresse'
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>-- Choisir une formation --</em>
                                            </MenuItem>
                                            {formations.map((formation) => (
                                                <MenuItem key={formation.id} value={formation.id}>
                                                    {formation.title} ({formation.duration})
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        {/* Moyen de financement */}
                                        <TextField
                                            fullWidth
                                            required
                                            select
                                            label="Moyen de financement"
                                            value={data.moyen_financement}
                                            onChange={(e) =>
                                                setData('moyen_financement', e.target.value)
                                            }
                                            error={!!errors.moyen_financement}
                                            helperText={
                                                errors.moyen_financement ||
                                                'Comment comptez-vous financer la formation ?'
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>-- Choisir un moyen de financement --</em>
                                            </MenuItem>
                                            {moyensFinancement.map((moyen) => (
                                                <MenuItem key={moyen.value} value={moyen.value}>
                                                    {moyen.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        {/* Format de formation */}
                                        <TextField
                                            fullWidth
                                            required
                                            select
                                            label="Format de formation préféré"
                                            value={data.format_preference}
                                            onChange={(e) =>
                                                setData('format_preference', e.target.value)
                                            }
                                            error={!!errors.format_preference}
                                            helperText={
                                                errors.format_preference ||
                                                'Quel format préférez-vous ?'
                                            }
                                        >
                                            <MenuItem value="">
                                                <em>-- Choisir un format --</em>
                                            </MenuItem>
                                            {formatsFormation.map((format) => (
                                                <MenuItem key={format.value} value={format.value}>
                                                    {format.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>

                                        {/* Commentaires */}
                                        <TextField
                                            fullWidth
                                            multiline
                                            rows={4}
                                            label="Commentaires (facultatif)"
                                            value={data.commentaires}
                                            onChange={(e) =>
                                                setData('commentaires', e.target.value)
                                            }
                                            error={!!errors.commentaires}
                                            helperText={
                                                errors.commentaires ||
                                                'Questions, disponibilités particulières, etc.'
                                            }
                                        />

                                        {/* Message d'erreur global */}
                                        {(errors as any).preinscription && (
                                            <Alert severity="error">{(errors as any).preinscription}</Alert>
                                        )}

                                        {/* Bouton de soumission */}
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            size="large"
                                            disabled={processing || isSubmitting}
                                            sx={{
                                                py: 2,
                                                fontSize: '1.1rem',
                                                fontWeight: 600,
                                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary?.main || theme.palette.primary.dark})`,
                                                '&:hover': {
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.secondary?.dark || theme.palette.primary.main})`,
                                                },
                                            }}
                                        >
                                            {processing || isSubmitting
                                                ? 'Envoi en cours...'
                                                : 'Envoyer ma pré-inscription'}
                                        </Button>

                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                            sx={{ textAlign: 'center' }}
                                        >
                                            En soumettant ce formulaire, vous acceptez d'être
                                            contacté(e) par Madin.IA concernant votre pré-inscription.
                                        </Typography>
                                    </Stack>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </MainLayout>
    );
}
