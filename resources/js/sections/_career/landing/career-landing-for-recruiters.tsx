import type { BoxProps } from '@mui/material/Box';
import type { Theme, SxProps } from '@mui/material/styles';
import type { Formation } from '@/types/formation';

import { m } from 'framer-motion';
import AutoScroll from 'embla-carousel-auto-scroll';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Skeleton from '@mui/material/Skeleton';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from '@/routing/paths';
import { RouterLink } from '@/routing/components';

import { Iconify } from '@/components/iconify';
import { MotionViewport } from '@/components/animate';
import { Carousel, useCarousel } from '@/components/carousel';

// ----------------------------------------------------------------------

interface CareerLandingForRecruitersProps extends BoxProps {
    formations?: Formation[];
}

export function CareerLandingForRecruiters({ formations = [], sx, ...other }: CareerLandingForRecruitersProps) {
    const theme = useTheme();

    // Debug: afficher les formations avec URL Supabase
    console.log('🔍 Formations reçues:', formations);
    console.log('🔍 Nombre de formations:', formations.length);
    formations.forEach((formation, index) => {
        console.log(`📚 Formation ${index + 1}:`, {
            id: formation.id,
            title: formation.title,
            slug: formation.slug,
            image: formation.image, // URL complète Supabase
            imageUrl: formation.image ? `✅ URL Supabase: ${formation.image}` : '❌ Pas d\'image',
            category: formation.category,
            certification: formation.certification,
        });
    });

    // Prendre toutes les formations pour le carousel
    const featuredFormations = formations || [];

    // Afficher les skeletons si aucune formation n'est disponible
    const displayItems = featuredFormations.length === 0
        ? Array.from({ length: 6 }, (_, i) => ({ id: `loading-${i}`, isLoading: true }))
        : featuredFormations;

    const carousel = useCarousel(
        {
            loop: true,
            slidesToShow: 'auto',
            slideSpacing: '24px',
            align: 'start',
        },
        displayItems.length > 0 ? [AutoScroll({ playOnInit: true, speed: 0.3 })] : [],
    );

    return (
        <Box
            component={MotionViewport}
            sx={[
                {
                    py: { xs: 5, md: 10 },
                    px: { xs: 2, md: 0 },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <Container>
                <Stack
                    spacing={3}
                    sx={{
                        mb: 5,
                        maxWidth: 800,
                        mx: 'auto',
                        textAlign: 'center',
                    }}
                >
                    <Typography variant="overline" sx={{ color: 'primary.main', fontSize: '0.875rem' }}>
                        Catalogue des Formations
                    </Typography>

                    <Typography
                        variant="h2"
                        sx={{
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            backgroundClip: 'text',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        Découvrez nos Formations en IA
                    </Typography>

                    <Typography sx={{ color: 'text.secondary', fontSize: '1.1rem' }}>
                        Explorez notre catalogue complet de formations en intelligence artificielle. 
                        Formations certifiantes, tous niveaux, avec des experts reconnus.
                    </Typography>
                </Stack>

                <Box
                    sx={{
                        mb: 5,
                        position: 'relative',
                        '& .carousel__container': {
                            py: 2,
                        },
                    }}
                >
                    {displayItems.length > 0 ? (
                        <Carousel carousel={carousel}>
                            {displayItems.map((item, index) => (
                                <Box
                                    key={item.id || `item-${index}`}
                                    sx={{
                                        minWidth: { xs: '240px', sm: '260px', md: '280px' },
                                        px: 1,
                                    }}
                                >
                                    {('isLoading' in item && item.isLoading) ? (
                                        <FormationCardSkeleton />
                                    ) : (
                                        <FormationCard formation={item} index={index} />
                                    )}
                                </Box>
                            ))}
                        </Carousel>
                    ) : (
                        <Box
                            sx={{
                                display: 'flex',
                                gap: 3,
                                overflowX: 'auto',
                                pb: 2,
                                '&::-webkit-scrollbar': {
                                    height: 8,
                                },
                                '&::-webkit-scrollbar-thumb': {
                                    backgroundColor: alpha(theme.palette.grey[500], 0.3),
                                    borderRadius: 4,
                                },
                            }}
                        >
                            {Array.from({ length: 6 }, (_, i) => (
                                <Box
                                    key={`skeleton-${i}`}
                                    sx={{
                                        minWidth: { xs: '240px', sm: '260px', md: '280px' },
                                        px: 1,
                                        flexShrink: 0,
                                    }}
                                >
                                    <FormationCardSkeleton />
                                </Box>
                            ))}
                        </Box>
                    )}
                </Box>

                <Box sx={{ textAlign: 'center' }}>
                    <Button
                        component={RouterLink}
                        href={paths.formations.root}
                        size="large"
                        variant="contained"
                        endIcon={<Iconify icon="solar:arrow-right-bold" />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1rem',
                            fontWeight: 600,
                            borderRadius: 2,
                            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                            boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                            '&:hover': {
                                boxShadow: `0 6px 25px ${alpha(theme.palette.primary.main, 0.4)}`,
                                transform: 'translateY(-2px)',
                            },
                        }}
                    >
                        Voir tout le catalogue
                    </Button>
                </Box>
            </Container>
        </Box>
    );
}

// Composant de chargement (skeleton) pour les cartes de formation
function FormationCardSkeleton() {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                bgcolor: 'background.paper',
            }}
        >
            {/* Image skeleton */}
            <Skeleton
                variant="rectangular"
                width="100%"
                height={360}
                sx={{ bgcolor: alpha(theme.palette.grey[500], 0.1) }}
            />

            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                {/* Badge skeleton */}
                <Skeleton
                    variant="rectangular"
                    width={100}
                    height={24}
                    sx={{ mb: 2, borderRadius: 1 }}
                />

                {/* Catégorie skeleton */}
                <Skeleton variant="text" width={80} height={20} sx={{ mb: 1 }} />

                {/* Titre skeleton */}
                <Skeleton variant="text" width="90%" height={32} sx={{ mb: 1.5 }} />
                <Skeleton variant="text" width="70%" height={32} sx={{ mb: 1.5 }} />

                {/* Description skeleton */}
                <Skeleton variant="text" width="100%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="95%" height={20} sx={{ mb: 1 }} />
                <Skeleton variant="text" width="85%" height={20} sx={{ mb: 2 }} />

                {/* Lien skeleton */}
                <Box sx={{ mt: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Skeleton variant="text" width={100} height={20} />
                    <Skeleton variant="circular" width={20} height={20} />
                </Box>
            </CardContent>
        </Card>
    );
}

interface FormationCardProps {
    formation: Formation;
    index: number;
}

function FormationCard({ formation, index }: FormationCardProps) {
    const theme = useTheme();

    return (
        <Card
            component={RouterLink}
            href={paths.formations.detail(formation.slug)}
            sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease-in-out',
                border: `1px solid ${alpha(theme.palette.divider, 0.5)}`,
                bgcolor: 'background.paper',
                '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: theme.customShadows.z24,
                    borderColor: theme.palette.primary.main,
                },
            }}
        >
            {/* Image - Format portrait A4 mis en avant */}
            {formation.image && (
                <Box
                    component="img"
                    src={formation.image}
                    alt={formation.title}
                    sx={{
                        width: '100%',
                        height: { xs: 320, sm: 360, md: 400 },
                        objectFit: 'cover',
                        objectPosition: 'center top',
                        display: 'block',
                    }}
                />
            )}

            <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: { xs: 2, sm: 2.5, md: 3 } }}>
                {/* Badge certification */}
                {formation.certification && (
                    <Box
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 0.5,
                            px: 1.5,
                            py: 0.5,
                            mb: 2,
                            borderRadius: 1,
                            bgcolor: alpha(theme.palette.success.main, 0.1),
                            border: `1px solid ${alpha(theme.palette.success.main, 0.2)}`,
                            maxWidth: 'fit-content',
                        }}
                    >
                        <Iconify icon="solar:verified-check-bold" width={16} style={{ color: theme.palette.success.main }} />
                        <Typography variant="caption" sx={{ color: 'success.main', fontWeight: 600 }}>
                            Certifiante
                        </Typography>
                    </Box>
                )}

                {/* Catégorie */}
                {formation.category && (
                    <Typography
                        variant="caption"
                        sx={{
                            mb: 1,
                            color: formation.category.color || 'primary.main',
                            fontWeight: 600,
                        }}
                    >
                        {formation.category.name}
                    </Typography>
                )}

                {/* Titre */}
                <Typography
                    variant="h6"
                    sx={{
                        mb: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: 64,
                    }}
                >
                    {formation.title}
                </Typography>

                {/* Description */}
                {formation.short_description && (
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            flex: 1,
                            display: '-webkit-box',
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            mb: 2,
                        }}
                    >
                        {formation.short_description}
                    </Typography>
                )}

                {/* Lien */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: 'primary.main',
                        fontWeight: 600,
                        mt: 'auto',
                    }}
                >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        En savoir plus
                    </Typography>
                    <Iconify icon="solar:arrow-right-bold" width={20} />
                </Box>
            </CardContent>
        </Card>
    );
}
