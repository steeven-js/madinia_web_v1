
import type { Formation } from '@/types/formation';
import type { ICourseFiltersProps } from '@/types/course';

import { useMemo, useState } from 'react';
import { useBoolean, useSetState } from 'minimal-shared/hooks';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { _tags } from '@/_mock';

import { Iconify } from '@/components/iconify';
import { CtaPreinscription } from '@/components/cta-preinscription';

import { FormationsList } from '../list/formations-list';
import { FormationsFilters } from '../formations-filters';
// import { FormationsNewsletter } from '../formations-newsletter';

// ----------------------------------------------------------------------

type ViewProps = {
    formations?: Formation[];
};

export function FormationsView({ formations }: ViewProps) {
    const openMobile = useBoolean();
    const [showFilters, setShowFilters] = useState(true);

    const filters = useSetState<ICourseFiltersProps>({
        fee: [],
        level: [],
        keyword: '',
        duration: [],
        rating: null,
        language: [],
        categories: [],
        certification: [],
    });

    // Fonction pour afficher les niveaux en français
    const getLevelLabel = (level: string) => {
        const levelLower = level.toLowerCase();
        
        if (levelLower === 'avance' || levelLower === 'avancé') {
            return 'Avancé';
        }
        if (levelLower === 'intermediaire') {
            return 'Intermédiaire';
        }
        if (levelLower === 'debutant') {
            return 'Débutant';
        }
        
        return level;
    };

    // Filtrage des formations basé sur les critères de recherche
    const filteredFormations = useMemo(() => {
        if (!formations) return [];

        let filtered = formations;

        // Filtre par mot-clé (recherche dans le titre et la description)
        if (filters.state.keyword) {
            const keyword = filters.state.keyword.toLowerCase();
            filtered = filtered.filter(formation => 
                formation.title.toLowerCase().includes(keyword) ||
                formation.short_description?.toLowerCase().includes(keyword) ||
                formation.description?.toLowerCase().includes(keyword)
            );
        }

        // Filtre par niveau
        if (filters.state.level.length > 0) {
            filtered = filtered.filter(formation => {
                const levelLabel = getLevelLabel(formation.level);
                return filters.state.level.includes(levelLabel);
            });
        }

        // Filtre par catégorie
        if (filters.state.categories.length > 0) {
            filtered = filtered.filter(formation => 
                formation.category && filters.state.categories.includes(formation.category.name)
            );
        }

        // Filtre par certification
        if (filters.state.certification.length > 0) {
            filtered = filtered.filter(formation => {
                const isCertifying = formation.certification;
                if (filters.state.certification.includes('Certifiante') && isCertifying) {
                    return true;
                }
                if (filters.state.certification.includes('Non certifiante') && !isCertifying) {
                    return true;
                }
                return false;
            });
        }

        return filtered;
    }, [formations, filters.state]);

    return (
        <>
            <Container>
                <Box
                    sx={{
                        pb: 5,
                        display: 'flex',
                        alignItems: 'center',
                        pt: { xs: 3, md: 15 },
                    }}
                >
                    <Typography variant="h2" sx={{ flexGrow: 1 }}>
                        Formations
                    </Typography>

                        <Button
                            color="inherit"
                            variant="contained"
                            startIcon={<Iconify width={18} icon="solar:filter-outline" />}
                            onClick={openMobile.onTrue}
                            sx={{ display: { md: 'none' } }}
                        >
                            Filtres
                        </Button>

                    <Button
                        color="inherit"
                        variant="outlined"
                        startIcon={<Iconify width={18} icon={showFilters ? "solar:eye-closed-outline" : "solar:eye-outline"} />}
                        onClick={() => setShowFilters(!showFilters)}
                        sx={{ display: { xs: 'none', md: 'flex' } }}
                    >
                        {showFilters ? 'Masquer' : 'Afficher'} filtres
                    </Button>
                </Box>

                <Box
                    sx={{
                        gap: { xs: 0, md: showFilters ? 8 : 0 },
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    {showFilters && (
                        <FormationsFilters
                            filters={filters}
                            open={openMobile.value}
                            onClose={openMobile.onFalse}
                            options={{
                                // durations: ['0 - 1 Hour', '1 - 3 Hours', '3 - 6 Hours', '6 - 18 Hours', '18+ Hours'],
                                categories: formations ? 
                                    [...new Set(formations.map(f => f.category?.name).filter(Boolean))] : 
                                    _tags,
                                levels: ['Débutant', 'Intermédiaire', 'Avancé'],
                            }}
                        />
                    )}

                    <Box sx={(theme) => ({ [theme.breakpoints.up('md')]: { minWidth: 0, flex: '1 1 auto' } })}>
                        {filteredFormations.length > 0 ? (
                            <FormationsList formations={filteredFormations} />
                        ) : (
                            <Box
                                sx={{
                                    textAlign: 'center',
                                    py: 8,
                                    px: 3,
                                }}
                            >
                                <Iconify 
                                    icon="carbon:search" 
                                    width={64}
                                    height={64}
                                    style={{ 
                                        color: '#9e9e9e',
                                        marginBottom: '16px'
                                    }} 
                                />
                                <Typography variant="h6" sx={{ mb: 1, color: 'text.secondary' }}>
                                    Aucune formation trouvée
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.disabled', maxWidth: 400, mx: 'auto' }}>
                                    Essayez de modifier vos critères de recherche ou de supprimer certains filtres pour voir plus de résultats.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Container>
            {/* <CatalogueNewsletter /> */}
            <CtaPreinscription />
        </>
    );
}

