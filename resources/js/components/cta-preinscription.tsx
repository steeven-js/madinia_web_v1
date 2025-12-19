import { m } from 'framer-motion';
import { router } from '@inertiajs/react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from '@/routing/paths';
import { Iconify } from '@/components/iconify';
import { varFade } from '@/components/animate';

// ----------------------------------------------------------------------

export function CtaPreinscription() {
    const theme = useTheme();

    const handleClick = () => {
        router.visit(paths.formations.preinscription);
    };

    return (
        <Box
            sx={{
                position: 'relative',
                py: { xs: 6, md: 8 },
                overflow: 'hidden',
                background: `linear-gradient(135deg, 
                    ${alpha(theme.palette.primary.main, 0.08)} 0%,
                    ${alpha(theme.palette.secondary.main, 0.08)} 50%,
                    ${alpha(theme.palette.primary.dark, 0.08)} 100%)`,
                borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
            }}
        >
            <Container>
                <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    alignItems="center"
                    justifyContent="space-between"
                    component={m.div}
                    variants={varFade('inUp')}
                >
                    {/* Contenu principal */}
                    <Stack spacing={2} sx={{ flex: 1 }}>
                        <Typography
                            variant="h4"
                            sx={{
                                color: 'text.primary',
                                fontWeight: 700,
                                fontSize: { xs: '1.5rem', sm: '1.75rem', md: '2rem' },
                                lineHeight: 1.3,
                            }}
                        >
                            Intéressé(e) par nos{' '}
                            <Box
                                component="span"
                                sx={{
                                    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                Formations IA
                            </Box>
                            {' '}?
                        </Typography>
                        
                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                maxWidth: 500,
                                lineHeight: 1.6,
                            }}
                        >
                            Pré-inscrivez-vous gratuitement et rejoignez la file d'attente. 
                            Soyez notifié(e) dès qu'un groupe se constitue pour la formation de votre choix.
                        </Typography>
                    </Stack>

                    {/* Bouton CTA */}
                    <m.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.5,
                            type: 'spring',
                            stiffness: 200,
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            onClick={handleClick}
                            endIcon={<Iconify icon="solar:arrow-right-bold" />}
                            sx={{
                                px: 4,
                                py: 1.5,
                                fontSize: '1rem',
                                fontWeight: 600,
                                borderRadius: 2,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                transition: 'all 0.3s ease-in-out',
                                '&:hover': {
                                    boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                                    transform: 'translateY(-2px)',
                                },
                            }}
                        >
                            Je m'inscris maintenant
                        </Button>
                    </m.div>
                </Stack>
            </Container>
        </Box>
    );
}

