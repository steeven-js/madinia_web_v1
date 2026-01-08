import type { BoxProps } from '@mui/material/Box';

import AutoScroll from 'embla-carousel-auto-scroll';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

import { Carousel, useCarousel } from '@/components/carousel';

// ----------------------------------------------------------------------

type Props = BoxProps & {
    brands: {
        id: string;
        name: string;
        image: string;
    }[];
};

export function CareerOurClients({ brands, sx, ...other }: Props) {
    const carousel = useCarousel(
        {
            loop: true,
            slideSpacing: '24px',
            slidesToShow: 'auto',
        },
        [AutoScroll({ playOnInit: true, speed: 0.5 })],
    );

    return (
        <Box
            component="section"
            sx={[
                {
                    pt: { xs: 10, md: 15 },
                    pb: { xs: 5, md: 10 },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <Container>
                <Box
                    sx={{
                        mx: 'auto',
                        maxWidth: 480,
                        textAlign: 'center',
                        mb: { xs: 5, md: 10 },
                    }}
                >
                    <Typography variant="h2">Ils parlent de nous</Typography>

                    <Typography sx={{ color: 'text.secondary', mt: 3 }}>
                        Nos partenaires et clients nous ont fait confiance.
                    </Typography>
                </Box>

                <Carousel carousel={carousel}>
                    {brands.map((brand) => (
                        <Paper
                            key={brand.id}
                            variant="outlined"
                            sx={{
                                py: 3,
                                px: 2,
                                minWidth: 168,
                                borderRadius: 2,
                                textAlign: 'center',
                                bgcolor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                component="img"
                                loading="lazy"
                                alt={brand.name}
                                src={
                                    brand.image.endsWith('.svg')
                                        ? brand.image.replace(
                                              '.svg',
                                              '-original.svg',
                                          )
                                        : brand.image
                                }
                                sx={{
                                    maxWidth: 120,
                                    maxHeight: 60,
                                    width: 'auto',
                                    height: 'auto',
                                    objectFit: 'contain',
                                }}
                            />
                        </Paper>
                    ))}
                </Carousel>
            </Container>
        </Box>
    );
}
