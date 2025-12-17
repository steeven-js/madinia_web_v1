import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

import { CtaPreinscription } from '@/components/cta-preinscription';

// Types pour les données
interface ArticleItem {
  numero: number;
  titre: string;
  contenu: string;
  droits?: string[];
  contact_email?: string;
}

interface PolitiqueConfidentialiteData {
  titre: string;
  articles: ArticleItem[];
}

interface PolitiqueConfidentialiteViewProps {
  data: PolitiqueConfidentialiteData;
}

export function PolitiqueConfidentialiteView({ data }: PolitiqueConfidentialiteViewProps) {
  const theme = useTheme();

  const renderSpecificProperties = (article: ArticleItem) => {
    const properties = [];

    // Gestion des droits (Article 6)
    if (article.droits) {
      properties.push(
        <Box key="droits" sx={{ mt: 2 }}>
          <Box component="ul" sx={{ pl: 2, m: 0 }}>
            {article.droits.map((item, idx) => (
              <Typography
                key={idx}
                component="li"
                variant="body2"
                sx={{ color: 'text.secondary', mb: 0.5 }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      );
    }

    // Gestion de l'email de contact (Article 8)
    if (article.contact_email) {
      properties.push(
        <Box key="contact_email" sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
            <strong>Email de contact :</strong> {article.contact_email}
          </Typography>
        </Box>
      );
    }

    return properties;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        background:
          theme.palette.mode === 'light'
            ? `linear-gradient(135deg, ${varAlpha(theme.vars.palette.grey['50Channel'], 0.8)}, ${varAlpha(theme.vars.palette.grey['100Channel'], 0.95)})`
            : `linear-gradient(135deg, ${varAlpha(theme.vars.palette.grey['900Channel'], 0.8)}, ${varAlpha(theme.vars.palette.grey['800Channel'], 0.95)})`,
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(circle at 20% 20%, ${theme.palette.primary.main}08, transparent 50%)`,
          zIndex: 0,
        },
      }}
    >
      <Container sx={{ pt: { xs: 10, md: 15 }, pb: 8, position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: 6,
            background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {data.titre}
        </Typography>

        {data.articles.map((article) => (
          <Box
            key={article.numero}
            sx={{
              mb: 6,
              p: 3,
              border: `1px solid ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: theme.customShadows.z8,
              transition: 'all 0.3s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.customShadows.z16,
              },
            }}
          >
            <Typography variant="h4" sx={{ color: 'primary.main', mb: 2 }}>
              Article {article.numero} - {article.titre}
            </Typography>

            <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
              {article.contenu}
            </Typography>

            {renderSpecificProperties(article)}
          </Box>
        ))}
      </Container>

      <CtaPreinscription />
    </Box>
  );
}
